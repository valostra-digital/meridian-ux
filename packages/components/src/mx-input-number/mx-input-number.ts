import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';

export type InputNumberSize = 'small' | 'middle' | 'large';
export type InputNumberStatus = 'error' | 'warning' | '';
export type InputNumberVariant = 'outlined' | 'filled' | 'borderless';

/**
 * InputNumber component for numeric input with increment/decrement controls.
 * 
 * @element mx-input-number
 * 
 * @attr {InputNumberSize} size - Input size: small, middle, large
 * @attr {InputNumberStatus} status - Validation status: error, warning
 * @attr {InputNumberVariant} variant - Input variant: outlined, filled, borderless
 * @attr {number} value - Current value
 * @attr {number} default-value - Default value
 * @attr {number} min - Minimum value
 * @attr {number} max - Maximum value
 * @attr {number} step - Step for increment/decrement
 * @attr {number} precision - Number of decimal places
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} controls - Show increment/decrement controls
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} keyboard - Enable keyboard input
 * @attr {string} controls-position - Position of controls: right (default) or updown
 * 
 * @slot prefix - Prefix content
 * @slot suffix - Suffix content
 * 
 * @fires change - Fired when value changes
 * @fires blur - Fired when input loses focus
 * @fires focus - Fired when input receives focus
 * @fires step - Fired when stepping up/down
 * 
 * @example
 * ```html
 * <!-- Basic input number -->
 * <mx-input-number value="10"></mx-input-number>
 * 
 * <!-- With min and max -->
 * <mx-input-number min="0" max="100" value="50"></mx-input-number>
 * 
 * <!-- With custom step -->
 * <mx-input-number step="0.1" precision="2"></mx-input-number>
 * 
 * <!-- Without controls -->
 * <mx-input-number :controls="false"></mx-input-number>
 * 
 * <!-- With prefix/suffix -->
 * <mx-input-number>
 *   <span slot="prefix">$</span>
 *   <span slot="suffix">.00</span>
 * </mx-input-number>
 * ```
 */
