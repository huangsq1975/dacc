import { useState, useEffect, useRef } from 'react';
import { Renderer, Triangle, Program, Mesh } from 'ogl';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import WaveBackground from '../../components/feature/WaveBackground';

// ─── Prism WebGL Component ───────────────────────────────────────────────────
const Prism = ({
  height = 3.5,
  baseWidth = 5.5,
  animationType = 'rotate',
  glow = 1,
  offset = { x: 0, y: 0 },
  noise = 0.5,
  transparent = true,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  hoverStrength = 2,
  inertia = 0.05,
  bloom = 1,
  suspendWhenOffscreen = false,
  timeScale = 0.5
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const H = Math.max(0.001, height);
    const BW = Math.max(0.001, baseWidth);
    const BASE_HALF = BW * 0.5;
    const GLOW = Math.max(0.0, glow);
    const NOISE = Math.max(0.0, noise);
    const offX = offset?.x ?? 0;
    const offY = offset?.y ?? 0;
    const SAT = transparent ? 1.5 : 1;
    const SCALE = Math.max(0.001, scale);
    const HUE = hueShift || 0;
    const CFREQ = Math.max(0.0, colorFrequency || 1);
    const BLOOM = Math.max(0.0, bloom || 1);
    const TS = Math.max(0, timeScale || 1);

    const maxDpr = window.innerWidth < 1024 ? 1.25 : 1.5;
    const dpr = Math.min(maxDpr, window.devicePixelRatio || 1);

    let renderer;
    let gl;

    try {
      renderer = new Renderer({ dpr, alpha: transparent, antialias: false });
      gl = renderer.gl;
      if (!gl) { console.warn('WebGL not supported'); return; }
    } catch (error) {
      console.warn('Failed to create WebGL context:', error);
      return;
    }

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);

    Object.assign(gl.canvas.style, {
      position: 'absolute', inset: '0', width: '100%', height: '100%', display: 'block'
    });
    container.appendChild(gl.canvas);

    const vertex = /* glsl */`
      attribute vec2 position;
      void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `;

    const fragment = /* glsl */`
      precision highp float;
      uniform vec2  iResolution;
      uniform float iTime;
      uniform float uHeight;
      uniform float uBaseHalf;
      uniform mat3  uRot;
      uniform int   uUseBaseWobble;
      uniform float uGlow;
      uniform vec2  uOffsetPx;
      uniform float uNoise;
      uniform float uSaturation;
      uniform float uScale;
      uniform float uHueShift;
      uniform float uColorFreq;
      uniform float uBloom;
      uniform float uCenterShift;
      uniform float uInvBaseHalf;
      uniform float uInvHeight;
      uniform float uMinAxis;
      uniform float uPxScale;
      uniform float uTimeScale;

      vec4 tanh4(vec4 x){ vec4 e2x=exp(2.0*x); return(e2x-1.0)/(e2x+1.0); }
      float rand(vec2 co){ return fract(sin(dot(co,vec2(12.9898,78.233)))*43758.5453123); }

      float sdOctaAnisoInv(vec3 p){
        vec3 q=vec3(abs(p.x)*uInvBaseHalf,abs(p.y)*uInvHeight,abs(p.z)*uInvBaseHalf);
        float m=q.x+q.y+q.z-1.0;
        return m*uMinAxis*0.5773502691896258;
      }
      float sdPyramidUpInv(vec3 p){
        float oct=sdOctaAnisoInv(p); float halfSpace=-p.y; return max(oct,halfSpace);
      }
      mat3 hueRotation(float a){
        float c=cos(a),s=sin(a);
        mat3 W=mat3(0.299,0.587,0.114,0.299,0.587,0.114,0.299,0.587,0.114);
        mat3 U=mat3(0.701,-0.587,-0.114,-0.299,0.413,-0.114,-0.300,-0.588,0.886);
        mat3 V=mat3(0.168,-0.331,0.500,0.328,0.035,-0.500,-0.497,0.296,0.201);
        return W+U*c+V*s;
      }
      void main(){
        vec2 f=(gl_FragCoord.xy-0.5*iResolution.xy-uOffsetPx)*uPxScale;
        float z=5.0; float d=0.0;
        vec3 p; vec4 o=vec4(0.0);
        float centerShift=uCenterShift; float cf=uColorFreq;
        mat2 wob=mat2(1.0);
        if(uUseBaseWobble==1){
          float t=iTime*uTimeScale;
          float c0=cos(t+0.0),c1=cos(t+33.0),c2=cos(t+11.0);
          wob=mat2(c0,c1,c2,c0);
        }
        const int STEPS=100;
        for(int i=0;i<STEPS;i++){
          p=vec3(f,z); p.xz=p.xz*wob; p=uRot*p;
          vec3 q=p; q.y+=centerShift;
          d=0.1+0.2*abs(sdPyramidUpInv(q)); z-=d;
          o+=(sin((p.y+z)*cf+vec4(0.0,1.0,2.0,3.0))+1.0)/d;
        }
        o=tanh4(o*o*(uGlow*uBloom)/1e5);
        vec3 col=o.rgb;
        float n=rand(gl_FragCoord.xy+vec2(iTime));
        col+=(n-0.5)*uNoise; col=clamp(col,0.0,1.0);
        float L=dot(col,vec3(0.2126,0.7152,0.0722));
        col=clamp(mix(vec3(L),col,uSaturation),0.0,1.0);
        if(abs(uHueShift)>0.0001){ col=clamp(hueRotation(uHueShift)*col,0.0,1.0); }
        gl_FragColor=vec4(col,o.a);
      }
    `;

    const geometry = new Triangle(gl);
    const iResBuf = new Float32Array(2);
    const offsetPxBuf = new Float32Array(2);

    const program = new Program(gl, {
      vertex, fragment,
      uniforms: {
        iResolution: { value: iResBuf }, iTime: { value: 0 },
        uHeight: { value: H }, uBaseHalf: { value: BASE_HALF },
        uUseBaseWobble: { value: 1 },
        uRot: { value: new Float32Array([1,0,0,0,1,0,0,0,1]) },
        uGlow: { value: GLOW }, uOffsetPx: { value: offsetPxBuf },
        uNoise: { value: NOISE }, uSaturation: { value: SAT },
        uScale: { value: SCALE }, uHueShift: { value: HUE },
        uColorFreq: { value: CFREQ }, uBloom: { value: BLOOM },
        uCenterShift: { value: H * 0.25 },
        uInvBaseHalf: { value: 1 / BASE_HALF }, uInvHeight: { value: 1 / H },
        uMinAxis: { value: Math.min(BASE_HALF, H) },
        uPxScale: { value: 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE) },
        uTimeScale: { value: TS }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      iResBuf[0] = gl.drawingBufferWidth;
      iResBuf[1] = gl.drawingBufferHeight;
      offsetPxBuf[0] = offX * dpr;
      offsetPxBuf[1] = offY * dpr;
      program.uniforms.uPxScale.value = 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const rotBuf = new Float32Array(9);
    const setMat3FromEuler = (yawY, pitchX, rollZ, out) => {
      const cy=Math.cos(yawY),sy=Math.sin(yawY);
      const cx=Math.cos(pitchX),sx=Math.sin(pitchX);
      const cz=Math.cos(rollZ),sz=Math.sin(rollZ);
      out[0]=cy*cz+sy*sx*sz; out[1]=cx*sz; out[2]=-sy*cz+cy*sx*sz;
      out[3]=-cy*sz+sy*sx*cz; out[4]=cx*cz; out[5]=sy*sz+cy*sx*cz;
      out[6]=sy*cx; out[7]=-sx; out[8]=cy*cx;
      return out;
    };

    let yaw = 0, pitch = 0.3;
    let raf = 0;
    const t0 = performance.now();

    const render = (now: number) => {
      const t = (now - t0) * 0.001;
      yaw = t * 0.3;
      setMat3FromEuler(yaw, pitch, 0, rotBuf);
      program.uniforms.uRot.value = rotBuf;
      program.uniforms.iTime.value = t;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(render);
    };

    const startRAF = () => { if (raf) return; raf = requestAnimationFrame(render); };
    const stopRAF = () => { if (!raf) return; cancelAnimationFrame(raf); raf = 0; };

    if (suspendWhenOffscreen) {
      const io = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting)) startRAF(); else stopRAF();
      });
      io.observe(container);
      startRAF();
      (container as any).__prismIO = io;
    } else {
      startRAF();
    }

    return () => {
      stopRAF();
      ro.disconnect();
      if (suspendWhenOffscreen) {
        const io = (container as any).__prismIO;
        if (io) io.disconnect();
        delete (container as any).__prismIO;
      }
      if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);
    };
  }, [height, baseWidth, animationType, glow, noise, offset?.x, offset?.y, scale,
      transparent, hueShift, colorFrequency, timeScale, hoverStrength, inertia,
      bloom, suspendWhenOffscreen]);

  return <div className="absolute inset-0 w-full h-full" ref={containerRef} />;
};

