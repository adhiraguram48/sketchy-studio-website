import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { defaultContent, SiteContent } from '../data/content';
import { supabase } from '../../lib/supabase';

type SyncStatus = 'idle' | 'saving' | 'saved' | 'error';

interface EditContextType {
  editMode: boolean;
  content: SiteContent;
  syncStatus: SyncStatus;
  supabaseReady: boolean;
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
    about: { ...base.about, ...remote.about },
    services: remote.services ?? base.services,
    caseStudies: remote.caseStudies ?? base.caseStudies,
    articles: remote.articles ?? base.articles,
  };
}

const STORAGE_KEY = 'sketchy-studio-content';

export function EditProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [supabaseReady, setSupabaseReady] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstLoad = useRef(true);

  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return deepMerge(defaultContent, JSON.parse(stored));
    } catch {}
    return defaultContent;
  });

  // Load from Supabase on mount (authoritative source)
  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('site_content')
      .select('data')
      .eq('id', 1)
      .single()
      .then(({ data, error }) => {
        if (!error && data?.data && Object.keys(data.data).length > 0) {
          const merged = deepMerge(defaultContent, data.data);
          setContent(merged);
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(merged)); } catch {}
        }
        setSupabaseReady(true);
      });
  }, []);

  // Persist to localStorage + debounced Supabase save
  useEffect(() => {
    if (isFirstLoad.current) { isFirstLoad.current = false; return; }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(content)); } catch {}
    if (!supabase) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSyncStatus('saving');
    saveTimer.current = setTimeout(async () => {
      const { error } = await supabase
        .from('site_content')
        .upsert({ id: 1, data: content, updated_at: new Date().toISOString() });
      setSyncStatus(error ? 'error' : 'saved');
      if (!error) setTimeout(() => setSyncStatus('idle'), 2000);
    }, 1200);
  }, [content]);

  const toggleEditMode = useCallback(() => setEditMode(prev => !prev), []);

  const updateField = useCallback((path: string, value: any) => {
    setContent(prev => setNestedValue(prev, path, value));
  }, []);

  const resetContent = useCallback(async () => {
    setContent(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
    if (supabase) {
      setSyncStatus('saving');
      await supabase.from('site_content').upsert({ id: 1, data: defaultContent, updated_at: new Date().toISOString() });
      setSyncStatus('saved');
      setTimeout(() => setSyncStatus('idle'), 2000);
    }
  }, []);

  return (
    <EditContext.Provider value={{ editMode, content, syncStatus, supabaseReady, toggleEditMode, updateField, resetContent }}>
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

  if (editMode) {
    return (
      <div className="relative group" style={{ display: 'inline-block' }}>
        <img src={value} alt={alt} className={className} style={style} />
        <div
          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ borderRadius: 'inherit' }}
        >
          <button
            onClick={() => {
              const url = window.prompt('Enter image URL:', value);
              if (url) updateField(path, url);
            }}
            style={{ backgroundColor: '#9B5CE8', fontFamily: 'Sora, sans-serif' }}
            className="text-white px-4 py-2 rounded-full text-sm font-black"
          >
            📷 Change Image
          </button>
        </div>
      </div>
    );
  }

  return <img src={value} alt={alt} className={className} style={style} />;
}
