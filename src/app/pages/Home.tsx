import { useNavigate } from 'react-router';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { C, Reveal, CountUp, NoiseOverlay } from '../components/SketchyUI';
import { useEdit, EI } from '../context/EditContext';
import { PageLayout } from '../components/Layout';

const SERVICES = ['Brand Identity', 'Web Design & Build', 'Motion & Video', 'Social Media', 'Brand Strategy', 'Packaging Design'];

function accentFor(tags: string[], override?: string) {
  if (override) return override;
  if (tags.includes('Motion')) return C.cyan;
  if (tags.includes('Social')) return C.purple;
  if (tags.includes('Web')) return C.yellow;
  return C.pink;
}

/* ── Parallax wrapper ──────────────────────────────────────────────────────── */
function ParallaxLayer({ children, speed = 0.3, className = '' }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const raw = useTransform(scrollY, [0, 800], [0, 800 * speed]);
  const y = useSpring(raw, { stiffness: 60, damping: 20 });
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Slide-up reveal ───────────────────────────────────────────────────────── */
function SlideUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { content } = useEdit();
  const heroRef = useRef<HTMLElement>(null);
  const featured = content.caseStudies.slice(0, 4);

  // Hero parallax scroll
  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 700], [0, 180]);
  const heroTextY = useTransform(scrollY, [0, 700], [0, -60]);

  return (
    <PageLayout>

      {/* ══════════════════════════════════ HERO ══════════════════════════════ */}
      <section
        ref={heroRef}
        style={{ backgroundColor: C.void, minHeight: '100vh', overflow: 'hidden', position: 'relative' }}
        className="flex flex-col justify-end"
      >
        <NoiseOverlay />

        {/* Parallax background image */}
        <motion.div
          style={{ position: 'absolute', inset: '-15%', y: heroImgY }}
        >
          <EI
            path="about.studioPhoto"
            fallbackSrc="https://images.unsplash.com/photo-1700313084615-a6110cc4f6a3?w=1800&h=1100&fit=crop"
            alt="Studio"
            className="w-full h-full object-cover"
            style={{ opacity: 0.12 }}
          />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${C.void} 30%, transparent 100%)` }} />

        {/* Content */}
        <motion.div
          style={{ y: heroTextY, position: 'relative', zIndex: 10 }}
          className="max-w-7xl mx-auto px-6 w-full pt-36 pb-20"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40`, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4 }}
            className="mb-8"
          >
            Bangalore · Full-service Creative Studio
          </motion.p>

          {/* Headline — big, tight, sequential fade-up per line */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                color: C.cream,
                fontSize: 'clamp(4rem, 13vw, 10rem)',
                lineHeight: 0.87,
                fontWeight: 900,
                letterSpacing: '-0.03em',
              }}
            >
              {content.home.heroHeadline}
            </motion.h1>
          </div>

          {/* Squiggle accent */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ transformOrigin: 'left', marginBottom: 36 }}
          >
            <svg width="260" height="14" viewBox="0 0 260 14" fill="none" style={{ overflow: 'visible' }}>
              <path d="M4,8 Q40,2 75,8 T150,8 T225,8 T260,8" stroke={C.pink} strokeWidth={5} strokeLinecap="round" fill="none" />
            </svg>
          </motion.div>

          {/* Sub + CTA */}
          <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-24">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}70`, fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 400 }}
            >
              {content.home.heroSub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05 }}
              className="flex gap-3 flex-wrap"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/work')}
                style={{ backgroundColor: C.pink, color: C.void, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2 }}
                className="px-7 py-4 rounded-full flex items-center gap-2 shadow-xl"
              >
                See Our Work <ArrowRight size={14} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/contact')}
                style={{ backgroundColor: 'transparent', color: `${C.cream}80`, borderColor: `${C.cream}20`, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2 }}
                className="px-7 py-4 rounded-full border"
              >
                Start a Project
              </motion.button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{ borderTop: `1px solid ${C.surface}`, marginTop: 56, paddingTop: 36 }}
            className="flex flex-wrap gap-x-16 gap-y-6"
          >
            {content.home.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1 }}
              >
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.pink, lineHeight: 1, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }} className="font-black">
                  <CountUp value={stat.value} />
                </div>
                <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40`, fontSize: 10, textTransform: 'uppercase', letterSpacing: 2.5, marginTop: 8 }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════ SERVICES TICKER ═══════════════════════════════════ */}
      <div style={{ backgroundColor: C.cream, borderTop: `2px solid ${C.void}`, borderBottom: `2px solid ${C.void}`, padding: '18px 0', overflow: 'hidden' }}>
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
          style={{ width: 'max-content' }}
        >
          {[...SERVICES, ...SERVICES].map((s, i) => (
            <span key={i} className="flex items-center gap-0">
              <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', fontWeight: 900, color: C.void, letterSpacing: '-0.01em', padding: '0 32px' }}>
                {s}
              </span>
              <span style={{ color: C.pink, fontSize: 22, lineHeight: 1, flexShrink: 0 }}>✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════ FEATURED WORK ═════════════════════════════════════ */}
      <section style={{ backgroundColor: C.void }} className="pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section label */}
          <SlideUp className="mb-16">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p style={{ fontFamily: 'Sora, sans-serif', color: C.pink, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 16 }}>
                  Selected Work
                </p>
                <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: 0.9, fontWeight: 900, letterSpacing: '-0.02em' }}>
                  The work speaks<br />for itself.
                </h2>
              </div>
              <motion.button
                onClick={() => navigate('/work')}
                whileHover={{ x: 5 }}
                className="hidden md:flex items-center gap-2 pb-1 shrink-0"
                style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40`, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2 }}
              >
                All Work <ArrowUpRight size={13} />
              </motion.button>
            </div>
          </SlideUp>

          {/* Grid: item 0 = full width tall, items 1+2 = split, item 3 = full wide */}
          <div className="flex flex-col gap-3">
            {featured.map((project, i) => {
              const a = accentFor(project.tags, (project as any).accentColor);
              const isWide = i === 0 || i === 3;
              const height = i === 0 ? 580 : i === 3 ? 440 : 380;

              const card = (
                <motion.div
                  onClick={() => navigate(`/work/${project.slug}`)}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group"
                  style={{ height }}
                  whileHover="hov"
                >
                  <motion.img
                    src={project.coverImage}
                    alt={project.client}
                    className="w-full h-full object-cover"
                    variants={{ hov: { scale: 1.05 } }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  {/* Gradient */}
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${C.void}F0 0%, ${C.void}50 40%, transparent 70%)` }} />
                  {/* Hover: accent top line */}
                  <motion.div
                    variants={{ hov: { scaleX: 1 } }}
                    initial={{ scaleX: 0 }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: a, transformOrigin: 'left' }}
                    transition={{ duration: 0.35 }}
                  />
                  {/* Text */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 32 }}>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map(tag => (
                        <span key={tag} style={{ backgroundColor: `${a}22`, color: a, fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 900, border: `1px solid ${a}40`, textTransform: 'uppercase', letterSpacing: 1.5, padding: '4px 10px', borderRadius: 100 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: isWide ? 'clamp(1.8rem, 3.5vw, 2.8rem)' : '1.6rem', lineHeight: 0.92, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8 }}>
                          {project.client}
                        </h3>
                        <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}55`, fontSize: 13 }}>
                          {project.tagline}
                        </p>
                      </div>
                      <motion.div
                        variants={{ hov: { opacity: 1, scale: 1, rotate: 0 } }}
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        transition={{ duration: 0.2 }}
                        style={{ backgroundColor: a, color: C.void, borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                      >
                        <ArrowUpRight size={17} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );

              if (isWide) {
                return (
                  <SlideUp key={project.id} delay={0.05}>
                    {card}
                  </SlideUp>
                );
              }

              // Items 1 & 2 — render as a pair
              if (i === 1) {
                const next = featured[2];
                const nextA = next ? accentFor(next.tags, (next as any).accentColor) : C.pink;
                return (
                  <div key={project.id} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <SlideUp delay={0.05}>{card}</SlideUp>
                    {next && (
                      <SlideUp delay={0.15}>
                        <motion.div
                          onClick={() => navigate(`/work/${next.slug}`)}
                          className="relative overflow-hidden rounded-2xl cursor-pointer group"
                          style={{ height: 380 }}
                          whileHover="hov"
                        >
                          <motion.img src={next.coverImage} alt={next.client} className="w-full h-full object-cover" variants={{ hov: { scale: 1.05 } }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }} />
                          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${C.void}F0 0%, ${C.void}50 40%, transparent 70%)` }} />
                          <motion.div variants={{ hov: { scaleX: 1 } }} initial={{ scaleX: 0 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: nextA, transformOrigin: 'left' }} transition={{ duration: 0.35 }} />
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 32 }}>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {next.tags.map(tag => (
                                <span key={tag} style={{ backgroundColor: `${nextA}22`, color: nextA, fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 900, border: `1px solid ${nextA}40`, textTransform: 'uppercase', letterSpacing: 1.5, padding: '4px 10px', borderRadius: 100 }}>{tag}</span>
                              ))}
                            </div>
                            <div className="flex items-end justify-between gap-4">
                              <div>
                                <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: '1.6rem', lineHeight: 0.92, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8 }}>{next.client}</h3>
                                <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}55`, fontSize: 13 }}>{next.tagline}</p>
                              </div>
                              <motion.div variants={{ hov: { opacity: 1, scale: 1, rotate: 0 } }} initial={{ opacity: 0, scale: 0.5, rotate: -45 }} transition={{ duration: 0.2 }} style={{ backgroundColor: nextA, color: C.void, borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <ArrowUpRight size={17} />
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </SlideUp>
                    )}
                  </div>
                );
              }
              // item 2 already rendered inside item 1's pair
              return null;
            })}
          </div>

          {/* View all */}
          <SlideUp className="mt-10 text-center">
            <motion.button
              onClick={() => navigate('/work')}
              whileHover={{ y: -3 }}
              style={{ borderColor: `${C.cream}18`, color: `${C.cream}55`, fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2 }}
              className="px-10 py-3.5 rounded-full border mx-auto flex items-center gap-2"
            >
              View All Projects <ArrowUpRight size={13} />
            </motion.button>
          </SlideUp>
        </div>
      </section>

      {/* ══════════════════ ABOUT TEASER ══════════════════════════════════════ */}
      <section style={{ backgroundColor: C.cream }} className="py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            <SlideUp>
              <p style={{ fontFamily: 'Sora, sans-serif', color: C.purple, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 20 }}>
                About the Studio
              </p>
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', lineHeight: 0.9, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 24 }}>
                Design that earns<br />its keep.
              </h2>
              <div style={{ width: 180, height: 4, backgroundColor: C.purple, marginBottom: 32, borderRadius: 2 }} />
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}85`, lineHeight: 1.8, fontSize: '1.05rem', marginBottom: 12 }}>
                {content.home.aboutTeaser}
              </p>
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}55`, lineHeight: 1.75, fontSize: '0.95rem', marginBottom: 32 }}>
                {content.home.aboutTeaserSub}
              </p>
              <motion.button
                onClick={() => navigate('/about')}
                whileHover={{ gap: 12 }}
                style={{ color: C.purple, fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 8 }}
              >
                Meet the Studio <ArrowUpRight size={14} />
              </motion.button>
            </SlideUp>

            <SlideUp delay={0.15}>
              <div style={{ position: 'relative' }}>
                <ParallaxLayer speed={-0.08}>
                  <div style={{ overflow: 'hidden', borderRadius: 20, rotate: '-2deg' }} className="shadow-2xl">
                    <EI
                      path="about.founderPhoto"
                      fallbackSrc="https://images.unsplash.com/photo-1636293875439-b3125c0f1fc1?w=600&h=720&fit=crop"
                      alt="The Sketchy Studio"
                      className="w-full object-cover"
                      style={{ height: 500, display: 'block' }}
                    />
                  </div>
                </ParallaxLayer>
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', bottom: -12, right: -16, backgroundColor: C.pink, color: C.void, fontFamily: 'Sora, sans-serif', rotate: '3deg', borderRadius: 16, padding: '12px 20px', boxShadow: '0 20px 60px rgba(255,107,157,0.4)' }}
                >
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: 36, fontWeight: 900, lineHeight: 1 }}>50+</div>
                  <div style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 2 }}>Brands Built</div>
                </motion.div>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ══════════════════════════════════════ */}
      <section style={{ backgroundColor: C.void }} className="py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <SlideUp className="mb-6">
            <p style={{ fontFamily: 'Sora, sans-serif', color: C.cyan, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 16 }}>
              Client Love
            </p>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 0.9, fontWeight: 900, letterSpacing: '-0.02em' }}>
              The verdict.
            </h2>
          </SlideUp>

          {/* Scrolling client names */}
          <div style={{ overflow: 'hidden', marginBottom: 56, marginTop: 40 }}>
            <motion.div
              animate={{ x: [0, '-50%'] }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              className="flex whitespace-nowrap"
              style={{ width: 'max-content' }}
            >
              {[...content.home.clients, ...content.home.clients].map((c, i) => (
                <span key={i} style={{ fontFamily: 'Fraunces, Georgia, serif', color: `${C.cream}18`, fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, padding: '0 40px' }}>
                  {c}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.home.testimonials.map((t, i) => {
              const colors = [C.pink, C.purple, C.cyan];
              const c = colors[i % colors.length];
              return (
                <SlideUp key={i} delay={i * 0.12}>
                  <div style={{ backgroundColor: C.cardDark, borderRadius: 20, padding: '32px 28px', height: '100%', borderTop: `3px solid ${c}` }}>
                    <div style={{ color: c, fontSize: 52, lineHeight: 0.8, fontFamily: 'Georgia, serif', opacity: 0.4, marginBottom: 16 }}>"</div>
                    <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}CC`, lineHeight: 1.8, fontSize: 13, marginBottom: 28 }}>
                      {t.quote}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: `1px solid ${C.surface}`, paddingTop: 20 }}>
                      {t.photo && <img src={t.photo} alt={t.author} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${c}40`, flexShrink: 0 }} />}
                      <div>
                        <div style={{ fontFamily: 'Sora, sans-serif', color: C.cream, fontWeight: 900, fontSize: 13 }}>{t.author}</div>
                        <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40`, fontSize: 11 }}>{t.title}, {t.company}</div>
                      </div>
                    </div>
                  </div>
                </SlideUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA ═══════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.cream }} className="py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <SlideUp>
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.88, fontWeight: 900, letterSpacing: '-0.03em' }}>
                {content.home.ctaHeadline}
              </h2>
            </SlideUp>
            <SlideUp delay={0.15}>
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}65`, lineHeight: 1.75, fontSize: '1rem', marginBottom: 32 }}>
                {content.home.ctaSub}
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.button
                  onClick={() => navigate('/contact')}
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ backgroundColor: C.void, color: C.cream, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2 }}
                  className="px-8 py-4 rounded-full shadow-xl"
                >
                  Start a Project
                </motion.button>
                <motion.button
                  onClick={() => navigate('/work')}
                  whileHover={{ scale: 1.04, y: -3 }}
                  style={{ backgroundColor: 'transparent', color: `${C.void}60`, borderColor: `${C.void}30`, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2 }}
                  className="px-8 py-4 rounded-full border-2"
                >
                  See Our Work
                </motion.button>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

    </PageLayout>
  );
}
