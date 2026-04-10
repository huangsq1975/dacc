import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'

type TeamMember = {
  name: string
  bio: string
  linkedin: string
  accent: string
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
    name: 'Serra M. Kaya',
    bio: 'Builds humanitarian and digital-finance partnerships to turn pledged capital into faster relief.',
    linkedin: 'https://www.linkedin.com/in/serra-kaya',
    accent: '#3264CC',
  },
  {
    name: 'Lynne R. Foster',
    bio: 'Leads product and operations to scale delivery with transparent governance and measurable impact.',
    linkedin: 'https://www.linkedin.com/in/lynne-foster',
    accent: '#1D4ED8',
  },
  {
    name: 'Anita S. Mehra',
    bio: 'Designs tokenization frameworks that improve traceability and speed disbursement across teams.',
    linkedin: 'https://www.linkedin.com/in/anita-mehra',
    accent: '#2563EB',
  },
  {
    name: 'Kerstin P. Holm',
    bio: 'Drives AI-powered oversight and analytics for real-time decisions and stronger partner accountability.',
    linkedin: 'https://www.linkedin.com/in/kerstin-holm',
    accent: '#3B82F6',
  },
]

export default function TeamPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-white min-h-screen">
      <Navigation />

      <main className="pt-28 pb-16 px-6 lg:px-8 bg-[#f8fafc]">
        <section className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-14">
            <h1 className="tf-headline text-[#0d1f3c] tracking-wide">
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
                  <LineAvatar seed={idx + 1} accent={member.accent} />
                </div>

                <div className="w-px h-6 bg-[#1a4f8a]/30 mb-4" aria-hidden="true" />

                <h3 className="font-inter font-semibold text-[#0d1f3c] text-base mb-3">
                  {member.name}
                </h3>

                <p className="tf-body text-gray-500 mb-6 min-h-[108px] text-sm leading-relaxed">
                  {member.bio}
                </p>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                  className="inline-flex items-center gap-2 text-sm font-inter font-medium text-[#1a4f8a] hover:text-[#0d3a6e] transition-colors"
                >
                  <span className="inline-flex items-center rounded border border-[#1a4f8a] overflow-hidden">
                    <span className="bg-[#1a4f8a] text-white px-2 py-1 text-xs leading-none font-bold">
                      in
                    </span>
                    <span className="px-2 py-1 text-xs leading-none bg-white">
                      LinkedIn
                    </span>
                  </span>
                </a>
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-14">
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="bg-[#0d1f3c] text-white tf-subhead-layer px-10 py-3.5 rounded hover:bg-[#1a3a6a] transition-colors"
            >
              Contact Us
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
