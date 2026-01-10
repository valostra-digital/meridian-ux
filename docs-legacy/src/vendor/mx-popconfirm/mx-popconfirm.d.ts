import { LitElement } from 'lit';
export type PopconfirmPlacement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom';
/**
 * Popconfirm component - A simple confirmation dialog that appears on hover/click.
 *
 * @element mx-popconfirm
 *
 * @attr {string} title - The confirmation title
 * @attr {string} description - Additional description text
 * @attr {string} ok-text - Text for confirm button
 * @attr {string} cancel-text - Text for cancel button
 * @attr {string} ok-type - Button type for confirm: default, primary, danger
 * @attr {PopconfirmPlacement} placement - Popover placement
 * @attr {boolean} open - Whether popover is visible (controlled)
 * @attr {boolean} disabled - Whether popover is disabled
 * @attr {string} trigger - Trigger mode: click or hover
 * @attr {string} icon - Custom icon
 *
 * @slot - Default slot for trigger element
 * @slot title - Custom title slot
 * @slot description - Custom description slot
 * @slot icon - Custom icon slot
 *
 * @fires confirm - Fired when confirm button is clicked
 * @fires cancel - Fired when cancel button is clicked
 * @fires open-change - Fired when visibility changes
 *
 * @example
 * ```html
 * <mx-popconfirm title="Are you sure?" ok-text="Yes" cancel-text="No">
 *   <mx-button>Delete</mx-button>
 * </mx-popconfirm>
 * ```
 */
export declare class MXPopconfirm extends LitElement {
    static styles: import("lit").CSSResult;
    title: string;
    description: string;
    okText: string;
    cancelText: string;
    okType: 'default' | 'primary' | 'danger';
    placement: PopconfirmPlacement;
    open: boolean;
    disabled: boolean;
    trigger: 'click' | 'hover';
    icon: string;
    private internalOpen;
    private closeTimer?;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    private handleTriggerClick;
    private handleTriggerMouseEnter;
    private handleTriggerMouseLeave;
    private handlePopupMouseEnter;
    private handlePopupMouseLeave;
    private toggleOpen;
    private setOpen;
    private handleConfirm;
    private handleCancel;
    private handleDocumentClick;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private hasSlot;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-popconfirm': MXPopconfirm;
    }
}
//# sourceMappingURL=mx-popconfirm.d.ts.map