import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * Footer component - Layout footer
 * 
 * @element mx-footer
 * 
 * @slot - Footer content
 */
@customElement('mx-footer')
export class MXFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-layout-footer {
      padding: 24px 50px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      background: var(--mx-color-bg-footer, #f5f5f5);
    }
  `;

  render() {
    return html`
      <footer class="mx-layout-footer">
        <slot></slot>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-footer': MXFooter;
  }
}
