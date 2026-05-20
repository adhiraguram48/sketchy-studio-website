import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { C } from '../components/SketchyUI';
import { useEdit } from '../context/EditContext';
import { PageLayout } from '../components/Layout';
import { CaseStudy } from '../data/content';

const ALL_TAGS = ['All', 'Brand', 'Web', 'Motion', 'Social'];

function accent(cs: CaseStudy): string {
  if ((cs as any).accentColor) return (cs as any).accentColor;
  if (cs.tags.includes('Motion')) return C.cyan;
  if (cs.tags.includes('Social')) return C.purple;
  if (cs.tags.includes('Web')) return C.yellow;
  return C.pink;
}

// Masonry heights — vary across 3 columns
const HEIGHTS = [320, 240, 280, 260, 300, 210, 270, 300, 240];
function cardH(i: number) { return HEIGHTS[i % HEIGHTS.length]; }

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
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
      <section style={{ backgroundColor: C.void, paddingTop: 148, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        {/* Subtle grid */}
        <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <defs>
            <pattern id="work-grid" width="72" height="72" patternUnits="userSpaceOnUse">
              <path d="M72 0 L0 0 0 72" fill="none" stroke={C.cream} strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#work-grid)" opacity="0.04" />
        </svg>

        {/* Pink top line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, backgroundColor: C.pink }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 10 }}>

          {/* Ghost number */}
          <div style={{ position: 'absolute', right: 0, top: -24, fontFamily: 'Fraunces, serif', fontSize: 'clamp(10rem, 20vw, 18rem)', fontWeight: 900, color: `${C.cream}04`, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
            {content.caseStudies.length.toString().padStart(2, '0')}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'Sora, sans-serif', color: C.pink, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3.5, marginBottom: 22 }}
          >
            Works
          </motion.p>

          {/* Mixed heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 style={{ lineHeight: 0.87, marginBottom: 28 }}>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: 'clamp(3.5rem, 10vw, 7.5rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>
                Work that speaks
              </span>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: `${C.cream}38`, fontSize: 'clamp(3.5rem, 10vw, 7.5rem)', fontWeight: 400, letterSpacing: '-0.03em', fontStyle: 'italic' }}>
                louder than words.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}48`, maxWidth: 460, lineHeight: 1.75, fontSize: '1rem' }}
          >
            Brand, web, motion, and social — built for founders who refuse to look like everyone else.
          </motion.p>
        </div>
      </section>

      {/* ── FILTER BAR ─────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: C.void, borderBottom: `1px solid ${C.surface}`, position: 'sticky', top: 64, zIndex: 40 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '12px 48px', display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto' }}>
          {ALL_TAGS.map(tag => (
            <motion.button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: activeFilter === tag ? C.pink : 'transparent',
                color: activeFilter === tag ? C.void : `${C.cream}50`,
                fontFamily: 'Sora, sans-serif',
                fontSize: 11,
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                border: activeFilter === tag ? `1px solid ${C.pink}` : `1px solid ${C.surface}`,
                borderRadius: 100,
                padding: '7px 20px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
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
              style={{ backgroundColor: C.cyan, color: C.void, fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, marginLeft: 'auto', padding: '7px 16px', borderRadius: 100, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              <Plus size={12} /> New Project
            </motion.button>
          )}
        </div>
      </div>

      {/* ── WORK GRID — 3-col, text below image ────────────────────────────── */}
      <section style={{ backgroundColor: C.void, padding: '48px 0 96px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          {filtered.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => {
                  const a = accent(project);
                  const h = cardH(i);

                  return (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.4, delay: (i % 9) * 0.04 }}
                    >
                      <Reveal delay={(i % 9) * 0.04}>
                        <motion.div
                          onClick={() => navigate(`/work/${project.slug}`)}
                          whileHover="hov"
                          style={{ borderRadius: 14, overflow: 'hidden', backgroundColor: C.cardDark, cursor: 'pointer' }}
                        >
                          {/* Image */}
                          <div style={{ height: h, overflow: 'hidden', position: 'relative' }}>
                            {project.coverImage ? (
                              <motion.img
                                src={project.coverImage}
                                alt={project.client}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                variants={{ hov: { scale: 1.07 } }}
                                transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                              />
                            ) : (
                              <div style={{ width: '100%', height: '100%', backgroundColor: `${a}14`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontFamily: 'Fraunces, serif', color: `${a}22`, fontSize: 52, fontWeight: 900 }}>?</span>
                              </div>
                            )}

                            {/* Accent top on hover */}
                            <motion.div
                              variants={{ hov: { scaleX: 1 } }}
                              initial={{ scaleX: 0 }}
                              style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: a, transformOrigin: 'left' }}
                              transition={{ duration: 0.3 }}
                            />

                            {/* Year */}
                            <div style={{ position: 'absolute', top: 12, left: 12, backgroundColor: `${C.void}CC`, color: `${C.cream}50`, fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, padding: '4px 10px', borderRadius: 100, backdropFilter: 'blur(8px)' }}>
                              {project.year}
                            </div>
                          </div>

                          {/* Text below — sorted pattern */}
                          <div style={{ padding: '16px 18px 18px' }}>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                              {project.tags.map(tag => (
                                <span key={tag} style={{ fontFamily: 'Sora, sans-serif', color: a, fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                              <div>
                                <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: '1.2rem', fontWeight: 900, letterSpacing: '-0.015em', lineHeight: 1.1, marginBottom: 4 }}>
                                  {project.client}
                                </h3>
                                <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40`, fontSize: 12, lineHeight: 1.5 }}>
                                  {project.tagline}
                                </p>
                              </div>
                              <motion.div
                                variants={{ hov: { opacity: 1, scale: 1, rotate: 0 } }}
                                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                                transition={{ duration: 0.2 }}
                                style={{ backgroundColor: a, color: C.void, borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}
                              >
                                <ArrowUpRight size={13} />
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </Reveal>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div style={{ textAlign: 'center', padding: '120px 0' }}>
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}25`, fontSize: 14 }}>
                No projects in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.cream, padding: '96px 48px', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'end' }}>
          <Reveal>
            <h2 style={{ lineHeight: 0.88 }}>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: C.void, fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.025em' }}>
                Have a project?
              </span>
              <span style={{ display: 'block', fontFamily: 'Fraunces, Georgia, serif', color: `${C.void}45`, fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 400, letterSpacing: '-0.025em', fontStyle: 'italic' }}>
                Let's talk.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}55`, lineHeight: 1.8, fontSize: '1rem', marginBottom: 32 }}>
              Tell us about your brand. We'll tell you how to make it impossible to ignore.
            </p>
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{ backgroundColor: C.void, color: C.cream, fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 2.5, padding: '15px 36px', borderRadius: 100, border: 'none', cursor: 'pointer', boxShadow: '0 12px 40px rgba(0,0,0,0.18)' }}
            >
              Get in Touch
            </motion.button>
          </Reveal>
        </div>
      </section>

    </PageLayout>
  );
}
