import { useState, useEffect } from 'react';

export default function NewsChainFusion() {
  const [scrolled, setScrolled] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-[#e8f4fb] via-[#b8d9ed] to-[#1e6b8a] text-[#1e3a4a]">
      {/* Floating Navigation - Desktop */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
        <nav className={`${scrolled ? 'bg-white/90' : 'bg-white/80'} backdrop-blur-md border border-[#b8d9ed] rounded-full px-6 py-3 transition-all duration-300 shadow-lg`}>
          <div className="flex items-center justify-center space-x-8">
            <a href="/zh" className="cursor-pointer flex-shrink-0">
              <img
                src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png"
                alt="DACC Logo"
                className="h-6 w-auto object-contain"
              />
            </a>
            <a href="/zh#Services" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-semibold">
              服务
            </a>
            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-semibold">
                解决方案
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {solutionsDropdownOpen && (
                <div className="absolute left-0 pt-2 w-56 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/hot-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">热钱包集成</a>
                    <a href="/cold-wallet" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">冷钱包</a>
                    <a href="/rwa-platform" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">RWA 代币化平台</a>
                    <a href="/chain-fusion" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">ChainFusion</a>
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
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-semibold">
                应用场景
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${useCasesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {useCasesDropdownOpen && (
                <div className="absolute left-0 pt-2 w-64 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/use-case" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">全球商户 x DACC</a>
                    <a href="/use-case-ttl" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">TTL × DACC</a>
                    <a href="/use-case-conflux" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">Conflux x DACC</a>
                    <a href="/use-case-vatp" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#dbeafe] transition-colors">加密交易所 x DACC</a>
                  </div>
                </div>
              )}
            </div>
            <a href="/zh#ecosystem" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-semibold">
              投资者
            </a>
            <a href="/blog" className="text-[#f5b942] font-bold transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat">
              新闻
            </a>
            <a href="/contact" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm flex items-center whitespace-nowrap font-montserrat font-semibold">
              联系我们
              <i className="ri-arrow-right-up-line ml-1 text-xs"></i>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white/90 backdrop-blur-md border-b border-[#b8d9ed]">
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
              className="bg-[#dbeafe] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 text-sm"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
            <a href="/news-chainfusion-en" className="bg-[#dbeafe] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap">
              EN
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
                <a href="/zh#Services" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>服务</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <button onClick={() => setMobileSubmenu('solutions')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>解决方案</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button onClick={() => setMobileSubmenu('useCases')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>应用场景</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a href="/zh#ecosystem" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>投资者</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-[#f5b942] font-bold transition-colors border-b border-white/20">
                  <span>新闻</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>联系我们</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
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
          {mobileSubmenu === 'useCases' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">应用场景</span>
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

      {/* Language Switcher - Desktop */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <a href="/news-chainfusion-en" className="bg-white/80 backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg">
          EN
        </a>
      </div>

      {/* Hero Banner */}
      <section className="relative pt-32 pb-0 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-[#1e6b8a]/60 mb-8">
            <a href="/blog" className="hover:text-[#f5b942] transition-colors cursor-pointer">博客</a>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-[#1e6b8a]/80">新闻</span>
          </div>

          {/* Category & Date */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-[#f5b942]/80 text-[#1e3a4a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              新闻稿
            </span>
            <span className="bg-white/80 text-[#1e6b8a] px-4 py-1.5 rounded-full text-xs font-semibold">
              2026年2月12日
            </span>
            <span className="text-[#1e6b8a]/60 text-xs flex items-center gap-1">
              <i className="ri-global-line"></i>
              来源：AsiaBizToday
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-[#1e6b8a] leading-tight mb-6">
            DACC 正式发布 ChainFusion™，加速合规跨境代币化支付
          </h1>

          <p className="text-lg text-[#1e3a4a]/80 leading-relaxed mb-10">
            数字资产清算中心（DACC）正式推出 ChainFusion™ —— 一套新一代代币化金融市场基础设施，旨在提升跨境支付的速度、成本效率与监管合规性。
          </p>
        </div>

        {/* Hero Image */}
        <div className="max-w-4xl mx-auto px-6 mb-0">
          <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://readdy.ai/api/search-image?query=futuristic%20cross-border%20payment%20network%20with%20glowing%20digital%20nodes%20and%20blockchain%20connections%20on%20dark%20background%2C%20abstract%20financial%20technology%20visualization%20with%20teal%20and%20blue%20gradient%20light%20streams%20representing%20global%20tokenized%20transactions&width=1200&height=600&seq=chainfusionnewszh01&orientation=landscape"
              alt="DACC ChainFusion 跨境代币化支付"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Intro */}
              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  <strong className="text-[#1e6b8a]">香港，2026年2月12日</strong> — 数字资产清算中心（DACC）正式发布 ChainFusion™，这是一套全新的代币化金融市场基础设施平台，旨在提升跨境支付的速度、成本效率与监管合规性。
                </p>
              </div>

              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  该平台致力于打通链上区块链网络与链下传统金融体系之间的壁垒，实现实时对账，同时将监管合规直接嵌入交易流程。DACC 将 ChainFusion™ 定位为解决全球支付长期痛点的方案，涵盖结算周期慢、交易成本高、数据系统碎片化及监管壁垒等问题。
                </p>
              </div>

              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  据悉，ChainFusion™ 将多链协作与合规链下清算流程深度整合，尤其聚焦跨境人民币交易场景。DACC 表示，该平台可将人民币清算时间从数天压缩至数秒，同时降低交易成本，加速多币种支付流转。
                </p>
              </div>

              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  该平台还支持数字贸易融资流程，并可实现固定收益类真实世界资产（RWA）的合规发行与转让，契合机构投资者对代币化日益增长的兴趣。
                </p>
              </div>

              {/* Three-layer Architecture */}
              <div>
                <h2 className="text-2xl font-bold text-[#1e6b8a] mb-6">三层架构体系</h2>
                <p className="text-[#1e3a4a] leading-relaxed text-base mb-6">
                  ChainFusion™ 的核心是一套专有三层架构：
                </p>
                <div className="space-y-4">
                  {[
                    { icon: 'ri-links-line', title: '链上协作层' },
                    { icon: 'ri-git-merge-line', title: 'Fusion 网关层' },
                    { icon: 'ri-bank-line', title: '链下清算层' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-4 bg-white/80 rounded-xl p-5 border border-[#b8d9ed] shadow-sm">
                      <div className="w-10 h-10 bg-[#dbeafe] rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className={`${item.icon} text-[#1e6b8a] text-xl`}></i>
                      </div>
                      <h3 className="text-[#1e6b8a] font-semibold">{item.title}</h3>
                    </div>
                  ))}
                </div>
                <p className="text-[#1e3a4a] leading-relaxed text-base mt-6">
                  DACC 表示，该架构可实现实时数据同步、对账及合规级别的记录保存。该系统与现有金融基础设施集成，包括跨境银行间支付系统（CIPS）生态，使其纳入既有监管框架。
                </p>
              </div>

              {/* Quote Block */}
              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  DACC 联合创始人 Serra Wei 表示，该平台旨在将去中心化金融的效率与传统金融系统的信任和监管标准相结合。
                </p>
              </div>

              <blockquote className="border-l-4 border-[#f5b942] pl-6 py-2 bg-white/60 rounded-r-xl">
                <p className="text-[#1e3a4a] text-lg italic leading-relaxed">
                  "ChainFusion™ 代表了跨境支付解决方案的一次创新突破，将传统金融与去中心化金融的优势融为一体，在解决长期低效问题的同时，坚守最高监管标准。"
                </p>
                <footer className="mt-3 text-[#1e6b8a]/70 text-sm font-semibold">
                  — Serra Wei，DACC 联合创始人
                </footer>
              </blockquote>

              <div>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  Serra Wei 补充道，香港作为国际金融中心及通往中国内地的门户，在平台设计中发挥了关键作用，尤其是在将代币化基础设施与全球资本市场及监管预期相对接方面。
                </p>
              </div>

              {/* Strategic Backing */}
              <div>
                <h2 className="text-2xl font-bold text-[#1e6b8a] mb-4">战略支持与扩张路线图</h2>
                <p className="text-[#1e3a4a] leading-relaxed text-base">
                  DACC 获得了一批战略投资者和生态合作伙伴的支持,包括星辰集团有限公司(399.HK)、Kingdom Limited(600446.SH)、全志科技(300465.SZ)及复星国际有限公司(656.HK),以及私营科技与数字资产领域的多家机构。
                </p>
                <p className="text-[#1e3a4a] leading-relaxed text-base mt-4">
                  随着代币化金融在亚洲及全球持续升温,金融基础设施参与者愈发专注于构建合规的结算与清算层,以将数字资产融入主流资本市场。
                </p>
                <p className="text-[#1e3a4a] leading-relaxed text-base mt-4">
                  凭借 ChainFusion™,DACC 正将自身定位为传统金融机构与新兴代币化经济之间的桥梁,重点面向跨境支付、贸易融资及真实世界资产代币化等机构级应用场景。
                </p>
              </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">

              {/* Key Highlights */}
              <div className="bg-white/80 rounded-2xl p-6 border border-[#b8d9ed] shadow-lg sticky top-28">
                <h3 className="text-[#1e6b8a] font-bold text-lg mb-5 flex items-center gap-2">
                  <i className="ri-flashlight-line text-[#f5b942]"></i>
                  核心要点
                </h3>
                <ul className="space-y-4">
                  {[
                    '打通链上区块链与链下传统金融的壁垒',
                    '人民币结算时间从数天压缩至数秒',
                    '三层专有架构保障合规性',
                    '支持跨境人民币、贸易融资及 RWA 代币化',
                    '获港股及 A 股战略投资者背书',
                    '聚焦机构级跨境支付应用场景',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-checkbox-circle-fill text-[#f5b942] text-base"></i>
                      </div>
                      <span className="text-[#1e3a4a] text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-[#b8d9ed]">
                  <p className="text-[#1e6b8a]/60 text-xs mb-1">原文来源</p>
                  <a
                    href="https://www.asiabiztoday.com/2026/02/12/dacc-launches-chainfusion-to-accelerate-compliant-cross-border-tokenised-payments/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f5b942] hover:text-[#c97a2f] text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    AsiaBizToday
                    <i className="ri-external-link-line"></i>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-16 pt-10 border-t border-[#b8d9ed] flex items-center justify-between">
            <a
              href="/blog"
              className="flex items-center gap-2 text-[#1e6b8a]/70 hover:text-[#f5b942] transition-colors cursor-pointer group"
            >
              <i className="ri-arrow-left-line group-hover:-translate-x-1 transition-transform duration-200"></i>
              <span className="text-sm font-medium">返回博客</span>
            </a>
            <div className="flex items-center gap-3">
              <span className="text-[#1e6b8a]/60 text-sm">分享：</span>
              <a
                href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#dbeafe] rounded-full flex items-center justify-center hover:bg-[#1e6b8a] hover:text-white transition-colors cursor-pointer"
              >
                <i className="ri-linkedin-fill text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e6b8a] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img
                src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png"
                alt="DACC Logo"
                className="h-20 w-auto object-contain mb-4"
              />
              <p className="text-white/80 text-sm leading-relaxed">
                引领数字清算与结算的下一个十年
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">快速链接</h4>
              <div className="space-y-2">
                <a href="/zh#Services" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">服务</a>
                <a href="/zh#use-cases" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">应用场景</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">资源</h4>
              <div className="space-y-2">
                <a href="/zh#ecosystem" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">投资者</a>
                <a href="/blog" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">新闻</a>
                <a href="/contact" className="block text-white/80 hover:text-[#f5b942] transition-colors text-sm cursor-pointer">联系我们</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">关注我们</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#f5b942] transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/70 text-sm mb-4">Copyright © 2026 Digital Asset Clearing Center (DACC). All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
