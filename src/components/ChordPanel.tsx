import { Hand, Play, Square } from 'lucide-react'
import { GESTURES, INSTRUMENTS, type Chord, type Instrument } from '../lib/music'

const FAMILY: Record<Instrument, string> = {
  ukulele: 'Strings',
  guitar: 'Strings',
  violin: 'Strings',
  piano: 'Keys',
  flute: 'Winds',
  saxophone: 'Reeds',
  handpan: 'Percussion',
  drums: 'Percussion',
}

type Props = {
  theme: 'dark' | 'light'
  instrument: Instrument
  chord: Chord
  targetChord: Chord
  targetNumber: number
  fingerNumber: number
  playing: boolean
  feedback: string
  progress: number
  onInstrument: (instrument: Instrument) => void
  onStrum: () => void
  onToggleLoop: () => void
}

export function ChordPanel({
  theme, instrument, chord, targetChord, targetNumber, fingerNumber, playing, feedback, progress, onInstrument, onStrum, onToggleLoop,
}: Props) {
  const light = theme === 'light'
  const isDrums = instrument === 'drums'
  const mappedChord = fingerNumber > 0 && fingerNumber <= GESTURES.length ? GESTURES[fingerNumber - 1] : null

  return (
    <aside className={`relative z-10 flex h-full w-full max-w-96 shrink-0 flex-col gap-4 overflow-y-auto border-l p-5 transition-colors ${light ? 'border-black/8 bg-[#fffaf8]' : 'border-white/10 bg-[#0d0e0d]'}`}>
      <div className="flex items-start justify-between gap-3">
        <label className="min-w-0">
          <span className={`block text-[9px] tracking-[.14em] ${light ? 'text-black/35' : 'text-white/30'}`}>{FAMILY[instrument].toUpperCase()}</span>
          <select
            className={`mt-1 w-full cursor-pointer rounded-md border px-2 py-1.5 text-sm font-bold outline-none transition ${light ? 'border-black/10 bg-white text-[#191a18]' : 'border-white/10 bg-white/5 text-white'}`}
            aria-label="Instrument"
            value={instrument}
            onChange={(event) => onInstrument(event.target.value as Instrument)}
          >
            {(Object.keys(INSTRUMENTS) as Instrument[]).map((key) => (
              <option key={key} value={key}>{INSTRUMENTS[key].name}</option>
            ))}
          </select>
        </label>
        <span className={`mt-4 shrink-0 rounded-full border px-2.5 py-1 text-[9px] font-semibold tracking-[.1em] ${light ? 'border-[#ff6b3d]/30 bg-[#fff0eb] text-[#d94f28]' : 'border-[#ff6b3d]/30 bg-[#ff6b3d]/10 text-[#ff8a66]'}`}>
          {isDrums ? 'NUMBERS HIT PIECES' : 'NUMBERS CHOOSE CHORDS'}
        </span>
      </div>

      <div className={`rounded-xl border px-5 py-6 text-center ${light ? 'border-black/8 bg-white' : 'border-white/10 bg-white/4'}`}>
        <div className="text-8xl font-black leading-none text-[#ff6b3d]">{targetNumber || '–'}</div>
        <p className={`mt-3 text-[10px] font-semibold tracking-[.16em] ${light ? 'text-black/40' : 'text-white/35'}`}>
          NEXT CHORD · SHOW NUMBER {targetNumber || '–'}
        </p>
        <div className={`mt-2 text-7xl font-black leading-none ${light ? 'text-[#191a18]' : 'text-white'}`}>{targetChord}</div>
        <p className={`mt-3 flex items-center justify-center gap-1.5 text-[11px] ${light ? 'text-black/45' : 'text-white/40'}`}>
          <Hand size={13} className="text-[#ff6b3d]" /> Show number {targetNumber || '–'} · it strums when recognition locks
        </p>
      </div>

      <div>
        <div className={`mb-1.5 flex items-center justify-between text-[9px] tracking-[.12em] ${light ? 'text-black/35' : 'text-white/30'}`}>
          <span>SONG PROGRESS</span><span>{Math.round(progress * 100)}%</span>
        </div>
        <div className={`h-1.5 w-full overflow-hidden rounded-full ${light ? 'bg-black/8' : 'bg-white/10'}`}>
          <div className="h-full rounded-full bg-[#ff6b3d] transition-[width]" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      </div>

      <button
        type="button"
        onClick={onStrum}
        className={`w-full rounded-xl px-4 py-3 text-left transition ${light ? 'bg-[#191a18] text-white hover:bg-black' : 'bg-white text-[#111] hover:bg-white/90'}`}
      >
        <strong className="block text-sm">Strum current chord</strong>
        <span className={`mt-0.5 block text-[10px] ${light ? 'text-white/55' : 'text-black/50'}`}>
          {mappedChord ? `Number ${fingerNumber} is mapped to ${mappedChord}` : `Current chord · ${chord}`}
        </span>
      </button>

      <button
        type="button"
        onClick={onToggleLoop}
        className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition ${playing ? 'border-[#ff6b3d] bg-[#ff6b3d] text-white' : light ? 'border-black/12 text-[#191a18] hover:border-[#ff6b3d]/50' : 'border-white/12 text-white hover:border-[#ff6b3d]/50'}`}
      >
        {playing ? <Square size={15} /> : <Play size={15} />}
        {playing ? 'Stop backing loop' : 'Start backing loop'}
      </button>

      <div className={`mt-auto rounded-xl border p-3 ${light ? 'border-black/8 bg-white' : 'border-white/10 bg-white/4'}`}>
        <span className={`flex items-center gap-1.5 text-[9px] tracking-[.14em] ${light ? 'text-black/35' : 'text-white/30'}`}>
          <i className="size-1.5 rounded-full bg-[#67e8c8]" /> LIVE FEEDBACK
        </span>
        <p className={`mt-1.5 text-[13px] ${light ? 'text-[#191a18]' : 'text-white'}`}>{feedback}</p>
        <p className={`mt-2 text-[10px] ${light ? 'text-black/35' : 'text-white/30'}`}>Keyboard 1–5 mirrors the camera gestures · Space plays the current chord</p>
      </div>
    </aside>
  )
}
