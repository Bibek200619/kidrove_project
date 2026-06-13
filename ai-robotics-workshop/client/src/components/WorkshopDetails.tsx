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

const detailIcons: LucideIcon[] = [
  UserRound,
  Clock,
  Laptop,
  IndianRupee,
  CalendarDays,
]

function WorkshopDetails() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
          className="mb-7 max-w-2xl"
        >
          <p className="text-sm font-bold uppercase text-rose-600">Workshop details</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">
            Everything parents need to know at a glance
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {workshopDetails.map((detail, index) => {
            const Icon = detailIcons[index]

            return (
              <motion.article
                key={detail.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.42, delay: index * 0.04 }}
                className="rounded-lg border border-white bg-white/90 p-5 shadow-md shadow-orange-100"
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
        </div>
      </div>
    </section>
  )
}

export default WorkshopDetails
