import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Shield, ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";
import { InteractiveCard } from "./ui/InteractiveCard";
import { WarningGraphic } from "./ui/WarningGraphic";

/**
 * ScyllixHero Component
 *
 * The welcome/splash screen of the Scyllix demo.
 * Features:
 * - Hero headline with gradient text
 * - Interactive message card with 3D tilt effect
 * - Warning overlay that appears on click
 * - Call-to-action buttons
 *
 * Props:
 * - onStart: callback when user clicks "Try a risky message" button
 * 
 * @typedef {Object} ScyllixHeroProps
 * @property {() => void} [onStart]
 */

export default function ScyllixHero({ onStart }) {
  const [showWarning, setShowWarning] = React.useState(false);

  const handleCardClick = () => {
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 4000);
  };

  const handleStartClick = () => {
    if (onStart) {
      onStart();
    } else {
      handleCardClick();
    }
  };

  return (
    <section className="relative min-h-screen bg-background text-foreground py-12 sm:py-24 md:py-32 px-4 overflow-hidden">
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-12 pt-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 text-sm backdrop-blur-sm"
        >
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">AI-Powered Scam Detection</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
        >
          Before you click.{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Scyllix.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl text-center text-lg sm:text-xl text-muted-foreground"
        >
          Scyllix gently warns you about risky messages and explains them in plain language.
        </motion.p>

        {/* Interactive Message Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative w-full max-w-md mt-8"
        >
          <InteractiveCard
            onClick={handleCardClick}
            className="rounded-xl border border-border bg-card p-6 shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <span className="text-lg">💰</span>
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium">Urgent: Account Verification Required</p>
                <p className="text-xs text-muted-foreground">
                  Your account will be suspended unless you verify immediately. Click here to confirm your identity.
                </p>
                <div className="inline-flex items-center gap-1 text-xs text-primary">
                  <span>Click to verify</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </InteractiveCard>

          {/* Warning Overlay */}
          {showWarning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 rounded-xl border-2 border-destructive bg-destructive/10 backdrop-blur-sm p-6 flex flex-col items-center justify-center gap-4"
            >
              <WarningGraphic
                width={200}
                height={65}
                enableAnimations={true}
                animationSpeed={1.5}
                color="#ef4444"
              />
              <div className="text-center space-y-2">
                <p className="font-semibold text-destructive flex items-center gap-2 justify-center">
                  <AlertTriangle className="h-5 w-5" />
                  Potential Scam Detected
                </p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  This message uses urgent language and suspicious links commonly found in phishing attempts.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Button size="lg" className="gap-2" onClick={handleStartClick}>
            <AlertTriangle className="h-4 w-4" />
            Try a risky message
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            See how it works
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Subtle hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-xs text-muted-foreground/60 text-center mt-4"
        >
          Click the message card above to see Scyllix in action
        </motion.p>
      </div>
    </section>
  );
}
