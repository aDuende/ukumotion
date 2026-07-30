import { Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import { SCORE } from '../lib/music'

type Props = { theme: 'dark' | 'light'; bar: number; playing: boolean; onToggle: () => void; onBar: (bar: number) => void }

export function TransportBar({ theme, bar, playing, onToggle, onBar }: Props) {
  const light = theme === 'light'
  return (
    <footer className={`flex min-h-18 shrink-0 flex-col justify-center gap-2 border-t px-4 transition-colors sm:px-6 ${light ? 'border-black/8 bg-white/98 shadow-[0_-6px_24px_rgba(25,26,24,.05)]' : 'border-white/10 bg-[#0d0e0d]/98 shadow-[0_-8px_28px_rgba(0,0,0,.3)]'}`}>
      <div className={`flex items-center gap-3 text-[8px] ${light ? 'text-black/30' : 'text-white/25'}`}><span>BAR {bar + 1}</span><div className={`h-1 flex-1 overflow-hidden rounded-full ${light ? 'bg-black/6' : 'bg-white/8'}`}><i className="block h-full rounded-full bg-[#ff6b3d] transition-all" style={{ width: `${((bar + 1) / SCORE.length) * 100}%` }} /></div><span>{SCORE.length} BARS</span></div>
      <div className="flex items-center justify-between gap-3">
        <div className={`hidden text-[9px] sm:block ${light ? 'text-black/30' : 'text-white/25'}`}>BAR NAVIGATION</div>
        <div className="flex items-center gap-2"><button className={`grid size-8 place-items-center rounded-full border ${light ? 'border-black/8 text-black/40 hover:border-[#ff6b3d]/30 hover:text-[#d94f28]' : 'border-white/10 text-white/40 hover:border-[#ff6b3d]/40 hover:text-[#ff8a66]'}`} type="button" onClick={() => onBar(Math.max(0, bar - 1))} aria-label="Previous bar"><SkipBack size={14} /></button><button className="grid size-11 place-items-center rounded-full bg-[#ff6b3d] text-white shadow-[0_5px_22px_rgba(255,107,61,.3)] hover:bg-[#ff7951]" type="button" onClick={onToggle} aria-label={playing ? 'Pause' : 'Play'}>{playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}</button><button className={`grid size-8 place-items-center rounded-full border ${light ? 'border-black/8 text-black/40 hover:border-[#ff6b3d]/30 hover:text-[#d94f28]' : 'border-white/10 text-white/40 hover:border-[#ff6b3d]/40 hover:text-[#ff8a66]'}`} type="button" onClick={() => onBar(Math.min(SCORE.length - 1, bar + 1))} aria-label="Next bar"><SkipForward size={14} /></button></div>
        <div className={`hidden text-[9px] sm:block ${light ? 'text-black/30' : 'text-white/25'}`}>SPACE TO STRUM</div>
      </div>
    </footer>
  )
}
