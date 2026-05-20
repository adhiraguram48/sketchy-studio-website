import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { C, Squiggle, Reveal, WordReveal, NoiseOverlay, CountUp, GradientText } from '../components/SketchyUI';
import { useEdit, EI } from '../context/EditContext';
import { PageLayout } from '../components/Layout';

const SERVICES_ROW1 = ['Brand Identity', 'Web Design', 'Motion & Video', 'Social Media', 'Brand Strategy', 'Packaging'];
const SERVICES_ROW2 = ['UI/UX Design', 'Content Strategy', 'Photography', 'Art Direction', 'Copywriting', 'SEO'];

// Accent from tags (same logic as CaseStudy)
function accent(tags: string[], override?: string) {
  if (override) return override;
  if (tags.includes('Motion')) return C.cyan;
  if (tags.includes('Social')) return C.purple;
  if (tags.includes('Web')) return C.yellow;
  return C.pink;
}

export default function Home() {
  const navigate = useNavigate();
  const { content } = useEdit();
  const featured = content.caseStudies.slice(0, 4);

  return (
    <PageLayout>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.void, minHeight: '100vh' }} className="relative overflow-hidden flex flex-col justify-end">
        <NoiseOverlay />

        {/* Faint background image */}
        <div className="absolute inset-0 z-0">
          <EI
            path="about.studioPhoto"
            fallbackSrc="https://images.unsplash.com/photo-1700313084615-a6110cc4f6a3?w=1600&h=900&fit=crop"
            alt="Studio"
            className="w-full h-full object-cover"
            style={{ opacity: 0.07 }}
          />
        </div>

        {/* Electric top accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: C.pink, transformOrigin: 'left', zIndex: 10 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-16 w-full">

          {/* Location + year pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <span style={{ backgroundColor: `${C.pink}18`, color: C.pink, fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2 }} className="px-3 py-1.5 rounded-full">
              Bangalore · Est. 2022
            </span>
            <span style={{ color: `${C.cream}30`, fontFamily: 'Sora, sans-serif', fontSize: 11 }}>Full-service Creative Studio</span>
          </motion.div>

          {/* Massive headline */}
          <h1
            style={{
              fontFamily: 'Fraunces, Georgia, serif',
              color: C.cream,
              lineHeight: 0.88,
              fontSize: 'clamp(3.8rem, 12vw, 9.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
            }}
            className="mb-8 max-w-5xl"
          >
            <WordReveal text={content.home.heroHeadline} delay={0.15} />
          </h1>

          {/* Squiggle */}
          <div className="mb-10">
            <Squiggle color={C.pink} width={280} />
          </div>

          {/* Sub + CTA row */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 440 }}
            >
              {content.home.heroSub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3 lg:ml-auto lg:shrink-0"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/work')}
                style={{ backgroundColor: C.pink, color: C.void, fontFamily: 'Sora, sans-serif' }}
                className="px-7 py-3.5 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-2 shadow-2xl"
              >
                See Our Work <ArrowRight size={15} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/contact')}
                style={{ backgroundColor: 'transparent', color: C.cream, borderColor: `${C.cream}25`, fontFamily: 'Sora, sans-serif' }}
                className="px-7 py-3.5 rounded-full font-black text-sm uppercase tracking-widest border"
              >
                Start a Project
              </motion.button>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            style={{ borderTop: `1px solid ${C.surface}`, marginTop: 48, paddingTop: 32 }}
            className="flex flex-wrap gap-x-16 gap-y-6"
          >
            {content.home.stats.map(stat => (
              <div key={stat.label}>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.pink, lineHeight: 1 }} className="text-5xl font-black">
                  <CountUp value={stat.value} />
                </div>
                <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}45`, fontSize: 11, textTransform: 'uppercase', letterSpacing: 2 }} className="mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.cream, borderTop: `3px solid ${C.void}`, borderBottom: `3px solid ${C.void}`, overflow: 'hidden', padding: '14px 0' }}>
        {/* Row 1 — left */}
        <div className="overflow-hidden mb-2">
          <motion.div
            animate={{ x: [0, '-50%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="flex whitespace-nowrap"
            style={{ width: 'max-content' }}
          >
            {[...SERVICES_ROW1, ...SERVICES_ROW1].map((s, i) => (
              <span key={i} className="flex items-center">
                <span style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', fontWeight: 900 }} className="uppercase tracking-wide px-6">
                  {s}
                </span>
                <span style={{ color: C.pink, fontSize: 20 }}>✦</span>
              </span>
            ))}
          </motion.div>
        </div>
        {/* Row 2 — right */}
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: ['-50%', 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="flex whitespace-nowrap"
            style={{ width: 'max-content' }}
          >
            {[...SERVICES_ROW2, ...SERVICES_ROW2].map((s, i) => (
              <span key={i} className="flex items-center">
                <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}60`, fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)', fontWeight: 900 }} className="uppercase tracking-widest px-6">
                  {s}
                </span>
                <span style={{ color: `${C.void}30`, fontSize: 14 }}>◎</span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED WORK ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.void }} className="pt-24 pb-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section header */}
          <Reveal className="mb-12">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p style={{ fontFamily: 'Sora, sans-serif', color: C.pink, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3 }} className="mb-4">
                  Selected Work
                </p>
                <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.9, fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.02em' }} className="font-black">
                  The work speaks<br />
                  <GradientText from={C.pink} to={C.purple}>for itself.</GradientText>
                </h2>
              </div>
              <motion.button
                onClick={() => navigate('/work')}
                whileHover={{ x: 5 }}
                style={{ color: `${C.cream}50`, fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2 }}
                className="hidden md:flex items-center gap-2 shrink-0 mb-1"
              >
                All Work <ArrowUpRight size={14} />
              </motion.button>
            </div>
          </Reveal>

          {/* Editorial grid — first full, then 2+1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {featured.map((project, i) => {
              const a = accent(project.tags, (project as any).accentColor);
              // Layout: 0=full, 1=wide, 2=narrow, 3=full
              const spanMap = ['md:col-span-12', 'md:col-span-7', 'md:col-span-5', 'md:col-span-12'] as const;
              const span = spanMap[Math.min(i, 3)];
              const height = i === 0 ? 540 : i === 3 ? 420 : 380;

              return (
                <motion.div
                  key={project.id}
                  className={span}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                >
                  <motion.div
                    onClick={() => navigate(`/work/${project.slug}`)}
                    className="relative overflow-hidden rounded-2xl cursor-pointer group"
                    style={{ height }}
                    whileHover="hover"
                  >
                    {/* Image */}
                    <motion.img
                      src={project.coverImage}
                      alt={project.client}
                      className="w-full h-full object-cover"
                      variants={{ hover: { scale: 1.06 } }}
                      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    />

                    {/* Bottom gradient */}
                    <div style={{ background: `linear-gradient(to top, ${C.void}F0 0%, ${C.void}60 40%, transparent 70%)` }} className="absolute inset-0" />

                    {/* Top accent line on hover */}
                    <motion.div
                      variants={{ hover: { scaleX: 1 } }}
                      initial={{ scaleX: 0 }}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: a, transformOrigin: 'left' }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map(tag => (
                          <span key={tag} style={{ backgroundColor: `${a}25`, color: a, fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 900, border: `1px solid ${a}40` }} className="px-2.5 py-1 rounded-full uppercase tracking-widest">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.9, fontSize: i === 0 ? 'clamp(1.8rem, 4vw, 3rem)' : '1.5rem' }} className="font-black mb-1">
                            {project.client}
                          </h3>
                          <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}60`, fontSize: 13 }}>{project.tagline}</p>
                        </div>
                        <motion.div
                          variants={{ hover: { scale: 1, opacity: 1, rotate: 0 } }}
                          initial={{ scale: 0.7, opacity: 0, rotate: -45 }}
                          style={{ backgroundColor: a, color: C.void, borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <ArrowUpRight size={18} />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* View all */}
          <Reveal className="mt-10 text-center">
            <motion.button
              onClick={() => navigate('/work')}
              whileHover={{ scale: 1.04, y: -2 }}
              style={{ borderColor: `${C.cream}20`, color: `${C.cream}70`, fontFamily: 'Sora, sans-serif' }}
              className="px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-widest border flex items-center gap-2 mx-auto"
            >
              View All Projects <ArrowUpRight size={14} />
            </motion.button>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT TEASER ───────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.cream }} className="py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <Reveal>
              <p style={{ fontFamily: 'Sora, sans-serif', color: C.purple, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3 }} className="mb-5">
                About the Studio
              </p>
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, lineHeight: 0.9, fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em' }} className="font-black mb-4">
                Design that earns<br />its keep.
              </h2>
              <Squiggle color={C.purple} width={160} />
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}90`, lineHeight: 1.75, fontSize: '1.05rem' }} className="mt-6 mb-3">
                {content.home.aboutTeaser}
              </p>
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}60`, lineHeight: 1.7 }} className="mb-8 text-sm">
                {content.home.aboutTeaserSub}
              </p>
              <motion.button
                onClick={() => navigate('/about')}
                whileHover={{ x: 6 }}
                style={{ color: C.purple, fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2 }}
                className="flex items-center gap-2"
              >
                Meet the Studio <ArrowUpRight size={14} />
              </motion.button>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative">
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  style={{ rotate: '-1.5deg' }}
                  transition={{ type: 'spring', stiffness: 180 }}
                  className="overflow-hidden rounded-2xl shadow-2xl"
                >
                  <EI
                    path="about.founderPhoto"
                    fallbackSrc="https://images.unsplash.com/photo-1636293875439-b3125c0f1fc1?w=600&h=700&fit=crop"
                    alt="The Sketchy Studio"
                    className="w-full object-cover"
                    style={{ height: 480 }}
                  />
                </motion.div>
                {/* Floating stat pill */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', bottom: -16, right: -12, backgroundColor: C.pink, color: C.void, rotate: '3deg', fontFamily: 'Sora, sans-serif' }}
                  className="px-5 py-3 rounded-2xl shadow-2xl"
                >
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 900, lineHeight: 1 }}>50+</div>
                  <div style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5 }}>Brands Built</div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.void }} className="py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-14">
            <div className="flex items-end justify-between">
              <div>
                <p style={{ fontFamily: 'Sora, sans-serif', color: C.cyan, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3 }} className="mb-4">
                  Client Love
                </p>
                <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.9, fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em' }} className="font-black">
                  The verdict.
                </h2>
              </div>
            </div>
          </Reveal>

          {/* Client name ticker */}
          <div className="overflow-hidden mb-14">
            <motion.div
              animate={{ x: [0, '-50%'] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="flex whitespace-nowrap"
              style={{ width: 'max-content' }}
            >
              {[...content.home.clients, ...content.home.clients].map((client, i) => (
                <span key={i} className="flex items-center">
                  <span style={{ fontFamily: 'Fraunces, Georgia, serif', color: `${C.cream}25`, fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2 }} className="px-8">
                    {client}
                  </span>
                  <span style={{ color: `${C.cream}15`, fontSize: 18 }}>·</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* Testimonial cards — horizontal rows, no tilts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.home.testimonials.map((t, i) => {
              const colors = [C.pink, C.purple, C.cyan];
              const c = colors[i % colors.length];
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div
                    style={{ backgroundColor: C.cardDark, borderTop: `3px solid ${c}`, borderRadius: 20, padding: 28, height: '100%' }}
                  >
                    <div style={{ color: c, fontSize: 48, lineHeight: 0.8, fontFamily: 'Fraunces, serif', opacity: 0.5, marginBottom: 12 }}>"</div>
                    <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}CC`, lineHeight: 1.75, fontSize: 13 }} className="mb-6">
                      {t.quote}
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      {t.photo && <img src={t.photo} alt={t.author} className="w-9 h-9 rounded-full object-cover" style={{ border: `2px solid ${c}40` }} />}
                      <div>
                        <div style={{ fontFamily: 'Sora, sans-serif', color: C.cream, fontWeight: 900, fontSize: 13 }}>{t.author}</div>
                        <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}45`, fontSize: 11 }}>{t.title}, {t.company}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.pink }} className="py-24 relative overflow-hidden">
        {/* Ghost text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(8rem, 22vw, 18rem)', fontWeight: 900, color: `${C.void}12`, lineHeight: 1, userSelect: 'none', whiteSpace: 'nowrap' }}>
            LET'S GO
          </span>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, lineHeight: 0.88, fontSize: 'clamp(3rem, 8vw, 6.5rem)', letterSpacing: '-0.02em' }} className="font-black mb-6">
              {content.home.ctaHeadline}
            </h2>
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}70`, lineHeight: 1.6, fontSize: '1.05rem', maxWidth: 460, margin: '0 auto 36px' }}>
              {content.home.ctaSub}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                style={{ backgroundColor: C.void, color: C.cream, fontFamily: 'Sora, sans-serif' }}
                className="px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl"
              >
                Start a Project
              </motion.button>
              <motion.button
                onClick={() => navigate('/work')}
                whileHover={{ scale: 1.05, y: -3 }}
                style={{ backgroundColor: 'transparent', color: C.void, borderColor: `${C.void}40`, fontFamily: 'Sora, sans-serif' }}
                className="px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest border-2"
              >
                See Our Work
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

    </PageLayout>
  );
}
