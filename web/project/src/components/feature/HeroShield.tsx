import { useEffect, useRef } from 'react';

const W = 420, H = 420;
const rand = (a: number, b: number) => Math.random() * (b - a) + a;

// ── Rich blockchain canvas background ─────────────────────────────────────────
function BlockchainCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = W; canvas.height = H;

    // ── Node tiers ──────────────────────────────────────────────────────────
    interface Node {
      x: number; y: number; vx: number; vy: number;
      r: number; haloR: number; phase: number;
      coreA: number; haloA: number;
    }
    const mkNode = (r: number, haloR: number, coreA: number, haloA: number, speed: number): Node => ({
      x: rand(10, W - 10), y: rand(10, H - 10),
      vx: (Math.random() - 0.5) * speed, vy: (Math.random() - 0.5) * speed,
      r, haloR, coreA, haloA, phase: rand(0, Math.PI * 2),
    });
    const nodes: Node[] = [
      // 4 large hub nodes — slow, bright
      ...Array.from({ length: 4 },  () => mkNode(3.5, 24, 0.92, 0.22, 0.10)),
      // 9 medium relay nodes
      ...Array.from({ length: 9 },  () => mkNode(2.0, 13, 0.72, 0.14, 0.18)),
      // 13 small leaf nodes
      ...Array.from({ length: 13 }, () => mkNode(1.2,  7, 0.55, 0.08, 0.26)),
    ];

    // ── Energy packets (travel along connections) ───────────────────────────
    interface Packet { i: number; j: number; t: number; speed: number }
    const resetPacket = (): Packet => ({
      i: Math.floor(Math.random() * nodes.length),
      j: Math.floor(Math.random() * nodes.length),
      t: Math.random(), speed: rand(0.003, 0.007),
    });
    const packets: Packet[] = Array.from({ length: 7 }, resetPacket);
    const MAX_CONN = 140; // max connection distance

    // ── Micro ambient particles ─────────────────────────────────────────────
    interface Micro { x: number; y: number; vx: number; vy: number; r: number; phase: number; a: number }
    const micros: Micro[] = Array.from({ length: 18 }, () => ({
      x: rand(0, W), y: rand(0, H),
      vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
      r: rand(0.5, 1.8), phase: rand(0, Math.PI * 2), a: rand(0.08, 0.30),
    }));

    // ── Energy streams (slowly evolving bezier curves) ──────────────────────
    interface Stream {
      x0: number; y0: number; x3: number; y3: number;
      bx1: number; by1: number; bx2: number; by2: number; // base control pts
      drift: number; dashOff: number; flowSpeed: number; alpha: number;
    }
    const streams: Stream[] = [
      { x0: 0,   y0: 90,  x3: W,   y3: 75,  bx1: 120, by1: 30,  bx2: 290, by2: 110, drift: 1.0, dashOff: 0,  flowSpeed: 0.38, alpha: 0.12 },
      { x0: 0,   y0: 290, x3: W,   y3: 310, bx1: 110, by1: 340, bx2: 300, by2: 260, drift: 0.7, dashOff: 40, flowSpeed: 0.28, alpha: 0.10 },
      { x0: 70,  y0: 0,   x3: 350, y3: H,   bx1: 40,  by1: 160, bx2: 380, by2: 270, drift: 0.9, dashOff: 20, flowSpeed: 0.33, alpha: 0.09 },
      { x0: 200, y0: 0,   x3: 220, y3: H,   bx1: 350, by1: 110, bx2: 80,  by2: 310, drift: 1.2, dashOff: 60, flowSpeed: 0.22, alpha: 0.08 },
    ];

    // ── Draw ────────────────────────────────────────────────────────────────
    let frame = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const tf = frame * 0.001; // slow global time

      // ── Layer 1: dot grid (two scales) ─────────────────────────────────
      for (const S of [36, 72]) {
        for (let gx = S / 2; gx < W; gx += S) {
          for (let gy = S / 2; gy < H; gy += S) {
            const p = (S === 36 ? 0.048 : 0.10) + 0.020 * Math.sin(frame * 0.004 + gx * 0.08 + gy * 0.06);
            ctx.beginPath(); ctx.arc(gx, gy, S === 36 ? 0.9 : 1.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(140,210,242,${p})`; ctx.fill();
          }
        }
      }

      // ── Update nodes ────────────────────────────────────────────────────
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }

      // ── Layer 2: connection lines ────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_CONN) {
            const ratio = 1 - d / MAX_CONN;
            // Soft glow stroke
            ctx.beginPath();
            ctx.strokeStyle = `rgba(90,195,240,${ratio * 0.14})`;
            ctx.lineWidth = 3.5;
            ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            // Sharp core stroke
            ctx.beginPath();
            ctx.strokeStyle = `rgba(160,235,255,${ratio * 0.38})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // ── Layer 3: energy streams ──────────────────────────────────────────
      ctx.save();
      for (const s of streams) {
        s.dashOff -= s.flowSpeed;
        // Control points oscillate slowly → organic flow feel
        const cp1x = s.bx1 + 28 * Math.sin(tf * s.drift + 0.0);
        const cp1y = s.by1 + 18 * Math.cos(tf * s.drift + 1.1);
        const cp2x = s.bx2 + 22 * Math.sin(tf * s.drift + 2.3);
        const cp2y = s.by2 + 28 * Math.cos(tf * s.drift + 3.4);

        // Glow pass
        ctx.beginPath();
        ctx.setLineDash([14, 32]);
        ctx.lineDashOffset = s.dashOff;
        ctx.strokeStyle = `rgba(103,220,255,${s.alpha * 0.5})`;
        ctx.lineWidth = 3;
        ctx.moveTo(s.x0, s.y0);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, s.x3, s.y3);
        ctx.stroke();

        // Core pass
        ctx.beginPath();
        ctx.setLineDash([10, 36]);
        ctx.lineDashOffset = s.dashOff;
        ctx.strokeStyle = `rgba(160,238,255,${s.alpha})`;
        ctx.lineWidth = 0.9;
        ctx.moveTo(s.x0, s.y0);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, s.x3, s.y3);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.restore();

      // ── Layer 4: energy packets ──────────────────────────────────────────
      for (const pkt of packets) {
        pkt.t += pkt.speed;
        const ni = nodes[pkt.i], nj = nodes[pkt.j];
        if (!ni || !nj) { Object.assign(pkt, resetPacket()); continue; }
        const dx = ni.x - nj.x, dy = ni.y - nj.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > MAX_CONN || pkt.t > 1) {
          // reassign to a valid nearby pair
          let found = false;
          for (let tries = 0; tries < 20 && !found; tries++) {
            const a = Math.floor(Math.random() * nodes.length);
            const b = Math.floor(Math.random() * nodes.length);
            const ddx = nodes[a].x - nodes[b].x, ddy = nodes[a].y - nodes[b].y;
            if (Math.sqrt(ddx * ddx + ddy * ddy) < MAX_CONN) {
              pkt.i = a; pkt.j = b; pkt.t = 0; found = true;
            }
          }
          if (!found) continue;
        }
        const px = ni.x + (nj.x - ni.x) * pkt.t;
        const py = ni.y + (nj.y - ni.y) * pkt.t;
        const fade = Math.sin(pkt.t * Math.PI);
        const g = ctx.createRadialGradient(px, py, 0, px, py, 10);
        g.addColorStop(0, `rgba(210,248,255,${fade * 0.80})`);
        g.addColorStop(0.4, `rgba(103,232,249,${fade * 0.30})`);
        g.addColorStop(1,   'rgba(103,232,249,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${fade * 0.92})`;
        ctx.beginPath(); ctx.arc(px, py, 1.6, 0, Math.PI * 2); ctx.fill();
      }

      // ── Layer 5: micro ambient particles ────────────────────────────────
      for (const m of micros) {
        m.x += m.vx; m.y += m.vy;
        if (m.x < 0 || m.x > W) m.vx *= -1;
        if (m.y < 0 || m.y > H) m.vy *= -1;
        const a = m.a * (0.45 + 0.55 * Math.sin(frame * 0.009 + m.phase));
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,235,252,${a})`; ctx.fill();
      }

      // ── Layer 6: node halos + cores ──────────────────────────────────────
      for (const n of nodes) {
        const pulse = 0.82 + 0.18 * Math.sin(frame * 0.013 + n.phase);
        const hR = n.haloR * pulse;
        // Outer diffuse halo
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, hR);
        halo.addColorStop(0,   `rgba(103,232,249,${n.haloA * pulse})`);
        halo.addColorStop(0.5, `rgba(103,232,249,${n.haloA * pulse * 0.4})`);
        halo.addColorStop(1,   'rgba(103,232,249,0)');
        ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(n.x, n.y, hR, 0, Math.PI * 2); ctx.fill();
        // Mid glow
        const mid = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.5);
        mid.addColorStop(0, `rgba(200,245,255,${n.coreA * 0.6})`);
        mid.addColorStop(1, 'rgba(200,245,255,0)');
        ctx.fillStyle = mid; ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 2.5, 0, Math.PI * 2); ctx.fill();
        // Core dot
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,248,255,${n.coreA * pulse})`; ctx.fill();
        // Bright centre pinpoint
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${n.coreA})`; ctx.fill();
      }

      frame++;
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

// ── Orbiting products ─────────────────────────────────────────────────────────
const PERIOD_MS = 28000;
const CX = 210, CY = 210;
const PRODUCTS = [
  { icon: 'ri-safe-line',           label: 'Custody',      accent: '#67e8f9', radius: 128, startAngle: 0              },
  { icon: 'ri-exchange-funds-line', label: 'ChainFusion™', accent: '#f5b942', radius: 170, startAngle: Math.PI * 0.5  },
  { icon: 'ri-coin-line',           label: 'Tokenization', accent: '#a78bfa', radius: 142, startAngle: Math.PI        },
  { icon: 'ri-links-line',          label: 'Hot Wallet',   accent: '#34d399', radius: 162, startAngle: Math.PI * 1.5  },
];

function OrbitingProducts() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let animId: number;
    const tick = (ts: number) => {
      const angle = (ts / PERIOD_MS) * Math.PI * 2;
      PRODUCTS.forEach((p, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const a = angle + p.startAngle;
        el.style.transform = `translate(${p.radius * Math.cos(a)}px, ${p.radius * Math.sin(a)}px)`;
      });
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      {PRODUCTS.map((p, i) => (
        <div key={p.label} ref={el => { itemRefs.current[i] = el; }}
          style={{ position: 'absolute', top: '50%', left: '50%', willChange: 'transform' }}>
          <div style={{ transform: 'translate(-50%, -50%)' }} className="flex flex-col items-center gap-0.5 select-none">
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

        <BlockchainCanvas />

        {/* Radial depth glow overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 52%, rgba(103,232,249,0.15) 0%, rgba(30,107,138,0.08) 42%, transparent 70%)' }} />

        {/* Pulse rings */}
        <div className="absolute rounded-full border border-[#67e8f9]/30 animate-ping pointer-events-none"
          style={{ inset: '120px', animationDuration: '3s' }} />
        <div className="absolute rounded-full border border-[#67e8f9]/20 animate-ping pointer-events-none"
          style={{ inset: '100px', animationDuration: '3s', animationDelay: '1s' }} />

        <OrbitingProducts />

        {/* Shield — floating centre */}
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ animation: 'float 6s ease-in-out infinite' }}>
          <Shield />
        </div>

      </div>
    </div>
  );
}
