import { useNavigate } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import tokenRole from '../../assets/TokenRole.png'
import centerVerticalLogo from '../../assets/TK_Logo_Vert_Blk_NoTag.png'

export default function Approach() {
  const navigate = useNavigate()

  return (
    <div className="bg-white min-h-screen">
      <Navigation />

      <main className="pt-24 sm:pt-28 pb-14 sm:pb-16 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6 sm:mb-8">
            <div className="p-4 sm:p-6 lg:p-8 bg-white">
              <div className="bg-[#2F64BD] px-3 py-3 sm:py-4 text-center rounded-lg">
                <h1 className="inline-block bg-white px-3 py-1 tf-h2 text-black leading-snug">
                  Reimaging A Fully Tokenized Ecosystem for Humanitarian Aid Capital
                </h1>
              </div>

              <div className="mt-4 rounded-2xl bg-[#005BDE] p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-[0.85fr_auto_minmax(0,0.375fr)_auto_0.85fr] items-center gap-4">
                  <div className="space-y-3">
                    <div className="rounded-2xl bg-white text-center tf-h3 text-black py-3 px-2">
                      Money Market Fund
                    </div>
                    <div className="rounded-2xl bg-white text-center tf-h3 text-black py-3 px-2">
                      Tokens
                    </div>
                  </div>

                  <div className="hidden md:flex justify-center text-[#7ED9FF] text-4xl font-bold">→</div>
                  <div className="flex md:hidden justify-center text-[#7ED9FF] text-3xl font-bold">↓</div>

                  <div className="rounded-[2rem] bg-white p-0 flex items-center justify-center aspect-square overflow-hidden w-full max-w-[180px] md:max-w-none mx-auto">
                    <img
                      src={centerVerticalLogo}
                      alt="Tokenization Foundation logo"
                      className="w-full h-full object-contain scale-[4]"
                    />
                  </div>

                  <div className="flex md:hidden justify-center text-[#7ED9FF] text-3xl font-bold">↓</div>
                  <div className="hidden md:flex justify-center text-[#7ED9FF] text-4xl font-bold">←</div>

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
                  { label: 'Blockchain', tone: 'bg-[#DAECFF] text-black' },
                  { label: 'AI Technology', tone: 'bg-[#BFD9FF] text-black' },
                  { label: 'Distribution Partners', tone: 'bg-[#8EBCFF] text-black' },
                  { label: 'Beneficiaries', tone: 'bg-[#3D89F2] text-white' },
                ].map(item => (
                  <div
                    key={item.label}
                    className={`rounded-lg border border-[#9EB5D7] py-3 text-center tf-h3 ${item.tone}`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6 sm:mb-8">
            <div className="bg-[#7F7F7F] p-4 sm:p-8">
              <button
                type="button"
                className="w-full sm:w-auto bg-white border border-[#7EA2E0] px-4 sm:px-6 py-3 text-left font-inter font-semibold text-black"
              >
                <span className="text-[#0A58FF]">Click</span> To Read Our White Paper (pdf)
              </button>
            </div>
            <div className="p-6 sm:p-8 lg:p-10">
              <h2 className="tf-h2 text-black mb-4 sm:mb-5">
                The dSDR Token Explained
              </h2>
              <p className="max-w-5xl font-inter leading-relaxed text-black">
                The network is designed for stability, participation, and long-term growth, with a fixed total
                supply of 10 billion tokens. Governance is led by a 10-member Governing Council of partners
                responsible for network oversight, stability, and adoption. Users can stake dSDR with validators
                to help secure the network and earn rewards, while validators and stakers actively contribute to
                ecosystem development. Tokens are gradually released from the treasury to support security and
                sustainable expansion. dSDR also serves as the network&apos;s governance token, powering services
                such as token minting, transactions, and reward incentives for adopting AI agents to amplify
                skills and impacts across stakeholders from donors, social workers to beneficiaries.
              </p>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6 sm:mb-8">
            <div className="p-6 sm:p-8 lg:p-10 bg-[#F5F5F5]">
              <h2 className="tf-h2 text-black mb-6 text-center">
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

          <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              <h2 className="tf-h2 text-black mb-4 sm:mb-5">
                How AI Powers The Tokenization Foundation
              </h2>

              <p className="max-w-5xl font-inter leading-relaxed text-black mb-5 sm:mb-6">
                The gap between available resources and the people who need them has never been a shortage of
                funding. It has been a shortage of infrastructure intelligent enough to move that funding
                accurately, transparently, and at scale. Our AI-powered core principle is built on &apos;Skills as
                Infrastructure&apos; and the question of how to move resources and capability simultaneously, at
                scale, with accountability. The most durable form of resource transfer is one that compounds.
                A payment moves once. A skill multiplies.
              </p>

              <p className="max-w-5xl font-inter leading-relaxed text-black mb-5 sm:mb-6">
                At Tokenization Foundation, we embed skills augmentation directly into the distribution layer.
                As resources move to participants, AI simultaneously identifies skill gaps, surfaces relevant
                learning, and delivers certified capability - not generic training, but precise, context-specific
                expertise matched to each participant&apos;s situation and goals. AI augments both:
              </p>

              <p className="max-w-5xl font-inter leading-relaxed text-black mb-3">
                <em>Practitioner intelligence.</em> Field practitioners are the most valuable layer of any
                distribution network. AI amplifies practitioners&apos; judgment by surfacing relevant context,
                flagging anomalies, and reducing administrative burden, allowing them to spend time with
                participants, not paperwork.
              </p>

              <p className="max-w-5xl font-inter leading-relaxed text-black mb-6">
                <em>Precision allocation.</em> AI continuously analyzes need signals - geographic, contextual,
                and temporal - and routes resources to where they create the most impact. Reduced manual
                gatekeeping and committee delays. The system makes allocation decisions in real time, based on
                verifiable data.
              </p>

              <h3 className="tf-h3-italic text-black mb-3">
                What this means in practice:
              </h3>
              <ul className="max-w-5xl list-disc pl-6 sm:pl-8 lg:pl-10 space-y-2.5">
                <li className="font-inter leading-relaxed text-black">
                  <strong>For participants,</strong> resources arrive with the knowledge to use them well,
                  whether that is financial literacy, agricultural technique, health protocol, or legal
                  understanding.
                </li>
                <li className="font-inter leading-relaxed text-black">
                  <strong>For practitioners,</strong> AI surfaces relevant skills in real time, reducing the
                  time between identifying a need and addressing it.
                </li>
                <li className="font-inter leading-relaxed text-black">
                  <strong>For funding organizations,</strong> every transfer is paired with capability data,
                  creating a longitudinal record of impact that goes beyond disbursement to measurable growth.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy-950 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-tfgold flex items-center justify-center">
                <span className="text-navy-900 font-bold text-sm font-inter">TF</span>
              </div>
              <span className="text-white/40 text-sm font-inter">Tokenization Foundation</span>
            </div>
            <p className="text-white/25 text-sm font-inter text-center">
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
