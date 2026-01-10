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
 * Breadcrumb Item component
 *
 * @element mx-breadcrumb-item
 *
 * @slot - Link text content
 * @slot separator - Custom separator icon/content
 *
 * @fires click - Dispatched when the item is clicked
 */
let MXBreadcrumbItem = class MXBreadcrumbItem extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Separator character or element
         */
        this.separator = '/';
        /**
         * Whether the item is disabled
         */
        this.disabled = false;
        /**
         * Whether this is the active/current item
         */
        this.active = false;
        this.hasCustomSeparator = false;
    }
    handleClick(e) {
        if (this.disabled || this.active) {
            e.preventDefault();
            return;
        }
        this.dispatchEvent(new CustomEvent('click', {
            detail: { href: this.href },
            bubbles: true,
            composed: true,
        }));
    }
    handleSeparatorSlotChange(e) {
        const slot = e.target;
        this.hasCustomSeparator = slot.assignedNodes().length > 0;
    }
    render() {
        const linkClasses = {
            'mx-breadcrumb-link': true,
            'mx-breadcrumb-link-disabled': this.disabled,
            'mx-breadcrumb-link-active': this.active,
        };
        const content = html `<slot></slot>`;
        const link = this.href && !this.disabled && !this.active
            ? html `
          <a
            class=${classMap(linkClasses)}
            href=${this.href}
            target=${this.target || '_self'}
            @click=${this.handleClick}
          >
            ${content}
          </a>
        `
            : html `
          <span class=${classMap(linkClasses)}>
            ${content}
          </span>
        `;
        return html `
      <li class="mx-breadcrumb-item">
        ${link}
        <span class="mx-breadcrumb-separator" aria-hidden="true">
          ${this.hasCustomSeparator
            ? html `<slot name="separator" @slotchange=${this.handleSeparatorSlotChange}></slot>`
            : this.separator}
        </span>
      </li>
    `;
    }
};
MXBreadcrumbItem.styles = css `
    :host {
      display: contents;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-breadcrumb-item {
      display: inline-flex;
      align-items: center;
    }

    .mx-breadcrumb-link {
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      text-decoration: none;
      transition: color 0.2s;
      cursor: pointer;
    }

    .mx-breadcrumb-link:hover {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
    }

    .mx-breadcrumb-link.mx-breadcrumb-link-disabled {
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
      cursor: not-allowed;
      pointer-events: none;
    }

    .mx-breadcrumb-link.mx-breadcrumb-link-active {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      cursor: default;
    }

    a.mx-breadcrumb-link:hover {
      color: var(--mx-color-primary, #1677ff);
    }

    .mx-breadcrumb-separator {
      margin: 0 8px;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
    }

    :host(:last-child) .mx-breadcrumb-separator {
      display: none;
    }
  `;
__decorate([
    property({ type: String })
], MXBreadcrumbItem.prototype, "href", void 0);
__decorate([
    property({ type: String })
], MXBreadcrumbItem.prototype, "target", void 0);
__decorate([
    property({ type: String })
], MXBreadcrumbItem.prototype, "separator", void 0);
__decorate([
    property({ type: Boolean })
], MXBreadcrumbItem.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], MXBreadcrumbItem.prototype, "active", void 0);
__decorate([
    state()
], MXBreadcrumbItem.prototype, "hasCustomSeparator", void 0);
MXBreadcrumbItem = __decorate([
    customElement('mx-breadcrumb-item')
], MXBreadcrumbItem);
export { MXBreadcrumbItem };
//# sourceMappingURL=mx-breadcrumb-item.js.map