import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

/**
 * Alert component for displaying important messages.
 * 
 * @element mx-alert
 * 
 * @attr {AlertType} type - Type of alert: success, info, warning, error
 * @attr {string} message - Alert message text
 * @attr {string} description - Additional description text
 * @attr {boolean} closable - Whether alert can be closed
 * @attr {boolean} show-icon - Whether to show type icon
 * @attr {boolean} banner - Display as banner (full width, no border)
 * @attr {string} close-text - Custom close button text
 * 
 * @slot - Default message content (overrides message property)
 * @slot description - Description content (overrides description property)
 * @slot icon - Custom icon
 * @slot action - Extra action button area
 * @slot close-icon - Custom close icon
 * 
 * @fires close - Dispatched when alert is closed
 * 
 * @example
 * ```html
 * <!-- Success alert -->
 * <mx-alert type="success" message="Success Text"></mx-alert>
 * 
 * <!-- With description -->
 * <mx-alert 
 *   type="info" 
 *   message="Info Text"
 *   description="Detailed info description"
 *   show-icon
 * ></mx-alert>
 * 
 * <!-- Closable -->
 * <mx-alert 
 *   type="warning" 
 *   message="Warning"
 *   closable
 * ></mx-alert>
 * 
 * <!-- Banner mode -->
 * <mx-alert 
 *   type="error" 
 *   message="Error"
 *   banner
 * ></mx-alert>
 * ```
 */
