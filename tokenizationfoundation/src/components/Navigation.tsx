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
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const handleTeamLink = () => {
    navigate('/team')
    setMobileOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 overflow-visible bg-[#3264CC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo：版面維持 h-20，用 scale 放大顯示（不增加導覽列高度） */}
            <a
              href="/"
              className="group flex items-center gap-3"
              onClick={e => { e.preventDefault(); navigate('/') }}
            >
              <img
                src={logoHoriz}
                alt="Tokenization Foundation"
                className="h-30 w-auto max-w-[min(16%,200px)] origin-right scale-[3] object-contain object-right"
              />
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-10">
              <a
                href="/approach"
                onClick={e => { e.preventDefault(); navigate('/approach') }}
                className="text-base font-inter font-bold text-white hover:text-white/80 transition-colors"
              >
                Approach
              </a>
              <button
                onClick={handleTeamLink}
                className="text-base font-inter font-bold text-white hover:text-white/80 transition-colors"
              >
                Team
              </button>
              <a
                href="/contact"
                onClick={e => { e.preventDefault(); navigate('/contact') }}
                className="px-6 py-2 border-2 border-white text-white font-inter font-bold text-base hover:bg-white hover:text-[#3264CC] transition-all"
              >
                Contact
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <i className={`text-2xl transition-all ${mobileOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#3264CC] border-t border-white/20 mobile-menu-enter relative z-10">
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
              <a
                href="/approach"
                onClick={e => { e.preventDefault(); navigate('/approach'); setMobileOpen(false) }}
                className="text-base font-inter font-bold text-white py-2 border-b border-white/20"
              >
                Approach
              </a>
              <button
                onClick={handleTeamLink}
                className="text-base font-inter font-bold text-white py-2 border-b border-white/20 text-left"
              >
                Team
              </button>
              <a
                href="/contact"
                onClick={e => { e.preventDefault(); navigate('/contact'); setMobileOpen(false) }}
                className="text-base font-inter font-bold text-white py-2 border-b border-white/20"
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
                className="mt-2 px-6 py-3 border-2 border-white text-white font-inter font-bold text-base text-center"
              >
                Join dSDR Token Waitlist
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Section Dot Indicators (home page only) */}
      {sectionIds && sectionIds.length > 0 && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
          {sectionIds.map((id, i) => (
            <button
              key={id}
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
                    ? 'w-3 h-3 bg-[#3264CC]'
                    : 'w-2 h-2 bg-gray-400 hover:bg-gray-600'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </>
  )
}
