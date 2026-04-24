import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { WireframeSphere } from '../../components/feature/WireframeSphere';

export default function ContactEN() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const navigate = useNavigate();
  const isZh = i18n.language === 'zh';

  useEffect(() => { document.title = 'Contact | DACC - Digital Asset Clearing Center'; }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    const data = new URLSearchParams();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('company', formData.company);
    data.append('subject', formData.subject);
    data.append('message', formData.message);

    try {
      const res = await fetch('https://readdy.ai/api/form/d6juo8vrgrhbthj8n4og', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f4fb] via-[#b8d9ed] to-[#1e6b8a] text-gray-900">
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
            <button
              onClick={() => handleNavigateWithHash('/', '#Services')}
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
              <button
                className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat"
              >
                {t('nav_solutions')}
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {solutionsDropdownOpen && (
                <div className="absolute left-0 pt-2 w-56 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
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
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
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
              onClick={() => handleNavigateWithHash('/home-en', '#ecosystem')}
              className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat"
            >
              {t('nav_investors')}
            </button>
            <a href="/blog" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat">
              {t('nav_news')}
            </a>
            <a href="/contact" className="text-[#f5b942] font-semibold transition-colors cursor-pointer text-sm flex items-center whitespace-nowrap font-montserrat">
              {t('nav_contact_us')}
              <i className="ri-arrow-right-up-line ml-1 text-xs"></i>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Top Bar - Logo + Menu + Language */}
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
        <div className="fixed inset-0 bg-[#1e6b8a]/95 backdrop-blur-md z-40 lg:hidden pt-20">
          {/* Main Menu */}
          {!mobileSubmenu && (
            <div className="flex flex-col h-full px-6 py-8">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavigateWithHash('/', '#Services');
                  }}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>{t('nav_services')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('useCases')}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>{t('nav_use_cases')}</span>
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
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavigateWithHash('/', '#ecosystem');
                  }}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>{t('nav_investors')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>{t('nav_blog')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#f5b942] font-semibold transition-colors border-b border-white/20"
                >
                  <span>{t('nav_contact_us')}</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
              </div>
            </div>
          )}

          {/* Use Cases Submenu */}
          {mobileSubmenu === 'useCases' && (
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
                <p className="text-white/70 text-sm mb-6">{t('mobile_explore')}</p>
                <div className="space-y-2">
                  <a href="/use-case" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                    {t('nav_uc_global')}
                  </a>
                  <a href="/use-case-ttl" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                    {t('nav_uc_ttl')}
                  </a>
                  <a href="/use-case-conflux" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                    {t('nav_uc_conflux')}
                  </a>
                  <a href="/use-case-vatp" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                    {t('nav_uc_vatp')}
                  </a>
                </div>
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
                  <a href="/hot-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                    {t('nav_sol_hot_wallet')}
                  </a>
                  <a href="/cold-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                    {t('nav_sol_cold_wallet')}
                  </a>
                  <a href="/rwa-platform" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                    {t('nav_sol_rwa')}
                  </a>
                  <a href="/chain-fusion" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                    {t('nav_sol_chainfusion')}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Language Switcher - Desktop Only */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <button onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')} className="inline-flex items-center gap-1.5 rounded-full border border-[#b8d9ed] bg-white/80 backdrop-blur-md px-2.5 py-1.5 text-[#1e6b8a] hover:border-[#1e6b8a] hover:text-[#12b7d6] transition-colors text-xs font-semibold shadow-lg">
          <WireframeSphere size={14} />
          <span>{isZh ? '中文' : 'EN'}</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#e8f4fb] to-[#b8d9ed]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-6">
              {t('contact_hero_title')}
            </h1>
            <p className="text-xl text-[#4a5568] max-w-3xl mx-auto">
              {t('contact_hero_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-[#1e6b8a] mb-8">{t('contact_info_title')}</h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#dbeafe] rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-map-pin-line text-[#1e6b8a] text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1e6b8a] mb-2">{t('contact_info_address_label')}</h3>
                    <p className="text-[#4a5568]">
                      {t('contact_info_address_line1')}<br />
                      {t('contact_info_address_line2')}<br />
                      {t('contact_info_address_line3')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#dbeafe] rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-mail-line text-[#1e6b8a] text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1e6b8a] mb-2">{t('contact_info_email_label')}</h3>
                    <p className="text-[#4a5568]">
                      <a href="mailto:info@dacc.hk" className="hover:text-[#f5b942] transition-colors">
                        info@dacc.hk
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#dbeafe] rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-line text-[#1e6b8a] text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1e6b8a] mb-2">{t('contact_info_hours_label')}</h3>
                    <p className="text-[#4a5568]">
                      {t('contact_info_hours_weekdays')}<br />
                      {t('contact_info_hours_weekend')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h3 className="font-semibold text-[#1e6b8a] mb-4">{t('contact_info_follow')}</h3>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/70 rounded-full flex items-center justify-center hover:bg-[#1e6b8a] hover:text-white transition-all duration-300 cursor-pointer border border-[#b8d9ed]">
                    <i className="ri-linkedin-fill text-xl"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/80 rounded-3xl p-8 lg:p-12 border border-[#b8d9ed] shadow-lg">
              <h2 className="text-3xl font-bold text-[#1e6b8a] mb-8">{t('contact_form_title')}</h2>

              <form onSubmit={handleSubmit} data-readdy-form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#1e6b8a] mb-2">
                    {t('contact_form_name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#b8d9ed] bg-white text-[#1e3a4a] focus:border-[#1e6b8a] focus:ring-2 focus:ring-[#1e6b8a]/20 outline-none transition-all"
                    placeholder={t('contact_form_name_placeholder')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#1e6b8a] mb-2">
                    {t('contact_form_email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#b8d9ed] bg-white text-[#1e3a4a] focus:border-[#1e6b8a] focus:ring-2 focus:ring-[#1e6b8a]/20 outline-none transition-all"
                    placeholder={t('contact_form_email_placeholder')}
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-[#1e6b8a] mb-2">
                    {t('contact_form_company')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#b8d9ed] bg-white text-[#1e3a4a] focus:border-[#1e6b8a] focus:ring-2 focus:ring-[#1e6b8a]/20 outline-none transition-all"
                    placeholder={t('contact_form_company_placeholder')}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-[#1e6b8a] mb-2">
                    {t('contact_form_subject')}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#b8d9ed] bg-white text-[#1e3a4a] focus:border-[#1e6b8a] focus:ring-2 focus:ring-[#1e6b8a]/20 outline-none transition-all cursor-pointer"
                  >
                    <option value="">{t('contact_form_subject_placeholder')}</option>
                    <option value="general">{t('contact_form_subject_general')}</option>
                    <option value="products">{t('contact_form_subject_products')}</option>
                    <option value="partnership">{t('contact_form_subject_partnership')}</option>
                    <option value="support">{t('contact_form_subject_support')}</option>
                    <option value="other">{t('contact_form_subject_other')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#1e6b8a] mb-2">
                    {t('contact_form_message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    maxLength={500}
                    className="w-full px-4 py-3 rounded-xl border border-[#b8d9ed] bg-white text-[#1e3a4a] focus:border-[#1e6b8a] focus:ring-2 focus:ring-[#1e6b8a]/20 outline-none transition-all resize-none"
                    placeholder={t('contact_form_message_placeholder')}
                  />
                  <p className="text-xs text-[#4a5568] mt-2">
                    {t('contact_form_chars', { count: formData.message.length })}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className="w-full bg-[#1e6b8a] text-white px-8 py-4 rounded-full font-bold hover:bg-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'submitting' ? t('contact_form_submitting') : t('contact_form_submit')}
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-[#dbeafe] border border-[#1e6b8a]/30 text-[#1e6b8a] px-4 py-3 rounded-xl">
                    <p className="font-semibold">{t('contact_form_success_title')}</p>
                    <p className="text-sm">{t('contact_form_success_desc')}</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-100 border border-red-400/30 text-red-600 px-4 py-3 rounded-xl">
                    <p className="font-semibold">{t('contact_form_error_title')}</p>
                    <p className="text-sm">{t('contact_form_error_desc')}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

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
              <p className="text-white/70 text-sm leading-relaxed">
                {t('contact_footer_tagline')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer_quick_links')}</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigateWithHash('/', '#Services')}
                  className="block text-white/70 hover:text-[#f5b942] transition-colors text-sm cursor-pointer text-left"
                >
                  {t('nav_services')}
                </button>
                <button
                  onClick={() => handleNavigateWithHash('/', '#use-cases')}
                  className="block text-white/70 hover:text-[#f5b942] transition-colors text-sm cursor-pointer text-left"
                >
                  {t('nav_use_cases')}
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer_resources')}</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigateWithHash('/', '#ecosystem')}
                  className="block text-white/70 hover:text-[#f5b942] transition-colors text-sm cursor-pointer text-left"
                >
                  {t('nav_investors')}
                </button>
                <a href="/blog" className="block text-white/70 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">
                  {t('nav_news')}
                </a>
                <a href="/contact" className="block text-white/70 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">
                  {t('nav_contact_us')}
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer_follow_us')}</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f5b942] transition-colors cursor-pointer">
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
