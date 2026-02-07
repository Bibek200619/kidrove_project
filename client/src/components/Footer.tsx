import { Send } from 'lucide-react'
import { workshopInfo } from '../data/workshopData'
import BrandLogo from './BrandLogo'

function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <BrandLogo tone="dark" />

        <div className="flex flex-col gap-2 text-sm text-slate-300 sm:flex-row sm:items-center sm:gap-5">
          <span>{workshopInfo.name}</span>
          <span>Starts {workshopInfo.startDate}</span>
          <span>{workshopInfo.fee}</span>
          <a
            href="#registration"
            className="inline-flex items-center gap-2 font-semibold text-amber-200 hover:text-amber-100"
          >
            <Send className="h-4 w-4" />
            Register
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
