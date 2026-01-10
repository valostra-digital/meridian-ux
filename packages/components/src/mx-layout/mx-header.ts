import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Header component - Layout header
 * 
 * @element mx-header
 * 
 * @slot - Header content
 */
@customElement('mx-header')
export class MXHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-layout-header {
      height: 64px;
      padding: 0 50px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      line-height: 64px;
      background: var(--mx-color-bg-header, #001529);
    }
  `;

  render() {
    return html`
      <header class="mx-layout-header">
        <slot></slot>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-header': MXHeader;
  }
}
