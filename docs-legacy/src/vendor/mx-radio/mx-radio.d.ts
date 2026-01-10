import { LitElement } from 'lit';
/**
 * Radio component for single selection.
 *
 * @element mx-radio
 *
 * @attr {boolean} checked - Whether radio is checked
 * @attr {boolean} disabled - Disabled state
 * @attr {string} value - Value of radio
 * @attr {string} name - Name for radio group
 *
 * @fires change - Fired when checked state changes
 *
 * @slot - Label content
 *
 * @example
 * ```html
 * <mx-radio name="group1" value="1">Option 1</mx-radio>
 * <mx-radio name="group1" value="2">Option 2</mx-radio>
 * <mx-radio name="group1" value="3" checked>Option 3</mx-radio>
 * <mx-radio name="group1" value="4" disabled>Disabled</mx-radio>
 * ```
 */
export declare class MXRadio extends LitElement {
    static styles: import("lit").CSSResult;
    checked: boolean;
    disabled: boolean;
    value: string;
    name: string;
    private handleChange;
    private uncheckOthers;
    private handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-radio': MXRadio;
    }
}
//# sourceMappingURL=mx-radio.d.ts.map