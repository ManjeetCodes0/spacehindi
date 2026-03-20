"use client";

import { motion } from "framer-motion";

export default function FloatingPlanet() {
  return (
    <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px]">
      {/* Outer nebula glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Planet body */}
      <motion.div
        className="absolute inset-[15%] rounded-full overflow-hidden"
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Planet sphere */}
        <div
          className="w-full h-full rounded-full relative"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #3b2d7a 0%, #1a1040 40%, #0a0618 80%)",
            boxShadow:
              "inset -20px -10px 40px rgba(0,0,0,0.6), inset 8px 8px 30px rgba(139,92,246,0.2), 0 0 60px rgba(139,92,246,0.2), 0 0 120px rgba(59,130,246,0.1)",
          }}
        >
          {/* Atmospheric ring highlight */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, transparent 40%, transparent 60%, rgba(59,130,246,0.15) 100%)",
            }}
          />

          {/* Surface bands */}
          <div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 18%, rgba(139,92,246,0.08) 19%, transparent 20%)",
            }}
          />

          {/* Light reflection */}
          <div
            className="absolute top-[12%] left-[18%] w-[25%] h-[20%] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(255,255,255,0.12) 0%, transparent 70%)",
              filter: "blur(6px)",
            }}
          />
        </div>
      </motion.div>

      {/* Orbital ring */}
      <motion.div
        className="absolute inset-[5%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-full h-full rounded-full border border-neon-violet/10"
          style={{
            transform: "rotateX(75deg)",
          }}
        />
      </motion.div>

      {/* Small orbiting moon */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #a78bfa, #4c1d95)",
            boxShadow: "0 0 12px rgba(139,92,246,0.5)",
          }}
        />
      </motion.div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-neon-violet/40"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 18}%`,
          }}
          animate={{
            y: [0, -20 - i * 5, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
