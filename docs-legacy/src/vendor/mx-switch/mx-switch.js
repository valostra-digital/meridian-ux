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
 * Switch component for toggle operations.
 *
 * @element mx-switch
 *
 * @attr {boolean} checked - Whether switch is on
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} loading - Loading state
 * @attr {SwitchSize} size - Switch size: small, default
 * @attr {string} checked-children - Text to display when checked
 * @attr {string} un-checked-children - Text to display when unchecked
 *
 * @fires change - Fired when checked state changes
 *
 * @slot checked - Content to display when checked
 * @slot unchecked - Content to display when unchecked
 *
 * @example
 * ```html
 * <mx-switch></mx-switch>
 * <mx-switch checked></mx-switch>
 * <mx-switch disabled></mx-switch>
 * <mx-switch loading></mx-switch>
 * <mx-switch size="small"></mx-switch>
 * <mx-switch checked-children="ON" un-checked-children="OFF"></mx-switch>
 * ```
 */
let MXSwitch = class MXSwitch extends LitElement {
    constructor() {
        super(...arguments);
        this.checked = false;
        this.disabled = false;
        this.loading = false;
        this.size = 'default';
        this.checkedChildren = '';
        this.unCheckedChildren = '';
        this.value = '';
        this.name = '';
    }
    handleChange(e) {
        const input = e.target;
        if (this.disabled || this.loading) {
            e.preventDefault();
            return;
        }
        this.checked = input.checked;
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
        if (this.disabled || this.loading) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
    render() {
        const classes = {
            'mx-switch': true,
            'mx-switch-checked': this.checked,
            'mx-switch-disabled': this.disabled,
            'mx-switch-loading': this.loading,
            [`mx-switch-${this.size}`]: this.size !== 'default',
        };
        const loadingIcon = html `
      <span class="mx-switch-loading-icon">
        <mx-icon 
          spin 
          svg='<svg viewBox="0 0 1024 1024" width="1em" height="1em"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"/></svg>'
        ></mx-icon>
      </span>
    `;
        return html `
      <button
        role="switch"
        type="button"
        class=${classMap(classes)}
        aria-checked=${this.checked}
        ?disabled=${this.disabled || this.loading}
        @click=${this.handleClick}
      >
        <input
          type="checkbox"
          .checked=${this.checked}
          ?disabled=${this.disabled || this.loading}
          .value=${this.value}
          name=${this.name}
          @change=${this.handleChange}
        />
        <div class="mx-switch-handle">
          ${this.loading ? loadingIcon : ''}
        </div>
        <span class="mx-switch-inner">
          <span class="mx-switch-inner-checked">
            ${this.checkedChildren || html `<slot name="checked"></slot>`}
          </span>
          <span class="mx-switch-inner-unchecked">
            ${this.unCheckedChildren || html `<slot name="unchecked"></slot>`}
          </span>
        </span>
      </button>
    `;
    }
};
MXSwitch.styles = css `
    :host {
      display: inline-block;
      cursor: pointer;
      vertical-align: middle;
    }

    :host([disabled]),
    :host([loading]) {
      cursor: not-allowed;
    }

    .mx-switch {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      min-width: 44px;
      height: 22px;
      line-height: 22px;
      vertical-align: middle;
      background-color: rgba(0, 0, 0, 0.25);
      border: 0;
      border-radius: 100px;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
    }

    .mx-switch-inner {
      display: block;
      overflow: hidden;
      border-radius: 100px;
      height: 100%;
      padding: 0 8px 0 25px;
      transition: padding 0.2s;
    }

    .mx-switch-inner-checked,
    .mx-switch-inner-unchecked {
      display: block;
      color: #fff;
      font-size: 12px;
      transition: margin 0.2s;
    }

    .mx-switch-inner-checked {
      margin-left: 0;
      margin-right: auto;
    }

    .mx-switch-inner-unchecked {
      margin-left: -100%;
      margin-right: 0;
    }

    .mx-switch-handle {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 18px;
      height: 18px;
      background-color: #fff;
      border-radius: 50%;
      transition: all 0.2s;
    }

    input[type="checkbox"] {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      cursor: pointer;
      opacity: 0;
      width: 100%;
      height: 100%;
    }

    /* Checked */
    .mx-switch-checked {
      background-color: var(--mx-color-primary, #1677ff);
    }

    .mx-switch-checked .mx-switch-inner {
      padding: 0 25px 0 8px;
    }

    .mx-switch-checked .mx-switch-inner-checked {
      margin-left: 0;
    }

    .mx-switch-checked .mx-switch-inner-unchecked {
      margin-left: 0;
      margin-right: -100%;
    }

    .mx-switch-checked .mx-switch-handle {
      left: calc(100% - 20px);
    }

    /* Small size */
    .mx-switch-small {
      min-width: 28px;
      height: 16px;
      line-height: 16px;
    }

    .mx-switch-small .mx-switch-handle {
      width: 12px;
      height: 12px;
    }

    .mx-switch-small .mx-switch-inner {
      padding: 0 5px 0 18px;
      font-size: 12px;
    }

    .mx-switch-small.mx-switch-checked .mx-switch-inner {
      padding: 0 18px 0 5px;
    }

    .mx-switch-small.mx-switch-checked .mx-switch-handle {
      left: calc(100% - 14px);
    }

    /* Loading */
    .mx-switch-loading {
      opacity: 0.4;
      pointer-events: none;
    }

    .mx-switch-loading-icon {
      position: relative;
      top: 2px;
      color: rgba(0, 0, 0, 0.65);
      vertical-align: top;
    }

    .mx-switch-checked .mx-switch-loading-icon {
      color: var(--mx-color-primary, #1677ff);
    }

    /* Disabled */
    .mx-switch-disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    .mx-switch-disabled * {
      cursor: not-allowed;
    }

    /* Hover */
    .mx-switch:not(.mx-switch-disabled):hover {
      background-color: rgba(0, 0, 0, 0.45);
    }

    .mx-switch-checked:not(.mx-switch-disabled):hover {
      background-color: var(--mx-color-primary-hover, #4096ff);
    }

    /* Focus */
    input[type="checkbox"]:focus-visible ~ .mx-switch-handle {
      outline: 2px solid var(--mx-color-primary, #1677ff);
      outline-offset: 2px;
    }
  `;
__decorate([
    property({ type: Boolean, reflect: true })
], MXSwitch.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MXSwitch.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MXSwitch.prototype, "loading", void 0);
__decorate([
    property({ type: String })
], MXSwitch.prototype, "size", void 0);
__decorate([
    property({ type: String, attribute: 'checked-children' })
], MXSwitch.prototype, "checkedChildren", void 0);
__decorate([
    property({ type: String, attribute: 'un-checked-children' })
], MXSwitch.prototype, "unCheckedChildren", void 0);
__decorate([
    property({ type: String })
], MXSwitch.prototype, "value", void 0);
__decorate([
    property({ type: String })
], MXSwitch.prototype, "name", void 0);
MXSwitch = __decorate([
    customElement('mx-switch')
], MXSwitch);
export { MXSwitch };
//# sourceMappingURL=mx-switch.js.map