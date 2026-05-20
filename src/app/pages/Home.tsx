import { useNavigate } from 'react-router';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { C, CountUp } from '../components/SketchyUI';
import { useEdit, EI } from '../context/EditContext';
import { PageLayout } from '../components/Layout';
import { CaseStudy } from '../data/content';

const SERVICES = ['Brand Identity', 'Web Design & Build', 'Motion & Video', 'Social Media', 'Brand Strategy', 'Packaging Design'];

function accentFor(tags: string[], override?: string) {
  if (override) return override;
  if (tags.includes('Motion')) return C.cyan;
  if (tags.includes('Social')) return C.purple;
  if (tags.includes('Web')) return C.yellow;
  return C.pink;
}

/* ── Grid background ───────────────────────────────────────────────────────── */
function GridBg() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} aria-hidden="true">
      <defs>
        <pattern id="sketchy-grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke={C.cream} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sketchy-grid)" opacity="0.055" />
    </svg>
  );
}

/* ── Slide-up reveal ───────────────────────────────────────────────────────── */
function SlideUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Full-screen work panel (sorted-style) ─────────────────────────────────── */
function WorkPanel({ project, index, total, navigate }: {
  project: CaseStudy; index: number; total: number; navigate: (p: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-14%', '14%']);
  const a = accentFor(project.tags, (project as any).accentColor);

  return (
    <div ref={ref} style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Parallax image */}
      <motion.div style={{ y: imgY, position: 'absolute', top: '-20%', left: 0, right: 0, bottom: '-20%' }}>
        {project.coverImage ? (
          <img src={project.coverImage} alt={project.client} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', backgroundColor: `${a}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Fraunces, serif', color: `${a}25`, fontSize: 96, fontWeight: 900 }}>?</span>
          </div>
        )}
      </motion.div>

      {/* Top fade for nav */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 140, background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 100%)' }} />

      {/* Accent line top */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, backgroundColor: a, transformOrigin: 'left' }}
      />

      {/* Counter top-left */}
      <div style={{ position: 'absolute', top: 28, left: 40, fontFamily: 'Sora, sans-serif', color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 900, letterSpacing: 3, textTransform: 'uppercase' }}>
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

      {/* Tags top-right */}
      <div style={{ position: 'absolute', top: 24, right: 40, display: 'flex', gap: 6 }}>
        {project.tags.map(tag => (
          <span key={tag} style={{ backgroundColor: `${a}22`, color: a, fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, padding: '5px 12px', borderRadius: 100, backdropFilter: 'blur(8px)', border: `1px solid ${a}35` }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom bar — sorted signature element */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: C.void, borderTop: `1px solid ${C.surface}`, padding: '22px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em' }}>
            {project.client}
          </div>
          <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}45`, fontSize: 12, marginTop: 5 }}>
            {project.tagline}
          </div>
        </div>
        <motion.button
          onClick={() => navigate(`/work/${project.slug}`)}
          whileHover={{ scale: 1.05, x: 4 }}
          whileTap={{ scale: 0.97 }}
          style={{ backgroundColor: 'transparent', color: C.cream, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, padding: '12px 26px', borderRadius: 100, border: `1px solid ${C.cream}22`, display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          View case study <ArrowUpRight size={12} />
        </motion.button>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { content } = useEdit();
  const featured = content.caseStudies.slice(0, 4);

  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 700], [0, -80]);

  return (
    <PageLayout>

      {/* ══════════════════════════════════ HERO ══════════════════════════════ */}
      <section style={{ backgroundColor: C.void, minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

        <GridBg />

        {/* Floating geometric shapes — sorted-inspired */}
        <motion.div
          animate={{ y: [0, -22, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '22%', right: '12%', width: 70, height: 70, backgroundColor: `${C.pink}1A`, backdropFilter: 'blur(4px)', borderRadius: 12, border: `1px solid ${C.pink}28` }}
        />
        <motion.div
          animate={{ y: [0, 16, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          style={{ position: 'absolute', bottom: '32%', left: '9%', width: 44, height: 44, backgroundColor: `${C.cyan}18`, borderRadius: 8, border: `1px solid ${C.cyan}22` }}
        />
        <motion.div
          animate={{ y: [0, -12, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          style={{ position: 'absolute', top: '42%', left: '7%', width: 18, height: 18, backgroundColor: C.yellow, borderRadius: '50%', opacity: 0.35 }}
        />
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{ position: 'absolute', top: '18%', left: '22%', width: 10, height: 10, backgroundColor: C.pink, borderRadius: '50%', opacity: 0.5 }}
        />

        {/* Centered content */}
        <motion.div style={{ y: heroTextY, position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 940, padding: '0 32px', paddingTop: 96 }}>

          {/* Availability pill — sorted-inspired detail */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: `${C.cream}08`, border: `1px solid ${C.cream}12`, borderRadius: 100, padding: '7px 18px', marginBottom: 36 }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#4ade80', flexShrink: 0, boxShadow: '0 0 8px rgba(74,222,128,0.7)' }}
            />
            <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}55`, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>Available for projects</span>
          </motion.div>

          {/* Headline */}
          <div style={{ overflow: 'hidden', marginBottom: 24 }}>
            <motion.h1
              initial={{ y: 110, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(3.5rem, 10vw, 8.5rem)', lineHeight: 0.88, fontWeight: 900, letterSpacing: '-0.03em' }}
            >
              {content.home.heroHeadline}
            </motion.h1>
          </div>

          {/* Squiggle accent — centered */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ transformOrigin: 'center', marginBottom: 32 }}
          >
            <svg width="220" height="12" viewBox="0 0 220 12" fill="none" style={{ display: 'block', margin: '0 auto' }}>
              <path d="M4,7 Q35,2 65,7 T125,7 T185,7 T220,7" stroke={C.pink} strokeWidth={5} strokeLinecap="round" fill="none" />
            </svg>
          </motion.div>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}58`, fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 460, margin: '0 auto 44px' }}
          >
            {content.home.heroSub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/work')}
              style={{ backgroundColor: C.pink, color: C.void, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, padding: '16px 32px', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 8, boxShadow: `0 0 48px ${C.pink}38` }}
            >
              See Our Work <ArrowRight size={14} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/contact')}
              style={{ backgroundColor: 'transparent', color: `${C.cream}75`, border: `1px solid ${C.cream}1E`, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, padding: '16px 32px', borderRadius: 100 }}
            >
              Start a Project
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats bar — anchored to bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: `1px solid ${C.surface}`, padding: '24px 48px', display: 'flex', flexWrap: 'wrap', gap: '16px 56px', zIndex: 10, backgroundColor: `${C.void}DD`, backdropFilter: 'blur(12px)' }}
        >
          {content.home.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.1 }}
            >
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.pink, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, lineHeight: 1 }}>
                <CountUp value={stat.value} />
              </div>
              <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}38`, fontSize: 10, textTransform: 'uppercase', letterSpacing: 2.5, marginTop: 6 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════ SERVICES MARQUEE ══════════════════════════════════ */}
      <div style={{ backgroundColor: C.cream, borderTop: `2px solid ${C.void}`, borderBottom: `2px solid ${C.void}`, padding: '18px 0', overflow: 'hidden' }}>
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}
        >
          {[...SERVICES, ...SERVICES].map((s, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', fontWeight: 900, color: C.void, letterSpacing: '-0.01em', padding: '0 28px' }}>
                {s}
              </span>
              <span style={{ color: C.pink, fontSize: 20, lineHeight: 1, flexShrink: 0 }}>✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════ FULL-SCREEN WORK SHOWCASE ═════════════════════════ */}
      <div>
        {/* Section header */}
        <SlideUp>
          <div style={{ backgroundColor: C.void, padding: '80px 48px 52px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Sora, sans-serif', color: C.pink, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 20 }}>
              Selected Work
            </p>
            {/* Mixed heading — sorted's bold+italic typography pattern */}
            <h2 style={{ lineHeight: 0.92 }}>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>
                The work speaks
              </span>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: `${C.cream}40`, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 400, letterSpacing: '-0.02em', fontStyle: 'italic' }}>
                for itself.
              </span>
            </h2>
          </div>
        </SlideUp>

        {/* Full-screen panels — one per project */}
        {featured.map((project, i) => (
          <WorkPanel key={project.id} project={project} index={i} total={featured.length} navigate={navigate} />
        ))}

        {/* View all */}
        <div style={{ backgroundColor: C.void, padding: '36px 40px', textAlign: 'center', borderTop: `1px solid ${C.surface}` }}>
          <motion.button
            onClick={() => navigate('/work')}
            whileHover={{ y: -3 }}
            style={{ border: `1px solid ${C.cream}18`, color: `${C.cream}50`, fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, padding: '14px 40px', borderRadius: 100, display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            View All Projects <ArrowUpRight size={13} />
          </motion.button>
        </div>
      </div>

      {/* ══════════════════ ABOUT TEASER ══════════════════════════════════════ */}
      <section style={{ backgroundColor: C.cream, padding: '112px 0', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            <SlideUp>
              <p style={{ fontFamily: 'Sora, sans-serif', color: C.purple, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 20 }}>
                About the Studio
              </p>
              <h2 style={{ lineHeight: 0.9, marginBottom: 28 }}>
                <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.void, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>
                  Design that earns
                </span>
                <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.purple, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, letterSpacing: '-0.02em', fontStyle: 'italic' }}>
                  its keep.
                </span>
              </h2>
              <div style={{ width: 3, height: 48, backgroundColor: C.purple, borderRadius: 2, marginBottom: 28 }} />
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}85`, lineHeight: 1.8, fontSize: '1.05rem', marginBottom: 12 }}>
                {content.home.aboutTeaser}
              </p>
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}55`, lineHeight: 1.75, fontSize: '0.95rem', marginBottom: 36 }}>
                {content.home.aboutTeaserSub}
              </p>
              <motion.button
                onClick={() => navigate('/about')}
                whileHover={{ x: 4 }}
                style={{ color: C.purple, fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Meet the Studio <ArrowUpRight size={14} />
              </motion.button>
            </SlideUp>

            <SlideUp delay={0.15}>
              <div style={{ position: 'relative' }}>
                <div style={{ overflow: 'hidden', borderRadius: 20, transform: 'rotate(-2deg)', boxShadow: '0 32px 80px rgba(0,0,0,0.18)' }}>
                  <EI
                    path="about.founderPhoto"
                    fallbackSrc="https://images.unsplash.com/photo-1636293875439-b3125c0f1fc1?w=600&h=720&fit=crop"
                    alt="The Sketchy Studio"
                    className="w-full object-cover"
                    style={{ height: 500, display: 'block' }}
                  />
                </div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', bottom: -12, right: -16, backgroundColor: C.pink, color: C.void, transform: 'rotate(3deg)', borderRadius: 16, padding: '12px 20px', boxShadow: `0 20px 60px ${C.pink}40` }}
                >
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: 36, fontWeight: 900, lineHeight: 1 }}>50+</div>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 2 }}>Brands Built</div>
                </motion.div>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ══════════════════════════════════════ */}
      <section style={{ backgroundColor: C.void, padding: '112px 0', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-6">

          <SlideUp style={{ marginBottom: 0 } as any}>
            <p style={{ fontFamily: 'Sora, sans-serif', color: C.cyan, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 16 }}>
              Client Love
            </p>
            <h2 style={{ lineHeight: 0.9, marginBottom: 0 }}>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>
                The verdict
              </span>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: `${C.cream}35`, fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 400, letterSpacing: '-0.02em', fontStyle: 'italic' }}>
                is in.
              </span>
            </h2>
          </SlideUp>

          {/* Scrolling client names */}
          <div style={{ overflow: 'hidden', margin: '48px 0 52px' }}>
            <motion.div
              animate={{ x: [0, '-50%'] }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}
            >
              {[...content.home.clients, ...content.home.clients].map((c, i) => (
                <span key={i} style={{ fontFamily: 'Fraunces, Georgia, serif', color: `${C.cream}12`, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, padding: '0 40px' }}>
                  {c}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.home.testimonials.map((t, i) => {
              const colors = [C.pink, C.purple, C.cyan];
              const c = colors[i % colors.length];
              return (
                <SlideUp key={i} delay={i * 0.12}>
                  <div style={{ backgroundColor: C.cardDark, borderRadius: 20, padding: '32px 28px', borderTop: `3px solid ${c}` }}>
                    <div style={{ color: c, fontSize: 52, lineHeight: 0.8, fontFamily: 'Georgia, serif', opacity: 0.35, marginBottom: 16 }}>"</div>
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
      <section style={{ backgroundColor: C.cream, padding: '112px 0', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <SlideUp>
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.88, fontWeight: 900, letterSpacing: '-0.03em' }}>
                {content.home.ctaHeadline}
              </h2>
            </SlideUp>
            <SlideUp delay={0.15}>
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}60`, lineHeight: 1.75, fontSize: '1rem', marginBottom: 32 }}>
                {content.home.ctaSub}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <motion.button
                  onClick={() => navigate('/contact')}
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ backgroundColor: C.void, color: C.cream, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, padding: '16px 32px', borderRadius: 100, boxShadow: '0 12px 40px rgba(0,0,0,0.18)' }}
                >
                  Start a Project
                </motion.button>
                <motion.button
                  onClick={() => navigate('/work')}
                  whileHover={{ scale: 1.04, y: -3 }}
                  style={{ backgroundColor: 'transparent', color: `${C.void}55`, border: `2px solid ${C.void}28`, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, padding: '16px 32px', borderRadius: 100 }}
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
