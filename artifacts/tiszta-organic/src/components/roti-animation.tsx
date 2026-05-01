import { useEffect, useRef } from "react";

interface SteamParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  wobble: number;
}

export function RotiAnimation({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let t = 0;
    const particles: SteamParticle[] = [];

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      canvas!.width = parent.clientWidth;
      canvas!.height = parent.clientHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    function spawnParticle(cx: number, baseY: number, r: number): SteamParticle {
      return {
        x: cx + (Math.random() - 0.5) * r * 0.7,
        y: baseY - r * 0.1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.7 + 0.35),
        alpha: 0.28 + Math.random() * 0.14,
        size: Math.random() * 3 + 2.5,
        wobble: Math.random() * Math.PI * 2,
      };
    }

    function draw() {
      const W = canvas!.width;
      const H = canvas!.height;
      ctx!.clearRect(0, 0, W, H);

      // Drift slowly from right to left and back (period ≈ 18 s)
      const cx = W * 0.60 + Math.sin(t * 0.085) * W * 0.17;
      const cy = H * 0.52;
      const r = Math.min(W, H) * 0.26; // roti radius

      // ─── puff cycle ───────────────────────────────────────────
      // Slow, organic oscillation: flat → puffed → flat (≈8 s loop)
      const rawPuff = (Math.sin(t * 0.45 - Math.PI / 2) + 1) / 2; // 0–1
      // Ease: hold flat briefly, quick rise, slow deflate
      const puff = rawPuff < 0.3 ? rawPuff * 0.5 : 0.15 + rawPuff * 0.85;
      const domeH = puff * r * 0.55; // max dome visual height

      // ─── TAWA ─────────────────────────────────────────────────
      const tawaRx = r * 1.38;
      const tawaRy = r * 0.38;
      const tawaCY = cy + r * 0.36;

      // Soft heat-glow beneath tawa
      const heatG = ctx!.createRadialGradient(cx, tawaCY + r * 0.25, 0, cx, tawaCY + r * 0.25, tawaRx * 0.85);
      heatG.addColorStop(0, "rgba(255,110,10,0.11)");
      heatG.addColorStop(1, "rgba(255,60,0,0)");
      ctx!.beginPath();
      ctx!.ellipse(cx, tawaCY + r * 0.3, tawaRx * 0.9, tawaRy * 1.8, 0, 0, Math.PI * 2);
      ctx!.fillStyle = heatG;
      ctx!.fill();

      // Tawa body
      ctx!.save();
      ctx!.shadowColor = "rgba(0,0,0,0.18)";
      ctx!.shadowBlur = 22;
      ctx!.shadowOffsetY = 6;
      const tawaG = ctx!.createRadialGradient(cx - r * 0.15, tawaCY - r * 0.05, r * 0.1, cx, tawaCY, tawaRx);
      tawaG.addColorStop(0, "#3e3228");
      tawaG.addColorStop(0.55, "#2c231d");
      tawaG.addColorStop(1, "#1a1410");
      ctx!.beginPath();
      ctx!.ellipse(cx, tawaCY, tawaRx, tawaRy, 0, 0, Math.PI * 2);
      ctx!.fillStyle = tawaG;
      ctx!.fill();
      ctx!.restore();

      // Tawa rim highlight (top arc)
      ctx!.beginPath();
      ctx!.ellipse(cx, tawaCY - tawaRy * 0.05, tawaRx * 0.97, tawaRy * 0.82, 0, Math.PI, 0);
      ctx!.strokeStyle = "rgba(255,255,255,0.09)";
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      // ─── ROTI BASE ────────────────────────────────────────────
      // Base flat roti colour — warm beige/golden
      const rotiG = ctx!.createRadialGradient(cx - r * 0.12, cy - r * 0.15, r * 0.05, cx, cy, r);
      rotiG.addColorStop(0, "#f8e8b8");
      rotiG.addColorStop(0.40, "#e8bf5a");
      rotiG.addColorStop(0.78, "#c8922a");
      rotiG.addColorStop(1, "#9c6812");

      ctx!.save();
      ctx!.shadowColor = "rgba(0,0,0,0.12)";
      ctx!.shadowBlur = 14;
      ctx!.beginPath();
      ctx!.arc(cx, cy, r, 0, Math.PI * 2);
      ctx!.fillStyle = rotiG;
      ctx!.fill();
      ctx!.restore();

      // ─── PUFF DOME ────────────────────────────────────────────
      if (puff > 0.02) {
        // Bright centre highlight — simulates light catching the dome top
        const highlightR = r * 0.62 * puff;
        const domeLight = ctx!.createRadialGradient(
          cx - r * 0.06, cy - domeH * 0.45,
          0,
          cx, cy,
          r * 0.88
        );
        domeLight.addColorStop(0, `rgba(255,250,228,${puff * 0.92})`);
        domeLight.addColorStop(0.28, `rgba(248,233,175,${puff * 0.72})`);
        domeLight.addColorStop(0.6, `rgba(224,186,88,${puff * 0.38})`);
        domeLight.addColorStop(1, "rgba(180,130,20,0)");

        ctx!.beginPath();
        ctx!.arc(cx, cy, r * 0.88, 0, Math.PI * 2);
        ctx!.fillStyle = domeLight;
        ctx!.fill();

        // Underside shadow — makes the edges look like they lift off
        const underShadow = ctx!.createRadialGradient(
          cx, cy + r * 0.22, r * 0.08,
          cx, cy + r * 0.22, r
        );
        underShadow.addColorStop(0, `rgba(110,62,8,${puff * 0.38})`);
        underShadow.addColorStop(0.65, `rgba(110,62,8,${puff * 0.12})`);
        underShadow.addColorStop(1, "rgba(110,62,8,0)");

        ctx!.beginPath();
        ctx!.arc(cx, cy, r, 0, Math.PI * 2);
        ctx!.fillStyle = underShadow;
        ctx!.fill();

        // Specular hot-spot (small oval at dome peak)
        const specR = highlightR * 0.32;
        ctx!.save();
        ctx!.globalAlpha = puff * 0.55;
        ctx!.beginPath();
        ctx!.ellipse(cx - r * 0.04, cy - domeH * 0.55, specR, specR * 0.7, -0.3, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(255,255,240,0.95)";
        ctx!.filter = "blur(6px)";
        ctx!.fill();
        ctx!.restore();
      }

      // ─── CHAR SPOTS ───────────────────────────────────────────
      const spots = [
        { rx: -0.38, ry: 0.28, r: 0.09, a: 0.55 },
        { rx: 0.44, ry: -0.18, r: 0.075, a: 0.52 },
        { rx: 0.12, ry: 0.52, r: 0.095, a: 0.58 },
        { rx: -0.52, ry: -0.28, r: 0.065, a: 0.5 },
        { rx: 0.56, ry: 0.32, r: 0.06, a: 0.48 },
        { rx: -0.18, ry: -0.54, r: 0.085, a: 0.45 },
        { rx: 0.32, ry: -0.52, r: 0.07, a: 0.48 },
        { rx: -0.62, ry: 0.12, r: 0.055, a: 0.42 },
      ];

      spots.forEach(({ rx, ry, r: sr, a }) => {
        const sx = cx + rx * r;
        const sy = cy + ry * r;
        const spr = sr * r;
        const cg = ctx!.createRadialGradient(sx, sy, 0, sx, sy, spr);
        cg.addColorStop(0, `rgba(70,35,5,${a})`);
        cg.addColorStop(1, "rgba(70,35,5,0)");
        ctx!.beginPath();
        ctx!.arc(sx, sy, spr, 0, Math.PI * 2);
        ctx!.fillStyle = cg;
        ctx!.fill();
      });

      // Outer edge darkening
      const edgeG = ctx!.createRadialGradient(cx, cy, r * 0.72, cx, cy, r);
      edgeG.addColorStop(0, "rgba(0,0,0,0)");
      edgeG.addColorStop(1, "rgba(70,38,5,0.32)");
      ctx!.beginPath();
      ctx!.arc(cx, cy, r, 0, Math.PI * 2);
      ctx!.fillStyle = edgeG;
      ctx!.fill();

      // ─── STEAM PARTICLES ──────────────────────────────────────
      // Spawn when puffing
      if (puff > 0.25 && Math.random() < 0.12 && particles.length < 14) {
        particles.push(spawnParticle(cx, cy, r));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.wobble += 0.045;
        p.x += p.vx + Math.sin(p.wobble) * 0.22;
        p.y += p.vy;
        p.alpha -= 0.0045;
        p.size += 0.06;

        if (p.alpha <= 0 || p.y < cy - r * 2.8) {
          particles.splice(i, 1);
          continue;
        }

        ctx!.save();
        ctx!.globalAlpha = p.alpha;
        const sg = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        sg.addColorStop(0, "rgba(255,255,255,0.85)");
        sg.addColorStop(1, "rgba(255,255,255,0)");
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = sg;
        ctx!.fill();
        ctx!.restore();
      }

      t += 0.016;
      animFrame = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
