import { useState } from 'react'
import type { Listing } from './ListingCard'
import { EnquiryForm } from './EnquiryForm'

function formatPriceFull(price: number) {
  return `S$${price.toLocaleString()}`
}

interface Props {
  listing: Listing | null
  onClose: () => void
  initialEnquiry?: boolean
}

const TYPE_COLORS: Record<string, string> = {
  HDB: 'bg-blue-100 text-blue-800',
  Condo: 'bg-purple-100 text-purple-800',
  Shophouse: 'bg-amber-100 text-amber-800',
}

export function PropertyModal({ listing, onClose, initialEnquiry }: Props) {
  const [showEnquiry, setShowEnquiry] = useState(initialEnquiry ?? false)

  if (!listing) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="relative">
          <div className="h-64 sm:h-80 bg-gray-100 overflow-hidden rounded-t-2xl">
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
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[listing.property_type] ?? 'bg-gray-100 text-gray-700'}`}>
              {listing.property_type}
              {listing.hdb_room_type ? ` · ${listing.hdb_room_type}` : ''}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-600 text-white">
              {listing.status}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{listing.title}</h2>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {listing.address} · {listing.location}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold" style={{ color: '#0f172a' }}>{formatPriceFull(listing.price_sgd)}</div>
              {listing.psf && (
                <div className="text-sm text-gray-500">S${listing.psf.toLocaleString()} psf</div>
              )}
            </div>
          </div>

          {/* Key facts table */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Property Details</h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
              <Fact label="Property Type" value={`${listing.property_type}${listing.hdb_room_type ? ` (${listing.hdb_room_type})` : ''}`} />
              <Fact label="Status" value={listing.status} />
              {listing.bedrooms !== null && <Fact label="Bedrooms" value={`${listing.bedrooms}`} />}
              <Fact label="Bathrooms" value={`${listing.bathrooms}`} />
              <Fact label="Floor Area" value={`${listing.floor_area.toLocaleString()} ${listing.floor_area_unit}`} />
              <Fact label="Level / Floor" value={listing.level} />
              <Fact label="Tenure" value={listing.tenure} />
              {listing.lease_info && <Fact label="Lease Info" value={listing.lease_info} />}
              {listing.buyer_profile && <Fact label="Ideal For" value={listing.buyer_profile} />}
              {listing.property_use && <Fact label="Property Use" value={listing.property_use} />}
              {listing.land_area_sqft && <Fact label="Land Area" value={`${listing.land_area_sqft.toLocaleString()} sqft`} />}
              {listing.gfa_sqft && <Fact label="GFA" value={`${listing.gfa_sqft.toLocaleString()} sqft`} />}
              {listing.conservation_status && <Fact label="Conservation" value={listing.conservation_status} />}
              {listing.zoning_use && <Fact label="Zoning" value={listing.zoning_use} />}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Description</h3>
            <p className="text-gray-700 leading-relaxed">{listing.description}</p>
          </div>

          {/* Enquiry section */}
          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Enquire About This Property</h3>
              <button
                onClick={() => setShowEnquiry(!showEnquiry)}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                {showEnquiry ? 'Hide form' : 'Show form'}
              </button>
            </div>
            {showEnquiry && (
              <EnquiryForm prefilledProperty={listing.title} />
            )}
            {!showEnquiry && (
              <button
                onClick={() => setShowEnquiry(true)}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-3 font-semibold transition-colors"
              >
                Send Enquiry
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-gray-500 block text-xs">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  )
}
