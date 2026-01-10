import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Color picker component for selecting colors.
 * 
 * @element mx-color-picker
 * 
 * @attr {string} value - Current color value (hex format)
 * @attr {boolean} disabled - Whether the picker is disabled
 * @attr {boolean} show-text - Whether to show color text
 * @attr {string} size - Size: large, default, small
 * @attr {string} format - Color format: hex, rgb, hsl
 * 
 * @fires change - Fired when color changes
 * 
 * @example
 * ```html
 * <mx-color-picker value="#1677ff" show-text></mx-color-picker>
 * ```
 */
@customElement('mx-color-picker')
export class MXColorPicker extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-color-picker {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .mx-color-picker-trigger {
      width: 32px;
      height: 32px;
      border-radius: var(--mx-border-radius, 6px);
      border: 1px solid var(--mx-color-border, #d9d9d9);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.3s;
    }

    .mx-color-picker-trigger:hover {
      border-color: var(--mx-color-primary, #1677ff);
    }

    .mx-color-picker-trigger-disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    .mx-color-picker-color {
      width: 100%;
      height: 100%;
      border: none;
      cursor: pointer;
    }

    .mx-color-picker-color::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    .mx-color-picker-color::-webkit-color-swatch {
      border: none;
    }

    .mx-color-picker-color::-moz-color-swatch {
      border: none;
    }

    .mx-color-picker-text {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      user-select: none;
    }

    /* Size variants */
    .mx-color-picker-large .mx-color-picker-trigger {
      width: 40px;
      height: 40px;
    }

    .mx-color-picker-small .mx-color-picker-trigger {
      width: 24px;
      height: 24px;
    }

    .mx-color-picker-panel {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 4px;
      padding: 12px;
      background: var(--mx-color-bg-elevated, #ffffff);
      border-radius: var(--mx-border-radius, 6px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
      z-index: 1050;
      display: none;
    }

    .mx-color-picker-panel-open {
      display: block;
    }

    .mx-color-picker-presets {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 4px;
      margin-top: 8px;
    }

    .mx-color-picker-preset {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      cursor: pointer;
      border: 1px solid var(--mx-color-border-secondary, #f0f0f0);
      transition: all 0.3s;
    }

    .mx-color-picker-preset:hover {
      transform: scale(1.1);
    }
  `;

  @property({ type: String })
  value = '#1677ff';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean, attribute: 'show-text' })
  showText = false;

  @property({ type: String })
  size: 'large' | 'default' | 'small' = 'default';

  @property({ type: String })
  format: 'hex' | 'rgb' | 'hsl' = 'hex';

  @state()
  private showPanel = false;

  private presetColors = [
    '#1677ff', '#52c41a', '#faad14', '#ff4d4f',
    '#722ed1', '#eb2f96', '#13c2c2', '#fa8c16',
    '#2f54eb', '#a0d911', '#fa541c', '#f5222d',
    '#531dab', '#c41d7f', '#08979c', '#d4380d'
  ];

  private handleColorChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;

    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private handlePresetClick(color: string) {
    this.value = color;

    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private togglePanel() {
    if (!this.disabled) {
      this.showPanel = !this.showPanel;
    }
  }

  private closePanel() {
    this.showPanel = false;
  }

  render() {
    const classes = {
      'mx-color-picker': true,
      [`mx-color-picker-${this.size}`]: this.size !== 'default'
    };

    const triggerClasses = {
      'mx-color-picker-trigger': true,
      'mx-color-picker-trigger-disabled': this.disabled
    };

    return html`
      <div class=${classMap(classes)}>
        <div 
          class=${classMap(triggerClasses)}
          @click=${this.togglePanel}
        >
          <input
            type="color"
            class="mx-color-picker-color"
            .value=${this.value}
            ?disabled=${this.disabled}
            @input=${this.handleColorChange}
            @click=${(e: Event) => e.stopPropagation()}
          />
        </div>

        ${this.showText ? html`
          <span class="mx-color-picker-text">${this.value}</span>
        ` : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-color-picker': MXColorPicker;
  }
}
