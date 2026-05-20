import { useNavigate } from 'react-router';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { C, CountUp } from '../components/SketchyUI';
import { useEdit, EI } from '../context/EditContext';
import { PageLayout } from '../components/Layout';
import { CaseStudy } from '../data/content';

const SERVICES = ['Brand Identity', 'Web Design', 'Motion & Video', 'Social Media', 'Brand Strategy', 'Packaging Design'];

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

/* ─── Work grid — sorted masonry style, shown on home ──────────────────────── */
const GRID_HEIGHTS = [340, 260, 310, 280, 320, 250];
function WorkGrid({ projects, navigate }: { projects: CaseStudy[]; navigate: (p: string) => void }) {
  const shown = projects.slice(0, 6);
  return (
    <section style={{ backgroundColor: '#F0EDE8', padding: '88px 0 100px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52 }}>
          <div>
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}40`, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 4, marginBottom: 10 }}>
              Selected Work
            </p>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1 }}>
              {projects.length} brands.{' '}
              <em style={{ fontWeight: 400, fontStyle: 'italic', color: `${C.void}55` }}>Every one different.</em>
            </h2>
          </div>
          <motion.button onClick={() => navigate('/work')} whileHover={{ x: 5 }}
            style={{ fontFamily: 'Sora, sans-serif', color: C.void, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: `1.5px solid ${C.void}30`, borderRadius: 100, padding: '10px 22px', cursor: 'pointer', flexShrink: 0 }}>
            View all <ArrowUpRight size={13} />
          </motion.button>
        </div>

        {/* 3-col masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {shown.map((p, i) => {
            const a = accentColor(p.tags, (p as any).accentColor);
            const h = GRID_HEIGHTS[i % GRID_HEIGHTS.length];
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.72, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover="hov"
                onClick={() => navigate(`/work/${p.slug}`)}
                style={{ borderRadius: 18, overflow: 'hidden', cursor: 'pointer', backgroundColor: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}
              >
                {/* Image */}
                <div style={{ height: h, overflow: 'hidden', position: 'relative' }}>
                  {p.coverImage ? (
                    <motion.img src={p.coverImage} alt={p.client}
                      variants={{ hov: { scale: 1.07 } }}
                      transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${a}35 0%, ${a}10 60%, transparent 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'Fraunces, serif', fontSize: 110, fontWeight: 900, color: a, opacity: 0.22, lineHeight: 1, userSelect: 'none' }}>
                        {p.client[0]}
                      </span>
                    </div>
                  )}
                  {/* Accent top on hover */}
                  <motion.div
                    variants={{ hov: { scaleX: 1 } }} initial={{ scaleX: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: a, transformOrigin: 'left' }}
                  />
                  {/* Year pill */}
                  <div style={{ position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.7)', fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, padding: '4px 10px', borderRadius: 100 }}>
                    {p.year}
                  </div>
                </div>

                {/* Text below */}
                <div style={{ padding: '18px 20px 20px' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                    {p.tags.map(tag => (
                      <span key={tag} style={{ fontFamily: 'Sora, sans-serif', color: a, fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5 }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <div>
                      <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, fontSize: '1.2rem', fontWeight: 900, letterSpacing: '-0.015em', lineHeight: 1.1, marginBottom: 4 }}>
                        {p.client}
                      </h3>
                      <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}45`, fontSize: 12, lineHeight: 1.5 }}>{p.tagline}</p>
                    </div>
                    <motion.div
                      variants={{ hov: { opacity: 1, scale: 1, rotate: 0 } }}
                      initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                      transition={{ duration: 0.2 }}
                      style={{ backgroundColor: a, color: '#fff', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <ArrowUpRight size={13} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Horizontal sorted-style ticker below the grid */}
        <div style={{ marginTop: 64, overflow: 'hidden' }}>
          <style>{`
            @keyframes wt-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            .wt-inner { animation: wt-scroll 55s linear infinite; }
            .wt-wrap:hover .wt-inner { animation-play-state: paused; }
          `}</style>
          <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}30`, fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 4, marginBottom: 20, paddingLeft: 2 }}>All our work</p>
          <div className="wt-wrap" style={{ overflow: 'hidden' }}>
            <div className="wt-inner" style={{ display: 'flex', gap: 14, width: 'max-content' }}>
              {[...projects, ...projects].map((p, i) => {
                const a = accentColor(p.tags, (p as any).accentColor);
                return (
                  <div key={i} onClick={() => navigate(`/work/${p.slug}`)}
                    style={{ width: 300, flexShrink: 0, cursor: 'pointer', borderRadius: 14, overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <div style={{ height: 220, position: 'relative', overflow: 'hidden' }}>
                      {p.coverImage
                        ? <img src={p.coverImage} alt={p.client} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        : <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${a}30 0%, ${a}08 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontFamily: 'Fraunces, serif', fontSize: 80, fontWeight: 900, color: a, opacity: 0.25, lineHeight: 1 }}>{p.client[0]}</span>
                          </div>
                      }
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, backgroundColor: a }} />
                    </div>
                    <div style={{ padding: '12px 14px 14px' }}>
                      <div style={{ fontFamily: 'Fraunces, serif', color: C.void, fontWeight: 900, fontSize: '1rem', letterSpacing: '-0.01em', lineHeight: 1.1 }}>{p.client}</div>
                      <div style={{ fontFamily: 'Sora, sans-serif', color: a, fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 4 }}>{p.tags.join(' · ')}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Client marquee — horizontal infinite CSS scroll ───────────────────────── */
function ClientMarquee({ clients }: { clients: string[] }) {
  return (
    <div style={{ overflow: 'hidden', borderTop: `1px solid ${C.surface}`, borderBottom: `1px solid ${C.surface}`, padding: '28px 0', backgroundColor: C.cardDark }}>
      <style>{`
        @keyframes cl-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .cl-inner { animation: cl-scroll 28s linear infinite; }
        .cl-wrap:hover .cl-inner { animation-play-state: paused; }
      `}</style>
      <div className="cl-wrap" style={{ overflow: 'hidden' }}>
        <div className="cl-inner" style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}>
          {[...clients, ...clients].map((client, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Fraunces, Georgia, serif', color: `${C.cream}22`, fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, padding: '0 44px', whiteSpace: 'nowrap' }}>
                {client}
              </span>
              <span style={{ color: `${C.cream}15`, fontSize: 16, lineHeight: 1 }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { content } = useEdit();
  const featured = content.caseStudies.slice(0, 3);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, -80]);
  const headlineWords = content.home.heroHeadline.split(' ');

  // Mouse-reactive orbs
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
    <PageLayout>

      {/* ═══════════════════════════════ HERO ═════════════════════════════════ */}
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
        <motion.div style={{ y: heroY, position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', maxWidth: 980, padding: '0 24px', paddingTop: 96, paddingBottom: 120 }}>

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

        {/* Stats — glass bottom bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: `1px solid ${C.surface}`, backgroundColor: `${C.void}E0`, backdropFilter: 'blur(20px)', padding: '22px 48px', display: 'flex', flexWrap: 'wrap', gap: '12px 56px', zIndex: 10 }}>
          {content.home.stats.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
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

      {/* ═══════════════════ BOLD STATEMENT (PINK) ═══════════════════════════ */}
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

      {/* ═══════════════════ SORTED-STYLE WORK GRID + TICKER ═══════════════ */}
      <WorkGrid projects={content.caseStudies} navigate={navigate} />

      {/* ═══════════════════ PINNED SCROLL WORK (3 featured) ════════════════ */}
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

      {/* ═══════════════════ ABOUT TEASER ════════════════════════════════════ */}
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

      {/* ═══════════════════ TESTIMONIALS ════════════════════════════════════ */}
      <section style={{ backgroundColor: C.void, padding: '108px 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

          <Reveal>
            <p style={{ fontFamily: 'Sora, sans-serif', color: C.cyan, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3.5, marginBottom: 20 }}>Client Love</p>
            <h2 style={{ marginBottom: 48 }}>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.05 }}>What they said</span>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: `${C.cream}30`, fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 400, letterSpacing: '-0.025em', fontStyle: 'italic', lineHeight: 1.05 }}>after.</span>
            </h2>
          </Reveal>

          {/* Client names — horizontal infinite CSS marquee */}
          <div style={{ marginBottom: 52 }}>
            <ClientMarquee clients={content.home.clients} />
          </div>

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

      {/* ═══════════════════ CTA — PINK, CLOSING ═════════════════════════════ */}
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

    </PageLayout>
  );
}
