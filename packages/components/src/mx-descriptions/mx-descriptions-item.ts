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
@customElement('mx-descriptions-item')
export class MXDescriptionsItem extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }

    .mx-descriptions-item-label,
    .mx-descriptions-item-content {
      display: table-cell;
    }
  `;

  @property({ type: String })
  label = '';

  @property({ type: Number })
  span = 1;

  render() {
    const hasCustomLabel = this.querySelector('[slot="label"]');

    return html`
      <th class="mx-descriptions-item-label">
        ${hasCustomLabel ? html`<slot name="label"></slot>` : this.label}
      </th>
      <td class="mx-descriptions-item-content" colspan="${this.span}">
        <slot></slot>
      </td>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-descriptions-item': MXDescriptionsItem;
  }
}
