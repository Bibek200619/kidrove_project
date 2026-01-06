import { type FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  LoaderCircle,
  Mail,
  Phone,
  Send,
  User,
} from 'lucide-react'

type FormValues = {
  name: string
  email: string
  phone: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

type ApiResponse = {
  success: boolean
  message: string
}

const initialValues: FormValues = {
  name: '',
  email: '',
  phone: '',
}

function resolveEnquiryEndpoint(apiUrl?: string) {
  const trimmedUrl = apiUrl?.trim().replace(/\/$/, '')

  if (!trimmedUrl) {
    return 'http://localhost:5001/api/enquiry'
  }

  return trimmedUrl.endsWith('/api/enquiry')
    ? trimmedUrl
    : `${trimmedUrl}/api/enquiry`
}

const enquiryEndpoint = resolveEnquiryEndpoint(import.meta.env.VITE_API_URL)

function validateForm(values: FormValues) {
  const errors: FormErrors = {}
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneDigits = values.phone.replace(/\D/g, '')

  if (!values.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.'
  } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = 'Enter a valid phone number.'
  }

  return errors
}

function RegistrationForm() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setStatusMessage('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateForm(values)
    setErrors(nextErrors)
    setStatusMessage('')
    setIsSuccess(false)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(enquiryEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
        }),
      })
      const data = (await response.json()) as ApiResponse

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to submit enquiry.')
      }

      setIsSuccess(true)
      setStatusMessage(data.message)
      setValues(initialValues)
    } catch (error) {
      setIsSuccess(false)
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="registration" className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
          className="rounded-lg bg-gradient-to-br from-amber-100 via-orange-50 to-emerald-100 p-6"
        >
          <p className="text-sm font-bold uppercase text-rose-600">Registration</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">
            Reserve a seat for your child
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            Share your contact details and the team will reach out with batch
            details, timing, and the online joining process.
          </p>

          <div className="mt-6 space-y-3">
            {[
              'Live online classes for ages 8–14',
              'Project-led AI and robotics learning',
              'Simple explanations, no prior coding needed',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 font-semibold text-slate-800">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          onSubmit={handleSubmit}
          noValidate
          className="rounded-lg border border-slate-100 bg-white p-5 shadow-xl shadow-slate-100"
        >
          <div className="grid gap-5">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 font-bold text-slate-800">
                <User className="h-4 w-4 text-sky-700" />
                Parent Name
              </span>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={(event) => handleChange('name', event.target.value)}
                className="min-h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                placeholder="Bibek Kumar Shah"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                disabled={isSubmitting}
                required
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-sm font-semibold text-rose-600">
                  {errors.name}
                </p>
              )}
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 font-bold text-slate-800">
                <Mail className="h-4 w-4 text-emerald-700" />
                Email
              </span>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={(event) => handleChange('email', event.target.value)}
                className="min-h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                placeholder="bibek@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                disabled={isSubmitting}
                required
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm font-semibold text-rose-600">
                  {errors.email}
                </p>
              )}
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 font-bold text-slate-800">
                <Phone className="h-4 w-4 text-rose-700" />
                Phone Number
              </span>
              <input
                type="tel"
                name="phone"
                value={values.phone}
                onChange={(event) => handleChange('phone', event.target.value)}
                className="min-h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-100"
                placeholder="9876543210"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                disabled={isSubmitting}
                required
              />
              {errors.phone && (
                <p id="phone-error" className="mt-2 text-sm font-semibold text-rose-600">
                  {errors.phone}
                </p>
              )}
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="h-5 w-5 animate-spin" />
                Submitting
              </>
            ) : (
              <>
                Submit Enquiry
                <Send className="h-5 w-5" />
              </>
            )}
          </button>

          {statusMessage && (
            <p
              className={`mt-4 rounded-lg px-4 py-3 text-sm font-bold ${
                isSuccess
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
              role={isSuccess ? 'status' : 'alert'}
              aria-live="polite"
            >
              {statusMessage}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  )
}

export default RegistrationForm
