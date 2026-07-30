import type { Instrument } from './music'

export type PitchedInstrument = Exclude<Instrument, 'drums'>
export type DrumVoice = 'kick' | 'snare' | 'hihat' | 'tom-low' | 'tom-high' | 'crash'

const SAMPLE_ROOT = '/samples'

const MIDI: Record<string, number> = {
  C4: 60, D4: 62, E4: 64, F4: 65, G4: 67, A4: 69, Bb4: 70, B4: 71, C5: 72,
}

const notes = (names: string[]) => names.map((name) => ({ file: name, midi: MIDI[name] }))

export const SAMPLE_SETS: Record<PitchedInstrument, { file: string; midi: number }[]> = {
  ukulele: [
    { file: 'C4-open', midi: 60 },
    { file: 'D4-stringC', midi: 62 },
    { file: 'E4-open', midi: 64 },
    { file: 'F4-stringE', midi: 65 },
    { file: 'G4-open', midi: 67 },
    { file: 'A4-open', midi: 69 },
    { file: 'B4-stringA', midi: 71 },
    { file: 'C5-stringA', midi: 72 },
  ],
  guitar: notes(['C4', 'D4', 'E4', 'F4', 'G4', 'A4']),
  piano: notes(['C4', 'D4', 'E4', 'F4', 'G4', 'A4']),
  saxophone: notes(['C4', 'D4', 'E4', 'F4', 'G4', 'A4']),
  handpan: notes(['D4', 'E4', 'F4', 'G4', 'A4', 'Bb4']),
  violin: notes(['C4', 'E4', 'G4', 'A4']),
  flute: notes(['C4', 'E4', 'A4']),
}

export const DRUM_VOICES: DrumVoice[] = ['kick', 'snare', 'hihat', 'tom-low', 'tom-high', 'crash']

const bufferCache = new Map<string, AudioBuffer>()
const loadPromises = new Map<string, Promise<AudioBuffer>>()

function loadSample(context: AudioContext, folder: string, file: string) {
  const key = `${folder}/${file}`
  const cached = bufferCache.get(key)
  if (cached) return Promise.resolve(cached)
  let promise = loadPromises.get(key)
  if (!promise) {
    promise = fetch(`${SAMPLE_ROOT}/${folder}/${file}.mp3`)
      .then((response) => response.arrayBuffer())
      .then((data) => context.decodeAudioData(data))
      .then((buffer) => {
        bufferCache.set(key, buffer)
        return buffer
      })
    loadPromises.set(key, promise)
  }
  return promise
}

export async function preloadInstrument(context: AudioContext, instrument: Instrument) {
  if (instrument === 'drums') {
    await Promise.all(DRUM_VOICES.map((voice) => loadSample(context, 'drums', voice)))
    return
  }
  await Promise.all(SAMPLE_SETS[instrument].map((sample) => loadSample(context, instrument, sample.file)))
}

export function playSampleNote(
  context: AudioContext,
  instrument: PitchedInstrument,
  midi: number,
  destination: AudioNode,
  when: number,
  gain = 1,
) {
  const set = SAMPLE_SETS[instrument]
  const nearest = set.reduce((best, sample) =>
    Math.abs(sample.midi - midi) < Math.abs(best.midi - midi) ? sample : best,
  )
  const buffer = bufferCache.get(`${instrument}/${nearest.file}`)
  if (!buffer) return
  const source = context.createBufferSource()
  source.buffer = buffer
  source.playbackRate.value = 2 ** ((midi - nearest.midi) / 12)
  const envelope = context.createGain()
  envelope.gain.value = gain
  source.connect(envelope)
  envelope.connect(destination)
  source.start(when)
  // Saxophone and violin samples sustain much longer than the plucked voices;
  // give them a short release so they feel as snappy as the other instruments.
  if (instrument === 'saxophone' || instrument === 'violin') {
    const hold = 0.9
    envelope.gain.setValueAtTime(gain, when + hold)
    envelope.gain.linearRampToValueAtTime(0, when + hold + 0.12)
    source.stop(when + hold + 0.14)
  }
}

export function playDrum(context: AudioContext, voice: DrumVoice, destination: AudioNode, when: number, gain = 1) {
  const buffer = bufferCache.get(`drums/${voice}`)
  if (!buffer) return
  const source = context.createBufferSource()
  source.buffer = buffer
  const envelope = context.createGain()
  envelope.gain.value = gain
  source.connect(envelope)
  envelope.connect(destination)
  source.start(when)
}
