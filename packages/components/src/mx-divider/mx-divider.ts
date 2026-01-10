import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type DividerOrientation = 'left' | 'right' | 'center';
export type DividerType = 'horizontal' | 'vertical';

/**
 * Divider component - A divider line separates different content
 * 
 * @element mx-divider
 * 
 * @slot - Content to display within the divider (for horizontal dividers with text)
 * 
 * @cssprop --mx-divider-color - Color of the divider line
 */
@customElement('mx-divider')
export class MXDivider extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    :host([type="vertical"]) {
      display: inline-block;
      height: auto;
      margin: 0 8px;
      vertical-align: middle;
    }

    .mx-divider {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      font-size: var(--mx-font-size, 14px);
      line-height: var(--mx-line-height, 1.5714285714285714);
      list-style: none;
      font-family: inherit;
    }

    .mx-divider-horizontal {
      display: flex;
      clear: both;
      width: 100%;
      min-width: 100%;
      margin: 24px 0;
      border-top: 1px solid var(--mx-divider-color, rgba(5, 5, 5, 0.06));
    }

    .mx-divider-horizontal.mx-divider-with-text {
      display: flex;
      align-items: center;
      margin: 16px 0;
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      font-weight: 500;
      font-size: 16px;
      white-space: nowrap;
      text-align: center;
      border-top: 0;
    }

    .mx-divider-horizontal.mx-divider-with-text::before,
    .mx-divider-horizontal.mx-divider-with-text::after {
      position: relative;
      width: 50%;
      border-top: 1px solid var(--mx-divider-color, rgba(5, 5, 5, 0.06));
      transform: translateY(50%);
      content: '';
    }

    .mx-divider-horizontal.mx-divider-with-text-left::before {
      width: 5%;
    }

    .mx-divider-horizontal.mx-divider-with-text-left::after {
      width: 95%;
    }

    .mx-divider-horizontal.mx-divider-with-text-right::before {
      width: 95%;
    }

    .mx-divider-horizontal.mx-divider-with-text-right::after {
      width: 5%;
    }

    .mx-divider-inner-text {
      display: inline-block;
      padding: 0 1em;
    }

    .mx-divider-dashed {
      border-style: dashed;
      border-width: 1px 0 0;
    }

    .mx-divider-horizontal.mx-divider-dashed.mx-divider-with-text::before,
    .mx-divider-horizontal.mx-divider-dashed.mx-divider-with-text::after {
      border-style: dashed;
    }

    .mx-divider-vertical {
      position: relative;
      top: -0.06em;
      display: inline-block;
      height: 0.9em;
      margin: 0 8px;
      vertical-align: middle;
      border-top: 0;
      border-left: 1px solid var(--mx-divider-color, rgba(5, 5, 5, 0.06));
    }

    .mx-divider-vertical.mx-divider-dashed {
      border-left-style: dashed;
    }

    .mx-divider-plain.mx-divider-with-text {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-weight: normal;
      font-size: var(--mx-font-size, 14px);
    }
  `;

  /**
   * Type of the divider
   */
  @property({ type: String, reflect: true })
  type: DividerType = 'horizontal';

  /**
   * Use dashed line
   */
  @property({ type: Boolean })
  dashed = false;

  /**
   * Position of the text (for horizontal dividers with text)
   */
  @property({ type: String })
  orientation: DividerOrientation = 'center';

  /**
   * Use plain style (no bold text)
   */
  @property({ type: Boolean })
  plain = false;

  private hasSlottedContent(): boolean {
    const slot = this.shadowRoot?.querySelector('slot');
    return !!slot?.assignedNodes().length;
  }

  render() {
    const isHorizontal = this.type === 'horizontal';
    const hasContent = this.hasSlottedContent();

    const classes = {
      'mx-divider': true,
      'mx-divider-horizontal': isHorizontal,
      'mx-divider-vertical': !isHorizontal,
      'mx-divider-dashed': this.dashed,
      'mx-divider-with-text': isHorizontal && hasContent,
      [`mx-divider-with-text-${this.orientation}`]: isHorizontal && hasContent && this.orientation !== 'center',
      'mx-divider-plain': this.plain,
    };

    if (isHorizontal && hasContent) {
      return html`
        <div class=${classMap(classes)}>
          <span class="mx-divider-inner-text">
            <slot></slot>
          </span>
        </div>
      `;
    }

    return html`<div class=${classMap(classes)}></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-divider': MXDivider;
  }
}
