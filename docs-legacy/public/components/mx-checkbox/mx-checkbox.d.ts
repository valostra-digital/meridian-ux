import { LitElement } from 'lit';
/**
 * Checkbox component for selection.
 *
 * @element mx-checkbox
 *
 * @attr {boolean} checked - Whether checkbox is checked
 * @attr {boolean} indeterminate - Whether checkbox is in indeterminate state
 * @attr {boolean} disabled - Disabled state
 * @attr {string} value - Value of checkbox
 *
 * @fires change - Fired when checked state changes
 *
 * @slot - Label content
 *
 * @example
 * ```html
 * <mx-checkbox>Checkbox</mx-checkbox>
 * <mx-checkbox checked>Checked</mx-checkbox>
 * <mx-checkbox indeterminate>Indeterminate</mx-checkbox>
 * <mx-checkbox disabled>Disabled</mx-checkbox>
 * ```
 */
export declare class MXCheckbox extends LitElement {
    static styles: import("lit").CSSResult;
    checked: boolean;
    indeterminate: boolean;
    disabled: boolean;
    value: string;
    name: string;
    private handleChange;
    private handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-checkbox': MXCheckbox;
    }
}
//# sourceMappingURL=mx-checkbox.d.ts.map