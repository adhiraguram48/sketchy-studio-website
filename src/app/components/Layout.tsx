import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { Menu, X, Instagram, Mail, Phone, ArrowUpRight, PenLine } from 'lucide-react';
import { C, DotTrio, CursorGlow, ScrollProgress } from './SketchyUI';
import { EditPanel } from './EditPanel';
import { useEdit, lockStudioSession } from '../context/EditContext';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', v => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          backgroundColor: scrolled ? `${C.void}F0` : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${C.surface}` : 'none',
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.img
              src="/logo.png"
              alt="The Sketchy Studio"
              whileHover={{ scale: 1.06, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              style={{ height: 40, width: 'auto', display: 'block' }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));
              return (
                <Link key={link.href} to={link.href}>
                  <motion.span
                    whileHover={{ y: -1 }}
                    style={{ fontFamily: 'Sora, sans-serif', color: active ? C.purple : 'rgba(255,255,255,0.8)' }}
                    className="px-4 py-2 text-sm font-medium rounded-full transition-colors block relative"
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        style={{ backgroundColor: `${C.purple}22` }}
                        className="absolute inset-0 rounded-full"
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </motion.span>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.97 }}
              style={{ background: `linear-gradient(135deg, ${C.purple} 0%, ${C.pink} 100%)`, fontFamily: 'Sora, sans-serif', color: '#ffffff' }}
              className="px-5 py-2 rounded-full text-sm font-black uppercase tracking-wide"
            >
              Start a Project
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: C.cream }}
            className="md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ backgroundColor: C.void, zIndex: 49 }}
            className="fixed inset-0 flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <Link key={link.href} to={link.href}>
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    style={{
                      fontFamily: 'Fraunces, Georgia, serif',
                      color: location.pathname === link.href ? C.purple : '#ffffff',
                    }}
                    className="text-4xl font-black py-2 border-b border-white/10"
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => navigate('/contact')}
                style={{ background: `linear-gradient(135deg, ${C.purple} 0%, ${C.pink} 100%)`, color: '#ffffff', fontFamily: 'Sora, sans-serif' }}
                className="mt-6 px-6 py-3 rounded-full font-black uppercase tracking-wide text-center"
              >
                Start a Project
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Keyboard shortcut listener — Shift+Alt+E toggles edit mode (hidden from clients)
export function EditKeyListener() {
  const { toggleEditMode } = useEdit();
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.shiftKey && e.altKey && e.code === 'KeyE') toggleEditMode();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleEditMode]);
  return null;
}

// Footer
export function Footer() {
  const navigate = useNavigate();
  const { content } = useEdit();

  return (
    <footer style={{ backgroundColor: C.void, borderTop: `1px solid ${C.surface}` }} className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img src="/logo.png" alt="The Sketchy Studio" style={{ height: 52, width: 'auto' }} />
            </div>
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-sm mb-6 max-w-sm">
              {content.nav.tagline}
            </p>
            <DotTrio />
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontFamily: 'Sora, sans-serif', color: C.purple }} className="text-xs font-black uppercase tracking-widest mb-4">
              Navigate
            </p>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map(link => (
                <Link key={link.href} to={link.href} style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-sm hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: 'Sora, sans-serif', color: C.purple }} className="text-xs font-black uppercase tracking-widest mb-4">
              Get In Touch
            </p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${content.nav.email}`} style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-sm hover:text-white transition-colors flex items-center gap-2">
                <Mail size={14} /> {content.nav.email}
              </a>
              <a href="https://instagram.com/thesketchystudio" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-sm hover:text-white transition-colors flex items-center gap-2">
                <Instagram size={14} /> {content.nav.instagram}
              </a>
              <a href={`tel:${content.nav.phone}`} style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-sm hover:text-white transition-colors flex items-center gap-2">
                <Phone size={14} /> {content.nav.phone}
              </a>
              <motion.button onClick={() => navigate('/contact')} whileHover={{ x: 4 }} style={{ color: C.purple, fontFamily: 'Sora, sans-serif' }} className="text-sm font-black flex items-center gap-1 mt-2">
                Start a Project <ArrowUpRight size={14} />
              </motion.button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${C.surface}` }} className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40` }} className="text-xs">
            © {new Date().getFullYear()} The Sketchy Studio. All rights reserved.
          </p>
          <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40` }} className="text-xs">
            Built with obsessive attention to detail.
          </p>
        </div>
      </div>

      {/* ── Cat — tiny easter egg, bottom-right corner, facing left ── */}
      <motion.div
        style={{ position: 'absolute', bottom: 0, right: 24, width: 96, pointerEvents: 'none', userSelect: 'none', zIndex: 2 }}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src="/cat-sit.png"
          alt=""
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '100%', height: 'auto', display: 'block', scaleX: -1, filter: 'drop-shadow(0 0 10px rgba(155,92,232,0.28))' }}
        />
      </motion.div>
    </footer>
  );
}

// Scroll to top whenever the route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// Floating edit mode indicator — only visible to team members in edit mode
function EditModeBadge() {
  const { editMode, toggleEditMode, syncStatus } = useEdit();
  const navigate = useNavigate();
  if (!editMode) return null;

  const statusLabel = syncStatus === 'saving' ? 'Saving…' : syncStatus === 'saved' ? 'Saved ✓' : syncStatus === 'error' ? 'Error ✗' : 'Live editing';
  const statusColor = syncStatus === 'saving' ? C.mustard : syncStatus === 'saved' ? C.lime : syncStatus === 'error' ? '#FF4040' : C.mint;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        zIndex: 9998, display: 'flex', alignItems: 'center', gap: 10,
        backgroundColor: C.void, border: `1px solid ${C.purple}50`,
        borderRadius: 100, padding: '10px 18px',
        boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px ${C.purple}22`,
      }}
    >
      {/* Pulse dot */}
      <motion.span
        animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: statusColor, flexShrink: 0 }}
      />
      <PenLine size={13} color={C.purple} />
      <span style={{ fontFamily: 'Sora, sans-serif', color: C.cream, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, whiteSpace: 'nowrap' }}>
        Edit Mode
      </span>
      <span style={{ fontFamily: 'Sora, sans-serif', color: statusColor, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, minWidth: 56, textAlign: 'center' }}>
        {statusLabel}
      </span>
      {/* Divider */}
      <span style={{ width: 1, height: 14, backgroundColor: `${C.cream}18`, flexShrink: 0 }} />
      <motion.button
        onClick={() => navigate('/studio')}
        whileHover={{ color: C.purple }}
        style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50`, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        Studio
      </motion.button>
      <motion.button
        onClick={() => { lockStudioSession(); toggleEditMode(); }}
        whileHover={{ color: '#FF4040' }}
        style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}40`, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        Exit
      </motion.button>
    </motion.div>
  );
}

// Page layout wrapper
export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <CursorGlow />
      <EditKeyListener />
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <EditPanel />
      <EditModeBadge />
    </>
  );
}
