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
 * Modal component for dialog boxes.
 *
 * @element mx-modal
 *
 * @attr {boolean} open - Whether modal is visible
 * @attr {string} title - Modal title
 * @attr {ModalWidth} width - Width of modal (default 520px)
 * @attr {boolean} centered - Whether modal is vertically centered
 * @attr {boolean} closable - Whether to show close button
 * @attr {boolean} mask - Whether to show overlay mask
 * @attr {boolean} mask-closable - Whether clicking mask closes modal
 * @attr {boolean} keyboard - Whether ESC key closes modal
 * @attr {number} z-index - CSS z-index
 * @attr {string} ok-text - Text for OK button
 * @attr {string} cancel-text - Text for Cancel button
 * @attr {boolean} confirm-loading - Whether OK button is loading
 *
 * @slot - Modal content
 * @slot title - Custom title content
 * @slot footer - Custom footer content
 *
 * @fires ok - Dispatched when OK button clicked
 * @fires cancel - Dispatched when cancel/close clicked
 *
 * @example
 * ```html
 * <mx-modal open title="Modal Title">
 *   <p>Modal content</p>
 * </mx-modal>
 * ```
 */
let MXModal = class MXModal extends LitElement {
    constructor() {
        super(...arguments);
        this.open = false;
        this.title = '';
        this.width = '520px';
        this.centered = false;
        this.closable = true;
        this.mask = true;
        this.maskClosable = true;
        this.keyboard = true;
        this.zIndex = 1000;
        this.okText = 'OK';
        this.cancelText = 'Cancel';
        this.confirmLoading = false;
        this.animating = false;
        this.handleKeyDown = (e) => {
            if (this.keyboard && e.key === 'Escape' && this.open) {
                this.handleCancel();
            }
        };
    }
    handleOk() {
        this.dispatchEvent(new CustomEvent('ok', {
            bubbles: true,
            composed: true
        }));
    }
    handleCancel() {
        this.dispatchEvent(new CustomEvent('cancel', {
            bubbles: true,
            composed: true
        }));
    }
    handleMaskClick(e) {
        if (e.target === e.currentTarget && this.maskClosable) {
            this.handleCancel();
        }
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('keydown', this.handleKeyDown);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('keydown', this.handleKeyDown);
        document.body.style.overflow = '';
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('open')) {
            if (this.open) {
                document.body.style.overflow = 'hidden';
                this.animating = true;
                setTimeout(() => {
                    this.animating = false;
                }, 200);
            }
            else {
                document.body.style.overflow = '';
            }
        }
    }
    render() {
        if (!this.open && !this.animating) {
            return null;
        }
        const hasTitle = this.title || this.querySelector('[slot="title"]');
        const hasFooter = this.querySelector('[slot="footer"]');
        const maskClasses = {
            'mx-modal-mask': true,
            'visible': this.open
        };
        const wrapClasses = {
            'mx-modal-wrap': true,
            'mx-modal-wrap-centered': this.centered,
            'visible': this.open
        };
        const modalClasses = {
            'mx-modal': true,
            'visible': this.open
        };
        const widthValue = typeof this.width === 'number' ? `${this.width}px` : this.width;
        return html `
      ${this.mask ? html `
        <div 
          class=${classMap(maskClasses)}
          style="z-index: ${this.zIndex}"
        ></div>
      ` : null}

      <div 
        class=${classMap(wrapClasses)}
        style="z-index: ${this.zIndex + 1}"
        @click=${this.handleMaskClick}
      >
        <div 
          class=${classMap(modalClasses)}
          style="width: ${widthValue}"
          role="dialog"
          aria-modal="true"
          aria-label="${this.title}"
        >
          <div class="mx-modal-content">
            ${this.closable ? html `
              <button 
                class="mx-modal-close"
                @click=${this.handleCancel}
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8.94 8l4.53 4.53a.67.67 0 01-.95.95L8 8.94l-4.53 4.53a.67.67 0 01-.95-.95L7.06 8 2.53 3.47a.67.67 0 11.95-.95L8 7.06l4.53-4.53a.67.67 0 11.95.95L8.94 8z"/>
                </svg>
              </button>
            ` : null}

            ${hasTitle ? html `
              <div class="mx-modal-header">
                <div class="mx-modal-title">
                  <slot name="title">${this.title}</slot>
                </div>
              </div>
            ` : null}

            <div class="mx-modal-body">
              <slot></slot>
            </div>

            ${hasFooter ? html `
              <div class="mx-modal-footer">
                <slot name="footer"></slot>
              </div>
            ` : html `
              <div class="mx-modal-footer">
                <mx-button @click=${this.handleCancel}>${this.cancelText}</mx-button>
                <mx-button 
                  type="primary" 
                  ?loading=${this.confirmLoading}
                  @click=${this.handleOk}
                >${this.okText}</mx-button>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
    }
};
MXModal.styles = css `
    :host {
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-modal-mask {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.45);
      pointer-events: auto;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .mx-modal-mask.visible {
      opacity: 1;
    }

    .mx-modal-wrap {
      position: fixed;
      inset: 0;
      z-index: 1000;
      overflow: auto;
      outline: 0;
      pointer-events: none;
    }

    .mx-modal-wrap.visible {
      pointer-events: auto;
    }

    .mx-modal-wrap-centered {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mx-modal {
      position: relative;
      top: 100px;
      width: auto;
      max-width: calc(100vw - 32px);
      margin: 0 auto;
      padding-bottom: 24px;
      pointer-events: none;
      transform: scale(0.5);
      opacity: 0;
      transition: transform 0.2s, opacity 0.2s;
    }

    .mx-modal.visible {
      transform: scale(1);
      opacity: 1;
      pointer-events: auto;
    }

    .mx-modal-wrap-centered .mx-modal {
      top: 0;
    }

    .mx-modal-content {
      position: relative;
      background-color: var(--mx-color-bg-container, #ffffff);
      background-clip: padding-box;
      border: 0;
      border-radius: var(--mx-border-radius-lg, 8px);
      box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
                  0 6px 16px 0 rgba(0, 0, 0, 0.08),
                  0 9px 28px 8px rgba(0, 0, 0, 0.05);
      pointer-events: auto;
    }

    .mx-modal-close {
      position: absolute;
      top: 17px;
      right: 17px;
      z-index: 10;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      color: var(--mx-color-text-tertiary, rgba(0, 0, 0, 0.45));
      font-size: 16px;
      background: transparent;
      border: 0;
      cursor: pointer;
      transition: color 0.3s;
    }

    .mx-modal-close:hover {
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.65));
    }

    .mx-modal-header {
      padding: 16px 24px;
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      background: var(--mx-color-bg-container, #ffffff);
      border-bottom: 1px solid var(--mx-color-border-secondary, #f0f0f0);
      border-radius: 8px 8px 0 0;
    }

    .mx-modal-title {
      margin: 0;
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      word-wrap: break-word;
    }

    .mx-modal-body {
      padding: 24px;
      font-size: 14px;
      line-height: 1.5714285714285714;
      word-wrap: break-word;
    }

    .mx-modal-footer {
      padding: 10px 16px;
      text-align: right;
      background: transparent;
      border-top: 1px solid var(--mx-color-border-secondary, #f0f0f0);
      border-radius: 0 0 8px 8px;
    }

    .mx-modal-footer button {
      margin-left: 8px;
    }
  `;
