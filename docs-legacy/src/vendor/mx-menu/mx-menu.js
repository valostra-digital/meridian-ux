var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
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
let MXMenu = class MXMenu extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Menu mode
         */
        this.mode = 'vertical';
        /**
         * Theme
         */
        this.theme = 'light';
        /**
         * Selected keys
         */
        this.selectedKeys = [];
        /**
         * Default selected keys
         */
        this.defaultSelectedKeys = [];
        /**
         * Open keys (for sub-menus)
         */
        this.openKeys = [];
        /**
         * Default open keys
         */
        this.defaultOpenKeys = [];
        /**
         * Whether menu is collapsed (inline mode)
         */
        this.inlineCollapsed = false;
        /**
         * Indent for inline sub-menus
         */
        this.inlineIndent = 24;
        /**
         * Whether to allow multiple open sub-menus
         */
        this.multiple = false;
        /**
         * Whether sub-menus open on hover
         */
        this.triggerSubMenuAction = false;
        this.internalSelectedKeys = [];
        this.internalOpenKeys = [];
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.selectedKeys.length === 0 && this.defaultSelectedKeys.length > 0) {
            this.internalSelectedKeys = [...this.defaultSelectedKeys];
        }
        if (this.openKeys.length === 0 && this.defaultOpenKeys.length > 0) {
            this.internalOpenKeys = [...this.defaultOpenKeys];
        }
        this.updateChildren();
    }
    updated(changedProperties) {
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
    get currentSelectedKeys() {
        return this.selectedKeys.length > 0 ? this.selectedKeys : this.internalSelectedKeys;
    }
    get currentOpenKeys() {
        return this.openKeys.length > 0 ? this.openKeys : this.internalOpenKeys;
    }
    updateChildren() {
        requestAnimationFrame(() => {
            const items = this.querySelectorAll('mx-menu-item, mx-sub-menu');
            items.forEach((item) => {
                item.mode = this.mode;
                item.theme = this.theme;
                item.inlineCollapsed = this.inlineCollapsed;
                item.level = 1;
                if (item.tagName === 'MX-MENU-ITEM') {
                    item.selected = this.currentSelectedKeys.includes(item.key);
                }
                else if (item.tagName === 'MX-SUB-MENU') {
                    item.isOpen = this.currentOpenKeys.includes(item.key);
                }
            });
        });
    }
    handleItemSelect(e) {
        const { key } = e.detail;
        if (this.multiple) {
            const index = this.internalSelectedKeys.indexOf(key);
            if (index > -1) {
                this.internalSelectedKeys.splice(index, 1);
            }
            else {
                this.internalSelectedKeys.push(key);
            }
        }
        else {
            this.internalSelectedKeys = [key];
        }
        this.updateChildren();
        this.dispatchEvent(new CustomEvent('select', {
            detail: { key, selectedKeys: this.internalSelectedKeys },
            bubbles: true,
            composed: true,
        }));
    }
    handleSubMenuToggle(e) {
        const { key, isOpen } = e.detail;
        if (isOpen) {
            if (this.mode === 'inline' && !this.multiple) {
                this.internalOpenKeys = [key];
            }
            else {
                if (!this.internalOpenKeys.includes(key)) {
                    this.internalOpenKeys.push(key);
                }
            }
        }
        else {
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
        return html `
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
};
MXMenu.styles = css `
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
__decorate([
    property({ type: String })
], MXMenu.prototype, "mode", void 0);
__decorate([
    property({ type: String })
], MXMenu.prototype, "theme", void 0);
__decorate([
    property({ type: Array, attribute: 'selected-keys' })
], MXMenu.prototype, "selectedKeys", void 0);
__decorate([
    property({ type: Array, attribute: 'default-selected-keys' })
], MXMenu.prototype, "defaultSelectedKeys", void 0);
__decorate([
    property({ type: Array, attribute: 'open-keys' })
], MXMenu.prototype, "openKeys", void 0);
__decorate([
    property({ type: Array, attribute: 'default-open-keys' })
], MXMenu.prototype, "defaultOpenKeys", void 0);
__decorate([
    property({ type: Boolean, attribute: 'inline-collapsed' })
], MXMenu.prototype, "inlineCollapsed", void 0);
__decorate([
    property({ type: Number, attribute: 'inline-indent' })
], MXMenu.prototype, "inlineIndent", void 0);
__decorate([
    property({ type: Boolean })
], MXMenu.prototype, "multiple", void 0);
__decorate([
    property({ type: Boolean, attribute: 'trigger-sub-menu-action' })
], MXMenu.prototype, "triggerSubMenuAction", void 0);
__decorate([
    state()
], MXMenu.prototype, "internalSelectedKeys", void 0);
__decorate([
    state()
], MXMenu.prototype, "internalOpenKeys", void 0);
MXMenu = __decorate([
    customElement('mx-menu')
], MXMenu);
export { MXMenu };
//# sourceMappingURL=mx-menu.js.map