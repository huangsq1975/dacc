import { useState, useEffect } from 'react';

export default function ChainFusionZH() {
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
                    <a href="/rwa-platform" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">RWA 代币化平台</a>
                    <a href="/chain-fusion" className="block px-4 py-2 text-sm text-[#f5b942] font-semibold hover:bg-[#e8f4fb] transition-colors">ChainFusion</a>
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
            <a href="/chain-fusion-en" className="bg-[#e8f4fb] border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] whitespace-nowrap font-medium">English</a>
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
                <a href="/rwa-platform" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] border-b border-white/20">RWA 代币化平台</a>
                <a href="/chain-fusion" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-[#f5b942] border-b border-white/20">ChainFusion</a>
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
        <a href="/chain-fusion-en" className="bg-white/80 backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 font-medium shadow-md whitespace-nowrap cursor-pointer">English</a>
      </div>

      {/* ══════════════════════════════════════
          HERO — 深色渐变背景 + 居中内容
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=abstract%20dark%20teal%20blue%20gradient%20background%20with%20glowing%20network%20nodes%20and%20blockchain%20chain%20links%20flowing%20across%20a%20deep%20ocean%20blue%20canvas%2C%20soft%20light%20rays%2C%20futuristic%20fintech%20atmosphere%2C%20ultra%20wide%20cinematic%20composition%2C%20no%20text&width=1440&height=900&seq=cf001&orientation=landscape"
            alt="ChainFusion Hero"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f3d52]/80 via-[#1e6b8a]/70 to-[#0f3d52]/90"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 pt-24">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 rounded-full px-5 py-2 mb-8">
            <div className="w-2 h-2 bg-[#f5b942] rounded-full animate-pulse"></div>
            <span className="text-sm text-white/90 font-medium tracking-wide">完整平台架构</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Chain Fusion
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-4 leading-relaxed">
            跨系统 · 跨币种 · 跨监管场景的秒级清算网关
          </p>
          <p className="text-base text-white/60 max-w-2xl mx-auto mb-10">
            以「传统支付系统 + 区块链网络 + 合规引擎」三位一体架构，为金融机构提供从接入到监管报告的全流程清算即服务（CaaS）
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-[#f5b942] hover:bg-[#e0a830] text-[#1e3a4a] px-8 py-4 rounded-full font-bold transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg">
              预约架构评估
            </a>
            <a href="/contact" className="bg-white/10 border border-white/40 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              索取技术白皮书
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <i className="ri-arrow-down-line text-white/50 text-2xl"></i>
        </div>
      </section>

      {/* ══════════════════════════════════════
          接入生态 — 合作系统 Logo 网格
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">接入生态</h2>
          <p className="text-[#4a5568] mb-14 max-w-xl mx-auto">与全球主流支付系统、区块链网络及合规基础设施无缝对接</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mb-10">
            {[
              { icon: 'ri-bank-line', label: 'CIPS' },
              { icon: 'ri-exchange-dollar-line', label: 'RTGS' },
              { icon: 'ri-speed-line', label: 'FPS' },
              { icon: 'ri-global-line', label: 'SWIFT' },
              { icon: 'ri-links-line', label: 'Mbridge' },
              { icon: 'ri-coin-line', label: 'Ant Chain' },
              { icon: 'ri-currency-line', label: 'DCEP' },
              { icon: 'ri-bit-coin-line', label: 'Ethereum' },
              { icon: 'ri-shield-check-line', label: 'OFAC' },
              { icon: 'ri-file-list-3-line', label: 'Travel Rule' },
              { icon: 'ri-user-search-line', label: 'KYC/AML' },
              { icon: 'ri-government-line', label: 'HKMA' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center justify-center p-4 rounded-2xl border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-md transition-all duration-300 cursor-default group">
                <div className="w-10 h-10 flex items-center justify-center mb-2">
                  <i className={`${item.icon} text-2xl text-[#1e6b8a] group-hover:text-[#f5b942] transition-colors`}></i>
                </div>
                <span className="text-xs font-semibold text-[#4a5568] group-hover:text-[#1e6b8a] transition-colors">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="inline-flex items-center gap-2 bg-[#1e6b8a] hover:bg-[#155a75] text-white px-7 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              查看全部接入方案<i className="ri-arrow-right-line"></i>
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 border border-[#1e6b8a] text-[#1e6b8a] hover:bg-[#e8f4fb] px-7 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              申请集成
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          四层架构 — 2×2 卡片
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-[#f7fbfe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">五层核心架构</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">模块化、可扩展的架构设计，专为灵活性与高可用性而生</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: 'ri-plug-line',
                color: 'bg-[#dbeafe]',
                iconColor: 'text-[#1e6b8a]',
                title: '接入层（Access）',
                desc: '传统支付系统与区块链网络的统一适配接入',
                points: ['CIPS / CNAP / RTGS / FPS', 'Mbridge / Ant Chain / DCEP', 'EVM 兼容链 & 私有链'],
              },
              {
                icon: 'ri-swap-line',
                color: 'bg-[#fef3c7]',
                iconColor: 'text-[#d97706]',
                title: '转换层（Conversion）',
                desc: '多格式报文与多币种的智能映射转换',
                points: ['ISO 20022 / MT / JSON 格式互转', '法币 ↔ 稳定币 ↔ CBDC 映射', '汇率引擎与费率计算'],
              },
              {
                icon: 'ri-route-line',
                color: 'bg-[#d1fae5]',
                iconColor: 'text-[#059669]',
                title: '业务层（Business）',
                desc: '动态路由、清算对账与差错处理的核心引擎',
                points: ['毫秒级动态路由选路', 'T+0 双向对账机制', '幂等状态机防双花'],
              },
              {
                icon: 'ri-shield-check-line',
                color: 'bg-[#ede9fe]',
                iconColor: 'text-[#7c3aed]',
                title: '合规层（Compliance）',
                desc: '内建合规流水线，事中控制替代事后补救',
                points: ['OFAC / UN 制裁名单筛查', 'AML / CTF / Travel Rule', '外汇管制校验与申报'],
              },
            ].map((layer) => (
              <div key={layer.title} className="bg-white rounded-2xl p-8 border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 ${layer.color} rounded-xl flex items-center justify-center mb-5`}>
                  <i className={`${layer.icon} text-2xl ${layer.iconColor}`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#1e3a4a] mb-2">{layer.title}</h3>
                <p className="text-[#4a5568] text-sm mb-4">{layer.desc}</p>
                <ul className="space-y-2">
                  {layer.points.map((p) => (
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
          灵活集成选项 — 架构流程图
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">灵活集成选项</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">Chain Fusion 可无缝叠加在您现有的核心银行系统之上，无需替换原有基础设施</p>
          </div>

          {/* Architecture Diagram */}
          <div className="bg-[#f7fbfe] rounded-3xl p-8 border border-[#e8f4fb]">
            {/* Top: ChainFusion Platform */}
            <div className="bg-gradient-to-r from-[#1e6b8a] to-[#155a75] rounded-2xl p-5 text-center mb-4 shadow-md">
              <p className="text-white/70 text-xs font-medium mb-1 tracking-widest uppercase">DACC</p>
              <p className="text-white text-xl font-bold">Chain Fusion 网关平台</p>
              <div className="flex justify-center gap-4 mt-3">
                {['接入', '转换', '路由', '合规'].map((t) => (
                  <span key={t} className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center mb-4">
              <div className="w-0.5 h-8 bg-[#b8d9ed]"></div>
            </div>

            {/* Middle: Two paths */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-5 border border-[#b8d9ed] shadow-sm">
                <p className="text-[#1e6b8a] font-bold text-sm mb-2">传统金融接入</p>
                <div className="space-y-2">
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">CIPS / CNAP（人民币）</div>
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">RTGS / FPS（港元）</div>
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">SWIFT（国际电汇）</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-[#b8d9ed] shadow-sm">
                <p className="text-[#1e6b8a] font-bold text-sm mb-2">区块链直连</p>
                <div className="space-y-2">
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">Mbridge / DCEP（数字人民币）</div>
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">Ethereum / EVM 兼容链</div>
                  <div className="bg-[#e8f4fb] rounded-lg px-3 py-2 text-xs text-[#1e6b8a] font-medium">Ant Chain / 私有链</div>
                </div>
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center mb-4">
              <div className="w-0.5 h-8 bg-[#b8d9ed]"></div>
            </div>

            {/* Bottom: Core Banking */}
            <div className="bg-[#1e3a4a] rounded-2xl p-5 text-center shadow-md">
              <p className="text-white/60 text-xs font-medium mb-1 tracking-widest uppercase">您的现有系统</p>
              <p className="text-white text-lg font-bold">核心银行 / 支付系统</p>
              <div className="flex justify-center gap-4 mt-3">
                {['Jack Henry', 'Temenos', 'Finastra'].map((t) => (
                  <span key={t} className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Three benefits below */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { icon: 'ri-tools-line', title: '无需替换', desc: 'Chain Fusion 叠加在现有系统之上，保护您的既有投资' },
              { icon: 'ri-git-branch-line', title: '多种部署方式', desc: '通过 API、私有部署或白标方式灵活集成，满足不同场景' },
              { icon: 'ri-verified-badge-line', title: '安全合规', desc: '内建金融级合规能力，处理监管复杂性，让您专注业务' },
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
          动态路由机制
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-[#f7fbfe]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">动态路由机制</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">基于交易属性与规则引擎，毫秒级自动选择最优清算路径</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { currency: 'DCEP / 数字人民币', icon: 'ri-currency-cny-line', routes: [{ label: '境内', path: 'CNAP', color: 'bg-[#dbeafe] text-[#1e6b8a]' }, { label: '跨境', path: 'Mbridge', color: 'bg-[#fef3c7] text-[#d97706]' }] },
              { currency: 'CNH / 离岸人民币', icon: 'ri-exchange-dollar-line', routes: [{ label: '大额', path: 'CIPS', color: 'bg-[#dbeafe] text-[#1e6b8a]' }, { label: '小额', path: '稳定币链路', color: 'bg-[#d1fae5] text-[#059669]' }] },
              { currency: 'HKD / 港元', icon: 'ri-bank-line', routes: [{ label: '大额', path: 'RTGS', color: 'bg-[#dbeafe] text-[#1e6b8a]' }, { label: '小额', path: 'FPS', color: 'bg-[#ede9fe] text-[#7c3aed]' }] },
            ].map((item) => (
              <div key={item.currency} className="bg-white rounded-2xl p-7 border border-[#e8f4fb] hover:border-[#1e6b8a] hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-[#e8f4fb] rounded-xl flex items-center justify-center mb-4">
                  <i className={`${item.icon} text-2xl text-[#1e6b8a]`}></i>
                </div>
                <h3 className="text-lg font-bold text-[#1e3a4a] mb-4">{item.currency}</h3>
                <div className="space-y-3">
                  {item.routes.map((r) => (
                    <div key={r.label} className="flex items-center justify-between">
                      <span className="text-sm text-[#4a5568]">{r.label}交易</span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${r.color}`}>{r.path}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 bg-gradient-to-r from-[#e8f4fb] to-[#dbeafe] rounded-2xl border border-[#b8d9ed] text-center">
            <p className="text-[#1e6b8a] font-medium">在确保合规前提下，持续优化成本与到账时效 — 从 T+1 缩短至<strong>秒级到账</strong></p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          平台能力 — 6格图标卡片
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] mb-4">平台核心能力</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto">提供现代化清算体验所需的一切能力</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'ri-shield-keyhole-line', title: '企业级安全', desc: '端到端加密、HSM 硬件保护、多重签名审批，通过 SOC 2 Type II 认证' },
              { icon: 'ri-flashlight-line', title: '实时处理', desc: '毫秒级路由决策，支持高并发交易，99.99% 系统可用性保障' },
              { icon: 'ri-building-4-line', title: '现代化架构', desc: '微服务架构，支持水平扩展，云原生部署，弹性应对业务峰值' },
              { icon: 'ri-bar-chart-grouped-line', title: '高级分析', desc: '实时交易监控、风险预警、监管报表自动生成，全链路可视化' },
              { icon: 'ri-palette-line', title: '白标定制', desc: '完全可定制的品牌界面，API 优先设计，快速融入您的产品体系' },
              { icon: 'ri-earth-line', title: '全球扩展', desc: '支持 150+ 国家和地区，多语言、多时区、多监管框架并行处理' },
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
            <p className="text-[#4a5568] max-w-xl mx-auto">Chain Fusion 为客户带来的实际改变</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '秒级', label: '清算时效', sub: '从 T+1 缩短至秒级到账' },
              { value: '99.99%', label: '系统可用性', sub: '金融级 SLA 保障' },
              { value: '↓60%', label: '合规成本', sub: '事中控制替代事后补救' },
              { value: '150+', label: '覆盖国家/地区', sub: '全球多监管框架支持' },
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
          CTA — 深色渐变
      ══════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=deep%20teal%20dark%20ocean%20abstract%20background%20with%20soft%20glowing%20light%20particles%20and%20subtle%20grid%20lines%2C%20professional%20fintech%20atmosphere%2C%20wide%20cinematic%20composition%2C%20no%20text%2C%20no%20people&width=1440&height=600&seq=cf002&orientation=landscape"
            alt="CTA Background"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f3d52]/90 to-[#1e6b8a]/85"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            准备好体验 Chain Fusion<br />平台了吗？
          </h2>
          <p className="text-xl text-white/75 mb-10 max-w-2xl mx-auto">
            预约个性化演示，探索 DACC Chain Fusion 如何将您的跨境清算从「多系统拼接」升级为「清算即服务（CaaS）」
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-[#f5b942] hover:bg-[#e0a830] text-[#1e3a4a] px-10 py-4 rounded-full font-bold transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg">
              预约演示
            </a>
            <a href="/contact" className="bg-white/10 border border-white/40 hover:bg-white/20 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer">
              申请 PoC
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
