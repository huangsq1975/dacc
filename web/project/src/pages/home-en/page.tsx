import { useState, useEffect, useRef } from 'react';
import { Renderer, Triangle, Program, Mesh } from 'ogl';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import WaveBackground from '../../components/feature/WaveBackground';
import HeroShield from '../../components/feature/HeroShield';
import { WireframeSphere } from '../../components/feature/WireframeSphere';

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

const directorImages = [
  'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/89c8049de2f5b1d235cddaddab5c0277.png',
  'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/36ca34a59e03a4f163f2a16c7321f446.png',
  'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/ef24843cf2e0be121df5f5b4d8b37bf0.png',
  'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/58a57df25d62987b967372c0eef01a7a.png',
  'https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/1c27eaf061faf24e08b0332d48dc609b.png',
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HomeEN() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [expandedDirector, setExpandedDirector] = useState<string | null>(null);

  const directors = [0,1,2,3,4].map((i) => ({
    name: t(`home_director_${i}_name`),
    title: t(`home_director_${i}_title`),
    image: directorImages[i],
    bio: t(`home_director_${i}_bio`),
  }));

  const investors = [0,1,2,3,4,5,6,7,8].map((i) => ({
    name: t(`home_investor_${i}_name`),
    note: t(`home_investor_${i}_note`),
  }));

  const isZh = i18n.language === 'zh';

  const [challengesRef, challengesVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [whyDaccRef, whyDaccVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [complianceRef, complianceVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [leadershipRef, leadershipVisible] = useIntersectionObserver({ threshold: 0.05 });

  useEffect(() => { document.title = 'DACC - Digital Asset Clearing Center | Blockchain Solutions'; }, []);

  const navLinkClass = 'text-[#1e3a4a]/80 hover:text-[#1e6b8a] transition-colors text-sm font-semibold font-montserrat whitespace-nowrap';

  return (
    <div className="min-h-screen bg-white font-montserrat text-[#1e3a4a]">

      {/* ════════════════════════════════════════
          NAVIGATION — Desktop
      ════════════════════════════════════════ */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden lg:block w-[92vw] max-w-[1240px]">
        <nav className="bg-[#8ed3f5]/65 backdrop-blur-xl border border-[#b8d9ed]/60 rounded-2xl px-6 xl:px-8 py-3 shadow-[0_8px_32px_rgba(30,107,138,0.12)] flex items-center justify-between gap-4">
          <a href="/" className="flex-shrink-0">
            <img
              src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png"
              alt="DACC"
              className="h-6 w-auto object-contain"
            />
          </a>
          <div className="ml-auto flex items-center justify-end gap-5 xl:gap-7">
            <a href="#why-dacc" className={navLinkClass}>{t('nav_company')}</a>
            <a href="#services" className={navLinkClass}>{t('nav_services')}</a>
            <a href="#compliance" className={navLinkClass}>{t('nav_compliance')}</a>
            <a href="#partners" className={navLinkClass}>{t('nav_partners')}</a>
            <a href="/blog" className={navLinkClass}>{t('nav_news')}</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#b8d9ed] bg-transparent px-2.5 py-1.5 text-[#1e6b8a] hover:border-[#1e6b8a] hover:text-[#12b7d6] transition-colors text-xs font-semibold"
            >
              <WireframeSphere size={14} />
              <span>{isZh ? '中文' : 'EN'}</span>
            </button>
            <a
              href="/contact"
              className="inline-flex items-center rounded-full bg-[#1e6b8a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#12b7d6] transition-colors"
            >
              {t('nav_contact_us')}
            </a>
          </div>
        </nav>
      </div>

      {/* NAVIGATION — Mobile */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-[#8ed3f5]/70 backdrop-blur-xl border-b border-[#b8d9ed]/50 shadow-sm">
        <div className="flex items-center justify-between px-5 py-3.5">
          <a href="/">
            <img
              src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png"
              alt="DACC"
              className="h-7 w-auto object-contain"
            />
          </a>
          <div className="flex items-center gap-2">
            <button onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')} className="inline-flex items-center gap-1 rounded-full border border-[#b8d9ed] bg-transparent px-2 py-1.5 text-xs font-semibold text-[#1e6b8a]">
              <WireframeSphere size={12} />
              <span>{isZh ? '中文' : 'EN'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#e8f4fb] text-[#1e6b8a]"
              aria-label={t('mobile_toggle_menu')}
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
                { label: t('nav_company'), action: () => { document.getElementById('why-dacc')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); } },
                { label: t('nav_services'), action: () => { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); } },
                { label: t('nav_compliance'), action: () => { document.getElementById('compliance')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); } },
                { label: t('nav_partners'), action: () => { document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); } },
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
              <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-4 text-lg text-white border-b border-white/10 hover:text-[#67e8f9]">
                <span>{t('nav_news')}</span>
                <i className="ri-arrow-right-s-line text-xl"></i>
              </a>
              <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="mt-6 flex items-center justify-center rounded-full bg-[#12b7d6] py-4 text-base font-bold text-[#031122]">
                {t('nav_contact_us')}
              </a>
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <header className="relative min-h-screen flex items-center bg-[radial-gradient(circle_at_20%_20%,rgba(150,205,235,0.15),transparent_50%),radial-gradient(circle_at_78%_18%,rgba(180,220,245,0.12),transparent_52%),linear-gradient(180deg,#7aaec9_0%,#a8c8df_50%,#cee3f2_100%)] pt-14 lg:pt-0 overflow-hidden">
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
              {t('home_hero_badge')}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold leading-[1.1] text-white font-montserrat mb-5 [text-shadow:0_2px_16px_rgba(8,30,60,0.45),0_1px_4px_rgba(8,30,60,0.30)]">
              <span className="whitespace-nowrap">{t('home_hero_title')}</span>{' '}
              <span className="text-[#67e8f9]">{t('home_hero_title_highlight')}</span>
            </h1>

            <p className="text-base md:text-lg text-white/80 font-montserrat leading-relaxed mb-10 max-w-xl [text-shadow:0_1px_10px_rgba(8,30,60,0.40)]">
              {t('home_hero_subtitle')}
            </p>

            <div className="flex flex-wrap gap-4 md:gap-5 mb-12">
              <a href="/contact"
                className="inline-flex items-center rounded-full border border-[#12b7d6] bg-[#12b7d6] px-8 py-3.5 text-sm font-bold text-[#031122] shadow-[0_10px_30px_rgba(18,183,214,0.35)] hover:bg-[#67e8f9] hover:border-[#67e8f9] hover:-translate-y-0.5 transition-all duration-200">
                {t('home_hero_cta_primary')}
              </a>
              <a href="#why-dacc"
                className="inline-flex items-center rounded-full border-2 border-white/80 bg-transparent px-8 py-3.5 text-sm font-bold text-white hover:border-[#67e8f9] hover:text-[#67e8f9] hover:bg-white/10 transition-all duration-200">
                {t('home_hero_cta_secondary')}
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: t('home_hero_badge_licensed'), icon: 'ri-award-line' },
                { label: t('home_hero_badge_insured'), icon: 'ri-safe-2-line' },
                { label: t('home_hero_badge_regulated'), icon: 'ri-file-shield-2-line' },
              ].map(({ label, icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#9ed8ec]/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.12)_100%)] px-4 py-2 text-xs font-bold tracking-wide text-white shadow-[0_6px_18px_rgba(7,28,56,0.22)] backdrop-blur-md"
                >
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0d2b4a] shadow-[inset_0_0_0_1px_rgba(103,232,249,0.35)]">
                    <i className={`${icon} text-[11px] text-[#67e8f9]`}></i>
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Security visual */}
          <HeroShield />
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 opacity-60">
          <span className="text-white/60 text-xs font-medium tracking-wider">{t('home_hero_scroll')}</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] font-montserrat">{t('home_challenges_title')}</h2>
            <p className="mt-3 text-[#1e6b8a]/70 font-montserrat max-w-2xl mx-auto text-base">
              {t('home_challenges_subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: 'ri-time-line',
                title: t('home_challenges_0_title'),
                desc: t('home_challenges_0_desc'),
                delay: '0ms',
              },
              {
                icon: 'ri-eye-off-line',
                title: t('home_challenges_1_title'),
                desc: t('home_challenges_1_desc'),
                delay: '150ms',
              },
              {
                icon: 'ri-file-warning-line',
                title: t('home_challenges_2_title'),
                desc: t('home_challenges_2_desc'),
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] font-montserrat">{t('home_why_title')}</h2>
          </div>
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">

            {/* Left: Mission card */}
            <div className={`lg:col-span-2 bg-gradient-to-br from-[#1e6b8a] to-[#0b2742] rounded-2xl p-7 lg:p-9 text-white flex flex-col justify-between transition-all duration-700 delay-100 ${whyDaccVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                  <i className="ri-shield-keyhole-line text-[#67e8f9] text-2xl"></i>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold font-montserrat mb-4 leading-snug">
                  {t('home_why_card_title')}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed font-montserrat mb-6">
                  {t('home_why_card_desc')}
                </p>
                <div className="space-y-3">
                  {[
                    t('home_why_card_pt0'),
                    t('home_why_card_pt1'),
                    t('home_why_card_pt2'),
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
                  {t('home_why_card_footer')}
                </p>
              </div>
            </div>

            {/* Right: 3 service cards */}
            <div className={`lg:col-span-3 flex flex-col gap-4 transition-all duration-700 delay-200 ${whyDaccVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              {[
                {
                  icon: 'ri-safe-line',
                  title: t('home_why_svc0_title'),
                  desc: t('home_why_svc0_desc'),
                  href: '/cold-wallet-en',
                },
                {
                  icon: 'ri-coin-line',
                  title: t('home_why_svc1_title'),
                  desc: t('home_why_svc1_desc'),
                  href: '/rwa-platform-en',
                },
                {
                  icon: 'ri-exchange-funds-line',
                  title: t('home_why_svc2_title'),
                  desc: t('home_why_svc2_desc'),
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
                      {t('home_why_explore')} <i className="ri-arrow-right-line"></i>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] font-montserrat">{t('home_services_title')}</h2>
            <p className="mt-3 text-[#1e6b8a]/70 font-montserrat max-w-2xl mx-auto text-base">
              {t('home_services_subtitle')}
            </p>
          </div>

          {/* Featured: ChainFusion */}
          <div className="mb-8 bg-gradient-to-br from-[#1e6b8a] to-[#0b2742] rounded-2xl p-7 md:p-10 border-2 border-[#f5b942]/60 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-3 py-1 mb-4 text-xs text-white font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f5b942] animate-pulse"></span>
                  {t('home_services_chainfusion_live')}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white font-montserrat mb-3 leading-tight">
                  {t('home_services_chainfusion_title')} <span className="text-[#f5b942]">{t('home_services_chainfusion_title_highlight')}</span>
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed font-montserrat max-w-2xl">
                  {t('home_services_chainfusion_desc')}
                </p>
              </div>
              <a href="/chain-fusion"
                className="flex-shrink-0 inline-flex items-center rounded-full bg-[#f5b942] hover:bg-[#c97a2f] px-7 py-3 text-sm font-bold text-white transition-colors whitespace-nowrap">
                {t('home_services_chainfusion_btn')}
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'ri-links-line', title: t('home_services_0_title'), desc: t('home_services_0_desc'), href: '/hot-wallet-en' },
              { icon: 'ri-database-2-line', title: t('home_services_1_title'), desc: t('home_services_1_desc'), href: '/cold-wallet-en' },
              { icon: 'ri-coin-line', title: t('home_services_2_title'), desc: t('home_services_2_desc'), href: '/rwa-platform-en' },
            ].map((svc, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#b8d9ed]/60 hover:border-[#1e6b8a]/60 hover:shadow-[0_8px_24px_rgba(30,107,138,0.1)] transition-all duration-300 group flex flex-col">
                <div className="w-14 h-14 bg-[#e8f4fb] group-hover:bg-[#1e6b8a] rounded-xl flex items-center justify-center mb-5 transition-colors duration-400">
                  <i className={`${svc.icon} text-[#1e6b8a] group-hover:text-white text-2xl transition-colors duration-400`}></i>
                </div>
                <h3 className="font-bold text-[#1e3a4a] font-montserrat text-base mb-3">{svc.title}</h3>
                <p className="text-sm text-[#1e6b8a]/70 leading-relaxed font-montserrat flex-1 mb-5">{svc.desc}</p>
                <a href={svc.href} className="inline-flex items-center gap-1 text-sm font-semibold text-[#1e6b8a] hover:text-[#12b7d6] transition-colors font-montserrat mt-auto">
                  {t('home_services_learn_more')} <i className="ri-arrow-right-line"></i>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] font-montserrat">{t('home_compliance_title')}</h2>
            <p className="mt-3 text-[#1e6b8a]/70 font-montserrat max-w-2xl mx-auto text-base">
              {t('home_compliance_subtitle')}
            </p>
          </div>

          {/* Badge row */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 transition-all duration-700 delay-100 ${complianceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { icon: 'ri-file-list-3-line', label: t('home_compliance_badge0_label'), sub: t('home_compliance_badge0_sub') },
              { icon: 'ri-shield-line', label: t('home_compliance_badge1_label'), sub: t('home_compliance_badge1_sub') },
              { icon: 'ri-checkbox-circle-line', label: t('home_compliance_badge2_label'), sub: t('home_compliance_badge2_sub') },
              { icon: 'ri-verified-badge-line', label: t('home_compliance_badge3_label'), sub: t('home_compliance_badge3_sub') },
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
              { value: t('home_compliance_stat0_value'), label: t('home_compliance_stat0_label'), icon: 'ri-timer-flash-line' },
              { value: t('home_compliance_stat1_value'), label: t('home_compliance_stat1_label'), icon: 'ri-global-line' },
              { value: t('home_compliance_stat2_value'), label: t('home_compliance_stat2_label'), icon: 'ri-map-2-line' },
              { value: t('home_compliance_stat3_value'), label: t('home_compliance_stat3_label'), icon: 'ri-key-2-line' },
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a4a] font-montserrat">{t('home_usecases_title')}</h2>
            <p className="mt-3 text-[#1e6b8a]/70 font-montserrat text-base">
              {t('home_usecases_subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {[
              { tag: t('home_usecases_0_tag'), title: t('home_usecases_0_title'), sub: t('home_usecases_0_sub'), href: '/use-case-ttl-en' },
              { tag: t('home_usecases_1_tag'), title: t('home_usecases_1_title'), sub: t('home_usecases_1_sub'), href: '/use-case-conflux-en' },
              { tag: t('home_usecases_2_tag'), title: t('home_usecases_2_title'), sub: t('home_usecases_2_sub'), href: '/use-case-vatp-en' },
              { tag: t('home_usecases_3_tag'), title: t('home_usecases_3_title'), sub: t('home_usecases_3_sub'), href: '/use-case-en' },
            ].map((uc, i) => (
              <a key={i} href={uc.href}
                className="bg-white rounded-2xl p-6 border border-[#b8d9ed]/60 hover:border-[#1e6b8a]/60 hover:shadow-[0_8px_24px_rgba(30,107,138,0.1)] transition-all duration-300 group block">
                <span className="inline-block bg-[#f5b942]/15 border border-[#f5b942]/50 text-[#1e3a4a] text-xs font-semibold px-2.5 py-1 rounded-full font-montserrat mb-3">{uc.tag}</span>
                <h3 className="font-bold text-[#1e3a4a] font-montserrat text-base mb-2">{uc.title}</h3>
                <p className="text-sm text-[#1e6b8a]/70 leading-relaxed font-montserrat mb-4">{uc.sub}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1e6b8a] group-hover:text-[#12b7d6] transition-colors font-montserrat">
                  {t('home_usecases_learn_more')} <i className="ri-arrow-right-line"></i>
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
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a4a] font-montserrat mb-8">{t('home_leadership_title')}</h2>
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
                      {expandedDirector === d.name ? t('home_director_collapse') : t('home_director_expand')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Partners / Investors */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a4a] font-montserrat mb-8">{t('home_partners_title')}</h2>
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
            {t('home_cta_title')}
          </h2>
          <p className="text-white/70 font-montserrat text-base mb-8 max-w-xl mx-auto">
            {t('home_cta_desc')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/contact"
              className="inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-bold text-[#1e6b8a] hover:bg-[#67e8f9] hover:text-[#031122] transition-colors">
              {t('home_cta_btn1')}
            </a>
            <a href="/contact"
              className="inline-flex items-center rounded-full border border-white/40 bg-transparent px-7 py-3 text-sm font-bold text-white hover:border-[#67e8f9] hover:text-[#67e8f9] transition-colors">
              {t('home_cta_btn2')}
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
                {t('footer_tagline')}
              </p>
            </div>
            {/* Company */}
            <div>
              <h4 className="font-semibold text-sm font-montserrat mb-4">{t('footer_company')}</h4>
              <div className="space-y-2">
                <a href="#why-dacc" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">{t('home_footer_about')}</a>
                <a href="#compliance" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">{t('footer_compliance')}</a>
                <a href="#partners" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">{t('footer_leadership')}</a>
                <a href="#partners" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">{t('footer_partners')}</a>
              </div>
            </div>
            {/* Services */}
            <div>
              <h4 className="font-semibold text-sm font-montserrat mb-4">{t('footer_services')}</h4>
              <div className="space-y-2">
                <a href="/chain-fusion" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">{t('home_footer_chainfusion')}</a>
                <a href="/hot-wallet" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">{t('home_footer_hot_wallet')}</a>
                <a href="/cold-wallet" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">{t('home_footer_cold_wallet')}</a>
                <a href="/rwa-platform" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">{t('home_footer_rwa')}</a>
              </div>
            </div>
            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm font-montserrat mb-4">{t('footer_contact')}</h4>
              <div className="space-y-2 mb-5">
                <a href="/contact" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">{t('footer_contact_us')}</a>
                <a href="/blog" className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">{t('nav_news')}</a>
                <button onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')} className="block text-white/55 hover:text-[#67e8f9] text-xs font-montserrat transition-colors">{isZh ? 'English Version' : '中文版'}</button>
              </div>
              {/* Social */}
              <h4 className="font-semibold text-sm font-montserrat mb-3">{t('footer_social')}</h4>
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
              {t('footer_copyright')}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
