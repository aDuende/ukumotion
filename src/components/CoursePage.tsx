import { useEffect, useRef, useState, type CSSProperties } from 'react'
import {
  ArrowRight,
  AudioLines,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Clapperboard,
  Clock,
  Flame,
  Guitar,
  Layers,
  Music2,
  Music3,
  Music4,
  Piano,
  Play,
  Sparkles,
} from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

type Props = {
  theme: 'dark' | 'light'
  onThemeChange: () => void
  onHome: () => void
  onGenerateNotes: () => void
  onChooseInstrument: () => void
  onAbout: () => void
}

type Family = 'Strings' | 'Keys' | 'Wind'

type Voice = 'guitar' | 'ukulele' | 'piano' | 'violin' | 'saxophone' | 'flute'

type CourseItem = {
  id: string
  title: string
  desc: string
  family: Family
  voice: Voice
  meta: string
  views?: string
  url?: string
  thumbnail?: string
}

const VOICE_STYLE: Record<Voice, { icon: typeof Music2; label: string; color: string; glow: string }> = {
  guitar: { icon: Guitar, label: 'Guitar', color: '#f4b860', glow: 'rgba(244,184,96,.18)' },
  ukulele: { icon: Music2, label: 'Ukulele', color: '#ff7951', glow: 'rgba(255,107,61,.2)' },
  piano: { icon: Piano, label: 'Piano', color: '#67e8c8', glow: 'rgba(103,232,200,.16)' },
  violin: { icon: Music4, label: 'Violin', color: '#e0a3ff', glow: 'rgba(224,163,255,.16)' },
  saxophone: { icon: Music3, label: 'Saxophone', color: '#ffcf6b', glow: 'rgba(255,207,107,.18)' },
  flute: { icon: AudioLines, label: 'Flute', color: '#8bd3ff', glow: 'rgba(139,211,255,.16)' },
}

const FILTERS: Array<'All' | Voice> = ['All', 'guitar', 'ukulele', 'piano', 'violin', 'saxophone', 'flute']

const NEW_COURSES: CourseItem[] = [
  { id: 'nc-guitar', title: 'Guitar Fundamentals', desc: 'Learn open chords, clean strumming and your first songs.', family: 'Strings', voice: 'guitar', meta: '4h 30m', url: 'https://youtu.be/Gi8vnuWaCzY', thumbnail: 'https://img.youtube.com/vi/Gi8vnuWaCzY/mqdefault.jpg' },
  { id: 'nc-ukulele', title: 'Ukulele Quickstart', desc: 'Four strings, endless fun — play a real song this weekend.', family: 'Strings', voice: 'ukulele', meta: '2h 10m', url: 'https://youtu.be/5bTE5fbxDsc', thumbnail: 'https://img.youtube.com/vi/5bTE5fbxDsc/mqdefault.jpg' },
  { id: 'nc-piano', title: 'Piano Foundations', desc: 'Posture, hand position and reading your first notes.', family: 'Keys', voice: 'piano', meta: '3h 45m', url: 'https://youtu.be/1HFgmhFEzcM', thumbnail: 'https://img.youtube.com/vi/1HFgmhFEzcM/mqdefault.jpg' },
  { id: 'nc-violin', title: 'Violin First Steps', desc: 'Bow hold, posture and clean, ringing open strings.', family: 'Strings', voice: 'violin', meta: '3h 15m', url: 'https://youtu.be/vlHpWvsW040', thumbnail: 'https://img.youtube.com/vi/vlHpWvsW040/mqdefault.jpg' },
  { id: 'nc-sax', title: 'Saxophone Basics', desc: 'Embouchure, breath control and your first warm tone.', family: 'Wind', voice: 'saxophone', meta: '2h 55m', url: 'https://youtu.be/ALNObcGkI6I', thumbnail: 'https://img.youtube.com/vi/ALNObcGkI6I/mqdefault.jpg' },
]

const QUICK_BITES: CourseItem[] = [
  { id: 'qb-tune', title: 'Tune Your Guitar in 60 Seconds', desc: 'The fastest reliable way to tune by ear.', family: 'Strings', voice: 'guitar', meta: '1 min', views: '128K' },
  { id: 'qb-strum', title: '3 Must-Know Ukulele Strums', desc: 'Instantly sound better with these patterns.', family: 'Strings', voice: 'ukulele', meta: '4 min', views: '54K' },
  { id: 'qb-hand', title: 'Perfect Piano Hand Position', desc: 'Relax your wrists and play with control.', family: 'Keys', voice: 'piano', meta: '6 min', views: '33K' },
  { id: 'qb-vibrato', title: 'Violin Vibrato Basics', desc: 'Your first steps to a singing tone.', family: 'Strings', voice: 'violin', meta: '5 min', views: '21K' },
  { id: 'qb-embouchure', title: 'Saxophone Embouchure 101', desc: 'Shape your mouth for a clean, full sound.', family: 'Wind', voice: 'saxophone', meta: '3 min', views: '44K' },
  { id: 'qb-read', title: 'Read Sheet Music Fast', desc: 'A simple trick to name any note quickly.', family: 'Wind', voice: 'flute', meta: '8 min', views: '61K' },
]

