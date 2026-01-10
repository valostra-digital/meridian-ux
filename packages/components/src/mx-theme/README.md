# mx-theme

A theme provider component that generates and applies design tokens at the `:root` scope, making them globally available for all Meridian components and consumer application styling.

## Installation

```bash
npm install @meridian-ux/components
```

## Usage

```typescript
import '@meridian-ux/components/mx-theme';
```

```html
<mx-theme>
  <mx-button>Click me</mx-button>
</mx-theme>
```

## Overview

The `mx-theme` component provides a comprehensive design system based on Ant Design tokens. It automatically generates CSS custom properties (variables) and applies them to the document root (`:root`), making them available globally throughout your application.

### Key Features

- **Global Scope**: Variables are set on `:root`, accessible anywhere in your CSS
- **Automatic Color Palettes**: Generates 10-shade color palettes from seed colors
- **Semantic Aliases**: Provides meaningful variable names like `--mx-color-primary-hover`
- **Comprehensive Tokens**: Includes typography, spacing, motion, shadows, and more
- **Dynamic Updates**: Theme updates when properties change
- **Clean Teardown**: Removes variables when component is disconnected

## API

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `primary-color` | `string` | `'#1677ff'` | Primary brand color in hex format |

### Future Attributes (Extensibility)

The component can be extended to support additional attributes:
- `success-color` - Success state color
- `warning-color` - Warning state color
- `error-color` - Error state color
- `info-color` - Info state color

## Examples

### Default Theme

```html
<mx-theme>
  <your-app></your-app>
</mx-theme>
```

### Custom Primary Color

```html
<!-- Green theme -->
<mx-theme primary-color="#52c41a">
  <your-app></your-app>
</mx-theme>

<!-- Purple theme -->
<mx-theme primary-color="#722ed1">
  <your-app></your-app>
</mx-theme>

<!-- Red theme -->
<mx-theme primary-color="#f5222d">
  <your-app></your-app>
</mx-theme>
```

### Using Theme Variables in Your CSS

Since variables are applied to `:root`, you can use them anywhere in your application:

```css
/* In your component styles */
.my-component {
  /* Colors */
  color: var(--mx-color-primary);
  background-color: var(--mx-color-primary-bg);
  border: 1px solid var(--mx-color-border);
  
  /* Typography */
  font-family: var(--mx-font-family);
  font-size: var(--mx-font-size);
  line-height: var(--mx-line-height);
  
  /* Spacing */
  padding: var(--mx-padding);
  margin: var(--mx-margin);
  
  /* Border radius */
  border-radius: var(--mx-border-radius);
  
  /* Shadows */
  box-shadow: var(--mx-box-shadow);
}

/* Hover states */
.my-button:hover {
  background-color: var(--mx-color-primary-hover);
}

/* Active states */
.my-button:active {
  background-color: var(--mx-color-primary-active);
}
```

### Using with JavaScript/TypeScript

```typescript
// Access theme variables programmatically
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--mx-color-primary');

console.log('Current primary color:', primaryColor);

// You can also update the theme dynamically
const themeElement = document.querySelector('mx-theme');
if (themeElement) {
  themeElement.setAttribute('primary-color', '#1890ff');
}
```

## Available CSS Variables

The component generates and applies the following CSS variables to `:root`:

### Color Variables

#### Primary Colors (10-shade palette)
- `--mx-color-primary-1` through `--mx-color-primary-10`
- `--mx-color-primary` - Base color (shade 6)
- `--mx-color-primary-hover` - Lighter for hover states (shade 5)
- `--mx-color-primary-active` - Darker for active states (shade 7)
- `--mx-color-primary-bg` - Lightest for backgrounds (shade 1)
- `--mx-color-primary-bg-hover` - Background hover (shade 2)
- `--mx-color-primary-border` - Border color (shade 3)
- `--mx-color-primary-border-hover` - Border hover (shade 4)

#### Success Colors
Same pattern as primary: `--mx-color-success`, `--mx-color-success-hover`, etc.

#### Warning Colors
Same pattern as primary: `--mx-color-warning`, `--mx-color-warning-hover`, etc.

#### Error Colors
Same pattern as primary: `--mx-color-error`, `--mx-color-error-hover`, etc.

#### Info Colors
Same pattern as primary: `--mx-color-info`, `--mx-color-info-hover`, etc.

