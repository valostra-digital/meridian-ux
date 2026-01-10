import { LitElement } from 'lit';
export type ModalWidth = number | string;
/**
 * Modal component for dialog boxes.
 *
 * @element mx-modal
 *
 * @attr {boolean} open - Whether modal is visible
 * @attr {string} title - Modal title
 * @attr {ModalWidth} width - Width of modal (default 520px)
 * @attr {boolean} centered - Whether modal is vertically centered
 * @attr {boolean} closable - Whether to show close button
 * @attr {boolean} mask - Whether to show overlay mask
 * @attr {boolean} mask-closable - Whether clicking mask closes modal
 * @attr {boolean} keyboard - Whether ESC key closes modal
 * @attr {number} z-index - CSS z-index
 * @attr {string} ok-text - Text for OK button
 * @attr {string} cancel-text - Text for Cancel button
 * @attr {boolean} confirm-loading - Whether OK button is loading
 *
 * @slot - Modal content
 * @slot title - Custom title content
 * @slot footer - Custom footer content
 *
 * @fires ok - Dispatched when OK button clicked
 * @fires cancel - Dispatched when cancel/close clicked
 *
 * @example
 * ```html
 * <mx-modal open title="Modal Title">
 *   <p>Modal content</p>
 * </mx-modal>
 * ```
 */
export declare class MXModal extends LitElement {
    static styles: import("lit").CSSResult;
    open: boolean;
    title: string;
    width: ModalWidth;
    centered: boolean;
    closable: boolean;
    mask: boolean;
    maskClosable: boolean;
    keyboard: boolean;
    zIndex: number;
    okText: string;
    cancelText: string;
    confirmLoading: boolean;
    private animating;
    private handleOk;
    private handleCancel;
    private handleMaskClick;
    private handleKeyDown;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<1> | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-modal': MXModal;
    }
}
//# sourceMappingURL=mx-modal.d.ts.map