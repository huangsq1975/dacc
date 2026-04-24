import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { WireframeSphere } from '../../components/feature/WireframeSphere';

export default function UseCaseTTLEN() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => { document.title = 'TTL Token | DACC - Digital Asset Clearing Center'; }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-[#e8f4fb] via-[#b8d9ed] to-[#1e6b8a] text-[#1e3a4a]">
      {/* Floating Navigation - Desktop */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
        <nav className={`${scrolled ? 'bg-white/80' : 'bg-transparent'} backdrop-blur-md border border-[#b8d9ed] rounded-full px-6 py-3 transition-all duration-300`}>
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
              className="text-[#1e6b8a] hover:text-[#0ea5e9] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat"
            >
              Services
            </button>
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className="text-[#1e6b8a] hover:text-[#0ea5e9] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat flex items-center space-x-1"
              >
                <span>Use Cases</span>
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 min-w-[200px] shadow-xl">
                  <a href="/use-case" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#0ea5e9] hover:bg-[#e8f4fb]/50 transition-all cursor-pointer">
                    Global Merchants x DACC
                  </a>
                  <a href="/use-case-ttl" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#0ea5e9] hover:bg-[#e8f4fb]/50 transition-all cursor-pointer">
                    TTL × DACC
                  </a>
                  <a href="/use-case-conflux" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#0ea5e9] hover:bg-[#e8f4fb]/50 transition-all cursor-pointer">
                    Conflux x DACC
                  </a>
                  <a href="/use-case-vatp" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#0ea5e9] hover:bg-[#e8f4fb]/50 transition-all cursor-pointer">
                    Crypto Exchanges x DACC
                  </a>
                </div>
              )}
            </div>
            <button 
              onClick={() => handleNavigateWithHash('/', 'ecosystem')}
              className="text-[#1e6b8a] hover:text-[#0ea5e9] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat"
            >
              Investors
            </button>
            <a href="/blog" className="text-[#1e6b8a] hover:text-[#0ea5e9] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat">
              News
            </a>
            <a href="/contact" className="text-[#1e6b8a] hover:text-[#0ea5e9] transition-colors cursor-pointer text-sm flex items-center whitespace-nowrap font-montserrat">
              Contact Us
              <i className="ri-arrow-right-up-line ml-1 text-xs"></i>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Top Bar - Logo + Menu + Language */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white/80 backdrop-blur-md border-b border-[#b8d9ed]">
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
              className="bg-[#dbeafe] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-[#1e6b8a] hover:text-[#0ea5e9] transition-all duration-300 text-sm"
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
          {/* Main Menu */}
          {!mobileSubmenu && (
            <div className="flex flex-col h-full px-6 py-8">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavigateWithHash('/', 'Services');
                  }}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#38bdf8] transition-colors border-b border-white/20"
                >
                  <span>Services</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('useCases')}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#38bdf8] transition-colors border-b border-white/20"
                >
                  <span>Use Cases</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavigateWithHash('/', 'ecosystem');
                  }}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#38bdf8] transition-colors border-b border-white/20"
                >
                  <span>Investors</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#38bdf8] transition-colors border-b border-white/20"
                >
                  <span>News</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#38bdf8] transition-colors border-b border-white/20"
                >
                  <span>Contact Us</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
              </div>
            </div>
          )}

          {/* Use Cases Submenu */}
          {mobileSubmenu === 'useCases' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#38bdf8] transition-colors"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">Use Cases</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <p className="text-white/70 text-sm mb-6">Explore our solutions</p>
                <div className="space-y-2">
                  <a href="/use-case" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#38bdf8] transition-colors border-b border-white/20">Global Merchants x DACC</a>
                  <a href="/use-case-ttl" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#38bdf8] transition-colors border-b border-white/20">TTL × DACC</a>
                  <a href="/use-case-conflux" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#38bdf8] transition-colors border-b border-white/20">Conflux x DACC</a>
                  <a href="/use-case-vatp" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#38bdf8] transition-colors border-b border-white/20">Crypto Exchanges x DACC</a>
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
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0ea5e9]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1e6b8a]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="bg-[#0ea5e9]/10 border border-[#0284c7] text-[#0284c7] px-4 py-2 rounded-full text-sm font-semibold">
              {t('ttl_hero_badge')}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-6 leading-tight">
            {t('ttl_hero_title')} <span className="text-[#0ea5e9]">{t('ttl_hero_title_highlight')}</span>
          </h1>
          <p className="text-lg text-[#1e3a4a] max-w-3xl mx-auto leading-relaxed mb-8">
            {t('ttl_hero_subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center space-x-2 transform hover:scale-105">
              <span>Request a Demo</span>
              <i className="ri-arrow-right-line"></i>
            </a>
            <a href="#solutions" className="bg-transparent border border-[#1e6b8a] hover:border-[#0ea5e9] text-[#1e6b8a] hover:text-[#0ea5e9] px-6 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap transform hover:scale-105">
              Explore Products
            </a>
          </div>
        </div>
      </section>

      {/* What is TTL × DACC */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Challenge */}
            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#0ea5e9] transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#0ea5e9]/20 rounded-xl flex items-center justify-center">
                  <i className="ri-error-warning-line text-[#0284c7] text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#1e6b8a]">{t('ttl_challenge_title')}</h3>
              </div>
              <p className="text-[#1e3a4a] leading-relaxed mb-4">
                {t('ttl_challenge_intro')}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <i className="ri-checkbox-blank-circle-fill text-[#0284c7] text-xs mt-2"></i>
                  <span className="text-[#1e3a4a]">{t('ttl_challenge_1')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-checkbox-blank-circle-fill text-[#0284c7] text-xs mt-2"></i>
                  <span className="text-[#1e3a4a]">{t('ttl_challenge_2')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-checkbox-blank-circle-fill text-[#0284c7] text-xs mt-2"></i>
                  <span className="text-[#1e3a4a]">{t('ttl_challenge_3')}</span>
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div className="bg-gradient-to-br from-[#1e6b8a]/20 to-[#0ea5e9]/20 rounded-2xl p-8 border border-[#0ea5e9]">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#0ea5e9]/20 rounded-xl flex items-center justify-center">
                  <i className="ri-lightbulb-line text-[#0284c7] text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#1e6b8a]">{t('ttl_why_title')}</h3>
              </div>
              <p className="text-[#1e3a4a] leading-relaxed mb-4">
                {t('ttl_why_body')}
              </p>
              <p className="text-[#1e6b8a] font-medium">
                {t('ttl_why_conclusion')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Joint Solution */}
      <section id="solutions" className="py-16 px-6 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e6b8a] mb-4">{t('ttl_joint_title')}</h2>
            <p className="text-[#1e3a4a]">{t('ttl_joint_sub')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Clearing & Settlement */}
            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#0ea5e9] transition-all duration-300">
              <div className="w-14 h-14 bg-[#0ea5e9]/20 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-exchange-funds-line text-[#0284c7] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">{t('ttl_clearing_title')}</h3>
              <p className="text-[#1e3a4a] mb-4">{t('ttl_clearing_desc')}</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#0ea5e9]/10 text-[#0284c7] px-3 py-1 rounded-full text-xs">Real-time Settlement</span>
                <span className="bg-[#0ea5e9]/10 text-[#0284c7] px-3 py-1 rounded-full text-xs">Multi-chain Support</span>
              </div>
            </div>

            {/* Institutional Trading */}
            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#0ea5e9] transition-all duration-300">
              <div className="w-14 h-14 bg-[#0ea5e9]/20 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-building-2-line text-[#0284c7] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">{t('ttl_trading_title')}</h3>
              <p className="text-[#1e3a4a] mb-4">{t('ttl_trading_desc')}</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#0ea5e9]/10 text-[#0284c7] px-3 py-1 rounded-full text-xs">VASP/VATP Licensed</span>
                <span className="bg-[#0ea5e9]/10 text-[#0284c7] px-3 py-1 rounded-full text-xs">Open API</span>
              </div>
            </div>

            {/* Compliance */}
            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#0ea5e9] transition-all duration-300">
              <div className="w-14 h-14 bg-[#0ea5e9]/20 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-[#0284c7] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">{t('ttl_compliance_title')}</h3>
              <p className="text-[#1e3a4a] mb-4">{t('ttl_compliance_desc')}</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#0ea5e9]/10 text-[#0284c7] px-3 py-1 rounded-full text-xs">AML/KYC</span>
                <span className="bg-[#0ea5e9]/10 text-[#0284c7] px-3 py-1 rounded-full text-xs">Audit Trail</span>
              </div>
            </div>

            {/* Modular Deployment */}
            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#0ea5e9] transition-all duration-300">
              <div className="w-14 h-14 bg-[#0ea5e9]/20 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-stack-line text-[#0284c7] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">{t('ttl_modular_title')}</h3>
              <p className="text-[#1e3a4a] mb-4">{t('ttl_modular_desc')}</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#0ea5e9]/10 text-[#0284c7] px-3 py-1 rounded-full text-xs">Phased Rollout</span>
                <span className="bg-[#0ea5e9]/10 text-[#0284c7] px-3 py-1 rounded-full text-xs">Customizable</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Clients */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e6b8a] mb-4">{t('ttl_who_title')}</h2>
            <p className="text-[#1e3a4a]">{t('ttl_who_sub')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:border-[#0ea5e9] transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-[#0ea5e9]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-bank-line text-[#0284c7] text-2xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">{t('ttl_who_banks_title')}</h4>
              <p className="text-sm text-[#1e3a4a]">{t('ttl_who_banks_desc')}</p>
            </div>

            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:border-[#0ea5e9] transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-[#0ea5e9]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-exchange-line text-[#0284c7] text-2xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">{t('ttl_who_exchanges_title')}</h4>
              <p className="text-sm text-[#1e3a4a]">{t('ttl_who_exchanges_desc')}</p>
            </div>

            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:border-[#0ea5e9] transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-[#0ea5e9]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-funds-line text-[#0284c7] text-2xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">{t('ttl_who_assets_title')}</h4>
              <p className="text-sm text-[#1e3a4a]">{t('ttl_who_assets_desc')}</p>
            </div>

            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:border-[#0ea5e9] transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-[#0ea5e9]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-pie-chart-line text-[#0284c7] text-2xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">{t('ttl_who_wealth_title')}</h4>
              <p className="text-sm text-[#1e3a4a]">{t('ttl_who_wealth_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e6b8a] mb-4">{t('ttl_how_title')}</h2>
            <p className="text-[#1e3a4a]">{t('ttl_how_sub')}</p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: 1, title: t('ttl_step_1_title'), desc: t('ttl_step_1_desc') },
              { step: 2, title: t('ttl_step_2_title'), desc: t('ttl_step_2_desc') },
              { step: 3, title: t('ttl_step_3_title'), desc: t('ttl_step_3_desc') },
              { step: 4, title: t('ttl_step_4_title'), desc: t('ttl_step_4_desc') },
              { step: 5, title: t('ttl_step_5_title'), desc: t('ttl_step_5_desc') }
            ].map((item) => (
              <div key={item.step} className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:border-[#0ea5e9] transition-all duration-300">
                <div className="w-10 h-10 bg-[#0ea5e9] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold">{item.step}</span>
                </div>
                <h4 className="font-bold text-[#1e6b8a] mb-2">{item.title}</h4>
                <p className="text-sm text-[#1e3a4a]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#1e6b8a]/20 to-[#0ea5e9]/20 rounded-3xl p-10 border border-[#0ea5e9]">
            <div className="text-center mb-10">
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-[#0ea5e9] mb-2">T+0</div>
                <p className="text-[#1e6b8a] font-medium">{t('ttl_kpi_settlement_label')}</p>
                <p className="text-sm text-[#1e3a4a]">{t('ttl_kpi_settlement_desc')}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-[#0ea5e9] mb-2">≥99.9%</div>
                <p className="text-[#1e6b8a] font-medium">{t('ttl_kpi_uptime_label')}</p>
                <p className="text-sm text-[#1e3a4a]">{t('ttl_kpi_uptime_desc')}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-[#0ea5e9] mb-2">{t('ttl_kpi_audit_value')}</div>
                <p className="text-[#1e6b8a] font-medium">{t('ttl_kpi_audit_label')}</p>
                <p className="text-sm text-[#1e3a4a]">{t('ttl_kpi_audit_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#1e6b8a] to-[#0f4c5c] rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">{t('ttl_cta_title')}</h2>
              <p className="text-lg text-white/80 mb-8">
                Contact us to learn how TTL × DACC can accelerate your tokenized asset operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="bg-white text-[#1e6b8a] px-8 py-4 rounded-full font-bold hover:bg-[#38bdf8] hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2">
                  <span>Contact Us</span>
                  <i className="ri-arrow-right-line"></i>
                </a>
                <a href="https://www.dacc.hk" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#1e6b8a] transition-all duration-300 cursor-pointer whitespace-nowrap">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e6b8a] text-white py-8 md:py-12 px-4 md:px-6">
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
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                Pioneering the Next Decade of Digital Clearing and Settlement
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => handleNavigateWithHash('/', 'Services')}
                  className="block text-white/80 hover:text-[#38bdf8] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left"
                >
                  Services
                </button>
                <button 
                  onClick={() => handleNavigateWithHash('/', 'use-cases')}
                  className="block text-white/80 hover:text-[#38bdf8] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left"
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
                  className="block text-white/80 hover:text-[#38bdf8] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left"
                >
                  Investors
                </button>
                <a href="/blog" className="block text-white/80 hover:text-[#38bdf8] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">News</a>
                <a href="/contact" className="block text-white/80 hover:text-[#38bdf8] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">Contact Us</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Contact</h4>
              <p className="text-white/80 text-xs md:text-sm mb-4">Email: info@dacc.hk</p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#38bdf8] transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 md:pt-8 text-center">
            <p className="text-white/80 text-xs md:text-sm mb-3 md:mb-4">
              Copyright © 2026 Digital Asset Clearing Center (DACC). All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}