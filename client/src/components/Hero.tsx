import { motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  Clock,
  IndianRupee,
  Laptop,
  ShieldCheck,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import heroImage from '../assets/workshop-hero.png'
import { heroStats, workshopInfo } from '../data/workshopData'
import BrandLogo from './BrandLogo'
import { cardReveal, sectionIntro, staggerContainer } from '../utils/animations'

const statIcons: LucideIcon[] = [UsersRound, Clock, Laptop, IndianRupee]

function Hero() {
  const scrollToRegistration = () => {
    document.getElementById('registration')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <section className="relative min-h-[84svh] overflow-hidden bg-[#fffaf2]">
      <img
        src={heroImage}
        alt="Children learning robotics with an online instructor"
        className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
      />
      <div className="absolute inset-0 bg-[#fffaf2]/75 lg:bg-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,250,242,0.98)_0%,rgba(255,250,242,0.9)_43%,rgba(255,250,242,0.3)_76%,rgba(255,250,242,0.08)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fffaf2] to-transparent" />

      <div className="relative mx-auto flex min-h-[84svh] max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center justify-between gap-4"
        >
          <BrandLogo />
          <div className="hidden items-center gap-2 rounded-lg border border-white/80 bg-white/75 px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm backdrop-blur sm:flex">
            <ShieldCheck className="h-4 w-4" />
            Parent-friendly learning
          </div>
        </motion.header>

        <div className="flex flex-1 items-center py-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div
              variants={sectionIntro}
              className="mb-5 inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-white/80 px-4 py-2 text-sm font-bold text-amber-700 shadow-sm backdrop-blur"
            >
              <Sparkles className="h-4 w-4" />
              Summer batch starts {workshopInfo.startDate}
            </motion.div>

            <motion.h1
              variants={sectionIntro}
              className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl"
            >
              {workshopInfo.name}
            </motion.h1>
            <motion.p
              variants={sectionIntro}
              className="mt-5 max-w-2xl text-lg leading-8 text-slate-700"
            >
              {workshopInfo.description}
            </motion.p>

            <motion.div
              variants={sectionIntro}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <button
                type="button"
                onClick={scrollToRegistration}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-rose-500 px-6 py-3 font-bold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
              >
                Enroll Now
                <ArrowRight className="h-5 w-5" />
              </button>
              <div className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-sky-200 bg-white/85 px-5 py-3 font-bold text-sky-700 shadow-sm backdrop-blur">
                <CalendarDays className="h-5 w-5" />
                4-week online summer program
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {heroStats.map((stat, index) => {
                const Icon = statIcons[index]

                return (
                  <motion.div
                    key={stat.label}
                    variants={cardReveal}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="rounded-lg border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur"
                  >
                    <Icon className="h-5 w-5 text-rose-500" />
                    <p className="mt-3 text-sm font-semibold text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-1 font-black text-slate-950">{stat.value}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
