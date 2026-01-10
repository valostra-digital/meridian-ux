var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
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
let MXTimeline = class MXTimeline extends LitElement {
    constructor() {
        super(...arguments);
        this.mode = 'left';
        this.pending = false;
        this.pendingDot = '';
    }
    render() {
        const classes = {
            'mx-timeline': true,
            [`mx-timeline-${this.mode}`]: true
        };
        return html `
      <ul class=${classMap(classes)}>
        <slot></slot>
        
        ${this.pending ? html `
          <li class="mx-timeline-pending">
            ${this.pendingDot || 'Loading...'}
          </li>
        ` : null}
      </ul>
    `;
    }
};
MXTimeline.styles = css `
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
__decorate([
    property({ type: String })
], MXTimeline.prototype, "mode", void 0);
__decorate([
    property({ type: Boolean })
], MXTimeline.prototype, "pending", void 0);
__decorate([
    property({ type: String, attribute: 'pending-dot' })
], MXTimeline.prototype, "pendingDot", void 0);
MXTimeline = __decorate([
    customElement('mx-timeline')
], MXTimeline);
export { MXTimeline };
//# sourceMappingURL=mx-timeline.js.map