// ─── 董事数据 ─────────────────────────────────────────────────────────────────
const directors = [
  {
    name: 'Serra Wei',
    title: '董事 & 创始人',
    image: 'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/89c8049de2f5b1d235cddaddab5c0277.png',
    bio: '企业家和投资人，在传统金融、科技和加密货币领域拥有丰富经验。曾就职于高盛，持有斯坦福大学商学院工商管理硕士学位。DACC 及 Aegis Custody 创始人。',
  },
  {
    name: '李曦寰',
    title: '董事',
    image: 'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/36ca34a59e03a4f163f2a16c7321f446.png',
    bio: '曾任香港交易所集团战略及项目管理资深负责人，逾 20 年大型金融机构与金融市场基础设施管理经验，专长涵盖金融科技战略与数字化转型。',
  },
  {
    name: 'Lynne Marlor',
    title: '董事',
    image: 'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/ef24843cf2e0be121df5f5b4d8b37bf0.png',
    bio: 'Women in Digital Assets Forums 创始人。在资本市场、财资、流动性、支付和结算领域拥有 30 年经验。牛津大学赛德商学院区块链战略课程结业。',
  },
  {
    name: '严宜扬',
    title: '董事',
    image: 'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/4ddecd82d3632857a31e2f7477302efa.png',
    bio: '逾 20 年银行 IT 与金融软件领域经验，横跨两岸三地及新加坡，曾主导大型银行核心系统与金融基础设施项目，深耕支付清算与风险管理。',
  },
  {
    name: 'Wendy Sun',
    title: '董事',
    image: 'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/1c27eaf061faf24e08b0332d48dc609b.png',
    bio: '深耕全球金融科技 20 余年，专注支付与数字金融。曾任职复星、TikTok、腾讯、Grab、蚂蚁集团、银联等企业高管。清华五道口金融 EMBA，复旦经济学硕士。',
  },
];

