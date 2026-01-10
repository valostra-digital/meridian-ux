import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type SelectSize = 'large' | 'middle' | 'small';
export type SelectVariant = 'outlined' | 'borderless' | 'filled';
export type SelectMode = 'multiple' | 'tags';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  group?: string;
}

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
@customElement('mx-select')
export class MXSelect extends LitElement {
  static styles = css`
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

  /**
   * Options array
   */
  @property({ type: Array })
  options: SelectOption[] = [];

  /**
   * Selected value(s)
   */
  @property({ type: [String, Number, Array] })
  value?: string | number | (string | number)[];

  /**
   * Default value
   */
  @property({ type: [String, Number, Array], attribute: 'default-value' })
  defaultValue?: string | number | (string | number)[];

  /**
   * Placeholder text
   */
  @property({ type: String })
  placeholder = 'Select';

  /**
   * Whether to show search
   */
  @property({ type: Boolean })
  showSearch = false;

  /**
   * Whether to allow clear
   */
  @property({ type: Boolean, attribute: 'allow-clear' })
  allowClear = false;

  /**
   * Size
   */
  @property({ type: String })
  size: SelectSize = 'middle';

  /**
   * Variant
   */
  @property({ type: String })
  variant: SelectVariant = 'outlined';

  /**
   * Status
   */
  @property({ type: String })
  status?: 'error' | 'warning';

  /**
   * Whether disabled
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Mode (multiple or tags)
   */
  @property({ type: String })
  mode?: SelectMode;

  /**
   * Loading state
   */
  @property({ type: Boolean })
  loading = false;

  /**
   * Max tag count (multiple mode)
   */
  @property({ type: Number, attribute: 'max-tag-count' })
  maxTagCount?: number;

  /**
   * Filter option function
   */
  @property({ attribute: false })
  filterOption?: (input: string, option: SelectOption) => boolean;

  @state()
  private open = false;

  @state()
  private focused = false;

  @state()
  private searchValue = '';

  @state()
  private internalValue: (string | number)[] = [];

  @query('.mx-select-selection-search-input')
  private searchInput?: HTMLInputElement;

  connectedCallback(): void {
    super.connectedCallback();
    this.initializeValue();
    document.addEventListener('click', this.handleDocumentClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleDocumentClick);
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('value')) {
      this.initializeValue();
    }
  }

  private initializeValue(): void {
    if (this.value !== undefined) {
      this.internalValue = Array.isArray(this.value) ? [...this.value] : [this.value];
    } else if (this.defaultValue !== undefined && this.internalValue.length === 0) {
      this.internalValue = Array.isArray(this.defaultValue) ? [...this.defaultValue] : [this.defaultValue];
    }
  }

  private handleDocumentClick = (e: MouseEvent): void => {
    if (!this.contains(e.target as Node)) {
      this.open = false;
      this.focused = false;
    }
  };

  private handleSelectorClick(e: MouseEvent): void {
    if (this.disabled) return;
    
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

  private handleOptionClick(option: SelectOption): void {
    if (option.disabled) return;

    if (this.mode === 'multiple' || this.mode === 'tags') {
      const index = this.internalValue.indexOf(option.value);
      if (index > -1) {
        this.internalValue.splice(index, 1);
      } else {
        this.internalValue.push(option.value);
      }
      this.internalValue = [...this.internalValue];
    } else {
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

  private handleClear(e: MouseEvent): void {
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

  private handleRemoveTag(value: string | number, e: MouseEvent): void {
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

  private handleSearchInput(e: Event): void {
    this.searchValue = (e.target as HTMLInputElement).value;

    this.dispatchEvent(new CustomEvent('search', {
      detail: { value: this.searchValue },
      bubbles: true,
      composed: true,
    }));
  }

  private getFilteredOptions(): SelectOption[] {
    if (!this.searchValue) return this.options;

    const filterFn = this.filterOption || ((input: string, option: SelectOption) => {
      return option.label.toLowerCase().includes(input.toLowerCase());
    });

    return this.options.filter(option => filterFn(this.searchValue, option));
  }

  private getSelectedOptions(): SelectOption[] {
    return this.options.filter(opt => this.internalValue.includes(opt.value));
  }

  private renderSelection(): any {
    const selectedOptions = this.getSelectedOptions();

    if (this.mode === 'multiple' || this.mode === 'tags') {
      if (selectedOptions.length === 0) {
        return html`
          <span class="mx-select-selection-placeholder">${this.placeholder}</span>
        `;
      }

      const displayOptions = this.maxTagCount 
        ? selectedOptions.slice(0, this.maxTagCount)
        : selectedOptions;

      return html`
        <div class="mx-select-selection-overflow">
          ${displayOptions.map(opt => html`
            <span class="mx-select-selection-overflow-item">
              ${opt.label}
              <span 
                class="mx-select-selection-overflow-item-suffix"
                @click=${(e: MouseEvent) => this.handleRemoveTag(opt.value, e)}
              >
                ×
              </span>
            </span>
          `)}
          ${this.maxTagCount && selectedOptions.length > this.maxTagCount ? html`
            <span class="mx-select-selection-overflow-item">
              +${selectedOptions.length - this.maxTagCount}
            </span>
          ` : ''}
        </div>
      `;
    }

    if (this.showSearch && this.open) {
      return html`
        <div class="mx-select-selection-search">
          <input
            class="mx-select-selection-search-input"
            type="text"
            .value=${this.searchValue}
            @input=${this.handleSearchInput}
            @click=${(e: MouseEvent) => e.stopPropagation()}
          />
        </div>
      `;
    }

    if (selectedOptions.length > 0) {
      return html`
        <span class="mx-select-selection-item">${selectedOptions[0].label}</span>
      `;
    }

    return html`
      <span class="mx-select-selection-placeholder">${this.placeholder}</span>
    `;
  }

  private renderDropdownOptions(): any {
    const filteredOptions = this.getFilteredOptions();

    if (filteredOptions.length === 0) {
      return html`
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

      return html`
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

    return html`
      <div class=${classMap(classes)}>
        <div class="mx-select-selector" @click=${this.handleSelectorClick}>
          ${this.renderSelection()}
          ${showClear ? html`
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
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-select': MXSelect;
  }
}
