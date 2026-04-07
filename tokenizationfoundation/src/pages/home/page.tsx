import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../../components/Navigation'

const SECTION_IDS = ['hero', 'about', 'team', 'problem', 'impact']

const teamMembers = [
  {
    initials: 'S',
    name: 'Serra',
    role: 'Co-Founder',
    bio: 'Visionary leader driving the foundation\'s mission to revolutionize humanitarian aid through blockchain technology and digital innovation.',
    color: '#1a4f8a',
  },
  {
    initials: 'A',
    name: 'Anita',
    role: 'Co-Founder',
    bio: 'Expert in financial systems and digital asset infrastructure with a passion for creating equitable capital distribution at global scale.',
    color: '#2d7dc7',
  },
  {
    initials: 'K',
    name: 'Kerstin',
    role: 'Advisory Board',
    bio: 'Seasoned advisor with deep expertise in international development, governance frameworks, and sustainable impact investment strategies.',
    color: '#0d1f3c',
  },
  {
    initials: 'L',
    name: 'Lynne',
    role: 'Advisory Board',
    bio: 'Specialist in humanitarian operations and UN engagement, bridging the gap between traditional aid delivery and next-generation infrastructure.',
    color: '#122a50',
  },
]

const impactStats = [
  { value: '50–70%', label: 'Faster disbursement of crisis funds', icon: 'ri-time-line' },
  { value: '30–50%', label: 'Reduction in administrative overhead', icon: 'ri-bar-chart-line' },
  { value: '100%', label: 'Real-time transparency and traceability', icon: 'ri-eye-line' },
  { value: '1B+', label: 'People reached globally over five years', icon: 'ri-global-line' },
]

function useIntersectionObserver(ids: string[]) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = elements.indexOf(entry.target as HTMLElement)
            if (idx >= 0) setActiveIndex(idx)
          }
        })
      },
      { threshold: 0.5 }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return activeIndex
}

function AnimatedSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const activeSection = useIntersectionObserver(SECTION_IDS)

  return (
    <div className="bg-navy-900">
      <Navigation
        sectionIds={SECTION_IDS}
        activeSection={activeSection}
      />

      {/* ===== SECTION 1: HERO (Slide 1) ===== */}
      <section
        id="hero"
        className="snap-section bg-hero-pattern flex flex-col justify-center relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-tfblue/10 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-tfgold/5 blur-3xl" />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 lg:pt-0">
          <div className="max-w-4xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-tfgold/30 bg-tfgold/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-tfgold animate-pulse" />
              <span className="text-tfgold text-xs font-inter font-medium tracking-widest uppercase">
                Building the Future of Humanitarian Aid
              </span>
            </div>

            {/* Main headline */}
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-8">
              Reimagining crisis{' '}
              <span className="text-gold-gradient">capital infrastructure</span>
              {' '}— with AI, blockchain, and digital assets
            </h1>

            <p className="text-white/70 font-inter text-lg lg:text-xl leading-relaxed max-w-2xl mb-12">
              So that humanitarian aid is funded instantly, transparently, and at scale.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  navigate('/contact')
                  setTimeout(() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' }), 200)
                }}
                className="px-8 py-4 bg-tfgold text-navy-900 rounded-full font-inter font-bold text-base hover:bg-tfgold-light transition-all duration-300 hover:shadow-lg hover:shadow-tfgold/20 whitespace-nowrap"
              >
                Join dSDR Token Waitlist
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('about')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-8 py-4 border border-white/30 text-white rounded-full font-inter font-medium text-base hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
              >
                Turn your capital into impact
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 text-white/70 font-inter font-medium text-base hover:text-tfgold transition-colors"
              >
                Contact Us <i className="ri-arrow-right-line ml-1"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/30 text-xs font-inter">Scroll</span>
          <i className="ri-arrow-down-line text-white/30 text-xl"></i>
        </div>
      </section>

      {/* ===== SECTION 2: HOW IT ALL STARTED (Slide 2) ===== */}
      <section
        id="about"
        className="snap-section bg-tfblue-verylight flex flex-col justify-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-5">
          <div className="w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle at 70% 50%, #1a4f8a 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-px bg-tfblue" />
                <span className="text-tfblue text-xs font-inter font-semibold tracking-widest uppercase">About Us</span>
              </div>
              <h2 className="font-playfair text-4xl lg:text-5xl text-navy-900 mb-6 leading-tight">
                How It All Started
              </h2>
              <div className="space-y-4 text-gray-600 font-inter text-base lg:text-lg leading-relaxed">
                <p>
                  The Tokenization Foundation was born from a direct engagement with the{' '}
                  <strong className="text-navy-900">United Nations</strong>, which approached{' '}
                  <strong className="text-navy-900">Aegis Trust Company</strong> to explore whether
                  blockchain could solve persistent inefficiencies in crisis-relief funding.
                </p>
                <p>
                  That collaboration revealed a clear and urgent truth: the current system cannot
                  operate at the speed or scale modern crises demand—creating the need for a
                  fundamentally new approach.
                </p>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/approach')}
                  className="inline-flex items-center gap-2 px-7 py-3 bg-navy-900 text-white rounded-full font-inter font-semibold text-sm hover:bg-tfblue transition-colors"
                >
                  Learn Our Approach
                  <i className="ri-arrow-right-line"></i>
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-2 px-7 py-3 border border-navy-900/20 text-navy-900 rounded-full font-inter font-semibold text-sm hover:bg-navy-900/5 transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </AnimatedSection>

            {/* Right: Visual */}
            <AnimatedSection className="delay-200">
              <div className="relative">
                {/* UN Badge */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-tfblue/10 flex items-center justify-center flex-shrink-0">
                      <i className="ri-global-line text-tfblue text-2xl"></i>
                    </div>
                    <div>
                      <div className="font-playfair text-navy-900 text-xl font-semibold">United Nations</div>
                      <div className="text-gray-500 text-sm font-inter mt-1">Founding Partner</div>
                    </div>
                  </div>
                  <div className="h-px bg-gray-100 mb-6" />
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-tfgold/10 flex items-center justify-center flex-shrink-0">
                      <i className="ri-shield-check-line text-tfgold text-2xl"></i>
                    </div>
                    <div>
                      <div className="font-playfair text-navy-900 text-xl font-semibold">Aegis Trust Company</div>
                      <div className="text-gray-500 text-sm font-inter mt-1">Founding Partner</div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-inter">
                      <i className="ri-award-line text-tfgold"></i>
                      <span>Founding Governing Council Members</span>
                    </div>
                  </div>
                </div>

                {/* Floating stat */}
                <div className="absolute -bottom-6 -right-4 bg-navy-900 text-white rounded-2xl px-6 py-4 shadow-2xl">
                  <div className="font-playfair text-2xl font-bold text-tfgold">$1T+</div>
                  <div className="text-xs text-white/60 font-inter mt-1">Crisis funding gap annually</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: MEET THE TEAM (Slide 3) ===== */}
      <section
        id="team"
        className="snap-section bg-navy-800 flex flex-col justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 20%, #2d7dc7 0%, transparent 50%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 lg:py-0">
          <AnimatedSection>
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-tfgold" />
                <span className="text-tfgold text-xs font-inter font-semibold tracking-widest uppercase">Our People</span>
                <div className="w-8 h-px bg-tfgold" />
              </div>
              <h2 className="font-playfair text-4xl lg:text-5xl text-white">Meet The Team</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {teamMembers.map((member, i) => (
              <AnimatedSection key={member.name} className={`delay-${(i + 1) * 100}`}>
                <div className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-tfgold/30 rounded-2xl p-6 transition-all duration-300 text-center">
                  {/* Avatar */}
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-playfair text-2xl font-bold"
                    style={{ background: `linear-gradient(135deg, ${member.color}, #2d7dc7)` }}
                  >
                    {member.initials}
                  </div>
                  <h3 className="font-playfair text-white text-xl mb-1">{member.name}</h3>
                  <div className="text-tfgold text-xs font-inter font-semibold uppercase tracking-wider mb-3">
                    {member.role}
                  </div>
                  <p className="text-white/50 text-xs font-inter leading-relaxed hidden lg:block">
                    {member.bio}
                  </p>
                  <button className="mt-4 text-white/30 hover:text-tfgold transition-colors">
                    <i className="ri-linkedin-box-fill text-xl"></i>
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="delay-500">
            <div className="text-center mt-10">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-7 py-3 bg-tfgold text-navy-900 rounded-full font-inter font-semibold text-sm hover:bg-tfgold-light transition-colors"
              >
                Contact Us
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== SECTION 4: PROBLEM & SOLUTION (Slide 4) ===== */}
      <section
        id="problem"
        className="snap-section flex flex-col lg:flex-row overflow-hidden"
      >
        {/* Left: The Problem */}
        <div className="flex-1 bg-navy-950 flex flex-col justify-center px-8 lg:px-12 py-16 lg:py-0">
          <AnimatedSection>
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                </div>
                <span className="text-red-400 text-xs font-inter font-semibold tracking-widest uppercase">The Problem</span>
              </div>
              <h2 className="font-playfair text-3xl lg:text-4xl text-white mb-6 leading-tight">
                A Broken System In Need Of Reinvention
              </h2>
              <p className="text-white/60 font-inter text-sm lg:text-base mb-8 leading-relaxed">
                The global crisis infrastructure is{' '}
                <span className="text-red-400 font-semibold">fragmented</span>,{' '}
                <span className="text-red-400 font-semibold">delayed</span>, and{' '}
                <span className="text-red-400 font-semibold">inefficient</span>.
              </p>
              <div className="space-y-4">
                {[
                  { icon: 'ri-time-fill', label: 'Disbursement lags up to 20 months in U.S. federal programs' },
                  { icon: 'ri-error-warning-fill', label: '17–30% leakage across traditional aid flows' },
                  { icon: 'ri-lock-fill', label: 'Capital trapped in slow grant cycles' },
                  { icon: 'ri-file-damage-fill', label: 'High NGO administrative burdens & opaque reporting' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <i className={`${item.icon} text-red-400/70 text-lg flex-shrink-0 mt-0.5`}></i>
                    <span className="text-white/50 text-sm font-inter leading-relaxed">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Divider */}
        <div className="hidden lg:flex flex-col items-center justify-center w-16 bg-gradient-to-b from-navy-950 via-tfblue to-navy-800 relative">
          <div className="w-px h-full bg-white/5 absolute" />
          <div className="w-8 h-8 rounded-full bg-tfgold flex items-center justify-center z-10">
            <i className="ri-arrow-right-line text-navy-900 text-sm font-bold"></i>
          </div>
        </div>

        {/* Right: The Solution */}
        <div className="flex-1 bg-tfblue flex flex-col justify-center px-8 lg:px-12 py-16 lg:py-0">
          <AnimatedSection className="delay-200">
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-tfgold/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-tfgold" />
                </div>
                <span className="text-tfgold text-xs font-inter font-semibold tracking-widest uppercase">The Solution</span>
              </div>
              <h2 className="font-playfair text-3xl lg:text-4xl text-white mb-4 leading-tight">
                A Reimagined Model: Programmable Humanitarian Infrastructure
              </h2>
              <p className="text-white/70 font-inter text-sm lg:text-base mb-8 leading-relaxed">
                The Tokenization Foundation replaces fragmented aid systems with a programmable, real-time infrastructure.
              </p>
              <div className="space-y-5">
                {[
                  {
                    icon: 'ri-wallet-3-line',
                    title: 'Direct Digital Delivery',
                    desc: 'Funds tokenized and delivered directly to recipients\' digital wallets',
                  },
                  {
                    icon: 'ri-links-line',
                    title: 'Blockchain Transparency',
                    desc: 'Instant, traceable, and secure transfers via blockchain',
                  },
                  {
                    icon: 'ri-robot-line',
                    title: 'AI Governance',
                    desc: 'Real-time oversight, analytics, and adaptive governance powered by AI',
                  },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-4 bg-white/10 rounded-xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-tfgold/20 flex items-center justify-center flex-shrink-0">
                      <i className={`${item.icon} text-tfgold text-lg`}></i>
                    </div>
                    <div>
                      <div className="text-white font-inter font-semibold text-sm mb-1">{item.title}</div>
                      <div className="text-white/60 text-xs font-inter leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== SECTION 5: IMPACT (Slide 5) ===== */}
      <section
        id="impact"
        className="snap-section bg-impact-pattern flex flex-col justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 lg:py-0">
          <AnimatedSection>
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-tfgold" />
                <span className="text-tfgold text-xs font-inter font-semibold tracking-widest uppercase">Impact</span>
                <div className="w-8 h-px bg-tfgold" />
              </div>
              <h2 className="font-playfair text-4xl lg:text-5xl text-white mb-4">
                Infrastructure Designed To Deliver
              </h2>
              <p className="text-white/50 font-inter text-base max-w-2xl mx-auto">
                Our platform is engineered for measurable, scalable impact across global humanitarian operations.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-12 lg:mb-16">
            {impactStats.map((stat, i) => (
              <AnimatedSection key={stat.value} className={`delay-${i * 100}`}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 text-center hover:border-tfgold/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-tfgold/10 flex items-center justify-center mx-auto mb-4">
                    <i className={`${stat.icon} text-tfgold text-2xl`}></i>
                  </div>
                  <div className="font-playfair text-3xl lg:text-4xl text-tfgold font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-xs lg:text-sm font-inter leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Global reach callout */}
          <AnimatedSection className="delay-400">
            <div className="bg-gradient-to-r from-tfblue/30 to-tfgold/10 border border-tfgold/20 rounded-2xl p-8 lg:p-10 text-center">
              <div className="font-playfair text-3xl lg:text-4xl text-white mb-3">
                Over Five Years
              </div>
              <div className="text-white/70 font-inter text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                The platform is expected to reach{' '}
                <span className="text-tfgold font-bold">over 1 billion people globally</span>,
                while scaling transaction volume into the hundreds of millions annually.
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== SECTION 6: GOVERNING COUNCIL (Slide 6 - flows naturally after snap) ===== */}
      <section id="council" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-tfblue" />
                <span className="text-tfblue text-xs font-inter font-semibold tracking-widest uppercase">Governance</span>
                <div className="w-8 h-px bg-tfblue" />
              </div>
              <h2 className="font-playfair text-3xl lg:text-4xl text-navy-900 mb-4">
                Building The Infrastructure Ecosystem
              </h2>
              <p className="text-gray-500 font-inter text-base max-w-xl mx-auto">
                With Two Initial Founding Governing Council Members
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-3xl mx-auto">
            {[
              {
                name: 'United Nations',
                desc: 'Global leadership in humanitarian coordination and policy, providing governance oversight and international mandate.',
                icon: 'ri-global-line',
                color: '#1a4f8a',
              },
              {
                name: 'Aegis Trust Company',
                desc: 'Expert financial institution specializing in trust administration, asset management, and digital asset custody.',
                icon: 'ri-shield-check-line',
                color: '#c9a55a',
              },
            ].map(member => (
              <AnimatedSection key={member.name}>
                <div className="border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${member.color}15` }}
                  >
                    <i className={`${member.icon} text-3xl`} style={{ color: member.color }}></i>
                  </div>
                  <h3 className="font-playfair text-navy-900 text-xl mb-3">{member.name}</h3>
                  <p className="text-gray-500 text-sm font-inter leading-relaxed">{member.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* As Featured In - hidden until media coverage */}
          {/*
          <div className="text-center mb-16">
            <p className="text-gray-400 text-sm font-inter mb-6">As Featured In</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50">
              CNN, Forbes, CoinDesk logos here once coverage is received
            </div>
          </div>
          */}

          <AnimatedSection>
            <div className="text-center">
              <p className="text-gray-600 font-inter text-base mb-4">
                Interested in joining our Governing Council?
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-7 py-3 bg-navy-900 text-white rounded-full font-inter font-semibold text-sm hover:bg-tfblue transition-colors"
              >
                Express Interest
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== SECTION 7: JOIN THE MOVEMENT (Slide 7) ===== */}
      <section id="join" className="bg-navy-900 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-tfgold" />
              <span className="text-tfgold text-xs font-inter font-semibold tracking-widest uppercase">Get Involved</span>
              <div className="w-8 h-px bg-tfgold" />
            </div>
            <h2 className="font-playfair text-4xl lg:text-5xl text-white mb-6">
              Join The Movement
            </h2>
            <p className="text-white/60 font-inter text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              The Tokenization Foundation invites institutions, partners, and early supporters to
              participate in building a new global standard for humanitarian aid.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  navigate('/contact')
                  setTimeout(() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' }), 200)
                }}
                className="px-8 py-4 bg-tfgold text-navy-900 rounded-full font-inter font-bold text-base hover:bg-tfgold-light transition-all duration-300 hover:shadow-lg hover:shadow-tfgold/20"
              >
                Join dSDR Token Waitlist
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 border border-white/20 text-white rounded-full font-inter font-medium text-base hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-navy-950 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-tfgold flex items-center justify-center">
                  <span className="text-navy-900 font-bold text-xs font-inter">TF</span>
                </div>
                <span className="text-white font-inter font-semibold text-sm">Tokenization Foundation</span>
              </div>
              <p className="text-white/40 text-sm font-inter leading-relaxed">
                Reimagining crisis capital infrastructure with AI, blockchain, and digital assets.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white/60 text-xs font-inter font-semibold uppercase tracking-wider mb-4">Navigation</h4>
              <div className="space-y-2">
                {[
                  { label: 'Approach', href: '/approach' },
                  { label: 'Team', href: '/#team' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'Join dSDR Waitlist', href: '/contact' },
                ].map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-white/40 hover:text-tfgold text-sm font-inter transition-colors"
                    onClick={e => {
                      e.preventDefault()
                      navigate(link.href.split('#')[0] || '/')
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white/60 text-xs font-inter font-semibold uppercase tracking-wider mb-4">Connect</h4>
              <div className="space-y-2">
                <a href="mailto:info@tokenizationfoundation.org" className="block text-white/40 hover:text-tfgold text-sm font-inter transition-colors">
                  info@tokenizationfoundation.org
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/40 hover:text-tfgold text-sm font-inter transition-colors"
                >
                  <i className="ri-linkedin-box-fill text-lg"></i>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8">
            <div className="flex flex-col md:flex-row justify-between gap-4 text-white/25 text-xs font-inter">
              <p>© 2026 Tokenization Foundation. All rights reserved.</p>
              <p className="max-w-xl text-right">
                This website is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities or tokens. Investment in digital assets involves significant risk.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
