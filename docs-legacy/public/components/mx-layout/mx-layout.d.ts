import { LitElement } from 'lit';
/**
 * Layout component - Main layout container
 *
 * @element mx-layout
 *
 * @slot - Layout content (mx-header, mx-sider, mx-content, mx-footer)
 */
export declare class MXLayout extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Whether layout has sider
     */
    hasSider: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-layout': MXLayout;
    }
}
//# sourceMappingURL=mx-layout.d.ts.map