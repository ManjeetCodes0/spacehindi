"use client";

import { motion } from "framer-motion";
import type { ShopCategory } from "@/data/shop";

type FilterCategory = "all" | ShopCategory;

interface CategoryTabsProps {
  active: FilterCategory;
  onChange: (cat: FilterCategory) => void;
  lang: "en" | "hi";
}

const tabs: { id: FilterCategory; label: { en: string; hi: string } }[] = [
  { id: "all", label: { en: "All", hi: "सभी" } },
  { id: "Astronaut Statue", label: { en: "Astronaut", hi: "एस्ट्रोनॉट" } },
  { id: "Keychains", label: { en: "Keychain", hi: "कीचेन" } },
  { id: "Books", label: { en: "Book", hi: "पुस्तकें" } },
];

export default function CategoryTabs({ active, onChange, lang }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300"
            style={{
              background: isActive ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.03)",
              border: isActive
                ? "1.5px solid rgba(168,130,255,0.8)"
                : "1px solid rgba(255,255,255,0.08)",
              color: isActive ? "#c4b5fd" : "#a1a1aa",
              boxShadow: isActive
                ? "0 0 18px rgba(139,92,246,0.35), inset 0 0 12px rgba(139,92,246,0.06)"
                : "none",
            }}
          >
            {tab.label[lang]}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  border: "1.5px solid rgba(168,130,255,0.8)",
                  boxShadow: "0 0 18px rgba(139,92,246,0.35)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export type { FilterCategory };
