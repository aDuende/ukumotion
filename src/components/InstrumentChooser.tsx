import type { CSSProperties } from 'react'
import { ArrowRight, AudioLines, Disc3, Drum, Guitar, Music2, Music3, Music4, Piano, Sparkles } from 'lucide-react'
import { INSTRUMENTS, type Instrument } from '../lib/music'
import { ThemeToggle } from './ThemeToggle'

type Props = {
  theme: 'dark' | 'light'
  onThemeChange: () => void
  onNavigate: (section: 'home' | 'generator' | 'courses') => void
  onSelect: (instrument: Instrument) => void
}

const OPTIONS: Array<{
  id: Instrument
  icon: typeof Music2
  number: string
  character: string
  description: string
  color: string
  glow: string
}> = [
  {
    id: 'ukulele',
    icon: Music2,
    number: '01',
    character: 'Bright & playful',
    description: 'A light four-string voice for crisp chords and quick rhythmic patterns.',
    color: '#ff7951',
    glow: 'rgba(255,107,61,.2)',
  },
  {
    id: 'guitar',
    icon: Guitar,
    number: '02',
    character: 'Warm & resonant',
    description: 'A full acoustic voice with a longer decay and a grounded, natural tone.',
    color: '#f4b860',
    glow: 'rgba(244,184,96,.18)',
  },
  {
    id: 'piano',
    icon: Piano,
    number: '03',
    character: 'Clear & expressive',
    description: 'A smooth keyboard voice for open harmony and gentle melodic movement.',
    color: '#67e8c8',
    glow: 'rgba(103,232,200,.16)',
  },
  {
    id: 'flute',
    icon: AudioLines,
    number: '04',
    character: 'Airy & light',
    description: 'A breathy melodic voice that floats above the rhythm.',
    color: '#8bd3ff',
    glow: 'rgba(139,211,255,.16)',
  },
  {
    id: 'violin',
    icon: Music4,
    number: '05',
    character: 'Warm & bowed',
    description: 'Expressive strings with a singing, sustained character.',
    color: '#e0a3ff',
    glow: 'rgba(224,163,255,.16)',
  },
  {
    id: 'saxophone',
    icon: Music3,
    number: '06',
    character: 'Smooth & soulful',
    description: 'A rounded reed tone with a warm, jazzy presence.',
    color: '#ffcf6b',
    glow: 'rgba(255,207,107,.18)',
  },
  {
    id: 'handpan',
    icon: Disc3,
    number: '07',
    character: 'Resonant & calm',
    description: 'A metallic, meditative pan with soft ringing overtones.',
    color: '#7ee0b8',
    glow: 'rgba(126,224,184,.16)',
  },
  {
    id: 'drums',
    icon: Drum,
    number: '08',
    character: 'Punchy & rhythmic',
    description: 'An acoustic kit — each gesture triggers a different drum piece.',
    color: '#ff8f6b',
    glow: 'rgba(255,143,107,.18)',
  },
]

