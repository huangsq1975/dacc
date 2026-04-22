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
    const HOVSTR = Math.max(0, hoverStrength || 1);
    const INERT = Math.max(0, Math.min(1, inertia || 0.12));

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

// ─── Directors data ───────────────────────────────────────────────────────────
const directors = [
  {
    name: 'Serra Wei',
    title: 'Director & Founder',
    image: 'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/89c8049de2f5b1d235cddaddab5c0277.png',
    bio: 'Entrepreneur and investor with experience in traditional finance, technology and cryptocurrency. Previously at Goldman Sachs; MBA from Stanford GSB. Founder of DACC and Aegis Custody.',
  },
  {
    name: 'Larry Li',
    title: 'Director',
    image: 'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/36ca34a59e03a4f163f2a16c7321f446.png',
    bio: 'Senior executive in strategy and project management at Hong Kong Exchanges and Clearing (HKEX), with 20+ years across major financial institutions and market infrastructures.',
  },
  {
    name: 'Lynne Marlor',
    title: 'Director',
    image: 'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/ef24843cf2e0be121df5f5b4d8b37bf0.png',
    bio: 'Founder of Women in Digital Assets Forums. 30+ years in capital markets, treasury, liquidity, payments and settlements. Oxford Blockchain Strategy Programme, Saïd Business School.',
  },
  {
    name: 'Stony Yen',
    title: 'Director',
    image: 'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/58a57df25d62987b967372c0eef01a7a.png',
    bio: '20+ years in banking IT and financial software across Greater China and Singapore. Senior executive roles in financial technology and core banking system delivery.',
  },
  {
    name: 'Wendy Sun',
    title: 'Director',
    image: 'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/1c27eaf061faf24e08b0332d48dc609b.png',
    bio: '20-year global fintech veteran specialising in payments and digital financial services. Previously at Fosun, TikTok, Tencent, Grab, Ant Financial and UnionPay.',
  },
];

