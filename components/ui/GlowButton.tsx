import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'danger';
  glowColor?: string;
}

export const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = 'primary', glowColor, children, ...props }, ref) => {
    const baseClasses = "relative px-4 py-2 font-mono text-sm uppercase tracking-wider transition-all duration-300 border focus:outline-none overflow-hidden group";
    
    const variants = {
      primary: "border-cyan-500/50 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 bg-cyan-950/20",
      secondary: "border-purple-500/50 text-purple-400 hover:text-purple-300 hover:border-purple-400 bg-purple-950/20",
      danger: "border-red-500/50 text-red-400 hover:text-red-300 hover:border-red-400 bg-red-950/20",
    };

    const glowColors = {
      primary: "rgba(6, 182, 212, 0.5)",
      secondary: "rgba(168, 85, 247, 0.5)",
      danger: "rgba(239, 68, 68, 0.5)",
    };

    const color = glowColor || glowColors[variant];

    return (
      <motion.button
        ref={ref}
        className={cn(baseClasses, variants[variant], className)}
        whileHover={{ scale: 1.02, boxShadow: `0 0 15px ${color}` }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
      </motion.button>
    );
  }
);
GlowButton.displayName = 'GlowButton';