export function InstrumentChooser({ theme, onThemeChange, onNavigate, onSelect }: Props) {
  const light = theme === 'light'
  return (
    <main className={`relative min-h-svh overflow-hidden px-5 py-6 transition-colors lg:px-8 ${light ? 'bg-[#f5f6f4] text-[#191a18]' : 'bg-[#080908] text-white'}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 flex h-1 gap-2 overflow-hidden opacity-80" aria-hidden="true">
        {Array.from({ length: 16 }, (_, index) => <i className={index % 5 === 0 ? 'min-w-16 flex-1 bg-[#67e8c8]' : index % 3 === 0 ? 'min-w-16 flex-1 bg-[#ff6b3d]' : 'min-w-16 flex-1 bg-white/15'} key={index} />)}
      </div>
      <div className={`pointer-events-none absolute left-1/2 top-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full border ${light ? 'border-black/[.05]' : 'border-white/[.035]'}`} />
      <div className={`pointer-events-none absolute left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border ${light ? 'border-black/[.035]' : 'border-white/[.025]'}`} />

      <header className="relative z-10 mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <button className="flex w-fit items-center gap-3 text-left" type="button" onClick={() => onNavigate('home')} aria-label="UKU Motion home">
          <img className="size-9 rounded-xl" src="/favicon.svg" alt="" />
          <div><strong className="block text-xs tracking-[.14em]">UKU MOTION</strong><span className={`text-[8px] tracking-[.14em] ${light ? 'text-black/35' : 'text-white/30'}`}>CHOOSE YOUR VOICE</span></div>
        </button>

        <nav className={`hidden items-center rounded-full border p-1.5 text-xs shadow-[0_12px_36px_rgba(0,0,0,.12)] backdrop-blur-2xl md:flex ${light ? 'border-black/10 bg-white/75 text-black/50' : 'border-white/14 bg-white/10 text-white/60'}`} aria-label="Main navigation">
          <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={() => onNavigate('home')}>Home</button>
          <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={() => onNavigate('generator')}>Generate Notes</button>
          <span className={`rounded-full px-5 py-2.5 font-medium ${light ? 'bg-black/8 text-[#191a18]' : 'bg-white/14 text-white'}`}>Instruments</span>
          <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={() => onNavigate('courses')}>Courses</button>
        </nav>

        <div className="ml-auto flex items-center gap-3"><span className={`hidden text-[9px] tracking-[.16em] sm:block ${light ? 'text-black/30' : 'text-white/25'}`}>STEP 01 / 02</span><ThemeToggle theme={theme} onToggle={onThemeChange} /></div>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-6xl flex-col justify-center py-16">
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-[9px] font-bold tracking-[.2em] text-[#67e8c8]"><Sparkles size={12} /> SELECT AN INSTRUMENT</div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">What do you want to <span className="font-['Georgia',serif] font-normal italic text-[#ff7951]">play?</span></h1>
          <p className={`mx-auto mt-4 max-w-lg text-sm leading-6 ${light ? 'text-black/45' : 'text-white/40'}`}>Each instrument responds to the same hand gestures with its own voice and character.</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OPTIONS.map(({ id, icon: Icon, number, character, description, color, glow }) => (
            <button
              className={`group relative min-h-64 overflow-hidden rounded-lg border p-6 text-left backdrop-blur-xl transition duration-300 hover:-translate-y-2 ${light ? 'border-black/8 bg-white/70 shadow-[0_24px_70px_rgba(25,26,24,.1)] hover:border-black/20' : 'border-white/10 bg-white/[.055] shadow-[0_24px_70px_rgba(0,0,0,.25)] hover:border-white/25'}`}
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              style={{ '--voice-color': color, '--voice-glow': glow } as CSSProperties}
            >
              <span className={`absolute right-5 top-2 text-7xl font-bold ${light ? 'text-black/[.04]' : 'text-white/[.035]'}`}>{number}</span>
              <div className="grid size-12 place-items-center rounded-full border border-[var(--voice-color)]/30 bg-[var(--voice-glow)] text-[var(--voice-color)] transition group-hover:scale-110"><Icon size={21} /></div>
              <div className="mt-12">
                <span className="text-[9px] font-bold tracking-[.16em] text-[var(--voice-color)]">{character.toUpperCase()}</span>
                <h2 className="mt-2 text-2xl font-semibold">{INSTRUMENTS[id].name}</h2>
                <p className={`mt-3 max-w-xs text-xs leading-6 ${light ? 'text-black/45' : 'text-white/40'}`}>{description}</p>
              </div>
              <div className={`mt-6 flex items-center justify-between border-t pt-4 text-[10px] font-bold transition ${light ? 'border-black/8 text-black/35 group-hover:text-black' : 'border-white/8 text-white/35 group-hover:text-white'}`}>
                SELECT & OPEN STUDIO <ArrowRight size={14} className="text-[var(--voice-color)] transition group-hover:translate-x-1" />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-[var(--voice-color)] transition duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </div>

        <div className={`mt-8 flex items-center justify-center gap-3 text-[9px] tracking-[.14em] ${light ? 'text-black/30' : 'text-white/25'}`}><span>CHOOSE</span><i className={`h-px w-12 ${light ? 'bg-black/10' : 'bg-white/10'}`} /><span>OPEN CAMERA</span><i className={`h-px w-12 ${light ? 'bg-black/10' : 'bg-white/10'}`} /><span>PLAY</span></div>
      </section>
    </main>
  )
}
