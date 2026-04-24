
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { WireframeSphere } from '../../components/feature/WireframeSphere';

export default function UseCaseConfluxEN() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [scrolled, setScrolled] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => { document.title = 'Conflux | DACC - Digital Asset Clearing Center'; }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-[#e8f4fb] via-[#b8d9ed] to-[#1e6b8a]">
      {/* Floating Navigation - Desktop */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
        <nav className={`${scrolled ? 'bg-white/90' : 'bg-white/70'} backdrop-blur-md border border-[#b8d9ed] rounded-full px-6 py-3 transition-all duration-300 shadow-lg`}>
          <div className="flex items-center justify-center space-x-8">
            <a href="/" className="cursor-pointer flex-shrink-0">
              <img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" alt="DACC Logo" className="h-6 w-auto object-contain" />
            </a>
            <a href="#Services" onClick={() => handleNavigateWithHash('/home-en', 'Services')} className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              Services
            </a>
            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-medium">
                Solutions
                <i className="ri-arrow-down-s-line"></i>
              </button>
              <div className="absolute left-0 top-full pt-2 w-56 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                  <a href="/hot-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Hot Wallet Integration</a>
                  <a href="/cold-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Cold Wallet</a>
                  <a href="/rwa-platform" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">RWA Tokenization Platform</a>
                  <a href="/chain-fusion" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">ChainFusion</a>
                </div>
              </div>
            </div>
            {/* Use Cases Dropdown */}
            <div className="relative" onMouseEnter={() => setUseCasesDropdownOpen(true)} onMouseLeave={() => setUseCasesDropdownOpen(false)}>
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-medium">
                Use Cases
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${useCasesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {useCasesDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-64 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/use-case" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Global Merchants x DACC</a>
                    <a href="/use-case-ttl" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">TTL × DACC</a>
                    <a href="/use-case-conflux" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Conflux x DACC</a>
                    <a href="/use-case-vatp" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Crypto Exchanges x DACC</a>
                  </div>
                </div>
              )}
            </div>
            <a href="#ecosystem" onClick={() => handleNavigateWithHash('/home-en', 'ecosystem')} className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              Investors
            </a>
            <a href="/blog" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              News
            </a>
            <a href="/contact" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm flex items-center whitespace-nowrap font-montserrat font-medium">
              Contact Us
              <i className="ri-arrow-right-up-line ml-1 text-xs"></i>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white/90 backdrop-blur-md border-b border-[#b8d9ed] shadow-md">
        <div className="flex items-center justify-between px-6 py-4">
          <a href="/" className="block cursor-pointer">
            <img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" alt="DACC Logo" className="h-8 w-auto object-contain" />
          </a>
          <div className="flex items-center space-x-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="bg-[#e8f4fb] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm">
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
        <div className="fixed inset-0 bg-[#1e6b8a]/95 backdrop-blur-md z-40 lg:hidden pt-20">
          {!mobileSubmenu && (
            <div className="flex flex-col h-full px-6 py-8">
              <div className="space-y-2">
                <button onClick={() => { handleNavigateWithHash('/home-en', 'Services'); setMobileMenuOpen(false); }} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>Services</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button onClick={() => setMobileSubmenu('solutions')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>Solutions</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button onClick={() => setMobileSubmenu('useCasesEN')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>Use Cases</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button onClick={() => { handleNavigateWithHash('/home-en', 'ecosystem'); setMobileMenuOpen(false); }} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>Investors</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>News</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>Contact Us</span><i className="ri-arrow-right-s-line text-2xl"></i>
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
                <a href="/hot-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Hot Wallet Integration</a>
                <a href="/cold-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Cold Wallet</a>
                <a href="/rwa-platform" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">RWA Tokenization Platform</a>
                <a href="/chain-fusion" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">ChainFusion</a>
              </div>
            </div>
          )}
          {mobileSubmenu === 'useCasesEN' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">Use Cases</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6 space-y-2">
                <a href="/use-case" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Global Merchants x DACC</a>
                <a href="/use-case-ttl" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">TTL × DACC</a>
                <a href="/use-case-conflux" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Conflux x DACC</a>
                <a href="/use-case-vatp" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Crypto Exchanges x DACC</a>
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
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-[#1e6b8a] mb-6">{t('conflux_hero_title')}</h1>
            <p className="text-xl text-[#4a5568] max-w-3xl mx-auto">{t('conflux_hero_subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1e6b8a] mb-12 text-center">{t('conflux_overview_title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-links-line text-3xl text-[#1e6b8a]"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">{t('conflux_tech_title')}</h3>
              <p className="text-[#4a5568] leading-relaxed">{t('conflux_tech_desc')}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-3xl text-[#1e6b8a]"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">{t('conflux_coop_title')}</h3>
              <p className="text-[#4a5568] leading-relaxed">{t('conflux_coop_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1e6b8a] mb-12 text-center">{t('conflux_features_title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-wallet-3-line text-3xl text-[#1e6b8a]"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-4">{t('conflux_feat1_title')}</h3>
              <p className="text-[#4a5568] leading-relaxed">{t('conflux_feat1_desc')}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-safe-2-line text-3xl text-[#1e6b8a]"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-4">{t('conflux_feat2_title')}</h3>
              <p className="text-[#4a5568] leading-relaxed">{t('conflux_feat2_desc')}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-exchange-line text-3xl text-[#1e6b8a]"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-4">{t('conflux_feat3_title')}</h3>
              <p className="text-[#4a5568] leading-relaxed">{t('conflux_feat3_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1e6b8a] mb-12 text-center">{t('conflux_arch_title')}</h2>
          <div className="bg-white/70 backdrop-blur-sm p-12 rounded-2xl border border-[#b8d9ed]">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-[#1e6b8a] mb-6">{t('conflux_hot_title')}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start"><i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-3 mt-1"></i><span className="text-[#4a5568]">{t('conflux_hot_1')}</span></li>
                  <li className="flex items-start"><i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-3 mt-1"></i><span className="text-[#4a5568]">{t('conflux_hot_2')}</span></li>
                  <li className="flex items-start"><i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-3 mt-1"></i><span className="text-[#4a5568]">{t('conflux_hot_3')}</span></li>
                  <li className="flex items-start"><i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-3 mt-1"></i><span className="text-[#4a5568]">{t('conflux_hot_4')}</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1e6b8a] mb-6">{t('conflux_cold_title')}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start"><i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-3 mt-1"></i><span className="text-[#4a5568]">{t('conflux_cold_1')}</span></li>
                  <li className="flex items-start"><i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-3 mt-1"></i><span className="text-[#4a5568]">{t('conflux_cold_2')}</span></li>
                  <li className="flex items-start"><i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-3 mt-1"></i><span className="text-[#4a5568]">{t('conflux_cold_3')}</span></li>
                  <li className="flex items-start"><i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-3 mt-1"></i><span className="text-[#4a5568]">{t('conflux_cold_4')}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Value */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1e6b8a] mb-12 text-center">{t('conflux_value_title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] text-center hover:border-[#1e6b8a] transition-all">
              <div className="w-20 h-20 bg-[#dbeafe] rounded-full flex items-center justify-center mx-auto mb-6"><i className="ri-shield-check-line text-4xl text-[#1e6b8a]"></i></div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-4">{t('conflux_val1_title')}</h3>
              <p className="text-[#4a5568]">{t('conflux_val1_desc')}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] text-center hover:border-[#1e6b8a] transition-all">
              <div className="w-20 h-20 bg-[#dbeafe] rounded-full flex items-center justify-center mx-auto mb-6"><i className="ri-speed-line text-4xl text-[#1e6b8a]"></i></div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-4">{t('conflux_val2_title')}</h3>
              <p className="text-[#4a5568]">{t('conflux_val2_desc')}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] text-center hover:border-[#1e6b8a] transition-all">
              <div className="w-20 h-20 bg-[#dbeafe] rounded-full flex items-center justify-center mx-auto mb-6"><i className="ri-money-dollar-circle-line text-4xl text-[#1e6b8a]"></i></div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-4">{t('conflux_val3_title')}</h3>
              <p className="text-[#4a5568]">{t('conflux_val3_desc')}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] text-center hover:border-[#1e6b8a] transition-all">
              <div className="w-20 h-20 bg-[#dbeafe] rounded-full flex items-center justify-center mx-auto mb-6"><i className="ri-team-line text-4xl text-[#1e6b8a]"></i></div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-4">{t('conflux_val4_title')}</h3>
              <p className="text-[#4a5568]">{t('conflux_val4_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Results */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1e6b8a] mb-12 text-center">{t('conflux_results_title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] text-center">
              <div className="text-5xl font-bold text-[#1e6b8a] mb-4">99.99%</div>
              <p className="text-[#4a5568] text-lg">{t('conflux_stat1_desc')}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] text-center">
              <div className="text-5xl font-bold text-[#1e6b8a] mb-4">&lt;3s</div>
              <p className="text-[#4a5568] text-lg">{t('conflux_stat2_desc')}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] text-center">
              <div className="text-5xl font-bold text-[#1e6b8a] mb-4">100%</div>
              <p className="text-[#4a5568] text-lg">{t('conflux_stat3_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#1e6b8a] to-[#0f4c5c] rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">{t('conflux_cta_title')}</h2>
              <p className="text-xl text-white/80 mb-8">{t('conflux_cta_desc')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="bg-white text-[#1e6b8a] px-8 py-4 rounded-full font-bold hover:bg-[#f5b942] hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2">
                  <span>{t('conflux_cta_contact')}</span><i className="ri-arrow-right-line"></i>
                </a>
                <a href="/use-case" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#1e6b8a] transition-all duration-300 cursor-pointer whitespace-nowrap">
                  {t('conflux_cta_more')}
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
                <img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png" alt="DACC Logo" className="h-20 w-auto object-contain" />
              </div>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">Pioneering the Next Decade of Digital Clearing and Settlement</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
              <div className="space-y-2">
                <a href="/home-en#Services" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">Services</a>
                <a href="/home-en#use-cases" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">Use Cases</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Resources</h4>
              <div className="space-y-2">
                <a href="/home-en#ecosystem" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">Investors</a>
                <a href="/blog" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">News</a>
                <a href="/contact" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">Contact Us</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Contact</h4>
              <p className="text-white/80 text-xs md:text-sm">Email: info@dacc.hk</p>
              <div className="flex space-x-4 mt-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#f5b942] transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 md:pt-8 text-center">
            <p className="text-white/80 text-xs md:text-sm">Copyright © 2026 Digital Asset Clearing Center (DACC). All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
