
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UseCaseVATP() {
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
    <div className="min-h-screen bg-gradient-to-br from-[#e8f4fb] via-[#b8d9ed] to-[#1e6b8a]">
      {/* Floating Navigation - Desktop */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
        <nav className={`${scrolled ? 'bg-white/90' : 'bg-white/70'} backdrop-blur-md border border-[#b8d9ed] rounded-full px-6 py-3 transition-all duration-300 shadow-lg`}>
          <div className="flex items-center justify-center space-x-8">
            <a href="/" className="cursor-pointer flex-shrink-0">
              <img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" alt="DACC Logo" className="h-6 w-auto object-contain" />
            </a>
            <button onClick={() => handleNavigateWithHash('/', 'Services')} className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              服务
            </button>
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
            <button onClick={() => handleNavigateWithHash('/', 'ecosystem')} className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
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
          <a href="/" className="block cursor-pointer">
            <img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" alt="DACC Logo" className="h-8 w-auto object-contain" />
          </a>
          <div className="flex items-center space-x-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="bg-[#e8f4fb] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 text-sm">
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
            <a href="/use-case-vatp-en" className="bg-[#e8f4fb] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium">
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
        <a href="/use-case-vatp-en" className="bg-white/80 backdrop-blur-md border border-[#b8d9ed] rounded-full px-3 md:px-4 py-2 text-xs md:text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium shadow-md">
          English
        </a>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white/30 rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="bg-[#f5b942]/20 border border-[#f5b942] text-[#1e3a4a] px-4 py-2 rounded-full text-sm font-semibold">客户成功案例</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#1e6b8a] mb-6 leading-tight">服务香港持牌 VATP 交易所的托管实践</h1>
          <p className="text-xl text-[#4a5568] max-w-3xl mx-auto leading-relaxed">DACC × 香港持牌 VATP：以 DACCHSM 冷热钱包托管支持合规交易运营</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Introduction Card */}
          <div className="bg-gradient-to-br from-[#1e6b8a] to-[#0f4c5c] rounded-3xl p-12 mb-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-shield-check-line text-white text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">背景介绍</h2>
                  <p className="text-white/80 text-lg">合作伙伴与业务场景</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-white/95 mb-6">DACC 已与两家获得香港证监会授权的虚拟资产交易平台（VATP）建立深度合作关系：</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-2">PantherTrade</h3>
                  <p className="text-white/80 text-sm">香港证监会授权下全资主体</p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-2">YAX</h3>
                  <p className="text-white/80 text-sm">老虎证券旗下全资主体</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-white/95 mt-6">DACC 已与以上两家持牌交易平台签订合作协议，并提供机构级的数字资产托管服务，基于 DACCHSM 冷热钱包托管方案，支持香港持牌交易平台的数字资产托管能力。</p>
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-white/80 text-sm mb-4 uppercase tracking-widest font-semibold">MOU 合作伙伴</p>
                <div className="flex flex-wrap items-center gap-4">
                  <a href="https://www.panthertrade.com" target="_blank" rel="noopener noreferrer" className="flex items-center bg-white/10 border border-white/20 hover:border-[#f5b942] rounded-xl px-6 py-4 transition-all duration-300 cursor-pointer group">
                    <div className="w-36 h-10 flex items-center justify-center space-x-2">
                      <img src="https://www.panthertrade.com/client/img/icon.5265cbf.svg" alt="PantherTrade" className="h-8 w-8 object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                      <span className="text-white font-bold text-base group-hover:text-[#f5b942] transition-colors whitespace-nowrap">PantherTrade</span>
                    </div>
                  </a>
                  <a href="https://www.yax.hk" target="_blank" rel="noopener noreferrer" className="flex items-center bg-white/10 border border-white/20 hover:border-[#f5b942] rounded-xl px-6 py-4 transition-all duration-300 cursor-pointer group">
                    <div className="w-24 h-10 flex items-center justify-center">
                      <img src="https://www.yax.hk/logo.svg" alt="YAX" className="h-8 w-auto object-contain" onError={(e) => { const t = e.currentTarget; t.style.display = 'none'; const f = t.nextElementSibling as HTMLElement; if (f) f.style.display = 'flex'; }} />
                      <div className="hidden items-center space-x-1"><span className="text-[#f5b942] font-bold text-xl">≋</span><span className="text-white font-bold text-xl group-hover:text-[#f5b942] transition-colors">YAX</span></div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Background & Objectives */}
          <div className="bg-white/50 rounded-3xl p-12 mb-16 border border-[#b8d9ed]">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-[#1e6b8a] to-[#0f4c5c] rounded-xl flex items-center justify-center">
                <i className="ri-flag-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1e6b8a]">背景与目标</h3>
                <p className="text-[#4a5568]">Background &amp; Objectives</p>
              </div>
            </div>
            <p className="text-[#4a5568] leading-relaxed mb-6">随着香港虚拟资产监管体系逐步完善，持牌 VATP 对托管基础设施的要求日益严格。交易平台需要满足以下核心要求：</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-4"><i className="ri-shield-check-line text-[#1e6b8a] text-xl"></i></div>
                <h4 className="font-bold text-[#1e6b8a] mb-2">满足监管要求下的安全与合规要求</h4>
                <p className="text-sm text-[#4a5568]">符合香港证监会对虚拟资产托管的严格标准</p>
              </div>
              <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-4"><i className="ri-coins-line text-[#1e6b8a] text-xl"></i></div>
                <h4 className="font-bold text-[#1e6b8a] mb-2">兼顾冷热钱包资产与运营效率</h4>
                <p className="text-sm text-[#4a5568]">平衡安全性与交易效率的双重需求</p>
              </div>
              <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-4"><i className="ri-lock-line text-[#1e6b8a] text-xl"></i></div>
                <h4 className="font-bold text-[#1e6b8a] mb-2">降低人工操作带来的风险</h4>
                <p className="text-sm text-[#4a5568]">通过自动化减少人为错误和安全风险</p>
              </div>
              <div className="bg-white/70 rounded-xl p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-4"><i className="ri-line-chart-line text-[#1e6b8a] text-xl"></i></div>
                <h4 className="font-bold text-[#1e6b8a] mb-2">为后续业务扩展预留可扩展架构</h4>
                <p className="text-sm text-[#4a5568]">支持未来业务增长和新功能扩展</p>
              </div>
            </div>
          </div>

          {/* Client Challenges */}
          <div className="bg-white/50 rounded-3xl p-12 mb-16 border border-[#b8d9ed]">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-[#1e6b8a] to-[#0f4c5c] rounded-xl flex items-center justify-center">
                <i className="ri-error-warning-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1e6b8a]">客户挑战</h3>
                <p className="text-[#4a5568]">Client Challenges</p>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { num: '1', title: '安全与效率需要平衡', desc: '单纯冷钱包储存虽安全但不支持高频交易需求；纯热钱包又存在较高安全风险；出入金流程需要兼顾安全与风险控制。' },
                { num: '2', title: '机构化流程管理要求', desc: '需要更严密的审批和操作流程，出入金流程需要多层级审批和风险控制。' },
                { num: '3', title: '可持续运维压力', desc: '随着业务场景扩大，托管系统需要具备高可用性与扩展能力，并能够支持多链资产与标准化的扩展。' },
              ].map(item => (
                <div key={item.num} className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed]">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-[#dbeafe] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#1e6b8a] font-bold">{item.num}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#1e6b8a] mb-2">{item.title}</h4>
                      <p className="text-[#4a5568]">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DACC Solution */}
          <div className="bg-white/50 rounded-3xl p-12 mb-16 border border-[#b8d9ed]">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-[#1e6b8a] to-[#0f4c5c] rounded-xl flex items-center justify-center">
                <i className="ri-lightbulb-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1e6b8a]">DACC 解决方案</h3>
                <p className="text-[#4a5568]">DACC Solution</p>
              </div>
            </div>
            <p className="text-[#4a5568] leading-relaxed mb-8">DACC 为合作伙伴提供 DACCHSM 冷热钱包托管方案，核心包括：</p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                { icon: 'ri-database-2-line', title: '冷热钱包分层架构', desc: '实现资产安全与交易效率的平衡' },
                { icon: 'ri-shield-keyhole-line', title: 'HSM 级别安全基础设施', desc: '强化密钥保护与签名操作的安全控制' },
                { icon: 'ri-git-branch-line', title: '转账流程自动化支持', desc: '面向热钱包的自动化，支持持续运营与后台扩展' },
                { icon: 'ri-timer-line', title: '机构级服务协议', desc: '面向持牌平台，支持持续运营与后台扩展' },
              ].map(item => (
                <div key={item.title} className="bg-gradient-to-br from-[#1e6b8a]/20 to-[#0f4c5c]/20 rounded-2xl p-8 border border-[#b8d9ed]">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                      <i className={`${item.icon} text-[#1e6b8a] text-2xl`}></i>
                    </div>
                    <h4 className="text-xl font-bold text-[#1e6b8a]">{item.title}</h4>
                  </div>
                  <p className="text-[#4a5568] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Business Value */}
          <div className="bg-white/50 rounded-3xl p-12 mb-16 border border-[#b8d9ed]">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-[#1e6b8a] to-[#0f4c5c] rounded-xl flex items-center justify-center">
                <i className="ri-trophy-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1e6b8a]">业务价值</h3>
                <p className="text-[#4a5568]">Business Value</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: '为持牌 VATP 场景提供可靠的基础设施托管', desc: '使其能够专注于核心业务运营，提升平台运营效率。' },
                { title: '降低托管基础设施风险', desc: '提升平台运营效率与合规性。' },
                { title: '支持平台在合规框架下的业务扩展', desc: '并为未来业务场景化与产品创新提供扩展。' },
                { title: '强化机构客户信任', desc: '对于合规与专业服务的认可。' },
              ].map(item => (
                <div key={item.title} className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 bg-[#dbeafe] rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl"></i>
                  </div>
                  <p className="text-[#4a5568] leading-relaxed"><strong className="text-[#1e6b8a]">{item.title}</strong>，{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#1e6b8a] to-[#0f4c5c] rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">准备好开始了吗？</h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">加入 DACC 生态，让您的业务连接全球稳定币市场</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="bg-white text-[#1e6b8a] px-8 py-4 rounded-full font-bold hover:bg-[#f5b942] hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <span>联系我们</span><i className="ri-arrow-right-line"></i>
                </a>
                <a href="https://www.dacc.hk" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#1e6b8a] transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2 transform hover:-translate-y-1">
                  <span>了解更多</span><i className="ri-external-link-line"></i>
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
                <img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png" alt="DACC Logo" className="h-20 w-auto object-contain" />
              </div>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">引领数字清算与结算的下一个十年</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">快速链接</h4>
              <div className="space-y-2">
                <button onClick={() => handleNavigateWithHash('/', 'Services')} className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left">服务</button>
                <button onClick={() => handleNavigateWithHash('/', 'use-cases')} className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left">应用案例</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">资源</h4>
              <div className="space-y-2">
                <button onClick={() => handleNavigateWithHash('/', 'ecosystem')} className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left">投资者</button>
                <a href="/blog" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">新闻</a>
                <a href="/contact" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">联系我们</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">联系方式</h4>
              <p className="text-white/80 text-xs md:text-sm">邮箱：info@dacc.hk</p>
              <div className="flex space-x-4 mt-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#f5b942] transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 md:pt-8 text-center">
            <p className="text-white/80 text-xs md:text-sm">Copyright © 2026 Digital Asset Clearing Center (DACC). All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
