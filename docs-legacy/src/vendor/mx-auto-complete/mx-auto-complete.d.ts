import { LitElement } from 'lit';
export interface AutoCompleteOption {
    value: string;
    label?: string;
}
/**
 * AutoComplete component for input with suggestions.
 *
 * @element mx-auto-complete
 *
 * @attr {string} value - Current input value
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} disabled - Whether the input is disabled
 * @attr {string} size - Size: large, default, small
 * @attr {string} options - JSON string of options array
 * @attr {boolean} open - Whether dropdown is open
 *
 * @fires change - Fired when value changes
 * @fires select - Fired when option is selected
 * @fires search - Fired when searching
 *
 * @example
 * ```html
 * <mx-auto-complete
 *   placeholder="Search..."
 *   options='[{"value":"apple"},{"value":"banana"}]'
 * ></mx-auto-complete>
 * ```
 */
export declare class MXAutoComplete extends LitElement {
    static styles: import("lit").CSSResult;
    value: string;
    placeholder: string;
    disabled: boolean;
    size: 'large' | 'default' | 'small';
    options: string;
    open: boolean;
    private parsedOptions;
    private filteredOptions;
    updated(changedProperties: Map<string, any>): void;
    private filterOptions;
    private handleInput;
    private handleFocus;
    private handleBlur;
    private handleOptionClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-auto-complete': MXAutoComplete;
    }
}
//# sourceMappingURL=mx-auto-complete.d.ts.map