#### Neutral Colors
- `--mx-color-text` - Primary text color
- `--mx-color-text-secondary` - Secondary text color
- `--mx-color-text-tertiary` - Tertiary text color
- `--mx-color-text-quaternary` - Quaternary text color
- `--mx-color-text-disabled` - Disabled text color
- `--mx-color-border` - Primary border color
- `--mx-color-border-secondary` - Secondary border color
- `--mx-color-fill` - Primary fill color
- `--mx-color-fill-secondary` - Secondary fill color
- `--mx-color-fill-tertiary` - Tertiary fill color
- `--mx-color-fill-quaternary` - Quaternary fill color
- `--mx-color-bg-base` - Base background color
- `--mx-color-bg-layout` - Layout background color
- `--mx-color-bg-container` - Container background color
- `--mx-color-bg-elevated` - Elevated surface background
- `--mx-color-bg-spotlight` - Spotlight/modal overlay background
- `--mx-color-bg-mask` - Mask/overlay background

### Typography Variables

#### Font Sizes
- `--mx-font-size` - Base font size (14px)
- `--mx-font-size-sm` - Small font size (12px)
- `--mx-font-size-lg` - Large font size (16px)
- `--mx-font-size-xl` - Extra large font size (20px)
- `--mx-font-size-heading-1` - Heading 1 size (38px)
- `--mx-font-size-heading-2` - Heading 2 size (30px)
- `--mx-font-size-heading-3` - Heading 3 size (24px)
- `--mx-font-size-heading-4` - Heading 4 size (20px)
- `--mx-font-size-heading-5` - Heading 5 size (16px)

#### Font Families
- `--mx-font-family` - System font stack
- `--mx-font-family-code` - Monospace font stack

#### Line Heights
- `--mx-line-height` - Base line height (1.5715)
- `--mx-line-height-sm` - Small line height (1.66)
- `--mx-line-height-lg` - Large line height (1.5)
- `--mx-line-height-heading-1` through `--mx-line-height-heading-5`

#### Font Weights
- `--mx-font-weight-strong` - Bold font weight (600)

### Spacing Variables

#### Size Units
- `--mx-size-step` - Base size step (4px)
- `--mx-size-unit` - Base size unit (4px)

#### Padding
- `--mx-padding` - Base padding (16px)
- `--mx-padding-xs` - Extra small padding (8px)
- `--mx-padding-sm` - Small padding (12px)
- `--mx-padding-lg` - Large padding (24px)
- `--mx-padding-xl` - Extra large padding (32px)
- `--mx-padding-content-horizontal` - Horizontal content padding (16px)
- `--mx-padding-content-vertical` - Vertical content padding (12px)

#### Margin
- `--mx-margin` - Base margin (16px)
- `--mx-margin-xs` - Extra small margin (8px)
- `--mx-margin-sm` - Small margin (12px)
- `--mx-margin-lg` - Large margin (24px)
- `--mx-margin-xl` - Extra large margin (32px)
- `--mx-margin-xxl` - Double extra large margin (48px)

### Border Variables

#### Border Radius
- `--mx-border-radius` - Base border radius (6px)
- `--mx-border-radius-xs` - Extra small radius (2px)
- `--mx-border-radius-sm` - Small radius (4px)
- `--mx-border-radius-lg` - Large radius (8px)
- `--mx-border-radius-outer` - Outer radius (4px)

#### Border Width
- `--mx-line-width` - Base line width (1px)
- `--mx-line-width-bold` - Bold line width (2px)
- `--mx-line-width-focus` - Focus line width (4px)

### Control Heights

- `--mx-control-height` - Base control height (32px)
- `--mx-control-height-sm` - Small control height (24px)
- `--mx-control-height-lg` - Large control height (40px)
- `--mx-control-height-xs` - Extra small control height (16px)

### Motion Variables

#### Easing Functions
- `--mx-motion-ease-in-out` - Cubic bezier for smooth transitions
- `--mx-motion-ease-out` - Cubic bezier for ease out
- `--mx-motion-ease-in` - Cubic bezier for ease in
- `--mx-motion-ease-out-back` - Cubic bezier with back easing
- `--mx-motion-ease-in-back` - Cubic bezier with back easing in
- `--mx-motion-ease-out-circ` - Circular ease out
- `--mx-motion-ease-in-circ` - Circular ease in
- `--mx-motion-ease-in-out-circ` - Circular ease in-out

