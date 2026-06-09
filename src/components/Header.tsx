import { useState } from 'react'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-navy font-bold text-lg tracking-tight" style={{ color: '#0f172a' }}>
              Andrew Chew Property
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('listings')} className="text-gray-600 hover:text-teal-600 font-medium transition-colors text-sm">
              Listings
            </button>
            <button onClick={() => scrollTo('about')} className="text-gray-600 hover:text-teal-600 font-medium transition-colors text-sm">
              About
            </button>
            <button onClick={() => scrollTo('contact')} className="text-gray-600 hover:text-teal-600 font-medium transition-colors text-sm">
              Contact
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
            >
              Enquire Now
            </button>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 flex flex-col gap-4">
            <button onClick={() => scrollTo('listings')} className="text-left text-gray-700 font-medium hover:text-teal-600 transition-colors">Listings</button>
            <button onClick={() => scrollTo('about')} className="text-left text-gray-700 font-medium hover:text-teal-600 transition-colors">About</button>
            <button onClick={() => scrollTo('contact')} className="text-left text-gray-700 font-medium hover:text-teal-600 transition-colors">Contact</button>
            <button
              onClick={() => scrollTo('contact')}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium text-sm w-full text-center"
            >
              Enquire Now
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
