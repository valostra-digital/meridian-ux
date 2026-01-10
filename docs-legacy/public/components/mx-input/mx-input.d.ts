import { LitElement } from 'lit';
export type InputVariant = 'outlined' | 'filled' | 'borderless' | 'underlined';
export type InputSize = 'small' | 'middle' | 'large';
export type InputStatus = 'error' | 'warning' | '';
/**
 * Input component for text entry.
 *
 * @element mx-input
 *
 * @attr {InputVariant} variant - Input variant: outlined, filled, borderless, underlined
 * @attr {InputSize} size - Input size: small, middle, large
 * @attr {InputStatus} status - Validation status: error, warning
 * @attr {string} value - Input value
 * @attr {string} default-value - Default input value
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} allow-clear - Show clear button
 * @attr {boolean} show-count - Show character count
 * @attr {number} max-length - Maximum character length
 * @attr {string} type - Input type (text, password, email, etc.)
 *
 * @slot prefix - Prefix content (icon, text)
 * @slot suffix - Suffix content (icon, text)
 *
 * @fires change - Fired when input value changes
 * @fires input - Fired when user types
 * @fires focus - Fired when input receives focus
 * @fires blur - Fired when input loses focus
 * @fires pressenter - Fired when Enter key is pressed
 * @fires clear - Fired when clear button is clicked
 *
 * @example
 * ```html
 * <!-- Basic input -->
 * <mx-input placeholder="Enter text"></mx-input>
 *
 * <!-- With prefix/suffix -->
 * <mx-input>
 *   <mx-icon slot="prefix" svg="..."></mx-icon>
 *   <span slot="suffix">.com</span>
 * </mx-input>
 *
 * <!-- With character count -->
 * <mx-input show-count max-length="100"></mx-input>
 *
 * <!-- With clear button -->
 * <mx-input allow-clear></mx-input>
 *
 * <!-- Different variants -->
 * <mx-input variant="filled"></mx-input>
 * <mx-input variant="borderless"></mx-input>
 * ```
 */
export declare class MXInput extends LitElement {
    static styles: import("lit").CSSResult;
    variant: InputVariant;
    size: InputSize;
    status: InputStatus;
    value: string;
    defaultValue: string;
    placeholder: string;
    disabled: boolean;
    allowClear: boolean;
    showCount: boolean;
    maxLength?: number;
    type: string;
    name: string;
    autocomplete: string;
    private inputElement;
    private focused;
    private internalValue;
    connectedCallback(): void;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    private handleInput;
    private handleChange;
    private handleFocus;
    private handleBlur;
    private handleKeyDown;
    private handleClear;
    /**
     * Focus the input
     */
    focus(): void;
    /**
     * Blur the input
     */
    blur(): void;
    render(): import("lit-html").TemplateResult<1>;
    private hasSlot;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-input': MXInput;
    }
}
//# sourceMappingURL=mx-input.d.ts.map