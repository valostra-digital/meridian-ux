import { LitElement } from 'lit';
export type DropdownPlacement = 'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight';
export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';
/**
 * Dropdown component for displaying a menu.
 *
 * @element mx-dropdown
 *
 * @attr {DropdownPlacement} placement - Position of dropdown
 * @attr {DropdownTrigger} trigger - How dropdown is triggered
 * @attr {boolean} visible - Whether dropdown is visible (controlled)
 * @attr {boolean} disabled - Whether dropdown is disabled
 * @attr {boolean} arrow - Whether to show arrow
 * @attr {number} mouse-enter-delay - Delay in seconds before showing (hover)
 * @attr {number} mouse-leave-delay - Delay in seconds before hiding (hover)
 *
 * @slot - Trigger element
 * @slot overlay - Dropdown menu content
 *
 * @fires visible-change - Dispatched when visibility changes
 *
 * @example
 * ```html
 * <mx-dropdown>
 *   <button slot="trigger">Dropdown</button>
 *   <div slot="overlay">
 *     <mx-menu>
 *       <mx-menu-item>Item 1</mx-menu-item>
 *       <mx-menu-item>Item 2</mx-menu-item>
 *     </mx-menu>
 *   </div>
 * </mx-dropdown>
 * ```
 */
export declare class MXDropdown extends LitElement {
    static styles: import("lit").CSSResult;
    placement: DropdownPlacement;
    trigger: DropdownTrigger;
    visible?: boolean;
    disabled: boolean;
    arrow: boolean;
    mouseEnterDelay: number;
    mouseLeaveDelay: number;
    private internalVisible;
    private position;
    private triggerElement?;
    private menuElement?;
    private enterTimeout?;
    private leaveTimeout?;
    private get isVisible();
    private handleMouseEnter;
    private handleMouseLeave;
    private handleClick;
    private handleContextMenu;
    private handleDocumentClick;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private show;
    private hide;
    private updatePosition;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-dropdown': MXDropdown;
    }
}
//# sourceMappingURL=mx-dropdown.d.ts.map