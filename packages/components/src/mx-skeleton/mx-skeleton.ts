import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type SkeletonShape = 'default' | 'circle' | 'round' | 'square';
export type SkeletonSize = 'default' | 'small' | 'large';

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
@customElement('mx-skeleton')
export class MXSkeleton extends LitElement {
  static styles = css`
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

  @property({ type: Boolean })
  active = false;

  @property({ type: Boolean })
  loading = true;

  @property({ type: Boolean })
  paragraph = true;

  @property({ type: Boolean })
  avatar = false;

  @property({ type: Boolean, attribute: 'show-title' })
  showTitle = true;

  @property({ type: String, attribute: 'avatar-shape' })
  avatarShape: SkeletonShape = 'default';

  @property({ type: String, attribute: 'avatar-size' })
  avatarSize: SkeletonSize = 'default';

  @property({ type: Number })
  rows = 3;

  render() {
    // If not loading, show children
    if (!this.loading) {
      return html`<slot></slot>`;
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

    return html`
      <div class=${classMap(classes)}>
        ${this.avatar ? html`
          <div class="mx-skeleton-header">
            <div class=${classMap(avatarClasses)}></div>
          </div>
        ` : null}

        <div class="mx-skeleton-content">
          ${this.showTitle ? html`
            <div class="mx-skeleton-title"></div>
          ` : null}

          ${this.paragraph ? html`
            <ul class="mx-skeleton-paragraph">
              ${Array.from({ length: this.rows }, () => html`<li></li>`)}
            </ul>
          ` : null}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-skeleton': MXSkeleton;
  }
}
