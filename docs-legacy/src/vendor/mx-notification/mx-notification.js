var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
/**
 * Notification component for displaying global notification messages.
 *
 * @element mx-notification
 *
 * @attr {string} message - Notification message text
 * @attr {string} description - Description content
 * @attr {NotificationType} type - Notification type: success, info, warning, error
 * @attr {NotificationPlacement} placement - Position on screen
 * @attr {number} duration - Auto-close duration in seconds (0 = no auto-close)
 * @attr {boolean} closable - Whether to show close button
 * @attr {boolean} show-icon - Whether to show type icon
 * @attr {boolean} open - Whether notification is visible
 *
 * @slot - Custom message content
 * @slot description - Custom description content
 * @slot icon - Custom icon
 * @slot btn - Custom action button
 *
 * @fires close - Dispatched when notification is closed
 *
 * @example
 * ```html
 * <mx-notification
 *   open
 *   type="success"
 *   message="Success"
 *   description="Operation completed successfully"
 * ></mx-notification>
 * ```
 */
let MXNotification = class MXNotification extends LitElement {
    constructor() {
        super(...arguments);
        this.message = '';
        this.description = '';
        this.placement = 'topRight';
        this.duration = 4.5;
        this.closable = true;
        this.showIcon = true;
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
        <div class="mx-notification-icon">
          <slot name="icon"></slot>
        </div>
      `;
        }
        if (!this.type)
            return null;
        const iconMap = {
            success: html `
        <svg class="mx-notification-icon-success" width="24" height="24" viewBox="64 64 896 896" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"/>
        </svg>
      `,
            info: html `
        <svg class="mx-notification-icon-info" width="24" height="24" viewBox="64 64 896 896" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"/>
        </svg>
      `,
            warning: html `
        <svg class="mx-notification-icon-warning" width="24" height="24" viewBox="64 64 896 896" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"/>
        </svg>
      `,
            error: html `
        <svg class="mx-notification-icon-error" width="24" height="24" viewBox="64 64 896 896" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/>
        </svg>
      `
        };
        return html `
      <div class="mx-notification-icon">
        ${iconMap[this.type]}
      </div>
    `;
    }
    render() {
        if (!this.open && !this.closing) {
            return null;
        }
        const hasDescription = this.description || this.querySelector('[slot="description"]');
        const hasCustomMessage = this.querySelector(':not([slot])');
        const hasBtn = this.querySelector('[slot="btn"]');
        const classes = {
            'mx-notification': true,
            'mx-notification-with-icon': this.showIcon && !!this.type
        };
        return html `
      <div class=${classMap(classes)}>
        ${this.showIcon && this.type ? this.renderIcon() : null}
        
        <div class="mx-notification-content">
          <div class="mx-notification-message">
            ${hasCustomMessage ? html `<slot></slot>` : this.message}
          </div>
          ${hasDescription ? html `
            <div class="mx-notification-description">
              <slot name="description">${this.description}</slot>
            </div>
          ` : null}
          ${hasBtn ? html `
            <div class="mx-notification-btn">
              <slot name="btn"></slot>
            </div>
          ` : null}
        </div>

        ${this.closable ? html `
          <button 
            class="mx-notification-close"
            @click=${this.handleClose}
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M7.717 7l4.45 4.45a.507.507 0 01-.717.717L7 7.717l-4.45 4.45a.507.507 0 01-.717-.717L6.283 7l-4.45-4.45a.507.507 0 11.717-.717L7 6.283l4.45-4.45a.507.507 0 11.717.717L7.717 7z"/>
            </svg>
          </button>
        ` : null}
      </div>
    `;
    }
};
MXNotification.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      position: fixed;
      z-index: 1010;
      margin-bottom: 16px;
    }

    :host([hidden]) {
      display: none;
    }

    .mx-notification {
      position: relative;
      width: 384px;
      max-width: calc(100vw - 32px);
      margin-left: auto;
      padding: 16px 24px;
      overflow: hidden;
      line-height: 1.5714285714285714;
      word-wrap: break-word;
      background: var(--mx-color-bg-elevated, #ffffff);
      border-radius: var(--mx-border-radius-lg, 8px);
      box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
                  0 6px 16px 0 rgba(0, 0, 0, 0.08),
                  0 9px 28px 8px rgba(0, 0, 0, 0.05);
      opacity: 0;
      animation: notificationFadeIn 0.24s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
    }

    :host([closing]) .mx-notification {
      animation: notificationFadeOut 0.24s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
    }

    .mx-notification-with-icon {
      display: flex;
    }

    .mx-notification-icon {
      margin-right: 16px;
      font-size: 24px;
      line-height: 24px;
      flex-shrink: 0;
    }

    .mx-notification-icon-success {
      color: var(--mx-color-success, #52c41a);
    }

    .mx-notification-icon-info {
      color: var(--mx-color-info, #1677ff);
    }

    .mx-notification-icon-warning {
      color: var(--mx-color-warning, #faad14);
    }

    .mx-notification-icon-error {
      color: var(--mx-color-error, #ff4d4f);
    }

    .mx-notification-content {
      flex: 1;
      min-width: 0;
    }

    .mx-notification-message {
      margin-bottom: 8px;
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      font-size: 16px;
      line-height: 24px;
    }

    .mx-notification-description {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 14px;
    }

    .mx-notification-btn {
      margin-top: 16px;
    }

    .mx-notification-close {
      position: absolute;
      top: 16px;
      right: 22px;
      padding: 0;
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 14px;
      line-height: 1;
      color: var(--mx-color-text-tertiary, rgba(0, 0, 0, 0.45));
      transition: color 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mx-notification-close:hover {
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.65));
    }

    @keyframes notificationFadeIn {
      0% {
        opacity: 0;
        transform: translateX(100%);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes notificationFadeOut {
      0% {
        opacity: 1;
        max-height: 500px;
        margin-bottom: 16px;
      }
      100% {
        opacity: 0;
        max-height: 0;
        margin-bottom: 0;
        padding-top: 0;
        padding-bottom: 0;
      }
    }

    /* Placement variants */
    :host([placement="topLeft"]),
    :host([placement="bottomLeft"]) {
      left: 24px;
    }

    :host([placement="topRight"]),
    :host([placement="bottomRight"]) {
      right: 24px;
    }

    :host([placement="topLeft"]),
    :host([placement="topRight"]) {
      top: 24px;
    }

    :host([placement="bottomLeft"]),
    :host([placement="bottomRight"]) {
      bottom: 24px;
    }

    /* Left placement animation */
    :host([placement="topLeft"]) .mx-notification,
    :host([placement="bottomLeft"]) .mx-notification {
      animation: notificationFadeInLeft 0.24s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
    }

    @keyframes notificationFadeInLeft {
      0% {
        opacity: 0;
        transform: translateX(-100%);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `;
__decorate([
    property({ type: String })
], MXNotification.prototype, "message", void 0);
__decorate([
    property({ type: String })
], MXNotification.prototype, "description", void 0);
__decorate([
    property({ type: String })
], MXNotification.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true })
], MXNotification.prototype, "placement", void 0);
__decorate([
    property({ type: Number })
], MXNotification.prototype, "duration", void 0);
__decorate([
    property({ type: Boolean })
], MXNotification.prototype, "closable", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-icon' })
], MXNotification.prototype, "showIcon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MXNotification.prototype, "open", void 0);
__decorate([
    state()
], MXNotification.prototype, "closing", void 0);
MXNotification = __decorate([
    customElement('mx-notification')
], MXNotification);
export { MXNotification };
//# sourceMappingURL=mx-notification.js.map