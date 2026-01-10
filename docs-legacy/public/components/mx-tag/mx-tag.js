var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
/**
 * Tag component for categorization or markup.
 *
 * @element mx-tag
 *
 * @attr {TagColor} color - Predefined color or custom hex color
 * @attr {boolean} closable - Whether tag can be closed
 * @attr {string} close-icon - Custom close icon
 * @attr {boolean} bordered - Whether tag has border
 * @attr {string} icon - Icon to display before text
 *
 * @slot - Tag content
 * @slot icon - Custom icon content
 * @slot close-icon - Custom close icon content
 *
 * @fires close - Dispatched when tag is closed
 *
 * @example
 * ```html
 * <!-- Basic tag -->
 * <mx-tag>Tag</mx-tag>
 *
 * <!-- Colored tags -->
 * <mx-tag color="success">Success</mx-tag>
 * <mx-tag color="error">Error</mx-tag>
 *
 * <!-- Closable -->
 * <mx-tag closable>Closable</mx-tag>
 *
 * <!-- Custom color -->
 * <mx-tag color="#87d068">Custom</mx-tag>
 *
 * <!-- Borderless -->
 * <mx-tag color="processing" bordered="false">Processing</mx-tag>
 * ```
 */
let MXTag = class MXTag extends LitElement {
    constructor() {
        super(...arguments);
        this.color = 'default';
        this.closable = false;
        this.closeIcon = '';
        this.bordered = true;
        this.icon = '';
        this.visible = true;
        this.closing = false;
    }
    handleClose(e) {
        e.stopPropagation();
        this.closing = true;
        // Dispatch close event
        const closeEvent = new CustomEvent('close', {
            detail: { tag: this },
            bubbles: true,
            composed: true,
            cancelable: true
        });
        const shouldClose = this.dispatchEvent(closeEvent);
        if (shouldClose) {
            // Wait for animation to complete
            setTimeout(() => {
                this.visible = false;
                this.closing = false;
                this.setAttribute('hidden', '');
                this.requestUpdate();
            }, 200);
        }
        else {
            this.closing = false;
        }
    }
    isPresetColor(color) {
        const presetColors = [
            'default', 'primary', 'success', 'processing', 'error', 'warning',
            'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green',
            'cyan', 'blue', 'geekblue', 'purple'
        ];
        return presetColors.includes(color);
    }
    render() {
        if (!this.visible) {
            return null;
        }
        const hasIcon = this.icon || this.querySelector('[slot="icon"]');
        const hasCustomCloseIcon = this.closeIcon || this.querySelector('[slot="close-icon"]');
        const isPreset = this.isPresetColor(this.color);
        const isCustomColor = !isPreset && this.color.startsWith('#');
        const classes = {
            'mx-tag': true,
            'mx-tag-borderless': !this.bordered,
            [`mx-tag-${this.color}`]: isPreset
        };
        const customStyles = isCustomColor ? {
            color: this.color,
            background: `${this.color}10`,
            borderColor: `${this.color}40`
        } : {};
        return html `
      <span class=${classMap(classes)} style=${styleMap(customStyles)}>
        ${hasIcon ? html `
          <span class="mx-tag-icon">
            <slot name="icon">${this.icon}</slot>
          </span>
        ` : null}
        
        <slot></slot>

        ${this.closable ? html `
          <button 
            class="mx-tag-close"
            @click=${this.handleClose}
            aria-label="Close"
          >
            ${hasCustomCloseIcon ? html `
              <slot name="close-icon">${this.closeIcon}</slot>
            ` : html `
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6.717 6l3.95 3.95a.507.507 0 01-.717.717L6 6.717l-3.95 3.95a.507.507 0 01-.717-.717L5.283 6l-3.95-3.95a.507.507 0 11.717-.717L6 5.283l3.95-3.95a.507.507 0 11.717.717L6.717 6z"/>
              </svg>
            `}
          </button>
        ` : null}
      </span>
    `;
    }
};
MXTag.styles = css `
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .mx-tag {
      box-sizing: border-box;
      margin: 0;
      padding: 0 7px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 14px;
      line-height: 22px;
      list-style: none;
      display: inline-flex;
      align-items: center;
      height: auto;
      white-space: nowrap;
      background: var(--mx-color-fill-quaternary, rgba(0, 0, 0, 0.02));
      border: 1px solid var(--mx-color-border, #d9d9d9);
      border-radius: var(--mx-border-radius, 6px);
      cursor: default;
      opacity: 1;
      transition: all 0.2s;
    }

    .mx-tag-borderless {
      border-color: transparent;
    }

    /* Color variants */
    .mx-tag-default {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      background: var(--mx-color-fill-quaternary, rgba(0, 0, 0, 0.02));
      border-color: var(--mx-color-border, #d9d9d9);
    }

    .mx-tag-primary {
      color: var(--mx-color-primary, #1677ff);
      background: var(--mx-color-primary-bg, #e6f4ff);
      border-color: var(--mx-color-primary-border, #91caff);
    }

    .mx-tag-success {
      color: var(--mx-color-success, #52c41a);
      background: var(--mx-color-success-bg, #f6ffed);
      border-color: var(--mx-color-success-border, #b7eb8f);
    }

    .mx-tag-processing {
      color: var(--mx-color-info, #1677ff);
      background: var(--mx-color-info-bg, #e6f4ff);
      border-color: var(--mx-color-info-border, #91caff);
    }

    .mx-tag-error {
      color: var(--mx-color-error, #ff4d4f);
      background: var(--mx-color-error-bg, #fff2f0);
      border-color: var(--mx-color-error-border, #ffccc7);
    }

    .mx-tag-warning {
      color: var(--mx-color-warning, #faad14);
      background: var(--mx-color-warning-bg, #fffbe6);
      border-color: var(--mx-color-warning-border, #ffe58f);
    }

    /* Preset colors (using Ant Design color palettes) */
    .mx-tag-magenta {
      color: #c41d7f;
      background: #fff0f6;
      border-color: #ffadd2;
    }

    .mx-tag-red {
      color: #cf1322;
      background: #fff1f0;
      border-color: #ffa39e;
    }

    .mx-tag-volcano {
      color: #d4380d;
      background: #fff2e8;
      border-color: #ffbb96;
    }

    .mx-tag-orange {
      color: #d46b08;
      background: #fff7e6;
      border-color: #ffd591;
    }

    .mx-tag-gold {
      color: #d48806;
      background: #fffbe6;
      border-color: #ffe58f;
    }

    .mx-tag-lime {
      color: #7cb305;
      background: #fcffe6;
      border-color: #eaff8f;
    }

    .mx-tag-green {
      color: #389e0d;
      background: #f6ffed;
      border-color: #b7eb8f;
    }

    .mx-tag-cyan {
      color: #08979c;
      background: #e6fffb;
      border-color: #87e8de;
    }

    .mx-tag-blue {
      color: #096dd9;
      background: #e6f4ff;
      border-color: #91caff;
    }

    .mx-tag-geekblue {
      color: #1d39c4;
      background: #f0f5ff;
      border-color: #adc6ff;
    }

    .mx-tag-purple {
      color: #531dab;
      background: #f9f0ff;
      border-color: #d3adf7;
    }

    /* Icon */
    .mx-tag-icon {
      margin-right: 4px;
      display: inline-flex;
      align-items: center;
    }

    /* Close button */
    .mx-tag-close {
      margin-left: 4px;
      padding: 0;
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 12px;
      color: currentColor;
      opacity: 0.6;
      transition: opacity 0.2s, color 0.2s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .mx-tag-close:hover {
      opacity: 1;
    }

    /* Closing animation */
    @keyframes tagFadeOut {
      0% {
        opacity: 1;
        max-width: 200px;
        padding: 0 7px;
        margin-right: 8px;
      }
      100% {
        opacity: 0;
        max-width: 0;
        padding: 0;
        margin-right: 0;
      }
    }

    :host([closing]) .mx-tag {
      animation: tagFadeOut 0.2s ease-out forwards;
    }
  `;
__decorate([
    property({ type: String })
], MXTag.prototype, "color", void 0);
__decorate([
    property({ type: Boolean })
], MXTag.prototype, "closable", void 0);
__decorate([
    property({ type: String, attribute: 'close-icon' })
], MXTag.prototype, "closeIcon", void 0);
__decorate([
    property({ type: Boolean })
], MXTag.prototype, "bordered", void 0);
__decorate([
    property({ type: String })
], MXTag.prototype, "icon", void 0);
__decorate([
    state()
], MXTag.prototype, "visible", void 0);
__decorate([
    state()
], MXTag.prototype, "closing", void 0);
MXTag = __decorate([
    customElement('mx-tag')
], MXTag);
export { MXTag };
//# sourceMappingURL=mx-tag.js.map