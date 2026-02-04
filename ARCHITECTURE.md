# Scyllix Component Architecture

## Component Tree

```
App
└── ScyllixDemoFlow (State Orchestrator)
    ├── State: { step, uiCopy, riskAnalysis }
    ├── Logic: { onStart, onClickMessage, onExplain, onIgnore, onReset, ... }
    │
    └── Conditional Rendering (by step):
        │
        ├── "hero" ──────────────────────────────────┐
        │                                             │
        │   ScyllixHero (Welcome Screen)             │
        │   ├── Badge (animated)                     │
        │   ├── Headline (gradient text)             │
        │   ├── InteractiveCard (3D tilt)            │
        │   │   ├── Message preview card             │
        │   │   └── WarningGraphic (overlay)         │
        │   └── Buttons                              │
        │       ├── Button (Try a risky message)     │
        │       └── Button (See how it works)        │
        │                                             │
        ├── "message" ────────────────────────────────┤
        │                                             │
        │   MessagePreview (Email List)              │
        │   └── For each sample email:               │
        │       └── Card (clickable)                 │
        │           ├── Sender name                  │
        │           ├── Subject                      │
        │           ├── Body preview                 │
        │           └── Metadata (links, files)      │
        │                                             │
        ├── "warning" ────────────────────────────────┤
        │                                             │
        │   EarlyWarningCard (Risk Alert)            │
        │   ├── WarningGraphic (animated)            │
        │   ├── Title & Risk Level                   │
        │   ├── Risk Score (circular progress)       │
        │   ├── Primary Reason                       │
        │   └── Buttons                              │
        │       ├── Button (Learn More) ──┐          │
        │       └── Button (Dismiss) ◄────┼──────┐   │
        │                                 │      │   │
        ├── "explanation" ──────────────┐ │      │   │
        │                               │ │      │   │
        │   TeachBackCard (Teach-Back)  │ │      │   │
        │   ├── Icon (BookOpen)         │ │      │   │
        │   ├── Title                   │ │      │   │
        │   ├── Explanation text        │ │      │   │
        │   ├── Warning signs list      │ │      │   │
        │   └── Button (Got It!) ───────┼─┼─────┐│   │
        │                               │ │     ││   │
        ├── "learning" ──────────────┐  │ │     ││   │
        │                            │  │ │     ││   │
        │   LearningTip (Security)   │  │ │     ││   │
        │   ├── Icon (Lightbulb)     │  │ │     ││   │
        │   ├── Title                │  │ │     ││   │
        │   ├── Tip text             │  │ │     ││   │
        │   ├── Why it matters       │  │ │     ││   │
        │   └── Button (Finish!) ────┼──┼─┼─────┼┼─┐ │
        │                            │  │ │     ││ │ │
        └── "success" ──────────────┐ │  │ │     ││ │ │
                                    │ │  │ │     ││ │ │
            SuccessScreen           │ │  │ │     ││ │ │
            ├── Checkmark icon      │ │  │ │     ││ │ │
            ├── Celebration message │ │  │ │     ││ │ │
            ├── Summary card        │ │  │ │     ││ │ │
            └── Button              │ │  │ │     ││ │ │
                (Try Another) ◄─────┴──┴──┴─────┘│ │ │
                                                   │ │ │
            Reset to "hero" ◄──────────────────────┘ │ │
                                                      │ │
            Back to "message" ◄────────────────────────┘
```

## Data Flow Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                        USER INTERACTION                        │
└────────────────────────────────────────────────────────────────┘
                              ▼
                    User clicks email card
                              ▼
                    ┌─────────────────────┐
                    │  onClickMessage()   │
                    │  (ScyllixDemoFlow)  │
                    └─────────────────────┘
                              ▼
        ┌─────────────────────────────────────────┐
        │   assessPhishingRisk(email)             │
        │   (from securityCore.js)                │
        │                                          │
        │   Rules evaluated:                       │
        │   - Dangerous attachment? → +50 pts     │
        │   - Domain mismatch? → +40 pts          │
        │   - Suspicious links? → +30 pts         │
        │   - Urgent language? → +20 pts          │
        │                                          │
        │   Returns: {                             │
        │     riskDetected: bool,                  │
        │     riskScore: 0-100,                    │
        │     primaryReason: string,               │
        │     triggeredReasons: string[]           │
        │   }                                       │
        └─────────────────────────────────────────┘
                              ▼
                      Does risk > 50?
                       ╱           ╲
                      ╱             ╲
                    YES              NO
                    ▼                ▼
         ┌──────────────────┐   User stays on
         │ riskDetected=true│   MessagePreview
         └──────────────────┘   (safe email)
                    ▼
        ┌─────────────────────────────────┐
        │ getReasonExplanation()          │
        │ (from reasonMap.js)             │
        │                                  │
        │ Lookup: reasonMap[primaryReason]│
        │ Return: {                        │
        │   title: string,                 │
        │   explanation: string,           │
        │   learning: string               │
        │ }                                │
        └─────────────────────────────────┘
                    ▼
         ┌──────────────────┐
         │ setStep("warning")│
         └──────────────────┘
                    ▼
    ┌──────────────────────────────┐
    │ Show: EarlyWarningCard       │
    │ Props: riskScore, primaryReason
    │ Buttons: Learn More, Dismiss  │
    └──────────────────────────────┘
         ▼                ▼
    onExplain()     onIgnore()
         ▼                ▼
    warning→        message
    explanation     (return)
         ▼
    Show: TeachBackCard
    Props: title, explanation
         ▼
    onNext()
         ▼
    setStep("learning")
         ▼
    Show: LearningTip
    Props: tip
         ▼
    onNext()
         ▼
    setStep("success")
         ▼
    Show: SuccessScreen
         ▼
    onReset()
         ▼
    setStep("hero")
         ▼
    Back to start
