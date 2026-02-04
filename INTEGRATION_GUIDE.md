# Scyllix Component Integration Guide

## Project Overview

This is a **hackathon MVP** for Scyllix, an AI-powered phishing detection system. The project consists of:

- **securityCore.js** — Rule-based phishing risk detection logic
- **reasonMap.js** — Maps detection reasons to human-friendly explanations
- **ScyllixDemoFlow.jsx** — Main orchestrator component that assembles the flow
- **UI Components** — Reusable React components for the interface

## Directory Structure

```
e:\amdryzen\
├── securityCore.js                 # Phishing detection logic
├── reasonMap.js                    # Explanation mapping
├── ScyllixDemoFlow.jsx             # Main demo orchestrator
├── index.css                       # Tailwind v4 configuration & theme
├── lib/
│   └── utils.ts                    # Utility functions (cn helper)
└── components/
    ├── ScyllixHero.jsx             # Welcome/splash screen
    ├── MessagePreview.jsx          # Email message list
    ├── EarlyWarningCard.jsx        # Risk alert display
    ├── TeachBackCard.jsx           # Detailed explanation
    ├── LearningTip.jsx             # Security tip
    ├── SuccessScreen.jsx           # Completion celebration
    └── ui/
        ├── Button.jsx              # Reusable button component
        ├── InteractiveCard.jsx     # 3D tilt card component
        └── WarningGraphic.jsx      # Animated warning SVG
```

## Installation & Setup

### 1. Install Dependencies

Run the following command in your project root:

```bash
npm install framer-motion @radix-ui/react-slot class-variance-authority lucide-react clsx tailwind-merge
```

**What each package does:**
- `framer-motion` — Animation library for smooth transitions
- `@radix-ui/react-slot` — Polymorphic component utility
- `class-variance-authority` — Type-safe CSS class variants
- `lucide-react` — Icon library
- `clsx` — Utility for combining class names
- `tailwind-merge` — Merges Tailwind CSS classes intelligently

### 2. Ensure Tailwind CSS v4 is Configured

If you don't have Tailwind set up, install it:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then update your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 3. Import CSS

In your main entry point (e.g., `main.jsx` or `index.js`), import the Tailwind CSS:

```javascript
import './index.css';
```

### 4. Set Up Path Aliases (Optional but Recommended)

If using Vite, update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

If using Next.js, update `jsconfig.json` or `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Usage

### Basic Integration

In your main app component or entry point:

```javascript
import React from 'react';
import ScyllixDemoFlow from './ScyllixDemoFlow';
import './index.css';

