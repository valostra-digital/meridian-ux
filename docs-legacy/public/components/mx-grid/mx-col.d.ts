import { LitElement, PropertyValues } from 'lit';
export type ColSpan = number | string;
export type ResponsiveConfig = {
    span?: number;
    offset?: number;
    order?: number;
    pull?: number;
    push?: number;
};
/**
 * Col component - 24-column grid column
 *
 * @element mx-col
 *
 * @slot - Content to display in the column
 */
export declare class MXCol extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Number of columns to span (1-24)
     */
    span?: number;
    /**
     * Number of columns to offset
     */
    offset: number;
    /**
     * Flex order
     */
    order?: number;
    /**
     * Number of columns to pull (move left)
     */
    pull: number;
    /**
     * Number of columns to push (move right)
     */
    push: number;
    /**
     * Custom flex value
     */
    flex?: string;
    /**
     * xs breakpoint config (<576px)
     */
    xs?: ResponsiveConfig;
    /**
     * sm breakpoint config (≥576px)
     */
    sm?: ResponsiveConfig;
    /**
     * md breakpoint config (≥768px)
     */
    md?: ResponsiveConfig;
    /**
     * lg breakpoint config (≥992px)
     */
    lg?: ResponsiveConfig;
    /**
     * xl breakpoint config (≥1200px)
     */
    xl?: ResponsiveConfig;
    /**
     * xxl breakpoint config (≥1600px)
     */
    xxl?: ResponsiveConfig;
    protected willUpdate(changedProperties: PropertyValues): void;
    private updateFlex;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-col': MXCol;
    }
}
//# sourceMappingURL=mx-col.d.ts.map