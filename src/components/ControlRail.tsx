import { SlidersHorizontal, Volume2, X } from 'lucide-react'
import { CHORDS, INSTRUMENTS, SCORE, type Chord, type Instrument } from '../lib/music'

type Props = {
  theme: 'dark' | 'light'
  instrument: Instrument
  chord: Chord
  lastAction: string
  volume: number
  bar: number
  onClose: () => void
  onChord: (chord: Chord) => void
  onVolume: (volume: number) => void
  onBar: (bar: number) => void
}

export function ControlRail({ theme, instrument, chord, lastAction, volume, bar, onClose, onChord, onVolume, onBar }: Props) {
  const light = theme === 'light'
  return (
    <aside id="play-settings" className={`relative z-10 flex h-svh w-full max-w-96 shrink-0 flex-col border-l transition-colors ${light ? 'border-black/8 bg-white shadow-[-16px_0_50px_rgba(25,26,24,.14)]' : 'border-white/10 bg-[#0d0e0d] shadow-[-20px_0_60px_rgba(0,0,0,.45)]'}`} role="dialog" aria-modal="true" aria-label="Play settings">
      <div className={`flex h-12 items-center justify-between border-b px-4 ${light ? 'border-black/8' : 'border-white/10'}`}>
        <div className={`flex items-center gap-2 text-xs font-bold ${light ? 'text-[#191a18]' : 'text-white'}`}><SlidersHorizontal size={15} className="text-[#ff6b3d]" /> PLAY CONTROLS</div>
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1.5 text-[9px] ${light ? 'text-black/35' : 'text-white/30'}`}><i className="size-1.5 rounded-full bg-[#67e8c8]" /> LIVE</span>
          <button className={`grid size-7 place-items-center rounded-full transition ${light ? 'text-black/35 hover:bg-black/5 hover:text-black' : 'text-white/35 hover:bg-white/8 hover:text-white'}`} type="button" onClick={onClose} aria-label="Close play settings" title="Close play settings"><X size={15} /></button>
        </div>
      </div>

      <div className={`flex items-center gap-4 border-b p-4 ${light ? 'border-black/8 bg-[#fffaf8]' : 'border-white/10 bg-[#ff6b3d]/6'}`}>
        <div className="min-w-20 text-6xl font-bold leading-none text-[#ff6b3d]">{chord}</div>
        <div className="min-w-0"><span className={`block text-[9px] tracking-[.12em] ${light ? 'text-black/35' : 'text-white/30'}`}>CURRENT CHORD</span><strong className={`mt-1 block text-sm ${light ? 'text-[#191a18]' : 'text-white'}`}>{INSTRUMENTS[instrument].name}</strong><p className={`mt-1 truncate text-[9px] ${light ? 'text-black/35' : 'text-white/30'}`}>{lastAction}</p></div>
      </div>

      <div className={`border-b p-4 ${light ? 'border-black/8' : 'border-white/10'}`}>
        <div className="mb-3 flex items-center justify-between"><strong className={`text-[11px] ${light ? 'text-black/65' : 'text-white/65'}`}>CHORDS</strong><span className={`text-[9px] ${light ? 'text-black/30' : 'text-white/25'}`}>KEYS 1–5</span></div>
        <div className="grid grid-cols-5 gap-1.5">
          {CHORDS.map((name) => <button className={`aspect-square rounded-md border text-[10px] font-bold transition ${chord === name ? 'border-[#ff6b3d] bg-[#ff6b3d] text-white' : light ? 'border-black/8 bg-[#fafbf9] text-black/45 hover:border-[#ff6b3d]/40 hover:text-[#d94f28]' : 'border-white/10 bg-white/4 text-white/40 hover:border-[#ff6b3d]/40 hover:text-[#ff8a66]'}`} key={name} type="button" onClick={() => onChord(name)}>{name}</button>)}
        </div>
      </div>

      <div className={`border-b p-4 ${light ? 'border-black/8' : 'border-white/10'}`}>
        <div className="mb-2 flex items-center justify-between text-[10px]"><span className={`flex items-center gap-2 ${light ? 'text-black/45' : 'text-white/40'}`}><Volume2 size={14} /> OUTPUT VOLUME</span><strong className={light ? 'text-[#d94f28]' : 'text-[#ff8a66]'}>{Math.round(volume * 100)}%</strong></div>
        <input className="h-1 w-full cursor-pointer accent-[#ff6b3d]" aria-label="Output volume" type="range" min="0" max="1" step=".02" value={volume} onChange={(event) => onVolume(Number(event.target.value))} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="mb-3 flex items-center justify-between"><strong className={`text-[11px] ${light ? 'text-black/65' : 'text-white/65'}`}>PRACTICE BARS</strong><span className={`text-[9px] ${light ? 'text-black/30' : 'text-white/25'}`}>8 BARS</span></div>
        <div className="space-y-1">
          {SCORE.map((name, index) => <button className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition ${bar === index ? light ? 'bg-[#fff0eb] text-[#191a18]' : 'bg-[#ff6b3d]/14 text-white' : light ? 'text-black/30 hover:bg-black/3 hover:text-black/55' : 'text-white/25 hover:bg-white/5 hover:text-white/55'}`} key={`${name}-${index}`} type="button" onClick={() => onBar(index)}><span className="text-[8px]">{String(index + 1).padStart(2, '0')}</span><strong className={`w-8 text-lg ${bar === index ? light ? 'text-[#ff6b3d]' : 'text-[#ff7951]' : ''}`}>{name}</strong><span className="text-[8px]">↓ · ↓↑ · ↑↓↑</span></button>)}
        </div>
      </div>
    </aside>
  )
}