// ─── 投资方数据 ────────────────────────────────────────────────────────────────
const investors = [
  { name: 'Conflux / Starcoin', note: '港交所：399' },
  { name: 'TTL / Kingdom', note: '深交所：600446' },
  { name: 'Global Infotech', note: '深交所：300465' },
  { name: 'Fosun International', note: '港交所：0656' },
  { name: 'Avior Capital', note: '战略投资方' },
  { name: 'Blockstone', note: '战略投资方' },
  { name: 'BridgeTower Capital', note: '战略投资方' },
  { name: 'Fintech World', note: '战略投资方' },
  { name: 'Satoshi Ventures', note: '战略投资方' },
];

// ─── 主组件 ───────────────────────────────────────────────────────────────────
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [expandedDirector, setExpandedDirector] = useState<string | null>(null);

  const [challengesRef, challengesVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [whyDaccRef, whyDaccVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [complianceRef, complianceVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [leadershipRef, leadershipVisible] = useIntersectionObserver({ threshold: 0.05 });

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        setShowScrollTop(window.scrollY > 500);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (rafId) cancelAnimationFrame(rafId); };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navLinkClass = 'text-[#1e3a4a]/80 hover:text-[#1e6b8a] transition-colors text-sm font-semibold font-montserrat whitespace-nowrap';

  return (
    <div className="min-h-screen bg-white font-montserrat text-[#1e3a4a]">

      {/* ════════════════════════════════════════
          导航 — 桌面端
      ════════════════════════════════════════ */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden lg:block w-[92vw] max-w-[1240px]">
        <nav className="bg-white border border-[#b8d9ed]/60 rounded-2xl px-6 xl:px-8 py-3 shadow-[0_8px_32px_rgba(30,107,138,0.12)] flex items-center justify-between gap-4">
          <a href="/zh" className="flex-shrink-0">
            <img
              src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png"
              alt="DACC"
              className="h-6 w-auto object-contain"
            />
          </a>
          <div className="flex items-center gap-5 xl:gap-7">
            <a href="#why-dacc" className={navLinkClass}>公司</a>
            <a href="#services" className={navLinkClass}>服务</a>
            <a href="#compliance" className={navLinkClass}>合规</a>
            <a href="#partners" className={navLinkClass}>合作伙伴</a>
            <a href="/blog" className={navLinkClass}>新闻</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/en"
              title="Switch to English"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#b8d9ed] bg-white text-[#1e6b8a] hover:border-[#1e6b8a] transition-colors text-base"
            >
              <i className="ri-global-line"></i>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center rounded-full bg-[#1e6b8a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#12b7d6] transition-colors"
            >
              联系我们
            </a>
          </div>
        </nav>
      </div>

      {/* 导航 — 移动端 */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-xl border-b border-[#b8d9ed]/50 shadow-sm">
        <div className="flex items-center justify-between px-5 py-3.5">
          <a href="/zh">
            <img
              src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png"
              alt="DACC"
              className="h-7 w-auto object-contain"
            />
          </a>
          <div className="flex items-center gap-2">
            <a href="/en" className="border border-[#b8d9ed] rounded-full px-3 py-1.5 text-xs font-semibold text-[#1e6b8a]">EN</a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#e8f4fb] text-[#1e6b8a]"
              aria-label="切换菜单"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#04142b]/96 backdrop-blur-md z-40 lg:hidden pt-16 overflow-y-auto">
          <div className="px-6 py-8 space-y-1">
            {[
              { label: '公司', id: 'why-dacc' },
              { label: '服务', id: 'services' },
              { label: '合规', id: 'compliance' },
              { label: '合作伙伴', id: 'partners' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => { document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-between py-4 text-lg text-white border-b border-white/10 hover:text-[#67e8f9] transition-colors"
              >
                <span>{item.label}</span>
                <i className="ri-arrow-right-s-line text-xl"></i>
              </button>
            ))}
            <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-4 text-lg text-white border-b border-white/10 hover:text-[#67e8f9]">
              <span>新闻</span>
              <i className="ri-arrow-right-s-line text-xl"></i>
            </a>
            <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="mt-6 flex items-center justify-center rounded-full bg-[#12b7d6] py-4 text-base font-bold text-[#031122]">
              联系我们
            </a>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          首屏 Hero
      ════════════════════════════════════════ */}
      <header className="relative min-h-screen flex items-center bg-[radial-gradient(circle_at_20%_20%,rgba(150,205,235,0.15),transparent_50%),radial-gradient(circle_at_78%_18%,rgba(180,220,245,0.12),transparent_52%),linear-gradient(180deg,#7aaec9_0%,#a8c8df_50%,#cee3f2_100%)] pt-20 lg:pt-0 overflow-hidden">
        {/* Wave animated background */}
        <WaveBackground />

        {/* 网格底纹 */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: 'linear-gradient(rgba(102,153,153,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(102,153,153,0.25) 1px, transparent 1px)', backgroundSize: '72px 72px' }}>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-24 lg:pt-28 lg:pb-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen">

          {/* 左侧文字 */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#34d5f4]/50 bg-[#0b1b31]/60 px-4 py-1.5 text-xs md:text-sm font-medium text-[#c6f6ff] tracking-wide mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#67e8f9] animate-pulse"></span>
              持牌 · 保险 · 合规托管
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold leading-[1.15] text-white font-montserrat mb-5 [text-shadow:0_2px_16px_rgba(8,30,60,0.45),0_1px_4px_rgba(8,30,60,0.30)]">
              <span className="whitespace-nowrap">Where CIPS meets</span>{' '}
              <span className="text-[#67e8f9]">Tokenization</span>
            </h1>

            <p className="text-base md:text-lg text-white/80 font-montserrat leading-relaxed mb-10 max-w-xl [text-shadow:0_1px_10px_rgba(8,30,60,0.40)]">
              Pioneering the Next Decade of Digital Clearing and Settlement
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href="/contact"
                className="inline-flex items-center rounded-full bg-[#12b7d6] px-7 py-3 text-sm font-bold text-[#031122] hover:bg-[#67e8f9] transition-colors">
                立即开始
              </a>
              <a href="#why-dacc"
                className="inline-flex items-center rounded-full border border-white/35 bg-white/8 px-7 py-3 text-sm font-bold text-white hover:border-[#67e8f9] hover:text-[#67e8f9] transition-colors">
                了解更多
              </a>
            </div>

            {/* 信任徽章 */}
            <div className="flex flex-wrap gap-2">
              {['持牌', '保险', '受监管'].map(badge => (
                <span key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
                  <i className="ri-check-line text-[#67e8f9]"></i>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* 右侧：安全视觉元素 */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-[380px] h-[380px]">
              <div className="absolute inset-0 rounded-full border-2 border-[#67e8f9]/20 animate-[spin_30s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#67e8f9]/60"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-[#12b7d6]/60"></div>
              </div>
              <div className="absolute inset-8 rounded-full border border-[#67e8f9]/15 animate-[spin_20s_linear_infinite_reverse]">
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#f5b942]/70"></div>
              </div>
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-[#0b2742]/80 to-[#1e6b8a]/60 border border-[#67e8f9]/30 backdrop-blur-sm flex items-center justify-center shadow-[0_0_60px_rgba(103,232,249,0.2)]">
                <div className="text-center">
                  <i className="ri-shield-keyhole-line text-6xl text-[#67e8f9]"></i>
                  <div className="mt-2 text-xs font-bold text-[#67e8f9]/80 tracking-widest">DACC</div>
                </div>
              </div>
              {[
                { top: '10%', left: '75%', icon: 'ri-bank-line', delay: '0s' },
                { top: '65%', left: '82%', icon: 'ri-exchange-line', delay: '0.5s' },
                { top: '78%', left: '20%', icon: 'ri-coin-line', delay: '1s' },
                { top: '15%', left: '12%', icon: 'ri-shield-check-line', delay: '1.5s' },
              ].map((node, i) => (
                <div key={i} className="absolute w-12 h-12 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center animate-[float_4s_ease-in-out_infinite]"
                  style={{ top: node.top, left: node.left, animationDelay: node.delay }}>
                  <i className={`${node.icon} text-[#67e8f9] text-xl`}></i>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 滚动提示 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 opacity-60">
          <span className="text-white/60 text-xs font-medium tracking-wider">向下滚动</span>
          <i className="ri-arrow-down-line text-white/60 text-lg animate-bounce"></i>
        </div>
      </header>

      {/* ════════════════════════════════════════
          行业挑战
      ════════════════════════════════════════ */}
      <section
        id="challenges"
        ref={challengesRef}
        className="px-5 md:px-8 lg:px-12 py-16 md:py-24 bg-[#f0f7fc]"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${challengesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] font-montserrat">行业挑战</h2>
            <p className="mt-3 text-[#1e6b8a]/70 font-montserrat max-w-2xl mx-auto text-base">
              当前跨境数字资产基础设施面临三大结构性障碍。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: 'ri-time-line',
                title: '结算速度慢',
                desc: '通过代理行网络进行的跨境结算需要 3–5 个工作日，大量资金被占用，对手方风险显著增加。',
                delay: '0ms',
              },
              {
                icon: 'ri-eye-off-line',
                title: '透明度不足',
                desc: '无法实时查看交易状态或资金位置。对账工作依赖人工操作，效率低下且容易出错。',
                delay: '150ms',
              },
              {
                icon: 'ri-file-warning-line',
                title: '合规碎片化',
                desc: '不同司法管辖区的监管要求各异，构建多市场合规运营体系需要大量重复性投入。',
                delay: '300ms',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-7 border border-[#b8d9ed]/60 hover:border-[#1e6b8a]/50 hover:shadow-[0_8px_30px_rgba(30,107,138,0.1)] transition-all duration-500 group ${challengesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: item.delay }}
              >
                <div className="w-14 h-14 bg-[#e8f4fb] group-hover:bg-[#1e6b8a] rounded-xl flex items-center justify-center mb-5 transition-colors duration-400">
                  <i className={`${item.icon} text-[#1e6b8a] group-hover:text-white text-2xl transition-colors duration-400`}></i>
                </div>
                <h3 className="text-lg font-bold text-[#1e3a4a] font-montserrat mb-3">{item.title}</h3>
                <p className="text-sm text-[#1e6b8a]/70 leading-relaxed font-montserrat">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          为什么选择 DACC
      ════════════════════════════════════════ */}
      <section
        id="why-dacc"
        ref={whyDaccRef}
        className="px-5 md:px-8 lg:px-12 py-16 md:py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${whyDaccVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] font-montserrat">为什么选择 DACC</h2>
          </div>
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">

            {/* 左侧：核心定位 */}
            <div className={`lg:col-span-2 bg-gradient-to-br from-[#1e6b8a] to-[#0b2742] rounded-2xl p-7 lg:p-9 text-white flex flex-col justify-between transition-all duration-700 delay-100 ${whyDaccVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                  <i className="ri-shield-keyhole-line text-[#67e8f9] text-2xl"></i>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold font-montserrat mb-4 leading-snug">
                  安全合规的<br />数字资产托管方案
                </h3>
                <p className="text-white/75 text-sm leading-relaxed font-montserrat mb-6">
                  DACC 提供在香港受监管的机构级数字资产基础设施，将合规托管、代币化能力与跨境结算整合于一个合规优先的平台。
                </p>
                <div className="space-y-3">
                  {[
                    '香港 TCSP 持牌机构',
                    '机构级保险覆盖',
                    '多重签名 / MPC 安全架构',
                  ].map(pt => (
                    <div key={pt} className="flex items-center gap-2 text-sm font-montserrat">
                      <i className="ri-checkbox-circle-fill text-[#f5b942] flex-shrink-0"></i>
                      <span className="text-white/90">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm font-bold text-[#f5b942] font-montserrat">
                  专为代币化经济打造的基础设施。
                </p>
              </div>
            </div>

            {/* 右侧：3 张服务卡片 */}
            <div className={`lg:col-span-3 flex flex-col gap-4 transition-all duration-700 delay-200 ${whyDaccVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              {[
                {
                  icon: 'ri-safe-line',
                  title: '合规托管',
                  desc: '冷热钱包方案，配备 HSM 密钥安全、MPC 架构，以及面向 VATP 和机构客户的 SFC 合规框架。',
                  href: '/cold-wallet',
                },
                {
                  icon: 'ri-coin-line',
                  title: '代币化平台',
                  desc: '基于界面的 RWA 代币化，支持结构化元数据、多方授权，原生兼容 Hyperledger、Canton、以太坊和 Conflux。',
                  href: '/rwa-platform',
                },
                {
                  icon: 'ri-exchange-funds-line',
                  title: 'RWA 结算',
                  desc: 'ChainFusion™ 通过 CIPS 实现近实时跨境结算，覆盖 193 个国家和地区，将结算时间从数天缩短至秒级。',
                  href: '/chain-fusion',
                },
              ].map((card, i) => (
                <div key={i} className="bg-[#f0f7fc] hover:bg-white rounded-2xl p-6 border border-[#b8d9ed]/60 hover:border-[#1e6b8a]/60 hover:shadow-[0_4px_20px_rgba(30,107,138,0.1)] transition-all duration-300 group flex items-start gap-4">
                  <div className="w-12 h-12 bg-white group-hover:bg-[#1e6b8a] rounded-xl flex items-center justify-center flex-shrink-0 border border-[#b8d9ed]/60 transition-colors duration-300">
                    <i className={`${card.icon} text-[#1e6b8a] group-hover:text-white text-xl transition-colors duration-300`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#1e3a4a] font-montserrat mb-1.5 text-base">{card.title}</h3>
                    <p className="text-sm text-[#1e6b8a]/70 leading-relaxed font-montserrat mb-3">{card.desc}</p>
                    <a href={card.href} className="inline-flex items-center gap-1 text-sm font-semibold text-[#1e6b8a] hover:text-[#12b7d6] transition-colors font-montserrat">
                      了解详情 <i className="ri-arrow-right-line"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          服务
      ════════════════════════════════════════ */}
      <section id="services" className="px-5 md:px-8 lg:px-12 py-16 md:py-24 bg-[#f0f7fc]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] font-montserrat">我们的服务</h2>
            <p className="mt-3 text-[#1e6b8a]/70 font-montserrat max-w-2xl mx-auto text-base">
              面向受监管机构的端到端数字资产基础设施。
            </p>
          </div>

          {/* 重点推介：ChainFusion */}
          <div className="mb-8 bg-gradient-to-br from-[#1e6b8a] to-[#0b2742] rounded-2xl p-7 md:p-10 border-2 border-[#f5b942]/60 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-3 py-1 mb-4 text-xs text-white font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f5b942] animate-pulse"></span>
                  现已上线：ChainFusion™
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white font-montserrat mb-3 leading-tight">
                  跨境结算，<span className="text-[#f5b942]">秒级完成</span>
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed font-montserrat max-w-2xl">
                  DACC 的 ChainFusion™ 接入人民币跨境支付系统（CIPS）——覆盖 193 个国家和地区，逾 1,500 家金融机构参与。结算时间：3–5 天 → 秒级。
                </p>
              </div>
              <a href="/chain-fusion"
                className="flex-shrink-0 inline-flex items-center rounded-full bg-[#f5b942] hover:bg-[#c97a2f] px-7 py-3 text-sm font-bold text-white transition-colors whitespace-nowrap">
                探索 ChainFusion™
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'ri-links-line', title: '热钱包集成', desc: 'API 驱动的热钱包方案，专为大规模交易所集成与机构密钥管理而设计。', href: '/hot-wallet' },
              { icon: 'ri-database-2-line', title: '冷钱包基础设施', desc: '基于 HSM 的冷存储，配备分层访问控制、离线签名及完整审计追踪。', href: '/cold-wallet' },
              { icon: 'ri-coin-line', title: 'RWA 代币化平台', desc: '多链 RWA 发行平台，支持结构化元数据和多方授权，兼容 Hyperledger、Canton 及 EVM 链。', href: '/rwa-platform' },
            ].map((svc, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#b8d9ed]/60 hover:border-[#1e6b8a]/60 hover:shadow-[0_8px_24px_rgba(30,107,138,0.1)] transition-all duration-300 group flex flex-col">
                <div className="w-14 h-14 bg-[#e8f4fb] group-hover:bg-[#1e6b8a] rounded-xl flex items-center justify-center mb-5 transition-colors duration-400">
                  <i className={`${svc.icon} text-[#1e6b8a] group-hover:text-white text-2xl transition-colors duration-400`}></i>
                </div>
                <h3 className="font-bold text-[#1e3a4a] font-montserrat text-base mb-3">{svc.title}</h3>
                <p className="text-sm text-[#1e6b8a]/70 leading-relaxed font-montserrat flex-1 mb-5">{svc.desc}</p>
                <a href={svc.href} className="inline-flex items-center gap-1 text-sm font-semibold text-[#1e6b8a] hover:text-[#12b7d6] transition-colors font-montserrat mt-auto">
                  了解更多 <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          合规与治理
      ════════════════════════════════════════ */}
      <section
        id="compliance"
        ref={complianceRef}
        className="px-5 md:px-8 lg:px-12 py-16 md:py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${complianceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] font-montserrat">合规与治理</h2>
            <p className="mt-3 text-[#1e6b8a]/70 font-montserrat max-w-2xl mx-auto text-base">
              建立在可核实资质与监管合规基础上的机构级信任。
            </p>
          </div>

          {/* 资质徽章 */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 transition-all duration-700 delay-100 ${complianceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { icon: 'ri-file-list-3-line', label: 'TCSP 持牌', sub: '通过 Aegis Custody Co. Ltd.' },
              { icon: 'ri-shield-line', label: '保险合作伙伴', sub: '机构级保险覆盖' },
              { icon: 'ri-checkbox-circle-line', label: '审计就绪', sub: '结构化治理体系' },
              { icon: 'ri-verified-badge-line', label: '受监管 · 可信赖', sub: '香港持牌机构' },
            ].map((b, i) => (
              <div key={i} className="flex flex-col items-center text-center bg-[#f0f7fc] rounded-xl p-5 border border-[#b8d9ed]/60">
                <div className="w-11 h-11 bg-[#1e6b8a] rounded-lg flex items-center justify-center mb-3">
                  <i className={`${b.icon} text-white text-xl`}></i>
                </div>
                <div className="font-bold text-[#1e3a4a] text-sm font-montserrat">{b.label}</div>
                <div className="text-xs text-[#1e6b8a]/60 font-montserrat mt-1">{b.sub}</div>
              </div>
            ))}
          </div>

          {/* 数据指标 */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${complianceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { value: '天 → 秒', label: '目标结算速度', icon: 'ri-timer-flash-line' },
              { value: '$214T', label: '全球跨境支付市场', icon: 'ri-global-line' },
              { value: '193', label: 'CIPS 覆盖国家/地区', icon: 'ri-map-2-line' },
              { value: '多重签名 / MPC', label: '密钥安全架构', icon: 'ri-key-2-line' },
            ].map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-[#1e6b8a] to-[#0b2742] rounded-xl p-5 text-center">
                <i className={`${stat.icon} text-[#f5b942] text-2xl mb-2 block`}></i>
                <div className="text-base md:text-lg font-bold text-white font-montserrat leading-tight mb-1">{stat.value}</div>
                <div className="text-xs text-white/65 font-montserrat">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          应用案例
      ════════════════════════════════════════ */}
      <section id="use-cases" className="px-5 md:px-8 lg:px-12 py-16 md:py-24 bg-[#f0f7fc]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] font-montserrat">应用案例</h2>
            <p className="mt-3 text-[#1e6b8a]/70 font-montserrat text-base">
              DACC 基础设施的真实落地部署。
            </p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {[
              { tag: '券商 API', title: 'TTL × DACC', sub: '加密赋能的券商交易系统，提供 Coin-in/Coin-out 服务与实时结算。', href: '/use-case-ttl' },
              { tag: '多链', title: 'Conflux × DACC', sub: '多资产代币化平台，支持 Hyperledger、Canton、以太坊、Conflux 即插即用跨链桥接。', href: '/use-case-conflux' },
              { tag: '交易所托管', title: '加密交易所 × DACC', sub: '已与香港 SFC 持牌交易所签署 MOU，提供冷热 HSM 托管方案。', href: '/use-case-vatp' },
              { tag: 'TCSP 支付', title: '全球商户 × DACC', sub: '在受监管的 TCSP 牌照框架下提供稳定币支付基础设施，连接加密平台与电商生态。', href: '/use-case' },
            ].map((uc, i) => (
              <a key={i} href={uc.href}
                className="bg-white rounded-2xl p-6 border border-[#b8d9ed]/60 hover:border-[#1e6b8a]/60 hover:shadow-[0_8px_24px_rgba(30,107,138,0.1)] transition-all duration-300 group block">
                <span className="inline-block bg-[#f5b942]/15 border border-[#f5b942]/50 text-[#1e3a4a] text-xs font-semibold px-2.5 py-1 rounded-full font-montserrat mb-3">{uc.tag}</span>
                <h3 className="font-bold text-[#1e3a4a] font-montserrat text-base mb-2">{uc.title}</h3>
                <p className="text-sm text-[#1e6b8a]/70 leading-relaxed font-montserrat mb-4">{uc.sub}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1e6b8a] group-hover:text-[#12b7d6] transition-colors font-montserrat">
                  了解更多 <i className="ri-arrow-right-line"></i>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          领导团队 & 合作伙伴
      ════════════════════════════════════════ */}
      <section
        id="partners"
        ref={leadershipRef}
        className="px-5 md:px-8 lg:px-12 py-16 md:py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 transition-all duration-700 ${leadershipVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* 领导团队 */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a4a] font-montserrat mb-8">领导团队</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {directors.map((d, i) => (
                  <div
                    key={d.name}
                    className={`bg-[#f0f7fc] rounded-2xl p-5 border border-[#b8d9ed]/60 hover:border-[#1e6b8a]/50 transition-all duration-300 cursor-pointer ${leadershipVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                    onClick={() => setExpandedDirector(expandedDirector === d.name ? null : d.name)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img src={d.image} alt={d.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-[#b8d9ed]" />
                      <div>
                        <div className="font-bold text-[#1e3a4a] text-sm font-montserrat">{d.name}</div>
                        <div className="text-xs text-[#1e6b8a] font-montserrat">{d.title}</div>
                      </div>
                    </div>
                    {expandedDirector === d.name && (
                      <p className="text-xs text-[#1e6b8a]/75 leading-relaxed font-montserrat border-t border-[#b8d9ed]/60 pt-3 mt-1">{d.bio}</p>
                    )}
                    <div className="text-xs text-[#1e6b8a]/50 font-montserrat mt-2 flex items-center gap-1">
                      <i className={`${expandedDirector === d.name ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>
                      {expandedDirector === d.name ? '收起' : '展开'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 合作伙伴 / 投资方 */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a4a] font-montserrat mb-8">合作伙伴</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {investors.map((inv, i) => (
                  <div
                    key={inv.name}
                    className={`bg-[#f0f7fc] rounded-xl px-4 py-4 border border-[#b8d9ed]/60 hover:border-[#1e6b8a]/50 hover:bg-white transition-all duration-300 text-center ${leadershipVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div className="font-bold text-[#1e3a4a] text-xs font-montserrat leading-snug">{inv.name}</div>
                    <div className="text-[10px] text-[#1e6b8a]/60 font-montserrat mt-1">{inv.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          行动召唤 CTA
      ════════════════════════════════════════ */}
      <section className="px-5 md:px-8 lg:px-12 py-16 md:py-20 bg-gradient-to-br from-[#1e6b8a] to-[#0b2742] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-montserrat mb-4 leading-tight">
            准备好保障您的数字资产了吗？
          </h2>
          <p className="text-white/70 font-montserrat text-base mb-8 max-w-xl mx-auto">
            与我们的团队沟通合规托管、代币化或跨境结算基础设施方案。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/contact"
              className="inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-bold text-[#1e6b8a] hover:bg-[#67e8f9] hover:text-[#031122] transition-colors">
              联系我们的团队
            </a>
            <a href="/contact"
              className="inline-flex items-center rounded-full border border-white/40 bg-transparent px-7 py-3 text-sm font-bold text-white hover:border-[#67e8f9] hover:text-[#67e8f9] transition-colors">
              申请演示
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          页脚
      ════════════════════════════════════════ */}
      <footer className="bg-[#04142b] text-white px-5 md:px-8 lg:px-12 pt-12 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            {/* 品牌 */}
            <div>
              <img
                src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png"
                alt="DACC"
                className="h-14 w-auto object-contain mb-4"
              />
              <p className="text-white/55 text-xs font-montserrat leading-relaxed">
                引领数字清算与结算的下一个十年
              </p>
            </div>
            {/* 公司 */}
            <div>
              <h4 className="font-semibold text-sm font-montserrat mb-4">公司</h4>
              <div className="space-y-2">
                <a href="#why-dacc" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">关于 DACC</a>
                <a href="#compliance" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">合规</a>
                <a href="#partners" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">领导团队</a>
                <a href="#partners" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">合作伙伴</a>
              </div>
            </div>
            {/* 服务 */}
            <div>
              <h4 className="font-semibold text-sm font-montserrat mb-4">服务</h4>
              <div className="space-y-2">
                <a href="/chain-fusion" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">ChainFusion™</a>
                <a href="/hot-wallet" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">热钱包集成</a>
                <a href="/cold-wallet" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">冷钱包基础设施</a>
                <a href="/rwa-platform" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">RWA 代币化平台</a>
              </div>
            </div>
            {/* 联系 */}
            <div>
              <h4 className="font-semibold text-sm font-montserrat mb-4">联系</h4>
              <div className="space-y-2 mb-5">
                <a href="/contact" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">联系我们</a>
                <a href="/blog" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">新闻</a>
                <a href="/en" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">English</a>
              </div>
              <h4 className="font-semibold text-sm font-montserrat mb-3">社交媒体</h4>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-[#0077b5] rounded-lg flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <i className="ri-linkedin-fill text-base"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-white/40 text-xs font-montserrat">
              版权所有 © 2026 Digital Asset Clearing Center (DACC)。保留所有权利。
            </p>
          </div>
        </div>
      </footer>

      {/* ════════════════════════════════════════
          回到顶部
      ════════════════════════════════════════ */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-6 z-50 w-11 h-11 bg-[#1e6b8a] hover:bg-[#12b7d6] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="回到顶部"
        >
          <i className="ri-arrow-up-line text-lg"></i>
        </button>
      )}
    </div>
  );
}
