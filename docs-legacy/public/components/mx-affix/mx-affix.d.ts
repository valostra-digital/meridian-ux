import { LitElement } from 'lit';
/**
 * Affix component that fixes content to viewport when scrolling.
 *
 * @element mx-affix
 *
 * @attr {number} offset-top - Offset from top of viewport (px)
 * @attr {number} offset-bottom - Offset from bottom of viewport (px)
 * @attr {string} target - Scrolling container selector (defaults to window)
 *
 * @fires change - Fired when affix state changes
 *
 * @slot - Content to affix
 *
 * @example
 * ```html
 * <mx-affix offset-top="10">
 *   <mx-button>Fixed Button</mx-button>
 * </mx-affix>
 * ```
 */
export declare class MXAffix extends LitElement {
    static styles: import("lit").CSSResult;
    affixOffsetTop?: number;
    affixOffsetBottom?: number;
    target: string;
    private isFixed;
    private placeholderHeight;
    private placeholderWidth;
    private fixedStyles;
    private scrollContainer?;
    private scrollListener?;
    private resizeObserver?;
    private originalRect?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changedProperties: Map<string, any>): void;
    private setupScrollListener;
    private cleanupScrollListener;
    private handleScroll;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-affix': MXAffix;
    }
}
//# sourceMappingURL=mx-affix.d.ts.map