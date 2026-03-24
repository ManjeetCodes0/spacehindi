"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * Canvas-based animated star field with twinkling + subtle drift.
 * Renders inside whatever container it's placed in (absolute inset-0).
 */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return () => {};
    const ctx = canvas.getContext("2d");
    if (!ctx) return () => {};

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement?.getBoundingClientRect();
    const w = rect?.width ?? window.innerWidth;
    const h = rect?.height ?? window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    interface Star {
      x: number;
      y: number;
      r: number;
      base: number; // base brightness
      speed: number; // twinkle speed
      offset: number;
      vx: number;
      vy: number;
    }

    const stars: Star[] = [];
    const COUNT = Math.min(Math.floor((w * h) / 2500), 350);

    for (let i = 0; i < COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        base: Math.random() * 0.5 + 0.35,
        speed: Math.random() * 1.8 + 0.6,
        offset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.04,
      });
    }

    const draw = (t: number) => {
      const sec = t / 1000;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -2) s.x = w + 2;
        if (s.x > w + 2) s.x = -2;
        if (s.y < -2) s.y = h + 2;
        if (s.y > h + 2) s.y = -2;

        const alpha =
          s.base + (1 - s.base) * 0.5 * (1 + Math.sin(sec * s.speed + s.offset));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,215,255,${alpha})`;
        ctx.fill();

        // subtle glow on bigger stars
        if (s.r > 1) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,200,255,${alpha * 0.12})`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    const cleanup = init();
    const onResize = () => {
      cancelAnimationFrame(animRef.current);
      init();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cleanup();
      window.removeEventListener("resize", onResize);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden
    />
  );
}
