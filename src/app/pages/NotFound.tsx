import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { C, FloatingOrbs, Squiggle, NoiseOverlay } from '../components/SketchyUI';
import { PageLayout } from '../components/Layout';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <section
        style={{ backgroundColor: C.void, minHeight: '100vh' }}
        className="flex items-center justify-center relative overflow-hidden"
      >
        <FloatingOrbs dark />
        <NoiseOverlay />

        <div className="text-center relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 3, -3, 0] }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.pink }}
              className="text-[180px] font-black leading-none mb-0"
            >
              404
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1
              style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95 }}
              className="text-4xl font-black mb-4"
            >
              Nothing here.
            </h1>
            <Squiggle color={C.yellow} width={160} className="mx-auto mb-6" />
            <p
              style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, lineHeight: 1.6 }}
              className="mb-10 max-w-sm mx-auto"
            >
              The page you're looking for doesn't exist — or maybe we moved it. Either way, let's get you back on track.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{ backgroundColor: C.pink, color: C.void, fontFamily: 'Sora, sans-serif' }}
                className="px-8 py-4 rounded-full font-black text-sm uppercase tracking-wide shadow-xl"
              >
                Go Home
              </motion.button>
              <motion.button
                onClick={() => navigate('/work')}
                whileHover={{ scale: 1.05, y: -2 }}
                style={{
                  backgroundColor: 'transparent',
                  color: C.cream,
                  borderColor: `${C.cream}30`,
                  fontFamily: 'Sora, sans-serif',
                }}
                className="px-8 py-4 rounded-full font-black text-sm uppercase tracking-wide border-2"
              >
                See Our Work
              </motion.button>
            </div>
          </motion.div>

          {/* Floating decorative elements */}
          {['✦', '◎', '▲', '◈'].map((symbol, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 15, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                position: 'absolute',
                color: [C.pink, C.yellow, C.cyan, C.purple][i],
                fontSize: '3rem',
                userSelect: 'none',
                ...[
                  { top: '20%', left: '10%' },
                  { top: '15%', right: '12%' },
                  { bottom: '25%', left: '8%' },
                  { bottom: '20%', right: '10%' },
                ][i],
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
