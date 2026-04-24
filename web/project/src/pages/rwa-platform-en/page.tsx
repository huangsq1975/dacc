import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { WireframeSphere } from '../../components/feature/WireframeSphere';

export default function RWAPlatformEN() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const isZh = i18n.language === 'zh';

  useEffect(() => { document.title = 'RWA Platform | DACC - Digital Asset Clearing Center'; }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Floating Nav Desktop */}
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
                    <a href="/rwa-platform" className="block px-4 py-2 text-sm text-[#f5b942] font-semibold hover:bg-[#e8f4fb] transition-colors">{t('nav_sol_rwa')}</a>
                    <a href="/chain-fusion" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">{t('nav_sol_chainfusion')}</a>
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

      {/* Mobile Top Bar */}
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

      {/* Mobile Menu */}
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
                <a href="/rwa-platform" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#f5b942] border-b border-white/20">{t('nav_sol_rwa')}</a>
                <a href="/chain-fusion" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">{t('nav_sol_chainfusion')}</a>
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

      {/* Language Switcher Desktop */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <button onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')} className="inline-flex items-center gap-1.5 rounded-full border border-[#b8d9ed] bg-white/80 backdrop-blur-md px-2.5 py-1.5 text-[#1e6b8a] hover:border-[#1e6b8a] hover:text-[#12b7d6] transition-colors text-xs font-semibold shadow-md"><WireframeSphere size={14} /><span>{isZh ? '中文' : 'EN'}</span></button>
      </div>

      {/* HERO */}
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
            <span className="text-sm text-white/90 font-medium tracking-wide">{t('rwa_hero_badge')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t('rwa_hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-4 leading-relaxed">
            {t('rwa_hero_subtitle')}
          </p>
          <p className="text-base text-white/60 max-w-2xl mx-auto mb-10">
            {t('rwa_hero_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-[#f5b942] hover:bg-[#e0a830] text-[#1e3a4a] px-8 py-4 rounded-full font-bold transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg">
              {t('rwa_hero_cta_demo')}
            </a>
            <a href="/contact" className="bg-white/10 border border-white/40 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              {t('rwa_hero_cta_assess')}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-white/70">
            {['rwa_hero_check0', 'rwa_hero_check1', 'rwa_hero_check2'].map((key) => (
              <div key={key} className="flex items-center space-x-2">
                <i className="ri-checkbox-circle-fill text-[#f5b942]"></i>
                <span>{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <i className="ri-arrow-down-line text-white/50 text-2xl"></i>
        </div>
      </section>

      {/* Supported Asset Types */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">{t('rwa_assets_title')}</h2>
          <p className="text-[#4a5568] mb-14 max-w-xl mx-auto">{t('rwa_assets_subtitle')}</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-10">
            {[
              { icon: 'ri-file-chart-line', key: 'rwa_asset_0' },
              { icon: 'ri-funds-line', key: 'rwa_asset_1' },
              { icon: 'ri-bill-line', key: 'rwa_asset_2' },
              { icon: 'ri-exchange-dollar-line', key: 'rwa_asset_3' },
              { icon: 'ri-leaf-line', key: 'rwa_asset_4' },
              { icon: 'ri-drop-line', key: 'rwa_asset_5' },
              { icon: 'ri-palette-line', key: 'rwa_asset_6' },
              { icon: 'ri-more-line', key: 'rwa_asset_7' },
            ].map((item) => (
              <div key={item.key} className="flex flex-col items-center justify-center p-4 rounded-2xl border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-md transition-all duration-300 cursor-default group">
                <div className="w-10 h-10 flex items-center justify-center mb-2">
                  <i className={`${item.icon} text-2xl text-[#1e6b8a] group-hover:text-[#f5b942] transition-colors`}></i>
                </div>
                <span className="text-xs font-semibold text-[#4a5568] group-hover:text-[#1e6b8a] transition-colors text-center leading-tight">{t(item.key)}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="inline-flex items-center gap-2 bg-[#1e6b8a] hover:bg-[#155a75] text-white px-7 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              {t('rwa_assets_cta_explore')}<i className="ri-arrow-right-line"></i>
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 border border-[#1e6b8a] text-[#1e6b8a] hover:bg-[#e8f4fb] px-7 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              {t('rwa_assets_cta_assess')}
            </a>
          </div>
        </div>
      </section>

      {/* Core Product Value */}
      <section className="py-20 px-6 bg-[#f7fbfe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">{t('rwa_value_title')}</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">{t('rwa_value_subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: 'ri-shield-check-line', color: 'bg-[#dbeafe]', iconColor: 'text-[#1e6b8a]', titleKey: 'rwa_value_0_title', descKey: 'rwa_value_0_desc', pts: ['rwa_value_0_pt0', 'rwa_value_0_pt1', 'rwa_value_0_pt2'] },
              { icon: 'ri-links-line', color: 'bg-[#fef3c7]', iconColor: 'text-[#d97706]', titleKey: 'rwa_value_1_title', descKey: 'rwa_value_1_desc', pts: ['rwa_value_1_pt0', 'rwa_value_1_pt1', 'rwa_value_1_pt2'] },
              { icon: 'ri-file-list-3-line', color: 'bg-[#d1fae5]', iconColor: 'text-[#059669]', titleKey: 'rwa_value_2_title', descKey: 'rwa_value_2_desc', pts: ['rwa_value_2_pt0', 'rwa_value_2_pt1', 'rwa_value_2_pt2'] },
              { icon: 'ri-building-4-line', color: 'bg-[#ede9fe]', iconColor: 'text-[#7c3aed]', titleKey: 'rwa_value_3_title', descKey: 'rwa_value_3_desc', pts: ['rwa_value_3_pt0', 'rwa_value_3_pt1', 'rwa_value_3_pt2'] },
            ].map((item) => (
              <div key={item.titleKey} className="bg-white rounded-2xl p-8 border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-5`}>
                  <i className={`${item.icon} text-2xl ${item.iconColor}`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#1e3a4a] mb-2">{t(item.titleKey)}</h3>
                <p className="text-[#4a5568] text-sm mb-4">{t(item.descKey)}</p>
                <ul className="space-y-2">
                  {item.pts.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-[#4a5568]">
                      <i className="ri-checkbox-circle-fill text-[#1e6b8a]"></i>{t(p)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Token Architecture */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">{t('rwa_dual_title')}</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">{t('rwa_dual_subtitle')}</p>
          </div>

          <div className="bg-[#f7fbfe] rounded-3xl p-8 border border-[#e8f4fb]">
            <div className="bg-gradient-to-r from-[#1e6b8a] to-[#155a75] rounded-2xl p-5 text-center mb-4 shadow-md">
              <p className="text-white/70 text-xs font-medium mb-1 tracking-widest uppercase">{t('rwa_dual_engine_label')}</p>
              <p className="text-white text-xl font-bold">{t('rwa_dual_engine_title')}</p>
              <div className="flex justify-center gap-4 mt-3">
                {['rwa_dual_step0', 'rwa_dual_step1', 'rwa_dual_step2', 'rwa_dual_step3'].map((key) => (
                  <span key={key} className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">{t(key)}</span>
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
                    <p className="text-[#1e6b8a] font-bold text-sm">{t('rwa_dual_issuance_title')}</p>
                    <p className="text-[#4a5568] text-xs">{t('rwa_dual_issuance_sub')}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {['rwa_dual_issuance_pt0', 'rwa_dual_issuance_pt1', 'rwa_dual_issuance_pt2'].map((k) => (
                    <div key={k} className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">{t(k)}</div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[#b8d9ed] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#fef3c7] rounded-lg flex items-center justify-center">
                    <i className="ri-user-star-line text-[#d97706] text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[#1e6b8a] font-bold text-sm">{t('rwa_dual_ownership_title')}</p>
                    <p className="text-[#4a5568] text-xs">{t('rwa_dual_ownership_sub')}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {['rwa_dual_ownership_pt0', 'rwa_dual_ownership_pt1', 'rwa_dual_ownership_pt2'].map((k) => (
                    <div key={k} className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">{t(k)}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-0.5 h-8 bg-[#b8d9ed]"></div>
            </div>
            <div className="bg-[#1e3a4a] rounded-2xl p-5 text-center shadow-md">
              <p className="text-white/60 text-xs font-medium mb-1 tracking-widest uppercase">{t('rwa_dual_custody_label')}</p>
              <p className="text-white text-lg font-bold">{t('rwa_dual_custody_title')}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { icon: 'ri-tools-line', titleKey: 'rwa_dual_benefit0_title', descKey: 'rwa_dual_benefit0_desc' },
              { icon: 'ri-git-branch-line', titleKey: 'rwa_dual_benefit1_title', descKey: 'rwa_dual_benefit1_desc' },
              { icon: 'ri-verified-badge-line', titleKey: 'rwa_dual_benefit2_title', descKey: 'rwa_dual_benefit2_desc' },
            ].map((item) => (
              <div key={item.titleKey} className="flex items-start gap-4 p-6 rounded-2xl border border-[#e8f4fb] hover:border-[#1e6b8a] transition-all duration-300">
                <div className="w-12 h-12 bg-[#e8f4fb] rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`${item.icon} text-xl text-[#1e6b8a]`}></i>
                </div>
                <div>
                  <h4 className="font-bold text-[#1e3a4a] mb-1">{t(item.titleKey)}</h4>
                  <p className="text-sm text-[#4a5568]">{t(item.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standardized Issuance Process */}
      <section className="py-20 px-6 bg-[#f7fbfe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">{t('rwa_process_title')}</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">{t('rwa_process_subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', icon: 'ri-upload-cloud-line', titleKey: 'rwa_process_0_title', descKey: 'rwa_process_0_desc' },
              { step: '2', icon: 'ri-search-eye-line', titleKey: 'rwa_process_1_title', descKey: 'rwa_process_1_desc' },
              { step: '3', icon: 'ri-check-double-line', titleKey: 'rwa_process_2_title', descKey: 'rwa_process_2_desc' },
              { step: '4', icon: 'ri-links-line', titleKey: 'rwa_process_3_title', descKey: 'rwa_process_3_desc' },
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
                <h3 className="text-base font-bold text-[#1e3a4a] mb-2">{t(item.titleKey)}</h3>
                <p className="text-sm text-[#4a5568] leading-relaxed">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 bg-gradient-to-r from-[#e8f4fb] to-[#dbeafe] rounded-2xl border border-[#b8d9ed] text-center">
            <p className="text-[#1e6b8a] font-medium">{t('rwa_process_note')}</p>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">{t('rwa_capabilities_title')}</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">{t('rwa_capabilities_subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'ri-upload-cloud-line', titleKey: 'rwa_cap_0_title', descKey: 'rwa_cap_0_desc' },
              { icon: 'ri-settings-3-line', titleKey: 'rwa_cap_1_title', descKey: 'rwa_cap_1_desc' },
              { icon: 'ri-file-text-line', titleKey: 'rwa_cap_2_title', descKey: 'rwa_cap_2_desc' },
              { icon: 'ri-time-line', titleKey: 'rwa_cap_3_title', descKey: 'rwa_cap_3_desc' },
              { icon: 'ri-shield-check-line', titleKey: 'rwa_cap_4_title', descKey: 'rwa_cap_4_desc' },
              { icon: 'ri-line-chart-line', titleKey: 'rwa_cap_5_title', descKey: 'rwa_cap_5_desc' },
            ].map((cap) => (
              <div key={cap.titleKey} className="p-7 rounded-2xl border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#e8f4fb] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1e6b8a] transition-colors duration-300">
                  <i className={`${cap.icon} text-2xl text-[#1e6b8a] group-hover:text-white transition-colors duration-300`}></i>
                </div>
                <h3 className="text-lg font-bold text-[#1e3a4a] mb-2">{t(cap.titleKey)}</h3>
                <p className="text-sm text-[#4a5568] leading-relaxed">{t(cap.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Value Stats */}
      <section className="py-20 px-6 bg-[#f7fbfe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">{t('rwa_stats_title')}</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">{t('rwa_stats_subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { valueKey: 'rwa_stat_0_value', labelKey: 'rwa_stat_0_label', subKey: 'rwa_stat_0_sub' },
              { valueKey: 'rwa_stat_1_value', labelKey: 'rwa_stat_1_label', subKey: 'rwa_stat_1_sub' },
              { valueKey: 'rwa_stat_2_value', labelKey: 'rwa_stat_2_label', subKey: 'rwa_stat_2_sub' },
              { valueKey: 'rwa_stat_3_value', labelKey: 'rwa_stat_3_label', subKey: 'rwa_stat_3_sub' },
            ].map((stat) => (
              <div key={stat.labelKey} className="bg-white rounded-2xl p-8 border border-[#e8f4fb] text-center hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-[#1e6b8a] mb-2">{t(stat.valueKey)}</div>
                <div className="text-base font-semibold text-[#1e3a4a] mb-1">{t(stat.labelKey)}</div>
                <div className="text-sm text-[#4a5568]">{t(stat.subKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Alignment */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">{t('rwa_compliance_title')}</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">{t('rwa_compliance_subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: 'ri-team-line', titleKey: 'rwa_compliance_0_title', descKey: 'rwa_compliance_0_desc' },
              { icon: 'ri-server-line', titleKey: 'rwa_compliance_1_title', descKey: 'rwa_compliance_1_desc' },
              { icon: 'ri-file-list-3-line', titleKey: 'rwa_compliance_2_title', descKey: 'rwa_compliance_2_desc' },
              { icon: 'ri-shield-check-line', titleKey: 'rwa_compliance_3_title', descKey: 'rwa_compliance_3_desc' },
            ].map((item) => (
              <div key={item.titleKey} className="flex items-start gap-4 p-6 rounded-2xl border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-[#e8f4fb] rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`${item.icon} text-xl text-[#1e6b8a]`}></i>
                </div>
                <div>
                  <h4 className="font-bold text-[#1e3a4a] mb-1">{t(item.titleKey)}</h4>
                  <p className="text-sm text-[#4a5568]">{t(item.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
            {t('rwa_hero_title')}<br />{t('rwa_hero_subtitle')}
          </h2>
          <p className="text-xl text-white/75 mb-10 max-w-2xl mx-auto">
            {t('rwa_hero_cta_demo')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-[#f5b942] hover:bg-[#e0a830] text-[#1e3a4a] px-10 py-4 rounded-full font-bold transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg">
              {t('nav_contact_us')}
            </a>
            <a href="/contact" className="bg-white/10 border border-white/40 hover:bg-white/20 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              {t('rwa_hero_cta_assess')}
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
              <p className="text-white/80 text-sm leading-relaxed">{t('footer_tagline')}</p>
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
