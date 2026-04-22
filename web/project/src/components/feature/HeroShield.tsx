import { useEffect, useRef } from 'react';

// ── Network canvas background ─────────────────────────────────────────────────
function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 420, H = 420;
    canvas.width = W; canvas.height = H;

    interface Node { x: number; y: number; vx: number; vy: number }
    const nodes: Node[] = Array.from({ length: 22 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(103,232,249,${(1 - d / 130) * 0.22})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(103,232,249,0.50)';
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ── Shield SVG ────────────────────────────────────────────────────────────────
function Shield() {
  return (
    <svg viewBox="0 0 120 138" width="148" height="170" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 24px rgba(103,232,249,0.7)) drop-shadow(0 0 8px rgba(30,107,138,0.8))' }}>
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="120" y2="138" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a8eeff" />
          <stop offset="50%" stopColor="#1e8ab5" />
          <stop offset="100%" stopColor="#0d4f75" />
        </linearGradient>
        <linearGradient id="sg2" x1="0" y1="0" x2="120" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <path d="M60 4 L112 28 V74 C112 106 60 134 60 134 C60 134 8 106 8 74 V28 Z" fill="url(#sg)" />
      <path d="M60 14 L102 34 V72 C102 98 60 122 60 122 C60 122 18 98 18 72 V34 Z" fill="url(#sg2)" />
      <path d="M36 70 L53 88 L84 50"
        stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.9))' }} />
    </svg>
  );
}

// ── Orbit product card ────────────────────────────────────────────────────────
// Orbit radius = 152px (matches the CSS keyframe translateX value).
// Each item uses two nested divs:
//   outer → spins (hero-orbit-spin), delay offsets the starting angle
//   inner → counter-spins (hero-orbit-counter) so the card stays upright
const ORBIT_PERIOD = 14; // seconds for one full revolution

const products = [
  { icon: 'ri-safe-line',           label: 'Custody',       accent: '#67e8f9', delayS: 0                        },
  { icon: 'ri-exchange-funds-line', label: 'ChainFusion™',  accent: '#f5b942', delayS: -ORBIT_PERIOD * 0.25     },
  { icon: 'ri-coin-line',           label: 'Tokenization',  accent: '#a78bfa', delayS: -ORBIT_PERIOD * 0.5      },
  { icon: 'ri-links-line',          label: 'Hot Wallet',    accent: '#34d399', delayS: -ORBIT_PERIOD * 0.75     },
];

function OrbitItem({ icon, label, accent, delayS }: typeof products[0]) {
  const anim = `hero-orbit-spin ${ORBIT_PERIOD}s linear infinite`;
  const counter = `hero-orbit-counter ${ORBIT_PERIOD}s linear infinite`;
  return (
    /* Outer: rotation pivot at container centre */
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      width: 0, height: 0,
      animation: anim,
      animationDelay: `${delayS}s`,
    }}>
      {/* Inner: translate to radius + counter-rotate to stay upright */}
      <div style={{
        position: 'absolute',
        animation: counter,
        animationDelay: `${delayS}s`,
      }}>
        <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border backdrop-blur-sm"
          style={{
            background: 'rgba(11,27,49,0.65)',
            borderColor: `${accent}55`,
            boxShadow: `0 0 12px ${accent}33`,
            minWidth: '82px',
          }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}>
            <i className={`${icon} text-lg`} style={{ color: accent }}></i>
          </div>
          <span className="text-[10px] font-semibold text-white/90 whitespace-nowrap font-montserrat leading-tight text-center">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HeroShield() {
  return (
    <div className="hidden lg:flex items-center justify-center relative">
      <div className="relative w-[420px] h-[420px]">

        {/* Network canvas background */}
        <NetworkCanvas />

        {/* Radial glow */}
        <div className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 52%, rgba(103,232,249,0.18) 0%, rgba(30,107,138,0.10) 45%, transparent 72%)' }} />

        {/* Orbit track ring */}
        <div className="absolute rounded-full border border-[#67e8f9]/15 pointer-events-none"
          style={{ inset: '34px' }} />

        {/* Pulse rings behind shield */}
        <div className="absolute rounded-full border border-[#67e8f9]/30 animate-ping pointer-events-none"
          style={{ inset: '120px', animationDuration: '3s' }} />
        <div className="absolute rounded-full border border-[#67e8f9]/20 animate-ping pointer-events-none"
          style={{ inset: '100px', animationDuration: '3s', animationDelay: '1s' }} />

        {/* Orbiting product cards */}
        {products.map(p => <OrbitItem key={p.label} {...p} />)}

        {/* Shield — centre, gentle float */}
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ animation: 'float 6s ease-in-out infinite' }}>
          <Shield />
        </div>

        {/* Corner accent dots */}
        {[
          { top: '18%', left: '18%' },
          { top: '18%', left: '76%' },
          { top: '76%', left: '18%' },
          { top: '76%', left: '76%' },
        ].map((d, i) => (
          <div key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#67e8f9]/50 animate-pulse"
            style={{ top: d.top, left: d.left, animationDelay: `${i * 0.6}s` }} />
        ))}

      </div>
    </div>
  );
}
