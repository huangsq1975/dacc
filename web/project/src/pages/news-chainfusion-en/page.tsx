import { useState, useEffect } from 'react';

export default function NewsChainFusionEN() {
  const [scrolled, setScrolled] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f4fb] via-[#b8d9ed] to-[#1e6b8a] text-[#1e3a4a]">
      {/* Floating Navigation - Desktop */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
        <nav className={`${scrolled ? 'bg-white/90' : 'bg-white/80'} backdrop-blur-md border border-[#b8d9ed] rounded-full px-6 py-3 transition-all duration-300 shadow-lg`}>
          <div className="flex items-center justify-center space-x-8">
            <a href="/" className="cursor-pointer flex-shrink-0">
              <img
                src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png"
                alt="DACC Logo"
                className="h-6 w-auto object-contain"
              />
            </a>
            <a href="/#Services" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-semibold">
              Services
            </a>
            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-semibold">
                Solutions
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {solutionsDropdownOpen && (
                <div className="absolute left-0 pt-2 w-56 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/hot-wallet-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">Hot Wallet Integration</a>
                    <a href="/cold-wallet-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">Cold Wallet</a>
                    <a href="/rwa-platform-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">RWA Tokenization Platform</a>
                    <a href="/chain-fusion-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">ChainFusion</a>
                  </div>
                </div>
              )}
            </div>
            {/* Use Cases Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setUseCasesDropdownOpen(true)}
              onMouseLeave={() => setUseCasesDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-semibold">
                Use Cases
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${useCasesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {useCasesDropdownOpen && (
                <div className="absolute left-0 pt-2 w-64 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/use-case-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">Global Merchants x DACC</a>
                    <a href="/use-case-ttl-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">TTL × DACC</a>
                    <a href="/use-case-conflux-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">Conflux x DACC</a>
                    <a href="/use-case-vatp-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">Crypto Exchanges x DACC</a>
                  </div>
                </div>
              )}
            </div>
            <a href="/#ecosystem" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-semibold">Investors</a>
            <a href="/blog-en" className="text-[#f5b942] font-bold transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat">News</a>
            <a href="/contact-en" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm flex items-center whitespace-nowrap font-montserrat font-semibold">Contact Us<i className="ri-arrow-right-up-line ml-1 text-xs"></i></a>
          </div>
        </nav>
      </div>

      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white/90 backdrop-blur-md border-b border-[#b8d9ed]">
        <div className="flex items-center justify-between px-6 py-4">
          <a href="/" className="block cursor-pointer">
            <img
              src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png"
              alt="DACC Logo"
              className="h-8 w-auto object-contain"
            />
          </a>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-[#dbeafe] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 text-sm"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
            <a href="/news-chainfusion" className="bg-[#dbeafe] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap">
              中文
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1e6b8a] backdrop-blur-md z-40 lg:hidden pt-20">
          {!mobileSubmenu && (
            <div className="flex flex-col h-full px-6 py-8">
              <div className="space-y-2">
                <a href="/#Services" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>Services</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <button onClick={() => setMobileSubmenu('solutions')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>Solutions</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button onClick={() => setMobileSubmenu('useCases')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>Use Cases</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a href="/#ecosystem" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>Investors</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a href="/blog-en" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-[#f5b942] font-bold transition-colors border-b border-white/20">
                  <span>News</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a href="/contact-en" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>Contact Us</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
              </div>
            </div>
          )}
          {mobileSubmenu === 'solutions' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">Solutions</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6 space-y-2">
                <a href="/hot-wallet-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Hot Wallet Integration</a>
                <a href="/cold-wallet-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Cold Wallet</a>
                <a href="/rwa-platform-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">RWA Tokenization Platform</a>
                <a href="/chain-fusion-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">ChainFusion</a>
              </div>
            </div>
          )}
          {mobileSubmenu === 'useCases' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">Use Cases</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6 space-y-2">
                <a href="/use-case-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Global Merchants x DACC</a>
                <a href="/use-case-ttl-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">TTL × DACC</a>
                <a href="/use-case-conflux-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Conflux x DACC</a>
                <a href="/use-case-vatp-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Crypto Exchanges x DACC</a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Language Switcher - Desktop */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <a href="/news-chainfusion" className="bg-white/80 backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg">
          中文
        </a>
      </div>

      {/* Hero Banner */}
      <section className="relative pt-32 pb-0 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-[#1e6b8a]/60 mb-8">
            <a href="/blog-en" className="hover:text-[#f5b942] transition-colors cursor-pointer">Blog</a>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-[#1e6b8a]/80">News</span>
          </div>

          {/* Category & Date */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-[#f5b942]/80 text-[#1e3a4a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Press Release
            </span>
            <span className="bg-white/80 text-[#1e6b8a] px-4 py-1.5 rounded-full text-xs font-semibold">
              February 12, 2026
            </span>
            <span className="text-[#1e6b8a]/60 text-xs flex items-center gap-1">
              <i className="ri-global-line"></i>
              Source: AsiaBizToday
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-[#1e6b8a] leading-tight mb-6">
            DACC Launches ChainFusion™ to Accelerate Compliant Cross-Border Tokenised Payments
          </h1>

          <p className="text-lg text-[#1e3a4a]/80 leading-relaxed mb-10">
            Digital Asset Clearing Center (DACC) has officially launched ChainFusion™ — a next-generation tokenised financial market infrastructure designed to improve the speed, cost efficiency, and regulatory alignment of cross-border payments.
          </p>
        </div>

        {/* Hero Image */}
        <div className="max-w-4xl mx-auto px-6 mb-0">
          <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://readdy.ai/api/search-image?query=futuristic%20cross-border%20payment%20network%20with%20glowing%20digital%20nodes%20and%20blockchain%20connections%20on%20dark%20background%2C%20abstract%20financial%20technology%20visualization%20with%20teal%20and%20blue%20gradient%20light%20streams%20representing%20global%20tokenized%20transactions&width=1200&height=600&seq=chainfusionnewsen01&orientation=landscape"
              alt="DACC ChainFusion Cross-Border Tokenised Payments"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Intro */}
              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  <strong className="text-[#1e6b8a]">HONG KONG, February 12, 2026</strong> — Digital Asset Clearing Center (DACC) has launched ChainFusion™, a new tokenised financial market infrastructure platform designed to improve the speed, cost efficiency and regulatory alignment of cross-border payments.
                </p>
              </div>

              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  The platform aims to bridge on-chain blockchain networks with off-chain traditional financial systems, enabling real-time reconciliation while embedding regulatory compliance directly into transaction workflows. DACC positions ChainFusion™ as a solution to longstanding friction points in global payments, including slow settlement cycles, high transaction costs, fragmented data systems and regulatory barriers.
                </p>
              </div>

              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  According to the company, ChainFusion™ integrates multi-chain collaboration with compliant off-chain liquidation processes, with particular focus on cross-border RMB transactions. DACC states that the platform can reduce RMB liquidation timelines from days to seconds while lowering transaction costs and accelerating multi-currency payment flows.
                </p>
              </div>

              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  The platform is also designed to support digital trade finance processes and enable the compliant issuance and transfer of fixed-income real-world assets, reflecting growing institutional interest in tokenisation.
                </p>
              </div>

              {/* Three-layer Architecture */}
              <div>
                <h2 className="text-2xl font-bold text-[#1e6b8a] mb-6">Three-layer architecture</h2>
                <p className="text-[#1e3a4a] leading-relaxed text-base mb-6">
                  At the core of ChainFusion™ is a proprietary three-layer structure comprising:
                </p>
                <div className="space-y-4">
                  {[
                    { icon: 'ri-links-line', title: 'An On-Chain Collaboration Layer' },
                    { icon: 'ri-git-merge-line', title: 'A Fusion Gateway Layer' },
                    { icon: 'ri-bank-line', title: 'An Off-Chain Liquidation Layer' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-4 bg-white/80 rounded-xl p-5 border border-[#b8d9ed] shadow-sm">
                      <div className="w-10 h-10 bg-[#dbeafe] rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className={`${item.icon} text-[#1e6b8a] text-xl`}></i>
                      </div>
                      <h3 className="text-[#1e6b8a] font-semibold">{item.title}</h3>
                    </div>
                  ))}
                </div>
                <p className="text-[#1e3a4a] leading-relaxed text-base mt-6">
                  DACC says this architecture enables real-time data synchronisation, reconciliation and compliance-grade record keeping. The system integrates with existing financial infrastructure, including the Cross-border Interbank Payment System ecosystem, positioning it within established regulatory frameworks.
                </p>
              </div>

              {/* Quote Block */}
              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  Serra Wei, Co-Founder of DACC, said the platform seeks to combine the efficiencies of decentralised finance with the trust and regulatory standards of traditional financial systems.
                </p>
              </div>

              <blockquote className="border-l-4 border-[#f5b942] pl-6 py-2 bg-white/60 rounded-r-xl">
                <p className="text-[#1e3a4a] text-lg italic leading-relaxed">
                  "ChainFusion™ represents an innovation of solutions in cross-border payments, uniting the best of TradFi and DeFi to solve long-standing inefficiencies while upholding the highest regulatory standards."
                </p>
                <footer className="mt-3 text-[#1e6b8a]/70 text-sm font-semibold">
                  — Serra Wei, Co-Founder of DACC
                </footer>
              </blockquote>

              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  Wei added that Hong Kong's role as an international financial centre and gateway to Mainland China has been instrumental in shaping the platform's design, particularly in aligning tokenised infrastructure with global capital markets and regulatory expectations.
                </p>
              </div>

              {/* Strategic Backing */}
              <div>
                <h2 className="text-2xl font-bold text-[#1e6b8a] mb-4">Strategic backing and expansion roadmap</h2>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  DACC is supported by a consortium of strategic investors and ecosystem partners including Starcoin Group Limited (399.HK), Kingdom Limited (600446.SH), Global Infotech (300465.SZ), and Fosun International Limited (656.HK), alongside private sector technology and digital asset firms.
                </p>
                <p className="text-[#1e3a4a] leading-relaxed text-base mt-4">
                  As tokenised finance continues to gain traction across Asia and globally, financial infrastructure players are increasingly focused on building compliant settlement and clearing layers that can integrate digital assets into mainstream capital markets.
                </p>
                <p className="text-[#1e3a4a] leading-relaxed text-base mt-4">
                  With ChainFusion™, DACC is positioning itself as a bridge between traditional financial institutions and the emerging tokenised economy, targeting institutional use cases in cross-border payments, trade finance and real-world asset tokenisation.
                </p>
              </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">

              {/* Key Highlights */}
              <div className="bg-white/80 rounded-2xl p-6 border border-[#b8d9ed] shadow-lg sticky top-28">
                <h3 className="text-[#1e6b8a] font-bold text-lg mb-5 flex items-center gap-2">
                  <i className="ri-flashlight-line text-[#f5b942]"></i>
                  Key Highlights
                </h3>
                <ul className="space-y-4">
                  {[
                    'Bridges on-chain blockchain with off-chain traditional finance',
                    'Reduces RMB settlement from days to seconds',
                    'Three-layer proprietary architecture for compliance',
                    'Supports cross-border RMB, trade finance & RWA tokenisation',
                    'Backed by listed strategic investors in HK & Mainland China',
                    'Targets institutional cross-border payment use cases',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-checkbox-circle-fill text-[#f5b942] text-base"></i>
                      </div>
                      <span className="text-[#1e3a4a] text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-[#b8d9ed]">
                  <p className="text-[#1e6b8a]/60 text-xs mb-1">Original Source</p>
                  <a
                    href="https://www.asiabiztoday.com/2026/02/12/dacc-launches-chainfusion-to-accelerate-compliant-cross-border-tokenised-payments/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f5b942] hover:text-[#c97a2f] text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    AsiaBizToday
                    <i className="ri-external-link-line"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-16 pt-10 border-t border-[#b8d9ed] flex items-center justify-between">
            <a
              href="/blog-en"
              className="flex items-center gap-2 text-[#1e6b8a]/70 hover:text-[#f5b942] transition-colors cursor-pointer group"
            >
              <i className="ri-arrow-left-line group-hover:-translate-x-1 transition-transform duration-200"></i>
              <span className="text-sm font-medium">Back to Blog</span>
            </a>
            <div className="flex items-center gap-3">
              <span className="text-[#1e6b8a]/60 text-sm">Share:</span>
              <a
                href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#dbeafe] rounded-full flex items-center justify-center hover:bg-[#1e6b8a] hover:text-white transition-colors cursor-pointer"
              >
                <i className="ri-linkedin-fill text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e6b8a] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img
                src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png"
                alt="DACC Logo"
                className="h-20 w-auto object-contain mb-4"
              />
              <p className="text-white/80 text-sm leading-relaxed">
                Pioneering the Next Decade of Digital Clearing and Settlement
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="/#Services" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">Services</a>
                <a href="/#use-cases" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">Use Cases</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2">
                <a href="/#ecosystem" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">Investors</a>
                <a href="/blog-en" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">News</a>
                <a href="/contact-en" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">Contact Us</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#f5b942] transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/70 text-sm mb-4">Copyright © 2026 Digital Asset Clearing Center (DACC). All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
