var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * Descriptions item component (child of mx-descriptions).
 *
 * @element mx-descriptions-item
 *
 * @attr {string} label - Item label
 * @attr {number} span - Column span (default 1)
 *
 * @slot - Item content
 * @slot label - Custom label content
 *
 * @example
 * ```html
 * <mx-descriptions-item label="Name">John Doe</mx-descriptions-item>
 * ```
 */
let MXDescriptionsItem = class MXDescriptionsItem extends LitElement {
    constructor() {
        super(...arguments);
        this.label = '';
        this.span = 1;
    }
    render() {
        const hasCustomLabel = this.querySelector('[slot="label"]');
        return html `
      <th class="mx-descriptions-item-label">
        ${hasCustomLabel ? html `<slot name="label"></slot>` : this.label}
      </th>
      <td class="mx-descriptions-item-content" colspan="${this.span}">
        <slot></slot>
      </td>
    `;
    }
};
MXDescriptionsItem.styles = css `
    :host {
      display: contents;
    }

    .mx-descriptions-item-label,
    .mx-descriptions-item-content {
      display: table-cell;
    }
  `;
__decorate([
    property({ type: String })
], MXDescriptionsItem.prototype, "label", void 0);
__decorate([
    property({ type: Number })
], MXDescriptionsItem.prototype, "span", void 0);
MXDescriptionsItem = __decorate([
    customElement('mx-descriptions-item')
], MXDescriptionsItem);
export { MXDescriptionsItem };
//# sourceMappingURL=mx-descriptions-item.js.map