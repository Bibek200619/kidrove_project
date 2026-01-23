import { motion } from 'framer-motion'
import {
  CalendarDays,
  Clock,
  IndianRupee,
  Laptop,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { workshopDetails } from '../data/workshopData'
import {
  cardReveal,
  revealViewport,
  sectionIntro,
  staggerContainer,
} from '../utils/animations'

const detailIcons: LucideIcon[] = [
  UserRound,
  Clock,
  Laptop,
  IndianRupee,
  CalendarDays,
]

function WorkshopDetails() {
  return (
    <section className="px-4 pb-14 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={sectionIntro}
          className="mb-7 max-w-2xl"
        >
          <p className="text-sm font-bold uppercase text-rose-600">Workshop details</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">
            Everything parents need to know at a glance
          </h2>
          <p className="mt-3 leading-7 text-slate-700">
            Clear batch information, simple pricing, and an online format designed
            for children to learn from home.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={staggerContainer}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {workshopDetails.map((detail, index) => {
            const Icon = detailIcons[index]

            return (
              <motion.article
                key={detail.label}
                variants={cardReveal}
                whileHover={{ y: -6, scale: 1.01 }}
                className="rounded-lg border border-white bg-white/95 p-5 shadow-md shadow-orange-100"
              >
                <div
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg ${detail.className}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-slate-500">{detail.label}</p>
                <h3 className="mt-1 text-xl font-black text-slate-950">{detail.value}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{detail.note}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default WorkshopDetails
