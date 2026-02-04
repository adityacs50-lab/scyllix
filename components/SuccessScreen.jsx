import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

// JSDoc type annotation
/**
 * @typedef {Object} SuccessScreenProps
 * @property {() => void} [onReset]
 */

export default function SuccessScreen({ onReset }) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      {/* Confetti particles */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 1}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: [
                    "#10b981",
                    "#3b82f6",
                    "#8b5cf6",
                    "#ec4899",
                    "#f59e0b",
                  ][Math.floor(Math.random() * 5)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      <Card className="w-full max-w-md shadow-xl animate-in fade-in zoom-in duration-500">
        <CardContent className="pt-12 pb-8 px-8 text-center space-y-6">
          {/* Icon with pulse animation */}
          <div className="flex justify-center">
            <div className="relative">
              <CheckCircle2 className="w-16 h-16 text-green-500 animate-in zoom-in duration-500" />
              <div className="absolute inset-0 rounded-full bg-green-500/20 animate-pulse" />
            </div>
          </div>

          {/* Main text */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Nice catch 🙌
            </h1>
            <p className="text-lg text-slate-700 dark:text-slate-300">
              You avoided a risky click.
            </p>
          </div>

          {/* Subtext */}
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Scyllix has your back.
          </p>

          {/* Button */}
          <Button
            className="w-full mt-6"
            size="lg"
            onClick={onReset}
          >
            Back to inbox
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
