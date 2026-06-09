# AGENTS.md — Andrew Chew Property

This document provides an overview of the project for developers and AI agents working on this codebase.

## Project Overview

A professional real estate listings website for Singapore property agent Andrew Chew. Built with TanStack Start (React 19 + Vite) and deployed on Netlify. All filtering is client-side; no backend or database is used.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 |
| Forms | Netlify Forms |
| Language | TypeScript (strict) |
| Deployment | Netlify |

## Key Directories

```
src/
  data/
    listings.json       # All 7 property listings — edit here to update content
  components/
    Header.tsx          # Sticky nav with mobile hamburger menu
    Hero.tsx            # Hero banner with dark gradient and stat strip
    SearchForm.tsx      # 13-field search form; exports SearchFilters type + defaultFilters
    ListingCard.tsx     # Card for a single listing; exports Listing type
    PropertyModal.tsx   # Full-screen overlay with listing details + embedded enquiry form
    EnquiryForm.tsx     # Netlify Forms AJAX submission; posts to /__forms.html
    About.tsx           # About section with 4-feature grid
    Contact.tsx         # Contact section with standalone EnquiryForm
    Footer.tsx          # Footer with disclaimer
  routes/
    __root.tsx          # HTML shell + global meta
    index.tsx           # Homepage: composes all components, holds filter/modal state
  styles.css            # Tailwind import + line-clamp utility

public/
  __forms.html          # Static Netlify Forms skeleton — required for build-time detection
  images/               # Place property images here (filenames listed in listings.json)
  placeholder.png       # Fallback when a listing image is missing
```

## Non-Obvious Decisions

- **`/__forms.html` fetch target**: Netlify Forms requires the POST to go to the static skeleton file. Posting to `/` in TanStack Start is intercepted by the SSR function and never reaches Netlify's form processor.
- **Image fallback**: `onError` on `<img>` tags swaps to `/placeholder.png` so cards don't break before real images are added.
- **Floor area normalisation**: `toSqft()` in `index.tsx` converts sqm listings to sqft for uniform comparison in the floor area filter.
- **Single modal for view + enquire**: Both "View Details" and "Enquire" open `PropertyModal`; the `initialEnquiry` prop auto-expands the enquiry form panel when clicking "Enquire".
- **All filtering is client-side**: No API routes. The full listings array is bundled in the JS output. This is fine for 7–50 listings; add a server function if the list grows large.

## Conventions

- Components are plain `.tsx` files — no barrel exports.
- Listing type lives in `ListingCard.tsx` and is imported from there.
- SearchFilters type and defaultFilters live in `SearchForm.tsx`.
- Filtering and sorting logic belongs in `index.tsx`, not in components.
- Tailwind classes only; custom overrides go in `styles.css`.

## Adding New Listings

Edit `src/data/listings.json`. Follow the `Listing` interface in `src/components/ListingCard.tsx`. Place the image in `public/images/` using the filename set in the `image` field.

## Post-Deployment

Enable email notifications in **Netlify Dashboard → Project configuration → Notifications → Form submission notifications** and set the recipient to `andrewchewch@gmail.com`.
