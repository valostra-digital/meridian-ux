var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
/**
 * Watermark component that adds watermark overlay to content.
 *
 * @element mx-watermark
 *
 * @attr {string} content - Watermark text content
 * @attr {number} width - Width of watermark (default 120)
 * @attr {number} height - Height of watermark (default 64)
 * @attr {number} rotate - Rotation angle in degrees (default -22)
 * @attr {number} z-index - Z-index of watermark (default 9)
 * @attr {string} font-size - Font size (default 16px)
 * @attr {string} font-color - Font color (default rgba(0,0,0,.15))
 * @attr {string} font-family - Font family
 * @attr {string} font-weight - Font weight (default normal)
 * @attr {number} gap-x - Horizontal gap between watermarks (default 100)
 * @attr {number} gap-y - Vertical gap between watermarks (default 100)
 *
 * @slot - Content to overlay watermark on
 *
 * @example
 * ```html
 * <mx-watermark content="Confidential">
 *   <div>Protected content here</div>
 * </mx-watermark>
 * ```
 */
let MXWatermark = class MXWatermark extends LitElement {
    constructor() {
        super(...arguments);
        this.content = '';
        this.width = 120;
        this.height = 64;
        this.rotate = -22;
        this.zIndex = 9;
        this.fontSize = '16px';
        this.fontColor = 'rgba(0,0,0,.15)';
        this.fontFamily = '';
        this.fontWeight = 'normal';
        this.gapX = 100;
        this.gapY = 100;
        this.watermarkUrl = '';
    }
    updated(changedProperties) {
        // Regenerate watermark when any property changes
        this.generateWatermark();
    }
    connectedCallback() {
        super.connectedCallback();
        this.generateWatermark();
    }
    generateWatermark() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        const ratio = window.devicePixelRatio || 1;
        const canvasWidth = (this.width + this.gapX) * ratio;
        const canvasHeight = (this.height + this.gapY) * ratio;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.scale(ratio, ratio);
        ctx.translate(this.width / 2, this.height / 2);
        ctx.rotate((Math.PI / 180) * this.rotate);
        const font = `${this.fontWeight} ${this.fontSize} ${this.fontFamily || 'sans-serif'}`;
        ctx.font = font;
        ctx.fillStyle = this.fontColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.content, 0, 0);
        this.watermarkUrl = canvas.toDataURL();
    }
    render() {
        const overlayStyles = `
      z-index: ${this.zIndex};
      background-image: url(${this.watermarkUrl});
      background-size: ${this.width + this.gapX}px ${this.height + this.gapY}px;
    `;
        return html `
      <div class="mx-watermark">
        <div class="mx-watermark-overlay" style=${overlayStyles}></div>
        <div class="mx-watermark-content">
          <slot></slot>
        </div>
      </div>
    `;
    }
};
MXWatermark.styles = css `
    :host {
      display: block;
      position: relative;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-watermark {
      position: relative;
    }

    .mx-watermark-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-repeat: repeat;
      background-position: 0 0;
    }

    .mx-watermark-content {
      position: relative;
    }
  `;
__decorate([
    property({ type: String })
], MXWatermark.prototype, "content", void 0);
__decorate([
    property({ type: Number })
], MXWatermark.prototype, "width", void 0);
__decorate([
    property({ type: Number })
], MXWatermark.prototype, "height", void 0);
__decorate([
    property({ type: Number })
], MXWatermark.prototype, "rotate", void 0);
__decorate([
    property({ type: Number, attribute: 'z-index' })
], MXWatermark.prototype, "zIndex", void 0);
__decorate([
    property({ type: String, attribute: 'font-size' })
], MXWatermark.prototype, "fontSize", void 0);
__decorate([
    property({ type: String, attribute: 'font-color' })
], MXWatermark.prototype, "fontColor", void 0);
__decorate([
    property({ type: String, attribute: 'font-family' })
], MXWatermark.prototype, "fontFamily", void 0);
__decorate([
    property({ type: String, attribute: 'font-weight' })
], MXWatermark.prototype, "fontWeight", void 0);
__decorate([
    property({ type: Number, attribute: 'gap-x' })
], MXWatermark.prototype, "gapX", void 0);
__decorate([
    property({ type: Number, attribute: 'gap-y' })
], MXWatermark.prototype, "gapY", void 0);
__decorate([
    state()
], MXWatermark.prototype, "watermarkUrl", void 0);
MXWatermark = __decorate([
    customElement('mx-watermark')
], MXWatermark);
export { MXWatermark };
//# sourceMappingURL=mx-watermark.js.map