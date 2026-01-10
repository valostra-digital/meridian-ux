import { LitElement } from 'lit';
export type NotificationType = 'success' | 'info' | 'warning' | 'error';
export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
/**
 * Notification component for displaying global notification messages.
 *
 * @element mx-notification
 *
 * @attr {string} message - Notification message text
 * @attr {string} description - Description content
 * @attr {NotificationType} type - Notification type: success, info, warning, error
 * @attr {NotificationPlacement} placement - Position on screen
 * @attr {number} duration - Auto-close duration in seconds (0 = no auto-close)
 * @attr {boolean} closable - Whether to show close button
 * @attr {boolean} show-icon - Whether to show type icon
 * @attr {boolean} open - Whether notification is visible
 *
 * @slot - Custom message content
 * @slot description - Custom description content
 * @slot icon - Custom icon
 * @slot btn - Custom action button
 *
 * @fires close - Dispatched when notification is closed
 *
 * @example
 * ```html
 * <mx-notification
 *   open
 *   type="success"
 *   message="Success"
 *   description="Operation completed successfully"
 * ></mx-notification>
 * ```
 */
export declare class MXNotification extends LitElement {
    static styles: import("lit").CSSResult;
    message: string;
    description: string;
    type?: NotificationType;
    placement: NotificationPlacement;
    duration: number;
    closable: boolean;
    showIcon: boolean;
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
        'mx-notification': MXNotification;
    }
}
//# sourceMappingURL=mx-notification.d.ts.map