import { LitElement } from 'lit';
export interface MentionOption {
    value: string;
    label?: string;
}
/**
 * Mention component for @ mentions in text input.
 *
 * @element mx-mention
 *
 * @attr {string} value - Current textarea value
 * @attr {string} placeholder - Placeholder text
 * @attr {string} prefix - Trigger character (default @)
 * @attr {string} options - JSON string of mention options
 * @attr {number} rows - Number of rows for textarea
 * @attr {boolean} disabled - Whether the input is disabled
 *
 * @fires change - Fired when value changes
 * @fires select - Fired when mention is selected
 * @fires search - Fired when searching for mentions
 *
 * @example
 * ```html
 * <mx-mention
 *   placeholder="Type @ to mention"
 *   options='[{"value":"user1","label":"John Doe"}]'
 * ></mx-mention>
 * ```
 */
export declare class MXMention extends LitElement {
    static styles: import("lit").CSSResult;
    value: string;
    placeholder: string;
    prefix: string;
    options: string;
    rows: number;
    disabled: boolean;
    private parsedOptions;
    private filteredOptions;
    private showDropdown;
    private dropdownPosition;
    private activeIndex;
    private mentionSearch;
    updated(changedProperties: Map<string, any>): void;
    private handleInput;
    private checkForMention;
    private filterOptions;
    private updateDropdownPosition;
    private handleOptionClick;
    private insertMention;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-mention': MXMention;
    }
}
//# sourceMappingURL=mx-mention.d.ts.map