@customElement('mx-alert')
export class MXAlert extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .mx-alert {
      box-sizing: border-box;
      margin: 0;
      padding: 8px 15px;
      font-size: 14px;
      line-height: 1.5714285714285714;
      list-style: none;
      position: relative;
      display: flex;
      align-items: flex-start;
      border-radius: var(--mx-border-radius, 6px);
      transition: all 0.3s;
    }

    /* Type variants */
    .mx-alert-success {
      background-color: var(--mx-color-success-bg, #f6ffed);
      border: 1px solid var(--mx-color-success-border, #b7eb8f);
    }

    .mx-alert-success .mx-alert-icon {
      color: var(--mx-color-success, #52c41a);
    }

    .mx-alert-info {
      background-color: var(--mx-color-info-bg, #e6f4ff);
      border: 1px solid var(--mx-color-info-border, #91caff);
    }

    .mx-alert-info .mx-alert-icon {
      color: var(--mx-color-info, #1677ff);
    }

    .mx-alert-warning {
      background-color: var(--mx-color-warning-bg, #fffbe6);
      border: 1px solid var(--mx-color-warning-border, #ffe58f);
    }

    .mx-alert-warning .mx-alert-icon {
      color: var(--mx-color-warning, #faad14);
    }

    .mx-alert-error {
      background-color: var(--mx-color-error-bg, #fff2f0);
      border: 1px solid var(--mx-color-error-border, #ffccc7);
    }

    .mx-alert-error .mx-alert-icon {
      color: var(--mx-color-error, #ff4d4f);
    }

    /* Banner mode */
    .mx-alert-banner {
      border: 0;
      border-radius: 0;
    }

    /* With description */
    .mx-alert-with-description {
      padding: 15px;
      align-items: flex-start;
    }

    .mx-alert-with-description .mx-alert-icon {
      font-size: 24px;
      margin-right: 15px;
    }

    .mx-alert-with-description .mx-alert-message {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 4px;
    }

    /* Icon */
    .mx-alert-icon {
      margin-right: 8px;
      font-size: 14px;
      line-height: 22px;
      flex-shrink: 0;
    }

    /* Content */
    .mx-alert-content {
      flex: 1;
      min-width: 0;
    }

    .mx-alert-message {
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      font-size: 14px;
      line-height: 22px;
    }

    .mx-alert-description {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 14px;
      line-height: 22px;
      margin-top: 4px;
    }

    /* Action */
    .mx-alert-action {
      margin-left: 8px;
      flex-shrink: 0;
    }

    /* Close */
    .mx-alert-close {
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 0;
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 12px;
      line-height: 22px;
      color: var(--mx-color-text-tertiary, rgba(0, 0, 0, 0.45));
      transition: color 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mx-alert-close:hover {
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.65));
    }

    .mx-alert-close-text {
      font-size: 14px;
      padding: 0 4px;
    }

    .mx-alert-with-description .mx-alert-close {
      top: 15px;
      right: 15px;
    }

    /* Slide up animation */
    @keyframes alertSlideUp {
      0% {
        opacity: 1;
        max-height: 500px;
        margin-bottom: 8px;
      }
      100% {
        opacity: 0;
        max-height: 0;
        margin-bottom: 0;
        padding-top: 0;
        padding-bottom: 0;
      }
    }

    :host([closing]) .mx-alert {
      animation: alertSlideUp 0.3s ease-out forwards;
    }

    /* Default icons using simple SVG shapes */
    .mx-alert-icon-default {
      width: 14px;
      height: 14px;
      display: inline-block;
    }

    .mx-alert-with-description .mx-alert-icon-default {
      width: 24px;
      height: 24px;
    }
  `;

  /**
   * Type of alert
   */
  @property({ type: String, reflect: true })
  type: AlertType = 'info';

  /**
   * Alert message text
   */
  @property({ type: String })
  message = '';

  /**
   * Additional description text
   */
  @property({ type: String })
  description = '';

  /**
   * Whether alert can be closed
   */
  @property({ type: Boolean })
  closable = false;

  /**
   * Whether to show type icon
   */
  @property({ type: Boolean, attribute: 'show-icon' })
  showIcon = false;

  /**
   * Display as banner (full width, no border)
   */
  @property({ type: Boolean })
  banner = false;

  /**
   * Custom close button text
   */
  @property({ type: String, attribute: 'close-text' })
  closeText = '';

  @state()
  private visible = true;

  @state()
  private closing = false;

  private handleClose(e: Event) {
    e.stopPropagation();
    
    this.closing = true;
    
    // Dispatch close event
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }));

    // Wait for animation to complete before hiding
    setTimeout(() => {
      this.visible = false;
      this.closing = false;
      this.requestUpdate();
    }, 300);
  }

  private renderIcon() {
    // Check for custom icon slot
    const hasCustomIcon = this.querySelector('[slot="icon"]');
    if (hasCustomIcon) {
      return html`
        <span class="mx-alert-icon">
          <slot name="icon"></slot>
        </span>
      `;
    }

    // Render default icon based on type
    const iconMap = {
      success: html`
        <svg class="mx-alert-icon-default" viewBox="64 64 896 896" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"/>
        </svg>
      `,
      info: html`
        <svg class="mx-alert-icon-default" viewBox="64 64 896 896" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"/>
        </svg>
      `,
      warning: html`
        <svg class="mx-alert-icon-default" viewBox="64 64 896 896" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"/>
        </svg>
      `,
      error: html`
        <svg class="mx-alert-icon-default" viewBox="64 64 896 896" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/>
        </svg>
      `
    };

    return html`
      <span class="mx-alert-icon">
        ${iconMap[this.type]}
      </span>
    `;
  }

  private renderCloseButton() {
    if (!this.closable) return null;

    const hasCustomCloseIcon = this.querySelector('[slot="close-icon"]');
    
    return html`
      <button 
        class="mx-alert-close" 
        @click=${this.handleClose}
        aria-label="Close"
      >
        ${this.closeText ? html`
          <span class="mx-alert-close-text">${this.closeText}</span>
        ` : hasCustomCloseIcon ? html`
          <slot name="close-icon"></slot>
        ` : html`
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6.717 6l3.95 3.95a.507.507 0 01-.717.717L6 6.717l-3.95 3.95a.507.507 0 01-.717-.717L5.283 6l-3.95-3.95a.507.507 0 11.717-.717L6 5.283l3.95-3.95a.507.507 0 11.717.717L6.717 6z"/>
          </svg>
        `}
      </button>
    `;
  }

  render() {
    if (!this.visible) {
      return null;
    }

    const hasDescription = this.description || this.querySelector('[slot="description"]');
    const hasAction = this.querySelector('[slot="action"]');

    const classes = {
      'mx-alert': true,
      [`mx-alert-${this.type}`]: true,
      'mx-alert-banner': this.banner,
      'mx-alert-with-description': !!hasDescription
    };

    return html`
      <div class=${classMap(classes)} role="alert">
        ${this.showIcon ? this.renderIcon() : null}
        
        <div class="mx-alert-content">
          <div class="mx-alert-message">
            <slot>${this.message}</slot>
          </div>
          ${hasDescription ? html`
            <div class="mx-alert-description">
              <slot name="description">${this.description}</slot>
            </div>
          ` : null}
        </div>

        ${hasAction ? html`
          <div class="mx-alert-action">
            <slot name="action"></slot>
          </div>
        ` : null}

        ${this.renderCloseButton()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-alert': MXAlert;
  }
}
