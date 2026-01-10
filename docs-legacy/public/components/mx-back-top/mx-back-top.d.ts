import { LitElement } from 'lit';
/**
 * Back to top button that scrolls to top when clicked.
 *
 * @element mx-back-top
 *
 * @attr {number} visibility-height - Height threshold to show button (default 400px)
 * @attr {string} target - Scrolling container selector (defaults to window)
 * @attr {number} duration - Scroll animation duration in ms (default 450)
 *
 * @fires click - Fired when button is clicked
 *
 * @slot - Custom button content (default: up arrow icon)
 *
 * @example
 * ```html
 * <mx-back-top visibility-height="300"></mx-back-top>
 * <mx-back-top>
 *   <div>Top</div>
 * </mx-back-top>
 * ```
 */
export declare class MXBackTop extends LitElement {
    static styles: import("lit").CSSResult;
    visibilityHeight: number;
    target: string;
    duration: number;
    private visible;
    private scrollContainer?;
    private scrollListener?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private setupScrollListener;
    private cleanupScrollListener;
    private handleScroll;
    private handleClick;
    private scrollToTop;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-back-top': MXBackTop;
    }
}
//# sourceMappingURL=mx-back-top.d.ts.map