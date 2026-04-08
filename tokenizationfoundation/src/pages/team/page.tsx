import Navigation from '../../components/Navigation'
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
    bio: 'Leads strategic partnerships across humanitarian and digital finance ecosystems. Focuses on rapid deployment models that turn pledged capital into immediate relief outcomes.',
    linkedin: 'https://www.linkedin.com/in/serra-kaya',
    accent: '#3264CC',
  },
  {
    name: 'Lynne R. Foster',
    bio: 'Oversees product and operations with an emphasis on scalable delivery infrastructure. Aligns technical execution with transparent governance and measurable impact.',
    linkedin: 'https://www.linkedin.com/in/lynne-foster',
    accent: '#1D4ED8',
  },
  {
    name: 'Anita S. Mehra',
    bio: 'Designs tokenization frameworks that improve traceability and disbursement speed. Bridges policy, compliance, and engineering to support trusted aid pipelines.',
    linkedin: 'https://www.linkedin.com/in/anita-mehra',
    accent: '#2563EB',
  },
  {
    name: 'Kerstin P. Holm',
    bio: 'Drives AI-enabled oversight and analytics for real-time decision support. Works on data standards that strengthen accountability for institutional partners.',
    linkedin: 'https://www.linkedin.com/in/kerstin-holm',
    accent: '#3B82F6',
  },
]

export default function TeamPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-white min-h-screen">
      <Navigation />

      <main className="pt-28 pb-16 px-6 lg:px-8">
        <section className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-14">
            <div className="bg-[#3264CC] px-10 py-5 md:px-20 md:py-6">
              <h1 className="font-inter font-semibold text-white text-3xl md:text-5xl tracking-wide">
                Meet the Team
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
            {teamMembers.map((member, idx) => (
              <article
                key={member.name}
                className="flex flex-col items-center text-center border border-gray-200 bg-white px-5 py-6 rounded-lg shadow-sm"
              >
                <div className="w-full max-w-[200px] bg-[#0D47A1] text-white text-sm font-inter font-semibold py-1 rounded mb-4">
                  {member.name}
                </div>

                <div className="w-[170px] h-[170px] bg-white mb-4">
                  <LineAvatar seed={idx + 1} accent={member.accent} />
                </div>

                <span className="w-3 h-3 rounded-full bg-[#3264CC] mb-5" aria-hidden="true" />

                <p className="font-inter text-[14px] text-gray-700 leading-6 mb-5 min-h-[108px]">
                  {member.bio}
                </p>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="font-inter text-sm font-semibold text-[#3264CC] underline hover:text-[#244FB5] transition-colors"
                >
                  LinkedIn
                </a>
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-14">
            <button
              onClick={() => navigate('/contact')}
              className="bg-[#3264CC] text-white font-inter font-semibold text-2xl px-12 py-4 hover:bg-[#2857b8] transition-colors"
            >
              Contact Us
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
