import { LitElement } from 'lit';
export type ImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
/**
 * Image component with preview and loading states.
 *
 * @element mx-image
 *
 * @attr {string} src - Image source URL
 * @attr {string} alt - Alt text for the image
 * @attr {string} width - Width of the image
 * @attr {string} height - Height of the image
 * @attr {ImageFit} fit - How image should be resized: fill, contain, cover, none, scale-down
 * @attr {boolean} preview - Whether to enable image preview on click
 * @attr {string} placeholder - Placeholder image URL
 * @attr {string} fallback - Fallback image URL on error
 *
 * @fires load - Fired when image loads successfully
 * @fires error - Fired when image fails to load
 *
 * @slot placeholder - Custom placeholder content
 * @slot error - Custom error content
 *
 * @example
 * ```html
 * <mx-image
 *   src="image.jpg"
 *   alt="Example"
 *   preview
 *   width="200px"
 * ></mx-image>
 * ```
 */
export declare class MXImage extends LitElement {
    static styles: import("lit").CSSResult;
    src: string;
    alt: string;
    width: string;
    height: string;
    fit: ImageFit;
    preview: boolean;
    placeholder: string;
    fallback: string;
    private loading;
    private error;
    private showPreview;
    private handleLoad;
    private handleError;
    private handlePreviewClick;
    private closePreview;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-image': MXImage;
    }
}
//# sourceMappingURL=mx-image.d.ts.map