const SERIES: CourseItem[] = [
  { id: 'sr-guitar', title: 'The Complete Guitar Journey', desc: 'From first chord to full songs, step by step.', family: 'Strings', voice: 'guitar', meta: '6 modules · 18 videos' },
  { id: 'sr-ukulele', title: 'Ukulele Mastery Series', desc: 'Strumming, picking and performance confidence.', family: 'Strings', voice: 'ukulele', meta: '4 modules · 12 videos' },
  { id: 'sr-piano', title: 'Piano From Scratch', desc: 'Build real technique with a clear roadmap.', family: 'Keys', voice: 'piano', meta: '5 modules · 15 videos' },
  { id: 'sr-violin', title: 'Bowing Technique Series', desc: 'Master smooth, even and expressive bowing.', family: 'Strings', voice: 'violin', meta: '3 modules · 9 videos' },
]

const FULL_LESSONS: CourseItem[] = [
  { id: 'fl-fingerstyle', title: 'Fingerstyle Guitar — Full Course', desc: 'Independent fingers, patterns and arrangements.', family: 'Strings', voice: 'guitar', meta: '5h 20m', url: 'https://youtu.be/Gi8vnuWaCzY', thumbnail: 'https://img.youtube.com/vi/Gi8vnuWaCzY/mqdefault.jpg' },
  { id: 'fl-jazz', title: 'Jazz Piano Complete', desc: 'Voicings, comping and improvisation from the ground up.', family: 'Keys', voice: 'piano', meta: '6h 00m', url: 'https://youtu.be/1HFgmhFEzcM', thumbnail: 'https://img.youtube.com/vi/1HFgmhFEzcM/mqdefault.jpg' },
  { id: 'fl-sax', title: 'Saxophone for Beginners', desc: 'Everything you need for your first months.', family: 'Wind', voice: 'saxophone', meta: '4h 15m', url: 'https://youtu.be/ALNObcGkI6I', thumbnail: 'https://img.youtube.com/vi/ALNObcGkI6I/mqdefault.jpg' },
  { id: 'fl-violin', title: 'Violin Intermediate', desc: 'Shifting, vibrato and cleaner intonation.', family: 'Strings', voice: 'violin', meta: '4h 40m', url: 'https://youtu.be/vlHpWvsW040', thumbnail: 'https://img.youtube.com/vi/vlHpWvsW040/mqdefault.jpg' },
]

function getYouTubeId(url?: string): string | null {
  if (!url) return null
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)
  return match ? match[1] : null
}