// ─── Investors data ───────────────────────────────────────────────────────────
const investors = [
  { name: 'Conflux / Starcoin', note: 'HKEX: 399' },
  { name: 'TTL / Kingdom', note: 'SZSE: 600446' },
  { name: 'Global Infotech', note: 'SZSE: 300465' },
  { name: 'Fosun International', note: 'HKEX: 0656' },
  { name: 'Avior Capital', note: 'Strategic Investor' },
  { name: 'Blockstone', note: 'Strategic Investor' },
  { name: 'BridgeTower Capital', note: 'Strategic Investor' },
  { name: 'Fintech World', note: 'Strategic Investor' },
  { name: 'Satoshi Ventures', note: 'Strategic Investor' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HomeEN() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
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
          NAVIGATION — Desktop
      ════════════════════════════════════════ */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden lg:block w-[92vw] max-w-[1240px]">
        <nav className="bg-white border border-[#b8d9ed]/60 rounded-2xl px-6 xl:px-8 py-3 shadow-[0_8px_32px_rgba(30,107,138,0.12)] flex items-center justify-between gap-4">
          <a href="/home-en" className="flex-shrink-0">
            <img
              src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png"
              alt="DACC"
              className="h-6 w-auto object-contain"
            />
          </a>
          <div className="flex items-center gap-5 xl:gap-7">
            <a href="#why-dacc" className={navLinkClass}>Company</a>
            <a href="#services" className={navLinkClass}>Services</a>
            <a href="#compliance" className={navLinkClass}>Compliance</a>
            <a href="#partners" className={navLinkClass}>Partners</a>
            <a href="/blog-en" className={navLinkClass}>News</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/zh"
              title="切換到中文"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#b8d9ed] bg-white text-[#1e6b8a] hover:border-[#1e6b8a] transition-colors text-base"
            >
              <i className="ri-global-line"></i>
            </a>
            <a
              href="/contact-en"
              className="inline-flex items-center rounded-full bg-[#1e6b8a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#12b7d6] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </nav>
      </div>

      {/* NAVIGATION — Mobile */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-xl border-b border-[#b8d9ed]/50 shadow-sm">
        <div className="flex items-center justify-between px-5 py-3.5">
          <a href="/home-en">
            <img
              src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png"
              alt="DACC"
              className="h-7 w-auto object-contain"
            />
          </a>
          <div className="flex items-center gap-2">
            <a href="/zh" className="border border-[#b8d9ed] rounded-full px-3 py-1.5 text-xs font-semibold text-[#1e6b8a]">中文</a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#e8f4fb] text-[#1e6b8a]"
              aria-label="Toggle menu"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#04142b]/96 backdrop-blur-md z-40 lg:hidden pt-16 overflow-y-auto">
          {!mobileSubmenu && (
            <div className="px-6 py-8 space-y-1">
              {[
                { label: 'Company', action: () => { document.getElementById('why-dacc')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); } },
                { label: 'Services', action: () => { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); } },
                { label: 'Compliance', action: () => { document.getElementById('compliance')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); } },
                { label: 'Partners', action: () => { document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); } },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center justify-between py-4 text-lg text-white border-b border-white/10 hover:text-[#67e8f9] transition-colors"
                >
                  <span>{item.label}</span>
                  <i className="ri-arrow-right-s-line text-xl"></i>
                </button>
              ))}
              <a href="/blog-en" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-4 text-lg text-white border-b border-white/10 hover:text-[#67e8f9]">
                <span>News</span>
                <i className="ri-arrow-right-s-line text-xl"></i>
              </a>
              <a href="/contact-en" onClick={() => setMobileMenuOpen(false)} className="mt-6 flex items-center justify-center rounded-full bg-[#12b7d6] py-4 text-base font-bold text-[#031122]">
                Contact Us
              </a>
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <header className="relative min-h-screen flex items-center bg-[radial-gradient(circle_at_20%_20%,rgba(103,232,249,0.18),transparent_50%),radial-gradient(circle_at_78%_18%,rgba(186,230,253,0.16),transparent_52%),linear-gradient(180deg,#6e97c4_0%,#9ec6ef_46%,#d4ebff_100%)] pt-20 lg:pt-0 overflow-hidden">
        {/* Wave animated background */}
        <WaveBackground />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: 'linear-gradient(rgba(102,153,153,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(102,153,153,0.25) 1px, transparent 1px)', backgroundSize: '72px 72px' }}>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-24 lg:pt-28 lg:pb-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen">

          {/* Left: Text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#34d5f4]/50 bg-[#0b1b31]/60 px-4 py-1.5 text-xs md:text-sm font-medium text-[#c6f6ff] tracking-wide mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#67e8f9] animate-pulse"></span>
              Licensed &amp; Insured Custody
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold leading-[1.1] text-white font-montserrat mb-5">
              <span className="whitespace-nowrap">Where CIPS meets</span>{' '}
              <span className="text-[#67e8f9]">Tokenization</span>
            </h1>

            <p className="text-base md:text-lg text-white/80 font-montserrat leading-relaxed mb-10 max-w-xl">
              Pioneering the Next Decade of Digital Clearing and Settlement
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href="/contact-en"
                className="inline-flex items-center rounded-full bg-[#12b7d6] px-7 py-3 text-sm font-bold text-[#031122] hover:bg-[#67e8f9] transition-colors">
                Get Started
              </a>
              <a href="#why-dacc"
                className="inline-flex items-center rounded-full border border-white/35 bg-white/8 px-7 py-3 text-sm font-bold text-white hover:border-[#67e8f9] hover:text-[#67e8f9] transition-colors">
                Learn More
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {['Licensed', 'Insured', 'Regulated'].map(badge => (
                <span key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
                  <i className="ri-check-line text-[#67e8f9]"></i>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Security visual */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-[380px] h-[380px]">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[#67e8f9]/20 animate-[spin_30s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#67e8f9]/60"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-[#12b7d6]/60"></div>
              </div>
              {/* Mid ring */}
              <div className="absolute inset-8 rounded-full border border-[#67e8f9]/15 animate-[spin_20s_linear_infinite_reverse]">
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#f5b942]/70"></div>
              </div>
              {/* Inner circle */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-[#0b2742]/80 to-[#1e6b8a]/60 border border-[#67e8f9]/30 backdrop-blur-sm flex items-center justify-center shadow-[0_0_60px_rgba(103,232,249,0.2)]">
                <div className="text-center">
                  <i className="ri-shield-keyhole-line text-6xl text-[#67e8f9]"></i>
                  <div className="mt-2 text-xs font-bold text-[#67e8f9]/80 tracking-widest">DACC</div>
                </div>
              </div>
              {/* Floating nodes */}
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

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 opacity-60">
          <span className="text-white/60 text-xs font-medium tracking-wider">SCROLL</span>
          <i className="ri-arrow-down-line text-white/60 text-lg animate-bounce"></i>
        </div>
      </header>

      {/* ════════════════════════════════════════
          THE CHALLENGES
      ════════════════════════════════════════ */}
      <section
        id="challenges"
        ref={challengesRef}
        className="px-5 md:px-8 lg:px-12 py-16 md:py-24 bg-[#f0f7fc]"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${challengesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] font-montserrat">The Challenges</h2>
            <p className="mt-3 text-[#1e6b8a]/70 font-montserrat max-w-2xl mx-auto text-base">
              Today's cross-border digital asset infrastructure faces three structural barriers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: 'ri-time-line',
                title: 'Slow Transactions',
                desc: 'Cross-border settlements via correspondent banking networks take 3–5 business days, locking capital and increasing counterparty risk.',
                delay: '0ms',
              },
              {
                icon: 'ri-eye-off-line',
                title: 'Lack of Transparency',
                desc: 'No real-time visibility into transaction status or fund location. Reconciliation is manual, error-prone, and costly.',
                delay: '150ms',
              },
              {
                icon: 'ri-file-warning-line',
                title: 'Fragmented Compliance',
                desc: 'Regulatory requirements differ across jurisdictions. Building a compliant multi-market operation requires significant duplication of effort.',
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
          WHY DACC
      ════════════════════════════════════════ */}
      <section
        id="why-dacc"
        ref={whyDaccRef}
        className="px-5 md:px-8 lg:px-12 py-16 md:py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${whyDaccVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] font-montserrat">Why DACC</h2>
          </div>
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">

            {/* Left: Mission card */}
            <div className={`lg:col-span-2 bg-gradient-to-br from-[#1e6b8a] to-[#0b2742] rounded-2xl p-7 lg:p-9 text-white flex flex-col justify-between transition-all duration-700 delay-100 ${whyDaccVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                  <i className="ri-shield-keyhole-line text-[#67e8f9] text-2xl"></i>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold font-montserrat mb-4 leading-snug">
                  Secure &amp; Compliant<br />Custody Solutions
                </h3>
                <p className="text-white/75 text-sm leading-relaxed font-montserrat mb-6">
                  DACC provides regulated, institutional-grade digital asset infrastructure built in Hong Kong — combining qualified custody, tokenization capability, and cross-border settlement in a single compliance-first platform.
                </p>
                <div className="space-y-3">
                  {[
                    'Hong Kong TCSP Licensed',
                    'Institutional Insurance Coverage',
                    'Multi-Signature / MPC Security',
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
                  Infrastructure for the tokenized economy.
                </p>
              </div>
            </div>

            {/* Right: 3 service cards */}
            <div className={`lg:col-span-3 flex flex-col gap-4 transition-all duration-700 delay-200 ${whyDaccVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              {[
                {
                  icon: 'ri-safe-line',
                  title: 'Qualified Custody',
                  desc: 'Cold and hot wallet solutions with HSM key security, MPC architecture, and SFC-compliant frameworks designed for VATPs and institutional clients.',
                  href: '/cold-wallet-en',
                },
                {
                  icon: 'ri-coin-line',
                  title: 'Tokenization Platform',
                  desc: 'UI-based RWA tokenization with structured metadata, multi-party authorization, and native support for Hyperledger, Canton, Ethereum, and Conflux.',
                  href: '/rwa-platform-en',
                },
                {
                  icon: 'ri-exchange-funds-line',
                  title: 'RWA Settlement',
                  desc: 'ChainFusion™ enables near-instant cross-border settlement via CIPS — used in 193 countries and regions, reducing settlement from days to seconds.',
                  href: '/chain-fusion-en',
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
                      Explore <i className="ri-arrow-right-line"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SERVICES
      ════════════════════════════════════════ */}
      <section id="services" className="px-5 md:px-8 lg:px-12 py-16 md:py-24 bg-[#f0f7fc]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] font-montserrat">Our Services</h2>
            <p className="mt-3 text-[#1e6b8a]/70 font-montserrat max-w-2xl mx-auto text-base">
              End-to-end digital asset infrastructure for regulated institutions.
            </p>
          </div>

          {/* Featured: ChainFusion */}
          <div className="mb-8 bg-gradient-to-br from-[#1e6b8a] to-[#0b2742] rounded-2xl p-7 md:p-10 border-2 border-[#f5b942]/60 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-3 py-1 mb-4 text-xs text-white font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f5b942] animate-pulse"></span>
                  Now Live: ChainFusion™
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white font-montserrat mb-3 leading-tight">
                  Cross-border settlement in <span className="text-[#f5b942]">seconds</span>
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed font-montserrat max-w-2xl">
                  DACC's ChainFusion™ connects to CIPS (Cross-border Interbank Payment System) — active in 193 countries and regions with over 1,500 participating banking institutions. Settlement time: 3–5 days → seconds.
                </p>
              </div>
              <a href="/chain-fusion-en"
                className="flex-shrink-0 inline-flex items-center rounded-full bg-[#f5b942] hover:bg-[#c97a2f] px-7 py-3 text-sm font-bold text-white transition-colors whitespace-nowrap">
                Explore ChainFusion™
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'ri-links-line', title: 'Hot Wallet Integration', desc: 'API-driven hot wallet solutions built for scale, exchange integration, and institutional key management.', href: '/hot-wallet-en' },
              { icon: 'ri-database-2-line', title: 'Cold Wallet Infrastructure', desc: 'HSM-based cold storage with layered access controls, offline signing, and full audit trail.', href: '/cold-wallet-en' },
              { icon: 'ri-coin-line', title: 'RWA Tokenization Platform', desc: 'Multi-chain RWA issuance with structured metadata and multi-party authorization on Hyperledger, Canton and EVM chains.', href: '/rwa-platform-en' },
            ].map((svc, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#b8d9ed]/60 hover:border-[#1e6b8a]/60 hover:shadow-[0_8px_24px_rgba(30,107,138,0.1)] transition-all duration-300 group flex flex-col">
                <div className="w-14 h-14 bg-[#e8f4fb] group-hover:bg-[#1e6b8a] rounded-xl flex items-center justify-center mb-5 transition-colors duration-400">
                  <i className={`${svc.icon} text-[#1e6b8a] group-hover:text-white text-2xl transition-colors duration-400`}></i>
                </div>
                <h3 className="font-bold text-[#1e3a4a] font-montserrat text-base mb-3">{svc.title}</h3>
                <p className="text-sm text-[#1e6b8a]/70 leading-relaxed font-montserrat flex-1 mb-5">{svc.desc}</p>
                <a href={svc.href} className="inline-flex items-center gap-1 text-sm font-semibold text-[#1e6b8a] hover:text-[#12b7d6] transition-colors font-montserrat mt-auto">
                  Learn More <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          COMPLIANCE & GOVERNANCE
      ════════════════════════════════════════ */}
      <section
        id="compliance"
        ref={complianceRef}
        className="px-5 md:px-8 lg:px-12 py-16 md:py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${complianceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] font-montserrat">Compliance &amp; Governance</h2>
            <p className="mt-3 text-[#1e6b8a]/70 font-montserrat max-w-2xl mx-auto text-base">
              Institutional trust built on verifiable credentials and regulatory alignment.
            </p>
          </div>

          {/* Badge row */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 transition-all duration-700 delay-100 ${complianceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { icon: 'ri-file-list-3-line', label: 'TCSP License', sub: 'via Aegis Custody Co. Ltd.' },
              { icon: 'ri-shield-line', label: 'Insurance Partner', sub: 'Institutional coverage' },
              { icon: 'ri-checkbox-circle-line', label: 'Audit Ready', sub: 'Structured governance' },
              { icon: 'ri-verified-badge-line', label: 'Regulated & Trusted', sub: 'Hong Kong licensed' },
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

          {/* Stats row */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${complianceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { value: 'Days → Seconds', label: 'Target Settlement Speed', icon: 'ri-timer-flash-line' },
              { value: '$214T', label: 'Global Cross-border Market', icon: 'ri-global-line' },
              { value: '193', label: 'Countries via CIPS', icon: 'ri-map-2-line' },
              { value: 'Multi-Sig / MPC', label: 'Key Security Architecture', icon: 'ri-key-2-line' },
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
          USE CASES (brief)
      ════════════════════════════════════════ */}
      <section id="use-cases" className="px-5 md:px-8 lg:px-12 py-16 md:py-24 bg-[#f0f7fc]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] font-montserrat">Use Cases</h2>
            <p className="mt-3 text-[#1e6b8a]/70 font-montserrat text-base">
              Real-world deployments of DACC infrastructure.
            </p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {[
              { tag: 'Broker API', title: 'TTL × DACC', sub: 'Crypto-enabled brokerage trading with coin-in/coin-out services and real-time settlement.', href: '/use-case-ttl-en' },
              { tag: 'Multi-chain', title: 'Conflux × DACC', sub: 'Multi-asset tokenization with plug-and-play cross-chain bridging across Hyperledger, Canton, Ethereum, Conflux.', href: '/use-case-conflux-en' },
              { tag: 'Exchange Custody', title: 'Crypto Exchanges × DACC', sub: 'Cold-hot HSM custody MOUs signed with SFC-licensed exchanges in Hong Kong.', href: '/use-case-vatp-en' },
              { tag: 'TCSP Payments', title: 'Global Merchants × DACC', sub: 'Stablecoin payment infrastructure under a regulated TCSP licence, bridging crypto platforms and e-commerce.', href: '/use-case-en' },
            ].map((uc, i) => (
              <a key={i} href={uc.href}
                className="bg-white rounded-2xl p-6 border border-[#b8d9ed]/60 hover:border-[#1e6b8a]/60 hover:shadow-[0_8px_24px_rgba(30,107,138,0.1)] transition-all duration-300 group block">
                <span className="inline-block bg-[#f5b942]/15 border border-[#f5b942]/50 text-[#1e3a4a] text-xs font-semibold px-2.5 py-1 rounded-full font-montserrat mb-3">{uc.tag}</span>
                <h3 className="font-bold text-[#1e3a4a] font-montserrat text-base mb-2">{uc.title}</h3>
                <p className="text-sm text-[#1e6b8a]/70 leading-relaxed font-montserrat mb-4">{uc.sub}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1e6b8a] group-hover:text-[#12b7d6] transition-colors font-montserrat">
                  Learn More <i className="ri-arrow-right-line"></i>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          LEADERSHIP & PARTNERS
      ════════════════════════════════════════ */}
      <section
        id="partners"
        ref={leadershipRef}
        className="px-5 md:px-8 lg:px-12 py-16 md:py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 transition-all duration-700 ${leadershipVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Our Leadership */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a4a] font-montserrat mb-8">Our Leadership</h2>
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
                      {expandedDirector === d.name ? 'Less' : 'More'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Partners / Investors */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a4a] font-montserrat mb-8">Our Partners</h2>
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
          CTA BANNER
      ════════════════════════════════════════ */}
      <section className="px-5 md:px-8 lg:px-12 py-16 md:py-20 bg-gradient-to-br from-[#1e6b8a] to-[#0b2742] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-montserrat mb-4 leading-tight">
            Ready to Secure Your Digital Assets?
          </h2>
          <p className="text-white/70 font-montserrat text-base mb-8 max-w-xl mx-auto">
            Talk to our team about qualified custody, tokenization, or cross-border settlement infrastructure.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/contact-en"
              className="inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-bold text-[#1e6b8a] hover:bg-[#67e8f9] hover:text-[#031122] transition-colors">
              Talk to Our Team
            </a>
            <a href="/contact-en"
              className="inline-flex items-center rounded-full border border-white/40 bg-transparent px-7 py-3 text-sm font-bold text-white hover:border-[#67e8f9] hover:text-[#67e8f9] transition-colors">
              Request Demo
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="bg-[#04142b] text-white px-5 md:px-8 lg:px-12 pt-12 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <img
                src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png"
                alt="DACC"
                className="h-14 w-auto object-contain mb-4"
              />
              <p className="text-white/55 text-xs font-montserrat leading-relaxed">
                Pioneering the Next Decade of Digital Clearing and Settlement
              </p>
            </div>
            {/* Company */}
            <div>
              <h4 className="font-semibold text-sm font-montserrat mb-4">Company</h4>
              <div className="space-y-2">
                <a href="#why-dacc" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">About DACC</a>
                <a href="#compliance" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">Compliance</a>
                <a href="#partners" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">Leadership</a>
                <a href="#partners" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">Partners</a>
              </div>
            </div>
            {/* Services */}
            <div>
              <h4 className="font-semibold text-sm font-montserrat mb-4">Services</h4>
              <div className="space-y-2">
                <a href="/chain-fusion-en" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">ChainFusion™</a>
                <a href="/hot-wallet-en" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">Hot Wallet Integration</a>
                <a href="/cold-wallet-en" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">Cold Wallet Infrastructure</a>
                <a href="/rwa-platform-en" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">RWA Tokenization Platform</a>
              </div>
            </div>
            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm font-montserrat mb-4">Contact</h4>
              <div className="space-y-2 mb-5">
                <a href="/contact-en" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">Contact Us</a>
                <a href="/blog-en" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">News</a>
                <a href="/zh" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">中文版</a>
              </div>
              {/* Social */}
              <h4 className="font-semibold text-sm font-montserrat mb-3">Social Media</h4>
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
              Copyright © 2026 Digital Asset Clearing Center (DACC). All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ════════════════════════════════════════
          SCROLL TO TOP
      ════════════════════════════════════════ */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-6 z-50 w-11 h-11 bg-[#1e6b8a] hover:bg-[#12b7d6] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <i className="ri-arrow-up-line text-lg"></i>
        </button>
      )}
    </div>
  );
}
