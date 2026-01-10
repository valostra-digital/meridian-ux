import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type SpinSize = 'small' | 'default' | 'large';

/**
 * Spinner component for displaying loading state.
 * 
 * @element mx-spin
 * 
 * @attr {boolean} spinning - Whether to show spinning indicator
 * @attr {SpinSize} size - Size of spinner: small, default, large
 * @attr {string} tip - Tip text to show below spinner
 * @attr {number} delay - Delay in milliseconds before showing spinner
 * 
 * @slot - Content to wrap (shows spinner overlay when spinning)
 * @slot indicator - Custom loading indicator
 * 
 * @example
 * ```html
 * <!-- Simple spinner -->
 * <mx-spin></mx-spin>
 * 
 * <!-- With tip text -->
 * <mx-spin tip="Loading..."></mx-spin>
 * 
 * <!-- Wrapping content -->
 * <mx-spin spinning>
 *   <div>Your content here</div>
 * </mx-spin>
 * 
 * <!-- Large size -->
 * <mx-spin size="large"></mx-spin>
 * ```
 */
@customElement('mx-spin')
export class MXSpin extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      color: var(--mx-color-primary, #1677ff);
      font-size: 14px;
      vertical-align: middle;
    }

    :host([spinning]) {
      display: block;
      position: relative;
    }

    .mx-spin {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-primary, #1677ff);
      font-size: 14px;
      line-height: 1.5714285714285714;
      list-style: none;
      font-family: inherit;
      position: static;
      display: inline-block;
      opacity: 1;
      transition: opacity 0.3s;
    }

    .mx-spin-container {
      position: relative;
      transition: opacity 0.3s;
    }

    .mx-spin-blur {
      pointer-events: none;
      user-select: none;
      overflow: hidden;
      opacity: 0.5;
      filter: blur(0.5px);
    }

    .mx-spin-spinning {
      position: static;
      display: inline-block;
      opacity: 1;
    }

    .mx-spin-nested-loading {
      position: relative;
    }

    .mx-spin-nested-loading > div > .mx-spin {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 4;
      display: block;
      width: 100%;
      height: 100%;
      max-height: 400px;
    }

    .mx-spin-nested-loading > div > .mx-spin .mx-spin-dot {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -10px;
    }

    .mx-spin-nested-loading > div > .mx-spin .mx-spin-text {
      position: absolute;
      top: 50%;
      width: 100%;
      padding-top: 5px;
      text-align: center;
    }

    .mx-spin-dot {
      position: relative;
      display: inline-block;
      font-size: 20px;
      width: 1em;
      height: 1em;
    }

    .mx-spin-dot-item {
      position: absolute;
      display: block;
      width: 9px;
      height: 9px;
      background-color: currentColor;
      border-radius: 100%;
      transform: scale(0.75);
      transform-origin: 50% 50%;
      opacity: 0.3;
      animation: spinMove 1s infinite linear alternate;
    }

    .mx-spin-dot-item:nth-child(1) {
      top: 0;
      left: 0;
    }

    .mx-spin-dot-item:nth-child(2) {
      top: 0;
      right: 0;
      animation-delay: 0.4s;
    }

    .mx-spin-dot-item:nth-child(3) {
      right: 0;
      bottom: 0;
      animation-delay: 0.8s;
    }

    .mx-spin-dot-item:nth-child(4) {
      bottom: 0;
      left: 0;
      animation-delay: 1.2s;
    }

    .mx-spin-dot-spin {
      transform: rotate(45deg);
      animation: spinRotate 1.2s infinite linear;
    }

    /* Size variants */
    :host([size="small"]) .mx-spin-dot {
      font-size: 14px;
    }

    :host([size="small"]) .mx-spin-dot-item {
      width: 6px;
      height: 6px;
    }

    :host([size="large"]) .mx-spin-dot {
      font-size: 32px;
    }

    :host([size="large"]) .mx-spin-dot-item {
      width: 14px;
      height: 14px;
    }

    .mx-spin-text {
      padding-top: 8px;
      color: var(--mx-color-primary, #1677ff);
      font-size: 14px;
      text-align: center;
    }

    @keyframes spinMove {
      to {
        opacity: 1;
      }
    }

    @keyframes spinRotate {
      to {
        transform: rotate(405deg);
      }
    }
  `;

  /**
   * Whether to show spinning indicator
   */
  @property({ type: Boolean, reflect: true })
  spinning = true;

  /**
   * Size of spinner
   */
  @property({ type: String, reflect: true })
  size: SpinSize = 'default';

  /**
   * Tip text to show below spinner
   */
  @property({ type: String })
  tip = '';

  /**
   * Delay in milliseconds before showing spinner
   */
  @property({ type: Number })
  delay = 0;

  private delayTimeout?: number;
  private showSpinner = false;

  connectedCallback() {
    super.connectedCallback();
    if (this.delay > 0) {
      this.showSpinner = false;
      this.delayTimeout = window.setTimeout(() => {
        this.showSpinner = true;
        this.requestUpdate();
      }, this.delay);
    } else {
      this.showSpinner = true;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('delay')) {
      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout);
      }
      
      if (this.delay > 0) {
        this.showSpinner = false;
        this.delayTimeout = window.setTimeout(() => {
          this.showSpinner = true;
          this.requestUpdate();
        }, this.delay);
      } else {
        this.showSpinner = true;
      }
    }
  }

  private renderSpinner() {
    return html`
      <div class="mx-spin-spinning">
        <slot name="indicator">
          <span class="mx-spin-dot mx-spin-dot-spin">
            <i class="mx-spin-dot-item"></i>
            <i class="mx-spin-dot-item"></i>
            <i class="mx-spin-dot-item"></i>
            <i class="mx-spin-dot-item"></i>
          </span>
        </slot>
        ${this.tip ? html`<div class="mx-spin-text">${this.tip}</div>` : ''}
      </div>
    `;
  }

  render() {
    // Check if we have slotted content
    const hasContent = this.querySelector(':not([slot])') !== null;

    if (!hasContent) {
      // Simple spinner without wrapping content
      return this.spinning && this.showSpinner ? html`
        <div class="mx-spin">
          ${this.renderSpinner()}
        </div>
      ` : html``;
    }

    // Spinner wrapping content
    return html`
      <div class="mx-spin-nested-loading">
        <div>
          ${this.spinning && this.showSpinner ? html`
            <div class="mx-spin">
              ${this.renderSpinner()}
            </div>
          ` : ''}
          <div class="mx-spin-container ${this.spinning && this.showSpinner ? 'mx-spin-blur' : ''}">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-spin': MXSpin;
  }
}
