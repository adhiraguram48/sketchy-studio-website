import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowUpRight, Check } from 'lucide-react';
import { C, FloatingOrbs, Squiggle, SectionLabel, Reveal, NoiseOverlay } from '../components/SketchyUI';
import { PageLayout } from '../components/Layout';
import { useEdit } from '../context/EditContext';

const SERVICE_VISUAL: Record<string, { color: string; icon: string; tag: string | null }> = {
  branding: { color: C.pink,   icon: '✦', tag: 'Most Popular' },
  websites:  { color: C.yellow, icon: '◎', tag: null },
  videos:    { color: C.cyan,   icon: '▲', tag: null },
  socials:   { color: C.purple, icon: '◈', tag: null },
};

const STEP_COLORS = [C.pink, C.yellow, C.cyan, C.purple];

export default function Services() {
  const navigate = useNavigate();
  const { content } = useEdit();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageLayout>
      {/* Hero */}
      <section style={{ backgroundColor: C.void, paddingTop: 120 }} className="pb-20 relative overflow-hidden">
        <FloatingOrbs dark />
        <NoiseOverlay />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <SectionLabel text="What We Do" color={C.cyan} />
            <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95, fontSize: 'clamp(3rem, 8vw, 5rem)' }} className="font-black mt-4 mb-4">
              How We Help.
            </h1>
            <Squiggle color={C.cyan} width={160} />
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, maxWidth: 600, lineHeight: 1.7 }} className="mt-6 text-lg">
              We don't just make things look good. We build brands and digital presence that work — that attract the right clients, charge premium prices, and grow with the business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section style={{ backgroundColor: C.void }} className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-8">
            {content.services.list.map((service, i) => {
              const v = SERVICE_VISUAL[service.id] ?? { color: C.pink, icon: '✦', tag: null };
              return (
                <Reveal key={service.id} delay={i * 0.08}>
                  <motion.div
                    style={{
                      backgroundColor: i % 2 === 0 ? C.cardDark : C.surface,
                      borderColor: v.color,
                    }}
                    whileHover={{ borderColor: v.color, scale: 1.01 }}
                    className="border-2 rounded-2xl overflow-hidden"
                  >
                    <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      {/* Left */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <motion.div
                            style={{ backgroundColor: v.color }}
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black"
                            aria-hidden
                          >
                            {v.icon}
                          </motion.div>
                          {v.tag && (
                            <span
                              style={{ backgroundColor: v.color, color: C.void, fontFamily: 'Sora, sans-serif' }}
                              className="px-2 py-0.5 rounded-full text-xs font-black uppercase tracking-wide"
                            >
                              {v.tag}
                            </span>
                          )}
                        </div>
                        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream }} className="text-3xl font-black mb-4">
                          {service.name}
                        </h2>
                        <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}CC`, lineHeight: 1.7 }} className="mb-6">
                          {service.description}
                        </p>
                        <div style={{ fontFamily: 'Fraunces, Georgia, serif', color: v.color }} className="text-2xl font-black mb-4">
                          {service.startingPrice}
                        </div>
                        <div className="flex gap-3 flex-wrap">
                          <motion.button
                            onClick={() => navigate('/contact')}
                            whileHover={{ scale: 1.05, y: -2 }}
                            style={{ backgroundColor: v.color, color: C.void, fontFamily: 'Sora, sans-serif' }}
                            className="px-6 py-2 rounded-full font-black text-sm uppercase tracking-wide"
                          >
                            Get a Quote
                          </motion.button>
                          <motion.button
                            onClick={() => navigate(service.linkedCaseStudy)}
                            whileHover={{ x: 4 }}
                            style={{ color: v.color, fontFamily: 'Sora, sans-serif' }}
                            className="text-sm font-black flex items-center gap-1"
                          >
                            {service.linkedCaseStudyLabel} <ArrowUpRight size={14} />
                          </motion.button>
                        </div>
                      </div>

                      {/* Right - deliverables */}
                      <div>
                        <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}60` }} className="text-xs uppercase tracking-widest mb-4">
                          What's Included
                        </p>
                        <ul className="flex flex-col gap-3">
                          {service.deliverables.map((item, j) => (
                            <motion.li
                              key={j}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: j * 0.05 }}
                              className="flex items-start gap-3"
                            >
                              <div
                                style={{ backgroundColor: `${v.color}30`, color: v.color }}
                                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              >
                                <Check size={10} />
                              </div>
                              <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}CC` }} className="text-sm">
                                {item}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section style={{ backgroundColor: C.cream }} className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${C.pink}08 0%, ${C.purple}08 100%)` }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="mb-16 text-center">
            <SectionLabel text="Our Process" color={C.purple} />
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, lineHeight: 0.95 }} className="text-5xl font-black mt-3">
              How we work.
            </h2>
            <Squiggle color={C.purple} width={160} className="mx-auto mt-2" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.services.process.map((step, i) => {
              const color = STEP_COLORS[i % STEP_COLORS.length];
              return (
                <Reveal key={step.step} delay={i * 0.1}>
                  <motion.div
                    style={{
                      backgroundColor: C.void,
                      borderColor: color,
                      rotate: `${i % 2 === 0 ? -1 : 1}deg`,
                    }}
                    whileHover={{ rotate: 0, scale: 1.03 }}
                    className="border-2 rounded-2xl p-6 relative"
                  >
                    <div
                      style={{
                        fontFamily: 'Sora, sans-serif',
                        color: `${C.cream}30`,
                        position: 'absolute',
                        top: 16,
                        right: 20,
                        fontSize: '2rem',
                      }}
                      className="font-black"
                    >
                      {step.step}
                    </div>
                    <div
                      style={{ backgroundColor: color }}
                      className="w-11 h-11 rounded-xl mb-4 flex items-center justify-center"
                    >
                      <span className="text-black font-black">{parseInt(step.step)}</span>
                    </div>
                    <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream }} className="text-xl font-black mb-3">
                      {step.name}
                    </h3>
                    <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, lineHeight: 1.6 }} className="text-sm">
                      {step.description}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ backgroundColor: C.void }} className="py-24 relative overflow-hidden">
        <FloatingOrbs dark />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <Reveal className="mb-12">
            <SectionLabel text="FAQs" color={C.yellow} rotate={1} />
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95 }} className="text-4xl font-black mt-3">
              Questions answered.
            </h2>
            <Squiggle color={C.yellow} width={140} />
          </Reveal>

          <div className="flex flex-col gap-2">
            {content.services.faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <motion.div
                  style={{ backgroundColor: C.cardDark, borderColor: openFaq === i ? C.purple : C.surface }}
                  className="border-2 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <span style={{ fontFamily: 'Sora, sans-serif', color: C.cream }} className="font-black text-sm pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      style={{ color: C.purple }}
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div
                          style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}CC`, lineHeight: 1.7, borderTop: `1px solid ${C.surface}` }}
                          className="px-6 py-4 text-sm"
                        >
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: C.cream }} className="py-24 text-center relative overflow-hidden">
        <div style={{ background: `linear-gradient(135deg, ${C.pink}15, ${C.purple}15)` }} className="absolute inset-0" />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <Reveal>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.void, lineHeight: 0.95 }} className="text-5xl font-black mb-4">
              Ready to get started?
            </h2>
            <Squiggle color={C.pink} width={160} className="mx-auto mb-6" />
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.void}80`, lineHeight: 1.6 }} className="mb-8">
              Book a free 30-minute discovery call. No pressure, no pitch. Just an honest conversation about what you need.
            </p>
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{ backgroundColor: C.void, color: C.cream, fontFamily: 'Sora, sans-serif' }}
              className="px-10 py-4 rounded-full font-black text-sm uppercase tracking-wide shadow-2xl"
            >
              Book a Call
            </motion.button>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
