import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, ChevronUp, Check, Plus, Trash2 } from 'lucide-react';
import { C } from './SketchyUI';
import { useEdit } from '../context/EditContext';

function get(obj: any, path: string): any {
  return path.split('.').reduce((a, k) => a?.[k], obj);
}

// ── Field components ──────────────────────────────────────────────────────────

function Field({ label, path, multiline = false }: { label: string; path: string; multiline?: boolean }) {
  const { content, updateField } = useEdit();
  const value = (get(content, path) as string) ?? '';
  const [local, setLocal] = useState(value);

  function commit() {
    if (local !== value) updateField(path, local);
  }

  const base: React.CSSProperties = {
    backgroundColor: C.void,
    color: C.cream,
    border: `1px solid ${C.surface}`,
    fontFamily: 'Sora, sans-serif',
    fontSize: 12,
    width: '100%',
    borderRadius: 8,
    padding: '6px 10px',
    outline: 'none',
    resize: 'vertical' as const,
  };

  return (
    <div className="mb-3">
      <label style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}60`, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }} className="block mb-1">
        {label}
      </label>
      {multiline ? (
        <textarea value={local} onChange={e => setLocal(e.target.value)} onBlur={commit} rows={3} style={base} />
      ) : (
        <input type="text" value={local} onChange={e => setLocal(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()} style={base} />
      )}
    </div>
  );
}

function ImageField({ label, path, fallback }: { label: string; path: string; fallback?: string }) {
  const { content, updateField } = useEdit();
  const current = (get(content, path) as string) || fallback || '';
  const [url, setUrl] = useState(current);
  const [preview, setPreview] = useState(current);
  const [ok, setOk] = useState(false);

  function apply() {
    if (url && url !== current) {
      updateField(path, url);
      setPreview(url);
      setOk(true);
      setTimeout(() => setOk(false), 1500);
    }
  }

  return (
    <div className="mb-4">
      <label style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}60`, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }} className="block mb-2">
        {label}
      </label>
      <div className="flex gap-2 items-start">
        {preview && (
          <img src={preview} alt="" onError={() => setPreview('')} className="rounded-lg object-cover shrink-0" style={{ width: 56, height: 56, border: `1px solid ${C.surface}` }} />
        )}
        <div className="flex-1">
          <input
            type="text"
            value={url}
            onChange={e => { setUrl(e.target.value); setPreview(e.target.value); }}
            onKeyDown={e => e.key === 'Enter' && apply()}
            placeholder="Paste image URL…"
            style={{ backgroundColor: C.void, color: C.cream, border: `1px solid ${C.surface}`, fontFamily: 'Sora, sans-serif', fontSize: 11, width: '100%', borderRadius: 8, padding: '5px 8px', outline: 'none' }}
          />
          <motion.button onClick={apply} whileTap={{ scale: 0.95 }} style={{ backgroundColor: ok ? C.cyan : C.purple, color: C.void, fontFamily: 'Sora, sans-serif', fontSize: 11, marginTop: 4 }} className="px-3 py-1 rounded-full font-black flex items-center gap-1">
            {ok ? <><Check size={10} /> Applied</> : 'Apply'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: `1px solid ${C.surface}` }} className="py-3 px-4">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between mb-2">
        <span style={{ fontFamily: 'Sora, sans-serif', color: C.purple, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}>{title}</span>
        {open ? <ChevronUp size={14} color={`${C.cream}60`} /> : <ChevronDown size={14} color={`${C.cream}60`} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Array CRUD helpers ────────────────────────────────────────────────────────

function addBtn(onClick: () => void, label = 'Add') {
  return (
    <button
      onClick={onClick}
      style={{ color: C.cyan, fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 900 }}
      className="flex items-center gap-1 mt-1 mb-3"
    >
      <Plus size={12} /> {label}
    </button>
  );
}

function removeBtn(onClick: () => void) {
  return (
    <button
      onClick={onClick}
      style={{ color: '#FF5555', flexShrink: 0 }}
      className="p-1 rounded hover:opacity-70 transition-opacity mt-1"
    >
      <Trash2 size={12} />
    </button>
  );
}

// ── Main panel ────────────────────────────────────────────────────────────────

const TABS = ['Home', 'About', 'Work', 'Nav'] as const;
type Tab = typeof TABS[number];

export function EditPanel() {
  const { editMode, toggleEditMode, content, updateField, syncStatus } = useEdit();
  const [tab, setTab] = useState<Tab>('Home');

  const syncColor = syncStatus === 'saved' ? C.cyan : syncStatus === 'saving' ? C.yellow : syncStatus === 'error' ? '#FF4444' : `${C.cream}40`;
  const syncLabel = syncStatus === 'saving' ? '⏳ saving…' : syncStatus === 'saved' ? '✓ saved' : syncStatus === 'error' ? '⚠ error' : 'ready';

  function addStat() {
    updateField('home.stats', [...content.home.stats, { value: 'New', label: 'Stat' }]);
  }
  function removeStat(i: number) {
    updateField('home.stats', content.home.stats.filter((_, idx) => idx !== i));
  }

  function addTestimonial() {
    updateField('home.testimonials', [...content.home.testimonials, { quote: '', author: '', title: '', company: '', photo: '' }]);
  }
  function removeTestimonial(i: number) {
    updateField('home.testimonials', content.home.testimonials.filter((_, idx) => idx !== i));
  }

  const quotes = content.about.quotes ?? [];
  function addQuote() {
    updateField('about.quotes', [...quotes, { text: '', author: '' }]);
  }
  function removeQuote(i: number) {
    updateField('about.quotes', quotes.filter((_, idx) => idx !== i));
  }

  function addTeamMember() {
    updateField('about.team', [...content.about.team, { name: '', title: '', bio: '', photo: '' }]);
  }
  function removeTeamMember(i: number) {
    updateField('about.team', content.about.team.filter((_, idx) => idx !== i));
  }

  function addClient() {
    updateField('home.clients', [...content.home.clients, 'New Client']);
  }
  function removeClient(i: number) {
    updateField('home.clients', content.home.clients.filter((_, idx) => idx !== i));
  }

  return (
    <AnimatePresence>
      {editMode && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          style={{
            position: 'fixed', right: 0, top: 0, bottom: 0, width: 360,
            backgroundColor: C.cardDark, borderLeft: `1px solid ${C.surface}`,
            zIndex: 200, display: 'flex', flexDirection: 'column',
            boxShadow: '-8px 0 32px rgba(0,0,0,0.5)',
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: `1px solid ${C.surface}`, padding: '12px 16px' }} className="flex items-center justify-between shrink-0">
            <div>
              <div style={{ fontFamily: 'Fraunces, serif', color: C.cream, fontSize: 16, fontWeight: 900 }}>Edit Mode</div>
              <div style={{ fontFamily: 'Sora, sans-serif', color: syncColor, fontSize: 10 }}>{syncLabel}</div>
            </div>
            <button onClick={toggleEditMode} style={{ color: `${C.cream}60` }} className="hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Tabs */}
          <div style={{ borderBottom: `1px solid ${C.surface}`, padding: '0 16px' }} className="flex gap-1 shrink-0 pt-2">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 900,
                  color: tab === t ? C.void : `${C.cream}60`,
                  backgroundColor: tab === t ? C.pink : 'transparent',
                  padding: '4px 10px', borderRadius: '8px 8px 0 0',
                  textTransform: 'uppercase', letterSpacing: 0.5,
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Scrollable content */}
          <div style={{ overflowY: 'auto', flex: 1 }}>

            {tab === 'Home' && (
              <>
                <Section title="Hero">
                  <Field label="Headline" path="home.heroHeadline" />
                  <Field label="Subheadline" path="home.heroSub" multiline />
                </Section>

                <Section title="Stats">
                  {content.home.stats.map((_, i) => (
                    <div key={i} className="flex gap-2 items-start mb-2">
                      <div style={{ flex: 1 }}><Field label={`Value ${i + 1}`} path={`home.stats.${i}.value`} /></div>
                      <div style={{ flex: 2 }}><Field label={`Label ${i + 1}`} path={`home.stats.${i}.label`} /></div>
                      {removeBtn(() => removeStat(i))}
                    </div>
                  ))}
                  {addBtn(addStat, 'Add Stat')}
                </Section>

                <Section title="About Teaser">
                  <Field label="Headline" path="home.aboutTeaser" />
                  <Field label="Body" path="home.aboutTeaserSub" multiline />
                </Section>

                <Section title="CTA">
                  <Field label="Headline" path="home.ctaHeadline" />
                  <Field label="Subtext" path="home.ctaSub" multiline />
                </Section>

                <Section title="Client Names" defaultOpen={false}>
                  {content.home.clients.map((_, i) => (
                    <div key={i} className="flex gap-2 items-center mb-1">
                      <div className="flex-1"><Field label={`Client ${i + 1}`} path={`home.clients.${i}`} /></div>
                      {removeBtn(() => removeClient(i))}
                    </div>
                  ))}
                  {addBtn(addClient, 'Add Client')}
                </Section>

                <Section title="Testimonials" defaultOpen={false}>
                  {content.home.testimonials.map((_, i) => (
                    <div key={i} style={{ borderBottom: `1px solid ${C.surface}`, paddingBottom: 12, marginBottom: 12 }}>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50`, fontSize: 10 }}>TESTIMONIAL {i + 1}</span>
                        {removeBtn(() => removeTestimonial(i))}
                      </div>
                      <Field label="Quote" path={`home.testimonials.${i}.quote`} multiline />
                      <Field label="Author" path={`home.testimonials.${i}.author`} />
                      <Field label="Title" path={`home.testimonials.${i}.title`} />
                      <Field label="Company" path={`home.testimonials.${i}.company`} />
                      <ImageField label="Photo" path={`home.testimonials.${i}.photo`} />
                    </div>
                  ))}
                  {addBtn(addTestimonial, 'Add Testimonial')}
                </Section>
              </>
            )}

            {tab === 'About' && (
              <>
                <Section title="Story">
                  <Field label="Headline" path="about.headline" />
                  <Field label="Paragraph 1" path="about.para1" multiline />
                  <Field label="Paragraph 2" path="about.para2" multiline />
                  <Field label="Paragraph 3" path="about.para3" multiline />
                  <Field label="Paragraph 4" path="about.para4" multiline />
                </Section>

                <Section title="Rotating Quotes">
                  {quotes.map((_, i) => (
                    <div key={i} style={{ borderBottom: `1px solid ${C.surface}`, paddingBottom: 12, marginBottom: 12 }}>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50`, fontSize: 10 }}>QUOTE {i + 1}</span>
                        {removeBtn(() => removeQuote(i))}
                      </div>
                      <Field label="Quote text" path={`about.quotes.${i}.text`} multiline />
                      <Field label="Author" path={`about.quotes.${i}.author`} />
                    </div>
                  ))}
                  {addBtn(addQuote, 'Add Quote')}
                </Section>

                <Section title="Studio Photo">
                  <ImageField label="Studio / hero image" path="about.studioPhoto" />
                </Section>

                <Section title="Team" defaultOpen={false}>
                  {content.about.team.map((member, i) => (
                    <div key={i} style={{ borderBottom: `1px solid ${C.surface}`, paddingBottom: 12, marginBottom: 12 }}>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50`, fontSize: 10 }}>{member.name || `MEMBER ${i + 1}`}</span>
                        {removeBtn(() => removeTeamMember(i))}
                      </div>
                      <Field label="Name" path={`about.team.${i}.name`} />
                      <Field label="Title" path={`about.team.${i}.title`} />
                      <Field label="Bio" path={`about.team.${i}.bio`} multiline />
                      <ImageField label="Photo" path={`about.team.${i}.photo`} />
                    </div>
                  ))}
                  {addBtn(addTeamMember, 'Add Team Member')}
                </Section>
              </>
            )}

            {tab === 'Work' && (
              <>
                {content.caseStudies.map((cs, i) => (
                  <Section key={cs.id} title={cs.client} defaultOpen={i === 0}>
                    <Field label="Client name" path={`caseStudies.${i}.client`} />
                    <Field label="Tagline" path={`caseStudies.${i}.tagline`} />
                    <Field label="Short description" path={`caseStudies.${i}.shortDescription`} multiline />
                    <Field label="Challenge" path={`caseStudies.${i}.challenge`} multiline />
                    <Field label="Approach" path={`caseStudies.${i}.approach`} multiline />
                    <ImageField label="Cover image" path={`caseStudies.${i}.coverImage`} />
                    <Field label="Testimonial quote" path={`caseStudies.${i}.results.testimonial.quote`} multiline />
                    <Field label="Testimonial author" path={`caseStudies.${i}.results.testimonial.author`} />
                    <Field label="Testimonial company" path={`caseStudies.${i}.results.testimonial.company`} />
                  </Section>
                ))}
              </>
            )}

            {tab === 'Nav' && (
              <>
                <Section title="Contact Info">
                  <Field label="Email" path="nav.email" />
                  <Field label="Phone" path="nav.phone" />
                  <Field label="Instagram" path="nav.instagram" />
                  <Field label="Calendly URL" path="nav.calendly" />
                  <Field label="Tagline" path="nav.tagline" multiline />
                </Section>
                <Section title="Services" defaultOpen={false}>
                  {content.services.list.map((s, i) => (
                    <div key={s.id} style={{ borderBottom: `1px solid ${C.surface}`, paddingBottom: 12, marginBottom: 12 }}>
                      <Field label={`${s.name} — description`} path={`services.list.${i}.description`} multiline />
                    </div>
                  ))}
                </Section>
              </>
            )}

          </div>

          {/* Footer */}
          <div style={{ borderTop: `1px solid ${C.surface}`, padding: '10px 16px' }} className="shrink-0">
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40`, fontSize: 10, textAlign: 'center' }}>
              Shift + Alt + E to toggle • Changes auto-save
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
