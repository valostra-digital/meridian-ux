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
 * Skeleton component for loading placeholders.
 *
 * @element mx-skeleton
 *
 * @attr {boolean} active - Whether to show animation
 * @attr {boolean} loading - Whether to show skeleton (when false, shows children)
 * @attr {boolean} paragraph - Whether to show paragraph placeholder
 * @attr {boolean} avatar - Whether to show avatar placeholder
 * @attr {boolean} show-title - Whether to show title placeholder
 * @attr {SkeletonShape} avatar-shape - Shape of avatar: circle, square
 * @attr {SkeletonSize} avatar-size - Size of avatar
 * @attr {number} rows - Number of paragraph rows (default 3)
 *
 * @slot - Content to show when loading is false
 *
 * @example
 * ```html
 * <mx-skeleton active></mx-skeleton>
 * <mx-skeleton avatar paragraph></mx-skeleton>
 * ```
 */
let MXSkeleton = class MXSkeleton extends LitElement {
    constructor() {
        super(...arguments);
        this.active = false;
        this.loading = true;
        this.paragraph = true;
        this.avatar = false;
        this.showTitle = true;
        this.avatarShape = 'default';
        this.avatarSize = 'default';
        this.rows = 3;
    }
    render() {
        // If not loading, show children
        if (!this.loading) {
            return html `<slot></slot>`;
        }
        const classes = {
            'mx-skeleton': true,
            'mx-skeleton-active': this.active
        };
        const avatarClasses = {
            'mx-skeleton-avatar': true,
            'mx-skeleton-avatar-square': this.avatarShape === 'square',
            [`mx-skeleton-avatar-${this.avatarSize}`]: this.avatarSize !== 'default'
        };
        return html `
      <div class=${classMap(classes)}>
        ${this.avatar ? html `
          <div class="mx-skeleton-header">
            <div class=${classMap(avatarClasses)}></div>
          </div>
        ` : null}

        <div class="mx-skeleton-content">
          ${this.showTitle ? html `
            <div class="mx-skeleton-title"></div>
          ` : null}

          ${this.paragraph ? html `
            <ul class="mx-skeleton-paragraph">
              ${Array.from({ length: this.rows }, () => html `<li></li>`)}
            </ul>
          ` : null}
        </div>
      </div>
    `;
    }
};
MXSkeleton.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-skeleton {
      display: flex;
    }

    .mx-skeleton-header {
      padding-right: 16px;
      flex-shrink: 0;
    }

    .mx-skeleton-avatar {
      width: 32px;
      height: 32px;
      background: var(--mx-color-fill-content, rgba(0, 0, 0, 0.06));
      border-radius: 50%;
    }

    .mx-skeleton-avatar-square {
      border-radius: var(--mx-border-radius, 6px);
    }

    .mx-skeleton-avatar-large {
      width: 40px;
      height: 40px;
    }

    .mx-skeleton-avatar-small {
      width: 24px;
      height: 24px;
    }

    .mx-skeleton-content {
      flex: 1;
      width: 100%;
    }

    .mx-skeleton-title {
      height: 16px;
      margin-bottom: 12px;
      background: var(--mx-color-fill-content, rgba(0, 0, 0, 0.06));
      border-radius: var(--mx-border-radius, 6px);
    }

    .mx-skeleton-paragraph {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .mx-skeleton-paragraph li {
      height: 16px;
      margin-bottom: 12px;
      background: var(--mx-color-fill-content, rgba(0, 0, 0, 0.06));
      border-radius: var(--mx-border-radius, 6px);
      list-style: none;
    }

    .mx-skeleton-paragraph li:last-child {
      width: 61%;
      margin-bottom: 0;
    }

    /* Active animation */
    .mx-skeleton-active .mx-skeleton-avatar,
    .mx-skeleton-active .mx-skeleton-title,
    .mx-skeleton-active .mx-skeleton-paragraph li {
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.06) 25%,
        rgba(0, 0, 0, 0.15) 37%,
        rgba(0, 0, 0, 0.06) 63%
      );
      background-size: 400% 100%;
      animation: skeletonLoading 1.4s ease infinite;
    }

    @keyframes skeletonLoading {
      0% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0 50%;
      }
    }
  `;
__decorate([
    property({ type: Boolean })
], MXSkeleton.prototype, "active", void 0);
__decorate([
    property({ type: Boolean })
], MXSkeleton.prototype, "loading", void 0);
__decorate([
    property({ type: Boolean })
], MXSkeleton.prototype, "paragraph", void 0);
__decorate([
    property({ type: Boolean })
], MXSkeleton.prototype, "avatar", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-title' })
], MXSkeleton.prototype, "showTitle", void 0);
__decorate([
    property({ type: String, attribute: 'avatar-shape' })
], MXSkeleton.prototype, "avatarShape", void 0);
__decorate([
    property({ type: String, attribute: 'avatar-size' })
], MXSkeleton.prototype, "avatarSize", void 0);
__decorate([
    property({ type: Number })
], MXSkeleton.prototype, "rows", void 0);
MXSkeleton = __decorate([
    customElement('mx-skeleton')
], MXSkeleton);
export { MXSkeleton };
//# sourceMappingURL=mx-skeleton.js.map