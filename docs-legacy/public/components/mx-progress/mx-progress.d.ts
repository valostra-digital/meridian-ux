import { LitElement } from 'lit';
export type ProgressType = 'line' | 'circle' | 'dashboard';
export type ProgressStatus = 'success' | 'exception' | 'normal' | 'active';
export type ProgressSize = 'default' | 'small';
/**
 * Progress component for displaying progress of an operation.
 *
 * @element mx-progress
 *
 * @attr {number} percent - Progress percentage (0-100)
 * @attr {ProgressType} type - Progress type: line, circle, dashboard
 * @attr {ProgressStatus} status - Progress status: success, exception, normal, active
 * @attr {ProgressSize} size - Size: default, small
 * @attr {boolean} show-info - Whether to show progress text
 * @attr {number} stroke-width - Width of progress bar/circle
 * @attr {string} stroke-color - Color of progress bar
 * @attr {string} trail-color - Color of unfilled part
 * @attr {number} width - Canvas width for circle/dashboard (default 120)
 * @attr {number} gap-degree - Gap degree for dashboard (default 75)
 * @attr {number} gap-position - Gap position for dashboard: top, bottom, left, right
 *
 * @slot format - Custom progress text format
 *
 * @example
 * ```html
 * <!-- Line progress -->
 * <mx-progress percent="50"></mx-progress>
 *
 * <!-- Circle progress -->
 * <mx-progress type="circle" percent="75"></mx-progress>
 *
 * <!-- Dashboard -->
 * <mx-progress type="dashboard" percent="80"></mx-progress>
 *
 * <!-- Success state -->
 * <mx-progress percent="100" status="success"></mx-progress>
 *
 * <!-- Custom color -->
 * <mx-progress percent="60" stroke-color="#52c41a"></mx-progress>
 * ```
 */
export declare class MXProgress extends LitElement {
    static styles: import("lit").CSSResult;
    percent: number;
    type: ProgressType;
    status: ProgressStatus;
    size: ProgressSize;
    showInfo: boolean;
    strokeWidth?: number;
    strokeColor: string;
    trailColor: string;
    width: number;
    gapDegree: number;
    gapPosition: 'top' | 'bottom' | 'left' | 'right';
    private get actualStatus();
    private get progressColor();
    private renderLineProgress;
    private renderCircleProgress;
    private renderDashboardProgress;
    private renderText;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-progress': MXProgress;
    }
}
//# sourceMappingURL=mx-progress.d.ts.map