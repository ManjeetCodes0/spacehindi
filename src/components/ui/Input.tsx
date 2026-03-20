"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-2.5 rounded-xl text-sm
            bg-space-elevated border border-space-border
            text-text-primary placeholder:text-text-muted
            outline-none
            transition-all duration-250 ease-out
            focus:border-neon-violet/50 focus:shadow-[0_0_15px_rgba(139,92,246,0.15)]
            hover:border-space-border/80
            disabled:opacity-40 disabled:cursor-not-allowed
            ${error ? "border-red-500/50 focus:border-red-500/70 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]" : ""}
            ${className}
          `}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs text-text-muted">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
