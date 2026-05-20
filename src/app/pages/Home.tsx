import { useNavigate } from 'react-router';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { C, CountUp } from '../components/SketchyUI';
import { useEdit, EI } from '../context/EditContext';
import { PageLayout } from '../components/Layout';
import { CaseStudy } from '../data/content';

const SERVICES = ['Brand Identity', 'Web Design', 'Motion & Video', 'Social Media', 'Brand Strategy', 'Packaging Design'];

function accent(tags: string[], override?: string) {
  if (override) return override;
  if (tags.includes('Motion')) return C.cyan;
  if (tags.includes('Social')) return C.purple;
  if (tags.includes('Web')) return C.yellow;
  return C.pink;
}

/* ─── Blur + lift reveal ───────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, from = 'bottom' }: {
  children: React.ReactNode; delay?: number; from?: 'bottom' | 'left' | 'right';
}) {
  const x = from === 'left' ? -60 : from === 'right' ? 60 : 0;
  const y = from === 'bottom' ? 64 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, x, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Pinned scroll work (sorted pattern) ──────────────────────────────────── */
function PinnedWork({ projects, navigate }: { projects: CaseStudy[]; navigate: (p: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  useEffect(() => {
    return scrollYProgress.on('change', v => {
      const next = Math.min(Math.floor(v * projects.length), projects.length - 1);
      setActiveIdx(next);
    });
  }, [scrollYProgress, projects.length]);

  return (
    <div ref={containerRef} style={{ height: `${projects.length * 100}vh` }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Images cross-fade */}
        {projects.map((p, i) => {
          const a = accent(p.tags, (p as any).accentColor);
          return (
            <motion.div key={p.id} animate={{ opacity: i === activeIdx ? 1 : 0 }} transition={{ duration: 0.8, ease: 'easeInOut' }} style={{ position: 'absolute', inset: 0 }}>
              {p.coverImage
                ? <img src={p.coverImage} alt={p.client} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${a}25, ${C.void})` }} />
              }
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, backgroundColor: a }} />
            </motion.div>
          );
        })}

        {/* Gradient vignette */}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${C.void}D0 0%, transparent 50%)`, pointerEvents: 'none' }} />

        {/* Progress dots */}
        <div style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 8, zIndex: 20 }}>
          {projects.map((_, i) => (
            <motion.div key={i} animate={{ height: i === activeIdx ? 32 : 10, backgroundColor: i === activeIdx ? C.pink : 'rgba(255,255,255,0.25)' }} transition={{ duration: 0.35 }} style={{ width: 2, borderRadius: 1 }} />
          ))}
        </div>

        {/* Counter */}
        <div style={{ position: 'absolute', top: 80, left: 40, zIndex: 20 }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeIdx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
              style={{ fontFamily: 'Sora, sans-serif', color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 900, letterSpacing: 3, textTransform: 'uppercase' }}>
              {String(activeIdx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tags */}
        <div style={{ position: 'absolute', top: 76, right: 60, zIndex: 20 }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeIdx} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.3 }} style={{ display: 'flex', gap: 6 }}>
              {projects[activeIdx]?.tags.map(tag => {
                const a = accent(projects[activeIdx].tags, (projects[activeIdx] as any).accentColor);
                return <span key={tag} style={{ backgroundColor: `${a}22`, color: a, fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, padding: '5px 12px', borderRadius: 100, backdropFilter: 'blur(8px)', border: `1px solid ${a}30` }}>{tag}</span>;
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20 }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeIdx} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ backgroundColor: C.void, borderTop: `1px solid ${C.surface}`, padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
              <div>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}>{projects[activeIdx]?.client}</div>
                <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}45`, fontSize: 12, marginTop: 5 }}>{projects[activeIdx]?.tagline}</div>
              </div>
              <motion.button onClick={() => navigate(`/work/${projects[activeIdx]?.slug}`)} whileHover={{ x: 5, backgroundColor: `${C.cream}15` }} style={{ fontFamily: 'Sora, sans-serif', color: C.cream, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, padding: '12px 24px', borderRadius: 100, border: `1px solid ${C.cream}20`, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap', flexShrink: 0, transition: 'background 0.2s' }}>
                View case study <ArrowUpRight size={12} />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─── Horizontal work ticker ────────────────────────────────────────────────── */
function WorkTicker({ projects, navigate }: { projects: CaseStudy[]; navigate: (p: string) => void }) {
  return (
    <div style={{ backgroundColor: '#0a0a0a', padding: '44px 0', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}22`, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 4 }}>All Projects</span>
      </div>
      <div className="ticker-wrap" style={{ overflow: 'hidden' }}>
        <style>{`
          @keyframes ticker-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .ticker-inner { animation: ticker-scroll 55s linear infinite; }
          .ticker-wrap:hover .ticker-inner { animation-play-state: paused; }
        `}</style>
        <div className="ticker-inner" style={{ display: 'flex', gap: 12, width: 'max-content' }}>
          {[...projects, ...projects].map((p, i) => {
            const a = accent(p.tags, (p as any).accentColor);
            return (
              <div key={i} onClick={() => navigate(`/work/${p.slug}`)} style={{ width: 280, height: 190, borderRadius: 12, overflow: 'hidden', flexShrink: 0, cursor: 'pointer', position: 'relative', border: `1px solid ${C.surface}` }}>
                {p.coverImage
                  ? <img src={p.coverImage} alt={p.client} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  : <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${a}20, ${C.void})` }} />
                }
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 16px 14px', background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
                  <div style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontWeight: 900, fontSize: '0.95rem', lineHeight: 1.2 }}>{p.client}</div>
                  <div style={{ width: 24, height: 2, backgroundColor: a, borderRadius: 1, marginTop: 6 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { content } = useEdit();
  const featured = content.caseStudies.slice(0, 4);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);

  // Word-by-word headline split
  const headlineWords = content.home.heroHeadline.split(' ');

  return (
    <PageLayout>

      {/* ═══════════════════════════════ HERO ═════════════════════════════════ */}
      <section style={{ backgroundColor: C.void, minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

        {/* Subtle grid */}
        <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <defs><pattern id="g" width="72" height="72" patternUnits="userSpaceOnUse"><path d="M72 0 L0 0 0 72" fill="none" stroke={C.cream} strokeWidth="0.5" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)" opacity="0.045" />
        </svg>

        {/* Atmospheric color orbs — the "magic" */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <motion.div animate={{ x: [0, 70, -30, 0], y: [0, -60, 40, 0], scale: [1, 1.2, 0.9, 1] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', width: 560, height: 560, borderRadius: '50%', background: `radial-gradient(circle, ${C.pink}50 0%, transparent 65%)`, left: '-12%', top: '5%', filter: 'blur(90px)', willChange: 'transform' }} />
          <motion.div animate={{ x: [0, -60, 40, 0], y: [0, 50, -30, 0], scale: [1, 1.1, 0.95, 1] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${C.purple}45 0%, transparent 65%)`, right: '-8%', bottom: '10%', filter: 'blur(90px)', willChange: 'transform' }} />
          <motion.div animate={{ x: [0, 40, -50, 0], y: [0, -40, 50, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
            style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${C.cyan}28 0%, transparent 70%)`, left: '40%', bottom: '20%', filter: 'blur(70px)', willChange: 'transform' }} />
        </div>

        {/* Content */}
        <motion.div style={{ y: heroY, position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', maxWidth: 980, padding: '0 24px', paddingTop: 96 }}>

          {/* Availability pill */}
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: `${C.cream}07`, border: `1px solid ${C.cream}12`, borderRadius: 100, padding: '7px 18px', marginBottom: 44 }}>
            <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4ade80', boxShadow: '0 0 10px rgba(74,222,128,0.8)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}55`, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2.5 }}>Available for projects</span>
          </motion.div>

          {/* Word-by-word headline reveal */}
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(3.5rem, 11vw, 9rem)', lineHeight: 0.88, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 24, color: C.cream }}>
            {headlineWords.map((word, i) => (
              <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.22em', verticalAlign: 'bottom' }}>
                <motion.span
                  style={{ display: 'block' }}
                  initial={{ y: '115%' }}
                  animate={{ y: '0%' }}
                  transition={{ delay: 0.35 + i * 0.11, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Animated squiggle */}
          <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.95, duration: 0.65 }} style={{ transformOrigin: 'center', marginBottom: 28 }}>
            <svg width="200" height="10" viewBox="0 0 200 10" style={{ display: 'block', margin: '0 auto' }}>
              <path d="M4,6 Q32,1 60,6 T115,6 T170,6 T200,6" stroke={C.pink} strokeWidth={4.5} strokeLinecap="round" fill="none" />
            </svg>
          </motion.div>

          {/* Sub */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.8 }}
            style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}55`, fontSize: '1.05rem', lineHeight: 1.78, maxWidth: 420, margin: '0 auto 48px' }}>
            {content.home.heroSub}
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/work')}
              animate={{ boxShadow: [`0 0 24px ${C.pink}25`, `0 0 56px ${C.pink}55`, `0 0 24px ${C.pink}25`] }}
              transition={{ boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } } as any}
              style={{ backgroundColor: C.pink, color: C.void, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2.5, padding: '16px 34px', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer' }}
            >
              See Our Work <ArrowRight size={14} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/contact')}
              style={{ backgroundColor: 'transparent', color: `${C.cream}70`, border: `1px solid ${C.cream}18`, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2.5, padding: '16px 34px', borderRadius: 100, cursor: 'pointer' }}>
              Start a Project
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats bar — glass bottom */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: `1px solid ${C.surface}`, backgroundColor: `${C.void}E0`, backdropFilter: 'blur(20px)', padding: '22px 48px', display: 'flex', flexWrap: 'wrap', gap: '12px 56px', zIndex: 10 }}>
          {content.home.stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 + i * 0.1 }}>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', color: [C.pink, C.purple, C.cyan, C.yellow][i % 4], fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 900, lineHeight: 1 }}>
                <CountUp value={stat.value} />
              </div>
              <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}35`, fontSize: 10, textTransform: 'uppercase', letterSpacing: 2.5, marginTop: 5 }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════ SERVICES MARQUEE ════════════════════════════════ */}
      <div style={{ backgroundColor: C.cream, borderTop: `2px solid ${C.void}`, borderBottom: `2px solid ${C.void}`, padding: '16px 0', overflow: 'hidden' }}>
        <motion.div animate={{ x: [0, '-50%'] }} transition={{ duration: 32, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...SERVICES, ...SERVICES].map((s, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(1rem, 2.2vw, 1.5rem)', fontWeight: 900, color: C.void, letterSpacing: '-0.01em', padding: '0 28px' }}>{s}</span>
              <span style={{ color: C.pink, fontSize: 18 }}>✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ═══════════════════ BOLD STATEMENT (PINK SECTION) ═══════════════════ */}
      <section style={{ backgroundColor: C.pink, padding: '80px 48px', overflow: 'hidden', position: 'relative' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: 780 }}>
              We don't make things look nice.{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 400 }}>We make them impossible to ignore.</em>
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 36 }}>
              <motion.button onClick={() => navigate('/work')} whileHover={{ scale: 1.04, y: -2 }} style={{ backgroundColor: C.void, color: C.cream, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, padding: '14px 28px', borderRadius: 100, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
                See the work <ArrowUpRight size={13} />
              </motion.button>
              <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}55`, fontSize: 12, fontWeight: 700 }}>
                {content.caseStudies.length}+ brands built
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ WORK SECTION HEADER ════════════════════════════ */}
      <div style={{ backgroundColor: C.void, padding: '80px 48px 52px', position: 'relative', overflow: 'hidden' }}>
        {/* Ghost number */}
        <div style={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', fontFamily: 'Fraunces, serif', fontSize: 'clamp(12rem, 22vw, 20rem)', fontWeight: 900, color: `${C.cream}04`, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
          {String(featured.length).padStart(2, '0')}
        </div>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <p style={{ fontFamily: 'Sora, sans-serif', color: C.pink, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3.5, marginBottom: 20 }}>Selected Work</p>
            <h2 style={{ lineHeight: 0.9 }}>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.025em' }}>The work speaks</span>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: `${C.cream}35`, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 400, letterSpacing: '-0.025em', fontStyle: 'italic' }}>for itself.</span>
            </h2>
          </Reveal>
        </div>
      </div>

      {/* ═══════════════════ PINNED WORK SHOWCASE ════════════════════════════ */}
      <PinnedWork projects={featured} navigate={navigate} />

      {/* ═══════════════════ INFINITE WORK TICKER ════════════════════════════ */}
      <WorkTicker projects={content.caseStudies} navigate={navigate} />

      <div style={{ backgroundColor: '#0a0a0a', paddingBottom: 48, textAlign: 'center' }}>
        <motion.button onClick={() => navigate('/work')} whileHover={{ y: -2 }}
          style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}38`, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2.5, padding: '13px 36px', borderRadius: 100, border: `1px solid ${C.cream}12`, background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
          View All Projects <ArrowUpRight size={12} />
        </motion.button>
      </div>

      {/* ═══════════════════ ABOUT TEASER (CREAM) ════════════════════════════ */}
      <section style={{ backgroundColor: C.cream, padding: '108px 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

            <Reveal from="left">
              <p style={{ fontFamily: 'Sora, sans-serif', color: C.purple, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3.5, marginBottom: 24 }}>About the Studio</p>
              <h2 style={{ lineHeight: 0.9, marginBottom: 32 }}>
                <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.void, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.025em' }}>Design that earns</span>
                <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.purple, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, letterSpacing: '-0.025em', fontStyle: 'italic' }}>its keep.</span>
              </h2>
              <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                <div style={{ width: 3, borderRadius: 2, background: `linear-gradient(to bottom, ${C.purple}, ${C.pink})`, flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}85`, lineHeight: 1.85, fontSize: '1.05rem', marginBottom: 12 }}>{content.home.aboutTeaser}</p>
                  <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}50`, lineHeight: 1.8, fontSize: '0.95rem' }}>{content.home.aboutTeaserSub}</p>
                </div>
              </div>
              <motion.button onClick={() => navigate('/about')} whileHover={{ x: 5 }}
                style={{ fontFamily: 'Sora, sans-serif', color: C.purple, fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2.5, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 8 }}>
                Meet the Studio <ArrowUpRight size={14} />
              </motion.button>
            </Reveal>

            <Reveal from="right" delay={0.1}>
              <div style={{ position: 'relative' }}>
                <motion.div
                  initial={{ rotate: -3 }}
                  whileInView={{ rotate: -1.5 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  style={{ overflow: 'hidden', borderRadius: 20, boxShadow: `0 40px 100px rgba(0,0,0,0.18), 0 0 0 1px ${C.purple}15` }}>
                  <EI path="about.founderPhoto" fallbackSrc="https://images.unsplash.com/photo-1636293875439-b3125c0f1fc1?w=600&h=720&fit=crop" alt="The Sketchy Studio" className="w-full object-cover" style={{ height: 520, display: 'block' }} />
                </motion.div>
                {/* Floating badge */}
                <motion.div animate={{ y: [0, -12, 0], rotate: [3, 4, 3] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', bottom: -20, right: -24, backgroundColor: C.pink, color: C.void, borderRadius: 18, padding: '14px 24px', boxShadow: `0 24px 64px ${C.pink}45`, border: `2px solid ${C.void}` }}>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: 40, fontWeight: 900, lineHeight: 1 }}>50+</div>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }}>Brands Built</div>
                </motion.div>
                {/* Second floating badge */}
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  style={{ position: 'absolute', top: 24, left: -28, backgroundColor: C.void, color: C.cream, borderRadius: 14, padding: '10px 18px', boxShadow: '0 12px 40px rgba(0,0,0,0.3)', border: `1px solid ${C.surface}` }}>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, color: C.cyan, marginBottom: 2 }}>Based in</div>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 900, lineHeight: 1 }}>Bangalore 🇮🇳</div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS (DARK) ═════════════════════════════ */}
      <section style={{ backgroundColor: C.void, padding: '108px 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

          <Reveal>
            <p style={{ fontFamily: 'Sora, sans-serif', color: C.cyan, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3.5, marginBottom: 20 }}>Client Love</p>
            <h2 style={{ lineHeight: 0.9, marginBottom: 52 }}>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.025em' }}>What they said</span>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: `${C.cream}30`, fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 400, letterSpacing: '-0.025em', fontStyle: 'italic' }}>after.</span>
            </h2>
          </Reveal>

          {/* Scrolling client names */}
          <div style={{ overflow: 'hidden', marginBottom: 52 }}>
            <motion.div animate={{ x: [0, '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
              {[...content.home.clients, ...content.home.clients].map((c, i) => (
                <span key={i} style={{ fontFamily: 'Fraunces, Georgia, serif', color: `${C.cream}10`, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, padding: '0 40px' }}>{c}</span>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.home.testimonials.map((t, i) => {
              const colors = [C.pink, C.purple, C.cyan];
              const c = colors[i % colors.length];
              return (
                <Reveal key={i} delay={i * 0.12} from={(['left', 'bottom', 'right'] as const)[i % 3]}>
                  <div style={{ backgroundColor: C.cardDark, borderRadius: 18, padding: '32px 28px', borderTop: `3px solid ${c}`, height: '100%' }}>
                    <div style={{ color: c, fontSize: 52, lineHeight: 0.8, fontFamily: 'Georgia, serif', opacity: 0.35, marginBottom: 18 }}>"</div>
                    <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}C0`, lineHeight: 1.85, fontSize: 13.5, marginBottom: 28 }}>{t.quote}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: `1px solid ${C.surface}`, paddingTop: 20 }}>
                      {t.photo && <img src={t.photo} alt={t.author} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${c}35`, flexShrink: 0 }} />}
                      <div>
                        <div style={{ fontFamily: 'Sora, sans-serif', color: C.cream, fontWeight: 900, fontSize: 13 }}>{t.author}</div>
                        <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}38`, fontSize: 11, marginTop: 2 }}>{t.title}, {t.company}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA — PINK, BIG, CLOSING STATEMENT ══════════════ */}
      <section style={{ backgroundColor: C.pink, padding: '108px 48px', overflow: 'hidden', position: 'relative' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <Reveal from="left">
              <h2 style={{ lineHeight: 0.87, letterSpacing: '-0.03em' }}>
                <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.void, fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 900 }}>
                  {content.home.ctaHeadline}
                </span>
              </h2>
            </Reveal>
            <Reveal from="right" delay={0.12}>
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}65`, lineHeight: 1.8, fontSize: '1.05rem', marginBottom: 36 }}>{content.home.ctaSub}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <motion.button onClick={() => navigate('/contact')} whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}
                  style={{ backgroundColor: C.void, color: C.cream, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2.5, padding: '16px 34px', borderRadius: 100, border: 'none', cursor: 'pointer', boxShadow: '0 16px 48px rgba(0,0,0,0.25)' }}>
                  Start a Project
                </motion.button>
                <motion.button onClick={() => navigate('/work')} whileHover={{ scale: 1.05, y: -3 }}
                  style={{ backgroundColor: 'transparent', color: `${C.void}70`, border: `2px solid ${C.void}30`, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2.5, padding: '16px 34px', borderRadius: 100, cursor: 'pointer' }}>
                  See Our Work
                </motion.button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    </PageLayout>
  );
}
