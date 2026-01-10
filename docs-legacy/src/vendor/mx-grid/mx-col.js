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
 * Col component - 24-column grid column
 *
 * @element mx-col
 *
 * @slot - Content to display in the column
 */
let MXCol = class MXCol extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Number of columns to offset
         */
        this.offset = 0;
        /**
         * Number of columns to pull (move left)
         */
        this.pull = 0;
        /**
         * Number of columns to push (move right)
         */
        this.push = 0;
    }
    willUpdate(changedProperties) {
        if (changedProperties.has('flex')) {
            this.updateFlex();
        }
    }
    updateFlex() {
        if (this.flex) {
            this.style.flex = this.flex;
        }
    }
    render() {
        const classes = {
            'mx-col': true,
        };
        // Add span class
        if (this.span !== undefined) {
            classes[`mx-col-${this.span}`] = true;
        }
        // Add offset class
        if (this.offset) {
            classes[`mx-col-offset-${this.offset}`] = true;
        }
        // Add order class
        if (this.order !== undefined) {
            classes[`mx-col-order-${this.order}`] = true;
        }
        // Add pull class
        if (this.pull) {
            classes[`mx-col-pull-${this.pull}`] = true;
        }
        // Add push class
        if (this.push) {
            classes[`mx-col-push-${this.push}`] = true;
        }
        return html `
      <div class=${classMap(classes)}>
        <slot></slot>
      </div>
    `;
    }
};
MXCol.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-col {
      position: relative;
      max-width: 100%;
      min-height: 1px;
      padding-left: calc(var(--mx-row-gutter-x, 0px) / 2);
      padding-right: calc(var(--mx-row-gutter-x, 0px) / 2);
    }

    /* Flex basis for different spans */
    .mx-col-1 { flex: 0 0 4.16666667%; max-width: 4.16666667%; }
    .mx-col-2 { flex: 0 0 8.33333333%; max-width: 8.33333333%; }
    .mx-col-3 { flex: 0 0 12.5%; max-width: 12.5%; }
    .mx-col-4 { flex: 0 0 16.66666667%; max-width: 16.66666667%; }
    .mx-col-5 { flex: 0 0 20.83333333%; max-width: 20.83333333%; }
    .mx-col-6 { flex: 0 0 25%; max-width: 25%; }
    .mx-col-7 { flex: 0 0 29.16666667%; max-width: 29.16666667%; }
    .mx-col-8 { flex: 0 0 33.33333333%; max-width: 33.33333333%; }
    .mx-col-9 { flex: 0 0 37.5%; max-width: 37.5%; }
    .mx-col-10 { flex: 0 0 41.66666667%; max-width: 41.66666667%; }
    .mx-col-11 { flex: 0 0 45.83333333%; max-width: 45.83333333%; }
    .mx-col-12 { flex: 0 0 50%; max-width: 50%; }
    .mx-col-13 { flex: 0 0 54.16666667%; max-width: 54.16666667%; }
    .mx-col-14 { flex: 0 0 58.33333333%; max-width: 58.33333333%; }
    .mx-col-15 { flex: 0 0 62.5%; max-width: 62.5%; }
    .mx-col-16 { flex: 0 0 66.66666667%; max-width: 66.66666667%; }
    .mx-col-17 { flex: 0 0 70.83333333%; max-width: 70.83333333%; }
    .mx-col-18 { flex: 0 0 75%; max-width: 75%; }
    .mx-col-19 { flex: 0 0 79.16666667%; max-width: 79.16666667%; }
    .mx-col-20 { flex: 0 0 83.33333333%; max-width: 83.33333333%; }
    .mx-col-21 { flex: 0 0 87.5%; max-width: 87.5%; }
    .mx-col-22 { flex: 0 0 91.66666667%; max-width: 91.66666667%; }
    .mx-col-23 { flex: 0 0 95.83333333%; max-width: 95.83333333%; }
    .mx-col-24 { flex: 0 0 100%; max-width: 100%; }

    /* Offset */
    .mx-col-offset-0 { margin-left: 0; }
    .mx-col-offset-1 { margin-left: 4.16666667%; }
    .mx-col-offset-2 { margin-left: 8.33333333%; }
    .mx-col-offset-3 { margin-left: 12.5%; }
    .mx-col-offset-4 { margin-left: 16.66666667%; }
    .mx-col-offset-5 { margin-left: 20.83333333%; }
    .mx-col-offset-6 { margin-left: 25%; }
    .mx-col-offset-7 { margin-left: 29.16666667%; }
    .mx-col-offset-8 { margin-left: 33.33333333%; }
    .mx-col-offset-9 { margin-left: 37.5%; }
    .mx-col-offset-10 { margin-left: 41.66666667%; }
    .mx-col-offset-11 { margin-left: 45.83333333%; }
    .mx-col-offset-12 { margin-left: 50%; }
    .mx-col-offset-13 { margin-left: 54.16666667%; }
    .mx-col-offset-14 { margin-left: 58.33333333%; }
    .mx-col-offset-15 { margin-left: 62.5%; }
    .mx-col-offset-16 { margin-left: 66.66666667%; }
    .mx-col-offset-17 { margin-left: 70.83333333%; }
    .mx-col-offset-18 { margin-left: 75%; }
    .mx-col-offset-19 { margin-left: 79.16666667%; }
    .mx-col-offset-20 { margin-left: 83.33333333%; }
    .mx-col-offset-21 { margin-left: 87.5%; }
    .mx-col-offset-22 { margin-left: 91.66666667%; }
    .mx-col-offset-23 { margin-left: 95.83333333%; }
    .mx-col-offset-24 { margin-left: 100%; }

    /* Order */
    .mx-col-order-0 { order: 0; }
    .mx-col-order-1 { order: 1; }
    .mx-col-order-2 { order: 2; }
    .mx-col-order-3 { order: 3; }
    .mx-col-order-4 { order: 4; }
    .mx-col-order-5 { order: 5; }
    .mx-col-order-6 { order: 6; }
    .mx-col-order-7 { order: 7; }
    .mx-col-order-8 { order: 8; }
    .mx-col-order-9 { order: 9; }
    .mx-col-order-10 { order: 10; }

    /* Pull (relative positioning) */
    .mx-col-pull-0 { right: auto; }
    .mx-col-pull-1 { right: 4.16666667%; }
    .mx-col-pull-2 { right: 8.33333333%; }
    .mx-col-pull-3 { right: 12.5%; }
    .mx-col-pull-4 { right: 16.66666667%; }
    .mx-col-pull-5 { right: 20.83333333%; }
    .mx-col-pull-6 { right: 25%; }
    .mx-col-pull-7 { right: 29.16666667%; }
    .mx-col-pull-8 { right: 33.33333333%; }
    .mx-col-pull-9 { right: 37.5%; }
    .mx-col-pull-10 { right: 41.66666667%; }
    .mx-col-pull-11 { right: 45.83333333%; }
    .mx-col-pull-12 { right: 50%; }

    /* Push (relative positioning) */
    .mx-col-push-0 { left: auto; }
    .mx-col-push-1 { left: 4.16666667%; }
    .mx-col-push-2 { left: 8.33333333%; }
    .mx-col-push-3 { left: 12.5%; }
    .mx-col-push-4 { left: 16.66666667%; }
    .mx-col-push-5 { left: 20.83333333%; }
    .mx-col-push-6 { left: 25%; }
    .mx-col-push-7 { left: 29.16666667%; }
    .mx-col-push-8 { left: 33.33333333%; }
    .mx-col-push-9 { left: 37.5%; }
    .mx-col-push-10 { left: 41.66666667%; }
    .mx-col-push-11 { left: 45.83333333%; }
    .mx-col-push-12 { left: 50%; }

    /* Responsive breakpoints */
    @media (max-width: 575px) {
      /* xs styles would go here */
    }

    @media (min-width: 576px) {
      /* sm styles would go here */
    }

    @media (min-width: 768px) {
      /* md styles would go here */
    }

    @media (min-width: 992px) {
      /* lg styles would go here */
    }

    @media (min-width: 1200px) {
      /* xl styles would go here */
    }

    @media (min-width: 1600px) {
      /* xxl styles would go here */
    }
  `;
__decorate([
    property({ type: Number })
], MXCol.prototype, "span", void 0);
__decorate([
    property({ type: Number })
], MXCol.prototype, "offset", void 0);
__decorate([
    property({ type: Number })
], MXCol.prototype, "order", void 0);
__decorate([
    property({ type: Number })
], MXCol.prototype, "pull", void 0);
__decorate([
    property({ type: Number })
], MXCol.prototype, "push", void 0);
__decorate([
    property({ type: String })
], MXCol.prototype, "flex", void 0);
__decorate([
    property({ type: Object })
], MXCol.prototype, "xs", void 0);
__decorate([
    property({ type: Object })
], MXCol.prototype, "sm", void 0);
__decorate([
    property({ type: Object })
], MXCol.prototype, "md", void 0);
__decorate([
    property({ type: Object })
], MXCol.prototype, "lg", void 0);
__decorate([
    property({ type: Object })
], MXCol.prototype, "xl", void 0);
__decorate([
    property({ type: Object })
], MXCol.prototype, "xxl", void 0);
MXCol = __decorate([
    customElement('mx-col')
], MXCol);
export { MXCol };
//# sourceMappingURL=mx-col.js.map