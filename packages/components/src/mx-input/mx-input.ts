import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';

export type InputVariant = 'outlined' | 'filled' | 'borderless' | 'underlined';
export type InputSize = 'small' | 'middle' | 'large';
export type InputStatus = 'error' | 'warning' | '';

/**
 * Input component for text entry.
 * 
 * @element mx-input
 * 
 * @attr {InputVariant} variant - Input variant: outlined, filled, borderless, underlined
 * @attr {InputSize} size - Input size: small, middle, large
 * @attr {InputStatus} status - Validation status: error, warning
 * @attr {string} value - Input value
 * @attr {string} default-value - Default input value
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} allow-clear - Show clear button
 * @attr {boolean} show-count - Show character count
 * @attr {number} max-length - Maximum character length
 * @attr {string} type - Input type (text, password, email, etc.)
 * 
 * @slot prefix - Prefix content (icon, text)
 * @slot suffix - Suffix content (icon, text)
 * 
 * @fires change - Fired when input value changes
 * @fires input - Fired when user types
 * @fires focus - Fired when input receives focus
 * @fires blur - Fired when input loses focus
 * @fires pressenter - Fired when Enter key is pressed
 * @fires clear - Fired when clear button is clicked
 * 
 * @example
 * ```html
 * <!-- Basic input -->
 * <mx-input placeholder="Enter text"></mx-input>
 * 
 * <!-- With prefix/suffix -->
 * <mx-input>
 *   <mx-icon slot="prefix" svg="..."></mx-icon>
 *   <span slot="suffix">.com</span>
 * </mx-input>
 * 
 * <!-- With character count -->
 * <mx-input show-count max-length="100"></mx-input>
 * 
 * <!-- With clear button -->
 * <mx-input allow-clear></mx-input>
 * 
 * <!-- Different variants -->
 * <mx-input variant="filled"></mx-input>
 * <mx-input variant="borderless"></mx-input>
 * ```
 */
