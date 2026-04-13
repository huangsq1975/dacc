import { useRef, useState, useEffect, type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import icon2 from '../../../icon2.png'
import unLogo from '../../assets/Logo_of_the_United_Nations.svg'
import aegisLogo from '../../assets/ATC_logo_stacked.png'

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
        className="bg-[#0066ff] mt-[72px] relative overflow-hidden min-h-[calc(100vh-72px)] border-t border-white/5"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 70% 50%, rgba(0,93,236,0.45) 0%, transparent 70%)',
          }}
        />

        <div className="relative pt-16 pb-20 lg:pt-20 lg:pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative">
            <div className="absolute right-[-15.5rem] sm:right-[-3rem] lg:right-[-8rem] top-1/2 -translate-y-1/2 pointer-events-none z-0">
              <img
                src={icon2}
                alt=""
                className="w-[34rem] xl:w-[40rem] object-contain opacity-[0.15]"
              />
            </div>

            <div className="relative z-10 max-w-4xl">
              <div>
                <h1 className="tf-h1 mb-8 max-sm:mb-7 max-sm:text-[clamp(1.5rem,0.85rem+3.6vw,1.875rem)] max-sm:leading-[1.35] max-sm:tracking-[-0.02em]">
                  {/* Mobile: 三行分組、移除行尾連字號，閱讀節奏較清楚 */}
                  <span className="flex flex-col gap-3 sm:hidden">
                    <span className="text-white">Reimagining crisis capital infrastructure</span>
                    <span className="text-white/60 font-semibold normal-case">
                      with AI, blockchain, and digital assets
                    </span>
                    <span className="text-white">
                      so that humanitarian aid is funded instantly, transparently, and at scale.
                    </span>
                  </span>
                  {/* sm+：維持原五行排版 */}
                  <span className="hidden sm:contents">
                    <span className="text-white block sm:whitespace-nowrap">Reimagining crisis capital infrastructure -</span>
                    <span className="text-white/60 block sm:whitespace-nowrap">with AI, blockchain, and digital assets -</span>
                    <span className="text-white block sm:whitespace-nowrap">so that humanitarian aid is funded</span>
                    <span className="text-white block sm:whitespace-nowrap">instantly, transparently,</span>
                    <span className="text-white block sm:whitespace-nowrap">and at scale.</span>
                  </span>
                </h1>

                <p className="text-[clamp(1.75rem,1.35rem+1.2vw,2.125rem)] font-semibold leading-[1.3] text-white mb-10 tracking-wide">
                  Turn your capital into impact.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/contact')}
                    className="px-7 py-3 bg-white text-[#0066cc] font-inter font-semibold text-sm rounded hover:bg-gray-100 transition-colors"
                  >
                    Contact
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/contact#waitlist')}
                    className="px-7 py-3 border border-white/35 text-white font-inter font-semibold text-sm rounded hover:border-white/60 hover:bg-white/5 transition-all"
                  >
                    Join Token Waitlist
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

            <h2 className="tf-headline text-gray-900 mb-7 w-full max-w-none">
              A Broken System In Need Of Reinvention
            </h2>

            <div className="max-w-3xl">
              <p className="tf-body text-gray-600 mb-4">
                The global crisis infrastructure is{' '}
                <strong className="text-[#0066cc]">fragmented</strong>,{' '}
                <strong className="text-[#0066cc]">delayed</strong>, and{' '}
                <strong className="text-[#0066cc]">inefficient</strong>.
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
            <div className="inline-block font-inter font-bold tracking-[0.08em] uppercase text-sm px-5 py-2 border border-[#005dec]/40 text-gray-700 mb-8">
              The Solutions
            </div>

            <h2 className="tf-headline text-gray-900 mb-7 w-full max-w-none">
              <span className="block">A Reimagined Model:</span>
              <span className="block">Programmable Humanitarian Infrastructure</span>
            </h2>

            <div className="max-w-3xl">
              <p className="tf-body text-gray-600 mb-5">
                The Tokenization Foundation replaces fragmented aid systems with a programmable,
                real-time infrastructure.
              </p>

              <ul className="space-y-3">
                {[
                  'Funds are tokenized and delivered directly to recipients\' digital wallets',
                  'Blockchain enables instant, traceable, and secure transfers',
                  'AI provides real-time oversight, analytics, and adaptive governance',
                ].map(item => (
                  <li key={item} className="tf-body flex items-start gap-3 text-gray-600">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#005dec] flex-shrink-0" />
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
            <h2 className="tf-headline text-tfgray-section mb-6 tracking-[0.01em]">
              Infrastructure Designed To Deliver
            </h2>

            <ul className="space-y-3 mb-5">
              {[
                '50–70% faster disbursement of crisis funds',
                '30–50% reduction in administrative overhead',
                'Real-time transparency and traceability',
              ].map(item => (
                <li key={item} className="tf-body flex items-start gap-3 text-gray-600">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#005dec] flex-shrink-0" />
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

            <h2 className="tf-headline tf-headline--narrow-sm font-sans text-gray-900 mb-6 max-w-4xl text-balance">
              Collaborating To Build The Infrastructure
            </h2>

            <div className="max-w-3xl mb-8">
              <p className="tf-body text-gray-600">
                The Tokenization Foundation started as a collaboration when the United Nations approached
                Aegis Trust Company, a South Dakota public trust company, to address long-standing
                inefficiencies in crisis relief infrastructure. Together with the UN, the Tokenization
                Foundation has applied for the Melinda Gates WIN Grant to fulfill the mission of crisis
                relief/aid delivered swiftly and accurately.
              </p>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-10 lg:gap-12 mb-8">
              <a
                href="https://www.un.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-64 w-64 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005dec] focus-visible:ring-offset-2 rounded"
              >
                <img
                  src={unLogo}
                  alt="United Nations"
                  className="absolute left-1/2 bottom-0 w-64 h-64 -translate-x-1/2 translate-y+26 object-contain"
                />
              </a>

              <a
                href="https://www.aegiscustody.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-64 w-64 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005dec] focus-visible:ring-offset-2 rounded"
              >
                <img
                  src={aegisLogo}
                  alt="Aegis Trust"
                  className="absolute left-1/2 bottom-0 w-64 h-64 -translate-x-1/2 translate-y+26 object-contain"
                />
              </a>
            </div>

            <hr className="border-0 h-px bg-gray-200 mb-0" />

          </AnimatedSection>
        </div>
      </section>

      {/* ===== JOIN THE MOVEMENT ===== */}
      <section id="join" className="bg-white pt-0 pb-10 lg:pt-0 lg:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="px-8 py-6 lg:px-12 lg:py-8">
            <h2 className="tf-headline text-gray-900 mb-7">
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
                className="px-7 py-3 bg-[#0071bc] text-white font-inter font-semibold text-sm rounded hover:bg-[#0066cc] transition-colors"
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={() => navigate('/contact#waitlist')}
                className="px-7 py-3 border border-[#0071bc]/30 text-[#0071bc] font-inter font-semibold text-sm rounded hover:border-[#0071bc]/60 hover:bg-[#0071bc]/5 transition-all"
              >
                Join Token Waitlist
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  )
}
