var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
/**
 * Divider component - A divider line separates different content
 *
 * @element mx-divider
 *
 * @slot - Content to display within the divider (for horizontal dividers with text)
 *
 * @cssprop --mx-divider-color - Color of the divider line
 */
let MXDivider = class MXDivider extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Type of the divider
         */
        this.type = 'horizontal';
        /**
         * Use dashed line
         */
        this.dashed = false;
        /**
         * Position of the text (for horizontal dividers with text)
         */
        this.orientation = 'center';
        /**
         * Use plain style (no bold text)
         */
        this.plain = false;
    }
    hasSlottedContent() {
        const slot = this.shadowRoot?.querySelector('slot');
        return !!slot?.assignedNodes().length;
    }
    render() {
        const isHorizontal = this.type === 'horizontal';
        const hasContent = this.hasSlottedContent();
        const classes = {
            'mx-divider': true,
            'mx-divider-horizontal': isHorizontal,
            'mx-divider-vertical': !isHorizontal,
            'mx-divider-dashed': this.dashed,
            'mx-divider-with-text': isHorizontal && hasContent,
            [`mx-divider-with-text-${this.orientation}`]: isHorizontal && hasContent && this.orientation !== 'center',
            'mx-divider-plain': this.plain,
        };
        if (isHorizontal && hasContent) {
            return html `
        <div class=${classMap(classes)}>
          <span class="mx-divider-inner-text">
            <slot></slot>
          </span>
        </div>
      `;
        }
        return html `<div class=${classMap(classes)}></div>`;
    }
};
MXDivider.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    :host([type="vertical"]) {
      display: inline-block;
      height: auto;
      margin: 0 8px;
      vertical-align: middle;
    }

    .mx-divider {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      font-size: var(--mx-font-size, 14px);
      line-height: var(--mx-line-height, 1.5714285714285714);
      list-style: none;
      font-family: inherit;
    }

    .mx-divider-horizontal {
      display: flex;
      clear: both;
      width: 100%;
      min-width: 100%;
      margin: 24px 0;
      border-top: 1px solid var(--mx-divider-color, rgba(5, 5, 5, 0.06));
    }

    .mx-divider-horizontal.mx-divider-with-text {
      display: flex;
      align-items: center;
      margin: 16px 0;
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      font-weight: 500;
      font-size: 16px;
      white-space: nowrap;
      text-align: center;
      border-top: 0;
    }

    .mx-divider-horizontal.mx-divider-with-text::before,
    .mx-divider-horizontal.mx-divider-with-text::after {
      position: relative;
      width: 50%;
      border-top: 1px solid var(--mx-divider-color, rgba(5, 5, 5, 0.06));
      transform: translateY(50%);
      content: '';
    }

    .mx-divider-horizontal.mx-divider-with-text-left::before {
      width: 5%;
    }

    .mx-divider-horizontal.mx-divider-with-text-left::after {
      width: 95%;
    }

    .mx-divider-horizontal.mx-divider-with-text-right::before {
      width: 95%;
    }

    .mx-divider-horizontal.mx-divider-with-text-right::after {
      width: 5%;
    }

    .mx-divider-inner-text {
      display: inline-block;
      padding: 0 1em;
    }

    .mx-divider-dashed {
      border-style: dashed;
      border-width: 1px 0 0;
    }

    .mx-divider-horizontal.mx-divider-dashed.mx-divider-with-text::before,
    .mx-divider-horizontal.mx-divider-dashed.mx-divider-with-text::after {
      border-style: dashed;
    }

    .mx-divider-vertical {
      position: relative;
      top: -0.06em;
      display: inline-block;
      height: 0.9em;
      margin: 0 8px;
      vertical-align: middle;
      border-top: 0;
      border-left: 1px solid var(--mx-divider-color, rgba(5, 5, 5, 0.06));
    }

    .mx-divider-vertical.mx-divider-dashed {
      border-left-style: dashed;
    }

    .mx-divider-plain.mx-divider-with-text {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-weight: normal;
      font-size: var(--mx-font-size, 14px);
    }
  `;
__decorate([
    property({ type: String, reflect: true })
], MXDivider.prototype, "type", void 0);
__decorate([
    property({ type: Boolean })
], MXDivider.prototype, "dashed", void 0);
__decorate([
    property({ type: String })
], MXDivider.prototype, "orientation", void 0);
__decorate([
    property({ type: Boolean })
], MXDivider.prototype, "plain", void 0);
MXDivider = __decorate([
    customElement('mx-divider')
], MXDivider);
export { MXDivider };
//# sourceMappingURL=mx-divider.js.map