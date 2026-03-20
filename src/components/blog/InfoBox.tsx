"use client";

type InfoBoxVariant = "blue" | "green" | "violet" | "pink";

interface InfoBoxProps {
  variant?: InfoBoxVariant;
  titleEn: string;
  titleHi: string;
  children: React.ReactNode;
  lang: "en" | "hi";
}

const styles: Record<InfoBoxVariant, { border: string; bg: string; icon: string; title: string }> = {
  blue: {
    border: "border-neon-blue/25",
    bg: "bg-neon-blue/[0.04]",
    icon: "text-neon-blue",
    title: "text-neon-blue",
  },
  green: {
    border: "border-neon-green/25",
    bg: "bg-neon-green/[0.04]",
    icon: "text-neon-green",
    title: "text-neon-green",
  },
  violet: {
    border: "border-neon-violet/25",
    bg: "bg-neon-violet/[0.04]",
    icon: "text-neon-violet",
    title: "text-neon-violet",
  },
  pink: {
    border: "border-neon-pink/25",
    bg: "bg-neon-pink/[0.04]",
    icon: "text-neon-pink",
    title: "text-neon-pink",
  },
};

export default function InfoBox({
  variant = "blue",
  titleEn,
  titleHi,
  children,
  lang,
}: InfoBoxProps) {
  const s = styles[variant];

  return (
    <aside
      className={`
        my-8 p-5 sm:p-6 rounded-xl border-l-4
        ${s.border} ${s.bg}
      `}
    >
      <div className="flex items-start gap-3">
        <svg
          className={`w-5 h-5 mt-0.5 shrink-0 ${s.icon}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${s.title} mb-0.5`}>
            {lang === "en" ? titleEn : titleHi}
          </p>
          <p className="text-xs text-text-muted mb-2">
            {lang === "en" ? titleHi : titleEn}
          </p>
          <div className="text-sm text-text-secondary leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
