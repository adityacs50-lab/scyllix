import React, { useState } from "react";
import { AlertCard } from "@/components/AlertCard";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

/**
 * AlertCardDemo
 *
 * Showcase of the AlertCard component with all variants and features.
 * This demonstrates:
 * - All 3 variants (warning, info, error)
 * - Custom content
 * - State management
 * - Animation behavior
 */
export default function AlertCardDemo() {
  const [showAlert, setShowAlert] = useState("warning");
  const [isVisible, setIsVisible] = useState(true);

  const alertConfigs = {
    warning: {
      title: "Hold up 👀",
      subtitle: "This message feels a bit off.",
      description: "Scyllix noticed something worth checking.",
      primaryButtonText: "Tell me why",
      secondaryButtonText: "Ignore",
      variant: "warning",
    },
    info: {
      title: "💡 Security Tip",
      subtitle: "Strengthen your email security",
      description: "Enable two-factor authentication on your email account for better protection.",
      primaryButtonText: "Learn More",
      secondaryButtonText: "Later",
      variant: "info",
    },
    error: {
      title: "⚠️ High Risk Alert",
      subtitle: "Multiple phishing indicators detected",
      description: "This email has dangerous attachments and domain spoofing. Do not open.",
      primaryButtonText: "Show Details",
      secondaryButtonText: "Delete",
      variant: "error",
    },
  };

  const currentConfig = alertConfigs[showAlert];

  const handleTellMeWhy = () => {
    console.log(`[${showAlert.toUpperCase()}] User clicked primary action`);
    setIsVisible(false);
  };

  const handleIgnore = () => {
    console.log(`[${showAlert.toUpperCase()}] User clicked secondary action`);
    setIsVisible(false);
  };

  const handleShowAgain = () => {
    setIsVisible(true);
  };

  const handleChangeVariant = (variant) => {
    setShowAlert(variant);
    setIsVisible(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">
            AlertCard Component Demo
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Interactive showcase of all variants and features
          </p>
        </motion.div>

        {/* Main Demo Area */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Alert Display */}
          <div className="col-span-2 flex items-center justify-center rounded-xl bg-white p-8 shadow-sm dark:bg-slate-900">
            {isVisible ? (
              <AlertCard
                {...currentConfig}
                onTellMeWhy={handleTellMeWhy}
                onIgnore={handleIgnore}
              />
            ) : (
              <div className="text-center">
                <p className="mb-4 text-slate-600 dark:text-slate-300">
                  Alert was dismissed
                </p>
                <Button onClick={handleShowAgain} className="bg-primary">
                  Show Alert Again
                </Button>
              </div>
            )}
          </div>

          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Variant Selector */}
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-900">
              <h2 className="mb-4 font-semibold text-slate-900 dark:text-white">
                Variants
              </h2>
              <div className="space-y-2">
                {["warning", "info", "error"].map((variant) => (
                  <button
                    key={variant}
                    onClick={() => handleChangeVariant(variant)}
                    className={cn(
                      "w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                      showAlert === variant
                        ? "bg-primary text-primary-foreground"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    )}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="rounded-xl bg-blue-50 p-6 dark:bg-blue-950/30">
              <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
                Current Variant
              </h3>
              <dl className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <div>
                  <dt className="font-medium">Type:</dt>
                  <dd className="capitalize">{showAlert}</dd>
                </div>
                <div>
                  <dt className="font-medium">Status:</dt>
                  <dd>{isVisible ? "Visible" : "Dismissed"}</dd>
                </div>
              </dl>
            </div>

            {/* Features List */}
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-900">
              <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">
                Features
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Spring animations
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary"></span>
                  3 color variants
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Customizable text
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Dark mode support
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Decorative effects
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 space-y-6"
        >
          <div>
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
              Usage Examples
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Example 1: Basic Usage */}
              <div className="rounded-lg bg-slate-900 p-4 dark:bg-slate-800">
                <h3 className="mb-2 text-sm font-semibold text-slate-100">
                  Basic Usage
                </h3>
                <pre className="overflow-x-auto text-xs text-slate-300">
                  {`<AlertCard
  onTellMeWhy={handleClick}
  onIgnore={handleDismiss}
/>`}
                </pre>
              </div>

              {/* Example 2: Custom Content */}
              <div className="rounded-lg bg-slate-900 p-4 dark:bg-slate-800">
                <h3 className="mb-2 text-sm font-semibold text-slate-100">
                  Custom Content
                </h3>
                <pre className="overflow-x-auto text-xs text-slate-300">
                  {`<AlertCard
  title="Custom Title"
  description="Custom description"
  variant="error"
  onTellMeWhy={handleClick}
/>`}
                </pre>
              </div>

              {/* Example 3: Info Variant */}
              <div className="rounded-lg bg-slate-900 p-4 dark:bg-slate-800">
                <h3 className="mb-2 text-sm font-semibold text-slate-100">
                  Info Variant
                </h3>
                <pre className="overflow-x-auto text-xs text-slate-300">
                  {`<AlertCard
  variant="info"
  title="Security Tip"
  primaryButtonText="Learn"
/>`}
                </pre>
              </div>

              {/* Example 4: With State */}
              <div className="rounded-lg bg-slate-900 p-4 dark:bg-slate-800">
                <h3 className="mb-2 text-sm font-semibold text-slate-100">
                  With State
                </h3>
                <pre className="overflow-x-auto text-xs text-slate-300">
                  {`const [show, setShow] = useState(true);

{show && (
  <AlertCard
    onIgnore={() => setShow(false)}
  />
)}`}
                </pre>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400"
        >
          <p>Open the browser console to see action callbacks</p>
        </motion.div>
      </div>
    </div>
  );
}

// Helper function for conditional classes
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
