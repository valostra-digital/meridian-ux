var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * Result component for displaying operation results.
 *
 * @element mx-result
 *
 * @attr {ResultStatus} status - Result status type
 * @attr {string} title - Result title
 * @attr {string} sub-title - Result subtitle/description
 *
 * @slot - Custom content area
 * @slot icon - Custom icon
 * @slot title - Custom title
 * @slot subTitle - Custom subtitle
 * @slot extra - Extra actions (usually buttons)
 *
 * @example
 * ```html
 * <mx-result
 *   status="success"
 *   title="Success"
 *   sub-title="Operation completed successfully"
 * ></mx-result>
 * ```
 */
let MXResult = class MXResult extends LitElement {
    constructor() {
        super(...arguments);
        this.status = 'info';
        this.title = '';
        this.subTitle = '';
    }
    renderSuccessIcon() {
        return svg `
      <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="36" cy="36" r="34" stroke="currentColor" stroke-width="3" fill="none"/>
        <path d="M23 36L31 44L49 26" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    }
    renderErrorIcon() {
        return svg `
      <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="36" cy="36" r="34" stroke="currentColor" stroke-width="3" fill="none"/>
        <path d="M26 26L46 46M46 26L26 46" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `;
    }
    renderInfoIcon() {
        return svg `
      <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="36" cy="36" r="34" stroke="currentColor" stroke-width="3" fill="none"/>
        <circle cx="36" cy="24" r="2.5" fill="currentColor"/>
        <path d="M36 32V50" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `;
    }
    renderWarningIcon() {
        return svg `
      <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36 8L64 60H8L36 8Z" stroke="currentColor" stroke-width="3" stroke-linejoin="round" fill="none"/>
        <path d="M36 28V40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        <circle cx="36" cy="48" r="2" fill="currentColor"/>
      </svg>
    `;
    }
    render404Icon() {
        return svg `
      <svg viewBox="0 0 252 108" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="80" font-size="88" font-weight="bold" fill="currentColor">404</text>
      </svg>
    `;
    }
    render403Icon() {
        return svg `
      <svg viewBox="0 0 252 108" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="80" font-size="88" font-weight="bold" fill="currentColor">403</text>
      </svg>
    `;
    }
    render500Icon() {
        return svg `
      <svg viewBox="0 0 252 108" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="80" font-size="88" font-weight="bold" fill="currentColor">500</text>
      </svg>
    `;
    }
    renderIcon() {
        const hasCustomIcon = this.querySelector('[slot="icon"]');
        if (hasCustomIcon) {
            return html `<slot name="icon"></slot>`;
        }
        let iconContent;
        let iconClass = '';
        switch (this.status) {
            case 'success':
                iconContent = this.renderSuccessIcon();
                iconClass = 'mx-result-icon-success';
                break;
            case 'error':
                iconContent = this.renderErrorIcon();
                iconClass = 'mx-result-icon-error';
                break;
            case 'info':
                iconContent = this.renderInfoIcon();
                iconClass = 'mx-result-icon-info';
                break;
            case 'warning':
                iconContent = this.renderWarningIcon();
                iconClass = 'mx-result-icon-warning';
                break;
            case '404':
                iconContent = this.render404Icon();
                iconClass = 'mx-result-icon-info';
                break;
            case '403':
                iconContent = this.render403Icon();
                iconClass = 'mx-result-icon-warning';
                break;
            case '500':
                iconContent = this.render500Icon();
                iconClass = 'mx-result-icon-error';
                break;
            default:
                iconContent = this.renderInfoIcon();
                iconClass = 'mx-result-icon-info';
        }
        return html `<div class="${iconClass}">${iconContent}</div>`;
    }
    render() {
        const hasCustomTitle = this.querySelector('[slot="title"]');
        const hasCustomSubTitle = this.querySelector('[slot="subTitle"]');
        const hasContent = this.querySelector(':not([slot])');
        const hasExtra = this.querySelector('[slot="extra"]');
        return html `
      <div class="mx-result">
        <div class="mx-result-icon">
          ${this.renderIcon()}
        </div>

        ${this.title || hasCustomTitle ? html `
          <div class="mx-result-title">
            ${hasCustomTitle ? html `<slot name="title"></slot>` : this.title}
          </div>
        ` : null}

        ${this.subTitle || hasCustomSubTitle ? html `
          <div class="mx-result-subtitle">
            ${hasCustomSubTitle ? html `<slot name="subTitle"></slot>` : this.subTitle}
          </div>
        ` : null}

        ${hasContent ? html `
          <div class="mx-result-content">
            <slot></slot>
          </div>
        ` : null}

        ${hasExtra ? html `
          <div class="mx-result-extra">
            <slot name="extra"></slot>
          </div>
        ` : null}
      </div>
    `;
    }
};
MXResult.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-result {
      padding: 48px 32px;
      text-align: center;
    }

    .mx-result-icon {
      margin-bottom: 24px;
      text-align: center;
    }

    .mx-result-icon svg {
      width: 72px;
      height: 72px;
    }

    .mx-result-title {
      margin: 0 0 8px;
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      font-size: 24px;
      line-height: 1.8;
      text-align: center;
    }

    .mx-result-subtitle {
      margin: 0 0 24px;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      font-size: 14px;
      line-height: 1.6;
      text-align: center;
    }

    .mx-result-content {
      margin: 24px 0;
      padding: 24px 40px;
      background-color: var(--mx-color-fill-alter, rgba(0, 0, 0, 0.02));
      border-radius: var(--mx-border-radius-lg, 8px);
    }

    .mx-result-extra {
      margin-top: 24px;
      text-align: center;
    }

    .mx-result-extra ::slotted(*) {
      margin: 0 4px;
    }

    /* Status colors */
    .mx-result-icon-success {
      color: var(--mx-color-success, #52c41a);
    }

    .mx-result-icon-error {
      color: var(--mx-color-error, #ff4d4f);
    }

    .mx-result-icon-info {
      color: var(--mx-color-info, #1677ff);
    }

    .mx-result-icon-warning {
      color: var(--mx-color-warning, #faad14);
    }
  `;
__decorate([
    property({ type: String })
], MXResult.prototype, "status", void 0);
__decorate([
    property({ type: String })
], MXResult.prototype, "title", void 0);
__decorate([
    property({ type: String, attribute: 'sub-title' })
], MXResult.prototype, "subTitle", void 0);
MXResult = __decorate([
    customElement('mx-result')
], MXResult);
export { MXResult };
//# sourceMappingURL=mx-result.js.map