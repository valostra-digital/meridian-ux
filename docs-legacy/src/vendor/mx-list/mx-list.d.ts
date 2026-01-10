import { LitElement } from 'lit';
export type ListSize = 'default' | 'large' | 'small';
/**
 * List component for displaying a list of items.
 *
 * @element mx-list
 *
 * @attr {boolean} bordered - Whether to show border
 * @attr {boolean} split - Whether to show split line between items
 * @attr {ListSize} size - Size of list items: large, default, small
 * @attr {boolean} loading - Whether to show loading state
 * @attr {string} header - List header text
 * @attr {string} footer - List footer text
 *
 * @slot - List items (mx-list-item)
 * @slot header - Custom header content
 * @slot footer - Custom footer content
 *
 * @example
 * ```html
 * <mx-list bordered>
 *   <mx-list-item>Item 1</mx-list-item>
 *   <mx-list-item>Item 2</mx-list-item>
 * </mx-list>
 * ```
 */
export declare class MXList extends LitElement {
    static styles: import("lit").CSSResult;
    bordered: boolean;
    split: boolean;
    size: ListSize;
    loading: boolean;
    header: string;
    footer: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-list': MXList;
    }
}
//# sourceMappingURL=mx-list.d.ts.map