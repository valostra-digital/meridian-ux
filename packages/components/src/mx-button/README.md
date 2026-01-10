# mx-button

A flexible and customizable button component built with Lit for triggering operations and actions.

## Installation

```bash
npm install @meridian-ux/components
```

## Usage

```typescript
import '@meridian-ux/components/mx-button';
```

```html
<mx-button>Click me</mx-button>
```

## API

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | `ButtonType` | `'default'` | Button type: `default`, `primary`, `dashed`, `text`, `link` |
| `variant` | `ButtonVariant` | - | Button variant (overrides type): `outlined`, `solid`, `dashed`, `filled`, `text`, `link` |
| `color` | `ButtonColor` | `'default'` | Button color from preset colors |
| `size` | `ButtonSize` | `'middle'` | Button size: `small`, `middle`, `large` |
| `shape` | `ButtonShape` | `'default'` | Button shape: `default`, `circle`, `round` |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `danger` | `boolean` | `false` | Set danger status (red color scheme) |
| `loading` | `boolean` | `false` | Show loading state with spinner |
| `ghost` | `boolean` | `false` | Make background transparent with white text/border |
| `block` | `boolean` | `false` | Fit button width to its parent width |
| `href` | `string` | `''` | Link URL (renders as anchor tag) |
| `target` | `string` | `''` | Link target (e.g., `_blank`, `_self`) |
| `icon-placement` | `IconPosition` | `'start'` | Icon position: `start` or `end` |
| `html-type` | `string` | `'button'` | Native button type: `button`, `submit`, `reset` |

### Types

```typescript
type ButtonType = 'default' | 'primary' | 'dashed' | 'text' | 'link';
type ButtonSize = 'small' | 'middle' | 'large';
type ButtonShape = 'default' | 'circle' | 'round';
type ButtonVariant = 'outlined' | 'solid' | 'dashed' | 'filled' | 'text' | 'link';
type ButtonColor = 'default' | 'primary' | 'danger' | 'blue' | 'purple' | 'cyan' | 
                   'green' | 'magenta' | 'pink' | 'red' | 'orange' | 'yellow' | 
                   'volcano' | 'geekblue' | 'lime' | 'gold';
type IconPosition = 'start' | 'end';
```

### Slots

| Slot | Description |
|------|-------------|
| (default) | Button text content |
| `icon` | Icon content |

### Events

| Event | Description |
|-------|-------------|
| `click` | Fired when button is clicked (detail contains `originalEvent`) |

## Examples

### Basic Buttons

```html
<!-- Default button -->
<mx-button>Default</mx-button>

<!-- Primary button -->
<mx-button type="primary">Primary</mx-button>

<!-- Dashed button -->
<mx-button type="dashed">Dashed</mx-button>

<!-- Text button -->
<mx-button type="text">Text</mx-button>

<!-- Link button -->
<mx-button type="link">Link</mx-button>
```

### Button Variants

The `variant` attribute provides an alternative way to style buttons and takes precedence over `type`:

```html
<mx-button variant="outlined">Outlined</mx-button>
<mx-button variant="solid">Solid</mx-button>
<mx-button variant="filled">Filled</mx-button>
```

### Button Sizes

```html
<mx-button size="small">Small</mx-button>
<mx-button size="middle">Middle</mx-button>
<mx-button size="large">Large</mx-button>
```

### Button Shapes

```html
<mx-button shape="default">Default Shape</mx-button>
<mx-button shape="round">Round Shape</mx-button>
<mx-button shape="circle">
  <mx-icon slot="icon" svg="..."></mx-icon>
</mx-button>
```

### Danger State

```html
<!-- Danger primary button -->
<mx-button type="primary" danger>Delete</mx-button>

<!-- Danger outlined button -->
<mx-button danger>Delete</mx-button>

<!-- Danger text button -->
<mx-button type="text" danger>Delete</mx-button>
```

### Loading State

```html
<mx-button loading>Loading</mx-button>
<mx-button type="primary" loading>Loading</mx-button>
```

### Disabled State

```html
<mx-button disabled>Disabled</mx-button>
<mx-button type="primary" disabled>Disabled</mx-button>
```

### Ghost Button

Useful for colored backgrounds:

```html
<div style="background: #1677ff; padding: 20px;">
  <mx-button ghost>Ghost Button</mx-button>
  <mx-button type="primary" ghost>Ghost Primary</mx-button>
</div>
```

### Block Button

```html
<mx-button block>Block Button</mx-button>
<mx-button type="primary" block>Primary Block Button</mx-button>
```

### Buttons with Icons

```html
<!-- Icon at start (default) -->
<mx-button>
  <mx-icon slot="icon" svg='<svg>...</svg>'></mx-icon>
  Search
</mx-button>

<!-- Icon at end -->
<mx-button icon-placement="end">
  Next
  <mx-icon slot="icon" svg='<svg>...</svg>'></mx-icon>
</mx-button>

<!-- Icon only (circle shape recommended) -->
<mx-button shape="circle">
  <mx-icon slot="icon" svg='<svg>...</svg>'></mx-icon>
</mx-button>
```

### Link Buttons

```html
<!-- As styled link -->
<mx-button type="link" href="https://example.com">Visit Website</mx-button>

<!-- Opens in new tab -->
<mx-button href="https://example.com" target="_blank">
  Open in New Tab
</mx-button>
```

### Form Buttons

```html
<form>
  <mx-button html-type="submit" type="primary">Submit</mx-button>
  <mx-button html-type="reset">Reset</mx-button>
</form>
```

## CSS Custom Properties

The component uses CSS custom properties for theming. You can override these in your application:

```css
:root {
  /* Colors */
  --mx-color-primary: #1677ff;
  --mx-color-primary-hover: #4096ff;
  --mx-color-primary-active: #0958d9;
  --mx-color-error: #ff4d4f;
  --mx-color-error-hover: #ff7875;
  --mx-color-text: rgba(0, 0, 0, 0.88);
  --mx-color-border: #d9d9d9;
  --mx-color-bg-container: #ffffff;
  --mx-color-fill-tertiary: rgba(0, 0, 0, 0.04);
  --mx-color-fill-secondary: rgba(0, 0, 0, 0.06);
  
  /* Sizes */
  --mx-control-height: 32px;
  --mx-control-height-lg: 40px;
  --mx-control-height-sm: 24px;
  --mx-font-size: 14px;
  --mx-font-size-lg: 16px;
  --mx-font-weight: 400;
  
  /* Border radius */
  --mx-border-radius: 6px;
  --mx-border-radius-lg: 8px;
  --mx-border-radius-sm: 4px;
}
```

## Event Handling

```typescript
const button = document.querySelector('mx-button');
button.addEventListener('click', (event) => {
  console.log('Button clicked', event.detail.originalEvent);
});
```

## Styling

The component is styled using Lit's shadow DOM. For host-level styling:

```css
mx-button {
  margin: 10px;
}

mx-button[block] {
  margin-bottom: 10px;
}
```

## Accessibility

- The component uses semantic `<button>` or `<a>` elements
- Disabled state is communicated via `disabled` attribute and `aria-disabled`
- Loading state prevents interaction and shows visual feedback
- Proper keyboard navigation and focus management
- ARIA attributes are automatically applied

## Browser Support

The component works in all modern browsers that support:
- Web Components
- Shadow DOM
- ES2015+

## License

See the main package LICENSE file for details.
