import { LitElement } from 'lit';
export type AlertType = 'success' | 'info' | 'warning' | 'error';
/**
 * Alert component for displaying important messages.
 *
 * @element mx-alert
 *
 * @attr {AlertType} type - Type of alert: success, info, warning, error
 * @attr {string} message - Alert message text
 * @attr {string} description - Additional description text
 * @attr {boolean} closable - Whether alert can be closed
 * @attr {boolean} show-icon - Whether to show type icon
 * @attr {boolean} banner - Display as banner (full width, no border)
 * @attr {string} close-text - Custom close button text
 *
 * @slot - Default message content (overrides message property)
 * @slot description - Description content (overrides description property)
 * @slot icon - Custom icon
 * @slot action - Extra action button area
 * @slot close-icon - Custom close icon
 *
 * @fires close - Dispatched when alert is closed
 *
 * @example
 * ```html
 * <!-- Success alert -->
 * <mx-alert type="success" message="Success Text"></mx-alert>
 *
 * <!-- With description -->
 * <mx-alert
 *   type="info"
 *   message="Info Text"
 *   description="Detailed info description"
 *   show-icon
 * ></mx-alert>
 *
 * <!-- Closable -->
 * <mx-alert
 *   type="warning"
 *   message="Warning"
 *   closable
 * ></mx-alert>
 *
 * <!-- Banner mode -->
 * <mx-alert
 *   type="error"
 *   message="Error"
 *   banner
 * ></mx-alert>
 * ```
 */
export declare class MXAlert extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Type of alert
     */
    type: AlertType;
    /**
     * Alert message text
     */
    message: string;
    /**
     * Additional description text
     */
    description: string;
    /**
     * Whether alert can be closed
     */
    closable: boolean;
    /**
     * Whether to show type icon
     */
    showIcon: boolean;
    /**
     * Display as banner (full width, no border)
     */
    banner: boolean;
    /**
     * Custom close button text
     */
    closeText: string;
    private visible;
    private closing;
    private handleClose;
    private renderIcon;
    private renderCloseButton;
    render(): import("lit-html").TemplateResult<1> | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-alert': MXAlert;
    }
}
//# sourceMappingURL=mx-alert.d.ts.map