#### Duration
- `--mx-motion-duration-fast` - Fast animation (0.1s)
- `--mx-motion-duration-mid` - Medium animation (0.2s)
- `--mx-motion-duration-slow` - Slow animation (0.3s)

#### Motion Units
- `--mx-motion-unit` - Base motion unit (0.1)
- `--mx-motion-base` - Base motion value (0)

### Shadow Variables

- `--mx-box-shadow` - Primary box shadow
- `--mx-box-shadow-secondary` - Secondary box shadow
- `--mx-box-shadow-tertiary` - Tertiary/subtle box shadow

### Z-Index Variables

- `--mx-z-index-base` - Base z-index (0)
- `--mx-z-index-popup-base` - Popup base z-index (1000)

### Opacity Variables

- `--mx-opacity-loading` - Loading state opacity (0.65)
- `--mx-opacity-image` - Image opacity (1)

### Screen Breakpoints

- `--mx-screen-xs` - Extra small screen (480px)
- `--mx-screen-sm` - Small screen (576px)
- `--mx-screen-md` - Medium screen (768px)
- `--mx-screen-lg` - Large screen (992px)
- `--mx-screen-xl` - Extra large screen (1200px)
- `--mx-screen-xxl` - Double extra large screen (1600px)

### Other Variables

- `--mx-wireframe` - Wireframe mode toggle (false)

## Practical Examples

### Creating a Custom Card Component

```css
.custom-card {
  background: var(--mx-color-bg-container);
  border: 1px solid var(--mx-color-border);
  border-radius: var(--mx-border-radius-lg);
  padding: var(--mx-padding-lg);
  box-shadow: var(--mx-box-shadow-tertiary);
  transition: all var(--mx-motion-duration-mid) var(--mx-motion-ease-in-out);
}

.custom-card:hover {
  border-color: var(--mx-color-primary);
  box-shadow: var(--mx-box-shadow);
}

.custom-card-title {
  color: var(--mx-color-text);
  font-size: var(--mx-font-size-lg);
  font-weight: var(--mx-font-weight-strong);
  line-height: var(--mx-line-height-lg);
  margin-bottom: var(--mx-margin-sm);
}

.custom-card-content {
  color: var(--mx-color-text-secondary);
  font-size: var(--mx-font-size);
  line-height: var(--mx-line-height);
}
```

### Responsive Design with Breakpoints

```css
.container {
  padding: var(--mx-padding);
}

@media (min-width: 768px) { /* md breakpoint */
  .container {
    padding: var(--mx-padding-lg);
  }
}

@media (min-width: 1200px) { /* xl breakpoint */
  .container {
    padding: var(--mx-padding-xl);
  }
}
```

### Creating Consistent Animations

```css
.animated-element {
  transition: all var(--mx-motion-duration-mid) var(--mx-motion-ease-out);
}

.slide-enter {
  animation: slideIn var(--mx-motion-duration-slow) var(--mx-motion-ease-out-back);
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

### Status Indicators

```css
.status-success {
  color: var(--mx-color-success);
  background-color: var(--mx-color-success-bg);
  border: 1px solid var(--mx-color-success-border);
}

.status-warning {
  color: var(--mx-color-warning);
  background-color: var(--mx-color-warning-bg);
  border: 1px solid var(--mx-color-warning-border);
}

.status-error {
  color: var(--mx-color-error);
  background-color: var(--mx-color-error-bg);
  border: 1px solid var(--mx-color-error-border);
}
```

## Color System

The component uses the [@ant-design/colors](https://www.npmjs.com/package/@ant-design/colors) package to generate scientifically-designed color palettes. Each seed color generates a 10-shade palette:

- **Shade 1**: Lightest (backgrounds)
- **Shade 2-4**: Light tones (hover backgrounds, borders)
- **Shade 5**: Light primary (hover states)
- **Shade 6**: Base color (primary usage)
- **Shade 7**: Dark primary (active states)
- **Shade 8-10**: Darkest tones (text, emphasis)

This ensures consistent color relationships and accessibility.

## Best Practices

### 1. Place at Application Root

Place the `mx-theme` component at or near your application root to ensure all components have access to theme variables:

```html
<!DOCTYPE html>
<html>
<body>
  <mx-theme primary-color="#1677ff">
    <your-app-root></your-app-root>
  </mx-theme>
