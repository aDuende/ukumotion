import { Moon, Sun } from 'lucide-react'

type Props = {
  theme: 'dark' | 'light'
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: Props) {
  const light = theme === 'light'

  return (
    <button
      className={`grid size-10 shrink-0 place-items-center rounded-full border shadow-[0_10px_30px_rgba(0,0,0,.14)] backdrop-blur-xl transition ${light ? 'border-black/10 bg-white/85 text-black/50 hover:text-[#d94f28]' : 'border-white/14 bg-white/10 text-white/55 hover:bg-white/16 hover:text-[#ff8a66]'}`}
      type="button"
      onClick={onToggle}
      title={`Use ${light ? 'dark' : 'light'} mode`}
      aria-label={`Use ${light ? 'dark' : 'light'} mode`}
    >
      {light ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  )
}