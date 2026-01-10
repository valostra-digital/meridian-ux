var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
/**
 * Select component - Dropdown select with search
 *
 * @element mx-select
 *
 * @fires change - Dispatched when selection changes
 * @fires search - Dispatched when search input changes
 * @fires dropdown-visible-change - Dispatched when dropdown opens/closes
 *
 * @slot - Option elements (mx-option)
 */
let MXSelect = class MXSelect extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Options array
         */
        this.options = [];
        /**
         * Placeholder text
         */
        this.placeholder = 'Select';
        /**
         * Whether to show search
         */
        this.showSearch = false;
        /**
         * Whether to allow clear
         */
        this.allowClear = false;
        /**
         * Size
         */
        this.size = 'middle';
        /**
         * Variant
         */
        this.variant = 'outlined';
        /**
         * Whether disabled
         */
        this.disabled = false;
        /**
         * Loading state
         */
        this.loading = false;
        this.open = false;
        this.focused = false;
        this.searchValue = '';
        this.internalValue = [];
        this.handleDocumentClick = (e) => {
            if (!this.contains(e.target)) {
                this.open = false;
                this.focused = false;
            }
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.initializeValue();
        document.addEventListener('click', this.handleDocumentClick);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this.handleDocumentClick);
    }
    willUpdate(changedProperties) {
        if (changedProperties.has('value')) {
            this.initializeValue();
        }
    }
    initializeValue() {
        if (this.value !== undefined) {
            this.internalValue = Array.isArray(this.value) ? [...this.value] : [this.value];
        }
        else if (this.defaultValue !== undefined && this.internalValue.length === 0) {
            this.internalValue = Array.isArray(this.defaultValue) ? [...this.defaultValue] : [this.defaultValue];
        }
    }
    handleSelectorClick(e) {
        if (this.disabled)
            return;
        e.stopPropagation();
        this.open = !this.open;
        this.focused = true;
        if (this.open && this.showSearch) {
            setTimeout(() => this.searchInput?.focus(), 0);
        }
        this.dispatchEvent(new CustomEvent('dropdown-visible-change', {
            detail: { open: this.open },
            bubbles: true,
            composed: true,
        }));
    }
    handleOptionClick(option) {
        if (option.disabled)
            return;
        if (this.mode === 'multiple' || this.mode === 'tags') {
            const index = this.internalValue.indexOf(option.value);
            if (index > -1) {
                this.internalValue.splice(index, 1);
            }
            else {
                this.internalValue.push(option.value);
            }
            this.internalValue = [...this.internalValue];
        }
        else {
            this.internalValue = [option.value];
            this.open = false;
            this.focused = false;
        }
        this.searchValue = '';
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                value: this.mode === 'multiple' || this.mode === 'tags'
                    ? this.internalValue
                    : this.internalValue[0],
                option,
            },
            bubbles: true,
            composed: true,
        }));
        this.requestUpdate();
    }
    handleClear(e) {
        e.stopPropagation();
        this.internalValue = [];
        this.searchValue = '';
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                value: this.mode === 'multiple' || this.mode === 'tags' ? [] : undefined,
            },
            bubbles: true,
            composed: true,
        }));
        this.requestUpdate();
    }
    handleRemoveTag(value, e) {
        e.stopPropagation();
        const index = this.internalValue.indexOf(value);
        if (index > -1) {
            this.internalValue.splice(index, 1);
            this.internalValue = [...this.internalValue];
            this.dispatchEvent(new CustomEvent('change', {
                detail: { value: this.internalValue },
                bubbles: true,
                composed: true,
            }));
            this.requestUpdate();
        }
    }
    handleSearchInput(e) {
        this.searchValue = e.target.value;
        this.dispatchEvent(new CustomEvent('search', {
            detail: { value: this.searchValue },
            bubbles: true,
            composed: true,
        }));
    }
    getFilteredOptions() {
        if (!this.searchValue)
            return this.options;
        const filterFn = this.filterOption || ((input, option) => {
            return option.label.toLowerCase().includes(input.toLowerCase());
        });
        return this.options.filter(option => filterFn(this.searchValue, option));
    }
    getSelectedOptions() {
        return this.options.filter(opt => this.internalValue.includes(opt.value));
    }
    renderSelection() {
        const selectedOptions = this.getSelectedOptions();
        if (this.mode === 'multiple' || this.mode === 'tags') {
            if (selectedOptions.length === 0) {
                return html `
          <span class="mx-select-selection-placeholder">${this.placeholder}</span>
        `;
            }
            const displayOptions = this.maxTagCount
                ? selectedOptions.slice(0, this.maxTagCount)
                : selectedOptions;
            return html `
        <div class="mx-select-selection-overflow">
          ${displayOptions.map(opt => html `
            <span class="mx-select-selection-overflow-item">
              ${opt.label}
              <span 
                class="mx-select-selection-overflow-item-suffix"
                @click=${(e) => this.handleRemoveTag(opt.value, e)}
              >
                ×
              </span>
            </span>
          `)}
          ${this.maxTagCount && selectedOptions.length > this.maxTagCount ? html `
            <span class="mx-select-selection-overflow-item">
              +${selectedOptions.length - this.maxTagCount}
            </span>
          ` : ''}
        </div>
      `;
        }
        if (this.showSearch && this.open) {
            return html `
        <div class="mx-select-selection-search">
          <input
            class="mx-select-selection-search-input"
            type="text"
            .value=${this.searchValue}
            @input=${this.handleSearchInput}
            @click=${(e) => e.stopPropagation()}
          />
        </div>
      `;
        }
        if (selectedOptions.length > 0) {
            return html `
        <span class="mx-select-selection-item">${selectedOptions[0].label}</span>
      `;
        }
        return html `
      <span class="mx-select-selection-placeholder">${this.placeholder}</span>
    `;
    }
    renderDropdownOptions() {
        const filteredOptions = this.getFilteredOptions();
        if (filteredOptions.length === 0) {
            return html `
        <div class="mx-select-item mx-select-item-empty">
          No data
        </div>
      `;
        }
        return filteredOptions.map(option => {
            const isSelected = this.internalValue.includes(option.value);
            const classes = {
                'mx-select-item': true,
                'mx-select-item-option-selected': isSelected,
                'mx-select-item-option-disabled': !!option.disabled,
            };
            return html `
        <div
          class=${classMap(classes)}
          @click=${() => this.handleOptionClick(option)}
        >
          ${option.label}
        </div>
      `;
        });
    }
    render() {
        const classes = {
            'mx-select': true,
            'mx-select-open': this.open,
            'mx-select-focused': this.focused,
            'mx-select-disabled': this.disabled,
            [`mx-select-${this.size}`]: true,
            [`mx-select-${this.variant}`]: true,
            [`mx-select-status-${this.status}`]: !!this.status,
        };
        const showClear = this.allowClear && !this.disabled && this.internalValue.length > 0;
        return html `
      <div class=${classMap(classes)}>
        <div class="mx-select-selector" @click=${this.handleSelectorClick}>
          ${this.renderSelection()}
          ${showClear ? html `
            <span class="mx-select-clear" @click=${this.handleClear}>×</span>
          ` : ''}
          <span class="mx-select-arrow">▼</span>
        </div>
        <div class="mx-select-dropdown">
          ${this.renderDropdownOptions()}
        </div>
      </div>
    `;
    }
};
MXSelect.styles = css `
    :host {
      display: inline-block;
      width: 100%;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-select {
      position: relative;
      display: inline-block;
      width: 100%;
    }

    .mx-select-selector {
      position: relative;
      background-color: #ffffff;
      border: 1px solid var(--mx-color-border, #d9d9d9);
      border-radius: var(--mx-border-radius, 6px);
      transition: all 0.2s;
      display: flex;
      align-items: center;
      padding: 4px 11px;
      cursor: pointer;
    }

    .mx-select-selector:hover {
      border-color: var(--mx-color-primary-hover, #4096ff);
    }

    .mx-select-focused .mx-select-selector {
      border-color: var(--mx-color-primary, #1677ff);
      box-shadow: 0 0 0 2px var(--mx-color-primary-bg, #e6f4ff);
      outline: 0;
    }

    .mx-select-disabled .mx-select-selector {
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
      background: var(--mx-color-bg-container-disabled, rgba(0, 0, 0, 0.04));
      border-color: var(--mx-color-border, #d9d9d9);
      cursor: not-allowed;
    }

    /* Variants */
    .mx-select-borderless .mx-select-selector {
      border-color: transparent;
      background: transparent;
    }

    .mx-select-filled .mx-select-selector {
      border-color: transparent;
      background: var(--mx-color-fill-tertiary, rgba(0, 0, 0, 0.04));
    }

    /* Sizes */
    .mx-select-large .mx-select-selector {
      padding: 7px 11px;
      font-size: 16px;
    }

    .mx-select-small .mx-select-selector {
      padding: 0px 7px;
      font-size: 14px;
    }

    /* Status */
    .mx-select-status-error .mx-select-selector {
      border-color: var(--mx-color-error, #ff4d4f);
    }

    .mx-select-status-warning .mx-select-selector {
      border-color: var(--mx-color-warning, #faad14);
    }

    .mx-select-selection-search {
      flex: 1;
      display: flex;
      align-items: center;
    }

    .mx-select-selection-search-input {
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-size: inherit;
      font-family: inherit;
    }

    .mx-select-selection-placeholder {
      flex: 1;
      color: var(--mx-color-text-placeholder, rgba(0, 0, 0, 0.25));
      pointer-events: none;
    }

    .mx-select-selection-item {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .mx-select-selection-overflow {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      flex: 1;
    }

    .mx-select-selection-overflow-item {
      display: inline-flex;
      align-items: center;
      height: 24px;
      padding: 0 4px 0 8px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 14px;
      line-height: 22px;
      background: var(--mx-color-fill-secondary, rgba(0, 0, 0, 0.06));
      border: 1px solid var(--mx-color-split, rgba(5, 5, 5, 0.06));
      border-radius: var(--mx-border-radius-sm, 4px);
    }

    .mx-select-selection-overflow-item-suffix {
      display: flex;
      align-items: center;
      margin-left: 4px;
      cursor: pointer;
    }

    .mx-select-arrow {
      display: flex;
      align-items: center;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      font-size: 12px;
      margin-left: 4px;
      pointer-events: none;
      transition: transform 0.3s;
    }

    .mx-select-open .mx-select-arrow {
      transform: rotate(180deg);
    }

    .mx-select-clear {
      display: flex;
      align-items: center;
      margin-left: 4px;
      color: var(--mx-color-text-quaternary, rgba(0, 0, 0, 0.25));
      font-size: 12px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .mx-select:hover .mx-select-clear {
      opacity: 1;
    }

    .mx-select-clear:hover {
      color: var(--mx-color-text-tertiary, rgba(0, 0, 0, 0.45));
    }

    /* Dropdown */
    .mx-select-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1050;
      margin-top: 4px;
      padding: 4px 0;
      background: #ffffff;
      border-radius: var(--mx-border-radius, 6px);
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
                  0 3px 6px -4px rgba(0, 0, 0, 0.12),
                  0 9px 28px 8px rgba(0, 0, 0, 0.05);
      width: 100%;
      max-height: 256px;
      overflow-y: auto;
      display: none;
    }

    .mx-select-open .mx-select-dropdown {
      display: block;
    }

    .mx-select-item {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 32px;
      padding: 5px 12px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .mx-select-item:hover {
      background: var(--mx-color-fill-secondary, rgba(0, 0, 0, 0.06));
    }

    .mx-select-item-option-selected {
      font-weight: 600;
      background: var(--mx-color-fill-secondary, rgba(0, 0, 0, 0.06));
    }

    .mx-select-item-option-disabled {
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
      cursor: not-allowed;
    }

    .mx-select-item-option-disabled:hover {
      background: transparent;
    }

    .mx-select-item-empty {
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
      text-align: center;
    }

    .mx-select-item-group {
      padding: 8px 12px;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      font-size: 12px;
      font-weight: 600;
    }
  `;
