import { LitElement } from 'lit';
export type BadgeStatus = 'success' | 'processing' | 'default' | 'error' | 'warning';
export type BadgeSize = 'default' | 'small';
/**
 * Badge component for displaying status or count.
 *
 * @element mx-badge
 *
 * @attr {number|string} count - Number to show in badge
 * @attr {boolean} dot - Whether to show a dot instead of count
 * @attr {number} overflow-count - Max count to show (shows count+ when exceeded)
 * @attr {boolean} show-zero - Whether to show badge when count is zero
 * @attr {BadgeStatus} status - Status type: success, processing, default, error, warning
 * @attr {string} text - Text to display next to status dot
 * @attr {string} color - Custom badge color
 * @attr {BadgeSize} size - Size of badge: default, small
 * @attr {number} offset-x - Horizontal offset in pixels
 * @attr {number} offset-y - Vertical offset in pixels
 *
 * @slot - Wrapped element to attach badge to
 * @slot count - Custom badge content
 *
 * @example
 * ```html
 * <!-- Count badge -->
 * <mx-badge count="5">
 *   <button>Notifications</button>
 * </mx-badge>
 *
 * <!-- Dot badge -->
 * <mx-badge dot>
 *   <mx-icon name="notification"></mx-icon>
 * </mx-badge>
 *
 * <!-- Status badge -->
 * <mx-badge status="success" text="Success"></mx-badge>
 *
 * <!-- Overflow -->
 * <mx-badge count="100" overflow-count="99">
 *   <button>Messages</button>
 * </mx-badge>
 * ```
 */
export declare class MXBadge extends LitElement {
    static styles: import("lit").CSSResult;
    count?: number;
    dot: boolean;
    overflowCount: number;
    showZero: boolean;
    status?: BadgeStatus;
    text: string;
    color: string;
    size: BadgeSize;
    offsetX: number;
    offsetY: number;
    private get displayCount();
    private get shouldShowBadge();
    private renderStatusBadge;
    private renderBadge;
    render(): import("lit-html").TemplateResult<1> | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-badge': MXBadge;
    }
}
//# sourceMappingURL=mx-badge.d.ts.map