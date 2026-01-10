import { LitElement } from 'lit';
export type MessageType = 'success' | 'info' | 'warning' | 'error' | 'loading';
/**
 * Message component for displaying lightweight global feedback.
 *
 * @element mx-message
 *
 * @attr {string} content - Message content text
 * @attr {MessageType} type - Message type: success, info, warning, error, loading
 * @attr {number} duration - Auto-close duration in seconds (0 = no auto-close)
 * @attr {boolean} open - Whether message is visible
 *
 * @slot - Custom message content
 * @slot icon - Custom icon
 *
 * @fires close - Dispatched when message is closed
 *
 * @example
 * ```html
 * <mx-message open type="success" content="Success message"></mx-message>
 * ```
 */
export declare class MXMessage extends LitElement {
    static styles: import("lit").CSSResult;
    content: string;
    type?: MessageType;
    duration: number;
    open: boolean;
    private closing;
    private closeTimer?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    private startCloseTimer;
    private clearCloseTimer;
    private handleClose;
    private renderIcon;
    render(): import("lit-html").TemplateResult<1> | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-message': MXMessage;
    }
}
//# sourceMappingURL=mx-message.d.ts.map