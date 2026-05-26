// Firebase Realtime Database — Google Cloud, free forever
// Only one env var needed: VITE_FIREBASE_URL
// (the database URL from Firebase console, e.g. https://your-app.firebaseio.com)
//
// Rules are set to "test mode" (open read/write) during setup —
// that's fine for site content. The URL is the only thing that needs to stay private.

const DB_URL = (import.meta.env.VITE_FIREBASE_URL as string ?? '').replace(/\/$/, '');

// All site content stored at /site-content.json
const ENDPOINT = `${DB_URL}/site-content.json`;

export const backend = DB_URL ? {
  async load(): Promise<Record<string, any> | null> {
    try {
      const res = await fetch(ENDPOINT);
      if (!res.ok) return null;
      const data = await res.json();
      // Firebase returns null (not 404) for empty nodes
      return data ?? null;
    } catch {
      return null;
    }
  },

  async save(content: Record<string, any>): Promise<boolean> {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'PUT',            // PUT overwrites the whole node — exactly what we want
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      return res.ok;
    } catch {
      return false;
    }
  },
} : null;
