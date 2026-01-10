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
 * Float button component for floating action buttons.
 *
 * @element mx-float-button
 *
 * @attr {FloatButtonType} type - Button type: default, primary
 * @attr {FloatButtonShape} shape - Button shape: circle, square
 * @attr {string} icon - Icon to display
 * @attr {string} description - Description text
 * @attr {string} tooltip - Tooltip text
 * @attr {string} href - Link URL (makes button a link)
 * @attr {string} target - Link target (_blank, _self, etc)
 *
 * @fires click - Fired when button is clicked
 *
 * @slot - Custom content (icon, text)
 * @slot icon - Custom icon content
 * @slot description - Custom description
 *
 * @example
 * ```html
 * <mx-float-button
 *   type="primary"
 *   icon="+"
 *   tooltip="Add new"
 * ></mx-float-button>
 * ```
 */
let MXFloatButton = class MXFloatButton extends LitElement {
    constructor() {
        super(...arguments);
        this.type = 'default';
        this.shape = 'circle';
        this.icon = '';
        this.description = '';
        this.tooltip = '';
        this.href = '';
        this.target = '';
    }
    handleClick(e) {
        this.dispatchEvent(new CustomEvent('click', {
            detail: { originalEvent: e },
            bubbles: true,
            composed: true
        }));
    }
    render() {
        const classes = {
            'mx-float-button': true,
            [`mx-float-button-${this.type}`]: this.type !== 'default',
            [`mx-float-button-${this.shape}`]: this.shape !== 'circle',
            'mx-float-button-with-description': !!this.description
        };
        const content = html `
      <div class="mx-float-button-icon">
        <slot name="icon">${this.icon}</slot>
      </div>
      ${this.description ? html `
        <div class="mx-float-button-description">
          <slot name="description">${this.description}</slot>
        </div>
      ` : null}
      ${this.tooltip ? html `
        <div class="mx-float-button-tooltip">${this.tooltip}</div>
      ` : null}
    `;
        if (this.href) {
            return html `
        <a
          class=${classMap(classes)}
          href=${this.href}
          target=${this.target || '_self'}
          @click=${this.handleClick}
        >
          ${content}
        </a>
      `;
        }
        return html `
      <button
        class=${classMap(classes)}
        @click=${this.handleClick}
      >
        ${content}
      </button>
    `;
    }
};
MXFloatButton.styles = css `
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      position: fixed;
      right: 24px;
      bottom: 24px;
      z-index: 99;
    }

    .mx-float-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 8px;
      background-color: var(--mx-color-bg-elevated, #ffffff);
      border: none;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      transition: all 0.3s;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 20px;
      text-decoration: none;
    }

    .mx-float-button:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
      transform: translateY(-2px);
    }

    .mx-float-button:active {
      transform: translateY(0);
    }

    .mx-float-button-primary {
      background-color: var(--mx-color-primary, #1677ff);
      color: #ffffff;
    }

    .mx-float-button-primary:hover {
      background-color: var(--mx-color-primary-hover, #4096ff);
    }

    .mx-float-button-square {
      border-radius: var(--mx-border-radius, 6px);
    }

    .mx-float-button-icon {
      font-size: 20px;
      line-height: 1;
    }

    .mx-float-button-description {
      margin-top: 4px;
      font-size: 12px;
      line-height: 1;
      white-space: nowrap;
    }

    .mx-float-button-with-description {
      width: auto;
      min-width: 48px;
      height: auto;
      min-height: 48px;
      padding: 12px 16px;
      border-radius: var(--mx-border-radius-lg, 8px);
    }

    .mx-float-button-tooltip {
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 8px;
      padding: 6px 8px;
      background: rgba(0, 0, 0, 0.85);
      color: #ffffff;
      font-size: 14px;
      border-radius: var(--mx-border-radius-sm, 4px);
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .mx-float-button:hover .mx-float-button-tooltip {
      opacity: 1;
    }
  `;
__decorate([
    property({ type: String })
], MXFloatButton.prototype, "type", void 0);
__decorate([
    property({ type: String })
], MXFloatButton.prototype, "shape", void 0);
__decorate([
    property({ type: String })
], MXFloatButton.prototype, "icon", void 0);
__decorate([
    property({ type: String })
], MXFloatButton.prototype, "description", void 0);
__decorate([
    property({ type: String })
], MXFloatButton.prototype, "tooltip", void 0);
__decorate([
    property({ type: String })
], MXFloatButton.prototype, "href", void 0);
__decorate([
    property({ type: String })
], MXFloatButton.prototype, "target", void 0);
MXFloatButton = __decorate([
    customElement('mx-float-button')
], MXFloatButton);
export { MXFloatButton };
//# sourceMappingURL=mx-float-button.js.map