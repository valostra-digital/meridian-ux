import { LitElement } from 'lit';
export type TooltipPlacement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom';
export type TooltipTrigger = 'hover' | 'focus' | 'click';
/**
 * Tooltip component for displaying helpful text on hover/focus/click.
 *
 * @element mx-tooltip
 *
 * @attr {string} title - Tooltip text content
 * @attr {TooltipPlacement} placement - Position of tooltip relative to target
 * @attr {TooltipTrigger} trigger - How tooltip is triggered: hover, focus, click
 * @attr {boolean} visible - Whether tooltip is visible (controlled mode)
 * @attr {boolean} arrow - Whether to show arrow pointer
 * @attr {string} color - Background color of tooltip
 * @attr {number} mouse-enter-delay - Delay in seconds before showing (hover)
 * @attr {number} mouse-leave-delay - Delay in seconds before hiding (hover)
 *
 * @slot - Target element that triggers tooltip
 * @slot content - Custom tooltip content (overrides title property)
 *
 * @fires visible-change - Dispatched when visibility changes
 *
 * @example
 * ```html
 * <!-- Basic tooltip -->
 * <mx-tooltip title="Tooltip text">
 *   <button>Hover me</button>
 * </mx-tooltip>
 *
 * <!-- Different placements -->
 * <mx-tooltip title="Top" placement="top">
 *   <button>Top</button>
 * </mx-tooltip>
 *
 * <!-- Click trigger -->
 * <mx-tooltip title="Click to show" trigger="click">
 *   <button>Click me</button>
 * </mx-tooltip>
 *
 * <!-- Custom color -->
 * <mx-tooltip title="Custom" color="#f50">
 *   <button>Red tooltip</button>
 * </mx-tooltip>
 * ```
 */
export declare class MXTooltip extends LitElement {
    static styles: import("lit").CSSResult;
    title: string;
    placement: TooltipPlacement;
    trigger: TooltipTrigger;
    visible?: boolean;
    arrow: boolean;
    color: string;
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
        'mx-tooltip': MXTooltip;
    }
}
//# sourceMappingURL=mx-tooltip.d.ts.map