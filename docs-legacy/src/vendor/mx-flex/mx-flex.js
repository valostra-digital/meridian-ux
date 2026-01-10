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
 * Flex component - Flexbox layout wrapper
 *
 * @element mx-flex
 *
 * @slot - Content to display in the flex container
 *
 * @cssprop --mx-flex-gap - Custom gap size
 */
let MXFlex = class MXFlex extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Gap between items (preset or number in pixels)
         */
        this.gap = 0;
        /**
         * Justify content
         */
        this.justify = 'flex-start';
        /**
         * Align items
         */
        this.align = 'stretch';
        /**
         * Flex direction
         */
        this.direction = 'row';
        /**
         * Flex wrap
         */
        this.wrap = 'nowrap';
        /**
         * Shorthand for vertical layout (direction="column")
         */
        this.vertical = false;
        this.gapSizeMap = {
            small: '8px',
            middle: '16px',
            large: '24px',
        };
    }
    willUpdate(changedProperties) {
        if (changedProperties.has('gap') || changedProperties.has('vertical') || changedProperties.has('direction')) {
            this.updateStyles();
        }
    }
    updateStyles() {
        // Handle gap
        let gapValue;
        if (typeof this.gap === 'number') {
            gapValue = `${this.gap}px`;
        }
        else {
            gapValue = this.gapSizeMap[this.gap] || '0px';
        }
        this.style.setProperty('--mx-flex-gap', gapValue);
        // Handle justify
        this.style.justifyContent = this.justify;
        // Handle align
        this.style.alignItems = this.align;
        // Handle direction
        const finalDirection = this.vertical ? 'column' : this.direction;
        this.style.flexDirection = finalDirection;
        // Handle wrap
        this.style.flexWrap = this.wrap;
        // Handle flex
        if (this.flex) {
            this.style.flex = this.flex;
        }
    }
    render() {
        const classes = {
            'mx-flex': true,
        };
        return html `
      <div class=${classMap(classes)}>
        <slot></slot>
      </div>
    `;
    }
};
MXFlex.styles = css `
    :host {
      display: flex;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    :host([vertical]) {
      flex-direction: column;
    }

    .mx-flex {
      display: flex;
      gap: var(--mx-flex-gap, 0px);
    }
  `;
__decorate([
    property({ type: String })
], MXFlex.prototype, "gap", void 0);
__decorate([
    property({ type: String })
], MXFlex.prototype, "justify", void 0);
__decorate([
    property({ type: String })
], MXFlex.prototype, "align", void 0);
__decorate([
    property({ type: String })
], MXFlex.prototype, "direction", void 0);
__decorate([
    property({ type: String })
], MXFlex.prototype, "wrap", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MXFlex.prototype, "vertical", void 0);
__decorate([
    property({ type: String })
], MXFlex.prototype, "flex", void 0);
MXFlex = __decorate([
    customElement('mx-flex')
], MXFlex);
export { MXFlex };
//# sourceMappingURL=mx-flex.js.map