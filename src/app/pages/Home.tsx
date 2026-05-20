import { useNavigate } from 'react-router';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { C, CountUp } from '../components/SketchyUI';
import { useEdit, EI } from '../context/EditContext';
import { PageLayout } from '../components/Layout';
import { CaseStudy, HomeSectionConfig, SiteContent } from '../data/content';

const SERVICES = ['Brand Identity', 'Web Design', 'Motion & Video', 'Social Media', 'Brand Strategy', 'Packaging Design'];

const DEFAULT_SECTIONS: HomeSectionConfig[] = [
  { id: 's-hero', type: 'hero', enabled: true },
  { id: 's-services', type: 'services-marquee', enabled: true },
  { id: 's-statement', type: 'statement', enabled: true },
  { id: 's-work', type: 'work-grid', enabled: true },
  { id: 's-pinned', type: 'pinned-work', enabled: true },
  { id: 's-about', type: 'about-teaser', enabled: true },
  { id: 's-clients', type: 'clients', enabled: true },
  { id: 's-testimonials', type: 'testimonials', enabled: true },
  { id: 's-cta', type: 'cta', enabled: true },
];

function accentColor(tags: string[], override?: string) {
  if (override) return override;
  if (tags.includes('Motion')) return C.cyan;
  if (tags.includes('Social')) return C.purple;
  if (tags.includes('Web')) return C.yellow;
  return C.pink;
}

