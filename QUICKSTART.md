# Scyllix Quick Start (5 Minutes)

## TL;DR

Get Scyllix running in 5 minutes:

### 1. Install Packages (1 min)
```bash
npm install framer-motion @radix-ui/react-slot class-variance-authority lucide-react clsx tailwind-merge
```

### 2. Import in Your App (1 min)
```javascript
// main.jsx or App.jsx
import ScyllixDemoFlow from './ScyllixDemoFlow';
import './index.css';

export default function App() {
  return <ScyllixDemoFlow />;
}
```

### 3. Run Dev Server (1 min)
```bash
npm run dev
```

### 4. Try It Out (2 min)
- Open `http://localhost:5173`
- Click "Try a risky message"
- Click an email to see phishing detection in action

## What You're Looking At

| Component | Purpose |
|-----------|---------|
| **ScyllixHero** | Welcome screen with interactive demo card |
| **MessagePreview** | List of sample emails |
| **EarlyWarningCard** | Risk detection alert |
| **TeachBackCard** | Detailed explanation of threat |
| **LearningTip** | Security lesson |
| **SuccessScreen** | Celebration screen |

## How It Works

1. User clicks an email
2. `assessPhishingRisk()` analyzes it
3. If risky: shows warning with primary reason
4. User learns why it's dangerous
5. User gets actionable tip
6. Returns to start

## Key Files

```
securityCore.js       ← Detection logic
reasonMap.js          ← Explanations
ScyllixDemoFlow.jsx   ← Orchestrator
components/           ← All UI components
```

## Customize It

### Change Sample Emails
Edit `sampleEmails` in [components/MessagePreview.jsx](components/MessagePreview.jsx)

### Change Explanations
Edit `reasonMap` in [reasonMap.js](reasonMap.js)

### Change Styling
Edit CSS variables in [index.css](index.css)

### Add Detection Rules
Edit `securityCore.js` and update:
1. `REASON_PRIORITY` map
2. `reasonMap.js` with explanation

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Components not rendering | Check `import './index.css'` in main |
| Styles not applying | Clear cache: `rm -rf node_modules/.vite` |
| Import errors | Verify `@` path alias in `vite.config.js` |
| Animations stuttering | Check browser performance (DevTools) |

## Next Steps

- ✅ Read [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) for full details
- ✅ Use [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) to verify everything
- ✅ Customize components to match your brand
- ✅ Deploy to production

## Questions?

Check the JSDoc comments in component files for detailed documentation.

---

**Ready?** Run `npm run dev` and start tinkering! 🚀
