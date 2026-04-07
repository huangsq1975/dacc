import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navigation from '../../components/Navigation'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<FormStatus>('idle')

  const submit = async (data: Record<string, string>) => {
    setStatus('submitting')
    const body = new URLSearchParams(data)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (res.ok) {
        setStatus('success')
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        throw new Error('Request failed')
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return { status, submit }
}

function StatusMessage({ status }: { status: FormStatus }) {
  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3">
        <i className="ri-checkbox-circle-line text-xl flex-shrink-0"></i>
        <p className="text-sm font-inter font-medium">Message sent successfully! We'll be in touch soon.</p>
      </div>
    )
  }
  if (status === 'error') {
    return (
      <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3">
        <i className="ri-error-warning-line text-xl flex-shrink-0"></i>
        <p className="text-sm font-inter font-medium">Something went wrong. Please try again or email us directly.</p>
      </div>
    )
  }
  return null
}

function FormField({
  label, id, type = 'text', required = false, placeholder, value, onChange, className = ''
}: {
  label: string; id: string; type?: string; required?: boolean
  placeholder?: string; value: string; onChange: (v: string) => void; className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-inter font-semibold text-navy-900 mb-2">
        {label} {required && <span className="text-tfgold">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="form-input w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy-900 font-inter text-sm placeholder:text-gray-400 focus:outline-none transition-all"
      />
    </div>
  )
}

function TextAreaField({
  label, id, required = false, placeholder, value, onChange, rows = 4
}: {
  label: string; id: string; required?: boolean
  placeholder?: string; value: string; onChange: (v: string) => void; rows?: number
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-inter font-semibold text-navy-900 mb-2">
        {label} {required && <span className="text-tfgold">*</span>}
      </label>
      <textarea
        id={id}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={rows}
        className="form-input w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy-900 font-inter text-sm placeholder:text-gray-400 focus:outline-none transition-all resize-none"
      />
    </div>
  )
}

export default function Contact() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<'contact' | 'council' | 'waitlist'>('contact')

  // Contact form
  const [contactForm, setContactForm] = useState({ name: '', email: '', company: '', message: '' })
  const contactSubmit = useFormSubmit('https://formspree.io/f/placeholder-contact')

  // Council form
  const [councilForm, setCouncilForm] = useState({ name: '', email: '', organization: '', role: '', message: '' })
  const councilSubmit = useFormSubmit('https://formspree.io/f/placeholder-council')

  // Waitlist form
  const [waitlistForm, setWaitlistForm] = useState({ name: '', email: '', organization: '', interest: '' })
  const waitlistSubmit = useFormSubmit('https://formspree.io/f/placeholder-waitlist')

  // Auto-scroll to section if hash in URL
  useEffect(() => {
    const hash = location.hash
    if (hash === '#waitlist') {
      setActiveTab('waitlist')
      setTimeout(() => {
        document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else if (hash === '#council') {
      setActiveTab('council')
      setTimeout(() => {
        document.getElementById('council-form')?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }, [location.hash])

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await contactSubmit.submit(contactForm)
    if (contactSubmit.status === 'success') {
      setContactForm({ name: '', email: '', company: '', message: '' })
    }
  }

  const handleCouncilSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await councilSubmit.submit(councilForm)
    if (councilSubmit.status === 'success') {
      setCouncilForm({ name: '', email: '', organization: '', role: '', message: '' })
    }
  }

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await waitlistSubmit.submit(waitlistForm)
    if (waitlistSubmit.status === 'success') {
      setWaitlistForm({ name: '', email: '', organization: '', interest: '' })
    }
  }

  const tabs = [
    { id: 'contact' as const, label: 'Contact Us', icon: 'ri-mail-line' },
    { id: 'council' as const, label: 'Join Council', icon: 'ri-government-line' },
    { id: 'waitlist' as const, label: 'dSDR Waitlist', icon: 'ri-token-swap-line' },
  ]

  return (
    <div className="bg-tfblue-verylight min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="bg-hero-pattern pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-tfgold" />
              <span className="text-tfgold text-xs font-inter font-semibold tracking-widest uppercase">Get In Touch</span>
            </div>
            <h1 className="font-playfair text-4xl lg:text-5xl text-white mb-4">Contact</h1>
            <p className="text-white/60 font-inter text-lg leading-relaxed">
              Three ways to connect with the Tokenization Foundation — whether you're curious,
              interested in governance, or ready to join the movement.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: 'ri-mail-line', label: 'Email', value: 'info@tokenizationfoundation.org', href: 'mailto:info@tokenizationfoundation.org' },
              { icon: 'ri-linkedin-box-line', label: 'LinkedIn', value: 'Tokenization Foundation', href: 'https://www.linkedin.com' },
              { icon: 'ri-map-pin-line', label: 'Registered', value: 'United States', href: '' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-tfblue-verylight flex items-center justify-center flex-shrink-0">
                  <i className={`${item.icon} text-tfblue text-lg`}></i>
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-inter">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-inter font-medium text-navy-900 hover:text-tfblue transition-colors">{item.value}</a>
                  ) : (
                    <div className="text-sm font-inter font-medium text-navy-900">{item.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form Area */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">

          {/* Tab Switcher */}
          <div className="flex rounded-2xl bg-white shadow-sm border border-gray-100 p-1.5 mb-10">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-inter font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-gray-500 hover:text-navy-900'
                }`}
              >
                <i className={`${tab.icon} text-base`}></i>
                <span className="hidden sm:block">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Form 1: General Contact */}
          {activeTab === 'contact' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-10">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-tfblue/10 flex items-center justify-center">
                    <i className="ri-mail-send-line text-tfblue text-lg"></i>
                  </div>
                  <h2 className="font-playfair text-2xl text-navy-900">Contact Us</h2>
                </div>
                <p className="text-gray-500 font-inter text-sm leading-relaxed">
                  Have a question, media inquiry, or partnership idea? We'd love to hear from you.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    label="Full Name" id="c-name" required
                    placeholder="Jane Smith"
                    value={contactForm.name}
                    onChange={v => setContactForm(p => ({ ...p, name: v }))}
                  />
                  <FormField
                    label="Email Address" id="c-email" type="email" required
                    placeholder="jane@example.com"
                    value={contactForm.email}
                    onChange={v => setContactForm(p => ({ ...p, email: v }))}
                  />
                </div>
                <FormField
                  label="Organization" id="c-company"
                  placeholder="Your organization (optional)"
                  value={contactForm.company}
                  onChange={v => setContactForm(p => ({ ...p, company: v }))}
                />
                <TextAreaField
                  label="Message" id="c-message" required
                  placeholder="Tell us how we can help..."
                  value={contactForm.message}
                  onChange={v => setContactForm(p => ({ ...p, message: v }))}
                  rows={5}
                />

                <StatusMessage status={contactSubmit.status} />

                <button
                  type="submit"
                  disabled={contactSubmit.status === 'submitting'}
                  className="w-full py-4 bg-navy-900 text-white rounded-full font-inter font-bold text-sm hover:bg-tfblue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {contactSubmit.status === 'submitting' ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin"></i> Sending...
                    </span>
                  ) : 'Send Message'}
                </button>
              </form>
            </div>
          )}

          {/* Form 2: Council Interest */}
          {activeTab === 'council' && (
            <div id="council-form" className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-10">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-tfgold/10 flex items-center justify-center">
                    <i className="ri-government-line text-tfgold text-lg"></i>
                  </div>
                  <h2 className="font-playfair text-2xl text-navy-900">Join Our Governing Council</h2>
                </div>
                <p className="text-gray-500 font-inter text-sm leading-relaxed">
                  The Governing Council guides our network's oversight, stability, and global adoption.
                  Institutions and organizations interested in shaping the future of humanitarian infrastructure
                  are invited to express interest.
                </p>
              </div>

              <div className="bg-tfblue-verylight rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <i className="ri-information-line text-tfblue text-lg flex-shrink-0 mt-0.5"></i>
                  <p className="text-tfblue text-xs font-inter leading-relaxed">
                    Council membership is open to qualified institutions, NGOs, governmental bodies,
                    and financial organizations aligned with our mission. Membership is reviewed by
                    the founding council.
                  </p>
                </div>
              </div>

              <form onSubmit={handleCouncilSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    label="Your Name" id="co-name" required
                    placeholder="Jane Smith"
                    value={councilForm.name}
                    onChange={v => setCouncilForm(p => ({ ...p, name: v }))}
                  />
                  <FormField
                    label="Email Address" id="co-email" type="email" required
                    placeholder="jane@organization.org"
                    value={councilForm.email}
                    onChange={v => setCouncilForm(p => ({ ...p, email: v }))}
                  />
                </div>
                <FormField
                  label="Organization Name" id="co-org" required
                  placeholder="e.g. UNICEF, World Bank, Fidelity"
                  value={councilForm.organization}
                  onChange={v => setCouncilForm(p => ({ ...p, organization: v }))}
                />
                <FormField
                  label="Your Role / Title" id="co-role" required
                  placeholder="e.g. Chief Strategy Officer"
                  value={councilForm.role}
                  onChange={v => setCouncilForm(p => ({ ...p, role: v }))}
                />
                <TextAreaField
                  label="Why is your organization interested?" id="co-message" required
                  placeholder="Please describe your organization's mission and why you're interested in joining the Governing Council..."
                  value={councilForm.message}
                  onChange={v => setCouncilForm(p => ({ ...p, message: v }))}
                  rows={5}
                />

                <StatusMessage status={councilSubmit.status} />

                <button
                  type="submit"
                  disabled={councilSubmit.status === 'submitting'}
                  className="w-full py-4 bg-navy-900 text-white rounded-full font-inter font-bold text-sm hover:bg-tfblue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {councilSubmit.status === 'submitting' ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin"></i> Submitting...
                    </span>
                  ) : 'Express Council Interest'}
                </button>
              </form>
            </div>
          )}

          {/* Form 3: dSDR Token Waitlist */}
          {activeTab === 'waitlist' && (
            <div id="waitlist" className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-10">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-tfgold/10 flex items-center justify-center">
                    <i className="ri-token-swap-line text-tfgold text-lg"></i>
                  </div>
                  <h2 className="font-playfair text-2xl text-navy-900">Join dSDR Token Waitlist</h2>
                </div>
                <p className="text-gray-500 font-inter text-sm leading-relaxed">
                  Be among the first to participate in the dSDR token ecosystem. Register your interest
                  and we'll keep you updated on our launch timeline and pre-sale opportunities.
                </p>
              </div>

              <div className="bg-navy-900 rounded-xl p-5 mb-6">
                <div className="flex items-start gap-3">
                  <i className="ri-shield-line text-tfgold text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="text-white text-xs font-inter font-semibold mb-1">Important Disclosure</p>
                    <p className="text-white/60 text-xs font-inter leading-relaxed">
                      There will be no sale activity on this website. Token sales will be conducted
                      exclusively through licensed platforms such as CoinList. Joining this waitlist
                      does not constitute a purchase or commitment to purchase any tokens.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleWaitlistSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    label="Full Name" id="w-name" required
                    placeholder="Jane Smith"
                    value={waitlistForm.name}
                    onChange={v => setWaitlistForm(p => ({ ...p, name: v }))}
                  />
                  <FormField
                    label="Email Address" id="w-email" type="email" required
                    placeholder="jane@example.com"
                    value={waitlistForm.email}
                    onChange={v => setWaitlistForm(p => ({ ...p, email: v }))}
                  />
                </div>
                <FormField
                  label="Organization (optional)" id="w-org"
                  placeholder="Your company or institution"
                  value={waitlistForm.organization}
                  onChange={v => setWaitlistForm(p => ({ ...p, organization: v }))}
                />
                <div>
                  <label htmlFor="w-interest" className="block text-sm font-inter font-semibold text-navy-900 mb-2">
                    Area of Interest <span className="text-tfgold">*</span>
                  </label>
                  <select
                    id="w-interest"
                    required
                    value={waitlistForm.interest}
                    onChange={e => setWaitlistForm(p => ({ ...p, interest: e.target.value }))}
                    className="form-input w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy-900 font-inter text-sm focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="">Select your primary interest</option>
                    <option value="token-holder">Token Holder / Investor</option>
                    <option value="validator">Validator / Network Participant</option>
                    <option value="partner">Distribution Partner</option>
                    <option value="donor">Donor / Impact Investor</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <StatusMessage status={waitlistSubmit.status} />

                <button
                  type="submit"
                  disabled={waitlistSubmit.status === 'submitting'}
                  className="w-full py-4 bg-tfgold text-navy-900 rounded-full font-inter font-bold text-sm hover:bg-tfgold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {waitlistSubmit.status === 'submitting' ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin text-navy-900"></i> Joining...
                    </span>
                  ) : 'Join dSDR Token Waitlist'}
                </button>
              </form>
            </div>
          )}

          {/* Tab hints */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {tabs.filter(t => t.id !== activeTab).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-200 bg-white hover:border-tfblue/30 hover:bg-tfblue-verylight transition-all group"
              >
                <i className={`${tab.icon} text-gray-400 group-hover:text-tfblue text-xl transition-colors`}></i>
                <span className="text-xs font-inter text-gray-500 group-hover:text-navy-900 transition-colors text-center leading-tight">{tab.label}</span>
              </button>
            ))}
            <button
              onClick={() => navigate('/')}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-200 bg-white hover:border-tfblue/30 hover:bg-tfblue-verylight transition-all group"
            >
              <i className="ri-home-line text-gray-400 group-hover:text-tfblue text-xl transition-colors"></i>
              <span className="text-xs font-inter text-gray-500 group-hover:text-navy-900 transition-colors text-center leading-tight">Back to Home</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-tfgold flex items-center justify-center">
                <span className="text-navy-900 font-bold text-xs font-inter">TF</span>
              </div>
              <span className="text-white/40 text-sm font-inter">Tokenization Foundation</span>
            </div>
            <p className="text-white/25 text-xs font-inter text-center">
              © 2026 Tokenization Foundation. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="/" onClick={e => { e.preventDefault(); navigate('/') }} className="text-white/40 hover:text-tfgold text-sm font-inter transition-colors">Home</a>
              <a href="/approach" onClick={e => { e.preventDefault(); navigate('/approach') }} className="text-white/40 hover:text-tfgold text-sm font-inter transition-colors">Approach</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
