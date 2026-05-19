import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Instagram, Pencil, Save, X } from 'lucide-react';
import { useState } from 'react';
import { C, FloatingOrbs, Squiggle, SectionLabel, Reveal, NoiseOverlay } from '../components/SketchyUI';
import { useEdit } from '../context/EditContext';
import { PageLayout } from '../components/Layout';
import { Article, ArticleBlock } from '../data/content';

function renderBlock(block: ArticleBlock, i: number) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={i} style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 1 }} className="text-3xl font-black mt-10 mb-4">
          {block.content as string}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={i} style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream }} className="text-2xl font-black mt-8 mb-3">
          {block.content as string}
        </h3>
      );
    case 'p':
      return (
        <p key={i} style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}CC`, lineHeight: 1.8, fontSize: '1.0625rem' }} className="mb-6">
          {block.content as string}
        </p>
      );
    case 'quote':
      return (
        <blockquote
          key={i}
          style={{
            borderLeft: `4px solid ${C.pink}`,
            backgroundColor: `${C.pink}12`,
            fontFamily: 'Fraunces, Georgia, serif',
            color: C.cream,
            lineHeight: 1.5,
            fontSize: '1.25rem',
          }}
          className="pl-6 pr-4 py-4 rounded-r-xl my-8 italic font-black"
        >
          {block.content as string}
        </blockquote>
      );
    case 'image':
      return (
        <div key={i} className="my-8 rounded-2xl overflow-hidden">
          <img src={block.content as string} alt={block.caption || ''} className="w-full object-cover" style={{ maxHeight: 500 }} />
          {block.caption && (
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50`, textAlign: 'center' }} className="text-sm mt-3">
              {block.caption}
            </p>
          )}
        </div>
      );
    case 'list':
      return (
        <ul key={i} className="mb-6 flex flex-col gap-2 ml-4">
          {(block.content as string[]).map((item, j) => (
            <li key={j} className="flex items-start gap-3">
              <span style={{ color: C.pink }} className="font-black mt-1">✦</span>
              <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}CC`, lineHeight: 1.7 }}>{item}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export default function JournalArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { content, editMode, updateField } = useEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Article>>({});

  const article = content.articles.find(a => a.slug === slug);
  const articleIndex = content.articles.findIndex(a => a.slug === slug);
  const related = content.articles.filter((_, i) => i !== articleIndex).slice(0, 3);

  if (!article) {
    return (
      <PageLayout>
        <div style={{ backgroundColor: C.void, minHeight: '100vh', paddingTop: 120 }} className="flex items-center justify-center">
          <div className="text-center">
            <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream }} className="text-4xl font-black mb-4">Article not found.</h1>
            <button onClick={() => navigate('/journal')} style={{ color: C.pink, fontFamily: 'Sora, sans-serif' }} className="font-black">← Back to Journal</button>
          </div>
        </div>
      </PageLayout>
    );
  }

  function startEdit() { setEditData({ ...article }); setIsEditing(true); }
  function saveEdit() {
    updateField('articles', content.articles.map(a => a.slug === slug ? { ...a, ...editData } : a) as any);
    setIsEditing(false);
  }

  const display = isEditing ? { ...article, ...editData } : article;

  return (
    <PageLayout>
      {/* Edit toggle */}
      {editMode && !isEditing && (
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={startEdit}
          style={{ position: 'fixed', top: 80, right: 24, backgroundColor: C.purple, color: C.cream, fontFamily: 'Sora, sans-serif', zIndex: 40 }}
          className="px-4 py-2 rounded-full text-sm font-black flex items-center gap-2 shadow-xl"
        >
          <Pencil size={14} /> Edit Article
        </motion.button>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ backgroundColor: `${C.void}F0`, backdropFilter: 'blur(12px)' }}
        >
          <div className="max-w-2xl mx-auto p-6 pt-20">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream }} className="text-2xl font-black">Edit Article</h2>
              <button onClick={() => setIsEditing(false)} style={{ color: `${C.cream}80` }}><X size={24} /></button>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Title', key: 'title' },
                { label: 'Category', key: 'category' },
                { label: 'Date', key: 'date' },
                { label: 'Read Time', key: 'readTime' },
                { label: 'Cover Image URL', key: 'coverImage' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-xs uppercase tracking-wide block mb-1">{label}</label>
                  <input
                    value={(editData as any)[key] || ''}
                    onChange={e => setEditData({ ...editData, [key]: e.target.value })}
                    style={{ backgroundColor: C.cardDark, color: C.cream, borderColor: C.surface, fontFamily: 'Sora, sans-serif' }}
                    className="w-full px-4 py-2 rounded-xl border-2 text-sm outline-none"
                  />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-xs uppercase tracking-wide block mb-1">Excerpt</label>
                <textarea
                  value={editData.excerpt || ''}
                  onChange={e => setEditData({ ...editData, excerpt: e.target.value })}
                  rows={3}
                  style={{ backgroundColor: C.cardDark, color: C.cream, borderColor: C.surface, fontFamily: 'Sora, sans-serif' }}
                  className="w-full px-4 py-2 rounded-xl border-2 text-sm outline-none resize-none"
                />
              </div>
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50` }} className="text-xs mt-2">
                Note: To edit article body content, update the content.ts data file directly.
              </p>
              <motion.button onClick={saveEdit} whileHover={{ scale: 1.02 }} style={{ backgroundColor: C.cyan, color: C.void, fontFamily: 'Sora, sans-serif' }} className="py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2">
                <Save size={16} /> Save Changes
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Article Header */}
      <section style={{ backgroundColor: C.void, paddingTop: 100 }} className="relative overflow-hidden">
        <FloatingOrbs dark />
        <NoiseOverlay />
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-0 relative z-10">
          <motion.button
            onClick={() => navigate('/journal')}
            whileHover={{ x: -4 }}
            style={{ color: `${C.cream}80`, fontFamily: 'Sora, sans-serif' }}
            className="text-sm flex items-center gap-2 mb-8"
          >
            <ArrowLeft size={16} /> Journal
          </motion.button>

          <Reveal>
            <div
              style={{ backgroundColor: `${C.purple}E0`, color: C.cream, fontFamily: 'Sora, sans-serif' }}
              className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide mb-4"
            >
              {display.category}
            </div>
            <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }} className="font-black mb-6">
              {display.title}
            </h1>
            <Squiggle color={C.cyan} width={160} />

            <div className="flex items-center gap-4 mt-6">
              <img src={display.author.photo} alt={display.author.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div style={{ fontFamily: 'Sora, sans-serif', color: C.cream }} className="font-black text-sm">{display.author.name}</div>
                <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}60` }} className="text-xs">{display.author.title}</div>
              </div>
              <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50`, marginLeft: 'auto' }} className="text-xs flex items-center gap-2">
                {display.date} · <Clock size={10} /> {display.readTime}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Cover image */}
        <div className="mt-12 max-w-4xl mx-auto px-6">
          <div className="rounded-2xl overflow-hidden" style={{ height: 400 }}>
            <img src={display.coverImage} alt={display.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ backgroundColor: C.void }} className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <article>
            {display.content.map((block, i) => (
              <Reveal key={i} delay={i * 0.03}>
                {renderBlock(block, i)}
              </Reveal>
            ))}
          </article>
        </div>
      </section>

      {/* Author card */}
      <section style={{ backgroundColor: C.cardDark, borderTop: `1px solid ${C.surface}`, borderBottom: `1px solid ${C.surface}` }} className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="flex items-start gap-6">
              <img src={display.author.photo} alt={display.author.name} className="w-16 h-16 rounded-full object-cover shrink-0" />
              <div>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream }} className="text-xl font-black mb-1">{display.author.name}</div>
                <div style={{ fontFamily: 'Sora, sans-serif', color: C.purple }} className="text-xs uppercase tracking-wide mb-3">{display.author.title}</div>
                <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, lineHeight: 1.6 }} className="text-sm">
                  Caleb started The Sketchy Studio after 5 years working at brand agencies in London. He writes about brand strategy, design, and the business of creativity.
                </p>
                <a href="https://instagram.com/thesketchystudio" target="_blank" rel="noopener noreferrer">
                  <motion.div whileHover={{ x: 4 }} style={{ color: C.pink, fontFamily: 'Sora, sans-serif' }} className="text-sm font-black flex items-center gap-1 mt-3">
                    <Instagram size={14} /> @thesketchystudio
                  </motion.div>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section style={{ backgroundColor: C.void }} className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="mb-8">
              <SectionLabel text="You Might Also Like" color={C.yellow} />
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream }} className="text-3xl font-black mt-3">More from the journal.</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((art, i) => (
                <Reveal key={art.id} delay={i * 0.08}>
                  <motion.div
                    onClick={() => navigate(`/journal/${art.slug}`)}
                    whileHover={{ scale: 1.02, borderColor: C.cyan }}
                    style={{ backgroundColor: C.cardDark, borderColor: C.surface, cursor: 'pointer' }}
                    className="border-2 rounded-2xl overflow-hidden"
                  >
                    <div style={{ height: 180 }} className="overflow-hidden">
                      <motion.img src={art.coverImage} alt={art.title} className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} />
                    </div>
                    <div className="p-4">
                      <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50` }} className="text-xs mb-2">{art.date} · {art.readTime}</div>
                      <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 1.2 }} className="text-lg font-black">{art.title}</h3>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ backgroundColor: C.cardDark, borderTop: `1px solid ${C.surface}` }} className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95 }} className="text-4xl font-black mb-6">
              Enjoyed this? We'd love to work with you.
            </h2>
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05, y: -2 }}
              style={{ backgroundColor: C.pink, color: C.void, fontFamily: 'Sora, sans-serif' }}
              className="px-8 py-4 rounded-full font-black text-sm uppercase tracking-wide"
            >
              Start a Project
            </motion.button>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
