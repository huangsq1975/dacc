import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { WireframeSphere } from '../../components/feature/WireframeSphere';

export default function ChainFusionEN() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const isZh = i18n.language === 'zh';

  useEffect(() => { document.title = 'ChainFusion | DACC - Digital Asset Clearing Center'; }, []);

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
            <a href="/en#Services" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-medium">{t('nav_services')}</a>
            <div className="relative" onMouseEnter={() => setSolutionsDropdownOpen(true)} onMouseLeave={() => setSolutionsDropdownOpen(false)}>
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-medium">
                {t('nav_solutions')}<i className={`ri-arrow-down-s-line transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {solutionsDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-56 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/hot-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">{t('nav_sol_hot_wallet')}</a>
                    <a href="/cold-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">{t('nav_sol_cold_wallet')}</a>
                    <a href="/rwa-platform" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">{t('nav_sol_rwa')}</a>
                    <a href="/chain-fusion" className="block px-4 py-2 text-sm text-[#f5b942] font-semibold hover:bg-[#e8f4fb] transition-colors">{t('nav_sol_chainfusion')}</a>
                  </div>
                </div>
              )}
            </div>
            <div className="relative" onMouseEnter={() => setUseCasesDropdownOpen(true)} onMouseLeave={() => setUseCasesDropdownOpen(false)}>
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-medium">
                {t('nav_use_cases')}<i className={`ri-arrow-down-s-line transition-transform duration-200 ${useCasesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {useCasesDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-64 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/use-case" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">{t('nav_uc_global')}</a>
                    <a href="/use-case-ttl" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">{t('nav_uc_ttl')}</a>
                    <a href="/use-case-conflux" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">{t('nav_uc_conflux')}</a>
                    <a href="/use-case-vatp" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">{t('nav_uc_vatp')}</a>
                  </div>
                </div>
              )}
            </div>
            <a href="/en#ecosystem" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-medium">{t('nav_investors')}</a>
            <a href="/blog" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-medium">{t('nav_news')}</a>
            <a href="/contact" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm flex items-center whitespace-nowrap font-medium">
              {t('nav_contact_us')}<i className="ri-arrow-right-up-line ml-1 text-xs"></i>
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
            <button onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')} className="inline-flex items-center gap-1 rounded-full border border-[#b8d9ed] bg-transparent px-2 py-1.5 text-xs font-semibold text-[#1e6b8a]"><WireframeSphere size={12} /><span>{isZh ? '中文' : 'EN'}</span></button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1e6b8a]/95 backdrop-blur-md z-40 lg:hidden pt-20">
          {!mobileSubmenu && (
            <div className="px-6 py-8 space-y-2">
              <a href="/en#Services" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>{t('nav_services')}</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </a>
              <button onClick={() => setMobileSubmenu('solutions')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>{t('nav_solutions')}</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </button>
              <button onClick={() => setMobileSubmenu('useCases')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>{t('nav_use_cases')}</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </button>
              <a href="/en#ecosystem" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>{t('nav_investors')}</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </a>
              <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>{t('nav_news')}</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </a>
              <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>{t('nav_contact_us')}</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </a>
            </div>
          )}
          {mobileSubmenu === 'solutions' && (
            <div>
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">{t('nav_solutions')}</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6 space-y-2">
                <a href="/hot-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">{t('nav_sol_hot_wallet')}</a>
                <a href="/cold-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">{t('nav_sol_cold_wallet')}</a>
                <a href="/rwa-platform" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">{t('nav_sol_rwa')}</a>
                <a href="/chain-fusion" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#f5b942] border-b border-white/20">{t('nav_sol_chainfusion')}</a>
              </div>
            </div>
          )}
          {mobileSubmenu === 'useCases' && (
            <div>
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">{t('nav_use_cases')}</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6 space-y-2">
                <a href="/use-case" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">{t('nav_uc_global')}</a>
                <a href="/use-case-ttl" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">{t('nav_uc_ttl')}</a>
                <a href="/use-case-conflux" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">{t('nav_uc_conflux')}</a>
                <a href="/use-case-vatp" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">{t('nav_uc_vatp')}</a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Language Switcher Desktop ── */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <button onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')} className="inline-flex items-center gap-1.5 rounded-full border border-[#b8d9ed] bg-white/80 backdrop-blur-md px-2.5 py-1.5 text-[#1e6b8a] hover:border-[#1e6b8a] hover:text-[#12b7d6] transition-colors text-xs font-semibold shadow-md"><WireframeSphere size={14} /><span>{isZh ? '中文' : 'EN'}</span></button>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=abstract%20dark%20teal%20blue%20gradient%20background%20with%20glowing%20network%20nodes%20and%20blockchain%20chain%20links%20flowing%20across%20a%20deep%20ocean%20blue%20canvas%2C%20soft%20light%20rays%2C%20futuristic%20fintech%20atmosphere%2C%20ultra%20wide%20cinematic%20composition%2C%20no%20text&width=1440&height=900&seq=cfen001&orientation=landscape"
            alt="ChainFusion Hero"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f3d52]/80 via-[#1e6b8a]/70 to-[#0f3d52]/90"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 pt-24">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 rounded-full px-5 py-2 mb-8">
            <div className="w-2 h-2 bg-[#f5b942] rounded-full animate-pulse"></div>
            <span className="text-sm text-white/90 font-medium tracking-wide">{t('cf_hero_badge')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t('cf_hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-4 leading-relaxed">
            {t('cf_hero_subtitle')}
          </p>
          <p className="text-base text-white/60 max-w-2xl mx-auto mb-10">
            {t('cf_hero_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-[#f5b942] hover:bg-[#e0a830] text-[#1e3a4a] px-8 py-4 rounded-full font-bold transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg">
              {t('cf_hero_cta_review')}
            </a>
            <a href="/contact" className="bg-white/10 border border-white/40 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              {t('cf_hero_cta_whitepaper')}
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <i className="ri-arrow-down-line text-white/50 text-2xl"></i>
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">{t('cf_ecosystem_title')}</h2>
          <p className="text-[#4a5568] mb-14 max-w-xl mx-auto">{t('cf_ecosystem_subtitle')}</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mb-10">
            {[
              { icon: 'ri-bank-line', label: 'CIPS' },
              { icon: 'ri-exchange-dollar-line', label: 'RTGS' },
              { icon: 'ri-speed-line', label: 'FPS' },
              { icon: 'ri-global-line', label: 'SWIFT' },
              { icon: 'ri-links-line', label: 'Mbridge' },
              { icon: 'ri-coin-line', label: 'Ant Chain' },
              { icon: 'ri-currency-line', label: 'DCEP' },
              { icon: 'ri-bit-coin-line', label: 'Ethereum' },
              { icon: 'ri-shield-check-line', label: 'OFAC' },
              { icon: 'ri-file-list-3-line', label: 'Travel Rule' },
              { icon: 'ri-user-search-line', label: 'KYC/AML' },
              { icon: 'ri-government-line', label: 'HKMA' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center justify-center p-4 rounded-2xl border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-md transition-all duration-300 cursor-default group">
                <div className="w-10 h-10 flex items-center justify-center mb-2">
                  <i className={`${item.icon} text-2xl text-[#1e6b8a] group-hover:text-[#f5b942] transition-colors`}></i>
                </div>
                <span className="text-xs font-semibold text-[#4a5568] group-hover:text-[#1e6b8a] transition-colors">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="inline-flex items-center gap-2 bg-[#1e6b8a] hover:bg-[#155a75] text-white px-7 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              {t('cf_ecosystem_cta_all')}<i className="ri-arrow-right-line"></i>
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 border border-[#1e6b8a] text-[#1e6b8a] hover:bg-[#e8f4fb] px-7 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              {t('cf_ecosystem_cta_request')}
            </a>
          </div>
        </div>
      </section>

      {/* Five-Layer Architecture */}
      <section className="py-20 px-6 bg-[#f7fbfe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">{t('cf_arch_title')}</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">{t('cf_arch_subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: 'ri-plug-line',
                color: 'bg-[#dbeafe]',
                iconColor: 'text-[#1e6b8a]',
                title: t('cf_arch_0_title'),
                desc: t('cf_arch_0_desc'),
                points: [t('cf_arch_0_pt0'), t('cf_arch_0_pt1'), t('cf_arch_0_pt2')],
              },
              {
                icon: 'ri-swap-line',
                color: 'bg-[#fef3c7]',
                iconColor: 'text-[#d97706]',
                title: t('cf_arch_1_title'),
                desc: t('cf_arch_1_desc'),
                points: [t('cf_arch_1_pt0'), t('cf_arch_1_pt1'), t('cf_arch_1_pt2')],
              },
              {
                icon: 'ri-route-line',
                color: 'bg-[#d1fae5]',
                iconColor: 'text-[#059669]',
                title: t('cf_arch_2_title'),
                desc: t('cf_arch_2_desc'),
                points: [t('cf_arch_2_pt0'), t('cf_arch_2_pt1'), t('cf_arch_2_pt2')],
              },
              {
                icon: 'ri-shield-check-line',
                color: 'bg-[#ede9fe]',
                iconColor: 'text-[#7c3aed]',
                title: t('cf_arch_3_title'),
                desc: t('cf_arch_3_desc'),
                points: [t('cf_arch_3_pt0'), t('cf_arch_3_pt1'), t('cf_arch_3_pt2')],
              },
            ].map((layer) => (
              <div key={layer.title} className="bg-white rounded-2xl p-8 border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 ${layer.color} rounded-xl flex items-center justify-center mb-5`}>
                  <i className={`${layer.icon} text-2xl ${layer.iconColor}`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#1e3a4a] mb-2">{layer.title}</h3>
                <p className="text-[#4a5568] text-sm mb-4">{layer.desc}</p>
                <ul className="space-y-2">
                  {layer.points.map((p) => (
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

      {/* Flexible Integration Options */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">{t('cf_integration_title')}</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">{t('cf_integration_subtitle')}</p>
          </div>

          {/* Architecture Diagram */}
          <div className="bg-[#f7fbfe] rounded-3xl p-8 border border-[#e8f4fb]">
            <div className="bg-gradient-to-r from-[#1e6b8a] to-[#155a75] rounded-2xl p-5 text-center mb-4 shadow-md">
              <p className="text-white/70 text-xs font-medium mb-1 tracking-widest uppercase">{t('cf_integration_platform_label')}</p>
              <p className="text-white text-xl font-bold">{t('cf_integration_platform_title')}</p>
              <div className="flex justify-center gap-4 mt-3">
                {[t('cf_integration_step0'), t('cf_integration_step1'), t('cf_integration_step2'), t('cf_integration_step3')].map((step) => (
                  <span key={step} className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">{step}</span>
                ))}
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-0.5 h-8 bg-[#b8d9ed]"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-5 border border-[#b8d9ed] shadow-sm">
                <p className="text-[#1e6b8a] font-bold text-sm mb-2">{t('cf_integration_digital_title')}</p>
                <div className="space-y-2">
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">CIPS / CNAP (RMB)</div>
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">RTGS / FPS (HKD)</div>
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">SWIFT (International Wire)</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-[#b8d9ed] shadow-sm">
                <p className="text-[#1e6b8a] font-bold text-sm mb-2">{t('cf_integration_api_title')}</p>
                <div className="space-y-2">
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">Mbridge / DCEP (Digital RMB)</div>
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">Ethereum / EVM-compatible chains</div>
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">Ant Chain / Private chains</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-0.5 h-8 bg-[#b8d9ed]"></div>
            </div>
            <div className="bg-[#1e3a4a] rounded-2xl p-5 text-center shadow-md">
              <p className="text-white/60 text-xs font-medium mb-1 tracking-widest uppercase">{t('cf_integration_existing_label')}</p>
              <p className="text-white text-lg font-bold">{t('cf_integration_existing_title')}</p>
              <div className="flex justify-center gap-4 mt-3">
                {['Jack Henry', 'Temenos', 'Finastra'].map((vendor) => (
                  <span key={vendor} className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full">{vendor}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { icon: 'ri-tools-line', title: t('cf_integration_benefit0_title'), desc: t('cf_integration_benefit0_desc') },
              { icon: 'ri-git-branch-line', title: t('cf_integration_benefit1_title'), desc: t('cf_integration_benefit1_desc') },
              { icon: 'ri-verified-badge-line', title: t('cf_integration_benefit2_title'), desc: t('cf_integration_benefit2_desc') },
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

      {/* Dynamic Routing Engine */}
      <section className="py-20 px-6 bg-[#f7fbfe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">{t('cf_routing_title')}</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">{t('cf_routing_subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { currency: 'DCEP / Digital RMB', icon: 'ri-currency-cny-line', routes: [{ label: 'Domestic', path: 'CNAP', color: 'bg-[#dbeafe] text-[#1e6b8a]' }, { label: 'Cross-border', path: 'Mbridge', color: 'bg-[#fef3c7] text-[#d97706]' }] },
              { currency: 'CNH / Offshore RMB', icon: 'ri-exchange-dollar-line', routes: [{ label: 'Large amount', path: 'CIPS', color: 'bg-[#dbeafe] text-[#1e6b8a]' }, { label: 'Small amount', path: 'Stablecoin route', color: 'bg-[#d1fae5] text-[#059669]' }] },
              { currency: 'HKD / Hong Kong Dollar', icon: 'ri-bank-line', routes: [{ label: 'Large amount', path: 'RTGS', color: 'bg-[#dbeafe] text-[#1e6b8a]' }, { label: 'Small amount', path: 'FPS', color: 'bg-[#ede9fe] text-[#7c3aed]' }] },
            ].map((item) => (
              <div key={item.currency} className="bg-white rounded-2xl p-7 border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-[#e8f4fb] rounded-xl flex items-center justify-center mb-4">
                  <i className={`${item.icon} text-2xl text-[#1e6b8a]`}></i>
                </div>
                <h3 className="text-lg font-bold text-[#1e3a4a] mb-4">{item.currency}</h3>
                <div className="space-y-3">
                  {item.routes.map((r) => (
                    <div key={r.label} className="flex items-center justify-between">
                      <span className="text-sm text-[#4a5568]">{r.label}</span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${r.color}`}>{r.path}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 bg-gradient-to-r from-[#e8f4fb] to-[#dbeafe] rounded-2xl border border-[#b8d9ed] text-center">
            <p className="text-[#1e6b8a] font-medium">{t('cf_routing_note')}</p>
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">{t('cf_capabilities_title')}</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">{t('cf_capabilities_subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'ri-shield-keyhole-line', title: t('cf_cap_0_title'), desc: t('cf_cap_0_desc') },
              { icon: 'ri-flashlight-line', title: t('cf_cap_1_title'), desc: t('cf_cap_1_desc') },
              { icon: 'ri-building-4-line', title: t('cf_cap_2_title'), desc: t('cf_cap_2_desc') },
              { icon: 'ri-bar-chart-grouped-line', title: t('cf_cap_3_title'), desc: t('cf_cap_3_desc') },
              { icon: 'ri-palette-line', title: t('cf_cap_4_title'), desc: t('cf_cap_4_desc') },
              { icon: 'ri-earth-line', title: t('cf_cap_5_title'), desc: t('cf_cap_5_desc') },
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

      {/* Business Value Stats */}
      <section className="py-20 px-6 bg-[#f7fbfe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">{t('cf_stats_title')}</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">{t('cf_stats_subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: t('cf_stat_0_value'), label: t('cf_stat_0_label'), sub: t('cf_stat_0_sub') },
              { value: t('cf_stat_1_value'), label: t('cf_stat_1_label'), sub: t('cf_stat_1_sub') },
              { value: t('cf_stat_2_value'), label: t('cf_stat_2_label'), sub: t('cf_stat_2_sub') },
              { value: t('cf_stat_3_value'), label: t('cf_stat_3_label'), sub: t('cf_stat_3_sub') },
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

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=deep%20teal%20dark%20ocean%20abstract%20background%20with%20soft%20glowing%20light%20particles%20and%20subtle%20grid%20lines%2C%20professional%20fintech%20atmosphere%2C%20wide%20cinematic%20composition%2C%20no%20text%2C%20no%20people&width=1440&height=600&seq=cfen002&orientation=landscape"
            alt="CTA Background"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f3d52]/90 to-[#1e6b8a]/85"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t('cf_cta_title')}
          </h2>
          <p className="text-xl text-white/75 mb-10 max-w-2xl mx-auto">
            {t('cf_cta_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-[#f5b942] hover:bg-[#e0a830] text-[#1e3a4a] px-10 py-4 rounded-full font-bold transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg">
              {t('cf_cta_demo')}
            </a>
            <a href="/contact" className="bg-white/10 border border-white/40 hover:bg-white/20 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              {t('cf_cta_poc')}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e6b8a] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png" alt="DACC Logo" className="h-20 w-auto object-contain mb-4" />
              <p className="text-white/80 text-sm leading-relaxed">{t('cf_footer_tagline')}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">{t('footer_quick_links')}</h4>
              <div className="space-y-2">
                <a href="/en#Services" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-sm hover:translate-x-2 transform">{t('nav_services')}</a>
                <a href="/en#use-cases" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-sm hover:translate-x-2 transform">{t('nav_use_cases')}</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">{t('footer_resources')}</h4>
              <div className="space-y-2">
                <a href="/en#ecosystem" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-sm hover:translate-x-2 transform">{t('nav_investors')}</a>
                <a href="/blog" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-sm hover:translate-x-2 transform">{t('nav_news')}</a>
                <a href="/contact" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-sm hover:translate-x-2 transform">{t('nav_contact_us')}</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">{t('footer_contact')}</h4>
              <p className="text-white/80 text-sm">Email: info@dacc.hk</p>
              <div className="flex space-x-4 mt-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#f5b942] transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/80 text-sm">{t('footer_copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
