import { LitElement } from 'lit';
/**
 * Breadcrumb Item component
 *
 * @element mx-breadcrumb-item
 *
 * @slot - Link text content
 * @slot separator - Custom separator icon/content
 *
 * @fires click - Dispatched when the item is clicked
 */
export declare class MXBreadcrumbItem extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Link href
     */
    href?: string;
    /**
     * Link target
     */
    target?: string;
    /**
     * Separator character or element
     */
    separator: string;
    /**
     * Whether the item is disabled
     */
    disabled: boolean;
    /**
     * Whether this is the active/current item
     */
    active: boolean;
    private hasCustomSeparator;
    private handleClick;
    private handleSeparatorSlotChange;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-breadcrumb-item': MXBreadcrumbItem;
    }
}
//# sourceMappingURL=mx-breadcrumb-item.d.ts.map