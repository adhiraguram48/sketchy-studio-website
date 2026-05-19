import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { C, FloatingOrbs, Squiggle, SectionLabel, Reveal, Callout, DotTrio, NoiseOverlay } from '../components/SketchyUI';
import { useEdit, EI } from '../context/EditContext';
import { PageLayout } from '../components/Layout';

export default function About() {
  const navigate = useNavigate();
  const { content } = useEdit();

  return (
    <PageLayout>
      {/* Hero */}
      <section style={{ backgroundColor: C.void, paddingTop: 120 }} className="relative overflow-hidden">
        <FloatingOrbs dark />
        <NoiseOverlay />
        <div className="max-w-7xl mx-auto px-6 pb-0 relative z-10">
          <Reveal>
            <SectionLabel text="About Us" color={C.purple} />
            <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95, fontSize: 'clamp(3rem, 8vw, 5.5rem)' }} className="font-black mt-4 mb-6">
              {content.about.headline}
            </h1>
            <Squiggle color={C.purple} width={220} />
          </Reveal>
        </div>

        {/* Full-width studio photo */}
        <div className="relative mt-12 overflow-hidden" style={{ height: 420 }}>
          <EI
            path="about.studioPhoto"
            fallbackSrc="https://images.unsplash.com/photo-1700313084615-a6110cc4f6a3?w=1600&h=600&fit=crop"
            alt="The Sketchy Studio"
            className="w-full h-full object-cover"
          />
          <div style={{ background: `linear-gradient(to bottom, transparent 50%, ${C.void} 100%)` }} className="absolute inset-0" />
        </div>
      </section>

      {/* Studio story */}
      <section style={{ backgroundColor: C.void }} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Reveal>
              <div className="flex flex-col gap-6">
                <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}CC`, lineHeight: 1.8, fontSize: '1.125rem' }}>
                  {content.about.para1}
                </p>
                <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, lineHeight: 1.8 }}>
                  {content.about.para2}
                </p>
                <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, lineHeight: 1.8 }}>
                  {content.about.para3}
                </p>
                <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, lineHeight: 1.8 }}>
                  {content.about.para4}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <Callout color={C.purple} rotate={-1}>
                <p style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, fontSize: '1.5rem', lineHeight: 1.3 }} className="font-black italic mb-4">
                  "Design should earn its keep. Pretty for its own sake doesn't interest us."
                </p>
                <div className="flex items-center gap-2">
                  <DotTrio colors={[C.pink, C.yellow, C.purple]} />
                  <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}60` }} className="text-sm">
                    — Caleb, Founder
                  </span>
                </div>
              </Callout>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The Team */}
      <section style={{ backgroundColor: C.cream }} className="py-24 relative overflow-hidden">
        <div style={{ background: `linear-gradient(135deg, ${C.purple}08 0%, ${C.pink}08 100%)` }} className="absolute inset-0" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="mb-16">
            <SectionLabel text="The Team" color={C.pink} rotate={1} />
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, lineHeight: 0.95 }} className="text-5xl font-black mt-3">
              The people behind it.
            </h2>
            <Squiggle color={C.pink} width={200} />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {content.about.team.map((member, i) => {
              const teamColors = [C.pink, C.purple];
              const color = teamColors[i % teamColors.length];
              return (
                <Reveal key={member.name} delay={i * 0.15}>
                  <div className="flex flex-col gap-6">
                    <div className="relative">
                      <motion.div
                        whileHover={{ rotate: 0, scale: 1.02 }}
                        style={{ rotate: `${i % 2 === 0 ? '-1.5deg' : '1.5deg'}` }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full rounded-2xl shadow-2xl object-cover"
                          style={{ height: 400 }}
                        />
                      </motion.div>
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3 + i, repeat: Infinity }}
                        style={{
                          backgroundColor: C.void,
                          borderColor: color,
                          position: 'absolute',
                          bottom: -20,
                          left: 20,
                          rotate: `${i % 2 === 0 ? '2deg' : '-2deg'}`,
                        }}
                        className="border-2 rounded-xl p-3 shadow-xl"
                      >
                        <div style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream }} className="font-black text-base">
                          {member.name}
                        </div>
                        <div style={{ fontFamily: 'Sora, sans-serif', color }} className="text-xs uppercase tracking-wide">
                          {member.title}
                        </div>
                      </motion.div>
                    </div>
                    <div style={{ paddingTop: 16 }}>
                      <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void }} className="text-2xl font-black mb-1">
                        {member.name}
                      </h3>
                      <p style={{ fontFamily: 'Sora, sans-serif', color }} className="text-xs font-black uppercase tracking-widest mb-4">
                        {member.title}
                      </p>
                      <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}CC`, lineHeight: 1.8 }} className="text-sm">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 text-center">
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.05, y: -2 }}
                style={{ color: C.void, fontFamily: 'Sora, sans-serif', borderColor: `${C.void}40` }}
                className="px-8 py-3 rounded-full font-black text-sm uppercase tracking-wide border-2 flex items-center gap-2 mx-auto"
              >
                Work With Us <ArrowUpRight size={14} />
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section style={{ backgroundColor: C.void }} className="py-24 relative overflow-hidden">
        <FloatingOrbs dark />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="mb-16">
            <SectionLabel text="Our Values" color={C.yellow} />
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95 }} className="text-5xl font-black mt-3">
              What we actually believe.
            </h2>
            <Squiggle color={C.yellow} width={200} />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.about.values.map((value, i) => {
              const colors = [C.pink, C.yellow, C.cyan, C.purple];
              const color = colors[i % colors.length];
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div
                    style={{
                      backgroundColor: C.cardDark,
                      borderColor: color,
                      rotate: `${i % 2 === 0 ? -1 : 1}deg`,
                    }}
                    whileHover={{ rotate: 0, scale: 1.02 }}
                    className="border-2 rounded-2xl p-8"
                  >
                    <div style={{ color, fontFamily: 'Sora, sans-serif' }} className="text-3xl mb-4 font-black">
                      {['✦', '◎', '▲', '◈'][i % 4]}
                    </div>
                    <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream }} className="text-xl font-black mb-3">
                      {value.name}
                    </h3>
                    <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, lineHeight: 1.7 }} className="text-sm">
                      {value.description}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Past clients */}
      <section style={{ backgroundColor: C.cardDark, borderTop: `1px solid ${C.surface}` }} className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-8 text-center">
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}60` }} className="text-sm uppercase tracking-widest">
              Brands We've Built
            </p>
          </Reveal>
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: [0, -800] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="flex gap-16 items-center whitespace-nowrap"
              style={{ width: 'max-content' }}
            >
              {[...content.home.clients, ...content.home.clients].map((client, i) => (
                <span
                  key={i}
                  style={{ fontFamily: 'Fraunces, Georgia, serif', color: `${C.cream}30` }}
                  className="text-2xl font-black uppercase tracking-widest"
                >
                  {client}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: C.cream }} className="py-24 text-center relative overflow-hidden">
        <div style={{ background: `linear-gradient(135deg, ${C.purple}12, ${C.pink}12)` }} className="absolute inset-0" />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <Reveal>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, lineHeight: 0.95 }} className="text-5xl font-black mb-4">
              Think we'd work well together?
            </h2>
            <Squiggle color={C.purple} width={160} className="mx-auto mb-8" />
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05, y: -3 }}
              style={{ backgroundColor: C.void, color: C.cream, fontFamily: 'Sora, sans-serif' }}
              className="px-10 py-4 rounded-full font-black text-sm uppercase tracking-wide shadow-2xl"
            >
              Let's Talk
            </motion.button>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}