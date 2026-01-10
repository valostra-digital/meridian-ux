import { LitElement } from 'lit';
export type DescriptionsSize = 'default' | 'middle' | 'small';
export type DescriptionsLayout = 'horizontal' | 'vertical';
/**
 * Descriptions container component for displaying read-only data.
 *
 * @element mx-descriptions
 *
 * @attr {string} title - Descriptions title
 * @attr {boolean} bordered - Whether to show borders
 * @attr {number} column - Number of columns (default 3)
 * @attr {DescriptionsSize} size - Size of descriptions
 * @attr {DescriptionsLayout} layout - Layout direction
 * @attr {boolean} colon - Whether to show colon after label
 *
 * @slot - Description items (mx-descriptions-item elements)
 * @slot title - Custom title content
 * @slot extra - Extra actions in header
 *
 * @example
 * ```html
 * <mx-descriptions title="User Info">
 *   <mx-descriptions-item label="Name">John Doe</mx-descriptions-item>
 *   <mx-descriptions-item label="Email">john@example.com</mx-descriptions-item>
 * </mx-descriptions>
 * ```
 */
export declare class MXDescriptions extends LitElement {
    static styles: import("lit").CSSResult;
    title: string;
    bordered: boolean;
    column: number;
    size: DescriptionsSize;
    layout: DescriptionsLayout;
    colon: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-descriptions': MXDescriptions;
    }
}
//# sourceMappingURL=mx-descriptions.d.ts.map