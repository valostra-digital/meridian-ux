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
 * Row component - 24-column grid row
 *
 * @element mx-row
 *
 * @slot - Column elements (mx-col)
 *
 * @cssprop --mx-row-gutter-x - Horizontal gutter spacing
 * @cssprop --mx-row-gutter-y - Vertical gutter spacing
 */
let MXRow = class MXRow extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Spacing between columns (number or [horizontal, vertical])
         */
        this.gutter = 0;
        /**
         * Horizontal alignment of columns
         */
        this.justify = 'start';
        /**
         * Vertical alignment of columns
         */
        this.align = 'top';
        /**
         * Auto wrap columns
         */
        this.wrap = true;
    }
    willUpdate(changedProperties) {
        if (changedProperties.has('gutter')) {
            this.updateGutter();
        }
    }
    updateGutter() {
        let gutterX;
        let gutterY;
        if (Array.isArray(this.gutter)) {
            [gutterX, gutterY] = this.gutter;
        }
        else {
            gutterX = this.gutter;
            gutterY = 0;
        }
        this.style.setProperty('--mx-row-gutter-x', `${gutterX}px`);
        this.style.setProperty('--mx-row-gutter-y', `${gutterY}px`);
    }
    render() {
        const classes = {
            'mx-row': true,
            [`mx-row-justify-${this.justify}`]: true,
            [`mx-row-align-${this.align}`]: true,
            'mx-row-no-wrap': !this.wrap,
        };
        return html `
      <div class=${classMap(classes)}>
        <slot></slot>
      </div>
    `;
    }
};
MXRow.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-row {
      display: flex;
      flex-flow: row wrap;
      min-width: 0;
      margin-left: calc(var(--mx-row-gutter-x, 0px) / -2);
      margin-right: calc(var(--mx-row-gutter-x, 0px) / -2);
      row-gap: var(--mx-row-gutter-y, 0px);
    }

    .mx-row::before,
    .mx-row::after {
      display: flex;
    }

    /* Justify */
    .mx-row-justify-start {
      justify-content: flex-start;
    }

    .mx-row-justify-end {
      justify-content: flex-end;
    }

    .mx-row-justify-center {
      justify-content: center;
    }

    .mx-row-justify-space-around {
      justify-content: space-around;
    }

    .mx-row-justify-space-between {
      justify-content: space-between;
    }

    .mx-row-justify-space-evenly {
      justify-content: space-evenly;
    }

    /* Align */
    .mx-row-align-top {
      align-items: flex-start;
    }

    .mx-row-align-middle {
      align-items: center;
    }

    .mx-row-align-bottom {
      align-items: flex-end;
    }

    .mx-row-align-stretch {
      align-items: stretch;
    }

    /* Wrap */
    .mx-row-no-wrap {
      flex-wrap: nowrap;
    }
  `;
__decorate([
    property({ type: Object })
], MXRow.prototype, "gutter", void 0);
__decorate([
    property({ type: String })
], MXRow.prototype, "justify", void 0);
__decorate([
    property({ type: String })
], MXRow.prototype, "align", void 0);
__decorate([
    property({ type: Boolean })
], MXRow.prototype, "wrap", void 0);
MXRow = __decorate([
    customElement('mx-row')
], MXRow);
export { MXRow };
//# sourceMappingURL=mx-row.js.map