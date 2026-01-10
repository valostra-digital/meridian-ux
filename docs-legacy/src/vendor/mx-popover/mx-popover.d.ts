import { LitElement } from 'lit';
export type PopoverPlacement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom';
export type PopoverTrigger = 'hover' | 'focus' | 'click';
/**
 * Popover component for displaying rich content in a popup.
 *
 * @element mx-popover
 *
 * @attr {string} title - Popover title
 * @attr {string} content - Popover content text
 * @attr {PopoverPlacement} placement - Position relative to target
 * @attr {PopoverTrigger} trigger - How popover is triggered
 * @attr {boolean} visible - Whether popover is visible (controlled)
 * @attr {boolean} arrow - Whether to show arrow
 * @attr {number} mouse-enter-delay - Delay before showing (hover)
 * @attr {number} mouse-leave-delay - Delay before hiding (hover)
 *
 * @slot - Target element
 * @slot title - Custom title content
 * @slot content - Custom popover content
 *
 * @fires visible-change - Dispatched when visibility changes
 *
 * @example
 * ```html
 * <mx-popover title="Title" content="Content text">
 *   <button>Click me</button>
 * </mx-popover>
 * ```
 */
export declare class MXPopover extends LitElement {
    static styles: import("lit").CSSResult;
    title: string;
    content: string;
    placement: PopoverPlacement;
    trigger: PopoverTrigger;
    visible?: boolean;
    arrow: boolean;
    mouseEnterDelay: number;
    mouseLeaveDelay: number;
    private internalVisible;
    private position;
    private triggerElement?;
    private contentElement?;
    private enterTimeout?;
    private leaveTimeout?;
    private get isVisible();
    private handleMouseEnter;
    private handleMouseLeave;
    private handleFocus;
    private handleBlur;
    private handleClick;
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
        'mx-popover': MXPopover;
    }
}
//# sourceMappingURL=mx-popover.d.ts.map