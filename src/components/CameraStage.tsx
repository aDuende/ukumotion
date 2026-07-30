import type { RefObject } from 'react'
import { Camera, CameraOff, Hand, ScanLine } from 'lucide-react'
import { GESTURES, INSTRUMENTS, type Chord, type Instrument } from '../lib/music'

type Props = {
  theme: 'dark' | 'light'
  videoRef: RefObject<HTMLVideoElement | null>
  canvasRef: RefObject<HTMLCanvasElement | null>
  instrument: Instrument
  chord: Chord
  fingerNumber: number
  camera: 'idle' | 'loading' | 'active' | 'error'
  cameraMessage: string
  onStart: () => void
  onStop: () => void
  onChord: (chord: Chord) => void
}

export function CameraStage({ theme, videoRef, canvasRef, instrument, chord, fingerNumber, camera, cameraMessage, onStart, onStop, onChord }: Props) {
  const info = INSTRUMENTS[instrument]
  const light = theme === 'light'
  return (
    <section className={`relative min-h-105 flex-1 overflow-hidden transition-colors lg:min-h-0 ${light ? 'bg-[#e9ebe8]' : 'bg-[#080908]'}`}>
      <video className="absolute inset-0 size-full scale-x-[-1] object-cover" ref={videoRef} muted playsInline autoPlay />
      <canvas className="pointer-events-none absolute inset-0 size-full" ref={canvasRef} />

      <div className={`absolute left-4 top-4 flex flex-col items-start gap-2`}>
        <div className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] tracking-[.12em] shadow-lg backdrop-blur-xl ${light ? 'border-black/8 bg-white/88 text-[#d94f28]' : 'border-white/12 bg-black/45 text-[#ff8a66]'}`}>
          <ScanLine size={12} /> {info.label} MODE
        </div>
        {camera === 'active' && fingerNumber > 0 && (
          <div className="flex items-center gap-1.5 rounded-full border border-[#ff6b3d]/40 bg-[#ff6b3d] px-3 py-1.5 text-[9px] font-bold tracking-[.12em] text-white shadow-lg">
            NUMBER {fingerNumber} DETECTED
          </div>
        )}
      </div>
      <div className={`absolute right-4 top-4 rounded-full border px-3 py-1.5 text-[9px] tracking-wider shadow-lg backdrop-blur-xl ${light ? 'border-black/8 bg-white/88 text-black/45' : 'border-white/12 bg-black/45 text-white/45'}`}>{cameraMessage}</div>

      {camera !== 'active' && (
        <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-24 text-center ${light ? 'bg-[radial-gradient(circle_at_center,#ffffff_0%,#f5f6f4_58%,#eceeeb_100%)]' : 'bg-[radial-gradient(circle_at_center,#171917_0%,#0d0e0d_55%,#080908_100%)]'}`}>
          <div className="mb-5 grid size-14 place-items-center rounded-full border border-[#ff6b3d]/30 bg-[#ff6b3d]/12 text-[#ff7951] shadow-[0_0_50px_rgba(255,107,61,.12)]">
            <Hand size={26} strokeWidth={1.7} />
          </div>
          <h1 className={`text-3xl font-bold tracking-tight sm:text-4xl ${light ? 'text-[#191a18]' : 'text-white'}`}>Play with your hands</h1>
          <p className={`mt-3 max-w-md text-[11px] leading-6 ${light ? 'text-black/40' : 'text-white/35'}`}>Show a number 1–5 and the chord plays on its own<br />Camera data is processed only on your device</p>
          <button className="mt-6 flex h-11 items-center gap-2 rounded-full bg-[#ff6b3d] px-6 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(255,107,61,.25)] transition hover:-translate-y-0.5 hover:bg-[#e85b32] disabled:cursor-wait disabled:opacity-55" type="button" onClick={onStart} disabled={camera === 'loading'}>
            <Camera size={16} /> {camera === 'loading' ? 'LOADING HAND TRACKING' : camera === 'error' ? 'RECONNECT CAMERA' : 'OPEN CAMERA'}
          </button>
        </div>
      )}

      {camera === 'active' && (
        <button className={`absolute right-4 top-14 z-10 grid size-9 place-items-center rounded-full border shadow-lg backdrop-blur-xl transition hover:border-red-400/40 hover:text-red-400 ${light ? 'border-black/8 bg-white/88 text-black/45' : 'border-white/12 bg-black/45 text-white/45'}`} type="button" onClick={onStop} title="Close camera" aria-label="Close camera">
          <CameraOff size={15} />
        </button>
      )}

      {camera === 'active' && (
        <div className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 text-center">
          <span className="font-mono text-[9px] tracking-[.25em] text-white/35">CURRENT CHORD</span>
          <div className="font-['Arial_Narrow',sans-serif] text-7xl font-bold leading-none text-white drop-shadow-[0_5px_30px_rgba(0,0,0,.9)]">{chord}</div>
        </div>
      )}

      <div className={`absolute inset-x-0 bottom-0 z-10 flex h-16 items-stretch border-t backdrop-blur-xl ${light ? 'border-black/8 bg-white/90 shadow-[0_-4px_18px_rgba(25,26,24,.05)]' : 'border-white/10 bg-[#0d0e0d]/90 shadow-[0_-8px_28px_rgba(0,0,0,.3)]'}`}>
        <div className={`hidden w-32 flex-col justify-center border-r px-4 sm:flex ${light ? 'border-black/8' : 'border-white/10'}`}><span className={`text-[8px] tracking-widest ${light ? 'text-black/30' : 'text-white/25'}`}>LEFT HAND</span><strong className={`text-[11px] ${light ? 'text-black/65' : 'text-white/65'}`}>Choose chord</strong></div>
        <div className="flex min-w-0 flex-1 items-stretch">
          {GESTURES.map((name, index) => (
            <button className={`flex min-w-0 flex-1 flex-col items-center justify-center border-r transition ${light ? 'border-black/8' : 'border-white/10'} ${chord === name ? light ? 'bg-[#fff0eb] text-[#d94f28]' : 'bg-[#ff6b3d]/16 text-[#ff8a66]' : light ? 'text-black/45 hover:bg-black/3 hover:text-black/70' : 'text-white/35 hover:bg-white/6 hover:text-white/70'}`} key={name} type="button" onClick={() => onChord(name)}>
              <span className="text-[8px] opacity-55">{index + 1}F</span><strong className="text-sm">{name}</strong>
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
