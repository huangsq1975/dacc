import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UseCase() {
  const [scrolled, setScrolled] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-b from-[#e8f4fb] via-[#b8d9ed] to-[#1e6b8a] text-gray-900">
      {/* Floating Navigation - Desktop */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
        <nav className={`${scrolled ? 'bg-white/90' : 'bg-white/70'} backdrop-blur-md border border-[#b8d9ed] rounded-full px-6 py-3 transition-all duration-300 shadow-lg`}>
          <div className="flex items-center justify-center space-x-8">
            <a href="/zh" className="cursor-pointer flex-shrink-0">
              <img
                src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png"
                alt="DACC Logo"
                className="h-6 w-auto object-contain"
              />
            </a>
            <button
              onClick={() => handleNavigateWithHash('/zh', 'Services')}
              className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium"
            >
              服务
            </button>

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
                <div className="absolute left-0 pt-2 w-56 z-50">
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
                <div className="absolute left-0 pt-2 w-64 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/use-case" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">全球商户 x DACC</a>
                    <a href="/use-case-ttl" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">TTL × DACC</a>
                    <a href="/use-case-conflux" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Conflux x DACC</a>
                    <a href="/use-case-vatp" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">加密交易所 x DACC</a>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigateWithHash('/zh', 'ecosystem')}
              className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium"
            >
              投资者
            </button>
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
          <a href="/zh" className="block cursor-pointer">
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
            <a href="/use-case" className="bg-[#e8f4fb] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap">
              English
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1e6b8a] backdrop-blur-md z-40 lg:hidden pt-20">
          {!mobileSubmenu && (
            <div className="flex flex-col h-full px-6 py-8">
              <div className="space-y-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); handleNavigateWithHash('/zh', 'Services'); }}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>服务</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('solutions')}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>解决方案</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('useCases')}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>应用案例</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); handleNavigateWithHash('/zh', 'ecosystem'); }}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>投资者</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>博客</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>联系我们</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
              </div>
            </div>
          )}

          {/* Solutions Submenu */}
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

          {/* Use Cases Submenu */}
          {mobileSubmenu === 'useCases' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">应用案例</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <p className="text-white/80 text-sm mb-6">探索我们的解决方案</p>
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
        <a href="/use-case" className="bg-white/80 backdrop-blur-md border border-[#b8d9ed] rounded-full px-3 md:px-4 py-2 text-xs md:text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap shadow-md">
          English
        </a>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#1e6b8a]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#f5b942]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-[#b8d9ed]/30 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="bg-[#f5b942] border border-[#c97a2f] text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
              客户成功案例
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#1e6b8a] mb-6 leading-tight">
            连接全球商户与稳定币
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            通过合规托管系统、加密平台与电商生态的战略整合，加速稳定币在全球的普及应用
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Introduction Card */}
          <div className="bg-gradient-to-br from-[#1e6b8a] to-[#0d4a61] rounded-3xl p-12 mb-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-building-line text-white text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">Aegis Custody Company Limited</h2>
                  <p className="text-blue-100 text-lg">DACC 旗下持有香港托管牌照的专业机构</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-white/95">
                通过与 Web3 支付机构及电商品牌的直接合作，我们构建了连接顶级加密平台与电商生态的战略枢纽，加速稳定币在全球的普及应用。
              </p>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* License Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center">
                  <i className="ri-shield-check-line text-[#1e6b8a] text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1e6b8a]">牌照资质</h3>
                  <p className="text-sm text-gray-600">监管合规资质</p>
                </div>
              </div>
              <div className="bg-[#e8f4fb] rounded-xl p-6 border border-[#b8d9ed]">
                <p className="text-lg font-semibold text-[#1e6b8a] mb-2">TCSP 香港信托及公司服务提供商</p>
                <p className="text-sm text-gray-600">Trust and Company Service Provider</p>
              </div>
            </div>

            {/* Application Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center">
                  <i className="ri-safe-line text-[#1e6b8a] text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1e6b8a]">核心应用</h3>
                  <p className="text-sm text-gray-600">关键服务</p>
                </div>
              </div>
              <div className="bg-[#e8f4fb] rounded-xl p-6 border border-[#b8d9ed]">
                <p className="text-lg font-semibold text-[#1e6b8a] mb-2">顶级合规托管系统</p>
                <p className="text-sm text-gray-600 mb-3">保障商户资金安全</p>
                <div className="flex items-center space-x-2 text-[#1e6b8a]">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span className="text-sm font-medium">机构级托管</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Empowerment */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 mb-16 border border-[#b8d9ed]">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-[#1e6b8a] to-[#0d4a61] rounded-xl flex items-center justify-center">
                <i className="ri-code-box-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1e6b8a]">技术赋能</h3>
                <p className="text-gray-600">技术创新</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#e8f4fb] rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-terminal-box-line text-[#1e6b8a] text-xl"></i>
                </div>
                <h4 className="font-bold text-[#1e6b8a] mb-2">标准化 API</h4>
                <p className="text-sm text-gray-600">专业技术接口，实现无缝集成</p>
              </div>

              <div className="bg-[#e8f4fb] rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-dashboard-line text-[#1e6b8a] text-xl"></i>
                </div>
                <h4 className="font-bold text-[#1e6b8a] mb-2">专业商户仪表盘</h4>
                <p className="text-sm text-gray-600">透明资金流向与实时订单追踪</p>
              </div>

              <div className="bg-[#e8f4fb] rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-file-chart-line text-[#1e6b8a] text-xl"></i>
                </div>
                <h4 className="font-bold text-[#1e6b8a] mb-2">合规报告</h4>
                <p className="text-sm text-gray-600">可导出的综合合规报告系统</p>
              </div>
            </div>
          </div>

          {/* Ecosystem Integration */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-[#b8d9ed] mb-16 hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-[#1e6b8a] to-[#0d4a61] rounded-xl flex items-center justify-center">
                <i className="ri-links-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1e6b8a]">客户 PayStablecoin 深度集成</h3>
                <p className="text-gray-600">Ecosystem Integration</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { name: 'Binance', favicon: 'https://www.binance.com/favicon.ico' },
                { name: 'Bybit', favicon: 'https://www.bybit.com/favicon.ico' },
                { name: 'OKX', favicon: 'https://www.okx.com/favicon.ico' },
                { name: 'Kraken', favicon: 'https://www.kraken.com/favicon.ico' },
                { name: 'Coinbase', favicon: 'https://www.coinbase.com/favicon.ico' },
                { name: 'Huobi', favicon: 'https://www.htx.com/favicon.ico' },
                { name: 'Gate.io', favicon: 'https://www.gate.io/favicon.ico' },
                { name: 'KuCoin', favicon: 'https://www.kucoin.com/favicon.ico' },
              ].map((exchange) => (
                <div
                  key={exchange.name}
                  className="bg-[#e8f4fb] rounded-xl p-3 md:p-5 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 flex flex-col items-center justify-center gap-2 md:flex-row md:items-center md:justify-start md:gap-3 min-h-[80px]"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src={exchange.favicon}
                      alt={exchange.name}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-gray-800 font-bold text-xs">${exchange.name.charAt(0)}</span>`;
                        }
                      }}
                    />
                  </div>
                  <span className="font-semibold text-[#1e6b8a] text-xs md:text-sm text-center md:text-left">{exchange.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="bg-gradient-to-br from-white/90 to-[#e8f4fb] rounded-3xl p-12 text-gray-900 relative overflow-hidden border border-[#b8d9ed]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1e6b8a]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#f5b942]/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-[#dbeafe] rounded-full flex items-center justify-center">
                  <i className="ri-double-quotes-l text-[#1e6b8a] text-3xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1e6b8a]">客户评价</h3>
                  <p className="text-gray-600">客户反馈</p>
                </div>
              </div>

              <blockquote className="text-xl lg:text-2xl leading-relaxed mb-8 text-gray-700 italic">
                "我们选择 DACC，是因为其在合规、技术和生态方面的全面赋能。从稳定币结算到法币结算合规壁垒，DACC 确保我们的商户享受数字资产的便利，同时无需承担波动风险。这使我们能够触达 6 亿全球加密用户，并建立稳健的资金安全体系。"
              </blockquote>

              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1e6b8a] to-[#0d4a61] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">TT</span>
                </div>
                <div>
                  <p className="font-bold text-lg text-[#1e6b8a]">Tony Tsao</p>
                  <p className="text-gray-600">PayStablecoin 创始人</p>
                  <p className="text-sm text-gray-500">PayStablecoin Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">核心优势</h2>
            <p className="text-xl text-gray-600">Core Advantages</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-[#1e6b8a] text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">合规保障</h3>
              <p className="text-gray-600 text-sm leading-relaxed">持牌托管机构，确保资金安全与监管合规</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-line-chart-line text-[#1e6b8a] text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">风险管理</h3>
              <p className="text-gray-600 text-sm leading-relaxed">稳定币结算，规避数字资产价格波动风险</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-global-line text-[#1e6b8a] text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">全球覆盖</h3>
              <p className="text-gray-600 text-sm leading-relaxed">连接 12 家交易所，覆盖 6 亿加密用户</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-dashboard-line text-[#1e6b8a] text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">透明管理</h3>
              <p className="text-gray-600 text-sm leading-relaxed">实时资金流向追踪，配套完整合规报告</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#1e6b8a] to-[#0d4a61] rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">准备好开始了吗？</h2>
              <p className="text-xl text-blue-50 mb-8 leading-relaxed">
                加入 DACC 生态，将您的业务连接到全球稳定币市场
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#contact"
                  className="bg-[#f5b942] text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-[#c97a2f] transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>联系我们</span>
                  <i className="ri-arrow-right-line"></i>
                </a>
                <a
                  href="https://www.dacc.hk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#1e6b8a] transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 transform hover:-translate-y-1"
                >
                  <span>了解更多</span>
                  <i className="ri-external-link-line"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#1e6b8a] text-white py-8 md:py-12 px-4 md:px-6">
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
              <p className="text-blue-100 text-sm leading-relaxed">
                为代币化金融市场构建下一代基础设施
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">快速链接</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigateWithHash('/zh', 'Services')}
                  className="block text-blue-100 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left"
                >
                  服务
                </button>
                <button
                  onClick={() => handleNavigateWithHash('/zh', 'use-cases')}
                  className="block text-blue-100 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left"
                >
                  应用案例
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">资源</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigateWithHash('/zh', 'ecosystem')}
                  className="block text-blue-100 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left"
                >
                  投资者
                </button>
                <a href="/blog" className="block text-blue-100 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">新闻</a>
                <a href="/contact" className="block text-blue-100 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">联系我们</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">关注我们</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f5b942] transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 md:pt-8 text-center">
            <p className="text-blue-100 text-xs md:text-sm mb-3 md:mb-4">
              Copyright © 2026 Digital Asset Clearing Center (DACC). All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
