import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
type ContactTab = 'contact' | 'council' | 'waitlist'

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

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'px-4 py-2 rounded-full text-sm font-inter font-semibold transition-all border',
        active
          ? 'bg-navy-900 text-white border-navy-900'
          : 'bg-white text-navy-900 border-gray-200 hover:border-navy-900/30 hover:bg-gray-50',
      ].join(' ')}
      aria-pressed={active}
    >
      {children}
    </button>
  )
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
        {label} {required && <span className="text-tfblue">*</span>}
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
        {label} {required && <span className="text-tfblue">*</span>}
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
  const [activeTab, setActiveTab] = useState<ContactTab>('contact')
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    jobTitle: '',
    countryCode: '+1',
    phoneNumber: '',
    companyName: '',
    explore: '',
    details: '',
  })
  const contactSubmit = useFormSubmit('https://formspree.io/f/placeholder-contact')

  const [councilForm, setCouncilForm] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    organization: '',
    role: '',
    interest: '',
  })
  const councilSubmit = useFormSubmit('https://formspree.io/f/placeholder-council')

  const [waitlistForm, setWaitlistForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    organization: '',
    participantType: '',
    allocationRange: '',
    notes: '',
  })
  const waitlistSubmit = useFormSubmit('https://formspree.io/f/placeholder-waitlist')

  // Auto-scroll to section if hash in URL
  useEffect(() => {
    const hash = location.hash
    const nextTab: ContactTab =
      hash === '#waitlist' ? 'waitlist' : hash === '#council' ? 'council' : 'contact'
    setActiveTab(nextTab)
    const targetId = hash === '#waitlist' ? 'waitlist' : hash === '#council' ? 'council' : 'contact-form'
    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
    }, 250)
  }, [location.hash])

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await contactSubmit.submit({
      'First Name': contactForm.firstName,
      'Last Name': contactForm.lastName,
      'Work Email': contactForm.workEmail,
      'Job Title': contactForm.jobTitle,
      'Phone': `${contactForm.countryCode} ${contactForm.phoneNumber}`.trim(),
      'Company Name': contactForm.companyName,
      'What would you like to explore?': contactForm.explore,
      'Write more here, if you’d like': contactForm.details,
    })
    if (contactSubmit.status === 'success') {
      setContactForm({
        firstName: '',
        lastName: '',
        workEmail: '',
        jobTitle: '',
        countryCode: '+1',
        phoneNumber: '',
        companyName: '',
        explore: '',
        details: '',
      })
    }
  }

  const handleCouncilSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await councilSubmit.submit({
      'First Name': councilForm.firstName,
      'Last Name': councilForm.lastName,
      'Work Email': councilForm.workEmail,
      Organization: councilForm.organization,
      Role: councilForm.role,
      'Why do you want to join the council?': councilForm.interest,
    })
    if (councilSubmit.status === 'success') {
      setCouncilForm({
        firstName: '',
        lastName: '',
        workEmail: '',
        organization: '',
        role: '',
        interest: '',
      })
    }
  }

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await waitlistSubmit.submit({
      'First Name': waitlistForm.firstName,
      'Last Name': waitlistForm.lastName,
      Email: waitlistForm.email,
      Country: waitlistForm.country,
      Organization: waitlistForm.organization,
      'Participant Type': waitlistForm.participantType,
      'Expected Allocation': waitlistForm.allocationRange,
      Notes: waitlistForm.notes,
    })
    if (waitlistSubmit.status === 'success') {
      setWaitlistForm({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        organization: '',
        participantType: '',
        allocationRange: '',
        notes: '',
      })
    }
  }

  const exploreOptions = [
    { value: 'Institutional investment', label: 'Institutional investment' },
    { value: 'Easy access to our Token Waitlist and/or Whitelist', label: 'Easy access to our Token Waitlist and/or Whitelist' },
    { value: 'Interest in our Governing Council', label: 'Interest in our Governing Council' },
    { value: 'Media inquiries', label: 'Media inquiries' },
    { value: 'Other', label: 'Other' },
  ]

  return (
    <div className="bg-white min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="bg-[#0071bc] mt-[72px] border-b border-white/10 pt-16 pb-14 lg:pt-20 lg:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="tf-h1 text-white">Contact</h1>
          </div>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: 'ri-mail-line', label: 'Email', value: 'info@thetokenizationfoundation.com', href: 'mailto:info@thetokenizationfoundation.com' },
              { icon: 'ri-linkedin-box-line', label: 'LinkedIn', value: 'Tokenization Foundation', href: 'https://www.linkedin.com/company/tokenization-foundation' },
              { icon: 'ri-map-pin-line', label: 'Registered', value: 'United States', href: '' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-tfblue-verylight flex items-center justify-center flex-shrink-0">
                  <i className={`${item.icon} text-tfblue text-lg`}></i>
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-inter">{item.label}</div>
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
      <section className="tf-section bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Left copy */}
            <div className="lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-px bg-tfgray-section" />
                <span className="text-tfgray-section text-sm font-inter font-semibold tracking-widest uppercase">TF Form Content</span>
              </div>
              <h2 className="tf-headline text-black mb-4">Talk with one of our team members.</h2>
              <p className="tf-body text-navy-900/70 max-w-lg">
                Fill out the form on your right. We&rsquo;ll email you right back.
              </p>

              <div className="mt-8 bg-white rounded-2xl border border-black/10 shadow-sm p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-tfblue-verylight flex items-center justify-center flex-shrink-0">
                    <i className="ri-mail-line text-tfblue text-lg"></i>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-inter">Email</div>
                    <a
                      href="mailto:info@thetokenizationfoundation.com"
                      className="text-sm font-inter font-medium text-navy-900 hover:text-tfblue transition-colors"
                    >
                      info@thetokenizationfoundation.com
                    </a>
                    <p className="mt-2 text-sm text-gray-400 font-inter">
                      Required fields are marked with <span className="text-tfblue font-semibold">*</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div id="contact-form" className="bg-white rounded-2xl shadow-sm border border-black/10 p-8 lg:p-10">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-tfblue/10 flex items-center justify-center">
                    <i className="ri-file-list-3-line text-tfblue text-lg"></i>
                  </div>
                  <h3 className="tf-h3 text-black">
                    {activeTab === 'contact' ? 'Contact Us' : activeTab === 'council' ? 'Join the Council' : 'Join Token Waitlist'}
                  </h3>
                </div>
                <p className="tf-body text-gray-500">
                  {activeTab === 'contact'
                    ? 'Please complete the form below and our team will respond by email.'
                    : activeTab === 'council'
                      ? 'Tell us a bit about you and your organization, and we’ll follow up.'
                      : 'Add your details below to join the token waitlist.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                <TabButton
                  active={activeTab === 'contact'}
                  onClick={() => {
                    setActiveTab('contact')
                    navigate('/contact#contact-form')
                  }}
                >
                  Contact Us
                </TabButton>
                <TabButton
                  active={activeTab === 'council'}
                  onClick={() => {
                    setActiveTab('council')
                    navigate('/contact#council')
                  }}
                >
                  Join Council
                </TabButton>
                <TabButton
                  active={activeTab === 'waitlist'}
                  onClick={() => {
                    setActiveTab('waitlist')
                    navigate('/contact#waitlist')
                  }}
                >
                  Join Token Waitlist
                </TabButton>
              </div>

              {activeTab === 'contact' && (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      label="First Name"
                      id="c-first-name"
                      required
                      placeholder="Jane"
                      value={contactForm.firstName}
                      onChange={v => setContactForm(p => ({ ...p, firstName: v }))}
                    />
                    <FormField
                      label="Last Name"
                      id="c-last-name"
                      required
                      placeholder="Smith"
                      value={contactForm.lastName}
                      onChange={v => setContactForm(p => ({ ...p, lastName: v }))}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      label="Work Email"
                      id="c-work-email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={contactForm.workEmail}
                      onChange={v => setContactForm(p => ({ ...p, workEmail: v }))}
                    />
                    <FormField
                      label="Job Title"
                      id="c-job-title"
                      placeholder="e.g. Director of Partnerships"
                      value={contactForm.jobTitle}
                      onChange={v => setContactForm(p => ({ ...p, jobTitle: v }))}
                    />
                  </div>

                  <div>
                    <label htmlFor="c-phone-number" className="block text-sm font-inter font-semibold text-navy-900 mb-2">
                      Phone number
                    </label>
                    <div className="grid grid-cols-[120px_1fr] gap-3">
                      <select
                        id="c-country-code"
                        value={contactForm.countryCode}
                        onChange={e => setContactForm(p => ({ ...p, countryCode: e.target.value }))}
                        className="form-input w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy-900 font-inter text-sm focus:outline-none transition-all cursor-pointer"
                        aria-label="Country code"
                      >
                        <option value="+1">+1 (US)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+49">+49 (DE)</option>
                        <option value="+33">+33 (FR)</option>
                        <option value="+41">+41 (CH)</option>
                        <option value="+61">+61 (AU)</option>
                        <option value="+65">+65 (SG)</option>
                        <option value="+81">+81 (JP)</option>
                        <option value="+82">+82 (KR)</option>
                        <option value="+86">+86 (CN)</option>
                        <option value="+852">+852 (HK)</option>
                        <option value="+886">+886 (TW)</option>
                        <option value="+971">+971 (AE)</option>
                      </select>
                      <input
                        id="c-phone-number"
                        type="tel"
                        placeholder="Phone number"
                        value={contactForm.phoneNumber}
                        onChange={e => setContactForm(p => ({ ...p, phoneNumber: e.target.value }))}
                        className="form-input w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy-900 font-inter text-sm placeholder:text-gray-400 focus:outline-none transition-all"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-400 font-inter">
                      Drop down country codes - if easy.
                    </p>
                  </div>

                  <FormField
                    label="Company Name"
                    id="c-company-name"
                    placeholder="Company / Organization"
                    value={contactForm.companyName}
                    onChange={v => setContactForm(p => ({ ...p, companyName: v }))}
                  />

                  <div>
                    <label htmlFor="c-explore" className="block text-sm font-inter font-semibold text-navy-900 mb-2">
                      What would you like to explore? <span className="text-tfblue">*</span>
                    </label>
                    <select
                      id="c-explore"
                      required
                      value={contactForm.explore}
                      onChange={e => setContactForm(p => ({ ...p, explore: e.target.value }))}
                      className="form-input w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy-900 font-inter text-sm focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="">Select an option</option>
                      {exploreOptions.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>

                  <TextAreaField
                    label="Write more here, if you’d like"
                    id="c-details"
                    placeholder="Write more here, if you’d like"
                    value={contactForm.details}
                    onChange={v => setContactForm(p => ({ ...p, details: v }))}
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
                        <i className="ri-loader-4-line animate-spin"></i> Submitting...
                      </span>
                    ) : 'Submit'}
                  </button>

                  <p className="text-sm text-gray-400 font-inter">
                    Note: <span className="text-tfblue font-semibold">*</span> fields required to submit.
                  </p>
                </form>
              )}

              {activeTab === 'council' && (
                <form id="council" onSubmit={handleCouncilSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      label="First Name"
                      id="gc-first-name"
                      required
                      placeholder="Jane"
                      value={councilForm.firstName}
                      onChange={v => setCouncilForm(p => ({ ...p, firstName: v }))}
                    />
                    <FormField
                      label="Last Name"
                      id="gc-last-name"
                      required
                      placeholder="Smith"
                      value={councilForm.lastName}
                      onChange={v => setCouncilForm(p => ({ ...p, lastName: v }))}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      label="Work Email"
                      id="gc-work-email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={councilForm.workEmail}
                      onChange={v => setCouncilForm(p => ({ ...p, workEmail: v }))}
                    />
                    <FormField
                      label="Role / Title"
                      id="gc-role"
                      placeholder="e.g. Head of Strategy"
                      value={councilForm.role}
                      onChange={v => setCouncilForm(p => ({ ...p, role: v }))}
                    />
                  </div>

                  <FormField
                    label="Organization"
                    id="gc-organization"
                    placeholder="Company / Organization"
                    value={councilForm.organization}
                    onChange={v => setCouncilForm(p => ({ ...p, organization: v }))}
                  />

                  <TextAreaField
                    label="Why do you want to join the council?"
                    id="gc-interest"
                    required
                    placeholder="Tell us what you’d like to contribute and why you’re interested."
                    value={councilForm.interest}
                    onChange={v => setCouncilForm(p => ({ ...p, interest: v }))}
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
                    ) : 'Submit'}
                  </button>

                  <p className="text-sm text-gray-400 font-inter">
                    Note: <span className="text-tfblue font-semibold">*</span> fields required to submit.
                  </p>
                </form>
              )}

              {activeTab === 'waitlist' && (
                <form id="waitlist" onSubmit={handleWaitlistSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      label="First Name"
                      id="wl-first-name"
                      required
                      placeholder="Jane"
                      value={waitlistForm.firstName}
                      onChange={v => setWaitlistForm(p => ({ ...p, firstName: v }))}
                    />
                    <FormField
                      label="Last Name"
                      id="wl-last-name"
                      required
                      placeholder="Smith"
                      value={waitlistForm.lastName}
                      onChange={v => setWaitlistForm(p => ({ ...p, lastName: v }))}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      label="Email"
                      id="wl-email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={waitlistForm.email}
                      onChange={v => setWaitlistForm(p => ({ ...p, email: v }))}
                    />
                    <FormField
                      label="Country / Region"
                      id="wl-country"
                      required
                      placeholder="United States"
                      value={waitlistForm.country}
                      onChange={v => setWaitlistForm(p => ({ ...p, country: v }))}
                    />
                  </div>

                  <FormField
                    label="Organization (optional)"
                    id="wl-organization"
                    placeholder="Company / Organization"
                    value={waitlistForm.organization}
                    onChange={v => setWaitlistForm(p => ({ ...p, organization: v }))}
                  />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="wl-participant-type" className="block text-sm font-inter font-semibold text-navy-900 mb-2">
                        Participant Type <span className="text-tfblue">*</span>
                      </label>
                      <select
                        id="wl-participant-type"
                        required
                        value={waitlistForm.participantType}
                        onChange={e => setWaitlistForm(p => ({ ...p, participantType: e.target.value }))}
                        className="form-input w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy-900 font-inter text-sm focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="">Select an option</option>
                        <option value="Institution / Fund">Institution / Fund</option>
                        <option value="Company / Builder">Company / Builder</option>
                        <option value="Advisor / Research">Advisor / Research</option>
                        <option value="Individual">Individual</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="wl-allocation" className="block text-sm font-inter font-semibold text-navy-900 mb-2">
                        Expected Allocation <span className="text-tfblue">*</span>
                      </label>
                      <select
                        id="wl-allocation"
                        required
                        value={waitlistForm.allocationRange}
                        onChange={e => setWaitlistForm(p => ({ ...p, allocationRange: e.target.value }))}
                        className="form-input w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy-900 font-inter text-sm focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="">Select a range</option>
                        <option value="&lt;$10k">&lt;$10k</option>
                        <option value="$10k–$50k">$10k–$50k</option>
                        <option value="$50k–$250k">$50k–$250k</option>
                        <option value="$250k–$1m">$250k–$1m</option>
                        <option value="$1m+">$1m+</option>
                      </select>
                    </div>
                  </div>

                  <TextAreaField
                    label="Notes (optional)"
                    id="wl-notes"
                    placeholder="Anything else you’d like us to know?"
                    value={waitlistForm.notes}
                    onChange={v => setWaitlistForm(p => ({ ...p, notes: v }))}
                    rows={5}
                  />

                  <StatusMessage status={waitlistSubmit.status} />

                  <button
                    type="submit"
                    disabled={waitlistSubmit.status === 'submitting'}
                    className="w-full py-4 bg-navy-900 text-white rounded-full font-inter font-bold text-sm hover:bg-tfblue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {waitlistSubmit.status === 'submitting' ? (
                      <span className="flex items-center justify-center gap-2">
                        <i className="ri-loader-4-line animate-spin"></i> Submitting...
                      </span>
                    ) : 'Join Token Waitlist'}
                  </button>

                  <p className="text-sm text-gray-400 font-inter">
                    Note: <span className="text-tfblue font-semibold">*</span> fields required to submit.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
