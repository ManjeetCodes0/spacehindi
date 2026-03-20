"use client";

import { useCountdown } from "@/hooks/useCountdown";

interface CountdownUnitProps {
  targetDate: string;
  lang: "en" | "hi";
}

const labels = {
  en: { d: "Days", h: "Hrs", m: "Min", s: "Sec", launched: "Launched" },
  hi: { d: "दिन", h: "घंटे", m: "मिनट", s: "सेकंड", launched: "लॉन्च हो चुका" },
};

export default function CountdownUnit({ targetDate, lang }: CountdownUnitProps) {
  const { days, hours, minutes, seconds, expired } = useCountdown(targetDate);
  const t = labels[lang];

  if (expired) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neon-green">
        <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
        {t.launched}
      </span>
    );
  }

  const units = [
    { value: days, label: t.d },
    { value: hours, label: t.h },
    { value: minutes, label: t.m },
    { value: seconds, label: t.s },
  ];

  return (
    <div className="flex items-center gap-1.5">
      {units.map((unit, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="flex flex-col items-center min-w-[40px] px-2 py-1.5 rounded-lg bg-space-elevated/80 border border-white/[0.04]">
            <span className="text-sm font-bold tabular-nums text-text-primary leading-none">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] text-text-muted mt-0.5">{unit.label}</span>
          </div>
          {i < units.length - 1 && (
            <span className="text-text-muted text-xs font-bold">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
