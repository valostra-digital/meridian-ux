import { LitElement } from 'lit';
export interface SegmentedOption {
    label: string;
    value: string;
    disabled?: boolean;
    icon?: string;
}
export type SegmentedSize = 'large' | 'default' | 'small';
/**
 * Segmented control component for selecting between options.
 *
 * @element mx-segmented
 *
 * @attr {string} value - Currently selected value
 * @attr {SegmentedSize} size - Size of the control: large, default, small
 * @attr {boolean} disabled - Whether the control is disabled
 * @attr {boolean} block - Whether to fit full width
 * @attr {string} options - JSON string of options array
 *
 * @fires change - Fired when selection changes
 *
 * @example
 * ```html
 * <mx-segmented
 *   options='[{"label":"Daily","value":"day"},{"label":"Weekly","value":"week"}]'
 *   value="day"
 * ></mx-segmented>
 * ```
 */
export declare class MXSegmented extends LitElement {
    static styles: import("lit").CSSResult;
    value: string;
    size: SegmentedSize;
    disabled: boolean;
    block: boolean;
    options: string;
    private parsedOptions;
    updated(changedProperties: Map<string, any>): void;
    private handleItemClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-segmented': MXSegmented;
    }
}
//# sourceMappingURL=mx-segmented.d.ts.map