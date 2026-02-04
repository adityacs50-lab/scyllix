import React from "react";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

// JSDoc type annotation
/**
 * @typedef {Object} LearningTipProps
 * @property {string} [title]
 * @property {string} [tip]
 * @property {string} [className]
 */

function LearningTip({
  title = "What to remember next time",
  tip = "If a message pressures you to act fast, pause and double-check.",
  className,
}) {
  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div
        className="relative rounded-2xl border border-border bg-card p-6 shadow-lg"
        style={{
          boxShadow:
            "0 0 20px rgba(59, 130, 246, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Subtle glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-50 blur-xl"
          style={{
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 space-y-4">
          {/* Icon and Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
              <Lightbulb className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          </div>

          {/* Tip */}
          <div className="rounded-lg bg-muted/50 p-4 backdrop-blur-sm">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {tip}
            </p>
          </div>

          {/* Positive reinforcement message */}
          <div className="flex items-center gap-2 pt-2">
            <div className="h-1 w-1 rounded-full bg-blue-500" />
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
              You're getting smarter every day!
            </p>
          </div>
        </div>

        {/* Accent border glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          }}
        />
      </div>
    </div>
  );
}

export default LearningTip;
