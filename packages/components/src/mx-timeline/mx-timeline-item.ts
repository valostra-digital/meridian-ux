import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type TimelineItemColor = 'blue' | 'red' | 'green' | 'gray';

/**
 * Timeline item component for individual timeline events.
 * 
 * @element mx-timeline-item
 * 
 * @attr {TimelineItemColor} color - Color of the timeline dot: blue, red, green, gray
 * @attr {string} position - Position in alternate mode: left, right
 * @attr {string} label - Label text for the item
 * 
 * @slot - Main content
 * @slot dot - Custom dot content
 * 
 * @example
 * ```html
 * <mx-timeline-item color="green" label="2024-01-01">
 *   Event completed successfully
 * </mx-timeline-item>
 * ```
 */
@customElement('mx-timeline-item')
export class MXTimelineItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-timeline-item {
      position: relative;
      padding-bottom: 20px;
      margin: 0;
      list-style: none;
    }

    .mx-timeline-item-tail {
      position: absolute;
      top: 10px;
      left: 4px;
      height: calc(100% - 10px);
      border-left: 2px solid var(--mx-color-border-secondary, #f0f0f0);
    }

    .mx-timeline-item:last-child .mx-timeline-item-tail {
      display: none;
    }

    .mx-timeline-item-head {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #fff;
      border: 2px solid var(--dot-color, var(--mx-color-primary, #1677ff));
      border-radius: 50%;
    }

    .mx-timeline-item-head-blue {
      --dot-color: var(--mx-color-primary, #1677ff);
    }

    .mx-timeline-item-head-red {
      --dot-color: var(--mx-color-error, #ff4d4f);
    }

    .mx-timeline-item-head-green {
      --dot-color: var(--mx-color-success, #52c41a);
    }

    .mx-timeline-item-head-gray {
      --dot-color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
    }

    .mx-timeline-item-head-custom {
      position: absolute;
      text-align: center;
      line-height: 1;
      border: 0;
      height: auto;
      width: auto;
      border-radius: 0;
      background: transparent;
      top: 5px;
      left: 0;
      transform: translateX(-50%);
    }

    .mx-timeline-item-content {
      position: relative;
      top: -6px;
      margin-left: 20px;
      word-break: break-word;
    }

    .mx-timeline-item-label {
      position: absolute;
      top: -6px;
      width: 100px;
      text-align: right;
      left: -120px;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
    }

    .mx-timeline-item-content-title {
      margin-bottom: 4px;
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      font-size: 16px;
      line-height: 24px;
    }

    .mx-timeline-item-content-description {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
    }
  `;

  @property({ type: String })
  color: TimelineItemColor = 'blue';

  @property({ type: String })
  position = '';

  @property({ type: String })
  label = '';

  render() {
    const hasCustomDot = !!this.querySelector('[slot="dot"]');

    const headClasses = {
      'mx-timeline-item-head': true,
      'mx-timeline-item-head-custom': hasCustomDot,
      [`mx-timeline-item-head-${this.color}`]: !hasCustomDot
    };

    return html`
      <li class="mx-timeline-item">
        <div class="mx-timeline-item-tail"></div>
        
        <div class=${classMap(headClasses)}>
          ${hasCustomDot ? html`<slot name="dot"></slot>` : null}
        </div>

        ${this.label ? html`
          <div class="mx-timeline-item-label">${this.label}</div>
        ` : null}

        <div class="mx-timeline-item-content">
          <slot></slot>
        </div>
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-timeline-item': MXTimelineItem;
  }
}
