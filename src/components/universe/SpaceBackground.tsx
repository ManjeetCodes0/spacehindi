"use client";

import { useRef, useEffect, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  3-Layer Deep Space Parallax Background (pure Canvas)               */
/*  Layer 1: Sharp distant stars (static)                              */
/*  Layer 2: Larger twinkling stars (slow movement)                    */
/*  Layer 3: Faint violet/blue nebula wash                             */
/* ------------------------------------------------------------------ */

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  vx: number;
  vy: number;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const drawBackground = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    // Generate stars on resize
    const layer1: Star[] = []; // distant, static, sharp
    const layer2: Star[] = []; // closer, twinkling, moving

    for (let i = 0; i < 400; i++) {
      layer1.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.2 + 0.3,
        brightness: Math.random() * 0.5 + 0.3,
        twinkleSpeed: 0,
        twinkleOffset: 0,
        vx: 0,
        vy: 0,
      });
    }

    for (let i = 0; i < 150; i++) {
      layer2.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2 + 1,
        brightness: Math.random() * 0.6 + 0.4,
        twinkleSpeed: Math.random() * 2 + 1,
        twinkleOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.05,
      });
    }

    // Nebula blobs
    const nebulae = [
      { x: w * 0.2, y: h * 0.3, r: 300, color: "rgba(60, 20, 120," },
      { x: w * 0.75, y: h * 0.7, r: 250, color: "rgba(20, 40, 100," },
      { x: w * 0.5, y: h * 0.15, r: 200, color: "rgba(80, 10, 80," },
    ];

    let startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      ctx.clearRect(0, 0, w, h);

      // Layer 3: Nebula
      nebulae.forEach((neb) => {
        const offsetX = Math.sin(elapsed * 0.02 + neb.x) * 15;
        const offsetY = Math.cos(elapsed * 0.015 + neb.y) * 10;
        const grad = ctx.createRadialGradient(
          neb.x + offsetX,
          neb.y + offsetY,
          0,
          neb.x + offsetX,
          neb.y + offsetY,
          neb.r
        );
        grad.addColorStop(0, neb.color + "0.06)");
        grad.addColorStop(0.5, neb.color + "0.03)");
        grad.addColorStop(1, neb.color + "0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      // Layer 1: Static distant stars
      layer1.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 210, 240, ${star.brightness})`;
        ctx.fill();
      });

      // Layer 2: Twinkling, moving stars
      layer2.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around
        if (star.x < -5) star.x = w + 5;
        if (star.x > w + 5) star.x = -5;
        if (star.y < -5) star.y = h + 5;
        if (star.y > h + 5) star.y = -5;

        const twinkle =
          star.brightness *
          (0.6 + 0.4 * Math.sin(elapsed * star.twinkleSpeed + star.twinkleOffset));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${twinkle})`;
        ctx.fill();

        // Glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150, 180, 255, ${twinkle * 0.1})`;
          ctx.fill();
        }
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    const cleanup = drawBackground();
    const handleResize = () => {
      cancelAnimationFrame(animRef.current);
      drawBackground();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cleanup?.();
      window.removeEventListener("resize", handleResize);
    };
  }, [drawBackground]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
