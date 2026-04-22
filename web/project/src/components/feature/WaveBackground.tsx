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
  speed: number;
  phase: number;
  yBase: number; // 0..1 (top edge vs bottom edge)
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
      const { offsetWidth, offsetHeight } = canvas.parentElement!;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = offsetWidth * dpr;
      canvas.height = offsetHeight * dpr;
      canvas.style.width = `${offsetWidth}px`;
      canvas.style.height = `${offsetHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    // ── Wave lines config ─────────────────────────────────
    // Multiple thin lines at top and bottom, slightly offset from each other
    const waveLines: WaveLine[] = [
      // Top edge waves
      { side: 'top', yBase: 0.0,  amplitude: 28, frequency: 0.8,  speed: 0.28, phase: 0,    alpha: 0.55, width: 1.0 },
      { side: 'top', yBase: 0.02, amplitude: 22, frequency: 0.9,  speed: 0.20, phase: 1.2,  alpha: 0.40, width: 0.8 },
      { side: 'top', yBase: 0.04, amplitude: 18, frequency: 1.1,  speed: 0.35, phase: 2.5,  alpha: 0.30, width: 0.7 },
      { side: 'top', yBase: 0.06, amplitude: 14, frequency: 1.3,  speed: 0.22, phase: 0.8,  alpha: 0.22, width: 0.6 },
      { side: 'top', yBase: 0.08, amplitude: 10, frequency: 1.5,  speed: 0.18, phase: 3.1,  alpha: 0.15, width: 0.5 },
      { side: 'top', yBase: 0.10, amplitude: 8,  frequency: 1.7,  speed: 0.25, phase: 1.6,  alpha: 0.10, width: 0.5 },
      // Bottom edge waves
      { side: 'bottom', yBase: 0.0,  amplitude: 30, frequency: 0.7,  speed: 0.22, phase: 0.5,  alpha: 0.50, width: 1.0 },
      { side: 'bottom', yBase: 0.02, amplitude: 24, frequency: 0.85, speed: 0.30, phase: 1.8,  alpha: 0.38, width: 0.8 },
      { side: 'bottom', yBase: 0.04, amplitude: 20, frequency: 1.0,  speed: 0.18, phase: 3.0,  alpha: 0.28, width: 0.7 },
      { side: 'bottom', yBase: 0.06, amplitude: 15, frequency: 1.2,  speed: 0.26, phase: 0.3,  alpha: 0.20, width: 0.6 },
      { side: 'bottom', yBase: 0.08, amplitude: 11, frequency: 1.4,  speed: 0.20, phase: 2.1,  alpha: 0.13, width: 0.5 },
      { side: 'bottom', yBase: 0.10, amplitude: 7,  frequency: 1.6,  speed: 0.16, phase: 1.0,  alpha: 0.09, width: 0.4 },
    ];

    // ── Particles config ──────────────────────────────────
    const PARTICLE_COUNT = 32;
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: rand(0, 1),
      y: rand(0, 1),
      r: rand(3, 18),
      alpha: rand(0.1, 0.5),
      speed: rand(0.0003, 0.001),
      phase: rand(0, Math.PI * 2),
    }));

    // ── Draw ──────────────────────────────────────────────
    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      ctx.clearRect(0, 0, W, H);

      // Wave lines
      for (const wl of waveLines) {
        const baseY = wl.side === 'top'
          ? wl.yBase * H
          : H - wl.yBase * H;

        ctx.beginPath();
        ctx.lineWidth = wl.width;
        ctx.strokeStyle = `rgba(120,185,230,${wl.alpha})`;

        const steps = Math.ceil(W) + 1;
        for (let i = 0; i <= steps; i++) {
          const x = i;
          const waveY = Math.sin(x * wl.frequency * 0.012 + t * wl.speed + wl.phase) * wl.amplitude;
          const y = baseY + (wl.side === 'top' ? waveY : -waveY);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Bokeh particles
      for (const p of particles) {
        const alpha = p.alpha * (0.6 + 0.4 * Math.sin(t * p.speed * 60 + p.phase));
        const px = p.x * W;
        const py = p.y * H;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, p.r);
        grad.addColorStop(0, `rgba(170,215,240,${alpha})`);
        grad.addColorStop(1, `rgba(170,215,240,0)`);
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
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
