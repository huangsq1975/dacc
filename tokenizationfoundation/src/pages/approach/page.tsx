import { useEffect, useRef, useState } from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import humanFlowPng from '../../assets/927f947e-905b-4115-ad60-377fb49ee898.png'

const PPAI_HEIGHT_MSG = 'ppai-demo-height'

function PpaiDemoIframe() {
  const [heightPx, setHeightPx] = useState<number | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const sendWidth = () => {
    const el = iframeRef.current
    if (!el) return
    const w = el.getBoundingClientRect().width
    el.contentWindow?.postMessage({ type: 'ppai-iframe-width', width: w }, '*')
  }

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const data = e.data as { type?: string; height?: unknown }
      if (data?.type !== PPAI_HEIGHT_MSG) return
      if (typeof data.height !== 'number' || !Number.isFinite(data.height)) return
      if (e.origin !== window.location.origin) return
      setHeightPx(Math.max(120, Math.min(8000, Math.ceil(data.height))))
    }
    window.addEventListener('message', onMessage)
    window.addEventListener('resize', sendWidth)
    return () => {
      window.removeEventListener('message', onMessage)
      window.removeEventListener('resize', sendWidth)
    }
  }, [])

  return (
    <iframe
      ref={iframeRef}
      title="PPAI demo autoplay"
      src="/ppai_demo_autoplay.html"
      className="block w-full min-w-0 max-w-full border-0 outline-none ring-0"
      scrolling="no"
      onLoad={sendWidth}
      style={{
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        height: heightPx != null ? `${heightPx}px` : 'min(70vh, 640px)',
      }}
    />
  )
}

