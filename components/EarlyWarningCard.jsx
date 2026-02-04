import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ChevronRight, X } from "lucide-react";
import { Button } from "./ui/Button";
import { WarningGraphic } from "./ui/WarningGraphic";

/**
 * EarlyWarningCard Component
 *
 * Displays when a risky message is detected.
 * Shows risk score, primary reason, and offers to explain or dismiss.
 *
 * Props:
 * - riskScore: number (0-100)
 * - primaryReason: string (key from security core)
 * - onExplain: callback when user wants detailed explanation
 * - onIgnore: callback when user dismisses the warning
 * 
 * @typedef {Object} EarlyWarningCardProps
 * @property {number} [riskScore]
 * @property {string} [primaryReason]
 * @property {() => void} [onExplain]
 * @property {() => void} [onIgnore]
 */

export default function EarlyWarningCard({
  riskScore = 75,
  primaryReason = "domain_mismatch",
  onExplain,
  onIgnore,
}) {
  const riskLevel =
    riskScore >= 70 ? "High Risk" : riskScore >= 50 ? "Medium Risk" : "Low Risk";
  const riskColor =
    riskScore >= 70 ? "text-destructive" : riskScore >= 50 ? "text-yellow-600" : "text-green-600";

  return (
    <section className="min-h-screen bg-background text-foreground py-12 px-4 flex items-center">
      <div className="mx-auto max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Warning Graphic */}
          <div className="flex justify-center">
            <WarningGraphic
              width={250}
              height={80}
              enableAnimations={true}
              animationSpeed={1}
              color="#ef4444"
            />
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <h1 className="text-3xl font-bold">Risky Message</h1>
            </div>
            <p className="text-muted-foreground">This message looks suspicious.</p>
          </div>

          {/* Risk Score Badge */}
          <div className="flex justify-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-border"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${(riskScore / 100) * 2 * Math.PI * 45} ${2 * Math.PI * 45}`}
                  className={riskColor}
                  initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                  animate={{ strokeDashoffset: (1 - riskScore / 100) * 2 * Math.PI * 45 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                />
              </svg>
              <div className="text-center z-10">
                <div className={`text-4xl font-bold ${riskColor}`}>{riskScore}</div>
                <div className="text-xs text-muted-foreground mt-1">Risk Score</div>
              </div>
            </div>
          </div>

          {/* Risk Level */}
          <div className="text-center">
            <p className={`text-lg font-semibold ${riskColor}`}>{riskLevel}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Reason: <span className="font-medium capitalize">{primaryReason.replace(/_/g, " ")}</span>
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full gap-2"
              onClick={onExplain}
            >
              Learn More
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="w-full gap-2"
              onClick={onIgnore}
            >
              <X className="h-4 w-4" />
              Dismiss
            </Button>
          </div>

          {/* Hint */}
          <p className="text-xs text-center text-muted-foreground">
            Understanding scam tactics helps protect you online.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
