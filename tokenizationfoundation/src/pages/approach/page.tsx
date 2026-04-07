import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../../components/Navigation'

function AnimatedSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
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

const ecosystemNodes = [
  { id: 'mmf', label: 'Money Market Fund', icon: 'ri-bank-line', color: '#1a4f8a' },
  { id: 'ai', label: 'AI Technology', icon: 'ri-robot-line', color: '#2d7dc7' },
  { id: 'aegis', label: 'Aegis Trust', icon: 'ri-shield-check-line', color: '#c9a55a' },
  { id: 'mint', label: 'Mint, Custody & Convert Tokens', icon: 'ri-coin-line', color: '#1a4f8a' },
  { id: 'chain', label: 'Blockchain', icon: 'ri-links-line', color: '#2d7dc7' },
  { id: 'dist', label: 'Distribution Partners', icon: 'ri-team-line', color: '#c9a55a' },
  { id: 'tokens', label: 'dSDR Tokens', icon: 'ri-token-swap-line', color: '#1a4f8a' },
  { id: 'bene', label: 'Beneficiaries', icon: 'ri-heart-line', color: '#2d7dc7' },
]

export default function Approach() {
  const navigate = useNavigate()

  return (
    <div className="bg-white min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="bg-hero-pattern min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 lg:pt-0">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-tfgold" />
              <span className="text-tfgold text-xs font-inter font-semibold tracking-widest uppercase">Our Approach</span>
            </div>
            <h1 className="font-playfair text-4xl lg:text-6xl text-white leading-tight mb-6">
              Reimagining A Fully Tokenized Ecosystem for{' '}
              <span className="text-gold-gradient">Humanitarian Aid Capital</span>
            </h1>
            <p className="text-white/60 font-inter text-lg leading-relaxed">
              A programmable infrastructure that moves resources at the speed of crises —
              with AI-powered intelligence and blockchain-enabled transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Ecosystem Diagram (Slide 8) */}
      <section className="bg-tfblue-verylight py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl lg:text-4xl text-navy-900 mb-4">
                The Tokenization Ecosystem
              </h2>
              <p className="text-gray-500 font-inter text-base max-w-xl mx-auto">
                A fully integrated capital flow — from funding sources to beneficiaries — powered by digital assets and AI.
              </p>
            </div>
          </AnimatedSection>

          {/* Ecosystem flow diagram */}
          <AnimatedSection className="delay-200">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12">
              {/* Row 1: Source */}
              <div className="flex justify-center mb-6">
                <EcoNode node={ecosystemNodes[0]} />
              </div>
              <FlowArrow />

              {/* Row 2: AI + Aegis */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-16 mb-2">
                <EcoNode node={ecosystemNodes[1]} />
                <div className="hidden sm:flex items-center">
                  <div className="w-12 h-px bg-gray-200" />
                  <i className="ri-refresh-line text-gray-300 text-lg mx-2"></i>
                  <div className="w-12 h-px bg-gray-200" />
                </div>
                <EcoNode node={ecosystemNodes[2]} />
              </div>
              <FlowArrow />

              {/* Row 3: Mint */}
              <div className="flex justify-center mb-2">
                <EcoNode node={ecosystemNodes[3]} wide />
              </div>
              <FlowArrow />

              {/* Row 4: Blockchain */}
              <div className="flex justify-center mb-2">
                <EcoNode node={ecosystemNodes[4]} />
              </div>
              <FlowArrow />

              {/* Row 5: Distribution */}
              <div className="flex justify-center mb-2">
                <EcoNode node={ecosystemNodes[5]} />
              </div>
              <FlowArrow />

              {/* Row 6: Tokens */}
              <div className="flex justify-center mb-2">
                <EcoNode node={ecosystemNodes[6]} />
              </div>
              <FlowArrow />

              {/* Row 7: Beneficiaries */}
              <div className="flex justify-center">
                <EcoNode node={ecosystemNodes[7]} highlighted />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* White Paper CTA */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <i className="ri-file-text-line text-tfgold text-4xl mb-4 block"></i>
            <h3 className="font-playfair text-2xl lg:text-3xl text-white mb-4">
              Read Our White Paper
            </h3>
            <p className="text-white/50 font-inter text-base mb-8">
              A comprehensive overview of the Tokenization Foundation's infrastructure, governance model, and tokenomics.
            </p>
            <button
              className="inline-flex items-center gap-3 px-8 py-4 border border-tfgold/40 text-tfgold rounded-full font-inter font-semibold text-sm hover:bg-tfgold hover:text-navy-900 transition-all duration-300"
              onClick={() => {/* PDF link to be added */}}
            >
              <i className="ri-download-line text-lg"></i>
              Download White Paper (PDF)
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* dSDR Token Explained (Slide 9) */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-px bg-tfblue" />
                <span className="text-tfblue text-xs font-inter font-semibold tracking-widest uppercase">Tokenomics</span>
              </div>
              <h2 className="font-playfair text-3xl lg:text-4xl text-navy-900 mb-6 leading-tight">
                The dSDR Token Explained
              </h2>
              <p className="text-gray-600 font-inter text-base leading-relaxed mb-6">
                The network is designed for stability, participation, and long-term growth, with a
                fixed total supply of <strong className="text-navy-900">10 billion tokens</strong>.
                Governance is led by a <strong className="text-navy-900">10-member Governing Council</strong> of
                partners responsible for network oversight, stability, and adoption.
              </p>
              <p className="text-gray-600 font-inter text-base leading-relaxed">
                dSDR also serves as the network's governance token, powering services such as token
                minting, transactions, and reward incentives for adopting AI agents to amplify skills
                and impacts across stakeholders — from donors and social workers to beneficiaries.
              </p>
            </AnimatedSection>

            <AnimatedSection className="delay-200">
              <div className="space-y-4">
                {[
                  {
                    icon: 'ri-coins-line',
                    title: 'Fixed Supply',
                    value: '10 Billion Tokens',
                    desc: 'Stable, predictable supply designed for long-term growth',
                    color: '#1a4f8a',
                  },
                  {
                    icon: 'ri-government-line',
                    title: 'Governance Council',
                    value: '10 Members',
                    desc: 'Partner organizations responsible for network oversight and stability',
                    color: '#c9a55a',
                  },
                  {
                    icon: 'ri-shield-user-line',
                    title: 'Staking & Validation',
                    value: 'Earn Rewards',
                    desc: 'Users can stake dSDR with validators to help secure the network',
                    color: '#2d7dc7',
                  },
                  {
                    icon: 'ri-seedling-line',
                    title: 'Treasury Release',
                    value: 'Gradual Expansion',
                    desc: 'Tokens released gradually to support security and sustainable growth',
                    color: '#1a4f8a',
                  },
                ].map(item => (
                  <div key={item.title} className="flex gap-4 p-5 rounded-xl border border-gray-100 hover:border-tfblue/20 transition-colors">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}15` }}
                    >
                      <i className={`${item.icon} text-xl`} style={{ color: item.color }}></i>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-inter font-semibold text-navy-900 text-sm">{item.title}</span>
                        <span className="text-xs font-inter font-bold" style={{ color: item.color }}>{item.value}</span>
                      </div>
                      <p className="text-gray-500 text-xs font-inter leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Capital Loop (Slide 10) */}
      <section className="py-20 lg:py-28 bg-tfblue-verylight">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-tfblue" />
                <span className="text-tfblue text-xs font-inter font-semibold tracking-widest uppercase">Tokenomics</span>
                <div className="w-8 h-px bg-tfblue" />
              </div>
              <h2 className="font-playfair text-3xl lg:text-4xl text-navy-900 mb-4">
                The Token's Role In Creating A Capital Loop
              </h2>
              <p className="text-gray-500 font-inter text-base max-w-2xl mx-auto">
                dSDR creates a self-reinforcing cycle where capital moves efficiently from sources to impact,
                with built-in accountability and value creation at every step.
              </p>
            </div>
          </AnimatedSection>

          {/* Capital Loop Diagram */}
          <AnimatedSection className="delay-200">
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { step: '01', title: 'Fund Intake', desc: 'Money market funds and institutional capital enter the ecosystem', icon: 'ri-funds-line', color: '#1a4f8a' },
                { step: '02', title: 'Tokenization', desc: 'Capital is converted to dSDR tokens via Aegis Trust', icon: 'ri-coin-line', color: '#2d7dc7' },
                { step: '03', title: 'Distribution', desc: 'Tokens flow through blockchain to verified beneficiaries instantly', icon: 'ri-send-plane-line', color: '#c9a55a' },
                { step: '04', title: 'Impact & Return', desc: 'Measurable outcomes generate governance value and ecosystem growth', icon: 'ri-loop-right-line', color: '#1a4f8a' },
              ].map((item, i) => (
                <div key={item.step} className="relative">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full hover:shadow-md transition-shadow">
                    <div className="font-playfair text-5xl font-bold mb-4" style={{ color: `${item.color}20` }}>
                      {item.step}
                    </div>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${item.color}15` }}
                    >
                      <i className={`${item.icon} text-xl`} style={{ color: item.color }}></i>
                    </div>
                    <h3 className="font-inter font-semibold text-navy-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm font-inter leading-relaxed">{item.desc}</p>
                  </div>
                  {/* Arrow connector */}
                  {i < 3 && (
                    <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-4 h-4 rounded-full bg-tfgold flex items-center justify-center">
                        <i className="ri-arrow-right-line text-navy-900 text-xs"></i>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How AI Powers the Foundation (Slide 11) */}
      <section className="py-20 lg:py-28 bg-navy-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-tfgold" />
                <span className="text-tfgold text-xs font-inter font-semibold tracking-widest uppercase">Technology</span>
                <div className="w-8 h-px bg-tfgold" />
              </div>
              <h2 className="font-playfair text-3xl lg:text-4xl text-white mb-6">
                How AI Powers The Tokenization Foundation
              </h2>
              <p className="text-white/60 font-inter text-base max-w-3xl mx-auto leading-relaxed">
                The gap between available resources and the people who need them has never been a shortage
                of funding. It has been a shortage of infrastructure intelligent enough to move that
                funding accurately, transparently, and at scale.
              </p>
            </div>
          </AnimatedSection>

          {/* Core Principle */}
          <AnimatedSection className="delay-100">
            <div className="bg-white/5 border border-tfgold/20 rounded-2xl p-8 lg:p-10 mb-12 text-center">
              <i className="ri-robot-2-line text-tfgold text-4xl mb-4 block"></i>
              <h3 className="font-playfair text-xl lg:text-2xl text-white mb-3">
                "Skills as Infrastructure"
              </h3>
              <p className="text-white/60 font-inter text-base leading-relaxed max-w-2xl mx-auto">
                How do we move resources and capability simultaneously, at scale, with accountability?
                The most durable form of resource transfer is one that compounds.{' '}
                <em className="text-white/80">A payment moves once. A skill multiplies.</em>
              </p>
            </div>
          </AnimatedSection>

          {/* AI Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: 'ri-user-star-line',
                title: 'Practitioner Intelligence',
                desc: 'AI amplifies practitioners\' judgment by surfacing relevant context, flagging anomalies, and reducing administrative burden — allowing them to spend time with participants, not paperwork.',
                color: '#c9a55a',
              },
              {
                icon: 'ri-crosshair-line',
                title: 'Precision Allocation',
                desc: 'AI continuously analyzes need signals — geographic, contextual, and temporal — routing resources to where they create the most impact. Reduced manual gatekeeping and committee delays.',
                color: '#2d7dc7',
              },
              {
                icon: 'ri-brain-line',
                title: 'Skills Augmentation',
                desc: 'As resources move to participants, AI simultaneously identifies skill gaps, surfaces relevant learning, and delivers certified capability matched to each participant\'s situation.',
                color: '#1a4f8a',
              },
            ].map(item => (
              <AnimatedSection key={item.title}>
                <div className="bg-white/5 border border-white/10 hover:border-tfgold/30 rounded-2xl p-6 h-full transition-colors">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${item.color}20` }}
                  >
                    <i className={`${item.icon} text-2xl`} style={{ color: item.color }}></i>
                  </div>
                  <h3 className="font-inter font-semibold text-white text-base mb-3">{item.title}</h3>
                  <p className="text-white/50 text-sm font-inter leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Stakeholder Benefits */}
          <AnimatedSection className="delay-300">
            <h3 className="font-playfair text-2xl text-white text-center mb-8">
              What This Means In Practice
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  stakeholder: 'For Participants',
                  icon: 'ri-heart-pulse-line',
                  benefit: 'Resources arrive with the knowledge to use them well — whether that is financial literacy, agricultural technique, health protocol, or legal understanding.',
                },
                {
                  stakeholder: 'For Practitioners',
                  icon: 'ri-stethoscope-line',
                  benefit: 'AI surfaces relevant skills in real time, reducing the time between identifying a need and addressing it.',
                },
                {
                  stakeholder: 'For Funding Organizations',
                  icon: 'ri-building-line',
                  benefit: 'Every transfer is paired with capability data, creating a longitudinal record of impact that goes beyond disbursement to measurable growth.',
                },
              ].map(item => (
                <div key={item.stakeholder} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <i className={`${item.icon} text-tfgold text-2xl mb-3 block`}></i>
                  <h4 className="font-inter font-semibold text-white text-sm mb-2">{item.stakeholder}</h4>
                  <p className="text-white/50 text-sm font-inter leading-relaxed">{item.benefit}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tfblue py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-playfair text-3xl lg:text-4xl text-white mb-6">
              Ready to Build the Future Together?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  navigate('/contact')
                  setTimeout(() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' }), 200)
                }}
                className="px-8 py-4 bg-tfgold text-navy-900 rounded-full font-inter font-bold text-base hover:bg-tfgold-light transition-colors"
              >
                Join dSDR Token Waitlist
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 border border-white/30 text-white rounded-full font-inter font-medium text-base hover:bg-white/10 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </AnimatedSection>
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
              <a href="/contact" onClick={e => { e.preventDefault(); navigate('/contact') }} className="text-white/40 hover:text-tfgold text-sm font-inter transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function EcoNode({ node, wide = false, highlighted = false }: {
  node: (typeof ecosystemNodes)[0]
  wide?: boolean
  highlighted?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all
        ${highlighted
          ? 'border-tfgold bg-tfgold/10'
          : 'border-gray-200 bg-white hover:border-tfblue/40'
        }
        ${wide ? 'w-full max-w-xs' : ''}
      `}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${node.color}15` }}
      >
        <i className={`${node.icon} text-sm`} style={{ color: node.color }}></i>
      </div>
      <span className={`text-sm font-inter font-medium ${highlighted ? 'text-tfgold-dark' : 'text-navy-900'}`}>
        {node.label}
      </span>
    </div>
  )
}

function FlowArrow() {
  return (
    <div className="flex justify-center my-3">
      <div className="flex flex-col items-center">
        <div className="w-px h-4 bg-gray-200" />
        <i className="ri-arrow-down-s-line text-gray-300 -mt-1"></i>
      </div>
    </div>
  )
}
