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
 * Popconfirm component - A simple confirmation dialog that appears on hover/click.
 *
 * @element mx-popconfirm
 *
 * @attr {string} title - The confirmation title
 * @attr {string} description - Additional description text
 * @attr {string} ok-text - Text for confirm button
 * @attr {string} cancel-text - Text for cancel button
 * @attr {string} ok-type - Button type for confirm: default, primary, danger
 * @attr {PopconfirmPlacement} placement - Popover placement
 * @attr {boolean} open - Whether popover is visible (controlled)
 * @attr {boolean} disabled - Whether popover is disabled
 * @attr {string} trigger - Trigger mode: click or hover
 * @attr {string} icon - Custom icon
 *
 * @slot - Default slot for trigger element
 * @slot title - Custom title slot
 * @slot description - Custom description slot
 * @slot icon - Custom icon slot
 *
 * @fires confirm - Fired when confirm button is clicked
 * @fires cancel - Fired when cancel button is clicked
 * @fires open-change - Fired when visibility changes
 *
 * @example
 * ```html
 * <mx-popconfirm title="Are you sure?" ok-text="Yes" cancel-text="No">
 *   <mx-button>Delete</mx-button>
 * </mx-popconfirm>
 * ```
 */
let MXPopconfirm = class MXPopconfirm extends LitElement {
    constructor() {
        super(...arguments);
        this.title = 'Are you sure?';
        this.description = '';
        this.okText = 'OK';
        this.cancelText = 'Cancel';
        this.okType = 'primary';
        this.placement = 'top';
        this.open = false;
        this.disabled = false;
        this.trigger = 'click';
        this.icon = '';
        this.internalOpen = false;
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('open')) {
            this.internalOpen = this.open;
        }
    }
    handleTriggerClick() {
        if (this.disabled || this.trigger !== 'click')
            return;
        this.toggleOpen();
    }
    handleTriggerMouseEnter() {
        if (this.disabled || this.trigger !== 'hover')
            return;
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = undefined;
        }
        this.setOpen(true);
    }
    handleTriggerMouseLeave() {
        if (this.disabled || this.trigger !== 'hover')
            return;
        this.closeTimer = window.setTimeout(() => {
            this.setOpen(false);
        }, 100);
    }
    handlePopupMouseEnter() {
        if (this.trigger !== 'hover')
            return;
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = undefined;
        }
    }
    handlePopupMouseLeave() {
        if (this.trigger !== 'hover')
            return;
        this.closeTimer = window.setTimeout(() => {
            this.setOpen(false);
        }, 100);
    }
    toggleOpen() {
        this.setOpen(!this.internalOpen);
    }
    setOpen(open) {
        if (this.internalOpen === open)
            return;
        this.internalOpen = open;
        this.open = open;
        this.dispatchEvent(new CustomEvent('open-change', {
            detail: { open },
            bubbles: true,
            composed: true
        }));
    }
    handleConfirm() {
        this.dispatchEvent(new CustomEvent('confirm', {
            bubbles: true,
            composed: true
        }));
        this.setOpen(false);
    }
    handleCancel() {
        this.dispatchEvent(new CustomEvent('cancel', {
            bubbles: true,
            composed: true
        }));
        this.setOpen(false);
    }
    handleDocumentClick(e) {
        if (this.trigger !== 'click')
            return;
        const path = e.composedPath();
        if (!path.includes(this)) {
            this.setOpen(false);
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this.internalOpen = this.open;
        document.addEventListener('click', this.handleDocumentClick.bind(this));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this.handleDocumentClick.bind(this));
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
        }
    }
    render() {
        const popupClasses = {
            'mx-popconfirm-popup': true,
            'mx-popconfirm-open': this.internalOpen,
        };
        const defaultIcon = html `
      <svg viewBox="64 64 896 896">
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"/>
      </svg>
    `;
        return html `
      <div 
        class="mx-popconfirm-trigger"
        @click=${this.handleTriggerClick}
        @mouseenter=${this.handleTriggerMouseEnter}
        @mouseleave=${this.handleTriggerMouseLeave}
      >
        <slot></slot>
      </div>

      <div 
        class=${classMap(popupClasses)}
        data-placement=${this.placement}
        @mouseenter=${this.handlePopupMouseEnter}
        @mouseleave=${this.handlePopupMouseLeave}
      >
        <div class="mx-popconfirm-inner">
          <div class="mx-popconfirm-message">
            <span class="mx-popconfirm-icon">
              ${this.hasSlot('icon') ? html `<slot name="icon"></slot>` : defaultIcon}
            </span>
            <div class="mx-popconfirm-message-content">
              <div class="mx-popconfirm-title">
                ${this.hasSlot('title') ? html `<slot name="title"></slot>` : this.title}
              </div>
              ${this.description || this.hasSlot('description') ? html `
                <div class="mx-popconfirm-description">
                  ${this.hasSlot('description') ? html `<slot name="description"></slot>` : this.description}
                </div>
              ` : ''}
            </div>
          </div>
          <div class="mx-popconfirm-buttons">
            <button 
              class="mx-popconfirm-btn mx-popconfirm-btn-default"
              @click=${this.handleCancel}
            >
              ${this.cancelText}
            </button>
            <button 
              class="mx-popconfirm-btn mx-popconfirm-btn-${this.okType}"
              @click=${this.handleConfirm}
            >
              ${this.okText}
            </button>
          </div>
        </div>
      </div>
    `;
    }
    hasSlot(name) {
        return Array.from(this.querySelectorAll(`[slot="${name}"]`)).length > 0;
    }
};
MXPopconfirm.styles = css `
    :host {
      display: inline-block;
      position: relative;
    }

    .mx-popconfirm-trigger {
      display: inline-block;
      cursor: pointer;
    }

    .mx-popconfirm-popup {
      position: absolute;
      z-index: 1050;
      min-width: 200px;
      max-width: 300px;
      padding: 12px;
      background-color: var(--mx-color-bg-elevated, #ffffff);
      border-radius: var(--mx-border-radius-lg, 8px);
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
                  0 3px 6px -4px rgba(0, 0, 0, 0.12),
                  0 9px 28px 8px rgba(0, 0, 0, 0.05);
      opacity: 0;
      transform-origin: center;
      transform: scale(0.8);
      transition: opacity 0.2s, transform 0.2s;
      pointer-events: none;
      visibility: hidden;
    }

    .mx-popconfirm-popup.mx-popconfirm-open {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
      visibility: visible;
    }

    /* Placement styles */
    .mx-popconfirm-popup[data-placement^="top"] {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) scale(0.8);
      margin-bottom: 8px;
    }

    .mx-popconfirm-popup[data-placement^="top"].mx-popconfirm-open {
      transform: translateX(-50%) scale(1);
    }

    .mx-popconfirm-popup[data-placement^="bottom"] {
      top: 100%;
      left: 50%;
      transform: translateX(-50%) scale(0.8);
      margin-top: 8px;
    }

    .mx-popconfirm-popup[data-placement^="bottom"].mx-popconfirm-open {
      transform: translateX(-50%) scale(1);
    }

    .mx-popconfirm-popup[data-placement^="left"] {
      right: 100%;
      top: 50%;
      transform: translateY(-50%) scale(0.8);
      margin-right: 8px;
    }

    .mx-popconfirm-popup[data-placement^="left"].mx-popconfirm-open {
      transform: translateY(-50%) scale(1);
    }

    .mx-popconfirm-popup[data-placement^="right"] {
      left: 100%;
      top: 50%;
      transform: translateY(-50%) scale(0.8);
      margin-left: 8px;
    }

    .mx-popconfirm-popup[data-placement^="right"].mx-popconfirm-open {
      transform: translateY(-50%) scale(1);
    }

    .mx-popconfirm-inner {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mx-popconfirm-message {
      display: flex;
      gap: 8px;
      align-items: flex-start;
    }

    .mx-popconfirm-icon {
      flex: none;
      font-size: 16px;
      color: var(--mx-color-warning, #faad14);
      margin-top: 2px;
    }

    .mx-popconfirm-icon svg {
      width: 1em;
      height: 1em;
      fill: currentColor;
    }

    .mx-popconfirm-message-content {
      flex: 1;
    }

    .mx-popconfirm-title {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      font-weight: 500;
      line-height: 1.5714285714285714;
      margin: 0;
    }

    .mx-popconfirm-description {
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.65));
      font-size: var(--mx-font-size, 14px);
      line-height: 1.5714285714285714;
      margin: 4px 0 0 0;
    }

    .mx-popconfirm-buttons {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      margin-top: 4px;
    }

    .mx-popconfirm-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 400;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
      font-size: var(--mx-font-size-sm, 14px);
      height: 24px;
      padding: 0 8px;
      border-radius: var(--mx-border-radius-sm, 4px);
      border: 1px solid transparent;
      background: transparent;
      outline: none;
    }

    .mx-popconfirm-btn-default {
      border-color: var(--mx-color-border, #d9d9d9);
      background-color: var(--mx-color-bg-container, #ffffff);
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
    }

    .mx-popconfirm-btn-default:hover {
      border-color: var(--mx-color-primary-hover, #4096ff);
      color: var(--mx-color-primary-hover, #4096ff);
    }

    .mx-popconfirm-btn-primary {
      background-color: var(--mx-color-primary, #1677ff);
      border-color: var(--mx-color-primary, #1677ff);
      color: #ffffff;
    }

    .mx-popconfirm-btn-primary:hover {
      background-color: var(--mx-color-primary-hover, #4096ff);
      border-color: var(--mx-color-primary-hover, #4096ff);
    }

    .mx-popconfirm-btn-danger {
      background-color: var(--mx-color-error, #ff4d4f);
      border-color: var(--mx-color-error, #ff4d4f);
      color: #ffffff;
    }

    .mx-popconfirm-btn-danger:hover {
      background-color: var(--mx-color-error-hover, #ff7875);
      border-color: var(--mx-color-error-hover, #ff7875);
    }

    :host([disabled]) .mx-popconfirm-trigger {
      cursor: not-allowed;
      opacity: 0.6;
    }
  `;
__decorate([
    property({ type: String })
], MXPopconfirm.prototype, "title", void 0);
__decorate([
    property({ type: String })
], MXPopconfirm.prototype, "description", void 0);
__decorate([
    property({ type: String, attribute: 'ok-text' })
], MXPopconfirm.prototype, "okText", void 0);
__decorate([
    property({ type: String, attribute: 'cancel-text' })
], MXPopconfirm.prototype, "cancelText", void 0);
__decorate([
    property({ type: String, attribute: 'ok-type' })
], MXPopconfirm.prototype, "okType", void 0);
__decorate([
    property({ type: String })
], MXPopconfirm.prototype, "placement", void 0);
__decorate([
    property({ type: Boolean })
], MXPopconfirm.prototype, "open", void 0);
__decorate([
    property({ type: Boolean })
], MXPopconfirm.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], MXPopconfirm.prototype, "trigger", void 0);
__decorate([
    property({ type: String })
], MXPopconfirm.prototype, "icon", void 0);
__decorate([
    state()
], MXPopconfirm.prototype, "internalOpen", void 0);
MXPopconfirm = __decorate([
    customElement('mx-popconfirm')
], MXPopconfirm);
export { MXPopconfirm };
//# sourceMappingURL=mx-popconfirm.js.map