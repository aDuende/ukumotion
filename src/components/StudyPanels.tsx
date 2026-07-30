import { ArrowUpRight, Music2 } from 'lucide-react'
import { GESTURES, INSTRUMENTS, SCORE, type Instrument } from '../lib/music'

const FINGER_GUIDE = [
  { title: 'One', detail: 'Index finger only' },
  { title: 'Two', detail: 'Index + middle' },
  { title: 'Three', detail: 'Index + middle + ring' },
  { title: 'Four', detail: 'Four fingers, thumb closed' },
  { title: 'Five', detail: 'Open hand' },
  { title: 'Six', detail: 'Thumb + pinky (keyboard 6)' },
]

type Props = {
  theme: 'dark' | 'light'
  instrument: Instrument
  bar: number
  bpm: number
  volume: number
  onBar: (bar: number) => void
  onBpm: (bpm: number) => void
  onVolume: (volume: number) => void
}

export function StudyPanels({ theme, instrument, bar, bpm, volume, onBar, onBpm, onVolume }: Props) {
  const light = theme === 'light'
  const name = INSTRUMENTS[instrument].name
  const numbers = SCORE.map((chord) => GESTURES.indexOf(chord) + 1)
  const card = light ? 'border-black/8 bg-white' : 'border-white/10 bg-white/4'
  const muted = light ? 'text-black/40' : 'text-white/35'

  return (
    <section className={`grid gap-5 p-5 lg:grid-cols-2 ${light ? 'bg-[#f5f6f4]' : 'bg-[#080908]'}`}>
      <div className={`rounded-2xl border p-6 ${card}`}>
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <span className={`text-[10px] font-bold tracking-[.2em] ${muted}`}>01</span>
            <h2 className={`text-2xl font-semibold ${light ? 'text-[#191a18]' : 'text-white'}`}>How to play {name}</h2>
          </div>
          <p className={`max-w-44 text-right text-[11px] leading-4 ${muted}`}>One hand, clear numbers, one predictable result</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {FINGER_GUIDE.map((row, index) => {
            const chord = GESTURES[index]
            return (
              <div key={row.title} className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${light ? 'border-black/8 bg-[#fafbf9]' : 'border-white/10 bg-white/4'}`}>
                <span className={`text-[9px] ${muted}`}>{String(index + 1).padStart(2, '0')}</span>
                <span className="text-3xl font-black text-[#ff6b3d]">{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <strong className={`block text-sm ${light ? 'text-[#191a18]' : 'text-white'}`}>{row.title}</strong>
                  <span className={`block text-[10px] ${muted}`}>{row.detail}</span>
                </div>
                <span className={`grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold ${light ? 'bg-[#fff0eb] text-[#d94f28]' : 'bg-[#ff6b3d]/16 text-[#ff8a66]'}`}>{chord}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className={`rounded-2xl border p-6 ${card}`}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className={`text-[10px] font-bold tracking-[.2em] ${muted}`}>02</span>
            <h2 className={`text-2xl font-semibold ${light ? 'text-[#191a18]' : 'text-white'}`}>Practice with a song</h2>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-[#d94f28]">Backing score <ArrowUpRight size={13} /></span>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <span className={`grid size-12 shrink-0 place-items-center rounded-xl ${light ? 'bg-[#fff0eb] text-[#d94f28]' : 'bg-[#ff6b3d]/16 text-[#ff8a66]'}`}><Music2 size={22} /></span>
          <div>
            <span className={`text-[9px] font-bold tracking-[.16em] ${muted}`}>BUILT-IN NUMBER SCORE · 1–{GESTURES.length}</span>
            <strong className={`block text-base ${light ? 'text-[#191a18]' : 'text-white'}`}>Morning Garden · {name} Chords</strong>
            <p className={`text-[11px] ${muted}`}>Number score: {numbers.join(' ')}. Show or press each number from left to right.</p>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-4 gap-2 sm:grid-cols-8">
          {SCORE.map((chord, index) => (
            <button
              key={`${chord}-${index}`}
              type="button"
              onClick={() => onBar(index)}
              className={`flex flex-col items-center rounded-xl border py-3 transition ${bar === index ? 'border-[#ff6b3d] bg-[#ff6b3d] text-white' : light ? 'border-black/8 bg-[#fafbf9] text-[#191a18] hover:border-[#ff6b3d]/40' : 'border-white/10 bg-white/4 text-white hover:border-[#ff6b3d]/40'}`}
            >
              <span className="text-lg font-black">{numbers[index]}</span>
              <strong className="text-xs">{chord}</strong>
              <span className="text-[8px] opacity-55">{index + 1}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={`mb-1.5 flex items-center justify-between text-[10px] ${muted}`}>Tempo <strong className="text-[#d94f28]">{bpm} BPM</strong></span>
            <input className="h-1 w-full cursor-pointer accent-[#ff6b3d]" type="range" min="60" max="160" step="1" value={bpm} onChange={(event) => onBpm(Number(event.target.value))} aria-label="Tempo" />
          </label>
          <label className="block">
            <span className={`mb-1.5 flex items-center justify-between text-[10px] ${muted}`}>Volume <strong className="text-[#d94f28]">{Math.round(volume * 100)}%</strong></span>
            <input className="h-1 w-full cursor-pointer accent-[#ff6b3d]" type="range" min="0" max="1" step=".02" value={volume} onChange={(event) => onVolume(Number(event.target.value))} aria-label="Volume" />
          </label>
        </div>
      </div>
    </section>
  )
}
