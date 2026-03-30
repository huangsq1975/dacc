import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HotWalletZH() {
  const [scrolled, setScrolled] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
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
    navigate(`${path}#${hash}`);
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
                    <a href="/hot-wallet" className="block px-4 py-2 text-sm text-[#f5b942] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      热钱包集成
                    </a>
                    <a href="/cold-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      冷钱包
                    </a>
                    <a href="/rwa-platform" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      RWA 代币化平台
                    </a>
                    <a href="/chain-fusion" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      ChainFusion
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
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-medium">
                应用案例
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${useCasesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {useCasesDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-64 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/use-case" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      全球商户 x DACC
                    </a>
                    <a href="/use-case-ttl" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      TTL × DACC
                    </a>
                    <a href="/use-case-conflux" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      Conflux x DACC
                    </a>
                    <a href="/use-case-vatp" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      加密交易所 x DACC
                    </a>
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
            <a href="/hot-wallet-en" className="bg-[#e8f4fb] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium">
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
                <a
                  href="/#Services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>服务</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <button
                  onClick={() => setMobileSubmenu('solutions')}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>解决方案</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('useCasesZH')}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>应用案例</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a
                  href="/#ecosystem"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>投资者</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>新闻</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
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
                <button
                  onClick={() => setMobileSubmenu(null)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"
                >
                  <i className="ri-arrow-left-line text-2xl"></i>
                </button>
                <span className="text-lg font-semibold text-white">解决方案</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-2">
                  <a
                    href="/hot-wallet"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    热钱包集成
                  </a>
                  <a
                    href="/cold-wallet"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    冷钱包
                  </a>
                  <a
                    href="/rwa-platform"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    RWA 代币化平台
                  </a>
                  <a
                    href="/chain-fusion"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    ChainFusion
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Use Cases Submenu */}
          {mobileSubmenu === 'useCasesZH' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button
                  onClick={() => setMobileSubmenu(null)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"
                >
                  <i className="ri-arrow-left-line text-2xl"></i>
                </button>
                <span className="text-lg font-semibold text-white">应用案例</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <p className="text-white/80 text-sm mb-6">探索我们的应用案例</p>
                <div className="space-y-2">
                  <a
                    href="/use-case"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    全球商户 x DACC
                  </a>
                  <a
                    href="/use-case-ttl"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    TTL × DACC
                  </a>
                  <a
                    href="/use-case-conflux"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    Conflux x DACC
                  </a>
                  <a
                    href="/use-case-vatp"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    加密交易所 x DACC
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Language Switcher - Desktop Only */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <a href="/hot-wallet-en" className="bg-white/80 backdrop-blur-md border border-[#b8d9ed] rounded-full px-3 md:px-4 py-2 text-xs md:text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium shadow-md">
          English
        </a>
      </div>

      {/* Hero Section */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="bg-[#f5b942] border border-[#c97a2f] text-[#1e6b8a] px-5 py-2 rounded-full text-sm font-semibold">
              企业级 API 热钱包
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#1e6b8a] mb-6 leading-tight">
            DACC API 热钱包
          </h1>
          <p className="text-base md:text-xl text-[#4a5568] max-w-3xl mx-auto leading-relaxed mb-8">
            面向交易平台与金融机构的企业级 API 热钱包方案<br />
            以「HSM 私钥安全 + 全 API 可控 + KYT 风险引擎」为核心，支持数字资产存取、归账与提领的高效率运营
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-[#1e6b8a] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>申请 Sandbox</span>
              <i className="ri-code-box-line"></i>
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-full font-semibold hover:bg-blue-400/10 transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 transform hover:-translate-y-1"
            >
              <span>取得 API 文件</span>
              <i className="ri-file-code-line"></i>
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-full font-semibold hover:bg-blue-400/10 transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 transform hover:-translate-y-1"
            >
              <span>预约技术对接</span>
              <i className="ri-calendar-line"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Product Value - Why DACC API Wallet */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">产品价值</h2>
            <p className="text-xl text-[#4a5568]">Why DACC API Wallet</p>
          </div>

          <div className="space-y-8">
            {/* Fast Integration */}
            <div className="bg-white/70 rounded-3xl p-10 border border-[#b8d9ed] hover:border-blue-400/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-flashlight-line text-white text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">快速整合，提升上线速度</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">清楚易用 API，支持地址建立、资产查询、归账与提领</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">支持 WebSocket 订阅（入金侦测、链上状态）</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">一次整合，复用到多链多币与多业务场景</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Efficiency & Risk Control */}
            <div className="bg-white/70 rounded-3xl p-10 border border-[#b8d9ed] hover:border-blue-400/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-speed-line text-white text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">兼顾效率与风险控制</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">三类地址模型：<strong>水池地址 / 存币地址 / 提币地址</strong></p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">支持自动归账 + 手动归账，兼顾运营效率与精细控管</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">提领可绑定多组风控门槛，依业务量动态管理风险</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance */}
            <div className="bg-white/70 rounded-3xl p-10 border border-[#b8d9ed] hover:border-blue-400/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-shield-check-line text-white text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">合规导向的链上资金管理</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">KYT 整合覆盖：白名单风险评估、入金来源检查、出金地址风险评分</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">隔离入金机制：可疑资金不进入自动归账</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">需同时通过 KYT 与内部风控规则才可成功提币</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">核心能力</h2>
            <p className="text-xl text-[#4a5568]">Core Capabilities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-400/10 rounded-xl p-6 border border-blue-400/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-code-s-slash-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">API 全量控制</h4>
              <p className="text-sm text-[#4a5568]">地址、余额、交易、提领、风控设定</p>
            </div>

            <div className="bg-blue-400/10 rounded-xl p-6 border border-blue-400/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-broadcast-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">WebSocket 即时事件</h4>
              <p className="text-sm text-[#4a5568]">入金、链上状态、手续费事件</p>
            </div>

            <div className="bg-blue-400/10 rounded-xl p-6 border border-blue-400/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-map-pin-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">地址管理</h4>
              <p className="text-sm text-[#4a5568]">Pool / Deposit / Withdraw</p>
            </div>

            <div className="bg-blue-400/10 rounded-xl p-6 border border-blue-400/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-arrow-left-right-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">归账管理</h4>
              <p className="text-sm text-[#4a5568]">自动/手动归账、指定归集地址</p>
            </div>

            <div className="bg-blue-400/10 rounded-xl p-6 border border-blue-400/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-send-plane-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">提领管理</h4>
              <p className="text-sm text-[#4a5568]">白名单、风控门槛、手续费预估</p>
            </div>

            <div className="bg-blue-400/10 rounded-xl p-6 border border-blue-400/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-shield-check-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">KYT 作业</h4>
              <p className="text-sm text-[#4a5568]">隔离入金、解除隔离、封锁名单</p>
            </div>
          </div>
        </div>
      </section>

      {/* Address Model */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">地址模型</h2>
            <p className="text-xl text-[#4a5568]">Address Design</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Pool Address */}
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-3xl p-8 border-2 border-blue-400/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-water-flash-line text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">水池地址（Pool）</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">专责支付链上手续费（Gas）</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">为存币地址与提币地址提供手续费来源</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">确保「手续费资金」与「用户资产」分离，提升透明度</p>
                </div>
              </div>
            </div>

            {/* Deposit Address */}
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-3xl p-8 border-2 border-blue-400/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-inbox-line text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">存币地址（Deposit）</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">用于接收用户入金</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">入金先留在地址中，待触发归账规则后再集中转移</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">可疑入金可标记为隔离，不参与自动归账</p>
                </div>
              </div>
            </div>

            {/* Withdraw Address */}
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-3xl p-8 border-2 border-blue-400/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-send-plane-2-line text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">提币地址（Withdraw）</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">用于执行对外提币</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">绑定风控门槛与 KYT 结果</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-arrow-right-s-line text-blue-400 flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568] text-sm">确保提领合规与安全</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">典型流程</h2>
            <p className="text-xl text-[#4a5568]">How It Works</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 hidden lg:block"></div>

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex items-center gap-8 lg:gap-12">
                <div className="flex-1 text-right hidden lg:block">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">建立 Deposit 地址</h3>
                  <p className="text-[#4a5568]">透过 API 为用户建立 Deposit 地址</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg relative z-10">
                  1
                </div>
                <div className="flex-1">
                  <div className="lg:hidden mb-4">
                    <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">建立 Deposit 地址</h3>
                    <p className="text-[#4a5568]">透过 API 为用户建立 Deposit 地址</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-6 border border-blue-400/30 shadow-md">
                    <i className="ri-map-pin-add-line text-blue-400 text-3xl mb-2"></i>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-8 lg:gap-12">
                <div className="flex-1 text-right hidden lg:block">
                  <div className="bg-white/70 rounded-xl p-6 border border-blue-400/30 shadow-md inline-block">
                    <i className="ri-shield-check-line text-blue-400 text-3xl mb-2"></i>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg relative z-10">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">KYT 入金检查</h3>
                  <p className="text-[#4a5568]">监听入金事件并执行 KYT 入金风险检查</p>
                  <div className="lg:hidden mt-4">
                    <div className="bg-white/70 rounded-xl p-6 border border-blue-400/30 shadow-md">
                      <i className="ri-shield-check-line text-blue-400 text-3xl mb-2"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-8 lg:gap-12">
                <div className="flex-1 text-right hidden lg:block">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">自动/手动归账</h3>
                  <p className="text-[#4a5568]">符合规则的资金依 Collection Policy 自动/手动归账</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg relative z-10">
                  3
                </div>
                <div className="flex-1">
                  <div className="lg:hidden mb-4">
                    <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">自动/手动归账</h3>
                    <p className="text-[#4a5568]">符合规则的资金依 Collection Policy 自动/手动归账</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-6 border border-blue-400/30 shadow-md">
                    <i className="ri-arrow-left-right-line text-blue-400 text-3xl mb-2"></i>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-center gap-8 lg:gap-12">
                <div className="flex-1 text-right hidden lg:block">
                  <div className="bg-white/70 rounded-xl p-6 border border-blue-400/30 shadow-md inline-block">
                    <i className="ri-file-list-3-line text-blue-400 text-3xl mb-2"></i>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg relative z-10">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">白名单与风险评分</h3>
                  <p className="text-[#4a5568]">提币前先做白名单与地址风险评分</p>
                  <div className="lg:hidden mt-4">
                    <div className="bg-white/70 rounded-xl p-6 border border-blue-400/30 shadow-md">
                      <i className="ri-file-list-3-line text-blue-400 text-3xl mb-2"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-center gap-8 lg:gap-12">
                <div className="flex-1 text-right hidden lg:block">
                  <div className="bg-white/70 rounded-xl p-6 border border-blue-400/30 shadow-md inline-block">
                    <i className="ri-send-plane-line text-blue-400 text-3xl mb-2"></i>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg relative z-10">
                  5
                </div>
                <div className="flex-1">
                  <div className="lg:hidden mb-4">
                    <h3 className="text-2xl font-bold text-[#1e6b8a] mb-2">发送交易</h3>
                    <p className="text-[#4a5568]">通过风控后由 Withdraw 地址发送交易并回传链上状态</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-6 border border-blue-400/30 shadow-md">
                    <i className="ri-send-plane-line text-blue-400 text-3xl mb-2"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">应用场景</h2>
            <p className="text-xl text-[#4a5568]">Use Cases</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-blue-400/50 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-400/20 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-exchange-line text-blue-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">券商 / 交易平台</h3>
              <p className="text-[#4a5568] leading-relaxed">虚拟资产存提运营的完整解决方案</p>
            </div>

            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-blue-400/50 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-400/20 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-funds-line text-blue-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">ETF 申购与赎回</h3>
              <p className="text-[#4a5568] leading-relaxed">实物申购与赎回的资金流管理</p>
            </div>

            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-blue-400/50 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-400/20 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-coin-line text-blue-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">稳定币收付</h3>
              <p className="text-[#4a5568] leading-relaxed">代币化产品结算与跨境支付</p>
            </div>

            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-blue-400/50 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-400/20 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-links-line text-blue-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">冷热钱包协同</h3>
              <p className="text-[#4a5568] leading-relaxed">热钱包运营 + 冷钱包托管架构</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hot & Cold Wallet Synergy */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">冷热钱包协同优势</h2>
            <p className="text-xl text-[#4a5568]">Hot & Cold Wallet Integration</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Hot Wallet */}
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl p-10 border-2 border-orange-400/30 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center">
                  <i className="ri-fire-line text-white text-3xl"></i>
                </div>
                <h3 className="text-3xl font-bold text-[#1e6b8a]">热钱包</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-fill text-orange-400 text-xl flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568]">API 自动化</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-fill text-orange-400 text-xl flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568]">支持高频日常资金流</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-fill text-orange-400 text-xl flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568]">快速响应用户需求</p>
                </div>
              </div>
            </div>

            {/* Cold Wallet */}
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl p-10 border-2 border-blue-400/30 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <i className="ri-snowflake-line text-white text-3xl"></i>
                </div>
                <h3 className="text-3xl font-bold text-[#1e6b8a]">冷钱包</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568]">离线签章</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568]">承接大额与高敏感资产</p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-checkbox-circle-fill text-blue-400 text-xl flex-shrink-0 mt-1"></i>
                  <p className="text-[#4a5568]">多重审批与合规控制</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-orange-600/20 rounded-2xl p-8 border border-blue-400/30">
            <div className="flex items-start space-x-4">
              <i className="ri-information-line text-blue-400 text-3xl flex-shrink-0"></i>
              <div>
                <h4 className="text-xl font-bold text-[#1e6b8a] mb-3">完美协同</h4>
                <p className="text-[#4a5568] leading-relaxed">
                  透过中继池与白名单机制，平衡流动性、效率与安全性。热钱包处理日常高频交易，冷钱包保护核心资产，共同构建企业级数字资产管理体系。
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
            把数字资产运营流程从「可用 API」升级到「可风控、可合规、可规模化」
          </h2>
          <p className="text-xl text-blue-50 mb-10 leading-relaxed">
            联络 DACC 团队，取得 Sandbox 凭证与整合指南
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <span>立即联系</span>
              <i className="ri-arrow-right-line"></i>
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 transform hover:-translate-y-1"
            >
              <span>申请 Sandbox</span>
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
                为代币化金融市场构建下一代基础设施
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">快速链接</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => handleNavigateWithHash('/zh', 'Services')}
                  className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform text-left"
                >
                  服务
                </button>
                <a href="/hot-wallet" className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform">热钱包集成</a>
                <a href="/cold-wallet" className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform">冷钱包</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">资源</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => handleNavigateWithHash('/zh', 'ecosystem')}
                  className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform text-left"
                >
                  投资者
                </button>
                <a href="/blog" className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform">新闻</a>
                <a href="/contact" className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform">联系我们</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">关注我们</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-sm mb-4">
              Copyright © 2026 Digital Asset Clearing Center (DACC). All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}