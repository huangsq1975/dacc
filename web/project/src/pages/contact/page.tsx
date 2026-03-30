import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

export default function ContactZH() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.message.length > 500) return;
    setSubmitStatus('submitting');
    try {
      const body = new URLSearchParams();
      Object.entries(formData).forEach(([key, val]) => body.append(key, val));
      const res = await fetch('https://readdy.ai/api/form/d6juo8vrgrhbthj8n4o0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  const handleNavigateWithHash = (path: string, hash: string) => {
    navigate(path);
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

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
              服务
            </a>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-medium">
                解决方案
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {solutionsDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-56 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/hot-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">热钱包集成</a>
                    <a href="/cold-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">冷钱包</a>
                    <a href="/rwa-platform" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">RWA 代币化平台</a>
                    <a href="/chain-fusion" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">ChainFusion</a>
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
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-medium">
                应用案例
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${useCasesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {useCasesDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-64 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/use-case" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">全球商户 x DACC</a>
                    <a href="/use-case-ttl" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">TTL × DACC</a>
                    <a href="/use-case-conflux" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Conflux x DACC</a>
                    <a href="/use-case-vatp" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">加密交易所 x DACC</a>
                  </div>
                </div>
              )}
            </div>

            <a href="/#ecosystem" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              投资者
            </a>
            <a href="/blog" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              新闻
            </a>
            <a href="/contact" className="text-[#f5b942] hover:text-[#f5b942] transition-colors cursor-pointer text-sm flex items-center whitespace-nowrap font-montserrat font-medium">
              联系我们
              <i className="ri-arrow-right-up-line ml-1 text-xs"></i>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Top Bar */}
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
            <a href="/contact-en" className="bg-[#e8f4fb] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium">
              English
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1e6b8a]/95 backdrop-blur-md z-40 lg:hidden pt-20">
          {!mobileSubmenu && (
            <div className="flex flex-col h-full px-6 py-8">
              <div className="space-y-2">
                <a href="/#Services" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>服务</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <button onClick={() => setMobileSubmenu('solutions')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>解决方案</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button onClick={() => setMobileSubmenu('useCasesZH')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>应用案例</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a href="/#ecosystem" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>投资者</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>新闻</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-[#f5b942] transition-colors border-b border-white/20">
                  <span>联系我们</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
              </div>
            </div>
          )}

          {mobileSubmenu === 'solutions' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors">
                  <i className="ri-arrow-left-line text-2xl"></i>
                </button>
                <span className="text-lg font-semibold text-white">解决方案</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6 space-y-2">
                <a href="/hot-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">热钱包集成</a>
                <a href="/cold-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">冷钱包</a>
                <a href="/rwa-platform" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">RWA 代币化平台</a>
                <a href="/chain-fusion" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">ChainFusion</a>
              </div>
            </div>
          )}

          {mobileSubmenu === 'useCasesZH' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors">
                  <i className="ri-arrow-left-line text-2xl"></i>
                </button>
                <span className="text-lg font-semibold text-white">应用案例</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <p className="text-white/80 text-sm mb-6">探索我们的应用案例</p>
                <div className="space-y-2">
                  <a href="/use-case" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">全球商户 x DACC</a>
                  <a href="/use-case-ttl" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">TTL × DACC</a>
                  <a href="/use-case-conflux" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Conflux x DACC</a>
                  <a href="/use-case-vatp" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">加密交易所 x DACC</a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Language Switcher - Desktop Only */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <a href="/contact-en" className="bg-white/80 backdrop-blur-md border border-[#b8d9ed] rounded-full px-3 md:px-4 py-2 text-xs md:text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium shadow-md">
          English
        </a>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#e8f4fb] to-[#b8d9ed]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#1e6b8a] mb-6">联系我们</h1>
            <p className="text-xl text-[#4a5568] max-w-3xl mx-auto">
              对我们的产品或服务有疑问？我们很乐意听取您的意见。请给我们留言，我们会尽快回复。
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
              <h2 className="text-3xl font-bold text-[#1e6b8a] mb-8">联系信息</h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#dbeafe] rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-map-pin-line text-[#1e6b8a] text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1e6b8a] mb-2">办公地址</h3>
                    <p className="text-[#4a5568]">
                      香港<br />
                      数码港道100号<br />
                      数码港3座4楼金融科技2
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#dbeafe] rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-mail-line text-[#1e6b8a] text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1e6b8a] mb-2">电子邮箱</h3>
                    <p className="text-[#4a5568]">
                      <a href="mailto:info@dacc.hk" className="hover:text-[#f5b942] transition-colors">info@dacc.hk</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#dbeafe] rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-line text-[#1e6b8a] text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1e6b8a] mb-2">营业时间</h3>
                    <p className="text-[#4a5568]">
                      周一至周五：上午9:00 - 下午6:00（香港时间）<br />
                      周六至周日：休息
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="font-semibold text-[#1e6b8a] mb-4">关注我们</h3>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/70 rounded-full flex items-center justify-center hover:bg-[#1e6b8a] hover:text-white transition-all duration-300 cursor-pointer border border-[#b8d9ed]">
                    <i className="ri-linkedin-fill text-xl"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/80 rounded-3xl p-8 lg:p-12 border border-[#b8d9ed] shadow-lg">
              <h2 className="text-3xl font-bold text-[#1e6b8a] mb-8">发送消息</h2>

              <form id="contact-zh-form" onSubmit={handleSubmit} data-readdy-form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#1e6b8a] mb-2">姓名 *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#b8d9ed] bg-white text-[#1e3a4a] focus:border-[#1e6b8a] focus:ring-2 focus:ring-[#1e6b8a]/20 outline-none transition-all"
                    placeholder="张三"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#1e6b8a] mb-2">电子邮箱 *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#b8d9ed] bg-white text-[#1e3a4a] focus:border-[#1e6b8a] focus:ring-2 focus:ring-[#1e6b8a]/20 outline-none transition-all"
                    placeholder="zhangsan@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-[#1e6b8a] mb-2">公司名称</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#b8d9ed] bg-white text-[#1e3a4a] focus:border-[#1e6b8a] focus:ring-2 focus:ring-[#1e6b8a]/20 outline-none transition-all"
                    placeholder="您的公司"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-[#1e6b8a] mb-2">主题 *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#b8d9ed] bg-white text-[#1e3a4a] focus:border-[#1e6b8a] focus:ring-2 focus:ring-[#1e6b8a]/20 outline-none transition-all cursor-pointer"
                  >
                    <option value="">选择主题</option>
                    <option value="general">一般咨询</option>
                    <option value="products">产品信息</option>
                    <option value="partnership">合作机会</option>
                    <option value="support">技术支持</option>
                    <option value="other">其他</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#1e6b8a] mb-2">留言 *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    maxLength={500}
                    className="w-full px-4 py-3 rounded-xl border border-[#b8d9ed] bg-white text-[#1e3a4a] focus:border-[#1e6b8a] focus:ring-2 focus:ring-[#1e6b8a]/20 outline-none transition-all resize-none"
                    placeholder="告诉我们更多关于您的咨询..."
                  />
                  <p className="text-xs text-[#4a5568] mt-2">{formData.message.length}/500 字符</p>
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className="w-full bg-[#1e6b8a] text-white px-8 py-4 rounded-full font-bold hover:bg-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'submitting' ? '发送中...' : '发送消息'}
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-[#dbeafe] border border-[#1e6b8a]/30 text-[#1e6b8a] px-4 py-3 rounded-xl">
                    <p className="font-semibold">消息发送成功！</p>
                    <p className="text-sm">我们会尽快回复您。</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-100 border border-red-400/30 text-red-600 px-4 py-3 rounded-xl">
                    <p className="font-semibold">发生错误。</p>
                    <p className="text-sm">请稍后再试。</p>
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
              <p className="text-white/70 text-sm leading-relaxed">引领数字清算与结算的下一个十年</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">快速链接</h4>
              <div className="space-y-2">
                <button onClick={() => handleNavigateWithHash('/', '#Services')} className="block text-white/70 hover:text-[#f5b942] transition-colors text-sm cursor-pointer text-left">服务</button>
                <button onClick={() => handleNavigateWithHash('/', '#use-cases')} className="block text-white/70 hover:text-[#f5b942] transition-colors text-sm cursor-pointer text-left">应用案例</button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">资源</h4>
              <div className="space-y-2">
                <button onClick={() => handleNavigateWithHash('/', '#ecosystem')} className="block text-white/70 hover:text-[#f5b942] transition-colors text-sm cursor-pointer text-left">投资者</button>
                <a href="/blog" className="block text-white/70 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">新闻</a>
                <a href="/contact" className="block text-white/70 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">联系我们</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">关注我们</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f5b942] transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/70 text-sm mb-4">
              版权所有 © 2026 数字资产清算中心（DACC）。保留所有权利。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
