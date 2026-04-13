import { useCallback, useEffect, useState } from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import serraLine from '../../assets/Serra_line.png'
import lynee from '../../assets/Lynee.png'
import anitaLine from '../../assets/Anita_line.png'
import kerstinLine from '../../assets/Kerstin_line.png'
import linkedinIcon from '../../assets/linkedin.png'

type BioSegment = { text: string; bold?: boolean }

type TeamMember = {
  name: string
  title: string
  oneLiner: string
  fullBio: BioSegment[][]
  linkedin: string
  accent: string
  imageSrc?: string
}

function LineAvatar({ seed, accent }: { seed: number; accent: string }) {
  const hairOffset = (seed % 5) - 2
  const smileCurve = (seed % 7) - 3
  const shoulderWidth = 58 + (seed % 8)

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" role="img" aria-label="Team member illustration">
      <rect x="1" y="1" width="118" height="118" fill="#f8fafc" stroke="#d1d5db" strokeWidth="2" />
      <path
        d={`M25 ${44 + hairOffset} Q60 ${20 + hairOffset} 95 ${44 + hairOffset}`}
        fill="none"
        stroke="#111827"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="60" cy="56" r="23" fill="none" stroke="#111827" strokeWidth="2.6" />
      <circle cx="52" cy="54" r="1.8" fill="#111827" />
      <circle cx="68" cy="54" r="1.8" fill="#111827" />
      <path
        d={`M50 67 Q60 ${70 + smileCurve} 70 67`}
        fill="none"
        stroke="#111827"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d={`M${60 - shoulderWidth / 2} 106 Q60 82 ${60 + shoulderWidth / 2} 106`}
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

const teamMembers: TeamMember[] = [
  {
    name: 'Serena Wei',
    title: 'Cofounder',
    oneLiner: 'Bringing vision, strategy, and compassion to lead and scale the business.',
    fullBio: [
      [
        {
          text: "Serra's entrepreneurship journey started when she was approached by a VC and given millions to start ",
        },
        { text: 'Aegis Trust', bold: true },
        {
          text: ', a SEC qualified custodian while she was investing at a San Francisco-based fund. Before that, she worked at ',
        },
        { text: 'Goldman Sachs', bold: true },
        { text: ' and got her MBA from ', bold: false },
        { text: 'Stanford Business School', bold: true },
        { text: '.', bold: false },
      ],
      [
        { text: 'Serra founded ', bold: false },
        { text: 'Digital Asset Clearing Center', bold: true },
        {
          text: ", which provides seamless connections to the world's leading payment systems, blockchain networks, and compliance infrastructure delivering end-to-end Clearing-as-a-Service (CaaS) for financial institutions. To align her vision, she took a partnership integration strategy and brought several publicly traded companies on the cap table. By truly listening to perspectives from people in Hong Kong, Chinese mainland and the globe, she navigates a nascent market with openhearted compassion, leading to new cooperation between parties for business growth and that benefits everyone. ",
          bold: false,
        },
      ],
      [
        { text: 'At ', bold: false },
        { text: 'Tokenization Foundation', bold: true },
        {
          text: ', Serra integrates human values into technology infrastructure to embrace a more holistic vision of progress that honors the complexities of our shared humanity. Her ability to use resources to heal, uplift, and meet the urgent challenges of our time uncovers new ways to drive systemic change and contribute to the collective good.',
          bold: false,
        },
      ],
    ],
    linkedin: 'https://www.linkedin.com/in/serra-angel-wei-63118216/',
    accent: '#0066ff',
    imageSrc: serraLine,
  },
  {
    name: 'Lynne Marlor',
    title: 'Cofounder',
    oneLiner:
      'Driving capital strategy, financial structuring, and  investor relationships to create ecosystem value.',
    fullBio: [
      [
        { text: 'Lynne Marlor', bold: true },
        {
          text: ' is a capital markets, fintech, and asset management expert who transitioned from traditional finance into blockchain and digital assets after completing the ',
        },
        { text: 'Oxford Blockchain Strategy Programme', bold: true },
        {
          text: ' in 2018. She brings deep expertise across digital assets, AI, tokenization, and Web3, and has built leading industry platforms including the ',
        },
        { text: 'Women in Digital Assets® Forum', bold: true },
        { text: ' and the ', bold: false },
        { text: 'Boston Blockchain Association', bold: true },
        { text: '.', bold: false },
      ],
      [
        { text: 'Currently, Lynne serves on the boards of ', bold: false },
        { text: 'Aegis Trust', bold: true },
        { text: ', South Dakota, and the ', bold: false },
        { text: 'Digital Asset Clearing Centre,', bold: true },
        { text: ' Hong Kong, and leads ', bold: false },
        { text: 'Transformational Strategies, LLC, ', bold: true },
        {
          text: 'advising financial institutions globally. She previously served as a Managing Director at ',
        },
        { text: 'BNY Mellon', bold: true },
        {
          text: ', overseeing non-bank financial services across capital markets infrastructure.',
          bold: false,
        },
      ],
      [
        { text: 'At the ', bold: false },
        { text: 'Tokenization Foundation', bold: true },
        {
          text: ', Lynne is redesigning the humanitarian aid infrastructure using AI, blockchain, and digital assets to address massive fragmentation, inefficiency, and delays in global crisis funding systems.',
          bold: false,
        },
      ],
    ],
    linkedin: 'https://www.linkedin.com/in/lynne-marlor-23a741a/',
    accent: '#005dec',
    imageSrc: lynee,
  },
  {
    name: 'Anitha Vadavath',
    title: 'AI & Investor Relations',
    oneLiner: 'Driving ground-breaking AI, exceptional technologies, and tokenization.',
    fullBio: [
      [
        {
          text: 'Driving AI, biotech, and exponential technologies and tokenization at the intersection of deeptech, capital, and global impact.',
        },
      ],
      [
        {
          text: 'Anitha Vadavatha brings over 20+ years of deep and hyphenated career across technology, venture capital, financial services, and global affairs. She is Founder and Managing Partner of AB Plus Ventures and Misu Labs, investing and building at the convergence of AI, biotech, and next-generation markets. She currently serves as Venture Partner at Sync.vc and Republic, Senior Advisor at Popstar Ventures and Kudish Family Office.',
        },
      ],
      [
        {
          text: 'Formerly a Partner at Urth Capital Advisors (Fund of Funds), a member of the Strategic advisory council of Shadow Ventures (Proptech VC), Managing Director of Emerging Star Capital, and an early and growth stage operator in two exited tech unicorns (EdCast, acquired, PartyGaming, IPO), her experience includes GE Capital, Big 4 payments/banking consulting, and advisory roles with AI, biotech and deeptech companies.',
        },
      ],
      [
        {
          text: 'An alumna of Singularity University with executive education across global management and emerging markets, she was recognized as a "Top Ten Frontier Woman" by the UN–Fifth Element Group in partnership with Thomson Reuters and Morningstar. A global speaker and thought leader at \'Innovation, Science and Technology\' forums, she was an invited delegate at the UN SDG, UNGA, IMF and World Bank Annual Meeting, and Davos. She led the India China America Institute (a research think tank on emerging markets) and was an esteemed member of Andhra Pradesh (India) FinTech Core (an independent advisory to the state).',
        },
      ],
      [
        {
          text: 'At the Tokenization Foundation, Anitha is designing groundbreaking AI humanitarian aid infrastructure (Precision and Practitioner Adaptive Intelligence, or PPAI) and accelerating strategic capital and stakeholder development, interfacing with capital, organizations, and participants who are moving capital and capability together.',
        },
      ],
    ],
    linkedin: 'https://www.linkedin.com/in/anivadavath/',
    accent: '#0071bc',
    imageSrc: anitaLine,
  },
  {
    name: 'Kerstin Krall Walz',
    title: 'Marketing',
    oneLiner: 'Shaping strategy, building brand, and generating leads to accelerate awareness and engagement.',
    fullBio: [
      [
        { text: 'Kerstin is a marketing executive with deep experience in ', bold: false },
        { text: 'brand building ', bold: true },
        { text: 'and ', bold: false },
        { text: 'digital assets', bold: true },
        {
          text: ' focusing on building awareness and procuring qualified leads.',
          bold: false,
        },
      ],
      [
        {
          text: 'She spent the first part of her career at "Madison Avenue" agencies including ',
        },
        { text: 'Saatchi & Saatchi ', bold: true },
        { text: 'and ', bold: false },
        { text: 'Young & Rubicam', bold: true },
        {
          text: ", working across megabrands such as Campbell's Soup Company, International Olympic Committee (IOC), The Star Alliance Network, Lufthansa Airlines, Smirnoff Vodka, and the United States Tennis Association/U.S. Open.",
        },
      ],
      [
        { text: 'More recently, as ', bold: false },
        { text: 'Chief Marketing Officer ', bold: true },
        { text: 'at ', bold: false },
        { text: 'Digital Asset Research', bold: true },
        {
          text: ', Kerstin led global marketing strategy, positioning the firm as a leader in institutional-grade crypto data and driving partnerships with organizations such as FTSE Russell and Bloomberg. She has also contributed to strategic initiatives across the digital asset ecosystem, including work with Vigil Markets and Digital Ascension Group.',
          bold: false,
        },
      ],
      [
        {
          text: 'She brings a unique blend of brand strategy and growth execution, while ',
        },
        {
          text: 'translating complex cryptocurrency concepts into actionable insights ',
          bold: true,
        },
        {
          text: 'for institutional audiences—including asset managers, custodians, index providers, hedge funds, and HNWIs.',
        },
      ],
      [
        { text: 'At the ', bold: false },
        { text: 'Tokenization Foundation', bold: true },
        {
          text: ", Kerstin leads marketing to scale awareness and engagement for the world's first crisis capital infrastructure—where capital flows automatically fund disaster response and humanitarian relief.",
          bold: false,
        },
      ],
    ],
    linkedin: 'https://www.linkedin.com/in/kerstin-krall-walz-00066415b/',
    accent: '#0066ff',
    imageSrc: kerstinLine,
  },
]

function FullBioModal({
  member,
  onClose,
}: {
  member: TeamMember
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-bio-modal-title"
        className="flex max-h-[min(32rem,85vh)] w-full max-w-lg flex-col rounded-lg border border-gray-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-gray-100 px-5 py-4">
          <div className="min-w-0 text-left">
            <h2 id="team-bio-modal-title" className="font-inter text-lg font-semibold text-[#0066cc]">
              {member.name}
            </h2>
            <p className="font-inter text-xs uppercase tracking-widest text-gray-400">{member.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 [-webkit-overflow-scrolling:touch]">
          <div className="space-y-3 text-left">
            {member.fullBio.map((segments, i) => (
              <p key={i} className="tf-body text-sm leading-relaxed text-gray-600">
                {segments.map((seg, j) =>
                  seg.bold ? (
                    <strong key={j} className="font-semibold text-gray-800">
                      {seg.text}
                    </strong>
                  ) : (
                    <span key={j}>{seg.text}</span>
                  ),
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TeamPage() {
  const navigate = useNavigate()
  const [bioModalMember, setBioModalMember] = useState<TeamMember | null>(null)
  const closeBioModal = useCallback(() => setBioModalMember(null), [])

  return (
    <div className="bg-white min-h-screen">
      <Navigation />

      <main className="pt-28 pb-16 px-6 lg:px-8 bg-[#f8fafc]">
        <section className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-14">
            <h1 className="tf-headline text-[#0066cc] tracking-wide">
              Meet the Team
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <article
                key={member.name}
                className="flex flex-col items-center text-center border border-gray-200 bg-white px-5 py-7 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-[160px] h-[160px] mb-5">
                  {member.imageSrc ? (
                    <img
                      src={member.imageSrc}
                      alt={member.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <LineAvatar seed={idx + 1} accent={member.accent} />
                  )}
                </div>

                <div className="w-px h-6 bg-[#005dec]/30 mb-4" aria-hidden="true" />

                <h3 className="font-inter font-semibold text-[#0066cc] text-base mb-1">
                  {member.name}
                </h3>
                <p className="font-inter text-xs text-gray-400 uppercase tracking-widest mb-4">
                  {member.title}
                </p>

                <div className="mb-6 w-full max-w-sm">
                  <button
                    type="button"
                    onClick={() => setBioModalMember(member)}
                    className="tf-body w-full text-center text-sm leading-relaxed text-gray-500 underline decoration-dotted decoration-gray-400 underline-offset-2 hover:text-gray-700"
                  >
                    {member.oneLiner}
                  </button>
                  <p className="mt-2 font-inter text-xs text-gray-400">Click to read the full biography</p>
                </div>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                  className="inline-flex items-center mt-auto opacity-90 hover:opacity-100 transition-opacity"
                >
                  <img
                    src={linkedinIcon}
                    alt=""
                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                  />
                </a>
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-14">
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="bg-[#0071bc] text-white tf-subhead-layer px-10 py-3.5 rounded hover:bg-[#0066cc] transition-colors"
            >
              Contact Us
            </button>
          </div>
        </section>
      </main>
      {bioModalMember && <FullBioModal member={bioModalMember} onClose={closeBioModal} />}
      <Footer />
    </div>
  )
}
