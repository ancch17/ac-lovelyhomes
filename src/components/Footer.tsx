export function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8" style={{ background: '#0f172a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-white font-bold text-sm">Andrew Chew Property</span>
          </div>

          <div className="text-gray-400 text-sm">
            <a href="mailto:andrewchewch@gmail.com" className="hover:text-teal-400 transition-colors">
              andrewchewch@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-500 text-xs leading-relaxed">
            All property details shown are sample data for demonstration purposes and are not actual property listings.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            © {new Date().getFullYear()} Andrew Chew Property. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
