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

function SectionBadge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`inline-block font-inter font-bold tracking-[0.08em] uppercase text-sm px-5 py-2 ${className}`}>
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
      // 從其他路由進來時，視窗常仍停留在上一頁的捲動位置；需強制回到頂端才會對齊第一區開頭
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

      {/* ===== HERO (A1) ===== */}
      <section
        id="hero"
        className="bg-[#5B8DEB] mt-20 relative overflow-hidden min-h-[calc(100vh-5rem)]"
      >
        {/* Diagonal — lighter than nav (#3264CC), paired for contrast with white copy */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: '#72A0F0',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
          }}
        />

        <div className="relative pt-8 pb-0 lg:pt-10 lg:pb-0">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative">
            {/* Right-side background icon for hero text */}
            <div className="absolute right-[-15.5rem] sm:right-[-3rem] lg:right-[-8rem] top-1/2 -translate-y-1/2 pointer-events-none z-0">
              <img
                src={icon2}
                alt=""
                className="w-[34rem] xl:w-[40rem] object-contain opacity-85"
              />
            </div>

            <div className="relative z-10 max-w-4xl">
              <div>
                <h1 className="tf-h1 mb-6">
                  <span className="text-black block sm:whitespace-nowrap">Reimagining crisis capital infrastructure -</span>
                  <span className="text-white block sm:whitespace-nowrap">with AI, blockchain, and digital assets -</span>
                  <span className="text-black block sm:whitespace-nowrap">so that humanitarian aid is funded</span>
                  <span className="text-black block sm:whitespace-nowrap">instantly, transparently,</span>
                  <span className="text-black block sm:whitespace-nowrap">and at scale.</span>
                </h1>

                <p className="tf-subhead-layer text-white mb-8">
                  Turn your capital into impact
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate('/contact')}
                    className="rounded-lg px-8 py-3 bg-[#EDE8DA] text-black font-inter font-semibold text-sm hover:bg-[#E0D9C5] transition-colors"
                  >
                    Contact
                  </button>
                  <button
                    onClick={() => navigate('/contact#waitlist')}
                    className="rounded-lg px-8 py-3 bg-[#EDE8DA] text-black font-inter font-semibold text-sm hover:bg-[#E0D9C5] transition-colors"
                  >
                    Join dSDR Token Waitlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ===== THE PROBLEM (full-bleed gray; no side logo) ===== */}
      <section id="problem" className="relative tf-section bg-white -mt-px">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="px-8 lg:px-12">
            <SectionBadge className="!inline-flex bg-black text-white mb-8 w-[13.5rem] justify-center box-border">
              The Problem
            </SectionBadge>

            <h2 className="tf-headline text-black mb-7 w-full max-w-none">
              A Broken System In Need Of Reinvention
            </h2>

            <div className="max-w-3xl">
              <p className="tf-body text-gray-700 mb-4">
                The global crisis infrastructure is{' '}
                <strong>fragmented</strong>,{' '}
                <strong>delayed</strong>, and{' '}
                <strong>inefficient</strong>.
              </p>

              <p className="tf-body text-gray-700">
                It's marked by disbursement lags of up to 20 months in U.S. federal programs,
                17–30% leakage across traditional aid flows, and capital trapped in slow grant cycles.
                NGOs face high administrative burdens, while opaque reporting further limits
                accountability and impact.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== THE SOLUTIONS (full-bleed gray; no side logo) ===== */}
      <section id="solutions" className="relative tf-section bg-[#F3F4F6] -mt-px">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="px-8 lg:px-12">
            <SectionBadge className="!inline-flex bg-[#3264CC] text-white mb-8 w-[13.5rem] justify-center box-border">
              The Solutions
            </SectionBadge>

            <h2 className="tf-headline text-black mb-7 w-full max-w-none">
              <span className="block">A reimagined model</span>
              <span className="block">programmable humanitarian infrastructure</span>
            </h2>

            <div className="max-w-3xl">
              <p className="tf-body text-gray-700 mb-5">
                The Tokenization Foundation replaces fragmented aid systems with a programmable,
                time infrastructure:
              </p>

              <ul className="space-y-3">
                {[
                  'Funds are tokenized and delivered directly to recipients\' digital wallets',
                  'Blockchain enables instant, traceable, and secure transfers',
                  'AI provides real-time oversight, analytics, and adaptive governance',
                ].map(item => (
                  <li key={item} className="tf-body flex items-start gap-3 text-gray-700">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-black flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== IMPACT (A3) ===== */}
      <section id="impact" className="tf-section bg-white relative overflow-hidden">
        {/* Centered icon background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <img src={icon2} alt="" className="w-[24rem] lg:w-[34rem] object-contain opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection className="px-8 py-8 lg:px-12 lg:py-10">
            <h2 className="tf-headline text-black mb-6">
              Infrastructure Designed To Deliver:
            </h2>

            <ul className="space-y-3 mb-5">
              {[
                '50–70% faster disbursement of crisis funds',
                '30–50% reduction in administrative overhead',
                'Real-time transparency and traceability',
              ].map(item => (
                <li key={item} className="tf-body flex items-start gap-3 text-gray-700">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-black flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="tf-body text-gray-700 max-w-3xl">
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

      {/* ===== GOVERNING COUNCIL / PARTNERS (A4) ===== */}
      <section id="council" className="bg-[#F3F4F6] pt-16 pb-0 lg:pt-24 lg:pb-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="px-8 py-10 lg:px-12 lg:py-14">

            <h2 className="tf-headline text-black mb-12 max-w-4xl">
              Building The Infrastructure Ecosystem With Two Founding Governing Council Members
            </h2>

            {/* Partner logos */}
            <div className="flex flex-wrap gap-12 mb-8">
              {/* United Nations */}
              <div className="relative h-48 w-48">
                <img
                  src={unLogo}
                  alt="United Nations"
                  className="absolute left-1/2 bottom-0 w-24 h-24 -translate-x-1/2 translate-y object-contain"
                />
              </div>

              {/* Aegis Trust */}
              <div className="relative h-48 w-48">
                <img
                  src={aegisLogo}
                  alt="Aegis Trust"
                  className="absolute left-1/2 bottom-0 w-48 h-48 -translate-x-1/2 translate-y-12 object-contain"
                />
              </div>
            </div>

            <p className="tf-body text-black mb-8">
              Interested in being on our Council?{' '}
              <button
                onClick={() => navigate('/contact#council')}
                className="underline font-semibold hover:text-[#3264CC] transition-colors"
              >
                Click this link
              </button>
            </p>

            <hr className="border-0 h-px bg-[#3264CC] mb-0" />

            {/* Media coverage section intentionally hidden until launch-ready. */}
          </AnimatedSection>
        </div>
      </section>

      {/* ===== JOIN THE MOVEMENT (A5 top) ===== */}
      <section id="join" className="bg-white pt-0 pb-16 lg:pt-0 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="bg-white rounded-2xl px-8 py-8 lg:px-12 lg:py-10">
            <h2 className="tf-headline text-black mb-7">
              Join The Movement
            </h2>
            <p className="tf-body text-gray-700 mb-8 max-w-2xl">
              The Tokenization Foundation invites institutions, partners, and early supporters to
              participate in building a new global standard for humanitarian aid.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="rounded-lg px-8 py-3 bg-[#EDE8DA] text-black font-inter font-semibold text-sm hover:bg-[#E0D9C5] transition-colors"
              >
                Contact Us
              </button>
              <button
                onClick={() => navigate('/contact#waitlist')}
                className="rounded-lg px-8 py-3 bg-[#EDE8DA] text-black font-inter font-semibold text-sm hover:bg-[#E0D9C5] transition-colors"
              >
                Join dSDR Token Waitlist
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== FOOTER (A5 bottom) ===== */}
      <Footer />
    </div>
  )
}
