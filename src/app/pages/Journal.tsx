import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Clock, Plus, Trash2 } from 'lucide-react';
import { C, FloatingOrbs, Squiggle, SectionLabel, Reveal, NoiseOverlay } from '../components/SketchyUI';
import { useEdit } from '../context/EditContext';
import { PageLayout } from '../components/Layout';
import { Article } from '../data/content';

const CATEGORIES = ['All', 'Brand', 'Web', 'Motion', 'Social', 'Studio'];

export default function Journal() {
  const navigate = useNavigate();
  const { content, editMode, updateField } = useEdit();
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featured = content.articles[0];
  const rest = content.articles.slice(1);

  const filtered = activeCategory === 'All'
    ? rest
    : rest.filter(a => a.category === activeCategory);

  function deleteArticle(id: string) {
    if (!window.confirm('Delete this article?')) return;
    updateField('articles', content.articles.filter(a => a.id !== id) as any);
  }

  function addArticle() {
    const newArticle: Article = {
      id: Date.now().toString(),
      slug: `article-${Date.now()}`,
      title: 'New Article Title',
      excerpt: 'Brief description of this article.',
      category: 'Brand',
      coverImage: 'https://images.unsplash.com/photo-1700313084615-a6110cc4f6a3?w=1400&h=900&fit=crop',
      date: 'Mar 2026',
      readTime: '5 min read',
      author: {
        name: 'Caleb',
        title: 'Founder, The Sketchy Studio',
        photo: 'https://images.unsplash.com/photo-1636293875439-b3125c0f1fc1?w=100&h=100&fit=crop',
      },
      content: [
        { type: 'p', content: 'Write your article content here. You can add multiple paragraphs.' },
        { type: 'h2', content: 'Add Section Headings' },
        { type: 'p', content: 'Add more content paragraphs here.' },
      ],
    };
    updateField('articles', [...content.articles, newArticle] as any);
  }

  return (
    <PageLayout>
      {/* Hero */}
      <section style={{ backgroundColor: C.void, paddingTop: 120 }} className="pb-16 relative overflow-hidden">
        <FloatingOrbs dark />
        <NoiseOverlay />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <SectionLabel text="The Journal" color={C.cyan} />
            <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95 }} className="text-7xl font-black mt-4 mb-4">
              The Journal.
            </h1>
            <Squiggle color={C.cyan} width={180} />
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, lineHeight: 1.6 }} className="mt-6 text-lg">
              Thoughts on brand, design, and building a business that stands out.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured article */}
      {featured && (
        <section style={{ backgroundColor: C.void }} className="pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <motion.div
                onClick={() => navigate(`/journal/${featured.slug}`)}
                whileHover={{ scale: 1.01 }}
                style={{ backgroundColor: C.cardDark, cursor: 'pointer', borderColor: C.surface }}
                className="border-2 rounded-2xl overflow-hidden group relative"
              >
                {editMode && (
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteArticle(featured.id); }}
                    style={{ backgroundColor: '#FF4444', position: 'absolute', top: 12, right: 12, zIndex: 10 }}
                    className="p-2 rounded-full text-white"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative overflow-hidden" style={{ height: 400 }}>
                    <motion.img
                      src={featured.coverImage}
                      alt={featured.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div
                      style={{ backgroundColor: `${C.cyan}E0`, fontFamily: 'Sora, sans-serif', color: C.void }}
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide"
                    >
                      {featured.category}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50` }} className="text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                      Featured Article · {featured.date} · <Clock size={10} /> {featured.readTime}
                    </div>
                    <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 1.1 }} className="text-3xl font-black mb-4">
                      {featured.title}
                    </h2>
                    <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, lineHeight: 1.7 }} className="mb-6">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-4">
                      <img src={featured.author.photo} alt={featured.author.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div style={{ fontFamily: 'Sora, sans-serif', color: C.cream }} className="text-sm font-black">
                          {featured.author.name}
                        </div>
                        <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50` }} className="text-xs">
                          {featured.author.title}
                        </div>
                      </div>
                      <motion.span
                        whileHover={{ x: 4 }}
                        style={{ marginLeft: 'auto', color: C.cyan, fontFamily: 'Sora, sans-serif' }}
                        className="font-black text-sm flex items-center gap-1"
                      >
                        Read more <ArrowUpRight size={14} />
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Category filter */}
      <section style={{ backgroundColor: C.void, borderTop: `1px solid ${C.surface}`, borderBottom: `1px solid ${C.surface}` }} className="py-4 sticky top-16 z-40 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 overflow-x-auto">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                backgroundColor: activeCategory === cat ? C.cyan : 'transparent',
                color: activeCategory === cat ? C.void : `${C.cream}80`,
                borderColor: activeCategory === cat ? C.cyan : C.surface,
                fontFamily: 'Sora, sans-serif',
              }}
              className="px-5 py-2 rounded-full text-sm font-black uppercase tracking-wide border-2 whitespace-nowrap transition-colors"
            >
              {cat}
            </motion.button>
          ))}

          {editMode && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={addArticle}
              style={{ backgroundColor: C.purple, color: C.cream, fontFamily: 'Sora, sans-serif' }}
              className="ml-auto px-4 py-2 rounded-full text-sm font-black flex items-center gap-1 whitespace-nowrap"
            >
              <Plus size={14} /> Add Article
            </motion.button>
          )}
        </div>
      </section>

      {/* Article grid */}
      <section style={{ backgroundColor: C.void }} className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((article, i) => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  <motion.div
                    onClick={() => navigate(`/journal/${article.slug}`)}
                    whileHover={{ scale: 1.02, borderColor: C.cyan }}
                    style={{ backgroundColor: C.cardDark, borderColor: C.surface, cursor: 'pointer' }}
                    className="border-2 rounded-2xl overflow-hidden relative group"
                  >
                    {editMode && (
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteArticle(article.id); }}
                        style={{ backgroundColor: '#FF4444', position: 'absolute', top: 8, right: 8, zIndex: 10 }}
                        className="p-1.5 rounded-full text-white"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}

                    <div className="relative overflow-hidden" style={{ height: 220 }}>
                      <motion.img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div
                        style={{ backgroundColor: `${C.purple}E0`, color: C.cream, fontFamily: 'Sora, sans-serif' }}
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide"
                      >
                        {article.category}
                      </div>
                    </div>

                    <div className="p-5">
                      <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50` }} className="text-xs mb-3 flex items-center gap-2">
                        {article.date} · <Clock size={10} /> {article.readTime}
                      </div>
                      <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 1.2 }} className="text-xl font-black mb-3">
                        {article.title}
                      </h3>
                      <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}70`, lineHeight: 1.6 }} className="text-sm mb-4">
                        {article.excerpt}
                      </p>
                      <motion.span
                        whileHover={{ x: 4 }}
                        style={{ color: C.cyan, fontFamily: 'Sora, sans-serif' }}
                        className="text-sm font-black flex items-center gap-1"
                      >
                        Read more <ArrowUpRight size={12} />
                      </motion.span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40` }}>No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section style={{ backgroundColor: C.cardDark, borderTop: `1px solid ${C.surface}` }} className="py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <SectionLabel text="Newsletter" color={C.yellow} className="inline-block mb-4" />
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95 }} className="text-4xl font-black mt-4 mb-4">
              Stay in the loop.
            </h2>
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, lineHeight: 1.6 }} className="mb-8">
              Brand strategy, design thinking, and studio updates. Monthly. No spam. Ever.
            </p>
            {subscribed ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                style={{ backgroundColor: `${C.cyan}20`, borderColor: C.cyan, color: C.cyan, fontFamily: 'Sora, sans-serif' }}
                className="border-2 rounded-full px-6 py-3 font-black text-sm inline-block"
              >
                ✓ You're subscribed!
              </motion.div>
            ) : (
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    backgroundColor: C.surface,
                    color: C.cream,
                    borderColor: C.surface,
                    fontFamily: 'Sora, sans-serif',
                    flex: 1,
                  }}
                  className="px-4 py-3 rounded-full border-2 text-sm outline-none focus:border-[#9B5CE8]"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => { if (email) setSubscribed(true); }}
                  style={{ backgroundColor: C.yellow, color: C.void, fontFamily: 'Sora, sans-serif' }}
                  className="px-6 py-3 rounded-full font-black text-sm uppercase tracking-wide whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
