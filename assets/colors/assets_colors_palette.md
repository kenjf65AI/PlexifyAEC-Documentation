# PlexifyAEC UI Color Palette

| Token                | HEX       | RGB            | Usage |
|----------------------|-----------|----------------|-------|
| **Primary / Base**   | `#562CE6` | 86 44 230      | Brand accents, buttons, active icons |
| Primary-Dark         | `#3A1AB9` | 58 26 185      | Gradients (start), hover states, focus rings |
| Primary-Mid          | `#6B4CFF` | 107 76 255     | Gradients (middle), charts |
| Primary-Light        | `#8F74FF` | 143 116 255    | Gradients (end), subtle backgrounds |

### Complementary & Accent

| Token                | HEX       | RGB            | Usage |
|----------------------|-----------|----------------|-------|
| Accent-Teal          | `#1AC6A1` | 26 198 161     | Secondary buttons, highlights |
| Accent-Orange        | `#FF955C` | 255 149 92     | Call-to-action, tags, notifications |
| Info                 | `#2D9CDB` | 45 156 219     | Informational banners, links |

### Semantic Colors

| State    | Token      | HEX       | RGB          | Usage |
|----------|------------|-----------|--------------|-------|
| Success  | `success`  | `#16C784` | 22 199 132   | Compliance passed, OK status |
| Warning  | `warning`  | `#F4B740` | 244 183 64   | Pending review, caution |
| Error    | `error`    | `#FF4D4F` | 255 77 79    | Non-compliance, critical failures |

### Neutral Greys

| Token            | HEX       | Usage |
|------------------|-----------|-------|
| White            | `#FFFFFF` | Text on Primary-Dark, card backgrounds |
| Grey-100         | `#F5F6FA` | App background |
| Grey-200         | `#E1E3EB` | Dividers, disabled button borders |
| Grey-300         | `#C7C9D3` | Input borders, secondary text |
| Grey-400         | `#9EA0AA` | Tertiary text |
| Grey-500         | `#70727E` | Muted icons |
| Grey-600         | `#4A4C57` | Body text on light surfaces |
| Grey-700         | `#2F3136` | Card surfaces (dark theme) |
| Grey-800         | `#1A1A1A` | Main background (dark theme) |

---

## Gradient Definition

```
background: linear-gradient(135deg, #3A1AB9 0%, #562CE6 40%, #6B4CFF 70%, #8F74FF 100%);
```

Use gradients sparingly: primary buttons, header banners, metric cards.

---

## Accessibility Notes

1. Maintain **4.5:1** contrast ratio for body text, **3:1** for large text.  
2. Combine semantic colors with icons or labels for color-blind users.  
3. Primary purple on white and white on Primary-Dark meet contrast guidelines.

---

## Naming Convention

Token names follow **`color-purpose-tone`** (e.g., `primary-dark`, `success`). Reference tokens in CSS/SCSS variables:

```scss
$color-primary-base:   #562CE6;
$color-success:        #16C784;
$color-grey-700:       #2F3136;
```

---

_Last updated: 2025-07-04_
