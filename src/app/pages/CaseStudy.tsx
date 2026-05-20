import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Building2 } from 'lucide-react';
import { C, FloatingOrbs, Squiggle, SectionLabel, Reveal, CountUp, NoiseOverlay } from '../components/SketchyUI';
import { useEdit } from '../context/EditContext';
import { PageLayout } from '../components/Layout';

// Unique accent color per tag category
function accentColor(tags: string[]): string {
  if (tags.includes('Motion')) return C.cyan;
  if (tags.includes('Social')) return C.purple;
  if (tags.includes('Web')) return C.yellow;
  return C.pink;
}

export default function CaseStudy() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { content } = useEdit();

  const project = content.caseStudies.find(cs => cs.slug === slug);
  const projectIndex = content.caseStudies.findIndex(cs => cs.slug === slug);
  const nextProject = project?.nextProject
    ? content.caseStudies.find(cs => cs.slug === project.nextProject)
    : content.caseStudies[(projectIndex + 1) % content.caseStudies.length];

  if (!project) {
    return (
      <PageLayout>
        <div style={{ backgroundColor: C.void, minHeight: '100vh', paddingTop: 120 }} className="flex items-center justify-center">
          <div className="text-center">
            <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream }} className="text-4xl font-black mb-4">Project not found.</h1>
            <button onClick={() => navigate('/work')} style={{ color: C.pink, fontFamily: 'Sora, sans-serif' }} className="font-black">← Back to Work</button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const accent = project.accentColor || accentColor(project.tags);

  return (
    <PageLayout>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.void, minHeight: '80vh' }} className="relative overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <motion.img
            src={project.coverImage}
            alt={project.client}
            className="w-full h-full object-cover"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <div style={{ background: `linear-gradient(to top, ${C.void} 35%, ${C.void}90 55%, transparent 100%)` }} className="absolute inset-0" />
          <div style={{ background: `linear-gradient(to right, ${accent}18 0%, transparent 60%)` }} className="absolute inset-0" />
        </div>
        <NoiseOverlay />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-40 w-full">
          <motion.button
            onClick={() => navigate('/work')}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ x: -4 }}
            style={{ color: `${C.cream}70`, fontFamily: 'Sora, sans-serif' }}
            className="text-sm flex items-center gap-2 mb-8"
          >
            <ArrowLeft size={14} /> All Work
          </motion.button>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map(tag => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ backgroundColor: `${accent}25`, color: accent, fontFamily: 'Sora, sans-serif', border: `1px solid ${accent}50` }}
                className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.92, fontSize: 'clamp(2.8rem, 8vw, 5.5rem)' }}
            className="font-black mb-4"
          >
            {project.client}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, fontSize: '1.125rem', maxWidth: 600 }}
          >
            {project.tagline}
          </motion.p>
        </div>
      </section>

      {/* ── PROJECT META BAR ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.cardDark, borderBottom: `1px solid ${C.surface}` }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { Icon: Building2, label: 'Client', value: project.client },
              { Icon: Tag, label: 'Industry', value: project.industry },
              { Icon: Tag, label: 'Services', value: project.services.join(' · ') },
              { Icon: Calendar, label: 'Year', value: project.year },
              { Icon: Clock, label: 'Timeline', value: project.timeline },
            ].map(({ Icon, label, value }) => (
              <div key={label}>
                <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40` }} className="text-xs uppercase tracking-widest mb-1 flex items-center gap-1">
                  <Icon size={9} /> {label}
                </div>
                <div style={{ fontFamily: 'Sora, sans-serif', color: C.cream }} className="text-sm font-black">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE CHALLENGE ────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.void }} className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <SectionLabel text="The Challenge" color={accent} />
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95, fontSize: 'clamp(2rem, 4vw, 3rem)' }} className="font-black mt-4 mb-4">
                Where they were.
              </h2>
              <Squiggle color={accent} width={120} />
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}CC`, lineHeight: 1.85, fontSize: '1.05rem' }} className="mt-6">
                {project.challenge}
              </p>
            </Reveal>

            {/* Pull quote */}
            <Reveal delay={0.15}>
              <motion.div
                whileHover={{ rotate: 0, scale: 1.02 }}
                style={{
                  backgroundColor: `${accent}12`,
                  border: `2px solid ${accent}40`,
                  rotate: '-1.5deg',
                  borderRadius: 24,
                  padding: 32,
                  marginTop: 48,
                }}
              >
                <div style={{ color: accent, fontSize: 64, lineHeight: 1, fontFamily: 'Fraunces, serif', opacity: 0.5 }}>"</div>
                <p style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 1.4, fontSize: '1.25rem' }} className="font-black -mt-4">
                  {project.shortDescription}
                </p>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${accent}30` }}>
                  <div style={{ fontFamily: 'Sora, sans-serif', color: accent, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}>
                    {project.industry}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── THE APPROACH ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.cream }} className="py-24 relative overflow-hidden">
        <div style={{ background: `linear-gradient(135deg, ${accent}08 0%, transparent 60%)` }} className="absolute inset-0" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="mb-14">
            <SectionLabel text="The Approach" color={C.void} rotate={1} />
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, lineHeight: 0.95, fontSize: 'clamp(2rem, 4vw, 3rem)' }} className="font-black mt-4 mb-3">
              What we did.
            </h2>
            <Squiggle color={C.void} width={120} />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {project.approach.map((step, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  style={{
                    backgroundColor: C.void,
                    border: `2px solid ${C.surface}`,
                    borderRadius: 20,
                    padding: 24,
                  }}
                >
                  <div style={{
                    fontFamily: 'Fraunces, serif',
                    color: accent,
                    fontSize: 36,
                    fontWeight: 900,
                    lineHeight: 1,
                    marginBottom: 12,
                    opacity: 0.7,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}CC`, lineHeight: 1.75, fontSize: '0.9rem' }}>
                    {step}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────────── */}
      {project.projectImages.length > 0 && (
        <section style={{ backgroundColor: C.void }} className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="mb-10">
              <SectionLabel text="The Work" color={accent} />
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95 }} className="text-4xl font-black mt-3">
                The output.
              </h2>
              <Squiggle color={accent} width={120} />
            </Reveal>

            {/* First image: full width */}
            {project.projectImages[0] && (
              <Reveal className="mb-4">
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  className="overflow-hidden rounded-2xl"
                  style={{ height: 'clamp(300px, 55vw, 600px)' }}
                >
                  <motion.img
                    src={project.projectImages[0]}
                    alt={`${project.client} 1`}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              </Reveal>
            )}

            {/* Rest: 2-column grid */}
            {project.projectImages.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.projectImages.slice(1).map((img, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="overflow-hidden rounded-2xl"
                      style={{ height: 300 }}
                    >
                      <motion.img
                        src={img}
                        alt={`${project.client} ${i + 2}`}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── RESULTS ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.cardDark }} className="py-24 relative overflow-hidden">
        <FloatingOrbs dark />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="mb-14 text-center">
            <SectionLabel text="The Results" color={accent} rotate={-1} />
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95 }} className="text-5xl font-black mt-3">
              The numbers.
            </h2>
            <Squiggle color={accent} width={120} className="mx-auto mt-2" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {project.results.stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.04, rotate: 0 }}
                  style={{
                    background: `linear-gradient(135deg, ${C.surface} 0%, ${C.cardDark} 100%)`,
                    border: `2px solid ${accent}60`,
                    rotate: `${i % 2 === 0 ? -1 : 1}deg`,
                    borderRadius: 24,
                    padding: 40,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontFamily: 'Fraunces, Georgia, serif', color: accent, lineHeight: 1 }} className="text-6xl font-black mb-3">
                    <CountUp value={stat.value} />
                  </div>
                  <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}70`, fontSize: 13 }} className="uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Testimonial */}
          <Reveal>
            <motion.div
              whileHover={{ scale: 1.01 }}
              style={{
                background: `linear-gradient(135deg, ${accent}15 0%, ${C.surface} 100%)`,
                border: `2px solid ${accent}30`,
                borderRadius: 24,
                padding: 48,
                maxWidth: 760,
                margin: '0 auto',
              }}
            >
              <div style={{ color: accent, fontSize: 72, lineHeight: 0.8, fontFamily: 'Fraunces, serif', opacity: 0.4, marginBottom: 8 }}>"</div>
              <p style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 1.5, fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }} className="italic mb-8">
                {project.results.testimonial.quote}
              </p>
              <div className="flex items-center gap-4" style={{ borderTop: `1px solid ${accent}25`, paddingTop: 20 }}>
                {project.results.testimonial.photo && (
                  <img
                    src={project.results.testimonial.photo}
                    alt={project.results.testimonial.author}
                    className="w-14 h-14 rounded-full object-cover"
                    style={{ border: `2px solid ${accent}50` }}
                  />
                )}
                <div>
                  <div style={{ fontFamily: 'Sora, sans-serif', color: C.cream, fontWeight: 900 }} className="text-sm">
                    {project.results.testimonial.author}
                  </div>
                  <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}60` }} className="text-xs">
                    {project.results.testimonial.title}, {project.results.testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── NEXT PROJECT ─────────────────────────────────────────────── */}
      {nextProject && (
        <motion.section
          onClick={() => navigate(`/work/${nextProject.slug}`)}
          whileHover="hover"
          style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', height: 360 }}
        >
          <motion.img
            src={nextProject.coverImage}
            alt={nextProject.client}
            className="w-full h-full object-cover"
            variants={{ hover: { scale: 1.04 } }}
            transition={{ duration: 0.6 }}
          />
          <div style={{ background: `linear-gradient(to right, ${C.void}F0 35%, ${C.void}60 100%)` }} className="absolute inset-0" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50`, fontSize: 11 }} className="uppercase tracking-widest mb-3">
                Next Project
              </p>
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95 }} className="text-5xl font-black mb-4">
                {nextProject.client}
              </h2>
              <motion.span
                variants={{ hover: { x: 10 } }}
                style={{ color: accent, fontFamily: 'Sora, sans-serif' }}
                className="font-black flex items-center gap-2"
              >
                View Project <ArrowRight size={16} />
              </motion.span>
            </div>
          </div>
        </motion.section>
      )}

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.void, borderTop: `1px solid ${C.surface}` }} className="py-20 text-center relative overflow-hidden">
        <div style={{ background: `radial-gradient(ellipse at center, ${accent}12 0%, transparent 70%)` }} className="absolute inset-0" />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <Reveal>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95 }} className="text-4xl font-black mb-4">
              Like what you see?<br />Let's work together.
            </h2>
            <Squiggle color={accent} width={160} className="mx-auto mb-8" />
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{ backgroundColor: accent, color: C.void, fontFamily: 'Sora, sans-serif' }}
              className="px-10 py-4 rounded-full font-black text-sm uppercase tracking-wide shadow-2xl"
            >
              Start a Project
            </motion.button>
          </Reveal>
        </div>
      </section>

    </PageLayout>
  );
}
