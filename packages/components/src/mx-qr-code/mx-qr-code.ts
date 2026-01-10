import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type QRCodeLevel = 'L' | 'M' | 'Q' | 'H';
export type QRCodeStatus = 'active' | 'expired' | 'loading';

/**
 * QR Code component for generating QR codes.
 * 
 * @element mx-qr-code
 * 
 * @attr {string} value - Value to encode in QR code
 * @attr {number} size - Size of QR code in pixels (default 160)
 * @attr {string} color - Color of QR code (default #000000)
 * @attr {string} bg-color - Background color (default #ffffff)
 * @attr {QRCodeLevel} error-level - Error correction level: L, M, Q, H
 * @attr {string} icon - Icon image URL for center
 * @attr {number} icon-size - Icon size (default 40)
 * @attr {boolean} bordered - Whether to show border
 * @attr {QRCodeStatus} status - Status: active, expired, loading
 * 
 * @example
 * ```html
 * <mx-qr-code 
 *   value="https://example.com"
 *   size="200"
 *   bordered
 * ></mx-qr-code>
 * ```
 */
@customElement('mx-qr-code')
export class MXQRCode extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-qr-code {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      background: var(--mx-color-bg-container, #ffffff);
    }

    .mx-qr-code-bordered {
      border: 1px solid var(--mx-color-border, #d9d9d9);
      border-radius: var(--mx-border-radius, 6px);
    }

    .mx-qr-code-canvas {
      display: block;
    }

    .mx-qr-code-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.96);
      border-radius: var(--mx-border-radius, 6px);
    }

    .mx-qr-code-expired {
      text-align: center;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
    }

    .mx-qr-code-expired-icon {
      font-size: 48px;
      margin-bottom: 8px;
    }
  `;

  @property({ type: String })
  value = '';

  @property({ type: Number })
  size = 160;

  @property({ type: String })
  color = '#000000';

  @property({ type: String, attribute: 'bg-color' })
  bgColor = '#ffffff';

  @property({ type: String, attribute: 'error-level' })
  errorLevel: QRCodeLevel = 'M';

  @property({ type: String })
  icon = '';

  @property({ type: Number, attribute: 'icon-size' })
  iconSize = 40;

  @property({ type: Boolean })
  bordered = false;

  @property({ type: String })
  status: QRCodeStatus = 'active';

  @state()
  private qrDataUrl = '';

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('value') || 
        changedProperties.has('size') || 
        changedProperties.has('color') ||
        changedProperties.has('bgColor')) {
      this.generateQRCode();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.generateQRCode();
  }

  private generateQRCode() {
    if (!this.value) return;

    // Simple QR code generation using canvas
    // In production, you'd use a library like qrcode.js
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    canvas.width = this.size;
    canvas.height = this.size;

    // Fill background
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(0, 0, this.size, this.size);

    // Draw a simple pattern (placeholder - real QR would use qrcode library)
    // This is just a visual representation
    ctx.fillStyle = this.color;
    const moduleSize = this.size / 25;
    
    // Draw finder patterns (corners)
    this.drawFinderPattern(ctx, 0, 0, moduleSize);
    this.drawFinderPattern(ctx, this.size - 7 * moduleSize, 0, moduleSize);
    this.drawFinderPattern(ctx, 0, this.size - 7 * moduleSize, moduleSize);

    // Draw some data modules (simplified)
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        if (Math.random() > 0.5) {
          ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
        }
      }
    }

    // Add icon if provided
    if (this.icon) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const iconX = (this.size - this.iconSize) / 2;
        const iconY = (this.size - this.iconSize) / 2;
        
        // White background for icon
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(iconX - 4, iconY - 4, this.iconSize + 8, this.iconSize + 8);
        
        ctx.drawImage(img, iconX, iconY, this.iconSize, this.iconSize);
        this.qrDataUrl = canvas.toDataURL();
      };
      img.src = this.icon;
    } else {
      this.qrDataUrl = canvas.toDataURL();
    }
  }

  private drawFinderPattern(ctx: CanvasRenderingContext2D, x: number, y: number, moduleSize: number) {
    // Outer square
    ctx.fillRect(x, y, moduleSize * 7, moduleSize * 7);
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(x + moduleSize, y + moduleSize, moduleSize * 5, moduleSize * 5);
    ctx.fillStyle = this.color;
    ctx.fillRect(x + moduleSize * 2, y + moduleSize * 2, moduleSize * 3, moduleSize * 3);
  }

  render() {
    const classes = {
      'mx-qr-code': true,
      'mx-qr-code-bordered': this.bordered
    };

    return html`
      <div class=${classes}>
        ${this.status === 'active' ? html`
          <canvas 
            class="mx-qr-code-canvas"
            width=${this.size}
            height=${this.size}
            style="width: ${this.size}px; height: ${this.size}px;"
          >
            ${this.qrDataUrl ? html`
              <img src=${this.qrDataUrl} alt="QR Code" />
            ` : null}
          </canvas>
        ` : null}

        ${this.status === 'loading' ? html`
          <div class="mx-qr-code-overlay">
            <mx-spin></mx-spin>
          </div>
        ` : null}

        ${this.status === 'expired' ? html`
          <div class="mx-qr-code-overlay">
            <div class="mx-qr-code-expired">
              <div class="mx-qr-code-expired-icon">⌛</div>
              <div>QR code expired</div>
            </div>
          </div>
        ` : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-qr-code': MXQRCode;
  }
}
