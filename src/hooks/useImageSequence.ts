"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseImageSequenceOptions {
  folder: string;
  prefix: string;
  totalFrames: number;
  extension?: string;
  padLength?: number;
}

interface UseImageSequenceReturn {
  images: HTMLImageElement[];
  loaded: number;
  total: number;
  progress: number; // 0 to 1
  ready: boolean;
}

export function useImageSequence({
  folder,
  prefix,
  totalFrames,
  extension = "jpg",
  padLength = 3,
}: UseImageSequenceOptions): UseImageSequenceReturn {
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const imgs: HTMLImageElement[] = new Array(totalFrames);
    let loadedCount = 0;

    const onLoad = () => {
      loadedCount++;
      setLoaded(loadedCount);
      if (loadedCount === totalFrames) {
        setReady(true);
      }
    };

    // Load in batches to avoid overwhelming the browser
    const BATCH_SIZE = 20;
    let batchIndex = 0;

    const loadBatch = () => {
      const start = batchIndex * BATCH_SIZE;
      const end = Math.min(start + BATCH_SIZE, totalFrames);

      for (let i = start; i < end; i++) {
        const img = new Image();
        const frameNum = String(i + 1).padStart(padLength, "0");
        img.src = `${folder}/${prefix}${frameNum}.${extension}`;
        img.onload = onLoad;
        img.onerror = onLoad; // count errors too to not stall progress
        imgs[i] = img;
      }

      batchIndex++;
      if (end < totalFrames) {
        // Small delay between batches to keep UI responsive
        setTimeout(loadBatch, 50);
      }
    };

    loadBatch();
    imagesRef.current = imgs;

    return () => {
      // Cleanup: nullify sources to cancel pending loads
      for (const img of imgs) {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      }
    };
  }, [folder, prefix, totalFrames, extension, padLength]);

  return {
    images: imagesRef.current,
    loaded,
    total: totalFrames,
    progress: totalFrames > 0 ? loaded / totalFrames : 0,
    ready,
  };
}
