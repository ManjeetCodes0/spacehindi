type BadgeVariant = "violet" | "blue" | "pink" | "cyan" | "green" | "muted";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  violet: "bg-neon-violet/15 text-neon-violet border-neon-violet/25",
  blue: "bg-neon-blue/15 text-neon-blue border-neon-blue/25",
  pink: "bg-neon-pink/15 text-neon-pink border-neon-pink/25",
  cyan: "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/25",
  green: "bg-neon-green/15 text-neon-green border-neon-green/25",
  muted: "bg-space-elevated text-text-secondary border-space-border",
};

export default function Badge({
  variant = "violet",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full
        text-xs font-medium border
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
