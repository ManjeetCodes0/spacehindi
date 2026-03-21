"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useImageSequence } from "@/hooks/useImageSequence";
import type { CelestialBody } from "@/data/universe/planets";

interface CelestialCanvasProps {
  body: CelestialBody;
  size?: number;
  autoRotate?: boolean;
}

// CSS sphere fallback when no image sequence is available
function CSSSphere({
  body,
  size = 300,
}: {
  body: CelestialBody;
  size: number;
}) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Ring behind (for Saturn/Uranus) */}
      {body.ring && (
        <div
          className="absolute rounded-[50%] border-2 opacity-40 animate-pulse"
          style={{
            width: size * 1.6,
            height: size * 0.35,
            borderColor: body.color,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotateX(75deg)",
          }}
        />
      )}

      {/* Planet sphere */}
      <div
        className="rounded-full animate-[spin_20s_linear_infinite]"
        style={{
          width: size,
          height: size,
          background: body.gradient,
          boxShadow: `
            inset -${size * 0.15}px -${size * 0.05}px ${size * 0.25}px rgba(0,0,0,0.6),
            0 0 ${size * 0.3}px ${body.color}30,
            0 0 ${size * 0.6}px ${body.color}15
          `,
        }}
      />

      {/* Ring front (overlay) */}
      {body.ring && (
        <div
          className="absolute rounded-[50%] border border-white/10"
          style={{
            width: size * 1.6,
            height: size * 0.35,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotateX(75deg)",
            clipPath: "inset(50% 0 0 0)",
          }}
        />
      )}
    </div>
  );
}

// Canvas-based image sequence renderer
function ImageSequenceCanvas({
  body,
  size = 400,
}: {
  body: CelestialBody;
  size: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const animRef = useRef<number>(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  const { images, ready, progress } = useImageSequence({
    folder: body.frames!.folder,
    prefix: body.frames!.prefix,
    totalFrames: body.frames!.total,
    extension: body.frames!.extension,
    padLength: body.frames!.padLength,
  });

  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !images[frameIndex]) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      const img = images[frameIndex];

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cover fit
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;

      ctx.save();
      // Circular clip
      ctx.beginPath();
      ctx.arc(cw / 2, ch / 2, cw / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, sx, sy, sw, sh);
      ctx.restore();
    },
    [images]
  );

  // Auto-rotate animation
  useEffect(() => {
    if (!ready) return;

    let lastTime = 0;
    const FPS = 24;
    const interval = 1000 / FPS;

    const animate = (time: number) => {
      if (!isDragging.current) {
        if (time - lastTime >= interval) {
          frameRef.current = (frameRef.current + 1) % body.frames!.total;
          drawFrame(frameRef.current);
          lastTime = time;
        }
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [ready, drawFrame, body.frames]);

  // Setup canvas DPR
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, [size]);

  // Drag to scrub
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ready) return;

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastX.current = e.clientX;
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastX.current;
      if (Math.abs(dx) > 3) {
        const dir = dx > 0 ? 1 : -1;
        frameRef.current =
          (frameRef.current + dir + body.frames!.total) % body.frames!.total;
        drawFrame(frameRef.current);
        lastX.current = e.clientX;
      }
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
    };
  }, [ready, drawFrame, body.frames]);

  if (!ready) {
    return (
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <CSSSphere body={body} size={size * 0.8} />
        {/* Loading ring */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin"
          style={{ animationDuration: "3s" }}
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke={body.color}
            strokeWidth="1"
            strokeDasharray={`${progress * 301.6} 301.6`}
            strokeLinecap="round"
            opacity="0.6"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <span className="absolute bottom-2 text-xs text-text-muted">
          {Math.round(progress * 100)}%
        </span>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="cursor-grab active:cursor-grabbing rounded-full"
      style={{ width: size, height: size }}
    />
  );
}

export default function CelestialCanvas({
  body,
  size = 300,
  autoRotate = true,
}: CelestialCanvasProps) {
  const [canvasSize, setCanvasSize] = useState(size);

  // Responsive size
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCanvasSize(Math.min(size, 240));
      else if (w < 1024) setCanvasSize(Math.min(size, 320));
      else setCanvasSize(size);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [size]);

  if (body.frames) {
    return <ImageSequenceCanvas body={body} size={canvasSize} />;
  }

  return <CSSSphere body={body} size={canvasSize} />;
}
