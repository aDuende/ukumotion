import { ArrowRight, Camera, Hand, Music2, ShieldCheck, Sparkles } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

type Props = {
  theme: 'dark' | 'light'
  onEnterStudio: () => void
  onThemeChange: () => void
  onGenerateNotes: () => void
  onChooseInstrument: () => void
  onCourses: () => void
  onAbout: () => void
}

const bars = [18, 26, 34, 45, 31, 54, 68, 42, 76, 58, 88, 64, 48, 82, 96, 72, 55, 91, 78, 62, 46, 70, 84, 58, 38, 66, 52, 44, 30, 22]

export function ImmersiveLandingPage({ theme, onEnterStudio, onThemeChange, onGenerateNotes, onChooseInstrument, onCourses, onAbout }: Props) {
  const light = theme === 'light'
  return (
    <main className={`min-h-svh transition-colors ${light ? 'bg-[#f5f6f4] text-[#191a18]' : 'bg-[#080908] text-white'}`}>
      <header className="fixed inset-x-0 top-0 z-40 px-4 py-4 sm:px-6">
        <div className="mx-auto grid max-w-[1500px] grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <a className="flex w-fit items-center gap-3" href="#home" aria-label="UKU Motion home">
            <img className="size-10 rounded-xl shadow-[0_8px_28px_rgba(0,0,0,.35)]" src="/favicon.svg" alt="" />
            <div>
              <strong className="block text-sm font-bold tracking-[.14em]">UKU MOTION</strong>
              <span className={`hidden text-[8px] tracking-[.15em] sm:block ${light ? 'text-black/40' : 'text-white/40'}`}>GESTURE MUSIC STUDIO</span>
            </div>
          </a>

          <nav className={`hidden items-center rounded-full border p-1.5 text-xs shadow-[0_12px_36px_rgba(0,0,0,.12)] backdrop-blur-2xl md:flex ${light ? 'border-black/10 bg-white/75 text-black/50' : 'border-white/14 bg-white/10 text-white/60'}`} aria-label="Main navigation">
            <a className={`rounded-full px-5 py-2.5 font-medium ${light ? 'bg-black/8 text-[#191a18]' : 'bg-white/14 text-white'}`} href="#home">Home</a>
            <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={onGenerateNotes}>Generate Notes</button>
            <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={onChooseInstrument}>Instruments</button>
            <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={onCourses}>Courses</button>
            <button className={`rounded-full px-5 py-2.5 transition ${light ? 'hover:bg-black/6 hover:text-black' : 'hover:bg-white/8 hover:text-white'}`} type="button" onClick={onAbout}>About</button>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onThemeChange} />
          </div>
        </div>
      </header>

      <section id="home" className={`relative min-h-svh overflow-hidden border-b ${light ? 'border-black/8' : 'border-white/8'}`}>
        <div className={`absolute inset-0 ${light ? 'bg-[#f5f6f4]' : 'bg-[#080908]'}`} />
        <div className="absolute inset-x-0 bottom-0 h-[58%] overflow-hidden" aria-hidden="true">
          <div className="absolute inset-x-[-3%] bottom-[-9%] flex h-full items-end justify-between gap-1 opacity-85 sm:gap-2">
            {bars.map((height, index) => (
              <i
                className={`min-w-1 flex-1 rounded-t-full ${index % 7 === 0 ? 'bg-[#48bfa4]' : index % 3 === 0 ? 'bg-[#ff6b3d]' : light ? 'bg-black/10' : 'bg-white/16'} motion-safe:animate-pulse`}
                key={`${height}-${index}`}
                style={{ height: `${height}%`, animationDelay: `${index * 70}ms`, animationDuration: `${2.1 + (index % 5) * 0.35}s` }}
              />
            ))}
          </div>
          <div className="absolute inset-x-[8%] bottom-[14%] h-[44%] rounded-[50%] border-t border-[#ff6b3d]/70 shadow-[0_-18px_80px_rgba(255,107,61,.2)]" />
          <div className="absolute inset-x-[18%] bottom-[7%] h-[36%] rounded-[50%] border-t border-[#67e8c8]/50 shadow-[0_-12px_70px_rgba(103,232,200,.12)]" />
        </div>

        <div className={`absolute left-[7%] top-[42%] hidden max-w-52 text-xs leading-5 lg:block ${light ? 'text-black/45' : 'text-white/45'}`}>
          Finger counts choose the chord. Your movement controls the rhythm.
        </div>

        <div className={`absolute right-[6%] top-[54%] z-10 hidden w-56 rounded-lg border p-4 backdrop-blur-xl lg:block ${light ? 'border-black/10 bg-white/65 shadow-[0_18px_60px_rgba(25,26,24,.12)]' : 'border-white/12 bg-white/8 shadow-[0_18px_60px_rgba(0,0,0,.3)]'}`}>
          <span className={`text-[9px] tracking-[.16em] ${light ? 'text-black/40' : 'text-white/35'}`}>LIVE GESTURE</span>
          <div className="mt-3 flex items-center justify-between">
            <div><strong className="block text-4xl text-[#ff6b3d]">C</strong><span className={`text-[10px] ${light ? 'text-black/45' : 'text-white/40'}`}>Ukulele</span></div>
            <div className="grid size-12 place-items-center rounded-full border border-[#67e8c8]/30 bg-[#67e8c8]/10 text-[#67e8c8]"><Hand size={21} /></div>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col items-center px-5 pb-28 pt-32 text-center sm:pt-36">
          <div className="mb-5 flex items-center gap-2 text-[9px] font-semibold tracking-[.2em] text-[#67e8c8]">
            <Sparkles size={12} /> CAMERA · GESTURE · SOUND
          </div>
          <h1 className="max-w-4xl text-[clamp(3.3rem,8vw,7.5rem)] font-bold leading-[.82] tracking-tight">
            <span className={`block font-['Georgia',serif] font-normal italic ${light ? 'text-[#191a18]' : 'text-white/95'}`}>Your hands</span>
            <span className="block">make the <em className="not-italic text-[#ff6b3d]">music.</em></span>
          </h1>
          <p className={`mt-7 max-w-lg text-sm leading-6 ${light ? 'text-black/48' : 'text-white/45'}`}>A browser-based instrument that turns natural hand gestures into chords, rhythm, and sound.</p>
          <button className="mt-7 flex h-12 items-center gap-2 rounded-full bg-[#ff6b3d] px-6 text-sm font-bold text-white shadow-[0_12px_36px_rgba(255,107,61,.3)] transition hover:-translate-y-0.5 hover:bg-[#ff7951]" type="button" onClick={onEnterStudio}>
            Enter the studio <ArrowRight size={16} />
          </button>

          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5 text-left">
            <div className={`max-w-44 text-[10px] leading-4 sm:max-w-60 ${light ? 'text-black/40' : 'text-white/35'}`}>No controller. No uploads. Just your camera, your hands, and a new way to play.</div>
            <div className="flex gap-2">
              {['C', 'G', 'Am', 'F'].map((chord, index) => <span className={`grid size-9 place-items-center rounded-full border text-[10px] font-bold backdrop-blur-md ${index === 0 ? 'border-[#ff6b3d]/50 bg-[#ff6b3d]/20 text-[#d94f28]' : light ? 'border-black/10 bg-white/55 text-black/45' : 'border-white/12 bg-white/8 text-white/45'}`} key={chord}>{chord}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className={`relative min-h-svh overflow-hidden border-b px-5 py-24 lg:px-8 lg:py-32 ${light ? 'border-black/8 bg-white text-[#191a18]' : 'border-white/8 bg-[#0d0e0d] text-white'}`}>
        <div className={`pointer-events-none absolute -right-16 top-8 font-['Georgia',serif] text-[9rem] italic leading-none sm:text-[16rem] ${light ? 'text-black/[.025]' : 'text-white/[.025]'}`}>motion</div>
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-1 gap-2 overflow-hidden opacity-70" aria-hidden="true">
          {bars.slice(0, 18).map((height, index) => <i className={index % 4 === 0 ? 'min-w-16 flex-1 bg-[#ff6b3d]' : index % 5 === 0 ? 'min-w-16 flex-1 bg-[#67e8c8]' : 'min-w-16 flex-1 bg-white/15'} key={`${height}-rail`} />)}
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <span className="text-[10px] font-bold tracking-[.18em] text-[#67e8c8]">HOW UKU MOTION WORKS</span>
              <h2 className="mt-5 max-w-2xl text-5xl font-bold leading-[.95] tracking-tight sm:text-7xl">Movement becomes <span className="font-['Georgia',serif] font-normal italic text-[#ff7951]">sound.</span></h2>
            </div>
            <div className="lg:pb-2">
              <p className={`max-w-xl text-sm leading-7 sm:text-base ${light ? 'text-black/48' : 'text-white/45'}`}>UKU Motion connects natural movement to responsive browser audio. No controller to learn and no setup to interrupt the moment.</p>
              <button className={`mt-6 flex items-center gap-2 text-xs font-bold text-[#ff7951] transition ${light ? 'hover:text-black' : 'hover:text-white'}`} type="button" onClick={onEnterStudio}>TRY IT IN THE STUDIO <ArrowRight size={14} /></button>
            </div>
          </div>

          <div id="instruments" className="mt-16 grid gap-3 md:grid-cols-3">
            <article className={`group relative min-h-64 overflow-hidden rounded-lg border p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#ff6b3d]/35 ${light ? 'border-black/8 bg-[#f7f8f6] shadow-[0_20px_60px_rgba(25,26,24,.08)]' : 'border-white/10 bg-white/[.055] shadow-[0_20px_60px_rgba(0,0,0,.18)]'}`}>
              <span className={`absolute right-5 top-3 text-7xl font-bold ${light ? 'text-black/[.04]' : 'text-white/[.035]'}`}>01</span>
              <div className="grid size-10 place-items-center rounded-full border border-[#ff6b3d]/25 bg-[#ff6b3d]/10 text-[#ff7951]"><Camera size={18} /></div>
              <div className="mt-20"><span className={`text-[9px] tracking-[.16em] ${light ? 'text-black/30' : 'text-white/25'}`}>SEE THE GESTURE</span><h3 className="mt-2 text-xl font-semibold">Move naturally</h3><p className={`mt-3 text-xs leading-6 ${light ? 'text-black/45' : 'text-white/40'}`}>Finger counts select chords while vertical movement triggers each strum.</p></div>
            </article>
            <article className={`group relative min-h-64 overflow-hidden rounded-lg border p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#ff6b3d]/35 md:translate-y-8 ${light ? 'border-black/8 bg-[#f7f8f6] shadow-[0_20px_60px_rgba(25,26,24,.08)]' : 'border-white/10 bg-white/[.055] shadow-[0_20px_60px_rgba(0,0,0,.18)]'}`}>
              <span className={`absolute right-5 top-3 text-7xl font-bold ${light ? 'text-black/[.04]' : 'text-white/[.035]'}`}>02</span>
              <div className="grid size-10 place-items-center rounded-full border border-[#ff6b3d]/25 bg-[#ff6b3d]/10 text-[#ff7951]"><Music2 size={18} /></div>
              <div className="mt-20"><span className={`text-[9px] tracking-[.16em] ${light ? 'text-black/30' : 'text-white/25'}`}>SHAPE THE VOICE</span><h3 className="mt-2 text-xl font-semibold">Find your sound</h3><p className={`mt-3 text-xs leading-6 ${light ? 'text-black/45' : 'text-white/40'}`}>Move between ukulele, acoustic guitar, and piano without breaking rhythm.</p></div>
            </article>
            <article className={`group relative min-h-64 overflow-hidden rounded-lg border p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#67e8c8]/35 ${light ? 'border-black/8 bg-[#f7f8f6] shadow-[0_20px_60px_rgba(25,26,24,.08)]' : 'border-white/10 bg-white/[.055] shadow-[0_20px_60px_rgba(0,0,0,.18)]'}`}>
              <span className={`absolute right-5 top-3 text-7xl font-bold ${light ? 'text-black/[.04]' : 'text-white/[.035]'}`}>03</span>
              <div className="grid size-10 place-items-center rounded-full border border-[#67e8c8]/25 bg-[#67e8c8]/10 text-[#67e8c8]"><ShieldCheck size={18} /></div>
              <div className="mt-20"><span className={`text-[9px] tracking-[.16em] ${light ? 'text-black/30' : 'text-white/25'}`}>KEEP IT LOCAL</span><h3 className="mt-2 text-xl font-semibold">Stay private</h3><p className={`mt-3 text-xs leading-6 ${light ? 'text-black/45' : 'text-white/40'}`}>Camera processing happens locally. Your live image never leaves your device.</p></div>
            </article>
          </div>

          <div className={`mt-20 flex items-center gap-3 overflow-hidden border-y py-4 text-[10px] font-semibold tracking-[.14em] md:mt-28 ${light ? 'border-black/8 text-black/30' : 'border-white/8 text-white/25'}`}>
            <span className="text-[#ff7951]">ONE HAND</span><i className={`h-px min-w-12 flex-1 ${light ? 'bg-black/10' : 'bg-white/10'}`} /><span>CHORD</span><i className={`h-px min-w-12 flex-1 ${light ? 'bg-black/10' : 'bg-white/10'}`} /><span className="text-[#48bfa4]">TWO HANDS</span><i className={`h-px min-w-12 flex-1 ${light ? 'bg-black/10' : 'bg-white/10'}`} /><span>RHYTHM</span><i className={`h-px min-w-12 flex-1 ${light ? 'bg-black/10' : 'bg-white/10'}`} /><span className="text-[#ff7951]">MUSIC</span>
          </div>
        </div>
      </section>

      <footer className={`border-t px-5 py-8 lg:px-8 ${light ? 'border-black/8 bg-[#f5f6f4]' : 'border-white/8 bg-[#080908]'}`}>
        <div className={`mx-auto flex max-w-6xl items-center justify-between text-[10px] ${light ? 'text-black/40' : 'text-white/35'}`}><div className="flex items-center gap-2"><img className="size-6" src="/favicon.svg" alt="" /><span>© 2026 UKU MOTION</span></div><button className="font-bold text-[#ff7951]" type="button" onClick={onEnterStudio}>START PLAYING</button></div>
      </footer>
    </main>
  )
}