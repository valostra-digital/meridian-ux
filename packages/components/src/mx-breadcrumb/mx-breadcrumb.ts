import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Breadcrumb component - Display the current page path
 * 
 * @element mx-breadcrumb
 * 
 * @slot - Breadcrumb items (mx-breadcrumb-item)
 * 
 * @cssprop --mx-breadcrumb-separator - Custom separator content
 */
@customElement('mx-breadcrumb')
export class MXBreadcrumb extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-breadcrumb {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      line-height: var(--mx-line-height, 1.5714285714285714);
      list-style: none;
      font-family: inherit;
    }

    .mx-breadcrumb ol {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin: 0;
      padding: 0;
      list-style: none;
    }
  `;

  /**
   * Custom separator (default is "/")
   */
  @property({ type: String })
  separator = '/';

  connectedCallback(): void {
    super.connectedCallback();
    this.updateChildrenSeparator();
  }

  private updateChildrenSeparator(): void {
    // Wait for next frame to ensure children are rendered
    requestAnimationFrame(() => {
      const items = this.querySelectorAll('mx-breadcrumb-item');
      items.forEach((item) => {
        (item as any).separator = this.separator;
      });
    });
  }

  render() {
    return html`
      <nav class="mx-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <slot @slotchange=${this.updateChildrenSeparator}></slot>
        </ol>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-breadcrumb': MXBreadcrumb;
  }
}
