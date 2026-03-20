"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Animates a number from its previous value to the target value.
 * Returns the current animated display value.
 */
export function useAnimatedNumber(
  target: number,
  duration: number = 400,
  decimals: number = 1
): string {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const from = prevRef.current;
    const to = target;
    prevRef.current = to;

    if (from === to) return;

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      setDisplay(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  if (display === 0 && target === 0) return "0";
  return display.toFixed(decimals);
}
