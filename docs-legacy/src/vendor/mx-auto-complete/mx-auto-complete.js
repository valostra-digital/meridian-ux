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
 * AutoComplete component for input with suggestions.
 *
 * @element mx-auto-complete
 *
 * @attr {string} value - Current input value
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} disabled - Whether the input is disabled
 * @attr {string} size - Size: large, default, small
 * @attr {string} options - JSON string of options array
 * @attr {boolean} open - Whether dropdown is open
 *
 * @fires change - Fired when value changes
 * @fires select - Fired when option is selected
 * @fires search - Fired when searching
 *
 * @example
 * ```html
 * <mx-auto-complete
 *   placeholder="Search..."
 *   options='[{"value":"apple"},{"value":"banana"}]'
 * ></mx-auto-complete>
 * ```
 */
let MXAutoComplete = class MXAutoComplete extends LitElement {
    constructor() {
        super(...arguments);
        this.value = '';
        this.placeholder = '';
        this.disabled = false;
        this.size = 'default';
        this.options = '[]';
        this.open = false;
        this.parsedOptions = [];
        this.filteredOptions = [];
    }
    updated(changedProperties) {
        if (changedProperties.has('options')) {
            try {
                this.parsedOptions = JSON.parse(this.options);
                this.filterOptions();
            }
            catch (e) {
                console.error('Invalid options JSON:', e);
                this.parsedOptions = [];
            }
        }
        if (changedProperties.has('value')) {
            this.filterOptions();
        }
    }
    filterOptions() {
        if (!this.value) {
            this.filteredOptions = this.parsedOptions;
        }
        else {
            const lowerValue = this.value.toLowerCase();
            this.filteredOptions = this.parsedOptions.filter(option => option.value.toLowerCase().includes(lowerValue) ||
                (option.label && option.label.toLowerCase().includes(lowerValue)));
        }
    }
    handleInput(e) {
        const input = e.target;
        this.value = input.value;
        this.open = true;
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
        this.dispatchEvent(new CustomEvent('search', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }
    handleFocus() {
        this.open = true;
    }
    handleBlur() {
        // Delay to allow click on option
        setTimeout(() => {
            this.open = false;
        }, 200);
    }
    handleOptionClick(option) {
        this.value = option.value;
        this.open = false;
        this.dispatchEvent(new CustomEvent('select', {
            detail: { value: option.value, option },
            bubbles: true,
            composed: true
        }));
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }
    render() {
        const classes = {
            'mx-auto-complete': true,
            [`mx-auto-complete-${this.size}`]: this.size !== 'default'
        };
        const dropdownClasses = {
            'mx-auto-complete-dropdown': true,
            'mx-auto-complete-dropdown-open': this.open
        };
        return html `
      <div class=${classMap(classes)}>
        <input
          type="text"
          class="mx-auto-complete-input"
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        />

        <div class=${classMap(dropdownClasses)}>
          ${this.filteredOptions.length > 0 ? html `
            ${this.filteredOptions.map(option => {
            const optionClasses = {
                'mx-auto-complete-option': true,
                'mx-auto-complete-option-selected': this.value === option.value
            };
            return html `
                <div
                  class=${classMap(optionClasses)}
                  @click=${() => this.handleOptionClick(option)}
                >
                  ${option.label || option.value}
                </div>
              `;
        })}
          ` : html `
            <div class="mx-auto-complete-empty">No results found</div>
          `}
        </div>
      </div>
    `;
    }
};
MXAutoComplete.styles = css `
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      position: relative;
      width: 100%;
    }

    .mx-auto-complete {
      position: relative;
      width: 100%;
    }

    .mx-auto-complete-input {
      width: 100%;
      padding: 4px 11px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      line-height: 1.5715;
      background-color: var(--mx-color-bg-container, #ffffff);
      border: 1px solid var(--mx-color-border, #d9d9d9);
      border-radius: var(--mx-border-radius, 6px);
      transition: all 0.2s;
      box-sizing: border-box;
    }

    .mx-auto-complete-input:hover {
      border-color: var(--mx-color-primary-hover, #4096ff);
    }

    .mx-auto-complete-input:focus {
      border-color: var(--mx-color-primary, #1677ff);
      outline: none;
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    }

    .mx-auto-complete-input:disabled {
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
      background-color: var(--mx-color-bg-container-disabled, rgba(0, 0, 0, 0.04));
      cursor: not-allowed;
    }

    .mx-auto-complete-input::placeholder {
      color: var(--mx-color-text-placeholder, rgba(0, 0, 0, 0.25));
    }

    /* Size variants */
    .mx-auto-complete-large .mx-auto-complete-input {
      padding: 7px 11px;
      font-size: 16px;
    }

    .mx-auto-complete-small .mx-auto-complete-input {
      padding: 0px 7px;
      font-size: 14px;
    }

    .mx-auto-complete-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background: var(--mx-color-bg-elevated, #ffffff);
      border-radius: var(--mx-border-radius, 6px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
      z-index: 1050;
      max-height: 256px;
      overflow-y: auto;
      display: none;
    }

    .mx-auto-complete-dropdown-open {
      display: block;
    }

    .mx-auto-complete-option {
      padding: 5px 12px;
      cursor: pointer;
      transition: background 0.3s;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
    }

    .mx-auto-complete-option:hover {
      background: var(--mx-color-fill-secondary, rgba(0, 0, 0, 0.06));
    }

    .mx-auto-complete-option-selected {
      background: var(--mx-color-fill-content, rgba(0, 0, 0, 0.06));
      font-weight: 600;
    }

    .mx-auto-complete-empty {
      padding: 5px 12px;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      text-align: center;
    }
  `;
__decorate([
    property({ type: String })
], MXAutoComplete.prototype, "value", void 0);
__decorate([
    property({ type: String })
], MXAutoComplete.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean })
], MXAutoComplete.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], MXAutoComplete.prototype, "size", void 0);
__decorate([
    property({ type: String })
], MXAutoComplete.prototype, "options", void 0);
__decorate([
    property({ type: Boolean })
], MXAutoComplete.prototype, "open", void 0);
__decorate([
    state()
], MXAutoComplete.prototype, "parsedOptions", void 0);
__decorate([
    state()
], MXAutoComplete.prototype, "filteredOptions", void 0);
MXAutoComplete = __decorate([
    customElement('mx-auto-complete')
], MXAutoComplete);
export { MXAutoComplete };
//# sourceMappingURL=mx-auto-complete.js.map