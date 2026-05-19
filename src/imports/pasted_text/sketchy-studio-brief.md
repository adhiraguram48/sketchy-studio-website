Here you go — full detail, right here.

---

# The Sketchy Studio — Website Structure Brief for Figma

**Nav:** `Home` `Work` `Services` `About` `Journal` `Contact`

---

## Page 1 — Home `/`

This is your first impression. Someone lands here from Instagram, a referral, or Google. They need to immediately know what you do, feel the quality of the work, and have a clear next step.

---

**Section 1 — Hero**
Full screen. This is the big statement moment.
- A single strong headline. Not "We are The Sketchy Studio." Something like *"Brands that actually look the part"* or *"Design that moves people and businesses."* Big, confident, bold.
- One line underneath explaining what you do: *"Brand identity, web design, motion, and social — for founders who care about how they show up."*
- Two buttons: **See Our Work** (primary) and **Start a Project** (secondary/outlined)
- Background: either a full-bleed showreel playing on loop (muted, no controls), or a striking static image of your best project — not a stock photo, actual work

---

**Section 2 — Services Strip**
Simple. Just a horizontal row of 4 labels showing what you offer:
`Brand Identity` / `Web Design & Build` / `Motion & Video` / `Social Media`
Could be icons + labels, or just text in a minimal strip. This isn't a deep section — it's just orientation.

---

**Section 3 — Featured Work**
3 case study tiles. This is the most important section on the homepage.
- Each tile: cover image (high quality, your actual work), client name, 2 tags (e.g. "Brand + Web"), and on hover it should show a "View Project →" overlay
- Clicking goes directly to that case study
- Below the 3 tiles: a small text link — *"View all work →"* linking to `/work`
- Choose the 3 most visually impressive projects you've done — not the biggest clients, the best-looking output

---

**Section 4 — About Teaser**
Not a full about section — just enough to humanise the brand.
- 2–3 sentences: who's behind the studio, what you believe, why clients come to you
- A photo — Caleb working, or a studio environment shot, or a behind-the-scenes moment. Not a corporate headshot.
- One CTA: **"Meet the Studio →"** links to `/about`

---

**Section 5 — Social Proof**
Two options — pick one or stack both:
- Option A: 2–3 client testimonial pull quotes. Each quote has the full text, client name, company name, and ideally a small headshot or company logo.
- Option B: A horizontal logo strip of 6–8 client logos (monochrome, consistent sizing)
- If you have both — logos first, then 1 strong quote underneath

---

**Section 6 — CTA Banner**
Big, bold close-out section before the footer.
- Headline: something punchy like *"Got a project? Let's build it."*
- One button: **Start a Project** → links to `/contact`
- Can have a background colour, texture, or image — just make it feel like a visual full stop

---

**Section 7 — Footer**
- Left: Logo + one-line tagline
- Middle: Nav links (same 6 as header)
- Right: Instagram icon link, email address (clickable mailto)
- Bottom bar: Copyright + "Built by The Sketchy Studio"

---
---

## Page 2 — Work `/work`

This is your full portfolio page. People come here to browse everything and decide if you're the right fit.

---

**Section 1 — Page Intro**
Minimal. Just:
- Headline: *"The Work"*
- 1–2 sentences: *"A curated collection of brand, web, and motion projects built for founders and growing businesses."*

---

**Section 2 — Filter Bar**
Sticky or static row of filter tabs: `All` `Brand` `Web` `Motion` `Social`
Clicking a tab filters the grid below to only show that type of work. This is a UI interaction the Figma designer needs to show as a component with active/inactive states.

---

**Section 3 — Case Study Grid**
This is the bulk of the page. A grid of cards.
- Desktop: 2 columns
- Mobile: 1 column
- Each card contains:
  - Cover image (landscape ratio, full-width of the card)
  - Client name (bold)
  - Service tags (e.g. "Brand Identity", "Web Design") as small pill labels
  - 1-line project tagline (e.g. "A complete rebrand for a Lagos-based F&B brand")
  - On hover: slight scale or overlay with "View Project →"
  - Clicking the card goes to `/work/[client-name]`
- Cards should be sorted: most recent or most impressive first
- Aim to have at least 6 case studies live at launch. 9–12 is ideal.

---

**Section 4 — Inquiry CTA**
Bottom of page, before footer:
- Text: *"Have a project in mind? Let's talk."*
- Button: **Get in Touch** → `/contact`

