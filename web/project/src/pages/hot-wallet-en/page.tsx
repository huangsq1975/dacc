import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HotWalletEN() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateWithHash = (path: string, hash: string) => {
    navigate(path);
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f4fb] via-[#b8d9ed] to-[#1e6b8a] text-gray-900">
      {/* Navigation with white/light blue theme */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
        <nav className={`${scrolled ? 'bg-white/90' : 'bg-white/70'} backdrop-blur-md border border-[#b8d9ed] rounded-full px-6 py-3 transition-all duration-300 shadow-lg`}>
          <div className="flex items-center justify-center space-x-8">
            <a href="/en" className="cursor-pointer flex-shrink-0">
              <img 
                src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" 
                alt="DACC Logo" 
                className="h-6 w-auto object-contain"
              />
            </a>
            <button 
              onClick={() => handleNavigateWithHash('/en', 'Services')}
              className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat"
            >
              Services
            </button>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat">
                Solutions
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {solutionsDropdownOpen && (
                <div className="absolute left-0 pt-2 w-56 z-50">
                  <div className="bg-[#f5b942]/10 backdrop-blur-md border border-[#c97a2f] rounded-xl py-2 shadow-xl">
                    <a href="/hot-wallet-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb]/50 transition-colors">
                      Hot Wallet Integration
                    </a>
                    <a href="/cold-wallet-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb]/50 transition-colors">
                      Cold Wallet
                    </a>
                    <a href="/rwa-platform-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb]/50 transition-colors">
                      RWA Tokenization Platform
                    </a>
                    <a href="/chain-fusion-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb]/50 transition-colors">
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
                className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat"
              >
                Use Cases
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${useCasesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {useCasesDropdownOpen && (
                <div className="absolute left-0 pt-2 w-64 z-50">
                  <div className="bg-[#f5b942]/10 backdrop-blur-md border border-[#c97a2f] rounded-xl py-2 shadow-xl">
                    <a href="/use-case-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb]/50 transition-colors">
                      Global Merchants x DACC
                    </a>
                    <a href="/use-case-ttl-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb]/50 transition-colors">
                      TTL × DACC
                    </a>
                    <a href="/use-case-conflux-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb]/50 transition-colors">
                      Conflux x DACC
                    </a>
                    <a href="/use-case-vatp-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb]/50 transition-colors">
                      Crypto Exchanges x DACC
                    </a>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => handleNavigateWithHash('/en', 'ecosystem')}
              className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat"
            >
              Investors
            </button>
            <a href="/blog-en" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat">
              News
            </a>
            <a href="/contact-en" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm flex items-center whitespace-nowrap font-montserrat">
              Contact Us
              <i className="ri-arrow-right-up-line ml-1 text-xs"></i>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-b border-[#b8d9ed]">
        <div className="flex items-center justify-between px-6 py-4">
          <a href="/en" className="block cursor-pointer">
            <img 
              src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" 
              alt="DACC Logo" 
              className="h-8 w-auto object-contain"
            />
          </a>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-[#e8f4fb] border border-[#b8d9ed] rounded-full px-4 py-2 text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 text-sm"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
            <a href="/hot-wallet" className="bg-white/80 border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap">
              中文
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-40 lg:hidden pt-20">
          {!mobileSubmenu && (
            <div className="flex flex-col h-full px-6 py-8">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavigateWithHash('/en', 'Services');
                  }}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]"
                >
                  <span>Services</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('solutions')}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]"
                >
                  <span>Solutions</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('useCases')}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]"
                >
                  <span>Use Cases</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavigateWithHash('/en', 'ecosystem');
                  }}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]"
                >
                  <span>Investors</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a
                  href="/blog-en"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]"
                >
                  <span>Blog</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a
                  href="/contact-en"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]"
                >
                  <span>Contact Us</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
              </div>
            </div>
          )}

          {mobileSubmenu === 'solutions' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#b8d9ed]">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-[#1e6b8a] hover:text-[#f5b942] transition-colors">
                  <i className="ri-arrow-left-line text-2xl"></i>
                </button>
                <span className="text-lg font-semibold text-[#1e6b8a]">Solutions</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-2">
                  <a href="/hot-wallet-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]">Hot Wallet Integration</a>
                  <a href="/cold-wallet-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]">Cold Wallet</a>
                  <a href="/rwa-platform-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]">RWA Tokenization Platform</a>
                  <a href="/chain-fusion-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]">ChainFusion</a>
                </div>
              </div>
            </div>
          )}

          {mobileSubmenu === 'useCases' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#b8d9ed]">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-[#1e6b8a] hover:text-[#f5b942] transition-colors">
                  <i className="ri-arrow-left-line text-2xl"></i>
                </button>
                <span className="text-lg font-semibold text-[#1e6b8a]">Use Cases</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <p className="text-[#4a5568] text-sm mb-6">Explore our solutions</p>
                <div className="space-y-2">
                  <a href="/use-case-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]">Global Merchants x DACC</a>
                  <a href="/use-case-ttl-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]">TTL × DACC</a>
                  <a href="/use-case-conflux-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]">Conflux x DACC</a>
                  <a href="/use-case-vatp-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]">Crypto Exchanges x DACC</a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Language Switcher - Desktop */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <a href="/hot-wallet" className="bg-white/80 backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap">
          中文
        </a>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="bg-[#f5b942] border border-[#c97a2f] text-[#1e6b8a] px-5 py-2 rounded-full text-sm font-semibold">
              Enterprise-Grade API Hot Wallet
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#1e6b8a] mb-6 leading-tight">
            DACC API Hot Wallet
          </h1>
          <p className="text-xl text-[#4a5568] max-w-3xl mx-auto leading-relaxed mb-8">
            Enterprise-grade API hot wallet solution for trading platforms and financial institutions<br />
            Built on "HSM Private Key Security + Full API Control + KYT Risk Engine" to support efficient operations for digital asset deposits, collections, and withdrawals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact-en"
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>Apply for Sandbox</span>
              <i className="ri-code-box-line"></i>
            </a>
            <a
              href="/contact-en"
              className="bg-transparent border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-full font-semibold hover:bg-blue-400/10 transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 transform hover:-translate-y-1"
            >
              <span>Get API Documentation</span>
              <i className="ri-file-code-line"></i>
            </a>
            <a
              href="/contact-en"
              className="bg-transparent border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-full font-semibold hover:bg-blue-400/10 transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 transform hover:-translate-y-1"
            >
              <span>Schedule Technical Integration</span>
              <i className="ri-calendar-line"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Product Value - Why DACC API Wallet */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">Product Value</h2>
            <p className="text-xl text-[#4a5568]">Why DACC API Wallet</p>
          </div>

          <div className="space-y-8">
            {/* Fast Integration */}
            <div className="bg-white/70 rounded-3xl p-10 border border-[#b8d9ed] hover:border-blue-400/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-flashlight-line text-white text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">Fast Integration, Accelerate Time-to-Market</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">Clear and easy-to-use API supporting address creation, asset queries, collections, and withdrawals</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">WebSocket subscription support (deposit detection, on-chain status)</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">One-time integration, reusable across multiple chains, currencies, and business scenarios</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Efficiency & Risk Control */}
            <div className="bg-white/70 rounded-3xl p-10 border border-[#b8d9ed] hover:border-blue-400/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-speed-line text-white text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">Balance Efficiency and Risk Control</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">Three address types: <strong>Pool Address / Deposit Address / Withdraw Address</strong></p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">Support automatic + manual collection, balancing operational efficiency and fine-grained control</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">Withdrawals can be bound to multiple risk control thresholds, dynamically managing risk based on business volume</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance */}
            <div className="bg-white/70 rounded-3xl p-10 border border-[#b8d9ed] hover:border-blue-400/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-shield-check-line text-white text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">Compliance-Oriented On-Chain Fund Management</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">KYT integration coverage: whitelist risk assessment, deposit source checks, withdrawal address risk scoring</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">Isolated deposit mechanism: suspicious funds do not enter automatic collection</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">Must pass both KYT and internal risk control rules for successful withdrawals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">Core Capabilities</h2>
            <p className="text-xl text-[#4a5568]">Core Capabilities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-code-s-slash-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">Full API Control</h4>
              <p className="text-sm text-[#4a5568]">Addresses, balances, transactions, withdrawals, risk control settings</p>
            </div>

            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-broadcast-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">Real-time WebSocket Events</h4>
              <p className="text-sm text-[#4a5568]">Deposits, on-chain status, fee events</p>
            </div>

            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-map-pin-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">Address Management</h4>
              <p className="text-sm text-[#4a5568]">Pool / Deposit / Withdraw</p>
            </div>

            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-arrow-left-right-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">Collection Management</h4>
              <p className="text-sm text-[#4a5568]">Automatic/manual collection, designated collection addresses</p>
            </div>

            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-send-plane-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">Withdrawal Management</h4>
              <p className="text-sm text-[#4a5568]">Whitelist, risk control thresholds, fee estimation</p>
            </div>

            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-shield-check-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">KYT Operations</h4>
              <p className="text-sm text-[#4a5568]">Isolated deposits, release isolation, blocklist</p>
            </div>
          </div>
        </div>
      </section>

      {/* Address Model */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">Address Model</h2>
            <p className="text-xl text-[#4a5568]">Address Design</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Pool Address */}
            <div className="bg-white/70 rounded-3xl p-8 border-2 border-[#b8d9ed] hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-water-flash-line text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">Pool Address</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">Dedicated to paying on-chain gas fees</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">Provides fee source for deposit and withdraw addresses</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">Ensures separation of "fee funds" and "user assets", enhancing transparency</p>
                </div>
              </div>
            </div>

            {/* Deposit Address */}
            <div className="bg-white/70 rounded-3xl p-8 border-2 border-[#b8d9ed] hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-inbox-line text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">Deposit Address</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">Used to receive user deposits</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">Deposits remain in address until collection rules are triggered for centralized transfer</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">Suspicious deposits can be marked as isolated and excluded from automatic collection</p>
                </div>
              </div>
            </div>

            {/* Withdraw Address */}
            <div className="bg-white/70 rounded-3xl p-8 border-2 border-[#b8d9ed] hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-send-plane-2-line text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">Withdraw Address</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">Used to execute external withdrawals</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">Bound to risk control thresholds and KYT results</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">Ensures withdrawal compliance and security</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">Typical Workflow</h2>
            <p className="text-xl text-[#4a5568]">How It Works</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 hidden lg:block"></div>

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex items-center gap-8 lg:gap-12">
                <div className="flex-1 text-right hidden lg:block">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">Create Deposit Address</h3>
                  <p className="text-[#4a5568]">Create deposit addresses for users via API</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg relative z-10">
                  1
                </div>
                <div className="flex-1">
                  <div className="lg:hidden mb-4">
                    <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">Create Deposit Address</h3>
                    <p className="text-[#4a5568]">Create deposit addresses for users via API</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] shadow-md">
                    <i className="ri-map-pin-add-line text-blue-400 text-3xl mb-2"></i>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-8 lg:gap-12">
                <div className="flex-1 text-right hidden lg:block">
                  <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] shadow-md inline-block">
                    <i className="ri-shield-check-line text-blue-400 text-3xl mb-2"></i>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg relative z-10">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">KYT Deposit Check</h3>
                  <p className="text-[#4a5568]">Monitor deposit events and perform KYT deposit risk checks</p>
                  <div className="lg:hidden mt-4">
                    <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] shadow-md">
                      <i className="ri-shield-check-line text-blue-400 text-3xl mb-2"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-8 lg:gap-12">
                <div className="flex-1 text-right hidden lg:block">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">Automatic/Manual Collection</h3>
                  <p className="text-[#4a5568]">Funds meeting rules are collected automatically/manually per Collection Policy</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg relative z-10">
                  3
                </div>
                <div className="flex-1">
                  <div className="lg:hidden mb-4">
                    <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">Automatic/Manual Collection</h3>
                    <p className="text-[#4a5568]">Funds meeting rules are collected automatically/manually per Collection Policy</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] shadow-md">
                    <i className="ri-arrow-left-right-line text-blue-400 text-3xl mb-2"></i>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-center gap-8 lg:gap-12">
                <div className="flex-1 text-right hidden lg:block">
                  <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] shadow-md inline-block">
                    <i className="ri-file-list-3-line text-blue-400 text-3xl mb-2"></i>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg relative z-10">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">Whitelist & Risk Scoring</h3>
                  <p className="text-[#4a5568]">Perform whitelist and address risk scoring before withdrawal</p>
                  <div className="lg:hidden mt-4">
                    <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] shadow-md">
                      <i className="ri-file-list-3-line text-blue-400 text-3xl mb-2"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-center gap-8 lg:gap-12">
                <div className="flex-1 text-right hidden lg:block">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">Send Transaction</h3>
                  <p className="text-[#4a5568]">After passing risk control, withdraw address sends transaction and returns on-chain status</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg relative z-10">
                  5
                </div>
                <div className="flex-1">
                  <div className="lg:hidden mb-4">
                    <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">Send Transaction</h3>
                    <p className="text-[#4a5568]">After passing risk control, withdraw address sends transaction and returns on-chain status</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] shadow-md">
                    <i className="ri-send-plane-line text-blue-400 text-3xl mb-2"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">Use Cases</h2>
            <p className="text-xl text-[#4a5568]">Use Cases</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-blue-400/50 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-400/20 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-exchange-line text-blue-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">Brokers / Trading Platforms</h3>
              <p className="text-[#4a5568] leading-relaxed">Complete solution for virtual asset deposit and withdrawal operations</p>
            </div>

            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-blue-400/50 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-400/20 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-funds-line text-blue-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">ETF Subscription & Redemption</h3>
              <p className="text-[#4a5568] leading-relaxed">Fund flow management for physical subscription and redemption</p>
            </div>

            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-blue-400/50 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-400/20 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-coin-line text-blue-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">Stablecoin Payments</h3>
              <p className="text-[#4a5568] leading-relaxed">Tokenized product settlement and cross-border payments</p>
            </div>

            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-blue-400/50 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-400/20 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-links-line text-blue-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">Hot & Cold Wallet Synergy</h3>
              <p className="text-[#4a5568] leading-relaxed">Hot wallet operations + cold wallet custody architecture</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hot & Cold Wallet Synergy */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">Hot & Cold Wallet Synergy Advantages</h2>
            <p className="text-xl text-[#4a5568]">Hot & Cold Wallet Integration</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Hot Wallet */}
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl p-10 border-2 border-orange-400/30 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center">
                  <i className="ri-fire-line text-white text-3xl"></i>
                </div>
                <h3 className="text-3xl font-bold text-[#1e6b8a]">Hot Wallet</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-fill text-orange-400 text-xl flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568]">API automation</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-fill text-orange-400 text-xl flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568]">Supports high-frequency daily fund flows</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-fill text-orange-400 text-xl flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568]">Rapid response to user needs</p>
                </div>
              </div>
            </div>

            {/* Cold Wallet */}
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl p-10 border-2 border-blue-400/30 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <i className="ri-snowflake-line text-white text-3xl"></i>
                </div>
                <h3 className="text-3xl font-bold text-[#1e6b8a]">Cold Wallet</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568]">Offline signing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568]">Handles large amounts and highly sensitive assets</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568]">Multi-level approval and compliance control</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-orange-600/20 rounded-2xl p-8 border border-blue-400/30">
            <div className="flex items-start space-x-4">
              <i className="ri-information-line text-blue-400 text-3xl flex-shrink-0"></i>
              <div>
                <h4 className="text-xl font-bold text-[#1e6b8a] mb-3">Perfect Synergy</h4>
                <p className="text-[#4a5568] leading-relaxed">
                  Through relay pools and whitelist mechanisms, balance liquidity, efficiency, and security. Hot wallets handle daily high-frequency transactions, cold wallets protect core assets, jointly building an enterprise-grade digital asset management system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600/90 to-blue-700/90">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Upgrade digital asset operations from "usable API" to "risk-controllable, compliant, and scalable"
          </h2>
          <p className="text-xl text-blue-50 mb-10 leading-relaxed">
            Contact the DACC team to get Sandbox credentials and integration guide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact-en"
              className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <span>Contact Now</span>
              <i className="ri-arrow-right-line"></i>
            </a>
            <a
              href="/contact-en"
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 transform hover:-translate-y-1"
            >
              <span>Apply for Sandbox</span>
              <i className="ri-code-box-line"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e6b8a] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png" 
                  alt="DACC Logo" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Building next-generation infrastructure for tokenized financial markets
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => handleNavigateWithHash('/en', 'Services')}
                  className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform text-left"
                >
                  Services
                </button>
                <a href="/hot-wallet-en" className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform">
                  Hot Wallet Integration
                </a>
                <a href="/cold-wallet-en" className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform">
                  Cold Wallet
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => handleNavigateWithHash('/en', 'ecosystem')}
                  className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform text-left"
                >
                  Investors
                </button>
                <a href="/blog-en" className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform">News</a>
                <a href="/contact-en" className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform">Contact Us</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-sm mb-4">
              Copyright © 2026 Digital Asset Clearing Center (DACC). All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}