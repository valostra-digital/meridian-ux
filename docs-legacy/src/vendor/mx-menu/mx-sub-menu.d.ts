import { LitElement } from 'lit';
/**
 * Sub Menu component - Nested menu container
 *
 * @element mx-sub-menu
 *
 * @slot - Sub-menu items
 * @slot title - Title content
 * @slot icon - Icon content
 *
 * @fires submenu-toggle - Dispatched when sub-menu is opened/closed
 */
export declare class MXSubMenu extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Unique key for the sub-menu
     */
    key: string;
    /**
     * Title text
     */
    label?: string;
    /**
     * Whether sub-menu is disabled
     */
    disabled: boolean;
    /**
     * Whether sub-menu is open (controlled by parent)
     */
    isOpen: boolean;
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
    private popupVisible;
    updated(changedProperties: Map<string, any>): void;
    private updateChildren;
    private handleTitleClick;
    private handleMouseEnter;
    private handleMouseLeave;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-sub-menu': MXSubMenu;
    }
}
//# sourceMappingURL=mx-sub-menu.d.ts.map