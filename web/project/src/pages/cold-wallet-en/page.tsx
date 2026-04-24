import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { WireframeSphere } from '../../components/feature/WireframeSphere';

export default function ColdWalletEN() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const isZh = i18n.language === 'zh';

  useEffect(() => { document.title = 'Cold Wallet | DACC - Digital Asset Clearing Center'; }, []);

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
              {t('nav_services')}
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
                {t('nav_solutions')}
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {solutionsDropdownOpen && (
                <div className="absolute left-0 pt-2 w-56 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/hot-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">
                      {t('nav_sol_hot_wallet')}
                    </a>
                    <a href="/cold-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">
                      {t('nav_sol_cold_wallet')}
                    </a>
                    <a href="/rwa-platform" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">
                      {t('nav_sol_rwa')}
                    </a>
                    <a href="/chain-fusion" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">
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
                className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-medium"
              >
                {t('nav_use_cases')}
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${useCasesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {useCasesDropdownOpen && (
                <div className="absolute left-0 pt-2 w-64 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/use-case" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">
                      {t('nav_uc_global')}
                    </a>
                    <a href="/use-case-ttl" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">
                      {t('nav_uc_ttl')}
                    </a>
                    <a href="/use-case-conflux" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">
                      {t('nav_uc_conflux')}
                    </a>
                    <a href="/use-case-vatp" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">
                      {t('nav_uc_vatp')}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="/#ecosystem" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              {t('nav_investors')}
            </a>
            <a href="/blog" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              {t('nav_news')}
            </a>
            <a href="/contact" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm flex items-center whitespace-nowrap font-montserrat font-medium">
              {t('nav_contact_us')}
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
            <button onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')} className="inline-flex items-center gap-1 rounded-full border border-[#b8d9ed] bg-transparent px-2 py-1.5 text-xs font-semibold text-[#1e6b8a]">
              <WireframeSphere size={12} />
              <span>{isZh ? '中文' : 'EN'}</span>
            </button>
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
                  <span>{t('nav_services')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('solutions')}
                  className="w-full flex items-center justify-between py-4 text-xl text-white/80 hover:text-white transition-colors border-b border-white/20"
                >
                  <span>{t('nav_solutions')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('useCases')}
                  className="w-full flex items-center justify-between py-4 text-xl text-white/80 hover:text-white transition-colors border-b border-white/20"
                >
                  <span>{t('nav_use_cases')}</span>
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
                  <span>{t('nav_investors')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-white/80 hover:text-white transition-colors border-b border-white/20"
                >
                  <span>{t('nav_news')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-white/80 hover:text-white transition-colors border-b border-white/20"
                >
                  <span>{t('nav_contact_us')}</span>
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
                <span className="text-lg font-semibold text-white">{t('nav_solutions')}</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-2">
                  <a href="/hot-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">{t('nav_sol_hot_wallet')}</a>
                  <a href="/cold-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">{t('nav_sol_cold_wallet')}</a>
                  <a href="/rwa-platform" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">{t('nav_sol_rwa')}</a>
                  <a href="/chain-fusion" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">{t('nav_sol_chainfusion')}</a>
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
                <span className="text-lg font-semibold text-white">{t('nav_use_cases')}</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <p className="text-white/60 text-sm mb-6">{t('mobile_explore')}</p>
                <div className="space-y-2">
                  <a href="/use-case" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">{t('nav_uc_global')}</a>
                  <a href="/use-case-ttl" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">{t('nav_uc_ttl')}</a>
                  <a href="/use-case-conflux" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">{t('nav_uc_conflux')}</a>
                  <a href="/use-case-vatp" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">{t('nav_uc_vatp')}</a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Language Switcher - Desktop Only */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <button onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')} className="inline-flex items-center gap-1.5 rounded-full border border-[#b8d9ed] bg-white/90 backdrop-blur-md px-2.5 py-1.5 text-[#1e6b8a] hover:border-[#1e6b8a] hover:text-[#12b7d6] transition-colors text-xs font-semibold shadow-lg">
          <WireframeSphere size={14} />
          <span>{isZh ? '中文' : 'EN'}</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-[#f5b942] border border-[#c97a2f] rounded-full px-4 py-2 mb-6">
              <i className="ri-shield-check-line text-[#1e6b8a]"></i>
              <span className="text-[#1e6b8a] text-sm font-medium">{t('cold_wallet_hero_badge')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl md:text-6xl font-bold mb-6 text-[#1e6b8a]">
              {t('cold_wallet_hero_title')}
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              {t('cold_wallet_hero_subtitle')}
            </p>

            <p className="text-base md:text-lg text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              {t('cold_wallet_hero_desc')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-[#1e6b8a] hover:bg-[#f5b942] hover:text-[#1e6b8a] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap transform hover:-translate-y-1"
              >
                <span>{t('cold_wallet_hero_cta_demo')}</span>
                <i className="ri-arrow-right-line"></i>
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center space-x-2 bg-transparent border-2 border-[#1e6b8a] hover:bg-[#1e6b8a] text-[#1e6b8a] hover:text-white px-8 py-4 rounded-full font-medium transition-all duration-300 whitespace-nowrap transform hover:-translate-y-1"
              >
                <span>{t('cold_wallet_hero_cta_learn')}</span>
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
            <h2 className="text-4xl font-bold mb-4 text-[#1e6b8a]">{t('cold_wallet_features_title')}</h2>
            <p className="text-[#4a5568] text-lg">{t('cold_wallet_features_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'ri-key-2-line', titleKey: 'cold_wallet_feature_0_title', pts: ['cold_wallet_feature_0_pt0', 'cold_wallet_feature_0_pt1', 'cold_wallet_feature_0_pt2'] },
              { icon: 'ri-shield-check-line', titleKey: 'cold_wallet_feature_1_title', pts: ['cold_wallet_feature_1_pt0', 'cold_wallet_feature_1_pt1', 'cold_wallet_feature_1_pt2'] },
              { icon: 'ri-file-shield-line', titleKey: 'cold_wallet_feature_2_title', pts: ['cold_wallet_feature_2_pt0', 'cold_wallet_feature_2_pt1', 'cold_wallet_feature_2_pt2'] },
            ].map((feat) => (
              <div key={feat.titleKey} className="bg-white/70 border border-[#b8d9ed] rounded-xl p-8 hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-6">
                  <i className={`${feat.icon} text-2xl text-[#1e6b8a]`}></i>
                </div>
                <h3 className="text-xl font-bold mb-4 text-[#1e6b8a]">{t(feat.titleKey)}</h3>
                <ul className="space-y-3 text-[#4a5568]">
                  {feat.pts.map((pt) => (
                    <li key={pt} className="flex items-start space-x-2">
                      <i className="ri-check-line text-[#1e6b8a] mt-1"></i>
                      <span>{t(pt)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Value */}
      <section id="features" className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#1e6b8a]">{t('cold_wallet_why_title')}</h2>
            <p className="text-[#4a5568] text-lg">{t('cold_wallet_why_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'ri-lock-line', titleKey: 'cold_wallet_why_0_title', subKey: 'cold_wallet_why_0_sub', pts: ['cold_wallet_why_0_pt0', 'cold_wallet_why_0_pt1', 'cold_wallet_why_0_pt2'] },
              { icon: 'ri-file-list-3-line', titleKey: 'cold_wallet_why_1_title', subKey: 'cold_wallet_why_1_sub', pts: ['cold_wallet_why_1_pt0', 'cold_wallet_why_1_pt1', 'cold_wallet_why_1_pt2'] },
              { icon: 'ri-dashboard-line', titleKey: 'cold_wallet_why_2_title', subKey: 'cold_wallet_why_2_sub', pts: ['cold_wallet_why_2_pt0', 'cold_wallet_why_2_pt1', 'cold_wallet_why_2_pt2'] },
            ].map((why) => (
              <div key={why.titleKey} className="bg-white/70 border border-[#b8d9ed] rounded-xl p-8 hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-6">
                  <i className={`${why.icon} text-2xl text-[#1e6b8a]`}></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#1e6b8a]">{t(why.titleKey)}</h3>
                <p className="text-[#4a5568] mb-4">{t(why.subKey)}</p>
                <ul className="space-y-3 text-[#4a5568]">
                  {why.pts.map((pt) => (
                    <li key={pt} className="flex items-start space-x-2">
                      <i className="ri-arrow-right-s-line text-[#1e6b8a] mt-1"></i>
                      <span>{t(pt)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#1e6b8a]">{t('cold_wallet_how_title')}</h2>
            <p className="text-[#4a5568] text-lg">{t('cold_wallet_how_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { icon: 'ri-user-add-line', titleKey: 'cold_wallet_how_0_title', descKey: 'cold_wallet_how_0_desc' },
              { icon: 'ri-checkbox-multiple-line', titleKey: 'cold_wallet_how_1_title', descKey: 'cold_wallet_how_1_desc' },
              { icon: 'ri-admin-line', titleKey: 'cold_wallet_how_2_title', descKey: 'cold_wallet_how_2_desc' },
              { icon: 'ri-qr-code-line', titleKey: 'cold_wallet_how_3_title', descKey: 'cold_wallet_how_3_desc' },
              { icon: 'ri-broadcast-line', titleKey: 'cold_wallet_how_4_title', descKey: 'cold_wallet_how_4_desc' },
            ].map((step, index) => (
              <div key={index} className="bg-white/70 border border-[#b8d9ed] rounded-xl p-6 hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1e6b8a] to-[#2d8ba8] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <i className={`${step.icon} text-2xl text-white`}></i>
                </div>
                <div className="text-center">
                  <div className="text-[#1e6b8a] font-bold mb-2">{t('cold_wallet_how_step')} {index + 1}</div>
                  <h3 className="font-bold mb-2 text-[#1e6b8a]">{t(step.titleKey)}</h3>
                  <p className="text-sm text-[#4a5568]">{t(step.descKey)}</p>
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
            <h2 className="text-4xl font-bold mb-4 text-[#1e6b8a]">{t('cold_wallet_gov_title')}</h2>
            <p className="text-[#4a5568] text-lg">{t('cold_wallet_gov_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/70 border border-[#b8d9ed] rounded-xl p-8 hover:border-[#1e6b8a] transition-all duration-300">
              <h3 className="text-xl font-bold mb-6 flex items-center space-x-2 text-[#1e6b8a]">
                <i className="ri-user-settings-line text-[#1e6b8a]"></i>
                <span>{t('cold_wallet_gov_frontend_title')}</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-line text-[#1e6b8a] mt-1"></i>
                  <div>
                    <div className="font-medium text-[#1e6b8a]">{t('cold_wallet_gov_frontend_role0_label')}</div>
                    <div className="text-sm text-[#4a5568]">{t('cold_wallet_gov_frontend_role0_desc')}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-line text-[#1e6b8a] mt-1"></i>
                  <div>
                    <div className="font-medium text-[#1e6b8a]">{t('cold_wallet_gov_frontend_role1_label')}</div>
                    <div className="text-sm text-[#4a5568]">{t('cold_wallet_gov_frontend_role1_desc')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 border border-[#b8d9ed] rounded-xl p-8 hover:border-[#1e6b8a] transition-all duration-300">
              <h3 className="text-xl font-bold mb-6 flex items-center space-x-2 text-[#1e6b8a]">
                <i className="ri-shield-user-line text-[#1e6b8a]"></i>
                <span>{t('cold_wallet_gov_backend_title')}</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-line text-[#1e6b8a] mt-1"></i>
                  <div>
                    <div className="font-medium text-[#1e6b8a]">{t('cold_wallet_gov_backend_role0_label')}</div>
                    <div className="text-sm text-[#4a5568]">{t('cold_wallet_gov_backend_role0_desc')}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-line text-[#1e6b8a] mt-1"></i>
                  <div>
                    <div className="font-medium text-[#1e6b8a]">{t('cold_wallet_gov_backend_role1_label')}</div>
                    <div className="text-sm text-[#4a5568]">{t('cold_wallet_gov_backend_role1_desc')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-[#dbeafe] border border-[#b8d9ed] rounded-xl p-6">
            <p className="text-[#4a5568] text-center">
              <i className="ri-information-line text-[#1e6b8a] mr-2"></i>
              {t('cold_wallet_gov_note')}
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#1e6b8a]">{t('cold_wallet_usecases_title')}</h2>
            <p className="text-[#4a5568] text-lg">{t('cold_wallet_usecases_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: 'ri-bank-line', titleKey: 'cold_wallet_usecase_0_title', descKey: 'cold_wallet_usecase_0_desc' },
              { icon: 'ri-safe-line', titleKey: 'cold_wallet_usecase_1_title', descKey: 'cold_wallet_usecase_1_desc' },
              { icon: 'ri-file-shield-2-line', titleKey: 'cold_wallet_usecase_2_title', descKey: 'cold_wallet_usecase_2_desc' },
              { icon: 'ri-global-line', titleKey: 'cold_wallet_usecase_3_title', descKey: 'cold_wallet_usecase_3_desc' },
            ].map((useCase) => (
              <div key={useCase.titleKey} className="bg-white/70 border border-[#b8d9ed] rounded-xl p-8 hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-6">
                  <i className={`${useCase.icon} text-2xl text-[#1e6b8a]`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1e6b8a]">{t(useCase.titleKey)}</h3>
                <p className="text-[#4a5568]">{t(useCase.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#1e6b8a]">{t('cold_wallet_cert_title')}</h2>
            <p className="text-[#4a5568] text-lg">{t('cold_wallet_cert_subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: 'ri-shield-check-line', titleKey: 'cold_wallet_cert_0_title', descKey: 'cold_wallet_cert_0_desc' },
              { icon: 'ri-bug-line', titleKey: 'cold_wallet_cert_1_title', descKey: 'cold_wallet_cert_1_desc' },
              { icon: 'ri-shield-star-line', titleKey: 'cold_wallet_cert_2_title', descKey: 'cold_wallet_cert_2_desc' },
              { icon: 'ri-government-line', titleKey: 'cold_wallet_cert_3_title', descKey: 'cold_wallet_cert_3_desc' },
            ].map((cert) => (
              <div key={cert.titleKey} className="bg-white/70 border border-[#b8d9ed] rounded-xl p-6 text-center hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1e6b8a] to-[#2d8ba8] rounded-full flex items-center justify-center mb-4 mx-auto">
                  <i className={`${cert.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="font-bold mb-2 text-[#1e6b8a]">{t(cert.titleKey)}</h3>
                <p className="text-sm text-[#4a5568]">{t(cert.descKey)}</p>
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
            {t('cold_wallet_cta_title')}
          </h2>
          <p className="text-xl text-blue-50 mb-8">
            {t('cold_wallet_cta_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 bg-white text-[#1e6b8a] hover:bg-[#f5b942] hover:text-[#1e6b8a] px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg whitespace-nowrap transform hover:-translate-y-1"
            >
              <span>{t('cold_wallet_cta_contact')}</span>
              <i className="ri-arrow-right-line"></i>
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center space-x-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1e6b8a] px-8 py-4 rounded-full font-medium transition-all duration-300 whitespace-nowrap transform hover:-translate-y-1"
            >
              <span>{t('cold_wallet_cta_learn')}</span>
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
                {t('cold_wallet_footer_tagline')}
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-white">{t('nav_solutions')}</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="/hot-wallet" className="hover:text-[#f5b942] transition-colors">{t('nav_sol_hot_wallet')}</a></li>
                <li><a href="/cold-wallet" className="hover:text-[#f5b942] transition-colors">{t('nav_sol_cold_wallet')}</a></li>
                <li><a href="/use-case" className="hover:text-[#f5b942] transition-colors">{t('nav_uc_global')}</a></li>
                <li><a href="/use-case-ttl" className="hover:text-[#f5b942] transition-colors">{t('nav_uc_ttl')}</a></li>
                <li><a href="/use-case-conflux" className="hover:text-[#f5b942] transition-colors">{t('nav_uc_conflux')}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-white">{t('footer_company')}</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="/use-case-vatp" className="hover:text-[#f5b942] transition-colors">{t('nav_uc_vatp')}</a></li>
                <li><a href="/blog" className="hover:text-[#f5b942] transition-colors">{t('nav_blog')}</a></li>
                <li><a href="/contact" className="hover:text-[#f5b942] transition-colors">{t('footer_contact')}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-white">{t('footer_follow_us')}</h3>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-[#f5b942] rounded-lg flex items-center justify-center transition-colors">
                  <i className="ri-linkedin-line text-xl text-white"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              {t('footer_copyright')}
            </p>
            <div className="flex items-center space-x-4">
              <a onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')} className="text-white/60 hover:text-[#f5b942] text-sm transition-colors">
                {isZh ? 'EN' : '中文'}
              </a>
              <a href="/blog" className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform">{t('nav_news')}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
