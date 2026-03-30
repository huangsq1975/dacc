import { useState, useEffect, useRef } from 'react';
import { Renderer, Triangle, Program, Mesh } from 'ogl';
import AdvisorsCarouselEN from '../../components/feature/AdvisorsCarouselEN';

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

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    
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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 50);
        setShowBackToTop(y > 300);
        rafId = 0;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f4fb] via-[#b8d9ed] to-[#1e6b8a] text-gray-900">
      {/* Floating Navigation - Desktop */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
        <nav className={`${scrolled ? 'bg-white/90' : 'bg-white/70'} backdrop-blur-md border border-[#b8d9ed] rounded-full px-5 py-3 transition-all duration-300 shadow-lg`}>
          <div className="flex items-center justify-center space-x-5">
            <a href="/home-en" className="cursor-pointer flex-shrink-0">
              <img 
                src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/525c7ccd2d5f61496beafa22f224d260.png" 
                alt="DACC Logo" 
                className="h-6 w-auto object-contain"
              />
            </a>
            <a href="#Services" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-xs whitespace-nowrap font-montserrat font-medium">
              Services
            </a>

            {/* Solutions Dropdown - group-hover CSS */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-xs whitespace-nowrap font-montserrat font-medium">
                Solutions
                <i className="ri-arrow-down-s-line"></i>
              </button>
              <div className="absolute left-0 top-full pt-2 w-56 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                  <a href="/hot-wallet-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                    Hot Wallet Integration
                  </a>
                  <a href="/cold-wallet-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                    Cold Wallet
                  </a>
                  <a href="/rwa-platform-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                    RWA Tokenization Platform
                  </a>
                  <a href="/chain-fusion-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                    ChainFusion
                  </a>
                </div>
              </div>
            </div>

            {/* Use Cases Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setUseCasesDropdownOpen(true)}
              onMouseLeave={() => setUseCasesDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-[#1e6b8a] hover:text-[#f5b942] transition-colors text-xs whitespace-nowrap font-montserrat font-medium"
              >
                Use Cases
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${useCasesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {useCasesDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-64 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-[#b8d9ed] rounded-xl py-2 shadow-xl">
                    <a href="/use-case-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      Global Merchants x DACC
                    </a>
                    <a href="/use-case-ttl-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      TTL × DACC
                    </a>
                    <a href="/use-case-conflux-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      Conflux x DACC
                    </a>
                    <a href="/use-case-vatp-en" className="block px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] hover:bg-[#e8f4fb] transition-colors">
                      Crypto Exchanges x DACC
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="#ecosystem" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-xs whitespace-nowrap font-montserrat font-medium">
              Investors
            </a>
            <a href="/blog-en" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-xs whitespace-nowrap font-montserrat font-medium">
              News
            </a>
            <a href="/contact-en" className="text-[#1e6b8a] hover:text-[#f5b942] transition-colors cursor-pointer text-xs flex items-center whitespace-nowrap font-montserrat font-medium">
              Contact Us
              <i className="ri-arrow-right-up-line ml-1 text-xs"></i>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Top Bar - Logo + Menu + Language */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white/90 backdrop-blur-md border-b border-[#b8d9ed] shadow-md">
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
              className="bg-[#e8f4fb] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
            <a href="/zh" className="bg-[#e8f4fb] backdrop-blur-md border border-[#b8d9ed] rounded-full px-4 py-2 text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium">
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
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#1e6b8a]/20"
                >
                  <span>Services</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('solutions')}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#1e6b8a]/20"
                >
                  <span>Solutions</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => setMobileSubmenu('useCasesEN')}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#1e6b8a]/20"
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
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#1e6b8a]/20"
                >
                  <span>Investors</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
                <a
                  href="/blog-en"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#1e6b8a]/20"
                >
                  <span>News</span>
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </a>
                <a
                  href="/contact-en"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between py-4 text-xl text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#1e6b8a]/20"
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
                  className="w-10 h-10 flex items-center justify-center text-[#1e6b8a] hover:text-[#f5b942] transition-colors"
                >
                  <i className="ri-arrow-left-line text-2xl"></i>
                </button>
                <span className="text-lg font-semibold text-[#1e6b8a]">Solutions</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-2">
                  <a
                    href="/hot-wallet-en"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#1e6b8a]/20"
                  >
                    Hot Wallet Integration
                  </a>
                  <a
                    href="/cold-wallet-en"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#1e6b8a]/20"
                  >
                    Cold Wallet
                  </a>
                  <a
                    href="/rwa-platform-en"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#1e6b8a]/20"
                  >
                    RWA Tokenization Platform
                  </a>
                  <a
                    href="/chain-fusion-en"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#1e6b8a]/20"
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
                  className="w-10 h-10 flex items-center justify-center text-[#1e6b8a] hover:text-[#f5b942] transition-colors"
                >
                  <i className="ri-arrow-left-line text-2xl"></i>
                </button>
                <span className="text-lg font-semibold text-[#1e6b8a]">Use Cases</span>
                <div className="w-10"></div>
              </div>
              <div className="px-6 py-6">
                <p className="text-[#1e6b8a]/80 text-sm mb-6">Explore our use cases</p>
                <div className="space-y-2">
                  <a
                    href="/use-case-en"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#1e6b8a]/20"
                  >
                    Global Merchants x DACC
                  </a>
                  <a
                    href="/use-case-ttl-en"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#1e6b8a]/20"
                  >
                    TTL × DACC
                  </a>
                  <a
                    href="/use-case-conflux-en"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#1e6b8a]/20"
                  >
                    Conflux x DACC
                  </a>
                  <a
                    href="/use-case-vatp-en"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg text-[#1e6b8a] hover:text-[#f5b942] transition-colors border-b border-[#1e6b8a]/20"
                  >
                    Crypto Exchanges x DACC
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Language Switcher - Desktop Only */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <a href="/zh" className="bg-white/80 backdrop-blur-md border border-[#b8d9ed] rounded-full px-3 md:px-4 py-2 text-xs md:text-sm text-[#1e6b8a] hover:text-[#f5b942] transition-all duration-300 cursor-pointer whitespace-nowrap font-medium shadow-md">
          中文
        </a>
      </div>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col pt-20 md:pt-0">
        <div className="flex-1 flex items-center justify-center px-4 md:px-6 relative">
          {/* Prism Background */}
          <Prism
            animationType="3drotate"
            glow={1}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            timeScale={0.5}
            transparent={true}
            bloom={1}
            hoverStrength={2}
            inertia={0.05}
            noise={0}
            suspendWhenOffscreen={true}
          />

          <div className="text-center max-w-5xl mx-auto relative z-10">
            <div className="flex justify-center mb-6 md:mb-8">
              <img
                src="https://static.readdy.ai/image/64506299ff39ac9a5a05d764485a29b9/602277a182bd33f8fff2388a9311342f.png"
                alt="DACC"
                className="h-20 md:h-28 w-auto object-contain"
              />
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-normal leading-tight mb-6 md:mb-8 font-montserrat max-w-6xl mx-auto px-4 text-[#1e6b8a]">
              Where CIPS meets<br />
              <span className="text-[#f5b942]">Tokenization</span>
            </h2>
            <p className="text-base md:text-xl text-[#1e6b8a]/80 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed font-montserrat px-4">
              Pioneering the Next Decade of Digital Clearing and Settlement
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#f5b942]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1e6b8a]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-[#c97a2f]/20 rounded-full blur-2xl"></div>
        </div>
      </header>

      {/* Why It Matters */}
      <section id="why-it-matters" className="px-4 md:px-6 py-16 md:py-20 lg:px-12 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Column */}
            <div>
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-8 h-8 bg-gradient-to-br from-[#f5b942] to-[#c97a2f] rounded flex items-center justify-center flex-shrink-0 mt-1 transform hover:rotate-90 transition-transform duration-500">
                  <i className="ri-play-fill text-white rotate-90"></i>
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a]">Why It Matters</h3>
              </div>

              <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 shadow-lg">
                <p className="text-[#1e6b8a]/80 leading-relaxed mb-6">
                  Tokenization scales when infrastructure supports
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
                    <div className="w-10 h-10 bg-[#e8f4fb] rounded-lg flex items-center justify-center flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                      <i className="ri-shield-check-line text-[#1e6b8a] text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1e6b8a] mb-1">Secure custody and settlement</h4>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
                    <div className="w-10 h-10 bg-[#e8f4fb] rounded-lg flex items-center justify-center flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                      <i className="ri-settings-3-line text-[#1e6b8a] text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1e6b8a] mb-1">Operational resilience</h4>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
                    <div className="w-10 h-10 bg-[#e8f4fb] rounded-lg flex items-center justify-center flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                      <i className="ri-file-list-3-line text-[#1e6b8a] text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1e6b8a] mb-1">Regulatory alignment</h4>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
                    <div className="w-10 h-10 bg-[#e8f4fb] rounded-lg flex items-center justify-center flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                      <i className="ri-global-line text-[#1e6b8a] text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1e6b8a] mb-1">Cross-border efficiency</h4>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gradient-to-r from-[#f5b942]/20 to-[#c97a2f]/20 rounded-xl border border-[#f5b942]/50">
                  <p className="text-center font-bold text-[#1e6b8a]">
                    DACC is built to meet these requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - What We Enable */}
            <div>
              <div className="flex items-start space-x-4 mb-6 md:mb-8">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-[#f5b942] to-[#c97a2f] rounded flex items-center justify-center flex-shrink-0 mt-1 transform hover:rotate-90 transition-transform duration-500">
                  <i className="ri-play-fill text-white rotate-90 text-sm md:text-base"></i>
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a]">What We Enable</h3>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start space-x-3 bg-white/70 rounded-xl p-3 md:p-4 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:translate-x-2 shadow-md">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#e8f4fb] rounded-lg flex items-center justify-center flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                    <i className="ri-exchange-line text-[#1e6b8a] text-2xl md:text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e6b8a] text-sm md:text-base">Sub-second cross-border settlement</h4>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white/70 rounded-xl p-3 md:p-4 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:translate-x-2 shadow-md">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#e8f4fb] rounded-lg flex items-center justify-center flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                    <i className="ri-link text-[#1e6b8a] text-2xl md:text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e6b8a] text-sm md:text-base">Seamless on-chain/off-chain integration</h4>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white/70 rounded-xl p-3 md:p-4 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:translate-x-2 shadow-md">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#e8f4fb] rounded-lg flex items-center justify-center flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                    <i className="ri-shield-check-line text-[#1e6b8a] text-2xl md:text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e6b8a] text-sm md:text-base">Robust governance and compliance</h4>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white/70 rounded-xl p-3 md:p-4 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 hover:translate-x-2 shadow-md">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#e8f4fb] rounded-lg flex items-center justify-center flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                    <i className="ri-building-line text-[#1e6b8a] text-2xl md:text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e6b8a] text-sm md:text-base">Infrastructure ready for institutional adoption</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Hong Kong */}
      <section className="px-4 md:px-6 py-16 md:py-20 lg:px-12 bg-gradient-to-b from-[#b8d9ed] to-[#e8f4fb]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <div className="flex items-start space-x-4 mb-6 md:mb-8">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-[#f5b942] to-[#c97a2f] rounded flex items-center justify-center flex-shrink-0 mt-1 transform hover:rotate-90 transition-transform duration-500">
                  <i className="ri-play-fill text-white rotate-90 text-sm md:text-base"></i>
                </div>
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#1e6b8a]">Why Hong Kong?</h3>
              </div>

              <div className="bg-white/70 rounded-2xl p-6 md:p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 shadow-lg">
                <p className="text-sm md:text-base text-[#1e6b8a]/80 leading-relaxed">
                  DACC is headquartered in Hong Kong, positioned at the intersection of global finance and China's gateway. Hong Kong's regulatory maturity, financial depth, and international connectivity make it the ideal base for infrastructure designed to scale globally.
                </p>
              </div>
            </div>

            {/* Right Column - Infographic */}
            <div>
              <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 shadow-lg">
                <div className="text-center mb-8">
                  <h4 className="text-2xl font-bold text-[#1e6b8a] mb-2">Our next-generation FMI addresses inefficiencies in</h4>
                  <div className="mt-4">
                    <div className="text-5xl font-bold text-[#f5b942]">$214T cross-border payments</div>
                    <p className="text-sm text-[#1e6b8a]/70 mt-2">market</p>
                  </div>
                </div>

                <div className="border-t border-[#b8d9ed] pt-6">
                  <div className="text-center mb-4">
                    <p className="text-sm font-semibold text-[#1e6b8a]">Offshore demand from Chinese capital</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-[#e8f4fb] to-[#b8d9ed]/50 rounded-xl p-4 border border-[#1e6b8a]/30 hover:border-[#1e6b8a] transition-all duration-300">
                      <div className="text-3xl font-bold text-[#1e6b8a] mb-2">$2.4T</div>
                      <p className="text-[#1e6b8a]/80 text-sm leading-relaxed">
                        Annual cross-border payments via CIPS
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#e8f4fb] to-[#b8d9ed]/50 rounded-xl p-4 border border-[#1e6b8a]/30 hover:border-[#1e6b8a] transition-all duration-300">
                      <div className="text-3xl font-bold text-[#1e6b8a]">193</div>
                      <p className="text-[#1e6b8a]/80 text-sm leading-relaxed">
                        Countries and regions supported by CIPS
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
      <section id="solutions" className="px-4 md:px-6 py-16 md:py-20 lg:px-12 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start space-x-4 mb-12">
            <div className="w-8 h-8 bg-gradient-to-br from-[#f5b942] to-[#c97a2f] rounded flex items-center justify-center flex-shrink-0 mt-1 transform hover:rotate-90 transition-transform duration-500">
              <i className="ri-play-fill text-white rotate-90"></i>
            </div>
            <div>
              <h3 className="text-4xl lg:text-5xl font-bold text-[#1e6b8a] mb-2">Built for Institutions, Enabling Retail Transactions</h3>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/70 rounded-2xl p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 shadow-lg">
              <p className="text-[#1e6b8a]/80 leading-relaxed mb-6">
                DACC is built for regulated market participants, supporting:
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 bg-[#e8f4fb] rounded-lg flex items-center justify-center flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                    <i className="ri-building-2-line text-[#1e6b8a] text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e6b8a]">Institutional-grade operations</h4>
                  </div>
                </div>

                <div className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 bg-[#e8f4fb] rounded-lg flex items-center justify-center flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                    <i className="ri-shield-check-line text-[#1e6b8a] text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e6b8a]">Compliance-first design</h4>
                  </div>
                </div>

                <div className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 bg-[#e8f4fb] rounded-lg flex items-center justify-center flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                    <i className="ri-line-chart-line text-[#1e6b8a] text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e6b8a]">Long-term scalability</h4>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-[#f5b942]/20 to-[#c97a2f]/20 rounded-xl border border-[#f5b942]/50">
                <p className="text-center font-bold text-[#1e6b8a]">
                  We focus on infrastructure, not speculation.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/70 rounded-xl p-6 border-2 border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 cursor-pointer transform hover:-translate-y-2 shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#e8f4fb] to-[#b8d9ed]/50 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                    <i className="ri-bank-line text-[#1e6b8a] text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e6b8a]">Cross-border RMB Fast Track</h4>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-6 border-2 border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 cursor-pointer transform hover:-translate-y-2 shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#e8f4fb] to-[#b8d9ed]/50 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                    <i className="ri-file-chart-line text-[#1e6b8a] text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e6b8a]">Digital Trade Finance Track</h4>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-6 border-2 border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 cursor-pointer transform hover:-translate-y-2 shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#e8f4fb] to-[#b8d9ed]/50 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                    <i className="ri-coin-line text-[#1e6b8a] text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e6b8a]">RWA Tokenization & Trading Track</h4>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-6 border-2 border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 cursor-pointer transform hover:-translate-y-2 shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#e8f4fb] to-[#b8d9ed]/50 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                    <i className="ri-exchange-dollar-line text-[#1e6b8a] text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e6b8a]">Multi-currency & Digital RMB Track</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="px-4 md:px-6 py-16 md:py-20 lg:px-12 bg-gradient-to-b from-[#b8d9ed] to-[#e8f4fb]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Traditional Infrastructure */}
            <div className="bg-white/60 rounded-3xl p-8 lg:p-10 border border-[#b8d9ed]">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-[#e8f4fb] rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-time-line text-[#1e6b8a]/60 text-xl"></i>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#1e6b8a]">Traditional Infrastructure</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#e8614a]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="ri-close-line text-[#e8614a] text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#1e6b8a] mb-2">3-5 Day Settlement</h4>
                    <p className="text-[#1e6b8a]/70 text-sm leading-relaxed">
                      Cross-border transactions take days to clear through correspondent banking networks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#e8614a]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="ri-close-line text-[#e8614a] text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#1e6b8a] mb-2">High Fees</h4>
                    <p className="text-[#1e6b8a]/70 text-sm leading-relaxed">
                      Multiple intermediaries charge fees at every step, costing up to 6% per transaction.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#e8614a]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="ri-close-line text-[#e8614a] text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#1e6b8a] mb-2">Limited Transparency</h4>
                    <p className="text-[#1e6b8a]/70 text-sm leading-relaxed">
                      No real-time visibility into transaction status or fund location.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#e8614a]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="ri-close-line text-[#e8614a] text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#1e6b8a] mb-2">Compliance Complexity</h4>
                    <p className="text-[#1e6b8a]/70 text-sm leading-relaxed">
                      Fragmented regulatory requirements across jurisdictions create friction and risk.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* DACC Infrastructure */}
            <div className="bg-gradient-to-br from-[#1e6b8a] to-[#1e6b8a]/90 rounded-3xl p-8 lg:p-10 border-2 border-[#f5b942] relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-flashlight-fill text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">DACC Infrastructure</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="ri-check-line text-white text-lg font-bold"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Seconds Settlement</h4>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Near-instant finality via ChainFusion™ multi-chain architecture.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="ri-check-line text-white text-lg font-bold"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Significantly lower than traditional channels</h4>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Direct settlement eliminates intermediaries and their fees.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="ri-check-line text-white text-lg font-bold"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Full Transparency</h4>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Real-time tracking and immutable audit trails for every transaction.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="ri-check-line text-white text-lg font-bold"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Built-in Compliance</h4>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Regulatory-grade KYC/AML and reporting across key global jurisdictions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="Services" className="px-4 md:px-6 py-16 md:py-20 lg:px-12 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16 text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 px-4 text-[#1e6b8a]">Our&nbsp;<span className="text-[#f5b942]">Services</span></h2>
          </div>

          {/* Four Product Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
            {/* ChainFusion - Featured Product */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#1e6b8a] to-[#1e6b8a]/90 rounded-3xl p-6 md:p-8 border-2 border-[#f5b942] hover:shadow-[0_0_40px_rgba(245,185,66,0.5)] transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}></div>
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 md:px-4 py-2 mb-4 md:mb-6">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-xs md:text-sm text-white font-semibold">Now Live: ChainFusion™</span>
                </div>

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 leading-tight">
                  Cross-border settlement in <span className="text-white drop-shadow-lg">seconds</span>
                </h3>

                <p className="text-white/95 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                  DACC enables the tokenized economy using CIPS (Cross-border Interbank Payment System), which has participants in 193 countries and regions, covering over 1,500 banking institutions
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <button className="bg-[#f5b942] hover:bg-[#c97a2f] text-white px-6 md:px-8 py-2 md:py-2.5 rounded-full font-semibold hover:shadow-[0_0_20px_rgba(245,185,66,0.5)] transition-all duration-300 whitespace-nowrap cursor-pointer transform hover:scale-105 text-sm md:text-base">
                    Explore ChainFusion™
                  </button>
                </div>
              </div>
            </div>

            {/* Hot Wallet Integration */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 transform hover:-translate-y-2 shadow-md">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#e8f4fb] rounded-xl flex items-center justify-center">
                  <i className="ri-links-line text-[#1e6b8a] text-2xl md:text-3xl"></i>
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-bold text-[#1e6b8a] text-center mb-2 md:mb-3">Hot Wallet Integration</h3>

              <p className="text-[#1e6b8a]/70 text-center leading-relaxed mb-3 md:mb-4 text-xs md:text-sm">
                Flexible, API-driven hot wallet solutions built for scale and easy integration.
              </p>

              <div className="flex justify-center">
                <a href="/hot-wallet-en" className="inline-flex items-center space-x-2 text-[#1e6b8a] hover:text-[#f5b942] font-semibold cursor-pointer transition-all duration-300 text-xs md:text-sm">
                  <span>Learn More</span>
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>

            {/* Cold Wallet Infrastructure */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 transform hover:-translate-y-2 shadow-md">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#e8f4fb] rounded-xl flex items-center justify-center">
                  <i className="ri-database-2-line text-[#1e6b8a] text-2xl md:text-3xl"></i>
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-bold text-[#1e6b8a] text-center mb-2 md:mb-3">Cold Wallet Infrastructure</h3>

              <p className="text-[#1e6b8a]/70 text-center leading-relaxed mb-3 md:mb-4 text-xs md:text-sm">
                Secure, HSM-based cold storage with user-friendly interfaces and full local control.
              </p>

              <div className="flex justify-center">
                <a 
                  href="/cold-wallet-en"
                  className="inline-flex items-center space-x-2 text-[#1e6b8a] hover:text-[#f5b942] font-semibold cursor-pointer transition-all duration-300 text-xs md:text-sm"
                >
                  <span>Learn More</span>
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>
          </div>

          {/* RWA Tokenization Platform - Full Width */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#b8d9ed] hover:border-[#1e6b8a] transition-all duration-300 transform hover:-translate-y-2 shadow-md">
            <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
              <div className="flex justify-center lg:justify-start">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#e8f4fb] rounded-xl flex items-center justify-center">
                  <i className="ri-coin-line text-[#1e6b8a] text-3xl md:text-4xl"></i>
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-[#1e6b8a] mb-2 md:mb-3">RWA Tokenization Platform</h3>

                <p className="text-[#1e6b8a]/70 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                  UI-based platform with structured metadata and multi-party authorization for trusted RWA issuance.
                </p>

                <a href="/rwa-platform-en" className="inline-flex items-center space-x-2 text-[#1e6b8a] hover:text-[#f5b942] font-semibold cursor-pointer transition-all duration-300 text-sm md:text-base">
                  <span>Learn More</span>
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="px-4 md:px-6 py-16 md:py-20 lg:px-12 bg-gradient-to-b from-[#b8d9ed] to-[#e8f4fb]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16 text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 px-4 text-[#1e6b8a]">Use <span className="text-[#f5b942]">Cases</span></h2>
            <p className="text-lg md:text-xl text-[#1e6b8a]/70 max-w-3xl mx-auto px-4">
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
                  <span className="text-xs md:text-sm text-[#1e6b8a]/70">Connecting crypto platforms and e-commerce ecosystems through strategic exchange integrations</span>
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
      <section id="advisors" className="px-4 md:px-6 py-16 md:py-20 lg:px-12 bg-white/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 px-4 text-[#1e6b8a]">
              Our <span className="text-[#f5b942]">Directors</span>
            </h2>
          </div>

          <AdvisorsCarouselEN />
        </div>
      </section>

      {/* Our Investors Section */}
      <section id="ecosystem" className="px-4 md:px-6 py-16 md:py-20 lg:px-12 bg-gradient-to-b from-[#b8d9ed] to-[#1e6b8a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 px-4 text-[#1e6b8a]">
              Our <span className="text-[#f5b942]">Investors</span>
            </h2>
            <p className="text-lg md:text-xl text-[#1e6b8a]/80 max-w-3xl mx-auto px-4">
              Backed by leading Hong Kong and China-listed companies and international investors
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-white/70 rounded-xl p-4 md:p-6 border-2 border-[#b8d9ed] hover:border-[#f5b942] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,185,66,0.3)] cursor-pointer transform hover:-translate-y-2">
              <p className="text-center font-semibold text-[#1e6b8a] text-sm md:text-base">Conflux/Starcoin</p>
              <p className="text-center text-xs md:text-sm text-[#1e6b8a]/70 mt-1">(HKEX: 399)</p>
            </div>

            <div className="bg-white/70 rounded-xl p-4 md:p-6 border-2 border-[#b8d9ed] hover:border-[#f5b942] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,185,66,0.3)] cursor-pointer transform hover:-translate-y-2">
              <p className="text-center font-semibold text-[#1e6b8a] text-sm md:text-base">TTL/ Kingdom</p>
              <p className="text-center text-xs md:text-sm text-[#1e6b8a]/70 mt-1">(SZSE: 600446)</p>
            </div>

            <div className="bg-white/70 rounded-xl p-4 md:p-6 border-2 border-[#b8d9ed] hover:border-[#f5b942] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,185,66,0.3)] cursor-pointer transform hover:-translate-y-2">
              <p className="text-center font-semibold text-[#1e6b8a] text-sm md:text-base">Global Infotech</p>
              <p className="text-center text-xs md:text-sm text-[#1e6b8a]/70 mt-1">(SZSE: 300465)</p>
            </div>

            <div className="bg-white/70 rounded-xl p-4 md:p-6 border-2 border-[#b8d9ed] hover:border-[#f5b942] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,185,66,0.3)] cursor-pointer transform hover:-translate-y-2">
              <p className="text-center font-semibold text-[#1e6b8a] text-sm md:text-base">Fosun International</p>
              <p className="text-center text-xs md:text-sm text-[#1e6b8a]/70 mt-1">(HKEX: 0656)</p>
            </div>

            <div className="bg-white/70 rounded-xl p-4 md:p-6 border-2 border-[#b8d9ed] hover:border-[#f5b942] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,185,66,0.3)] cursor-pointer transform hover:-translate-y-2">
              <p className="text-center font-semibold text-[#1e6b8a] text-sm md:text-base">Avior Capital</p>
            </div>

            <div className="bg-white/70 rounded-xl p-4 md:p-6 border-2 border-[#b8d9ed] hover:border-[#f5b942] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,185,66,0.3)] cursor-pointer transform hover:-translate-y-2">
              <p className="text-center font-semibold text-[#1e6b8a] text-sm md:text-base">Blockstone</p>
            </div>

            <div className="bg-white/70 rounded-xl p-4 md:p-6 border-2 border-[#b8d9ed] hover:border-[#f5b942] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,185,66,0.3)] cursor-pointer transform hover:-translate-y-2">
              <p className="text-center font-semibold text-[#1e6b8a] text-sm md:text-base">BridgeTower Capital</p>
            </div>

            <div className="bg-white/70 rounded-xl p-4 md:p-6 border-2 border-[#b8d9ed] hover:border-[#f5b942] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,185,66,0.3)] cursor-pointer transform hover:-translate-y-2">
              <p className="text-center font-semibold text-[#1e6b8a] text-sm md:text-base">Fintech World</p>
            </div>

            <div className="bg-white/70 rounded-xl p-4 md:p-6 border-2 border-[#b8d9ed] hover:border-[#f5b942] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,185,66,0.3)] cursor-pointer transform hover:-translate-y-2">
              <p className="text-center font-semibold text-[#1e6b8a] text-sm md:text-base">Satoshi Ventures</p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-[#1e6b8a] hover:bg-[#f5b942] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <i className="ri-arrow-up-line text-xl"></i>
        </button>
      )}

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
