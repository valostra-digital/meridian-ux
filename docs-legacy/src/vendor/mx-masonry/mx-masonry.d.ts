import { LitElement } from 'lit';
/**
 * Masonry component - Masonry grid layout for dynamic content.
 *
 * @element mx-masonry
 *
 * @attr {number} columns - Number of columns
 * @attr {number} gap - Gap between items in pixels
 * @attr {string} column-width - Fixed column width (auto-calculates columns if set)
 *
 * @slot - Default slot for masonry items
 *
 * @example
 * ```html
 * <mx-masonry columns="3" gap="16">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </mx-masonry>
 *
 * <mx-masonry column-width="250px" gap="20">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </mx-masonry>
 * ```
 */
export declare class MXMasonry extends LitElement {
    static styles: import("lit").CSSResult;
    columns: number;
    gap: number;
    columnWidth: string;
    private columnHeights;
    private itemColumns;
    private defaultSlot;
    private resizeObserver?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    private handleSlotChange;
    private layout;
    /**
     * Manually trigger layout recalculation
     */
    relayout(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-masonry': MXMasonry;
    }
}
//# sourceMappingURL=mx-masonry.d.ts.map