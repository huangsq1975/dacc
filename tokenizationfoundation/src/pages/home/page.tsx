import { useRef, useState, useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../../components/Navigation'

// Large TF person figure logo used in hero and sections
const TFPersonLogo = ({ color = 'white', className = '' }: { color?: string; className?: string }) => (
  <svg
    viewBox="0 0 260 340"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* T crossbar */}
    <rect x="0" y="0" width="260" height="58" />
    {/* T stem */}
    <rect x="95" y="58" width="70" height="88" />
    {/* Head */}
    <circle cx="130" cy="210" r="52" />
    {/* Left leg */}
    <rect x="30" y="276" width="80" height="64" />
    {/* Right leg */}
    <rect x="150" y="276" width="80" height="64" />
  </svg>
)

// Small TF nav icon
const TFNavIcon = () => (
  <svg viewBox="0 0 36 36" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 flex-shrink-0">
    <rect x="0" y="0" width="36" height="9" />
    <rect x="13" y="9" width="10" height="10" />
    <circle cx="18" cy="26" r="7" />
  </svg>
)

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
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <Navigation />

      {/* ===== HERO (A1) ===== */}
      <section
        id="hero"
        className="bg-[#3264CC] min-h-screen pt-20 relative overflow-hidden flex flex-col"
      >
        {/* Diagonal divider */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(145deg, transparent 55%, rgba(255,255,255,0.04) 55%)',
          }}
        />

        <div className="flex-1 flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-12 lg:py-0">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Text */}
              <div>
                <h1 className="font-inter font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-snug mb-6">
                  Reimagining crisis capital infrastructure –
                  {' '}with AI, blockchain, and digital assets -{' '}
                  so that humanitarian aid is funded instantly, transparently,
                  {' '}and at scale.
                </h1>

                <p className="font-inter font-bold text-xl text-white mb-8">
                  Turn your capital into impact
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-8 py-3 bg-[#EDE8DA] text-black font-inter font-semibold text-sm hover:bg-[#E0D9C5] transition-colors"
                  >
                    Contact
                  </button>
                  <button
                    onClick={() => {
                      navigate('/contact')
                      setTimeout(() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' }), 200)
                    }}
                    className="px-8 py-3 bg-[#EDE8DA] text-black font-inter font-semibold text-sm hover:bg-[#E0D9C5] transition-colors"
                  >
                    Join dSDR Token Waitlist
                  </button>
                </div>
              </div>

              {/* Right: TF Person Logo */}
              <div className="hidden lg:flex justify-end items-center">
                <TFPersonLogo
                  color="white"
                  className="w-72 xl:w-80 opacity-90"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Small TF icon bottom-right corner */}
        <div className="absolute bottom-4 right-4 opacity-60">
          <TFNavIcon />
        </div>
      </section>

      {/* ===== THE PROBLEM (A2 top) ===== */}
      <section id="problem" className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            {/* Section label */}
            <div className="inline-block bg-black text-white font-inter font-bold text-base px-8 py-3 mb-8">
              The Problem
            </div>

            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-black mb-5">
              A Broken System In Need Of Reinvention
            </h2>

            <p className="font-inter text-base text-gray-700 mb-4 max-w-3xl">
              The global crisis infrastructure is{' '}
              <strong>fragmented</strong>,{' '}
              <strong>delayed</strong>, and{' '}
              <strong>inefficient</strong>.
            </p>

            <p className="font-inter text-base text-gray-700 max-w-3xl">
              It's marked by disbursement lags of up to 20 months in U.S. federal programs,
              17–30% leakage across traditional aid flows, and capital trapped in slow grant cycles.
              NGOs face high administrative burdens, while opaque reporting further limits
              accountability and impact.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== THE SOLUTIONS (A2 bottom) ===== */}
      <section id="solutions" className="bg-[#EBEBEB] py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <AnimatedSection>
              {/* Section label */}
              <div className="inline-block bg-[#3264CC] text-white font-inter font-bold text-base px-8 py-3 mb-8">
                The Solutions
              </div>

              <h2 className="font-inter font-bold text-3xl lg:text-4xl text-black mb-5">
                A Reimagined Model: Programmable Humanitarian Infrastructure
              </h2>

              <p className="font-inter text-base text-gray-700 mb-5 max-w-xl">
                The Tokenization Foundation replaces fragmented aid systems with a programmable,
                time infrastructure:
              </p>

              <ul className="space-y-3">
                {[
                  'Funds are tokenized and delivered directly to recipients\' digital wallets',
                  'Blockchain enables instant, traceable, and secure transfers',
                  'AI provides real-time oversight, analytics, and adaptive governance',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 font-inter text-base text-gray-700">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-black flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            {/* Right: Large TF logo */}
            <div className="hidden lg:flex justify-end items-center">
              <TFPersonLogo
                color="black"
                className="w-64 xl:w-72 opacity-85"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMPACT (A3) ===== */}
      <section id="impact" className="bg-[#EBEBEB] py-16 lg:py-20 relative overflow-hidden">
        {/* TF logo watermark */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none opacity-15">
          <TFPersonLogo color="#888" className="w-64" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <AnimatedSection>
            {/* Centered section label */}
            <div className="flex justify-center mb-12">
              <div className="bg-[#3264CC] text-white font-inter font-bold text-base px-12 py-3">
                Impact
              </div>
            </div>

            <h2 className="font-inter font-bold text-2xl lg:text-3xl text-black mb-6">
              Infrastructure Designed To Deliver:
            </h2>

            <ul className="space-y-3 mb-10">
              {[
                '50–70% faster disbursement of crisis funds',
                '30–50% reduction in administrative overhead',
                'Real-time transparency and traceability',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 font-inter text-base text-gray-700">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-black flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="font-inter text-2xl lg:text-3xl text-black max-w-3xl leading-snug">
              Over five years, the platform is expected to reach{' '}
              <strong>+ billion people globally</strong>, while scaling transaction volume into the
              hundreds of millions annually.
            </p>
          </AnimatedSection>
        </div>

        {/* Small TF icon bottom-right */}
        <div className="absolute bottom-4 right-4">
          <svg viewBox="0 0 36 36" fill="#3264CC" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 opacity-60">
            <rect x="0" y="0" width="36" height="9" />
            <rect x="13" y="9" width="10" height="10" />
            <circle cx="18" cy="26" r="7" />
          </svg>
        </div>
      </section>

      {/* ===== GOVERNING COUNCIL / PARTNERS (A4) ===== */}
      <section id="council" className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-inter font-bold text-2xl lg:text-4xl text-black mb-10 max-w-3xl">
              Building The Infrastructure Ecosystem With Two Initial Founding Governing Council Members
            </h2>

            {/* Partner logos */}
            <div className="flex flex-wrap gap-12 items-start mb-8">
              {/* United Nations */}
              <div className="flex flex-col items-center gap-2">
                <svg viewBox="0 0 100 100" className="w-24 h-24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#4B9CD3" strokeWidth="4" />
                  <ellipse cx="50" cy="50" rx="20" ry="46" fill="none" stroke="#4B9CD3" strokeWidth="3" />
                  <ellipse cx="50" cy="50" rx="35" ry="46" fill="none" stroke="#4B9CD3" strokeWidth="2.5" />
                  <line x1="4" y1="50" x2="96" y2="50" stroke="#4B9CD3" strokeWidth="3" />
                  <line x1="50" y1="4" x2="50" y2="96" stroke="#4B9CD3" strokeWidth="2" />
                  <line x1="10" y1="28" x2="90" y2="28" stroke="#4B9CD3" strokeWidth="2" />
                  <line x1="10" y1="72" x2="90" y2="72" stroke="#4B9CD3" strokeWidth="2" />
                  {/* Laurel branches simplified */}
                  <path d="M15 85 Q20 75 25 85 Q30 75 35 85" fill="none" stroke="#4B9CD3" strokeWidth="2.5" />
                  <path d="M65 85 Q70 75 75 85 Q80 75 85 85" fill="none" stroke="#4B9CD3" strokeWidth="2.5" />
                  <line x1="50" y1="85" x2="50" y2="95" stroke="#4B9CD3" strokeWidth="2" />
                </svg>
                <span className="font-inter font-semibold text-[#4B9CD3] text-sm">United Nations</span>
              </div>

              {/* Aegis Trust */}
              <div className="flex flex-col items-start gap-2 justify-center">
                <svg viewBox="0 0 120 80" className="w-32 h-20" xmlns="http://www.w3.org/2000/svg" fill="none">
                  {/* Nested square/grid logo approximation */}
                  <rect x="4" y="4" width="72" height="72" stroke="#1B3A6B" strokeWidth="5" />
                  <rect x="16" y="16" width="48" height="48" stroke="#1B3A6B" strokeWidth="5" />
                  <rect x="28" y="28" width="24" height="24" stroke="#1B3A6B" strokeWidth="5" />
                  <line x1="4" y1="40" x2="28" y2="40" stroke="#1B3A6B" strokeWidth="5" />
                  <line x1="52" y1="40" x2="76" y2="40" stroke="#1B3A6B" strokeWidth="5" />
                  <line x1="40" y1="4" x2="40" y2="28" stroke="#1B3A6B" strokeWidth="5" />
                  <line x1="40" y1="52" x2="40" y2="76" stroke="#1B3A6B" strokeWidth="5" />
                </svg>
                <span className="font-inter font-bold text-[#1B3A6B] text-lg tracking-widest uppercase">
                  <span className="font-black">AEGIS</span>{' '}
                  <span className="font-light tracking-widest">TRUST</span>
                </span>
              </div>
            </div>

            <p className="font-inter text-sm text-black mb-8">
              Interested in getting on our Council?{' '}
              <button
                onClick={() => navigate('/contact')}
                className="underline font-semibold hover:text-[#3264CC] transition-colors"
              >
                Link
              </button>
            </p>

            <hr className="border-[#3264CC] border mb-10" />

            {/* As Featured In */}
            <div className="mb-6">
              <span className="font-inter font-bold text-2xl text-black">As Featured In </span>
              <span className="font-inter text-red-600 text-sm">
                (this section will need to be added after we get media coverage)
              </span>
            </div>

            <div className="flex flex-wrap gap-10 items-center opacity-70">
              {/* CNN */}
              <span className="font-inter font-extrabold text-2xl text-red-600 tracking-tight">CNN</span>
              {/* Coindesk */}
              <span className="font-inter font-bold text-2xl text-[#D4A017] tracking-wide">coindesk</span>
              {/* Forbes */}
              <span className="font-inter font-black text-3xl text-black italic tracking-tight">Forbes</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== JOIN THE MOVEMENT (A5 top) ===== */}
      <section id="join" className="bg-white py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-[#8C8C8C] p-10 lg:p-14">
              <h2 className="font-inter font-bold text-3xl lg:text-4xl text-white mb-5">
                Join The Movement
              </h2>
              <p className="font-inter text-base text-white mb-8 max-w-2xl">
                The Tokenization Foundation invites institutions, partners, and early supporters to
                participate in building a new global standard for humanitarian aid.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/contact')}
                  className="px-8 py-3 bg-[#EDE8DA] text-black font-inter font-semibold text-sm border border-black hover:bg-[#E0D9C5] transition-colors"
                >
                  Contact Us
                </button>
                <button
                  onClick={() => {
                    navigate('/contact')
                    setTimeout(() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' }), 200)
                  }}
                  className="px-8 py-3 bg-[#EDE8DA] text-black font-inter font-semibold text-sm border border-black hover:bg-[#E0D9C5] transition-colors"
                >
                  Join dSDR Token Waitlist
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== FOOTER (A5 bottom) ===== */}
      <footer className="bg-[#2244EE] relative overflow-hidden">
        {/* Main footer bar */}
        <div className="flex items-center min-h-[120px] relative">
          {/* LinkedIn icon - left */}
          <div className="ml-6 lg:ml-10 bg-white w-16 h-16 flex flex-col items-center justify-center flex-shrink-0">
            <i className="ri-linkedin-fill text-black text-3xl"></i>
            <span className="text-black text-[7px] font-inter mt-0.5">®</span>
          </div>

          {/* Capital That Responds - center */}
          <div className="flex-1 text-center px-4">
            <p className="font-inter font-extrabold text-white text-3xl lg:text-5xl tracking-wide">
              Capital That Responds
            </p>
          </div>

          {/* TF Person Logo - right */}
          <div className="flex-shrink-0 overflow-hidden flex items-end self-stretch pr-4">
            <TFPersonLogo color="white" className="w-36 lg:w-44 opacity-80" />
          </div>
        </div>

        {/* Legal text */}
        <div className="px-6 lg:px-10 pb-6 pt-4 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between gap-4 text-white/60 text-xs font-inter">
            <p>© 2026 Tokenization Foundation. All rights reserved.</p>
            <p className="max-w-xl text-right">
              This website is for informational purposes only and does not constitute an offer to
              sell or a solicitation of an offer to buy any securities or tokens.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