function CoursePlayer({ item, light, onBack }: { item: CourseItem; light: boolean; onBack: () => void }) {
  const { icon: Icon, label, color } = VOICE_STYLE[item.voice]
  const videoId = getYouTubeId(item.url)
  const lessons = [
    { title: `${label} basics & setup`, time: '15:02', done: true },
    { title: 'Your first notes', time: '22:18', done: false },
    { title: 'Rhythm & timing', time: '18:45', done: false },
    { title: 'Play your first song', time: '25:30', done: false },
    { title: 'Practice routine', time: '12:10', done: false },
  ]
  return (
    <section className="relative z-10 mx-auto max-w-7xl py-8">
      <button
        type="button"
        onClick={onBack}
        className={`mb-6 flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition ${light ? 'border-black/10 bg-white/70 text-black/60 hover:border-black/20' : 'border-white/12 bg-white/[.06] text-white/60 hover:border-white/25'}`}
      >
        <ChevronLeft size={15} /> Back to courses
      </button>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <div className={`relative aspect-video w-full overflow-hidden rounded-2xl border ${light ? 'border-black/10 bg-black' : 'border-white/10 bg-black'}`}>
            {videoId ? (
              <iframe
                className="absolute inset-0 size-full"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-white/60">
                <div className="grid place-items-center gap-3 text-center">
                  <div className="grid size-14 place-items-center rounded-full border border-[var(--voice-color)]/30 bg-[var(--voice-color)]/10 text-[var(--voice-color)]" style={{ '--voice-color': color } as CSSProperties}><Icon size={26} /></div>
                  <span className="text-xs tracking-wide">Video coming soon</span>
                </div>
              </div>
            )}
          </div>
          <span className="mt-5 inline-block w-fit rounded-full border px-2.5 py-0.5 text-[9px] font-bold tracking-[.14em]" style={{ borderColor: `${color}44`, color }}>{label.toUpperCase()}</span>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{item.title}</h1>
          <p className={`mt-2 max-w-2xl text-sm leading-7 ${light ? 'text-black/50' : 'text-white/45'}`}>{item.desc}</p>
          <div className={`mt-4 flex items-center gap-2 text-xs ${light ? 'text-black/45' : 'text-white/40'}`}><Clock size={14} /> {item.meta}</div>
        </div>
        <aside className={`rounded-2xl border p-5 ${light ? 'border-black/8 bg-white/70' : 'border-white/10 bg-white/[.04]'}`}>
          <div className="mb-4">
            <h2 className="text-base font-semibold">Course contents</h2>
            <p className={`text-xs ${light ? 'text-black/40' : 'text-white/35'}`}>{lessons.length} lessons · {item.meta}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            {lessons.map((lesson, index) => (
              <div key={lesson.title} className={`flex items-center gap-3 rounded-xl p-2.5 transition ${index === 0 ? (light ? 'bg-[#ff6b3d]/10' : 'bg-[#ff6b3d]/12') : light ? 'hover:bg-black/4' : 'hover:bg-white/5'}`}>
                <span className={`grid size-9 shrink-0 place-items-center rounded-lg text-xs font-semibold ${index === 0 ? 'bg-[#ff6b3d] text-white' : light ? 'bg-black/6 text-black/50' : 'bg-white/8 text-white/50'}`}>
                  {index === 0 ? <Play size={14} className="translate-x-px fill-white" /> : String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-[13px] font-medium ${index === 0 ? 'text-[#ff6b3d]' : ''}`}>{lesson.title}</p>
                  <p className={`text-[11px] ${light ? 'text-black/40' : 'text-white/35'}`}>{lesson.time}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}

function WideCard({ item, light, onPlay }: { item: CourseItem; light: boolean; onPlay: (item: CourseItem) => void }) {
  const { icon: Icon, label, color, glow } = VOICE_STYLE[item.voice]
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onPlay(item)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(item) } }}
      className={`group flex shrink-0 cursor-pointer snap-start flex-col overflow-hidden rounded-lg border transition duration-300 hover:-translate-y-1.5 w-[86vw] sm:w-[360px] ${light ? 'border-black/8 bg-white/75 shadow-[0_24px_70px_rgba(25,26,24,.08)] hover:border-black/20' : 'border-white/10 bg-white/[.055] shadow-[0_24px_70px_rgba(0,0,0,.25)] hover:border-white/25'}`}
      style={{ '--voice-color': color } as CSSProperties}
    >
      <div className={`relative grid place-items-center overflow-hidden ${item.thumbnail ? 'aspect-video' : 'h-36'}`} style={{ backgroundImage: `linear-gradient(135deg, ${glow}, transparent 70%)` }}>
        {item.thumbnail ? (
          <>
            <img src={item.thumbnail} alt="" className="absolute inset-0 size-full object-cover" />
            <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
            <div className="relative grid size-12 place-items-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:opacity-100">
              <Play size={20} className="translate-x-0.5 fill-white" />
            </div>
          </>
        ) : (
          <>
            <span className={`absolute right-4 top-2 text-6xl font-bold ${light ? 'text-black/[.05]' : 'text-white/[.05]'}`}>{label[0]}</span>
            <div className="grid size-14 place-items-center rounded-full border border-[var(--voice-color)]/30 bg-[var(--voice-color)]/10 text-[var(--voice-color)] transition group-hover:scale-110">
              <Icon size={26} />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-full border border-[var(--voice-color)]/25 px-2.5 py-0.5 text-[9px] font-bold tracking-[.14em] text-[var(--voice-color)]">{label.toUpperCase()}</span>
        <h3 className="mt-3 text-base font-semibold leading-snug">{item.title}</h3>
        <p className={`mt-1.5 text-xs leading-6 ${light ? 'text-black/45' : 'text-white/40'}`}>{item.desc}</p>
        <div className={`mt-4 flex items-center justify-between border-t pt-4 ${light ? 'border-black/8' : 'border-white/8'}`}>
          <span className={`flex items-center gap-1.5 text-[11px] font-medium ${light ? 'text-black/50' : 'text-white/50'}`}><Clock size={13} /> {item.meta}</span>
          <span className="grid size-8 place-items-center rounded-full bg-[#ff6b3d] text-white transition group-hover:bg-[#ff7951]">
            <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  )
}

function ReelCard({ item, light, onPlay }: { item: CourseItem; light: boolean; onPlay: (item: CourseItem) => void }) {
  const { icon: Icon, label, color, glow } = VOICE_STYLE[item.voice]
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onPlay(item)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(item) } }}
      className={`group relative aspect-[9/16] w-[170px] shrink-0 cursor-pointer snap-start overflow-hidden rounded-2xl border transition duration-300 hover:-translate-y-1.5 sm:w-[200px] ${light ? 'border-black/8 shadow-[0_20px_50px_rgba(25,26,24,.1)]' : 'border-white/10 shadow-[0_20px_50px_rgba(0,0,0,.3)]'}`}
      style={{ '--voice-color': color, backgroundImage: `linear-gradient(160deg, ${glow}, ${light ? '#f5f6f4' : '#0d0e0d'} 65%)` } as CSSProperties}
    >
      <div className="absolute right-3 top-3 grid size-9 place-items-center rounded-full border border-[var(--voice-color)]/30 bg-[var(--voice-color)]/10 text-[var(--voice-color)] transition group-hover:scale-110">
        <Icon size={17} />
      </div>
      <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t ${light ? 'from-black/45 via-black/10' : 'from-black/85 via-black/25'} to-transparent p-4 pt-10 text-left`}>
        <span className="rounded-full bg-black/35 px-2 py-0.5 text-[9px] font-bold tracking-[.12em] text-white backdrop-blur-sm">{label.toUpperCase()}</span>
        <h3 className="mt-2 text-[13px] font-semibold leading-tight text-white">{item.title}</h3>
        <div className="mt-2 flex items-center gap-2 text-[10px] text-white/80">
          <span className="flex items-center gap-1"><Play size={10} className="fill-white/80" /> {item.views}</span>
          <span className="text-white/40">•</span>
          <span>{item.meta}</span>
        </div>
      </div>
    </article>
  )
}

function CourseRow({
  light,
  icon: SectionIcon,
  title,
  items,
  variant,
  onPlay,
}: {
  light: boolean
  icon: typeof Music2
  title: string
  items: CourseItem[]
  variant: 'wide' | 'reel'
  onPlay: (item: CourseItem) => void
}) {
  const [active, setActive] = useState<'All' | Voice>('All')
  const [open, setOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const shown = active === 'All' ? items : items.filter((item) => item.voice === active)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const scroll = (direction: number) => railRef.current?.scrollBy({ left: direction * (variant === 'reel' ? 240 : 400), behavior: 'smooth' })

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-[#ff6b3d]/12 text-[#ff6b3d]"><SectionIcon size={17} /></span>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div ref={filterRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-medium transition ${light ? 'border-black/10 bg-white/70 text-black/60 hover:border-black/20' : 'border-white/12 bg-white/[.06] text-white/60 hover:border-white/25'} ${active !== 'All' ? 'border-[#ff6b3d]/40 text-[#ff6b3d]' : ''}`}
          >
            {active === 'All' ? 'Filters' : VOICE_STYLE[active].label}
            <SlidersHorizontal size={13} />
          </button>
          {open && (
            <div className={`absolute right-0 top-full z-20 mt-2 min-w-[130px] overflow-hidden rounded-xl border py-1 shadow-xl ${light ? 'border-black/10 bg-white' : 'border-white/12 bg-[#1a1b1a]'}`}>
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => { setActive(filter); setOpen(false) }}
                  className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[11px] font-medium transition ${
                    active === filter
                      ? 'text-[#ff6b3d]'
                      : light ? 'text-black/60 hover:bg-black/4 hover:text-black' : 'text-white/55 hover:bg-white/6 hover:text-white'
                  }`}
                >
                  {filter !== 'All' && (
                    <span className="size-1.5 rounded-full" style={{ background: VOICE_STYLE[filter].color }} />
                  )}
                  {filter === 'All' ? 'All' : VOICE_STYLE[filter].label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="group/rail relative">
        <div ref={railRef} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2">
          {shown.length ? (
            shown.map((item) => (variant === 'reel' ? <ReelCard key={item.id} item={item} light={light} onPlay={onPlay} /> : <WideCard key={item.id} item={item} light={light} onPlay={onPlay} />))
          ) : (
            <div className={`grid h-40 w-full place-items-center rounded-lg border border-dashed text-xs ${light ? 'border-black/10 text-black/30' : 'border-white/10 text-white/25'}`}>No courses in this category yet</div>
          )}
        </div>

        {shown.length > 0 && (
          <>
            <button type="button" onClick={() => scroll(-1)} aria-label="Scroll left" className={`absolute -left-3 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full opacity-0 backdrop-blur-xl transition group-hover/rail:opacity-100 md:grid ${light ? 'bg-white/85 text-[#191a18] shadow-[0_16px_40px_rgba(0,0,0,.14)]' : 'bg-[#141514]/85 text-white shadow-[0_16px_40px_rgba(0,0,0,.4)]'}`}>
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Scroll right" className={`absolute -right-3 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full opacity-0 backdrop-blur-xl transition group-hover/rail:opacity-100 md:grid ${light ? 'bg-white/85 text-[#191a18] shadow-[0_16px_40px_rgba(0,0,0,.14)]' : 'bg-[#141514]/85 text-white shadow-[0_16px_40px_rgba(0,0,0,.4)]'}`}>
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    </section>
  )
}

export function CoursePage({ theme, onThemeChange, onHome, onGenerateNotes, onChooseInstrument, onAbout }: Props) {
  const light = theme === 'light'
  const [playing, setPlaying] = useState<CourseItem | null>(null)
  return (
    <main className={`relative min-h-svh overflow-hidden px-5 py-6 transition-colors lg:px-8 ${light ? 'bg-[#f5f6f4] text-[#191a18]' : 'bg-[#080908] text-white'}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 flex h-1 gap-2 overflow-hidden opacity-80" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => <i className={index % 5 === 0 ? 'min-w-16 flex-1 bg-[#67e8c8]' : index % 3 === 0 ? 'min-w-16 flex-1 bg-[#ff6b3d]' : 'min-w-16 flex-1 bg-white/15'} key={index} />)}
      </div>

      <header className="relative z-10 mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <button className="flex w-fit items-center gap-3 text-left" type="button" onClick={onHome} aria-label="UKU Motion home">
          <img className="size-9 rounded-xl" src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" />
          <div><strong className="block text-xs tracking-[.14em]">UKU MOTION</strong><span className={`text-[8px] tracking-[.14em] ${light ? 'text-black/35' : 'text-white/30'}`}>LEARN YOUR INSTRUMENT</span></div>
        </button>

        {!playing ? (
          <nav className={`hidden items-center rounded-full border p-1.5 text-xs shadow-[0_12px_36px_rgba(0,0,0,.12)] backdrop-blur-2xl md:flex ${light ? 'border-black/10 bg-white/75 text-black/50' : 'border-white/14 bg-white/10 text-white/60'}`} aria-label="Main navigation">
            <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={onHome}>Home</button>
            <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={onGenerateNotes}>Generate Notes</button>
            <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={onChooseInstrument}>Instruments</button>
            <span className={`rounded-full px-5 py-2.5 font-medium ${light ? 'bg-black/8 text-[#191a18]' : 'bg-white/14 text-white'}`}>Courses</span>
            <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={onAbout}>About</button>
          </nav>
        ) : (
          <div aria-hidden="true" />
        )}

        <div className="ml-auto flex items-center gap-3"><span className={`hidden text-[9px] tracking-[.16em] sm:block ${light ? 'text-black/30' : 'text-white/25'}`}>ONLINE COURSES</span><ThemeToggle theme={theme} onToggle={onThemeChange} /></div>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl">
        {playing ? (
          <CoursePlayer item={playing} light={light} onBack={() => setPlaying(null)} />
        ) : (
          <>
            <div className="py-12 text-center">
              <div className="mb-4 flex items-center justify-center gap-2 text-[9px] font-bold tracking-[.2em] text-[#67e8c8]"><Sparkles size={12} /> INSTRUMENT COURSES</div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Learn to <span className="font-['Georgia',serif] font-normal italic text-[#ff7951]">play.</span></h1>
              <p className={`mx-auto mt-4 max-w-lg text-sm leading-6 ${light ? 'text-black/45' : 'text-white/40'}`}>Guided online courses for guitar, ukulele, piano, strings and wind — from your very first note to confident playing.</p>
            </div>

            <CourseRow light={light} icon={Flame} title="New Courses" items={NEW_COURSES} variant="wide" onPlay={setPlaying} />
            <CourseRow light={light} icon={Clapperboard} title="Quick Bites" items={QUICK_BITES} variant="reel" onPlay={setPlaying} />
            <CourseRow light={light} icon={Layers} title="Series" items={SERIES} variant="wide" onPlay={setPlaying} />
            <CourseRow light={light} icon={BookOpen} title="Full Lesson" items={FULL_LESSONS} variant="wide" onPlay={setPlaying} />
          </>
        )}
      </section>
    </main>
  )
}
