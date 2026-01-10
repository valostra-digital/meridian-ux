var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
/**
 * Icon component for displaying SVG icons.
 *
 * @element mx-icon
 *
 * @attr {string} svg - Raw SVG string to render
 * @attr {boolean} spin - Rotate icon with animation
 * @attr {number} rotate - Rotate icon by specified degrees
 *
 * @slot - Default slot for icon content (if svg prop not provided)
 *
 * @example
 * ```html
 * <!-- Using svg prop -->
 * <mx-icon svg="<svg>...</svg>"></mx-icon>
 *
 * <!-- Spinning icon -->
 * <mx-icon spin svg="<svg>...</svg>"></mx-icon>
 *
 * <!-- Rotated icon -->
 * <mx-icon rotate="90" svg="<svg>...</svg>"></mx-icon>
 *
 * <!-- Using slot -->
 * <mx-icon>
 *   <svg>...</svg>
 * </mx-icon>
 * ```
 */
let MXIcon = class MXIcon extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Raw SVG string to render
         */
        this.svg = '';
        /**
         * Rotate icon with animation
         */
        this.spin = false;
    }
    render() {
        const style = this.rotate ? `transform: rotate(${this.rotate}deg)` : '';
        const classes = `mx-icon ${this.spin ? 'mx-icon-spin' : ''}`;
        return html `
      <span 
        role="img" 
        aria-hidden="true"
        class="${classes}" 
        style=${style}
      >
        ${this.svg ? unsafeSVG(this.svg) : html `<slot></slot>`}
      </span>
    `;
    }
};
MXIcon.styles = css `
    :host {
      display: inline-block;
      color: inherit;
      font-style: normal;
      line-height: 0;
      text-align: center;
      text-transform: none;
      vertical-align: -0.125em;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .mx-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: inherit;
      font-size: inherit;
    }

    .mx-icon-spin {
      animation: iconSpin 1s infinite linear;
    }

    /* SVG sizing */
    svg {
      fill: currentColor;
      width: 1em;
      height: 1em;
      display: inline-block;
    }

    ::slotted(svg) {
      fill: currentColor;
      width: 1em;
      height: 1em;
      display: inline-block;
    }

    @keyframes iconSpin {
      100% {
        transform: rotate(360deg);
      }
    }
  `;
__decorate([
    property({ type: String })
], MXIcon.prototype, "svg", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MXIcon.prototype, "spin", void 0);
__decorate([
    property({ type: Number })
], MXIcon.prototype, "rotate", void 0);
MXIcon = __decorate([
    customElement('mx-icon')
], MXIcon);
export { MXIcon };
//# sourceMappingURL=mx-icon.js.map