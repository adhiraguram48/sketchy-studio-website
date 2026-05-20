import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { C, NoiseOverlay, Reveal } from '../components/SketchyUI';
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

// Editorial grid: alternating layout slots per position
// Pattern: full | wide+narrow | narrow+wide | full...
const GRID_SPANS = ['md:col-span-12', 'md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7', 'md:col-span-12'] as const;
function gridClass(i: number): string {
  return GRID_SPANS[i % GRID_SPANS.length];
}
function cardHeight(i: number): number {
  const pattern = [520, 400, 400, 380, 380, 460];
  return pattern[i % pattern.length];
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
      <section style={{ backgroundColor: C.void, paddingTop: 130 }} className="pb-16 relative overflow-hidden">
        <NoiseOverlay />

        {/* Pink accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: C.pink }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            {/* Large number behind */}
            <div style={{ position: 'absolute', right: 24, top: -20, fontFamily: 'Fraunces, serif', fontSize: 'clamp(8rem, 18vw, 16rem)', fontWeight: 900, color: `${C.cream}06`, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
              {content.caseStudies.length.toString().padStart(2, '0')}
            </div>

            <p style={{ fontFamily: 'Sora, sans-serif', color: C.pink, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 3 }} className="mb-5">
              Selected Projects
            </p>
            <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.88, fontSize: 'clamp(3.5rem, 11vw, 8.5rem)', fontWeight: 900, letterSpacing: '-0.02em' }} className="mb-6">
              The Work.
            </h1>
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}60`, maxWidth: 480, lineHeight: 1.7, fontSize: '1rem' }}>
              Brand, web, motion, and social — built for founders and growing businesses who refuse to look like everyone else.
            </p>
          </Reveal>
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
                color: activeFilter === tag ? C.void : `${C.cream}60`,
                fontFamily: 'Sora, sans-serif',
                fontSize: 11,
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                border: activeFilter === tag ? `1px solid ${C.pink}` : `1px solid ${C.surface}`,
                borderRadius: 100,
                padding: '6px 16px',
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

      {/* ── WORK GRID ──────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.void }} className="py-10 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => {
                const a = accentFor(project);
                const height = cardHeight(i);
                const colClass = gridClass(i);

                return (
                  <motion.div
                    key={project.id}
                    layout
                    className={colClass}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                  >
                    <motion.div
                      onClick={() => navigate(`/work/${project.slug}`)}
                      className="relative overflow-hidden rounded-2xl cursor-pointer group"
                      style={{ height }}
                      whileHover="hover"
                    >
                      {/* Cover image */}
                      {project.coverImage ? (
                        <motion.img
                          src={project.coverImage}
                          alt={project.client}
                          className="w-full h-full object-cover"
                          variants={{ hover: { scale: 1.06 } }}
                          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                      ) : (
                        <div style={{ backgroundColor: `${a}12`, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontFamily: 'Fraunces, serif', color: `${a}30`, fontSize: 64, fontWeight: 900 }}>?</span>
                        </div>
                      )}

                      {/* Gradient overlay */}
                      <div style={{ background: `linear-gradient(to top, ${C.void}F5 0%, ${C.void}70 35%, transparent 65%)` }} className="absolute inset-0" />

                      {/* Top accent on hover */}
                      <motion.div
                        variants={{ hover: { scaleX: 1, opacity: 1 } }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: a, transformOrigin: 'left' }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Year pill — top left */}
                      <div style={{ position: 'absolute', top: 16, left: 16, backgroundColor: `${C.void}CC`, color: `${C.cream}60`, fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5 }} className="px-3 py-1 rounded-full backdrop-blur-sm">
                        {project.year}
                      </div>

                      {/* Arrow button — top right, appears on hover */}
                      <motion.div
                        variants={{ hover: { opacity: 1, scale: 1, rotate: 0 } }}
                        initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
                        transition={{ duration: 0.2 }}
                        style={{ position: 'absolute', top: 12, right: 12, backgroundColor: a, color: C.void, borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <ArrowUpRight size={16} />
                      </motion.div>

                      {/* Bottom text */}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 24px 24px' }}>
                        <div className="flex flex-wrap gap-1.5 mb-2.5">
                          {project.tags.map(tag => (
                            <span key={tag} style={{ backgroundColor: `${a}20`, color: a, fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 900, border: `1px solid ${a}35`, textTransform: 'uppercase', letterSpacing: 1.5 }} className="px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.92, letterSpacing: '-0.01em', fontSize: i === 0 || i % 6 === 5 ? 'clamp(1.6rem, 3vw, 2.4rem)' : '1.5rem' }} className="font-black mb-1.5">
                          {project.client}
                        </h3>
                        <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}55`, fontSize: 12, lineHeight: 1.5 }}>
                          {project.tagline}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-32">
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}30`, fontSize: 14 }}>No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.pink }} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(8rem, 22vw, 18rem)', fontWeight: 900, color: `${C.void}10`, lineHeight: 1, userSelect: 'none', whiteSpace: 'nowrap' }}>
            LET'S BUILD
          </span>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, lineHeight: 0.9, fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.02em' }} className="font-black mb-6">
              Have a project?<br />Let's talk.
            </h2>
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{ backgroundColor: C.void, color: C.cream, fontFamily: 'Sora, sans-serif' }}
              className="px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl"
            >
              Get in Touch
            </motion.button>
          </Reveal>
        </div>
      </section>

    </PageLayout>
  );
}
