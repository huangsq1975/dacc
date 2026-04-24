import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { WireframeSphere } from '../../components/feature/WireframeSphere';

export default function HotWalletEN() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const isZh = i18n.language === 'zh';

  useEffect(() => { document.title = 'Hot Wallet | DACC - Digital Asset Clearing Center'; }, []);

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
              {t('nav_services')}
            </button>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat">
                {t('nav_solutions')}
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {solutionsDropdownOpen && (
                <div className="absolute left-0 pt-2 w-56 z-50">
                  <div className="bg-[#f5b942]/10 backdrop-blur-md border border-[#c97a2f] rounded-xl py-2 shadow-xl">
                    <a href="/hot-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb]/50 transition-colors">
                      {t('nav_sol_hot_wallet')}
                    </a>
                    <a href="/cold-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb]/50 transition-colors">
                      {t('nav_sol_cold_wallet')}
                    </a>
                    <a href="/rwa-platform" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb]/50 transition-colors">
                      {t('nav_sol_rwa')}
                    </a>
                    <a href="/chain-fusion" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb]/50 transition-colors">
                      {t('nav_sol_chainfusion')}
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
                {t('nav_use_cases')}
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${useCasesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {useCasesDropdownOpen && (
                <div className="absolute left-0 pt-2 w-64 z-50">
                  <div className="bg-[#f5b942]/10 backdrop-blur-md border border-[#c97a2f] rounded-xl py-2 shadow-xl">
                    <a href="/use-case" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb]/50 transition-colors">
                      {t('nav_uc_global')}
                    </a>
                    <a href="/use-case-ttl" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb]/50 transition-colors">
                      {t('nav_uc_ttl')}
                    </a>
                    <a href="/use-case-conflux" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb]/50 transition-colors">
                      {t('nav_uc_conflux')}
                    </a>
                    <a href="/use-case-vatp" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb]/50 transition-colors">
                      {t('nav_uc_vatp')}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigateWithHash('/en', 'ecosystem')}
              className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat"
            >
              {t('nav_investors')}
            </button>
            <a href="/blog" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat">
              {t('nav_news')}
            </a>
            <a href="/contact" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm flex items-center whitespace-nowrap font-montserrat">
              {t('nav_contact_us')}
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
            <button onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')} className="inline-flex items-center gap-1 rounded-full border border-[#b8d9ed] bg-transparent px-2 py-1.5 text-xs font-semibold text-[#1e6b8a]">
              <WireframeSphere size={12} />
              <span>{isZh ? '中文' : 'EN'}</span>
            </button>
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
                  <span>{t('nav_services')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('solutions')}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]"
                >
                  <span>{t('nav_solutions')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('useCases')}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]"
                >
                  <span>{t('nav_use_cases')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavigateWithHash('/en', 'ecosystem');
                  }}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]"
                >
                  <span>{t('nav_investors')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]"
                >
                  <span>{t('nav_news')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]"
                >
                  <span>{t('nav_contact_us')}</span>
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
                <span className="text-lg font-semibold text-[#1e6b8a]">{t('nav_solutions')}</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-2">
                  <a href="/hot-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]">{t('nav_sol_hot_wallet')}</a>
                  <a href="/cold-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]">{t('nav_sol_cold_wallet')}</a>
                  <a href="/rwa-platform" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]">{t('nav_sol_rwa')}</a>
                  <a href="/chain-fusion" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]">{t('nav_sol_chainfusion')}</a>
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
                <span className="text-lg font-semibold text-[#1e6b8a]">{t('nav_use_cases')}</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <p className="text-[#4a5568] text-sm mb-6">{t('mobile_explore')}</p>
                <div className="space-y-2">
                  <a href="/use-case" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]">{t('nav_uc_global')}</a>
                  <a href="/use-case-ttl" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]">{t('nav_uc_ttl')}</a>
                  <a href="/use-case-conflux" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]">{t('nav_uc_conflux')}</a>
                  <a href="/use-case-vatp" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#b8d9ed]">{t('nav_uc_vatp')}</a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Language Switcher - Desktop */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <button onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')} className="inline-flex items-center gap-1.5 rounded-full border border-[#b8d9ed] bg-white/80 backdrop-blur-md px-2.5 py-1.5 text-[#1e6b8a] hover:border-[#1e6b8a] hover:text-[#12b7d6] transition-colors text-xs font-semibold shadow-lg">
          <WireframeSphere size={14} />
          <span>{isZh ? '中文' : 'EN'}</span>
        </button>
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
              {t('hot_wallet_hero_badge')}
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#1e6b8a] mb-6 leading-tight">
            {t('hot_wallet_hero_title')}
          </h1>
          <p className="text-xl text-[#4a5568] max-w-3xl mx-auto leading-relaxed mb-8">
            {t('hot_wallet_hero_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>{t('hot_wallet_hero_cta_sandbox')}</span>
              <i className="ri-code-box-line"></i>
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-full font-semibold hover:bg-blue-400/10 transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 transform hover:-translate-y-1"
            >
              <span>{t('hot_wallet_hero_cta_api')}</span>
              <i className="ri-file-code-line"></i>
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-full font-semibold hover:bg-blue-400/10 transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 transform hover:-translate-y-1"
            >
              <span>{t('hot_wallet_hero_cta_integration')}</span>
              <i className="ri-calendar-line"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Product Value */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">{t('hot_wallet_value_title')}</h2>
            <p className="text-xl text-[#4a5568]">{t('hot_wallet_value_subtitle')}</p>
          </div>

          <div className="space-y-8">
            {[
              { icon: 'ri-flashlight-line', titleKey: 'hot_wallet_value_0_title', pts: ['hot_wallet_value_0_pt0', 'hot_wallet_value_0_pt1', 'hot_wallet_value_0_pt2'] },
              { icon: 'ri-speed-line', titleKey: 'hot_wallet_value_1_title', pts: ['hot_wallet_value_1_pt0', 'hot_wallet_value_1_pt1', 'hot_wallet_value_1_pt2'] },
              { icon: 'ri-shield-check-line', titleKey: 'hot_wallet_value_2_title', pts: ['hot_wallet_value_2_pt0', 'hot_wallet_value_2_pt1', 'hot_wallet_value_2_pt2'] },
            ].map((val) => (
              <div key={val.titleKey} className="bg-white/70 rounded-3xl p-10 border border-[#b8d9ed] hover:border-blue-400/50 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <i className={`${val.icon} text-white text-3xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">{t(val.titleKey)}</h3>
                    <div className="space-y-3">
                      {val.pts.map((pt) => (
                        <div key={pt} className="flex items-start space-x-3">
                          <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                          <p className="text-[#4a5568]">{t(pt)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">{t('hot_wallet_capabilities_title')}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'ri-code-s-slash-line', titleKey: 'hot_wallet_cap_0_title', descKey: 'hot_wallet_cap_0_desc' },
              { icon: 'ri-broadcast-line', titleKey: 'hot_wallet_cap_1_title', descKey: 'hot_wallet_cap_1_desc' },
              { icon: 'ri-map-pin-line', titleKey: 'hot_wallet_cap_2_title', descKey: 'hot_wallet_cap_2_desc' },
              { icon: 'ri-arrow-left-right-line', titleKey: 'hot_wallet_cap_3_title', descKey: 'hot_wallet_cap_3_desc' },
              { icon: 'ri-send-plane-line', titleKey: 'hot_wallet_cap_4_title', descKey: 'hot_wallet_cap_4_desc' },
              { icon: 'ri-shield-check-line', titleKey: 'hot_wallet_cap_5_title', descKey: 'hot_wallet_cap_5_desc' },
            ].map((cap) => (
              <div key={cap.titleKey} className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <i className={`${cap.icon} text-white text-xl`}></i>
                </div>
                <h4 className="font-bold text-[#1e6b8a] mb-2">{t(cap.titleKey)}</h4>
                <p className="text-sm text-[#4a5568]">{t(cap.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Address Model */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">{t('hot_wallet_address_title')}</h2>
            <p className="text-xl text-[#4a5568]">{t('hot_wallet_address_subtitle')}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { icon: 'ri-water-flash-line', titleKey: 'hot_wallet_address_pool_title', pts: ['hot_wallet_address_pool_pt0', 'hot_wallet_address_pool_pt1', 'hot_wallet_address_pool_pt2'] },
              { icon: 'ri-inbox-line', titleKey: 'hot_wallet_address_deposit_title', pts: ['hot_wallet_address_deposit_pt0', 'hot_wallet_address_deposit_pt1', 'hot_wallet_address_deposit_pt2'] },
              { icon: 'ri-send-plane-2-line', titleKey: 'hot_wallet_address_withdraw_title', pts: ['hot_wallet_address_withdraw_pt0', 'hot_wallet_address_withdraw_pt1', 'hot_wallet_address_withdraw_pt2'] },
            ].map((addr) => (
              <div key={addr.titleKey} className="bg-white/70 rounded-3xl p-8 border-2 border-[#b8d9ed] hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <i className={`${addr.icon} text-white text-3xl`}></i>
                </div>
                <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">{t(addr.titleKey)}</h3>
                <div className="space-y-3">
                  {addr.pts.map((pt) => (
                    <div key={pt} className="flex items-start space-x-3">
                      <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568] text-sm">{t(pt)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">{t('hot_wallet_workflow_title')}</h2>
            <p className="text-xl text-[#4a5568]">{t('hot_wallet_workflow_subtitle')}</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 hidden lg:block"></div>

            <div className="space-y-12">
              {[
                { icon: 'ri-map-pin-add-line', titleKey: 'hot_wallet_step_0_title', descKey: 'hot_wallet_step_0_desc', num: 1, rightText: true },
                { icon: 'ri-shield-check-line', titleKey: 'hot_wallet_step_1_title', descKey: 'hot_wallet_step_1_desc', num: 2, rightText: false },
                { icon: 'ri-arrow-left-right-line', titleKey: 'hot_wallet_step_2_title', descKey: 'hot_wallet_step_2_desc', num: 3, rightText: true },
                { icon: 'ri-file-list-3-line', titleKey: 'hot_wallet_step_3_title', descKey: 'hot_wallet_step_3_desc', num: 4, rightText: false },
                { icon: 'ri-send-plane-line', titleKey: 'hot_wallet_step_4_title', descKey: 'hot_wallet_step_4_desc', num: 5, rightText: true },
              ].map((step) => (
                <div key={step.titleKey} className="flex items-center gap-8 lg:gap-12">
                  {step.rightText ? (
                    <>
                      <div className="flex-1 text-right hidden lg:block">
                        <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">{t(step.titleKey)}</h3>
                        <p className="text-[#4a5568]">{t(step.descKey)}</p>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg relative z-10">
                        {step.num}
                      </div>
                      <div className="flex-1">
                        <div className="lg:hidden mb-4">
                          <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">{t(step.titleKey)}</h3>
                          <p className="text-[#4a5568]">{t(step.descKey)}</p>
                        </div>
                        <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] shadow-md">
                          <i className={`${step.icon} text-blue-400 text-3xl mb-2`}></i>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 text-right hidden lg:block">
                        <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] shadow-md inline-block">
                          <i className={`${step.icon} text-blue-400 text-3xl mb-2`}></i>
                        </div>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg relative z-10">
                        {step.num}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">{t(step.titleKey)}</h3>
                        <p className="text-[#4a5568]">{t(step.descKey)}</p>
                        <div className="lg:hidden mt-4">
                          <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] shadow-md">
                            <i className={`${step.icon} text-blue-400 text-3xl mb-2`}></i>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">{t('hot_wallet_usecases_title')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: 'ri-exchange-line', titleKey: 'hot_wallet_usecase_0_title', descKey: 'hot_wallet_usecase_0_desc' },
              { icon: 'ri-funds-line', titleKey: 'hot_wallet_usecase_1_title', descKey: 'hot_wallet_usecase_1_desc' },
              { icon: 'ri-coin-line', titleKey: 'hot_wallet_usecase_2_title', descKey: 'hot_wallet_usecase_2_desc' },
              { icon: 'ri-links-line', titleKey: 'hot_wallet_usecase_3_title', descKey: 'hot_wallet_usecase_3_desc' },
            ].map((uc) => (
              <div key={uc.titleKey} className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-blue-400/50 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-blue-400/20 rounded-xl flex items-center justify-center mb-6">
                  <i className={`${uc.icon} text-blue-400 text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">{t(uc.titleKey)}</h3>
                <p className="text-[#4a5568] leading-relaxed">{t(uc.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot & Cold Wallet Synergy */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">{t('hot_wallet_synergy_title')}</h2>
            <p className="text-xl text-[#4a5568]">{t('hot_wallet_synergy_subtitle')}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl p-10 border-2 border-orange-400/30 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center">
                  <i className="ri-fire-line text-white text-3xl"></i>
                </div>
                <h3 className="text-3xl font-bold text-[#1e6b8a]">{t('hot_wallet_synergy_hot_title')}</h3>
              </div>
              <div className="space-y-4">
                {['hot_wallet_synergy_hot_pt0', 'hot_wallet_synergy_hot_pt1', 'hot_wallet_synergy_hot_pt2'].map((pt) => (
                  <div key={pt} className="flex items-start space-x-3">
                    <i className="ri-checkbox-circle-fill text-orange-400 text-xl flex-shrink-0 mt-1"></i>
                    <p className="text-[#4a5568]">{t(pt)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl p-10 border-2 border-blue-400/30 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <i className="ri-snowflake-line text-white text-3xl"></i>
                </div>
                <h3 className="text-3xl font-bold text-[#1e6b8a]">{t('hot_wallet_synergy_cold_title')}</h3>
              </div>
              <div className="space-y-4">
                {['hot_wallet_synergy_cold_pt0', 'hot_wallet_synergy_cold_pt1', 'hot_wallet_synergy_cold_pt2'].map((pt) => (
                  <div key={pt} className="flex items-start space-x-3">
                    <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                    <p className="text-[#4a5568]">{t(pt)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-orange-600/20 rounded-2xl p-8 border border-blue-400/30">
            <div className="flex items-start space-x-4">
              <i className="ri-information-line text-blue-400 text-3xl flex-shrink-0"></i>
              <div>
                <h4 className="text-xl font-bold text-[#1e6b8a] mb-3">{t('hot_wallet_synergy_note_title')}</h4>
                <p className="text-[#4a5568] leading-relaxed">
                  {t('hot_wallet_synergy_note_desc')}
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
            {t('hot_wallet_cta_title')}
          </h2>
          <p className="text-xl text-blue-50 mb-10 leading-relaxed">
            {t('hot_wallet_cta_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <span>{t('hot_wallet_cta_contact')}</span>
              <i className="ri-arrow-right-line"></i>
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 transform hover:-translate-y-1"
            >
              <span>{t('hot_wallet_cta_sandbox')}</span>
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
                {t('footer_building')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer_quick_links')}</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigateWithHash('/en', 'Services')}
                  className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform text-left"
                >
                  {t('nav_services')}
                </button>
                <a href="/hot-wallet" className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform">
                  {t('nav_sol_hot_wallet')}
                </a>
                <a href="/cold-wallet" className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform">
                  {t('nav_sol_cold_wallet')}
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer_resources')}</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigateWithHash('/en', 'ecosystem')}
                  className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform text-left"
                >
                  {t('nav_investors')}
                </button>
                <a href="/blog" className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform">{t('nav_news')}</a>
                <a href="/contact" className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform">{t('nav_contact_us')}</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer_follow_us')}</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-sm mb-4">
              {t('footer_copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
