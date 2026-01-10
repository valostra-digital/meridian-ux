var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * Statistic component for displaying statistical data.
 *
 * @element mx-statistic
 *
 * @attr {string} title - Statistic title
 * @attr {string|number} value - Statistic value
 * @attr {string} prefix - Prefix text or icon
 * @attr {string} suffix - Suffix text or icon
 * @attr {number} precision - Decimal precision for numbers
 * @attr {string} value-style - Custom CSS for value
 *
 * @slot - Custom content
 * @slot title - Custom title content
 * @slot prefix - Custom prefix content
 * @slot suffix - Custom suffix content
 *
 * @example
 * ```html
 * <mx-statistic title="Active Users" value="1234"></mx-statistic>
 * <mx-statistic title="Growth" value="50.52" suffix="%"></mx-statistic>
 * ```
 */
let MXStatistic = class MXStatistic extends LitElement {
    constructor() {
        super(...arguments);
        this.title = '';
        this.value = '';
        this.prefix = '';
        this.suffix = '';
        this.valueStyle = '';
    }
    formatValue() {
        if (typeof this.value === 'number' && this.precision !== undefined) {
            return this.value.toFixed(this.precision);
        }
        return String(this.value);
    }
    render() {
        const hasCustomTitle = this.querySelector('[slot="title"]');
        const hasCustomContent = this.querySelector(':not([slot])');
        const hasCustomPrefix = this.querySelector('[slot="prefix"]');
        const hasCustomSuffix = this.querySelector('[slot="suffix"]');
        return html `
      <div class="mx-statistic">
        ${this.title || hasCustomTitle ? html `
          <div class="mx-statistic-title">
            ${hasCustomTitle ? html `<slot name="title"></slot>` : this.title}
          </div>
        ` : null}

        <div class="mx-statistic-content" style="${this.valueStyle}">
          ${hasCustomContent ? html `
            <slot></slot>
          ` : html `
            ${this.prefix || hasCustomPrefix ? html `
              <span class="mx-statistic-content-prefix">
                ${hasCustomPrefix ? html `<slot name="prefix"></slot>` : this.prefix}
              </span>
            ` : null}
            
            <span class="mx-statistic-content-value">
              ${this.formatValue()}
            </span>

            ${this.suffix || hasCustomSuffix ? html `
              <span class="mx-statistic-content-suffix">
                ${hasCustomSuffix ? html `<slot name="suffix"></slot>` : this.suffix}
              </span>
            ` : null}
          `}
        </div>
      </div>
    `;
    }
};
MXStatistic.styles = css `
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-statistic {
      box-sizing: border-box;
    }

    .mx-statistic-title {
      margin-bottom: 4px;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      font-size: 14px;
    }

    .mx-statistic-content {
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      font-size: 24px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace;
    }

    .mx-statistic-content-value {
      display: inline-block;
      direction: ltr;
    }

    .mx-statistic-content-prefix,
    .mx-statistic-content-suffix {
      display: inline-block;
    }

    .mx-statistic-content-prefix {
      margin-right: 4px;
    }

    .mx-statistic-content-suffix {
      margin-left: 4px;
    }
  `;
__decorate([
    property({ type: String })
], MXStatistic.prototype, "title", void 0);
__decorate([
    property({ type: String })
], MXStatistic.prototype, "value", void 0);
__decorate([
    property({ type: String })
], MXStatistic.prototype, "prefix", void 0);
__decorate([
    property({ type: String })
], MXStatistic.prototype, "suffix", void 0);
__decorate([
    property({ type: Number })
], MXStatistic.prototype, "precision", void 0);
__decorate([
    property({ type: String, attribute: 'value-style' })
], MXStatistic.prototype, "valueStyle", void 0);
MXStatistic = __decorate([
    customElement('mx-statistic')
], MXStatistic);
export { MXStatistic };
//# sourceMappingURL=mx-statistic.js.map