export default function App() {
  return <ScyllixDemoFlow />;
}
```

### Component Hierarchy & Flow

The `ScyllixDemoFlow` orchestrates a 6-step flow:

1. **ScyllixHero** (step="hero")
   - Welcome screen with animated badge and headline
   - Interactive email card with 3D tilt effect
   - Call-to-action buttons

2. **MessagePreview** (step="message")
   - List of sample emails
   - Click any email to trigger analysis
   - Safe and risky examples included

3. **Security Analysis** (internal logic)
   - `assessPhishingRisk()` from securityCore.js
   - Returns riskScore and primaryReason
   - Fetches explanation from reasonMap

4. **EarlyWarningCard** (step="warning")
   - Animated risk score visualization
   - Primary reason displayed
   - Buttons to learn more or dismiss

5. **TeachBackCard** (step="explanation")
   - Detailed explanation of the threat
   - Why the message is suspicious
   - Common warning signs

6. **LearningTip** (step="learning")
   - Actionable security lesson
   - Why the lesson matters
   - Practical defense tips

7. **SuccessScreen** (step="success")
   - Celebration and encouragement
   - Option to try another message
   - Reinforces learning

### State Management

ScyllixDemoFlow uses three pieces of state:

```javascript
const [step, setStep] = useState("hero");        // Current screen
const [uiCopy, setUiCopy] = useState({});        // Explanation text
const [riskAnalysis, setRiskAnalysis] = useState(null); // Security result
```

### Customization

#### Changing Sample Emails

Edit the `sampleEmails` array in [MessagePreview.jsx](components/MessagePreview.jsx):

```javascript
const sampleEmails = [
  {
    id: 1,
    sender: "your@email.com",
    senderName: "Name",
    subject: "...",
    body: "...",
    links: [],
    attachments: [],
  },
];
```

#### Adding New Risk Reasons

1. Add a rule to `securityCore.js` and give it a `reasonKey`
2. Add that key to the `REASON_PRIORITY` map
3. Add an entry to `reasonMap.js`:

```javascript
export const reasonMap = {
  new_reason: {
    title: "Threat Title",
    explanation: "Detailed explanation...",
    learning: "Actionable tip...",
  },
};
```

#### Styling Theme

Colors are defined in `index.css` using CSS variables:

```css
:root {
  --primary: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  /* ... more colors ... */
}
```

Update these values to match your brand. All Tailwind utilities reference these variables.

## Key Design Decisions

✅ **Single Page, No Routing** — Uses state instead of URL routing
✅ **One Step at a Time** — Only one screen visible (clearer UX)
✅ **Highest Risk Wins** — primaryReason is the most important factor
✅ **Tie-Breaking by Clarity** — When scores equal, picks most human-understandable reason
✅ **All Components Unstyled Ready** — UI is self-contained, no external dependencies
✅ **Accessibility** — Framer Motion respects `prefers-reduced-motion`
✅ **No Backend** — Everything runs locally (perfect for hackathon)

## How It Works: The Security Core

The `assessPhishingRisk()` function analyzes emails using 4 rules:

| Rule | Points | ID | Description |
|------|--------|----|----|
| Dangerous Attachment | 50 | `dangerous_attachment` | .exe, .zip, .rar, .scr files |
| Domain Mismatch | 40 | `domain_mismatch` | Sender domain ≠ brand in content |
| Suspicious Link | 30 | `suspicious_link` | Shortened links or IP addresses |
| Urgent Language | 20 | `urgent_language` | "Urgent", "verify now", "limited time" |

**Risk Score Rules:**
- Score ≥ 50 → `riskDetected = true`
- Multiple rules can trigger, but only the highest-point rule becomes `primaryReason`
- If tied, `REASON_PRIORITY` order determines which is shown

**Example:**
```
Email with:
- Dangerous attachment (+50)
- Urgent language (+20)
- Domain mismatch (+40)

Result:
- riskScore: 110 (clamped to 100)
- riskDetected: true
- primaryReason: "dangerous_attachment" (50 > 40 > 20)
```

## Testing

### Running the Demo

```bash
npm run dev
```

Then navigate to `http://localhost:5173` (or the port shown in terminal).

### Testing Different Scenarios

The [MessagePreview.jsx](components/MessagePreview.jsx) includes 3 test emails:

1. **Safe Email** — Expected: no warning
2. **Obvious Phishing** — Expected: danger_attachment reason (50 pts)
3. **Subtle Phishing** — Expected: domain_mismatch reason (40 pts)

### Adding Custom Test Cases

Modify `sampleEmails` in MessagePreview.jsx to add more examples.

## Troubleshooting

### Components Not Rendering
- ✓ Check that all imports use correct paths
- ✓ Verify `index.css` is imported in main entry
- ✓ Ensure Tailwind is configured in `tailwind.config.js`

### Styles Not Applying
- ✓ Clear cache: `rm -rf node_modules/.vite`
- ✓ Check CSS variables in `index.css`
- ✓ Verify Tailwind content glob in config

### Import Errors
- ✓ Ensure path alias `@/` is configured (vite or Next.js)
- ✓ Check file extensions (.jsx, .js, .ts)
- ✓ Verify React and React DOM are installed

## Next Steps for Production

If taking this beyond a hackathon MVP:

- [ ] Add backend API for email analysis
- [ ] Implement user authentication
- [ ] Add email integration (Gmail, Outlook, etc.)
- [ ] Store user interaction data for ML training
- [ ] Add advanced rules and ML-based scoring
- [ ] Create admin dashboard for rule management
- [ ] Add i18n for multiple languages
- [ ] Performance optimization (code splitting, lazy loading)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Browser testing (Chrome, Firefox, Safari, Edge)

## Support & Questions

For issues or questions:
1. Check the component JSDoc comments
2. Review the integration guide sections above
3. Check console for error messages
4. Verify all dependencies are installed

---

**Built with ❤️ for the Scyllix hackathon**
