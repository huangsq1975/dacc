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

// ── Settlement Network SVG ────────────────────────────────────────────────────
function Shield() {
  return (
    <svg viewBox="0 0 200 200" width="200" height="200" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 24px rgba(56,189,248,0.55)) drop-shadow(0 0 10px rgba(14,79,117,0.7))' }}>
      <defs>
        <radialGradient id="fs-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e0f9ff" />
          <stop offset="35%" stopColor="#38bdf8" />
          <stop offset="80%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </radialGradient>
        <radialGradient id="fs-hub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(56,189,248,0.35)" />
          <stop offset="100%" stopColor="rgba(12,74,110,0.1)" />
        </radialGradient>
        <radialGradient id="fs-node" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="55%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#082f49" />
        </radialGradient>
        <radialGradient id="fs-cips" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="55%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#713f12" />
        </radialGradient>
        <filter id="fs-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="fs-cglow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Static outer decorative rings */}
      <circle cx="100" cy="100" r="92" stroke="rgba(56,189,248,0.08)" strokeWidth="0.5" strokeDasharray="3 8" />
      <circle cx="100" cy="100" r="78" stroke="rgba(56,189,248,0.13)" strokeWidth="0.5" strokeDasharray="1.5 6" />

      {/* ── Rotating group: routes + relay diamonds + outer nodes ── */}
      <g className="animate-spin-ccw" style={{ transformOrigin: '100px 100px', transformBox: 'view-box' }}>

        {/* Settlement routes — nodes now at r=65 from centre */}
        <line x1="100" y1="100" x2="100" y2="35"  stroke="rgba(234,179,8,0.18)"   strokeWidth="5" />
        <line x1="100" y1="100" x2="100" y2="35"  stroke="rgba(234,179,8,0.75)"   strokeWidth="0.8" filter="url(#fs-glow)" />

        <line x1="100" y1="100" x2="156" y2="68"  stroke="rgba(56,189,248,0.18)"  strokeWidth="5" />
        <line x1="100" y1="100" x2="156" y2="68"  stroke="rgba(103,232,249,0.75)" strokeWidth="0.8" filter="url(#fs-glow)" />

        <line x1="100" y1="100" x2="156" y2="132" stroke="rgba(167,139,250,0.18)" strokeWidth="5" />
        <line x1="100" y1="100" x2="156" y2="132" stroke="rgba(167,139,250,0.75)" strokeWidth="0.8" filter="url(#fs-glow)" />

        <line x1="100" y1="100" x2="100" y2="165" stroke="rgba(56,189,248,0.18)"  strokeWidth="5" />
        <line x1="100" y1="100" x2="100" y2="165" stroke="rgba(103,232,249,0.75)" strokeWidth="0.8" filter="url(#fs-glow)" />

        <line x1="100" y1="100" x2="44"  y2="132" stroke="rgba(52,211,153,0.18)"  strokeWidth="5" />
        <line x1="100" y1="100" x2="44"  y2="132" stroke="rgba(52,211,153,0.75)"  strokeWidth="0.8" filter="url(#fs-glow)" />

        <line x1="100" y1="100" x2="44"  y2="68"  stroke="rgba(56,189,248,0.18)"  strokeWidth="5" />
        <line x1="100" y1="100" x2="44"  y2="68"  stroke="rgba(103,232,249,0.75)" strokeWidth="0.8" filter="url(#fs-glow)" />

        {/* Relay diamonds — midpoints of new routes */}
        <rect x="96.5" y="64"   width="7" height="7" fill="rgba(234,179,8,0.75)"   stroke="rgba(254,249,195,0.9)" strokeWidth="0.6" transform="rotate(45 100 67.5)"  filter="url(#fs-glow)" />
        <rect x="124.5" y="80.5" width="7" height="7" fill="rgba(56,189,248,0.75)"  stroke="rgba(186,230,253,0.9)" strokeWidth="0.6" transform="rotate(45 128 84)"    filter="url(#fs-glow)" />
        <rect x="124.5" y="112.5" width="7" height="7" fill="rgba(167,139,250,0.75)" stroke="rgba(233,213,255,0.9)" strokeWidth="0.6" transform="rotate(45 128 116)"  filter="url(#fs-glow)" />
        <rect x="96.5" y="129"  width="7" height="7" fill="rgba(56,189,248,0.75)"  stroke="rgba(186,230,253,0.9)" strokeWidth="0.6" transform="rotate(45 100 132.5)" filter="url(#fs-glow)" />
        <rect x="68.5" y="112.5" width="7" height="7" fill="rgba(52,211,153,0.75)"  stroke="rgba(167,243,208,0.9)" strokeWidth="0.6" transform="rotate(45 72 116)"    filter="url(#fs-glow)" />
        <rect x="68.5" y="80.5" width="7" height="7" fill="rgba(56,189,248,0.75)"  stroke="rgba(186,230,253,0.9)" strokeWidth="0.6" transform="rotate(45 72 84)"     filter="url(#fs-glow)" />

        {/* CIPS — top | r=19 (+50%) | icon ×1.5 */}
        <circle cx="100" cy="35" r="19" fill="url(#fs-cips)" filter="url(#fs-glow)" />
        <circle cx="100" cy="35" r="19" stroke="rgba(234,179,8,0.8)" strokeWidth="1" />
        <g transform="translate(100,35) scale(1.5)" fill="rgba(255,248,200,0.95)" stroke="rgba(255,248,200,0.95)" strokeLinecap="round">
          <circle r="2" />
          <line x1="0"    y1="-2.3" x2="0"    y2="-6.8" strokeWidth="0.8" />
          <line x1="2.3"  y1="0"    x2="6.8"  y2="0"    strokeWidth="0.8" />
          <line x1="0"    y1="2.3"  x2="0"    y2="6.8"  strokeWidth="0.8" />
          <line x1="-2.3" y1="0"    x2="-6.8" y2="0"    strokeWidth="0.8" />
          <circle cx="0"    cy="-6.8" r="1.5" />
          <circle cx="6.8"  cy="0"    r="1.5" />
          <circle cx="0"    cy="6.8"  r="1.5" />
          <circle cx="-6.8" cy="0"    r="1.5" />
        </g>

        {/* ETH — top-right | r=16 (+50%) | icon ×1.5 */}
        <circle cx="156" cy="68" r="16" fill="url(#fs-node)" filter="url(#fs-glow)" />
        <circle cx="156" cy="68" r="16" stroke="rgba(103,232,249,0.7)" strokeWidth="0.9" />
        <g transform="translate(156,68) scale(1.5)">
          <polygon points="0,-5.2 -4.3,0   0,-0.8  4.3,0"  fill="rgba(186,230,253,1)"   />
          <polygon points="0,-5.2 -4.3,0   0,-0.8"         fill="rgba(186,230,253,0.55)" />
          <polygon points="0,5.2  -4.3,0.8 0,2    4.3,0.8" fill="rgba(186,230,253,0.85)" />
          <polygon points="0,5.2  -4.3,0.8 0,2"            fill="rgba(186,230,253,0.5)"  />
        </g>

        {/* MPC — bottom-right | r=16 (+50%) | icon ×1.5 */}
        <circle cx="156" cy="132" r="16" fill="url(#fs-node)" filter="url(#fs-glow)" />
        <circle cx="156" cy="132" r="16" stroke="rgba(167,139,250,0.7)" strokeWidth="0.9" />
        <g transform="translate(156,132) scale(1.5)" stroke="rgba(233,213,255,0.95)" fill="none" strokeLinecap="round">
          <path d="M -3.2,-0.8 L -3.2,-2.8 A 3.2,3.2 0 0,1 3.2,-2.8 L 3.2,-0.8" strokeWidth="0.93" />
          <rect x="-4" y="-0.8" width="8" height="5.8" rx="1.1" strokeWidth="0.73" />
          <circle cx="0" cy="2.2" r="1.2" fill="rgba(233,213,255,0.8)" stroke="none" />
        </g>

        {/* HSM — bottom | r=16 (+50%) | icon ×1.5 */}
        <circle cx="100" cy="165" r="16" fill="url(#fs-node)" filter="url(#fs-glow)" />
        <circle cx="100" cy="165" r="16" stroke="rgba(56,189,248,0.7)" strokeWidth="0.9" />
        <g transform="translate(100,165) scale(1.5)" stroke="rgba(186,230,253,0.95)" fill="none" strokeLinecap="round">
          <rect x="-3.5" y="-3.5" width="7" height="7" rx="0.8" strokeWidth="0.73" />
          <rect x="-2"   y="-2"   width="4" height="4" rx="0.4" fill="rgba(186,230,253,0.55)" stroke="none" />
          <line x1="-2" y1="-3.5" x2="-2" y2="-5.3" strokeWidth="0.67" />
          <line x1="0"  y1="-3.5" x2="0"  y2="-5.3" strokeWidth="0.67" />
          <line x1="2"  y1="-3.5" x2="2"  y2="-5.3" strokeWidth="0.67" />
          <line x1="-2" y1="3.5"  x2="-2" y2="5.3"  strokeWidth="0.67" />
          <line x1="0"  y1="3.5"  x2="0"  y2="5.3"  strokeWidth="0.67" />
          <line x1="2"  y1="3.5"  x2="2"  y2="5.3"  strokeWidth="0.67" />
          <line x1="-3.5" y1="-1.5" x2="-5.3" y2="-1.5" strokeWidth="0.67" />
          <line x1="-3.5" y1="1.5"  x2="-5.3" y2="1.5"  strokeWidth="0.67" />
          <line x1="3.5"  y1="-1.5" x2="5.3"  y2="-1.5" strokeWidth="0.67" />
          <line x1="3.5"  y1="1.5"  x2="5.3"  y2="1.5"  strokeWidth="0.67" />
        </g>

        {/* BTC — bottom-left | r=16 (+50%) | icon ×1.5 */}
        <circle cx="44" cy="132" r="16" fill="url(#fs-node)" filter="url(#fs-glow)" />
        <circle cx="44" cy="132" r="16" stroke="rgba(52,211,153,0.7)" strokeWidth="0.9" />
        <g transform="translate(44,132) scale(1.5)" stroke="rgba(167,243,208,0.95)" fill="none" strokeLinecap="round">
          <circle r="4.6" strokeWidth="0.6" />
          <line x1="-1.6" y1="-3.3" x2="-1.6" y2="3.3" strokeWidth="0.87" />
          <path d="M -1.6,-3.3 C 2.6,-3.3 3.2,-2 3.2,-1 C 3.2,0 2.6,0.2 -1.6,0.2" strokeWidth="0.73" />
          <path d="M -1.6,0.2 C 3.0,0.2 3.5,0.9 3.5,1.9 C 3.5,2.9 3.0,3.3 -1.6,3.3" strokeWidth="0.73" />
        </g>

        {/* FX — top-left | r=16 (+50%) | icon ×1.5 */}
        <circle cx="44" cy="68" r="16" fill="url(#fs-node)" filter="url(#fs-glow)" />
        <circle cx="44" cy="68" r="16" stroke="rgba(56,189,248,0.7)" strokeWidth="0.9" />
        <g transform="translate(44,68) scale(1.5)" stroke="rgba(186,230,253,0.95)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="-4.2" y1="-2" x2="2.8"  y2="-2" strokeWidth="0.8" />
          <polyline points="1,-3.8 3.5,-2 1,-0.2" strokeWidth="0.8" />
          <line x1="4.2"  y1="2"  x2="-2.8" y2="2"  strokeWidth="0.8" />
          <polyline points="-1,0.2 -3.5,2 -1,3.8" strokeWidth="0.8" />
        </g>

      </g>{/* end rotating group */}

      {/* Central settlement hub — halo */}
      <circle cx="100" cy="100" r="40" fill="url(#fs-hub)" />
      <circle cx="100" cy="100" r="40" stroke="rgba(56,189,248,0.28)" strokeWidth="0.8" />

      {/* Hub hexagon frame */}
      <polygon
        points="126,100 113,122.5 87,122.5 74,100 87,77.5 113,77.5"
        fill="rgba(3,105,161,0.4)"
        stroke="rgba(103,232,249,0.5)"
        strokeWidth="0.9"
        filter="url(#fs-glow)"
      />
      <circle cx="126" cy="100"   r="2.2" fill="rgba(103,232,249,0.8)" />
      <circle cx="113" cy="122.5" r="2.2" fill="rgba(103,232,249,0.8)" />
      <circle cx="87"  cy="122.5" r="2.2" fill="rgba(103,232,249,0.8)" />
      <circle cx="74"  cy="100"   r="2.2" fill="rgba(103,232,249,0.8)" />
      <circle cx="87"  cy="77.5"  r="2.2" fill="rgba(103,232,249,0.8)" />
      <circle cx="113" cy="77.5"  r="2.2" fill="rgba(103,232,249,0.8)" />

      {/* Central core */}
      <circle cx="100" cy="100" r="19" fill="url(#fs-core)" filter="url(#fs-cglow)" />
      <circle cx="100" cy="100" r="19" stroke="rgba(186,230,253,0.6)" strokeWidth="0.9" />
      <circle cx="100" cy="100" r="10" fill="rgba(255,255,255,0.12)" />
      <circle cx="100" cy="100" r="10" stroke="rgba(224,249,255,0.45)" strokeWidth="0.5" />
      {/* Core icon: concentric rings + centre dot (no text) */}
      <circle cx="100" cy="100" r="5.5" stroke="rgba(224,249,255,0.7)" strokeWidth="0.8" fill="none" />
      <circle cx="100" cy="100" r="2.5" fill="rgba(255,255,255,0.92)" />
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

        {/* Settlement hub — centre static, outer ring rotates inside SVG */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Shield />
        </div>

      </div>
    </div>
  );
}
