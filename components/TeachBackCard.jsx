import React from "react";
import { ShieldAlert, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// JSDoc type annotation
/**
 * @typedef {Object} TeachBackCardProps
 * @property {string} [title]
 * @property {string} [explanation]
 * @property {string} [learningTip]
 * @property {string} [className]
 */

function TeachBackCard({
  title = "Why Scyllix paused you",
  explanation = "This message claims to be from a trusted company, but the sender address doesn't match.",
  learningTip = "Quick tip: Real companies don't rush you with links.",
  className,
}) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-2 border-border bg-background p-6 shadow-lg transition-all duration-300 hover:shadow-xl max-w-md",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        {/* Header with Icon */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
            <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground leading-tight">
              {title}
            </h3>
          </div>
        </div>

        {/* Explanation */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {explanation}
          </p>

          {/* Learning Tip Section */}
          <div className="relative rounded-lg border border-blue-200 bg-blue-50/50 p-3 dark:border-blue-800 dark:bg-blue-950/30">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="flex-1">
                <Badge
                  variant="secondary"
                  className="mb-1.5 bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 text-[10px] px-2 py-0"
                >
                  Learning Tip
                </Badge>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {learningTip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-amber-200/20 to-blue-200/20 blur-2xl dark:from-amber-600/10 dark:to-blue-600/10"
        aria-hidden="true"
      />
    </Card>
  );
}

export default TeachBackCard;
