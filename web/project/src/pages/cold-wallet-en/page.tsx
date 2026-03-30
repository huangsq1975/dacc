import { useState, useEffect } from 'react';

export default function ColdWalletEN() {
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
    <div className="min-h-screen bg-gradient-to-b from-[#e8f4fb] via-[#b8d9ed] to-[#1e6b8a] text-gray-900">
      {/* Floating Navigation - Desktop */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
        <nav className={`${scrolled ? 'bg-white/90' : 'bg-white/70'} backdrop-blur-md border border-[#b8d9ed] rounded-full px-6 py-3 transition-all duration-300 shadow-lg`}>
          <div className="flex items-center justify-center space-x-8">
            <a href="/" className="cursor-pointer flex-shrink-0">
              <img 
                src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" 
                alt="DACC Logo" 
                className="h-6 w-auto object-contain"
              />
            </a>
            <a href="/#Services" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              Services
            </a>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-medium"
              >
                Solutions
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {solutionsDropdownOpen && (
                <div className="absolute left-0 pt-2 w-56 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/hot-wallet-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">
                      Hot Wallet Integration
                    </a>
                    <a href="/cold-wallet-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">
                      Cold Wallet
                    </a>
                    <a href="/rwa-platform-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">
                      RWA Tokenization Platform
                    </a>
                    <a href="/chain-fusion-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">
                      ChainFusion
                    </a>
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
              <button
                className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-medium"
              >
                Use Cases
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${useCasesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {useCasesDropdownOpen && (
                <div className="absolute left-0 pt-2 w-64 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/use-case-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">
                      Global Merchants x DACC
                    </a>
                    <a href="/use-case-ttl-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">
                      TTL × DACC
                    </a>
                    <a href="/use-case-conflux-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">
                      Conflux x DACC
                    </a>
                    <a href="/use-case-vatp-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">
                      Crypto Exchanges x DACC
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="/#ecosystem" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              Investors
            </a>
            <a href="/blog-en" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              News
            </a>
            <a href="/contact-en" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm flex items-center whitespace-nowrap font-montserrat font-medium">
              Contact Us
              <i className="ri-arrow-right-up-line ml-1 text-xs"></i>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-b border-[#b8d9ed]">
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
              className="bg-[#dbeafe] border border-[#b8d9ed] rounded-full px-4 py-2 text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 text-sm"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
            <a href="/cold-wallet" className="bg-[#dbeafe] border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap">
              中文
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1e6b8a] z-40 lg:hidden pt-20">
          {/* Main Menu */}
          {!mobileSubmenu && (
            <div className="flex flex-col h-full px-6 py-8">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const servicesSection = document.getElementById('Services');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/#Services';
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between py-4 text-xl text-white/80 hover:text-white transition-colors border-b border-white/20"
                >
                  <span>Services</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('solutions')}
                  className="w-full flex items-center justify-between py-4 text-xl text-white/80 hover:text-white transition-colors border-b border-white/20"
                >
                  <span>Solutions</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('useCases')}
                  className="w-full flex items-center justify-between py-4 text-xl text-white/80 hover:text-white transition-colors border-b border-white/20"
                >
                  <span>Use Cases</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => {
                    const ecosystemSection = document.getElementById('ecosystem');
                    if (ecosystemSection) {
                      ecosystemSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/#ecosystem';
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between py-4 text-xl text-white/80 hover:text-white transition-colors border-b border-white/20"
                >
                  <span>Investors</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a
                  href="/blog-en"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-white/80 hover:text-white transition-colors border-b border-white/20"
                >
                  <span>Blog</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a
                  href="/contact-en"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-white/80 hover:text-white transition-colors border-b border-white/20"
                >
                  <span>Contact Us</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
              </div>
            </div>
          )}

          {/* Solutions Submenu */}
          {mobileSubmenu === 'solutions' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors">
                  <i className="ri-arrow-left-line text-2xl"></i>
                </button>
                <span className="text-lg font-semibold text-white">Solutions</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-2">
                  <a href="/hot-wallet-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Hot Wallet Integration</a>
                  <a href="/cold-wallet-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Cold Wallet</a>
                  <a href="/rwa-platform-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">RWA Tokenization Platform</a>
                  <a href="/chain-fusion-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">ChainFusion</a>
                </div>
              </div>
            </div>
          )}

          {/* Use Cases Submenu */}
          {mobileSubmenu === 'useCases' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors">
                  <i className="ri-arrow-left-line text-2xl"></i>
                </button>
                <span className="text-lg font-semibold text-white">Use Cases</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <p className="text-white/60 text-sm mb-6">Explore our solutions</p>
                <div className="space-y-2">
                  <a href="/use-case-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Global Merchants x DACC</a>
                  <a href="/use-case-ttl-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">TTL × DACC</a>
                  <a href="/use-case-conflux-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Conflux x DACC</a>
                  <a href="/use-case-vatp-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Crypto Exchanges x DACC</a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Language Switcher - Desktop Only */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <a href="/cold-wallet" className="bg-white/90 backdrop-blur-md border border-[#b8d9ed] rounded-full px-3 md:px-4 py-2 text-xs md:text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg">
          中文
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-[#f5b942] border border-[#c97a2f] rounded-full px-4 py-2 mb-6">
              <i className="ri-shield-check-line text-[#1e6b8a]"></i>
              <span className="text-[#1e6b8a] text-sm font-medium">Enterprise-Grade Security</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl md:text-6xl font-bold mb-6 text-[#1e6b8a]">
              DACC Custody Cold Wallet
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Enterprise-grade digital asset cold wallet custody solution for financial institutions
            </p>
            
            <p className="text-base md:text-lg text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Built on "Air-gapped HSM Private Key Management + Multi-approval Workflow + KYT/AML Risk Control", providing secure, compliant, and operational all-in-one custody capabilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact-en"
                className="inline-flex items-center justify-center space-x-2 bg-[#1e6b8a] hover:bg-[#f5b942] hover:text-[#1e6b8a] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap transform hover:-translate-y-1"
              >
                <span>Schedule Demo</span>
                <i className="ri-arrow-right-line"></i>
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center space-x-2 bg-transparent border-2 border-[#1e6b8a] hover:bg-[#1e6b8a] text-[#1e6b8a] hover:text-white px-8 py-4 rounded-full font-medium transition-all duration-300 whitespace-nowrap transform hover:-translate-y-1"
              >
                <span>Learn More</span>
                <i className="ri-download-line"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#1e6b8a]">Core Features</h2>
            <p className="text-[#4a5568] text-lg">Complete private key lifecycle management</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/70 border border-[#b8d9ed] rounded-xl p-8 hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl">
              <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-6">
                <i className="ri-key-2-line text-2xl text-[#1e6b8a]"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1e6b8a]">HSM Private Key Management</h3>
              <ul className="space-y-3 text-[#4a5568]">
                <li className="flex items-start space-x-2">
                  <i className="ri-check-line text-[#1e6b8a] mt-1"></i>
                  <span>Full lifecycle managed by HSM: generation, storage, signing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-check-line text-[#1e6b8a] mt-1"></i>
                  <span>Online + offline dual control, multi-role separation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-check-line text-[#1e6b8a] mt-1"></i>
                  <span>Deployable in institution-specified environments</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/70 border border-[#b8d9ed] rounded-xl p-8 hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl">
              <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-2xl text-[#1e6b8a]"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1e6b8a]">Multi-layer Authorization</h3>
              <ul className="space-y-3 text-[#4a5568]">
                <li className="flex items-start space-x-2">
                  <i className="ri-check-line text-[#1e6b8a] mt-1"></i>
                  <span>Wallet rule engine (Requester/Approver, M-of-N)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-check-line text-[#1e6b8a] mt-1"></i>
                  <span>Multi-identity verification (2FA, Auth App, Yubikey)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-check-line text-[#1e6b8a] mt-1"></i>
                  <span>Hierarchical thresholds and duty separation</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/70 border border-[#b8d9ed] rounded-xl p-8 hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl">
              <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-6">
                <i className="ri-file-shield-line text-2xl text-[#1e6b8a]"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1e6b8a]">Compliance & Risk Control</h3>
              <ul className="space-y-3 text-[#4a5568]">
                <li className="flex items-start space-x-2">
                  <i className="ri-check-line text-[#1e6b8a] mt-1"></i>
                  <span>Built-in KYT/AML checks and whitelist management</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-check-line text-[#1e6b8a] mt-1"></i>
                  <span>Standardized deposit/withdrawal processes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-check-line text-[#1e6b8a] mt-1"></i>
                  <span>Auditable operation records</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Product Value */}
      <section id="features" className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#1e6b8a]">Why DACC</h2>
            <p className="text-[#4a5568] text-lg">Three core advantages</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/70 border border-[#b8d9ed] rounded-xl p-8 hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl">
              <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-6">
                <i className="ri-lock-line text-2xl text-[#1e6b8a]"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#1e6b8a]">Security First</h3>
              <p className="text-[#4a5568] mb-4">Air-gapped signing architecture</p>
              <ul className="space-y-3 text-[#4a5568]">
                <li className="flex items-start space-x-2">
                  <i className="ri-arrow-right-s-line text-[#1e6b8a] mt-1"></i>
                  <span>HSM and KMS deployed in air-gapped environment</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-arrow-right-s-line text-[#1e6b8a] mt-1"></i>
                  <span>Transaction signing via QR Code offline data transfer</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-arrow-right-s-line text-[#1e6b8a] mt-1"></i>
                  <span>HSM only executes: address generation &amp; transaction signing</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/70 border border-[#b8d9ed] rounded-xl p-8 hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl">
              <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-6">
                <i className="ri-file-list-3-line text-2xl text-[#1e6b8a]"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#1e6b8a]">Compliance Ready</h3>
              <p className="text-[#4a5568] mb-4">Process as control</p>
              <ul className="space-y-3 text-[#4a5568]">
                <li className="flex items-start space-x-2">
                  <i className="ri-arrow-right-s-line text-[#1e6b8a] mt-1"></i>
                  <span>Built-in KYT/AML checks and whitelist management</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-arrow-right-s-line text-[#1e6b8a] mt-1"></i>
                  <span>Standardized deposit/withdrawal workflows</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-arrow-right-s-line text-[#1e6b8a] mt-1"></i>
                  <span>Multi-factor authentication and duty separation</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/70 border border-[#b8d9ed] rounded-xl p-8 hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl">
              <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-6">
                <i className="ri-dashboard-line text-2xl text-[#1e6b8a]"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#1e6b8a]">Scalable Operations</h3>
              <p className="text-[#4a5568] mb-4">All-in-one platform</p>
              <ul className="space-y-3 text-[#4a5568]">
                <li className="flex items-start space-x-2">
                  <i className="ri-arrow-right-s-line text-[#1e6b8a] mt-1"></i>
                  <span>User Portal + Admin Portal integrated</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-arrow-right-s-line text-[#1e6b8a] mt-1"></i>
                  <span>Wallet rules (Requester/Approver, M-of-N, tiered thresholds)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-arrow-right-s-line text-[#1e6b8a] mt-1"></i>
                  <span>Expandable by business needs: coins, chains, workflows</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#1e6b8a]">How It Works</h2>
            <p className="text-[#4a5568] text-lg">Five-step secure transaction flow</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { icon: 'ri-user-add-line', title: 'Frontend Initiation', desc: 'Requester initiates transaction per wallet permissions' },
              { icon: 'ri-checkbox-multiple-line', title: 'Frontend Authorization', desc: 'Approver completes authorization per thresholds' },
              { icon: 'ri-admin-line', title: 'Backend Release', desc: 'Supervisor + Auth App complete verification' },
              { icon: 'ri-qr-code-line', title: 'Air-gapped Signing', desc: 'KMS/HSM signs offline (QR Code transfer)' },
              { icon: 'ri-broadcast-line', title: 'On-chain Broadcast', desc: 'Signed transaction submitted to blockchain' }
            ].map((step, index) => (
              <div key={index} className="bg-white/70 border border-[#b8d9ed] rounded-xl p-6 hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1e6b8a] to-[#2d8ba8] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <i className={`${step.icon} text-2xl text-white`}></i>
                </div>
                <div className="text-center">
                  <div className="text-[#1e6b8a] font-bold mb-2">Step {index + 1}</div>
                  <h3 className="font-bold mb-2 text-[#1e6b8a]">{step.title}</h3>
                  <p className="text-sm text-[#4a5568]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles & Governance */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#1e6b8a]">Governance by Design</h2>
            <p className="text-[#4a5568] text-lg">Role separation and multi-layer control</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/70 border border-[#b8d9ed] rounded-xl p-8 hover:border-[#1e6b8a] transition-all duration-300">
              <h3 className="text-xl font-bold mb-6 flex items-center space-x-2 text-[#1e6b8a]">
                <i className="ri-user-settings-line text-[#1e6b8a]"></i>
                <span>Frontend Roles</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-line text-[#1e6b8a] mt-1"></i>
                  <div>
                    <div className="font-medium text-[#1e6b8a]">User Roles</div>
                    <div className="text-sm text-[#4a5568]">Primary / Operating / View-only</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-line text-[#1e6b8a] mt-1"></i>
                  <div>
                    <div className="font-medium text-[#1e6b8a]">Wallet Permissions</div>
                    <div className="text-sm text-[#4a5568]">Requester / Approver / Viewer</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 border border-[#b8d9ed] rounded-xl p-8 hover:border-[#1e6b8a] transition-all duration-300">
              <h3 className="text-xl font-bold mb-6 flex items-center space-x-2 text-[#1e6b8a]">
                <i className="ri-shield-user-line text-[#1e6b8a]"></i>
                <span>Backend Roles</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-line text-[#1e6b8a] mt-1"></i>
                  <div>
                    <div className="font-medium text-[#1e6b8a]">Admin Roles</div>
                    <div className="text-sm text-[#4a5568]">AM / Supervisor / View-only</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-line text-[#1e6b8a] mt-1"></i>
                  <div>
                    <div className="font-medium text-[#1e6b8a]">Verification Roles</div>
                    <div className="text-sm text-[#4a5568]">Auth AM / Wallet Auth / Auth Officer / Auth Manager</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-[#dbeafe] border border-[#b8d9ed] rounded-xl p-6">
            <p className="text-[#4a5568] text-center">
              <i className="ri-information-line text-[#1e6b8a] mr-2"></i>
              Through role separation and multi-layer control design, reduce single-point risk and enhance internal control strength.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#1e6b8a]">Use Cases</h2>
            <p className="text-[#4a5568] text-lg">Applicable scenarios</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: 'ri-bank-line', title: 'Financial Institution Custody', desc: 'Digital asset custody for banks, securities firms, and trust companies' },
              { icon: 'ri-safe-line', title: 'High-value Asset Cold Storage', desc: 'Cold storage and tiered approval for high-value assets' },
              { icon: 'ri-file-shield-2-line', title: 'Regulatory Compliance', desc: 'Institutional wallet operations meeting regulatory/audit requirements' },
              { icon: 'ri-global-line', title: 'RWA & Cross-border Payments', desc: 'Custody infrastructure for RWA, cross-border payments, and more' }
            ].map((useCase, index) => (
              <div key={index} className="bg-white/70 border border-[#b8d9ed] rounded-xl p-8 hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-6">
                  <i className={`${useCase.icon} text-2xl text-[#1e6b8a]`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1e6b8a]">{useCase.title}</h3>
                <p className="text-[#4a5568]">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#1e6b8a]">Certifications & Compliance</h2>
            <p className="text-[#4a5568] text-lg">Industry-leading security standards</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: 'ri-shield-check-line', title: 'SOC 2 Type I/II', desc: 'Custody process & operations' },
              { icon: 'ri-bug-line', title: 'Security Testing', desc: 'Third-party gray-box testing' },
              { icon: 'ri-shield-star-line', title: 'Insurance Support', desc: 'SPECIE / CRIME underwriting' },
              { icon: 'ri-government-line', title: 'Licensed Operations', desc: 'US, Hong Kong licensed custody' }
            ].map((cert, index) => (
              <div key={index} className="bg-white/70 border border-[#b8d9ed] rounded-xl p-6 text-center hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1e6b8a] to-[#2d8ba8] rounded-full flex items-center justify-center mb-4 mx-auto">
                  <i className={`${cert.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="font-bold mb-2 text-[#1e6b8a]">{cert.title}</h3>
                <p className="text-sm text-[#4a5568]">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e6b8a]/90 to-[#2d8ba8]/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Upgrade custody from "usable" to "regulatable, auditable, scalable"
          </h2>
          <p className="text-xl text-blue-50 mb-8">
            Contact DACC team for customized deployment and PoC planning
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact-en"
              className="inline-flex items-center justify-center space-x-2 bg-white text-[#1e6b8a] hover:bg-[#f5b942] hover:text-[#1e6b8a] px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg whitespace-nowrap transform hover:-translate-y-1"
            >
              <span>Contact Us</span>
              <i className="ri-arrow-right-line"></i>
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center space-x-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1e6b8a] px-8 py-4 rounded-full font-medium transition-all duration-300 whitespace-nowrap transform hover:-translate-y-1"
            >
              <span>Learn More</span>
              <i className="ri-book-line"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e6b8a] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img 
                src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png"
                alt="DACC Logo" 
                className="h-8 w-auto mb-4"
              />
              <p className="text-white/60 text-sm">
                Enterprise-grade digital asset custody solutions
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-white">Solutions</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="/hot-wallet-en" className="hover:text-[#f5b942] transition-colors">Hot Wallet Integration</a></li>
                <li><a href="/cold-wallet-en" className="hover:text-[#f5b942] transition-colors">Cold Wallet</a></li>
                <li><a href="/use-case-en" className="hover:text-[#f5b942] transition-colors">Stablecoin Merchant</a></li>
                <li><a href="/use-case-ttl-en" className="hover:text-[#f5b942] transition-colors">TTL</a></li>
                <li><a href="/use-case-conflux-en" className="hover:text-[#f5b942] transition-colors">Conflux</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="/use-case-vatp-en" className="hover:text-[#f5b942] transition-colors">Crypto Exchanges x DACC</a></li>
                <li><a href="/blog-en" className="hover:text-[#f5b942] transition-colors">Blog</a></li>
                <li><a href="/contact-en" className="hover:text-[#f5b942] transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-white">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-[#f5b942] rounded-lg flex items-center justify-center transition-colors">
                  <i className="ri-linkedin-line text-xl text-white"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              Copyright © 2026 Digital Asset Clearing Center (DACC). All Rights Reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a href="/cold-wallet" className="text-white/60 hover:text-[#f5b942] text-sm transition-colors">
                中文
              </a>
              <a href="/blog-en" className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform">News</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
