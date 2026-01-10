import { LitElement } from 'lit';
export type DividerOrientation = 'left' | 'right' | 'center';
export type DividerType = 'horizontal' | 'vertical';
/**
 * Divider component - A divider line separates different content
 *
 * @element mx-divider
 *
 * @slot - Content to display within the divider (for horizontal dividers with text)
 *
 * @cssprop --mx-divider-color - Color of the divider line
 */
export declare class MXDivider extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Type of the divider
     */
    type: DividerType;
    /**
     * Use dashed line
     */
    dashed: boolean;
    /**
     * Position of the text (for horizontal dividers with text)
     */
    orientation: DividerOrientation;
    /**
     * Use plain style (no bold text)
     */
    plain: boolean;
    private hasSlottedContent;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-divider': MXDivider;
    }
}
//# sourceMappingURL=mx-divider.d.ts.map