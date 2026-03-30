import { useState, useEffect } from 'react';

export default function RWAPlatformEN() {
  const [scrolled, setScrolled] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── Floating Nav Desktop ── */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
        <nav className={`${scrolled ? 'bg-white/95 shadow-lg' : 'bg-white/80'} backdrop-blur-md border border-[#b8d9ed] rounded-full px-6 py-3 transition-all duration-300`}>
          <div className="flex items-center justify-center space-x-8">
            <a href="/en" className="cursor-pointer flex-shrink-0">
              <img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" alt="DACC Logo" className="h-6 w-auto object-contain" />
            </a>
            <a href="/en#Services" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-medium">Services</a>
            <div className="relative" onMouseEnter={() => setSolutionsDropdownOpen(true)} onMouseLeave={() => setSolutionsDropdownOpen(false)}>
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-medium">
                Solutions<i className={`ri-arrow-down-s-line transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {solutionsDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-56 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/hot-wallet-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Hot Wallet Integration</a>
                    <a href="/cold-wallet-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Cold Wallet</a>
                    <a href="/rwa-platform-en" className="block px-4 py-2 text-sm text-[#f5b942] font-semibold hover:bg-[#e8f4fb] transition-colors">RWA Tokenization Platform</a>
                    <a href="/chain-fusion-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">ChainFusion</a>
                  </div>
                </div>
              )}
            </div>
            <div className="relative" onMouseEnter={() => setUseCasesDropdownOpen(true)} onMouseLeave={() => setUseCasesDropdownOpen(false)}>
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-medium">
                Use Cases<i className={`ri-arrow-down-s-line transition-transform duration-200 ${useCasesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {useCasesDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-64 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/use-case-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Global Merchants x DACC</a>
                    <a href="/use-case-ttl-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">TTL × DACC</a>
                    <a href="/use-case-conflux-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Conflux x DACC</a>
                    <a href="/use-case-vatp-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Crypto Exchanges x DACC</a>
                  </div>
                </div>
              )}
            </div>
            <a href="/en#ecosystem" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-medium">Investors</a>
            <a href="/blog-en" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-medium">News</a>
            <a href="/contact-en" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm flex items-center whitespace-nowrap font-medium">
              Contact Us<i className="ri-arrow-right-up-line ml-1 text-xs"></i>
            </a>
          </div>
        </nav>
      </div>

      {/* ── Mobile Top Bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-b border-[#b8d9ed] shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <a href="/en"><img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" alt="DACC Logo" className="h-8 w-auto object-contain" /></a>
          <div className="flex items-center space-x-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="bg-[#e8f4fb] border border-[#b8d9ed] rounded-full px-4 py-2 text-[#1e6b8a]">
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
            <a href="/rwa-platform" className="bg-[#e8f4fb] border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] whitespace-nowrap font-medium">中文</a>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1e6b8a]/95 backdrop-blur-md z-40 lg:hidden pt-20">
          {!mobileSubmenu && (
            <div className="px-6 py-8 space-y-2">
              <a href="/en#Services" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>Services</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </a>
              <button onClick={() => setMobileSubmenu('solutions')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>Solutions</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </button>
              <button onClick={() => setMobileSubmenu('useCases')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>Use Cases</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </button>
              <a href="/en#ecosystem" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>Investors</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </a>
              <a href="/blog-en" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>News</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </a>
              <a href="/contact-en" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>Contact Us</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </a>
            </div>
          )}
          {mobileSubmenu === 'solutions' && (
            <div>
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">Solutions</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6 space-y-2">
                <a href="/hot-wallet-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">Hot Wallet Integration</a>
                <a href="/cold-wallet-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">Cold Wallet</a>
                <a href="/rwa-platform-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#f5b942] border-b border-white/20">RWA Tokenization Platform</a>
                <a href="/chain-fusion-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">ChainFusion</a>
              </div>
            </div>
          )}
          {mobileSubmenu === 'useCases' && (
            <div>
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">Use Cases</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6 space-y-2">
                <a href="/use-case-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">Global Merchants x DACC</a>
                <a href="/use-case-ttl-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">TTL × DACC</a>
                <a href="/use-case-conflux-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">Conflux x DACC</a>
                <a href="/use-case-vatp-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">Crypto Exchanges x DACC</a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Language Switcher Desktop ── */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <a href="/rwa-platform" className="bg-white/80 backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 font-medium shadow-md whitespace-nowrap cursor-pointer">中文</a>
      </div>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=abstract%20dark%20teal%20blue%20gradient%20background%20with%20glowing%20digital%20asset%20token%20symbols%20and%20blockchain%20network%20nodes%20flowing%20across%20a%20deep%20ocean%20blue%20canvas%2C%20soft%20golden%20light%20rays%2C%20futuristic%20fintech%20tokenization%20atmosphere%2C%20ultra%20wide%20cinematic%20composition%2C%20no%20text%2C%20no%20people&width=1440&height=900&seq=rwaen001&orientation=landscape"
            alt="RWA Platform Hero"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f3d52]/80 via-[#1e6b8a]/70 to-[#0f3d52]/90"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 pt-24 w-full">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 rounded-full px-5 py-2 mb-8">
            <div className="w-2 h-2 bg-[#f5b942] rounded-full animate-pulse"></div>
            <span className="text-sm text-white/90 font-medium tracking-wide">RWA Tokenization Platform</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            RWA Tokenization
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-4 leading-relaxed">
            One-Stop Solution for Financial Institutions &amp; Asset Owners
          </p>
          <p className="text-base text-white/60 max-w-2xl mx-auto mb-10">
            Built on Standardized Token Data Structure + Multi-Party Digital Signatures + Custody Coordination, supporting on-chain issuance of bonds, funds, receivables, carbon credits, and more
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact-en" className="bg-[#f5b942] hover:bg-[#e0a830] text-[#1e3a4a] px-8 py-4 rounded-full font-bold transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg">
              Schedule Product Demo
            </a>
            <a href="/contact-en" className="bg-white/10 border border-white/40 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              Request Project Assessment
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-white/70">
            <div className="flex items-center space-x-2">
              <i className="ri-checkbox-circle-fill text-[#f5b942]"></i>
              <span>Verifiable, Traceable &amp; Auditable</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-checkbox-circle-fill text-[#f5b942]"></i>
              <span>Standardized 4-Step Issuance</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-checkbox-circle-fill text-[#f5b942]"></i>
              <span>Custody · Distribution · Settlement</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <i className="ri-arrow-down-line text-white/50 text-2xl"></i>
        </div>
      </section>

      {/* ══════════════════════════════════════
          Supported Asset Types — Logo Grid
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">Supported Asset Types</h2>
          <p className="text-[#4a5568] mb-14 max-w-xl mx-auto">A unified platform supporting tokenization of diverse real-world assets across multiple categories</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-10">
            {[
              { icon: 'ri-file-chart-line', label: 'Bonds' },
              { icon: 'ri-funds-line', label: 'Funds' },
              { icon: 'ri-bill-line', label: 'Receivables' },
              { icon: 'ri-exchange-dollar-line', label: 'Trade Debt' },
              { icon: 'ri-leaf-line', label: 'Carbon Credits' },
              { icon: 'ri-drop-line', label: 'Water Rights' },
              { icon: 'ri-palette-line', label: 'Art' },
              { icon: 'ri-more-line', label: 'More Assets' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center justify-center p-4 rounded-2xl border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-md transition-all duration-300 cursor-default group">
                <div className="w-10 h-10 flex items-center justify-center mb-2">
                  <i className={`${item.icon} text-2xl text-[#1e6b8a] group-hover:text-[#f5b942] transition-colors`}></i>
                </div>
                <span className="text-xs font-semibold text-[#4a5568] group-hover:text-[#1e6b8a] transition-colors text-center leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact-en" className="inline-flex items-center gap-2 bg-[#1e6b8a] hover:bg-[#155a75] text-white px-7 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              Explore All Asset Types<i className="ri-arrow-right-line"></i>
            </a>
            <a href="/contact-en" className="inline-flex items-center gap-2 border border-[#1e6b8a] text-[#1e6b8a] hover:bg-[#e8f4fb] px-7 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              Request Custom Assessment
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          Product Value — 2×2 Cards
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-[#f7fbfe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">Core Product Value</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">Three pillars that make DACC RWA Platform the trusted choice for institutional asset tokenization</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: 'ri-shield-check-line',
                color: 'bg-[#dbeafe]',
                iconColor: 'text-[#1e6b8a]',
                title: 'Issue Trusted On-Chain Assets',
                desc: 'Standardized metadata format ensures asset information is readable, verifiable, and permanently linked',
                points: ['Standardized asset metadata with full readability', 'Permanent URI links with supporting documents', 'Multi-party digital signatures for authenticity'],
              },
              {
                icon: 'ri-links-line',
                color: 'bg-[#fef3c7]',
                iconColor: 'text-[#d97706]',
                title: 'One-Stop: Tokenization → Custody → Distribution',
                desc: 'Manage the full lifecycle of tokenized assets on a single integrated platform',
                points: ['Multiple asset types on one platform', 'Direct transfer to custody wallet post-issuance', 'Broker distribution & ownership transfer support'],
              },
              {
                icon: 'ri-file-list-3-line',
                color: 'bg-[#d1fae5]',
                iconColor: 'text-[#059669]',
                title: 'Compliance-Oriented Design',
                desc: 'Built-in compliance controls aligned with regulatory requirements from day one',
                points: ['Whitelist address issuance mechanism', 'Public or encrypted document presentation', 'KYC, KYT & regulatory process control'],
              },
              {
                icon: 'ri-building-4-line',
                color: 'bg-[#ede9fe]',
                iconColor: 'text-[#7c3aed]',
                title: 'Flexible Deployment & Integration',
                desc: 'Adaptable architecture that fits into your existing infrastructure without disruption',
                points: ['On-Prem / SaaS flexible deployment', 'API-first design for seamless integration', 'White-label ready for institutional branding'],
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-5`}>
                  <i className={`${item.icon} text-2xl ${item.iconColor}`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#1e3a4a] mb-2">{item.title}</h3>
                <p className="text-[#4a5568] text-sm mb-4">{item.desc}</p>
                <ul className="space-y-2">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-[#4a5568]">
                      <i className="ri-checkbox-circle-fill text-[#1e6b8a]"></i>{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          Dual Token Structure — Architecture Diagram
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">Dual Token Architecture</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">A clear separation between asset proof and ownership proof — enabling liquidity while assets remain in custody</p>
          </div>

          <div className="bg-[#f7fbfe] rounded-3xl p-8 border border-[#e8f4fb]">
            {/* Top label */}
            <div className="bg-gradient-to-r from-[#1e6b8a] to-[#155a75] rounded-2xl p-5 text-center mb-4 shadow-md">
              <p className="text-white/70 text-xs font-medium mb-1 tracking-widest uppercase">DACC RWA Platform</p>
              <p className="text-white text-xl font-bold">Token Issuance Engine</p>
              <div className="flex justify-center gap-4 mt-3">
                {['Upload', 'Review', 'Confirm', 'On-Chain'].map((t) => (
                  <span key={t} className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-0.5 h-8 bg-[#b8d9ed]"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-6 border border-[#b8d9ed] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                    <i className="ri-file-shield-line text-[#1e6b8a] text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[#1e6b8a] font-bold text-sm">Issuance Token</p>
                    <p className="text-[#4a5568] text-xs">Proof of Asset</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">Represents the underlying asset itself</div>
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">Contains issuance details, documents &amp; signatures</div>
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">Verifiable proof of asset existence &amp; authenticity</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[#b8d9ed] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#fef3c7] rounded-lg flex items-center justify-center">
                    <i className="ri-user-star-line text-[#d97706] text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[#1e6b8a] font-bold text-sm">Ownership Token</p>
                    <p className="text-[#4a5568] text-xs">Proof of Ownership</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">Represents ownership of the asset (divisible)</div>
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">Ownership transfers recorded on-chain</div>
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">Liquidity while assets remain in custody</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-0.5 h-8 bg-[#b8d9ed]"></div>
            </div>
            <div className="bg-[#1e3a4a] rounded-2xl p-5 text-center shadow-md">
              <p className="text-white/60 text-xs font-medium mb-1 tracking-widest uppercase">Custody &amp; Settlement Layer</p>
              <p className="text-white text-lg font-bold">Custody Wallet · Broker Distribution · On-Chain Settlement</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { icon: 'ri-tools-line', title: 'No Infrastructure Replacement', desc: 'DACC RWA Platform overlays your existing systems, protecting current investment' },
              { icon: 'ri-git-branch-line', title: 'Multiple Deployment Options', desc: 'On-Prem, SaaS, or white-label — choose the model that fits your institution' },
              { icon: 'ri-verified-badge-line', title: 'Audit-Ready by Design', desc: 'Operation logs, permission controls, and platform terms meet full audit requirements' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-6 rounded-2xl border border-[#e8f4fb] hover:border-[#1e6b8a] transition-all duration-300">
                <div className="w-12 h-12 bg-[#e8f4fb] rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`${item.icon} text-xl text-[#1e6b8a]`}></i>
                </div>
                <div>
                  <h4 className="font-bold text-[#1e3a4a] mb-1">{item.title}</h4>
                  <p className="text-sm text-[#4a5568]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          Standardized Issuance Process — 4 Steps
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-[#f7fbfe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">Standardized Issuance Process</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">A clear, repeatable 4-step workflow from asset upload to on-chain token issuance</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', icon: 'ri-upload-cloud-line', title: 'Upload Asset Info', desc: 'Asset owner uploads asset information and supporting documents via the frontend portal' },
              { step: '2', icon: 'ri-search-eye-line', title: 'Platform Review', desc: 'Platform administrator reviews and validates the submitted data via the backend' },
              { step: '3', icon: 'ri-check-double-line', title: 'Confirm Issuance', desc: 'Asset owner acknowledges and confirms the issuance parameters and details' },
              { step: '4', icon: 'ri-links-line', title: 'On-Chain Issuance', desc: 'Platform administrator executes on-chain token issuance to whitelisted addresses' },
            ].map((item, idx) => (
              <div key={item.step} className="relative bg-white rounded-2xl p-7 border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300 text-center">
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <i className="ri-arrow-right-line text-[#b8d9ed] text-xl"></i>
                  </div>
                )}
                <div className="w-14 h-14 bg-[#e8f4fb] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#1e6b8a]">{item.step}</span>
                </div>
                <div className="w-10 h-10 bg-[#f7fbfe] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <i className={`${item.icon} text-xl text-[#1e6b8a]`}></i>
                </div>
                <h3 className="text-base font-bold text-[#1e3a4a] mb-2">{item.title}</h3>
                <p className="text-sm text-[#4a5568] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 bg-gradient-to-r from-[#e8f4fb] to-[#dbeafe] rounded-2xl border border-[#b8d9ed] text-center">
            <p className="text-[#1e6b8a] font-medium">From concept to on-chain issuance — a fully standardized, auditable, and repeatable workflow</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          Core Capabilities — 6 Cards
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">Platform Core Capabilities</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">Everything you need to manage the full lifecycle of tokenized real-world assets</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'ri-upload-cloud-line', title: 'Asset Upload & Review', desc: 'Structured upload workflow with multi-level review and approval for tokenized assets' },
              { icon: 'ri-settings-3-line', title: 'Issuance Parameter Config', desc: 'Flexible configuration of token supply, transfer rules, whitelist addresses, and more' },
              { icon: 'ri-file-text-line', title: 'Document Management', desc: 'Secure upload and management of asset proof documents with on-chain URI linking' },
              { icon: 'ri-time-line', title: 'Real-Time Status Tracking', desc: 'Live tracking of issuance status, custody transfers, and ownership changes' },
              { icon: 'ri-shield-check-line', title: 'On-Chain Verifiable Content', desc: 'All asset data and signatures are verifiable on-chain, ensuring full transparency' },
              { icon: 'ri-line-chart-line', title: 'Cost & Operations Traceability', desc: 'Full audit trail of issuance costs, operations, and permission changes' },
            ].map((cap) => (
              <div key={cap.title} className="p-7 rounded-2xl border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#e8f4fb] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1e6b8a] transition-colors duration-300">
                  <i className={`${cap.icon} text-2xl text-[#1e6b8a] group-hover:text-white transition-colors duration-300`}></i>
                </div>
                <h3 className="text-lg font-bold text-[#1e3a4a] mb-2">{cap.title}</h3>
                <p className="text-sm text-[#4a5568] leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          Business Value Stats
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-[#f7fbfe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">Measurable Business Value</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">Real-world impact DACC RWA Platform delivers for institutional clients</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '4-Step', label: 'Issuance Workflow', sub: 'Standardized, repeatable, audit-ready' },
              { value: '8+', label: 'Asset Categories', sub: 'Bonds, funds, carbon credits & more' },
              { value: '100%', label: 'On-Chain Verifiable', sub: 'Full transparency for all issued assets' },
              { value: 'T+0', label: 'Custody Transfer', sub: 'Instant post-issuance custody handoff' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-8 border border-[#e8f4fb] text-center hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-[#1e6b8a] mb-2">{stat.value}</div>
                <div className="text-base font-semibold text-[#1e3a4a] mb-1">{stat.label}</div>
                <div className="text-sm text-[#4a5568]">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          Regulatory Alignment
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">Regulatory Alignment Highlights</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">Designed from the ground up to meet institutional compliance and regulatory requirements</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: 'ri-team-line', title: 'Legal & Professional Institution Collaboration', desc: 'Collaborate with legal and third-party professional institutions to support compliance implementation' },
              { icon: 'ri-server-line', title: 'Flexible Deployment', desc: 'Platform supports On-Prem / SaaS flexible deployment to meet data sovereignty requirements' },
              { icon: 'ri-file-list-3-line', title: 'Audit-Ready', desc: 'Platform terms, operation logs, and permission controls fully meet audit requirements' },
              { icon: 'ri-shield-check-line', title: 'Complete Compliance Loop', desc: 'Combined with custody and settlement solutions to form a complete end-to-end compliance loop' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-6 rounded-2xl border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-[#e8f4fb] rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`${item.icon} text-xl text-[#1e6b8a]`}></i>
                </div>
                <div>
                  <h4 className="font-bold text-[#1e3a4a] mb-1">{item.title}</h4>
                  <p className="text-sm text-[#4a5568]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=deep%20teal%20dark%20ocean%20abstract%20background%20with%20soft%20glowing%20golden%20light%20particles%20and%20subtle%20digital%20grid%20lines%2C%20professional%20fintech%20tokenization%20atmosphere%2C%20wide%20cinematic%20composition%2C%20no%20text%2C%20no%20people&width=1440&height=600&seq=rwaen002&orientation=landscape"
            alt="CTA Background"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f3d52]/90 to-[#1e6b8a]/85"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Transform RWA Tokenization<br />from Concept to Reality
          </h2>
          <p className="text-xl text-white/75 mb-10 max-w-2xl mx-auto">
            Contact the DACC team to launch your asset tokenization project — issuable, custodial, and distributable from day one
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact-en" className="bg-[#f5b942] hover:bg-[#e0a830] text-[#1e3a4a] px-10 py-4 rounded-full font-bold transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg">
              Contact Us Now
            </a>
            <a href="/contact-en" className="bg-white/10 border border-white/40 hover:bg-white/20 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              Request Compliance Framework
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#1e6b8a] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png" alt="DACC Logo" className="h-20 w-auto object-contain mb-4" />
              <p className="text-white/80 text-sm leading-relaxed">Leading the next decade of digital clearing and settlement</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Quick Links</h4>
              <div className="space-y-2">
                <a href="/en#Services" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-sm hover:translate-x-2 transform">Services</a>
                <a href="/en#use-cases" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-sm hover:translate-x-2 transform">Use Cases</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Resources</h4>
              <div className="space-y-2">
                <a href="/en#ecosystem" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-sm hover:translate-x-2 transform">Investors</a>
                <a href="/blog-en" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-sm hover:translate-x-2 transform">News</a>
                <a href="/contact-en" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-sm hover:translate-x-2 transform">Contact Us</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Contact</h4>
              <p className="text-white/80 text-sm">Email: info@dacc.hk</p>
              <div className="flex space-x-4 mt-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#f5b942] transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/80 text-sm">Copyright © 2026 Digital Asset Clearing Center (DACC). All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
