import { useState } from 'react'
import { ArrowRight, Link2, Music2, Sparkles, WandSparkles } from 'lucide-react'
import type { Instrument } from '../lib/music'
import { ThemeToggle } from './ThemeToggle'

type Props = {
  theme: 'dark' | 'light'
  onThemeChange: () => void
  onHome: () => void
  onChooseInstrument: () => void
  onCourses: () => void
  onAbout: () => void
}

type Difficulty = 'Easy' | 'Intermediate' | 'Advanced'

const PATTERNS: Partial<Record<Instrument, string[]>> = {
  ukulele: ['A|--0---0---3---2--|', 'E|--0---1---0---3--|', 'C|--0---0---0---2--|', 'G|--0---2---0---0--|'],
  guitar: ['e|-------0-------0--|', 'B|-----1---1---1----|', 'G|---0-------2------|', 'D|---------2--------|', 'A|-3----------------|', 'E|------------------|'],
  piano: ['RH| C4  E4  G4  E4 | A3  C4  E4  C4 |', 'LH| C3------G2------| A2------E2------|'],
}

const GENERIC_PATTERN = ['| C4  E4  G4  E4 | A3  C4  E4  C4 |', '| F3  A3  C4  A3 | G3  B3  D4  B3 |']

export function NoteGenerator({ theme, onThemeChange, onHome, onChooseInstrument, onCourses, onAbout }: Props) {
  const light = theme === 'light'
  const [source, setSource] = useState('')
  const [instrument, setInstrument] = useState<Instrument>('guitar')
  const [style, setStyle] = useState('Fingerstyle')
  const [difficulty, setDifficulty] = useState<Difficulty>('Intermediate')
  const [result, setResult] = useState<string[] | null>(null)

  const generate = () => {
    if (!source.trim()) return
    setResult(PATTERNS[instrument] ?? GENERIC_PATTERN)
  }

  return (
    <main className={`relative min-h-svh overflow-hidden px-5 py-6 transition-colors lg:px-8 ${light ? 'bg-[#f5f6f4] text-[#191a18]' : 'bg-[#080908] text-white'}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 flex h-1 gap-2 overflow-hidden opacity-80" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => <i className={index % 5 === 0 ? 'min-w-16 flex-1 bg-[#67e8c8]' : index % 3 === 0 ? 'min-w-16 flex-1 bg-[#ff6b3d]' : 'min-w-16 flex-1 bg-white/15'} key={index} />)}
      </div>

      <header className="relative z-10 mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <button className="flex w-fit items-center gap-3 text-left" type="button" onClick={onHome} aria-label="UKU Motion home">
          <img className="size-9 rounded-xl" src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" />
          <div><strong className="block text-xs tracking-[.14em]">UKU MOTION</strong><span className={`text-[8px] tracking-[.14em] ${light ? 'text-black/35' : 'text-white/30'}`}>GESTURE MUSIC STUDIO</span></div>
        </button>
        <nav className={`hidden items-center rounded-full border p-1.5 text-xs shadow-[0_12px_36px_rgba(0,0,0,.12)] backdrop-blur-2xl md:flex ${light ? 'border-black/10 bg-white/75 text-black/50' : 'border-white/14 bg-white/10 text-white/60'}`} aria-label="Main navigation">
          <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={onHome}>Home</button>
          <span className={`rounded-full px-5 py-2.5 font-medium ${light ? 'bg-black/8 text-[#191a18]' : 'bg-white/14 text-white'}`}>Generate Notes</span>
          <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={onChooseInstrument}>Instruments</button>
          <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={onCourses}>Courses</button>
          <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={onAbout}>About</button>
        </nav>
        <div className="ml-auto flex items-center gap-3"><span className={`hidden text-[9px] tracking-[.16em] sm:block ${light ? 'text-black/30' : 'text-white/25'}`}>AI ARRANGER · BETA</span><ThemeToggle theme={theme} onToggle={onThemeChange} /></div>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100svh-5rem)] max-w-6xl gap-10 py-16 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] text-[#67e8c8]"><Sparkles size={12} /> SONG TO PLAYABLE TAB</div>
          <h1 className="mt-5 text-5xl font-bold leading-[.92] tracking-tight sm:text-7xl">Generate your <span className="font-['Georgia',serif] font-normal italic text-[#ff7951]">note paper.</span></h1>
          <p className={`mt-6 max-w-md text-sm leading-7 ${light ? 'text-black/48' : 'text-white/45'}`}>Paste a song URL or enter a song name. Choose how you want to play it, then create an instrument-ready arrangement.</p>
          <div className={`mt-8 flex items-center gap-3 text-[10px] tracking-[.12em] ${light ? 'text-black/35' : 'text-white/25'}`}><Link2 size={14} className="text-[#ff7951]" /> URL OR SONG <i className={`h-px flex-1 ${light ? 'bg-black/10' : 'bg-white/10'}`} /> <WandSparkles size={14} className="text-[#48bfa4]" /> PLAYABLE TAB</div>
        </div>

        <div className={`rounded-lg border p-5 backdrop-blur-2xl sm:p-7 ${light ? 'border-black/8 bg-white/75 shadow-[0_30px_90px_rgba(25,26,24,.1)]' : 'border-white/10 bg-white/[.055] shadow-[0_30px_90px_rgba(0,0,0,.35)]'}`}>
          <label className={`text-[10px] font-bold tracking-[.14em] ${light ? 'text-black/50' : 'text-white/40'}`} htmlFor="song-source">SONG NAME OR URL</label>
          <div className={`mt-3 flex items-center gap-3 rounded-md border px-4 focus-within:border-[#ff7951]/60 ${light ? 'border-black/10 bg-[#f5f6f4]' : 'border-white/12 bg-black/25'}`}>
            <Link2 size={17} className={`shrink-0 ${light ? 'text-black/30' : 'text-white/30'}`} />
            <input id="song-source" className={`h-14 min-w-0 flex-1 bg-transparent text-sm outline-none ${light ? 'text-[#191a18] placeholder:text-black/25' : 'text-white placeholder:text-white/20'}`} placeholder="e.g. Blackbird or paste a YouTube link" value={source} onChange={(event) => setSource(event.target.value)} />
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {([['INSTRUMENT', instrument, (value: string) => setInstrument(value as Instrument), ['guitar', 'ukulele', 'piano']], ['STYLE', style, setStyle, ['Fingerstyle', 'Chords', 'Melody']], ['LEVEL', difficulty, (value: string) => setDifficulty(value as Difficulty), ['Easy', 'Intermediate', 'Advanced']]] as const).map(([label, value, update, options]) => <label className={`text-[10px] font-bold tracking-[.12em] ${light ? 'text-black/50' : 'text-white/40'}`} key={label}>{label}<select className={`mt-2 h-11 w-full rounded-md border px-3 text-xs outline-none ${light ? 'border-black/10 bg-[#f5f6f4] text-[#191a18]' : 'border-white/12 bg-[#161816] text-white'}`} value={value} onChange={(event) => update(event.target.value)}>{options.map((option) => <option value={option} key={option}>{option === 'guitar' ? 'Guitar' : option === 'ukulele' ? 'Ukulele' : option === 'piano' ? 'Piano' : option}</option>)}</select></label>)}
          </div>

          <button className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#ff6b3d] text-sm font-bold transition hover:bg-[#ff7951] disabled:cursor-not-allowed disabled:opacity-40" type="button" disabled={!source.trim()} onClick={generate}><WandSparkles size={17} /> Generate arrangement <ArrowRight size={16} /></button>

          {result ? (
            <div className={`mt-6 border-t pt-6 ${light ? 'border-black/8' : 'border-white/10'}`}>
              <div className="flex items-end justify-between gap-4"><div><span className="text-[9px] font-bold tracking-[.15em] text-[#48bfa4]">GENERATED DRAFT</span><h2 className="mt-1 text-xl font-semibold">{source}</h2></div><span className={`text-right text-[9px] uppercase tracking-[.12em] ${light ? 'text-black/35' : 'text-white/30'}`}>{style}<br />{difficulty}</span></div>
              <pre className={`mt-5 overflow-x-auto rounded-md border p-4 font-mono text-xs leading-7 ${light ? 'border-black/8 bg-[#191a18] text-[#e9f0eb]' : 'border-white/8 bg-black/35 text-[#d8e4dc]'}`}>{result.join('\n')}</pre>
              <div className={`mt-4 flex items-center gap-2 text-[10px] ${light ? 'text-black/35' : 'text-white/30'}`}><Music2 size={13} /> Draft arrangement for practice; review tuning and timing before performance.</div>
            </div>
          ) : <div className={`mt-6 grid min-h-36 place-items-center rounded-md border border-dashed text-center text-xs ${light ? 'border-black/10 text-black/25' : 'border-white/10 text-white/20'}`}>Your generated tab will appear here</div>}
        </div>
      </section>
    </main>
  )
}