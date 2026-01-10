import { LitElement } from 'lit';
export type AnchorDirection = 'vertical' | 'horizontal';
/**
 * Anchor component for navigation between page sections.
 *
 * @element mx-anchor
 *
 * @attr {string} target-offset - Offset from top when scrolling to target (px)
 * @attr {AnchorDirection} direction - Direction of anchor links: vertical, horizontal
 * @attr {boolean} affix - Whether to fix the anchor when scrolling
 * @attr {string} current - Current active link href
 *
 * @fires change - Fired when active link changes
 *
 * @slot - Anchor link items (mx-anchor-link)
 *
 * @example
 * ```html
 * <mx-anchor>
 *   <mx-anchor-link href="#section1" label="Section 1"></mx-anchor-link>
 *   <mx-anchor-link href="#section2" label="Section 2"></mx-anchor-link>
 * </mx-anchor>
 * ```
 */
export declare class MXAnchor extends LitElement {
    static styles: import("lit").CSSResult;
    targetOffset: string;
    direction: AnchorDirection;
    affix: boolean;
    current: string;
    private isFixed;
    private intersectionObserver?;
    private scrollListener?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private setupScrollListener;
    private cleanupScrollListener;
    private handleSlotChange;
    private handleLinkClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-anchor': MXAnchor;
    }
}
//# sourceMappingURL=mx-anchor.d.ts.map