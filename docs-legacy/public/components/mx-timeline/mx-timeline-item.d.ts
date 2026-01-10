import { LitElement } from 'lit';
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
export declare class MXTimelineItem extends LitElement {
    static styles: import("lit").CSSResult;
    color: TimelineItemColor;
    position: string;
    label: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-timeline-item': MXTimelineItem;
    }
}
//# sourceMappingURL=mx-timeline-item.d.ts.map