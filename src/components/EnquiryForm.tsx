import { useState } from 'react'

// After deployment, enable form submission email notifications in the Netlify dashboard
// and send notifications to andrewchewch@gmail.com

interface Props {
  prefilledProperty?: string
}

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

export function EnquiryForm({ prefilledProperty = '' }: Props) {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    phone: '',
    property: prefilledProperty,
    budget: '',
    message: '',
    consent: false,
    'bot-field': '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const set = (key: string, value: string | boolean) =>
    setFields(f => ({ ...f, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fields.consent) {
      setError('Please confirm your consent to proceed.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const { consent, ...rest } = fields
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'property-enquiry',
          ...rest,
          consent: consent ? 'yes' : 'no',
        }),
      })
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 text-center">
        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-semibold text-teal-800 mb-1">Thank you. Your enquiry has been received.</h3>
        <p className="text-teal-700 text-sm">Andrew will contact you shortly.</p>
      </div>
    )
  }

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <form
      name="property-enquiry"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input type="hidden" name="form-name" value="property-enquiry" />
      <div style={{ display: 'none' }}>
        <label>
          Do not fill this out:
          <input name="bot-field" value={fields['bot-field']} onChange={e => set('bot-field', e.target.value)} />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="enq-name">Full Name *</label>
          <input
            id="enq-name"
            type="text"
            name="name"
            required
            className={inputClass}
            placeholder="Your full name"
            value={fields.name}
            onChange={e => set('name', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="enq-email">Email Address *</label>
          <input
            id="enq-email"
            type="email"
            name="email"
            required
            className={inputClass}
            placeholder="your@email.com"
            value={fields.email}
            onChange={e => set('email', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="enq-phone">Phone Number</label>
          <input
            id="enq-phone"
            type="tel"
            name="phone"
            className={inputClass}
            placeholder="+65 9XXX XXXX"
            value={fields.phone}
            onChange={e => set('phone', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="enq-property">Property Interested In</label>
          <input
            id="enq-property"
            type="text"
            name="property"
            className={inputClass}
            placeholder="Property name or ID"
            value={fields.property}
            onChange={e => set('property', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="enq-budget">Budget Range</label>
        <div className="relative">
          <select
            id="enq-budget"
            name="budget"
            className={`${inputClass} appearance-none pr-8`}
            value={fields.budget}
            onChange={e => set('budget', e.target.value)}
            aria-label="Budget range"
          >
            <option value="">Select budget range</option>
            <option>Below S$500,000</option>
            <option>S$500,000 – S$800,000</option>
            <option>S$800,000 – S$1.5M</option>
            <option>S$1.5M – S$3M</option>
            <option>S$3M – S$6M</option>
            <option>Above S$6M</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="enq-message">Message</label>
        <textarea
          id="enq-message"
          name="message"
          rows={4}
          className={inputClass}
          placeholder="Tell Andrew about your requirements..."
          value={fields.message}
          onChange={e => set('message', e.target.value)}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="enq-consent"
          type="checkbox"
          name="consent"
          checked={fields.consent}
          onChange={e => set('consent', e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
        />
        <label htmlFor="enq-consent" className="text-sm text-gray-600 cursor-pointer">
          I agree to be contacted about my property enquiry.
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition-colors text-sm"
      >
        {submitting ? 'Sending...' : 'Submit Enquiry'}
      </button>
    </form>
  )
}
