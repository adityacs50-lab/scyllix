# Card & Badge Component Integration

## What's Been Added

### New UI Components

#### 1. Card Component (`components/ui/Card.jsx`)
A flexible, composable card container system with multiple sub-components:

```javascript
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from './components/ui/Card';
```

**Sub-components:**
- **Card** — Main container (padding, border, shadow, rounded corners)
- **CardHeader** — Top section with title/description
- **CardTitle** — Heading text within header
- **CardDescription** — Subtitle/helper text
- **CardContent** — Main content area
- **CardFooter** — Bottom section with actions
- **CardAction** — Right-side action element (positioned via grid)

**Features:**
- ✅ Responsive grid layout with container queries
- ✅ Flexible spacing and padding
- ✅ Border and shadow support
- ✅ Theme-aware colors (bg-card, text-card-foreground)
- ✅ React.forwardRef for ref forwarding

**Usage Example:**
```javascript
<Card>
  <CardHeader>
    <CardTitle>Email From PayPal</CardTitle>
    <CardDescription>5 minutes ago</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Your account verification is required...</p>
  </CardContent>
  <CardFooter>
    <Button>Verify</Button>
  </CardFooter>
</Card>
```

---

#### 2. Badge Component (`components/ui/Badge.jsx`)
A flexible badge/label component with multiple visual variants:

```javascript
import { Badge } from './components/ui/Badge';
```

**Variants:**
- `default` — Primary color with hover effect
- `secondary` — Secondary color background
- `destructive` — Red/danger color
- `outline` — Bordered style without background

**Features:**
- ✅ CVA-based (Class Variance Authority) for type-safe variants
- ✅ Polymorphic rendering (asChild prop)
- ✅ Icon support (SVG sizing: size-3)
- ✅ Focus states and accessibility
- ✅ Responsive scaling
- ✅ Proper spacing and whitespace handling

**Usage Examples:**
```javascript
// Default style
<Badge>New</Badge>

// Destructive (red)
<Badge variant="destructive">
  <AlertTriangle className="h-3 w-3" />
  Suspicious
</Badge>

// Outline style
<Badge variant="outline">Safe</Badge>

// As a link
<Badge asChild>
  <a href="/details">Learn More</a>
</Badge>
```

---

### Updated Components

#### MessagePreview.jsx
Enhanced with Card and Badge components for a professional appearance:

**Improvements:**
- ✅ Uses Card and Badge for polished email cards
- ✅ Phishing emails show "Suspicious" badge
- ✅ Better visual hierarchy with CardHeader/CardContent
- ✅ Metadata display (links, attachments, timestamps)
- ✅ Hover effects with gradient overlay
- ✅ Risk indicators with Shield icon
- ✅ Helpful tip section at bottom

**New Email Fields:**
- `isPhishing` — Boolean to show/hide suspicious badge
- `timestamp` — When email was received

**Visual Enhancements:**
- Mail icon in avatar circle
- Alert triangle on suspicious emails
- Shield icon with warning message
- Smooth hover scale and shadow effects
- Radial gradient effect on hover

---

## Component Architecture

### Card Layout
```
┌─ Card (flex, gap-6, py-6) ─────────────────────┐
│                                                  │
│ ┌─ CardHeader (grid, px-6) ───────────────────┐ │
│ │  ┌─ CardTitle ─┐                             │ │
│ │  └─ CardDescription ─┐   ┌─ CardAction ─┐   │ │
│ └──────────────────────┴──────────────────┘   │
│                                                  │
│ ┌─ CardContent (px-6) ────────────────────────┐ │
│ │  Content goes here                           │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─ CardFooter (px-6) ─────────────────────────┐ │
│ │  Footer content / buttons                    │ │
│ └─────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

### Badge Variants
```
┌─ Default (blue bg, white text, hover) ─┐
├─ Secondary (subtle bg) ────────────────┤
├─ Destructive (red bg, white text) ─────┤
└─ Outline (border, no fill) ────────────┘
```

---

## Integration with ScyllixDemoFlow

The Card and Badge components integrate seamlessly with existing Scyllix components:

### MessagePreview Uses:
- `Card` — Container for email cards
- `CardHeader` — Sender info and timestamp
- `CardTitle` — Sender name
- `CardDescription` — Timestamp
- `CardContent` — Email preview
- `Badge` — "Suspicious" indicator

### EarlyWarningCard Can Use:
- `Card` — Main container
- `Badge` — Risk level indicator
- `CardHeader` — Title
- `CardContent` — Details

### TeachBackCard Can Use:
- `Card` — Container
- `CardTitle` — Threat name
- `CardContent` — Explanation

---

## Styling & Customization

### CSS Variables Used
```css
--card: oklch(1 0 0)                    /* White */
--card-foreground: oklch(0.145 0 0)     /* Dark text */
--primary: oklch(0.205 0 0)             /* Dark blue */
--primary-foreground: oklch(0.985 0 0)  /* Light text */
--destructive: oklch(0.577 0.245 27.325) /* Red */
--border: oklch(0.922 0 0)              /* Light gray */
--muted-foreground: oklch(0.556 0 0)    /* Gray text */
```

### Tailwind Classes
All components use Tailwind utilities for styling:
- Spacing: `px-6`, `py-6`, `gap-6`
- Typography: `font-semibold`, `text-sm`, `text-xs`
- Colors: `text-muted-foreground`, `bg-primary`
- Borders: `rounded-lg`, `border`
- Effects: `shadow-sm`, `transition-all`

### Customization Examples

**Change Card Background:**
```javascript
<Card className="bg-blue-50">
  {/* Content */}
</Card>
```

**Add Border Color:**
```javascript
<Card className="border-primary">
  {/* Content */}
</Card>
```

**Style CardTitle:**
```javascript
<CardTitle className="text-2xl text-primary">
  Title
</CardTitle>
```

**Badge with Custom Colors:**
```javascript
<Badge className="bg-green-100 text-green-900">
  Safe
</Badge>
```

---

## Benefits

✅ **Component Reusability** — Use Card/Badge across all screens
✅ **Consistent Styling** — Unified look and feel
✅ **Type Safety** — BadgeVariants with CVA
✅ **Accessibility** — Focus states, ARIA attributes
✅ **Responsive** — Container queries, flexible layouts
✅ **Customizable** — Easy to override with className
✅ **Performant** — No unnecessary re-renders
✅ **Professional** — Polished, modern appearance

---

## Files Changed

- ✅ Created `components/ui/Card.jsx`
- ✅ Created `components/ui/Badge.jsx`
- ✅ Updated `components/MessagePreview.jsx`

---

## Next Steps

1. **Use in Other Screens** — Apply Card/Badge to EarlyWarningCard, TeachBackCard, etc.
2. **Extend Variants** — Add more Badge variants as needed
3. **Theme Support** — Update dark theme in index.css if needed
4. **Test** — Verify all components render correctly

---

**Status:** ✅ Complete - Card and Badge components integrated and MessagePreview enhanced
