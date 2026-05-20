// JSONBin.io — free JSON storage, no SQL needed
// Set VITE_JSONBIN_BIN_ID and VITE_JSONBIN_API_KEY in Vercel env vars

const BIN_ID  = import.meta.env.VITE_JSONBIN_BIN_ID  ?? '';
const API_KEY = import.meta.env.VITE_JSONBIN_API_KEY  ?? '';

const HEADERS = {
  'Content-Type': 'application/json',
  'X-Master-Key': API_KEY,
  'X-Bin-Versioning': 'false',
};

export const backend = BIN_ID && API_KEY ? {
  async load(): Promise<Record<string, any> | null> {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, { headers: HEADERS });
      if (!res.ok) return null;
      const json = await res.json();
      return json.record ?? null;
    } catch {
      return null;
    }
  },
  async save(content: Record<string, any>): Promise<boolean> {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(content),
      });
      return res.ok;
    } catch {
      return false;
    }
  },
} : null;
