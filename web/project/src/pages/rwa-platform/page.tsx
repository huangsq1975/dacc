import { useState, useEffect } from 'react';

export default function RWAPlatformZH() {
  const [scrolled, setScrolled] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── Floating Nav Desktop ── */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
        <nav className={`${scrolled ? 'bg-white/95 shadow-lg' : 'bg-white/80'} backdrop-blur-md border border-[#b8d9ed] rounded-full px-6 py-3 transition-all duration-300`}>
          <div className="flex items-center justify-center space-x-8">
            <a href="/" className="cursor-pointer flex-shrink-0">
              <img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" alt="DACC Logo" className="h-6 w-auto object-contain" />
            </a>
            <a href="/#Services" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-medium">服务</a>
            <div className="relative" onMouseEnter={() => setSolutionsDropdownOpen(true)} onMouseLeave={() => setSolutionsDropdownOpen(false)}>
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-medium">
                解决方案<i className={`ri-arrow-down-s-line transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {solutionsDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-56 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/hot-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">热钱包集成</a>
                    <a href="/cold-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">冷钱包</a>
                    <a href="/rwa-platform" className="block px-4 py-2 text-sm text-[#f5b942] font-semibold hover:bg-[#e8f4fb] transition-colors">RWA 代币化平台</a>
                    <a href="/chain-fusion" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">ChainFusion</a>
                  </div>
                </div>
              )}
            </div>
            <div className="relative" onMouseEnter={() => setUseCasesDropdownOpen(true)} onMouseLeave={() => setUseCasesDropdownOpen(false)}>
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-medium">
                应用案例<i className={`ri-arrow-down-s-line transition-transform duration-200 ${useCasesDropdownOpen ? 'rotate-180' : ''}`}></i>
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
            <a href="/#ecosystem" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-medium">投资者</a>
            <a href="/blog" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-medium">新闻</a>
            <a href="/contact" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm flex items-center whitespace-nowrap font-medium">
              联系我们<i className="ri-arrow-right-up-line ml-1 text-xs"></i>
            </a>
          </div>
        </nav>
      </div>

      {/* ── Mobile Top Bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-b border-[#b8d9ed] shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <a href="/"><img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" alt="DACC Logo" className="h-8 w-auto object-contain" /></a>
          <div className="flex items-center space-x-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="bg-[#e8f4fb] border border-[#b8d9ed] rounded-full px-4 py-2 text-[#1e6b8a]">
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
            <a href="/rwa-platform-en" className="bg-[#e8f4fb] border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] whitespace-nowrap font-medium">English</a>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1e6b8a]/95 backdrop-blur-md z-40 lg:hidden pt-20">
          {!mobileSubmenu && (
            <div className="px-6 py-8 space-y-2">
              <a href="/#Services" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>服务</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </a>
              <button onClick={() => setMobileSubmenu('solutions')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>解决方案</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </button>
              <button onClick={() => setMobileSubmenu('useCases')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>应用案例</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </button>
              <a href="/#ecosystem" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>投资者</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </a>
              <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>新闻</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </a>
              <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] border-b border-white/20">
                <span>联系我们</span><i className="ri-arrow-right-s-line text-2xl"></i>
              </a>
            </div>
          )}
          {mobileSubmenu === 'solutions' && (
            <div>
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">解决方案</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6 space-y-2">
                <a href="/hot-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">热钱包集成</a>
                <a href="/cold-wallet" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">冷钱包</a>
                <a href="/rwa-platform" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#f5b942] border-b border-white/20">RWA 代币化平台</a>
                <a href="/chain-fusion" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">ChainFusion</a>
              </div>
            </div>
          )}
          {mobileSubmenu === 'useCases' && (
            <div>
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">应用案例</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6 space-y-2">
                <a href="/use-case" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">全球商户 x DACC</a>
                <a href="/use-case-ttl" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">TTL × DACC</a>
                <a href="/use-case-conflux" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">Conflux x DACC</a>
                <a href="/use-case-vatp" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">加密交易所 x DACC</a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Language Switcher Desktop ── */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <a href="/rwa-platform-en" className="bg-white/80 backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 font-medium shadow-md whitespace-nowrap cursor-pointer">English</a>
      </div>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=abstract%20dark%20teal%20blue%20gradient%20background%20with%20glowing%20digital%20asset%20token%20symbols%20and%20blockchain%20network%20nodes%20flowing%20across%20a%20deep%20ocean%20blue%20canvas%2C%20soft%20golden%20light%20rays%2C%20futuristic%20fintech%20tokenization%20atmosphere%2C%20ultra%20wide%20cinematic%20composition%2C%20no%20text%2C%20no%20people&width=1440&height=900&seq=rwazh001&orientation=landscape"
            alt="RWA Platform Hero"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f3d52]/80 via-[#1e6b8a]/70 to-[#0f3d52]/90"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 pt-24 w-full">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 rounded-full px-5 py-2 mb-8">
            <div className="w-2 h-2 bg-[#f5b942] rounded-full animate-pulse"></div>
            <span className="text-sm text-white/90 font-medium tracking-wide">RWA 代币化平台</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            RWA 代币化平台
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-4 leading-relaxed">
            面向金融机构与资产方的一站式代币化方案
          </p>
          <p className="text-base text-white/60 max-w-2xl mx-auto mb-10">
            以「标准化代币数据结构 + 多方数字签章 + 托管协同」为核心，支持债券、基金、应收账款、碳权等多类资产上链发行
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-[#f5b942] hover:bg-[#e0a830] text-[#1e3a4a] px-8 py-4 rounded-full font-bold transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg">
              预约产品演示
            </a>
            <a href="/contact" className="bg-white/10 border border-white/40 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              申请项目评估
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-white/70">
            <div className="flex items-center space-x-2">
              <i className="ri-checkbox-circle-fill text-[#f5b942]"></i>
              <span>资产信息可验证、可追溯、可稽核</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-checkbox-circle-fill text-[#f5b942]"></i>
              <span>代币发行流程标准化（4步骤）</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="ri-checkbox-circle-fill text-[#f5b942]"></i>
              <span>托管 · 分销 · 交割无缝衔接</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <i className="ri-arrow-down-line text-white/50 text-2xl"></i>
        </div>
      </section>

      {/* ══════════════════════════════════════
          支持资产类型 — 图标网格
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">支持资产类型</h2>
          <p className="text-[#4a5568] mb-14 max-w-xl mx-auto">统一平台支持多类真实世界资产的代币化发行，覆盖主流资产品类</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-10">
            {[
              { icon: 'ri-file-chart-line', label: '债券' },
              { icon: 'ri-funds-line', label: '基金' },
              { icon: 'ri-bill-line', label: '应收账款' },
              { icon: 'ri-exchange-dollar-line', label: '贸易债务' },
              { icon: 'ri-leaf-line', label: '碳权' },
              { icon: 'ri-drop-line', label: '水资源' },
              { icon: 'ri-palette-line', label: '艺术品' },
              { icon: 'ri-more-line', label: '更多资产' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center justify-center p-4 rounded-2xl border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-md transition-all duration-300 cursor-default group">
                <div className="w-10 h-10 flex items-center justify-center mb-2">
                  <i className={`${item.icon} text-2xl text-[#1e6b8a] group-hover:text-[#f5b942] transition-colors`}></i>
                </div>
                <span className="text-xs font-semibold text-[#4a5568] group-hover:text-[#1e6b8a] transition-colors text-center leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="inline-flex items-center gap-2 bg-[#1e6b8a] hover:bg-[#155a75] text-white px-7 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              了解全部资产类型<i className="ri-arrow-right-line"></i>
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 border border-[#1e6b8a] text-[#1e6b8a] hover:bg-[#e8f4fb] px-7 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              申请定制评估
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          产品核心价值 — 2×2 卡片
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-[#f7fbfe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">产品核心价值</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">三大支柱，让 DACC RWA 平台成为机构资产代币化的首选方案</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: 'ri-shield-check-line',
                color: 'bg-[#dbeafe]',
                iconColor: 'text-[#1e6b8a]',
                title: '发行可信任的链上资产',
                desc: '标准化 metadata 格式确保资产信息可读、可验证，并永久链接至链上',
                points: ['标准化格式写入资产 metadata，保留可读性', '代币内含永久链接（URI）与佐证资料', '透过多方数字签章验证资产真实性'],
              },
              {
                icon: 'ri-links-line',
                color: 'bg-[#fef3c7]',
                iconColor: 'text-[#d97706]',
                title: '一站式覆盖：代币化→托管→分销',
                desc: '在单一集成平台上管理代币化资产的完整生命周期',
                points: ['同平台可管理多种资产类型', '发行后可直接进入托管钱包', '支持券商分销与所有权转移，提升流动性'],
              },
              {
                icon: 'ri-file-list-3-line',
                color: 'bg-[#d1fae5]',
                iconColor: 'text-[#059669]',
                title: '合规导向设计',
                desc: '从第一天起就内建合规管控，与监管要求完全对齐',
                points: ['白名单地址发行机制', '可选择文件公开或加密呈现', '支持 KYC、KYT 与监管要求下的流程控管'],
              },
              {
                icon: 'ri-building-4-line',
                color: 'bg-[#ede9fe]',
                iconColor: 'text-[#7c3aed]',
                title: '灵活部署与集成',
                desc: '可适配的架构，无缝叠加在现有基础设施之上，无需替换',
                points: ['On-Prem / SaaS 弹性部署', 'API 优先设计，无缝集成', '白标定制，满足机构品牌需求'],
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-5`}>
                  <i className={`${item.icon} text-2xl ${item.iconColor}`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#1e3a4a] mb-2">{item.title}</h3>
                <p className="text-[#4a5568] text-sm mb-4">{item.desc}</p>
                <ul className="space-y-2">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-[#4a5568]">
                      <i className="ri-checkbox-circle-fill text-[#1e6b8a]"></i>{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          双代币架构 — 架构流程图
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">双代币架构</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">资产凭证与所有权凭证清晰分离，在资产不离开托管的前提下实现流动性</p>
          </div>

          <div className="bg-[#f7fbfe] rounded-3xl p-8 border border-[#e8f4fb]">
            <div className="bg-gradient-to-r from-[#1e6b8a] to-[#155a75] rounded-2xl p-5 text-center mb-4 shadow-md">
              <p className="text-white/70 text-xs font-medium mb-1 tracking-widest uppercase">DACC RWA Platform</p>
              <p className="text-white text-xl font-bold">代币发行引擎</p>
              <div className="flex justify-center gap-4 mt-3">
                {['上传', '审核', '确认', '链上发行'].map((t) => (
                  <span key={t} className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-0.5 h-8 bg-[#b8d9ed]"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-6 border border-[#b8d9ed] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                    <i className="ri-file-shield-line text-[#1e6b8a] text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[#1e6b8a] font-bold text-sm">Issuance Token</p>
                    <p className="text-[#4a5568] text-xs">资产凭证（Proof of Asset）</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">代表底层资产本体</div>
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">内含发行细节、资产信息、佐证文件、签章</div>
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">用于「资产存在与真实性」的可验证凭证</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[#b8d9ed] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#fef3c7] rounded-lg flex items-center justify-center">
                    <i className="ri-user-star-line text-[#d97706] text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[#1e6b8a] font-bold text-sm">Ownership Token</p>
                    <p className="text-[#4a5568] text-xs">所有权凭证（Proof of Ownership）</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">代表底层资产所有权（可分割）</div>
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">所有权转移可链上留痕</div>
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">在「资产不离开托管」前提下保有流动性</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-0.5 h-8 bg-[#b8d9ed]"></div>
            </div>
            <div className="bg-[#1e3a4a] rounded-2xl p-5 text-center shadow-md">
              <p className="text-white/60 text-xs font-medium mb-1 tracking-widest uppercase">托管与交割层</p>
              <p className="text-white text-lg font-bold">托管钱包 · 券商分销 · 链上交割</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { icon: 'ri-tools-line', title: '无需替换现有系统', desc: 'DACC RWA 平台叠加在现有系统之上，保护您的既有投资' },
              { icon: 'ri-git-branch-line', title: '多种部署方式', desc: 'On-Prem、SaaS 或白标，选择最适合您机构的部署模式' },
              { icon: 'ri-verified-badge-line', title: '审计就绪设计', desc: '操作日志、权限控管与平台条款，完全满足审计要求' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-6 rounded-2xl border border-[#e8f4fb] hover:border-[#1e6b8a] transition-all duration-300">
                <div className="w-12 h-12 bg-[#e8f4fb] rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`${item.icon} text-xl text-[#1e6b8a]`}></i>
                </div>
                <div>
                  <h4 className="font-bold text-[#1e3a4a] mb-1">{item.title}</h4>
                  <p className="text-sm text-[#4a5568]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          标准化发行流程 — 4步骤
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-[#f7fbfe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">标准化发行流程</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">从资产上传到链上发行，清晰可重复的 4 步骤标准化工作流</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', icon: 'ri-upload-cloud-line', title: '上传资产信息', desc: '资产持有方于前台上传资产信息与佐证文件' },
              { step: '2', icon: 'ri-search-eye-line', title: '平台审核', desc: '平台管理者于后台审核并验证提交的资料' },
              { step: '3', icon: 'ri-check-double-line', title: '确认发行', desc: '资产持有方确认（acknowledge）发行参数与细节' },
              { step: '4', icon: 'ri-links-line', title: '链上发行', desc: '平台管理者执行链上代币发行至白名单地址' },
            ].map((item, idx) => (
              <div key={item.step} className="relative bg-white rounded-2xl p-7 border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300 text-center">
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <i className="ri-arrow-right-line text-[#b8d9ed] text-xl"></i>
                  </div>
                )}
                <div className="w-14 h-14 bg-[#e8f4fb] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#1e6b8a]">{item.step}</span>
                </div>
                <div className="w-10 h-10 bg-[#f7fbfe] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <i className={`${item.icon} text-xl text-[#1e6b8a]`}></i>
                </div>
                <h3 className="text-base font-bold text-[#1e3a4a] mb-2">{item.title}</h3>
                <p className="text-sm text-[#4a5568] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 bg-gradient-to-r from-[#e8f4fb] to-[#dbeafe] rounded-2xl border border-[#b8d9ed] text-center">
            <p className="text-[#1e6b8a] font-medium">从概念到链上发行 — 完全标准化、可审计、可重复的工作流程</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          平台核心能力 — 6格图标卡片
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">平台核心能力</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">管理代币化真实世界资产完整生命周期所需的一切能力</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'ri-upload-cloud-line', title: '资产上传与审核流程', desc: '结构化上传工作流，支持多级审核与审批，确保代币化资产合规入库' },
              { icon: 'ri-settings-3-line', title: '发行参数设定', desc: '灵活配置代币供应量、转让规则、白名单地址等发行参数' },
              { icon: 'ri-file-text-line', title: '文件管理', desc: '安全上传与管理资产证明文件，并与链上 URI 永久链接' },
              { icon: 'ri-time-line', title: '即时状态追踪', desc: '实时追踪发行状态、托管转移与所有权变更全流程' },
              { icon: 'ri-shield-check-line', title: '链上可验证内容', desc: '所有资产数据与签章均可链上验证，确保完全透明' },
              { icon: 'ri-line-chart-line', title: '成本与操作轨迹可追踪', desc: '发行成本、操作记录与权限变更的完整审计轨迹' },
            ].map((cap) => (
              <div key={cap.title} className="p-7 rounded-2xl border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#e8f4fb] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1e6b8a] transition-colors duration-300">
                  <i className={`${cap.icon} text-2xl text-[#1e6b8a] group-hover:text-white transition-colors duration-300`}></i>
                </div>
                <h3 className="text-lg font-bold text-[#1e3a4a] mb-2">{cap.title}</h3>
                <p className="text-sm text-[#4a5568] leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          业务价值数据
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-[#f7fbfe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">可量化的业务价值</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">DACC RWA 平台为机构客户带来的实际改变</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '4步骤', label: '标准化发行流程', sub: '可重复、可审计、合规就绪' },
              { value: '8+', label: '支持资产品类', sub: '债券、基金、碳权等多类资产' },
              { value: '100%', label: '链上可验证', sub: '所有发行资产完全透明' },
              { value: 'T+0', label: '托管转移', sub: '发行后即时进入托管钱包' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-8 border border-[#e8f4fb] text-center hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-[#1e6b8a] mb-2">{stat.value}</div>
                <div className="text-base font-semibold text-[#1e3a4a] mb-1">{stat.label}</div>
                <div className="text-sm text-[#4a5568]">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          监管对齐亮点
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">监管对齐亮点</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">从设计之初即满足机构合规与监管要求</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: 'ri-team-line', title: '法律与专业机构协作', desc: '与法律与第三方专业机构协作，支持法遵落地' },
              { icon: 'ri-server-line', title: '灵活部署', desc: '平台支持 On-Prem / SaaS 弹性部署，满足数据主权要求' },
              { icon: 'ri-file-list-3-line', title: '审计就绪', desc: '平台条款、操作日志、权限控管可满足审计需求' },
              { icon: 'ri-shield-check-line', title: '完整合规闭环', desc: '可结合托管与交割方案，形成端到端完整合规闭环' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-6 rounded-2xl border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-[#e8f4fb] rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`${item.icon} text-xl text-[#1e6b8a]`}></i>
                </div>
                <div>
                  <h4 className="font-bold text-[#1e3a4a] mb-1">{item.title}</h4>
                  <p className="text-sm text-[#4a5568]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA — 深色渐变
      ══════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=deep%20teal%20dark%20ocean%20abstract%20background%20with%20soft%20glowing%20golden%20light%20particles%20and%20subtle%20digital%20grid%20lines%2C%20professional%20fintech%20tokenization%20atmosphere%2C%20wide%20cinematic%20composition%2C%20no%20text%2C%20no%20people&width=1440&height=600&seq=rwazh002&orientation=landscape"
            alt="CTA Background"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f3d52]/90 to-[#1e6b8a]/85"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            让 RWA 代币化从「概念验证」<br />走向「可发行、可托管、可分销」
          </h2>
          <p className="text-xl text-white/75 mb-10 max-w-2xl mx-auto">
            联络 DACC 团队，启动你的资产代币化项目，从第一天起即可发行、托管与分销
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-[#f5b942] hover:bg-[#e0a830] text-[#1e3a4a] px-10 py-4 rounded-full font-bold transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg">
              立即联系
            </a>
            <a href="/contact" className="bg-white/10 border border-white/40 hover:bg-white/20 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              索取合规框架
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#1e6b8a] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png" alt="DACC Logo" className="h-20 w-auto object-contain mb-4" />
              <p className="text-white/80 text-sm leading-relaxed">引领数字清算与结算的下一个十年</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">快速链接</h4>
              <div className="space-y-2">
                <a href="/#Services" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-sm hover:translate-x-2 transform">服务</a>
                <a href="/#use-cases" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-sm hover:translate-x-2 transform">应用案例</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">资源</h4>
              <div className="space-y-2">
                <a href="/#ecosystem" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-sm hover:translate-x-2 transform">投资者</a>
                <a href="/blog" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-sm hover:translate-x-2 transform">新闻</a>
                <a href="/contact" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-sm hover:translate-x-2 transform">联系我们</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">联系方式</h4>
              <p className="text-white/80 text-sm">邮箱：info@dacc.hk</p>
              <div className="flex space-x-4 mt-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#f5b942] transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/80 text-sm">Copyright © 2026 Digital Asset Clearing Center (DACC). All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
