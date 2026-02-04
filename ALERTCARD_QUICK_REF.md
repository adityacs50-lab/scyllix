# AlertCard Quick Reference

## 📋 One-Page Cheat Sheet

### Import

```javascript
import { AlertCard } from "@/components/AlertCard";
```

### Basic Usage

```jsx
<AlertCard
  onTellMeWhy={handlePrimary}
  onIgnore={handleSecondary}
/>
```

### All Props

```jsx
<AlertCard
  // Content (all optional with sensible defaults)
  title="Hold up 👀"
  subtitle="This message feels a bit off."
  description="Scyllix noticed something worth checking."
  primaryButtonText="Tell me why"
  secondaryButtonText="Ignore"
  
  // Style
  variant="warning"           // "warning" | "info" | "error"
  className="custom-classes"  // Additional Tailwind classes
  
  // Callbacks
  onTellMeWhy={() => {}}
  onIgnore={() => {}}
  
  // Ref
  ref={ref}
/>
```

---

## 🎨 Variants (Colors)

### Warning (Default - Yellow/Amber)
```jsx
<AlertCard variant="warning" />
```
Best for: Regular alerts, cautions

### Info (Blue/Cyan)
```jsx
<AlertCard variant="info" />
```
Best for: Tips, notifications, informational

### Error (Red/Pink)
```jsx
<AlertCard variant="error" />
```
Best for: High-risk alerts, dangers

---

## 🔄 Common Patterns

### With State
```jsx
const [show, setShow] = useState(true);

{show && (
  <AlertCard onIgnore={() => setShow(false)} />
)}
```

### Dynamic Variant
```jsx
<AlertCard
  variant={riskScore > 75 ? "error" : "warning"}
  title={riskScore > 75 ? "High Risk!" : "Suspicious"}
/>
```

### Show/Hide Button
```jsx
const [show, setShow] = useState(true);

{!show && <button onClick={() => setShow(true)}>Show Alert</button>}
{show && <AlertCard onIgnore={() => setShow(false)} />}
```

---

## 📱 Responsive

- **Mobile**: Buttons stack vertically
- **Desktop (sm+)**: Buttons side-by-side
- Auto-adjusts to container width

---

## 🎬 Animations

- **Entrance**: Scale 0.95 → 1 with fade-in (spring physics)
- **Icon**: Rotate -10° → 0° on mount
- **Exit**: Scale 0.95 with fade-out
- Smooth spring transitions (stiffness: 300, damping: 25)

---

## 🌓 Dark Mode

Automatic! Uses Tailwind's `.dark` class:
```html
<!-- Light mode -->
<div>...</div>

<!-- Dark mode -->
<div class="dark">...</div>
```

---

## 🎨 Customization

### Change Animation Speed
Edit AlertCard.jsx, line ~95:
```jsx
stiffness: 400,  // Higher = faster (default: 300)
damping: 20,     // Higher = less bouncy (default: 25)
```

### Add Custom Classes
```jsx
<AlertCard className="max-w-2xl ring-2 ring-primary" />
```

### Override Colors
Use component variant system:
```jsx
variant="info"  // Blue theme
variant="error" // Red theme
```

---

## ✅ Integration Checklist

- [ ] Import AlertCard component
- [ ] Pass onTellMeWhy and onIgnore callbacks
- [ ] Choose variant (warning/info/error)
- [ ] Test with default content
- [ ] Customize text as needed
- [ ] Verify animations are smooth
- [ ] Test dark mode
- [ ] Check mobile responsiveness

---

## 🧪 Testing

### Run Demo
```jsx
import AlertCardDemo from "@/AlertCardDemo";

// In your app:
<AlertCardDemo />
```

### Manual Tests
1. Click "Tell me why" button → console logs
2. Click "Ignore" button → console logs
3. Try all 3 variants
4. Toggle dark mode
5. Test on mobile (buttons should stack)
6. Inspect animations (should be smooth)

---

## 🚀 Where to Use

✅ Replace EarlyWarningCard for quick alerts  
✅ Add to MessagePreview for risky emails  
✅ Show on success screen with completion message  
✅ Display tips on LearningTip screen  
✅ Add security warnings anywhere  

---

## 📚 Learn More

- **ALERTCARD_INTEGRATION.md** — Full API & examples
- **ALERTCARD_SUMMARY.md** — Detailed overview
- **AlertCardDemo.jsx** — Interactive demo
- **AlertCard.jsx** — Source code (145 lines)

---

## 🎯 Next Steps

1. **View demo** → Run `AlertCardDemo.jsx`
2. **Read docs** → See `ALERTCARD_INTEGRATION.md`
3. **Try it** → Add to `ScyllixDemoFlow.jsx`
4. **Customize** → Update text, variant, callbacks
5. **Deploy** → Use in production

---

## 💡 Pro Tips

- Use `variant="error"` for high-risk scores (>75)
- Use `variant="info"` for security tips
- Customize button text for better UX
- Combine with state to show/hide dynamically
- Test animations by slowing browser dev tools (Chrome DevTools → 3x slow)

---

## 📊 At a Glance

| Aspect | Details |
|--------|---------|
| **File** | AlertCard.jsx (145 lines) |
| **Props** | 8+ with sensible defaults |
| **Variants** | 3 (warning, info, error) |
| **Animations** | Spring-based entrance/exit |
| **Responsive** | Mobile stacked, desktop horizontal |
| **Dark mode** | Built-in auto-detection |
| **Dependencies** | framer-motion, lucide-react (existing) |
| **Browser support** | Chrome 90+, Firefox 88+, Safari 14+ |

---

**Quick Links**
- [Full Integration Guide](ALERTCARD_INTEGRATION.md)
- [Detailed Summary](ALERTCARD_SUMMARY.md)
- [Component Source](components/AlertCard.jsx)
- [Demo Showcase](AlertCardDemo.jsx)

