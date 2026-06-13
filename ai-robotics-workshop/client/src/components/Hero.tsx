import { motion } from 'framer-motion'
import { ArrowRight, Bot, BrainCircuit, ShieldCheck, Sparkles } from 'lucide-react'
import heroImage from '../assets/hero.png'
import { workshopInfo } from '../data/workshopData'

function Hero() {
  const scrollToRegistration = () => {
    document.getElementById('registration')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Summer batch starts {workshopInfo.startDate}
          </div>

          <h1 className="text-4xl font-black leading-tight text-slate-950">
            {workshopInfo.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            {workshopInfo.description}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={scrollToRegistration}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-rose-500 px-6 py-3 font-bold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
            >
              Enroll Now
              <ArrowRight className="h-5 w-5" />
            </button>
            <div className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white/85 px-5 py-3 font-semibold text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
              Parent-friendly online learning
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-md"
          aria-label="Workshop preview illustration"
        >
          <div className="relative overflow-hidden rounded-lg border border-white bg-white/85 p-5 shadow-2xl shadow-amber-100">
            <div className="grid gap-4">
              <div className="flex items-center justify-between rounded-lg bg-sky-100 p-4 text-sky-800">
                <div>
                  <p className="text-sm font-bold">Live AI Lab</p>
                  <p className="text-xs text-sky-700">Online guided projects</p>
                </div>
                <BrainCircuit className="h-8 w-8" />
              </div>

              <div className="relative flex min-h-64 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-100 via-white to-emerald-100 p-6">
                <img
                  src={heroImage}
                  alt=""
                  className="h-48 w-48 object-contain opacity-85"
                  aria-hidden="true"
                />
                <div className="absolute bottom-5 left-5 rounded-lg bg-white px-4 py-3 shadow-lg">
                  <p className="text-xs font-semibold text-slate-500">Age group</p>
                  <p className="font-black text-slate-900">{workshopInfo.ageGroup}</p>
                </div>
                <div className="absolute right-5 top-5 rounded-lg bg-rose-100 px-4 py-3 text-rose-700 shadow-lg">
                  <p className="text-xs font-semibold">Fee</p>
                  <p className="font-black">{workshopInfo.fee}</p>
                </div>
                <div className="absolute bottom-5 right-5 rounded-lg bg-white p-3 shadow-lg">
                  <Bot className="h-8 w-8 text-emerald-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm font-bold">
                <div className="rounded-lg bg-emerald-100 p-3 text-emerald-700">
                  {workshopInfo.duration}
                </div>
                <div className="rounded-lg bg-amber-100 p-3 text-amber-700">
                  {workshopInfo.mode}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
