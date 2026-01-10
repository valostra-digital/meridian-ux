import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Layout component - Main layout container
 * 
 * @element mx-layout
 * 
 * @slot - Layout content (mx-header, mx-sider, mx-content, mx-footer)
 */
@customElement('mx-layout')
export class MXLayout extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      flex: auto;
      box-sizing: border-box;
      min-height: 0;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-layout {
      display: flex;
      flex: auto;
      flex-direction: column;
      min-height: 0;
      background: var(--mx-color-bg-layout, #f5f5f5);
    }

    .mx-layout-has-sider {
      flex-direction: row;
    }

    .mx-layout-has-sider > .mx-layout,
    .mx-layout-has-sider > .mx-layout-content {
      overflow-x: hidden;
    }
  `;

  /**
   * Whether layout has sider
   */
  @property({ type: Boolean, attribute: 'has-sider' })
  hasSider = false;

  render() {
    const classes = {
      'mx-layout': true,
      'mx-layout-has-sider': this.hasSider,
    };

    return html`
      <section class=${classMap(classes)}>
        <slot></slot>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-layout': MXLayout;
  }
}
