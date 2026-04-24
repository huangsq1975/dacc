import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UseCaseTTL() {
  const [scrolled, setScrolled] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const navigate = useNavigate();

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
            <a href="#Services" onClick={() => handleNavigateWithHash('/', 'Services')} className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              服务
            </a>
            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-medium">
                解决方案
                <i className="ri-arrow-down-s-line"></i>
              </button>
              <div className="absolute left-0 top-full pt-2 w-56 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                  <a href="/hot-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">热钱包集成</a>
                  <a href="/cold-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">冷钱包</a>
                  <a href="/rwa-platform" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">RWA 代币化平台</a>
                  <a href="/chain-fusion" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">ChainFusion</a>
                </div>
              </div>
            </div>
            {/* Use Cases Dropdown */}
            <div className="relative" onMouseEnter={() => setUseCasesDropdownOpen(true)} onMouseLeave={() => setUseCasesDropdownOpen(false)}>
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
            <a href="#ecosystem" onClick={() => handleNavigateWithHash('/', 'ecosystem')} className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              投资者
            </a>
            <a href="/blog" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              新闻
            </a>
            <a href="/contact" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm flex items-center whitespace-nowrap font-montserrat font-medium">
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
            <a href="/use-case-ttl" className="bg-[#e8f4fb] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium">
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
                <button onClick={() => { handleNavigateWithHash('/', 'Services'); setMobileMenuOpen(false); }} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>服务</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button onClick={() => setMobileSubmenu('solutions')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>解决方案</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button onClick={() => setMobileSubmenu('useCasesZH')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>应用案例</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button onClick={() => { handleNavigateWithHash('/', 'ecosystem'); setMobileMenuOpen(false); }} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>投资者</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>新闻</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>联系我们</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
              </div>
            </div>
          )}
          {mobileSubmenu === 'solutions' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"><i className="ri-arrow-left-line text-2xl"></i></button>
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
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">应用案例</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6 space-y-2">
                <a href="/use-case" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">全球商户 x DACC</a>
                <a href="/use-case-ttl" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">TTL × DACC</a>
                <a href="/use-case-conflux" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Conflux x DACC</a>
                <a href="/use-case-vatp" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">加密交易所 x DACC</a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Language Switcher - Desktop Only */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <a href="/use-case-ttl" className="bg-white/80 backdrop-blur-md border border-[#b8d9ed] rounded-full px-3 md:px-4 py-2 text-xs md:text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium shadow-md">
          English
        </a>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0ea5e9]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1e6b8a]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="bg-[#dbeafe] border border-[#b8d9ed] text-[#1e6b8a] px-4 py-2 rounded-full text-sm font-semibold">
              应用案例 / 合作伙伴方案
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-6 leading-tight">
            TTL × DACC：面向<span className="text-[#0ea5e9]">代币化资产</span>的可扩展金融基础设施
          </h1>
          <p className="text-lg text-[#4a5568] max-w-3xl mx-auto leading-relaxed mb-8">
            结合 TTL 的机构级交易能力与 DACC 的合规清算结算基础设施，实现代币化资产的无缝交易。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="bg-[#1e6b8a] hover:bg-[#0f4c5c] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center space-x-2 transform hover:scale-105">
              <span>预约演示</span>
              <i className="ri-arrow-right-line"></i>
            </a>
            <a href="#solutions" className="bg-transparent border border-[#1e6b8a] hover:border-[#f5b942] text-[#1e6b8a] hover:text-[#f5b942] px-6 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap transform hover:scale-105">
              查看产品组合
            </a>
          </div>
        </div>
      </section>

      {/* What is TTL × DACC */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Challenge */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-xl flex items-center justify-center">
                  <i className="ri-error-warning-line text-[#1e6b8a] text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#1e6b8a]">行业挑战</h3>
              </div>
              <p className="text-[#4a5568] leading-relaxed mb-4">
                随着代币化资产走向主流应用，关键瓶颈仍然存在：
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-1 mt-0.5"></i>
                  <span className="text-[#4a5568]">缺乏合规的交易后基础设施</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-1 mt-0.5"></i>
                  <span className="text-[#4a5568]">链上与链下系统割裂</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-1 mt-0.5"></i>
                  <span className="text-[#4a5568]">合规要求复杂多变</span>
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-xl flex items-center justify-center">
                  <i className="ri-lightbulb-line text-[#1e6b8a] text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#1e6b8a]">为什么选择 TTL × DACC</h3>
              </div>
              <p className="text-[#4a5568] leading-relaxed mb-4">
                DACC 提供合规的清算、结算和托管基础设施。TTL 提供机构级交易系统，包括 VASP/VATP 牌照、法币出入金通道以及 AML/KYC 能力。
              </p>
              <p className="text-[#1e6b8a] font-medium">
                双方联合打造模块化合规基础设施，降低机构准入门槛，加速代币化资产业务落地。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Joint Solution */}
      <section id="solutions" className="py-16 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e6b8a] mb-4">联合方案</h2>
            <p className="text-[#4a5568]">面向代币化资产运营的综合能力</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300">
              <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-exchange-funds-line text-[#1e6b8a] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">清算与结算</h3>
              <p className="text-[#4a5568] mb-4">DACC 提供代币化资产清算能力，连接链上资产与链下资金结算。</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#dbeafe] text-[#1e6b8a] px-3 py-1 rounded-full text-xs font-medium">实时结算</span>
                <span className="bg-[#dbeafe] text-[#1e6b8a] px-3 py-1 rounded-full text-xs font-medium">多链支持</span>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300">
              <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-building-2-line text-[#1e6b8a] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">机构交易系统</h3>
              <p className="text-[#4a5568] mb-4">TTL 提供机构级结算模块、法币出入金通道和开放 API 连接。</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#dbeafe] text-[#1e6b8a] px-3 py-1 rounded-full text-xs font-medium">VASP/VATP 牌照</span>
                <span className="bg-[#dbeafe] text-[#1e6b8a] px-3 py-1 rounded-full text-xs font-medium">开放 API</span>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300">
              <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-[#1e6b8a] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">合规与审计</h3>
              <p className="text-[#4a5568] mb-4">TTL 的 AML/KYC 能力结合 DACC 的可审计业务逻辑，实现透明合规运营。</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#dbeafe] text-[#1e6b8a] px-3 py-1 rounded-full text-xs font-medium">AML/KYC</span>
                <span className="bg-[#dbeafe] text-[#1e6b8a] px-3 py-1 rounded-full text-xs font-medium">审计追踪</span>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300">
              <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-stack-line text-[#1e6b8a] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">模块化部署</h3>
              <p className="text-[#4a5568] mb-4">按机构现状选择先清算/先托管/先代币化/先对接交付等路径，分阶段上线。</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#dbeafe] text-[#1e6b8a] px-3 py-1 rounded-full text-xs font-medium">分阶段部署</span>
                <span className="bg-[#dbeafe] text-[#1e6b8a] px-3 py-1 rounded-full text-xs font-medium">可定制</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Clients */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e6b8a] mb-4">适用范围</h2>
            <p className="text-[#4a5568]">面向受监管的金融机构</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-bank-line text-[#1e6b8a] text-2xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">银行</h4>
              <p className="text-sm text-[#4a5568]">数字货币结算与资产托管</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-exchange-line text-[#1e6b8a] text-2xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">券商/经纪交易商</h4>
              <p className="text-sm text-[#4a5568]">RWA 二级交易与托管</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-funds-line text-[#1e6b8a] text-2xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">资产管理公司</h4>
              <p className="text-sm text-[#4a5568]">基金/债券代币化与分销</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-pie-chart-line text-[#1e6b8a] text-2xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">财富管理平台</h4>
              <p className="text-sm text-[#4a5568]">链上资产交付与合规</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e6b8a] mb-4">业务流程</h2>
            <p className="text-[#4a5568]">简洁的五步流程</p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: 1, title: '资产发起', desc: '机构发起代币化资产发行' },
              { step: 2, title: '合规检查', desc: 'AML/KYC 验证和监管审批' },
              { step: 3, title: '结算', desc: 'DACC 连接链上和链下结算' },
              { step: 4, title: '清算', desc: '原子结算与实时对账' },
              { step: 5, title: '托管', desc: '安全的机构级资产托管' }
            ].map((item) => (
              <div key={item.step} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300">
                <div className="w-10 h-10 bg-[#1e6b8a] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold">{item.step}</span>
                </div>
                <h4 className="font-bold text-[#1e6b8a] mb-2">{item.title}</h4>
                <p className="text-sm text-[#4a5568]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 border border-[#b8d9ed]">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#1e6b8a] mb-2">建议 KPI（可量化）</h2>
              <p className="text-[#4a5568]">机构采用的性能基准</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-2">T+0</div>
                <p className="text-[#1e6b8a] font-medium">近实时</p>
                <p className="text-sm text-[#4a5568]">结算时效（结算参数可定义）</p>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-2">≥99.9%</div>
                <p className="text-[#1e6b8a] font-medium">系统可用性</p>
                <p className="text-sm text-[#4a5568]">SLA 目标可用性</p>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-2">审计就绪</div>
                <p className="text-[#1e6b8a] font-medium">合规报告</p>
                <p className="text-sm text-[#4a5568]">完整审计追踪支持</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#1e6b8a] to-[#0f4c5c] rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">准备好转型您的基础设施了吗？</h2>
              <p className="text-lg text-white/80 mb-8">
                联系我们，了解 TTL × DACC 如何加速您的代币化资产运营。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="bg-white text-[#1e6b8a] px-8 py-4 rounded-full font-bold hover:bg-[#f5b942] hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2">
                  <span>联系我们</span>
                  <i className="ri-arrow-right-line"></i>
                </a>
                <a href="https://www.dacc.hk" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#1e6b8a] transition-all duration-300 cursor-pointer whitespace-nowrap">
                  了解更多
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
                <img
                  src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png"
                  alt="DACC Logo"
                  className="h-20 w-auto object-contain"
                />
              </div>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                引领数字清算与结算的下一个十年
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">快速链接</h4>
              <div className="space-y-2">
                <a href="/#Services" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">服务</a>
                <a href="/#use-cases" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">应用案例</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">资源</h4>
              <div className="space-y-2">
                <a href="/#ecosystem" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">投资者</a>
                <a href="/blog" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">新闻</a>
                <a href="/contact" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">联系我们</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">联系方式</h4>
              <p className="text-white/80 text-xs md:text-sm mb-4">邮箱：info@dacc.hk</p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#f5b942] transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 md:pt-8 text-center">
            <p className="text-white/80 text-xs md:text-sm mb-3 md:mb-4">
              Copyright © 2026 Digital Asset Clearing Center (DACC). All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
