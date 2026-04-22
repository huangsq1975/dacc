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
      x: Math.random() * W, y: Math.random() * H,
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
            ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath(); ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(103,232,249,0.50)'; ctx.fill();
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
          <stop offset="0%" stopColor="#a8eeff" /><stop offset="50%" stopColor="#1e8ab5" /><stop offset="100%" stopColor="#0d4f75" />
        </linearGradient>
        <linearGradient id="sg2" x1="0" y1="0" x2="120" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.25)" /><stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <path d="M60 4 L112 28 V74 C112 106 60 134 60 134 C60 134 8 106 8 74 V28 Z" fill="url(#sg)" />
      <path d="M60 14 L102 34 V72 C102 98 60 122 60 122 C60 122 18 98 18 72 V34 Z" fill="url(#sg2)" />
      <path d="M36 70 L53 88 L84 50" stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.9))' }} />
    </svg>
  );
}

// ── Orbiting products (JS-driven, variable radius) ────────────────────────────
const PERIOD_MS = 28000; // 28 s per revolution
const CX = 210, CY = 210; // container centre

const PRODUCTS = [
  { icon: 'ri-safe-line',           label: 'Custody',      accent: '#67e8f9', radius: 128, startAngle: 0              },
  { icon: 'ri-exchange-funds-line', label: 'ChainFusion™', accent: '#f5b942', radius: 170, startAngle: Math.PI * 0.5  },
  { icon: 'ri-coin-line',           label: 'Tokenization', accent: '#a78bfa', radius: 142, startAngle: Math.PI        },
  { icon: 'ri-links-line',          label: 'Hot Wallet',   accent: '#34d399', radius: 162, startAngle: Math.PI * 1.5  },
];

function OrbitingProducts() {
  // Keep refs to the wrapper divs so we can update transform directly (no re-render)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let animId: number;

    const tick = (ts: number) => {
      const angle = (ts / PERIOD_MS) * Math.PI * 2;
      PRODUCTS.forEach((p, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const a = angle + p.startAngle;
        const x = CX + p.radius * Math.cos(a);
        const y = CY + p.radius * Math.sin(a);
        el.style.transform = `translate(${x - CX}px, ${y - CY}px)`;
      });
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      {PRODUCTS.map((p, i) => (
        // Anchor at container centre; transform moves it to orbit position each frame
        <div key={p.label}
          ref={el => { itemRefs.current[i] = el; }}
          style={{ position: 'absolute', top: '50%', left: '50%', willChange: 'transform' }}>
          {/* Offset so the icon visually centres on the orbit point */}
          <div style={{ transform: 'translate(-50%, -50%)' }}
            className="flex flex-col items-center gap-0.5 select-none">
            <i className={`${p.icon} text-[22px]`}
              style={{ color: p.accent, filter: `drop-shadow(0 0 7px ${p.accent}cc)` }} />
            <span className="text-[9px] font-semibold font-montserrat whitespace-nowrap"
              style={{ color: p.accent + 'cc', textShadow: `0 0 6px ${p.accent}88` }}>
              {p.label}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HeroShield() {
  return (
    <div className="hidden lg:flex items-center justify-center relative">
      <div className="relative w-[420px] h-[420px]">

        <NetworkCanvas />

        {/* Radial glow */}
        <div className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 52%, rgba(103,232,249,0.18) 0%, rgba(30,107,138,0.10) 45%, transparent 72%)' }} />

        {/* Pulse rings */}
        <div className="absolute rounded-full border border-[#67e8f9]/30 animate-ping pointer-events-none"
          style={{ inset: '120px', animationDuration: '3s' }} />
        <div className="absolute rounded-full border border-[#67e8f9]/20 animate-ping pointer-events-none"
          style={{ inset: '100px', animationDuration: '3s', animationDelay: '1s' }} />

        {/* Orbiting product icons */}
        <OrbitingProducts />

        {/* Shield — centre float */}
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ animation: 'float 6s ease-in-out infinite' }}>
          <Shield />
        </div>

        {/* Corner accent dots */}
        {[{ top: '18%', left: '18%' }, { top: '18%', left: '76%' },
          { top: '76%', left: '18%' }, { top: '76%', left: '76%' }].map((d, i) => (
          <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-[#67e8f9]/50 animate-pulse"
            style={{ top: d.top, left: d.left, animationDelay: `${i * 0.6}s` }} />
        ))}

      </div>
    </div>
  );
}
