import { useRef, useState, useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import icon from '../../../icon.png'
import icon2 from '../../../icon2.png'
import inIcon from '../../../in.png'

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

function SectionBadge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`inline-block font-inter font-bold tracking-[0.08em] uppercase text-sm px-5 py-2 ${className}`}>
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
        className="bg-[#3264CC] mt-20 min-h-[calc(85vh-5rem)] border-t border-[#244FB5] relative overflow-hidden flex flex-col"
      >
        {/* Diagonal divider */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: '#3E72DA',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
          }}
        />

        <div className="flex-1 flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-12 lg:py-0 relative">
            {/* Right-side background icon for hero text */}
            <div className="absolute right-[-15.5rem] sm:right-[-3rem] lg:right-[-8rem] top-1/2 -translate-y-1/2 pointer-events-none z-0">
              <img
                src={icon2}
                alt=""
                className="w-[34rem] xl:w-[40rem] object-contain opacity-25"
              />
            </div>

            <div className="relative z-10 max-w-4xl">
              <div>
                <h1 className="font-inter font-bold text-3xl sm:text-[42px] leading-[1.25] mb-6">
                  <span className="text-black block sm:whitespace-nowrap">Reimagining crisis capital infrastructure -</span>
                  <span className="text-white block sm:whitespace-nowrap">with AI, blockchain, and digital assets -</span>
                  <span className="text-black block sm:whitespace-nowrap">so that humanitarian aid is funded</span>
                  <span className="text-black block sm:whitespace-nowrap">instantly, transparently,</span>
                  <span className="text-black block sm:whitespace-nowrap">and at scale.</span>
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
                    onClick={() => navigate('/contact#waitlist')}
                    className="px-8 py-3 bg-[#EDE8DA] text-black font-inter font-semibold text-sm hover:bg-[#E0D9C5] transition-colors"
                  >
                    Join dSDR Token Waitlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Small TF icon bottom-right corner */}
        <div className="absolute bottom-4 right-4 opacity-60">
          <img src={icon} alt="Tokenization Foundation icon" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
        </div>
      </section>

      {/* ===== THE PROBLEM + SOLUTIONS (A2) ===== */}
      <section id="problem" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="bg-white border border-black/10 rounded-2xl px-8 py-10 lg:px-12 lg:py-14 shadow-sm">
            {/* Section label */}
            <SectionBadge className="bg-black text-white mb-8">
              The Problem
            </SectionBadge>

            <h2 className="font-inter font-extrabold text-4xl lg:text-5xl text-black mb-7 leading-tight">
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

            <div id="solutions" className="mt-12 grid lg:grid-cols-2 gap-12 items-center border-t border-[#3264CC]/20 pt-12">
              {/* Left: Content */}
              <div>
              {/* Section label */}
              <SectionBadge className="bg-[#3264CC] text-white mb-8">
                  The Solutions
              </SectionBadge>

              <h2 className="font-inter font-extrabold text-4xl lg:text-5xl text-black mb-7 leading-tight">
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
              </div>

              {/* Right: Large TF logo */}
              <div className="hidden lg:flex justify-end items-center">
                <img src={icon} alt="Tokenization Foundation icon" className="w-[32rem] xl:w-[36rem] opacity-85 object-contain" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== IMPACT (A3) ===== */}
      <section id="impact" className="bg-[#EBEBEB] py-20 lg:py-28 relative overflow-hidden">
        {/* Centered icon background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <img src={icon2} alt="" className="w-[24rem] lg:w-[34rem] object-contain opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection className="bg-white/90 backdrop-blur-[1px] border border-black/10 rounded-2xl px-8 py-10 lg:px-12 lg:py-14 shadow-sm">
            {/* Centered section label */}
            <div className="flex justify-center mb-12">
              <SectionBadge className="bg-[#3264CC] text-white px-12">
                Impact
              </SectionBadge>
            </div>

            <h2 className="font-inter font-extrabold text-4xl lg:text-5xl text-black mb-8 leading-tight">
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
          <img src={icon} alt="Tokenization Foundation icon" className="w-8 h-8 object-contain opacity-60" />
        </div>
      </section>

      {/* ===== GOVERNING COUNCIL / PARTNERS (A4) ===== */}
      <section id="council" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="bg-[#F8F9FC] border border-black/10 rounded-2xl px-8 py-10 lg:px-12 lg:py-14 shadow-sm">

            <h2 className="font-inter font-extrabold text-4xl lg:text-5xl text-black mb-12 max-w-4xl leading-tight">
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
                onClick={() => navigate('/contact#council')}
                className="underline font-semibold hover:text-[#3264CC] transition-colors"
              >
                Link
              </button>
            </p>

            <hr className="border-[#3264CC] border mb-10" />

            {/* Media coverage section intentionally hidden until launch-ready. */}
          </AnimatedSection>
        </div>
      </section>

      {/* ===== JOIN THE MOVEMENT (A5 top) ===== */}
      <section id="join" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-[#7A7A7A] border border-black/10 rounded-2xl p-10 lg:p-14 shadow-sm">
              <SectionBadge className="bg-white text-black mb-8">
                Join
              </SectionBadge>

              <h2 className="font-inter font-extrabold text-4xl lg:text-5xl text-white mb-7 leading-tight">
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
                  onClick={() => navigate('/contact#waitlist')}
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
        <div className="flex items-center min-h-[104px] relative py-3 md:py-0 md:-translate-y-2">
          {/* Right-side background icon for footer text */}
          <div className="absolute right-[-3.5rem] sm:right-[-2.5rem] lg:right-0 top-1/2 -translate-y-[30%] pointer-events-none z-0">
            <img
              src={icon2}
              alt=""
              className="w-40 sm:w-44 lg:w-72 object-contain opacity-85"
            />
          </div>

          {/* LinkedIn icon - left */}
          <div className="ml-0 md:ml-6 lg:ml-10 bg-white w-12 h-12 md:w-16 md:h-16 flex flex-col items-center justify-center flex-shrink-0 z-10">
            <img src={inIcon} alt="LinkedIn icon" className="w-16 h-16 object-contain" />
          </div>

          {/* Capital That Responds - center */}
          <div className="flex-1 text-center px-3 md:px-4 relative z-10">
            <p className="font-inter font-extrabold text-white text-xl sm:text-2xl lg:text-5xl tracking-wide leading-tight">
              Capital That Responds
            </p>
          </div>
        </div>

        {/* Legal text */}
        <div className="px-6 lg:px-10 pb-6 pt-4 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between gap-4 text-white/60 text-xs font-inter">
            <p>© 2026. All rights reserved.</p>
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
