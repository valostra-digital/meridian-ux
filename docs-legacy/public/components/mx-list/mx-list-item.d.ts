import { LitElement } from 'lit';
/**
 * List item component for individual list entries.
 *
 * @element mx-list-item
 *
 * @slot - Main content
 * @slot extra - Extra content (displayed on the right)
 * @slot actions - Action buttons/links
 *
 * @example
 * ```html
 * <mx-list-item>
 *   <div>Item Title</div>
 *   <div slot="extra">Extra Info</div>
 * </mx-list-item>
 * ```
 */
export declare class MXListItem extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-list-item': MXListItem;
    }
}
//# sourceMappingURL=mx-list-item.d.ts.map