__decorate([
    property({ type: Boolean, reflect: true })
], MXModal.prototype, "open", void 0);
__decorate([
    property({ type: String })
], MXModal.prototype, "title", void 0);
__decorate([
    property({ type: String })
], MXModal.prototype, "width", void 0);
__decorate([
    property({ type: Boolean })
], MXModal.prototype, "centered", void 0);
__decorate([
    property({ type: Boolean })
], MXModal.prototype, "closable", void 0);
__decorate([
    property({ type: Boolean })
], MXModal.prototype, "mask", void 0);
__decorate([
    property({ type: Boolean, attribute: 'mask-closable' })
], MXModal.prototype, "maskClosable", void 0);
__decorate([
    property({ type: Boolean })
], MXModal.prototype, "keyboard", void 0);
__decorate([
    property({ type: Number, attribute: 'z-index' })
], MXModal.prototype, "zIndex", void 0);
__decorate([
    property({ type: String, attribute: 'ok-text' })
], MXModal.prototype, "okText", void 0);
__decorate([
    property({ type: String, attribute: 'cancel-text' })
], MXModal.prototype, "cancelText", void 0);
__decorate([
    property({ type: Boolean, attribute: 'confirm-loading' })
], MXModal.prototype, "confirmLoading", void 0);
__decorate([
    state()
], MXModal.prototype, "animating", void 0);
MXModal = __decorate([
    customElement('mx-modal')
], MXModal);
export { MXModal };
//# sourceMappingURL=mx-modal.js.map