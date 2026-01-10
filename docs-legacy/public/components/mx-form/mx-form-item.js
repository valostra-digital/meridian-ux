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
 * Form Item component - Form field wrapper with label and validation
 *
 * @element mx-form-item
 *
 * @slot - Form control element
 */
let MXFormItem = class MXFormItem extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Whether field is required
         */
        this.required = false;
        /**
         * Validation status
         */
        this.validateStatus = '';
        /**
         * Whether to show feedback icon
         */
        this.hasFeedback = false;
        this.errorMessage = '';
    }
    connectedCallback() {
        super.connectedCallback();
        this.findForm();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.form) {
            this.form.unregisterField(this.name);
        }
    }
    findForm() {
        let parent = this.parentElement;
        while (parent) {
            if (parent.tagName === 'MX-FORM') {
                this.form = parent;
                this.form.registerField(this.name, '', this.rules);
                break;
            }
            parent = parent.parentElement;
        }
    }
    handleSlotChange() {
        const slot = this.shadowRoot?.querySelector('slot:not([name])');
        const elements = slot?.assignedElements();
        if (elements && elements.length > 0) {
            const control = elements[0];
            // Listen for input changes
            control.addEventListener('change', (e) => {
                const value = e.detail?.value ?? e.target.value;
                if (this.form) {
                    this.form.setFieldValue(this.name, value);
                    this.validateField();
                }
            });
            control.addEventListener('input', (e) => {
                const value = e.detail?.value ?? e.target.value;
                if (this.form) {
                    this.form.setFieldValue(this.name, value);
                }
            });
            control.addEventListener('blur', () => {
                this.validateField();
            });
        }
    }
    async validateField() {
        if (!this.form)
            return;
        const isValid = await this.form.validateField(this.name);
        if (!isValid) {
            this.errorMessage = this.form.getFieldError(this.name) || '';
            this.validateStatus = 'error';
        }
        else {
            this.errorMessage = '';
            this.validateStatus = 'success';
        }
        this.requestUpdate();
    }
    render() {
        const itemClasses = {
            'mx-form-item': true,
            'mx-form-item-has-error': this.validateStatus === 'error',
            'mx-form-item-has-warning': this.validateStatus === 'warning',
            'mx-form-item-has-success': this.validateStatus === 'success',
            'mx-form-item-has-feedback': this.hasFeedback,
        };
        const labelClasses = {
            'mx-form-item-label': true,
            'mx-form-item-required': !!(this.required || this.rules?.some(r => r.required)),
        };
        return html `
      <div class=${classMap(itemClasses)}>
        <div class="mx-form-item-row">
          ${this.label ? html `
            <div class=${classMap(labelClasses)}>
              <label for=${this.name} title=${this.tooltip || this.label}>
                ${this.label}
              </label>
            </div>
          ` : ''}
          <div class="mx-form-item-control">
            <div class="mx-form-item-control-input">
              <div class="mx-form-item-control-input-content">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </div>
            </div>
            ${this.errorMessage || this.help || this.extra ? html `
              <div class="mx-form-item-explain ${this.errorMessage ? 'mx-form-item-explain-error' : ''}">
                ${this.errorMessage || this.help || this.extra}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
    }
};
MXFormItem.styles = css `
    :host {
      display: block;
      margin-bottom: 24px;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-form-item {
      box-sizing: border-box;
    }

    .mx-form-item-row {
      display: flex;
      flex-wrap: wrap;
    }

    .mx-form-item-label {
      display: inline-block;
      flex-grow: 0;
      overflow: hidden;
      white-space: nowrap;
      text-align: right;
      vertical-align: middle;
    }

    .mx-form-item-label > label {
      position: relative;
      display: inline-flex;
      align-items: center;
      height: 32px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
    }

    .mx-form-item-label > label::after {
      content: ':';
      position: relative;
      margin: 0 8px 0 2px;
    }

    .mx-form-item-label-left > label::after {
      display: none;
    }

    .mx-form-item-required::before {
      display: inline-block;
      margin-right: 4px;
      color: var(--mx-color-error, #ff4d4f);
      font-size: var(--mx-font-size, 14px);
      font-family: inherit;
      line-height: 1;
      content: '*';
    }

    .mx-form-item-control {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .mx-form-item-control-input {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 32px;
    }

    .mx-form-item-control-input-content {
      flex: auto;
      max-width: 100%;
    }

    .mx-form-item-explain {
      clear: both;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      font-size: 14px;
      line-height: 1.5714285714285714;
      min-height: 24px;
    }

    .mx-form-item-explain-error {
      color: var(--mx-color-error, #ff4d4f);
    }

    .mx-form-item-explain-warning {
      color: var(--mx-color-warning, #faad14);
    }

    .mx-form-item-has-error .mx-form-item-control-input-content ::slotted(*) {
      border-color: var(--mx-color-error, #ff4d4f);
    }

    .mx-form-item-has-warning .mx-form-item-control-input-content ::slotted(*) {
      border-color: var(--mx-color-warning, #faad14);
    }

    .mx-form-item-has-success .mx-form-item-control-input-content ::slotted(*) {
      border-color: var(--mx-color-success, #52c41a);
    }

    /* Inline layout */
    .mx-form-inline .mx-form-item {
      display: inline-block;
      margin-right: 16px;
      margin-bottom: 0;
    }

    .mx-form-inline .mx-form-item-row {
      flex-wrap: nowrap;
    }

    .mx-form-inline .mx-form-item-label {
      flex: none;
    }
  `;
__decorate([
    property({ type: String })
], MXFormItem.prototype, "name", void 0);
__decorate([
    property({ type: String })
], MXFormItem.prototype, "label", void 0);
__decorate([
    property({ type: Array })
], MXFormItem.prototype, "rules", void 0);
__decorate([
    property({ type: String })
], MXFormItem.prototype, "extra", void 0);
__decorate([
    property({ type: String })
], MXFormItem.prototype, "tooltip", void 0);
__decorate([
    property({ type: Boolean })
], MXFormItem.prototype, "required", void 0);
__decorate([
    property({ type: String, attribute: 'validate-status' })
], MXFormItem.prototype, "validateStatus", void 0);
__decorate([
    property({ type: String })
], MXFormItem.prototype, "help", void 0);
__decorate([
    property({ type: Boolean, attribute: 'has-feedback' })
], MXFormItem.prototype, "hasFeedback", void 0);
__decorate([
    state()
], MXFormItem.prototype, "form", void 0);
__decorate([
    state()
], MXFormItem.prototype, "errorMessage", void 0);
MXFormItem = __decorate([
    customElement('mx-form-item')
], MXFormItem);
export { MXFormItem };
//# sourceMappingURL=mx-form-item.js.map