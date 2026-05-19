import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { defaultContent, SiteContent } from '../data/content';

interface EditContextType {
  editMode: boolean;
  content: SiteContent;
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

const STORAGE_KEY = 'sketchy-studio-content';

export function EditProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Deep merge: use defaultContent as base so new fields (phone, calendly, stats, team, services) always exist
        return {
          ...defaultContent,
          ...parsed,
          nav: { ...defaultContent.nav, ...parsed.nav },
          home: { ...defaultContent.home, ...parsed.home },
          about: { ...defaultContent.about, ...parsed.about },
          services: parsed.services ?? defaultContent.services,
        };
      }
    } catch {}
    return defaultContent;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch {}
  }, [content]);

  const toggleEditMode = useCallback(() => setEditMode(prev => !prev), []);

  const updateField = useCallback((path: string, value: any) => {
    setContent(prev => setNestedValue(prev, path, value));
  }, []);

  const resetContent = useCallback(() => {
    setContent(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <EditContext.Provider value={{ editMode, content, toggleEditMode, updateField, resetContent }}>
      {children}
    </EditContext.Provider>
  );
}

export function useEdit() {
  const ctx = useContext(EditContext);
  if (!ctx) throw new Error('useEdit must be used within EditProvider');
  return ctx;
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
      <div className="relative group">
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
