import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Sub Menu component - Nested menu container
 * 
 * @element mx-sub-menu
 * 
 * @slot - Sub-menu items
 * @slot title - Title content
 * @slot icon - Icon content
 * 
 * @fires submenu-toggle - Dispatched when sub-menu is opened/closed
 */
@customElement('mx-sub-menu')
export class MXSubMenu extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-submenu {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .mx-submenu-title {
      position: relative;
      display: flex;
      align-items: center;
      padding: 5px 16px;
      margin: 4px 0;
      color: inherit;
      line-height: var(--mx-line-height, 1.5714285714285714);
      cursor: pointer;
      transition: all 0.3s;
      border-radius: var(--mx-border-radius-sm, 4px);
    }

    .mx-submenu-title:hover {
      background-color: var(--mx-color-fill-alter, rgba(0, 0, 0, 0.06));
    }

    .mx-menu-dark .mx-submenu-title {
      color: rgba(255, 255, 255, 0.65);
    }

    .mx-menu-dark .mx-submenu-title:hover {
      background-color: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }

    .mx-submenu-arrow {
      position: absolute;
      right: 16px;
      transition: transform 0.3s;
    }

    .mx-submenu-open .mx-submenu-arrow {
      transform: rotate(180deg);
    }

    .mx-submenu-icon {
      margin-right: 8px;
      font-size: 14px;
    }

    .mx-submenu-inline {
      background: transparent;
    }

    .mx-submenu-inline .mx-submenu-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .mx-submenu-open.mx-submenu-inline .mx-submenu-content {
      max-height: 1000px;
    }

    .mx-submenu-disabled .mx-submenu-title {
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
      cursor: not-allowed;
    }

    .mx-submenu-disabled .mx-submenu-title:hover {
      background-color: transparent;
    }

    /* Horizontal/Vertical modes - popup style */
    .mx-submenu-popup {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      min-width: 160px;
      padding: 4px 0;
      background: #ffffff;
      border-radius: var(--mx-border-radius, 6px);
      box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
                  0 6px 16px 0 rgba(0, 0, 0, 0.08),
                  0 9px 28px 8px rgba(0, 0, 0, 0.05);
      display: none;
    }

    .mx-submenu-open .mx-submenu-popup {
      display: block;
    }

    .mx-menu-dark .mx-submenu-popup {
      background: #001529;
    }
  `;

  /**
   * Unique key for the sub-menu
   */
  @property({ type: String })
  key!: string;

  /**
   * Title text
   */
  @property({ type: String })
  label?: string;

  /**
   * Whether sub-menu is disabled
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Whether sub-menu is open (controlled by parent)
   */
  @property({ type: Boolean, attribute: 'is-open' })
  isOpen = false;

  /**
   * Menu mode (set by parent)
   */
  @property({ type: String })
  mode = 'vertical';

  /**
   * Theme (set by parent)
   */
  @property({ type: String })
  theme = 'light';

  /**
   * Indent level (set by parent)
   */
  @property({ type: Number })
  level = 1;

  /**
   * Whether menu is collapsed (set by parent)
   */
  @property({ type: Boolean, attribute: 'inline-collapsed' })
  inlineCollapsed = false;

  @state()
  private popupVisible = false;

  updated(changedProperties: Map<string, any>): void {
    if (changedProperties.has('isOpen') ||
        changedProperties.has('mode') ||
        changedProperties.has('theme') ||
        changedProperties.has('level')) {
      this.updateChildren();
    }
  }

  private updateChildren(): void {
    requestAnimationFrame(() => {
      const items = this.querySelectorAll(':scope > mx-menu-item, :scope > mx-sub-menu');
      items.forEach((item: any) => {
        item.mode = this.mode;
        item.theme = this.theme;
        item.level = this.level + 1;
      });
    });
  }

  private handleTitleClick(): void {
    if (this.disabled) return;

    this.dispatchEvent(new CustomEvent('submenu-toggle', {
      detail: { key: this.key, isOpen: !this.isOpen },
      bubbles: true,
      composed: true,
    }));
  }

  private handleMouseEnter(): void {
    if (this.mode !== 'inline' && !this.disabled) {
      this.popupVisible = true;
    }
  }

  private handleMouseLeave(): void {
    if (this.mode !== 'inline') {
      this.popupVisible = false;
    }
  }

  render() {
    const classes = {
      'mx-submenu': true,
      'mx-submenu-open': this.isOpen || this.popupVisible,
      'mx-submenu-disabled': this.disabled,
      'mx-submenu-inline': this.mode === 'inline',
      [`mx-menu-${this.mode}`]: true,
      [`mx-menu-${this.theme}`]: true,
    };

    const paddingLeft = this.mode === 'inline' && !this.inlineCollapsed
      ? `${this.level * 24}px`
      : undefined;

    const isInlineMode = this.mode === 'inline';
    const showContent = isInlineMode ? this.isOpen : this.popupVisible;

    return html`
      <li
        class=${classMap(classes)}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <div
          class="mx-submenu-title"
          role="menuitem"
          style=${paddingLeft ? `padding-left: ${paddingLeft}` : ''}
          @click=${this.handleTitleClick}
        >
          <span class="mx-submenu-icon">
            <slot name="icon"></slot>
          </span>
          ${!this.inlineCollapsed ? html`
            <slot name="title">${this.label}</slot>
            <span class="mx-submenu-arrow">▼</span>
          ` : ''}
        </div>
        
        ${isInlineMode ? html`
          <ul class="mx-submenu-content">
            <slot></slot>
          </ul>
        ` : html`
          <ul class="mx-submenu-popup">
            <slot></slot>
          </ul>
        `}
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-sub-menu': MXSubMenu;
  }
}