```

## Component Hierarchy & Props

```
ScyllixDemoFlow
│
├── Step: "hero"
│   └── ScyllixHero
│       └── onStart()  [callback]
│           ├── Button: "Try a risky message"
│           └── Button: "See how it works"
│
├── Step: "message"
│   └── MessagePreview
│       └── onClickMessage(email)  [callback]
│           └── For each email:
│               └── Message Card (clickable)
│
├── Step: "warning"
│   └── EarlyWarningCard
│       ├── riskScore: number (0-100)
│       ├── primaryReason: string
│       ├── onExplain()  [callback]
│       └── onIgnore()   [callback]
│
├── Step: "explanation"
│   └── TeachBackCard
│       ├── title: string
│       ├── explanation: string
│       └── onNext()  [callback]
│
├── Step: "learning"
│   └── LearningTip
│       ├── tip: string
│       └── onNext()  [callback]
│
└── Step: "success"
    └── SuccessScreen
        └── onReset()  [callback]
```

## Reusable Components

```
components/ui/
│
├── Button
│   ├── Variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
│   ├── Size: "default" | "sm" | "lg" | "icon"
│   └── Props: HTMLButtonElement + variant + size + asChild
│
├── InteractiveCard
│   ├── 3D tilt effect on hover
│   ├── Mouse tracking
│   └── Props: children, className, onClick
│
└── WarningGraphic
    ├── Animated SVG
    ├── Respects prefers-reduced-motion
    └── Props: width, height, className, enableAnimations, animationSpeed, color
```

## State Management Flow

```
ScyllixDemoFlow State:

┌──────────────────────────────────┐
│ const [step, setStep]            │
│ Values: "hero" | "message"       │
│         "warning" | "explanation"│
│         "learning" | "success"   │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ const [uiCopy, setUiCopy]        │
│ Shape: {                          │
│   title: string,                  │
│   explanation: string,            │
│   learning: string                │
│ }                                 │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ const [riskAnalysis, setRiskAnalysis]
│ Shape: {                          │
│   riskDetected: boolean,          │
│   riskScore: number (0-100),      │
│   primaryReason: string,          │
│   triggeredReasons: string[]      │
│ }                                 │
└──────────────────────────────────┘

State Transitions:
hero ──onStart()──→ message
message ──onClickMessage(email)──→ [analyze]
        ├──riskDetected=false──→ stays on message
        └──riskDetected=true──→ warning

warning ──onExplain()──→ explanation
        ──onIgnore()──→ message

explanation ──onNext()──→ learning

learning ──onNext()──→ success

success ──onReset()──→ hero (clear state)
```

## Integration Points

```
External Dependencies:
│
├── framer-motion
│   ├── Used in: All components
│   ├── Features: motion, useSpring, useTransform, useMotionValue, useReducedMotion
│   └── Purpose: Smooth animations & transitions
│
├── @radix-ui/react-slot
│   ├── Used in: Button.jsx
│   └── Purpose: Polymorphic component rendering
│
├── class-variance-authority
│   ├── Used in: Button.jsx, other CVA-based components
│   └── Purpose: Type-safe CSS class variants
│
├── lucide-react
│   ├── Used in: All components
│   └── Purpose: Icon library
│
├── clsx
│   ├── Used in: lib/utils.ts
│   └── Purpose: Conditional class combining
│
├── tailwind-merge
│   ├── Used in: lib/utils.ts (cn function)
│   └── Purpose: Safe Tailwind class merging
│
└── tailwindcss
    ├── Used in: index.css, all component styling
    └── Purpose: Utility-first CSS framework


Internal Dependencies:
│
├── securityCore.js
│   ├── Used in: ScyllixDemoFlow.jsx
│   ├── Exports: assessPhishingRisk(email)
│   └── Returns: { riskDetected, riskScore, primaryReason, triggeredReasons }
│
├── reasonMap.js
│   ├── Used in: ScyllixDemoFlow.jsx
│   ├── Exports: getReasonExplanation(reasonKey)
│   └── Returns: { title, explanation, learning }
│
└── lib/utils.ts
    ├── Used in: All components
    ├── Exports: cn(...inputs)
    └── Purpose: Merge Tailwind classes safely
```

---

**Last Updated:** February 4, 2026
