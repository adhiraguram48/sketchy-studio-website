import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, ChevronUp, Check, Plus, Trash2, ArrowLeft, ImageIcon, GripVertical, Palette, Eye, EyeOff } from 'lucide-react';
import { C } from './SketchyUI';
import { useEdit } from '../context/EditContext';
import { defaultContent, HomeSectionType, HomeSectionConfig } from '../data/content';

const DEFAULT_SECTIONS: HomeSectionConfig[] = [
  { id: 's-hero', type: 'hero', enabled: true },
  { id: 's-stats', type: 'stats', enabled: true },
  { id: 's-services', type: 'services-marquee', enabled: true },
  { id: 's-statement', type: 'statement', enabled: true },
  { id: 's-work', type: 'work-grid', enabled: true },
  { id: 's-pinned', type: 'pinned-work', enabled: true },
  { id: 's-about', type: 'about-teaser', enabled: true },
  { id: 's-clients', type: 'clients', enabled: true },
  { id: 's-testimonials', type: 'testimonials', enabled: true },
  { id: 's-cta', type: 'cta', enabled: true },
];

const SECTION_META: Record<HomeSectionType, { label: string; removable: boolean }> = {
  'hero':             { label: 'Hero',           removable: false },
  'stats':            { label: 'Stats Bar',      removable: true  },
  'services-marquee': { label: 'Services Strip', removable: true  },
  'statement':        { label: 'Bold Statement', removable: true  },
  'work-grid':        { label: 'Work Grid',       removable: true  },
  'pinned-work':      { label: 'Deep Dives',      removable: true  },
  'about-teaser':     { label: 'About Teaser',    removable: true  },
  'clients':          { label: 'Clients Scroll',  removable: true  },
  'testimonials':     { label: 'Testimonials',    removable: true  },
  'cta':              { label: 'Final CTA',        removable: true  },
};

function get(obj: any, path: string): any {
  return path.split('.').reduce((a, k) => a?.[k], obj);
}

// ── Field ─────────────────────────────────────────────────────────────────────

