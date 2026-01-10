import { LitElement } from 'lit';
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
export declare class MXTimeline extends LitElement {
    static styles: import("lit").CSSResult;
    mode: TimelineMode;
    pending: boolean;
    pendingDot: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-timeline': MXTimeline;
    }
}
//# sourceMappingURL=mx-timeline.d.ts.map