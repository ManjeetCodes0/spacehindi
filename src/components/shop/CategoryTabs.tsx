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
            className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 ${
              isActive
                ? "bg-neon-violet/12 border border-neon-violet/70 text-neon-violet shadow-[0_0_18px_rgba(139,92,246,0.35)]"
                : "bg-space-elevated/70 border border-space-border text-text-muted hover:text-text-secondary hover:border-neon-violet/30"
            }`}
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
