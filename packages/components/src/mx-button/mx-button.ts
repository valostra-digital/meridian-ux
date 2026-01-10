import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type ButtonType = 'default' | 'primary' | 'dashed' | 'text' | 'link';
export type ButtonSize = 'small' | 'middle' | 'large';
export type ButtonShape = 'default' | 'circle' | 'round';
export type ButtonVariant = 'outlined' | 'solid' | 'dashed' | 'filled' | 'text' | 'link';
export type ButtonColor = 'default' | 'primary' | 'danger' | 'blue' | 'purple' | 'cyan' | 'green' | 'magenta' | 'pink' | 'red' | 'orange' | 'yellow' | 'volcano' | 'geekblue' | 'lime' | 'gold';
export type IconPosition = 'start' | 'end';

/**
 * Button component for triggering operations.
 * 
 * @element mx-button
 * 
 * @attr {ButtonType} type - Button type: default, primary, dashed, text, link
 * @attr {ButtonVariant} variant - Button variant: outlined, solid, dashed, filled, text, link
 * @attr {ButtonColor} color - Button color (supports preset colors)
 * @attr {ButtonSize} size - Button size: small, middle, large
 * @attr {ButtonShape} shape - Button shape: default, circle, round
 * @attr {boolean} disabled - Whether the button is disabled
 * @attr {boolean} danger - Set danger status
 * @attr {boolean} loading - Show loading state
 * @attr {boolean} ghost - Make background transparent
 * @attr {boolean} block - Fit button width to its parent width
 * @attr {string} href - Link URL (for link buttons)
 * @attr {string} target - Link target
 * @attr {IconPosition} icon-placement - Icon position: start or end
 * 
 * @slot - Default slot for button content
 * @slot icon - Icon slot
 * 
 * @fires click - Fired when button is clicked
 * 
 * @example
 * ```html
 * <!-- Primary button -->
 * <mx-button type="primary">Primary</mx-button>
 * 
 * <!-- Button with icon -->
 * <mx-button>
 *   <mx-icon slot="icon" svg="..."></mx-icon>
 *   Button with Icon
 * </mx-button>
 * 
 * <!-- Loading button -->
 * <mx-button loading>Loading</mx-button>
 * 
 * <!-- Danger button -->
 * <mx-button danger type="primary">Delete</mx-button>
 * 
 * <!-- Link button -->
 * <mx-button type="link" href="https://example.com">Link</mx-button>
 * ```
 */
