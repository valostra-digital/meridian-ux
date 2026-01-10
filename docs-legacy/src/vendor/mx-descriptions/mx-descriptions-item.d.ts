import { LitElement } from 'lit';
/**
 * Descriptions item component (child of mx-descriptions).
 *
 * @element mx-descriptions-item
 *
 * @attr {string} label - Item label
 * @attr {number} span - Column span (default 1)
 *
 * @slot - Item content
 * @slot label - Custom label content
 *
 * @example
 * ```html
 * <mx-descriptions-item label="Name">John Doe</mx-descriptions-item>
 * ```
 */
export declare class MXDescriptionsItem extends LitElement {
    static styles: import("lit").CSSResult;
    label: string;
    span: number;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-descriptions-item': MXDescriptionsItem;
    }
}
//# sourceMappingURL=mx-descriptions-item.d.ts.map