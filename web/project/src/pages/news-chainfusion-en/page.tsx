import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { WireframeSphere } from '../../components/feature/WireframeSphere';

export default function NewsChainFusionEN() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const isZh = i18n.language === 'zh';

  useEffect(() => { document.title = 'ChainFusion News | DACC - Digital Asset Clearing Center'; }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f4fb] via-[#b8d9ed] to-[#1e6b8a] text-[#1e3a4a]">
      {/* Floating Navigation - Desktop */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
        <nav className={`${scrolled ? 'bg-white/90' : 'bg-white/80'} backdrop-blur-md border border-[#b8d9ed] rounded-full px-6 py-3 transition-all duration-300 shadow-lg`}>
          <div className="flex items-center justify-center space-x-8">
            <a href="/" className="cursor-pointer flex-shrink-0">
              <img
                src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png"
                alt="DACC Logo"
                className="h-6 w-auto object-contain"
              />
            </a>
            <a href="/#Services" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-semibold">
              {t('nav_services')}
            </a>
            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-semibold">
                {t('nav_solutions')}
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {solutionsDropdownOpen && (
                <div className="absolute left-0 pt-2 w-56 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/hot-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">{t('nav_sol_hot_wallet')}</a>
                    <a href="/cold-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">{t('nav_sol_cold_wallet')}</a>
                    <a href="/rwa-platform" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">{t('nav_sol_rwa')}</a>
                    <a href="/chain-fusion" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">{t('nav_sol_chainfusion')}</a>
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
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-semibold">
                {t('nav_use_cases')}
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${useCasesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {useCasesDropdownOpen && (
                <div className="absolute left-0 pt-2 w-64 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/use-case" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">{t('nav_uc_global')}</a>
                    <a href="/use-case-ttl" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">{t('nav_uc_ttl')}</a>
                    <a href="/use-case-conflux" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">{t('nav_uc_conflux')}</a>
                    <a href="/use-case-vatp" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">{t('nav_uc_vatp')}</a>
                  </div>
                </div>
              )}
            </div>
            <a href="/#ecosystem" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-semibold">{t('nav_investors')}</a>
            <a href="/blog" className="text-[#f5b942] font-bold transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat">{t('nav_news')}</a>
            <a href="/contact" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm flex items-center whitespace-nowrap font-montserrat font-semibold">{t('nav_contact_us')}<i className="ri-arrow-right-up-line ml-1 text-xs"></i></a>
          </div>
        </nav>
      </div>

      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white/90 backdrop-blur-md border-b border-[#b8d9ed]">
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
              className="bg-[#dbeafe] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 text-sm"
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
                <a href="/#Services" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>{t('nav_services')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <button onClick={() => setMobileSubmenu('solutions')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>{t('nav_solutions')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button onClick={() => setMobileSubmenu('useCases')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>{t('nav_use_cases')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a href="/#ecosystem" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>{t('nav_investors')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-[#f5b942] font-bold transition-colors border-b border-white/20">
                  <span>{t('nav_news')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>{t('nav_contact_us')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
              </div>
            </div>
          )}
          {mobileSubmenu === 'solutions' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">{t('nav_solutions')}</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6 space-y-2">
                <a href="/hot-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">{t('nav_sol_hot_wallet')}</a>
                <a href="/cold-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">{t('nav_sol_cold_wallet')}</a>
                <a href="/rwa-platform" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">{t('nav_sol_rwa')}</a>
                <a href="/chain-fusion" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">{t('nav_sol_chainfusion')}</a>
              </div>
            </div>
          )}
          {mobileSubmenu === 'useCases' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">{t('nav_use_cases')}</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6 space-y-2">
                <a href="/use-case" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">{t('nav_uc_global')}</a>
                <a href="/use-case-ttl" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">{t('nav_uc_ttl')}</a>
                <a href="/use-case-conflux" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">{t('nav_uc_conflux')}</a>
                <a href="/use-case-vatp" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">{t('nav_uc_vatp')}</a>
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

      {/* Hero Banner */}
      <section className="relative pt-32 pb-0 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-[#1e6b8a]/60 mb-8">
            <a href="/blog" className="hover:text-[#f5b942] transition-colors cursor-pointer">{t('news_cf_breadcrumb_blog')}</a>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-[#1e6b8a]/80">{t('news_cf_breadcrumb_news')}</span>
          </div>

          {/* Category & Date */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-[#f5b942]/80 text-[#1e3a4a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              {t('news_cf_category')}
            </span>
            <span className="bg-white/80 text-[#1e6b8a] px-4 py-1.5 rounded-full text-xs font-semibold">
              {t('news_cf_date')}
            </span>
            <span className="text-[#1e6b8a]/60 text-xs flex items-center gap-1">
              <i className="ri-global-line"></i>
              {t('news_cf_source')}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-[#1e6b8a] leading-tight mb-6">
            {t('news_cf_title')}
          </h1>

          <p className="text-lg text-[#1e3a4a]/80 leading-relaxed mb-10">
            {t('news_cf_intro')}
          </p>
        </div>

        {/* Hero Image */}
        <div className="max-w-4xl mx-auto px-6 mb-0">
          <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://readdy.ai/api/search-image?query=futuristic%20cross-border%20payment%20network%20with%20glowing%20digital%20nodes%20and%20blockchain%20connections%20on%20dark%20background%2C%20abstract%20financial%20technology%20visualization%20with%20teal%20and%20blue%20gradient%20light%20streams%20representing%20global%20tokenized%20transactions&width=1200&height=600&seq=chainfusionnewsen01&orientation=landscape"
              alt="DACC ChainFusion Cross-Border Tokenised Payments"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  {t('news_cf_p1')}
                </p>
              </div>

              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  {t('news_cf_p2')}
                </p>
              </div>

              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  {t('news_cf_p3')}
                </p>
              </div>

              {/* Three-layer Architecture */}
              <div>
                <h2 className="text-2xl font-bold text-[#1e6b8a] mb-6">{t('news_cf_arch_title')}</h2>
                <p className="text-[#1e3a4a] leading-relaxed text-base mb-6">
                  {t('news_cf_arch_intro')}
                </p>
                <div className="space-y-4">
                  {[
                    { icon: 'ri-links-line', key: 'news_cf_arch_0' },
                    { icon: 'ri-git-merge-line', key: 'news_cf_arch_1' },
                    { icon: 'ri-bank-line', key: 'news_cf_arch_2' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-4 bg-white/80 rounded-xl p-5 border border-[#b8d9ed] shadow-sm">
                      <div className="w-10 h-10 bg-[#dbeafe] rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className={`${item.icon} text-[#1e6b8a] text-xl`}></i>
                      </div>
                      <h3 className="text-[#1e6b8a] font-semibold">{t(item.key)}</h3>
                    </div>
                  ))}
                </div>
                <p className="text-[#1e3a4a] leading-relaxed text-base mt-6">
                  {t('news_cf_arch_note')}
                </p>
              </div>

              {/* Quote Block */}
              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  {t('news_cf_quote_intro')}
                </p>
              </div>

              <blockquote className="border-l-4 border-[#f5b942] pl-6 py-2 bg-white/60 rounded-r-xl">
                <p className="text-[#1e3a4a] text-lg italic leading-relaxed">
                  {t('news_cf_quote')}
                </p>
                <footer className="mt-3 text-[#1e6b8a]/70 text-sm font-semibold">
                  {t('news_cf_quote_attribution')}
                </footer>
              </blockquote>

              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  {t('news_cf_quote_followup')}
                </p>
              </div>

              {/* Strategic Backing */}
              <div>
                <h2 className="text-2xl font-bold text-[#1e6b8a] mb-4">{t('news_cf_backing_title')}</h2>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  {t('news_cf_backing_p1')}
                </p>
                <p className="text-[#1e3a4a] leading-relaxed text-base mt-4">
                  {t('news_cf_backing_p2')}
                </p>
                <p className="text-[#1e3a4a] leading-relaxed text-base mt-4">
                  {t('news_cf_backing_p3')}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white/80 rounded-2xl p-6 border border-[#b8d9ed] shadow-lg sticky top-28">
                <h3 className="text-[#1e6b8a] font-bold text-lg mb-5 flex items-center gap-2">
                  <i className="ri-flashlight-line text-[#f5b942]"></i>
                  {t('news_cf_highlights_title')}
                </h3>
                <ul className="space-y-4">
                  {['news_cf_highlight_0', 'news_cf_highlight_1', 'news_cf_highlight_2', 'news_cf_highlight_3', 'news_cf_highlight_4', 'news_cf_highlight_5'].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-checkbox-circle-fill text-[#f5b942] text-base"></i>
                      </div>
                      <span className="text-[#1e3a4a] text-sm leading-relaxed">{t(key)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-[#b8d9ed]">
                  <p className="text-[#1e6b8a]/60 text-xs mb-1">{t('news_cf_source_label')}</p>
                  <a
                    href="https://www.asiabiztoday.com/2026/02/12/dacc-launches-chainfusion-to-accelerate-compliant-cross-border-tokenised-payments/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f5b942] hover:text-[#c97a2f] text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    AsiaBizToday
                    <i className="ri-external-link-line"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-16 pt-10 border-t border-[#b8d9ed] flex items-center justify-between">
            <a
              href="/blog"
              className="flex items-center gap-2 text-[#1e6b8a]/70 hover:text-[#f5b942] transition-colors cursor-pointer group"
            >
              <i className="ri-arrow-left-line group-hover:-translate-x-1 transition-transform duration-200"></i>
              <span className="text-sm font-medium">{t('news_cf_back_to_blog')}</span>
            </a>
            <div className="flex items-center gap-3">
              <span className="text-[#1e6b8a]/60 text-sm">{t('news_cf_share')}</span>
              <a
                href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#dbeafe] rounded-full flex items-center justify-center hover:bg-[#1e6b8a] hover:text-white transition-colors cursor-pointer"
              >
                <i className="ri-linkedin-fill text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e6b8a] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img
                src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png"
                alt="DACC Logo"
                className="h-20 w-auto object-contain mb-4"
              />
              <p className="text-white/80 text-sm leading-relaxed">
                {t('footer_tagline')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer_quick_links')}</h4>
              <div className="space-y-2">
                <a href="/#Services" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">{t('nav_services')}</a>
                <a href="/#use-cases" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">{t('nav_use_cases')}</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer_resources')}</h4>
              <div className="space-y-2">
                <a href="/#ecosystem" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">{t('nav_investors')}</a>
                <a href="/blog" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">{t('nav_news')}</a>
                <a href="/contact" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">{t('nav_contact_us')}</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer_follow_us')}</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#f5b942] transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/70 text-sm mb-4">{t('footer_copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
