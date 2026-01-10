import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type ListSize = 'default' | 'large' | 'small';

/**
 * List component for displaying a list of items.
 * 
 * @element mx-list
 * 
 * @attr {boolean} bordered - Whether to show border
 * @attr {boolean} split - Whether to show split line between items
 * @attr {ListSize} size - Size of list items: large, default, small
 * @attr {boolean} loading - Whether to show loading state
 * @attr {string} header - List header text
 * @attr {string} footer - List footer text
 * 
 * @slot - List items (mx-list-item)
 * @slot header - Custom header content
 * @slot footer - Custom footer content
 * 
 * @example
 * ```html
 * <mx-list bordered>
 *   <mx-list-item>Item 1</mx-list-item>
 *   <mx-list-item>Item 2</mx-list-item>
 * </mx-list>
 * ```
 */
@customElement('mx-list')
export class MXList extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-list {
      position: relative;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
    }

    .mx-list-bordered {
      border: 1px solid var(--mx-color-border, #d9d9d9);
      border-radius: var(--mx-border-radius, 6px);
    }

    .mx-list-header,
    .mx-list-footer {
      padding: 12px 24px;
      background: transparent;
    }

    .mx-list-header {
      border-bottom: 1px solid var(--mx-color-border-secondary, #f0f0f0);
    }

    .mx-list-footer {
      border-top: 1px solid var(--mx-color-border-secondary, #f0f0f0);
    }

    .mx-list-items {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .mx-list-split ::slotted(mx-list-item:not(:last-child)) {
      border-bottom: 1px solid var(--mx-color-border-secondary, #f0f0f0);
    }

    .mx-list-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    /* Size variants */
    .mx-list-large ::slotted(mx-list-item) {
      padding: 16px 24px;
    }

    .mx-list-small ::slotted(mx-list-item) {
      padding: 8px 16px;
    }
  `;

  @property({ type: Boolean })
  bordered = false;

  @property({ type: Boolean })
  split = true;

  @property({ type: String })
  size: ListSize = 'default';

  @property({ type: Boolean })
  loading = false;

  @property({ type: String })
  header = '';

  @property({ type: String })
  footer = '';

  render() {
    const classes = {
      'mx-list': true,
      'mx-list-bordered': this.bordered,
      'mx-list-split': this.split,
      [`mx-list-${this.size}`]: this.size !== 'default'
    };

    return html`
      <div class=${classMap(classes)}>
        ${this.header || this.querySelector('[slot="header"]') ? html`
          <div class="mx-list-header">
            <slot name="header">${this.header}</slot>
          </div>
        ` : null}

        ${this.loading ? html`
          <div class="mx-list-loading">
            <mx-spin></mx-spin>
          </div>
        ` : html`
          <div class="mx-list-items">
            <slot></slot>
          </div>
        `}

        ${this.footer || this.querySelector('[slot="footer"]') ? html`
          <div class="mx-list-footer">
            <slot name="footer">${this.footer}</slot>
          </div>
        ` : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-list': MXList;
  }
}
