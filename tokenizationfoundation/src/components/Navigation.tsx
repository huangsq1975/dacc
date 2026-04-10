import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logoHoriz from '../assets/TK_Logo_Horiz_White_Tag.png'

interface NavigationProps {
  sectionIds?: string[]
  activeSection?: number
  onDotClick?: (index: number) => void
}

export default function Navigation({ sectionIds, activeSection = 0, onDotClick }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleTeamLink = () => {
    navigate('/team')
    setMobileOpen(false)
  }

  const navBarBg = 'bg-[#005dec]'

  const goToHomeFirstSection = () => {
    if (location.pathname === '/') return
    setMobileOpen(false)
    navigate({ pathname: '/', hash: '#hero' })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 overflow-visible ${navBarBg} transition-shadow duration-200 ${
          scrolled ? 'shadow-[0_2px_16px_rgba(0,0,0,0.25)]' : 'border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between">
            <div className="flex items-center min-w-0">
              <button
                type="button"
                onClick={goToHomeFirstSection}
                className="shrink-0 p-1 rounded flex items-center"
                aria-label="Go to first section"
              >
                <img
                  src={logoHoriz}
                  alt=""
                  className="h-9 sm:h-10 w-auto max-w-[140px] object-contain scale-[8] object-left"
                />
              </button>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              <a
                href="/approach"
                onClick={e => { e.preventDefault(); navigate('/approach') }}
                className="tf-body text-white/75 hover:text-white transition-colors tracking-wide text-[0.9rem]"
              >
                Approach
              </a>
              <button
                type="button"
                onClick={handleTeamLink}
                className="tf-body text-white/75 hover:text-white transition-colors tracking-wide text-[0.9rem]"
              >
                Team
              </button>
              <a
                href="/contact"
                onClick={e => { e.preventDefault(); navigate('/contact') }}
                className="px-5 py-2 border border-white/35 rounded text-white/85 hover:border-white hover:text-white text-[0.9rem] font-inter font-medium tracking-wide transition-all"
              >
                Contact
              </a>
            </nav>

            <button
              type="button"
              className="lg:hidden text-white/80 hover:text-white p-2 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <i className={`text-2xl transition-all ${mobileOpen ? 'ri-close-line' : 'ri-menu-line'}`} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className={`lg:hidden ${navBarBg} border-t border-white/10 mobile-menu-enter relative z-10`}>
            <nav className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-1">
              <a
                href="/approach"
                onClick={e => { e.preventDefault(); navigate('/approach'); setMobileOpen(false) }}
                className="tf-body text-white/75 hover:text-white py-3 border-b border-white/10 transition-colors"
              >
                Approach
              </a>
              <button
                type="button"
                onClick={handleTeamLink}
                className="tf-body text-white/75 hover:text-white py-3 border-b border-white/10 text-left transition-colors"
              >
                Team
              </button>
              <a
                href="/contact"
                onClick={e => { e.preventDefault(); navigate('/contact'); setMobileOpen(false) }}
                className="tf-body text-white/75 hover:text-white py-3 border-b border-white/10 transition-colors"
              >
                Contact
              </a>
              <a
                href="/contact#waitlist"
                onClick={e => {
                  e.preventDefault()
                  navigate('/contact#waitlist')
                  setMobileOpen(false)
                }}
                className="mt-3 px-5 py-3 border border-white/35 text-white/85 tf-body font-medium text-center hover:border-white hover:text-white transition-all rounded"
              >
                Join dSDR Token Waitlist
              </a>
            </nav>
          </div>
        )}
      </header>

      {sectionIds && sectionIds.length > 0 && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
          {sectionIds.map((id, i) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                onDotClick?.(i)
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group flex items-center gap-2"
              aria-label={`Go to section ${i + 1}`}
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  activeSection === i
                    ? 'w-3 h-3 bg-[#005dec]'
                    : 'w-2 h-2 bg-gray-400 hover:bg-gray-500'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </>
  )
}
