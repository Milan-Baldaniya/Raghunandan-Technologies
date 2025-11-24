import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
  className?: string;
}

export const ModernButton = React.forwardRef<HTMLButtonElement, ModernButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    if (variant === "primary") {
      return (
        <button
          ref={ref}
          className={cn(
            "relative group px-8 py-4 bg-transparent overflow-hidden rounded-none border border-white/20 transition-all duration-300 hover:border-white/50",
            className
          )}
          {...props}
        >
          <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full opacity-100" />
          <span className="relative z-10 flex items-center gap-2 text-white group-hover:text-black font-bold uppercase tracking-widest text-sm transition-colors duration-300">
            {children}
          </span>
        </button>
      );
    }
    
    if (variant === "secondary") {
        return (
            <button
              ref={ref}
              className={cn(
                "relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-all duration-300 clip-path-slant",
                className
              )}
              {...props}
            >
              {children}
            </button>
        )
    }

    return (
      <button
        ref={ref}
        className={cn(
          "px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300 backdrop-blur-sm",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ModernButton.displayName = "ModernButton";
