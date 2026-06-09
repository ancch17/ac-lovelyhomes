import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo, useEffect } from 'react'
import rawListings from '@/data/listings.json'
import type { Listing } from '@/components/ListingCard'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { SearchForm, defaultFilters } from '@/components/SearchForm'
import type { SearchFilters } from '@/components/SearchForm'
import { ListingCard } from '@/components/ListingCard'
import { PropertyModal } from '@/components/PropertyModal'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const listings = rawListings as Listing[]

// Convert floor area to sqft for uniform comparison
function toSqft(listing: Listing): number {
  if (listing.floor_area_unit === 'sqm') return listing.floor_area * 10.764
  return listing.floor_area
}

function matchesPrice(price: number, range: string): boolean {
  if (!range) return true
  if (range === 'below-500k') return price < 500_000
  if (range === '500k-800k') return price >= 500_000 && price <= 800_000
  if (range === '800k-1.5m') return price > 800_000 && price <= 1_500_000
  if (range === '1.5m-3m') return price > 1_500_000 && price <= 3_000_000
  if (range === '3m-6m') return price > 3_000_000 && price <= 6_000_000
  if (range === 'above-6m') return price > 6_000_000
  return true
}

function matchesBedrooms(bedrooms: number | null, filter: string): boolean {
  if (!filter) return true
  if (filter === 'n/a') return bedrooms === null
  const n = parseInt(filter)
  if (filter === '4+') return bedrooms !== null && bedrooms >= 4
  return bedrooms === n
}

function matchesBathrooms(bathrooms: number, filter: string): boolean {
  if (!filter) return true
  if (filter === '4+') return bathrooms >= 4
  return bathrooms === parseInt(filter)
}

function matchesArea(listing: Listing, filter: string): boolean {
  if (!filter) return true
  const sqft = toSqft(listing)
  if (filter === 'below-700') return sqft < 700
  if (filter === '700-1000') return sqft >= 700 && sqft <= 1000
  if (filter === '1000-1500') return sqft > 1000 && sqft <= 1500
  if (filter === '1500-3500') return sqft > 1500 && sqft <= 3500
  if (filter === 'above-3500') return sqft > 3500
  return true
}

function applyFilters(listings: Listing[], filters: SearchFilters): Listing[] {
  return listings.filter(l => {
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase()
      const haystack = [l.title, l.location, l.address, l.property_type, l.tenure, l.description].join(' ').toLowerCase()
      if (!haystack.includes(kw)) return false
    }
    if (filters.property_type && l.property_type !== filters.property_type) return false
    if (filters.hdb_room_type && l.hdb_room_type !== filters.hdb_room_type) return false
    if (filters.location && l.location !== filters.location) return false
    if (!matchesPrice(l.price_sgd, filters.price_range)) return false
    if (!matchesBedrooms(l.bedrooms, filters.bedrooms)) return false
    if (!matchesBathrooms(l.bathrooms, filters.bathrooms)) return false
    if (!matchesArea(l, filters.floor_area)) return false
    if (filters.tenure && l.tenure !== filters.tenure) return false
    if (filters.level && l.level !== filters.level) return false
    if (filters.status && l.status !== filters.status) return false
    if (filters.buyer_profile && l.buyer_profile !== filters.buyer_profile) return false
    if (filters.property_use && l.property_use !== filters.property_use) return false
    return true
  })
}

function applySort(listings: Listing[], sort: string): Listing[] {
  const copy = [...listings]
  if (sort === 'price-asc') return copy.sort((a, b) => a.price_sgd - b.price_sgd)
  if (sort === 'price-desc') return copy.sort((a, b) => b.price_sgd - a.price_sgd)
  if (sort === 'area-asc') return copy.sort((a, b) => toSqft(a) - toSqft(b))
  if (sort === 'area-desc') return copy.sort((a, b) => toSqft(b) - toSqft(a))
  if (sort === 'beds-asc') return copy.sort((a, b) => (a.bedrooms ?? 0) - (b.bedrooms ?? 0))
  if (sort === 'beds-desc') return copy.sort((a, b) => (b.bedrooms ?? 0) - (a.bedrooms ?? 0))
  return copy
}

function HomePage() {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters)
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
  const [enquireListing, setEnquireListing] = useState<Listing | null>(null)

  // Close modal on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedListing(null)
        setEnquireListing(null)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const filtered = useMemo(() => {
    const f = applyFilters(listings, filters)
    return applySort(f, filters.sort_by)
  }, [filters])

  const handleEnquire = (listing: Listing) => {
    setEnquireListing(listing)
    setSelectedListing(listing)
  }

  const activeModal = enquireListing ?? selectedListing

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <SearchForm
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
      />

      {/* Listings section */}
      <section id="listings" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: '#0f172a' }}>Property Listings</h2>
              <p className="text-gray-500 text-sm mt-1">
                {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
              </p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No properties found</h3>
              <p>No properties match your selected filters. Please adjust your search.</p>
              <button
                onClick={() => setFilters(defaultFilters)}
                className="mt-4 text-teal-600 font-medium hover:text-teal-700 underline text-sm"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filtered.map(listing => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onView={l => {
                    setEnquireListing(null)
                    setSelectedListing(l)
                  }}
                  onEnquire={handleEnquire}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <About />
      <Contact />
      <Footer />

      {/* Property detail modal */}
      {activeModal && (
        <PropertyModal
          listing={activeModal}
          initialEnquiry={!!enquireListing}
          onClose={() => {
            setSelectedListing(null)
            setEnquireListing(null)
          }}
        />
      )}
    </div>
  )
}
