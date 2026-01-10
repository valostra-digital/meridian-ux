import { LitElement } from 'lit';
/**
 * Empty state component for displaying when there's no data.
 *
 * @element mx-empty
 *
 * @attr {string} description - Description text
 * @attr {string} image - Image URL or preset: 'default', 'simple'
 * @attr {number} image-height - Custom image height
 *
 * @slot - Custom content below description
 * @slot image - Custom image content
 * @slot description - Custom description content
 *
 * @example
 * ```html
 * <mx-empty></mx-empty>
 * <mx-empty description="No data"></mx-empty>
 * <mx-empty image="simple"></mx-empty>
 * ```
 */
export declare class MXEmpty extends LitElement {
    static styles: import("lit").CSSResult;
    description: string;
    image: string;
    imageHeight?: number;
    private renderDefaultImage;
    private renderSimpleImage;
    private renderImage;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-empty': MXEmpty;
    }
}
//# sourceMappingURL=mx-empty.d.ts.map