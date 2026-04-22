import { useEffect, useRef } from 'react';

// ── Network canvas background ──────────────────────────────────────────────────
function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 420, H = 420;
    canvas.width = W; canvas.height = H;

    const NODE_COUNT = 22;
    interface Node { x: number; y: number; vx: number; vy: number }
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Update positions
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }

      // Lines
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(103,232,249,${(1 - dist / 130) * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Dots
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(103,232,249,0.55)';
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
      {/* Shield body */}
      <path d="M60 4 L112 28 V74 C112 106 60 134 60 134 C60 134 8 106 8 74 V28 Z"
        fill="url(#sg)" />
      {/* Inner highlight */}
      <path d="M60 14 L102 34 V72 C102 98 60 122 60 122 C60 122 18 98 18 72 V34 Z"
        fill="url(#sg2)" />
      {/* Checkmark */}
      <path d="M36 70 L53 88 L84 50"
        stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.9))' }} />
    </svg>
  );
}

// ── Coin stack ────────────────────────────────────────────────────────────────
function CoinStack({ count, style, delay }: { count: number; style: React.CSSProperties; delay: string }) {
  return (
    <div className="absolute animate-[float_5s_ease-in-out_infinite]"
      style={{ ...style, animationDelay: delay }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}
          className="w-11 h-[14px] rounded-full border border-yellow-200/60"
          style={{
            marginTop: i === 0 ? 0 : '-5px',
            background: i === 0
              ? 'linear-gradient(180deg,#ffe066 0%,#f5a623 60%,#c97a00 100%)'
              : i % 2 === 0
                ? 'linear-gradient(180deg,#ffd84d 0%,#e8991a 60%,#b86e00 100%)'
                : 'linear-gradient(180deg,#ffec80 0%,#f0b030 60%,#c07800 100%)',
            boxShadow: i === 0 ? '0 4px 12px rgba(245,185,66,0.55)' : 'none',
            zIndex: count - i,
          }}
        />
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HeroShield() {
  return (
    <div className="hidden lg:flex items-center justify-center relative">
      <div className="relative w-[420px] h-[420px]">

        {/* Network background */}
        <NetworkCanvas />

        {/* Radial glow */}
        <div className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 52%, rgba(103,232,249,0.18) 0%, rgba(30,107,138,0.10) 45%, transparent 72%)' }} />

        {/* Pulse rings */}
        <div className="absolute rounded-full border border-[#67e8f9]/30 animate-ping pointer-events-none"
          style={{ inset: '80px', animationDuration: '3s' }} />
        <div className="absolute rounded-full border border-[#67e8f9]/20 animate-ping pointer-events-none"
          style={{ inset: '55px', animationDuration: '3s', animationDelay: '1s' }} />

        {/* Shield — centre */}
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ animation: 'float 6s ease-in-out infinite' }}>
          <Shield />
        </div>

        {/* Coin stacks */}
        <CoinStack count={4}
          style={{ top: '38%', left: '78%' }}
          delay="0s" />
        <CoinStack count={3}
          style={{ top: '62%', left: '66%' }}
          delay="0.8s" />
        <CoinStack count={5}
          style={{ top: '55%', left: '10%' }}
          delay="1.4s" />
        <CoinStack count={2}
          style={{ top: '14%', left: '72%' }}
          delay="2s" />
        <CoinStack count={3}
          style={{ top: '16%', left: '10%' }}
          delay="0.4s" />

        {/* Floating info badges */}
        {[
          { top: '6%',  left: '30%', icon: 'ri-lock-line',       label: 'Secured' },
          { top: '80%', left: '28%', icon: 'ri-exchange-line',   label: 'Cleared' },
        ].map((b, i) => (
          <div key={i}
            className="absolute flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm border border-white/20 bg-[#0b2742]/55 animate-[float_5s_ease-in-out_infinite]"
            style={{ top: b.top, left: b.left, animationDelay: `${i * 1.2}s` }}>
            <i className={`${b.icon} text-[#67e8f9]`}></i>
            {b.label}
          </div>
        ))}

        {/* Corner dots */}
        {[
          { top: '22%', left: '22%' },
          { top: '22%', left: '72%' },
          { top: '72%', left: '22%' },
          { top: '72%', left: '72%' },
        ].map((d, i) => (
          <div key={i}
            className="absolute w-2 h-2 rounded-full bg-[#67e8f9]/60 animate-pulse"
            style={{ top: d.top, left: d.left, animationDelay: `${i * 0.5}s` }} />
        ))}

      </div>
    </div>
  );
}
