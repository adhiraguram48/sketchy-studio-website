export type HomeSectionType =
  | 'hero' | 'services-marquee' | 'statement' | 'work-grid'
  | 'pinned-work' | 'about-teaser' | 'clients' | 'testimonials' | 'cta';

export interface HomeSectionConfig {
  id: string;
  type: HomeSectionType;
  enabled: boolean;
}

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  industry: string;
  services: string[];
  year: string;
  timeline: string;
  tags: string[];
  coverImage: string;
  projectImages: string[];
  tagline: string;
  shortDescription: string;
  challenge: string;
  approach: string[];
  accentColor?: string;
  results: {
    stats: { value: string; label: string }[];
    testimonial: {
      quote: string;
      author: string;
      title: string;
      company: string;
      photo?: string;
    };
  };
  nextProject?: string;
}

export interface ArticleBlock {
  type: 'h2' | 'h3' | 'p' | 'quote' | 'image' | 'list';
  content: string | string[];
  caption?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    title: string;
    photo: string;
  };
  content: ArticleBlock[];
}

export interface SiteContent {
  nav: {
    logo: string;
    tagline: string;
    email: string;
    phone: string;
    instagram: string;
    calendly: string;
  };
  home: {
    heroHeadline: string;
    heroSub: string;
    aboutTeaser: string;
    aboutTeaserSub: string;
    ctaHeadline: string;
    ctaSub: string;
    testimonials: { quote: string; author: string; company: string; photo: string; title: string }[];
    clients: string[];
    stats: { value: string; label: string }[];
    homeSections: HomeSectionConfig[];
  };
  about: {
    headline: string;
    para1: string;
    para2: string;
    para3: string;
    para4: string;
    founderName: string;
    founderTitle: string;
    founderBio: string;
    founderPhoto: string;
    studioPhoto: string;
    team: { name: string; title: string; bio: string; photo: string }[];
    values: { name: string; description: string }[];
    quotes: { text: string; author: string }[];
  };
  services: {
    headline: string;
    sub: string;
    list: {
      id: string;
      name: string;
      tagline: string;
      description: string;
      deliverables: string[];
      startingPrice: string;
      linkedCaseStudy: string;
      linkedCaseStudyLabel: string;
      tags: string[];
    }[];
    process: { step: string; name: string; description: string }[];
    faqs: { question: string; answer: string }[];
  };
  caseStudies: CaseStudy[];
  articles: Article[];
}

