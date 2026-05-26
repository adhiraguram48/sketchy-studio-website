import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { C } from '../components/SketchyUI';
import { unlockStudioSession, getStudioPass, useEdit } from '../context/EditContext';

export default function Studio() {
  const navigate = useNavigate();
  const { editMode, toggleEditMode } = useEdit();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Already in edit mode — show status instead
  useEffect(() => {
    if (editMode) setUnlocked(true);
    inputRef.current?.focus();
  }, [editMode]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code === getStudioPass()) {
      unlockStudioSession();
      if (!editMode) toggleEditMode();
      setUnlocked(true);
      setError(false);
      setTimeout(() => navigate('/'), 1200);
    } else {
      setError(true);
      setShake(true);
      setCode('');
      setTimeout(() => setShake(false), 600);
    }
  }

  function handleLock() {
    if (editMode) toggleEditMode();
    navigate('/');
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.void,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${C.purple}18 0%, transparent 70%)`,
      }} />

      {/* Grid texture */}
      <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.04 }}>
        <defs>
          <pattern id="studio-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0 L0 0 0 48" fill="none" stroke={C.cream} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#studio-grid)" />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <img src="/logo.png" alt="The Sketchy Studio" style={{ height: 44, width: 'auto', margin: '0 auto 20px', display: 'block' }} />
          <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40`, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 4 }}>
            Team Studio
          </p>
        </div>

        <AnimatePresence mode="wait">
          {unlocked ? (
            /* ── Unlocked state ── */
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                backgroundColor: C.cardDark,
                border: `1px solid ${C.purple}50`,
                borderRadius: 20,
                padding: '36px 32px',
                textAlign: 'center',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: 48, marginBottom: 16, lineHeight: 1 }}
              >
                ✏️
              </motion.div>
              <h2 style={{ fontFamily: 'Fraunces, serif', color: '#ffffff', fontSize: '1.6rem', fontWeight: 900, marginBottom: 10 }}>
                Edit mode is on
              </h2>
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}60`, fontSize: 13, lineHeight: 1.7, marginBottom: 28 }}>
                Click any text on the site to edit it. Changes save automatically to the live site.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <motion.button
                  onClick={() => navigate('/')}
                  whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                  style={{
                    background: `linear-gradient(135deg, ${C.purple} 0%, ${C.pink} 100%)`,
                    color: '#ffffff', fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12,
                    textTransform: 'uppercase', letterSpacing: 2, padding: '14px 28px',
                    borderRadius: 100, border: 'none', cursor: 'pointer',
                  }}
                >
                  Go to site →
                </motion.button>
                <motion.button
                  onClick={handleLock}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  style={{
                    backgroundColor: 'transparent', color: `${C.cream}40`,
                    fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 11,
                    textTransform: 'uppercase', letterSpacing: 1.5, padding: '10px',
                    borderRadius: 100, border: `1px solid ${C.cream}12`, cursor: 'pointer',
                  }}
                >
                  Lock &amp; exit edit mode
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* ── Passcode gate ── */
            <motion.form
              key="gate"
              onSubmit={handleSubmit}
              animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                backgroundColor: C.cardDark,
                border: `1px solid ${C.surface}`,
                borderRadius: 20,
                padding: '36px 32px',
              }}
            >
              <h2 style={{ fontFamily: 'Fraunces, serif', color: '#ffffff', fontSize: '1.7rem', fontWeight: 900, marginBottom: 8, textAlign: 'center' }}>
                Team access
              </h2>
              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}45`, fontSize: 13, textAlign: 'center', marginBottom: 28, lineHeight: 1.6 }}>
                Enter your studio passcode to enable editing.
              </p>

              <div style={{ marginBottom: 16 }}>
                <input
                  ref={inputRef}
                  type="password"
                  value={code}
                  onChange={e => { setCode(e.target.value); setError(false); }}
                  placeholder="Studio passcode"
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    backgroundColor: '#0D0B10',
                    color: '#ffffff',
                    border: `1.5px solid ${error ? '#FF4040' : code ? C.purple : C.surface}`,
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 14,
                    padding: '14px 16px',
                    borderRadius: 12,
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                    letterSpacing: code ? 4 : 0,
                  }}
                />
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{ fontFamily: 'Sora, sans-serif', color: '#FF4040', fontSize: 11, marginTop: 8, fontWeight: 700 }}
                    >
                      Incorrect passcode. Try again.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%',
                  background: `linear-gradient(135deg, ${C.purple} 0%, ${C.pink} 100%)`,
                  color: '#ffffff', fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 12,
                  textTransform: 'uppercase', letterSpacing: 2.5, padding: '14px',
                  borderRadius: 100, border: 'none', cursor: 'pointer',
                }}
              >
                Unlock Studio
              </motion.button>

              <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}25`, fontSize: 11, textAlign: 'center', marginTop: 20, lineHeight: 1.6 }}>
                This page is for The Sketchy Studio team only.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
