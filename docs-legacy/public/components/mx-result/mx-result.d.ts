import { LitElement } from 'lit';
export type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';
/**
 * Result component for displaying operation results.
 *
 * @element mx-result
 *
 * @attr {ResultStatus} status - Result status type
 * @attr {string} title - Result title
 * @attr {string} sub-title - Result subtitle/description
 *
 * @slot - Custom content area
 * @slot icon - Custom icon
 * @slot title - Custom title
 * @slot subTitle - Custom subtitle
 * @slot extra - Extra actions (usually buttons)
 *
 * @example
 * ```html
 * <mx-result
 *   status="success"
 *   title="Success"
 *   sub-title="Operation completed successfully"
 * ></mx-result>
 * ```
 */
export declare class MXResult extends LitElement {
    static styles: import("lit").CSSResult;
    status: ResultStatus;
    title: string;
    subTitle: string;
    private renderSuccessIcon;
    private renderErrorIcon;
    private renderInfoIcon;
    private renderWarningIcon;
    private render404Icon;
    private render403Icon;
    private render500Icon;
    private renderIcon;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-result': MXResult;
    }
}
//# sourceMappingURL=mx-result.d.ts.map