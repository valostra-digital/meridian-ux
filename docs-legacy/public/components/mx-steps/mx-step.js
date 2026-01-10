var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * Step item component (child of mx-steps).
 *
 * @element mx-step
 *
 * @attr {string} title - Step title
 * @attr {string} description - Step description
 * @attr {string} status - Step status: wait, process, finish, error
 * @attr {string} icon - Custom icon
 * @attr {number} index - Step index (set by parent)
 * @attr {string} direction - Direction (set by parent)
 * @attr {string} size - Size (set by parent)
 *
 * @slot - Custom content
 * @slot title - Custom title
 * @slot description - Custom description
 * @slot icon - Custom icon
 *
 * @example
 * ```html
 * <mx-step title="Step Title" description="Step description"></mx-step>
 * ```
 */
let MXStep = class MXStep extends LitElement {
    constructor() {
        super(...arguments);
        this.title = '';
        this.description = '';
        this.status = 'wait';
        this.icon = '';
        this.index = 0;
        this.direction = 'horizontal';
        this.size = 'default';
        this.progressDot = false;
    }
    renderIcon() {
        const hasCustomIcon = this.querySelector('[slot="icon"]');
        if (hasCustomIcon) {
            return html `<slot name="icon"></slot>`;
        }
        if (this.icon) {
            return this.icon;
        }
        if (this.status === 'finish') {
            return html `
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
        }
        if (this.status === 'error') {
            return html `
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      `;
        }
        return this.index + 1;
    }
    render() {
        const hasCustomTitle = this.querySelector('[slot="title"]');
        const hasCustomDescription = this.querySelector('[slot="description"]');
        return html `
      <div class="mx-step">
        <div class="mx-step-tail"></div>
        
        <div class="mx-step-icon">
          ${this.renderIcon()}
        </div>

        <div class="mx-step-content">
          <div class="mx-step-title">
            ${hasCustomTitle ? html `<slot name="title"></slot>` : this.title}
          </div>
          ${this.description || hasCustomDescription ? html `
            <div class="mx-step-description">
              ${hasCustomDescription ? html `<slot name="description"></slot>` : this.description}
            </div>
          ` : null}
        </div>
      </div>
    `;
    }
};
MXStep.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      position: relative;
      flex: 1;
      overflow: hidden;
    }

    .mx-step {
      position: relative;
      display: inline-block;
      flex: 1;
      overflow: hidden;
      vertical-align: top;
    }

    .mx-step-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      margin-right: 8px;
      font-size: 16px;
      line-height: 32px;
      text-align: center;
      border: 1px solid var(--mx-color-border, rgba(0, 0, 0, 0.15));
      border-radius: 50%;
      transition: background-color 0.3s, border-color 0.3s;
    }

    .mx-step-tail {
      position: absolute;
      top: 16px;
      left: 0;
      width: 100%;
      padding: 0 10px;
    }

    .mx-step-tail::after {
      display: inline-block;
      width: 100%;
      height: 1px;
      background: var(--mx-color-border-secondary, #f0f0f0);
      border-radius: 1px;
      transition: background 0.3s;
      content: '';
    }

    .mx-step-content {
      display: inline-block;
      vertical-align: top;
    }

    .mx-step-title {
      position: relative;
      display: inline-block;
      padding-right: 16px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 16px;
      line-height: 32px;
    }

    .mx-step-description {
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      font-size: 14px;
    }

    /* Status variants */
    :host([status="finish"]) .mx-step-icon {
      background-color: var(--mx-color-primary-bg, #e6f4ff);
      border-color: var(--mx-color-primary, #1677ff);
      color: var(--mx-color-primary, #1677ff);
    }

    :host([status="finish"]) .mx-step-tail::after {
      background: var(--mx-color-primary, #1677ff);
    }

    :host([status="process"]) .mx-step-icon {
      background-color: var(--mx-color-primary, #1677ff);
      border-color: var(--mx-color-primary, #1677ff);
      color: #fff;
    }

    :host([status="error"]) .mx-step-icon {
      background-color: var(--mx-color-error-bg, #fff2f0);
      border-color: var(--mx-color-error, #ff4d4f);
      color: var(--mx-color-error, #ff4d4f);
    }

    :host([status="wait"]) .mx-step-icon {
      background-color: var(--mx-color-bg-container, #ffffff);
      border-color: var(--mx-color-border, rgba(0, 0, 0, 0.15));
      color: var(--mx-color-text-tertiary, rgba(0, 0, 0, 0.25));
    }

    /* Vertical direction */
    :host([direction="vertical"]) {
      padding-bottom: 24px;
    }

    :host([direction="vertical"]) .mx-step-tail {
      position: absolute;
      top: 0;
      left: 16px;
      width: 1px;
      height: 100%;
      padding: 38px 0 6px;
    }

    :host([direction="vertical"]) .mx-step-tail::after {
      width: 1px;
      height: 100%;
    }

    /* Small size */
    :host([size="small"]) .mx-step-icon {
      width: 24px;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
    }

    :host([size="small"]) .mx-step-title {
      font-size: 14px;
      line-height: 24px;
    }
  `;
__decorate([
    property({ type: String })
], MXStep.prototype, "title", void 0);
__decorate([
    property({ type: String })
], MXStep.prototype, "description", void 0);
__decorate([
    property({ type: String, reflect: true })
], MXStep.prototype, "status", void 0);
__decorate([
    property({ type: String })
], MXStep.prototype, "icon", void 0);
__decorate([
    property({ type: Number, reflect: true })
], MXStep.prototype, "index", void 0);
__decorate([
    property({ type: String, reflect: true })
], MXStep.prototype, "direction", void 0);
__decorate([
    property({ type: String, reflect: true })
], MXStep.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'progress-dot' })
], MXStep.prototype, "progressDot", void 0);
MXStep = __decorate([
    customElement('mx-step')
], MXStep);
export { MXStep };
//# sourceMappingURL=mx-step.js.map