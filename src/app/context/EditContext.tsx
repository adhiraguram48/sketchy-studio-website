import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { defaultContent, SiteContent } from '../data/content';
import { backend } from '../../lib/backend';

type SyncStatus = 'idle' | 'saving' | 'saved' | 'error';

interface EditContextType {
  editMode: boolean;
  content: SiteContent;
  syncStatus: SyncStatus;
  backendReady: boolean;
  toggleEditMode: () => void;
  updateField: (path: string, value: any) => void;
  resetContent: () => void;
}

const EditContext = createContext<EditContextType | null>(null);

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function setNestedValue(obj: any, path: string, value: any): any {
  const keys = path.split('.');
  const result = JSON.parse(JSON.stringify(obj));
  let current = result;
  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
  return result;
}

function deepMerge(base: SiteContent, remote: Partial<SiteContent>): SiteContent {
  return {
    ...base,
    ...remote,
    nav: { ...base.nav, ...remote.nav },
    home: { ...base.home, ...remote.home },
    about: {
      ...base.about,
      ...remote.about,
      team: remote.about?.team ?? base.about.team,
      values: remote.about?.values ?? base.about.values,
      quotes: remote.about?.quotes ?? base.about.quotes,
    },
    services: remote.services ?? base.services,
    caseStudies: remote.caseStudies ?? base.caseStudies,
    articles: remote.articles ?? base.articles,
  };
}

function migrateContent(content: SiteContent): SiteContent {
  return {
    ...content,
    caseStudies: content.caseStudies.map(cs => ({
      ...cs,
      approach: typeof cs.approach === 'string'
        ? (cs.approach as string).split(/(?<=\.)\s+(?=[A-Z])/).filter(Boolean)
        : cs.approach,
    })),
  };
}

const STORAGE_KEY = 'sketchy-studio-content';

export function EditProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [backendReady, setBackendReady] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstLoad = useRef(true);

  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return migrateContent(deepMerge(defaultContent, JSON.parse(stored)));
    } catch {}
    return defaultContent;
  });

  // Load from backend on mount (authoritative source)
  useEffect(() => {
    if (!backend) { setBackendReady(true); return; }
    backend.load().then(data => {
      if (data && Object.keys(data).length > 0) {
        const merged = migrateContent(deepMerge(defaultContent, data as Partial<SiteContent>));
        setContent(merged);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(merged)); } catch {}
      }
      setBackendReady(true);
    });
  }, []);

  // Persist to localStorage + debounced backend save
  useEffect(() => {
    if (isFirstLoad.current) { isFirstLoad.current = false; return; }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(content)); } catch {}
    if (!backend) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSyncStatus('saving');
    saveTimer.current = setTimeout(async () => {
      const ok = await backend.save(content as Record<string, any>);
      setSyncStatus(ok ? 'saved' : 'error');
      if (ok) setTimeout(() => setSyncStatus('idle'), 2000);
    }, 1200);
  }, [content]);

  const toggleEditMode = useCallback(() => setEditMode(prev => !prev), []);

  const updateField = useCallback((path: string, value: any) => {
    setContent(prev => setNestedValue(prev, path, value));
  }, []);

  const resetContent = useCallback(async () => {
    setContent(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
    if (backend) {
      setSyncStatus('saving');
      const ok = await backend.save(defaultContent as Record<string, any>);
      setSyncStatus(ok ? 'saved' : 'error');
      setTimeout(() => setSyncStatus('idle'), 2000);
    }
  }, []);

  return (
    <EditContext.Provider value={{ editMode, content, syncStatus, backendReady, toggleEditMode, updateField, resetContent }}>
      {children}
    </EditContext.Provider>
  );
}

export function useEdit() {
  const ctx = useContext(EditContext);
  if (!ctx) throw new Error('useEdit must be used within EditProvider');
  return ctx;
}

// Editable text component
interface EditableTextProps {
  path: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
}

export function ET({ path, as: Tag = 'span', className, style, placeholder }: EditableTextProps) {
  const { editMode, content, updateField } = useEdit();
  const value = (getNestedValue(content, path) as string) ?? placeholder ?? '';

  if (editMode) {
    return (
      <Tag
        contentEditable
        suppressContentEditableWarning
        onBlur={e => updateField(path, (e.target as HTMLElement).innerText)}
        className={className}
        style={{ ...style, outline: '2px dashed #9B5CE8', outlineOffset: 4, borderRadius: 4, cursor: 'text', minWidth: 20 }}
      >
        {value}
      </Tag>
    );
  }
  return <Tag className={className} style={style}>{value}</Tag>;
}

// Editable image component
interface EditableImgProps {
  path: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export function EI({ path, fallbackSrc, alt, className, style }: EditableImgProps) {
  const { editMode, content, updateField } = useEdit();
  const value = (getNestedValue(content, path) as string) || fallbackSrc;
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState(value);

  if (editMode) {
    return (
      <div className="relative group" style={{ display: 'inline-block', width: '100%' }}>
        <img src={value} alt={alt} className={className} style={style} />
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 'inherit' }}
        >
          <button
            onClick={() => { setUrl(value); setOpen(true); }}
            style={{ backgroundColor: '#9B5CE8', fontFamily: 'Sora, sans-serif' }}
            className="text-white px-4 py-2 rounded-full text-sm font-black shadow-xl"
          >
            📷 Change Image
          </button>
        </div>
        {open && (
          <div
            className="absolute z-50 rounded-2xl p-4 shadow-2xl"
            style={{ backgroundColor: '#1C1926', border: '1px solid #2A2733', bottom: 'calc(100% + 8px)', left: 0, right: 0, minWidth: 280 }}
          >
            <p style={{ fontFamily: 'Sora, sans-serif', color: '#FDFCFE', fontSize: 12, fontWeight: 900, marginBottom: 8 }}>
              Paste image URL
            </p>
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') { updateField(path, url); setOpen(false); }
                if (e.key === 'Escape') setOpen(false);
              }}
              autoFocus
              placeholder="https://..."
              style={{ backgroundColor: '#0D0B10', color: '#FDFCFE', border: '1px solid #2A2733', fontFamily: 'Sora, sans-serif', fontSize: 12, borderRadius: 8, padding: '6px 10px', width: '100%', outline: 'none', marginBottom: 8 }}
            />
            {url && <img src={url} alt="preview" className="w-full rounded-lg object-cover mb-3" style={{ maxHeight: 120 }} onError={() => {}} />}
            <div className="flex gap-2">
              <button
                onClick={() => { updateField(path, url); setOpen(false); }}
                style={{ backgroundColor: '#9B5CE8', color: '#0D0B10', fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 900 }}
                className="flex-1 py-2 rounded-full uppercase tracking-wide"
              >
                Apply
              </button>
              <button
                onClick={() => setOpen(false)}
                style={{ backgroundColor: '#2A2733', color: '#FDFCFE80', fontFamily: 'Sora, sans-serif', fontSize: 11 }}
                className="px-4 py-2 rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <img src={value} alt={alt} className={className} style={style} />;
}
