import { LitElement } from 'lit';
/**
 * Anchor link component for individual navigation items.
 *
 * @element mx-anchor-link
 *
 * @attr {string} href - Target section id (with #)
 * @attr {string} label - Link text label
 * @attr {boolean} active - Whether this link is currently active
 *
 * @fires click - Fired when link is clicked
 *
 * @slot - Nested anchor links
 *
 * @example
 * ```html
 * <mx-anchor-link href="#section1" label="Section 1"></mx-anchor-link>
 * <mx-anchor-link href="#section2" label="Section 2">
 *   <mx-anchor-link href="#section2-1" label="Sub Section 2.1"></mx-anchor-link>
 * </mx-anchor-link>
 * ```
 */
export declare class MXAnchorLink extends LitElement {
    static styles: import("lit").CSSResult;
    href: string;
    label: string;
    active: boolean;
    private handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-anchor-link': MXAnchorLink;
    }
}
//# sourceMappingURL=mx-anchor-link.d.ts.map