function Field({ label, path, multiline = false, rows = 3, placeholder = '' }: {
  label: string; path: string; multiline?: boolean; rows?: number; placeholder?: string;
}) {
  const { content, updateField } = useEdit();
  const value = (get(content, path) as string) ?? '';
  const [local, setLocal] = useState(value);
  useEffect(() => { setLocal((get(content, path) as string) ?? ''); }, [path]);
  function commit() { const v = (get(content, path) as string) ?? ''; if (local !== v) updateField(path, local); }
  const base: React.CSSProperties = {
    backgroundColor: '#0D0B10', color: '#FDFCFE', border: '1px solid #2A2733',
    fontFamily: 'Sora, sans-serif', fontSize: 12, width: '100%',
    borderRadius: 8, padding: '7px 10px', outline: 'none',
    resize: multiline ? 'vertical' as const : 'none', lineHeight: 1.6,
  };
  return (
    <div className="mb-3">
      {label && <label style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE50', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 4 }}>{label}</label>}
      {multiline
        ? <textarea value={local} onChange={e => setLocal(e.target.value)} onBlur={commit} rows={rows} style={base} placeholder={placeholder} />
        : <input type="text" value={local} onChange={e => setLocal(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()} style={base} placeholder={placeholder} />
      }
    </div>
  );
}

// ── ImageField ────────────────────────────────────────────────────────────────

function ImageField({ label, path }: { label: string; path: string }) {
  const { content, updateField } = useEdit();
  const [url, setUrl] = useState((get(content, path) as string) || '');
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
      {label && <label style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE50', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>{label}</label>}
      <div className="w-full rounded-xl overflow-hidden mb-2" style={{ height: url ? 90 : 48, border: '1px solid #2A2733', backgroundColor: '#0D0B10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {url
          ? <img src={url} alt="" className="w-full h-full object-cover" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          : <ImageIcon size={18} color="#2A2733" />
        }
      </div>
      <div className="flex gap-2">
        <input
          type="text" value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && apply()}
          placeholder="Paste image URL…"
          style={{ backgroundColor: '#0D0B10', color: '#FDFCFE', border: '1px solid #2A2733', fontFamily: 'Sora, sans-serif', fontSize: 11, flex: 1, borderRadius: 8, padding: '6px 9px', outline: 'none' }}
        />
        <motion.button onClick={apply} whileTap={{ scale: 0.9 }}
          style={{ backgroundColor: ok ? C.cyan : C.purple, color: '#0D0B10', fontFamily: 'Sora, sans-serif', fontSize: 11, borderRadius: 8, padding: '6px 12px', fontWeight: 900, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
          {ok ? <><Check size={11} /> Set</> : 'Set'}
        </motion.button>
      </div>
    </div>
  );
}

// ── Color Picker ──────────────────────────────────────────────────────────────

const PRESET_COLORS = [
  { label: 'Pink', value: '#FF6B9D' },
  { label: 'Purple', value: '#9B5CE8' },
  { label: 'Cyan', value: '#00F5D4' },
  { label: 'Yellow', value: '#FFE500' },
  { label: 'Orange', value: '#FF7043' },
  { label: 'Green', value: '#4CAF7D' },
  { label: 'Red', value: '#FF4757' },
  { label: 'Sky', value: '#38BDF8' },
  { label: 'Rose', value: '#FB7185' },
  { label: 'Lime', value: '#A3E635' },
  { label: 'Amber', value: '#FBBF24' },
  { label: 'Indigo', value: '#818CF8' },
];

function ColorPicker({ path, label }: { path: string; label: string }) {
  const { content, updateField } = useEdit();
  const current = (get(content, path) as string) || '';
  const [custom, setCustom] = useState(current.startsWith('#') && !PRESET_COLORS.find(p => p.value === current) ? current : '');

  return (
    <div className="mb-4">
      <label style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE50', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
        <Palette size={10} /> {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-3">
        {PRESET_COLORS.map(p => (
          <motion.button
            key={p.value}
            onClick={() => updateField(path, p.value)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            title={p.label}
            style={{
              width: 24, height: 24, borderRadius: '50%', backgroundColor: p.value,
              border: current === p.value ? '2px solid white' : '2px solid transparent',
              outline: current === p.value ? `2px solid ${p.value}` : 'none',
              outlineOffset: 2,
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: current || '#2A2733', border: '1px solid #2A2733', flexShrink: 0 }} />
        <input
          type="text"
          value={custom}
          onChange={e => setCustom(e.target.value)}
          onBlur={() => { if (/^#[0-9A-Fa-f]{6}$/.test(custom)) updateField(path, custom); }}
          onKeyDown={e => { if (e.key === 'Enter' && /^#[0-9A-Fa-f]{6}$/.test(custom)) updateField(path, custom); }}
          placeholder="#HEX custom color"
          style={{ backgroundColor: '#0D0B10', color: '#FDFCFE', border: '1px solid #2A2733', fontFamily: 'Sora, sans-serif', fontSize: 11, flex: 1, borderRadius: 8, padding: '5px 8px', outline: 'none' }}
        />
        {current && (
          <motion.button onClick={() => { updateField(path, ''); setCustom(''); }} whileTap={{ scale: 0.9 }} style={{ color: '#FF666650', fontFamily: 'Sora, sans-serif', fontSize: 10 }}>
            ✕
          </motion.button>
        )}
      </div>
      {current && (
        <p style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE30', fontSize: 9, marginTop: 4 }}>
          Active: {current} · Clears to tag-based default
        </p>
      )}
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

function Section({ title, children, defaultOpen = true, accent }: { title: string; children: React.ReactNode; defaultOpen?: boolean; accent?: string }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid #2A2733' }} className="py-3 px-4">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between mb-1">
        <span style={{ fontFamily: 'Sora, sans-serif', color: accent || C.purple, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5 }}>{title}</span>
        {open ? <ChevronUp size={11} color="#FDFCFE30" /> : <ChevronDown size={11} color="#FDFCFE30" />}
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

// ── AddBtn / RemoveBtn ────────────────────────────────────────────────────────

function AddBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.button onClick={onClick} whileTap={{ scale: 0.95 }}
      style={{ color: C.cyan, fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 900, border: `1px dashed ${C.cyan}50`, borderRadius: 8, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
      <Plus size={11} /> {label}
    </motion.button>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <motion.button onClick={onClick} whileTap={{ scale: 0.9 }} whileHover={{ backgroundColor: '#FF555520' }}
      style={{ color: '#FF6666', borderRadius: 6, padding: '3px 5px', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
      <Trash2 size={12} />
    </motion.button>
  );
}

// ── Approach step list ────────────────────────────────────────────────────────

function ApproachSteps({ base }: { base: string }) {
  const { content, updateField } = useEdit();
  const steps: string[] = get(content, `${base}.approach`) ?? [];

  function updateStep(i: number, val: string) {
    const next = [...steps];
    next[i] = val;
    updateField(`${base}.approach`, next);
  }
  function addStep() {
    updateField(`${base}.approach`, [...steps, '']);
  }
  function removeStep(i: number) {
    updateField(`${base}.approach`, steps.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <p style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE30', fontSize: 10, marginBottom: 10, lineHeight: 1.5 }}>
        Each entry becomes a numbered card on the page. Add as many as you need.
      </p>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, gap: 4, flexShrink: 0 }}>
            <GripVertical size={12} color="#FDFCFE20" />
            <span style={{ fontFamily: 'Fraunces, serif', color: C.pink, fontSize: 14, fontWeight: 900, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</span>
          </div>
          <div style={{ flex: 1 }}>
            <textarea
              value={step}
              onChange={e => updateStep(i, e.target.value)}
              onBlur={() => updateField(`${base}.approach`, steps)}
              rows={3}
              style={{ backgroundColor: '#0D0B10', color: '#FDFCFE', border: '1px solid #2A2733', fontFamily: 'Sora, sans-serif', fontSize: 12, width: '100%', borderRadius: 8, padding: '7px 10px', outline: 'none', resize: 'vertical', lineHeight: 1.6 }}
              placeholder={`Step ${i + 1}…`}
            />
          </div>
          <RemoveBtn onClick={() => removeStep(i)} />
        </div>
      ))}
      <AddBtn onClick={addStep} label="Add Step" />
    </div>
  );
}

// ── Case Study Editor ─────────────────────────────────────────────────────────

function CaseStudyEditor({ index, onBack }: { index: number; onBack: () => void }) {
  const { content, updateField } = useEdit();
  const cs = content.caseStudies[index];
  if (!cs) return null;
  const base = `caseStudies.${index}`;

  function addStat() { updateField(`${base}.results.stats`, [...cs.results.stats, { value: '', label: '' }]); }
  function removeStat(i: number) { updateField(`${base}.results.stats`, cs.results.stats.filter((_, idx) => idx !== i)); }
  function addImage() { updateField(`${base}.projectImages`, [...cs.projectImages, '']); }
  function removeImage(i: number) { updateField(`${base}.projectImages`, cs.projectImages.filter((_, idx) => idx !== i)); }

  const accentForHeader = (cs as any).accentColor || C.pink;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      {/* Back + breadcrumb */}
      <div style={{ padding: '10px 16px', borderBottom: '1px solid #2A2733', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, backgroundColor: `${accentForHeader}10` }}>
        <motion.button onClick={onBack} whileHover={{ x: -2 }} style={{ color: '#FDFCFE50', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Sora, sans-serif', fontSize: 11 }}>
          <ArrowLeft size={12} /> Projects
        </motion.button>
        <span style={{ color: '#FDFCFE20' }}>·</span>
        <span style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE', fontSize: 12, fontWeight: 900 }}>{cs.client}</span>
        {(cs as any).accentColor && (
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: (cs as any).accentColor, marginLeft: 'auto', flexShrink: 0 }} />
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Section title="Brand Color" accent={accentForHeader} defaultOpen>
          <ColorPicker path={`${base}.accentColor`} label="Accent color for this project" />
        </Section>

        <Section title="Identity" accent={accentForHeader}>
          <Field label="Client name" path={`${base}.client`} />
          <Field label="Industry" path={`${base}.industry`} />
          <Field label="Year" path={`${base}.year`} />
          <Field label="Timeline" path={`${base}.timeline`} />
          <Field label="Tagline (hero subtitle)" path={`${base}.tagline`} />
          <Field label="Short description (shown in pull-quote card)" path={`${base}.shortDescription`} multiline rows={4} />
        </Section>

        <Section title="Cover Image" accent={accentForHeader}>
          <ImageField label="" path={`${base}.coverImage`} />
        </Section>

        <Section title="Gallery Images" accent={accentForHeader} defaultOpen={false}>
          <p style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE30', fontSize: 10, marginBottom: 10 }}>First image shows full-width. The rest go into a 2-column grid.</p>
          {cs.projectImages.map((_, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div className="flex justify-between items-center" style={{ marginBottom: 4 }}>
                <span style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE30', fontSize: 10 }}>{i === 0 ? 'Image 1 — Full width hero' : `Image ${i + 1}`}</span>
                <RemoveBtn onClick={() => removeImage(i)} />
              </div>
              <ImageField label="" path={`${base}.projectImages.${i}`} />
            </div>
          ))}
          <AddBtn onClick={addImage} label="Add Image" />
        </Section>

        <Section title="The Challenge" accent={accentForHeader}>
          <Field label="" path={`${base}.challenge`} multiline rows={7} placeholder="Describe the problem they came to you with…" />
        </Section>

        <Section title="The Approach — Steps" accent={accentForHeader}>
          <ApproachSteps base={base} />
        </Section>

        <Section title="Result Stats" accent={accentForHeader}>
          {cs.results.stats.map((stat, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ width: 90 }}><Field label="Value" path={`${base}.results.stats.${i}.value`} placeholder="2×" /></div>
              <div style={{ flex: 1 }}><Field label="Label" path={`${base}.results.stats.${i}.label`} placeholder="Instagram growth" /></div>
              <div style={{ marginTop: 20 }}><RemoveBtn onClick={() => removeStat(i)} /></div>
            </div>
          ))}
          <AddBtn onClick={addStat} label="Add Result" />
        </Section>

        <Section title="Testimonial" accent={accentForHeader} defaultOpen={false}>
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

// ── Work tab: project picker ──────────────────────────────────────────────────

function WorkTab({ onSelect }: { onSelect: (i: number) => void }) {
  const { content, updateField } = useEdit();

  function addProject() {
    const newProject = {
      ...defaultContent.caseStudies[0],
      id: String(Date.now()),
      slug: `new-project-${Date.now()}`,
      client: 'New Project',
      tagline: '',
      shortDescription: '',
      challenge: '',
      approach: [''],
      coverImage: '',
      projectImages: [],
      results: { stats: [{ value: '', label: '' }], testimonial: { quote: '', author: '', title: '', company: '', photo: '' } },
      nextProject: undefined,
    };
    const next = [...content.caseStudies, newProject];
    updateField('caseStudies', next);
    onSelect(next.length - 1);
  }

  function removeProject(i: number) {
    if (!window.confirm(`Remove "${content.caseStudies[i].client}"?`)) return;
    updateField('caseStudies', content.caseStudies.filter((_, idx) => idx !== i));
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '12px 16px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE30', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
          {content.caseStudies.length} Projects
        </span>
        <AddBtn onClick={addProject} label="New Project" />
      </div>
      {content.caseStudies.map((cs, i) => {
        const accent = (cs as any).accentColor || C.pink;
        return (
          <motion.div
            key={cs.id}
            whileHover={{ backgroundColor: '#2A273380' }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: '1px solid #2A2733', cursor: 'pointer' }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 10, overflow: 'hidden', border: '1px solid #2A2733', flexShrink: 0 }}>
              {cs.coverImage
                ? <img src={cs.coverImage} alt={cs.client} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', backgroundColor: accent + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ImageIcon size={16} color={accent + '60'} />
                  </div>
              }
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }} onClick={() => onSelect(i)}>
              <div style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE', fontSize: 13, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 6 }}>
                {cs.client}
                {(cs as any).accentColor && <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: (cs as any).accentColor }} />}
              </div>
              <div style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE40', fontSize: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {cs.industry} · {cs.year}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <motion.button
                onClick={() => onSelect(i)}
                whileHover={{ x: 2 }}
                style={{ color: '#FDFCFE30', padding: '4px' }}
              >
                <ChevronDown size={12} style={{ rotate: '-90deg' }} />
              </motion.button>
              <RemoveBtn onClick={() => removeProject(i)} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Main panel ────────────────────────────────────────────────────────────────

const TABS = ['Home', 'About', 'Work', 'Nav'] as const;
type Tab = typeof TABS[number];

export function EditPanel() {
  const { editMode, toggleEditMode, content, updateField, syncStatus } = useEdit();
  const location = useLocation();

  const routeTab: Tab = location.pathname.startsWith('/work') ? 'Work'
    : location.pathname.startsWith('/about') ? 'About'
    : (location.pathname.startsWith('/contact') || location.pathname.startsWith('/services')) ? 'Nav'
    : 'Home';

  const [tab, setTab] = useState<Tab>(routeTab);
  useEffect(() => { setTab(routeTab); }, [location.pathname]);

  const slugMatch = location.pathname.match(/^\/work\/(.+)$/);
  const activeSlug = slugMatch?.[1] ?? null;
  const activeCSIndex = activeSlug ? content.caseStudies.findIndex(cs => cs.slug === activeSlug) : -1;
  const [selectedCS, setSelectedCS] = useState<number | null>(activeCSIndex >= 0 ? activeCSIndex : null);
  useEffect(() => {
    if (activeCSIndex >= 0) setSelectedCS(activeCSIndex);
    else setSelectedCS(null);
  }, [activeCSIndex]);

  const syncColor = syncStatus === 'saved' ? C.cyan : syncStatus === 'saving' ? C.yellow : syncStatus === 'error' ? '#FF4444' : '#FDFCFE20';
  const syncLabel = syncStatus === 'saving' ? 'saving…' : syncStatus === 'saved' ? '✓ saved' : syncStatus === 'error' ? '⚠ error' : '';

  // Home helpers
  function addStat() { updateField('home.stats', [...content.home.stats, { value: '', label: '' }]); }
  function removeStat(i: number) { updateField('home.stats', content.home.stats.filter((_, idx) => idx !== i)); }
  function addTestimonial() { updateField('home.testimonials', [...content.home.testimonials, { quote: '', author: '', title: '', company: '', photo: '' }]); }
  function removeTestimonial(i: number) { updateField('home.testimonials', content.home.testimonials.filter((_, idx) => idx !== i)); }
  function addClient() { updateField('home.clients', [...content.home.clients, '']); }
  function removeClient(i: number) { updateField('home.clients', content.home.clients.filter((_, idx) => idx !== i)); }

  // Section management helpers
  const sections = content.home.homeSections ?? DEFAULT_SECTIONS;
  function updateSections(next: HomeSectionConfig[]) { updateField('home.homeSections', next); }
  function toggleSection(i: number) { const next = [...sections]; next[i] = { ...next[i], enabled: !next[i].enabled }; updateSections(next); }
  function moveSection(i: number, dir: -1 | 1) { if (i + dir < 0 || i + dir >= sections.length) return; const next = [...sections]; [next[i], next[i + dir]] = [next[i + dir], next[i]]; updateSections(next); }
  function removeSection(i: number) { updateSections(sections.filter((_, idx) => idx !== i)); }
  function addSection(type: HomeSectionType) { updateSections([...sections, { id: Date.now().toString(), type, enabled: true }]); }

  // About helpers
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
            backgroundColor: '#1C1926', borderLeft: '1px solid #2A2733',
            zIndex: 200, display: 'flex', flexDirection: 'column',
            boxShadow: '-16px 0 60px rgba(0,0,0,0.7)',
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: '1px solid #2A2733', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: syncStatus === 'saving' ? C.yellow : syncStatus === 'saved' ? C.cyan : syncStatus === 'error' ? '#FF4444' : '#2A2733', transition: 'background-color 0.3s' }} />
              <div>
                <div style={{ fontFamily: 'Fraunces, serif', color: '#FDFCFE', fontSize: 14, fontWeight: 900, letterSpacing: 0.3 }}>Edit Mode</div>
                <div style={{ fontFamily: 'Sora, sans-serif', color: syncColor, fontSize: 9, textTransform: 'uppercase', letterSpacing: 1 }}>{syncLabel || 'ready'}</div>
              </div>
            </div>
            <button onClick={toggleEditMode} style={{ color: '#FDFCFE30' }} className="hover:text-white transition-colors p-1">
              <X size={16} />
            </button>
          </div>

          {/* Tabs */}
          <div style={{ borderBottom: '1px solid #2A2733', padding: '0 12px', display: 'flex', gap: 2, flexShrink: 0 }} className="pt-2">
            {TABS.map(t => (
              <button key={t} onClick={() => { setTab(t); if (t !== 'Work') setSelectedCS(null); }}
                style={{
                  fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 900,
                  color: tab === t ? '#0D0B10' : '#FDFCFE50',
                  backgroundColor: tab === t ? C.pink : 'transparent',
                  padding: '5px 12px', borderRadius: '8px 8px 0 0',
                  textTransform: 'uppercase', letterSpacing: 0.8, transition: 'all 0.15s',
                }}>{t}</button>
            ))}
          </div>

          {/* Body */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

            {tab === 'Home' && <>
              <Section title="Page Sections" accent={C.cyan} defaultOpen={true}>
                <p style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE30', fontSize: 10, marginBottom: 10, lineHeight: 1.5 }}>
                  Toggle, reorder, or remove sections. Hero can be hidden but not deleted.
                </p>
                {sections.map((sec, i) => {
                  const meta = SECTION_META[sec.type];
                  return (
                    <div key={sec.id} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, padding: '5px 0', borderBottom: '1px solid #2A273340' }}>
                      {/* Eye toggle */}
                      <motion.button
                        onClick={() => toggleSection(i)}
                        whileTap={{ scale: 0.9 }}
                        style={{ color: sec.enabled ? C.cyan : '#FDFCFE20', flexShrink: 0, display: 'flex', alignItems: 'center', padding: '2px' }}
                      >
                        {sec.enabled ? <Eye size={13} /> : <EyeOff size={13} />}
                      </motion.button>

                      {/* Label */}
                      <span style={{
                        fontFamily: 'Sora, sans-serif',
                        fontSize: 11,
                        fontWeight: sec.enabled ? 900 : 400,
                        color: sec.enabled ? '#FDFCFE' : '#FDFCFE30',
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {meta.label}
                      </span>

                      {/* Up / Down */}
                      <motion.button
                        onClick={() => moveSection(i, -1)}
                        disabled={i === 0}
                        whileTap={{ scale: 0.9 }}
                        style={{ color: i === 0 ? '#FDFCFE12' : '#FDFCFE40', flexShrink: 0, display: 'flex', alignItems: 'center', padding: '2px', cursor: i === 0 ? 'default' : 'pointer' }}
                      >
                        <ChevronUp size={12} />
                      </motion.button>
                      <motion.button
                        onClick={() => moveSection(i, 1)}
                        disabled={i === sections.length - 1}
                        whileTap={{ scale: 0.9 }}
                        style={{ color: i === sections.length - 1 ? '#FDFCFE12' : '#FDFCFE40', flexShrink: 0, display: 'flex', alignItems: 'center', padding: '2px', cursor: i === sections.length - 1 ? 'default' : 'pointer' }}
                      >
                        <ChevronDown size={12} />
                      </motion.button>

                      {/* Trash (not for hero) */}
                      {meta.removable
                        ? <RemoveBtn onClick={() => removeSection(i)} />
                        : <div style={{ width: 22, flexShrink: 0 }} />
                      }
                    </div>
                  );
                })}

                {/* Add section picker */}
                <div style={{ marginTop: 10 }}>
                  <label style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE30', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 5 }}>Add section</label>
                  <select
                    defaultValue=""
                    onChange={e => { if (e.target.value) { addSection(e.target.value as HomeSectionType); e.target.value = ''; } }}
                    style={{
                      backgroundColor: '#0D0B10', color: '#FDFCFE', border: `1px dashed ${C.cyan}50`,
                      fontFamily: 'Sora, sans-serif', fontSize: 11, borderRadius: 8, padding: '6px 10px',
                      width: '100%', outline: 'none', cursor: 'pointer',
                    }}
                  >
                    <option value="" disabled style={{ color: '#FDFCFE30' }}>Pick a section type…</option>
                    {(Object.keys(SECTION_META) as HomeSectionType[]).map(type => (
                      <option key={type} value={type} style={{ backgroundColor: '#1C1926' }}>{SECTION_META[type].label}</option>
                    ))}
                  </select>
                </div>
              </Section>

              <Section title="Hero">
                <Field label="Headline" path="home.heroHeadline" />
                <Field label="Subheadline" path="home.heroSub" multiline />
              </Section>
              <Section title="Stats">
                {content.home.stats.map((stat, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                    <div style={{ width: 80 }}><Field label="Value" path={`home.stats.${i}.value`} placeholder="50+" /></div>
                    <div style={{ flex: 1 }}><Field label="Label" path={`home.stats.${i}.label`} placeholder="Brands Built" /></div>
                    <div style={{ marginTop: 20 }}><RemoveBtn onClick={() => removeStat(i)} /></div>
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
                {content.home.clients.map((_, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                    <div style={{ flex: 1 }}><Field label={`Client ${i + 1}`} path={`home.clients.${i}`} /></div>
                    <RemoveBtn onClick={() => removeClient(i)} />
                  </div>
                ))}
                <AddBtn onClick={addClient} label="Add Client" />
              </Section>
              <Section title="Testimonials" defaultOpen={false}>
                {content.home.testimonials.map((t, i) => (
                  <div key={i} style={{ borderTop: '1px solid #2A2733', paddingTop: 12, marginTop: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE30', fontSize: 10 }}>{t.author || `Testimonial ${i + 1}`}</span>
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
            </>}

            {tab === 'About' && <>
              <Section title="Story Text">
                <Field label="Page headline" path="about.headline" />
                <Field label="Paragraph 1" path="about.para1" multiline rows={4} />
                <Field label="Paragraph 2" path="about.para2" multiline rows={4} />
                <Field label="Paragraph 3" path="about.para3" multiline rows={4} />
                <Field label="Paragraph 4" path="about.para4" multiline rows={4} />
              </Section>
              <Section title="Rotating Quotes">
                {quotes.map((q, i) => (
                  <div key={i} style={{ borderTop: '1px solid #2A2733', paddingTop: 10, marginTop: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE30', fontSize: 10 }}>Quote {i + 1}</span>
                      <RemoveBtn onClick={() => removeQuote(i)} />
                    </div>
                    <Field label="Text" path={`about.quotes.${i}.text`} multiline rows={3} />
                    <Field label="Attribution" path={`about.quotes.${i}.author`} />
                  </div>
                ))}
                <AddBtn onClick={addQuote} label="Add Quote" />
              </Section>
              <Section title="Studio Photo">
                <ImageField label="" path="about.studioPhoto" />
              </Section>
              <Section title="Team" defaultOpen={false}>
                {content.about.team.map((m, i) => (
                  <div key={i} style={{ borderTop: '1px solid #2A2733', paddingTop: 10, marginTop: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE30', fontSize: 10 }}>{m.name || `Member ${i + 1}`}</span>
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
            </>}

            {tab === 'Work' && selectedCS === null && (
              <WorkTab onSelect={setSelectedCS} />
            )}
            {tab === 'Work' && selectedCS !== null && (
              <CaseStudyEditor index={selectedCS} onBack={() => setSelectedCS(null)} />
            )}

            {tab === 'Nav' && <>
              <Section title="Contact Info">
                <Field label="Email" path="nav.email" />
                <Field label="Phone" path="nav.phone" />
                <Field label="Instagram handle" path="nav.instagram" />
                <Field label="Calendly URL" path="nav.calendly" />
                <Field label="Footer tagline" path="nav.tagline" multiline />
              </Section>
              <Section title="Services" defaultOpen={false}>
                {content.services.list.map((s, i) => (
                  <div key={s.id} style={{ borderTop: '1px solid #2A2733', paddingTop: 10, marginTop: 4 }}>
                    <p style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE40', fontSize: 10, marginBottom: 6, textTransform: 'uppercase' }}>{s.name}</p>
                    <Field label="Description" path={`services.list.${i}.description`} multiline />
                  </div>
                ))}
              </Section>
            </>}

          </div>

          {/* Footer */}
          <div style={{ borderTop: '1px solid #2A2733', padding: '8px 16px', flexShrink: 0 }}>
            <p style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE15', fontSize: 9, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 }}>
              Shift + Alt + E to close · Auto-saves to backend
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
