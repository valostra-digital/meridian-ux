import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * Content component - Layout content area
 * 
 * @element mx-content
 * 
 * @slot - Main content
 */
@customElement('mx-content')
export class MXContent extends LitElement {
  static styles = css`
    :host {
      display: block;
      flex: auto;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-layout-content {
      flex: auto;
      min-height: 0;
      padding: 24px;
      background: var(--mx-color-bg-container, #ffffff);
    }
  `;

  render() {
    return html`
      <main class="mx-layout-content">
        <slot></slot>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-content': MXContent;
  }
}
