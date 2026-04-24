import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { WireframeSphere } from '../../components/feature/WireframeSphere';

export default function UseCaseEN() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [scrolled, setScrolled] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => { document.title = 'Use Cases | DACC - Digital Asset Clearing Center'; }, []);

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
            <button 
              onClick={() => handleNavigateWithHash('/', 'Services')}
              className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium"
            >
              Services
            </button>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-medium">
                Solutions
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {solutionsDropdownOpen && (
                <div className="absolute left-0 pt-2 w-56 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/hot-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Hot Wallet Integration</a>
                    <a href="/cold-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Cold Wallet</a>
                    <a href="/rwa-platform" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">RWA Tokenization Platform</a>
                    <a href="/chain-fusion" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">ChainFusion</a>
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
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-medium">
                Use Cases
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${useCasesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {useCasesDropdownOpen && (
                <div className="absolute left-0 pt-2 w-64 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/use-case" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Global Merchants x DACC</a>
                    <a href="/use-case-ttl" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">TTL × DACC</a>
                    <a href="/use-case-conflux" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Conflux x DACC</a>
                    <a href="/use-case-vatp" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Crypto Exchanges x DACC</a>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => handleNavigateWithHash('/', 'ecosystem')} className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">Investors</button>
            <a href="/blog" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">News</a>
            <a href="/contact" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm flex items-center whitespace-nowrap font-montserrat font-medium">Contact Us<i className="ri-arrow-right-up-line ml-1 text-xs"></i></a>
          </div>
        </nav>
      </div>

      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white/90 backdrop-blur-md border-b border-[#b8d9ed] shadow-md">
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
              className="bg-[#e8f4fb] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 text-sm"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
            <button onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')} className="inline-flex items-center gap-1 rounded-full border border-[#b8d9ed] bg-transparent px-2 py-1.5 text-xs font-semibold text-[#1e6b8a]">
              <WireframeSphere size={12} />
              <span>{isZh ? '中文' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1e6b8a] backdrop-blur-md z-40 lg:hidden pt-20">
          {!mobileSubmenu && (
            <div className="flex flex-col h-full px-6 py-8">
              <div className="space-y-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); handleNavigateWithHash('/', 'Services'); }}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>Services</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('solutions')}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>Solutions</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('useCases')}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>Use Cases</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); handleNavigateWithHash('/', 'ecosystem'); }}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>Investors</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>Blog</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
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
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">Solutions</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6 space-y-2">
                <a href="/hot-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Hot Wallet Integration</a>
                <a href="/cold-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Cold Wallet</a>
                <a href="/rwa-platform" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">RWA Tokenization Platform</a>
                <a href="/chain-fusion" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">ChainFusion</a>
              </div>
            </div>
          )}

          {/* Use Cases Submenu */}
          {mobileSubmenu === 'useCases' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">Use Cases</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <p className="text-white/80 text-sm mb-6">Explore our solutions</p>
                <div className="space-y-2">
                  <a href="/use-case" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Global Merchants x DACC</a>
                  <a href="/use-case-ttl" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">TTL × DACC</a>
                  <a href="/use-case-conflux" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Conflux x DACC</a>
                  <a href="/use-case-vatp" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Crypto Exchanges x DACC</a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Language Switcher - Desktop Only */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <button onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')} className="inline-flex items-center gap-1.5 rounded-full border border-[#b8d9ed] bg-white/80 backdrop-blur-md px-2.5 py-1.5 text-[#1e6b8a] hover:border-[#1e6b8a] hover:text-[#12b7d6] transition-colors text-xs font-semibold shadow-md">
          <WireframeSphere size={14} />
          <span>{isZh ? '中文' : 'EN'}</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#1e6b8a]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#f5b942]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-[#b8d9ed]/30 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="bg-[#f5b942] border border-[#c97a2f] text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
              {t('uc_hero_badge')}
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#1e6b8a] mb-6 leading-tight">
            {t('uc_hero_title')}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('uc_hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Introduction Card */}
          <div className="bg-gradient-to-br from-[#1e6b8a] to-[#0d4a61] rounded-3xl p-12 mb-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-building-line text-white text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">Aegis Custody Company Limited</h2>
                  <p className="text-blue-100 text-lg">{t('uc_intro_subtitle')}</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-white/95">
                {t('uc_intro_body')}
              </p>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* License Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center">
                  <i className="ri-shield-check-line text-[#1e6b8a] text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1e6b8a]">{t('uc_license_title')}</h3>
                  <p className="text-sm text-gray-600">{t('uc_license_sub')}</p>
                </div>
              </div>
              <div className="bg-[#e8f4fb] rounded-xl p-6 border border-[#b8d9ed]">
                <p className="text-lg font-semibold text-[#1e6b8a] mb-2">{t('uc_license_name')}</p>
                <p className="text-sm text-gray-600">{t('uc_license_desc')}</p>
              </div>
            </div>

            {/* Application Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center">
                  <i className="ri-safe-line text-[#1e6b8a] text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1e6b8a]">{t('uc_app_title')}</h3>
                  <p className="text-sm text-gray-600">{t('uc_app_sub')}</p>
                </div>
              </div>
              <div className="bg-[#e8f4fb] rounded-xl p-6 border border-[#b8d9ed]">
                <p className="text-lg font-semibold text-[#1e6b8a] mb-2">{t('uc_app_name')}</p>
                <p className="text-sm text-gray-600 mb-3">{t('uc_app_desc')}</p>
                <div className="flex items-center space-x-2 text-[#1e6b8a]">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span className="text-sm font-medium">{t('uc_app_badge')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Empowerment */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 mb-16 border border-[#b8d9ed]">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-[#1e6b8a] to-[#0d4a61] rounded-xl flex items-center justify-center">
                <i className="ri-code-box-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1e6b8a]">{t('uc_tech_title')}</h3>
                <p className="text-gray-600">{t('uc_tech_sub')}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#e8f4fb] rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-terminal-box-line text-[#1e6b8a] text-xl"></i>
                </div>
                <h4 className="font-bold text-[#1e6b8a] mb-2">{t('uc_tech_api_title')}</h4>
                <p className="text-sm text-gray-600">{t('uc_tech_api_desc')}</p>
              </div>

              <div className="bg-[#e8f4fb] rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-dashboard-line text-[#1e6b8a] text-xl"></i>
                </div>
                <h4 className="font-bold text-[#1e6b8a] mb-2">{t('uc_tech_dash_title')}</h4>
                <p className="text-sm text-gray-600">{t('uc_tech_dash_desc')}</p>
              </div>

              <div className="bg-[#e8f4fb] rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-file-chart-line text-[#1e6b8a] text-xl"></i>
                </div>
                <h4 className="font-bold text-[#1e6b8a] mb-2">{t('uc_tech_report_title')}</h4>
                <p className="text-sm text-gray-600">{t('uc_tech_report_desc')}</p>
              </div>
            </div>
          </div>

          {/* Ecosystem Integration */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-[#b8d9ed] mb-16 hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-[#1e6b8a] to-[#0d4a61] rounded-xl flex items-center justify-center">
                <i className="ri-links-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1e6b8a]">{t('uc_eco_title')}</h3>
                <p className="text-gray-600">{t('uc_eco_sub')}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { name: 'Binance', favicon: 'https://www.binance.com/favicon.ico' },
                { name: 'Bybit', favicon: 'https://www.bybit.com/favicon.ico' },
                { name: 'OKX', favicon: 'https://www.okx.com/favicon.ico' },
                { name: 'Kraken', favicon: 'https://www.kraken.com/favicon.ico' },
                { name: 'Coinbase', favicon: 'https://www.coinbase.com/favicon.ico' },
                { name: 'Huobi', favicon: 'https://www.htx.com/favicon.ico' },
                { name: 'Gate.io', favicon: 'https://www.gate.io/favicon.ico' },
                { name: 'KuCoin', favicon: 'https://www.kucoin.com/favicon.ico' },
              ].map((exchange) => (
                <div
                  key={exchange.name}
                  className="bg-[#e8f4fb] rounded-xl p-3 md:p-5 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 flex flex-col items-center justify-center gap-2 md:flex-row md:items-center md:justify-start md:gap-3 min-h-[80px]"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src={exchange.favicon}
                      alt={exchange.name}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-gray-800 font-bold text-xs">${exchange.name.charAt(0)}</span>`;
                        }
                      }}
                    />
                  </div>
                  <span className="font-semibold text-[#1e6b8a] text-xs md:text-sm text-center md:text-left">{exchange.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="bg-gradient-to-br from-white/90 to-[#e8f4fb] rounded-3xl p-12 text-gray-900 relative overflow-hidden border border-[#b8d9ed]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1e6b8a]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#f5b942]/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-[#dbeafe] rounded-full flex items-center justify-center">
                  <i className="ri-double-quotes-l text-[#1e6b8a] text-3xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1e6b8a]">{t('uc_testimonial_title')}</h3>
                  <p className="text-gray-600">{t('uc_testimonial_sub')}</p>
                </div>
              </div>

              <blockquote className="text-xl lg:text-2xl leading-relaxed mb-8 text-gray-700 italic">
                {t('uc_testimonial_quote')}
              </blockquote>

              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1e6b8a] to-[#0d4a61] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">TT</span>
                </div>
                <div>
                  <p className="font-bold text-lg text-[#1e6b8a]">{t('uc_testimonial_author')}</p>
                  <p className="text-gray-600">{t('uc_testimonial_role')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">{t('uc_benefits_title')}</h2>
            <p className="text-xl text-gray-600">{t('uc_benefits_sub')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-[#1e6b8a] text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">{t('uc_benefit_compliance_title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('uc_benefit_compliance_desc')}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-line-chart-line text-[#1e6b8a] text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">{t('uc_benefit_risk_title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('uc_benefit_risk_desc')}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-global-line text-[#1e6b8a] text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">{t('uc_benefit_global_title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('uc_benefit_global_desc')}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-dashboard-line text-[#1e6b8a] text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">{t('uc_benefit_transparent_title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('uc_benefit_transparent_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#1e6b8a] to-[#0d4a61] rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t('uc_cta_title')}</h2>
              <p className="text-xl text-blue-50 mb-8 leading-relaxed">
                {t('uc_cta_desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#contact"
                  className="bg-[#f5b942] text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-[#c97a2f] transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>{t('uc_cta_contact')}</span>
                  <i className="ri-arrow-right-line"></i>
                </a>
                <a
                  href="https://www.dacc.hk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#1e6b8a] transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 transform hover:-translate-y-1"
                >
                  <span>{t('uc_cta_learn')}</span>
                  <i className="ri-external-link-line"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#1e6b8a] text-white py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png" 
                  alt="DACC Logo" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                Building next-generation infrastructure for tokenized financial markets
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => handleNavigateWithHash('/', 'Services')}
                  className="block text-blue-100 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left"
                >
                  Services
                </button>
                <button 
                  onClick={() => handleNavigateWithHash('/', 'use-cases')}
                  className="block text-blue-100 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left"
                >
                  Use Cases
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Resources</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => handleNavigateWithHash('/', 'ecosystem')}
                  className="block text-blue-100 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left"
                >
                  Investors
                </button>
                <a href="/blog" className="block text-blue-100 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">News</a>
                <a href="/contact" className="block text-blue-100 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">Contact Us</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f5b942] transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 md:pt-8 text-center">
            <p className="text-blue-100 text-xs md:text-sm mb-3 md:mb-4">
              Copyright © 2026 Digital Asset Clearing Center (DACC). All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
