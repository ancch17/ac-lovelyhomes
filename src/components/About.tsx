export function About() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
              About
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#0f172a' }}>
              About Andrew Chew Property
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Helping buyers, families and investors explore selected Singapore property opportunities across HDB flats, condominiums and shophouses.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With a client-first approach, every property is personally curated to match your goals — whether you are buying your first home, upgrading, or seeking a strong investment opportunity in Singapore's property market.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🏠', label: 'HDB Specialists', desc: 'Expert guidance on HDB resale and upgrading' },
              { icon: '🏢', label: 'Condo Advisory', desc: 'Private residential across all districts' },
              { icon: '🏪', label: 'Shophouses', desc: 'Heritage and commercial properties' },
              { icon: '🤝', label: 'Client First', desc: 'Personalised service from search to sale' },
            ].map(item => (
              <div key={item.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{item.label}</div>
                <div className="text-gray-500 text-xs leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