---
---

## Page 2a — Individual Case Study `/work/[client-name]`

This is a template page. You design one version of it, then reuse it for every project. This is arguably the most important page on the site — it's what closes potential clients.

---

**Section 1 — Hero**
Full-width, high-impact opening.
- Full-width cover image or short looping video of the project
- Overlaid or below: Client name (large type), project type tags, year completed

---

**Section 2 — Project Overview**
A 3–4 column info block in small type. Clean, scannable.
- **Client:** Brand name
- **Industry:** e.g. F&B, Fashion, Tech, Hospitality
- **Services:** Brand Identity + Web Design
- **Year:** 2024
- **Timeline:** 6 weeks

---

**Section 3 — The Challenge**
Prose section. 1–2 paragraphs.
This is the "before" state. What problem did they come to you with? What wasn't working? What were they trying to achieve? Write this in plain English — not design jargon. E.g. *"Nara Kitchen had been operating for 3 years but their brand looked like it was made in a hurry. They were losing corporate clients to competitors who looked more polished."*

---

**Section 4 — The Approach**
Prose section. 1–2 paragraphs + optional 1–2 process images.
What did you do about it? What was your thinking? Walk them through the strategy briefly — moodboards, naming, visual direction, etc. Keep it readable, not a project diary. Optional: 1–2 in-progress images (sketches, wireframes, early concepts).

---

**Section 5 — The Work**
This is the main visual gallery. The longest section.
Mix of:
- Full-width hero images (mockups, final brand assets, website screenshots)
- 2-column side-by-side images
- Context shots (product with branding applied, phone mockups, packaging, etc.)
- Short video clips if you have them
No captions needed on most — let the work speak. Add a caption only when context genuinely helps.

---

**Section 6 — The Results**
This section is what separates a portfolio from a case study. Numbers + client voice.
- 3 stat callouts in large type: e.g. *"3× increase in enquiries"*, *"Launched in 5 weeks"*, *"Featured in 2 publications"*. If you don't have hard numbers, use qualitative ones: *"First week sold out"*, *"Immediately recognised as premium"*
- 1 client testimonial: full quote, client name, job title/company. If you have a photo of the client, include it.

---

**Section 7 — Next Project**
A single wide card at the bottom:
- Cover image of the next project
- Client name
- Arrow or label: "Next Project →"
Clicking it goes to that case study. This keeps people on the site and browsing.

---

**Section 8 — CTA**
Final push:
- Text: *"Like what you see? Let's work together."*
- Button: **Start a Project** → `/contact`

---
---

## Page 3 — Services `/services`

This page needs to do the job of a sales person. By the time someone leaves this page, they should know exactly what you offer, what it costs (at least a range), and what to do next.

---

**Section 1 — Page Intro**
- Headline: *"What We Do"* or *"How We Help"*
- 2–3 sentences on the studio's service philosophy. E.g. *"We don't just make things look good. We build brands and digital presence that work — that attract the right clients, charge premium prices, and grow with the business."*

---

**Section 2 — The 4 Services**
Four full-width or alternating blocks — one per service. Each block contains:

**Brand Identity**
- 2–3 sentence description: who it's for, what the outcome is
- What's included (bullet list):
  - Logo design + variations
  - Colour palette
  - Typography system
  - Brand patterns / textures
  - Brand guidelines document
  - Social media kit
  - Business card / stationery design
- Starting price: *"From ₹1.5L"* or *"Custom quote"*
- Link to a relevant case study: *"See it in action →"*

**Web Design & Build**
- Description: who it's for, what you build on (Framer/Webflow), what outcome they get
- What's included:
  - UX strategy + sitemap
  - Visual design (desktop + mobile)
  - Full build on Framer/Webflow
  - Basic on-page SEO setup
  - Google Analytics setup
  - Training + handover
  - 2 weeks post-launch support
- Starting price: *"From ₹2L"*
- Link to relevant case study

**Motion & Video**
- Description: what you produce and when brands need it
- What's included:
  - Brand films
  - Instagram Reels production
  - Explainer videos
  - Logo animations / motion graphics
  - Social video content packs
- Pricing: *"Per project — get a quote"*
- Link to relevant case study or reel

