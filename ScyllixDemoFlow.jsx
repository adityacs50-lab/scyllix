import React, { useState } from "react";
import { assessPhishingRisk } from "./securityCore";
import { getReasonExplanation } from "./reasonMap";

// UI Components
import ScyllixNavbar from "./components/ScyllixNavbar";
import MessagePreview from "./components/MessagePreview";
import { AlertCard } from "./components/AlertCard";
import TeachBackCard from "./components/TeachBackCard";
import LearningTip from "./components/LearningTip";
import SuccessScreen from "./components/SuccessScreen";

/**
 * ScyllixDemoFlow
 *
 * Single-page interactive demo that orchestrates all Scyllix components into
 * a coherent phishing awareness flow.
 *
 * Flow: Message → Alert → Teach → Learn → Success → Reset
 *
 * State Management:
 * - step: current screen in the flow
 * - uiCopy: title, explanation, and learning tip (from reasonMap)
 * - riskAnalysis: risk score and primary reason from security core
 */
export default function ScyllixDemoFlow() {
  // ===========================
  // State Management
  // ===========================

  /**
   * step: which screen to render
   * - "message": user inspects an email preview
   * - "alert": risk detected → user sees the alert
   * - "teach": detailed teach-back explanation
   * - "learn": security learning tip
   * - "success": congratulations screen
   */
  const [step, setStep] = useState("message");

  /**
   * uiCopy: store the explanation data (title, explanation, learning)
   * fetched from reasonMap based on primaryReason
   *
   * Shape: { title, explanation, learning }
   * Default: empty object if no risk detected
   */
  const [uiCopy, setUiCopy] = useState({});

  /**
   * riskAnalysis: store the full result from assessPhishingRisk
   * Used to display risk score and primary reason
   */
  const [riskAnalysis, setRiskAnalysis] = useState(null);

  // ===========================
  // Callbacks
  // ===========================

  /**
   * onClickMessage: User interacts with an email in MessagePreview
   * - Analyzes the email using the security core
   * - If risk detected: stores explanation + moves to alert
   * - If safe: does nothing (user can try another email)
   */
  const onClickMessage = (email) => {
    // Run the security core analysis
    const analysis = assessPhishingRisk(email);
    setRiskAnalysis(analysis);

    if (analysis.riskDetected) {
      // Risk detected: fetch explanation from reasonMap
      const explanation = getReasonExplanation(analysis.primaryReason);

      // Store the explanation data for display
      setUiCopy(explanation);

      // Move to alert screen
      setStep("alert");
    } else {
      // Safe email: stay on message view
      console.log("✓ Email is safe. No action needed.");
    }
  };

  /**
   * onAlertPrimary: User clicks "Tell me why" on AlertCard
   * Move to TeachBackCard for detailed explanation
   */
  const onAlertPrimary = () => {
    setStep("teach");
  };

  /**
   * onAlertSecondary: User clicks "Dismiss" on AlertCard
   * Return to message preview to analyze another email
   */
  const onAlertSecondary = () => {
    setRiskAnalysis(null);
    setUiCopy({});
    setStep("message");
  };

  /**
   * onTeachNext: User finishes reading the explanation
   * Move to learning tip screen
   */
  const onTeachNext = () => {
    setStep("learn");
  };

  /**
   * onLearnNext: User finishes reading the security learning tip
   * Move to success screen
   */
  const onLearnNext = () => {
    setStep("success");
  };

  /**
   * onSuccessReset: User clicks "Back to inbox"
   * Return to message to analyze another email
   */
  const onSuccessReset = () => {
    setStep("message");
    setRiskAnalysis(null);
    setUiCopy({});
  };

  // ===========================
  // Render: Single screen at a time
  // ===========================

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar always visible */}
      <ScyllixNavbar
        appName="Scyllix"
        statusLabel={`Step: ${step}`}
      />

      {/* Main content area with top padding for fixed navbar */}
      <main className="pt-20 flex items-center justify-center min-h-screen px-4">
        {/* STEP 1: Message Preview - User inspects emails */}
        {step === "message" && (
          <MessagePreview onClickMessage={onClickMessage} />
        )}

        {/* STEP 2: Alert Card - Risk detected! */}
        {step === "alert" && (
          <AlertCard
            title="Hold up 👀"
            subtitle="This message feels a bit off."
            description={uiCopy.title || "Scyllix noticed something worth checking."}
            primaryButtonText="Tell me why"
            secondaryButtonText="Dismiss"
            variant={
              riskAnalysis?.riskScore > 75 ? "error" : "warning"
            }
            onTellMeWhy={onAlertPrimary}
            onIgnore={onAlertSecondary}
          />
        )}

        {/* STEP 3: Teach Back Card - Detailed explanation */}
        {step === "teach" && (
          <TeachBackCard
            title={uiCopy.title || "Why Scyllix paused you"}
            explanation={uiCopy.explanation || ""}
            learningTip={uiCopy.learning || "Stay vigilant!"}
          />
        )}

        {/* STEP 4: Learning Tip - Security lesson */}
        {step === "learn" && (
          <LearningTip
            title="What to remember next time"
            tip={
              uiCopy.learning ||
              "Always double-check sender addresses and be cautious with unexpected requests."
            }
          />
        )}

        {/* STEP 5: Success Screen - Celebration */}
        {step === "success" && (
          <SuccessScreen onReset={onSuccessReset} />
        )}
      </main>
    </div>
  );
}
