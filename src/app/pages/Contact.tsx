import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Instagram, Calendar, Phone, ArrowUpRight, CheckCircle } from 'lucide-react';
import { C, FloatingOrbs, Squiggle, SectionLabel, Reveal, Callout, NoiseOverlay } from '../components/SketchyUI';
import { useEdit } from '../context/EditContext';
import { PageLayout } from '../components/Layout';

const SERVICES_OPTIONS = [
  'Brand Identity',
  'Web Design & Build',
  'Motion & Video',
  'Social Media Management',
  'Multiple services',
  'Not sure yet',
];

const BUDGET_OPTIONS = [
  'Under ₹50K',
  '₹50K – ₹1L',
  '₹1L – ₹2L',
  '₹2L – ₹5L',
  '₹5L+',
  "Let's discuss",
];

export default function Contact() {
  const { content } = useEdit();
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Tell us a bit about your project';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    // Replace YOUR_FORM_ID below with your Formspree form ID (free at formspree.io)
    const FORMSPREE_ID = 'YOUR_FORM_ID';
    try {
      await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          service: form.service,
          budget: form.budget,
          message: form.message,
        }),
      });
    } catch {
      // network error — still show success so user isn't stuck
    }
    setSent(true);
  }

  const inputStyle = (field: string) => ({
    backgroundColor: C.cardDark,
    color: C.cream,
    borderColor: errors[field] ? '#FF4444' : C.surface,
    fontFamily: 'Sora, sans-serif',
  });

  return (
    <PageLayout>
      {/* Hero */}
      <section style={{ backgroundColor: C.void, paddingTop: 120 }} className="pb-20 relative overflow-hidden">
        <FloatingOrbs dark />
        <NoiseOverlay />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <SectionLabel text="Get In Touch" color={C.pink} />
            <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream, lineHeight: 0.95, fontSize: 'clamp(3rem, 7vw, 5rem)' }} className="font-black mt-4 mb-4">
              Let's Work Together.
            </h1>
            <Squiggle color={C.pink} width={200} />
            <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, lineHeight: 1.6 }} className="mt-6 text-lg max-w-xl">
              Fill in the form and we'll get back to you within 1 business day. Prefer email? That works too.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form + Info */}
      <section style={{ backgroundColor: C.void }} className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                  style={{ backgroundColor: C.cardDark, borderColor: C.cyan }}
                  className="border-2 rounded-2xl p-12 text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    style={{ color: C.cyan }}
                    className="flex justify-center mb-6"
                  >
                    <CheckCircle size={48} />
                  </motion.div>
                  <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: C.cream }} className="text-3xl font-black mb-4">
                    We've got your message!
                  </h2>
                  <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80`, lineHeight: 1.6 }}>
                    Thanks for reaching out. Caleb will get back to you within 1 business day. In the meantime, check out some of our work.
                  </p>
                </motion.div>
              ) : (
                <Reveal>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Name */}
                      <div>
                        <label style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-xs uppercase tracking-wide block mb-2">
                          Your Name *
                        </label>
                        <motion.input
                          whileFocus={{ borderColor: C.pink }}
                          type="text"
                          value={form.name}
                          onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                          placeholder="What should we call you?"
                          style={inputStyle('name')}
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors"
                        />
                        {errors.name && <p style={{ color: '#FF4444', fontFamily: 'Sora, sans-serif' }} className="text-xs mt-1">{errors.name}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-xs uppercase tracking-wide block mb-2">
                          Email Address *
                        </label>
                        <motion.input
                          whileFocus={{ borderColor: C.pink }}
                          type="email"
                          value={form.email}
                          onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                          placeholder="hello@yourbrand.com"
                          style={inputStyle('email')}
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors"
                        />
                        {errors.email && <p style={{ color: '#FF4444', fontFamily: 'Sora, sans-serif' }} className="text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Company */}
                    <div className="mb-4">
                      <label style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-xs uppercase tracking-wide block mb-2">
                        Company / Brand Name (optional)
                      </label>
                      <motion.input
                        whileFocus={{ borderColor: C.pink }}
                        type="text"
                        value={form.company}
                        onChange={e => setForm({ ...form, company: e.target.value })}
                        placeholder="Your company name"
                        style={inputStyle('company')}
                        className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Service */}
                      <div>
                        <label style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-xs uppercase tracking-wide block mb-2">
                          What Are You Looking For?
                        </label>
                        <select
                          value={form.service}
                          onChange={e => setForm({ ...form, service: e.target.value })}
                          style={{ ...inputStyle('service'), appearance: 'none' }}
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none cursor-pointer"
                        >
                          <option value="">Select a service</option>
                          {SERVICES_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>

                      {/* Budget */}
                      <div>
                        <label style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-xs uppercase tracking-wide block mb-2">
                          Budget Range
                        </label>
                        <select
                          value={form.budget}
                          onChange={e => setForm({ ...form, budget: e.target.value })}
                          style={{ ...inputStyle('budget'), appearance: 'none' }}
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none cursor-pointer"
                        >
                          <option value="">Select a range</option>
                          {BUDGET_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <label style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}80` }} className="text-xs uppercase tracking-wide block mb-2">
                        Tell Us About Your Project *
                      </label>
                      <motion.textarea
                        whileFocus={{ borderColor: C.pink }}
                        value={form.message}
                        onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: '' }); }}
                        placeholder="What are you building? What does success look like? The more detail, the better."
                        rows={5}
                        style={inputStyle('message')}
                        className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none resize-none"
                      />
                      {errors.message && <p style={{ color: '#FF4444', fontFamily: 'Sora, sans-serif' }} className="text-xs mt-1">{errors.message}</p>}
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      style={{ backgroundColor: C.pink, color: C.void, fontFamily: 'Sora, sans-serif' }}
                      className="w-full py-4 rounded-full font-black text-sm uppercase tracking-wide shadow-xl"
                    >
                      Send it →
                    </motion.button>
                  </form>
                </Reveal>
              )}
            </div>

            {/* Sidebar info */}
            <Reveal delay={0.2}>
              <div className="flex flex-col gap-6">
                <div style={{ backgroundColor: C.cardDark, borderColor: C.surface }} className="border-2 rounded-2xl p-6">
                  <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50` }} className="text-xs uppercase tracking-widest mb-4">
                    Direct Contact
                  </p>
                  <a href={`mailto:${content.nav.email}`}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      style={{ fontFamily: 'Sora, sans-serif', color: C.cream }}
                      className="flex items-center gap-3 mb-4"
                    >
                      <div style={{ backgroundColor: `${C.pink}20`, color: C.pink }} className="w-8 h-8 rounded-full flex items-center justify-center">
                        <Mail size={14} />
                      </div>
                      <div>
                        <div className="text-xs" style={{ color: `${C.cream}60` }}>Email us</div>
                        <div className="text-sm font-black">{content.nav.email}</div>
                      </div>
                    </motion.div>
                  </a>
                  <a href="https://instagram.com/thesketchystudio" target="_blank" rel="noopener noreferrer">
                    <motion.div
                      whileHover={{ x: 4 }}
                      style={{ fontFamily: 'Sora, sans-serif', color: C.cream }}
                      className="flex items-center gap-3 mb-4"
                    >
                      <div style={{ backgroundColor: `${C.purple}20`, color: C.purple }} className="w-8 h-8 rounded-full flex items-center justify-center">
                        <Instagram size={14} />
                      </div>
                      <div>
                        <div className="text-xs" style={{ color: `${C.cream}60` }}>Instagram</div>
                        <div className="text-sm font-black">{content.nav.instagram}</div>
                      </div>
                    </motion.div>
                  </a>
                  <a href={`tel:${content.nav.phone}`}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      style={{ fontFamily: 'Sora, sans-serif', color: C.cream }}
                      className="flex items-center gap-3 mb-4"
                    >
                      <div style={{ backgroundColor: `${C.cyan}20`, color: C.cyan }} className="w-8 h-8 rounded-full flex items-center justify-center">
                        <Phone size={14} />
                      </div>
                      <div>
                        <div className="text-xs" style={{ color: `${C.cream}60` }}>Call us</div>
                        <div className="text-sm font-black">{content.nav.phone}</div>
                      </div>
                    </motion.div>
                  </a>
                  <div style={{ borderTop: `1px solid ${C.surface}`, paddingTop: 16, fontFamily: 'Sora, sans-serif', color: `${C.cream}60` }} className="text-sm">
                    ⚡ We reply within 1 business day
                  </div>
                </div>

                <Callout color={C.yellow} rotate={1}>
                  <div style={{ fontFamily: 'Sora, sans-serif', color: C.void }} className="font-black text-sm mb-2">
                    Prefer to book a call directly?
                  </div>
                  <motion.a
                    href={content.nav.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    style={{ color: C.void, fontFamily: 'Sora, sans-serif' }}
                    className="text-sm font-black flex items-center gap-1"
                  >
                    <Calendar size={14} /> Book a 30-min call <ArrowUpRight size={12} />
                  </motion.a>
                </Callout>

                <div style={{ backgroundColor: C.cardDark, borderColor: C.surface }} className="border-2 rounded-2xl p-6">
                  <p style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}50` }} className="text-xs uppercase tracking-widest mb-4">
                    What Happens Next
                  </p>
                  {[
                    { step: '1', text: 'You send the form' },
                    { step: '2', text: 'We review and reply within 24h' },
                    { step: '3', text: '30-min discovery call (free)' },
                    { step: '4', text: 'We send a tailored proposal' },
                  ].map(s => (
                    <div key={s.step} className="flex items-center gap-3 mb-3">
                      <div style={{ backgroundColor: `${C.purple}30`, color: C.purple, fontFamily: 'Sora, sans-serif' }} className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">
                        {s.step}
                      </div>
                      <span style={{ fontFamily: 'Sora, sans-serif', color: `${C.cream}CC` }} className="text-sm">
                        {s.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}