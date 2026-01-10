import { LitElement, PropertyValues } from 'lit';
export type SelectSize = 'large' | 'middle' | 'small';
export type SelectVariant = 'outlined' | 'borderless' | 'filled';
export type SelectMode = 'multiple' | 'tags';
export interface SelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
    group?: string;
}
/**
 * Select component - Dropdown select with search
 *
 * @element mx-select
 *
 * @fires change - Dispatched when selection changes
 * @fires search - Dispatched when search input changes
 * @fires dropdown-visible-change - Dispatched when dropdown opens/closes
 *
 * @slot - Option elements (mx-option)
 */
export declare class MXSelect extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Options array
     */
    options: SelectOption[];
    /**
     * Selected value(s)
     */
    value?: string | number | (string | number)[];
    /**
     * Default value
     */
    defaultValue?: string | number | (string | number)[];
    /**
     * Placeholder text
     */
    placeholder: string;
    /**
     * Whether to show search
     */
    showSearch: boolean;
    /**
     * Whether to allow clear
     */
    allowClear: boolean;
    /**
     * Size
     */
    size: SelectSize;
    /**
     * Variant
     */
    variant: SelectVariant;
    /**
     * Status
     */
    status?: 'error' | 'warning';
    /**
     * Whether disabled
     */
    disabled: boolean;
    /**
     * Mode (multiple or tags)
     */
    mode?: SelectMode;
    /**
     * Loading state
     */
    loading: boolean;
    /**
     * Max tag count (multiple mode)
     */
    maxTagCount?: number;
    /**
     * Filter option function
     */
    filterOption?: (input: string, option: SelectOption) => boolean;
    private open;
    private focused;
    private searchValue;
    private internalValue;
    private searchInput?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changedProperties: PropertyValues): void;
    private initializeValue;
    private handleDocumentClick;
    private handleSelectorClick;
    private handleOptionClick;
    private handleClear;
    private handleRemoveTag;
    private handleSearchInput;
    private getFilteredOptions;
    private getSelectedOptions;
    private renderSelection;
    private renderDropdownOptions;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-select': MXSelect;
    }
}
//# sourceMappingURL=mx-select.d.ts.map