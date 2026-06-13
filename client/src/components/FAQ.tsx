import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, CircleHelp } from 'lucide-react'
import { faqs } from '../data/workshopData'
import {
  cardReveal,
  revealViewport,
  sectionIntro,
  staggerContainer,
} from '../utils/animations'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="bg-[#fffaf2] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={sectionIntro}
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
            <CircleHelp className="h-6 w-6" />
          </div>
          <p className="text-sm font-bold uppercase text-sky-700">FAQ</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">
            Common parent questions
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            Quick answers about level, format, and what your child will build.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={staggerContainer}
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <motion.article
                key={faq.question}
                variants={cardReveal}
                whileHover={{ y: -4 }}
                className="rounded-lg border border-orange-100 bg-white/95 shadow-sm"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  {faq.question}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-sky-700 transition ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 leading-7 text-slate-700">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
