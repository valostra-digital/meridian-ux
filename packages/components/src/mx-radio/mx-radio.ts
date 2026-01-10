import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Radio component for single selection.
 * 
 * @element mx-radio
 * 
 * @attr {boolean} checked - Whether radio is checked
 * @attr {boolean} disabled - Disabled state
 * @attr {string} value - Value of radio
 * @attr {string} name - Name for radio group
 * 
 * @fires change - Fired when checked state changes
 * 
 * @slot - Label content
 * 
 * @example
 * ```html
 * <mx-radio name="group1" value="1">Option 1</mx-radio>
 * <mx-radio name="group1" value="2">Option 2</mx-radio>
 * <mx-radio name="group1" value="3" checked>Option 3</mx-radio>
 * <mx-radio name="group1" value="4" disabled>Disabled</mx-radio>
 * ```
 */
@customElement('mx-radio')
export class MXRadio extends LitElement {
  static styles = css`
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

    .mx-radio {
      position: relative;
      display: inline-flex;
      align-items: center;
      cursor: inherit;
      gap: 8px;
    }

    .mx-radio-input {
      position: relative;
      display: inline-block;
      width: 16px;
      height: 16px;
      cursor: inherit;
    }

    input[type="radio"] {
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

    .mx-radio-inner {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      border: 1px solid var(--mx-color-border, #d9d9d9);
      border-radius: 50%;
      background-color: var(--mx-color-bg-container, #ffffff);
      transition: all 0.2s;
    }

    .mx-radio-inner::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      width: 8px;
      height: 8px;
      margin-top: -4px;
      margin-left: -4px;
      background-color: var(--mx-color-primary, #1677ff);
      border-radius: 50%;
      transform: scale(0);
      opacity: 0;
      transition: all 0.2s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    }

    /* Hover */
    .mx-radio:hover:not([disabled]) .mx-radio-inner {
      border-color: var(--mx-color-primary, #1677ff);
    }

    /* Checked */
    input[type="radio"]:checked + .mx-radio-inner {
      border-color: var(--mx-color-primary, #1677ff);
    }

    input[type="radio"]:checked + .mx-radio-inner::after {
      transform: scale(1);
      opacity: 1;
      transition: all 0.2s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    }

    /* Disabled */
    :host([disabled]) .mx-radio-inner {
      background-color: rgba(0, 0, 0, 0.04);
      border-color: #d9d9d9;
    }

    :host([disabled]) input[type="radio"]:checked + .mx-radio-inner::after {
      background-color: rgba(0, 0, 0, 0.25);
    }

    :host([disabled]) .mx-radio-label {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }

    .mx-radio-label {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      padding-right: 8px;
      padding-left: 0;
    }

    /* Focus */
    input[type="radio"]:focus-visible + .mx-radio-inner {
      outline: 2px solid var(--mx-color-primary, #1677ff);
      outline-offset: 2px;
    }
  `;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  value = '';

  @property({ type: String })
  name = '';

  private handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    
    if (this.disabled) {
      e.preventDefault();
      return;
    }

    this.checked = input.checked;

    // Uncheck other radios with the same name
    if (this.name && this.checked) {
      this.uncheckOthers();
    }

    this.dispatchEvent(new CustomEvent('change', {
      detail: { 
        checked: this.checked,
        value: this.value 
      },
      bubbles: true,
      composed: true
    }));
  }

  private uncheckOthers() {
    // Find all mx-radio elements with the same name in the document
    const radios = document.querySelectorAll(`mx-radio[name="${this.name}"]`) as NodeListOf<MXRadio>;
    radios.forEach((radio) => {
      if (radio !== this) {
        radio.checked = false;
      }
    });
  }

  private handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  render() {
    const classes = {
      'mx-radio': true,
      'mx-radio-checked': this.checked,
    };

    return html`
      <label class=${classMap(classes)} @click=${this.handleClick}>
        <span class="mx-radio-input">
          <input
            type="radio"
            .checked=${this.checked}
            ?disabled=${this.disabled}
            .value=${this.value}
            name=${this.name}
            @change=${this.handleChange}
          />
          <span class="mx-radio-inner"></span>
        </span>
        <span class="mx-radio-label">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-radio': MXRadio;
  }
}
