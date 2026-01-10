import { LitElement, PropertyValues } from 'lit';
export type FlexJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type FlexGap = 'small' | 'middle' | 'large' | number;
/**
 * Flex component - Flexbox layout wrapper
 *
 * @element mx-flex
 *
 * @slot - Content to display in the flex container
 *
 * @cssprop --mx-flex-gap - Custom gap size
 */
export declare class MXFlex extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Gap between items (preset or number in pixels)
     */
    gap: FlexGap;
    /**
     * Justify content
     */
    justify: FlexJustify;
    /**
     * Align items
     */
    align: FlexAlign;
    /**
     * Flex direction
     */
    direction: FlexDirection;
    /**
     * Flex wrap
     */
    wrap: FlexWrap;
    /**
     * Shorthand for vertical layout (direction="column")
     */
    vertical: boolean;
    /**
     * Flex value (e.g., "1", "0 1 auto")
     */
    flex?: string;
    private readonly gapSizeMap;
    protected willUpdate(changedProperties: PropertyValues): void;
    private updateStyles;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-flex': MXFlex;
    }
}
//# sourceMappingURL=mx-flex.d.ts.map