</body>
</html>
```

### 2. Use Semantic Variables

Prefer semantic variable names over shade numbers:

```css
/* Good */
.button:hover {
  background-color: var(--mx-color-primary-hover);
}

/* Less maintainable */
.button:hover {
  background-color: var(--mx-color-primary-5);
}
```

### 3. Respect the Design System

Use the provided spacing scale instead of arbitrary values:

```css
/* Good */
.element {
  padding: var(--mx-padding-sm);
  margin-bottom: var(--mx-margin);
}

/* Avoid */
.element {
  padding: 13px;
  margin-bottom: 17px;
}
```

### 4. Leverage Motion Tokens

Use motion tokens for consistent animations:

```css
/* Good */
.element {
  transition: all var(--mx-motion-duration-mid) var(--mx-motion-ease-out);
}

/* Avoid */
.element {
  transition: all 0.23s ease;
}
```

## TypeScript Support

The component is fully typed and provides TypeScript definitions:

```typescript
import { MXTheme } from '@meridian-ux/components/mx-theme';

const theme = document.querySelector('mx-theme') as MXTheme;
theme.primaryColor = '#52c41a'; // Type-safe property access
```

## Lifecycle

### Initialization
When the component connects to the DOM:
1. Generates color palettes from seed colors
2. Converts design tokens to CSS variables
3. Applies all variables to `document.documentElement` (`:root`)

### Updates
When `primary-color` attribute changes:
1. Regenerates the primary color palette
2. Updates all related CSS variables
3. Changes are immediately reflected throughout the application

### Cleanup
When the component disconnects from the DOM:
1. Removes all applied CSS variables from `:root`
2. Cleans up internal state
3. Prevents memory leaks and variable pollution

## Browser Support

Works in all modern browsers that support:
- Web Components (Custom Elements v1)
- Shadow DOM v1
- ES2015+
- CSS Custom Properties

## Performance Considerations

- **Caching**: The component caches the current theme to avoid unnecessary regeneration
- **Efficient Updates**: Only regenerates when `primary-color` actually changes
- **No Re-renders**: Uses direct DOM manipulation for CSS variables instead of re-rendering
- **Minimal Overhead**: `display: contents` ensures no layout impact

## Advanced Usage

### Multiple Theme Instances

While the component sets variables globally, you can dynamically switch themes:

```typescript
function switchTheme(color: string) {
  const theme = document.querySelector('mx-theme');
  if (theme) {
    theme.setAttribute('primary-color', color);
  }
}

// Switch to different themes
switchTheme('#52c41a'); // Green
switchTheme('#722ed1'); // Purple
switchTheme('#eb2f96'); // Magenta
```

### Theme Persistence

```typescript
// Save theme preference
function saveTheme(color: string) {
  localStorage.setItem('theme-color', color);
  const theme = document.querySelector('mx-theme');
  if (theme) {
    theme.setAttribute('primary-color', color);
  }
}

// Load theme on app start
function loadTheme() {
  const savedColor = localStorage.getItem('theme-color');
  if (savedColor) {
    const theme = document.querySelector('mx-theme');
    if (theme) {
      theme.setAttribute('primary-color', savedColor);
    }
  }
}
```

### Dark Mode Support

To implement dark mode, you would need to extend the component or use additional logic to swap color values. Future versions may include built-in dark mode support.

## Migration Guide

If you were previously using the component when it set variables on the host element, no code changes are needed. The component now sets variables on `:root`, which provides better global availability while maintaining backward compatibility with descendant components.

## Troubleshooting

### Variables Not Available

If variables aren't accessible in your CSS:
- Ensure `mx-theme` is present in the DOM
- Check browser DevTools to verify variables are set on `:root`
- Verify you're using correct variable names (prefixed with `--mx-`)

### Theme Not Updating

If theme changes aren't reflected:
- Check that `primary-color` attribute is properly formatted (hex color)
- Verify the attribute is actually changing
- Ensure no other CSS is overriding theme variables with `!important`

### Performance Issues

If you experience performance issues:
- Avoid creating multiple `mx-theme` instances
- Don't rapidly change `primary-color` (debounce updates if needed)
- Use browser DevTools to profile performance

## Related Components

- [mx-button](../mx-button/README.md) - Uses theme variables for styling
- mx-icon - Uses theme colors for icon fills
- All Meridian components automatically consume theme variables

## License

See the main package LICENSE file for details.
