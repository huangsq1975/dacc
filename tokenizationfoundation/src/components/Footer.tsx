import { useNavigate } from 'react-router-dom'
import logoHoriz from '../assets/TK_Logo_Horiz_White_Tag.png'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="bg-[#0d1f3c] text-white/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mb-5 block"
              aria-label="Home"
            >
              <img
                src={logoHoriz}
                alt="Tokenization Foundation"
                className="h-8 w-auto object-contain scale-[8] object-left"
              />
            </button>
            <p className="text-sm leading-relaxed max-w-sm text-white/55 mt-8">
              Reimagining crisis capital infrastructure—with AI, blockchain, and digital assets—so that
              humanitarian aid is funded instantly, transparently, and at scale.
            </p>
            <a
              href="mailto:info@tokenizationfoundation.org"
              className="mt-5 inline-flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors"
            >
              <i className="ri-mail-line text-base" />
              info@tokenizationfoundation.org
            </a>
          </div>

          <div>
            <h4 className="text-white text-sm font-inter font-semibold tracking-widest uppercase mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Approach', path: '/approach' },
                { label: 'Team', path: '/team' },
                { label: 'Contact', path: '/contact' },
              ].map(item => (
                <li key={item.path}>
                  <button
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-inter font-semibold tracking-widest uppercase mb-5">
              Get Involved
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Contact Us', path: '/contact#contact-form' },
                { label: 'Join the Council', path: '/contact#council' },
                { label: 'Join dSDR Waitlist', path: '/contact#waitlist' },
              ].map(item => (
                <li key={item.path}>
                  <button
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-inter font-semibold tracking-widest uppercase mb-5">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="text-sm text-white/55 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Tokenization Foundation. All rights reserved. Registered in the United
            States.
          </p>
          <a
            href="https://www.linkedin.com/company/tokenization-foundation"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tokenization Foundation on LinkedIn"
            className="inline-flex items-center gap-2 text-xs text-white/45 hover:text-white transition-colors"
          >
            <i className="ri-linkedin-box-fill text-4xl text-white" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
