import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type BadgeStatus = 'success' | 'processing' | 'default' | 'error' | 'warning';
export type BadgeSize = 'default' | 'small';

/**
 * Badge component for displaying status or count.
 * 
 * @element mx-badge
 * 
 * @attr {number|string} count - Number to show in badge
 * @attr {boolean} dot - Whether to show a dot instead of count
 * @attr {number} overflow-count - Max count to show (shows count+ when exceeded)
 * @attr {boolean} show-zero - Whether to show badge when count is zero
 * @attr {BadgeStatus} status - Status type: success, processing, default, error, warning
 * @attr {string} text - Text to display next to status dot
 * @attr {string} color - Custom badge color
 * @attr {BadgeSize} size - Size of badge: default, small
 * @attr {number} offset-x - Horizontal offset in pixels
 * @attr {number} offset-y - Vertical offset in pixels
 * 
 * @slot - Wrapped element to attach badge to
 * @slot count - Custom badge content
 * 
 * @example
 * ```html
 * <!-- Count badge -->
 * <mx-badge count="5">
 *   <button>Notifications</button>
 * </mx-badge>
 * 
 * <!-- Dot badge -->
 * <mx-badge dot>
 *   <mx-icon name="notification"></mx-icon>
 * </mx-badge>
 * 
 * <!-- Status badge -->
 * <mx-badge status="success" text="Success"></mx-badge>
 * 
 * <!-- Overflow -->
 * <mx-badge count="100" overflow-count="99">
 *   <button>Messages</button>
 * </mx-badge>
 * ```
 */
@customElement('mx-badge')
export class MXBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      line-height: 1;
    }

    .mx-badge {
      position: relative;
      display: inline-block;
      line-height: 1;
    }

    .mx-badge-count,
    .mx-badge-dot {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      transform-origin: 100% 0%;
      z-index: 10;
    }

    .mx-badge-count {
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      color: #fff;
      font-weight: normal;
      font-size: 12px;
      line-height: 20px;
      white-space: nowrap;
      text-align: center;
      background: var(--mx-color-error, #ff4d4f);
      border-radius: 10px;
      box-shadow: 0 0 0 1px var(--mx-color-bg-container, #fff);
    }

    .mx-badge-count-sm {
      min-width: 14px;
      height: 14px;
      padding: 0 4px;
      font-size: 10px;
      line-height: 14px;
      border-radius: 7px;
    }

    .mx-badge-dot {
      width: 6px;
      min-width: 6px;
      height: 6px;
      background: var(--mx-color-error, #ff4d4f);
      border-radius: 100%;
      box-shadow: 0 0 0 1px var(--mx-color-bg-container, #fff);
    }

    .mx-badge-dot-sm {
      width: 4px;
      min-width: 4px;
      height: 4px;
    }

    /* Status badges */
    .mx-badge-status {
      display: inline-flex;
      align-items: center;
      line-height: inherit;
      vertical-align: baseline;
    }

    .mx-badge-status-dot {
      width: 6px;
      height: 6px;
      display: inline-block;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .mx-badge-status-success {
      background: var(--mx-color-success, #52c41a);
    }

    .mx-badge-status-processing {
      background: var(--mx-color-info, #1677ff);
      position: relative;
    }

    .mx-badge-status-processing::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid var(--mx-color-info, #1677ff);
      border-radius: 50%;
      animation: statusProcessing 1.2s ease-in-out infinite;
      content: '';
    }

    .mx-badge-status-default {
      background: var(--mx-color-text-tertiary, rgba(0, 0, 0, 0.25));
    }

    .mx-badge-status-error {
      background: var(--mx-color-error, #ff4d4f);
    }

    .mx-badge-status-warning {
      background: var(--mx-color-warning, #faad14);
    }

    .mx-badge-status-text {
      margin-left: 8px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 14px;
    }

    @keyframes statusProcessing {
      0% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      100% {
        transform: scale(2.4);
        opacity: 0;
      }
    }

    /* Multiple children mode */
    .mx-badge-multiple-words {
      padding: 0 8px;
    }

    /* Standalone badge (no children) */
    :host([standalone]) {
      display: inline-flex;
      vertical-align: middle;
    }

    :host([standalone]) .mx-badge-count,
    :host([standalone]) .mx-badge-dot {
      position: static;
      transform: none;
      display: inline-block;
    }
  `;

  @property({ type: Number })
  count?: number;

  @property({ type: Boolean })
  dot = false;

  @property({ type: Number, attribute: 'overflow-count' })
  overflowCount = 99;

  @property({ type: Boolean, attribute: 'show-zero' })
  showZero = false;

  @property({ type: String })
  status?: BadgeStatus;

  @property({ type: String })
  text = '';

  @property({ type: String })
  color = '';

  @property({ type: String })
  size: BadgeSize = 'default';

  @property({ type: Number, attribute: 'offset-x' })
  offsetX = 0;

  @property({ type: Number, attribute: 'offset-y' })
  offsetY = 0;

  private get displayCount(): string {
    if (this.count === undefined) return '';
    if (this.count > this.overflowCount) {
      return `${this.overflowCount}+`;
    }
    return String(this.count);
  }

  private get shouldShowBadge(): boolean {
    if (this.dot) return true;
    if (this.count === undefined) return false;
    if (this.count === 0) return this.showZero;
    return true;
  }

  private renderStatusBadge() {
    if (!this.status) return null;

    const dotClasses = {
      'mx-badge-status-dot': true,
      [`mx-badge-status-${this.status}`]: true
    };

    const dotStyles = this.color ? { backgroundColor: this.color } : {};

    return html`
      <span class="mx-badge-status">
        <span class=${classMap(dotClasses)} style=${styleMap(dotStyles)}></span>
        ${this.text ? html`<span class="mx-badge-status-text">${this.text}</span>` : null}
      </span>
    `;
  }

  private renderBadge() {
    if (!this.shouldShowBadge) return null;

    const hasCustomContent = this.querySelector('[slot="count"]');
    
    const offsetStyles = {
      transform: `translate(calc(50% + ${this.offsetX}px), calc(-50% + ${this.offsetY}px))`
    };

    const colorStyles = this.color ? { backgroundColor: this.color } : {};

    if (this.dot) {
      const dotClasses = {
        'mx-badge-dot': true,
        'mx-badge-dot-sm': this.size === 'small'
      };

      return html`
        <sup 
          class=${classMap(dotClasses)} 
          style=${styleMap({ ...offsetStyles, ...colorStyles })}
        ></sup>
      `;
    }

    const countClasses = {
      'mx-badge-count': true,
      'mx-badge-count-sm': this.size === 'small',
      'mx-badge-multiple-words': this.displayCount.length > 1
    };

    return html`
      <sup 
        class=${classMap(countClasses)}
        style=${styleMap({ ...offsetStyles, ...colorStyles })}
      >
        ${hasCustomContent ? html`<slot name="count"></slot>` : this.displayCount}
      </sup>
    `;
  }

  render() {
    // Status badge mode
    if (this.status) {
      return this.renderStatusBadge();
    }

    const hasChildren = this.querySelector(':not([slot])') !== null;

    // Standalone badge (no children)
    if (!hasChildren) {
      this.setAttribute('standalone', '');
      return html`
        <span class="mx-badge">
          ${this.renderBadge()}
        </span>
      `;
    }

    // Badge with wrapped content
    this.removeAttribute('standalone');
    return html`
      <span class="mx-badge">
        <slot></slot>
        ${this.renderBadge()}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-badge': MXBadge;
  }
}
