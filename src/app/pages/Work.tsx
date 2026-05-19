import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Plus, Trash2 } from 'lucide-react';
import { C, FloatingOrbs, Squiggle, SectionLabel, Reveal, TiltCard, NoiseOverlay } from '../components/SketchyUI';
import { useEdit } from '../context/EditContext';
import { PageLayout } from '../components/Layout';
import { defaultContent, CaseStudy } from '../data/content';

const ALL_TAGS = ['All', 'Brand', 'Web', 'Motion', 'Social'];

export default function Work() {
  const navigate = useNavigate();
  const { content, editMode, updateField } = useEdit();
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const filtered = activeFilter === 'All'
    ? content.caseStudies
    : content.caseStudies.filter(cs => cs.tags.includes(activeFilter));

  function deleteCaseStudy(id: string) {
    if (!window.confirm('Delete this case study?')) return;
    const updated = content.caseStudies.filter(cs => cs.id !== id);
    updateField('caseStudies', updated as any);
  }

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
      coverImage: 'https://images.unsplash.com/photo-1700313084615-a6110cc4f6a3?w=1200&h=800&fit=crop',
      projectImages: ['https://images.unsplash.com/photo-1700313084615-a6110cc4f6a3?w=1400&h=900&fit=crop'],
      tagline: 'A new project.',
      shortDescription: 'Brief description of the project.',
      challenge: 'Describe the challenge here.',
      approach: 'Describe your approach here.',
      results: {
        stats: [
          { value: '3×', label: 'Improvement' },
          { value: '6 wks', label: 'Timeline' },
          { value: '100%', label: 'Satisfied' }
        ],
        testimonial: {
          quote: 'Client testimonial goes here.',
          author: 'Client Name',
          title: 'Title',
          company: 'Company Name',
        }
      }
    };
    updateField('caseStudies', [...content.caseStudies, newCS] as any);
  }

  return (
    <PageLayout>
      {/* Hero */}
      <section style={{ backgroundColor: C.void, paddingTop: 120 }} className="pb-20 relative overflow-hidden">
        <FloatingOrbs dark />
        <NoiseOverlay />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <SectionLabel text="Our Work" color={C.pink} />
            <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95 }} className="text-7xl font-black mt-4 mb-4">
              The Work.
            </h1>
            <Squiggle color={C.pink} width={180} />
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, maxWidth: 560, lineHeight: 1.7 }} className="mt-6 text-lg">
              A curated collection of brand, web, and motion projects built for founders and growing businesses.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter bar */}
      <section style={{ backgroundColor: C.void, borderBottom: `1px solid ${C.surface}` }} className="sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 overflow-x-auto">
          {ALL_TAGS.map(tag => (
            <motion.button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                backgroundColor: activeFilter === tag ? C.pink : 'transparent',
                color: activeFilter === tag ? C.void : `${C.cream}80`,
                borderColor: activeFilter === tag ? C.pink : C.surface,
                fontFamily: 'Sora, sans-serif',
              }}
              className="px-5 py-2 rounded-full text-sm font-black uppercase tracking-wide border-2 whitespace-nowrap transition-colors"
            >
              {tag}
            </motion.button>
          ))}

          {editMode && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={addCaseStudy}
              style={{ backgroundColor: C.cyan, color: C.void, fontFamily: 'Sora, sans-serif' }}
              className="ml-auto px-4 py-2 rounded-full text-sm font-black flex items-center gap-1 whitespace-nowrap"
            >
              <Plus size={14} /> Add Case Study
            </motion.button>
          )}
        </div>
      </section>

      {/* Work grid */}
      <section style={{ backgroundColor: C.void }} className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <TiltCard>
                    <div
                      onClick={() => navigate(`/work/${project.slug}`)}
                      onMouseEnter={() => setHoveredId(project.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ backgroundColor: C.cardDark, cursor: 'pointer' }}
                      className="rounded-2xl overflow-hidden border-2 group relative"
                      data-hover={hoveredId === project.id}
                    >
                      {/* Delete button in edit mode */}
                      {editMode && (
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteCaseStudy(project.id); }}
                          style={{ backgroundColor: '#FF4444', zIndex: 10 }}
                          className="absolute top-3 right-3 p-2 rounded-full text-white z-10"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}

                      <div className="relative overflow-hidden" style={{ height: 280 }}>
                        <motion.img
                          src={project.coverImage}
                          alt={project.client}
                          className="w-full h-full object-cover"
                          animate={{ scale: hoveredId === project.id ? 1.05 : 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <AnimatePresence>
                          {hoveredId === project.id && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 flex items-center justify-center"
                              style={{ backgroundColor: `${C.void}70`, backdropFilter: 'blur(4px)' }}
                            >
                              <motion.span
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                style={{ backgroundColor: C.pink, color: C.void, fontFamily: 'Sora, sans-serif' }}
                                className="px-6 py-3 rounded-full font-black text-sm uppercase tracking-wide flex items-center gap-2"
                              >
                                View Project <ArrowUpRight size={16} />
                              </motion.span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {/* Year badge */}
                        <div
                          style={{ backgroundColor: `${C.void}CC`, color: `${C.cream}80`, fontFamily: 'Sora, sans-serif' }}
                          className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full"
                        >
                          {project.year}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags.map(tag => (
                            <span
                              key={tag}
                              style={{
                                backgroundColor: `${C.purple}30`,
                                color: C.purple,
                                fontFamily: 'Sora, sans-serif'
                              }}
                              className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream }} className="text-2xl font-black mb-2">
                          {project.client}
                        </h3>
                        <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}60` }} className="text-sm mb-3">
                          {project.tagline}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.services.map(s => (
                            <span
                              key={s}
                              style={{ color: `${C.cream}50`, fontFamily: 'Sora, sans-serif', borderColor: C.surface }}
                              className="text-xs border rounded-full px-2 py-0.5"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40` }}>No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: C.cardDark, borderTop: `1px solid ${C.surface}` }} className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <p style={{ fontFamily: 'Sora, sans-serif', color: C.purple }} className="text-sm font-black uppercase tracking-widest mb-4">
              Have something in mind?
            </p>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95 }} className="text-5xl font-black mb-6">
              Have a project? Let's talk.
            </h2>
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{ backgroundColor: C.pink, color: C.void, fontFamily: 'Sora, sans-serif' }}
              className="px-8 py-4 rounded-full font-black text-sm uppercase tracking-wide"
            >
              Get in Touch
            </motion.button>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
