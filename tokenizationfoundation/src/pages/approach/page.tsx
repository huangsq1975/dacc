import { useEffect, useState } from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import centerVerticalLogo from '../../assets/TK_Logo_Vert_Blk_NoTag.png'
import arrowRight from '../../assets/arrow_right.png'
import humanFlowPng from '../../assets/927f947e-905b-4115-ad60-377fb49ee898.png'

const PPAI_HEIGHT_MSG = 'ppai-demo-height'

function PpaiDemoIframe() {
  const [heightPx, setHeightPx] = useState<number | null>(null)

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const data = e.data as { type?: string; height?: unknown }
      if (data?.type !== PPAI_HEIGHT_MSG) return
      if (typeof data.height !== 'number' || !Number.isFinite(data.height)) return
      if (e.origin !== window.location.origin) return
      setHeightPx(Math.max(120, Math.min(8000, Math.ceil(data.height))))
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <iframe
      title="PPAI demo autoplay"
      src="/ppai_demo_autoplay.html"
      className="block w-full max-w-full border-0 outline-none ring-0"
      scrolling="no"
      style={{
        overflow: 'hidden',
        height: heightPx != null ? `${heightPx}px` : 'min(70vh, 640px)',
      }}
    />
  )
}

export default function Approach() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />

      <main className="pt-24 sm:pt-28 pb-16 sm:pb-20 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 text-center">
            <h1 className="tf-headline text-black leading-snug">
              Reimaging A Fully Tokenized Ecosystem for Humanitarian Aid Capital!
            </h1>
          </div>

          <section className="bg-gray-100 border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6 sm:mb-8">
            <div className="p-4 sm:p-6 lg:p-8 bg-gray-100">
              <h2 className="tf-headline text-black mb-4 sm:mb-5">
                Inside The Ecosystem
              </h2>

              <div className="max-w-5xl space-y-4 mb-6">
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
                  <p className="tf-body text-black">
                    AI embeds skill augmentation directly into the distribution layer-accounting for every
                    step from pledge to participant and ensuring each transfer arrives with the insights
                    needed to make it count.
                  </p>
                </div>
              </div>


              <div className="mt-4 rounded-xl bg-[#0071bc] p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-[0.85fr_auto_minmax(0,0.375fr)_auto_0.85fr] items-center gap-4">
                  <div className="space-y-3">
                    <div className="rounded-2xl bg-white text-center tf-h3 text-black py-3 px-2">
                      Money Market Fund
                    </div>
                    <div className="rounded-2xl bg-white text-center tf-h3 text-black py-3 px-2">
                      Tokens
                    </div>
                  </div>

                  <div className="hidden md:flex flex-col items-center gap-[40px] -translate-y-1">
                    <img
                      src={arrowRight}
                      alt="Right arrow"
                      className="h-8 w-auto object-contain"
                    />
                    <img
                      src={arrowRight}
                      alt="Right arrow"
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <div className="flex md:hidden justify-center text-tfblue-bright text-3xl font-bold">↓</div>

                  <div className="rounded-[2rem] bg-white p-0 flex items-center justify-center aspect-square overflow-hidden w-full max-w-[180px] md:max-w-none mx-auto">
                    <img
                      src={centerVerticalLogo}
                      alt="Tokenization Foundation logo"
                      className="w-full h-full object-contain scale-[4]"
                    />
                  </div>

                  <div className="flex md:hidden justify-center text-tfblue-bright text-3xl font-bold">↓</div>
                  <div className="hidden md:flex justify-center">
                    <img
                      src={arrowRight}
                      alt="Left arrow"
                      className="h-8 w-auto object-contain rotate-180"
                    />
                  </div>

                  <div className="rounded-2xl bg-white text-center tf-h3 text-black py-4 px-3 leading-tight">
                    <p>Aegis</p>
                    <p>Trust</p>
                    <p className="mt-2 font-semibold">Custody,</p>
                    <p className="font-semibold">Convert Tokens</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <img
                  src={arrowRight}
                  alt="Down arrow"
                  className="h-3 w-auto -translate-y-1 object-contain rotate-90 scale-y-[2]"
                />
              </div>

              <div className="mt-2 space-y-2 sm:space-y-2.5">
                {[
                  { label: 'Blockchain', tone: 'bg-tfblue-verylight text-navy-900' },
                  { label: 'AI Technology', tone: 'bg-tfblue-light text-navy-900' },
                  { label: 'Distribution Partners', tone: 'bg-tfblue-medium/25 text-navy-900' },
                  { label: 'Beneficiaries', tone: 'bg-tfblue text-white' },
                ].map((item, index) => (
                  <div key={item.label}>
                    {index > 0 && (
                      <div className="flex justify-center py-1">
                        <img
                          src={arrowRight}
                          alt="Down arrow"
                          className={`h-3 w-auto -translate-y-1 object-contain rotate-90 scale-y-[2] ${item.label === 'Beneficiaries' ? 'brightness-0' : ''}`}
                        />
                      </div>
                    )}
                    <div
                      className={`relative left-1/2 w-screen -translate-x-1/2 border-y border-tfslate-200 py-3 text-center tf-h3 ${item.tone}`}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="h-px bg-[#D6DEEA] mb-6 sm:mb-8" aria-hidden="true" />

          <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              <h2 className="tf-headline text-black mb-4 sm:mb-5">
                AI
              </h2>

              <p className="tf-body text-black mb-4">
                All transactions are recorded on-chain, providing complete transparency and tamper-proof
                reporting for stakeholders.
              </p>

              <p className="tf-body text-black mb-2">
                <strong>What this means in practice:</strong>
              </p>

              <ul className="max-w-5xl list-disc pl-6 sm:pl-8 lg:pl-10 space-y-2.5">
                <li className="tf-body text-black">
                  For participants, resources arrive with the knowledge to use them well, whether that is
                  financial literacy, agricultural technique, health protocol, or legal understanding.
                </li>
                <li className="tf-body text-black">
                  For practitioners, AI surfaces relevant skills in real time, reducing the time between
                  identifying a need and addressing it.
                </li>
                <li className="tf-body text-black">
                  For funding organizations, every transfer is paired with capability data, creating a
                  longitudinal record of impact that goes beyond disbursement to measurable growth.
                </li>
              </ul>
            </div>
          </section>

          <section className="mt-6 sm:mt-8 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10 bg-white">
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
                  <div className="w-full overflow-hidden">
                    <PpaiDemoIframe />
                  </div>
                  <a
                    href="/ppai_demo_autoplay.html"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 px-4 sm:px-5 pb-4 text-tfblue hover:underline tf-body"
                  >
                    Open demo in a new tab
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
