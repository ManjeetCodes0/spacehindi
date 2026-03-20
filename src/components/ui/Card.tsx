"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type CardVariant = "glass" | "solid" | "bordered" | "neon";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: CardVariant;
  hoverable?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  glass:
    "bg-[rgba(17,17,40,0.6)] backdrop-blur-xl border border-[rgba(139,92,246,0.15)]",
  solid:
    "bg-space-surface border border-space-border",
  bordered:
    "bg-transparent border border-space-border",
  neon:
    "bg-space-surface border border-neon-violet/30 shadow-[0_0_20px_rgba(139,92,246,0.15)]",
};

const hoverStyles: Record<CardVariant, string> = {
  glass:
    "hover:border-[rgba(139,92,246,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]",
  solid:
    "hover:border-neon-violet/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.5)]",
  bordered:
    "hover:border-neon-violet/40 hover:bg-space-surface/30",
  neon:
    "hover:border-neon-violet/60 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]",
};

export default function Card({
  variant = "glass",
  hoverable = true,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`
        rounded-xl p-6
        transition-all duration-250 ease-out
        ${variantStyles[variant]}
        ${hoverable ? hoverStyles[variant] : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
