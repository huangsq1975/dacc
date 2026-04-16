import { useState, useEffect, useRef } from 'react';
import { Renderer, Triangle, Program, Mesh } from 'ogl';
import AdvisorsCarouselEN from '../../components/feature/AdvisorsCarouselEN';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

// Prism Component
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
    const RSX = 1;
    const RSY = 1;
    const RSZ = 1;
    const TS = Math.max(0, timeScale || 1);
    const HOVSTR = Math.max(0, hoverStrength || 1);
    const INERT = Math.max(0, Math.min(1, inertia || 0.12));

    // Clamp DPR to reduce fragment shader workload on high-density screens.
    const maxDpr = window.innerWidth < 1024 ? 1.25 : 1.5;
    const dpr = Math.min(maxDpr, window.devicePixelRatio || 1);
    
    let renderer;
    let gl;
    
    try {
      renderer = new Renderer({
        dpr,
        alpha: transparent,
        antialias: false
      });
      gl = renderer.gl;
      
      if (!gl) {
        console.warn('WebGL not supported, skipping Prism animation');
        return;
      }
    } catch (error) {
      console.warn('Failed to create WebGL context:', error);
      return;
    }

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);

    Object.assign(gl.canvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      display: 'block'
    });
    container.appendChild(gl.canvas);

    const vertex = /* glsl */ `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = /* glsl */ `
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

      vec4 tanh4(vec4 x){
        vec4 e2x = exp(2.0*x);
        return (e2x - 1.0) / (e2x + 1.0);
      }

      float rand(vec2 co){
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float sdOctaAnisoInv(vec3 p){
        vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);
        float m = q.x + q.y + q.z - 1.0;
        return m * uMinAxis * 0.5773502691896258;
      }

      float sdPyramidUpInv(vec3 p){
        float oct = sdOctaAnisoInv(p);
        float halfSpace = -p.y;
        return max(oct, halfSpace);
      }

      mat3 hueRotation(float a){
        float c = cos(a), s = sin(a);
        mat3 W = mat3(
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114
        );
        mat3 U = mat3(
           0.701, -0.587, -0.114,
          -0.299,  0.413, -0.114,
          -0.300, -0.588,  0.886
        );
        mat3 V = mat3(
           0.168, -0.331,  0.500,
           0.328,  0.035, -0.500,
          -0.497,  0.296,  0.201
        );
        return W + U * c + V * s;
      }

      void main(){
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;

        float z = 5.0;
        float d = 0.0;

        vec3 p;
        vec4 o = vec4(0.0);

        float centerShift = uCenterShift;
        float cf = uColorFreq;

        mat2 wob = mat2(1.0);
        if (uUseBaseWobble == 1) {
          float t = iTime * uTimeScale;
          float c0 = cos(t + 0.0);
          float c1 = cos(t + 33.0);
          float c2 = cos(t + 11.0);
          wob = mat2(c0, c1, c2, c0);
        }

        const int STEPS = 100;
        for (int i = 0; i < STEPS; i++) {
          p = vec3(f, z);
          p.xz = p.xz * wob;
          p = uRot * p;
          vec3 q = p;
          q.y += centerShift;
          d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));
          z -= d;
          o += (sin((p.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
        }

        o = tanh4(o * o * (uGlow * uBloom) / 1e5);

        vec3 col = o.rgb;
        float n = rand(gl_FragCoord.xy + vec2(iTime));
        col += (n - 0.5) * uNoise;
        col = clamp(col, 0.0, 1.0);

        float L = dot(col, vec3(0.2126, 0.7152, 0.0722));
        col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);

        if(abs(uHueShift) > 0.0001){
          col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);
        }

        gl_FragColor = vec4(col, o.a);
      }
    `;

    const geometry = new Triangle(gl);
    const iResBuf = new Float32Array(2);
    const offsetPxBuf = new Float32Array(2);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iResolution: { value: iResBuf },
        iTime: { value: 0 },
        uHeight: { value: H },
        uBaseHalf: { value: BASE_HALF },
        uUseBaseWobble: { value: 1 },
        uRot: { value: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]) },
        uGlow: { value: GLOW },
        uOffsetPx: { value: offsetPxBuf },
        uNoise: { value: NOISE },
        uSaturation: { value: SAT },
        uScale: { value: SCALE },
        uHueShift: { value: HUE },
        uColorFreq: { value: CFREQ },
        uBloom: { value: BLOOM },
        uCenterShift: { value: H * 0.25 },
        uInvBaseHalf: { value: 1 / BASE_HALF },
        uInvHeight: { value: 1 / H },
        uMinAxis: { value: Math.min(BASE_HALF, H) },
        uPxScale: {
          value: 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE)
        },
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
      const cy = Math.cos(yawY),
        sy = Math.sin(yawY);
      const cx = Math.cos(pitchX),
        sx = Math.sin(pitchX);
      const cz = Math.cos(rollZ),
        sz = Math.sin(rollZ);
      const r00 = cy * cz + sy * sx * sz;
      const r01 = -cy * sz + sy * sx * cz;
      const r02 = sy * cx;

      const r10 = cx * sz;
      const r11 = cx * cz;
      const r12 = -sx;

      const r20 = -sy * cz + cy * sx * sz;
      const r21 = sy * sz + cy * sx * cz;
      const r22 = cy * cx;

      out[0] = r00;
      out[1] = r10;
      out[2] = r20;
      out[3] = r01;
      out[4] = r11;
      out[5] = r21;
      out[6] = r02;
      out[7] = r12;
      out[8] = r22;
      return out;
    };

    const NOISE_IS_ZERO = NOISE < 1e-6;
    let raf = 0;
    const t0 = performance.now();
    const startRAF = () => {
      if (raf) return;
      raf = requestAnimationFrame(render);
    };
    const stopRAF = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const rnd = () => Math.random();
    const wX = (0.3 + rnd() * 0.6) * RSX;
    const wY = (0.2 + rnd() * 0.7) * RSY;
    const wZ = (0.1 + rnd() * 0.5) * RSZ;
    const phX = rnd() * Math.PI * 2;
    const phZ = rnd() * Math.PI * 2;

    let yaw = 0,
      pitch = 0,
      roll = 0;
    let targetYaw = 0,
      targetPitch = 0;
    const lerp = (a, b, t) => a + (b - a) * t;

    const pointer = { x: 0, y: 0, inside: true };
    const onMove = e => {
      const ww = Math.max(1, window.innerWidth);
      const wh = Math.max(1, window.innerHeight);
      const cx = ww * 0.5;
      const cy = wh * 0.5;
      const nx = (e.clientX - cx) / (ww * 0.5);
      const ny = (e.clientY - cy) / (wh * 0.5);
      pointer.x = Math.max(-1, Math.min(1, nx));
      pointer.y = Math.max(-1, Math.min(1, ny));
      pointer.inside = true;
    };
    const onLeave = () => {
      pointer.inside = false;
    };
    const onBlur = () => {
      pointer.inside = false;
    };

    let onPointerMove = null;
    if (animationType === 'hover') {
      onPointerMove = e => {
        onMove(e);
        startRAF();
      };
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('mouseleave', onLeave);
      window.addEventListener('blur', onBlur);
      program.uniforms.uUseBaseWobble.value = 0;
    } else if (animationType === '3drotate') {
      program.uniforms.uUseBaseWobble.value = 0;
    } else {
      program.uniforms.uUseBaseWobble.value = 1;
    }

    const render = t => {
      const time = (t - t0) * 0.001;
      program.uniforms.iTime.value = time;

      let continueRAF = true;

      if (animationType === 'hover') {
        const maxPitch = 0.6 * HOVSTR;
        const maxYaw = 0.6 * HOVSTR;
        targetYaw = (pointer.inside ? -pointer.x : 0) * maxYaw;
        targetPitch = (pointer.inside ? pointer.y : 0) * maxPitch;
        const prevYaw = yaw;
        const prevPitch = pitch;
        const prevRoll = roll;
        yaw = lerp(prevYaw, targetYaw, INERT);
        pitch = lerp(prevPitch, targetPitch, INERT);
        roll = lerp(prevRoll, 0, 0.1);
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);

        if (NOISE_IS_ZERO) {
          const settled =
            Math.abs(yaw - targetYaw) < 1e-4 && Math.abs(pitch - targetPitch) < 1e-4 && Math.abs(roll) < 1e-4;
          if (settled) continueRAF = false;
        }
      } else if (animationType === '3drotate') {
        const tScaled = time * TS;
        yaw = tScaled * wY;
        pitch = Math.sin(tScaled * wX + phX) * 0.6;
        roll = Math.sin(tScaled * wZ + phZ) * 0.5;
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);
        if (TS < 1e-6) continueRAF = false;
      } else {
        rotBuf[0] = 1;
        rotBuf[1] = 0;
        rotBuf[2] = 0;
        rotBuf[3] = 0;
        rotBuf[4] = 1;
        rotBuf[5] = 0;
        rotBuf[6] = 0;
        rotBuf[7] = 0;
        rotBuf[8] = 1;
        program.uniforms.uRot.value = rotBuf;
        if (TS < 1e-6) continueRAF = false;
      }

      renderer.render({ scene: mesh });
      if (continueRAF) {
        raf = requestAnimationFrame(render);
      } else {
        raf = 0;
      }
    };

    if (suspendWhenOffscreen) {
      const io = new IntersectionObserver(entries => {
        const vis = entries.some(e => e.isIntersecting);
        if (vis) startRAF();
        else stopRAF();
      });
      io.observe(container);
      startRAF();
      container.__prismIO = io;
    } else {
      startRAF();
    }

    return () => {
      stopRAF();
      ro.disconnect();
      if (animationType === 'hover') {
        if (onPointerMove) window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('mouseleave', onLeave);
        window.removeEventListener('blur', onBlur);
      }
      if (suspendWhenOffscreen) {
        const io = container.__prismIO;
        if (io) io.disconnect();
        delete container.__prismIO;
      }
      if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);
    };
  }, [
    height,
    baseWidth,
    animationType,
    glow,
    noise,
    offset?.x,
    offset?.y,
    scale,
    transparent,
    hueShift,
    colorFrequency,
    timeScale,
    hoverStrength,
    inertia,
    bloom,
    suspendWhenOffscreen
  ]);

  return <div className="absolute inset-0 w-full h-full" ref={containerRef} />;
};

export default function HomeEN() {
  const [scrolled, setScrolled] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const [whyItMattersRef, isWhyItMattersVisible] = useIntersectionObserver({ threshold: 0.2 });

  useEffect(() => {
    let rafId = 0;

    const updateScrolled = () => {
      rafId = 0;
      const next = window.scrollY > 50;
      setScrolled(prev => (prev === next ? prev : next));
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrolled();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navTextClass = 'text-[#0b2742]/90 hover:text-[#0f6f8f]';

  const navOutlineClass = 'border-[#0b2742]/25 bg-white/40 text-[#0b2742]/85 hover:text-[#0f6f8f] hover:border-[#0f6f8f]/50';

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-white">
      {/* Floating Navigation - Desktop */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
        <nav className={`bg-[#d8f0ff]/90 backdrop-blur-md w-[92vw] max-w-[1240px] border border-[#0b2742]/25 rounded-2xl px-6 xl:px-8 py-3 transition-all duration-300 shadow-[0_14px_40px_rgba(0,0,0,0.2)]`}>
          <div className="flex items-center justify-between gap-4 xl:gap-6">
            <a href="/home-en" className="cursor-pointer flex-shrink-0">
              <img 
                src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" 
                alt="DACC Logo" 
                className="h-6 w-auto object-contain"
              />
            </a>
            <div className="ml-auto flex items-center gap-4 xl:gap-6">
              <a href="#why-it-matters" className={`${navTextClass} transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium`}>
                Company
              </a>
              <a href="#solutions" className={`${navTextClass} transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium`}>
                Qualified Custodian
              </a>
              <a href="#Services" className={`${navTextClass} transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium`}>
                Services
              </a>
              <a href="#ecosystem" className={`${navTextClass} transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium`}>
                Clients
              </a>
              <a href="/blog-en" className={`${navTextClass} transition-colors cursor-pointer text-sm whitespace-nowrap font-montserrat font-medium`}>
                News
              </a>
              <a
                href="/zh"
                aria-label="切換到中文"
                title="Switch to Chinese"
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${navOutlineClass}`}
              >
                <i className="ri-global-line text-lg"></i>
              </a>
              <a href="/contact-en" className="inline-flex items-center rounded-full bg-[#12b7d6] px-3 xl:px-4 py-2 text-xs xl:text-sm font-semibold text-[#031122] hover:bg-[#67e8f9] transition-colors whitespace-nowrap">
                Contact Us
                <i className="ri-arrow-right-up-line ml-1 text-sm hidden xl:inline-block"></i>
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Top Bar - Logo + Menu + Language */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-[var(--color-bg-deep)]/90 backdrop-blur-xl border-b border-white/10 shadow-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <a href="/home-en" className="block cursor-pointer">
            <img 
              src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" 
              alt="DACC Logo" 
              className="h-8 w-auto object-contain"
            />
          </a>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white hover:text-[#67e8f9] transition-all duration-300 text-sm"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
            <a href="/zh" className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm text-white hover:text-[#67e8f9] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium">
              中文
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1e6b8a]/95 backdrop-blur-md z-40 lg:hidden pt-20">
          {/* Main Menu */}
          {!mobileSubmenu && (
            <div className="flex flex-col h-full px-6 py-8">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const servicesSection = document.getElementById('Services');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>Services</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('solutions')}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>Solutions</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('useCasesEN')}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>Use Cases</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => {
                    const ecosystemSection = document.getElementById('ecosystem');
                    if (ecosystemSection) {
                      ecosystemSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>Investors</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a
                  href="/blog-en"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>News</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a
                  href="/contact-en"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                >
                  <span>Contact Us</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
              </div>
            </div>
          )}

          {/* Solutions Submenu */}
          {mobileSubmenu === 'solutions' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e6b8a]/20">
                <button
                  onClick={() => setMobileSubmenu(null)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"
                >
                  <i className="ri-arrow-left-line text-2xl"></i>
                </button>
                <span className="text-lg font-semibold text-white">Solutions</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-2">
                  <a
                    href="/hot-wallet-en"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    Hot Wallet Integration
                  </a>
                  <a
                    href="/cold-wallet-en"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    Cold Wallet
                  </a>
                  <a
                    href="/rwa-platform-en"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    RWA Tokenization Platform
                  </a>
                  <a
                    href="/chain-fusion-en"
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
          {mobileSubmenu === 'useCasesEN' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e6b8a]/20">
                <button
                  onClick={() => setMobileSubmenu(null)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-[#f5b942] transition-colors"
                >
                  <i className="ri-arrow-left-line text-2xl"></i>
                </button>
                <span className="text-lg font-semibold text-white">Use Cases</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <p className="text-white/80 text-sm mb-6">Explore our use cases</p>
                <div className="space-y-2">
                  <a
                    href="/use-case-en"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    Global Merchants x DACC
                  </a>
                  <a
                    href="/use-case-ttl-en"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    TTL × DACC
                  </a>
                  <a
                    href="/use-case-conflux-en"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    Conflux x DACC
                  </a>
                  <a
                    href="/use-case-vatp-en"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-white hover:text-[#f5b942] transition-colors border-b border-white/20"
                  >
                    Crypto Exchanges x DACC
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col pt-24 md:pt-0 bg-[radial-gradient(circle_at_20%_20%,rgba(103,232,249,0.18),transparent_50%),radial-gradient(circle_at_78%_18%,rgba(186,230,253,0.16),transparent_52%),linear-gradient(180deg,#6e97c4_0%,#9ec6ef_46%,#d4ebff_100%)]">
        <div className="flex-1 flex items-center justify-center px-4 md:px-6 relative">
          {/* Prism Background */}
          <Prism
            animationType="3drotate"
            glow={0.7}
            scale={4.2}
            hueShift={0.15}
            colorFrequency={0.85}
            timeScale={0.4}
            transparent={true}
            bloom={0.78}
            hoverStrength={1.1}
            inertia={0.05}
            noise={0}
            suspendWhenOffscreen={true}
          />

          <div className="w-full max-w-5xl mx-auto relative z-10 text-left">
            <div className="absolute -inset-x-2 md:-inset-x-8 inset-y-4 md:inset-y-2 -z-10 rounded-[2.5rem] bg-[#04142b]/42 backdrop-blur-[2px]"></div>
            <div className="inline-flex items-center rounded-full border border-[#34d5f4]/45 bg-[#0b1b31]/65 px-4 py-1.5 text-xs md:text-sm tracking-wide text-[#c6f6ff] mb-6 md:mb-8">
              Licensed & Insured Custody
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-[4rem] font-bold leading-[1.1] mb-5 md:mb-7 font-montserrat max-w-5xl text-white">
              Guardian of Your<br />
              <span className="text-[#67e8f9]">Digital Assets</span>
            </h1>
            <p className="text-base md:text-xl text-white/75 mb-9 md:mb-12 max-w-3xl leading-relaxed font-montserrat font-medium">
              Institutional, compliance-first custody to help enterprises grow securely.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4">
              <a
                href="#why-it-matters"
                className="inline-flex items-center justify-center rounded-full bg-[#12b7d6] px-7 py-3 text-sm md:text-base font-semibold text-[#031122] hover:bg-[#67e8f9] transition-colors min-w-[170px]"
              >
                Learn More
              </a>
              <a
                href="/contact-en"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/5 px-7 py-3 text-sm md:text-base font-semibold text-white hover:border-[#67e8f9] hover:text-[#67e8f9] transition-colors min-w-[170px]"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(rgba(102,153,153,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(102,153,153,0.2) 1px, transparent 1px)', backgroundSize: '72px 72px' }}></div>
          <div className="absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-[#7dd3fc]/40 via-[#7dd3fc]/20 to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-[22%] bg-gradient-to-l from-[#7dd3fc]/40 via-[#7dd3fc]/20 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,113,188,0.15),transparent_54%)]"></div>
          <div className="absolute top-[16%] left-[12%] w-80 h-80 bg-[#0071bc]/14 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[14%] right-[10%] w-[28rem] h-[28rem] bg-[#005dec]/12 rounded-full blur-3xl"></div>
          <div className="absolute top-[44%] left-[46%] w-56 h-56 bg-[#7a898c]/10 rounded-full blur-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0066cc]/5 to-[#031a46]/14"></div>
        </div>
      </header>

      {/* Why It Matters */}
      <section id="why-it-matters" ref={whyItMattersRef} className="px-4 md:px-6 py-16 md:py-24 lg:px-12 bg-[var(--color-bg-sky-light)] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f5b942]/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c97a2f]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        <div className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 ${isWhyItMattersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Left Column */}
            <div className={`transition-all duration-1000 delay-300 h-full flex flex-col ${isWhyItMattersVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="flex items-center space-x-3 mb-6 group cursor-default h-[48px]">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1e6b8a] to-[#1e3a4a] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transform group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500">
                  <i className="ri-shield-keyhole-line text-white text-2xl animate-pulse"></i>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#1e6b8a] transition-all duration-500">Why It Matters</h3>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-[#b8d9ed]/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(245,185,66,0.15)] hover:border-[#f5b942]/50 transition-all duration-500 group relative overflow-hidden flex-grow flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#f5b942]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div>
                  <p className="text-lg font-medium text-[#1e6b8a] leading-relaxed mb-8 border-l-4 border-[#e84a4a] pl-4 group-hover:border-[#f5b942] transition-colors duration-500 relative z-10">
                    Tokenization scales when infrastructure supports:
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                    <div className="flex items-start space-x-4 group/item cursor-pointer hover:-translate-y-1 transition-transform duration-300">
                      <div className="w-12 h-12 bg-[#f5b942]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-gradient-to-br group-hover/item:from-[#f5b942] group-hover/item:to-[#c97a2f] group-hover/item:shadow-lg transition-all duration-300">
                        <i className="ri-shield-check-line text-[#c97a2f] group-hover/item:text-white text-2xl group-hover/item:scale-110 transition-all duration-300"></i>
                      </div>
                      <div className="pt-2">
                        <h4 className="font-bold text-[#1e6b8a] transition-colors duration-300 mb-1 text-base">Secure custody and settlement</h4>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group/item cursor-pointer hover:-translate-y-1 transition-transform duration-300">
                      <div className="w-12 h-12 bg-[#f5b942]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-gradient-to-br group-hover/item:from-[#f5b942] group-hover/item:to-[#c97a2f] group-hover/item:shadow-lg transition-all duration-300">
                        <i className="ri-settings-3-line text-[#c97a2f] group-hover/item:text-white text-2xl group-hover/item:rotate-180 transition-all duration-500"></i>
                      </div>
                      <div className="pt-2">
                        <h4 className="font-bold text-[#1e6b8a] transition-colors duration-300 mb-1 text-base">Operational resilience</h4>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group/item cursor-pointer hover:-translate-y-1 transition-transform duration-300">
                      <div className="w-12 h-12 bg-[#f5b942]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-gradient-to-br group-hover/item:from-[#f5b942] group-hover/item:to-[#c97a2f] group-hover/item:shadow-lg transition-all duration-300">
                        <i className="ri-file-list-3-line text-[#c97a2f] group-hover/item:text-white text-2xl group-hover/item:scale-110 transition-all duration-300"></i>
                      </div>
                      <div className="pt-2">
                        <h4 className="font-bold text-[#1e6b8a] transition-colors duration-300 mb-1 text-base">Regulatory alignment</h4>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group/item cursor-pointer hover:-translate-y-1 transition-transform duration-300">
                      <div className="w-12 h-12 bg-[#f5b942]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-gradient-to-br group-hover/item:from-[#f5b942] group-hover/item:to-[#c97a2f] group-hover/item:shadow-lg transition-all duration-300">
                        <i className="ri-global-line text-[#c97a2f] group-hover/item:text-white text-2xl group-hover/item:scale-110 transition-all duration-300"></i>
                      </div>
                      <div className="pt-2">
                        <h4 className="font-bold text-[#1e6b8a] transition-colors duration-300 mb-1 text-base">Cross-border efficiency</h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-[#1e6b8a]/5 rounded-xl border border-[#1e6b8a]/20 group-hover:border-[#1e6b8a]/40 transition-colors duration-500">
                  <p className="text-center font-bold text-[#1e6b8a] text-lg group-hover:scale-105 transition-transform duration-500">
                    DACC is designed to meet these requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - What We Enable */}
            <div className={`transition-all duration-1000 delay-500 h-full flex flex-col ${isWhyItMattersVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="flex items-center space-x-3 mb-6 group cursor-default h-[48px]">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1e6b8a] to-[#1e3a4a] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transform group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500">
                  <i className="ri-rocket-line text-white text-2xl group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-500"></i>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#1e6b8a]">What We Enable</h3>
              </div>

              <div className="space-y-4 perspective-1000 flex-grow flex flex-col justify-between">
                {[
                  { icon: 'ri-exchange-line', title: 'Cross-border Payment Rail', desc: 'Supports RMB and multi-currency clearing with higher capital velocity' },
                  { icon: 'ri-bank-line', title: 'RMB Fast Lane', desc: 'Purpose-built path for cross-border RMB settlement flows' },
                  { icon: 'ri-coin-line', title: 'Tokenization Infrastructure', desc: 'Connects asset issuance, custody, settlement, and execution workflows' },
                  { icon: 'ri-shield-check-line', title: 'Compliance & Governance Layer', desc: 'Institutional controls aligned with regulatory expectations' },
                ].map((item, index) => (
                  <div key={index} 
                    className={`flex items-center space-x-5 bg-white/80 backdrop-blur-md rounded-2xl p-5 border-2 border-[#b8d9ed]/50 group-hover:border-[#1e6b8a] group-hover:shadow-[0_10px_20px_rgba(30,107,138,0.15)] transition-all duration-500 hover:-translate-y-2 hover:translate-x-2 cursor-pointer group`}
                    style={{ transitionDelay: isWhyItMattersVisible ? `${index * 150}ms` : '0ms' }}
                  >
                    <div className={`w-14 h-14 bg-[#e8f4fb] group-hover:bg-[#1e6b8a] rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-500 shadow-inner group-hover:scale-110 group-hover:rotate-6`}>
                      <i className={`${item.icon} text-[#1e6b8a] group-hover:text-white text-3xl transition-colors duration-500`}></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1e6b8a] text-lg transition-all duration-300">{item.title}</h4>
                      <p className="text-sm text-[#1e6b8a]/75 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Hong Kong? */}
      <section id="why-hong-kong" className="px-4 md:px-6 py-16 md:py-24 lg:px-12 bg-gradient-to-b from-[#b8d9ed] to-[#e8f4fb]">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-[#b8d9ed]/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(30,107,138,0.15)] hover:border-[#1e6b8a]/50 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#f5b942]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
              {/* Left Column: Why Hong Kong Content */}
              <div className="flex flex-col h-full justify-center lg:pr-10 lg:border-r border-[#b8d9ed]/50 pb-8 lg:pb-0">
                <div className="flex items-center space-x-3 mb-8 group/title cursor-default">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1e6b8a] to-[#1e3a4a] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transform group-hover/title:-rotate-12 group-hover/title:scale-110 transition-all duration-500">
                    <i className="ri-play-fill text-white text-2xl animate-pulse rotate-90 group-hover/title:rotate-0 transition-transform duration-500"></i>
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#1e6b8a] transition-all duration-500">Why Hong Kong?</h3>
                </div>

                <div className="relative mt-2">
                  <div className="absolute left-0 top-1 bottom-1 w-1.5 bg-[#f5b942] rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <p className="text-lg md:text-xl font-medium text-[#1e6b8a]/80 leading-relaxed pl-6 py-1">
                    DACC is headquartered in Hong Kong, positioned at the intersection of global finance and China's gateway. Hong Kong's regulatory maturity, financial depth, and international connectivity make it the ideal base for infrastructure designed to scale globally.
                  </p>
                </div>
              </div>

              {/* Right Column: Next-gen FMI Content */}
              <div className="flex flex-col h-full justify-center pt-8 lg:pt-0 border-t lg:border-t-0 border-[#b8d9ed]/50 lg:pl-4">
                <div className="text-center mb-8">
                  <h4 className="text-2xl font-bold text-[#1e6b8a] mb-2 transition-all duration-300">
                    Our next-generation FMI addresses inefficiencies in
                  </h4>
                  <div className="mt-4 transform group-hover:scale-105 transition-transform duration-500">
                    <div className="text-5xl font-bold text-[#f5b942] drop-shadow-sm">$214T cross-border payments</div>
                    <p className="text-lg font-medium text-[#1e6b8a]/80 mt-2">market</p>
                  </div>
                </div>

                <div className="border-t border-[#b8d9ed]/50 pt-8">
                  <div className="text-center mb-6">
                    <p className="text-base font-bold text-[#1e6b8a] inline-block px-4 py-1 bg-[#e8f4fb] rounded-full">Offshore demand from Chinese capital</p>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-[#e8f4fb] to-[#b8d9ed]/30 rounded-2xl p-6 border border-[#1e6b8a]/20 hover:border-[#1e6b8a] hover:shadow-md transition-all duration-300 group/item">
                      <div className="text-3xl font-bold text-[#1e6b8a] mb-2 group-hover/item:text-[#c97a2f] transition-colors duration-300">$2.4T</div>
                      <p className="text-[#1e6b8a]/80 text-sm font-medium leading-relaxed">
                        Annual cross-border payments via CIPS
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[#e8f4fb] to-[#b8d9ed]/30 rounded-2xl p-6 border border-[#1e6b8a]/20 hover:border-[#1e6b8a] hover:shadow-md transition-all duration-300 group/item">
                      <div className="text-3xl font-bold text-[#1e6b8a] mb-2 group-hover/item:text-[#c97a2f] transition-colors duration-300">193</div>
                      <p className="text-[#1e6b8a]/80 text-sm font-medium leading-relaxed">
                        Countries and regions supported by CIPS
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[#e8f4fb] to-[#b8d9ed]/30 rounded-2xl p-6 border border-[#1e6b8a]/20 hover:border-[#1e6b8a] hover:shadow-md transition-all duration-300 group/item">
                      <div className="text-3xl font-bold text-[#1e6b8a] mb-2 group-hover/item:text-[#c97a2f] transition-colors duration-300">$214T</div>
                      <p className="text-[#1e6b8a]/80 text-sm font-medium leading-relaxed">
                        Global cross-border payments market
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[#e8f4fb] to-[#b8d9ed]/30 rounded-2xl p-6 border border-[#1e6b8a]/20 hover:border-[#1e6b8a] hover:shadow-md transition-all duration-300 group/item">
                      <div className="text-3xl font-bold text-[#1e6b8a] mb-2 group-hover/item:text-[#c97a2f] transition-colors duration-300">3-5 days to seconds</div>
                      <p className="text-[#1e6b8a]/80 text-sm font-medium leading-relaxed">
                        Target settlement speed improvement
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Institutions */}
      <section id="solutions" className="px-4 md:px-6 py-16 md:py-24 lg:px-12 bg-[var(--color-bg-sky-light)] relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-12 justify-center group cursor-default">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1e6b8a] to-[#1e3a4a] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md transform group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500">
              <i className="ri-building-4-line text-white text-xl group-hover:animate-pulse"></i>
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e6b8a] text-center transition-all duration-500">Built for Institutions, Enabling Retail Transactions</h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Main Statement */}
            <div className="lg:col-span-1 bg-gradient-to-br from-[#1e6b8a] to-[#1e3a4a] rounded-2xl p-8 shadow-xl text-white relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#f5b942]/20 rounded-full blur-2xl"></div>
              <p className="text-xl leading-relaxed mb-6 relative z-10 font-medium">
                DACC is built for regulated market participants, supporting:
              </p>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center space-x-3">
                  <i className="ri-checkbox-circle-fill text-[#f5b942] text-xl"></i>
                  <span className="font-semibold">Institutional-grade operations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="ri-checkbox-circle-fill text-[#f5b942] text-xl"></i>
                  <span className="font-semibold">Compliance-first design</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="ri-checkbox-circle-fill text-[#f5b942] text-xl"></i>
                  <span className="font-semibold">Long-term scalability</span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/20 relative z-10">
                <p className="text-lg font-bold text-[#f5b942]">
                  We focus on infrastructure, not speculation.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {[
                { icon: 'ri-bank-line', title: 'Cross-border RMB Fast Track' },
                { icon: 'ri-file-chart-line', title: 'Digital Trade Finance Track' },
                { icon: 'ri-coin-line', title: 'RWA Tokenization & Trading Track' },
                { icon: 'ri-exchange-dollar-line', title: 'Multi-currency & Digital RMB Track' },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-[#b8d9ed]/50 hover:border-[#1e6b8a] hover:shadow-[0_8px_30px_rgba(30,107,138,0.15)] transition-all duration-300 transform hover:-translate-y-1 group">
                  <div className="w-14 h-14 bg-[#e8f4fb] group-hover:bg-[#1e6b8a] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-colors duration-500 shadow-inner">
                    <i className={`${item.icon} text-[#1e6b8a] group-hover:text-white text-3xl transition-colors duration-500`}></i>
                  </div>
                  <h4 className="font-bold text-[#1e6b8a] text-lg">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="px-4 md:px-6 py-16 md:py-24 lg:px-12 bg-gradient-to-b from-[#b8d9ed] to-[#e8f4fb]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 relative">
            
            {/* Center VS Badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full border-4 border-[#e8f4fb] shadow-[0_0_20px_rgba(30,107,138,0.2)] hidden lg:flex items-center justify-center z-20">
              <span className="text-[#1e6b8a] font-bold text-xl italic">VS</span>
            </div>

            {/* Left Column: Traditional Infrastructure */}
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-gray-200 relative group overflow-hidden opacity-90 hover:opacity-100 transition-opacity duration-300 grayscale-[20%]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200/50 rounded-full blur-2xl"></div>
              
              <div className="flex items-center space-x-4 mb-10 relative z-10">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner border border-gray-200">
                  <i className="ri-building-line text-gray-500 text-2xl"></i>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-600">Traditional Infrastructure</h3>
              </div>

              <div className="space-y-8 relative z-10">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm border border-gray-200 text-gray-400">
                    <i className="ri-time-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-700 mb-2">3-5 Day Settlement</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Cross-border transactions take days to clear through correspondent banking networks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm border border-gray-200 text-gray-400">
                    <i className="ri-money-dollar-circle-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-700 mb-2">High Fees</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Multiple intermediaries charge fees at every step, costing up to 6% per transaction.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm border border-gray-200 text-gray-400">
                    <i className="ri-eye-off-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-700 mb-2">Limited Transparency</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      No real-time visibility into transaction status or fund location.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm border border-gray-200 text-gray-400">
                    <i className="ri-error-warning-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-700 mb-2">Compliance Complexity</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Fragmented regulatory requirements across jurisdictions create friction and risk.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: DACC Infrastructure */}
            <div className="bg-gradient-to-br from-[#1e6b8a] to-[#1e3a4a] rounded-3xl p-8 lg:p-12 border-2 border-[#f5b942] relative group overflow-hidden shadow-[0_20px_50px_rgba(30,107,138,0.3)] transform lg:scale-105 z-10 transition-transform duration-500 hover:scale-[1.07]">
              {/* Dynamic Background Effects */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#f5b942]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              
              <div className="flex items-center space-x-4 mb-10 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-[#f5b942] to-[#c97a2f] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                  <i className="ri-flashlight-fill text-white text-2xl group-hover:animate-pulse"></i>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-md">DACC Infrastructure</h3>
              </div>

              <div className="space-y-8 relative z-10">
                <div className="flex items-start space-x-4 transform transition-all duration-300 hover:translate-x-2">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-white/20 text-[#f5b942]">
                    <i className="ri-check-double-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 tracking-wide">Seconds Settlement</h4>
                    <p className="text-white/80 text-sm leading-relaxed font-medium">
                      Near-instant finality via ChainFusion™ multi-chain architecture.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 transform transition-all duration-300 hover:translate-x-2">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-white/20 text-[#f5b942]">
                    <i className="ri-arrow-down-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 tracking-wide">Significantly Lower Costs</h4>
                    <p className="text-white/80 text-sm leading-relaxed font-medium">
                      Direct settlement eliminates intermediaries and their fees.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 transform transition-all duration-300 hover:translate-x-2">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-white/20 text-[#f5b942]">
                    <i className="ri-eye-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 tracking-wide">Full Transparency</h4>
                    <p className="text-white/80 text-sm leading-relaxed font-medium">
                      Real-time tracking and immutable audit trails for every transaction.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 transform transition-all duration-300 hover:translate-x-2">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-white/20 text-[#f5b942]">
                    <i className="ri-shield-check-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 tracking-wide">Built-in Compliance</h4>
                    <p className="text-white/80 text-sm leading-relaxed font-medium">
                      Regulatory-grade KYC/AML and reporting across 197 jurisdictions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="Services" className="px-4 md:px-6 py-16 md:py-24 lg:px-12 bg-[var(--color-bg-sky-light)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16 text-center flex flex-col items-center group cursor-default">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1e6b8a] to-[#1e3a4a] rounded-lg flex items-center justify-center shadow-md mb-4 transform group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500">
              <i className="ri-service-line text-white text-xl group-hover:animate-pulse"></i>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold mb-4 px-4 text-[#1e6b8a] transition-all duration-500">
              Our <span className="text-[#f5b942]">Services</span>
            </h2>
          </div>

          {/* Top Hero Card (Full Width) */}
          <div className="mb-8 md:mb-12">
            <div className="w-full bg-gradient-to-br from-[#1e6b8a] to-[#1e6b8a]/90 rounded-3xl p-8 md:p-12 border-2 border-[#f5b942] hover:shadow-[0_0_40px_rgba(245,185,66,0.5)] transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
              </div>
              
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 md:px-4 py-2 mb-4 md:mb-6">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs md:text-sm text-white font-semibold">Now Live: ChainFusion™</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    Cross-border settlement in <span className="text-white drop-shadow-lg">seconds</span>
                  </h3>
                  <p className="text-white/95 text-base md:text-lg leading-relaxed max-w-2xl">
                    DACC enables the tokenized economy using CIPS (Cross-border Interbank Payment System), which has participants in 193 countries and regions, covering over 1,500 banking institutions.
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <button className="bg-[#f5b942] hover:bg-[#c97a2f] text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-lg hover:shadow-[0_0_20px_rgba(245,185,66,0.5)] transition-all duration-300 whitespace-nowrap cursor-pointer transform hover:scale-105">
                    Explore ChainFusion™
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid for Other Services */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 transform hover:-translate-y-2 shadow-md flex flex-col h-full group">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#e8f4fb] rounded-xl flex items-center justify-center group-hover:bg-[#1e6b8a] transition-colors duration-500 shadow-inner">
                  <i className="ri-links-line text-[#1e6b8a] text-3xl group-hover:text-white transition-colors duration-500"></i>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] text-center mb-4">Hot Wallet Integration</h3>
              <p className="text-[#1e6b8a]/70 text-center leading-relaxed mb-6 flex-grow">
                Flexible, API-driven hot wallet solutions built for scale and easy integration.
              </p>
              <div className="flex justify-center mt-auto">
                <a href="/hot-wallet-en" className="inline-flex items-center space-x-2 text-[#1e6b8a] hover:text-[#f5b942] font-semibold cursor-pointer transition-all duration-300">
                  <span>Learn More</span>
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 transform hover:-translate-y-2 shadow-md flex flex-col h-full group">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#e8f4fb] rounded-xl flex items-center justify-center group-hover:bg-[#1e6b8a] transition-colors duration-500 shadow-inner">
                  <i className="ri-database-2-line text-[#1e6b8a] text-3xl group-hover:text-white transition-colors duration-500"></i>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] text-center mb-4">Cold Wallet Infrastructure</h3>
              <p className="text-[#1e6b8a]/70 text-center leading-relaxed mb-6 flex-grow">
                Secure, HSM-based cold storage with user-friendly interfaces and full local control.
              </p>
              <div className="flex justify-center mt-auto">
                <a href="/cold-wallet-en" className="inline-flex items-center space-x-2 text-[#1e6b8a] hover:text-[#f5b942] font-semibold cursor-pointer transition-all duration-300">
                  <span>Learn More</span>
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 transform hover:-translate-y-2 shadow-md flex flex-col h-full group">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#e8f4fb] rounded-xl flex items-center justify-center group-hover:bg-[#1e6b8a] transition-colors duration-500 shadow-inner">
                  <i className="ri-coin-line text-[#1e6b8a] text-3xl group-hover:text-white transition-colors duration-500"></i>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1e6b8a] text-center mb-4">RWA Tokenization Platform</h3>
              <p className="text-[#1e6b8a]/70 text-center leading-relaxed mb-6 flex-grow">
                UI-based platform with structured metadata and multi-party authorization for trusted RWA issuance.
              </p>
              <div className="flex justify-center mt-auto">
                <a href="/rwa-platform-en" className="inline-flex items-center space-x-2 text-[#1e6b8a] hover:text-[#f5b942] font-semibold cursor-pointer transition-all duration-300">
                  <span>Learn More</span>
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="px-4 md:px-6 py-16 md:py-24 lg:px-12 bg-gradient-to-b from-[#b8d9ed] to-[#e8f4fb]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16 text-center flex flex-col items-center group cursor-default">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1e6b8a] to-[#1e3a4a] rounded-lg flex items-center justify-center shadow-md mb-4 transform group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500">
              <i className="ri-briefcase-line text-white text-xl group-hover:animate-pulse"></i>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-4 text-[#1e6b8a] transition-all duration-500">
              Use <span className="text-[#1e6b8a]">Cases</span>
            </h2>
            <p className="text-lg md:text-xl text-[#1e6b8a]/70 max-w-3xl mx-auto px-4 font-medium transition-all duration-500">
              Real-world applications of DACC infrastructure
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {/* Case 1: TTL × DACC */}
            <div className="bg-white/70 rounded-2xl p-6 md:p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group">
              <div className="flex items-center space-x-3 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#e8f4fb] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-exchange-line text-[#1e6b8a] text-2xl md:text-2xl"></i>
                </div>
                <div>
                  <span className="inline-block bg-[#f5b942]/20 border border-[#f5b942] text-[#1e6b8a] px-2 md:px-3 py-1 rounded-full text-xs font-semibold">
                    Broker API Integration
                  </span>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-[#1e6b8a] mb-3 md:mb-4">TTL × DACC: Crypto-Enabled Brokerage Trading System</h3>

              <p className="text-[#1e6b8a]/70 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                TTL brokerage trading system integrates DACC API wallet to provide coin-in-coin-out crypto trading services, enabling seamless fiat-to-crypto conversion with full regulatory compliance and real-time settlement.
              </p>

              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                <div className="flex items-start space-x-2">
                  <i className="ri-checkbox-circle-fill text-[#1e6b8a] mt-1 flex-shrink-0 text-sm"></i>
                  <span className="text-xs md:text-sm text-[#1e6b8a]/70">Instant fiat-to-crypto conversion</span>
                </div>
                <div className="flex items-start space-x-2">
                  <i className="ri-checkbox-circle-fill text-[#1e6b8a] mt-1 flex-shrink-0 text-sm"></i>
                  <span className="text-xs md:text-sm text-[#1e6b8a]/70">Coin-in/coin-out crypto trading</span>
                </div>
                <div className="flex items-start space-x-2">
                  <i className="ri-checkbox-circle-fill text-[#1e6b8a] mt-1 flex-shrink-0 text-sm"></i>
                  <span className="text-xs md:text-sm text-[#1e6b8a]/70">Real-time settlement infrastructure</span>
                </div>
              </div>

              <a
                href="/use-case-ttl-en"
                className="inline-flex items-center space-x-2 text-[#1e6b8a] hover:text-[#f5b942] font-semibold group-hover:translate-x-2 transition-transform duration-300 text-sm md:text-base"
              >
                <span>Learn More</span>
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>

            {/* Case 2: Conflux x DACC */}
            <div className="bg-white/70 rounded-2xl p-6 md:p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group">
              <div className="flex items-center space-x-3 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#e8f4fb] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-links-line text-[#1e6b8a] text-2xl md:text-2xl"></i>
                </div>
                <div>
                  <span className="inline-block bg-[#f5b942]/20 border border-[#f5b942] text-[#1e6b8a] px-2 md:px-3 py-1 rounded-full text-xs font-semibold">
                    Tokenization Platform
                  </span>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-[#1e6b8a] mb-3 md:mb-4">Conflux x DACC: Multi-Chain Support</h3>

              <p className="text-[#1e6b8a]/70 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                DACC provides a multi-asset tokenization platform with native support for Hyperledger, Canton, Ethereum, and Conflux with plug-and-play cross-chain bridging.
              </p>

              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                <div className="flex items-start space-x-2">
                  <i className="ri-checkbox-circle-fill text-[#1e6b8a] mt-1 flex-shrink-0 text-sm"></i>
                  <span className="text-xs md:text-sm text-[#1e6b8a]/70">Multi-chain asset custody</span>
                </div>
                <div className="flex items-start space-x-2">
                  <i className="ri-checkbox-circle-fill text-[#1e6b8a] mt-1 flex-shrink-0 text-sm"></i>
                  <span className="text-xs md:text-sm text-[#1e6b8a]/70">Cross-border settlement support</span>
                </div>
                <div className="flex items-start space-x-2">
                  <i className="ri-checkbox-circle-fill text-[#1e6b8a] mt-1 flex-shrink-0 text-sm"></i>
                  <span className="text-xs md:text-sm text-[#1e6b8a]/70">Enterprise-grade security</span>
                </div>
              </div>

              <a
                href="/use-case-conflux-en"
                className="inline-flex items-center space-x-2 text-[#1e6b8a] hover:text-[#f5b942] font-semibold group-hover:translate-x-2 transition-transform duration-300 text-sm md:text-base"
              >
                <span>Learn More</span>
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>

            {/* Case 3: Crypto Exchanges x DACC */}
            <div className="bg-white/70 rounded-2xl p-6 md:p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group">
              <div className="flex items-center space-x-3 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#e8f4fb] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-bank-line text-[#1e6b8a] text-2xl md:text-2xl"></i>
                </div>
                <div>
                  <span className="inline-block bg-[#f5b942]/20 border border-[#f5b942] text-[#1e6b8a] px-2 md:px-3 py-1 rounded-full text-xs font-semibold">
                    Exchange Custody
                  </span>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-[#1e6b8a] mb-3 md:mb-4">Crypto Exchanges x DACC: Crypto Custody</h3>

              <p className="text-[#1e6b8a]/70 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                DACC has signed MOUs with two SFC-licensed crypto exchanges in Hong Kong—PantherTrade/Futu Securities and YAX/Tiger Securities. DACC provides cold-hot HSM custody solutions with institutional-grade security and operational efficiency.
              </p>

              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                <div className="flex items-start space-x-2">
                  <i className="ri-checkbox-circle-fill text-[#1e6b8a] mt-1 flex-shrink-0 text-sm"></i>
                  <span className="text-xs md:text-sm text-[#1e6b8a]/70">HSM key security</span>
                </div>
                <div className="flex items-start space-x-2">
                  <i className="ri-checkbox-circle-fill text-[#1e6b8a] mt-1 flex-shrink-0 text-sm"></i>
                  <span className="text-xs md:text-sm text-[#1e6b8a]/70">Cold-hot wallet tiered architecture</span>
                </div>
                <div className="flex items-start space-x-2">
                  <i className="ri-checkbox-circle-fill text-[#1e6b8a] mt-1 flex-shrink-0 text-sm"></i>
                  <span className="text-xs md:text-sm text-[#1e6b8a]/70">SFC-compliant custody framework</span>
                </div>
              </div>

              <a
                href="/use-case-vatp-en"
                className="inline-flex items-center space-x-2 text-[#1e6b8a] hover:text-[#f5b942] font-semibold group-hover:translate-x-2 transition-transform duration-300 text-sm md:text-base"
              >
                <span>Learn More</span>
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>

            {/* Case 4: Global Merchants x DACC */}
            <div className="bg-white/70 rounded-2xl p-6 md:p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group">
              <div className="flex items-center space-x-3 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#e8f4fb] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-store-line text-[#1e6b8a] text-2xl md:text-2xl"></i>
                </div>
                <div>
                  <span className="inline-block bg-[#f5b942]/20 border border-[#f5b942] text-[#1e6b8a] px-2 md:px-3 py-1 rounded-full text-xs font-semibold">
                    Stablecoin & Payment Solutions
                  </span>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-[#1e6b8a] mb-3 md:mb-4">Global Merchants x DACC (TCSP License)</h3>

              <p className="text-[#1e6b8a]/70 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                DACC holds a Hong Kong Trust and Custody license through its wholly-owned subsidiary, Aegis Custody Company Limited. DACC supports stablecoin payments under a regulated TCSP license framework, establishing a strategic hub connecting crypto platforms and e-commerce ecosystems.
              </p>

              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                <div className="flex items-start space-x-2">
                  <i className="ri-checkbox-circle-fill text-[#1e6b8a] mt-1 flex-shrink-0 text-sm"></i>
                  <span className="text-xs md:text-sm text-[#1e6b8a]/70">TCSP License</span>
                </div>
                <div className="flex items-start space-x-2">
                  <i className="ri-checkbox-circle-fill text-[#1e6b8a] mt-1 flex-shrink-0 text-sm"></i>
                  <span className="text-xs md:text-sm text-[#1e6b8a]/70">API wallet integration</span>
                </div>
                <div className="flex items-start space-x-2">
                  <i className="ri-checkbox-circle-fill text-[#1e6b8a] mt-1 flex-shrink-0 text-sm"></i>
                  <span className="text-xs md:text-sm text-[#1e6b8a]/70">Access to hundreds of millions of crypto users through 12 crypto exchange integrations</span>
                </div>
              </div>

              <a
                href="/use-case-en"
                className="inline-flex items-center space-x-2 text-[#1e6b8a] hover:text-[#f5b942] font-semibold group-hover:translate-x-2 transition-transform duration-300 text-sm md:text-base"
              >
                <span>Learn More</span>
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Advisors Section */}
      <section id="advisors" className="px-4 md:px-6 py-16 md:py-24 lg:px-12 bg-[var(--color-bg-sky-light)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 text-center flex flex-col items-center group cursor-default">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1e6b8a] to-[#1e3a4a] rounded-lg flex items-center justify-center shadow-md mb-4 transform group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500">
              <i className="ri-team-line text-white text-xl group-hover:animate-pulse"></i>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-4 text-[#1e6b8a] transition-all duration-500">
              Our <span className="text-[#1e6b8a]">Directors</span>
            </h2>
          </div>

          <AdvisorsCarouselEN />
        </div>
      </section>

      {/* Our Investors Section */}
      <section id="ecosystem" className="px-4 md:px-6 py-16 md:py-24 lg:px-12 bg-gradient-to-b from-[#b8d9ed] to-[#1e6b8a] relative overflow-hidden">
        {/* Abstract Background Pattern to match image */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #1e6b8a 1px, transparent 1px), linear-gradient(to bottom, #1e6b8a 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}></div>
          {/* Subtle diagonal lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="#1e6b8a" strokeWidth="0.5" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="#1e6b8a" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-12 md:mb-16 text-center flex flex-col items-center group cursor-default">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1e6b8a] to-[#1e3a4a] rounded-lg flex items-center justify-center shadow-md mb-4 transform group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500">
              <i className="ri-hand-coin-line text-white text-xl group-hover:animate-pulse"></i>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-4 text-[#1e6b8a] transition-all duration-500">
              Our <span className="text-[#1e6b8a]">Investors</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-6 md:p-8 border border-[#1e6b8a] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,107,138,0.15)] cursor-pointer flex flex-col items-center justify-center min-h-[120px]">
              <p className="text-center font-bold text-[#1e6b8a] text-lg tracking-wide">Conflux/Starcoin</p>
              <p className="text-center text-sm text-[#1e6b8a] font-semibold mt-2 tracking-wider">HKEX: 399</p>
            </div>
            <div className="bg-white rounded-lg p-6 md:p-8 border border-[#1e6b8a] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,107,138,0.15)] cursor-pointer flex flex-col items-center justify-center min-h-[120px]">
              <p className="text-center font-bold text-[#1e6b8a] text-lg tracking-wide">TTL/Kingdom</p>
              <p className="text-center text-sm text-[#1e6b8a] font-semibold mt-2 tracking-wider">SZSE: 600446</p>
            </div>
            <div className="bg-white rounded-lg p-6 md:p-8 border border-[#1e6b8a] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,107,138,0.15)] cursor-pointer flex flex-col items-center justify-center min-h-[120px]">
              <p className="text-center font-bold text-[#1e6b8a] text-lg tracking-wide">Global Infotech</p>
              <p className="text-center text-sm text-[#1e6b8a] font-semibold mt-2 tracking-wider">SZSE: 300465</p>
            </div>
            <div className="bg-white rounded-lg p-6 md:p-8 border border-[#1e6b8a] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,107,138,0.15)] cursor-pointer flex flex-col items-center justify-center min-h-[120px]">
              <p className="text-center font-bold text-[#1e6b8a] text-lg tracking-wide">Fosun International</p>
              <p className="text-center text-sm text-[#1e6b8a] font-semibold mt-2 tracking-wider">HKEX: 0656</p>
            </div>
            <div className="bg-white rounded-lg p-6 md:p-8 border border-[#1e6b8a] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,107,138,0.15)] cursor-pointer flex flex-col items-center justify-center min-h-[120px]">
              <p className="text-center font-bold text-[#1e6b8a] text-lg tracking-wide">Avior Capital</p>
              <p className="text-center text-sm text-[#1e6b8a] font-semibold mt-2 tracking-wider">Investor</p>
            </div>
            <div className="bg-white rounded-lg p-6 md:p-8 border border-[#1e6b8a] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,107,138,0.15)] cursor-pointer flex flex-col items-center justify-center min-h-[120px]">
              <p className="text-center font-bold text-[#1e6b8a] text-lg tracking-wide">Blockstone</p>
              <p className="text-center text-sm text-[#1e6b8a] font-semibold mt-2 tracking-wider">Investor</p>
            </div>
            <div className="bg-white rounded-lg p-6 md:p-8 border border-[#1e6b8a] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,107,138,0.15)] cursor-pointer flex flex-col items-center justify-center min-h-[120px]">
              <p className="text-center font-bold text-[#1e6b8a] text-lg tracking-wide">BridgeTower Capital</p>
              <p className="text-center text-sm text-[#1e6b8a] font-semibold mt-2 tracking-wider">Investor</p>
            </div>
            <div className="bg-white rounded-lg p-6 md:p-8 border border-[#1e6b8a] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,107,138,0.15)] cursor-pointer flex flex-col items-center justify-center min-h-[120px]">
              <p className="text-center font-bold text-[#1e6b8a] text-lg tracking-wide">Fintech World</p>
              <p className="text-center text-sm text-[#1e6b8a] font-semibold mt-2 tracking-wider">Investor</p>
            </div>
            <div className="bg-white rounded-lg p-6 md:p-8 border border-[#1e6b8a] hover:border-[#1e6b8a] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,107,138,0.15)] cursor-pointer flex flex-col items-center justify-center min-h-[120px]">
              <p className="text-center font-bold text-[#1e6b8a] text-lg tracking-wide">Satoshi Ventures</p>
              <p className="text-center text-sm text-[#1e6b8a] font-semibold mt-2 tracking-wider">Investor</p>
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
                <img 
                  src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/86e6f5c087b2b68763a98a978a16381f.png" 
                  alt="DACC Logo" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                Pioneering the Next Decade of Digital Clearing and Settlement
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
              <div className="space-y-2">
                <a href="#Services" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">Services</a>
                <a href="#use-cases" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">Use Cases</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Resources</h4>
              <div className="space-y-2">
                <a href="#ecosystem" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">Investors</a>
                <a href="/blog-en" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">News</a>
                <a href="/contact-en" className="block text-white/80 hover:text-[#f5b942] transition-all duration-300 text-xs md:text-sm cursor-pointer hover:translate-x-2 transform">Contact Us</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/digital-asset-clearing-center/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#f5b942] transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 md:pt-8 text-center">
            <p className="text-white/80 text-xs md:text-sm mb-3 md:mb-4">
              Copyright © 2026 Digital Asset Clearing Center (DACC). All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
