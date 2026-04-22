import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number; r: number;
  alpha: number; speed: number; phase: number;
}

// Each wave line = sum of 3 sine components → organic swell
interface WaveLine {
  side: 'top' | 'bottom';
  yBase: number;   // fraction of H from edge
  alpha: number; width: number;
  a1: number; f1: number; s1: number; p1: number;
  a2: number; f2: number; s2: number; p2: number;
  a3: number; f3: number; s3: number; p3: number;
}

// White sparkle — like sunlight reflecting off a wave crest
interface Sparkle {
  x: number;         // pixel x (fixed for its lifetime)
  waveIdx: number;   // which wave line to follow for y
  life: number;      // frames elapsed
  maxLife: number;
  size: number;
}

// Compute the y position of a wave line at pixel x and time t
function waveY(
  wl: WaveLine,
  x: number,
  t: number,
  W: number,
  H: number,
  frequencyScale = 1,
  bottomLift = 0
): number {
  const baseY = wl.side === 'top' ? wl.yBase * H : H - wl.yBase * H;
  const dir   = wl.side === 'top' ? 1 : -1;
  const adjustedX = x * frequencyScale;
  const yOffset = wl.side === 'bottom' ? -bottomLift : 0;
  // Horizontal envelope: 1 + sin(x/W·π) → 1 at edges, 2 at centre
  const env   = 1 + Math.sin((x / W) * Math.PI);
  return baseY + yOffset + dir * env * (
    wl.a1 * Math.sin(adjustedX * wl.f1 + t * wl.s1 + wl.p1) +
    wl.a2 * Math.sin(adjustedX * wl.f2 + t * wl.s2 + wl.p2) +
    wl.a3 * Math.sin(adjustedX * wl.f3 + t * wl.s3 + wl.p3)
  );
}

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let waveFrequencyScale = 1;
    let mobileBottomLift = 0;

    // ── Resize ────────────────────────────────────────────
    const resize = () => {
      const parent = canvas.parentElement!;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const isMobile = window.innerWidth < 1024;
      // Mobile requirement: make waves look twice as wide.
      waveFrequencyScale = isMobile ? 0.5 : 1;
      // Keep bottom waves visible on first screen without scrolling.
      mobileBottomLift = isMobile ? 44 : 0;
      canvas.width  = parent.offsetWidth  * dpr;
      canvas.height = parent.offsetHeight * dpr;
      canvas.style.width  = `${parent.offsetWidth}px`;
      canvas.style.height = `${parent.offsetHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    // ── Wave lines  (speeds ×0.7 vs previous iteration) ──
    const K = 0.012;
    const waveLines: WaveLine[] = [
      // Top edge
      { side:'top', yBase:0.00, alpha:0.55, width:1.0,
        a1:22, f1:0.80*K, s1:0.0049, p1:0.0,
        a2: 9, f2:1.38*K, s2:0.0038, p2:1.7,
        a3: 5, f3:2.24*K, s3:0.0029, p3:3.9 },
      { side:'top', yBase:0.02, alpha:0.40, width:0.8,
        a1:17, f1:0.90*K, s1:0.0039, p1:1.2,
        a2: 7, f2:1.55*K, s2:0.0055, p2:0.4,
        a3: 4, f3:2.60*K, s3:0.0025, p3:2.8 },
      { side:'top', yBase:0.04, alpha:0.28, width:0.7,
        a1:14, f1:1.05*K, s1:0.0059, p1:2.5,
        a2: 6, f2:1.82*K, s2:0.0034, p2:4.1,
        a3: 3, f3:2.97*K, s3:0.0044, p3:0.9 },
      { side:'top', yBase:0.06, alpha:0.20, width:0.6,
        a1:10, f1:1.20*K, s1:0.0044, p1:0.8,
        a2: 4, f2:2.08*K, s2:0.0059, p2:3.3,
        a3: 2, f3:3.31*K, s3:0.0029, p3:1.5 },
      { side:'top', yBase:0.08, alpha:0.13, width:0.5,
        a1: 8, f1:1.40*K, s1:0.0054, p1:3.1,
        a2: 3, f2:2.43*K, s2:0.0039, p2:0.6,
        a3: 2, f3:3.86*K, s3:0.0025, p3:4.4 },
      { side:'top', yBase:0.10, alpha:0.08, width:0.5,
        a1: 5, f1:1.60*K, s1:0.0034, p1:1.6,
        a2: 2, f2:2.77*K, s2:0.0049, p2:2.9,
        a3: 1, f3:4.40*K, s3:0.0029, p3:0.3 },
      // Bottom edge
      { side:'bottom', yBase:0.01, alpha:0.50, width:1.0,
        a1:24, f1:0.72*K, s1:0.0044, p1:0.5,
        a2:10, f2:1.25*K, s2:0.0034, p2:2.2,
        a3: 5, f3:2.04*K, s3:0.0054, p3:4.8 },
      { side:'bottom', yBase:0.02, alpha:0.37, width:0.8,
        a1:19, f1:0.85*K, s1:0.0054, p1:1.8,
        a2: 8, f2:1.47*K, s2:0.0039, p2:0.1,
        a3: 4, f3:2.40*K, s3:0.0029, p3:3.5 },
      { side:'bottom', yBase:0.04, alpha:0.26, width:0.7,
        a1:15, f1:1.00*K, s1:0.0039, p1:3.0,
        a2: 6, f2:1.73*K, s2:0.0059, p2:1.4,
        a3: 3, f3:2.83*K, s3:0.0025, p3:0.7 },
      { side:'bottom', yBase:0.06, alpha:0.18, width:0.6,
        a1:11, f1:1.15*K, s1:0.0049, p1:0.3,
        a2: 5, f2:1.99*K, s2:0.0029, p2:2.6,
        a3: 2, f3:3.25*K, s3:0.0039, p3:4.0 },
      { side:'bottom', yBase:0.08, alpha:0.12, width:0.5,
        a1: 8, f1:1.35*K, s1:0.0059, p1:2.1,
        a2: 3, f2:2.34*K, s2:0.0044, p2:4.7,
        a3: 2, f3:3.82*K, s3:0.0029, p3:1.2 },
      { side:'bottom', yBase:0.10, alpha:0.07, width:0.4,
        a1: 5, f1:1.55*K, s1:0.0034, p1:1.0,
        a2: 2, f2:2.69*K, s2:0.0049, p2:3.4,
        a3: 1, f3:4.39*K, s3:0.0025, p3:0.5 },
    ];

    // Sparkle wave pool — bottom heavily weighted (4:1) vs top
    const sparkleWaveIdxs = [0, 6, 6, 6, 7, 6, 7, 7];

    // ── Bokeh particles ───────────────────────────────────
    const rand = (a: number, b: number) => Math.random() * (b - a) + a;
    const particles: Particle[] = Array.from({ length: 28 }, () => ({
      x: rand(0,1), y: rand(0,1), r: rand(4,20),
      alpha: rand(0.12,0.45), speed: rand(0.0003,0.0009), phase: rand(0, Math.PI*2),
    }));

    // ── Sparkles ──────────────────────────────────────────
    const sparkles: Sparkle[] = [];

    const spawnSparkle = (W: number) => {
      const waveIdx = sparkleWaveIdxs[Math.floor(Math.random() * sparkleWaveIdxs.length)];
      sparkles.push({
        x:        rand(W * 0.05, W * 0.95),
        waveIdx,
        life:     0,
        maxLife:  rand(35, 80),
        size:     rand(1.5, 4.5),
      });
    };

    // ── Draw loop ─────────────────────────────────────────
    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      ctx.clearRect(0, 0, W, H);

      // Center-to-edge white glow
      const rg = ctx.createRadialGradient(W*.5, H*.5, 0, W*.5, H*.5, Math.max(W,H)*0.65);
      rg.addColorStop(0,    'rgba(255,255,255,0.32)');
      rg.addColorStop(0.55, 'rgba(255,255,255,0.10)');
      rg.addColorStop(1,    'rgba(255,255,255,0)');
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, W, H);

      // Wave lines — with horizontal envelope (centre larger, edges smaller)
      for (const wl of waveLines) {
        ctx.beginPath();
        ctx.lineWidth   = wl.width;
        ctx.strokeStyle = `rgba(120,185,230,${wl.alpha})`;
        for (let x = 0; x <= W + 1; x++) {
          const y = waveY(wl, x, t, W, H, waveFrequencyScale, mobileBottomLift);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Bokeh
      for (const p of particles) {
        const a  = p.alpha * (0.55 + 0.45 * Math.sin(t * p.speed * 60 + p.phase));
        const px = p.x * W, py = p.y * H;
        const g  = ctx.createRadialGradient(px, py, 0, px, py, p.r);
        g.addColorStop(0, `rgba(170,215,240,${a})`);
        g.addColorStop(1, 'rgba(170,215,240,0)');
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI*2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // Sparkles — spawn ~4 per second at 60fps
      if (Math.random() < 0.07) spawnSparkle(W);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i];
        sp.life += 1;
        if (sp.life >= sp.maxLife) { sparkles.splice(i, 1); continue; }

        const progress = sp.life / sp.maxLife;
        // Quick fade-in (first 20%), sustained, then fade-out
        const a = progress < 0.2
          ? progress / 0.2
          : 1 - (progress - 0.2) / 0.8;

        const wl = waveLines[sp.waveIdx];
        const sy = waveY(wl, sp.x, t, W, H, waveFrequencyScale, mobileBottomLift);

        const g = ctx.createRadialGradient(sp.x, sy, 0, sp.x, sy, sp.size * 3);
        g.addColorStop(0,   `rgba(255,255,255,${(a * 0.95).toFixed(3)})`);
        g.addColorStop(0.3, `rgba(220,240,255,${(a * 0.6).toFixed(3)})`);
        g.addColorStop(1,   'rgba(200,230,255,0)');
        ctx.beginPath();
        ctx.arc(sp.x, sy, sp.size * 3, 0, Math.PI*2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      t += 1;
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:1 }}
    />
  );
}
