export function Hero() {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0e4a5a 100%)',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #14b8a6 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #d4a843 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-teal-600 bg-opacity-20 border border-teal-400 border-opacity-30 rounded-full px-4 py-1.5 mb-6">
          <div className="w-2 h-2 bg-teal-400 rounded-full" />
          <span className="text-teal-300 text-sm font-medium">Singapore Property Specialist</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          Find Your Next<br />
          <span style={{ color: '#d4a843' }}>Singapore Property</span>
        </h1>

        <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
          Browse selected HDB flats, condominiums and shophouses across Singapore.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              const el = document.getElementById('search')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="bg-teal-600 hover:bg-teal-500 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            Browse Listings
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="border border-white border-opacity-40 text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            Speak to Andrew
          </button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { label: 'HDB Flats', value: '3' },
            { label: 'Condominiums', value: '2' },
            { label: 'Shophouses', value: '2' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-blue-200 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
