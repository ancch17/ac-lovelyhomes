import { EnquiryForm } from './EnquiryForm'

export function Contact() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="inline-block bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
              Get in Touch
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#0f172a' }}>
              Speak to Andrew
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Interested in any of these properties? Send an enquiry and I'll get back to you.
            </p>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-50 border border-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Email</div>
                <a
                  href="mailto:andrewchewch@gmail.com"
                  className="text-teal-600 font-medium hover:text-teal-700 transition-colors"
                >
                  andrewchewch@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">What happens next?</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  'Send your enquiry using the form',
                  'Andrew reviews your requirements',
                  'A personalised response within 24 hours',
                  'Schedule a viewing at your convenience',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  )
}
