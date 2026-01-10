import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

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
@customElement('mx-list-item')
export class MXListItem extends LitElement {
  static styles = css`
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

  render() {
    const hasExtra = this.querySelector('[slot="extra"]');
    const hasActions = this.querySelector('[slot="actions"]');

    return html`
      <div class="mx-list-item">
        <div class="mx-list-item-main">
          <slot></slot>
        </div>

        ${hasExtra ? html`
          <div class="mx-list-item-extra">
            <slot name="extra"></slot>
          </div>
        ` : null}

        ${hasActions ? html`
          <div class="mx-list-item-actions">
            <slot name="actions"></slot>
          </div>
        ` : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-list-item': MXListItem;
  }
}
