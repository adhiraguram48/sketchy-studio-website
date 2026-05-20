import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { C, NoiseOverlay } from '../components/SketchyUI';
import { useEdit } from '../context/EditContext';
import { PageLayout } from '../components/Layout';
import { CaseStudy } from '../data/content';

const ALL_TAGS = ['All', 'Brand', 'Web', 'Motion', 'Social'];

function accentFor(cs: CaseStudy): string {
  if ((cs as any).accentColor) return (cs as any).accentColor;
  if (cs.tags.includes('Motion')) return C.cyan;
  if (cs.tags.includes('Social')) return C.purple;
  if (cs.tags.includes('Web')) return C.yellow;
  return C.pink;
}

// Vary image heights across 3 columns for masonry feel
const IMG_HEIGHTS = [300, 220, 260, 240, 280, 210, 260, 300, 230];
function imgHeight(i: number) {
  return IMG_HEIGHTS[i % IMG_HEIGHTS.length];
}

function SlideUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Work() {
  const navigate = useNavigate();
  const { content, editMode, updateField } = useEdit();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? content.caseStudies
    : content.caseStudies.filter(cs => cs.tags.includes(activeFilter));

  function addCaseStudy() {
    const newCS: CaseStudy = {
      id: Date.now().toString(),
      slug: `project-${Date.now()}`,
      client: 'New Client',
      industry: 'Industry',
      services: ['Brand Identity'],
      year: '2026',
      timeline: '6 weeks',
      tags: ['Brand'],
      coverImage: '',
      projectImages: [],
      tagline: 'A new project.',
      shortDescription: 'Brief description of the project.',
      challenge: 'Describe the challenge here.',
      approach: ['Describe your first step here.'],
      results: {
        stats: [{ value: '3×', label: 'Improvement' }],
        testimonial: { quote: '', author: '', title: '', company: '' },
      },
    };
    updateField('caseStudies', [...content.caseStudies, newCS] as any);
  }

  return (
    <PageLayout>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.void, paddingTop: 140, paddingBottom: 80 }} className="relative overflow-hidden">
        <NoiseOverlay />

        {/* Pink accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, backgroundColor: C.pink }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Project count — ghost number behind */}
          <div style={{ position: 'absolute', right: 24, top: -32, fontFamily: 'Fraunces, serif', fontSize: 'clamp(8rem, 18vw, 14rem)', fontWeight: 900, color: `${C.cream}05`, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
            {content.caseStudies.length.toString().padStart(2, '0')}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'Sora, sans-serif', color: C.pink, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 20 }}
          >
            Works
          </motion.p>

          {/* Mixed heading — sorted style */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ lineHeight: 0.88, marginBottom: 24 }}
          >
            <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(3.5rem, 10vw, 7.5rem)', fontWeight: 900, letterSpacing: '-0.025em' }}>
              Work that speaks
            </span>
            <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: `${C.cream}40`, fontSize: 'clamp(3.5rem, 10vw, 7.5rem)', fontWeight: 400, letterSpacing: '-0.025em', fontStyle: 'italic' }}>
              louder than words.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50`, maxWidth: 480, lineHeight: 1.7, fontSize: '1rem' }}
          >
            Brand, web, motion, and social — built for founders and growing businesses who refuse to look like everyone else.
          </motion.p>
        </div>
      </section>

      {/* ── FILTER BAR ─────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: C.void, borderBottom: `1px solid ${C.surface}`, position: 'sticky', top: 64, zIndex: 40 }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto">
          {ALL_TAGS.map(tag => (
            <motion.button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: activeFilter === tag ? C.pink : 'transparent',
                color: activeFilter === tag ? C.void : `${C.cream}55`,
                fontFamily: 'Sora, sans-serif',
                fontSize: 11,
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                border: activeFilter === tag ? `1px solid ${C.pink}` : `1px solid ${C.surface}`,
                borderRadius: 100,
                padding: '6px 18px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {tag}
            </motion.button>
          ))}
          {editMode && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              onClick={addCaseStudy}
              style={{ backgroundColor: C.cyan, color: C.void, fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}
              className="ml-auto px-4 py-2 rounded-full flex items-center gap-1.5 whitespace-nowrap"
            >
              <Plus size={12} /> New Project
            </motion.button>
          )}
        </div>
      </div>

      {/* ── WORK GRID — masonry 3-col, text below image (sorted-style) ─────── */}
      <section style={{ backgroundColor: C.void }} className="py-12 pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start"
              >
                {filtered.map((project, i) => {
                  const a = accentFor(project);
                  const h = imgHeight(i);

                  return (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <SlideUp delay={i * 0.04}>
                        <motion.div
                          onClick={() => navigate(`/work/${project.slug}`)}
                          className="cursor-pointer group"
                          whileHover="hov"
                          style={{ borderRadius: 16, overflow: 'hidden', backgroundColor: C.cardDark }}
                        >
                          {/* Image */}
                          <div style={{ overflow: 'hidden', height: h, position: 'relative' }}>
                            {project.coverImage ? (
                              <motion.img
                                src={project.coverImage}
                                alt={project.client}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                variants={{ hov: { scale: 1.06 } }}
                                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                              />
                            ) : (
                              <div style={{ width: '100%', height: '100%', backgroundColor: `${a}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontFamily: 'Fraunces, serif', color: `${a}25`, fontSize: 48, fontWeight: 900 }}>?</span>
                              </div>
                            )}

                            {/* Accent line slides in on hover */}
                            <motion.div
                              variants={{ hov: { scaleX: 1 } }}
                              initial={{ scaleX: 0 }}
                              style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: a, transformOrigin: 'left' }}
                              transition={{ duration: 0.3 }}
                            />

                            {/* Year pill */}
                            <div style={{ position: 'absolute', top: 12, left: 12, backgroundColor: `${C.void}CC`, color: `${C.cream}55`, fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, padding: '4px 10px', borderRadius: 100, backdropFilter: 'blur(8px)' }}>
                              {project.year}
                            </div>
                          </div>

                          {/* Text below image — sorted style */}
                          <div style={{ padding: '16px 20px 20px' }}>
                            <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                              {project.tags.map(tag => (
                                <span key={tag} style={{ color: a, fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                              <div>
                                <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: '1.25rem', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 4 }}>
                                  {project.client}
                                </h3>
                                <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}45`, fontSize: 12, lineHeight: 1.5 }}>
                                  {project.tagline}
                                </p>
                              </div>
                              <motion.div
                                variants={{ hov: { opacity: 1, scale: 1, rotate: 0 } }}
                                initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
                                transition={{ duration: 0.2 }}
                                style={{ backgroundColor: a, color: C.void, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}
                              >
                                <ArrowUpRight size={14} />
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </SlideUp>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <div className="text-center py-32">
                <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}28`, fontSize: 14 }}>
                  No projects in this category yet.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.cream, padding: '96px 0' }} className="relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <h2 style={{ lineHeight: 0.9, marginBottom: 40 }}>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.void, fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>
                Have a project?
              </span>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: `${C.void}50`, fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, letterSpacing: '-0.02em', fontStyle: 'italic' }}>
                Let's talk.
              </span>
            </h2>
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{ backgroundColor: C.void, color: C.cream, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, padding: '16px 40px', borderRadius: 100, boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </section>

    </PageLayout>
  );
}