__decorate([
    property({ type: Array })
], MXSelect.prototype, "options", void 0);
__decorate([
    property({ type: [String, Number, Array] })
], MXSelect.prototype, "value", void 0);
__decorate([
    property({ type: [String, Number, Array], attribute: 'default-value' })
], MXSelect.prototype, "defaultValue", void 0);
__decorate([
    property({ type: String })
], MXSelect.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean })
], MXSelect.prototype, "showSearch", void 0);
__decorate([
    property({ type: Boolean, attribute: 'allow-clear' })
], MXSelect.prototype, "allowClear", void 0);
__decorate([
    property({ type: String })
], MXSelect.prototype, "size", void 0);
__decorate([
    property({ type: String })
], MXSelect.prototype, "variant", void 0);
__decorate([
    property({ type: String })
], MXSelect.prototype, "status", void 0);
__decorate([
    property({ type: Boolean })
], MXSelect.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], MXSelect.prototype, "mode", void 0);
__decorate([
    property({ type: Boolean })
], MXSelect.prototype, "loading", void 0);
__decorate([
    property({ type: Number, attribute: 'max-tag-count' })
], MXSelect.prototype, "maxTagCount", void 0);
__decorate([
    property({ attribute: false })
], MXSelect.prototype, "filterOption", void 0);
__decorate([
    state()
], MXSelect.prototype, "open", void 0);
__decorate([
    state()
], MXSelect.prototype, "focused", void 0);
__decorate([
    state()
], MXSelect.prototype, "searchValue", void 0);
__decorate([
    state()
], MXSelect.prototype, "internalValue", void 0);
__decorate([
    query('.mx-select-selection-search-input')
], MXSelect.prototype, "searchInput", void 0);
MXSelect = __decorate([
    customElement('mx-select')
], MXSelect);
export { MXSelect };
//# sourceMappingURL=mx-select.js.map