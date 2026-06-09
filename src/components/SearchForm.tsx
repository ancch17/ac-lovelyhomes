import { useState } from 'react'

export interface SearchFilters {
  keyword: string
  property_type: string
  hdb_room_type: string
  location: string
  price_range: string
  bedrooms: string
  bathrooms: string
  floor_area: string
  tenure: string
  level: string
  status: string
  buyer_profile: string
  property_use: string
  sort_by: string
}

export const defaultFilters: SearchFilters = {
  keyword: '',
  property_type: '',
  hdb_room_type: '',
  location: '',
  price_range: '',
  bedrooms: '',
  bathrooms: '',
  floor_area: '',
  tenure: '',
  level: '',
  status: '',
  buyer_profile: '',
  property_use: '',
  sort_by: '',
}

interface Props {
  filters: SearchFilters
  onChange: (filters: SearchFilters) => void
  onReset: () => void
}

export function SearchForm({ filters, onChange, onReset }: Props) {
  const [moreOpen, setMoreOpen] = useState(false)

  const set = (key: keyof SearchFilters, value: string) =>
    onChange({ ...filters, [key]: value })

  const selectClass =
    'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none cursor-pointer'

  const labelClass = 'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'

  const Select = ({
    label,
    field,
    options,
  }: {
    label: string
    field: keyof SearchFilters
    options: { label: string; value: string }[]
  }) => (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <select
          className={selectClass}
          value={filters[field]}
          onChange={e => set(field, e.target.value)}
          aria-label={label}
        >
          {options.map(o => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )

  return (
    <section id="search" className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
          {/* Keyword */}
          <div className="mb-4">
            <label className={labelClass} htmlFor="keyword-search">Search</label>
            <div className="relative">
              <input
                id="keyword-search"
                type="text"
                placeholder="Search by project, town, address or district"
                value={filters.keyword}
                onChange={e => set('keyword', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pl-10 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Primary filters - always visible */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            <Select
              label="Property Type"
              field="property_type"
              options={[
                { label: 'All property types', value: '' },
                { label: 'HDB', value: 'HDB' },
                { label: 'Condo', value: 'Condo' },
                { label: 'Shophouse', value: 'Shophouse' },
              ]}
            />
            <Select
              label="Location"
              field="location"
              options={[
                { label: 'All locations', value: '' },
                { label: 'Bedok North', value: 'Bedok North' },
                { label: 'Tampines Central', value: 'Tampines Central' },
                { label: 'Punggol Field', value: 'Punggol Field' },
                { label: 'District 19 - Hougang / Punggol', value: 'District 19 - Hougang / Punggol' },
                { label: 'District 10 - Tanglin / Holland', value: 'District 10 - Tanglin / Holland' },
                { label: 'Joo Chiat / Katong', value: 'Joo Chiat / Katong' },
                { label: 'Tanjong Pagar', value: 'Tanjong Pagar' },
              ]}
            />
            <Select
              label="Price Range"
              field="price_range"
              options={[
                { label: 'Any price', value: '' },
                { label: 'Below S$500,000', value: 'below-500k' },
                { label: 'S$500,000 to S$800,000', value: '500k-800k' },
                { label: 'S$800,000 to S$1.5M', value: '800k-1.5m' },
                { label: 'S$1.5M to S$3M', value: '1.5m-3m' },
                { label: 'S$3M to S$6M', value: '3m-6m' },
                { label: 'Above S$6M', value: 'above-6m' },
              ]}
            />
            <Select
              label="Bedrooms"
              field="bedrooms"
              options={[
                { label: 'Any bedrooms', value: '' },
                { label: '1 bedroom', value: '1' },
                { label: '2 bedrooms', value: '2' },
                { label: '3 bedrooms', value: '3' },
                { label: '4+ bedrooms', value: '4+' },
                { label: 'Not applicable', value: 'n/a' },
              ]}
            />
          </div>

          {/* More filters toggle (mobile) */}
          <button
            type="button"
            className="md:hidden flex items-center gap-2 text-sm text-teal-600 font-medium mb-3"
            onClick={() => setMoreOpen(!moreOpen)}
          >
            <svg className={`w-4 h-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {moreOpen ? 'Hide Filters' : 'More Filters'}
          </button>

          {/* Extended filters */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 ${moreOpen ? 'block' : 'hidden'} md:grid`}>
            <Select
              label="HDB Room Type"
              field="hdb_room_type"
              options={[
                { label: 'Any HDB room type', value: '' },
                { label: '3-room', value: '3-room' },
                { label: '4-room', value: '4-room' },
                { label: '5-room', value: '5-room' },
              ]}
            />
            <Select
              label="Bathrooms"
              field="bathrooms"
              options={[
                { label: 'Any bathrooms', value: '' },
                { label: '1 bathroom', value: '1' },
                { label: '2 bathrooms', value: '2' },
                { label: '3 bathrooms', value: '3' },
                { label: '4+ bathrooms', value: '4+' },
              ]}
            />
            <Select
              label="Floor Area"
              field="floor_area"
              options={[
                { label: 'Any floor area', value: '' },
                { label: 'Below 700 sqft / 70 sqm', value: 'below-700' },
                { label: '700 to 1,000 sqft / 70 to 93 sqm', value: '700-1000' },
                { label: '1,000 to 1,500 sqft / 93 to 140 sqm', value: '1000-1500' },
                { label: '1,500 to 3,500 sqft', value: '1500-3500' },
                { label: 'Above 3,500 sqft', value: 'above-3500' },
              ]}
            />
            <Select
              label="Tenure"
              field="tenure"
              options={[
                { label: 'Any tenure', value: '' },
                { label: 'HDB leasehold', value: 'HDB leasehold' },
                { label: '99-year', value: '99-year' },
                { label: 'Freehold', value: 'Freehold' },
              ]}
            />
            <Select
              label="Level / Floor"
              field="level"
              options={[
                { label: 'Any level', value: '' },
                { label: 'Mid floor', value: 'Mid floor' },
                { label: 'High floor', value: 'High floor' },
                { label: '2 storeys + attic', value: '2 storeys + attic' },
                { label: '3 storeys', value: '3 storeys' },
              ]}
            />
            <Select
              label="Status"
              field="status"
              options={[
                { label: 'Any status', value: '' },
                { label: 'Available', value: 'Available' },
              ]}
            />
            <Select
              label="Buyer Profile"
              field="buyer_profile"
              options={[
                { label: 'Any buyer profile', value: '' },
                { label: 'First-time buyer', value: 'First-time buyer' },
                { label: 'Family home', value: 'Family home' },
                { label: 'Investor', value: 'Investor' },
                { label: 'Owner-occupier', value: 'Owner-occupier' },
                { label: 'Commercial buyer', value: 'Commercial buyer' },
              ]}
            />
            <Select
              label="Property Use"
              field="property_use"
              options={[
                { label: 'Any use', value: '' },
                { label: 'Residential', value: 'Residential' },
                { label: 'Investment', value: 'Investment' },
                { label: 'Commercial', value: 'Commercial' },
                { label: 'Mixed use', value: 'Mixed use' },
                { label: 'Boutique office', value: 'Boutique office' },
                { label: 'Retail', value: 'Retail' },
                { label: 'Hospitality', value: 'Hospitality' },
              ]}
            />
          </div>

          {/* Sort + buttons */}
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="w-full sm:w-56">
              <Select
                label="Sort By"
                field="sort_by"
                options={[
                  { label: 'Recommended', value: '' },
                  { label: 'Price: low to high', value: 'price-asc' },
                  { label: 'Price: high to low', value: 'price-desc' },
                  { label: 'Floor area: small to large', value: 'area-asc' },
                  { label: 'Floor area: large to small', value: 'area-desc' },
                  { label: 'Bedrooms: low to high', value: 'beds-asc' },
                  { label: 'Bedrooms: high to low', value: 'beds-desc' },
                ]}
              />
            </div>
            <div className="flex gap-3 sm:ml-auto">
              <button
                type="button"
                onClick={onReset}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Reset Filters
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('listings')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Search Properties
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
