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
 * Menu Item component
 *
 * @element mx-menu-item
 *
 * @slot - Item content
 * @slot icon - Icon content
 *
 * @fires item-select - Dispatched when item is clicked
 */
let MXMenuItem = class MXMenuItem extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Whether item is disabled
         */
        this.disabled = false;
        /**
         * Whether item is selected (controlled by parent)
         */
        this.selected = false;
        /**
         * Menu mode (set by parent)
         */
        this.mode = 'vertical';
        /**
         * Theme (set by parent)
         */
        this.theme = 'light';
        /**
         * Indent level (set by parent)
         */
        this.level = 1;
        /**
         * Whether menu is collapsed (set by parent)
         */
        this.inlineCollapsed = false;
    }
    handleClick() {
        if (this.disabled)
            return;
        this.dispatchEvent(new CustomEvent('item-select', {
            detail: { key: this.key },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        const classes = {
            'mx-menu-item': true,
            'mx-menu-item-selected': this.selected,
            'mx-menu-item-disabled': this.disabled,
            [`mx-menu-${this.mode}`]: true,
            [`mx-menu-${this.theme}`]: true,
        };
        const paddingLeft = this.mode === 'inline' && !this.inlineCollapsed
            ? `${this.level * 24}px`
            : undefined;
        return html `
      <li
        class=${classMap(classes)}
        role="menuitem"
        style=${paddingLeft ? `padding-left: ${paddingLeft}` : ''}
        @click=${this.handleClick}
      >
        <span class="mx-menu-item-icon">
          <slot name="icon"></slot>
        </span>
        ${!this.inlineCollapsed ? html `<slot></slot>` : ''}
      </li>
    `;
    }
};
MXMenuItem.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-menu-item {
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

    .mx-menu-item:hover {
      background-color: var(--mx-color-fill-alter, rgba(0, 0, 0, 0.06));
    }

    .mx-menu-item-selected {
      background-color: var(--mx-color-primary-bg, #e6f4ff);
      color: var(--mx-color-primary, #1677ff);
    }

    .mx-menu-dark .mx-menu-item {
      color: rgba(255, 255, 255, 0.65);
    }

    .mx-menu-dark .mx-menu-item:hover {
      background-color: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }

    .mx-menu-dark .mx-menu-item-selected {
      background-color: var(--mx-color-primary, #1677ff);
      color: #ffffff;
    }

    .mx-menu-item-disabled {
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
      cursor: not-allowed;
    }

    .mx-menu-item-disabled:hover {
      background-color: transparent;
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
    }

    .mx-menu-horizontal .mx-menu-item {
      display: inline-flex;
      justify-content: center;
      border-radius: 0;
      margin: 0;
      padding: 0 20px;
    }

    .mx-menu-horizontal .mx-menu-item::after {
      position: absolute;
      bottom: 0;
      left: 20px;
      right: 20px;
      border-bottom: 2px solid transparent;
      transition: border-color 0.3s;
      content: '';
    }

    .mx-menu-horizontal .mx-menu-item-selected::after {
      border-bottom-color: var(--mx-color-primary, #1677ff);
    }

    .mx-menu-item-icon {
      margin-right: 8px;
      font-size: 14px;
    }

    .mx-menu-inline-collapsed .mx-menu-item-icon {
      margin-right: 0;
    }
  `;
__decorate([
    property({ type: String })
], MXMenuItem.prototype, "key", void 0);
__decorate([
    property({ type: Boolean })
], MXMenuItem.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MXMenuItem.prototype, "selected", void 0);
__decorate([
    property({ type: String })
], MXMenuItem.prototype, "mode", void 0);
__decorate([
    property({ type: String })
], MXMenuItem.prototype, "theme", void 0);
__decorate([
    property({ type: Number })
], MXMenuItem.prototype, "level", void 0);
__decorate([
    property({ type: Boolean, attribute: 'inline-collapsed' })
], MXMenuItem.prototype, "inlineCollapsed", void 0);
MXMenuItem = __decorate([
    customElement('mx-menu-item')
], MXMenuItem);
export { MXMenuItem };
//# sourceMappingURL=mx-menu-item.js.map