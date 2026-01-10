import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Tab Pane component - Individual tab content
 * 
 * @element mx-tab-pane
 * 
 * @slot - Content to display when tab is active
 */
@customElement('mx-tab-pane')
export class MXTabPane extends LitElement {
  static styles = css`
    :host {
      display: none;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    :host([active]) {
      display: block;
    }

    .mx-tab-pane {
      width: 100%;
    }

    .mx-tab-pane-animated {
      animation: fadeIn 0.3s;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;

  /**
   * Tab key (unique identifier)
   */
  @property({ type: String })
  tab!: string;

  /**
   * Tab label text
   */
  @property({ type: String })
  label?: string;

  /**
   * Whether tab is disabled
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Whether tab is closable (editable-card mode)
   */
  @property({ type: Boolean })
  closable = true;

  /**
   * Whether tab is active
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * Force render content even when inactive
   */
  @property({ type: Boolean, attribute: 'force-render' })
  forceRender = false;

  render() {
    if (!this.active && !this.forceRender) {
      return html``;
    }

    return html`
      <div class="mx-tab-pane ${this.active ? 'mx-tab-pane-animated' : ''}">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-tab-pane': MXTabPane;
  }
}