@customElement('mx-button')
export class MXButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    :host([block]) {
      display: block;
      width: 100%;
    }

    .mx-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      font-weight: var(--mx-font-weight, 400);
      white-space: nowrap;
      text-align: center;
      background-image: none;
      background-color: transparent;
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      user-select: none;
      touch-action: manipulation;
      font-size: var(--mx-font-size, 14px);
      height: var(--mx-control-height, 32px);
      padding: 4px 15px;
      border-radius: var(--mx-border-radius, 6px);
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      outline: none;
      text-decoration: none;
      gap: 8px;
    }

    :host([block]) .mx-btn {
      width: 100%;
    }

    /* Sizes */
    .mx-btn-large {
      height: var(--mx-control-height-lg, 40px);
      padding: 7px 15px;
      font-size: var(--mx-font-size-lg, 16px);
      border-radius: var(--mx-border-radius-lg, 8px);
    }

    .mx-btn-small {
      height: var(--mx-control-height-sm, 24px);
      padding: 0 7px;
      font-size: var(--mx-font-size, 14px);
      border-radius: var(--mx-border-radius-sm, 4px);
    }

    /* Shapes */
    .mx-btn-circle {
      min-width: var(--mx-control-height, 32px);
      padding-left: 0;
      padding-right: 0;
      border-radius: 50%;
    }
    .mx-btn-circle.mx-btn-large {
      min-width: var(--mx-control-height-lg, 40px);
      border-radius: 50%;
    }
    .mx-btn-circle.mx-btn-small {
      min-width: var(--mx-control-height-sm, 24px);
      border-radius: 50%;
    }

    .mx-btn-round {
      border-radius: var(--mx-control-height, 32px);
      padding-left: 16px;
      padding-right: 16px;
    }
    .mx-btn-round.mx-btn-large {
      border-radius: var(--mx-control-height-lg, 40px);
    }
    .mx-btn-round.mx-btn-small {
      border-radius: var(--mx-control-height-sm, 24px);
    }

    /* Type: Default (Outlined) */
    .mx-btn-default,
    .mx-btn-outlined {
      background-color: var(--mx-color-bg-container, #ffffff);
      border-color: var(--mx-color-border, #d9d9d9);
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
    }
    .mx-btn-default:hover:not(:disabled):not(.mx-btn-loading),
    .mx-btn-outlined:hover:not(:disabled):not(.mx-btn-loading) {
      color: var(--mx-color-primary-hover, #4096ff);
      border-color: var(--mx-color-primary-hover, #4096ff);
    }
    .mx-btn-default:active:not(:disabled):not(.mx-btn-loading),
    .mx-btn-outlined:active:not(:disabled):not(.mx-btn-loading) {
      color: var(--mx-color-primary-active, #0958d9);
      border-color: var(--mx-color-primary-active, #0958d9);
    }

    /* Type: Primary (Solid) */
    .mx-btn-primary,
    .mx-btn-solid {
      color: #fff;
      background-color: var(--mx-color-primary, #1677ff);
      border-color: var(--mx-color-primary, #1677ff);
      box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
    }
    .mx-btn-primary:hover:not(:disabled):not(.mx-btn-loading),
    .mx-btn-solid:hover:not(:disabled):not(.mx-btn-loading) {
      background-color: var(--mx-color-primary-hover, #4096ff);
      border-color: var(--mx-color-primary-hover, #4096ff);
    }
    .mx-btn-primary:active:not(:disabled):not(.mx-btn-loading),
    .mx-btn-solid:active:not(:disabled):not(.mx-btn-loading) {
      background-color: var(--mx-color-primary-active, #0958d9);
      border-color: var(--mx-color-primary-active, #0958d9);
    }

    /* Type: Dashed */
    .mx-btn-dashed {
      background-color: var(--mx-color-bg-container, #ffffff);
      border-color: var(--mx-color-border, #d9d9d9);
      border-style: dashed;
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
    }
    .mx-btn-dashed:hover:not(:disabled):not(.mx-btn-loading) {
      color: var(--mx-color-primary-hover, #4096ff);
      border-color: var(--mx-color-primary-hover, #4096ff);
    }

    /* Type: Text */
    .mx-btn-text {
      border-color: transparent;
      background: transparent;
      box-shadow: none;
    }
    .mx-btn-text:hover:not(:disabled):not(.mx-btn-loading) {
      background-color: rgba(0, 0, 0, 0.04);
    }

    /* Type: Link */
    .mx-btn-link {
      color: var(--mx-color-primary, #1677ff);
      border-color: transparent;
      background: transparent;
      box-shadow: none;
    }
    .mx-btn-link:hover:not(:disabled):not(.mx-btn-loading) {
      color: var(--mx-color-primary-hover, #4096ff);
    }

    /* Type: Filled */
    .mx-btn-filled {
      background-color: var(--mx-color-fill-tertiary, rgba(0, 0, 0, 0.04));
      border-color: transparent;
    }
    .mx-btn-filled:hover:not(:disabled):not(.mx-btn-loading) {
      background-color: var(--mx-color-fill-secondary, rgba(0, 0, 0, 0.06));
    }

    /* Danger state */
    .mx-btn-danger.mx-btn-primary,
    .mx-btn-danger.mx-btn-solid {
      background-color: var(--mx-color-error, #ff4d4f);
      border-color: var(--mx-color-error, #ff4d4f);
      box-shadow: 0 2px 0 rgba(255, 38, 5, 0.06);
    }
    .mx-btn-danger.mx-btn-primary:hover:not(:disabled):not(.mx-btn-loading),
    .mx-btn-danger.mx-btn-solid:hover:not(:disabled):not(.mx-btn-loading) {
      background-color: var(--mx-color-error-hover, #ff7875);
      border-color: var(--mx-color-error-hover, #ff7875);
    }
    
    .mx-btn-danger.mx-btn-default,
    .mx-btn-danger.mx-btn-outlined {
      color: var(--mx-color-error, #ff4d4f);
      border-color: var(--mx-color-error, #ff4d4f);
    }
    .mx-btn-danger.mx-btn-default:hover:not(:disabled):not(.mx-btn-loading),
    .mx-btn-danger.mx-btn-outlined:hover:not(:disabled):not(.mx-btn-loading) {
      color: var(--mx-color-error-hover, #ff7875);
      border-color: var(--mx-color-error-hover, #ff7875);
    }

    .mx-btn-danger.mx-btn-link,
    .mx-btn-danger.mx-btn-text {
      color: var(--mx-color-error, #ff4d4f);
    }
    .mx-btn-danger.mx-btn-link:hover:not(:disabled):not(.mx-btn-loading),
    .mx-btn-danger.mx-btn-text:hover:not(:disabled):not(.mx-btn-loading) {
      color: var(--mx-color-error-hover, #ff7875);
    }

    /* Ghost state */
    .mx-btn-ghost {
      background: transparent !important;
      border-color: #fff;
      color: #fff;
    }
    .mx-btn-ghost:hover:not(:disabled):not(.mx-btn-loading) {
      border-color: rgba(255, 255, 255, 0.8);
      color: rgba(255, 255, 255, 0.8);
    }

    /* Disabled state */
    .mx-btn:disabled,
    .mx-btn-loading {
      cursor: not-allowed;
      border-color: #d9d9d9;
      color: rgba(0, 0, 0, 0.25);
      background-color: rgba(0, 0, 0, 0.04);
      box-shadow: none;
    }
    .mx-btn-text:disabled, 
    .mx-btn-text.mx-btn-loading,
    .mx-btn-link:disabled,
    .mx-btn-link.mx-btn-loading {
      background-color: transparent;
      border-color: transparent;
    }

    /* Loading state */
    .mx-btn-loading {
      pointer-events: none;
      opacity: 0.65;
    }

    /* Icon placement */
    .mx-btn-icon-end {
      flex-direction: row-reverse;
    }

    /* Icon only */
    .mx-btn-icon-only {
      padding-left: 0;
      padding-right: 0;
      gap: 0;
    }

    /* Content */
    .mx-btn-content {
      display: inline-flex;
      align-items: center;
    }

    .mx-btn-loading-icon {
      display: inline-flex;
    }

    /* Slotted content */
    ::slotted(*) {
      pointer-events: none;
    }
  `;

  @property({ type: String })
  type: ButtonType = 'default';

  @property({ type: String })
  variant?: ButtonVariant;

  @property({ type: String })
  color?: ButtonColor;

  @property({ type: String })
  size: ButtonSize = 'middle';

  @property({ type: String })
  shape: ButtonShape = 'default';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  danger = false;

  @property({ type: Boolean })
  loading = false;

  @property({ type: Boolean })
  ghost = false;

  @property({ type: Boolean })
  block = false;

  @property({ type: String })
  href = '';

  @property({ type: String })
  target = '';

  @property({ type: String, attribute: 'icon-placement' })
  iconPlacement: IconPosition = 'start';

  @property({ type: String, attribute: 'html-type' })
  htmlType: 'button' | 'submit' | 'reset' = 'button';

  @query('slot:not([name])')
  private defaultSlot!: HTMLSlotElement;

  @property({ type: Boolean, attribute: false })
  private iconOnly = false;

  private handleSlotChange() {
    const nodes = this.defaultSlot?.assignedNodes({ flatten: true }) || [];
    const textNodes = nodes.filter(node =>
      node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
    );
    const elementNodes = nodes.filter(node => node.nodeType === Node.ELEMENT_NODE);

    // Check if button only has icon (no text)
    this.iconOnly = textNodes.length === 0 && elementNodes.length === 0;
  }

  private handleClick(e: MouseEvent) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Emit custom event
    this.dispatchEvent(new CustomEvent('click', {
      detail: { originalEvent: e },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    // Determine the effective variant (variant takes precedence over type)
    const effectiveType = this.variant || this.type || 'default';

    const classes = {
      'mx-btn': true,
      [`mx-btn-${effectiveType}`]: true,
      [`mx-btn-${this.size}`]: this.size !== 'middle',
      [`mx-btn-${this.shape}`]: this.shape !== 'default',
      'mx-btn-danger': this.danger,
      'mx-btn-loading': this.loading,
      'mx-btn-ghost': this.ghost,
      'mx-btn-icon-only': this.iconOnly,
      'mx-btn-icon-end': this.iconPlacement === 'end',
    };


    const loadingIcon = html`
      <span class="mx-btn-loading-icon">
        <mx-icon 
          spin 
          svg='<svg viewBox="0 0 1024 1024"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"/></svg>'
        ></mx-icon>
      </span>
    `;

    const iconSlot = this.loading ? loadingIcon : html`<slot name="icon"></slot>`;

    const content = html`
      ${iconSlot}
      <span class="mx-btn-content">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </span>
    `;

    // Render as link if href is provided
    if (this.href) {
      return html`
        <a 
          class=${classMap(classes)} 
          href=${this.disabled ? 'javascript:void(0);' : this.href}
          target=${this.target || ''}
          aria-disabled=${this.disabled || this.loading}
          @click=${this.handleClick}
        >
          ${content}
        </a>
      `;
    }

    // Render as button
    return html`
      <button 
        class=${classMap(classes)} 
        ?disabled=${this.disabled || this.loading}
        type=${this.htmlType}
        @click=${this.handleClick}
      >
        ${content}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-button': MXButton;
  }
}