export default function Approach() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />

      <main className="pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-3 sm:mb-4 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 text-center">
            <h1 className="tf-headline text-black leading-snug">
              <span className="block">Reimagining A Fully Tokenized Ecosystem For</span>
              <span className="block">Humanitarian Aid Capital</span>
            </h1>
          </div>
        </div>

        <section className="relative w-full bg-[#ecf0f3] pt-3 sm:pt-4 lg:pt-6 pb-10 lg:pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 lg:pt-5 pb-4 sm:pb-6 lg:pb-8">
              <div className="w-full overflow-hidden rounded-xl bg-[#F0F4FF] ring-1 ring-black/5">
                <iframe
                  title="Tokenized ecosystem diagram"
                  src="/Tokens.html"
                  className="block w-full min-h-[920px] border-0"
                  scrolling="no"
                />
              </div>

              <h2 className="tf-headline text-black mt-8 sm:mt-10 mb-4 sm:mb-5">
                Inside The Ecosystem
              </h2>

              <div className="max-w-5xl space-y-4">
                <p className="tf-body text-black">
                  The Tokenization Foundation is currently building the ecosystem and will update this page
                  as the process evolves and partners are added. For now, this provides an overview of the
                  components.
                </p>

                <div>
                  <h3 className="tf-h3 text-black mb-2">Tokens</h3>
                  <p className="tf-body text-black">
                    A blockchain-native utility asset with a fixed supply of 10 billion powers
                    transactions, tokenization, and AI-driven services across the network with low,
                    predictable costs pegged to USD. The network is secured through a staking mechanism,
                    where validators and participants stake tokens to maintain integrity, support ecosystem
                    growth, and earn rewards.
                  </p>
                </div>

                <div>
                  <h3 className="tf-h3 text-black mb-2">Tokenized Money Market Fund</h3>
                  <p className="tf-body text-black">
                    Through a partnership with a regulated asset manager, the Tokenization Foundation will
                    offer a T Class portfolio designed to optimize cash management while generating measurable
                    global impact. This fund will invest in low-risk assets such as U.S. Treasuries and
                    AAA-rated securities, targeting 4%+ yield, while directing a portion of returns to
                    humanitarian aid-delivering both financial performance and social impact at scale.
                  </p>
                </div>

                <div>
                  <h3 className="tf-h3 text-black mb-2">Blockchain Infrastructure</h3>
                  <p className="tf-body text-black">
                    Direct distribution via smart contracts allows funds to be delivered directly to
                    recipients&apos; digital wallets-reducing intermediaries and increasing speed and efficiency.
                  </p>
                </div>

                <div>
                  <h3 className="tf-h3 text-black mb-2">AI</h3>
                  <div className="space-y-3">
                    <p className="tf-body text-black">
                      AI embeds skill augmentation directly into the distribution layer-accounting for every
                      step from pledge to participant and ensuring each transfer arrives with the insights
                      needed to make it count.
                    </p>
                    <p className="tf-body text-black">
                      All transactions are recorded on-chain, providing{' '}
                      <strong>complete transparency and tamper-proof reporting</strong> for stakeholders.
                    </p>
                  </div>
                  <h4 className="tf-h3 text-black mt-5 sm:mt-6 mb-3 sm:mb-4 flex items-start gap-2.5 sm:gap-3">
                    <span
                      className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-black"
                      aria-hidden="true"
                    />
                    <span>What this means in practice</span>
                  </h4>
                  <ul className="list-[circle] pl-6 sm:pl-8 lg:pl-10 space-y-2.5 marker:text-black">
                    <li className="tf-body text-black">
                      For <strong>participants</strong>, resources arrive with the knowledge to use them well, whether that is
                      financial literacy, agricultural technique, health protocol, or legal understanding.
                    </li>
                    <li className="tf-body text-black">
                      For <strong>practitioners</strong>, AI surfaces relevant skills in real time, reducing the time between
                      identifying a need and addressing it.
                    </li>
                    <li className="tf-body text-black">
                      For <strong>funding organizations</strong>, every transfer is paired with capability data, creating a
                      longitudinal record of impact that goes beyond disbursement to measurable growth.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-[#D6DEEA]" aria-hidden="true" />

        <section className="tf-section bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 sm:p-8 lg:p-10">
              <h2 className="tf-headline text-black mb-4 sm:mb-5">
                Practitioner And Precision Adaptive Intelligence
              </h2>

              <div className="max-w-5xl space-y-4">
                <p className="tf-body text-black">
                  The gap is not funding. It is the absence of infrastructure intelligent enough to move it
                  precisely, transparently, and at scale.
                </p>
                <p className="tf-body text-black">
                  PPAI (Precision and Practitioner Adaptive Intelligence) operates across the Tokenization
                  Foundation ecosystem interfacing with capital, organizations, and participants moving
                  capital and capability together.
                </p>
                <p className="tf-body text-black">
                  Allocation becomes continuous. PPAI senses need across geography, time, and context routing
                  resources to where they create the most impact. Adaptive, real-time, verifiable.
                </p>
                <p className="tf-body text-black">
                  Practitioners remain central and judgment can adapt to humans and AI depending on the
                  situation.
                </p>
                <p className="tf-body text-black">
                  Skills are generated and deployed in real time matched to context, participant, and
                  moment. Not training. Not guidance. Live capability.
                </p>
                <p className="tf-body text-black">
                  The platform surfaces context, flags anomalies, and removes administrative friction
                  shifting time back to care. What moves through the system is not just capital, but
                  capability compounding with every interaction, every decision, and every outcome.
                </p>
              </div>

              <div className="mt-8 flex flex-col">
                <div className="rounded-lg p-4 sm:p-5 bg-white">
                  <img
                    src={humanFlowPng}
                    alt="PPAI human flow diagram"
                    className="w-full h-auto"
                  />
                </div>

                <div
                  className="my-6 sm:my-8 w-full min-h-[14px] sm:min-h-[18px] rounded-md bg-gray-200 shrink-0"
                  aria-hidden="true"
                  role="separator"
                />

                <div className="rounded-lg bg-white">
                  <div className="w-full min-w-0">
                    <PpaiDemoIframe />
                  </div>
                  <a
                    href="/ppai_demo_autoplay.html"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 px-4 sm:px-5 pb-4 text-tfblue hover:underline tf-body"
                  >
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
