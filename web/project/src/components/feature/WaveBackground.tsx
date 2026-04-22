import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  phase: number;
}

interface WaveLine {
  amplitude: number;
  frequency: number;
  speed: number;   // radians per frame — kept very small for slow drift
  phase: number;
  yBase: number;   // fraction of H from the edge
  side: 'top' | 'bottom';
  alpha: number;
  width: number;
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

    // ── Resize ────────────────────────────────────────────
    const resize = () => {
      const parent = canvas.parentElement!;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = parent.offsetWidth  * dpr;
      canvas.height = parent.offsetHeight * dpr;
      canvas.style.width  = `${parent.offsetWidth}px`;
      canvas.style.height = `${parent.offsetHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    // ── Wave lines ────────────────────────────────────────
    // speed: ~0.008–0.015 gives one full cycle every 400–800 frames (~7–13 s at 60fps)
    const waveLines: WaveLine[] = [
      // Top edge — 6 lines, each slightly offset from edge
      { side: 'top', yBase: 0.00, amplitude: 26, frequency: 0.80, speed: 0.010, phase: 0.0,  alpha: 0.55, width: 1.0 },
      { side: 'top', yBase: 0.02, amplitude: 20, frequency: 0.90, speed: 0.008, phase: 1.2,  alpha: 0.40, width: 0.8 },
      { side: 'top', yBase: 0.04, amplitude: 16, frequency: 1.05, speed: 0.012, phase: 2.5,  alpha: 0.28, width: 0.7 },
      { side: 'top', yBase: 0.06, amplitude: 12, frequency: 1.20, speed: 0.009, phase: 0.8,  alpha: 0.20, width: 0.6 },
      { side: 'top', yBase: 0.08, amplitude:  9, frequency: 1.40, speed: 0.011, phase: 3.1,  alpha: 0.13, width: 0.5 },
      { side: 'top', yBase: 0.10, amplitude:  6, frequency: 1.60, speed: 0.007, phase: 1.6,  alpha: 0.08, width: 0.5 },
      // Bottom edge — 6 lines
      { side: 'bottom', yBase: 0.00, amplitude: 28, frequency: 0.72, speed: 0.009, phase: 0.5,  alpha: 0.50, width: 1.0 },
      { side: 'bottom', yBase: 0.02, amplitude: 22, frequency: 0.85, speed: 0.011, phase: 1.8,  alpha: 0.37, width: 0.8 },
      { side: 'bottom', yBase: 0.04, amplitude: 18, frequency: 1.00, speed: 0.008, phase: 3.0,  alpha: 0.26, width: 0.7 },
      { side: 'bottom', yBase: 0.06, amplitude: 13, frequency: 1.15, speed: 0.010, phase: 0.3,  alpha: 0.18, width: 0.6 },
      { side: 'bottom', yBase: 0.08, amplitude:  9, frequency: 1.35, speed: 0.012, phase: 2.1,  alpha: 0.12, width: 0.5 },
      { side: 'bottom', yBase: 0.10, amplitude:  6, frequency: 1.55, speed: 0.007, phase: 1.0,  alpha: 0.07, width: 0.4 },
    ];

    // ── Bokeh particles ───────────────────────────────────
    const rand = (a: number, b: number) => Math.random() * (b - a) + a;
    const particles: Particle[] = Array.from({ length: 28 }, () => ({
      x: rand(0, 1),
      y: rand(0, 1),
      r: rand(4, 20),
      alpha: rand(0.12, 0.45),
      speed: rand(0.0003, 0.0009),
      phase: rand(0, Math.PI * 2),
    }));

    // ── Draw loop ─────────────────────────────────────────
    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      ctx.clearRect(0, 0, W, H);

      // — Center-to-edge radial gradient (white glow in the middle)
      const cx = W * 0.5;
      const cy = H * 0.5;
      const r  = Math.max(W, H) * 0.65;
      const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      radGrad.addColorStop(0,   'rgba(255,255,255,0.55)');
      radGrad.addColorStop(0.45,'rgba(255,255,255,0.20)');
      radGrad.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, W, H);

      // — Wave lines
      for (const wl of waveLines) {
        const baseY = wl.side === 'top' ? wl.yBase * H : H - wl.yBase * H;

        ctx.beginPath();
        ctx.lineWidth   = wl.width;
        ctx.strokeStyle = `rgba(120,185,230,${wl.alpha})`;

        for (let x = 0; x <= W + 1; x++) {
          const waveY = Math.sin(x * wl.frequency * 0.012 + t * wl.speed + wl.phase) * wl.amplitude;
          const y     = baseY + (wl.side === 'top' ? waveY : -waveY);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // — Bokeh
      for (const p of particles) {
        const alpha = p.alpha * (0.55 + 0.45 * Math.sin(t * p.speed * 60 + p.phase));
        const px = p.x * W;
        const py = p.y * H;
        const g  = ctx.createRadialGradient(px, py, 0, px, py, p.r);
        g.addColorStop(0, `rgba(170,215,240,${alpha})`);
        g.addColorStop(1, 'rgba(170,215,240,0)');
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      t += 1;
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
