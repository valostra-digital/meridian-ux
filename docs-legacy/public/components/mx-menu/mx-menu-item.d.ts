import { LitElement } from 'lit';
/**
 * Menu Item component
 *
 * @element mx-menu-item
 *
 * @slot - Item content
 * @slot icon - Icon content
 *
 * @fires item-select - Dispatched when item is clicked
 */
export declare class MXMenuItem extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Unique key for the menu item
     */
    key: string;
    /**
     * Whether item is disabled
     */
    disabled: boolean;
    /**
     * Whether item is selected (controlled by parent)
     */
    selected: boolean;
    /**
     * Menu mode (set by parent)
     */
    mode: string;
    /**
     * Theme (set by parent)
     */
    theme: string;
    /**
     * Indent level (set by parent)
     */
    level: number;
    /**
     * Whether menu is collapsed (set by parent)
     */
    inlineCollapsed: boolean;
    private handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-menu-item': MXMenuItem;
    }
}
//# sourceMappingURL=mx-menu-item.d.ts.map