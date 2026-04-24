
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { WireframeSphere } from '../../components/feature/WireframeSphere';

export default function UseCaseVATPEN() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [scrolled, setScrolled] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => { document.title = 'VATP | DACC - Digital Asset Clearing Center'; }, []);

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
            <button onClick={() => handleNavigateWithHash('/home-en', 'Services')} className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              Services
            </button>
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
            <button onClick={() => handleNavigateWithHash('/home-en', 'ecosystem')} className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              Investors
            </button>
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
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="bg-[#f5b942]/20 border border-[#f5b942] text-[#1e3a4a] px-4 py-2 rounded-full text-sm font-semibold">{t('vatp_hero_badge')}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-6 leading-tight">{t('vatp_hero_title')} <span className="text-[#1e6b8a]">{t('vatp_hero_title_highlight')}</span></h1>
          <p className="text-lg text-[#4a5568] max-w-3xl mx-auto leading-relaxed mb-8">{t('vatp_hero_subtitle')}</p>
        </div>
      </section>

      {/* Background Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/50 rounded-2xl p-8 md:p-12 border border-[#b8d9ed]">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e6b8a] mb-6">{t('vatp_bg_title')}</h2>
            <div className="space-y-4 text-[#4a5568] leading-relaxed">
              <p>{t('vatp_bg_p1')}</p>
              <p>{t('vatp_bg_p2')}</p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#b8d9ed]">
              <p className="text-[#4a5568] text-sm mb-5 uppercase tracking-widest font-semibold">{t('vatp_bg_mou')}</p>
              <div className="flex flex-wrap items-center gap-6">
                <a href="https://www.panthertrade.com" target="_blank" rel="noopener noreferrer" className="flex items-center bg-white/60 border border-[#b8d9ed] hover:border-[#f5b942] rounded-xl px-6 py-4 transition-all duration-300 cursor-pointer group">
                  <div className="w-32 h-10 flex items-center justify-center space-x-2">
                    <img src="https://www.panthertrade.com/client/img/icon.5265cbf.svg" alt="PantherTrade" className="h-8 w-8 object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                    <span className="text-[#1e6b8a] font-bold text-base group-hover:text-[#f5b942] transition-colors whitespace-nowrap">PantherTrade</span>
                  </div>
                </a>
                <a href="https://www.yax.hk" target="_blank" rel="noopener noreferrer" className="flex items-center bg-white/60 border border-[#b8d9ed] hover:border-[#f5b942] rounded-xl px-6 py-4 transition-all duration-300 cursor-pointer group">
                  <div className="w-24 h-10 flex items-center justify-center">
                    <img src="https://www.yax.hk/logo.svg" alt="YAX" className="h-8 w-auto object-contain" onError={(e) => { const t = e.currentTarget; t.style.display = 'none'; const f = t.nextElementSibling as HTMLElement; if (f) f.style.display = 'flex'; }} />
                    <div className="hidden items-center space-x-1"><span className="text-[#f5b942] font-bold text-xl">≋</span><span className="text-[#1e6b8a] font-bold text-xl group-hover:text-[#f5b942] transition-colors">YAX</span></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 px-6 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e6b8a] mb-4">{t('vatp_obj_title')}</h2>
            <p className="text-[#4a5568]">{t('vatp_obj_sub')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: 'ri-shield-check-line', title: t('vatp_obj1_title'), desc: t('vatp_obj1_desc') },
              { icon: 'ri-lock-line', title: t('vatp_obj2_title'), desc: t('vatp_obj2_desc') },
              { icon: 'ri-speed-line', title: t('vatp_obj3_title'), desc: t('vatp_obj3_desc') },
              { icon: 'ri-line-chart-line', title: t('vatp_obj4_title'), desc: t('vatp_obj4_desc') },
            ].map(item => (
              <div key={item.title} className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300">
                <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6"><i className={`${item.icon} text-[#1e6b8a] text-2xl`}></i></div>
                <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">{item.title}</h3>
                <p className="text-[#4a5568] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DACC Solution */}
      <section className="py-16 px-6 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e6b8a] mb-4">{t('vatp_sol_title')}</h2>
            <p className="text-[#4a5568]">{t('vatp_sol_sub')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: 'ri-wallet-3-line', title: t('vatp_sol1_title'), items: t('vatp_sol1_items').split('|') },
              { icon: 'ri-shield-check-line', title: t('vatp_sol2_title'), items: t('vatp_sol2_items').split('|') },
              { icon: 'ri-file-chart-line', title: t('vatp_sol3_title'), items: t('vatp_sol3_items').split('|') },
              { icon: 'ri-customer-service-line', title: t('vatp_sol4_title'), items: t('vatp_sol4_items').split('|') },
            ].map(item => (
              <div key={item.title} className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-[#1e6b8a] rounded-full flex items-center justify-center"><i className={`${item.icon} text-white text-xl`}></i></div>
                  <h3 className="text-xl font-bold text-[#1e6b8a]">{item.title}</h3>
                </div>
                <ul className="space-y-3 text-[#4a5568] text-sm">
                  {item.items.map(li => (
                    <li key={li} className="flex items-start space-x-2"><i className="ri-checkbox-circle-fill text-[#1e6b8a] mt-1"></i><span>{li}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Value */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e6b8a] mb-4">{t('vatp_value_title')}</h2>
            <p className="text-[#4a5568]">{t('vatp_value_sub')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: 'ri-checkbox-circle-line', title: t('vatp_val1_title'), desc: t('vatp_val1_desc') },
              { icon: 'ri-time-line', title: t('vatp_val2_title'), desc: t('vatp_val2_desc') },
              { icon: 'ri-money-dollar-circle-line', title: t('vatp_val3_title'), desc: t('vatp_val3_desc') },
              { icon: 'ri-shield-check-line', title: t('vatp_val4_title'), desc: t('vatp_val4_desc') },
              { icon: 'ri-speed-up-line', title: t('vatp_val5_title'), desc: t('vatp_val5_desc') },
              { icon: 'ri-arrow-up-line', title: t('vatp_val6_title'), desc: t('vatp_val6_desc') },
            ].map(item => (
              <div key={item.title} className="bg-gradient-to-br from-[#1e6b8a]/20 to-[#0f4c5c]/20 rounded-2xl p-8 border border-[#b8d9ed]">
                <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6"><i className={`${item.icon} text-[#1e6b8a] text-2xl`}></i></div>
                <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">{item.title}</h3>
                <p className="text-[#4a5568] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#1e6b8a] to-[#0f4c5c] rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">{t('vatp_cta_title')}</h2>
              <p className="text-lg text-white/80 mb-8">{t('vatp_cta_desc')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="bg-white text-[#1e6b8a] px-8 py-4 rounded-full font-bold hover:bg-[#f5b942] hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2">
                  <span>{t('vatp_cta_contact')}</span><i className="ri-arrow-right-line"></i>
                </a>
                <a href="https://www.dacc.hk" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#1e6b8a] transition-all duration-300 cursor-pointer whitespace-nowrap">
                  {t('vatp_cta_learn')}
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
                <img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png" alt="DACC Logo" className="h-20 w-auto object-contain" />
              </div>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">Pioneering the Next Decade of Digital Clearing and Settlement</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => handleNavigateWithHash('/home-en', 'Services')} className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left">Services</button>
                <button onClick={() => handleNavigateWithHash('/home-en', 'use-cases')} className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left">Use Cases</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Resources</h4>
              <div className="space-y-2">
                <button onClick={() => handleNavigateWithHash('/home-en', 'ecosystem')} className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left">Investors</button>
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
