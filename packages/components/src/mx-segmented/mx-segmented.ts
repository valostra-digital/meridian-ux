import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface SegmentedOption {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: string;
}

export type SegmentedSize = 'large' | 'default' | 'small';

/**
 * Segmented control component for selecting between options.
 * 
 * @element mx-segmented
 * 
 * @attr {string} value - Currently selected value
 * @attr {SegmentedSize} size - Size of the control: large, default, small
 * @attr {boolean} disabled - Whether the control is disabled
 * @attr {boolean} block - Whether to fit full width
 * @attr {string} options - JSON string of options array
 * 
 * @fires change - Fired when selection changes
 * 
 * @example
 * ```html
 * <mx-segmented 
 *   options='[{"label":"Daily","value":"day"},{"label":"Weekly","value":"week"}]'
 *   value="day"
 * ></mx-segmented>
 * ```
 */
@customElement('mx-segmented')
export class MXSegmented extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    :host([block]) {
      display: block;
    }

    .mx-segmented {
      display: inline-flex;
      padding: 2px;
      background-color: var(--mx-color-bg-container, rgba(0, 0, 0, 0.04));
      border-radius: var(--mx-border-radius, 6px);
      transition: all 0.3s;
    }

    .mx-segmented-block {
      display: flex;
      width: 100%;
    }

    .mx-segmented-disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    .mx-segmented-item {
      position: relative;
      flex: 1;
      padding: 5px 11px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      border-radius: 4px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      line-height: 22px;
      user-select: none;
      min-width: 0;
    }

    .mx-segmented-item:hover:not(.mx-segmented-item-disabled):not(.mx-segmented-item-selected) {
      background-color: rgba(0, 0, 0, 0.06);
    }

    .mx-segmented-item-selected {
      background-color: var(--mx-color-bg-elevated, #ffffff);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
    }

    .mx-segmented-item-disabled {
      cursor: not-allowed;
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
    }

    .mx-segmented-item-label {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    /* Size variants */
    .mx-segmented-large .mx-segmented-item {
      padding: 7px 11px;
      font-size: 16px;
      line-height: 24px;
    }

    .mx-segmented-small .mx-segmented-item {
      padding: 3px 7px;
      font-size: 14px;
      line-height: 20px;
    }
  `;

  @property({ type: String })
  value = '';

  @property({ type: String })
  size: SegmentedSize = 'default';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  block = false;

  @property({ type: String })
  options = '[]';

  @state()
  private parsedOptions: SegmentedOption[] = [];

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('options')) {
      try {
        this.parsedOptions = JSON.parse(this.options);
      } catch (e) {
        console.error('Invalid options JSON:', e);
        this.parsedOptions = [];
      }
    }
  }

  private handleItemClick(option: SegmentedOption) {
    if (this.disabled || option.disabled) {
      return;
    }

    this.value = option.value;

    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: option.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const classes = {
      'mx-segmented': true,
      'mx-segmented-block': this.block,
      'mx-segmented-disabled': this.disabled,
      [`mx-segmented-${this.size}`]: this.size !== 'default'
    };

    return html`
      <div class=${classMap(classes)}>
        ${this.parsedOptions.map(option => {
          const itemClasses = {
            'mx-segmented-item': true,
            'mx-segmented-item-selected': this.value === option.value,
            'mx-segmented-item-disabled': option.disabled || false
          };

          return html`
            <div
              class=${classMap(itemClasses)}
              @click=${() => this.handleItemClick(option)}
              role="radio"
              aria-checked=${this.value === option.value}
              aria-disabled=${option.disabled || this.disabled}
            >
              <div class="mx-segmented-item-label">
                ${option.label}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-segmented': MXSegmented;
  }
}
