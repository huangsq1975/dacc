import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface NavigationProps {
  /** Sections for dot indicator (home page only) */
  sectionIds?: string[]
  activeSection?: number
  onDotClick?: (index: number) => void
}

export default function Navigation({ sectionIds, activeSection = 0, onDotClick }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleTeamLink = () => {
    if (isHome) {
      scrollToSection('team')
    } else {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById('team')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
    setMobileOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen ? 'nav-glass border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2 group"
              onClick={e => { e.preventDefault(); navigate('/') }}
            >
              <div className="w-8 h-8 rounded-full bg-tfgold flex items-center justify-center flex-shrink-0">
                <span className="text-navy-900 font-bold text-xs font-inter">TF</span>
              </div>
              <span className="text-white font-inter font-semibold text-sm lg:text-base tracking-wide group-hover:text-tfgold transition-colors">
                Tokenization Foundation
              </span>
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-8">
              <a
                href="/approach"
                onClick={e => { e.preventDefault(); navigate('/approach') }}
                className={`text-sm font-inter font-medium transition-colors hover:text-tfgold ${
                  location.pathname === '/approach' ? 'text-tfgold' : 'text-white/80'
                }`}
              >
                Approach
              </a>
              <button
                onClick={handleTeamLink}
                className="text-sm font-inter font-medium text-white/80 hover:text-tfgold transition-colors"
              >
                Team
              </button>
              <a
                href="/contact"
                onClick={e => { e.preventDefault(); navigate('/contact') }}
                className={`text-sm font-inter font-medium transition-colors hover:text-tfgold ${
                  location.pathname === '/contact' ? 'text-tfgold' : 'text-white/80'
                }`}
              >
                Contact
              </a>
              <a
                href="/contact#waitlist"
                onClick={e => {
                  e.preventDefault()
                  navigate('/contact')
                  setTimeout(() => {
                    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                  }, 200)
                }}
                className="px-5 py-2 bg-tfgold text-navy-900 rounded-full text-sm font-inter font-semibold hover:bg-tfgold-light transition-colors whitespace-nowrap"
              >
                Join dSDR Waitlist
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
          <div className="lg:hidden nav-glass border-t border-white/10 mobile-menu-enter">
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
              <a
                href="/approach"
                onClick={e => { e.preventDefault(); navigate('/approach'); setMobileOpen(false) }}
                className="text-lg font-inter font-medium text-white hover:text-tfgold transition-colors py-2 border-b border-white/10"
              >
                Approach
              </a>
              <button
                onClick={handleTeamLink}
                className="text-lg font-inter font-medium text-white hover:text-tfgold transition-colors py-2 border-b border-white/10 text-left"
              >
                Team
              </button>
              <a
                href="/contact"
                onClick={e => { e.preventDefault(); navigate('/contact'); setMobileOpen(false) }}
                className="text-lg font-inter font-medium text-white hover:text-tfgold transition-colors py-2 border-b border-white/10"
              >
                Contact
              </a>
              <a
                href="/contact#waitlist"
                onClick={e => {
                  e.preventDefault()
                  navigate('/contact')
                  setTimeout(() => {
                    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                  }, 200)
                  setMobileOpen(false)
                }}
                className="mt-2 px-6 py-3 bg-tfgold text-navy-900 rounded-full text-base font-inter font-semibold text-center hover:bg-tfgold-light transition-colors"
              >
                Join dSDR Token Waitlist
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Section Dot Indicators (desktop, home page only) */}
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
              <span className={`hidden group-hover:block text-xs font-inter text-white/60 whitespace-nowrap transition-all`}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </span>
              <div
                className={`rounded-full transition-all duration-300 ${
                  activeSection === i
                    ? 'w-3 h-3 bg-tfgold'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </>
  )
}