@customElement('mx-input')
export class MXInput extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      width: 100%;
      font-size: var(--mx-font-size, 14px);
      line-height: var(--mx-line-height, 1.5714285714285714);
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
    }

    .mx-input-wrapper {
      position: relative;
      display: inline-flex;
      width: 100%;
      min-width: 0;
      padding: 4px 11px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      line-height: 1.5714285714285714;
      background-color: var(--mx-color-bg-container, #ffffff);
      background-image: none;
      border-width: 1px;
      border-style: solid;
      border-color: var(--mx-color-border, #d9d9d9);
      border-radius: var(--mx-border-radius, 6px);
      transition: all 0.2s;
      align-items: center;
      gap: 4px;
    }

    .mx-input-wrapper:hover:not(.mx-input-disabled) {
      border-color: var(--mx-color-primary-hover, #4096ff);
    }

    .mx-input-wrapper:focus-within:not(.mx-input-disabled) {
      border-color: var(--mx-color-primary, #1677ff);
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
      outline: 0;
    }

    /* Variants */
    .mx-input-outlined {
      background-color: var(--mx-color-bg-container, #ffffff);
    }

    .mx-input-filled {
      background-color: rgba(0, 0, 0, 0.02);
      border-color: transparent;
    }

    .mx-input-filled:hover:not(.mx-input-disabled) {
      background-color: rgba(0, 0, 0, 0.04);
      border-color: transparent;
    }

    .mx-input-borderless {
      background-color: transparent;
      border-color: transparent;
      box-shadow: none;
    }

    .mx-input-borderless:hover:not(.mx-input-disabled),
    .mx-input-borderless:focus-within:not(.mx-input-disabled) {
      background-color: transparent;
      border-color: transparent;
      box-shadow: none;
    }

    .mx-input-underlined {
      background-color: transparent;
      border-width: 0;
      border-bottom-width: 1px;
      border-radius: 0;
    }

    .mx-input-underlined:focus-within:not(.mx-input-disabled) {
      border-bottom-color: var(--mx-color-primary, #1677ff);
      box-shadow: none;
    }

    /* Sizes */
    .mx-input-small {
      padding: 0 7px;
    }

    .mx-input-large {
      padding: 7px 11px;
      font-size: var(--mx-font-size-lg, 16px);
    }

    /* Status */
    .mx-input-error {
      border-color: var(--mx-color-error, #ff4d4f);
    }

    .mx-input-error:focus-within {
      border-color: var(--mx-color-error, #ff4d4f);
      box-shadow: 0 0 0 2px rgba(255, 38, 5, 0.06);
    }

    .mx-input-warning {
      border-color: var(--mx-color-warning, #faad14);
    }

    .mx-input-warning:focus-within {
      border-color: var(--mx-color-warning, #faad14);
      box-shadow: 0 0 0 2px rgba(255, 215, 5, 0.1);
    }

    /* Disabled */
    .mx-input-disabled {
      color: rgba(0, 0, 0, 0.25);
      background-color: rgba(0, 0, 0, 0.04);
      border-color: #d9d9d9;
      cursor: not-allowed;
    }

    .mx-input-disabled input {
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
    }

    input::placeholder {
      color: rgba(0, 0, 0, 0.25);
    }

    input:disabled {
      cursor: not-allowed;
    }

    /* Prefix and suffix */
    .mx-input-prefix,
    .mx-input-suffix {
      display: inline-flex;
      flex: none;
      align-items: center;
      color: rgba(0, 0, 0, 0.45);
    }

    .mx-input-clear {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: rgba(0, 0, 0, 0.25);
      cursor: pointer;
      font-size: 12px;
      transition: color 0.2s;
    }

    .mx-input-clear:hover {
      color: rgba(0, 0, 0, 0.45);
    }

    .mx-input-clear-hidden {
      visibility: hidden;
      pointer-events: none;
    }

    /* Count */
    .mx-input-count {
      display: inline-flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
      white-space: nowrap;
    }

    .mx-input-count-error {
      color: var(--mx-color-error, #ff4d4f);
    }
  `;

  @property({ type: String })
  variant: InputVariant = 'outlined';

  @property({ type: String })
  size: InputSize = 'middle';

  @property({ type: String })
  status: InputStatus = '';

  @property({ type: String })
  value = '';

  @property({ type: String, attribute: 'default-value' })
  defaultValue = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean, attribute: 'allow-clear' })
  allowClear = false;

  @property({ type: Boolean, attribute: 'show-count' })
  showCount = false;

  @property({ type: Number, attribute: 'max-length' })
  maxLength?: number;

  @property({ type: String })
  type = 'text';

  @property({ type: String })
  name = '';

  @property({ type: String })
  autocomplete = '';

  @query('input')
  private inputElement!: HTMLInputElement;

  @state()
  private focused = false;

  @state()
  private internalValue = '';

  connectedCallback() {
    super.connectedCallback();
    // Initialize value
    this.internalValue = this.value || this.defaultValue;
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);
    
    // Sync external value changes
    if (changedProperties.has('value') && this.value !== this.internalValue) {
      this.internalValue = this.value;
    }
  }

  private handleInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    this.internalValue = input.value;
    this.value = input.value;

    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: input.value },
      bubbles: true,
      composed: true
    }));
  }

  private handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: input.value },
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
    this.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.dispatchEvent(new CustomEvent('pressenter', {
        detail: { value: this.internalValue, event: e },
        bubbles: true,
        composed: true
      }));
    }
  }

  private handleClear(e: MouseEvent) {
    e.stopPropagation();
    this.internalValue = '';
    this.value = '';
    
    if (this.inputElement) {
      this.inputElement.value = '';
      this.inputElement.focus();
    }

    this.dispatchEvent(new CustomEvent('clear', {
      bubbles: true,
      composed: true
    }));

    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: '' },
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
      'mx-input-wrapper': true,
      [`mx-input-${this.variant}`]: true,
      [`mx-input-${this.size}`]: this.size !== 'middle',
      [`mx-input-${this.status}`]: !!this.status,
      'mx-input-disabled': this.disabled,
      'mx-input-focused': this.focused,
    };

    const showClear = this.allowClear && !this.disabled && this.internalValue.length > 0;
    const count = this.internalValue.length;
    const exceededMax = this.maxLength !== undefined && count > this.maxLength;

    const clearIcon = html`
      <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/>
      </svg>
    `;

    return html`
      <div class=${classMap(classes)}>
        ${this.hasSlot('prefix') ? html`
          <span class="mx-input-prefix">
            <slot name="prefix"></slot>
          </span>
        ` : ''}
        
        <input
          .value=${live(this.internalValue)}
          type=${this.type}
          name=${this.name}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          maxlength=${this.maxLength || ''}
          autocomplete=${this.autocomplete}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @keydown=${this.handleKeyDown}
        />

        ${showClear ? html`
          <span class="mx-input-clear" @click=${this.handleClear}>
            ${clearIcon}
          </span>
        ` : ''}

        ${this.showCount && this.maxLength ? html`
          <span class="mx-input-count ${exceededMax ? 'mx-input-count-error' : ''}">
            ${count} / ${this.maxLength}
          </span>
        ` : this.showCount ? html`
          <span class="mx-input-count">${count}</span>
        ` : ''}

        ${this.hasSlot('suffix') ? html`
          <span class="mx-input-suffix">
            <slot name="suffix"></slot>
          </span>
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
    'mx-input': MXInput;
  }
}