**Social Media Management**
- Description: ongoing service, what you take off their plate
- What's included:
  - Monthly strategy session
  - Content calendar
  - 8–12 posts per week (feed + stories)
  - Copywriting + captions
  - Scheduling + posting
  - Monthly analytics report
- Starting price: *"From ₹50K/month"*
- Link to relevant result or client example

---

**Section 3 — How We Work**
4 steps. Simple numbered flow:
1. **Discovery** — We get under the skin of your business, your audience, and your goals
2. **Strategy** — We map out the direction: positioning, visual approach, and deliverables
3. **Design** — We build it. You get regular check-ins and revision rounds throughout
4. **Launch** — We deliver, brief your team, and make sure nothing's missed

Each step: number + name (bold) + 2-sentence description. Can be horizontal or vertical layout.

---

**Section 4 — FAQs**
Collapsible accordion. 6–8 questions. Suggested questions:
- How long does a brand identity project take?
- Do you work with startups or only established businesses?
- How many revisions do I get?
- Do you offer payment plans?
- What do I need to have ready before we start?
- Can you do brand and website together?
- Do you work with clients outside [city/country]?
- What platforms do you build websites on?

---

**Section 5 — CTA**
- Headline: *"Ready to get started?"*
- Subtext: *"Book a free 30-minute discovery call. No pressure, no pitch."*
- Button: **Book a Call** → `/contact`

---
---

## Page 4 — About `/about`

People read this page after they've decided they like your work. This is where they decide if they like *you*. It needs to feel real — not polished agency copy.

---

**Section 1 — Studio Intro**
Full-width section. Strong visual (Caleb, studio space, behind-the-scenes).
- Headline: *"We Are The Sketchy Studio"*
- 3–4 paragraphs:
  - Para 1: What the studio is. When it started, where it's based.
  - Para 2: What you believe about design, branding, and working with clients.
  - Para 3: Who you build for. The type of client you do your best work with.
  - Para 4: What makes working with you different from a bigger agency or a freelancer on Fiverr.

Write this in first person — "we" or "I" depending on how solo the studio is. Avoid clichés like "passionate about design" or "creative solutions."

---

**Section 2 — The Team**
If it's just Caleb:
- Large photo (not a passport photo — a real, characterful shot)
- Name + title: *"Caleb — Founder & Creative Director"*
- 3–4 sentence bio: background, why he started the studio, what he nerds out on
- Optional: a subtle, honest personal detail that makes him feel human

If there are other team members: same format, stacked or in a grid.

If it's solo but with collaborators: *"Built by one, supported by a trusted network of photographers, copywriters, and developers."* — List collaborator types but not necessarily names.

---

**Section 3 — Studio Values**
3–4 values. Each has a name and 2-sentence explanation. Make these specific to how you actually work — not generic agency values. Examples:
- **We finish what we start** — Lots of agencies are great in the pitch. We're great at delivery. Every project gets the same energy at week 8 as it did on day 1.
- **Design should earn its keep** — Pretty for its own sake doesn't interest us. We care about whether the work actually moves the business forward.
- **We say no when we should** — If a direction isn't right, we'll tell you. We'd rather have a hard conversation early than deliver something we're not proud of.

---

**Section 4 — Past Clients**
Two options:
- Logo grid of brands worked with (monochrome, 6–10 logos, consistent sizing)
- Or a simple text line: *"We've worked with brands in food & beverage, fashion, tech, hospitality, and professional services across Nigeria, the UK, and internationally."*

---

**Section 5 — CTA**
- *"Think we'd work well together?"*
- Button: **Let's Talk** → `/contact`

---
---

## Page 5 — Journal `/journal`

This is the blog. Primarily for SEO and for showing that the studio thinks. Over time this becomes a traffic driver. At launch, aim for 4–6 articles ready to go.

---

**Section 1 — Page Intro**
- Headline: *"The Journal"*
- 1 line: *"Thoughts on brand, design, and building a business that stands out."*

---

**Section 2 — Featured Article**
One large card at the top. Full width. Contains:
- Large cover image
- Category tag (Brand / Web / Studio / Motion)
- Article title (large)
- 1–2 sentence excerpt
- *"Read more →"* link
- Date + read time

This slot should always show your most recent or most popular article.

---

**Section 3 — Article Grid**
2-column grid of article cards below the featured post. Each card:
- Cover image (consistent aspect ratio across all cards)
- Category tag
- Title
- 1-line excerpt
- Date + read time (e.g. "Mar 2026 · 5 min read")
- Clicking goes to `/journal/[post-slug]`

