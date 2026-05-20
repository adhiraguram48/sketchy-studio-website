import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import { useState } from 'react';
import {
  C, FloatingOrbs, Squiggle, SectionLabel, Sticker, Reveal,
  TiltCard, DotTrio, WordReveal, NoiseOverlay, GradientText, CountUp
} from '../components/SketchyUI';
import { useEdit, EI } from '../context/EditContext';
import { PageLayout } from '../components/Layout';

const SERVICES = [
  { icon: '✦', label: 'Brand Identity', color: C.pink },
  { icon: '◎', label: 'Web Design & Build', color: C.yellow },
  { icon: '▲', label: 'Motion & Video', color: C.cyan },
  { icon: '◈', label: 'Social Media', color: C.purple },
];

export default function Home() {
  const navigate = useNavigate();
  const { content } = useEdit();
  const featuredProjects = content.caseStudies.slice(0, 3);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <PageLayout>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: C.void, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}
        className="flex items-center"
      >
        <FloatingOrbs dark />
        <NoiseOverlay />

        {/* Background image overlay */}
        <div className="absolute inset-0 z-0">
          <EI
            path="about.studioPhoto"
            fallbackSrc="https://images.unsplash.com/photo-1700313084615-a6110cc4f6a3?w=1600&h=900&fit=crop"
            alt="Studio"
            className="w-full h-full object-cover opacity-15"
          />
          <div style={{ background: `linear-gradient(180deg, ${C.void}80 0%, ${C.void} 80%)` }} className="absolute inset-0" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
          {/* Top sticker badges */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Sticker emoji="✦" text="Brand Identity" color={C.pink} rotate={-2} />
            <Sticker emoji="◎" text="Web Design" color={C.yellow} rotate={1} />
            <Sticker emoji="▲" text="Motion" color={C.cyan} rotate={-1} />
          </div>

          {/* Hero headline */}
          <div className="max-w-4xl mb-6">
            <h1
              style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95, fontSize: 'clamp(3rem, 8vw, 6rem)' }}
              className="font-black mb-4"
            >
              <WordReveal text={content.home.heroHeadline} delay={0.1} />
            </h1>
            <div className="mt-2">
              <Squiggle color={C.pink} width={220} />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}CC`, maxWidth: 560, fontSize: '1.125rem', lineHeight: 1.6 }}
            className="mb-10"
          >
            {content.home.heroSub}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/work')}
              style={{ backgroundColor: C.pink, color: C.void, fontFamily: 'Sora, sans-serif' }}
              className="px-8 py-4 rounded-full font-black text-sm uppercase tracking-wide shadow-xl flex items-center gap-2"
            >
              See Our Work <ArrowRight size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/contact')}
              style={{ backgroundColor: 'transparent', color: C.cream, borderColor: `${C.cream}40`, fontFamily: 'Sora, sans-serif' }}
              className="px-8 py-4 rounded-full font-black text-sm uppercase tracking-wide border-2"
            >
              Start a Project
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-12 mt-16 pt-12"
            style={{ borderTop: `1px solid ${C.surface}` }}
          >
            {content.home.stats.map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.pink }} className="text-4xl font-black">
                  <CountUp value={stat.value} />
                </div>
                <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}60` }} className="text-sm mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES STRIP ──────────────────────────────────────── */}
      <section style={{ backgroundColor: C.cream }} className="py-8 overflow-hidden">
        <motion.div
          animate={{ x: [0, -400] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 whitespace-nowrap"
          style={{ width: 'max-content' }}
        >
          {[...SERVICES, ...SERVICES, ...SERVICES].map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <span style={{ color: s.color, fontFamily: 'Sora, sans-serif' }} className="text-2xl font-black">{s.icon}</span>
              <span style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void }} className="text-lg font-black">{s.label}</span>
              <span style={{ color: `${C.void}40` }} className="text-lg">·</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── FEATURED WORK ───────────────────────────────────────── */}
      <section style={{ backgroundColor: C.void }} className="py-24 relative overflow-hidden">
        <FloatingOrbs dark />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <SectionLabel text="Featured Work" color={C.yellow} />
                <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95 }} className="text-5xl font-black mt-3">
                  The work speaks<br />
                  <GradientText from={C.pink} to={C.purple}>for itself.</GradientText>
                </h2>
                <Squiggle color={C.yellow} width={160} />
              </div>
              <motion.button
                onClick={() => navigate('/work')}
                whileHover={{ x: 4 }}
                style={{ color: C.pink, fontFamily: 'Sora, sans-serif' }}
                className="font-black text-sm uppercase tracking-wide flex items-center gap-2 shrink-0"
              >
                View all work <ArrowUpRight size={16} />
              </motion.button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={i === 0 ? 'lg:col-span-2' : ''}
              >
                <TiltCard>
                  <motion.div
                    onClick={() => navigate(`/work/${project.slug}`)}
                    onHoverStart={() => setHoveredProject(project.id)}
                    onHoverEnd={() => setHoveredProject(null)}
                    style={{ backgroundColor: C.cardDark, cursor: 'pointer', borderColor: C.surface }}
                    className="rounded-2xl overflow-hidden border-2"
                    whileHover={{ borderColor: C.pink }}
                  >
                    <div className="relative overflow-hidden" style={{ height: i === 0 ? 480 : 320 }}>
                      <motion.img
                        src={project.coverImage}
                        alt={project.client}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <AnimatePresence>
                        {hoveredProject === project.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ backgroundColor: `${C.void}80`, backdropFilter: 'blur(4px)' }}
                          >
                            <motion.div
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              style={{ backgroundColor: C.pink, color: C.void, fontFamily: 'Sora, sans-serif' }}
                              className="px-6 py-3 rounded-full font-black text-sm uppercase tracking-wide flex items-center gap-2"
                            >
                              View Project <ArrowUpRight size={16} />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map(tag => (
                          <span key={tag} style={{ backgroundColor: `${C.purple}30`, color: C.purple, fontFamily: 'Sora, sans-serif' }} className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream }} className="text-2xl font-black mb-1">{project.client}</h3>
                      <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}70` }} className="text-sm">{project.shortDescription}</p>
                    </div>
                  </motion.div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.cream }} className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <SectionLabel text="About the Studio" color={C.purple} rotate={1} />
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, lineHeight: 0.95 }} className="text-5xl font-black mt-4 mb-6">
                Design that earns<br />its keep.
              </h2>
              <Squiggle color={C.purple} width={160} />
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}CC`, lineHeight: 1.7 }} className="mt-6 text-lg mb-3">
                {content.home.aboutTeaser}
              </p>
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}80`, lineHeight: 1.7 }} className="mb-8">
                {content.home.aboutTeaserSub}
              </p>
              <motion.button
                onClick={() => navigate('/about')}
                whileHover={{ x: 4 }}
                style={{ color: C.purple, fontFamily: 'Sora, sans-serif' }}
                className="font-black text-sm uppercase tracking-wide flex items-center gap-2"
              >
                Meet the Studio <ArrowUpRight size={16} />
              </motion.button>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative">
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  style={{ rotate: '-2deg' }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <EI
                    path="about.founderPhoto"
                    fallbackSrc="https://images.unsplash.com/photo-1636293875439-b3125c0f1fc1?w=600&h=700&fit=crop"
                    alt="The Sketchy Studio founders"
                    className="w-full rounded-2xl shadow-2xl"
                    style={{ maxHeight: 500, objectFit: 'cover' }}
                  />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute', bottom: -20, right: -20,
                    backgroundColor: C.pink, color: C.void, rotate: '3deg', fontFamily: 'Sora, sans-serif',
                  }}
                  className="px-4 py-3 rounded-2xl font-black text-sm shadow-xl"
                >
                  <div className="text-2xl font-black" style={{ fontFamily: 'Fraunces, serif' }}>50+</div>
                  <div className="text-xs uppercase tracking-wide">Brands Built</div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF / TESTIMONIALS ─────────────────────────── */}
      <section style={{ backgroundColor: C.void }} className="py-24 relative overflow-hidden">
        <FloatingOrbs dark />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="text-center mb-16">
            <SectionLabel text="Client Love" color={C.cyan} rotate={-1} />
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95 }} className="text-5xl font-black mt-3">
              What clients say.
            </h2>
            <Squiggle color={C.cyan} width={180} className="mx-auto mt-2" />
          </Reveal>

          <div className="mb-16 overflow-hidden">
            <motion.div
              animate={{ x: [0, -600] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="flex gap-12 items-center whitespace-nowrap"
              style={{ width: 'max-content' }}
            >
              {[...content.home.clients, ...content.home.clients].map((client, i) => (
                <span key={i} style={{ fontFamily: 'Fraunces, Georgia, serif', color: `${C.cream}40` }} className="text-xl font-black uppercase tracking-wider">
                  {client}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.home.testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  style={{ backgroundColor: C.cardDark, borderColor: i === 1 ? C.purple : C.surface, rotate: `${i % 2 === 0 ? -1 : 1}deg` }}
                  whileHover={{ rotate: 0, scale: 1.02, borderColor: C.pink }}
                  className="border-2 rounded-2xl p-6 h-full"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} size={14} fill={C.yellow} color={C.yellow} />)}
                  </div>
                  <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}CC`, lineHeight: 1.7 }} className="text-sm mb-6">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img src={t.photo} alt={t.author} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div style={{ fontFamily: 'Sora, sans-serif', color: C.cream }} className="text-sm font-black">{t.author}</div>
                      <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}60` }} className="text-xs">{t.company}</div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.cream }} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${C.pink}15 0%, ${C.purple}15 50%, ${C.cyan}15 100%)` }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <Sticker emoji="🚀" text="Ready?" color={C.yellow} rotate={-2} className="mb-6 inline-block" />
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, lineHeight: 0.95 }} className="text-6xl font-black mb-4">
              {content.home.ctaHeadline}
            </h2>
            <Squiggle color={C.pink} width={200} className="mx-auto mb-6" />
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}80`, lineHeight: 1.6 }} className="text-lg mb-10">
              {content.home.ctaSub}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                style={{ backgroundColor: C.void, color: C.cream, fontFamily: 'Sora, sans-serif' }}
                className="px-8 py-4 rounded-full font-black text-sm uppercase tracking-wide shadow-xl"
              >
                Start a Project
              </motion.button>
              <motion.button
                onClick={() => navigate('/work')}
                whileHover={{ scale: 1.05, y: -3 }}
                style={{ backgroundColor: 'transparent', color: C.void, borderColor: `${C.void}40`, fontFamily: 'Sora, sans-serif' }}
                className="px-8 py-4 rounded-full font-black text-sm uppercase tracking-wide border-2"
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
