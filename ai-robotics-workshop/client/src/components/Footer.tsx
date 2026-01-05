import { Bot, Mail } from 'lucide-react'
import { workshopInfo } from '../data/workshopData'

function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-300 text-slate-950">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <p className="font-black">{workshopInfo.name}</p>
            <p className="text-sm text-slate-300">
              Bright online learning for young builders.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-slate-300 sm:flex-row sm:items-center sm:gap-5">
          <span>Starts {workshopInfo.startDate}</span>
          <span>{workshopInfo.fee}</span>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 font-semibold text-amber-200 hover:text-amber-100"
          >
            <Mail className="h-4 w-4" />
            hello@example.com
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
