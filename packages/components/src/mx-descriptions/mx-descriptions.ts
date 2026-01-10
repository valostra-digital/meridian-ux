import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type DescriptionsSize = 'default' | 'middle' | 'small';
export type DescriptionsLayout = 'horizontal' | 'vertical';

/**
 * Descriptions container component for displaying read-only data.
 * 
 * @element mx-descriptions
 * 
 * @attr {string} title - Descriptions title
 * @attr {boolean} bordered - Whether to show borders
 * @attr {number} column - Number of columns (default 3)
 * @attr {DescriptionsSize} size - Size of descriptions
 * @attr {DescriptionsLayout} layout - Layout direction
 * @attr {boolean} colon - Whether to show colon after label
 * 
 * @slot - Description items (mx-descriptions-item elements)
 * @slot title - Custom title content
 * @slot extra - Extra actions in header
 * 
 * @example
 * ```html
 * <mx-descriptions title="User Info">
 *   <mx-descriptions-item label="Name">John Doe</mx-descriptions-item>
 *   <mx-descriptions-item label="Email">john@example.com</mx-descriptions-item>
 * </mx-descriptions>
 * ```
 */
@customElement('mx-descriptions')
export class MXDescriptions extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-descriptions {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 14px;
      line-height: 1.5714285714285714;
      list-style: none;
    }

    .mx-descriptions-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    .mx-descriptions-title {
      flex: auto;
      overflow: hidden;
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      font-weight: 600;
      font-size: 16px;
      line-height: 1.5;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .mx-descriptions-extra {
      margin-left: auto;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 14px;
    }

    .mx-descriptions-view {
      width: 100%;
      overflow: hidden;
    }

    .mx-descriptions-view table {
      width: 100%;
      table-layout: fixed;
    }

    .mx-descriptions-row {
      border-bottom: 1px solid var(--mx-color-border-secondary, #f0f0f0);
    }

    .mx-descriptions-row:last-child {
      border-bottom: none;
    }

    .mx-descriptions-item-label,
    .mx-descriptions-item-content {
      padding: 16px 24px;
      overflow-wrap: break-word;
    }

    .mx-descriptions-item-label {
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      font-weight: normal;
      font-size: 14px;
      line-height: 1.5714285714285714;
      text-align: start;
    }

    .mx-descriptions-item-label::after {
      content: ':';
      position: relative;
      top: -0.5px;
      margin: 0 8px 0 2px;
    }

    .mx-descriptions-item-label-no-colon::after {
      content: '';
    }

    .mx-descriptions-item-content {
      display: table-cell;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 14px;
      line-height: 1.5714285714285714;
    }

    /* Bordered */
    .mx-descriptions-bordered .mx-descriptions-view {
      border: 1px solid var(--mx-color-border-secondary, #f0f0f0);
      border-radius: var(--mx-border-radius-lg, 8px);
    }

    .mx-descriptions-bordered .mx-descriptions-row {
      border-bottom: 1px solid var(--mx-color-border-secondary, #f0f0f0);
    }

    .mx-descriptions-bordered .mx-descriptions-item-label,
    .mx-descriptions-bordered .mx-descriptions-item-content {
      border-right: 1px solid var(--mx-color-border-secondary, #f0f0f0);
      padding: 16px 24px;
    }

    .mx-descriptions-bordered .mx-descriptions-item-label {
      background-color: var(--mx-color-fill-alter, rgba(0, 0, 0, 0.02));
    }

    .mx-descriptions-bordered .mx-descriptions-item-label:last-child,
    .mx-descriptions-bordered .mx-descriptions-item-content:last-child {
      border-right: none;
    }

    /* Size variants */
    .mx-descriptions-middle .mx-descriptions-item-label,
    .mx-descriptions-middle .mx-descriptions-item-content {
      padding: 12px 24px;
    }

    .mx-descriptions-small .mx-descriptions-item-label,
    .mx-descriptions-small .mx-descriptions-item-content {
      padding: 8px 16px;
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: Boolean })
  bordered = false;

  @property({ type: Number })
  column = 3;

  @property({ type: String })
  size: DescriptionsSize = 'default';

  @property({ type: String })
  layout: DescriptionsLayout = 'horizontal';

  @property({ type: Boolean })
  colon = true;

  render() {
    const hasTitle = this.title || this.querySelector('[slot="title"]');
    const hasExtra = this.querySelector('[slot="extra"]');

    const classes = [
      'mx-descriptions',
      this.bordered && 'mx-descriptions-bordered',
      this.size !== 'default' && `mx-descriptions-${this.size}`
    ].filter(Boolean).join(' ');

    return html`
      <div class="${classes}">
        ${hasTitle || hasExtra ? html`
          <div class="mx-descriptions-header">
            ${hasTitle ? html`
              <div class="mx-descriptions-title">
                <slot name="title">${this.title}</slot>
              </div>
            ` : null}
            ${hasExtra ? html`
              <div class="mx-descriptions-extra">
                <slot name="extra"></slot>
              </div>
            ` : null}
          </div>
        ` : null}

        <div class="mx-descriptions-view">
          <table>
            <tbody>
              <tr class="mx-descriptions-row">
                <slot></slot>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-descriptions': MXDescriptions;
  }
}
