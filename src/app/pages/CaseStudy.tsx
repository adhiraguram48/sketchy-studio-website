import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Building2, Pencil, Save, X } from 'lucide-react';
import { useState } from 'react';
import { C, FloatingOrbs, Squiggle, SectionLabel, Reveal, Callout, AnimatedNumber, NoiseOverlay } from '../components/SketchyUI';
import { useEdit } from '../context/EditContext';
import { PageLayout } from '../components/Layout';
import { CaseStudy as CaseStudyType } from '../data/content';

export default function CaseStudy() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { content, editMode, updateField } = useEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<CaseStudyType>>({});

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
            <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream }} className="text-4xl font-black mb-4">
              Project not found.
            </h1>
            <button onClick={() => navigate('/work')} style={{ color: C.pink, fontFamily: 'Sora, sans-serif' }} className="font-black">
              ← Back to Work
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  function startEdit() {
    setEditData({ ...project });
    setIsEditing(true);
  }

  function saveEdit() {
    const updated = content.caseStudies.map(cs =>
      cs.slug === slug ? { ...cs, ...editData } : cs
    );
    updateField('caseStudies', updated as any);
    setIsEditing(false);
  }

  const displayProject = isEditing ? { ...project, ...editData } : project;

  return (
    <PageLayout>
      {/* Edit panel */}
      {editMode && !isEditing && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={startEdit}
          style={{ position: 'fixed', top: 80, right: 24, backgroundColor: C.purple, color: C.cream, fontFamily: 'Sora, sans-serif', zIndex: 40 }}
          className="px-4 py-2 rounded-full text-sm font-black flex items-center gap-2 shadow-xl"
        >
          <Pencil size={14} /> Edit Case Study
        </motion.button>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ backgroundColor: `${C.void}F0`, backdropFilter: 'blur(12px)' }}
        >
          <div className="max-w-2xl mx-auto p-6 pt-20">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream }} className="text-2xl font-black">
                Edit Case Study
              </h2>
              <button onClick={() => setIsEditing(false)} style={{ color: `${C.cream}80` }}>
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { label: 'Client Name', key: 'client' },
                { label: 'Industry', key: 'industry' },
                { label: 'Year', key: 'year' },
                { label: 'Timeline', key: 'timeline' },
                { label: 'Tagline', key: 'tagline' },
                { label: 'Cover Image URL', key: 'coverImage' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-xs uppercase tracking-wide block mb-1">
                    {label}
                  </label>
                  <input
                    value={(editData as any)[key] || ''}
                    onChange={e => setEditData({ ...editData, [key]: e.target.value })}
                    style={{
                      backgroundColor: C.cardDark,
                      color: C.cream,
                      borderColor: C.surface,
                      fontFamily: 'Sora, sans-serif',
                    }}
                    className="w-full px-4 py-2 rounded-xl border-2 text-sm outline-none focus:border-purple-500"
                  />
                </div>
              ))}

              {[
                { label: 'The Challenge', key: 'challenge' },
                { label: 'The Approach', key: 'approach' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-xs uppercase tracking-wide block mb-1">
                    {label}
                  </label>
                  <textarea
                    value={(editData as any)[key] || ''}
                    onChange={e => setEditData({ ...editData, [key]: e.target.value })}
                    rows={4}
                    style={{
                      backgroundColor: C.cardDark,
                      color: C.cream,
                      borderColor: C.surface,
                      fontFamily: 'Sora, sans-serif',
                    }}
                    className="w-full px-4 py-2 rounded-xl border-2 text-sm outline-none focus:border-purple-500 resize-none"
                  />
                </div>
              ))}

              {/* Tags */}
              <div>
                <label style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-xs uppercase tracking-wide block mb-1">
                  Tags (comma separated)
                </label>
                <input
                  value={(editData.tags || []).join(', ')}
                  onChange={e => setEditData({ ...editData, tags: e.target.value.split(',').map(t => t.trim()) })}
                  style={{ backgroundColor: C.cardDark, color: C.cream, borderColor: C.surface, fontFamily: 'Sora, sans-serif' }}
                  className="w-full px-4 py-2 rounded-xl border-2 text-sm outline-none"
                />
              </div>

              {/* Project images */}
              <div>
                <label style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-xs uppercase tracking-wide block mb-1">
                  Project Images (one URL per line)
                </label>
                <textarea
                  value={(editData.projectImages || []).join('\n')}
                  onChange={e => setEditData({ ...editData, projectImages: e.target.value.split('\n').filter(Boolean) })}
                  rows={3}
                  style={{ backgroundColor: C.cardDark, color: C.cream, borderColor: C.surface, fontFamily: 'Sora, sans-serif' }}
                  className="w-full px-4 py-2 rounded-xl border-2 text-sm outline-none resize-none"
                />
              </div>

              <motion.button
                onClick={saveEdit}
                whileHover={{ scale: 1.02 }}
                style={{ backgroundColor: C.cyan, color: C.void, fontFamily: 'Sora, sans-serif' }}
                className="py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2"
              >
                <Save size={16} /> Save Changes
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero */}
      <section style={{ backgroundColor: C.void, minHeight: '70vh', paddingTop: 0 }} className="relative overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img
            src={displayProject.coverImage}
            alt={displayProject.client}
            className="w-full h-full object-cover"
          />
          <div style={{ background: `linear-gradient(to top, ${C.void} 30%, ${C.void}80 60%, transparent 100%)` }} className="absolute inset-0" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-32 w-full">
          <motion.button
            onClick={() => navigate('/work')}
            whileHover={{ x: -4 }}
            style={{ color: `${C.cream}80`, fontFamily: 'Sora, sans-serif' }}
            className="text-sm flex items-center gap-2 mb-8"
          >
            <ArrowLeft size={16} /> All Work
          </motion.button>

          <div className="flex flex-wrap gap-2 mb-4">
            {displayProject.tags.map(tag => (
              <span
                key={tag}
                style={{ backgroundColor: `${C.pink}30`, color: C.pink, fontFamily: 'Sora, sans-serif' }}
                className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95, fontSize: 'clamp(2.5rem, 7vw, 5rem)' }} className="font-black mb-4">
            {displayProject.client}
          </h1>
          <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, fontSize: '1.125rem' }}>
            {displayProject.tagline}
          </p>
        </div>
      </section>

      {/* Project info bar */}
      <section style={{ backgroundColor: C.cardDark, borderBottom: `1px solid ${C.surface}` }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: Building2, label: 'Client', value: displayProject.client },
              { icon: Tag, label: 'Industry', value: displayProject.industry },
              { icon: Tag, label: 'Services', value: displayProject.services.join(', ') },
              { icon: Calendar, label: 'Year', value: displayProject.year },
              { icon: Clock, label: 'Timeline', value: displayProject.timeline },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50` }} className="text-xs uppercase tracking-wide mb-1 flex items-center gap-1">
                  <Icon size={10} /> {label}
                </div>
                <div style={{ fontFamily: 'Sora, sans-serif', color: C.cream }} className="text-sm font-black">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section style={{ backgroundColor: C.void }} className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <SectionLabel text="The Challenge" color={C.pink} />
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 1 }} className="text-4xl font-black mt-3 mb-4">
              Where they were.
            </h2>
            <Squiggle color={C.pink} width={140} />
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}CC`, lineHeight: 1.8, fontSize: '1.125rem' }} className="mt-6">
              {displayProject.challenge}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section style={{ backgroundColor: C.cardDark }} className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <SectionLabel text="The Approach" color={C.cyan} rotate={1} />
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 1 }} className="text-4xl font-black mt-3 mb-4">
              What we did.
            </h2>
            <Squiggle color={C.cyan} width={140} />
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}CC`, lineHeight: 1.8, fontSize: '1.125rem' }} className="mt-6">
              {displayProject.approach}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ backgroundColor: C.void }} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-10">
            <SectionLabel text="The Work" color={C.yellow} />
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 1 }} className="text-4xl font-black mt-3">
              The output.
            </h2>
            <Squiggle color={C.yellow} width={120} />
          </Reveal>

          <div className="flex flex-col gap-4">
            {displayProject.projectImages.map((img, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="overflow-hidden rounded-2xl"
                  style={{ height: i === 0 ? 560 : 320 }}
                >
                  <img src={img} alt={`${displayProject.client} project ${i + 1}`} className="w-full h-full object-cover" />
                </motion.div>
              </Reveal>
            ))}

            {editMode && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  const url = window.prompt('Enter image URL:');
                  if (url) {
                    const updated = content.caseStudies.map(cs =>
                      cs.slug === slug
                        ? { ...cs, projectImages: [...cs.projectImages, url] }
                        : cs
                    );
                    updateField('caseStudies', updated as any);
                  }
                }}
                style={{ borderColor: C.surface, color: `${C.cream}60`, fontFamily: 'Sora, sans-serif' }}
                className="border-2 border-dashed rounded-2xl py-8 text-sm font-black flex items-center justify-center gap-2"
              >
                + Add Image
              </motion.button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section style={{ backgroundColor: C.cardDark }} className="py-20 relative overflow-hidden">
        <FloatingOrbs dark />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="mb-12">
            <SectionLabel text="The Results" color={C.purple} rotate={-1} />
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 1 }} className="text-4xl font-black mt-3">
              The numbers.
            </h2>
            <Squiggle color={C.purple} width={120} />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {displayProject.results.stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  style={{
                    backgroundColor: C.surface,
                    rotate: `${i % 2 === 0 ? -1 : 1}deg`,
                    borderColor: [C.pink, C.yellow, C.cyan][i % 3],
                  }}
                  className="border-2 rounded-2xl p-8 text-center"
                >
                  <div style={{ fontFamily: 'Fraunces, Georgia, serif', color: [C.pink, C.yellow, C.cyan][i % 3] }} className="text-5xl font-black mb-2">
                    <AnimatedNumber value={stat.value} />
                  </div>
                  <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Testimonial */}
          <Reveal>
            <Callout color={C.purple} rotate={-1} className="max-w-3xl mx-auto">
              <p style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 1.5, fontSize: '1.25rem' }} className="italic mb-6">
                "{displayProject.results.testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                {displayProject.results.testimonial.photo && (
                  <img
                    src={displayProject.results.testimonial.photo}
                    alt={displayProject.results.testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <div style={{ fontFamily: 'Sora, sans-serif', color: C.cream }} className="font-black text-sm">
                    {displayProject.results.testimonial.author}
                  </div>
                  <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}60` }} className="text-xs">
                    {displayProject.results.testimonial.title}, {displayProject.results.testimonial.company}
                  </div>
                </div>
              </div>
            </Callout>
          </Reveal>
        </div>
      </section>

      {/* Next project */}
      {nextProject && (
        <section
          onClick={() => navigate(`/work/${nextProject.slug}`)}
          style={{ cursor: 'pointer' }}
          className="relative overflow-hidden"
        >
          <div style={{ height: 320 }} className="relative">
            <img src={nextProject.coverImage} alt={nextProject.client} className="w-full h-full object-cover" />
            <div style={{ background: `linear-gradient(to right, ${C.void}E0 40%, ${C.void}60 100%)` }} className="absolute inset-0" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full">
                <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}60` }} className="text-sm uppercase tracking-widest mb-2">
                  Next Project
                </p>
                <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream }} className="text-4xl font-black mb-3">
                  {nextProject.client}
                </h2>
                <motion.span
                  whileHover={{ x: 8 }}
                  style={{ color: C.pink, fontFamily: 'Sora, sans-serif' }}
                  className="font-black flex items-center gap-2"
                >
                  View Project <ArrowRight size={16} />
                </motion.span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section style={{ backgroundColor: C.void, borderTop: `1px solid ${C.surface}` }} className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95 }} className="text-4xl font-black mb-4">
              Like what you see? Let's work together.
            </h2>
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{ backgroundColor: C.pink, color: C.void, fontFamily: 'Sora, sans-serif' }}
              className="mt-6 px-8 py-4 rounded-full font-black text-sm uppercase tracking-wide"
            >
              Start a Project
            </motion.button>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
