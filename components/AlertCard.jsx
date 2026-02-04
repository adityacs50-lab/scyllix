import React from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

/**
 * AlertCard Component
 * 
 * A friendly, animated warning card for alert notifications.
 * Features:
 * - Smooth spring animations
 * - Gradient background with backdrop blur
 * - Two action buttons (primary and secondary)
 * - Dark mode support
 * - Decorative glow effects
 * 
 * @component
 * @example
 * <AlertCard 
 *   onTellMeWhy={handleExplanation} 
 *   onIgnore={handleIgnore}
 * />
 */
const AlertCard = React.forwardRef(
  (
    {
      onTellMeWhy,
      onIgnore,
      title = "Hold up 👀",
      subtitle = "This message feels a bit off.",
      description = "Scyllix noticed something worth checking.",
      primaryButtonText = "Tell me why",
      secondaryButtonText = "Ignore",
      className,
      variant = "warning", // 'warning' | 'info' | 'error'
    },
    ref
  ) => {
    // Color variants
    const variantStyles = {
      warning: {
        border: "border-amber-200/50 dark:border-amber-900/50",
        bg: "from-amber-50/90 to-yellow-50/90 dark:from-amber-950/90 dark:to-yellow-950/90",
        icon: "bg-amber-100 dark:bg-amber-900/50",
        iconColor: "text-amber-600 dark:text-amber-400",
        title: "text-amber-900 dark:text-amber-100",
        subtitle: "text-amber-800 dark:text-amber-200",
        description: "text-amber-700/80 dark:text-amber-300/80",
        primaryBtn: "bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600",
        secondaryBtn:
          "text-amber-700 hover:bg-amber-100/50 dark:text-amber-300 dark:hover:bg-amber-900/30",
        glowLeft: "bg-amber-300/20 dark:bg-amber-600/20",
        glowRight: "bg-yellow-300/20 dark:bg-yellow-600/20",
      },
      info: {
        border: "border-blue-200/50 dark:border-blue-900/50",
        bg: "from-blue-50/90 to-cyan-50/90 dark:from-blue-950/90 dark:to-cyan-950/90",
        icon: "bg-blue-100 dark:bg-blue-900/50",
        iconColor: "text-blue-600 dark:text-blue-400",
        title: "text-blue-900 dark:text-blue-100",
        subtitle: "text-blue-800 dark:text-blue-200",
        description: "text-blue-700/80 dark:text-blue-300/80",
        primaryBtn:
          "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600",
        secondaryBtn:
          "text-blue-700 hover:bg-blue-100/50 dark:text-blue-300 dark:hover:bg-blue-900/30",
        glowLeft: "bg-blue-300/20 dark:bg-blue-600/20",
        glowRight: "bg-cyan-300/20 dark:bg-cyan-600/20",
      },
      error: {
        border: "border-red-200/50 dark:border-red-900/50",
        bg: "from-red-50/90 to-pink-50/90 dark:from-red-950/90 dark:to-pink-950/90",
        icon: "bg-red-100 dark:bg-red-900/50",
        iconColor: "text-red-600 dark:text-red-400",
        title: "text-red-900 dark:text-red-100",
        subtitle: "text-red-800 dark:text-red-200",
        description: "text-red-700/80 dark:text-red-300/80",
        primaryBtn:
          "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600",
        secondaryBtn:
          "text-red-700 hover:bg-red-100/50 dark:text-red-300 dark:hover:bg-red-900/30",
        glowLeft: "bg-red-300/20 dark:bg-red-600/20",
        glowRight: "bg-pink-300/20 dark:bg-pink-600/20",
      },
    };

    const styles = variantStyles[variant] || variantStyles.warning;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        className={cn(
          "relative w-full max-w-md rounded-2xl border bg-gradient-to-br p-6 shadow-lg backdrop-blur-sm",
          styles.border,
          styles.bg,
          className
        )}
      >
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/10 to-yellow-400/10 blur-xl" />

        {/* Content */}
        <div className="relative z-10 space-y-4">
          {/* Icon and Title */}
          <div className="flex items-start gap-3">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                styles.icon
              )}
            >
              <Eye className={cn("h-5 w-5", styles.iconColor)} />
            </motion.div>

            <div className="flex-1 space-y-1">
              <h3 className={cn("text-lg font-semibold", styles.title)}>
                {title}
              </h3>
              <p className={cn("text-base font-medium", styles.subtitle)}>
                {subtitle}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className={cn("text-sm", styles.description)}>{description}</p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2 sm:flex-row">
            <Button
              onClick={onTellMeWhy}
              className={cn(
                "flex-1 shadow-sm",
                styles.primaryBtn
              )}
            >
              {primaryButtonText}
            </Button>
            <Button
              onClick={onIgnore}
              variant="ghost"
              className={cn("flex-1", styles.secondaryBtn)}
            >
              {secondaryButtonText}
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div
          className={cn(
            "pointer-events-none absolute -right-2 -top-2 h-20 w-20 rounded-full blur-2xl",
            styles.glowLeft
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute -bottom-2 -left-2 h-16 w-16 rounded-full blur-2xl",
            styles.glowRight
          )}
        />
      </motion.div>
    );
  }
);

AlertCard.displayName = "AlertCard";

export { AlertCard };
