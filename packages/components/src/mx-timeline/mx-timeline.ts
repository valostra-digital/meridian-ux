import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type TimelineMode = 'left' | 'right' | 'alternate';

/**
 * Timeline component for displaying event sequences.
 * 
 * @element mx-timeline
 * 
 * @attr {TimelineMode} mode - Position of timeline content: left, right, alternate
 * @attr {boolean} pending - Whether to show pending state at the end
 * @attr {string} pending-dot - Custom pending dot content
 * 
 * @slot - Timeline items (mx-timeline-item)
 * 
 * @example
 * ```html
 * <mx-timeline>
 *   <mx-timeline-item>Event 1</mx-timeline-item>
 *   <mx-timeline-item>Event 2</mx-timeline-item>
 * </mx-timeline>
 * ```
 */
@customElement('mx-timeline')
export class MXTimeline extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-timeline {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .mx-timeline-pending {
      margin-top: 12px;
      padding-left: 20px;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      font-size: var(--mx-font-size, 14px);
    }

    ::slotted(mx-timeline-item) {
      position: relative;
      padding-bottom: 20px;
    }
  `;

  @property({ type: String })
  mode: TimelineMode = 'left';

  @property({ type: Boolean })
  pending = false;

  @property({ type: String, attribute: 'pending-dot' })
  pendingDot = '';

  render() {
    const classes = {
      'mx-timeline': true,
      [`mx-timeline-${this.mode}`]: true
    };

    return html`
      <ul class=${classMap(classes)}>
        <slot></slot>
        
        ${this.pending ? html`
          <li class="mx-timeline-pending">
            ${this.pendingDot || 'Loading...'}
          </li>
        ` : null}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-timeline': MXTimeline;
  }
}
