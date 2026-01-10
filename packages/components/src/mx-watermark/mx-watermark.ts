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
@customElement('mx-watermark')
export class MXWatermark extends LitElement {
  static styles = css`
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

  @property({ type: String })
  content = '';

  @property({ type: Number })
  width = 120;

  @property({ type: Number })
  height = 64;

  @property({ type: Number })
  rotate = -22;

  @property({ type: Number, attribute: 'z-index' })
  zIndex = 9;

  @property({ type: String, attribute: 'font-size' })
  fontSize = '16px';

  @property({ type: String, attribute: 'font-color' })
  fontColor = 'rgba(0,0,0,.15)';

  @property({ type: String, attribute: 'font-family' })
  fontFamily = '';

  @property({ type: String, attribute: 'font-weight' })
  fontWeight = 'normal';

  @property({ type: Number, attribute: 'gap-x' })
  gapX = 100;

  @property({ type: Number, attribute: 'gap-y' })
  gapY = 100;

  @state()
  private watermarkUrl = '';

  updated(changedProperties: Map<string, any>) {
    // Regenerate watermark when any property changes
    this.generateWatermark();
  }

  connectedCallback() {
    super.connectedCallback();
    this.generateWatermark();
  }

  private generateWatermark() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

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

    return html`
      <div class="mx-watermark">
        <div class="mx-watermark-overlay" style=${overlayStyles}></div>
        <div class="mx-watermark-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-watermark': MXWatermark;
  }
}
