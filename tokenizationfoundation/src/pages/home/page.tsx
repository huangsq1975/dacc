import { useRef, useState, useEffect, type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import icon2 from '../../../icon2.png'
import unLogo from '../../assets/Logo_of_the_United_Nations.png'
import aegisLogo from '../../assets/AEGIS.png'

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
  const location = useLocation()

  useEffect(() => {
    if (location.hash !== '#hero') return

    const scrollToPageStart = () => {
      window.scrollTo(0, 0)
    }

    scrollToPageStart()
    const t0 = window.setTimeout(scrollToPageStart, 0)
    const t1 = window.setTimeout(scrollToPageStart, 50)

    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
    }
  }, [location.pathname, location.hash])

  return (
    <div>
      <Navigation />

      {/* ===== HERO ===== */}
      <section
        id="hero"
        className="bg-[#15365c] mt-[72px] relative overflow-hidden min-h-[calc(100vh-72px)] border-t border-white/5"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 70% 50%, rgba(26,79,138,0.45) 0%, transparent 70%)',
          }}
        />

        <div className="relative pt-16 pb-20 lg:pt-20 lg:pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative">
            <div className="absolute right-[-15.5rem] sm:right-[-3rem] lg:right-[-8rem] top-1/2 -translate-y-1/2 pointer-events-none z-0">
              <img
                src={icon2}
                alt=""
                className="w-[34rem] xl:w-[40rem] object-contain opacity-[0.07]"
              />
            </div>

            <div className="relative z-10 max-w-4xl">
              <div>
                <h1 className="tf-h1 mb-8">
                  <span className="text-white block sm:whitespace-nowrap">Reimagining crisis capital infrastructure -</span>
                  <span className="text-white/60 block sm:whitespace-nowrap">with AI, blockchain, and digital assets -</span>
                  <span className="text-white block sm:whitespace-nowrap">so that humanitarian aid is funded</span>
                  <span className="text-white block sm:whitespace-nowrap">instantly, transparently,</span>
                  <span className="text-white block sm:whitespace-nowrap">and at scale.</span>
                </h1>

                <p className="tf-h3 text-white mb-10 tracking-wide">
                  Turn your capital into impact
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/contact')}
                    className="px-7 py-3 bg-white text-[#0d1f3c] font-inter font-semibold text-sm rounded hover:bg-gray-100 transition-colors"
                  >
                    Contact
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/contact#waitlist')}
                    className="px-7 py-3 border border-white/35 text-white font-inter font-semibold text-sm rounded hover:border-white/60 hover:bg-white/5 transition-all"
                  >
                    Join dSDR Token Waitlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ===== THE PROBLEM ===== */}
      <section id="problem" className="relative tf-section bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="px-8 lg:px-12">
            <div className="inline-block font-inter font-bold tracking-[0.08em] uppercase text-sm px-5 py-2 border border-gray-300 text-gray-500 mb-8">
              The Problem
            </div>

            <h2 className="tf-headline text-[#0d1f3c] mb-7 w-full max-w-none">
              A Broken System In Need Of Reinvention
            </h2>

            <div className="max-w-3xl">
              <p className="tf-body text-gray-600 mb-4">
                The global crisis infrastructure is{' '}
                <strong className="text-[#0d1f3c]">fragmented</strong>,{' '}
                <strong className="text-[#0d1f3c]">delayed</strong>, and{' '}
                <strong className="text-[#0d1f3c]">inefficient</strong>.
              </p>

              <p className="tf-body text-gray-600">
                It's marked by disbursement lags of up to 20 months in U.S. federal programs,
                17–30% leakage across traditional aid flows, and capital trapped in slow grant cycles.
                NGOs face high administrative burdens, while opaque reporting further limits
                accountability and impact.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== THE SOLUTIONS ===== */}
      <section id="solutions" className="relative tf-section bg-[#ecf0f3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="px-8 lg:px-12">
            <div className="inline-block font-inter font-bold tracking-[0.08em] uppercase text-sm px-5 py-2 border border-[#1a4f8a]/40 text-[#1a4f8a] mb-8">
              The Solutions
            </div>

            <h2 className="tf-headline text-[#0d1f3c] mb-7 w-full max-w-none">
              <span className="block">A reimagined model</span>
              <span className="block">programmable humanitarian infrastructure</span>
            </h2>

            <div className="max-w-3xl">
              <p className="tf-body text-gray-600 mb-5">
                The Tokenization Foundation replaces fragmented aid systems with a programmable,
                real-time infrastructure:
              </p>

              <ul className="space-y-3">
                {[
                  'Funds are tokenized and delivered directly to recipients\' digital wallets',
                  'Blockchain enables instant, traceable, and secure transfers',
                  'AI provides real-time oversight, analytics, and adaptive governance',
                ].map(item => (
                  <li key={item} className="tf-body flex items-start gap-3 text-gray-600">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1a4f8a] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== IMPACT ===== */}
      <section id="impact" className="tf-section bg-white relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <img src={icon2} alt="" className="w-[24rem] lg:w-[34rem] object-contain opacity-[0.04]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection className="px-8 lg:px-12">
            <h2 className="tf-headline text-tfblue mb-6">
              Infrastructure Designed To Deliver:
            </h2>

            <ul className="space-y-3 mb-5">
              {[
                '50–70% faster disbursement of crisis funds',
                '30–50% reduction in administrative overhead',
                'Real-time transparency and traceability',
              ].map(item => (
                <li key={item} className="tf-body flex items-start gap-3 text-gray-600">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1a4f8a] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="tf-body text-gray-600 max-w-3xl">
              <span className="block">
                Over five years, the platform is expected to reach a billion+ people globally,
              </span>
              <span className="block">
                while scaling transaction volume into hundreds of millions annually.
              </span>
            </p>
          </AnimatedSection>
        </div>

      </section>

      {/* ===== GOVERNING COUNCIL / PARTNERS ===== */}
      <section id="council" className="bg-white pt-10 pb-0 lg:pt-16 lg:pb-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="px-8 py-8 lg:px-12 lg:py-10">

            <h2 className="tf-headline text-[#0d1f3c] mb-0 max-w-4xl">
              Building The Infrastructure Ecosystem With Two Founding Governing Council Members
            </h2>

            <div className="flex flex-wrap gap-12 mb-8 -mt-[60px]">
              <a
                href="https://www.un.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-64 w-64 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a4f8a] focus-visible:ring-offset-2 rounded"
              >
                <img
                  src={unLogo}
                  alt="United Nations"
                  className="absolute left-1/2 bottom-0 w-32 h-32 -translate-x-1/2 translate-y-0 object-contain"
                />
              </a>

              <a
                href="https://www.aegiscustody.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-64 w-64 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a4f8a] focus-visible:ring-offset-2 rounded"
              >
                <img
                  src={aegisLogo}
                  alt="Aegis Trust"
                  className="absolute left-1/2 bottom-0 w-64 h-64 -translate-x-1/2 translate-y-16 object-contain"
                />
              </a>
            </div>

            <p className="tf-body text-gray-600 mb-8">
              Interested in being on our Council?{' '}
              <button
                type="button"
                onClick={() => navigate('/contact#council')}
                className="underline font-semibold text-[#1a4f8a] hover:text-[#0d3a6e] transition-colors"
              >
                Click this link
              </button>
            </p>

            <hr className="border-0 h-px bg-gray-200 mb-0" />

          </AnimatedSection>
        </div>
      </section>

      {/* ===== JOIN THE MOVEMENT ===== */}
      <section id="join" className="bg-white pt-0 pb-10 lg:pt-0 lg:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="px-8 py-6 lg:px-12 lg:py-8">
            <h2 className="tf-headline text-[#0d1f3c] mb-7">
              Join The Movement
            </h2>
            <p className="tf-body text-gray-600 mb-8 max-w-2xl">
              The Tokenization Foundation invites institutions, partners, and early supporters to
              participate in building a new global standard for humanitarian aid.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="px-7 py-3 bg-[#0d1f3c] text-white font-inter font-semibold text-sm rounded hover:bg-[#1a3a6a] transition-colors"
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={() => navigate('/contact#waitlist')}
                className="px-7 py-3 border border-[#0d1f3c]/30 text-[#0d1f3c] font-inter font-semibold text-sm rounded hover:border-[#0d1f3c]/60 hover:bg-[#0d1f3c]/5 transition-all"
              >
                Join dSDR Token Waitlist
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  )
}
