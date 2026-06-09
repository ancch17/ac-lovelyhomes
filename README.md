# Andrew Chew Property

A professional real estate listings website for a Singapore property agent, built with TanStack Start and Tailwind CSS, hosted on Netlify.

## Features

- Seven property listings across HDB flats, condominiums, and shophouses
- Advanced search with 13 filter fields and live updating results
- Property detail modal with key facts and an integrated enquiry form
- Netlify Forms-powered enquiry submissions (no backend required)
- Fully responsive design for mobile, tablet, and desktop

## Tech Stack

- **Framework**: TanStack Start (React 19 + Vite)
- **Styling**: Tailwind CSS v4
- **Routing**: TanStack Router
- **Forms**: Netlify Forms
- **Deployment**: Netlify

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts at [http://localhost:3000](http://localhost:3000).

> Note: Netlify Forms submissions do not work in local development. Test form submissions on a Netlify deploy preview.

## Listing Data

All property listings are stored in `src/data/listings.json`. Edit that file to add, remove, or update properties — no code changes required.

## Post-Deployment

After deploying to Netlify, enable email notifications for form submissions:

1. Go to **Netlify Dashboard → Project configuration → Notifications → Emails and webhooks**
2. Add a **Form submission** notification
3. Set the recipient to `andrewchewch@gmail.com`
