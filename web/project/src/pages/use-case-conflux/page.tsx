
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UseCaseConflux() {
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
            <img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" alt="DACC Logo" className="h-8 w-auto object-contain" />
          </a>
          <div className="flex items-center space-x-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="bg-[#e8f4fb] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 text-sm">
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
            <a href="/use-case-conflux" className="bg-[#e8f4fb] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium">
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
        <a href="/use-case-conflux" className="bg-white/80 backdrop-blur-md border border-[#b8d9ed] rounded-full px-3 md:px-4 py-2 text-xs md:text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium shadow-md">
          English
        </a>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-[#1e6b8a] mb-6">Conflux x DACC</h1>
            <p className="text-xl text-[#4a5568] max-w-3xl mx-auto">基于多链支持的高性能公链资产托管解决方案</p>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1e6b8a] mb-12 text-center">项目概述</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-links-line text-3xl text-[#1e6b8a]"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">技术背景</h3>
              <p className="text-[#4a5568] leading-relaxed">Conflux 树图链是一条高性能的公链，采用独特的树图结构共识算法，实现了高吞吐量和低延迟的交易处理能力。作为中国唯一合规的公链，Conflux 在数字资产领域具有重要的战略地位。</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-3xl text-[#1e6b8a]"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#1e6b8a] mb-4">合作方案</h3>
              <p className="text-[#4a5568] leading-relaxed">DACC 为 Conflux 提供多资产代币化平台，原生支持 Hyperledger、Canton、Ethereum 和 Conflux 的即插即用跨链桥接，实现安全、高效的数字资产管理，支持 Conflux 生态的快速发展。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1e6b8a] mb-12 text-center">核心功能</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-wallet-3-line text-3xl text-[#1e6b8a]"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-4">多链资产托管</h3>
              <p className="text-[#4a5568] leading-relaxed">支持 Conflux 网络的多签热钱包服务，实现快速的资产转移和交易处理，满足高频交易需求。</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-safe-2-line text-3xl text-[#1e6b8a]"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-4">跨境结算支持</h3>
              <p className="text-[#4a5568] leading-relaxed">提供符合金融级安全标准的冷钱包托管服务，采用多重签名和离线存储，确保大额资产的绝对安全。</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all">
              <div className="w-16 h-16 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-exchange-line text-3xl text-[#1e6b8a]"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-4">企业级安全</h3>
              <p className="text-[#4a5568] leading-relaxed">通过 ChainFusion 技术，实现 Conflux 与其他区块链网络的资产互通，扩展生态应用场景。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1e6b8a] mb-12 text-center">技术架构</h2>
          <div className="bg-white/70 backdrop-blur-sm p-12 rounded-2xl border border-[#b8d9ed]">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-[#1e6b8a] mb-6">热钱包层</h3>
                <ul className="space-y-4">
                  <li className="flex items-start"><i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-3 mt-1"></i><span className="text-[#4a5568]">支持 Conflux 原生代币 CFX 及 CRC-20 代币</span></li>
                  <li className="flex items-start"><i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-3 mt-1"></i><span className="text-[#4a5568]">多签名机制保障交易安全</span></li>
                  <li className="flex items-start"><i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-3 mt-1"></i><span className="text-[#4a5568]">实时监控和风险预警系统</span></li>
                  <li className="flex items-start"><i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-3 mt-1"></i><span className="text-[#4a5568]">高性能交易处理引擎</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1e6b8a] mb-6">冷钱包层</h3>
                <ul className="space-y-4">
                  <li className="flex items-start"><i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-3 mt-1"></i><span className="text-[#4a5568]">离线签名和密钥管理</span></li>
                  <li className="flex items-start"><i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-3 mt-1"></i><span className="text-[#4a5568]">多重审批流程</span></li>
                  <li className="flex items-start"><i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-3 mt-1"></i><span className="text-[#4a5568]">硬件安全模块（HSM）保护</span></li>
                  <li className="flex items-start"><i className="ri-checkbox-circle-fill text-[#1e6b8a] text-xl mr-3 mt-1"></i><span className="text-[#4a5568]">灾难恢复和备份机制</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Value */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1e6b8a] mb-12 text-center">业务价值</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] text-center hover:border-[#1e6b8a] transition-all">
              <div className="w-20 h-20 bg-[#dbeafe] rounded-full flex items-center justify-center mx-auto mb-6"><i className="ri-shield-check-line text-4xl text-[#1e6b8a]"></i></div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-4">安全合规</h3>
              <p className="text-[#4a5568]">符合金融监管要求，通过多项安全认证</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] text-center hover:border-[#1e6b8a] transition-all">
              <div className="w-20 h-20 bg-[#dbeafe] rounded-full flex items-center justify-center mx-auto mb-6"><i className="ri-speed-line text-4xl text-[#1e6b8a]"></i></div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-4">高效处理</h3>
              <p className="text-[#4a5568]">支持高并发交易，满足业务快速增长需求</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] text-center hover:border-[#1e6b8a] transition-all">
              <div className="w-20 h-20 bg-[#dbeafe] rounded-full flex items-center justify-center mx-auto mb-6"><i className="ri-money-dollar-circle-line text-4xl text-[#1e6b8a]"></i></div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-4">成本优化</h3>
              <p className="text-[#4a5568]">降低资产管理成本，提升运营效率</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] text-center hover:border-[#1e6b8a] transition-all">
              <div className="w-20 h-20 bg-[#dbeafe] rounded-full flex items-center justify-center mx-auto mb-6"><i className="ri-team-line text-4xl text-[#1e6b8a]"></i></div>
              <h3 className="text-xl font-bold text-[#1e6b8a] mb-4">生态支持</h3>
              <p className="text-[#4a5568]">助力 Conflux 生态项目快速发展</p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Results */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1e6b8a] mb-12 text-center">实施成果</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] text-center">
              <div className="text-5xl font-bold text-[#1e6b8a] mb-4">99.99%</div>
              <p className="text-[#4a5568] text-lg">系统可用性</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] text-center">
              <div className="text-5xl font-bold text-[#1e6b8a] mb-4">&lt;3s</div>
              <p className="text-[#4a5568] text-lg">平均交易确认时间</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-[#b8d9ed] text-center">
              <div className="text-5xl font-bold text-[#1e6b8a] mb-4">100%</div>
              <p className="text-[#4a5568] text-lg">资产安全保障</p>
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
              <h2 className="text-3xl font-bold mb-4">了解更多解决方案</h2>
              <p className="text-xl text-white/80 mb-8">探索 DACC 如何为您的区块链项目提供专业的资产托管服务</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="bg-white text-[#1e6b8a] px-8 py-4 rounded-full font-bold hover:bg-[#f5b942] hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2">
                  <span>联系我们</span><i className="ri-arrow-right-line"></i>
                </a>
                <a href="/use-case" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#1e6b8a] transition-all duration-300 cursor-pointer whitespace-nowrap">
                  更多案例
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