/* ─── Scroll reveal — blur + directional slide ─────────────────────────────── */
function Reveal({
  children, delay = 0, from = 'bottom', className = '',
}: { children: React.ReactNode; delay?: number; from?: 'bottom' | 'left' | 'right'; className?: string }) {
  const x = from === 'left' ? -56 : from === 'right' ? 56 : 0;
  const y = from === 'bottom' ? 56 : 0;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.88, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Pinned scroll — sorted's full-screen work pattern ────────────────────── */
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

        {projects.map((p, i) => {
          const a = accentColor(p.tags, (p as any).accentColor);
          return (
            <motion.div
              key={p.id}
              animate={{ opacity: i === activeIdx ? 1 : 0 }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
              style={{ position: 'absolute', inset: 0 }}
            >
              {p.coverImage
                ? <img src={p.coverImage} alt={p.client} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : (
                  <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${a}30 0%, ${C.void} 70%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(8rem, 20vw, 18rem)', fontWeight: 900, color: `${a}18`, lineHeight: 1 }}>
                      {p.client[0]}
                    </span>
                  </div>
                )
              }
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, backgroundColor: a }} />
            </motion.div>
          );
        })}

        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${C.void}D0 0%, transparent 55%)`, pointerEvents: 'none' }} />

        {/* Progress dots */}
        <div style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 8, zIndex: 20 }}>
          {projects.map((_, i) => (
            <motion.div key={i}
              animate={{ height: i === activeIdx ? 32 : 10, backgroundColor: i === activeIdx ? C.pink : 'rgba(255,255,255,0.22)' }}
              transition={{ duration: 0.35 }}
              style={{ width: 2, borderRadius: 1 }}
            />
          ))}
        </div>

        {/* Counter */}
        <div style={{ position: 'absolute', top: 80, left: 40, zIndex: 20 }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeIdx}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              style={{ fontFamily: 'Sora, sans-serif', color: 'rgba(255,255,255,0.32)', fontSize: 11, fontWeight: 900, letterSpacing: 3, textTransform: 'uppercase' }}
            >
              {String(activeIdx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tags */}
        <div style={{ position: 'absolute', top: 76, right: 60, zIndex: 20 }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeIdx}
              initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.28 }}
              style={{ display: 'flex', gap: 6 }}
            >
              {projects[activeIdx]?.tags.map(tag => {
                const a = accentColor(projects[activeIdx].tags, (projects[activeIdx] as any).accentColor);
                return <span key={tag} style={{ backgroundColor: `${a}22`, color: a, fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, padding: '5px 12px', borderRadius: 100, backdropFilter: 'blur(8px)', border: `1px solid ${a}30` }}>{tag}</span>;
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20 }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeIdx}
              initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ backgroundColor: C.void, borderTop: `1px solid ${C.surface}`, padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}
            >
              <div>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  {projects[activeIdx]?.client}
                </div>
                <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}45`, fontSize: 12, marginTop: 5 }}>
                  {projects[activeIdx]?.tagline}
                </div>
              </div>
              <motion.button onClick={() => navigate(`/work/${projects[activeIdx]?.slug}`)}
                whileHover={{ x: 6, backgroundColor: `${C.cream}12` }}
                style={{ fontFamily: 'Sora, sans-serif', color: C.cream, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, padding: '12px 24px', borderRadius: 100, border: `1px solid ${C.cream}20`, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap', flexShrink: 0, transition: 'background 0.2s' }}
              >
                View case study <ArrowUpRight size={12} />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─── Work auto-scroll — 4 cols, col1+3 up, col2+4 down, infinite ───────────── */
function WorkAutoGrid({ projects, navigate }: { projects: CaseStudy[]; navigate: (p: string) => void }) {
  // Pad each column to have enough cards to look full
  const base = projects.length < 4 ? [...projects, ...projects, ...projects, ...projects] : [...projects, ...projects];
  const cols: CaseStudy[][] = [[], [], [], []];
  base.forEach((p, i) => cols[i % 4].push(p));

  return (
    <section style={{ backgroundColor: C.void, position: 'relative' }}>
      {/* Header row */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 48px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontFamily: 'Sora, sans-serif', color: C.pink, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 4, marginBottom: 10 }}>
            Our Work
          </p>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1 }}>
            {projects.length} brands.{' '}
            <em style={{ fontWeight: 400, fontStyle: 'italic', color: `${C.cream}35` }}>Every one different.</em>
          </h2>
        </div>
        <motion.button onClick={() => navigate('/work')} whileHover={{ x: 5 }}
          style={{ fontFamily: 'Sora, sans-serif', color: C.cream, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: `1.5px solid ${C.cream}25`, borderRadius: 100, padding: '10px 22px', cursor: 'pointer', flexShrink: 0 }}>
          View all <ArrowUpRight size={13} />
        </motion.button>
      </div>

      {/* 4-col infinite scroll grid */}
      <div style={{ height: '90vh', overflow: 'hidden', position: 'relative', padding: '0 48px 0' }}>
        <style>{`
          @keyframes wag-up  { from { transform: translateY(0);    } to { transform: translateY(-50%); } }
          @keyframes wag-dn  { from { transform: translateY(-50%); } to { transform: translateY(0);    } }
          .wag-c0 { animation: wag-up 24s linear infinite; }
          .wag-c1 { animation: wag-dn 28s linear infinite; }
          .wag-c2 { animation: wag-up 20s linear infinite; }
          .wag-c3 { animation: wag-dn 26s linear infinite; }
          .wag-card { transition: opacity 0.3s; }
          .wag-card:hover { opacity: 0.82; }
          .wag-card .wag-overlay { opacity: 0; transition: opacity 0.3s; }
          .wag-card:hover .wag-overlay { opacity: 1; }
        `}</style>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, height: '100%' }}>
          {cols.map((col, ci) => {
            const doubled = [...col, ...col];
            return (
              <div key={ci} style={{ overflow: 'hidden', height: '100%' }}>
                <div className={`wag-c${ci}`}>
                  {doubled.map((p, i) => {
                    const a = accentColor(p.tags, (p as any).accentColor);
                    return (
                      <div key={`${ci}-${i}`} className="wag-card"
                        onClick={() => navigate(`/work/${p.slug}`)}
                        style={{ height: 270, borderRadius: 12, overflow: 'hidden', marginBottom: 10, position: 'relative', cursor: 'pointer', backgroundColor: `${a}18` }}>
                        {p.coverImage
                          ? <img src={p.coverImage} alt={p.client} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          : <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${a}40 0%, ${a}12 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontFamily: 'Fraunces, serif', fontSize: 80, fontWeight: 900, color: a, opacity: 0.3, lineHeight: 1, userSelect: 'none' }}>{p.client[0]}</span>
                            </div>
                        }
                        {/* Hover overlay with name */}
                        <div className="wag-overlay" style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${C.void}E0 0%, transparent 55%)` }}>
                          <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14 }}>
                            <div style={{ fontFamily: 'Fraunces, serif', color: C.cream, fontWeight: 900, fontSize: '0.95rem', lineHeight: 1.2 }}>{p.client}</div>
                            <div style={{ fontFamily: 'Sora, sans-serif', color: a, fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 3 }}>{p.tags[0]}</div>
                          </div>
                        </div>
                        {/* Accent top stripe */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, backgroundColor: a }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Fade edges top/bottom */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to bottom, ${C.void} 0%, transparent 100%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to top, ${C.void} 0%, transparent 100%)`, pointerEvents: 'none' }} />
      </div>
    </section>
  );
}

/* ─── Clients — sticky horizontal scroll driven by scrollY ──────────────────── */
function ClientsHorizontal({ clients }: { clients: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['8%', '-70%']);

  return (
    <div ref={containerRef} style={{ height: '280vh', position: 'relative', backgroundColor: C.cream }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Label */}
        <div style={{ position: 'absolute', top: 48, left: 48 }}>
          <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}35`, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 4 }}>Brands We've Built</p>
        </div>
        {/* Counter */}
        <div style={{ position: 'absolute', top: 48, right: 48 }}>
          <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}25`, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3 }}>
            {clients.length}+ clients
          </p>
        </div>

        {/* Horizontal strip */}
        <motion.div style={{ x, display: 'flex', gap: 56, alignItems: 'baseline', paddingLeft: 48, willChange: 'transform' }}>
          {clients.map((client, i) => (
            <span key={i} style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
              fontWeight: i % 2 === 0 ? 900 : 400,
              fontStyle: i % 2 === 0 ? 'normal' : 'italic',
              color: i % 2 === 0 ? C.void : `${C.void}28`,
              whiteSpace: 'nowrap',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}>
              {client}
            </span>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <div style={{ width: 1, height: 36, backgroundColor: `${C.void}25`, margin: '0 auto' }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─── Named section components ──────────────────────────────────────────────── */

function HeroSection({ navigate, content }: { navigate: (p: string) => void; content: SiteContent }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, -80]);
  const headlineWords = content.home.heroHeadline.split(' ');

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseX.set(e.clientX / (window.innerWidth || 1440));
      mouseY.set(e.clientY / (window.innerHeight || 900));
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, [mouseX, mouseY]);

  const orb1x = useSpring(useTransform(mouseX, [0, 1], [-50, 50]), { stiffness: 22, damping: 28 });
  const orb1y = useSpring(useTransform(mouseY, [0, 1], [-35, 35]), { stiffness: 22, damping: 28 });
  const orb2x = useSpring(useTransform(mouseX, [0, 1], [45, -45]), { stiffness: 16, damping: 24 });
  const orb2y = useSpring(useTransform(mouseY, [0, 1], [25, -25]), { stiffness: 16, damping: 24 });
  const orb3x = useSpring(useTransform(mouseX, [0, 1], [-25, 25]), { stiffness: 12, damping: 20 });
  const orb3y = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), { stiffness: 12, damping: 20 });

  return (
    <section style={{ backgroundColor: C.void, minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

      {/* Grid texture */}
      <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <defs>
          <pattern id="hero-grid" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M72 0 L0 0 0 72" fill="none" stroke={C.cream} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" opacity="0.045" />
      </svg>

      {/* Mouse-reactive color orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div style={{ x: orb1x, y: orb1y, position: 'absolute', left: '-10%', top: '5%', width: 580, height: 580, borderRadius: '50%', background: `radial-gradient(circle, ${C.pink}52 0%, transparent 65%)`, filter: 'blur(90px)', willChange: 'transform' }}>
          <motion.div animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} style={{ width: '100%', height: '100%' }} />
        </motion.div>
        <motion.div style={{ x: orb2x, y: orb2y, position: 'absolute', right: '-8%', bottom: '10%', width: 520, height: 520, borderRadius: '50%', background: `radial-gradient(circle, ${C.purple}46 0%, transparent 65%)`, filter: 'blur(90px)', willChange: 'transform' }}>
          <motion.div animate={{ scale: [1, 1.12, 0.95, 1] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }} style={{ width: '100%', height: '100%' }} />
        </motion.div>
        <motion.div style={{ x: orb3x, y: orb3y, position: 'absolute', left: '38%', bottom: '22%', width: 320, height: 320, borderRadius: '50%', background: `radial-gradient(circle, ${C.cyan}28 0%, transparent 70%)`, filter: 'blur(70px)', willChange: 'transform' }}>
          <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 7 }} style={{ width: '100%', height: '100%' }} />
        </motion.div>
      </div>

      {/* Floating micro-elements */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
        <motion.div animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '18%', right: '15%', width: 56, height: 56, borderRadius: 10, backgroundColor: `${C.pink}1C`, border: `1px solid ${C.pink}28`, backdropFilter: 'blur(4px)' }} />
        <motion.div animate={{ y: [0, 14, 0], rotate: [0, -6, 0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', bottom: '30%', left: '8%', width: 40, height: 40, borderRadius: 8, backgroundColor: `${C.cyan}18`, border: `1px solid ${C.cyan}22` }} />
        <motion.div animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ position: 'absolute', top: '38%', left: '6%', width: 12, height: 12, borderRadius: '50%', backgroundColor: C.yellow, opacity: 0.5 }} />
        <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
          style={{ position: 'absolute', top: '22%', left: '24%', width: 8, height: 8, borderRadius: '50%', backgroundColor: C.pink, opacity: 0.6 }} />
        <motion.div animate={{ y: [0, -14, 0], x: [0, 8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          style={{ position: 'absolute', bottom: '38%', right: '10%', width: 10, height: 10, borderRadius: '50%', backgroundColor: C.purple, opacity: 0.5 }} />
        {/* ✦ sparkle */}
        <motion.div animate={{ rotate: [0, 360], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '55%', right: '25%', fontFamily: 'serif', fontSize: 20, color: C.pink, lineHeight: 1 }}>✦</motion.div>
        <motion.div animate={{ rotate: [0, -360], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: 4 }}
          style={{ position: 'absolute', top: '28%', left: '42%', fontFamily: 'serif', fontSize: 14, color: C.yellow, lineHeight: 1 }}>✦</motion.div>
      </div>

      {/* Content */}
      <motion.div style={{ y: heroY, position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', maxWidth: 980, padding: '0 24px', paddingTop: 96, paddingBottom: 60 }}>

        {/* Pill */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: `${C.cream}07`, border: `1px solid ${C.cream}12`, borderRadius: 100, padding: '7px 18px', marginBottom: 44 }}
        >
          <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4ade80', boxShadow: '0 0 10px rgba(74,222,128,0.8)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}55`, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2.5 }}>
            Available for projects
          </span>
        </motion.div>

        {/* Word-by-word headline */}
        <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(3.5rem, 11vw, 9.5rem)', lineHeight: 1, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 20 }}>
          {headlineWords.map((word, i) => (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.2em', verticalAlign: 'bottom' }}>
              <motion.span
                style={{ display: 'block' }}
                initial={{ y: '115%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.32 + i * 0.1, duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Squiggle */}
        <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.95, duration: 0.65 }} style={{ transformOrigin: 'center', marginBottom: 28 }}>
          <svg width="200" height="10" viewBox="0 0 200 10" style={{ display: 'block', margin: '0 auto' }}>
            <path d="M4,6 Q32,1 60,6 T115,6 T170,6 T200,6" stroke={C.pink} strokeWidth={4.5} strokeLinecap="round" fill="none" />
          </svg>
        </motion.div>

        {/* Sub */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
          style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}55`, fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.78, maxWidth: 420, margin: '0 auto 48px' }}>
          {content.home.heroSub}
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/work')}
            animate={{ boxShadow: [`0 0 20px ${C.pink}22`, `0 0 52px ${C.pink}52`, `0 0 20px ${C.pink}22`] }}
            transition={{ boxShadow: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' } } as any}
            style={{ backgroundColor: C.pink, color: C.void, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2.5, padding: '16px 34px', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer' }}
          >
            See Our Work <ArrowRight size={14} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/contact')}
            style={{ backgroundColor: 'transparent', color: C.cream, border: `1.5px solid ${C.cream}50`, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2.5, padding: '16px 34px', borderRadius: 100, cursor: 'pointer' }}>
            Start a Project
          </motion.button>
        </motion.div>
      </motion.div>

    </section>
  );
}

function ServicesMarquee() {
  return (
    <div style={{ backgroundColor: C.cream, borderTop: `2px solid ${C.void}`, borderBottom: `2px solid ${C.void}`, padding: '16px 0', overflow: 'hidden' }}>
      <motion.div animate={{ x: [0, '-50%'] }} transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
        {[...SERVICES, ...SERVICES].map((s, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(1rem, 2.2vw, 1.5rem)', fontWeight: 900, color: C.void, letterSpacing: '-0.01em', padding: '0 28px' }}>{s}</span>
            <span style={{ color: C.pink, fontSize: 18 }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Statement({ navigate, content }: { navigate: (p: string) => void; content: SiteContent }) {
  return (
    <section style={{ backgroundColor: C.pink, padding: '80px 48px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <p style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.15, maxWidth: 780 }}>
            We don't make things look nice.{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>We make them impossible to ignore.</em>
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 36, flexWrap: 'wrap' }}>
            <motion.button onClick={() => navigate('/work')} whileHover={{ scale: 1.04, y: -2 }}
              style={{ backgroundColor: C.void, color: C.cream, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, padding: '14px 28px', borderRadius: 100, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
              See the work <ArrowUpRight size={13} />
            </motion.button>
            <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}50`, fontSize: 12, fontWeight: 700 }}>
              {content.caseStudies.length}+ brands built
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PinnedWorkSection({ featured, navigate, content }: { featured: CaseStudy[]; navigate: (p: string) => void; content: SiteContent }) {
  return (
    <>
      <div style={{ backgroundColor: C.void, padding: '80px 48px 52px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -16, top: '50%', transform: 'translateY(-50%)', fontFamily: 'Fraunces, serif', fontSize: 'clamp(12rem, 22vw, 20rem)', fontWeight: 900, color: `${C.cream}04`, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
          {String(featured.length).padStart(2, '0')}
        </div>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <p style={{ fontFamily: 'Sora, sans-serif', color: C.pink, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3.5, marginBottom: 20 }}>Deep Dives</p>
            <h2>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                The work speaks
              </span>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: `${C.cream}35`, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 400, letterSpacing: '-0.025em', fontStyle: 'italic', lineHeight: 1.05 }}>
                for itself.
              </span>
            </h2>
          </Reveal>
        </div>
      </div>
      <PinnedWork projects={featured} navigate={navigate} />
    </>
  );
}

function AboutTeaser({ navigate, content }: { navigate: (p: string) => void; content: SiteContent }) {
  return (
    <section style={{ backgroundColor: C.cream, padding: '108px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

          <Reveal from="left">
            <p style={{ fontFamily: 'Sora, sans-serif', color: C.purple, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3.5, marginBottom: 24 }}>About the Studio</p>
            <h2 style={{ marginBottom: 32 }}>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.void, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                Design that earns
              </span>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.purple, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, letterSpacing: '-0.025em', fontStyle: 'italic', lineHeight: 1.05 }}>
                its keep.
              </span>
            </h2>
            <div style={{ display: 'flex', gap: 16, marginBottom: 36 }}>
              <div style={{ width: 3, borderRadius: 2, background: `linear-gradient(to bottom, ${C.purple}, ${C.pink})`, flexShrink: 0, alignSelf: 'stretch' }} />
              <div>
                <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}85`, lineHeight: 1.85, fontSize: '1.05rem', marginBottom: 12 }}>{content.home.aboutTeaser}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}50`, lineHeight: 1.8, fontSize: '0.95rem' }}>{content.home.aboutTeaserSub}</p>
              </div>
            </div>
            <motion.button onClick={() => navigate('/about')} whileHover={{ x: 5 }}
              style={{ fontFamily: 'Sora, sans-serif', color: C.purple, fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2.5, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              Meet the Studio <ArrowUpRight size={14} />
            </motion.button>
          </Reveal>

          <Reveal from="right" delay={0.1}>
            <div style={{ position: 'relative' }}>
              <motion.div initial={{ rotate: -3 }} whileInView={{ rotate: -1.5 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                style={{ overflow: 'hidden', borderRadius: 20, boxShadow: `0 40px 100px rgba(0,0,0,0.18), 0 0 0 1px ${C.purple}15` }}>
                <EI path="about.founderPhoto" fallbackSrc="https://images.unsplash.com/photo-1636293875439-b3125c0f1fc1?w=600&h=720&fit=crop" alt="The Sketchy Studio" className="w-full object-cover" style={{ height: 520, display: 'block' }} />
              </motion.div>
              <motion.div animate={{ y: [0, -12, 0], rotate: [3, 4, 3] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', bottom: -20, right: -24, backgroundColor: C.pink, color: C.void, borderRadius: 18, padding: '14px 24px', boxShadow: `0 24px 64px ${C.pink}45`, border: `2px solid ${C.void}` }}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 40, fontWeight: 900, lineHeight: 1 }}>50+</div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }}>Brands Built</div>
              </motion.div>
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
  );
}

function TestimonialsSection({ navigate, content }: { navigate: (p: string) => void; content: SiteContent }) {
  return (
    <section style={{ backgroundColor: C.void, padding: '108px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

        <Reveal>
          <p style={{ fontFamily: 'Sora, sans-serif', color: C.cyan, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3.5, marginBottom: 20 }}>Client Love</p>
          <h2 style={{ marginBottom: 48 }}>
            <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.05 }}>What they said</span>
            <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: `${C.cream}30`, fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 400, letterSpacing: '-0.025em', fontStyle: 'italic', lineHeight: 1.05 }}>after.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {content.home.testimonials.map((t, i) => {
            const colors = [C.pink, C.purple, C.cyan];
            const c = colors[i % colors.length];
            const dirs = ['left', 'bottom', 'right'] as const;
            return (
              <Reveal key={i} delay={i * 0.1} from={dirs[i % 3]}>
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
  );
}

function CTASection({ navigate, content }: { navigate: (p: string) => void; content: SiteContent }) {
  return (
    <section style={{ backgroundColor: C.pink, padding: '108px 48px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <Reveal from="left">
            <h2>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.void, fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>
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
  );
}

/* ─── Home page ─────────────────────────────────────────────────────────────── */

export default function Home() {
  const navigate = useNavigate();
  const { content } = useEdit();
  const featured = content.caseStudies.slice(0, 3);
  const sections = content.home.homeSections ?? DEFAULT_SECTIONS;

  return (
    <PageLayout>
      {sections.filter(s => s.enabled).map(s => {
        switch (s.type) {
          case 'hero':
            return <HeroSection key={s.id} navigate={navigate} content={content} />;
          case 'services-marquee':
            return <ServicesMarquee key={s.id} />;
          case 'statement':
            return <Statement key={s.id} navigate={navigate} content={content} />;
          case 'work-grid':
            return <WorkAutoGrid key={s.id} projects={content.caseStudies} navigate={navigate} />;
          case 'pinned-work':
            return <PinnedWorkSection key={s.id} featured={featured} navigate={navigate} content={content} />;
          case 'about-teaser':
            return <AboutTeaser key={s.id} navigate={navigate} content={content} />;
          case 'clients':
            return <ClientsHorizontal key={s.id} clients={content.home.clients} />;
          case 'testimonials':
            return <TestimonialsSection key={s.id} navigate={navigate} content={content} />;
          case 'cta':
            return <CTASection key={s.id} navigate={navigate} content={content} />;
          default:
            return null;
        }
      })}
    </PageLayout>
  );
}
