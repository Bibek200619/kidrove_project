import { Bot, Sparkles } from 'lucide-react'

type BrandLogoProps = {
  tone?: 'light' | 'dark'
}

function BrandLogo({ tone = 'light' }: BrandLogoProps) {
  const textClass = tone === 'dark' ? 'text-white' : 'text-slate-950'
  const subTextClass = tone === 'dark' ? 'text-slate-300' : 'text-slate-600'

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 via-rose-400 to-sky-500 text-white shadow-md shadow-rose-200/50">
        <Bot className="h-6 w-6" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-slate-950 ring-2 ring-white">
          <Sparkles className="h-3 w-3" />
        </span>
      </div>
      <div className="leading-tight">
        <p className={`font-black ${textClass}`}>Kidrove Labs</p>
        <p className={`text-xs font-semibold ${subTextClass}`}>AI for young makers</p>
      </div>
    </div>
  )
}

export default BrandLogo
