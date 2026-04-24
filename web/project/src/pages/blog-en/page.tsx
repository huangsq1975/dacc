import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { WireframeSphere } from '../../components/feature/WireframeSphere';

export default function BlogEN() {
  const { t, i18n } = useTranslation();
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const navigate = useNavigate();
  const isZh = i18n.language === 'zh';

  useEffect(() => { document.title = 'Blog | DACC - Digital Asset Clearing Center'; }, []);

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
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const blogPosts = [
    {
      id: 0,
      category: t('blog_post_0_category'),
      subcategory: t('blog_post_0_subcategory'),
      title: t('blog_post_0_title'),
      date: t('blog_post_0_date'),
      image: 'https://readdy.ai/api/search-image?query=futuristic%20blockchain%20network%20bridge%20connecting%20multiple%20chains%20glowing%20neon%20lines%20cross-border%20payment%20infrastructure%20dark%20background%20vibrant%20teal%20and%20gold%20light%20streams%20digital%20finance%20technology&width=800&height=600&seq=daccblogchainfusionen&orientation=landscape',
      featured: true,
      link: '/news-chainfusion-en'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f4fb] via-[#b8d9ed] to-[#1e6b8a] text-[#1e3a4a]">
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
              onClick={() => handleNavigateWithHash('/home-en', '#Services')}
              className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium"
            >
              {t('nav_services')}
            </button>

            {/* Solutions Dropdown */}
            <div
              className="relative group"
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
                    <a href="/hot-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      {t('nav_sol_hot_wallet')}
                    </a>
                    <a href="/cold-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      {t('nav_sol_cold_wallet')}
                    </a>
                    <a href="/rwa-platform" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      {t('nav_sol_rwa')}
                    </a>
                    <a href="/chain-fusion" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
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
                    <a href="/use-case" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      {t('nav_uc_global')}
                    </a>
                    <a href="/use-case-ttl" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      {t('nav_uc_ttl')}
                    </a>
                    <a href="/use-case-conflux" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      {t('nav_uc_conflux')}
                    </a>
                    <a href="/use-case-vatp" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      {t('nav_uc_vatp')}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigateWithHash('/home-en', '#ecosystem')}
              className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium"
            >
              {t('nav_investors')}
            </button>
            <a href="/blog" className="text-[#f5b942] font-bold transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat">
              {t('nav_news')}
            </a>
            <a href="/contact" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm flex items-center whitespace-nowrap font-montserrat font-medium">
              {t('nav_contact_us')}
              <i className="ri-arrow-right-up-line ml-1 text-xs"></i>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Top Bar - Logo + Menu + Language */}
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
        <div className="fixed inset-0 bg-[#1e6b8a]/95 backdrop-blur-md z-40 lg:hidden pt-20">
          {/* Main Menu */}
          {!mobileSubmenu && (
            <div className="flex flex-col h-full px-6 py-8">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavigateWithHash('/home-en', '#Services');
                  }}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>{t('nav_services')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('solutions')}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>{t('nav_solutions')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('useCasesEN')}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>{t('nav_use_cases')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavigateWithHash('/home-en', '#ecosystem');
                  }}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>{t('nav_investors')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#f5b942] font-bold transition-colors border-b border-white/20"
                >
                  <span>{t('nav_news')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
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
                <button
                  onClick={() => setMobileSubmenu(null)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"
                >
                  <i className="ri-arrow-left-line text-2xl"></i>
                </button>
                <span className="text-lg font-semibold text-white">{t('nav_solutions')}</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-2">
                  <a
                    href="/hot-wallet"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    {t('nav_sol_hot_wallet')}
                  </a>
                  <a
                    href="/cold-wallet"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    {t('nav_sol_cold_wallet')}
                  </a>
                  <a
                    href="/rwa-platform"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    {t('nav_sol_rwa')}
                  </a>
                  <a
                    href="/chain-fusion"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    {t('nav_sol_chainfusion')}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Use Cases Submenu */}
          {mobileSubmenu === 'useCasesEN' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button
                  onClick={() => setMobileSubmenu(null)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"
                >
                  <i className="ri-arrow-left-line text-2xl"></i>
                </button>
                <span className="text-lg font-semibold text-white">{t('nav_use_cases')}</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <p className="text-white/80 text-sm mb-6">{t('mobile_explore')}</p>
                <div className="space-y-2">
                  <a
                    href="/use-case"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    {t('nav_uc_global')}
                  </a>
                  <a
                    href="/use-case-ttl"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    {t('nav_uc_ttl')}
                  </a>
                  <a
                    href="/use-case-conflux"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    {t('nav_uc_conflux')}
                  </a>
                  <a
                    href="/use-case-vatp"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    {t('nav_uc_vatp')}
                  </a>
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
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-bold text-[#1e6b8a] mb-6">
            {t('blog_hero_title')}
          </h1>
          <p className="text-xl text-[#1e3a4a]/70 max-w-3xl">
            {t('blog_hero_desc')}
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {blogPosts.filter(post => post.featured).map(post => (
        <section key={post.id} className="px-6 pb-16">
          <div className="max-w-7xl mx-auto">
            <a href={post.link || '#'} className="block">
              <div className="bg-gradient-to-br from-[#1e6b8a] to-[#0d3a52] rounded-3xl overflow-hidden relative group cursor-pointer shadow-2xl">
                <div className="absolute inset-0">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e6b8a]/90 via-[#1e6b8a]/40 to-transparent"></div>
                </div>
                <div className="relative z-10 p-12 lg:p-16 min-h-[500px] flex flex-col justify-end">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    {post.subcategory && (
                      <span className="bg-[#f5b942]/80 backdrop-blur-sm text-[#1e3a4a] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                        {post.subcategory}
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 max-w-3xl group-hover:text-[#f5b942] transition-colors duration-300">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-4">
                    <p className="text-white/80 text-sm">{post.date}</p>
                    <span className="text-[#f5b942] text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                      {t('blog_read_more')} <i className="ri-arrow-right-line"></i>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="bg-[#1e6b8a] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png" 
                  alt="DACC Logo" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {t('footer_building')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer_quick_links')}</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigateWithHash('/home-en', '#Services')}
                  className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer text-left"
                >
                  {t('nav_services')}
                </button>
                <button
                  onClick={() => handleNavigateWithHash('/home-en', '#use-cases')}
                  className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer text-left"
                >
                  {t('nav_use_cases')}
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer_resources')}</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigateWithHash('/home-en', '#ecosystem')}
                  className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer text-left"
                >
                  {t('nav_investors')}
                </button>
                <a href="/blog" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">
                  {t('nav_news')}
                </a>
                <a href="/contact" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">
                  {t('nav_contact_us')}
                </a>
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
            <p className="text-white/70 text-sm mb-4">
              {t('footer_copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}