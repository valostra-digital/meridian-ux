var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
/**
 * Checkbox component for selection.
 *
 * @element mx-checkbox
 *
 * @attr {boolean} checked - Whether checkbox is checked
 * @attr {boolean} indeterminate - Whether checkbox is in indeterminate state
 * @attr {boolean} disabled - Disabled state
 * @attr {string} value - Value of checkbox
 *
 * @fires change - Fired when checked state changes
 *
 * @slot - Label content
 *
 * @example
 * ```html
 * <mx-checkbox>Checkbox</mx-checkbox>
 * <mx-checkbox checked>Checked</mx-checkbox>
 * <mx-checkbox indeterminate>Indeterminate</mx-checkbox>
 * <mx-checkbox disabled>Disabled</mx-checkbox>
 * ```
 */
let MXCheckbox = class MXCheckbox extends LitElement {
    constructor() {
        super(...arguments);
        this.checked = false;
        this.indeterminate = false;
        this.disabled = false;
        this.value = '';
        this.name = '';
    }
    handleChange(e) {
        const input = e.target;
        if (this.disabled) {
            e.preventDefault();
            return;
        }
        this.checked = input.checked;
        this.indeterminate = false;
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                checked: this.checked,
                value: this.value
            },
            bubbles: true,
            composed: true
        }));
    }
    handleClick(e) {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
    render() {
        const classes = {
            'mx-checkbox': true,
            'mx-checkbox-checked': this.checked,
            'mx-checkbox-indeterminate': this.indeterminate,
        };
        return html `
      <label class=${classMap(classes)} @click=${this.handleClick}>
        <span class="mx-checkbox-input">
          <input
            type="checkbox"
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            ?disabled=${this.disabled}
            .value=${this.value}
            name=${this.name}
            @change=${this.handleChange}
            aria-checked=${this.indeterminate ? 'mixed' : this.checked}
          />
          <span class="mx-checkbox-inner"></span>
        </span>
        <span class="mx-checkbox-label">
          <slot></slot>
        </span>
      </label>
    `;
    }
};
MXCheckbox.styles = css `
    :host {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      font-size: var(--mx-font-size, 14px);
      line-height: 1;
    }

    :host([disabled]) {
      cursor: not-allowed;
    }

    .mx-checkbox {
      position: relative;
      display: inline-flex;
      align-items: center;
      cursor: inherit;
      gap: 8px;
    }

    .mx-checkbox-input {
      position: relative;
      display: inline-block;
      width: 16px;
      height: 16px;
      cursor: inherit;
    }

    input[type="checkbox"] {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      opacity: 0;
      cursor: inherit;
    }

    .mx-checkbox-inner {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      border: 1px solid var(--mx-color-border, #d9d9d9);
      border-radius: 2px;
      background-color: var(--mx-color-bg-container, #ffffff);
      transition: all 0.2s;
    }

    .mx-checkbox-inner::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      display: table;
      width: 5.71428571px;
      height: 9.14285714px;
      border: 2px solid #fff;
      border-top: 0;
      border-left: 0;
      transform: rotate(45deg) scale(0) translate(-50%, -50%);
      opacity: 0;
      transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
      transform-origin: 0 0;
    }

    /* Hover */
    .mx-checkbox:hover:not([disabled]) .mx-checkbox-inner {
      border-color: var(--mx-color-primary, #1677ff);
    }

    /* Checked */
    input[type="checkbox"]:checked + .mx-checkbox-inner {
      background-color: var(--mx-color-primary, #1677ff);
      border-color: var(--mx-color-primary, #1677ff);
    }

    input[type="checkbox"]:checked + .mx-checkbox-inner::after {
      opacity: 1;
      transform: rotate(45deg) scale(1) translate(-50%, -50%);
      transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
    }

    /* Indeterminate */
    .mx-checkbox-indeterminate .mx-checkbox-inner {
      background-color: var(--mx-color-primary, #1677ff);
      border-color: var(--mx-color-primary, #1677ff);
    }

    .mx-checkbox-indeterminate .mx-checkbox-inner::after {
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      background-color: #fff;
      border: 0;
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
      content: '';
    }

    /* Disabled */
    :host([disabled]) .mx-checkbox-inner {
      background-color: rgba(0, 0, 0, 0.04);
      border-color: #d9d9d9;
    }

    :host([disabled]) input[type="checkbox"]:checked + .mx-checkbox-inner {
      background-color: rgba(0, 0, 0, 0.04);
      border-color: #d9d9d9;
    }

    :host([disabled]) input[type="checkbox"]:checked + .mx-checkbox-inner::after {
      border-color: rgba(0, 0, 0, 0.25);
    }

    :host([disabled]) .mx-checkbox-label {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }

    .mx-checkbox-label {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      padding-right: 8px;
      padding-left: 0;
    }

    /* Focus */
    input[type="checkbox"]:focus-visible + .mx-checkbox-inner {
      outline: 2px solid var(--mx-color-primary, #1677ff);
      outline-offset: 2px;
    }
  `;
__decorate([
    property({ type: Boolean, reflect: true })
], MXCheckbox.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean })
], MXCheckbox.prototype, "indeterminate", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MXCheckbox.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], MXCheckbox.prototype, "value", void 0);
__decorate([
    property({ type: String })
], MXCheckbox.prototype, "name", void 0);
MXCheckbox = __decorate([
    customElement('mx-checkbox')
], MXCheckbox);
export { MXCheckbox };
//# sourceMappingURL=mx-checkbox.js.map