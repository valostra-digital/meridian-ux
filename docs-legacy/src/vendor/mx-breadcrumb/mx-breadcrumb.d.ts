import { LitElement } from 'lit';
/**
 * Breadcrumb component - Display the current page path
 *
 * @element mx-breadcrumb
 *
 * @slot - Breadcrumb items (mx-breadcrumb-item)
 *
 * @cssprop --mx-breadcrumb-separator - Custom separator content
 */
export declare class MXBreadcrumb extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Custom separator (default is "/")
     */
    separator: string;
    connectedCallback(): void;
    private updateChildrenSeparator;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-breadcrumb': MXBreadcrumb;
    }
}
//# sourceMappingURL=mx-breadcrumb.d.ts.map