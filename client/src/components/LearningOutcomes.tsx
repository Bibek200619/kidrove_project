import { motion } from 'framer-motion'
import { BookOpenCheck, CheckCircle2, Rocket } from 'lucide-react'
import { learningOutcomes } from '../data/workshopData'
import {
  cardReveal,
  revealViewport,
  sectionIntro,
  staggerContainer,
} from '../utils/animations'

function LearningOutcomes() {
  return (
    <section className="bg-sky-50 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={sectionIntro}
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <BookOpenCheck className="h-6 w-6" />
          </div>
          <p className="text-sm font-bold uppercase text-emerald-700">
            Learning outcomes
          </p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">
            Skills children can use beyond the workshop
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            Sessions keep technical ideas simple, visual, and project-led so
            children understand how smart machines work before they build.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={staggerContainer}
          className="grid gap-4 md:grid-cols-2"
        >
          {learningOutcomes.map((outcome) => (
            <motion.article
              key={outcome}
              variants={cardReveal}
              whileHover={{ y: -5, scale: 1.01 }}
              className="flex gap-4 rounded-lg border border-sky-100 bg-white p-5 shadow-sm"
            >
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
              <p className="font-semibold leading-7 text-slate-800">{outcome}</p>
            </motion.article>
          ))}

          <motion.article
            variants={cardReveal}
            whileHover={{ y: -5, scale: 1.01 }}
            className="flex gap-4 rounded-lg bg-amber-100 p-5 text-amber-900 shadow-sm"
          >
            <Rocket className="mt-1 h-5 w-5 shrink-0" />
            <p className="font-bold leading-7">
              Mini projects help every child finish with something they can talk about.
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  )
}

export default LearningOutcomes
