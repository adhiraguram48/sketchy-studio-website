import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, ChevronUp, Check, Plus, Trash2, ArrowLeft, ImageIcon } from 'lucide-react';
import { C } from './SketchyUI';
import { useEdit } from '../context/EditContext';

function get(obj: any, path: string): any {
  return path.split('.').reduce((a, k) => a?.[k], obj);
}

// ── Field — syncs when path changes (fixes stale state bug) ──────────────────

function Field({ label, path, multiline = false, rows = 3 }: {
  label: string; path: string; multiline?: boolean; rows?: number;
}) {
  const { content, updateField } = useEdit();
  const value = (get(content, path) as string) ?? '';
  const [local, setLocal] = useState(value);

  // Re-sync when navigating between items (path change = different item)
  useEffect(() => { setLocal((get(content, path) as string) ?? ''); }, [path]);

  function commit() { if (local !== (get(content, path) as string)) updateField(path, local); }

  const base: React.CSSProperties = {
    backgroundColor: C.void, color: C.cream, border: `1px solid ${C.surface}`,
    fontFamily: 'Sora, sans-serif', fontSize: 12, width: '100%',
    borderRadius: 8, padding: '7px 10px', outline: 'none', resize: 'vertical' as const,
    lineHeight: 1.6,
  };

  return (
    <div className="mb-3">
      <label style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50`, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }} className="block mb-1">
        {label}
      </label>
      {multiline
        ? <textarea value={local} onChange={e => setLocal(e.target.value)} onBlur={commit} rows={rows} style={base} />
        : <input type="text" value={local} onChange={e => setLocal(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()} style={base} />
      }
    </div>
  );
}

// ── Image field with live preview ─────────────────────────────────────────────

function ImageField({ label, path }: { label: string; path: string }) {
  const { content, updateField } = useEdit();
  const stored = (get(content, path) as string) || '';
  const [url, setUrl] = useState(stored);
  const [ok, setOk] = useState(false);

  useEffect(() => { setUrl((get(content, path) as string) || ''); }, [path]);

  function apply() {
    if (!url) return;
    updateField(path, url);
    setOk(true);
    setTimeout(() => setOk(false), 1500);
  }

  return (
    <div className="mb-4">
      <label style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50`, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }} className="block mb-2">
        {label}
      </label>
      {url && (
        <img
          src={url} alt=""
          onError={e => (e.currentTarget.style.display = 'none')}
          onLoad={e => (e.currentTarget.style.display = 'block')}
          className="w-full rounded-xl object-cover mb-2"
          style={{ height: 100, border: `1px solid ${C.surface}` }}
        />
      )}
      {!url && (
        <div className="w-full rounded-xl mb-2 flex items-center justify-center" style={{ height: 60, border: `1px dashed ${C.surface}`, backgroundColor: C.void }}>
          <ImageIcon size={20} color={`${C.cream}20`} />
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="text" value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && apply()}
          placeholder="Paste image URL…"
          style={{ backgroundColor: C.void, color: C.cream, border: `1px solid ${C.surface}`, fontFamily: 'Sora, sans-serif', fontSize: 11, flex: 1, borderRadius: 8, padding: '6px 9px', outline: 'none' }}
        />
        <motion.button
          onClick={apply} whileTap={{ scale: 0.92 }}
          style={{ backgroundColor: ok ? C.cyan : C.purple, color: C.void, fontFamily: 'Sora, sans-serif', fontSize: 11, borderRadius: 8, padding: '6px 12px', fontWeight: 900, flexShrink: 0 }}
        >
          {ok ? <Check size={12} /> : 'Set'}
        </motion.button>
      </div>
    </div>
  );
}

// ── Collapsible section ───────────────────────────────────────────────────────

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: `1px solid ${C.surface}` }} className="py-3 px-4">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between mb-1">
        <span style={{ fontFamily: 'Sora, sans-serif', color: C.purple, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5 }}>{title}</span>
        {open ? <ChevronUp size={12} color={`${C.cream}40`} /> : <ChevronDown size={12} color={`${C.cream}40`} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }} style={{ overflow: 'hidden' }}>
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Add / Remove buttons ──────────────────────────────────────────────────────

function AddBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.button
      onClick={onClick} whileTap={{ scale: 0.95 }}
      style={{ color: C.cyan, fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 900, border: `1px dashed ${C.cyan}50`, borderRadius: 8, padding: '5px 10px' }}
      className="flex items-center gap-1.5 my-2"
    >
      <Plus size={11} /> {label}
    </motion.button>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick} whileTap={{ scale: 0.9 }} whileHover={{ backgroundColor: '#FF555520' }}
      style={{ color: '#FF6666', borderRadius: 6, padding: '2px 4px', flexShrink: 0 }}
    >
      <Trash2 size={12} />
    </motion.button>
  );
}

// ── Case Study full editor ────────────────────────────────────────────────────

function CaseStudyEditor({ index, onBack }: { index: number; onBack: () => void }) {
  const { content, updateField } = useEdit();
  const cs = content.caseStudies[index];
  if (!cs) return null;

  const base = `caseStudies.${index}`;

  function addStat() {
    updateField(`${base}.results.stats`, [...cs.results.stats, { value: '', label: '' }]);
  }
  function removeStat(i: number) {
    updateField(`${base}.results.stats`, cs.results.stats.filter((_, idx) => idx !== i));
  }
  function addImage() {
    updateField(`${base}.projectImages`, [...cs.projectImages, '']);
  }
  function removeImage(i: number) {
    updateField(`${base}.projectImages`, cs.projectImages.filter((_, idx) => idx !== i));
  }

  return (
    <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Back nav */}
      <div style={{ padding: '10px 16px', borderBottom: `1px solid ${C.surface}`, display: 'flex', alignItems: 'center', gap: 8 }} className="shrink-0">
        <motion.button onClick={onBack} whileHover={{ x: -2 }} style={{ color: `${C.cream}50`, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Sora, sans-serif', fontSize: 11 }}>
          <ArrowLeft size={12} /> All Projects
        </motion.button>
        <span style={{ color: `${C.cream}20` }}>·</span>
        <span style={{ fontFamily: 'Sora, sans-serif', color: C.cream, fontSize: 12, fontWeight: 900 }}>{cs.client}</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Section title="Identity">
          <Field label="Client name" path={`${base}.client`} />
          <Field label="Industry" path={`${base}.industry`} />
          <Field label="Year" path={`${base}.year`} />
          <Field label="Timeline" path={`${base}.timeline`} />
          <Field label="Tagline" path={`${base}.tagline`} />
          <Field label="Short description (shown in pull-quote card)" path={`${base}.shortDescription`} multiline rows={4} />
        </Section>

        <Section title="Cover Image">
          <ImageField label="Hero / cover" path={`${base}.coverImage`} />
        </Section>

        <Section title="Gallery Images" defaultOpen={false}>
          {cs.projectImages.map((_, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div className="flex justify-between items-center mb-1">
                <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40`, fontSize: 10 }}>IMAGE {i + 1}{i === 0 ? ' (full-width hero)' : ''}</span>
                <RemoveBtn onClick={() => removeImage(i)} />
              </div>
              <ImageField label="" path={`${base}.projectImages.${i}`} />
            </div>
          ))}
          <AddBtn onClick={addImage} label="Add Image" />
        </Section>

        <Section title="The Challenge">
          <Field label="Challenge text" path={`${base}.challenge`} multiline rows={7} />
        </Section>

        <Section title="The Approach">
          <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40`, fontSize: 10, marginBottom: 8 }}>
            Separate each step with a period + space + capital letter. Each sentence becomes a numbered card.
          </p>
          <Field label="Approach text" path={`${base}.approach`} multiline rows={8} />
        </Section>

        <Section title="Result Stats">
          {cs.results.stats.map((stat, i) => (
            <div key={i} className="flex gap-2 items-start mb-2">
              <div style={{ width: 90 }}><Field label="Value" path={`${base}.results.stats.${i}.value`} /></div>
              <div style={{ flex: 1 }}><Field label="Label" path={`${base}.results.stats.${i}.label`} /></div>
              <div className="mt-6"><RemoveBtn onClick={() => removeStat(i)} /></div>
            </div>
          ))}
          <AddBtn onClick={addStat} label="Add Stat" />
        </Section>

        <Section title="Testimonial" defaultOpen={false}>
          <Field label="Quote" path={`${base}.results.testimonial.quote`} multiline rows={4} />
          <Field label="Author name" path={`${base}.results.testimonial.author`} />
          <Field label="Author title" path={`${base}.results.testimonial.title`} />
          <Field label="Company" path={`${base}.results.testimonial.company`} />
          <ImageField label="Author photo" path={`${base}.results.testimonial.photo`} />
        </Section>
      </div>
    </div>
  );
}

// ── Tabs ──────────────────────────────────────────────────────────────────────

const TABS = ['Home', 'About', 'Work', 'Nav'] as const;
type Tab = typeof TABS[number];

// ── Main panel ────────────────────────────────────────────────────────────────

export function EditPanel() {
  const { editMode, toggleEditMode, content, updateField, syncStatus } = useEdit();
  const location = useLocation();

  // Auto-switch tab based on current route
  const routeTab: Tab = (() => {
    if (location.pathname.startsWith('/work')) return 'Work';
    if (location.pathname.startsWith('/about')) return 'About';
    if (location.pathname.startsWith('/contact') || location.pathname.startsWith('/services')) return 'Nav';
    return 'Home';
  })();

  const [tab, setTab] = useState<Tab>(routeTab);

  // Auto-switch tab when route changes
  useEffect(() => { setTab(routeTab); }, [location.pathname]);

  // Auto-open the right case study when navigating to /work/:slug
  const slugMatch = location.pathname.match(/^\/work\/(.+)$/);
  const activeSlug = slugMatch?.[1] ?? null;
  const activeCSIndex = activeSlug ? content.caseStudies.findIndex(cs => cs.slug === activeSlug) : -1;

  const [selectedCS, setSelectedCS] = useState<number | null>(activeCSIndex >= 0 ? activeCSIndex : null);

  useEffect(() => {
    if (activeCSIndex >= 0) setSelectedCS(activeCSIndex);
    else setSelectedCS(null);
  }, [activeCSIndex]);

  const syncColor = syncStatus === 'saved' ? C.cyan : syncStatus === 'saving' ? C.yellow : syncStatus === 'error' ? '#FF4444' : `${C.cream}30`;
  const syncLabel = syncStatus === 'saving' ? '⏳ saving…' : syncStatus === 'saved' ? '✓ saved' : syncStatus === 'error' ? '⚠ error' : '';

  // ── Home helpers
  function addStat() { updateField('home.stats', [...content.home.stats, { value: '', label: '' }]); }
  function removeStat(i: number) { updateField('home.stats', content.home.stats.filter((_, idx) => idx !== i)); }
  function addTestimonial() { updateField('home.testimonials', [...content.home.testimonials, { quote: '', author: '', title: '', company: '', photo: '' }]); }
  function removeTestimonial(i: number) { updateField('home.testimonials', content.home.testimonials.filter((_, idx) => idx !== i)); }
  function addClient() { updateField('home.clients', [...content.home.clients, '']); }
  function removeClient(i: number) { updateField('home.clients', content.home.clients.filter((_, idx) => idx !== i)); }

  // ── About helpers
  const quotes = content.about.quotes ?? [];
  function addQuote() { updateField('about.quotes', [...quotes, { text: '', author: '' }]); }
  function removeQuote(i: number) { updateField('about.quotes', quotes.filter((_, idx) => idx !== i)); }
  function addTeamMember() { updateField('about.team', [...content.about.team, { name: '', title: '', bio: '', photo: '' }]); }
  function removeTeamMember(i: number) { updateField('about.team', content.about.team.filter((_, idx) => idx !== i)); }

  return (
    <AnimatePresence>
      {editMode && (
        <motion.div
          initial={{ x: 440, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 440, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 34 }}
          style={{
            position: 'fixed', right: 0, top: 0, bottom: 0, width: 420,
            backgroundColor: C.cardDark, borderLeft: `1px solid ${C.surface}`,
            zIndex: 200, display: 'flex', flexDirection: 'column',
            boxShadow: '-12px 0 48px rgba(0,0,0,0.6)',
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: `1px solid ${C.surface}`, padding: '14px 16px' }} className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div>
                <div style={{ fontFamily: 'Fraunces, serif', color: C.cream, fontSize: 15, fontWeight: 900 }}>Edit Mode</div>
                <div style={{ fontFamily: 'Sora, sans-serif', color: syncColor, fontSize: 10, minHeight: 14 }}>{syncLabel}</div>
              </div>
              <motion.div
                animate={{ opacity: syncStatus === 'saving' ? 1 : 0 }}
                style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: C.yellow }}
              />
            </div>
            <button onClick={toggleEditMode} style={{ color: `${C.cream}40` }} className="hover:text-white transition-colors p-1">
              <X size={16} />
            </button>
          </div>

          {/* Tabs */}
          <div style={{ borderBottom: `1px solid ${C.surface}`, padding: '0 12px', display: 'flex', gap: 2 }} className="shrink-0 pt-2">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); if (t !== 'Work') setSelectedCS(null); }}
                style={{
                  fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 900,
                  color: tab === t ? C.void : `${C.cream}50`,
                  backgroundColor: tab === t ? C.pink : 'transparent',
                  padding: '5px 11px', borderRadius: '8px 8px 0 0',
                  textTransform: 'uppercase', letterSpacing: 0.8,
                  transition: 'all 0.15s',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Content area */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

            {/* ── HOME ── */}
            {tab === 'Home' && (
              <>
                <Section title="Hero">
                  <Field label="Headline" path="home.heroHeadline" />
                  <Field label="Subheadline" path="home.heroSub" multiline />
                </Section>

                <Section title="Stats">
                  {content.home.stats.map((stat, i) => (
                    <div key={i} className="flex gap-2 items-start mb-2">
                      <div style={{ width: 80 }}><Field label="Value" path={`home.stats.${i}.value`} /></div>
                      <div style={{ flex: 1 }}><Field label="Label" path={`home.stats.${i}.label`} /></div>
                      <div className="mt-6"><RemoveBtn onClick={() => removeStat(i)} /></div>
                    </div>
                  ))}
                  <AddBtn onClick={addStat} label="Add Stat" />
                </Section>

                <Section title="About Teaser">
                  <Field label="Headline" path="home.aboutTeaser" />
                  <Field label="Body" path="home.aboutTeaserSub" multiline />
                </Section>

                <Section title="CTA">
                  <Field label="Headline" path="home.ctaHeadline" />
                  <Field label="Subtext" path="home.ctaSub" multiline />
                </Section>

                <Section title="Clients Ticker" defaultOpen={false}>
                  {content.home.clients.map((c, i) => (
                    <div key={i} className="flex gap-2 items-center mb-1">
                      <div style={{ flex: 1 }}><Field label={`Client ${i + 1}`} path={`home.clients.${i}`} /></div>
                      <RemoveBtn onClick={() => removeClient(i)} />
                    </div>
                  ))}
                  <AddBtn onClick={addClient} label="Add Client" />
                </Section>

                <Section title="Testimonials" defaultOpen={false}>
                  {content.home.testimonials.map((t, i) => (
                    <div key={i} style={{ borderTop: `1px solid ${C.surface}`, paddingTop: 12, marginTop: 4 }}>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40`, fontSize: 10 }}>{t.author || `Testimonial ${i + 1}`}</span>
                        <RemoveBtn onClick={() => removeTestimonial(i)} />
                      </div>
                      <Field label="Quote" path={`home.testimonials.${i}.quote`} multiline />
                      <Field label="Author" path={`home.testimonials.${i}.author`} />
                      <Field label="Title" path={`home.testimonials.${i}.title`} />
                      <Field label="Company" path={`home.testimonials.${i}.company`} />
                      <ImageField label="Photo" path={`home.testimonials.${i}.photo`} />
                    </div>
                  ))}
                  <AddBtn onClick={addTestimonial} label="Add Testimonial" />
                </Section>
              </>
            )}

            {/* ── ABOUT ── */}
            {tab === 'About' && (
              <>
                <Section title="Story Text">
                  <Field label="Page headline" path="about.headline" />
                  <Field label="Paragraph 1" path="about.para1" multiline rows={4} />
                  <Field label="Paragraph 2" path="about.para2" multiline rows={4} />
                  <Field label="Paragraph 3" path="about.para3" multiline rows={4} />
                  <Field label="Paragraph 4" path="about.para4" multiline rows={4} />
                </Section>

                <Section title="Rotating Quotes">
                  {quotes.map((q, i) => (
                    <div key={i} style={{ borderTop: `1px solid ${C.surface}`, paddingTop: 10, marginTop: 4 }}>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40`, fontSize: 10 }}>Quote {i + 1}</span>
                        <RemoveBtn onClick={() => removeQuote(i)} />
                      </div>
                      <Field label="Text" path={`about.quotes.${i}.text`} multiline rows={3} />
                      <Field label="Attribution" path={`about.quotes.${i}.author`} />
                    </div>
                  ))}
                  <AddBtn onClick={addQuote} label="Add Quote" />
                </Section>

                <Section title="Studio Photo">
                  <ImageField label="Full-width banner image" path="about.studioPhoto" />
                </Section>

                <Section title="Team" defaultOpen={false}>
                  {content.about.team.map((m, i) => (
                    <div key={i} style={{ borderTop: `1px solid ${C.surface}`, paddingTop: 10, marginTop: 4 }}>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40`, fontSize: 10 }}>{m.name || `Member ${i + 1}`}</span>
                        <RemoveBtn onClick={() => removeTeamMember(i)} />
                      </div>
                      <Field label="Name" path={`about.team.${i}.name`} />
                      <Field label="Title" path={`about.team.${i}.title`} />
                      <Field label="Bio" path={`about.team.${i}.bio`} multiline />
                      <ImageField label="Photo" path={`about.team.${i}.photo`} />
                    </div>
                  ))}
                  <AddBtn onClick={addTeamMember} label="Add Team Member" />
                </Section>
              </>
            )}

            {/* ── WORK — project picker or drill-down ── */}
            {tab === 'Work' && selectedCS === null && (
              <div className="py-3">
                <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}30`, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, padding: '0 16px 10px' }}>
                  Select a project to edit
                </p>
                {content.caseStudies.map((cs, i) => (
                  <motion.button
                    key={cs.id}
                    onClick={() => setSelectedCS(i)}
                    whileHover={{ x: 4, backgroundColor: `${C.surface}80` }}
                    style={{ width: '100%', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${C.surface}`, textAlign: 'left' }}
                  >
                    <div
                      className="rounded-lg object-cover shrink-0"
                      style={{ width: 48, height: 48, overflow: 'hidden', border: `1px solid ${C.surface}` }}
                    >
                      <img src={cs.coverImage} alt={cs.client} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ fontFamily: 'Sora, sans-serif', color: C.cream, fontSize: 13, fontWeight: 900 }}>{cs.client}</div>
                      <div style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40`, fontSize: 10 }} className="truncate">{cs.tagline}</div>
                    </div>
                    <ChevronDown size={12} color={`${C.cream}30`} style={{ rotate: '-90deg' }} />
                  </motion.button>
                ))}
              </div>
            )}

            {tab === 'Work' && selectedCS !== null && (
              <CaseStudyEditor index={selectedCS} onBack={() => setSelectedCS(null)} />
            )}

            {/* ── NAV ── */}
            {tab === 'Nav' && (
              <>
                <Section title="Contact Info">
                  <Field label="Email" path="nav.email" />
                  <Field label="Phone" path="nav.phone" />
                  <Field label="Instagram handle" path="nav.instagram" />
                  <Field label="Calendly URL" path="nav.calendly" />
                  <Field label="Footer tagline" path="nav.tagline" multiline />
                </Section>
                <Section title="Services" defaultOpen={false}>
                  {content.services.list.map((s, i) => (
                    <div key={s.id} style={{ borderTop: `1px solid ${C.surface}`, paddingTop: 10, marginTop: 4 }}>
                      <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50`, fontSize: 10, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.name}</p>
                      <Field label="Description" path={`services.list.${i}.description`} multiline />
                    </div>
                  ))}
                </Section>
              </>
            )}

          </div>

          {/* Footer hint */}
          <div style={{ borderTop: `1px solid ${C.surface}`, padding: '8px 16px' }} className="shrink-0">
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}25`, fontSize: 9, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 }}>
              Shift + Alt + E to close · Changes auto-save to backend
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
