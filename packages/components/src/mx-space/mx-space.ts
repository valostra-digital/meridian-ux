import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type SpaceSize = 'small' | 'middle' | 'large' | number;
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';
export type SpaceDirection = 'horizontal' | 'vertical';

/**
 * Space component - Set components spacing
 * 
 * @element mx-space
 * 
 * @fires change - Dispatched when children change
 * 
 * @slot - Default slot for space items
 * 
 * @cssprop --mx-space-gap - Custom gap size
 */
@customElement('mx-space')
export class MXSpace extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    :host([block]) {
      display: flex;
      width: 100%;
    }

    .mx-space {
      display: inline-flex;
      gap: var(--mx-space-gap, 8px);
    }

    .mx-space-horizontal {
      flex-direction: row;
    }

    .mx-space-vertical {
      flex-direction: column;
    }

    .mx-space-align-start {
      align-items: flex-start;
    }

    .mx-space-align-end {
      align-items: flex-end;
    }

    .mx-space-align-center {
      align-items: center;
    }

    .mx-space-align-baseline {
      align-items: baseline;
    }

    .mx-space-wrap {
      flex-wrap: wrap;
    }

    .mx-space-compact {
      gap: 0;
    }

    .mx-space-compact ::slotted(*) {
      border-radius: 0 !important;
      border-right-width: 0 !important;
    }

    .mx-space-compact ::slotted(:first-child) {
      border-top-left-radius: var(--mx-border-radius, 6px) !important;
      border-bottom-left-radius: var(--mx-border-radius, 6px) !important;
    }

    .mx-space-compact ::slotted(:last-child) {
      border-top-right-radius: var(--mx-border-radius, 6px) !important;
      border-bottom-right-radius: var(--mx-border-radius, 6px) !important;
      border-right-width: 1px !important;
    }

    .mx-space-compact.mx-space-vertical ::slotted(*) {
      border-radius: 0 !important;
      border-bottom-width: 0 !important;
      border-right-width: 1px !important;
    }

    .mx-space-compact.mx-space-vertical ::slotted(:first-child) {
      border-top-left-radius: var(--mx-border-radius, 6px) !important;
      border-top-right-radius: var(--mx-border-radius, 6px) !important;
      border-bottom-left-radius: 0 !important;
    }

    .mx-space-compact.mx-space-vertical ::slotted(:last-child) {
      border-bottom-left-radius: var(--mx-border-radius, 6px) !important;
      border-bottom-right-radius: var(--mx-border-radius, 6px) !important;
      border-bottom-width: 1px !important;
    }

    .mx-space-split {
      display: flex;
      align-items: center;
    }

    .mx-space-item {
      display: flex;
      align-items: center;
    }
  `;

  /**
   * Size of the space (preset or number in pixels)
   */
  @property({ type: String })
  size: SpaceSize = 'small';

  /**
   * Direction of the space
   */
  @property({ type: String })
  direction: SpaceDirection = 'horizontal';

  /**
   * Align items
   */
  @property({ type: String })
  align?: SpaceAlign;

  /**
   * Auto wrap items
   */
  @property({ type: Boolean })
  wrap = false;

  /**
   * Display as block (take full width)
   */
  @property({ type: Boolean, reflect: true })
  block = false;

  /**
   * Compact mode (remove spacing and connect borders)
   */
  @property({ type: Boolean })
  compact = false;

  /**
   * Custom split element between items
   */
  @property({ type: String })
  split?: string;

  @state()
  private gapSize = '8px';

  private readonly sizeMap: Record<string, string> = {
    small: '8px',
    middle: '16px',
    large: '24px',
  };

  protected willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('size')) {
      this.updateGapSize();
    }
  }

  private updateGapSize(): void {
    if (typeof this.size === 'number') {
      this.gapSize = `${this.size}px`;
    } else {
      this.gapSize = this.sizeMap[this.size] || this.sizeMap.small;
    }
    this.style.setProperty('--mx-space-gap', this.gapSize);
  }

  render() {
    const classes = {
      'mx-space': true,
      'mx-space-horizontal': this.direction === 'horizontal',
      'mx-space-vertical': this.direction === 'vertical',
      'mx-space-wrap': this.wrap,
      'mx-space-compact': this.compact,
      [`mx-space-align-${this.align}`]: !!this.align,
    };

    if (this.compact) {
      // In compact mode, render items directly without splits
      return html`
        <div class=${classMap(classes)}>
          <slot></slot>
        </div>
      `;
    }

    return html`
      <div class=${classMap(classes)}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-space': MXSpace;
  }
}
