var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
/**
 * TextArea component for multi-line text entry.
 *
 * @element mx-input-textarea
 *
 * @attr {InputStatus} status - Validation status
 * @attr {string} value - Input value
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} allow-clear - Show clear button
 * @attr {boolean} show-count - Show character count
 * @attr {number} max-length - Maximum character length
 * @attr {number} rows - Number of rows
 * @attr {boolean|object} auto-size - Auto-size configuration
 *
 * @fires change - Fired when input value changes
 * @fires input - Fired when user types
 *
 * @example
 * ```html
 * <mx-input-textarea placeholder="Enter text" rows="4"></mx-input-textarea>
 * <mx-input-textarea auto-size show-count max-length="200"></mx-input-textarea>
 * ```
 */
let MXInputTextarea = class MXInputTextarea extends LitElement {
    constructor() {
        super(...arguments);
        this.status = '';
        this.value = '';
        this.placeholder = '';
        this.disabled = false;
        this.showCount = false;
        this.rows = 4;
        this.internalValue = '';
    }
    connectedCallback() {
        super.connectedCallback();
        this.internalValue = this.value;
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('value') && this.value !== this.internalValue) {
            this.internalValue = this.value;
        }
        if (changedProperties.has('internalValue') || changedProperties.has('autoSize')) {
            this.adjustHeight();
        }
    }
    adjustHeight() {
        if (!this.autoSize || !this.textareaElement)
            return;
        const config = typeof this.autoSize === 'object' ? this.autoSize : {};
        const { minRows = 2, maxRows } = config;
        // Reset height to get proper scrollHeight
        this.textareaElement.style.height = 'auto';
        const lineHeight = parseFloat(getComputedStyle(this.textareaElement).lineHeight);
        const paddingTop = parseFloat(getComputedStyle(this.textareaElement).paddingTop);
        const paddingBottom = parseFloat(getComputedStyle(this.textareaElement).paddingBottom);
        const minHeight = lineHeight * minRows + paddingTop + paddingBottom;
        const maxHeight = maxRows ? lineHeight * maxRows + paddingTop + paddingBottom : Infinity;
        const scrollHeight = this.textareaElement.scrollHeight;
        const newHeight = Math.max(minHeight, Math.min(maxHeight, scrollHeight));
        this.textareaElement.style.height = `${newHeight}px`;
    }
    handleInput(e) {
        const textarea = e.target;
        this.internalValue = textarea.value;
        this.value = textarea.value;
        this.dispatchEvent(new CustomEvent('input', {
            detail: { value: textarea.value },
            bubbles: true,
            composed: true
        }));
    }
    handleChange(e) {
        const textarea = e.target;
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: textarea.value },
            bubbles: true,
            composed: true
        }));
    }
    focus() {
        this.textareaElement?.focus();
    }
    blur() {
        this.textareaElement?.blur();
    }
    render() {
        const classes = {
            'mx-textarea-wrapper': true,
            [`mx-textarea-${this.status}`]: !!this.status,
        };
        const textareaClasses = {
            'mx-textarea-autosize': !!this.autoSize,
        };
        const count = this.internalValue.length;
        const exceededMax = this.maxLength !== undefined && count > this.maxLength;
        return html `
      <div class=${classMap(classes)}>
        <textarea
          class=${classMap(textareaClasses)}
          .value=${live(this.internalValue)}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          rows=${this.rows}
          maxlength=${this.maxLength || ''}
          @input=${this.handleInput}
          @change=${this.handleChange}
        ></textarea>
        
        ${this.showCount ? html `
          <div class="mx-textarea-count ${exceededMax ? 'mx-textarea-count-error' : ''}">
            ${this.maxLength ? `${count} / ${this.maxLength}` : count}
          </div>
        ` : ''}
      </div>
    `;
    }
};
MXInputTextarea.styles = css `
    :host {
      display: inline-block;
      width: 100%;
    }

    .mx-textarea-wrapper {
      position: relative;
      display: inline-flex;
      width: 100%;
      flex-direction: column;
    }

    textarea {
      width: 100%;
      min-width: 0;
      margin: 0;
      padding: 4px 11px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      line-height: 1.5714285714285714;
      background-color: var(--mx-color-bg-container, #ffffff);
      border: 1px solid var(--mx-color-border, #d9d9d9);
      border-radius: var(--mx-border-radius, 6px);
      transition: all 0.2s;
      font-family: inherit;
      resize: vertical;
    }

    textarea::placeholder {
      color: rgba(0, 0, 0, 0.25);
    }

    textarea:hover:not(:disabled) {
      border-color: var(--mx-color-primary-hover, #4096ff);
    }

    textarea:focus {
      border-color: var(--mx-color-primary, #1677ff);
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
      outline: 0;
    }

    textarea:disabled {
      color: rgba(0, 0, 0, 0.25);
      background-color: rgba(0, 0, 0, 0.04);
      border-color: #d9d9d9;
      cursor: not-allowed;
    }

    .mx-textarea-error textarea {
      border-color: var(--mx-color-error, #ff4d4f);
    }

    .mx-textarea-error textarea:focus {
      border-color: var(--mx-color-error, #ff4d4f);
      box-shadow: 0 0 0 2px rgba(255, 38, 5, 0.06);
    }

    .mx-textarea-warning textarea {
      border-color: var(--mx-color-warning, #faad14);
    }

    .mx-textarea-warning textarea:focus {
      border-color: var(--mx-color-warning, #faad14);
      box-shadow: 0 0 0 2px rgba(255, 215, 5, 0.1);
    }

    .mx-textarea-count {
      margin-top: 4px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
      text-align: right;
    }

    .mx-textarea-count-error {
      color: var(--mx-color-error, #ff4d4f);
    }

    .mx-textarea-autosize {
      resize: none;
    }
  `;
__decorate([
    property({ type: String })
], MXInputTextarea.prototype, "status", void 0);
__decorate([
    property({ type: String })
], MXInputTextarea.prototype, "value", void 0);
__decorate([
    property({ type: String })
], MXInputTextarea.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean })
], MXInputTextarea.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-count' })
], MXInputTextarea.prototype, "showCount", void 0);
__decorate([
    property({ type: Number, attribute: 'max-length' })
], MXInputTextarea.prototype, "maxLength", void 0);
__decorate([
    property({ type: Number })
], MXInputTextarea.prototype, "rows", void 0);
__decorate([
    property({ type: Object, attribute: 'auto-size' })
], MXInputTextarea.prototype, "autoSize", void 0);
__decorate([
    query('textarea')
], MXInputTextarea.prototype, "textareaElement", void 0);
__decorate([
    state()
], MXInputTextarea.prototype, "internalValue", void 0);
MXInputTextarea = __decorate([
    customElement('mx-input-textarea')
], MXInputTextarea);
export { MXInputTextarea };
//# sourceMappingURL=mx-input-textarea.js.map