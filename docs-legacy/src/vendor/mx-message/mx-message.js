var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
/**
 * Message component for displaying lightweight global feedback.
 *
 * @element mx-message
 *
 * @attr {string} content - Message content text
 * @attr {MessageType} type - Message type: success, info, warning, error, loading
 * @attr {number} duration - Auto-close duration in seconds (0 = no auto-close)
 * @attr {boolean} open - Whether message is visible
 *
 * @slot - Custom message content
 * @slot icon - Custom icon
 *
 * @fires close - Dispatched when message is closed
 *
 * @example
 * ```html
 * <mx-message open type="success" content="Success message"></mx-message>
 * ```
 */
let MXMessage = class MXMessage extends LitElement {
    constructor() {
        super(...arguments);
        this.content = '';
        this.duration = 3;
        this.open = false;
        this.closing = false;
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.open && this.duration > 0) {
            this.startCloseTimer();
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.clearCloseTimer();
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('open')) {
            if (this.open && this.duration > 0) {
                this.startCloseTimer();
            }
            else {
                this.clearCloseTimer();
            }
        }
        if (changedProperties.has('duration') && this.open && this.duration > 0) {
            this.clearCloseTimer();
            this.startCloseTimer();
        }
    }
    startCloseTimer() {
        this.clearCloseTimer();
        this.closeTimer = window.setTimeout(() => {
            this.handleClose();
        }, this.duration * 1000);
    }
    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = undefined;
        }
    }
    handleClose() {
        this.clearCloseTimer();
        this.closing = true;
        this.setAttribute('closing', '');
        this.dispatchEvent(new CustomEvent('close', {
            bubbles: true,
            composed: true
        }));
        setTimeout(() => {
            this.open = false;
            this.closing = false;
            this.removeAttribute('closing');
            this.setAttribute('hidden', '');
        }, 240);
    }
    renderIcon() {
        const hasCustomIcon = this.querySelector('[slot="icon"]');
        if (hasCustomIcon) {
            return html `
        <span class="mx-message-icon">
          <slot name="icon"></slot>
        </span>
      `;
        }
        if (!this.type)
            return null;
        if (this.type === 'loading') {
            return html `
        <span class="mx-message-icon mx-message-icon-loading">
          <span class="mx-message-loading-icon"></span>
        </span>
      `;
        }
        const iconMap = {
            success: html `
        <svg width="16" height="16" viewBox="64 64 896 896" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"/>
        </svg>
      `,
            info: html `
        <svg width="16" height="16" viewBox="64 64 896 896" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"/>
        </svg>
      `,
            warning: html `
        <svg width="16" height="16" viewBox="64 64 896 896" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"/>
        </svg>
      `,
            error: html `
        <svg width="16" height="16" viewBox="64 64 896 896" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/>
        </svg>
      `
        };
        return html `
      <span class="mx-message-icon mx-message-icon-${this.type}">
        ${iconMap[this.type]}
      </span>
    `;
    }
    render() {
        if (!this.open && !this.closing) {
            return null;
        }
        const hasCustomContent = this.querySelector(':not([slot])');
        return html `
      <div class="mx-message-wrapper">
        <div class="mx-message">
          ${this.type ? this.renderIcon() : null}
          <span class="mx-message-content">
            ${hasCustomContent ? html `<slot></slot>` : this.content}
          </span>
        </div>
      </div>
    `;
    }
};
MXMessage.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      position: fixed;
      top: 8px;
      left: 0;
      right: 0;
      z-index: 1010;
      pointer-events: none;
    }

    :host([hidden]) {
      display: none;
    }

    .mx-message {
      box-sizing: border-box;
      margin: 0 auto 8px;
      padding: 10px 16px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 14px;
      line-height: 1.5714285714285714;
      list-style: none;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
      background: var(--mx-color-bg-elevated, #ffffff);
      border-radius: var(--mx-border-radius-lg, 8px);
      box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
                  0 6px 16px 0 rgba(0, 0, 0, 0.08),
                  0 9px 28px 8px rgba(0, 0, 0, 0.05);
      opacity: 0;
      animation: messageFadeIn 0.24s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
    }

    :host([closing]) .mx-message {
      animation: messageFadeOut 0.24s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
    }

    .mx-message-wrapper {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .mx-message-icon {
      margin-right: 8px;
      font-size: 16px;
      display: inline-flex;
      align-items: center;
    }

    .mx-message-icon-success {
      color: var(--mx-color-success, #52c41a);
    }

    .mx-message-icon-info {
      color: var(--mx-color-info, #1677ff);
    }

    .mx-message-icon-warning {
      color: var(--mx-color-warning, #faad14);
    }

    .mx-message-icon-error {
      color: var(--mx-color-error, #ff4d4f);
    }

    .mx-message-icon-loading {
      color: var(--mx-color-primary, #1677ff);
    }

    .mx-message-content {
      display: inline-block;
    }

    /* Loading spinner */
    .mx-message-loading-icon {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid currentColor;
      border-bottom-color: transparent;
      border-radius: 50%;
      animation: messageLoadingSpin 1s linear infinite;
    }

    @keyframes messageFadeIn {
      0% {
        opacity: 0;
        transform: translateY(-100%);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes messageFadeOut {
      0% {
        opacity: 1;
        max-height: 150px;
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

    @keyframes messageLoadingSpin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;
__decorate([
    property({ type: String })
], MXMessage.prototype, "content", void 0);
__decorate([
    property({ type: String })
], MXMessage.prototype, "type", void 0);
__decorate([
    property({ type: Number })
], MXMessage.prototype, "duration", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MXMessage.prototype, "open", void 0);
__decorate([
    state()
], MXMessage.prototype, "closing", void 0);
MXMessage = __decorate([
    customElement('mx-message')
], MXMessage);
export { MXMessage };
//# sourceMappingURL=mx-message.js.map