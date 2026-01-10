import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type FlexJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type FlexGap = 'small' | 'middle' | 'large' | number;

/**
 * Flex component - Flexbox layout wrapper
 * 
 * @element mx-flex
 * 
 * @slot - Content to display in the flex container
 * 
 * @cssprop --mx-flex-gap - Custom gap size
 */
@customElement('mx-flex')
export class MXFlex extends LitElement {
  static styles = css`
    :host {
      display: flex;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    :host([vertical]) {
      flex-direction: column;
    }

    .mx-flex {
      display: flex;
      gap: var(--mx-flex-gap, 0px);
    }
  `;

  /**
   * Gap between items (preset or number in pixels)
   */
  @property({ type: String })
  gap: FlexGap = 0;

  /**
   * Justify content
   */
  @property({ type: String })
  justify: FlexJustify = 'flex-start';

  /**
   * Align items
   */
  @property({ type: String })
  align: FlexAlign = 'stretch';

  /**
   * Flex direction
   */
  @property({ type: String })
  direction: FlexDirection = 'row';

  /**
   * Flex wrap
   */
  @property({ type: String })
  wrap: FlexWrap = 'nowrap';

  /**
   * Shorthand for vertical layout (direction="column")
   */
  @property({ type: Boolean, reflect: true })
  vertical = false;

  /**
   * Flex value (e.g., "1", "0 1 auto")
   */
  @property({ type: String })
  flex?: string;

  private readonly gapSizeMap: Record<string, string> = {
    small: '8px',
    middle: '16px',
    large: '24px',
  };

  protected willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('gap') || changedProperties.has('vertical') || changedProperties.has('direction')) {
      this.updateStyles();
    }
  }

  private updateStyles(): void {
    // Handle gap
    let gapValue: string;
    if (typeof this.gap === 'number') {
      gapValue = `${this.gap}px`;
    } else {
      gapValue = this.gapSizeMap[this.gap as string] || '0px';
    }
    this.style.setProperty('--mx-flex-gap', gapValue);

    // Handle justify
    this.style.justifyContent = this.justify;

    // Handle align
    this.style.alignItems = this.align;

    // Handle direction
    const finalDirection = this.vertical ? 'column' : this.direction;
    this.style.flexDirection = finalDirection;

    // Handle wrap
    this.style.flexWrap = this.wrap;

    // Handle flex
    if (this.flex) {
      this.style.flex = this.flex;
    }
  }

  render() {
    const classes = {
      'mx-flex': true,
    };

    return html`
      <div class=${classMap(classes)}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-flex': MXFlex;
  }
}