export const defaultContent: SiteContent = {
  nav: {
    logo: "The Sketchy Studio",
    tagline: "Designs that don't just sit pretty — they work, they sell, they bite.",
    email: "hello@thesketchystudio.com",
    phone: "+91 94493 58959",
    instagram: "@thesketchystudio",
    calendly: "https://calendly.com/d/ctzp-p9t-2c6/one-off-meeting",
  },

  home: {
    heroHeadline: "Brands that don't just sit pretty.",
    heroSub: "Brand identity, web design, motion, and social — built for founders who refuse to look like everyone else.",
    aboutTeaser: "We're a design studio built on one belief: your brand should work as hard as you do.",
    aboutTeaserSub: "The Sketchy Studio is a full-service creative agency based in Bangalore — building brands, websites, videos, and social strategies for businesses that want to stand out. Mystery, meaning, and mischief in every pixel.",
    ctaHeadline: "Got a project? Let's build it.",
    ctaSub: "We turn vague ideas into brands that bite. Book a free 30-min discovery call.",
    stats: [
      { value: "50+", label: "Brands Built" },
      { value: "6+", label: "Industries Served" },
      { value: "100%", label: "Client Retention" },
    ],
    testimonials: [
      {
        quote: "Finding a team who designs well and understands the context so the design actually works for your business is incredibly rare. With Sketchy, we've found exactly that.",
        author: "Achyuth Kumar",
        title: "Founder",
        company: "Real Nutri Co",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
      },
      {
        quote: "As a founder, it was an absolute pleasure to not worry about social media. Their team stuck to deadlines and conveyed our vision accurately every single time.",
        author: "Srikanth",
        title: "Founder",
        company: "Ground Animal Welfare",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
      },
      {
        quote: "Prateek has been exceptionally good at developing our website — understanding our needs, seamless communication, and always delivering on time.",
        author: "Meenakshi Babu",
        title: "Founder",
        company: "Yugen Education Foundation",
        photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop"
      }
    ],
    clients: ["Real Nutri Co", "Coffee Chemistry", "TerraBarn", "Barky Brews", "Yugen Foundation", "Ground Animal Welfare"],
    homeSections: [
      { id: 's-hero', type: 'hero', enabled: true },
      { id: 's-services', type: 'services-marquee', enabled: true },
      { id: 's-statement', type: 'statement', enabled: true },
      { id: 's-work', type: 'work-grid', enabled: true },
      { id: 's-pinned', type: 'pinned-work', enabled: true },
      { id: 's-about', type: 'about-teaser', enabled: true },
      { id: 's-clients', type: 'clients', enabled: true },
      { id: 's-testimonials', type: 'testimonials', enabled: true },
      { id: 's-cta', type: 'cta', enabled: true },
    ],
  },

  about: {
    headline: "The People Behind The Mischief",
    para1: "The Sketchy Studio is a full-service creative agency based in Bangalore, built for brands that refuse to blend in. We sketch, stretch, and strategy your brand until it does exactly what it should — work.",
    para2: "We believe most brands are forgettable. We fix that. Great design isn't decoration — it's infrastructure. A brand that looks right opens doors, charges more, and builds trust before a single word is spoken.",
    para3: "We do our best work with ambitious founders, growing startups, and businesses that know their brand isn't yet reflecting what they're actually building — whether that's health & wellness, F&B, fashion, tech, education, or social impact. If the ambition is there, we're in.",
    para4: "What makes us different? We stay close to the work. Every project gets the full team — strategy, design, development, and content — aligned from day one. Not a generic template. A custom-built solution for your specific business.",
    founderName: "Adhi",
    founderTitle: "Co-Founder & Creative Director",
    founderBio: "Adhi co-founded The Sketchy Studio with a simple conviction: that good design and good strategy should come from the same place. He leads creative direction across branding, web, and content — and is the person obsessing over whether your brand is actually doing the job it needs to do.",
    founderPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=700&fit=crop",
    studioPhoto: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
    team: [
      {
        name: "Adhi",
        title: "Co-Founder & Creative Director",
        bio: "Leads strategy and creative direction. The one asking uncomfortable questions until the brief is actually right.",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"
      },
      {
        name: "Prateek",
        title: "Co-Founder & Lead Developer",
        bio: "Builds fast, pixel-perfect websites on Framer and Webflow. The person clients quote in testimonials because he never misses a deadline.",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
      },
      {
        name: "Shreya",
        title: "Designer",
        bio: "Visual designer with a sharp eye for brand systems, social content, and everything that needs to look effortlessly good.",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
      },
      {
        name: "Sathvik",
        title: "Video & Motion",
        bio: "The one behind the camera and the edit timeline — reels, brand films, and content that actually stops the scroll.",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
      }
    ],
    quotes: [
      { text: "Design should earn its keep. Pretty for its own sake doesn't interest us.", author: "Adhi, Co-Founder" },
      { text: "Most brands are forgettable. We fix that. Great design isn't decoration — it's infrastructure.", author: "Prateek, Co-Founder" },
      { text: "We stay close to the work. Every project gets the full team, aligned from day one.", author: "The Sketchy Studio" },
    ],
    values: [
      {
        name: "We finish what we start",
        description: "Lots of agencies are great in the pitch. We're great at delivery. Every project gets the same energy at week 8 as it did on day 1. We don't disappear on you."
      },
      {
        name: "Design should earn its keep",
        description: "Pretty for its own sake doesn't interest us. We care about whether the work actually moves the business forward — more enquiries, higher prices, better clients."
      },
      {
        name: "We say no when we should",
        description: "If a direction isn't right, we'll tell you. We'd rather have a hard conversation early than deliver something we're not proud of. That's how you end up with work that lasts."
      },
      {
        name: "Strategy before style",
        description: "We start every project with context — who you're for, what you're saying, and what success looks like. That's the work that makes the design matter."
      }
    ]
  },

  services: {
    headline: "What We Do",
    sub: "We don't just make things look good. We build brands and digital presence that work — that attract the right clients, charge what they're worth, and grow with the business.",
    list: [
      {
        id: "branding",
        name: "Brand Identity",
        tagline: "Your brand, but make it unforgettable.",
        description: "A complete visual identity built from strategy up. We go from positioning and naming all the way through to a full design system that works across every touchpoint.",
        deliverables: [
          "Brand strategy & positioning",
          "Logo design + all variations",
          "Colour palette + typography system",
          "Brand patterns, textures & iconography",
          "Brand guidelines document",
          "Social media kit + stationery",
          "Packaging concepts (where applicable)",
        ],
        startingPrice: "Get a quote",
        linkedCaseStudy: "/work/real-nutri-co",
        linkedCaseStudyLabel: "See it: Real Nutri Co →",
        tags: ["Brand"],
      },
      {
        id: "websites",
        name: "Sketchy Websites",
        tagline: "Sleek. Fast. SEO-smart. Built to convert.",
        description: "We build Framer and Webflow sites that load fast, look stunning on every device, and are designed to turn visitors into enquiries. UX-led, mobile-first, built with your goals at the centre.",
        deliverables: [
          "UX strategy + information architecture",
          "Visual design (desktop + mobile)",
          "Full build on Framer or Webflow",
          "Copywriting & messaging",
          "On-page SEO setup",
          "Google Analytics integration",
          "2 weeks post-launch support",
        ],
        startingPrice: "Get a quote",
        linkedCaseStudy: "/work/yugen-education",
        linkedCaseStudyLabel: "See it: Yugen Education →",
        tags: ["Web"],
      },
      {
        id: "videos",
        name: "Sketchy Videos",
        tagline: "Your brand, but in motion.",
        description: "Reels, brand films, product videos, and social content that stops the scroll. We handle concept, scripting, filming, and editing — from idea to publish-ready.",
        deliverables: [
          "Concept development & scripting",
          "Storyboarding",
          "Reels / Shorts production",
          "Editing with captions, hooks & music",
          "Voiceovers where needed",
          "Brand story films",
          "Event coverage & product videography",
        ],
        startingPrice: "Get a quote",
        linkedCaseStudy: "/work/coffee-chemistry",
        linkedCaseStudyLabel: "See it: Coffee Chemistry →",
        tags: ["Motion"],
      },
      {
        id: "socials",
        name: "Sketchy Socials",
        tagline: "We don't just post — we plot.",
        description: "Full-service social media management. Strategy, content creation, photography, animation, posting, and monthly reporting — all taken off your plate so you can focus on running the business.",
        deliverables: [
          "Monthly strategy session",
          "Content calendar (30 days)",
          "Photography & videography",
          "Copywriting + captions",
          "Animation & branded graphics",
          "Scheduling + posting",
          "Monthly analytics report",
        ],
        startingPrice: "Get a quote",
        linkedCaseStudy: "/work/ground-animal-welfare",
        linkedCaseStudyLabel: "See it: Ground →",
        tags: ["Social"],
      },
    ],
    process: [
      { step: "01", name: "Kickoff Chat", description: "This is where the magic begins. We dig into your brand, your goals, your audience — and define what success actually looks like for your business." },
      { step: "02", name: "Strategy", description: "We map the direction: positioning, visual approach, content plan, and deliverables. No guesswork, no templates — just a plan built for you." },
      { step: "03", name: "Design & Build", description: "We build it. You get regular check-ins, progress updates, and revision rounds throughout. You're never left guessing." },
      { step: "04", name: "Launch & Handover", description: "We deliver, brief your team, and make sure nothing's missed. Post-launch support is built in — because the work doesn't stop at handover." },
    ],
    faqs: [
      { question: "How long does a brand identity project take?", answer: "Typically 4–6 weeks from kickoff to final delivery. More complex projects with web or motion included run 6–10 weeks. We'll give you a specific timeline in your proposal." },
      { question: "Do you work with startups or only established businesses?", answer: "Both. We love working with founders in their first 1–3 years — brand work at that stage has the highest impact. We also work with established businesses that have outgrown their current identity." },
      { question: "How many revisions do I get?", answer: "Two full revision rounds per project phase. With a thorough discovery process upfront, we rarely need both — but they're there if you need them." },
      { question: "Do you offer payment plans?", answer: "Yes. We work on a 50% upfront, 50% on completion structure for most projects. For larger engagements we can discuss milestone-based payments." },
      { question: "What platforms do you build websites on?", answer: "Primarily Framer and Webflow. Both let you make content updates yourself post-launch without needing a developer for every small change." },
      { question: "Can you handle brand + website together?", answer: "Yes — and we recommend it. When both come from the same studio, the translation from brand to web is seamless. Bundled projects also get a better rate." },
      { question: "Do you work with clients outside Bangalore?", answer: "Absolutely. We work across India and internationally — most of our process runs smoothly over video calls and shared tools. Location is rarely an issue." },
      { question: "What do I need before we start?", answer: "Just a clear sense of your business and your goals. We guide the discovery process — you don't need a polished brief before reaching out." },
    ],
  },

  caseStudies: [
    {
      id: "1",
      slug: "real-nutri-co",
      client: "Real Nutri Co",
      industry: "Health & Nutrition",
      services: ["Brand Identity", "Web Design & Build", "Social Media", "Content Strategy"],
      year: "2024",
      timeline: "Ongoing partnership",
      tags: ["Brand", "Web", "Social"],
      coverImage: "https://images.unsplash.com/photo-1622480916113-9000ac49b79d?w=1200&h=800&fit=crop",
      projectImages: [
        "https://images.unsplash.com/photo-1622480916113-9000ac49b79d?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=700&h=500&fit=crop",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&h=500&fit=crop",
      ],
      tagline: "Positioning India's first high-protein rice from zero to recognised brand.",
      shortDescription: "Full brand build, website, and ongoing social strategy for a health food startup disrupting the traditional rice market.",
      challenge: "Real Nutri Co introduced an innovative high-protein rice to a market where rice had been unchanged for decades. Consumers didn't know the category existed, let alone why it mattered. They needed brand presence built from zero — credibility, education, and community, all at once — in a sector that doesn't take new entrants lightly.",
      approach: [
        "Built the brand around scientific credibility with human warmth — a visual identity in mint green, soft beige, and deep charcoal that communicated health without the cold clinical feel most nutrition brands default to.",
        "Designed the website to educate first, convert second: clear product storytelling, nutritionist-backed content, and a social strategy built on balancing education, inspiration, and community.",
        "Ran influencer collaborations and A/B-tested email sequences to build reach.",
        "Used lifestyle photography to make high-protein rice feel aspirational, not functional.",
      ],
      results: {
        stats: [
          { value: "2×", label: "Instagram engagement growth" },
          { value: "From 0", label: "To recognised brand in category" },
          { value: "Ongoing", label: "Content & community partnership" },
        ],
        testimonial: {
          quote: "Finding a team who designs well and understands the context so the design actually works for your business is incredibly rare. With Sketchy Designs, we've found this rare capability.",
          author: "Achyuth Kumar",
          title: "Founder",
          company: "Real Nutri Co",
          photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
        }
      },
      nextProject: "coffee-chemistry"
    },
    {
      id: "2",
      slug: "coffee-chemistry",
      client: "Coffee Chemistry",
      industry: "Specialty Café / F&B",
      services: ["Design System", "Packaging", "Website", "Social Media", "Video"],
      year: "2025",
      timeline: "Ongoing partnership",
      tags: ["Brand", "Web", "Motion", "Social"],
      coverImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=800&fit=crop",
      projectImages: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&h=500&fit=crop",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&h=500&fit=crop",
      ],
      tagline: "Turning a chemistry-themed café's 365 flavours into a coherent brand universe.",
      shortDescription: "End-to-end brand system, packaging for 365 SKUs, website with online ordering, and ongoing content for Bangalore's most distinctive café.",
      challenge: "Coffee Chemistry serves coffee in beakers and lab glassware and stocks 365 distinct flavours — but their visual identity was completely fragmented. Packaging was inconsistent, social media had inflated bot followers, there was no website or online ordering, and the brand's genuinely brilliant concept wasn't coming through in any touchpoint. They were expanding to a second outlet in Banashankari and needed to show up consistently.",
      approach: [
        "Built a unified design system from scratch — logo standardisation, spatial graphics, wall art, and a 365-SKU packaging system that still felt coherent at scale.",
        "Built a full website with online ordering and payment integration.",
        "Ran a social media audit and bot removal, then launched a reels-first strategy built around the visual drama of the coffee science concept.",
        "Covered two outlet expansions with brand-consistent creative across every new touchpoint.",
        "Produced product videography that turned their beaker-serving ritual into shareable content.",
      ],
      results: {
        stats: [
          { value: "365", label: "SKU packaging system designed" },
          { value: "2", label: "Outlet expansions covered" },
          { value: "Consistent", label: "Brand across every touchpoint" },
        ],
        testimonial: {
          quote: "Finding a team who designs well and understands business context is rare. With Sketchy Designs, we've found exactly that capability.",
          author: "Sulakshana DR",
          title: "Owner",
          company: "Coffee Chemistry",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
        }
      },
      nextProject: "terrabarn"
    },
    {
      id: "3",
      slug: "terrabarn",
      client: "TerraBarn",
      industry: "Fashion & Jewellery",
      services: ["Brand Identity", "UI/UX Design", "Shopify Development", "Social Media"],
      year: "2025",
      timeline: "3 months",
      tags: ["Brand", "Web", "Social"],
      coverImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&h=800&fit=crop",
      projectImages: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1611085583191-a3b181a88578?w=700&h=500&fit=crop",
        "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=700&h=500&fit=crop",
      ],
      tagline: "Taking a handmade terracotta jewellery brand from word-of-mouth to modern heritage brand.",
      shortDescription: "Brand identity, Shopify e-commerce build, and social media strategy for a sustainable artisanal jewellery label with zero prior digital presence.",
      challenge: "TerraBarn made genuinely beautiful handmade terracotta jewellery — but had no online presence, no defined visual identity, products without names, and collections without stories. Sales were entirely word-of-mouth and local markets. They couldn't scale beyond what a single founder could reach in person.",
      approach: [
        "Positioned TerraBarn as a minimalist-luxury brand that happened to be sustainable — not a sustainable brand that happened to be minimal.",
        "Developed a natural earthy colour palette (rust, sandy neutrals, muted greens) with serif elegance and clean hierarchy.",
        "Named collections gave products memorability and retail presence without a store.",
        "Lifestyle photography made the jewellery feel wearable rather than craft-fair.",
        "Built the Shopify store for visual storytelling with frictionless checkout.",
        "Shifted social to a consistent grid of texture-rich imagery and sustainability-led reels.",
      ],
      results: {
        stats: [
          { value: "Zero → Online", label: "Digital storefront launched" },
          { value: "Growing", label: "Instagram saves, shares & engagement" },
          { value: "Named", label: "Collections with brand recall" },
        ],
        testimonial: {
          quote: "I have known Prateek for years — he built my website — and now, along with his wonderful team (Shreya, Rachna, Sathvik and Chirag) they've built something I'm genuinely proud of.",
          author: "Poornima",
          title: "Founder",
          company: "TerraBarn",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
        }
      },
      nextProject: "barky-brews"
    },
    {
      id: "4",
      slug: "barky-brews",
      client: "Barky Brews",
      industry: "Pet Care & Wellness",
      services: ["Brand Strategy", "Creative Direction", "Social Content", "Website"],
      year: "2025",
      timeline: "Ongoing",
      tags: ["Brand", "Web", "Social"],
      coverImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=800&fit=crop",
      projectImages: [
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=700&h=500&fit=crop",
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=700&h=500&fit=crop",
      ],
      tagline: "Reframing a dog juice brand as a whole-lifestyle dog wellness platform.",
      shortDescription: "Brand strategy and social content for a pet wellness brand — built around purpose, not product.",
      challenge: "Barky Brews had an interesting product — a health drink for dogs — but the real challenge was that 'dog juice' is a novelty. Leading with the product risked the brand staying a gimmick. The founders needed to figure out what the brand actually stood for before any creative decisions could be made.",
      approach: [
        "Rejected feature-led marketing entirely — asked instead: what does it actually mean to take care of a dog long-term?",
        "Identified that most pet wellness brands rely on clinical language or generic cute content, missing the emotional depth dog owners actually feel.",
        "Built a brand strategy around dog-first content covering gut health, physical wellness, emotional wellbeing, and longevity.",
        "Established a voice: calm, playful without gimmicks, never preachy.",
        "Executed through cartoon-style social content, a care-philosophy website, and product positioning as one part of a bigger wellness story.",
      ],
      results: {
        stats: [
          { value: "Purpose-led", label: "Brand strategy defined" },
          { value: "Dog-first", label: "Content philosophy established" },
          { value: "Growing", label: "Community around canine wellness" },
        ],
        testimonial: {
          quote: "Finding a team who designs well and understands business context is rare. With Sketchy Designs, we've found exactly that.",
          author: "Sunder Raman",
          title: "Founder",
          company: "Dog Swag India",
          photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
        }
      },
      nextProject: "yugen-education"
    },
    {
      id: "5",
      slug: "yugen-education",
      client: "Yugen Education Foundation",
      industry: "Education / Non-Profit",
      services: ["UI/UX Design", "Website Development", "Content Strategy", "Custom Illustrations"],
      year: "2024",
      timeline: "10 weeks",
      tags: ["Web"],
      coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop",
      projectImages: [
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=700&h=500&fit=crop",
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&h=500&fit=crop",
      ],
      tagline: "A rural education non-profit website that finally matches the scale of their mission.",
      shortDescription: "Full website redesign, content strategy, and custom illustrations for a non-profit transforming rural education across India.",
      challenge: "Yugen Education Foundation was doing critical, high-impact work transforming rural education in India — but their digital presence told a different story. Outdated design, fragmented content, and no distinct visual identity made it hard for corporate donors and institutional partners to understand the scope of what Yugen was building. The gap between the organisation's impact and its online presence was costing them credibility with exactly the people they needed to reach.",
      approach: [
        "Restructured the information architecture to answer the questions donors and partners actually ask: what do you do, who does it affect, and how do I get involved.",
        "Created custom human-centred illustrations to reflect the grassroots community Yugen serves — warm, vibrant, and distinctly not stock-photo.",
        "Ran content strategy and copywriting alongside design, so every word earned its place.",
        "Optimised the build for speed and accessibility, because the audience was broad and the device range was wide.",
      ],
      results: {
        stats: [
          { value: "Launched", label: "yugeneducation.in on time" },
          { value: "Clear", label: "Donor journey from landing to action" },
          { value: "Custom", label: "Illustrations reflecting real communities" },
        ],
        testimonial: {
          quote: "Prateek has been exceptionally good at developing our website — starting with understanding our needs effectively, ensuring seamless communication, and delivering on time.",
          author: "Meenakshi Babu",
          title: "Founder",
          company: "Yugen Education Foundation",
          photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop"
        }
      },
      nextProject: "ground-animal-welfare"
    },
    {
      id: "6",
      slug: "ground-animal-welfare",
      client: "Ground Animal Welfare",
      industry: "Animal Welfare / Social Impact",
      services: ["Brand Identity", "Design System", "Social Media", "Website Development"],
      year: "2024",
      timeline: "Ongoing",
      tags: ["Brand", "Web", "Social"],
      coverImage: "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=1200&h=800&fit=crop",
      projectImages: [
        "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1548681528-6a5c45b66063?w=700&h=500&fit=crop",
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=700&h=500&fit=crop",
      ],
      tagline: "Giving an animal welfare organisation the brand presence their mission deserves.",
      shortDescription: "Brand identity, design system, social strategy, and website for a founder-led animal rights organisation with zero prior digital infrastructure.",
      challenge: "Ground Animal Welfare was doing important, consistent work — but their communication was visually fragmented, they had no website, and their social content leaned heavily on emotionally-charged imagery rather than the education-led narrative that builds long-term community. They needed everything built from scratch: identity, website, content framework, and a social strategy that could run without the founder having to think about it.",
      approach: [
        "Established a design system in natural colour palettes and accessible typography that communicated the cause without guilt-tripping.",
        "Shifted the content framework from shock-value imagery to sustained education — themed storytelling around sustainability, adoption journeys, and plant-based living.",
        "Built reels, carousels, and educational posts that grew an audience that actually engaged.",
        "Launched the website (ground-animalwelfare.org) with mission clarity, a project gallery, and partnership opportunities built in from day one.",
      ],
      results: {
        stats: [
          { value: "Live", label: "ground-animalwelfare.org launched" },
          { value: "Growing", label: "Social engagement month on month" },
          { value: "100%", label: "On-brief, every deadline met" },
        ],
        testimonial: {
          quote: "From helping identify the right aesthetic to strategising implementation, their team consistently met deadlines and remained responsive to feedback throughout.",
          author: "Srikanth",
          title: "Founder",
          company: "Ground Animal Welfare",
          photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
        }
      },
      nextProject: "real-nutri-co"
    }
  ],

  articles: [
    {
      id: "1",
      slug: "your-brand-is-doing-a-price-negotiation-without-you",
      title: "Your Brand Is Doing a Price Negotiation Without You",
      excerpt: "Before a potential client picks up the phone, your brand has already told them what to expect to pay. Here's how to take that conversation back.",
      category: "Brand",
      coverImage: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1400&h=900&fit=crop",
      date: "Apr 2026",
      readTime: "6 min read",
      author: {
        name: "Adhi",
        title: "Co-Founder, The Sketchy Studio",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop"
      },
      content: [
        { type: "p", content: "Here's a question worth sitting with: if a potential client Googles you right now and lands on your website, what price do they expect to pay? Most founders pause at this — because they know the answer, and they know it's lower than what they actually charge." },
        { type: "h2", content: "The silent negotiation" },
        { type: "p", content: "Your brand is doing a price negotiation on your behalf, 24 hours a day, whether you're aware of it or not. Every time someone encounters your logo, scrolls your Instagram, or lands on your website, they're forming a price expectation before a single conversation has happened. A brand that looks like it costs ₹20K will rarely win a ₹2L contract — not because the work isn't worth it, but because the brand said otherwise first." },
        { type: "quote", content: "Price perception is set before the conversation. The brand is your advance team — and right now, it might be underselling you." },
        { type: "h2", content: "What actually signals quality" },
        { type: "list", content: ["Typography that feels considered, not default", "Whitespace — premium brands breathe", "Consistency across every touchpoint: logo, site, Instagram, email signature", "Photography that's deliberate, not grabbed from a phone camera roll", "Copy that sounds like a person, not a template"] },
        { type: "p", content: "The ROI on good brand work isn't abstract. Every percentage point you shift in price perception — across all the potential clients who encounter your brand before speaking to you — compounds directly into revenue. It's not a cost. It's the most leveraged investment a growing business can make." }
      ]
    },
    {
      id: "2",
      slug: "why-most-websites-dont-convert",
      title: "Why Most Websites Don't Convert (And The Fix Is Simpler Than You Think)",
      excerpt: "It's usually not the design that's the problem. It's the structure. Here's the one thing we check on every website audit.",
      category: "Web",
      coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1400&h=900&fit=crop",
      date: "Mar 2026",
      readTime: "5 min read",
      author: {
        name: "Adhi",
        title: "Co-Founder, The Sketchy Studio",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop"
      },
      content: [
        { type: "p", content: "The most common website problem we see isn't ugly design. It's websites that make visitors work too hard to understand what they're supposed to do next. The 'what', the 'why you', and the 'what next' aren't clear or aren't in the right order — and visitors leave before they get to the good part." },
        { type: "h2", content: "The proof-first principle" },
        { type: "p", content: "Visitors don't read websites like books. They scan. They're looking for three things in the first 5 seconds: do you do what I need, do you look like you can do it well, and is there a clear next step. If any of those are missing or buried, you've lost them." },
        { type: "quote", content: "Most websites lead with story, then proof. The ones that convert lead with proof, then story." },
        { type: "h2", content: "The fix" },
        { type: "list", content: ["Lead with the outcome, not the process ('We build brands that charge more' not 'We are a full-service agency')", "Put your best work above the fold — not a stock photo", "One primary CTA, repeated every 2-3 sections", "Testimonials closer to the top, not buried in the footer", "Make it stupidly easy to contact you — email visible, form short"] }
      ]
    },
    {
      id: "3",
      slug: "motion-is-not-a-luxury",
      title: "Motion Is Not a Luxury. It's How Brands Survive on Social in 2026.",
      excerpt: "Static posts are being deprioritised everywhere. Here's what motion design actually does for a brand — and when it's genuinely worth the investment.",
      category: "Motion",
      coverImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1400&h=900&fit=crop",
      date: "Feb 2026",
      readTime: "7 min read",
      author: {
        name: "Adhi",
        title: "Co-Founder, The Sketchy Studio",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop"
      },
      content: [
        { type: "p", content: "Instagram's algorithm has been quietly deprioritising static posts for two years. Reels consistently get 2–5× the reach of comparable static content. But the more interesting question isn't about the algorithm — it's about what motion does to a brand at a psychological level." },
        { type: "h2", content: "Motion communicates what static can't" },
        { type: "p", content: "A static image shows you what something looks like. Motion shows you how it feels. When you see a brand's identity animate with confidence, when transitions feel deliberate, when colour breathes — that communicates values at a visceral level that a flat image can't reach. We saw this firsthand with Coffee Chemistry: the beaker-serving ritual became a genuinely viral content format because motion captured what photos couldn't." },
        { type: "quote", content: "The brands winning on social right now aren't the ones with the biggest budgets. They're the ones who've figured out their motion language." },
        { type: "h2", content: "When motion is worth investing in" },
        { type: "list", content: ["When you have a strong visual identity that translates to animation", "When you're launching or relaunching and need maximum impact", "When your competitors are all static and you want to stand out by default", "When social is a primary acquisition channel for your business"] }
      ]
    },
    {
      id: "4",
      slug: "5-signs-your-brand-has-outgrown-itself",
      title: "5 Signs Your Brand Has Outgrown Itself",
      excerpt: "There's a moment in every business where the brand that got you here stops being the brand that gets you there. Here's how to know you've hit it.",
      category: "Brand",
      coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1400&h=900&fit=crop",
      date: "Jan 2026",
      readTime: "5 min read",
      author: {
        name: "Adhi",
        title: "Co-Founder, The Sketchy Studio",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop"
      },
      content: [
        { type: "p", content: "The brand that gets you from zero to one is rarely the brand that gets you from one to ten. At some point, the positioning that felt exciting when you were starting out becomes the thing that's holding you back." },
        { type: "list", content: [
          "You're apologising for your website in sales calls — 'We're working on a redesign'",
          "You're attracting the wrong clients and repelling the right ones",
          "Your pricing feels hard to justify because your brand doesn't support it",
          "You're embarrassed to share your own Instagram handle or website URL",
          "You've outgrown your category but your brand still looks like a startup"
        ]},
        { type: "h2", content: "What to do about it" },
        { type: "p", content: "The good news: this is a problem with a clear solution. The brand you need now isn't a complete reinvention — it's a strategic evolution. Building from what's working, clearing away what isn't, and setting up a visual system that can grow with the next chapter of the business." }
      ]
    },
    {
      id: "5",
      slug: "what-the-kickoff-chat-actually-does",
      title: "What Our Kickoff Chat Actually Does (And Why Most Agencies Skip It)",
      excerpt: "Most design briefs are shopping lists. Ours is a conversation. Here's why that difference matters to the quality of the final work.",
      category: "Studio",
      coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&h=900&fit=crop",
      date: "Dec 2025",
      readTime: "6 min read",
      author: {
        name: "Adhi",
        title: "Co-Founder, The Sketchy Studio",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop"
      },
      content: [
        { type: "p", content: "We call it the Kickoff Chat, but it's really a structured deep-dive into your business. Not a form. Not a template. A conversation where we ask the questions most designers skip — because they're uncomfortable, or because they don't know to ask them." },
        { type: "h2", content: "The question that unlocks everything" },
        { type: "quote", content: "'Describe your dream client — and tell me what they care about that has nothing to do with your product.' That one question changes the brief more than anything else." },
        { type: "p", content: "We're not listening for deliverables in that conversation. We're listening for tension — the gap between what the business is today and what it's trying to become. That gap is exactly where good design work lives. Everything we create is built to close it." },
        { type: "h2", content: "Why most agencies skip it" },
        { type: "p", content: "Because it's slower upfront. Because it requires the client to think, not just answer. Because if you ask real questions, you might discover the brief is wrong — and then you have to say so. We ask anyway. It's why the work actually lands." }
      ]
    },
    {
      id: "6",
      slug: "social-media-that-actually-builds-something",
      title: "Social Media That Actually Builds Something",
      excerpt: "Most businesses post. Few actually build. Here's the difference between content that grows a community and content that just fills a calendar.",
      category: "Social",
      coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1400&h=900&fit=crop",
      date: "Nov 2025",
      readTime: "7 min read",
      author: {
        name: "Adhi",
        title: "Co-Founder, The Sketchy Studio",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop"
      },
      content: [
        { type: "p", content: "There's a difference between brands that post and brands that build. Both might publish the same number of times a week. But one is growing an audience that actually buys things; the other is filling a content calendar and wondering why nothing's happening." },
        { type: "h2", content: "The five content pillars that work" },
        { type: "list", content: [
          "Education — teach something your audience genuinely needs to know",
          "Behind the scenes — show the work, not just the finish",
          "Social proof — client wins, testimonials, before/afters",
          "Personality — the brand voice that makes people feel like they know you",
          "Engagement — questions, polls, content that invites a response"
        ]},
        { type: "quote", content: "Consistency beats virality every time. One Reel that hits 100K won't build a business. Fifty posts that each resonate with 200 of the right people will." },
        { type: "p", content: "The brands we manage aren't trying to go viral. They're trying to build the kind of presence that makes the right people say: 'I've been following them for months. I knew I'd work with them eventually.' That's what we mean by social media that actually builds something." }
      ]
    },
  ]
};
