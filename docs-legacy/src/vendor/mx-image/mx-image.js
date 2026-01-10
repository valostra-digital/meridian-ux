var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
/**
 * Image component with preview and loading states.
 *
 * @element mx-image
 *
 * @attr {string} src - Image source URL
 * @attr {string} alt - Alt text for the image
 * @attr {string} width - Width of the image
 * @attr {string} height - Height of the image
 * @attr {ImageFit} fit - How image should be resized: fill, contain, cover, none, scale-down
 * @attr {boolean} preview - Whether to enable image preview on click
 * @attr {string} placeholder - Placeholder image URL
 * @attr {string} fallback - Fallback image URL on error
 *
 * @fires load - Fired when image loads successfully
 * @fires error - Fired when image fails to load
 *
 * @slot placeholder - Custom placeholder content
 * @slot error - Custom error content
 *
 * @example
 * ```html
 * <mx-image
 *   src="image.jpg"
 *   alt="Example"
 *   preview
 *   width="200px"
 * ></mx-image>
 * ```
 */
let MXImage = class MXImage extends LitElement {
    constructor() {
        super(...arguments);
        this.src = '';
        this.alt = '';
        this.width = '';
        this.height = '';
        this.fit = 'contain';
        this.preview = false;
        this.placeholder = '';
        this.fallback = '';
        this.loading = true;
        this.error = false;
        this.showPreview = false;
    }
    handleLoad() {
        this.loading = false;
        this.error = false;
        this.dispatchEvent(new CustomEvent('load', {
            bubbles: true,
            composed: true
        }));
    }
    handleError() {
        this.loading = false;
        this.error = true;
        this.dispatchEvent(new CustomEvent('error', {
            bubbles: true,
            composed: true
        }));
    }
    handlePreviewClick() {
        if (this.preview && !this.error) {
            this.showPreview = true;
        }
    }
    closePreview() {
        this.showPreview = false;
    }
    render() {
        const imageStyles = `
      width: ${this.width || 'auto'};
      height: ${this.height || 'auto'};
      --image-fit: ${this.fit};
    `;
        return html `
      <div class="mx-image" style=${imageStyles}>
        ${this.loading && !this.error ? html `
          <div class="mx-image-loading" style=${imageStyles}>
            ${this.placeholder ? html `
              <img src=${this.placeholder} alt=${this.alt} />
            ` : html `
              <slot name="placeholder">
                <mx-spin></mx-spin>
              </slot>
            `}
          </div>
        ` : null}

        ${this.error ? html `
          <div class="mx-image-error" style=${imageStyles}>
            ${this.fallback ? html `
              <img 
                src=${this.fallback} 
                alt=${this.alt}
                class="mx-image-img"
              />
            ` : html `
              <slot name="error">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
                  <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 30h-4v-4h4v4zm0-8h-4V14h4v12z"/>
                </svg>
              </slot>
            `}
          </div>
        ` : html `
          <img
            src=${this.src}
            alt=${this.alt}
            class="mx-image-img"
            @load=${this.handleLoad}
            @error=${this.handleError}
            style="display: ${this.loading ? 'none' : 'block'}"
          />
        `}

        ${this.preview && !this.error && !this.loading ? html `
          <div class="mx-image-preview-mask" @click=${this.handlePreviewClick}>
            <svg class="mx-image-preview-icon" viewBox="0 0 1024 1024" fill="currentColor">
              <path d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"/>
            </svg>
          </div>
        ` : null}
      </div>

      ${this.showPreview ? html `
        <div class="mx-image-preview-overlay" @click=${this.closePreview}>
          <img 
            src=${this.src} 
            alt=${this.alt}
            class="mx-image-preview-content"
          />
          <div class="mx-image-preview-close">×</div>
        </div>
      ` : null}
    `;
    }
};
MXImage.styles = css `
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      position: relative;
    }

    .mx-image {
      position: relative;
      display: inline-block;
      overflow: hidden;
    }

    .mx-image-img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: var(--image-fit, contain);
    }

    .mx-image-placeholder,
    .mx-image-error {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--mx-color-bg-container, #f5f5f5);
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
    }

    .mx-image-preview-mask {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .mx-image:hover .mx-image-preview-mask {
      opacity: 1;
    }

    .mx-image-preview-icon {
      color: white;
      font-size: 20px;
    }

    .mx-image-preview-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.85);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mx-image-preview-content {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
    }

    .mx-image-preview-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      cursor: pointer;
      color: white;
      font-size: 20px;
      transition: background 0.3s;
    }

    .mx-image-preview-close:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .mx-image-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--mx-color-bg-container, #f5f5f5);
    }
  `;
__decorate([
    property({ type: String })
], MXImage.prototype, "src", void 0);
__decorate([
    property({ type: String })
], MXImage.prototype, "alt", void 0);
__decorate([
    property({ type: String })
], MXImage.prototype, "width", void 0);
__decorate([
    property({ type: String })
], MXImage.prototype, "height", void 0);
__decorate([
    property({ type: String })
], MXImage.prototype, "fit", void 0);
__decorate([
    property({ type: Boolean })
], MXImage.prototype, "preview", void 0);
__decorate([
    property({ type: String })
], MXImage.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], MXImage.prototype, "fallback", void 0);
__decorate([
    state()
], MXImage.prototype, "loading", void 0);
__decorate([
    state()
], MXImage.prototype, "error", void 0);
__decorate([
    state()
], MXImage.prototype, "showPreview", void 0);
MXImage = __decorate([
    customElement('mx-image')
], MXImage);
export { MXImage };
//# sourceMappingURL=mx-image.js.map