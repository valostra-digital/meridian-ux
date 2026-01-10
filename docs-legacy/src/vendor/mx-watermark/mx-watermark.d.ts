import { LitElement } from 'lit';
/**
 * Watermark component that adds watermark overlay to content.
 *
 * @element mx-watermark
 *
 * @attr {string} content - Watermark text content
 * @attr {number} width - Width of watermark (default 120)
 * @attr {number} height - Height of watermark (default 64)
 * @attr {number} rotate - Rotation angle in degrees (default -22)
 * @attr {number} z-index - Z-index of watermark (default 9)
 * @attr {string} font-size - Font size (default 16px)
 * @attr {string} font-color - Font color (default rgba(0,0,0,.15))
 * @attr {string} font-family - Font family
 * @attr {string} font-weight - Font weight (default normal)
 * @attr {number} gap-x - Horizontal gap between watermarks (default 100)
 * @attr {number} gap-y - Vertical gap between watermarks (default 100)
 *
 * @slot - Content to overlay watermark on
 *
 * @example
 * ```html
 * <mx-watermark content="Confidential">
 *   <div>Protected content here</div>
 * </mx-watermark>
 * ```
 */
export declare class MXWatermark extends LitElement {
    static styles: import("lit").CSSResult;
    content: string;
    width: number;
    height: number;
    rotate: number;
    zIndex: number;
    fontSize: string;
    fontColor: string;
    fontFamily: string;
    fontWeight: string;
    gapX: number;
    gapY: number;
    private watermarkUrl;
    updated(changedProperties: Map<string, any>): void;
    connectedCallback(): void;
    private generateWatermark;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-watermark': MXWatermark;
    }
}
//# sourceMappingURL=mx-watermark.d.ts.map