@customElement('mx-input-number')
export class MXInputNumber extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      font-size: var(--mx-font-size, 14px);
      line-height: var(--mx-line-height, 1.5714285714285714);
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
    }

    .mx-input-number {
      position: relative;
      display: inline-flex;
      width: 90px;
      min-width: 0;
      padding: 4px 11px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      line-height: 1.5714285714285714;
      background-color: var(--mx-color-bg-container, #ffffff);
      border-width: 1px;
      border-style: solid;
      border-color: var(--mx-color-border, #d9d9d9);
      border-radius: var(--mx-border-radius, 6px);
      transition: all 0.2s;
      align-items: center;
      gap: 4px;
    }

    .mx-input-number:hover:not(.mx-input-number-disabled) {
      border-color: var(--mx-color-primary-hover, #4096ff);
    }

    .mx-input-number-focused:not(.mx-input-number-disabled) {
      border-color: var(--mx-color-primary, #1677ff);
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
      outline: 0;
    }

    /* Variants */
    .mx-input-number-filled {
      background-color: rgba(0, 0, 0, 0.02);
      border-color: transparent;
    }

    .mx-input-number-filled:hover:not(.mx-input-number-disabled) {
      background-color: rgba(0, 0, 0, 0.04);
      border-color: transparent;
    }

    .mx-input-number-borderless {
      background-color: transparent;
      border-color: transparent;
      box-shadow: none;
    }

    .mx-input-number-borderless:hover:not(.mx-input-number-disabled),
    .mx-input-number-borderless.mx-input-number-focused:not(.mx-input-number-disabled) {
      background-color: transparent;
      border-color: transparent;
      box-shadow: none;
    }

    /* Sizes */
    .mx-input-number-small {
      padding: 0 7px;
    }

    .mx-input-number-large {
      padding: 7px 11px;
      font-size: var(--mx-font-size-lg, 16px);
    }

    /* Status */
    .mx-input-number-error {
      border-color: var(--mx-color-error, #ff4d4f);
    }

    .mx-input-number-error.mx-input-number-focused {
      border-color: var(--mx-color-error, #ff4d4f);
      box-shadow: 0 0 0 2px rgba(255, 38, 5, 0.06);
    }

    .mx-input-number-warning {
      border-color: var(--mx-color-warning, #faad14);
    }

    .mx-input-number-warning.mx-input-number-focused {
      border-color: var(--mx-color-warning, #faad14);
      box-shadow: 0 0 0 2px rgba(255, 215, 5, 0.1);
    }

    /* Disabled */
    .mx-input-number-disabled {
      color: rgba(0, 0, 0, 0.25);
      background-color: rgba(0, 0, 0, 0.04);
      border-color: #d9d9d9;
      cursor: not-allowed;
    }

    .mx-input-number-disabled input {
      cursor: not-allowed;
    }

    /* Input element */
    input {
      flex: 1;
      min-width: 0;
      margin: 0;
      padding: 0;
      color: inherit;
      font-size: inherit;
      line-height: inherit;
      background-color: transparent;
      border: none;
      outline: none;
      font-family: inherit;
      text-align: left;
    }

    input::placeholder {
      color: rgba(0, 0, 0, 0.25);
    }

    input:disabled {
      cursor: not-allowed;
    }

    /* Remove default number input spinners */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }

    /* Prefix and suffix */
    .mx-input-number-prefix,
    .mx-input-number-suffix {
      display: inline-flex;
      flex: none;
      align-items: center;
      color: rgba(0, 0, 0, 0.45);
    }

    /* Controls */
    .mx-input-number-controls {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      margin-left: 4px;
      border-left: 1px solid var(--mx-color-border, #d9d9d9);
      padding-left: 4px;
      gap: 2px;
    }

    .mx-input-number-controls-updown {
      flex-direction: column;
    }

    .mx-input-number-handler {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      color: rgba(0, 0, 0, 0.45);
      cursor: pointer;
      transition: color 0.2s;
      user-select: none;
    }

    .mx-input-number-handler:hover:not(.mx-input-number-handler-disabled) {
      color: var(--mx-color-primary, #1677ff);
    }

    .mx-input-number-handler:active:not(.mx-input-number-handler-disabled) {
      color: var(--mx-color-primary-active, #0958d9);
    }

    .mx-input-number-handler-disabled {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }

    .mx-input-number-handler svg {
      width: 8px;
      height: 8px;
      fill: currentColor;
    }
  `;

  @property({ type: String })
  size: InputNumberSize = 'middle';

  @property({ type: String })
  status: InputNumberStatus = '';

  @property({ type: String })
  variant: InputNumberVariant = 'outlined';

  @property({ type: Number })
  value?: number;

  @property({ type: Number, attribute: 'default-value' })
  defaultValue?: number;

  @property({ type: Number })
  min = -Infinity;

  @property({ type: Number })
  max = Infinity;

  @property({ type: Number })
  step = 1;

  @property({ type: Number })
  precision?: number;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  controls = true;

  @property({ type: String })
  placeholder = '';

  @property({ type: Boolean })
  keyboard = true;

  @property({ type: String, attribute: 'controls-position' })
  controlsPosition: 'right' | 'updown' = 'right';

  @query('input')
  private inputElement!: HTMLInputElement;

  @state()
  private focused = false;

  @state()
  private internalValue = '';

  connectedCallback() {
    super.connectedCallback();
    // Initialize value
    const initialValue = this.value ?? this.defaultValue;
    if (initialValue !== undefined) {
      this.internalValue = this.formatNumber(initialValue);
    }
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);
    
    // Sync external value changes
    if (changedProperties.has('value') && this.value !== undefined) {
      this.internalValue = this.formatNumber(this.value);
    }
  }

  private formatNumber(value: number): string {
    if (this.precision !== undefined) {
      return value.toFixed(this.precision);
    }
    return value.toString();
  }

  private parseNumber(value: string): number | undefined {
    if (!value || value === '-') return undefined;
    const num = parseFloat(value);
    if (isNaN(num)) return undefined;
    return num;
  }

  private clampValue(value: number): number {
    return Math.max(this.min, Math.min(this.max, value));
  }

  private handleInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    this.internalValue = input.value;

    // Allow typing intermediate values like "-" or "1."
    const parsed = this.parseNumber(input.value);
    if (parsed !== undefined) {
      this.value = parsed;
      this.dispatchEvent(new CustomEvent('input', {
        detail: { value: parsed },
        bubbles: true,
        composed: true
      }));
    }
  }

  private handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    let parsed = this.parseNumber(input.value);
    
    if (parsed !== undefined) {
      parsed = this.clampValue(parsed);
      this.value = parsed;
      this.internalValue = this.formatNumber(parsed);
    } else {
      // Reset to previous value or default
      const resetValue = this.value ?? this.defaultValue ?? 0;
      this.value = resetValue;
      this.internalValue = this.formatNumber(resetValue);
    }

    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private handleFocus() {
    this.focused = true;
    this.dispatchEvent(new Event('focus', { bubbles: true, composed: true }));
  }

  private handleBlur() {
    this.focused = false;
    // Format on blur
    if (this.value !== undefined) {
      this.internalValue = this.formatNumber(this.value);
    }
    this.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (!this.keyboard) return;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.stepUp();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.stepDown();
    }
  }

  private stepUp() {
    if (this.disabled) return;
    
    const currentValue = this.value ?? this.defaultValue ?? 0;
    let newValue = currentValue + this.step;
    newValue = this.clampValue(newValue);
    
    if (newValue <= this.max) {
      this.value = newValue;
      this.internalValue = this.formatNumber(newValue);
      this.dispatchChangeEvent('up', newValue);
    }
  }

  private stepDown() {
    if (this.disabled) return;
    
    const currentValue = this.value ?? this.defaultValue ?? 0;
    let newValue = currentValue - this.step;
    newValue = this.clampValue(newValue);
    
    if (newValue >= this.min) {
      this.value = newValue;
      this.internalValue = this.formatNumber(newValue);
      this.dispatchChangeEvent('down', newValue);
    }
  }

  private dispatchChangeEvent(type: 'up' | 'down', value: number) {
    this.dispatchEvent(new CustomEvent('step', {
      detail: { value, type },
      bubbles: true,
      composed: true
    }));

    this.dispatchEvent(new CustomEvent('change', {
      detail: { value },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Focus the input
   */
  focus() {
    this.inputElement?.focus();
  }

  /**
   * Blur the input
   */
  blur() {
    this.inputElement?.blur();
  }

  render() {
    const classes = {
      'mx-input-number': true,
      [`mx-input-number-${this.variant}`]: true,
      [`mx-input-number-${this.size}`]: this.size !== 'middle',
      [`mx-input-number-${this.status}`]: !!this.status,
      'mx-input-number-disabled': this.disabled,
      'mx-input-number-focused': this.focused,
    };

    const currentValue = this.value ?? this.defaultValue ?? 0;
    const isUpDisabled = this.disabled || currentValue >= this.max;
    const isDownDisabled = this.disabled || currentValue <= this.min;

    const upIcon = html`
      <svg viewBox="64 64 896 896">
        <path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"/>
      </svg>
    `;

    const downIcon = html`
      <svg viewBox="64 64 896 896">
        <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"/>
      </svg>
    `;

    return html`
      <div class=${classMap(classes)}>
        ${this.hasSlot('prefix') ? html`
          <span class="mx-input-number-prefix">
            <slot name="prefix"></slot>
          </span>
        ` : ''}
        
        <input
          .value=${live(this.internalValue)}
          type="text"
          inputmode="decimal"
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @keydown=${this.handleKeyDown}
        />

        ${this.hasSlot('suffix') ? html`
          <span class="mx-input-number-suffix">
            <slot name="suffix"></slot>
          </span>
        ` : ''}

        ${this.controls ? html`
          <div class="mx-input-number-controls">
            <span 
              class="mx-input-number-handler mx-input-number-handler-up ${isUpDisabled ? 'mx-input-number-handler-disabled' : ''}"
              @click=${() => !isUpDisabled && this.stepUp()}
            >
              ${upIcon}
            </span>
            <span 
              class="mx-input-number-handler mx-input-number-handler-down ${isDownDisabled ? 'mx-input-number-handler-disabled' : ''}"
              @click=${() => !isDownDisabled && this.stepDown()}
            >
              ${downIcon}
            </span>
          </div>
        ` : ''}
      </div>
    `;
  }

  private hasSlot(name: string): boolean {
    return Array.from(this.querySelectorAll(`[slot="${name}"]`)).length > 0;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-input-number': MXInputNumber;
  }
}
