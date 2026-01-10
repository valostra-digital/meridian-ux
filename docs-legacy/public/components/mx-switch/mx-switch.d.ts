import { LitElement } from 'lit';
export type SwitchSize = 'small' | 'default';
/**
 * Switch component for toggle operations.
 *
 * @element mx-switch
 *
 * @attr {boolean} checked - Whether switch is on
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} loading - Loading state
 * @attr {SwitchSize} size - Switch size: small, default
 * @attr {string} checked-children - Text to display when checked
 * @attr {string} un-checked-children - Text to display when unchecked
 *
 * @fires change - Fired when checked state changes
 *
 * @slot checked - Content to display when checked
 * @slot unchecked - Content to display when unchecked
 *
 * @example
 * ```html
 * <mx-switch></mx-switch>
 * <mx-switch checked></mx-switch>
 * <mx-switch disabled></mx-switch>
 * <mx-switch loading></mx-switch>
 * <mx-switch size="small"></mx-switch>
 * <mx-switch checked-children="ON" un-checked-children="OFF"></mx-switch>
 * ```
 */
export declare class MXSwitch extends LitElement {
    static styles: import("lit").CSSResult;
    checked: boolean;
    disabled: boolean;
    loading: boolean;
    size: SwitchSize;
    checkedChildren: string;
    unCheckedChildren: string;
    value: string;
    name: string;
    private handleChange;
    private handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-switch': MXSwitch;
    }
}
//# sourceMappingURL=mx-switch.d.ts.map