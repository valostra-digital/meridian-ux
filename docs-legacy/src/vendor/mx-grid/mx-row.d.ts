import { LitElement, PropertyValues } from 'lit';
export type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
export type RowAlign = 'top' | 'middle' | 'bottom' | 'stretch';
export type Gutter = number | [number, number];
/**
 * Row component - 24-column grid row
 *
 * @element mx-row
 *
 * @slot - Column elements (mx-col)
 *
 * @cssprop --mx-row-gutter-x - Horizontal gutter spacing
 * @cssprop --mx-row-gutter-y - Vertical gutter spacing
 */
export declare class MXRow extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Spacing between columns (number or [horizontal, vertical])
     */
    gutter: Gutter;
    /**
     * Horizontal alignment of columns
     */
    justify: RowJustify;
    /**
     * Vertical alignment of columns
     */
    align: RowAlign;
    /**
     * Auto wrap columns
     */
    wrap: boolean;
    protected willUpdate(changedProperties: PropertyValues): void;
    private updateGutter;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-row': MXRow;
    }
}
//# sourceMappingURL=mx-row.d.ts.map