import { useCallback, useEffect, useRef, useState } from 'react'
import { CONNECTIONS, fingerCount, type HandResults, type HandsInstance, type Landmark } from '../lib/hands'
import { DRUM_MAP, GESTURES, INSTRUMENTS, notesFor, PICK_PATTERNS, SCORE, type Chord, type Instrument } from '../lib/music'
import { playDrum, playSampleNote, preloadInstrument } from '../lib/samples'

declare global {
  interface Window {
    Hands?: new (value: { locateFile: (file: string) => string }) => HandsInstance
  }
}

export function useMotionInstrument() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const handsRef = useRef<HandsInstance | null>(null)
  const frameRef = useRef<number | null>(null)
  const audioRef = useRef<AudioContext | null>(null)
  const chordRef = useRef<Chord>('C')
  const instrumentRef = useRef<Instrument>('ukulele')
  const volumeRef = useRef(0.72)
  const pickPatternIdRef = useRef('strum')
  const gestureRef = useRef({ fingers: 0, frames: 0 })
  const beatRef = useRef(0)

  const [instrument, setInstrument] = useState<Instrument>('ukulele')
  const [chord, setChord] = useState<Chord>('C')
  const [camera, setCamera] = useState<'idle' | 'loading' | 'active' | 'error'>('idle')
  const [cameraMessage, setCameraMessage] = useState('CAMERA OFFLINE')
  const [handCount, setHandCount] = useState(0)
  const [fingerNumber, setFingerNumber] = useState(0)
  const [lastAction, setLastAction] = useState('READY TO PLAY')
  const [feedback, setFeedback] = useState('Show a number 1–6 to choose a chord.')
  const [pickPatternId, setPickPatternIdState] = useState('strum')
  const [bpm, setBpm] = useState(88)
  const [volume, setVolume] = useState(0.72)
  const [bar, setBar] = useState(0)
  const [playing, setPlaying] = useState(false)

  const selectChord = useCallback((next: Chord, source = 'CONTROL') => {
    chordRef.current = next
    setChord(next)
    setLastAction(`${source} · ${next}`)
  }, [])

  const ensureAudio = useCallback(async () => {
    if (!audioRef.current) audioRef.current = new AudioContext()
    if (audioRef.current.state === 'suspended') await audioRef.current.resume()
    return audioRef.current
  }, [])

  const playChord = useCallback(async (direction: 'down' | 'up' = 'down') => {
    const context = await ensureAudio()
    const voice = instrumentRef.current
    await preloadInstrument(context, voice)
    const master = context.createGain()
    master.gain.value = volumeRef.current
    master.connect(context.destination)

    if (voice === 'drums') {
      const drum = DRUM_MAP[chordRef.current]
      playDrum(context, drum, master, context.currentTime, 1)
      if (direction === 'up') playDrum(context, 'hihat', master, context.currentTime + 0.02, 0.6)
      setLastAction(`${drum.toUpperCase()} · ${INSTRUMENTS[voice].label}`)
      setFeedback(`${drum.charAt(0).toUpperCase()}${drum.slice(1)} hit played.`)
      return
    }

    const rawNotes = notesFor(chordRef.current, voice)
    const notes = direction === 'down' ? rawNotes : [...rawNotes].reverse()
    const stagger = voice === 'piano' ? 0.02 : 0.032
    notes.forEach((midi, index) => {
      playSampleNote(context, voice, midi, master, context.currentTime + index * stagger, index === 0 ? 1 : 0.82)
    })
    setLastAction(`${direction === 'down' ? 'DOWN' : 'UP'} · ${chordRef.current} · ${INSTRUMENTS[voice].label}`)
    const num = GESTURES.indexOf(chordRef.current) + 1
    setFeedback(num ? `Number ${num} → ${chordRef.current} chord. Strum played.` : `${chordRef.current} chord. Strum played.`)
  }, [ensureAudio])

  const switchInstrument = useCallback((next: Instrument) => {
    instrumentRef.current = next
    setInstrument(next)
    setLastAction(`INSTRUMENT · ${INSTRUMENTS[next].label}`)
    void (async () => {
      const context = await ensureAudio()
      await preloadInstrument(context, next)
      void playChord()
    })()
  }, [ensureAudio, playChord])

  const setPickPatternId = useCallback((id: string) => {
    pickPatternIdRef.current = id
    setPickPatternIdState(id)
  }, [])

  const playPickPattern = useCallback(async () => {
    const context = await ensureAudio()
    const voice = instrumentRef.current
    await preloadInstrument(context, voice)
    const master = context.createGain()
    master.gain.value = volumeRef.current
    master.connect(context.destination)

    const patId = pickPatternIdRef.current
    if (patId === 'strum') {
      const delay = 60000 / bpm / 2
      const strumPattern: ('down' | 'up')[] = ['down', 'up', 'down', 'up']
      strumPattern.forEach((direction, index) => {
        window.setTimeout(() => void playChord(direction), index * delay)
      })
      setLastAction(`STRUM PATTERN · ${chordRef.current}`)
      return
    }

    const def = PICK_PATTERNS[patId]
    if (!def || voice === 'drums') return
    const rawNotes = notesFor(chordRef.current, voice)
    const steps = voice === 'ukulele' ? def.ukulele : def.guitar
    const stepSecs = 60 / bpm / 2 // eighth note
    steps.forEach((step, i) => {
      const t = context.currentTime + i * stepSecs
      const indices = Array.isArray(step) ? step : [step]
      indices.forEach((idx) => {
        if (idx < rawNotes.length) playSampleNote(context, voice, rawNotes[idx], master, t, idx === 0 ? 1 : 0.82)
      })
    })
    setLastAction(`${def.label} · ${chordRef.current}`)
  }, [bpm, ensureAudio, playChord])

  const drawHands = useCallback((allHands: Landmark[][]) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const bounds = canvas.getBoundingClientRect()
    canvas.width = bounds.width
    canvas.height = bounds.height
    const context = canvas.getContext('2d')
    if (!context) return
    context.clearRect(0, 0, canvas.width, canvas.height)
    allHands.forEach((hand, handIndex) => {
      const color = handIndex ? '#f59e0b' : '#fb923c'
      context.strokeStyle = color
      context.fillStyle = color
      context.lineWidth = 1.5
      CONNECTIONS.forEach(([from, to]) => {
        context.beginPath()
        context.moveTo((1 - hand[from].x) * canvas.width, hand[from].y * canvas.height)
        context.lineTo((1 - hand[to].x) * canvas.width, hand[to].y * canvas.height)
        context.stroke()
      })
      hand.forEach((point, index) => {
        context.beginPath()
        context.arc((1 - point.x) * canvas.width, point.y * canvas.height, [4, 8, 12, 16, 20].includes(index) ? 4 : 2, 0, Math.PI * 2)
        context.fill()
      })
    })
  }, [])

  const processHands = useCallback((results: HandResults) => {
    const allHands = results.multiHandLandmarks ?? []
    const handedness = results.multiHandedness ?? []
    setHandCount(allHands.length)
    drawHands(allHands)
    setCameraMessage(allHands.length > 1 ? 'TWO HANDS TRACKED' : allHands.length ? 'ONE HAND TRACKED' : 'RAISE YOUR HANDS')
    const left = allHands.find((_, index) => handedness[index]?.label === 'Left') ?? allHands[0]

    if (left) {
      const fingers = fingerCount(left)
      setFingerNumber(fingers)
      if (gestureRef.current.fingers === fingers) gestureRef.current.frames += 1
      else gestureRef.current = { fingers, frames: 1 }
      if (fingers > 0 && fingers <= GESTURES.length && gestureRef.current.frames === 7) {
        selectChord(GESTURES[fingers - 1], `NUMBER ${fingers}`)
        void playChord()
      }
    } else {
      setFingerNumber(0)
    }
  }, [drawHands, playChord, selectChord])

  const stopCamera = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    streamRef.current?.getTracks().forEach((track) => track.stop())
    handsRef.current?.close?.()
    streamRef.current = null
    handsRef.current = null
    setCamera('idle')
    setCameraMessage('CAMERA OFFLINE')
    setHandCount(0)
  }, [])

  const startCamera = useCallback(async () => {
    setCamera('loading')
    setCameraMessage('LOADING VISION MODEL')
    try {
      await ensureAudio()
      void preloadInstrument(audioRef.current!, instrumentRef.current)
      if (!window.Hands) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/hands.js'
          script.crossOrigin = 'anonymous'
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('MODEL LOAD FAILED'))
          document.head.appendChild(script)
        })
      }
      if (!window.Hands) throw new Error('MODEL NOT READY')
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
      streamRef.current = stream
      if (!videoRef.current) return
      videoRef.current.srcObject = stream
      await videoRef.current.play()
      const tracker = new window.Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}` })
      tracker.setOptions({ maxNumHands: 2, modelComplexity: 1, minDetectionConfidence: 0.68, minTrackingConfidence: 0.55 })
      tracker.onResults(processHands)
      handsRef.current = tracker
      setCamera('active')
      let sending = false
      const detect = async () => {
        if (!handsRef.current || !videoRef.current) return
        if (!sending && videoRef.current.readyState >= 2) {
          sending = true
          try { await handsRef.current.send({ image: videoRef.current }) } finally { sending = false }
        }
        frameRef.current = requestAnimationFrame(detect)
      }
      frameRef.current = requestAnimationFrame(detect)
    } catch (error) {
      setCamera('error')
      setCameraMessage(error instanceof Error ? error.message : 'CAMERA ERROR')
    }
  }, [ensureAudio, processHands])

  useEffect(() => {
    if (!playing) return
    const duration = 60000 / bpm
    const tick = () => {
      const nextBar = Math.floor(beatRef.current / 4) % SCORE.length
      chordRef.current = SCORE[nextBar]
      setChord(SCORE[nextBar])
      setBar(nextBar)
      void playChord(beatRef.current % 2 ? 'up' : 'down')
      beatRef.current = (beatRef.current + 1) % (SCORE.length * 4)
    }
    tick()
    const timer = window.setInterval(tick, duration)
    return () => clearInterval(timer)
  }, [bpm, playChord, playing])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLButtonElement) return
      if (event.code === 'Space') { event.preventDefault(); void playChord() }
      const number = Number(event.key)
      if (number > 0 && number <= GESTURES.length) selectChord(GESTURES[number - 1], 'KEYBOARD')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [playChord, selectChord])

  useEffect(() => () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    streamRef.current?.getTracks().forEach((track) => track.stop())
    handsRef.current?.close?.()
    void audioRef.current?.close()
  }, [])

  const changeVolume = (next: number) => { volumeRef.current = next; setVolume(next) }
  const selectBar = (next: number) => { setBar(next); beatRef.current = next * 4; selectChord(SCORE[next], `BAR ${next + 1}`); void playChord() }
  const togglePlaying = () => { void ensureAudio(); if (!playing) beatRef.current = bar * 4; setPlaying((value) => !value) }

  return {
    videoRef, canvasRef, instrument, chord, camera, cameraMessage, handCount, fingerNumber,
    lastAction, feedback, bpm, volume, bar, playing, pickPatternId,
    playChord, playPickPattern, switchInstrument, setPickPatternId,
    selectChord, startCamera, stopCamera, setBpm, changeVolume, selectBar, togglePlaying,
  }
}
