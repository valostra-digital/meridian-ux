import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import type { InputVariant, InputSize, InputStatus } from './mx-input.js';

/**
 * Password input component with visibility toggle.
 * 
 * @element mx-input-password
 * 
 * @attr {InputVariant} variant - Input variant
 * @attr {InputSize} size - Input size
 * @attr {InputStatus} status - Validation status
 * @attr {string} value - Input value
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} visibility-toggle - Show visibility toggle button
 * 
 * @fires change - Fired when input value changes
 * @fires input - Fired when user types
 * 
 * @example
 * ```html
 * <mx-input-password placeholder="Enter password"></mx-input-password>
 * <mx-input-password visibility-toggle placeholder="Password"></mx-input-password>
 * ```
 */
@customElement('mx-input-password')
export class MXInputPassword extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      width: 100%;
    }

    .mx-input-password {
      position: relative;
    }

    .mx-input-wrapper {
      display: inline-flex;
      width: 100%;
      min-width: 0;
      padding: 4px 11px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      line-height: 1.5714285714285714;
      background-color: var(--mx-color-bg-container, #ffffff);
      border: 1px solid var(--mx-color-border, #d9d9d9);
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

    .mx-input-suffix {
      display: inline-flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.45);
      cursor: pointer;
      transition: color 0.2s;
    }

    .mx-input-suffix:hover {
      color: rgba(0, 0, 0, 0.88);
    }

    .mx-input-disabled {
      color: rgba(0, 0, 0, 0.25);
      background-color: rgba(0, 0, 0, 0.04);
      border-color: #d9d9d9;
      cursor: not-allowed;
    }

    .mx-input-disabled input {
      cursor: not-allowed;
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

  @property({ type: String })
  placeholder = '';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean, attribute: 'visibility-toggle' })
  visibilityToggle = true;

  @state()
  private visible = false;

  @query('input')
  private inputElement!: HTMLInputElement;

  private toggleVisibility() {
    this.visible = !this.visible;
  }

  private handleInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;
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

  focus() {
    this.inputElement?.focus();
  }

  blur() {
    this.inputElement?.blur();
  }

  render() {
    const eyeIcon = html`
      <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
        <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"/>
      </svg>
    `;

    const eyeInvisibleIcon = html`
      <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
        <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"/><path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"/>
      </svg>
    `;

    const classes = {
      'mx-input-wrapper': true,
      'mx-input-disabled': this.disabled,
    };

    return html`
      <div class="mx-input-password">
        <div class=${classMap(classes)}>
          <input
            .value=${live(this.value)}
            type=${this.visible ? 'text' : 'password'}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
          ${this.visibilityToggle ? html`
            <span 
              class="mx-input-suffix" 
              @click=${this.toggleVisibility}
              role="button"
              aria-label=${this.visible ? 'Hide password' : 'Show password'}
            >
              ${this.visible ? eyeIcon : eyeInvisibleIcon}
            </span>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-input-password': MXInputPassword;
  }
}
