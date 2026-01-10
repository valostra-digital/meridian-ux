import { LitElement } from 'lit';
/**
 * Statistic component for displaying statistical data.
 *
 * @element mx-statistic
 *
 * @attr {string} title - Statistic title
 * @attr {string|number} value - Statistic value
 * @attr {string} prefix - Prefix text or icon
 * @attr {string} suffix - Suffix text or icon
 * @attr {number} precision - Decimal precision for numbers
 * @attr {string} value-style - Custom CSS for value
 *
 * @slot - Custom content
 * @slot title - Custom title content
 * @slot prefix - Custom prefix content
 * @slot suffix - Custom suffix content
 *
 * @example
 * ```html
 * <mx-statistic title="Active Users" value="1234"></mx-statistic>
 * <mx-statistic title="Growth" value="50.52" suffix="%"></mx-statistic>
 * ```
 */
export declare class MXStatistic extends LitElement {
    static styles: import("lit").CSSResult;
    title: string;
    value: string | number;
    prefix: string;
    suffix: string;
    precision?: number;
    valueStyle: string;
    private formatValue;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-statistic': MXStatistic;
    }
}
//# sourceMappingURL=mx-statistic.d.ts.map