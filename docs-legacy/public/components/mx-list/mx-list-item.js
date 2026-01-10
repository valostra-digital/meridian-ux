var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
/**
 * List item component for individual list entries.
 *
 * @element mx-list-item
 *
 * @slot - Main content
 * @slot extra - Extra content (displayed on the right)
 * @slot actions - Action buttons/links
 *
 * @example
 * ```html
 * <mx-list-item>
 *   <div>Item Title</div>
 *   <div slot="extra">Extra Info</div>
 * </mx-list-item>
 * ```
 */
let MXListItem = class MXListItem extends LitElement {
    render() {
        const hasExtra = this.querySelector('[slot="extra"]');
        const hasActions = this.querySelector('[slot="actions"]');
        return html `
      <div class="mx-list-item">
        <div class="mx-list-item-main">
          <slot></slot>
        </div>

        ${hasExtra ? html `
          <div class="mx-list-item-extra">
            <slot name="extra"></slot>
          </div>
        ` : null}

        ${hasActions ? html `
          <div class="mx-list-item-actions">
            <slot name="actions"></slot>
          </div>
        ` : null}
      </div>
    `;
    }
};
MXListItem.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 24px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
    }

    .mx-list-item-main {
      flex: 1;
      min-width: 0;
    }

    .mx-list-item-extra {
      margin-left: 40px;
    }

    .mx-list-item-actions {
      display: flex;
      gap: 8px;
      margin-left: 16px;
      flex-shrink: 0;
    }

    ::slotted([slot="actions"]) {
      color: var(--mx-color-primary, #1677ff);
      cursor: pointer;
    }

    ::slotted([slot="actions"]:hover) {
      opacity: 0.8;
    }
  `;
MXListItem = __decorate([
    customElement('mx-list-item')
], MXListItem);
export { MXListItem };
//# sourceMappingURL=mx-list-item.js.map