import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type MenuMode = 'vertical' | 'horizontal' | 'inline';
export type MenuTheme = 'light' | 'dark';

/**
 * Menu component - Navigation menu
 * 
 * @element mx-menu
 * 
 * @slot - Menu items and sub-menus
 * 
 * @fires select - Dispatched when menu item is selected
 * @fires open-change - Dispatched when sub-menu open state changes
 */
@customElement('mx-menu')
export class MXMenu extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-menu {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-size: var(--mx-font-size, 14px);
      line-height: 0;
      list-style: none;
      font-family: inherit;
      outline: none;
      transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
    }

    /* Light theme (default) */
    .mx-menu-light {
      background: #ffffff;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
    }

    /* Dark theme */
    .mx-menu-dark {
      background: #001529;
      color: rgba(255, 255, 255, 0.65);
    }

    /* Vertical mode */
    .mx-menu-vertical,
    .mx-menu-inline {
      border-right: 1px solid var(--mx-color-border, #f0f0f0);
    }

    .mx-menu-dark.mx-menu-vertical,
    .mx-menu-dark.mx-menu-inline {
      border-right: 1px solid #001529;
    }

    /* Horizontal mode */
    .mx-menu-horizontal {
      display: flex;
      border-bottom: 1px solid var(--mx-color-border, #f0f0f0);
      line-height: 46px;
    }

    .mx-menu-dark.mx-menu-horizontal {
      border-bottom: none;
    }

    /* Inline mode */
    .mx-menu-inline {
      width: 100%;
    }

    .mx-menu-inline-collapsed {
      width: 80px;
    }
  `;

  /**
   * Menu mode
   */
  @property({ type: String })
  mode: MenuMode = 'vertical';

  /**
   * Theme
   */
  @property({ type: String })
  theme: MenuTheme = 'light';

  /**
   * Selected keys
   */
  @property({ type: Array, attribute: 'selected-keys' })
  selectedKeys: string[] = [];

  /**
   * Default selected keys
   */
  @property({ type: Array, attribute: 'default-selected-keys' })
  defaultSelectedKeys: string[] = [];

  /**
   * Open keys (for sub-menus)
   */
  @property({ type: Array, attribute: 'open-keys' })
  openKeys: string[] = [];

  /**
   * Default open keys
   */
  @property({ type: Array, attribute: 'default-open-keys' })
  defaultOpenKeys: string[] = [];

  /**
   * Whether menu is collapsed (inline mode)
   */
  @property({ type: Boolean, attribute: 'inline-collapsed' })
  inlineCollapsed = false;

  /**
   * Indent for inline sub-menus
   */
  @property({ type: Number, attribute: 'inline-indent' })
  inlineIndent = 24;

  /**
   * Whether to allow multiple open sub-menus
   */
  @property({ type: Boolean })
  multiple = false;

  /**
   * Whether sub-menus open on hover
   */
  @property({ type: Boolean, attribute: 'trigger-sub-menu-action' })
  triggerSubMenuAction = false;

  @state()
  private internalSelectedKeys: string[] = [];

  @state()
  private internalOpenKeys: string[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    
    if (this.selectedKeys.length === 0 && this.defaultSelectedKeys.length > 0) {
      this.internalSelectedKeys = [...this.defaultSelectedKeys];
    }
    
    if (this.openKeys.length === 0 && this.defaultOpenKeys.length > 0) {
      this.internalOpenKeys = [...this.defaultOpenKeys];
    }

    this.updateChildren();
  }

  updated(changedProperties: Map<string, any>): void {
    if (changedProperties.has('mode') || 
        changedProperties.has('theme') ||
        changedProperties.has('inlineCollapsed') ||
        changedProperties.has('inlineIndent')) {
      this.updateChildren();
    }

    if (changedProperties.has('selectedKeys')) {
      this.internalSelectedKeys = [...this.selectedKeys];
      this.updateChildren();
    }

    if (changedProperties.has('openKeys')) {
      this.internalOpenKeys = [...this.openKeys];
      this.updateChildren();
    }
  }

  private get currentSelectedKeys(): string[] {
    return this.selectedKeys.length > 0 ? this.selectedKeys : this.internalSelectedKeys;
  }

  private get currentOpenKeys(): string[] {
    return this.openKeys.length > 0 ? this.openKeys : this.internalOpenKeys;
  }

  private updateChildren(): void {
    requestAnimationFrame(() => {
      const items = this.querySelectorAll('mx-menu-item, mx-sub-menu');
      items.forEach((item: any) => {
        item.mode = this.mode;
        item.theme = this.theme;
        item.inlineCollapsed = this.inlineCollapsed;
        item.level = 1;
        
        if (item.tagName === 'MX-MENU-ITEM') {
          item.selected = this.currentSelectedKeys.includes(item.key);
        } else if (item.tagName === 'MX-SUB-MENU') {
          item.isOpen = this.currentOpenKeys.includes(item.key);
        }
      });
    });
  }

  handleItemSelect(e: CustomEvent): void {
    const { key } = e.detail;
    
    if (this.multiple) {
      const index = this.internalSelectedKeys.indexOf(key);
      if (index > -1) {
        this.internalSelectedKeys.splice(index, 1);
      } else {
        this.internalSelectedKeys.push(key);
      }
    } else {
      this.internalSelectedKeys = [key];
    }

    this.updateChildren();

    this.dispatchEvent(new CustomEvent('select', {
      detail: { key, selectedKeys: this.internalSelectedKeys },
      bubbles: true,
      composed: true,
    }));
  }

  handleSubMenuToggle(e: CustomEvent): void {
    const { key, isOpen } = e.detail;
    
    if (isOpen) {
      if (this.mode === 'inline' && !this.multiple) {
        this.internalOpenKeys = [key];
      } else {
        if (!this.internalOpenKeys.includes(key)) {
          this.internalOpenKeys.push(key);
        }
      }
    } else {
      const index = this.internalOpenKeys.indexOf(key);
      if (index > -1) {
        this.internalOpenKeys.splice(index, 1);
      }
    }

    this.updateChildren();

    this.dispatchEvent(new CustomEvent('open-change', {
      detail: { key, openKeys: this.internalOpenKeys },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const classes = {
      'mx-menu': true,
      [`mx-menu-${this.mode}`]: true,
      [`mx-menu-${this.theme}`]: true,
      'mx-menu-inline-collapsed': this.mode === 'inline' && this.inlineCollapsed,
    };

    return html`
      <ul
        class=${classMap(classes)}
        role="menu"
        @item-select=${this.handleItemSelect}
        @submenu-toggle=${this.handleSubMenuToggle}
      >
        <slot></slot>
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-menu': MXMenu;
  }
}
