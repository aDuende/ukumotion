import type { CSSProperties } from 'react'
import {
  ArrowRight,
  AudioLines,
  Disc3,
  Drum,
  Ear,
  Guitar,
  HandHeart,
  Heart,
  MapPin,
  Music2,
  Music3,
  Music4,
  Piano,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

type Props = {
  theme: 'dark' | 'light'
  onThemeChange: () => void
  onHome: () => void
  onGenerateNotes: () => void
  onChooseInstrument: () => void
  onCourses: () => void
}

type Instrument = {
  icon: typeof Music2
  label: string
  detail: string
  color: string
  glow: string
}

const INSTRUMENTS: Instrument[] = [
  { icon: Guitar, label: 'Guitar', detail: 'Acoustic & electric — chords, strumming and fingerstyle.', color: '#f4b860', glow: 'rgba(244,184,96,.18)' },
  { icon: Music2, label: 'Ukulele', detail: 'Friendly four-string starts for players of every age.', color: '#ff7951', glow: 'rgba(255,107,61,.2)' },
  { icon: Piano, label: 'Piano', detail: 'Technique, theory and repertoire at our in-studio grands.', color: '#67e8c8', glow: 'rgba(103,232,200,.16)' },
  { icon: Music4, label: 'Violin', detail: 'Bowing, posture and intonation with hands-on coaching.', color: '#e0a3ff', glow: 'rgba(224,163,255,.16)' },
  { icon: Music3, label: 'Saxophone', detail: 'Breath, embouchure and tone in dedicated wind rooms.', color: '#ffcf6b', glow: 'rgba(255,207,107,.18)' },
  { icon: AudioLines, label: 'Flute', detail: 'A light, singing voice guided breath by breath.', color: '#8bd3ff', glow: 'rgba(139,211,255,.16)' },
  { icon: Disc3, label: 'Handpan', detail: 'Meditative, resonant playing in a calm practice space.', color: '#7ee0b8', glow: 'rgba(126,224,184,.16)' },
  { icon: Drum, label: 'Drums', detail: 'Groove, timing and coordination on a full acoustic kit.', color: '#ff8f6b', glow: 'rgba(255,143,107,.18)' },
]

const METHOD = [
  { icon: Ear, title: 'Listen first', body: 'Every lesson starts with the ear. We train you to hear rhythm, pitch and tone before you ever read a page.' },
  { icon: HandHeart, title: 'Play from day one', body: 'You hold the instrument in your very first session. Real playing, real sound — no waiting months for theory.' },
  { icon: Users, title: 'One-to-one mentoring', body: 'Small classes and private lessons mean a mentor watches your hands and adjusts to how you learn.' },
  { icon: Target, title: 'Clear milestones', body: 'A simple roadmap for each instrument keeps progress visible — from first note to your first performance.' },
]

const STATS = [
  { value: '12+', label: 'Years teaching on-site' },
  { value: '8', label: 'Instruments taught' },
  { value: '20+', label: 'Practice & lesson rooms' },
  { value: '3,000+', label: 'Students guided' },
]

function InstrumentCard({ item, light }: { item: Instrument; light: boolean }) {
  const { icon: Icon, label, detail, color, glow } = item
  return (
    <article
      className={`group flex flex-col rounded-xl border p-5 transition duration-300 hover:-translate-y-1.5 ${light ? 'border-black/8 bg-white/75 shadow-[0_20px_60px_rgba(25,26,24,.08)] hover:border-black/20' : 'border-white/10 bg-white/[.055] shadow-[0_20px_60px_rgba(0,0,0,.25)] hover:border-white/25'}`}
      style={{ '--voice-color': color } as CSSProperties}
    >
      <div className="grid size-12 place-items-center rounded-full border border-[var(--voice-color)]/30 text-[var(--voice-color)] transition group-hover:scale-110" style={{ backgroundImage: `linear-gradient(135deg, ${glow}, transparent 70%)` }}>
        <Icon size={22} />
      </div>
      <h3 className="mt-4 text-base font-semibold">{label}</h3>
      <p className={`mt-1.5 text-xs leading-6 ${light ? 'text-black/45' : 'text-white/40'}`}>{detail}</p>
    </article>
  )
}

export function AboutPage({ theme, onThemeChange, onHome, onGenerateNotes, onChooseInstrument, onCourses }: Props) {
  const light = theme === 'light'
  return (
    <main className={`relative min-h-svh overflow-hidden px-5 py-6 transition-colors lg:px-8 ${light ? 'bg-[#f5f6f4] text-[#191a18]' : 'bg-[#080908] text-white'}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 flex h-1 gap-2 overflow-hidden opacity-80" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => <i className={index % 5 === 0 ? 'min-w-16 flex-1 bg-[#67e8c8]' : index % 3 === 0 ? 'min-w-16 flex-1 bg-[#ff6b3d]' : 'min-w-16 flex-1 bg-white/15'} key={index} />)}
      </div>

      <header className="relative z-10 mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <button className="flex w-fit items-center gap-3 text-left" type="button" onClick={onHome} aria-label="UKU Motion home">
          <img className="size-9 rounded-xl" src="/favicon.svg" alt="" />
          <div><strong className="block text-xs tracking-[.14em]">UKU MOTION</strong><span className={`text-[8px] tracking-[.14em] ${light ? 'text-black/35' : 'text-white/30'}`}>MUSIC INSTITUTE</span></div>
        </button>

        <nav className={`hidden items-center rounded-full border p-1.5 text-xs shadow-[0_12px_36px_rgba(0,0,0,.12)] backdrop-blur-2xl md:flex ${light ? 'border-black/10 bg-white/75 text-black/50' : 'border-white/14 bg-white/10 text-white/60'}`} aria-label="Main navigation">
          <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={onHome}>Home</button>
          <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={onGenerateNotes}>Generate Notes</button>
          <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={onChooseInstrument}>Instruments</button>
          <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={onCourses}>Courses</button>
          <span className={`rounded-full px-5 py-2.5 font-medium ${light ? 'bg-black/8 text-[#191a18]' : 'bg-white/14 text-white'}`}>About</span>
        </nav>

        <div className="ml-auto flex items-center gap-3"><span className={`hidden text-[9px] tracking-[.16em] sm:block ${light ? 'text-black/30' : 'text-white/25'}`}>ON-SITE INSTITUTE</span><ThemeToggle theme={theme} onToggle={onThemeChange} /></div>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl">
        {/* Hero */}
        <div className="py-14 text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-[9px] font-bold tracking-[.2em] text-[#67e8c8]"><Sparkles size={12} /> WHO WE ARE</div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">A place to <span className="font-['Georgia',serif] font-normal italic text-[#ff7951]">learn music.</span></h1>
          <p className={`mx-auto mt-5 max-w-2xl text-sm leading-7 ${light ? 'text-black/50' : 'text-white/45'}`}>
            UKU Motion is an on-site music institute where students of every age learn to play a real instrument in real rooms, guided face-to-face by working musicians. We pair patient, hands-on teaching with a warm, creative space so that playing music feels natural from the very first lesson.
          </p>
          <div className={`mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-medium ${light ? 'border-black/10 bg-white/70 text-black/55' : 'border-white/12 bg-white/[.06] text-white/55'}`}>
            <MapPin size={13} className="text-[#ff6b3d]" /> Learn in person at our studios — welcoming beginners and returning players alike.
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className={`rounded-xl border p-5 text-center ${light ? 'border-black/8 bg-white/70' : 'border-white/10 bg-white/[.05]'}`}>
              <div className="text-3xl font-bold text-[#ff7951]">{stat.value}</div>
              <div className={`mt-1 text-[11px] font-medium leading-5 ${light ? 'text-black/45' : 'text-white/40'}`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our story */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[9px] font-bold tracking-[.2em] text-[#67e8c8]"><Heart size={12} /> OUR STORY</div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Music, taught by people who play it every day.</h2>
            <p className={`mt-4 text-sm leading-7 ${light ? 'text-black/50' : 'text-white/45'}`}>
              We started as a small circle of performing musicians who wanted a better way to teach — one that keeps the joy of playing at the centre. Today our institute brings together mentors across strings, keys, wind and percussion under one roof.
            </p>
            <p className={`mt-3 text-sm leading-7 ${light ? 'text-black/50' : 'text-white/45'}`}>
              Every teacher here is an active player. That means the guidance you get isn't just theory from a book — it's practical craft, passed on the way music has always been shared: person to person.
            </p>
          </div>
          <div className={`overflow-hidden rounded-2xl border p-8 ${light ? 'border-black/8 bg-white/70 shadow-[0_24px_70px_rgba(25,26,24,.08)]' : 'border-white/10 bg-white/[.05] shadow-[0_24px_70px_rgba(0,0,0,.25)]'}`}>
            <blockquote className={`text-lg font-medium leading-8 ${light ? 'text-black/70' : 'text-white/75'}`}>
              “We don't just teach notes. We help people find their own voice on an instrument — patiently, one lesson at a time.”
            </blockquote>
            <div className={`mt-5 flex items-center gap-3 border-t pt-5 ${light ? 'border-black/8' : 'border-white/8'}`}>
              <span className="grid size-10 place-items-center rounded-full bg-[#ff6b3d]/12 text-[#ff6b3d]"><Music2 size={18} /></span>
              <div>
                <div className="text-sm font-semibold">The UKU Motion Faculty</div>
                <div className={`text-[11px] ${light ? 'text-black/40' : 'text-white/35'}`}>Performing musicians & mentors</div>
              </div>
            </div>
          </div>
        </div>

        {/* How we teach */}
        <div className="mt-20">
          <div className="mb-6 text-center">
            <div className="mb-3 flex items-center justify-center gap-2 text-[9px] font-bold tracking-[.2em] text-[#67e8c8]"><Target size={12} /> HOW WE TEACH</div>
            <h2 className="text-2xl font-semibold sm:text-3xl">A hands-on method built around <span className="font-['Georgia',serif] font-normal italic text-[#ff7951]">playing.</span></h2>
            <p className={`mx-auto mt-3 max-w-xl text-sm leading-6 ${light ? 'text-black/45' : 'text-white/40'}`}>Our on-site lessons follow four simple principles that keep you motivated and moving forward.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {METHOD.map(({ icon: Icon, title, body }) => (
              <article key={title} className={`flex flex-col rounded-xl border p-5 ${light ? 'border-black/8 bg-white/70' : 'border-white/10 bg-white/[.05]'}`}>
                <span className="grid size-11 place-items-center rounded-lg bg-[#ff6b3d]/12 text-[#ff6b3d]"><Icon size={20} /></span>
                <h3 className="mt-4 text-sm font-semibold">{title}</h3>
                <p className={`mt-1.5 text-xs leading-6 ${light ? 'text-black/45' : 'text-white/40'}`}>{body}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Instruments we teach */}
        <div className="mt-20">
          <div className="mb-6 text-center">
            <div className="mb-3 flex items-center justify-center gap-2 text-[9px] font-bold tracking-[.2em] text-[#67e8c8]"><Music3 size={12} /> WHAT WE TEACH</div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Instruments under our roof</h2>
            <p className={`mx-auto mt-3 max-w-xl text-sm leading-6 ${light ? 'text-black/45' : 'text-white/40'}`}>Dedicated rooms and mentors for each instrument — pick the voice that calls to you.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {INSTRUMENTS.map((item) => <InstrumentCard key={item.label} item={item} light={light} />)}
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-20 mb-8 overflow-hidden rounded-2xl border p-8 text-center sm:p-12 ${light ? 'border-black/8 bg-white/70 shadow-[0_24px_70px_rgba(25,26,24,.08)]' : 'border-white/10 bg-white/[.05] shadow-[0_24px_70px_rgba(0,0,0,.25)]'}`}>
          <h2 className="text-2xl font-semibold sm:text-3xl">Come and make some noise.</h2>
          <p className={`mx-auto mt-3 max-w-lg text-sm leading-6 ${light ? 'text-black/45' : 'text-white/40'}`}>Visit us on-site to meet a mentor and try your instrument, or explore our online courses to get a feel for how we teach.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={onChooseInstrument} className="flex items-center gap-2 rounded-full bg-[#ff6b3d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff7951]">
              Explore instruments <ArrowRight size={16} />
            </button>
            <button type="button" onClick={onCourses} className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition ${light ? 'border-black/12 text-black/70 hover:border-black/25' : 'border-white/15 text-white/75 hover:border-white/30'}`}>
              Browse courses
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
