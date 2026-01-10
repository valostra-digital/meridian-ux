var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
/**
 * Space component - Set components spacing
 *
 * @element mx-space
 *
 * @fires change - Dispatched when children change
 *
 * @slot - Default slot for space items
 *
 * @cssprop --mx-space-gap - Custom gap size
 */
let MXSpace = class MXSpace extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Size of the space (preset or number in pixels)
         */
        this.size = 'small';
        /**
         * Direction of the space
         */
        this.direction = 'horizontal';
        /**
         * Auto wrap items
         */
        this.wrap = false;
        /**
         * Display as block (take full width)
         */
        this.block = false;
        /**
         * Compact mode (remove spacing and connect borders)
         */
        this.compact = false;
        this.gapSize = '8px';
        this.sizeMap = {
            small: '8px',
            middle: '16px',
            large: '24px',
        };
    }
    willUpdate(changedProperties) {
        if (changedProperties.has('size')) {
            this.updateGapSize();
        }
    }
    updateGapSize() {
        if (typeof this.size === 'number') {
            this.gapSize = `${this.size}px`;
        }
        else {
            this.gapSize = this.sizeMap[this.size] || this.sizeMap.small;
        }
        this.style.setProperty('--mx-space-gap', this.gapSize);
    }
    render() {
        const classes = {
            'mx-space': true,
            'mx-space-horizontal': this.direction === 'horizontal',
            'mx-space-vertical': this.direction === 'vertical',
            'mx-space-wrap': this.wrap,
            'mx-space-compact': this.compact,
            [`mx-space-align-${this.align}`]: !!this.align,
        };
        if (this.compact) {
            // In compact mode, render items directly without splits
            return html `
        <div class=${classMap(classes)}>
          <slot></slot>
        </div>
      `;
        }
        return html `
      <div class=${classMap(classes)}>
        <slot></slot>
      </div>
    `;
    }
};
MXSpace.styles = css `
    :host {
      display: inline-flex;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    :host([block]) {
      display: flex;
      width: 100%;
    }

    .mx-space {
      display: inline-flex;
      gap: var(--mx-space-gap, 8px);
    }

    .mx-space-horizontal {
      flex-direction: row;
    }

    .mx-space-vertical {
      flex-direction: column;
    }

    .mx-space-align-start {
      align-items: flex-start;
    }

    .mx-space-align-end {
      align-items: flex-end;
    }

    .mx-space-align-center {
      align-items: center;
    }

    .mx-space-align-baseline {
      align-items: baseline;
    }

    .mx-space-wrap {
      flex-wrap: wrap;
    }

    .mx-space-compact {
      gap: 0;
    }

    .mx-space-compact ::slotted(*) {
      border-radius: 0 !important;
      border-right-width: 0 !important;
    }

    .mx-space-compact ::slotted(:first-child) {
      border-top-left-radius: var(--mx-border-radius, 6px) !important;
      border-bottom-left-radius: var(--mx-border-radius, 6px) !important;
    }

    .mx-space-compact ::slotted(:last-child) {
      border-top-right-radius: var(--mx-border-radius, 6px) !important;
      border-bottom-right-radius: var(--mx-border-radius, 6px) !important;
      border-right-width: 1px !important;
    }

    .mx-space-compact.mx-space-vertical ::slotted(*) {
      border-radius: 0 !important;
      border-bottom-width: 0 !important;
      border-right-width: 1px !important;
    }

    .mx-space-compact.mx-space-vertical ::slotted(:first-child) {
      border-top-left-radius: var(--mx-border-radius, 6px) !important;
      border-top-right-radius: var(--mx-border-radius, 6px) !important;
      border-bottom-left-radius: 0 !important;
    }

    .mx-space-compact.mx-space-vertical ::slotted(:last-child) {
      border-bottom-left-radius: var(--mx-border-radius, 6px) !important;
      border-bottom-right-radius: var(--mx-border-radius, 6px) !important;
      border-bottom-width: 1px !important;
    }

    .mx-space-split {
      display: flex;
      align-items: center;
    }

    .mx-space-item {
      display: flex;
      align-items: center;
    }
  `;
__decorate([
    property({ type: String })
], MXSpace.prototype, "size", void 0);
__decorate([
    property({ type: String })
], MXSpace.prototype, "direction", void 0);
__decorate([
    property({ type: String })
], MXSpace.prototype, "align", void 0);
__decorate([
    property({ type: Boolean })
], MXSpace.prototype, "wrap", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MXSpace.prototype, "block", void 0);
__decorate([
    property({ type: Boolean })
], MXSpace.prototype, "compact", void 0);
__decorate([
    property({ type: String })
], MXSpace.prototype, "split", void 0);
__decorate([
    state()
], MXSpace.prototype, "gapSize", void 0);
MXSpace = __decorate([
    customElement('mx-space')
], MXSpace);
export { MXSpace };
//# sourceMappingURL=mx-space.js.map