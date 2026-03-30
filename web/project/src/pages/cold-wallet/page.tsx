import { useState, useEffect } from 'react';

export default function ColdWalletZH() {
  const [scrolled, setScrolled] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

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
                    <a href="/hot-wallet" className="block px-4 py-2 text-sm text-white hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      热钱包集成
                    </a>
                    <a href="/cold-wallet" className="block px-4 py-2 text-sm text-[#f5b942] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
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
            <a href="/cold-wallet-en" className="bg-[#e8f4fb] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium">
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
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    热钱包集成
                  </a>
                  <a
                    href="/cold-wallet"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-[#f5b942] transition-colors border-b border-white/20"
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
        <a href="/cold-wallet-en" className="bg-white/80 backdrop-blur-md border border-[#b8d9ed] rounded-full px-3 md:px-4 py-2 text-xs md:text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium shadow-md">
          English
        </a>
      </div>

      {/* Hero Section */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="bg-[#f5b942] border border-[#c97a2f] text-[#1e6b8a] px-5 py-2 rounded-full text-sm font-semibold">
              企业级托管方案
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#1e6b8a] mb-6 leading-tight">
            DACC 托管冷钱包
          </h1>
          <p className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            面向金融机构的企业级数字资产冷钱包托管方案<br />
            以「断网 HSM 私钥管理 + 多重审批流程 + KYT/AML 风控」为核心，提供安全、合规、可运营的一站式托管能力
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-[#1e6b8a] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#f5b942] hover:text-[#1e6b8a] transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>预约产品演示</span>
              <i className="ri-calendar-line"></i>
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-[#1e6b8a] text-[#1e6b8a] px-8 py-4 rounded-full font-semibold hover:bg-[#1e6b8a] hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 transform hover:-translate-y-1"
            >
              <span>下载方案白皮书</span>
              <i className="ri-download-line"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/80 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-shield-keyhole-line text-[#1e6b8a] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">私钥全生命周期管理</h3>
              <p className="text-gray-600 text-sm leading-relaxed">私钥全生命周期由 HSM 生成、储存、签名</p>
            </div>

            <div className="bg-white/80 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-git-branch-line text-[#1e6b8a] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">双轨控管</h3>
              <p className="text-gray-600 text-sm leading-relaxed">线上 + 线下双轨控管，支持多角色分权与多层授权</p>
            </div>

            <div className="bg-white/80 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-server-line text-[#1e6b8a] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">灵活部署</h3>
              <p className="text-gray-600 text-sm leading-relaxed">可部署于机构指定环境，满足合规与资安要求</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Value - Why DACC */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">产品价值</h2>
            <p className="text-xl text-[#4a5568]">Why DACC</p>
          </div>

          <div className="space-y-8">
            {/* Security First */}
            <div className="bg-white/70 rounded-3xl p-10 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1e6b8a] to-[#2d8ba8] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-shield-check-line text-white text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">安全为先：断网签章架构</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">HSM 与 KMS 部署于断网环境，降低私钥暴露风险</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">交易签名透过 QR Code 离线数据传递，避免直接网络接触私钥模块</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">HSM 仅执行关键动作：<strong>地址生成</strong>、<strong>交易签名</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance */}
            <div className="bg-white/70 rounded-3xl p-10 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1e6b8a] to-[#2d8ba8] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-file-shield-line text-white text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">合规可落地：流程即控制</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">内建 KYT / AML 检查与白名单管理</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">存币 / 提币流程标准化，具备可稽核的操作纪录</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">支持多重身份验证（2FA、Auth App、Yubikey）与职责分离</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scalability */}
            <div className="bg-white/70 rounded-3xl p-10 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1e6b8a] to-[#2d8ba8] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-rocket-line text-white text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">运营可扩展：一站式平台</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">前台 User Portal + 后台 Admin Portal 一体化</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">支持钱包规则（Requester / Approver、M-of-N、分层门槛）</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl flex-shrink-0 mt-1"></i>
                      <p className="text-[#4a5568]">可按业务需求扩展币种、链与作业流程</p>
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
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">核心功能</h2>
            <p className="text-xl text-[#4a5568]">Core Capabilities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-[#1e6b8a] rounded-lg flex items-center justify-center mb-4">
                <i className="ri-wallet-3-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">托管钱包管理</h4>
              <p className="text-sm text-[#4a5568]">冷钱包资产、地址、交易</p>
            </div>

            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-[#1e6b8a] rounded-lg flex items-center justify-center mb-4">
                <i className="ri-fingerprint-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">授权与认证</h4>
              <p className="text-sm text-[#4a5568]">2FA、Auth App、Yubikey</p>
            </div>

            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-[#1e6b8a] rounded-lg flex items-center justify-center mb-4">
                <i className="ri-settings-3-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">钱包规则引擎</h4>
              <p className="text-sm text-[#4a5568]">发起、审批、触发门槛、限额</p>
            </div>

            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-[#1e6b8a] rounded-lg flex items-center justify-center mb-4">
                <i className="ri-shield-check-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">KYT / AML 控管</h4>
              <p className="text-sm text-[#4a5568]">白名单与风险检查</p>
            </div>

            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-[#1e6b8a] rounded-lg flex items-center justify-center mb-4">
                <i className="ri-exchange-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">存提币流程</h4>
              <p className="text-sm text-[#4a5568]">入金侦测与放行流程</p>
            </div>

            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-[#1e6b8a] rounded-lg flex items-center justify-center mb-4">
                <i className="ri-file-list-3-line text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">操作日志</h4>
              <p className="text-sm text-[#4a5568]">全量纪录与对账单</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">关键流程</h2>
            <p className="text-xl text-[#4a5568]">How It Works</p>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex items-start gap-4 md:gap-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#1e6b8a] to-[#2d8ba8] rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0 shadow-lg">
                1
              </div>
              <div className="flex-1 bg-white/70 rounded-xl p-5 border border-[#b8d9ed]">
                <h3 className="text-lg md:text-xl font-bold text-[#1e6b8a] mb-2">前台发起</h3>
                <p className="text-[#4a5568] text-sm md:text-base">Requester 依钱包权限与限额发起交易</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 md:gap-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#1e6b8a] to-[#2d8ba8] rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0 shadow-lg">
                2
              </div>
              <div className="flex-1 bg-white/70 rounded-xl p-5 border border-[#b8d9ed]">
                <h3 className="text-lg md:text-xl font-bold text-[#1e6b8a] mb-2">前台授权</h3>
                <p className="text-[#4a5568] text-sm md:text-base">Approver 依门槛与层级完成授权</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 md:gap-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#1e6b8a] to-[#2d8ba8] rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0 shadow-lg">
                3
              </div>
              <div className="flex-1 bg-white/70 rounded-xl p-5 border border-[#b8d9ed]">
                <h3 className="text-lg md:text-xl font-bold text-[#1e6b8a] mb-2">后台放行</h3>
                <p className="text-[#4a5568] text-sm md:text-base">Supervisor + Auth App（Officer x2 + Manager x1）完成验证</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4 md:gap-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#1e6b8a] to-[#2d8ba8] rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0 shadow-lg">
                4
              </div>
              <div className="flex-1 bg-white/70 rounded-xl p-5 border border-[#b8d9ed]">
                <h3 className="text-lg md:text-xl font-bold text-[#1e6b8a] mb-2">断网签章</h3>
                <p className="text-[#4a5568] text-sm md:text-base">KMS/HSM 于离线环境完成签名（QR Code 传递）</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start gap-4 md:gap-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#1e6b8a] to-[#2d8ba8] rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0 shadow-lg">
                5
              </div>
              <div className="flex-1 bg-white/70 rounded-xl p-5 border border-[#b8d9ed]">
                <h3 className="text-lg md:text-xl font-bold text-[#1e6b8a] mb-2">链上广播</h3>
                <p className="text-[#4a5568] text-sm md:text-base">签名交易回传系统并提交区块链</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">角色与分权</h2>
            <p className="text-xl text-[#4a5568]">Governance by Design</p>
          </div>

          <div className="bg-white/70 rounded-3xl p-6 md:p-10 border border-[#b8d9ed]">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
              <div className="bg-white/80 rounded-xl p-6 border border-[#b8d9ed]">
                <h4 className="font-bold text-[#1e6b8a] mb-4 flex items-center space-x-2">
                  <i className="ri-user-line text-[#1e6b8a] text-xl"></i>
                  <span>前台角色</span>
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <i className="ri-checkbox-circle-fill text-[#1e6b8a]"></i>
                    <span className="text-[#4a5568]">Primary</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-checkbox-circle-fill text-[#1e6b8a]"></i>
                    <span className="text-[#4a5568]">Operating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-checkbox-circle-fill text-[#1e6b8a]"></i>
                    <span className="text-[#4a5568]">View-only</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 rounded-xl p-6 border border-[#b8d9ed]">
                <h4 className="font-bold text-[#1e6b8a] mb-4 flex items-center space-x-2">
                  <i className="ri-wallet-line text-[#1e6b8a] text-xl"></i>
                  <span>钱包权限</span>
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <i className="ri-checkbox-circle-fill text-[#1e6b8a]"></i>
                    <span className="text-[#4a5568]">Requester</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-checkbox-circle-fill text-[#1e6b8a]"></i>
                    <span className="text-[#4a5568]">Approver</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-checkbox-circle-fill text-[#1e6b8a]"></i>
                    <span className="text-[#4a5568]">Viewer</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 rounded-xl p-6 border border-[#b8d9ed]">
                <h4 className="font-bold text-[#1e6b8a] mb-4 flex items-center space-x-2">
                  <i className="ri-admin-line text-[#1e6b8a] text-xl"></i>
                  <span>后台角色</span>
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <i className="ri-checkbox-circle-fill text-[#1e6b8a]"></i>
                    <span className="text-[#4a5568]">AM</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-checkbox-circle-fill text-[#1e6b8a]"></i>
                    <span className="text-[#4a5568]">Supervisor</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-checkbox-circle-fill text-[#1e6b8a]"></i>
                    <span className="text-[#4a5568]">View-only</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 rounded-xl p-6 border border-[#b8d9ed]">
                <h4 className="font-bold text-[#1e6b8a] mb-4 flex items-center space-x-2">
                  <i className="ri-shield-user-line text-[#1e6b8a] text-xl"></i>
                  <span>验证角色</span>
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <i className="ri-checkbox-circle-fill text-[#1e6b8a]"></i>
                    <span className="text-[#4a5568]">Auth AM</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-checkbox-circle-fill text-[#1e6b8a]"></i>
                    <span className="text-[#4a5568]">Wallet Auth</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-checkbox-circle-fill text-[#1e6b8a]"></i>
                    <span className="text-[#4a5568]">Auth Officer / Manager</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#dbeafe] border border-[#b8d9ed] rounded-xl p-6 text-[#1e3a4a]">
              <div className="flex items-start space-x-3">
                <i className="ri-information-line text-[#1e6b8a] text-2xl flex-shrink-0"></i>
                <p className="leading-relaxed text-[#4a5568]">
                  透过角色分离与多重控管点设计，降低单点风险，提升内控强度
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">适用场景</h2>
            <p className="text-xl text-[#4a5568]">Use Cases</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-bank-line text-[#1e6b8a] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">金融机构虚拟资产托管</h3>
              <p className="text-[#4a5568] leading-relaxed">为持牌金融机构提供符合监管要求的托管解决方案</p>
            </div>

            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-safe-2-line text-[#1e6b8a] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">高价值资产冷存储</h3>
              <p className="text-[#4a5568] leading-relaxed">分层审批机制确保大额资产安全管理</p>
            </div>

            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-file-shield-2-line text-[#1e6b8a] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">监管合规运营</h3>
              <p className="text-[#4a5568] leading-relaxed">满足监管/稽核要求的机构级钱包运营</p>
            </div>

            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-exchange-dollar-line text-[#1e6b8a] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">RWA 与跨境支付</h3>
              <p className="text-[#4a5568] leading-relaxed">为 RWA、跨境支付等场景提供托管底座</p>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-4">资质认证</h2>
            <p className="text-xl text-[#4a5568]">Certifications & Compliance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#1e6b8a] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-award-line text-white text-2xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">SOC 2 Type I / II</h4>
              <p className="text-sm text-[#4a5568]">托管流程与运营</p>
            </div>

            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#1e6b8a] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-white text-2xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">第三方资安测试</h4>
              <p className="text-sm text-[#4a5568]">灰盒测试认证</p>
            </div>

            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#1e6b8a] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-star-line text-white text-2xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">保险核保</h4>
              <p className="text-sm text-[#4a5568]">SPECIE / CRIME</p>
            </div>

            <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#1e6b8a] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-global-line text-white text-2xl"></i>
              </div>
              <h4 className="font-bold text-[#1e6b8a] mb-2">持牌业务支持</h4>
              <p className="text-sm text-[#4a5568]">美国、香港等地</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600/90 to-blue-700/90">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            让托管从「可用」升级到「可监管、可审计、可规模化」
          </h2>
          <p className="text-xl text-blue-50 mb-10 leading-relaxed">
            联络 DACC 团队，取得客制化部署与 PoC 规划
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
              <span>预约演示</span>
              <i className="ri-calendar-line"></i>
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
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform text-left"
                >
                  服务
                </button>
                <a href="/hot-wallet" className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform">
                  热钱包集成
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">资源</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm cursor-pointer hover:translate-x-2 transform text-left"
                >
                  应用案例
                </button>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
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