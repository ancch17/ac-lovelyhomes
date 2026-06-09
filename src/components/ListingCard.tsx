export interface Listing {
  id: string
  property_type: string
  title: string
  location: string
  address: string
  price_sgd: number
  bedrooms: number | null
  bathrooms: number
  floor_area: number
  floor_area_unit: string
  level: string
  hdb_room_type?: string
  tenure: string
  psf?: number
  lease_info?: string
  conservation_status?: string
  zoning_use?: string
  land_area_sqft?: number
  gfa_sqft?: number
  status: string
  image: string
  buyer_profile: string
  property_use: string
  description: string
}

const TYPE_COLORS: Record<string, string> = {
  HDB: 'bg-blue-100 text-blue-800',
  Condo: 'bg-purple-100 text-purple-800',
  Shophouse: 'bg-amber-100 text-amber-800',
}

function formatPrice(price: number) {
  if (price >= 1_000_000) {
    const m = price / 1_000_000
    return `S$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(2)}M`
  }
  return `S$${price.toLocaleString()}`
}

interface Props {
  listing: Listing
  onView: (listing: Listing) => void
  onEnquire: (listing: Listing) => void
}

export function ListingCard({ listing, onView, onEnquire }: Props) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover"
          onError={e => {
            const img = e.currentTarget
            img.onerror = null
            img.src = '/placeholder.png'
          }}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[listing.property_type] ?? 'bg-gray-100 text-gray-800'}`}>
            {listing.property_type}
            {listing.hdb_room_type ? ` · ${listing.hdb_room_type}` : ''}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-600 text-white">
            {listing.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-gray-900 leading-snug mb-1">{listing.title}</h3>
        <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {listing.location}
        </p>

        {/* Price */}
        <div className="mb-3">
          <span className="text-xl font-bold" style={{ color: '#0f172a' }}>{formatPrice(listing.price_sgd)}</span>
          {listing.psf && (
            <span className="text-sm text-gray-500 ml-2">S${listing.psf.toLocaleString()} psf</span>
          )}
        </div>

        {/* Key facts */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
          {listing.bedrooms !== null && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
              </svg>
              {listing.bedrooms} bed
            </span>
          )}
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {listing.bathrooms} bath
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {listing.floor_area.toLocaleString()} {listing.floor_area_unit}
          </span>
        </div>

        {listing.land_area_sqft && (
          <div className="text-xs text-gray-500 mb-2">
            Land: {listing.land_area_sqft.toLocaleString()} sqft · GFA: {listing.gfa_sqft?.toLocaleString()} sqft
          </div>
        )}

        <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          {listing.tenure}
          {listing.lease_info && ` · ${listing.lease_info}`}
        </div>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4 flex-1">{listing.description}</p>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onView(listing)}
            className="flex-1 border border-teal-600 text-teal-600 hover:bg-teal-50 rounded-lg py-2 text-sm font-medium transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => onEnquire(listing)}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2 text-sm font-semibold transition-colors"
          >
            Enquire
          </button>
        </div>
      </div>
    </article>
  )
}
