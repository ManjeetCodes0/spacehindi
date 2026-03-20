"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  intensity?: "light" | "medium" | "heavy";
  children: React.ReactNode;
}

const blurMap = {
  light: "backdrop-blur-sm",
  medium: "backdrop-blur-xl",
  heavy: "backdrop-blur-2xl",
};

const bgMap = {
  light: "bg-white/[0.03]",
  medium: "bg-white/[0.06]",
  heavy: "bg-white/[0.1]",
};

export default function GlassPanel({
  intensity = "medium",
  className = "",
  children,
  ...props
}: GlassPanelProps) {
  return (
    <motion.div
      className={`
        ${bgMap[intensity]} ${blurMap[intensity]}
        border border-white/[0.08] rounded-2xl
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
