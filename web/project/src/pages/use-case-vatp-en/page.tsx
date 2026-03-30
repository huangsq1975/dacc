
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UseCaseVATPEN() {
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
            <a href="/home-en" className="cursor-pointer flex-shrink-0">
              <img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" alt="DACC Logo" className="h-6 w-auto object-contain" />
            </a>
            <button onClick={() => handleNavigateWithHash('/home-en', 'Services')} className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              Services
            </button>
            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-medium">
                Solutions
                <i className="ri-arrow-down-s-line"></i>
              </button>
              <div className="absolute left-0 top-full pt-2 w-56 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                  <a href="/hot-wallet-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Hot Wallet Integration</a>
                  <a href="/cold-wallet-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Cold Wallet</a>
                  <a href="/rwa-platform-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">RWA Tokenization Platform</a>
                  <a href="/chain-fusion-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">ChainFusion</a>
                </div>
              </div>
            </div>
            {/* Use Cases Dropdown */}
            <div className="relative" onMouseEnter={() => setUseCasesDropdownOpen(true)} onMouseLeave={() => setUseCasesDropdownOpen(false)}>
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-sm whitespace-nowrap font-montserrat font-medium">
                Use Cases
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${useCasesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {useCasesDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-64 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/use-case-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Global Merchants x DACC</a>
                    <a href="/use-case-ttl-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">TTL × DACC</a>
                    <a href="/use-case-conflux-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Conflux x DACC</a>
                    <a href="/use-case-vatp-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">Crypto Exchanges x DACC</a>
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => handleNavigateWithHash('/home-en', 'ecosystem')} className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              Investors
            </button>
            <a href="/blog-en" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium">
              News
            </a>
            <a href="/contact-en" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-sm flex items-center whitespace-nowrap font-montserrat font-medium">
              Contact Us
              <i className="ri-arrow-right-up-line ml-1 text-xs"></i>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white/90 backdrop-blur-md border-b border-[#b8d9ed] shadow-md">
        <div className="flex items-center justify-between px-6 py-4">
          <a href="/home-en" className="block cursor-pointer">
            <img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" alt="DACC Logo" className="h-8 w-auto object-contain" />
          </a>
          <div className="flex items-center space-x-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="bg-[#e8f4fb] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm">
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
            <a href="/use-case-vatp" className="bg-[#e8f4fb] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium">
              中文
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
                <button onClick={() => { handleNavigateWithHash('/home-en', 'Services'); setMobileMenuOpen(false); }} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>Services</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button onClick={() => setMobileSubmenu('solutions')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>Solutions</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button onClick={() => setMobileSubmenu('useCasesEN')} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>Use Cases</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button onClick={() => { handleNavigateWithHash('/home-en', 'ecosystem'); setMobileMenuOpen(false); }} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>Investors</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a href="/blog-en" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>News</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a href="/contact-en" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20">
                  <span>Contact Us</span><i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
              </div>
            </div>
          )}
          {mobileSubmenu === 'solutions' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">Solutions</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6 space-y-2">
                <a href="/hot-wallet-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Hot Wallet Integration</a>
                <a href="/cold-wallet-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Cold Wallet</a>
                <a href="/rwa-platform-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">RWA Tokenization Platform</a>
                <a href="/chain-fusion-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">ChainFusion</a>
              </div>
            </div>
          )}
          {mobileSubmenu === 'useCasesEN' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <button onClick={() => setMobileSubmenu(null)} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"><i className="ri-arrow-left-line text-2xl"></i></button>
                <span className="text-lg font-semibold text-white">Use Cases</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6 space-y-2">
                <a href="/use-case-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Global Merchants x DACC</a>
                <a href="/use-case-ttl-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">TTL × DACC</a>
                <a href="/use-case-conflux-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Conflux x DACC</a>
                <a href="/use-case-vatp-en" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20">Crypto Exchanges x DACC</a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Language Switcher - Desktop Only */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <a href="/use-case-vatp" className="bg-white/80 backdrop-blur-md border border-[#b8d9ed] rounded-full px-3 md:px-4 py-2 text-xs md:text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium shadow-md">
          中文
        </a>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="bg-[#f5b942]/20 border border-[#f5b942] text-[#1e3a4a] px-4 py-2 rounded-full text-sm font-semibold">Use Case / Exchange Custody</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-6 leading-tight">Crypto Exchanges x DACC: <span className="text-[#1e6b8a]">Custody Practice</span></h1>
          <p className="text-lg text-[#4a5568] max-w-3xl mx-auto leading-relaxed mb-8">DACC has signed MOUs with two SFC-licensed crypto exchanges in Hong Kong. DACC provides comprehensive cold-hot HSM custody solutions with institutional-grade security and operational efficiency.</p>
        </div>
      </section>

      {/* Background Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/50 rounded-2xl p-8 md:p-12 border border-[#b8d9ed]">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e6b8a] mb-6">Background</h2>
            <div className="space-y-4 text-[#4a5568] leading-relaxed">
              <p>DACC has signed Memorandum of Understanding (MOU)s with two SFC-licensed VATPs — PantherTrade (a subsidiary of Futu Securities) and YAX (a subsidiary of Tiger Securities) to provide hot and cold HSM custody solutions with institutional-grade security and operational efficiency.</p>
              <p>DACC serves as the custody solution provider, delivering enterprise-grade wallet infrastructure, multi-signature security, real-time risk monitoring, and comprehensive compliance reporting capabilities.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#b8d9ed]">
              <p className="text-[#4a5568] text-sm mb-5 uppercase tracking-widest font-semibold">MOU Partners</p>
              <div className="flex flex-wrap items-center gap-6">
                <a href="https://www.panthertrade.com" target="_blank" rel="noopener noreferrer" className="flex items-center bg-white/60 border border-[#b8d9ed] hover:border-[#f5b942] rounded-xl px-6 py-4 transition-all duration-300 cursor-pointer group">
                  <div className="w-32 h-10 flex items-center justify-center space-x-2">
                    <img src="https://www.panthertrade.com/client/img/icon.5265cbf.svg" alt="PantherTrade" className="h-8 w-8 object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                    <span className="text-[#1e6b8a] font-bold text-base group-hover:text-[#f5b942] transition-colors whitespace-nowrap">PantherTrade</span>
                  </div>
                </a>
                <a href="https://www.yax.hk" target="_blank" rel="noopener noreferrer" className="flex items-center bg-white/60 border border-[#b8d9ed] hover:border-[#f5b942] rounded-xl px-6 py-4 transition-all duration-300 cursor-pointer group">
                  <div className="w-24 h-10 flex items-center justify-center">
                    <img src="https://www.yax.hk/logo.svg" alt="YAX" className="h-8 w-auto object-contain" onError={(e) => { const t = e.currentTarget; t.style.display = 'none'; const f = t.nextElementSibling as HTMLElement; if (f) f.style.display = 'flex'; }} />
                    <div className="hidden items-center space-x-1"><span className="text-[#f5b942] font-bold text-xl">≋</span><span className="text-[#1e6b8a] font-bold text-xl group-hover:text-[#f5b942] transition-colors">YAX</span></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 px-6 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e6b8a] mb-4">Objectives</h2>
            <p className="text-[#4a5568]">Key goals for the custody solution</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: 'ri-shield-check-line', title: 'Regulatory Compliance', desc: "Meet Hong Kong SFC's custody requirements including segregated wallets, multi-signature controls, and comprehensive audit trails" },
              { icon: 'ri-lock-line', title: 'Asset Security', desc: 'Implement institutional-grade security measures including cold storage, multi-party computation (MPC), and hardware security modules (HSM)' },
              { icon: 'ri-speed-line', title: 'Operational Efficiency', desc: 'Enable fast deposit/withdrawal processing while maintaining security standards and supporting high transaction volumes' },
              { icon: 'ri-line-chart-line', title: 'Scalability', desc: 'Build infrastructure that can scale with business growth and easily support additional blockchain networks and tokens' },
            ].map(item => (
              <div key={item.title} className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300">
                <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6"><i className={`${item.icon} text-[#1e6b8a] text-2xl`}></i></div>
                <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">{item.title}</h3>
                <p className="text-[#4a5568] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DACC Solution */}
      <section className="py-16 px-6 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e6b8a] mb-4">DACC Solution</h2>
            <p className="text-[#4a5568]">Comprehensive custody infrastructure</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: 'ri-wallet-3-line', title: 'Enterprise Wallet Infrastructure', items: ['Multi-signature wallets with customizable approval workflows', 'Hot/warm/cold wallet architecture for optimal security-liquidity balance', 'Automated wallet segregation for client fund protection', 'Support for 50+ blockchain networks and 1000+ tokens'] },
              { icon: 'ri-shield-check-line', title: 'Security & Risk Control', items: ['Real-time transaction monitoring and anomaly detection', 'Configurable risk rules and automatic alerts', 'Multi-layer approval workflows for large transactions', 'Address whitelisting and blacklisting capabilities'] },
              { icon: 'ri-file-chart-line', title: 'Compliance & Reporting', items: ['Comprehensive audit trails for all wallet operations', 'Automated regulatory reporting templates', 'Real-time balance reconciliation and proof of reserves', 'Integration with compliance monitoring tools'] },
              { icon: 'ri-customer-service-line', title: 'Operational Support', items: ['24/7 technical support and incident response', 'Regular security audits and penetration testing', 'Ongoing compliance consultation and updates', 'Training for exchange operations team'] },
            ].map(item => (
              <div key={item.title} className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-[#1e6b8a] rounded-full flex items-center justify-center"><i className={`${item.icon} text-white text-xl`}></i></div>
                  <h3 className="text-xl font-bold text-[#1e6b8a]">{item.title}</h3>
                </div>
                <ul className="space-y-3 text-[#4a5568] text-sm">
                  {item.items.map(li => (
                    <li key={li} className="flex items-start space-x-2"><i className="ri-checkbox-circle-fill text-[#1e6b8a] mt-1"></i><span>{li}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Value */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1e6b8a] mb-4">Business Value</h2>
            <p className="text-[#4a5568]">Measurable outcomes and benefits</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: 'ri-checkbox-circle-line', title: 'Regulatory Approval', desc: "Successfully met all SFC custody requirements and obtained necessary licenses for operation" },
              { icon: 'ri-time-line', title: 'Faster Time to Market', desc: 'Reduced infrastructure development time by 6-9 months compared to building in-house' },
              { icon: 'ri-money-dollar-circle-line', title: 'Cost Efficiency', desc: 'Significantly lower total cost of ownership compared to building and maintaining proprietary custody systems' },
              { icon: 'ri-shield-check-line', title: 'Zero Security Incidents', desc: 'Maintained perfect security record with no breaches or unauthorized access since launch' },
              { icon: 'ri-speed-up-line', title: 'Operational Excellence', desc: '99.9% uptime with average deposit/withdrawal processing time under 10 minutes' },
              { icon: 'ri-arrow-up-line', title: 'Scalability', desc: 'Infrastructure ready to support 10x growth in users and transaction volumes' },
            ].map(item => (
              <div key={item.title} className="bg-gradient-to-br from-[#1e6b8a]/20 to-[#0f4c5c]/20 rounded-2xl p-8 border border-[#b8d9ed]">
                <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center mb-6"><i className={`${item.icon} text-[#1e6b8a] text-2xl`}></i></div>
                <h3 className="text-xl font-bold text-[#1e6b8a] mb-3">{item.title}</h3>
                <p className="text-[#4a5568] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#1e6b8a] to-[#0f4c5c] rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Need Enterprise Custody Solutions?</h2>
              <p className="text-lg text-white/80 mb-8">Learn how DACC can help your exchange meet regulatory requirements while maintaining security and efficiency</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact-en" className="bg-white text-[#1e6b8a] px-8 py-4 rounded-full font-bold hover:bg-[#f5b942] hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap inline-flex items-center justify-center space-x-2">
                  <span>Contact Us</span><i className="ri-arrow-right-line"></i>
                </a>
                <a href="https://www.dacc.hk" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#1e6b8a] transition-all duration-300 cursor-pointer whitespace-nowrap">
                  Learn More
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
                <img src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png" alt="DACC Logo" className="h-20 w-auto object-contain" />
              </div>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">Pioneering the Next Decade of Digital Clearing and Settlement</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => handleNavigateWithHash('/home-en', 'Services')} className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left">Services</button>
                <button onClick={() => handleNavigateWithHash('/home-en', 'use-cases')} className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left">Use Cases</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Resources</h4>
              <div className="space-y-2">
                <button onClick={() => handleNavigateWithHash('/home-en', 'ecosystem')} className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform text-left">Investors</button>
                <a href="/blog-en" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">News</a>
                <a href="/contact-en" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">Contact Us</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Contact</h4>
              <p className="text-white/80 text-xs md:text-sm">Email: info@dacc.hk</p>
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
