"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { celestialBodies } from "@/data/universe/planets";

interface CelestialSelectorProps {
  lang: "en" | "hi";
  activeId?: string;
}

export default function CelestialSelector({
  lang,
  activeId,
}: CelestialSelectorProps) {
  const sorted = [...celestialBodies].sort((a, b) => a.order - b.order);

  return (
    <nav className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
      {sorted.map((body) => {
        const isActive = body.id === activeId;
        return (
          <Link key={body.id} href={`/universe/${body.id}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative flex items-center gap-2 px-3 py-2 rounded-xl
                border transition-all duration-200 whitespace-nowrap cursor-pointer
                ${
                  isActive
                    ? "bg-white/[0.08] border-white/[0.15]"
                    : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1]"
                }
              `}
            >
              {/* Tiny planet dot */}
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  background: body.gradient,
                  boxShadow: isActive
                    ? `0 0 8px ${body.color}60`
                    : "none",
                }}
              />
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-text-primary" : "text-text-muted"
                }`}
              >
                {body.name[lang]}
              </span>
              {isActive && (
                <motion.div
                  layoutId="planet-indicator"
                  className="absolute inset-0 rounded-xl border-2"
                  style={{ borderColor: `${body.color}50` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}
