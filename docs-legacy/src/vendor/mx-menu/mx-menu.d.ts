import { LitElement } from 'lit';
export type MenuMode = 'vertical' | 'horizontal' | 'inline';
export type MenuTheme = 'light' | 'dark';
/**
 * Menu component - Navigation menu
 *
 * @element mx-menu
 *
 * @slot - Menu items and sub-menus
 *
 * @fires select - Dispatched when menu item is selected
 * @fires open-change - Dispatched when sub-menu open state changes
 */
export declare class MXMenu extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Menu mode
     */
    mode: MenuMode;
    /**
     * Theme
     */
    theme: MenuTheme;
    /**
     * Selected keys
     */
    selectedKeys: string[];
    /**
     * Default selected keys
     */
    defaultSelectedKeys: string[];
    /**
     * Open keys (for sub-menus)
     */
    openKeys: string[];
    /**
     * Default open keys
     */
    defaultOpenKeys: string[];
    /**
     * Whether menu is collapsed (inline mode)
     */
    inlineCollapsed: boolean;
    /**
     * Indent for inline sub-menus
     */
    inlineIndent: number;
    /**
     * Whether to allow multiple open sub-menus
     */
    multiple: boolean;
    /**
     * Whether sub-menus open on hover
     */
    triggerSubMenuAction: boolean;
    private internalSelectedKeys;
    private internalOpenKeys;
    connectedCallback(): void;
    updated(changedProperties: Map<string, any>): void;
    private get currentSelectedKeys();
    private get currentOpenKeys();
    private updateChildren;
    handleItemSelect(e: CustomEvent): void;
    handleSubMenuToggle(e: CustomEvent): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-menu': MXMenu;
    }
}
//# sourceMappingURL=mx-menu.d.ts.map