---

**Section 4 — Newsletter CTA**
Inline banner within or below the grid:
- Text: *"Get the Sketchy newsletter — brand strategy, design thinking, and studio updates. Monthly. No spam."*
- Email input field + **Subscribe** button
- Connected to Mailchimp (free tier)

---
---

## Page 5a — Individual Article `/journal/[post-slug]`

One template used for all articles.

---

**Section 1 — Article Header**
- Category tag (pill label)
- Article title — H1, big and bold
- Author: Caleb's small photo + name + *"Founder, The Sketchy Studio"*
- Date published + estimated read time
- Cover image (full-width, below the header text or as background)

---

**Section 2 — Article Body**
This is a rich text content area. Needs to support:
- H2, H3 headings
- Body paragraphs
- Bold and italic inline text
- Pull quotes (larger styled quote block)
- Inline images (full-width + 50% width)
- Bullet lists and numbered lists
- Optional: horizontal dividers between sections

---

**Section 3 — Author Card**
At the bottom of the article. Small block:
- Caleb's photo (circular or square)
- Name + title
- 2-sentence bio
- Optional: Instagram link

---

**Section 4 — Related Articles**
*"You might also like"* — 2–3 article cards using the same card component as the Journal grid.

---

**Section 5 — CTA**
- *"Enjoyed this? We'd love to work with you."*
- Button: **Start a Project** → `/contact`

---
---

## Page 6 — Contact `/contact`

No fluff here. Someone on this page is ready to talk. Make it as easy as possible.

---

**Section 1 — Intro**
- Headline: *"Let's Work Together"* or *"Start a Project"*
- 1–2 lines: *"Fill in the form and we'll get back to you within 1 business day. Prefer email? That works too."*

---

**Section 2 — Contact Form**
Fields (in order):
- Your name *
- Email address *
- Company / Brand name (optional)
- What are you looking for? (dropdown): Brand Identity / Web Design / Motion & Video / Social Media / Multiple services / Not sure yet
- Budget range (dropdown): Under ₹50K / ₹50K–1L / ₹1L–2L / ₹2L–5L / ₹5L+ / Let's discuss
- Tell us about your project (open text, multi-line)
- **Send it →** (submit button)

Note: Keep it short. No one fills out 15-field forms. These 7 fields are the maximum.

---

**Section 3 — Direct Contact**
Alongside or below the form:
- Email: hello@thesketchystudio.com (clickable mailto)
- Instagram: @thesketchystudio (linked)
- Response time: *"We reply within 1 business day"*
- Optional: Calendly link — *"Prefer to book a call directly? →"*

---
---

## Global Components Summary

These are built once as Figma components and reused everywhere:

**Navigation Bar** — Logo left, links centre or right, "Start a Project" CTA button far right. Needs desktop + mobile (hamburger) states.

**Footer** — Logo, nav links, social links, email, copyright. Consistent across all pages.

**Case Study Card** — Used on Home and Work pages. Cover image, client name, tags, hover state. Build as one component.

**Article Card** — Used on Journal page and Home (optional). Cover image, tag, title, excerpt, date, read time.

**CTA Banner** — Full-width section with headline + button. Used on Home, Services, About, Journal, every case study, every article. Build as a component with editable text.

**Testimonial Block** — Quote text, client name, company, optional photo. Used on Home and Services.

**Filter Tab** — Active and inactive states. Used on Work page.

**Service Block** — Title, description, bullet list, price, CTA link. Used on Services page (×4).

**404 Page** — Needs to exist. Headline like *"Nothing here."* and a button back to Home or Work.

---

## Figma File Structure Suggestion

Organise the Figma file like this:
```
Cover
Components (all reusable components)
01 - Home
02 - Work (index)
02a - Case Study (template, filled with 1 real example)
03 - Services
04 - About
05 - Journal (index)
05a - Article (template, filled with 1 real example)
06 - Contact
07 - 404
Mobile (all pages at 390px width)
```

**Desktop frame width:** 1440px
**Mobile frame width:** 390px
Design desktop first, then mobile. Every page needs both.

**Total distinct screens to design:** ~18–22 frames before mobile

---

That is everything the Figma designer needs to know. No design decisions in there — just structure, content, and function. They take this and decide how it looks.