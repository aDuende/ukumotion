import { Activity, ArrowDown, ArrowLeft, Hand, Minus, Music2, Plus, Settings2, Sun, Moon } from 'lucide-react'
import { INSTRUMENTS, PICK_PATTERNS, type Instrument } from '../lib/music'

type Props = {
  theme: 'dark' | 'light'
  instrument: Instrument
  cameraActive: boolean
  handCount: number
  bpm: number
  settingsOpen: boolean
  onInstrumentChange: (instrument: Instrument) => void
  onStrum: () => void
  onPickPattern: () => void
  pickPatternId: string
  onPickPatternId: (id: string) => void
  onBpm: (bpm: number) => void
  onSettings: () => void
  onThemeChange: () => void
  onHome: () => void
}

export function ConsoleHeader({ theme, instrument, cameraActive, handCount, bpm, settingsOpen, onInstrumentChange, onStrum, onPickPattern, pickPatternId, onPickPatternId, onBpm, onSettings, onThemeChange, onHome }: Props) {
  const light = theme === 'light'
  return (
    <header className={`flex h-16 shrink-0 items-center gap-5 border-b px-4 backdrop-blur-2xl transition-colors lg:px-6 ${light ? 'border-black/8 bg-white/95 shadow-[0_8px_32px_rgba(25,26,24,.08)]' : 'border-white/10 bg-[#0d0e0d]/95 shadow-[0_8px_32px_rgba(0,0,0,.35)]'}`}>
      <button className={`grid size-8 shrink-0 place-items-center rounded-full border transition ${light ? 'border-black/8 text-black/40 hover:border-black/15 hover:bg-black/4 hover:text-black' : 'border-white/12 text-white/40 hover:border-white/25 hover:bg-white/8 hover:text-white'}`} type="button" onClick={onHome} title="Back to home" aria-label="Back to home">
        <ArrowLeft size={15} />
      </button>
      <div className="flex min-w-max items-center gap-3">
        <img className="size-9" src="/favicon.svg" alt="UKU Motion" />
        <div>
          <strong className={`block text-sm font-bold tracking-[.12em] ${light ? 'text-[#191a18]' : 'text-white'}`}>UKU MOTION</strong>
          <span className={`block text-[9px] tracking-[.12em] ${light ? 'text-black/35' : 'text-white/30'}`}>GESTURE MUSIC STUDIO</span>
        </div>
      </div>

      <div className={`hidden h-6 w-px sm:block ${light ? 'bg-black/8' : 'bg-white/10'}`} />

      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
        <label className={`flex h-9 min-w-36 items-center gap-2 rounded-md border px-2 text-[9px] tracking-wider ${light ? 'border-black/10 bg-[#f7f8f6] text-black/40' : 'border-white/10 bg-white/5 text-white/35'}`}>
          <span className="hidden xl:inline">INSTRUMENT</span>
          <select className={`min-w-0 flex-1 cursor-pointer appearance-none bg-transparent text-[11px] font-semibold outline-none ${light ? 'text-[#191a18]' : 'text-white'}`} value={instrument} onChange={(event) => onInstrumentChange(event.target.value as Instrument)} aria-label="Instrument">
            {(Object.keys(INSTRUMENTS) as Instrument[]).map((name) => <option key={name} value={name}>{INSTRUMENTS[name].name}</option>)}
          </select>
          <ArrowDown size={12} className="shrink-0 text-[#ff6b3d]" />
        </label>
        {(instrument === 'ukulele' || instrument === 'guitar') && (
          <>
            <button className={`flex h-9 min-w-max items-center gap-1.5 rounded-md border px-3 text-[10px] font-semibold transition ${light ? 'border-black/10 bg-white text-black/60 hover:border-[#ff6b3d]/40 hover:text-[#d94f28]' : 'border-white/10 bg-white/5 text-white/55 hover:border-[#ff6b3d]/40 hover:text-[#ff8a66]'}`} type="button" onClick={onStrum} title="Strum current chord"><Hand size={13} /> STRUM</button>
            <div className={`flex h-9 items-center overflow-hidden rounded-md border ${light ? 'border-black/10' : 'border-white/10'}`}>
              <label className="sr-only" htmlFor="pick-pattern-select">Pick pattern</label>
              <select
                id="pick-pattern-select"
                className={`h-full cursor-pointer appearance-none border-r px-2 text-[10px] font-semibold outline-none ${light ? 'border-black/10 bg-white text-[#191a18]' : 'border-white/10 bg-white/5 text-white'}`}
                value={pickPatternId}
                onChange={(event) => onPickPatternId(event.target.value)}
              >
                {Object.entries(PICK_PATTERNS).map(([id, def]) => (
                  <option key={id} value={id}>{def.label}</option>
                ))}
              </select>
              <button
                className={`flex h-full items-center gap-1 px-3 text-[10px] font-semibold transition ${light ? 'bg-white text-black/60 hover:text-[#d94f28]' : 'bg-white/5 text-white/55 hover:text-[#ff8a66]'}`}
                type="button"
                onClick={onPickPattern}
                title="Play selected pattern"
              >
                <Music2 size={13} /> PLAY
              </button>
            </div>
          </>
        )}
        <div className={`flex h-9 min-w-max items-center rounded-md border px-1 text-[9px] ${light ? 'border-black/10 bg-[#f7f8f6] text-black/40' : 'border-white/10 bg-white/5 text-white/35'}`}>
          <span className="ml-2 hidden xl:inline">TEMPO</span>
          <button className={`grid size-7 place-items-center rounded ${light ? 'hover:bg-black/5 hover:text-[#d94f28]' : 'hover:bg-white/8 hover:text-[#ff8a66]'}`} type="button" onClick={() => onBpm(Math.max(50, bpm - 2))} aria-label="Decrease tempo"><Minus size={12} /></button>
          <strong className={`w-7 text-center ${light ? 'text-[#d94f28]' : 'text-[#ff8a66]'}`}>{bpm}</strong>
          <button className={`grid size-7 place-items-center rounded ${light ? 'hover:bg-black/5 hover:text-[#d94f28]' : 'hover:bg-white/8 hover:text-[#ff8a66]'}`} type="button" onClick={() => onBpm(Math.min(160, bpm + 2))} aria-label="Increase tempo"><Plus size={12} /></button>
        </div>
      </div>

      <div className="hidden min-w-max items-center gap-4 lg:flex">
        <div className={`flex items-center gap-2 text-[9px] tracking-widest ${light ? 'text-black/35' : 'text-white/30'}`}>
          <Activity size={13} className="text-[#ff6b3d]" />
          LOCAL PROCESSING
        </div>
        <div className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] ${light ? 'border-black/8 bg-black/3 text-black/40' : 'border-white/10 bg-white/6 text-white/35'}`}>
          <Hand size={13} className={cameraActive ? 'text-[#67e8c8]' : ''} />
          {cameraActive ? `${handCount} HAND${handCount === 1 ? '' : 'S'} TRACKED` : 'CAMERA OFF'}
        </div>
      </div>
      <button className={`grid size-8 shrink-0 place-items-center rounded-full border transition ${light ? 'border-black/8 text-black/45 hover:bg-black/5 hover:text-[#d94f28]' : 'border-white/10 text-white/45 hover:bg-white/8 hover:text-[#ff8a66]'}`} type="button" onClick={onThemeChange} title={`Use ${light ? 'dark' : 'light'} mode`} aria-label={`Use ${light ? 'dark' : 'light'} mode`}>
        {light ? <Moon size={14} /> : <Sun size={14} />}
      </button>
      <button className={`grid size-8 shrink-0 place-items-center rounded-full border transition ${settingsOpen ? 'border-[#ff6b3d]/50 bg-[#ff6b3d]/15 text-[#ff7951]' : light ? 'border-black/8 text-black/45 hover:bg-black/5 hover:text-[#d94f28]' : 'border-white/10 text-white/45 hover:bg-white/8 hover:text-[#ff8a66]'}`} type="button" onClick={onSettings} title="Open play settings" aria-label="Open play settings" aria-expanded={settingsOpen} aria-controls="play-settings">
        <Settings2 size={14} />
      </button>
    </header>
  )
}
