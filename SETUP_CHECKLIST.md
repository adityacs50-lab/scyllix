# Scyllix Project Setup Checklist

Use this checklist to ensure all components are properly set up.

## Prerequisites
- [ ] Node.js 16+ installed
- [ ] npm or yarn available
- [ ] Text editor/IDE ready

## Installation Steps

### Step 1: Install NPM Packages
```bash
npm install framer-motion @radix-ui/react-slot class-variance-authority lucide-react clsx tailwind-merge
```
- [ ] Installation completed without errors

### Step 2: Verify Tailwind CSS
```bash
npm list tailwindcss
```
- [ ] Tailwind CSS v3 or v4 is installed

### Step 3: Configure Path Aliases
- [ ] If using Vite: Updated `vite.config.js` with `@` alias
- [ ] If using Next.js: Updated `jsconfig.json` or `tsconfig.json` with `@` path

### Step 4: Import CSS
- [ ] Added `import './index.css'` to main entry point
- [ ] Verified `index.css` exists in project root

## File Structure Verification

- [ ] `securityCore.js` — Security detection logic
- [ ] `reasonMap.js` — Reason → explanation mapping
- [ ] `ScyllixDemoFlow.jsx` — Main orchestrator
- [ ] `index.css` — Tailwind configuration
- [ ] `lib/utils.ts` — Utility functions
- [ ] `components/ScyllixHero.jsx`
- [ ] `components/MessagePreview.jsx`
- [ ] `components/EarlyWarningCard.jsx`
- [ ] `components/TeachBackCard.jsx`
- [ ] `components/LearningTip.jsx`
- [ ] `components/SuccessScreen.jsx`
- [ ] `components/ui/Button.jsx`
- [ ] `components/ui/InteractiveCard.jsx`
- [ ] `components/ui/WarningGraphic.jsx`

## Component Integration

### Main App
```javascript
import ScyllixDemoFlow from './ScyllixDemoFlow';
import './index.css';

export default function App() {
  return <ScyllixDemoFlow />;
}
```
- [ ] Main app imports ScyllixDemoFlow
- [ ] CSS is imported before components

### Imports in ScyllixDemoFlow.jsx
- [ ] `import { assessPhishingRisk } from "./securityCore"`
- [ ] `import { getReasonExplanation } from "./reasonMap"`
- [ ] All 6 component imports are correct

### Component Props
- [ ] ScyllixHero receives `onStart` callback
- [ ] MessagePreview receives `onClickMessage` callback
- [ ] EarlyWarningCard receives `riskScore`, `primaryReason`, `onExplain`, `onIgnore`
- [ ] TeachBackCard receives `title`, `explanation`, `onNext`
- [ ] LearningTip receives `tip`, `onNext`
- [ ] SuccessScreen receives `onReset`

## Testing

### Visual Tests
- [ ] Hero screen loads with animated badge
- [ ] Interactive card has 3D tilt effect on hover
- [ ] Warning overlay appears when card is clicked
- [ ] All buttons are clickable and styled

### Flow Tests
1. Start → Message
   - [ ] Hero "Try a risky message" button advances to message screen
   - [ ] Sample emails are displayed

2. Message → Analysis
   - [ ] Clicking an email triggers analysis
   - [ ] Safe email doesn't show warning
   - [ ] Risky email advances to warning

3. Warning → Explanation
   - [ ] Risk score is displayed correctly
   - [ ] "Learn More" button advances to explanation
   - [ ] "Dismiss" button returns to message

4. Explanation → Learning
   - [ ] Title and explanation are displayed
   - [ ] "Got It!" button advances to learning

5. Learning → Success
   - [ ] Learning tip is displayed
   - [ ] "Finish" button advances to success

6. Success → Reset
   - [ ] "Try Another" button returns to hero
   - [ ] State is properly reset

## Styling Verification

- [ ] Text is readable (good contrast)
- [ ] Buttons are clickable and properly styled
- [ ] Cards have proper spacing and borders
- [ ] Dark and light modes work (if supported)
- [ ] Animations are smooth and responsive

## Browser Testing

- [ ] Works in Chrome/Chromium
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works on mobile (responsive)
- [ ] No console errors

## Performance

- [ ] Page loads quickly
- [ ] Animations are smooth (60fps)
- [ ] No memory leaks (check DevTools)
- [ ] No layout shifts

## Accessibility

- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Color contrast passes WCAG standards
- [ ] Motion respects `prefers-reduced-motion`
- [ ] Form inputs are properly labeled

## Deployment Ready

- [ ] All console warnings/errors fixed
- [ ] Environment variables are set
- [ ] Build completes without errors: `npm run build`
- [ ] Production build works: tested locally

## Post-Launch

- [ ] Monitor error tracking (e.g., Sentry)
- [ ] Track user analytics
- [ ] Gather user feedback
- [ ] Plan follow-up features

---

**Checklist Version:** 1.0  
**Last Updated:** Feb 2026
