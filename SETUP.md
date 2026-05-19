# The Sketchy Studio — Setup & Deployment Guide

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Deployment (Recommended: Vercel)

1. Push this project to a GitHub repo
2. Go to [vercel.com](https://vercel.com) and connect your GitHub account
3. Import the repo → Vercel auto-detects Vite and deploys
4. Set your custom domain `thesketchystudio.com` in Vercel's domain settings
5. Every future `git push` automatically redeploys the site

---

## Contact Form Setup (Formspree)

The contact form currently has a placeholder `YOUR_FORM_ID`. To activate it:

1. Go to [formspree.io](https://formspree.io) — create a free account
2. Create a new form → copy the form ID (e.g., `xqkwbgzr`)
3. Open `src/app/pages/Contact.tsx`
4. Replace `YOUR_FORM_ID` with your actual Formspree ID
5. Submissions will arrive in your email and Formspree dashboard

---

## Calendly Link

1. Create a free account at [calendly.com](https://calendly.com)
2. Set up a 30-minute "Discovery Call" event type
3. Open `src/app/data/content.ts`
4. Update the `calendly` field in `nav` with your Calendly URL

---

## Updating Content (No Code Needed)

### Option A: Edit Mode (in-browser, saves to localStorage)
- Visit the live site → click the **✏️ Edit Mode** button (bottom right)
- Click on text to edit it
- Click on images to swap them (enter a new image URL)
- Changes persist in the browser via localStorage

> ⚠️ localStorage is browser-specific — changes won't show on other devices/browsers.
> Use Option B for permanent content updates.

### Option B: Edit content.ts directly
- Open `src/app/data/content.ts`
- Update any fields: testimonials, case studies, hero text, etc.
- Push to GitHub → Vercel redeploys automatically

---

## Backend / CMS (Recommended: Sanity)

To update content without touching code (e.g., add case studies, blog posts, update testimonials from a dashboard):

### Setup Sanity.io (free tier)
1. Run: `npm create sanity@latest -- --project YOUR_PROJECT_NAME --dataset production`
2. Define schemas for: `caseStudy`, `article`, `siteSettings`
3. Replace `defaultContent` imports with Sanity API calls
4. Deploy the Sanity Studio at `studio.thesketchystudio.com`

This gives Caleb a full content dashboard where anyone can:
- Add/edit case studies with images, results, testimonials
- Write and publish blog articles
- Update homepage stats and testimonials

> Ask your developer (Claude) to wire up Sanity when you're ready — it's a 2-3 hour setup.

---

## Adding Real Project Images

Current images are Unsplash placeholders. To add real work:

1. Upload images to a host (Cloudinary free tier, or any CDN)
2. Get the image URL
3. Update the `coverImage` and `projectImages` arrays in `src/app/data/content.ts` for each case study

OR use Edit Mode on the live site to swap image URLs in-browser.

---

## Newsletter (Mailchimp)

To add newsletter sign-up to the Journal page:

1. Create a Mailchimp free account
2. Get your embedded form action URL
3. Update the newsletter section in `src/app/pages/Journal.tsx`

---

## SEO Improvements (recommended)

Add these to `index.html`:
- `<meta name="description" content="...">`
- Open Graph tags for social sharing
- Structured data (JSON-LD) for the agency

---

## Key Files

| File | What it controls |
|------|-----------------|
| `src/app/data/content.ts` | All site content (text, case studies, articles) |
| `src/app/pages/Home.tsx` | Homepage layout |
| `src/app/pages/Work.tsx` | Portfolio grid |
| `src/app/pages/CaseStudy.tsx` | Individual case study template |
| `src/app/pages/Services.tsx` | Services page |
| `src/app/pages/About.tsx` | About / team page |
| `src/app/pages/Journal.tsx` | Blog index |
| `src/app/pages/Contact.tsx` | Contact form |
| `src/app/components/Layout.tsx` | Navigation + Footer |
| `src/app/components/SketchyUI.tsx` | Reusable UI components + color theme |
