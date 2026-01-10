import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type AvatarShape = 'circle' | 'square';
export type AvatarSize = 'large' | 'default' | 'small' | number;

/**
 * Avatar component for displaying user profile pictures or icons.
 * 
 * @element mx-avatar
 * 
 * @attr {AvatarShape} shape - Shape of avatar: circle, square
 * @attr {AvatarSize} size - Size: large (40px), default (32px), small (24px), or number
 * @attr {string} src - Image source URL
 * @attr {string} srcset - Responsive image sources
 * @attr {string} alt - Alt text for image
 * @attr {string} icon - Icon to display
 * @attr {string} gap - Gap between text and border (for text avatars)
 * 
 * @slot - Default content (text or custom content)
 * @slot icon - Custom icon content
 * 
 * @fires error - Dispatched when image fails to load
 * 
 * @example
 * ```html
 * <!-- Image avatar -->
 * <mx-avatar src="user.jpg" alt="User"></mx-avatar>
 * 
 * <!-- Text avatar -->
 * <mx-avatar>JD</mx-avatar>
 * 
 * <!-- Icon avatar -->
 * <mx-avatar icon="user"></mx-avatar>
 * 
 * <!-- Different sizes -->
 * <mx-avatar size="large" src="user.jpg"></mx-avatar>
 * <mx-avatar size="64" src="user.jpg"></mx-avatar>
 * 
 * <!-- Square shape -->
 * <mx-avatar shape="square" src="user.jpg"></mx-avatar>
 * ```
 */
@customElement('mx-avatar')
export class MXAvatar extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-avatar {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 14px;
      line-height: 1.5714285714285714;
      list-style: none;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      color: #fff;
      white-space: nowrap;
      text-align: center;
      vertical-align: middle;
      background: var(--mx-color-fill-quaternary, rgba(0, 0, 0, 0.06));
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    .mx-avatar-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Shape variants */
    .mx-avatar-square {
      border-radius: var(--mx-border-radius, 6px);
    }

    /* Size variants */
    .mx-avatar-lg {
      width: 40px;
      height: 40px;
      font-size: 18px;
      line-height: 40px;
    }

    .mx-avatar-sm {
      width: 24px;
      height: 24px;
      font-size: 14px;
      line-height: 24px;
    }

    .mx-avatar-square.mx-avatar-lg {
      border-radius: var(--mx-border-radius-lg, 8px);
    }

    .mx-avatar-square.mx-avatar-sm {
      border-radius: var(--mx-border-radius-sm, 4px);
    }

    /* Text content */
    .mx-avatar-string {
      position: absolute;
      left: 50%;
      transform-origin: 0 center;
      transform: translateX(-50%);
    }

    /* Icon */
    .mx-avatar-icon {
      font-size: 18px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .mx-avatar-lg .mx-avatar-icon {
      font-size: 24px;
    }

    .mx-avatar-sm .mx-avatar-icon {
      font-size: 14px;
    }
  `;

  @property({ type: String })
  shape: AvatarShape = 'circle';

  @property({ type: String })
  size: AvatarSize = 'default';

  @property({ type: String })
  src = '';

  @property({ type: String })
  srcset = '';

  @property({ type: String })
  alt = '';

  @property({ type: String })
  icon = '';

  @property({ type: Number })
  gap = 4;

  @state()
  private scale = 1;

  @state()
  private imageError = false;

  private handleImageError() {
    this.imageError = true;
    this.dispatchEvent(new CustomEvent('error', {
      bubbles: true,
      composed: true
    }));
  }

  private updateTextScale() {
    const avatarNode = this.shadowRoot?.querySelector('.mx-avatar');
    const textNode = this.shadowRoot?.querySelector('.mx-avatar-string');
    
    if (!avatarNode || !textNode) return;

    const avatarWidth = avatarNode.getBoundingClientRect().width;
    const textWidth = textNode.getBoundingClientRect().width;

    if (avatarWidth && textWidth) {
      const scale = avatarWidth - this.gap * 2 < textWidth
        ? (avatarWidth - this.gap * 2) / textWidth
        : 1;
      this.scale = scale;
    }
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);
    
    // Update text scale when content or size changes
    if (changedProperties.has('size') || changedProperties.has('gap')) {
      requestAnimationFrame(() => this.updateTextScale());
    }
  }

  firstUpdated() {
    this.updateTextScale();
  }

  private getSizeValue(): number | string {
    if (typeof this.size === 'number') return `${this.size}px`;
    
    switch (this.size) {
      case 'large': return '40px';
      case 'small': return '24px';
      default: return '32px';
    }
  }

  private getSizeClass(): string {
    if (typeof this.size === 'number') return '';
    
    switch (this.size) {
      case 'large': return 'mx-avatar-lg';
      case 'small': return 'mx-avatar-sm';
      default: return '';
    }
  }

  render() {
    const hasImage = this.src && !this.imageError;
    const hasIcon = this.icon || this.querySelector('[slot="icon"]');
    const hasText = !hasImage && !hasIcon;

    const classes = {
      'mx-avatar': true,
      [`mx-avatar-${this.shape}`]: true,
      [this.getSizeClass()]: !!this.getSizeClass()
    };

    const sizeValue = this.getSizeValue();
    const customSizeStyles = typeof this.size === 'number' ? {
      width: sizeValue,
      height: sizeValue,
      lineHeight: sizeValue,
      fontSize: `${Math.round(this.size / 2)}px`
    } : {};

    const textStyles = {
      transform: `translateX(-50%) scale(${this.scale})`
    };

    return html`
      <span class=${classMap(classes)} style=${styleMap(customSizeStyles)}>
        ${hasImage ? html`
          <img
            class="mx-avatar-image"
            src="${this.src}"
            srcset="${this.srcset}"
            alt="${this.alt}"
            @error=${this.handleImageError}
          />
        ` : hasIcon ? html`
          <span class="mx-avatar-icon">
            <slot name="icon">${this.icon}</slot>
          </span>
        ` : hasText ? html`
          <span class="mx-avatar-string" style=${styleMap(textStyles)}>
            <slot></slot>
          </span>
        ` : null}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-avatar': MXAvatar;
  }
}
