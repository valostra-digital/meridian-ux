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
 * Card component for displaying content in a container.
 *
 * @element mx-card
 *
 * @attr {string} title - Card title
 * @attr {boolean} bordered - Whether card has border
 * @attr {boolean} hoverable - Whether card is hoverable with lift effect
 * @attr {boolean} loading - Whether card is in loading state
 * @attr {CardSize} size - Size of card: default, small
 *
 * @slot - Default content area
 * @slot title - Custom title content (overrides title property)
 * @slot extra - Extra content in the header (right side)
 * @slot cover - Cover image or media
 * @slot actions - Action buttons at the bottom
 *
 * @example
 * ```html
 * <!-- Simple card -->
 * <mx-card title="Card Title">
 *   Card content
 * </mx-card>
 *
 * <!-- With cover image -->
 * <mx-card>
 *   <img slot="cover" src="..." alt="cover">
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </mx-card>
 *
 * <!-- With actions -->
 * <mx-card title="Card">
 *   <p>Content</p>
 *   <div slot="actions">
 *     <button>Action 1</button>
 *     <button>Action 2</button>
 *   </div>
 * </mx-card>
 *
 * <!-- Hoverable -->
 * <mx-card hoverable>
 *   Content
 * </mx-card>
 * ```
 */
let MXCard = class MXCard extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Card title
         */
        this.title = '';
        /**
         * Whether card has border
         */
        this.bordered = true;
        /**
         * Whether card is hoverable
         */
        this.hoverable = false;
        /**
         * Whether card is in loading state
         */
        this.loading = false;
        /**
         * Size of card
         */
        this.size = 'default';
    }
    renderLoadingSkeleton() {
        return html `
      <div class="mx-card-body">
        <div class="mx-card-loading-block" style="width: 94%;"></div>
        <div class="mx-card-loading-block" style="width: 100%;"></div>
        <div class="mx-card-loading-block" style="width: 61%;"></div>
      </div>
    `;
    }
    render() {
        const hasTitle = this.title || this.querySelector('[slot="title"]');
        const hasExtra = this.querySelector('[slot="extra"]');
        const hasCover = this.querySelector('[slot="cover"]');
        const hasActions = this.querySelector('[slot="actions"]');
        const classes = {
            'mx-card': true,
            'mx-card-bordered': this.bordered,
            'mx-card-hoverable': this.hoverable,
            'mx-card-loading': this.loading
        };
        return html `
      <div class=${classMap(classes)}>
        ${hasCover ? html `
          <div class="mx-card-cover">
            <slot name="cover"></slot>
          </div>
        ` : null}

        ${hasTitle || hasExtra ? html `
          <div class="mx-card-head">
            ${hasTitle ? html `
              <div class="mx-card-head-title">
                <slot name="title">${this.title}</slot>
              </div>
            ` : null}
            ${hasExtra ? html `
              <div class="mx-card-extra">
                <slot name="extra"></slot>
              </div>
            ` : null}
          </div>
        ` : null}

        ${this.loading ? this.renderLoadingSkeleton() : html `
          <div class="mx-card-body">
            <slot></slot>
          </div>
        `}

        ${hasActions && !this.loading ? html `
          <div class="mx-card-actions">
            <slot name="actions"></slot>
          </div>
        ` : null}
      </div>
    `;
    }
};
MXCard.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-card {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 14px;
      line-height: 1.5714285714285714;
      list-style: none;
      position: relative;
      background: var(--mx-color-bg-container, #ffffff);
      border-radius: var(--mx-border-radius-lg, 8px);
      transition: all 0.3s;
    }

    .mx-card-bordered {
      border: 1px solid var(--mx-color-border-secondary, #f0f0f0);
    }

    .mx-card-hoverable {
      cursor: pointer;
    }

    .mx-card-hoverable:hover {
      border-color: var(--mx-color-border, rgba(0, 0, 0, 0.15));
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    }

    /* Header */
    .mx-card-head {
      min-height: 48px;
      margin-bottom: -1px;
      padding: 0 24px;
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      font-weight: 600;
      font-size: 16px;
      background: transparent;
      border-bottom: 1px solid var(--mx-color-border-secondary, #f0f0f0);
      border-radius: var(--mx-border-radius-lg, 8px) var(--mx-border-radius-lg, 8px) 0 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .mx-card-head-title {
      flex: 1;
      padding: 12px 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .mx-card-extra {
      margin-left: auto;
      padding: 12px 0;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-weight: normal;
      font-size: 14px;
    }

    /* Body */
    .mx-card-body {
      padding: 24px;
    }

    .mx-card-loading .mx-card-body {
      user-select: none;
    }

    /* Cover */
    .mx-card-cover {
      margin: -1px -1px 0;
      border-radius: var(--mx-border-radius-lg, 8px) var(--mx-border-radius-lg, 8px) 0 0;
      overflow: hidden;
    }

    .mx-card-cover ::slotted(*) {
      display: block;
      width: 100%;
    }

    .mx-card-cover ::slotted(img) {
      width: 100%;
      height: auto;
    }

    /* Actions */
    .mx-card-actions {
      margin: 0;
      padding: 0;
      list-style: none;
      background: var(--mx-color-bg-container, #ffffff);
      border-top: 1px solid var(--mx-color-border-secondary, #f0f0f0);
      display: flex;
      border-radius: 0 0 var(--mx-border-radius-lg, 8px) var(--mx-border-radius-lg, 8px);
    }

    .mx-card-actions ::slotted(*) {
      flex: 1;
      text-align: center;
      padding: 12px 0;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      cursor: pointer;
      transition: color 0.3s;
    }

    .mx-card-actions ::slotted(*:not(:last-child)) {
      border-right: 1px solid var(--mx-color-border-secondary, #f0f0f0);
    }

    .mx-card-actions ::slotted(*:hover) {
      color: var(--mx-color-primary, #1677ff);
    }

    /* Size variants */
    :host([size="small"]) .mx-card-head {
      min-height: 36px;
      padding: 0 12px;
      font-size: 14px;
    }

    :host([size="small"]) .mx-card-head-title {
      padding: 8px 0;
    }

    :host([size="small"]) .mx-card-extra {
      padding: 8px 0;
      font-size: 14px;
    }

    :host([size="small"]) .mx-card-body {
      padding: 12px;
    }

    :host([size="small"]) .mx-card-actions ::slotted(*) {
      padding: 8px 0;
    }

    /* Loading state */
    .mx-card-loading {
      overflow: hidden;
    }

    .mx-card-loading-block {
      height: 14px;
      margin: 4px 0;
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.06) 25%,
        rgba(0, 0, 0, 0.15) 37%,
        rgba(0, 0, 0, 0.06) 63%
      );
      background-size: 400% 100%;
      border-radius: var(--mx-border-radius, 6px);
      animation: card-loading 1.4s ease infinite;
    }

    @keyframes card-loading {
      0% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0 50%;
      }
    }
  `;
__decorate([
    property({ type: String })
], MXCard.prototype, "title", void 0);
__decorate([
    property({ type: Boolean })
], MXCard.prototype, "bordered", void 0);
__decorate([
    property({ type: Boolean })
], MXCard.prototype, "hoverable", void 0);
__decorate([
    property({ type: Boolean })
], MXCard.prototype, "loading", void 0);
__decorate([
    property({ type: String, reflect: true })
], MXCard.prototype, "size", void 0);
MXCard = __decorate([
    customElement('mx-card')
], MXCard);
export { MXCard };
//# sourceMappingURL=mx-card.js.map