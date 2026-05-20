import { motion, useMotionValue, useTransform, useInView, useScroll, useSpring } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

// Brand colors
export const C = {
  pink: '#FF6B9D',
  yellow: '#FFE500',
  cyan: '#00F5D4',
  purple: '#9B5CE8',
  void: '#0D0B10',
  cream: '#FDFCFE',
  cardDark: '#1C1926',
  surface: '#2A2733',
};

// SVG Squiggle Underline
export function Squiggle({ color = C.pink, width = 200, className = '' }: { color?: string; width?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <svg ref={ref} width={width} height={18} viewBox={`0 0 ${width} 18`} fill="none" className={`overflow-visible ${className}`} aria-hidden>
      <motion.path
        d={`M4,10 Q${width * 0.15},2 ${width * 0.3},10 T${width * 0.6},10 T${width * 0.9},10 T${width},10`}
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      />
    </svg>
  );
}

// Section label badge
export function SectionLabel({ text, color = C.pink, rotate = -1, className = '' }: { text: string; color?: string; rotate?: number; className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, type: 'spring', bounce: 0.4 }}
      style={{
        backgroundColor: color,
        rotate: `${rotate}deg`,
        fontFamily: 'Sora, sans-serif',
        display: 'inline-block',
      }}
      className={`px-3 py-1.5 rounded-lg text-[#0D0B10] text-xs uppercase tracking-wider font-black ${className}`}
    >
      {text}
    </motion.span>
  );
}

// Sticker badge (floating)
export function Sticker({ emoji, text, color = C.yellow, rotate = 2, className = '' }: {
  emoji: string; text: string; color?: string; rotate?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: rotate - 10 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true }}
      transition={{ type: 'spring', bounce: 0.6, duration: 0.6, delay: 0.4 }}
      whileHover={{ scale: 1.1, rotate: rotate * -0.5 }}
      style={{ backgroundColor: color, fontFamily: 'Sora, sans-serif', rotate: `${rotate}deg` }}
      className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-[#0D0B10] shadow-lg ${className}`}
    >
      {emoji} {text}
    </motion.div>
  );
}

// Callout box
export function Callout({ children, color = C.purple, rotate = -1, className = '' }: {
  children: React.ReactNode; color?: string; rotate?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: `${color}18`,
        borderColor: color,
        rotate: `${rotate}deg`,
      }}
      className={`border-2 rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Animated section wrapper
export function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Tilt card
export function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Floating particles background
export function FloatingOrbs({ dark = true }: { dark?: boolean }) {
  const orbs = [
    { color: C.purple, size: 400, x: '10%', y: '20%', duration: 8, delay: 0 },
    { color: C.pink, size: 300, x: '70%', y: '10%', duration: 10, delay: 2 },
    { color: C.cyan, size: 250, x: '50%', y: '70%', duration: 12, delay: 4 },
    { color: C.yellow, size: 200, x: '85%', y: '60%', duration: 9, delay: 1 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
          style={{
            position: 'absolute',
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: orb.color,
            opacity: dark ? 0.12 : 0.08,
            filter: 'blur(80px)',
          }}
        />
      ))}
    </div>
  );
}

// Cursor glow effect
export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <motion.div
      animate={{ x: pos.x - 200, y: pos.y - 200 }}
      transition={{ type: 'spring', stiffness: 150, damping: 30 }}
      style={{
        position: 'fixed',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${C.purple}20 0%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 0,
        top: 0,
        left: 0,
      }}
    />
  );
}

// Dot trio decoration
export function DotTrio({ colors = [C.pink, C.yellow, C.cyan] }: { colors?: string[] }) {
  return (
    <div className="flex gap-2 items-center">
      {colors.map((c, i) => (
        <motion.div
          key={i}
          style={{ backgroundColor: c, rotate: `${i * 15 - 15}deg` }}
          className="w-3 h-3 rounded-full"
          animate={{ rotate: [i * 15 - 15, i * 15 + 10, i * 15 - 15] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}

// Big CTA button
export function CTAButton({ children, onClick, variant = 'primary', className = '' }: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        fontFamily: 'Sora, sans-serif',
        backgroundColor: variant === 'primary' ? C.pink : 'transparent',
        color: variant === 'primary' ? '#0D0B10' : C.pink,
        borderColor: C.pink,
      }}
      className={`px-6 py-3 rounded-full font-black text-sm uppercase tracking-wide border-2 shadow-lg ${className}`}
    >
      {children}
    </motion.button>
  );
}

// Page number
export function PageNumber({ num, name }: { num: string; name: string }) {
  return (
    <div style={{ fontFamily: 'Sora, sans-serif', color: C.cream, opacity: 0.3 }} className="text-sm">
      {num} — {name}
    </div>
  );
}

// Studio watermark
export function StudioMark({ dark = true }: { dark?: boolean }) {
  return (
    <span
      style={{ fontFamily: 'Sora, sans-serif', color: C.purple }}
      className="text-xs font-black tracking-widest uppercase"
    >
      The Sketchy Studio
    </span>
  );
}

// Gradient text
export function GradientText({ children, from = C.pink, to = C.purple, className = '' }: {
  children: React.ReactNode; from?: string; to?: string; className?: string;
}) {
  return (
    <span
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
      className={className}
    >
      {children}
    </span>
  );
}

// Magnetic button
export function MagneticButton({ children, className = '', onClick }: {
  children: React.ReactNode; className?: string; onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function handleMouse(e: React.MouseEvent<HTMLButtonElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  }

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// Text reveal animation - stagger each word
export function WordReveal({ text, className = '', delay = 0 }: {
  text: string; className?: string; delay?: number;
}) {
  const words = text.split(' ');
  return (
    <span className={className} style={{ display: 'inline', overflow: 'hidden' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Noise texture overlay
export function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
        opacity: 0.4,
      }}
    />
  );
}

// Real CountUp — animates from 0 to the number in the value string
export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [displayed, setDisplayed] = useState(() => {
    const m = value.match(/^(\d+)(.*)$/);
    return m ? `0${m[2]}` : value;
  });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isInView) return;
    const m = value.match(/^(\d+)(.*)$/);
    if (!m) { setDisplayed(value); return; }
    const target = parseInt(m[1], 10);
    const suffix = m[2];
    const duration = 1600;
    const start = performance.now();

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplayed(`${Math.round(eased * target)}${suffix}`);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, value]);

  return <span ref={ref} className={className}>{displayed}</span>;
}

// Animated counter (legacy alias)
export function AnimatedNumber({ value, suffix = '' }: { value: string; suffix?: string }) {
  return <CountUp value={`${value}${suffix}`} />;
}

// Scroll progress bar — thin line at top of viewport
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: C.pink,
        transformOrigin: 'left',
        zIndex: 9999,
      }}
    />
  );
}