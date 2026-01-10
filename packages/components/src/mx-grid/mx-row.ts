import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
export type RowAlign = 'top' | 'middle' | 'bottom' | 'stretch';
export type Gutter = number | [number, number];

/**
 * Row component - 24-column grid row
 * 
 * @element mx-row
 * 
 * @slot - Column elements (mx-col)
 * 
 * @cssprop --mx-row-gutter-x - Horizontal gutter spacing
 * @cssprop --mx-row-gutter-y - Vertical gutter spacing
 */
@customElement('mx-row')
export class MXRow extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-row {
      display: flex;
      flex-flow: row wrap;
      min-width: 0;
      margin-left: calc(var(--mx-row-gutter-x, 0px) / -2);
      margin-right: calc(var(--mx-row-gutter-x, 0px) / -2);
      row-gap: var(--mx-row-gutter-y, 0px);
    }

    .mx-row::before,
    .mx-row::after {
      display: flex;
    }

    /* Justify */
    .mx-row-justify-start {
      justify-content: flex-start;
    }

    .mx-row-justify-end {
      justify-content: flex-end;
    }

    .mx-row-justify-center {
      justify-content: center;
    }

    .mx-row-justify-space-around {
      justify-content: space-around;
    }

    .mx-row-justify-space-between {
      justify-content: space-between;
    }

    .mx-row-justify-space-evenly {
      justify-content: space-evenly;
    }

    /* Align */
    .mx-row-align-top {
      align-items: flex-start;
    }

    .mx-row-align-middle {
      align-items: center;
    }

    .mx-row-align-bottom {
      align-items: flex-end;
    }

    .mx-row-align-stretch {
      align-items: stretch;
    }

    /* Wrap */
    .mx-row-no-wrap {
      flex-wrap: nowrap;
    }
  `;

  /**
   * Spacing between columns (number or [horizontal, vertical])
   */
  @property({ type: Object })
  gutter: Gutter = 0;

  /**
   * Horizontal alignment of columns
   */
  @property({ type: String })
  justify: RowJustify = 'start';

  /**
   * Vertical alignment of columns
   */
  @property({ type: String })
  align: RowAlign = 'top';

  /**
   * Auto wrap columns
   */
  @property({ type: Boolean })
  wrap = true;

  protected willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('gutter')) {
      this.updateGutter();
    }
  }

  private updateGutter(): void {
    let gutterX: number;
    let gutterY: number;

    if (Array.isArray(this.gutter)) {
      [gutterX, gutterY] = this.gutter;
    } else {
      gutterX = this.gutter;
      gutterY = 0;
    }

    this.style.setProperty('--mx-row-gutter-x', `${gutterX}px`);
    this.style.setProperty('--mx-row-gutter-y', `${gutterY}px`);
  }

  render() {
    const classes = {
      'mx-row': true,
      [`mx-row-justify-${this.justify}`]: true,
      [`mx-row-align-${this.align}`]: true,
      'mx-row-no-wrap': !this.wrap,
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
    'mx-row': MXRow;
  }
}
