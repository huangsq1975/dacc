import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import tokenRole from '../../assets/TokenRole.png'
import centerVerticalLogo from '../../assets/TK_Logo_Vert_Blk_NoTag.png'

export default function Approach() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />

      <main className="pt-24 sm:pt-28 pb-16 sm:pb-20 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 text-center">
            <h1 className="tf-headline text-black leading-snug">
              Reimagining a fully tokenized ecosystem
              <br />
              for humanitarian capital
            </h1>
          </div>

          <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6 sm:mb-8">
            <div className="p-4 sm:p-6 lg:p-8 bg-white">

              <div className="mt-4 rounded-xl bg-[#0d1f3c] p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-[0.85fr_auto_minmax(0,0.375fr)_auto_0.85fr] items-center gap-4">
                  <div className="space-y-3">
                    <div className="rounded-2xl bg-white text-center tf-h3 text-black py-3 px-2">
                      Money Market Fund
                    </div>
                    <div className="rounded-2xl bg-white text-center tf-h3 text-black py-3 px-2">
                      Tokens
                    </div>
                  </div>

                  <div className="hidden md:flex justify-center text-tfblue-bright text-4xl font-bold">→</div>
                  <div className="flex md:hidden justify-center text-tfblue-bright text-3xl font-bold">↓</div>

                  <div className="rounded-[2rem] bg-white p-0 flex items-center justify-center aspect-square overflow-hidden w-full max-w-[180px] md:max-w-none mx-auto">
                    <img
                      src={centerVerticalLogo}
                      alt="Tokenization Foundation logo"
                      className="w-full h-full object-contain scale-[4]"
                    />
                  </div>

                  <div className="flex md:hidden justify-center text-tfblue-bright text-3xl font-bold">↓</div>
                  <div className="hidden md:flex justify-center text-tfblue-bright text-4xl font-bold">←</div>

                  <div className="rounded-2xl bg-white text-center tf-h3 text-black py-4 px-3 leading-tight">
                    <p>Aegis</p>
                    <p>Trust</p>
                    <p className="mt-2 font-semibold">Mint, Custody,</p>
                    <p className="font-semibold">Convert Tokens</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2 sm:space-y-2.5">
                {[
                  { label: 'Blockchain', tone: 'bg-tfblue-verylight text-navy-900' },
                  { label: 'AI Technology', tone: 'bg-tfblue-light text-navy-900' },
                  { label: 'Distribution Partners', tone: 'bg-tfblue-medium/25 text-navy-900' },
                  { label: 'Beneficiaries', tone: 'bg-tfblue text-white' },
                ].map(item => (
                  <div
                    key={item.label}
                    className={`relative left-1/2 w-screen -translate-x-1/2 border-y border-tfslate-200 py-3 text-center tf-h3 ${item.tone}`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="h-px bg-[#D6DEEA] mb-6 sm:mb-8" aria-hidden="true" />

          <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6 sm:mb-8">
            <div className="w-full bg-[#0d1f3c]">
              <div className="px-4 sm:px-8 py-4 sm:py-6">
                <button
                  type="button"
                  className="w-full sm:w-auto rounded border border-white/30 bg-white/10 hover:bg-white/15 px-5 py-3 text-left font-inter font-medium text-white transition-colors"
                >
                  <span className="text-tfblue-bright">Click</span> To Read Our White Paper (pdf)
                </button>
              </div>
            </div>
            <div className="p-6 sm:p-8 lg:p-10">
              <h2 className="tf-headline text-black mb-4 sm:mb-5">
                The dSDR Token Explained
              </h2>
              <ul className="max-w-5xl space-y-3">
                {[
                  'The network is designed for stability, participation, and long-term growth, with a fixed total supply of 10 billion tokens.',
                  'Governance is led by a 10-member Governing Council of partners responsible for network oversight, stability, and adoption.',
                  'Users can stake dSDR with validators to help secure the network and earn rewards, while validators and stakers actively contribute to ecosystem development.',
                  'Tokens are gradually released from the treasury to support security and sustainable expansion.',
                  'dSDR also serves as the network&apos;s governance token, powering services such as token minting, transactions, and reward incentives for adopting AI agents to amplify skills and impacts across stakeholders from donors, social workers to beneficiaries.',
                ].map(item => (
                  <li key={item} className="tf-body flex items-start gap-3 text-black">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-black flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="h-px bg-[#D6DEEA] mb-6 sm:mb-8" aria-hidden="true" />

          <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6 sm:mb-8">
            <div className="p-6 sm:p-8 lg:p-10 bg-[#f8fafc]">
              <h2 className="tf-headline text-[#0d1f3c] mb-6 text-center">
                The Token&apos;s Role In Creating A Capital Loop
              </h2>
              <div className="relative mx-auto w-full max-w-4xl aspect-square">
                <img
                  src={tokenRole}
                  alt="Token role outer loop"
                  className="absolute inset-0 w-full h-full object-contain"
                />
                <img
                  src={centerVerticalLogo}
                  alt="Tokenization Foundation center logo"
                  className="absolute left-1/2 top-1/2 w-[26%] max-w-[220px] -translate-x-1/2 -translate-y-1/2 object-contain scale-[5]"
                />
              </div>
            </div>
          </section>

          <div className="h-px bg-[#D6DEEA] mb-6 sm:mb-8" aria-hidden="true" />

          <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              <h2 className="tf-headline text-black mb-4 sm:mb-5">
                How AI Powers The Tokenization Foundation
              </h2>

              <p className="max-w-5xl tf-body text-black mb-5 sm:mb-6">
                The gap between available resources and the people who need them has never been a shortage of
                funding. It has been a shortage of infrastructure intelligent enough to move that funding
                accurately, transparently, and at scale. Our AI-powered core principle is built on &apos;Skills as
                Infrastructure&apos; and the question of how to move resources and capability simultaneously, at
                scale, with accountability. The most durable form of resource transfer is one that compounds.
                A payment moves once. A skill multiplies.
              </p>

              <p className="max-w-5xl tf-body text-black mb-5 sm:mb-6">
                At Tokenization Foundation, we embed skills augmentation directly into the distribution layer.
                As resources move to participants, AI simultaneously identifies skill gaps, surfaces relevant
                learning, and delivers certified capability - not generic training, but precise, context-specific
                expertise matched to each participant&apos;s situation and goals. AI augments both:
              </p>

              <p className="max-w-5xl tf-body text-black mb-3">
                <em>Practitioner intelligence.</em> Field practitioners are the most valuable layer of any
                distribution network. AI amplifies practitioners&apos; judgment by surfacing relevant context,
                flagging anomalies, and reducing administrative burden, allowing them to spend time with
                participants, not paperwork.
              </p>

              <p className="max-w-5xl tf-body text-black mb-6">
                <em>Precision allocation.</em> AI continuously analyzes need signals - geographic, contextual,
                and temporal - and routes resources to where they create the most impact. Reduced manual
                gatekeeping and committee delays. The system makes allocation decisions in real time, based on
                verifiable data.
              </p>

              <h3 className="tf-h3-italic text-black mb-3">
                What this means in practice:
              </h3>
              <ul className="max-w-5xl list-disc pl-6 sm:pl-8 lg:pl-10 space-y-2.5">
                <li className="tf-body text-black">
                  <strong>For participants,</strong> resources arrive with the knowledge to use them well,
                  whether that is financial literacy, agricultural technique, health protocol, or legal
                  understanding.
                </li>
                <li className="tf-body text-black">
                  <strong>For practitioners,</strong> AI surfaces relevant skills in real time, reducing the
                  time between identifying a need and addressing it.
                </li>
                <li className="tf-body text-black">
                  <strong>For funding organizations,</strong> every transfer is paired with capability data,
                  creating a longitudinal record of impact that goes beyond disbursement to measurable growth.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
