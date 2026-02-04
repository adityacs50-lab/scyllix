import React from "react";
import { cn } from "@/lib/utils";

// JSDoc type annotation
/**
 * @typedef {Object} ScyllixNavbarProps
 * @property {string} [logoText]
 * @property {string} [appName]
 * @property {string} [statusLabel]
 * @property {string} [className]
 */

const ScyllixNavbar = React.forwardRef(
  (
    {
      logoText = "Scyllix",
      appName = "Scyllix",
      statusLabel = "UI Preview",
      className,
    },
    ref
  ) => {
    return (
      <header
        ref={ref}
        className={cn(
          "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl",
          className
        )}
      >
        <nav className="flex items-center justify-between px-6 py-3 backdrop-blur-md bg-background/30 border border-border/40 rounded-full">
          <div className="flex items-center gap-3">
            <div className="relative w-6 h-6 flex items-center justify-center">
              <span className="absolute w-1.5 h-1.5 rounded-full bg-primary top-0 left-1/2 transform -translate-x-1/2"></span>
              <span className="absolute w-1.5 h-1.5 rounded-full bg-primary left-0 top-1/2 transform -translate-y-1/2"></span>
              <span className="absolute w-1.5 h-1.5 rounded-full bg-primary right-0 top-1/2 transform -translate-y-1/2"></span>
              <span className="absolute w-1.5 h-1.5 rounded-full bg-primary bottom-0 left-1/2 transform -translate-x-1/2"></span>
            </div>
            <span className="text-sm font-medium text-foreground">{appName}</span>
          </div>

          <div className="flex items-center">
            <div className="px-3 py-1 rounded-full border border-border/50 bg-background/50">
              <span className="text-xs font-medium text-muted-foreground">{statusLabel}</span>
            </div>
          </div>
        </nav>
      </header>
    );
  }
);

ScyllixNavbar.displayName = "ScyllixNavbar";

export default ScyllixNavbar;
