import { LitElement } from 'lit';
import type { InputVariant, InputSize, InputStatus } from './mx-input.js';
/**
 * Password input component with visibility toggle.
 *
 * @element mx-input-password
 *
 * @attr {InputVariant} variant - Input variant
 * @attr {InputSize} size - Input size
 * @attr {InputStatus} status - Validation status
 * @attr {string} value - Input value
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} visibility-toggle - Show visibility toggle button
 *
 * @fires change - Fired when input value changes
 * @fires input - Fired when user types
 *
 * @example
 * ```html
 * <mx-input-password placeholder="Enter password"></mx-input-password>
 * <mx-input-password visibility-toggle placeholder="Password"></mx-input-password>
 * ```
 */
export declare class MXInputPassword extends LitElement {
    static styles: import("lit").CSSResult;
    variant: InputVariant;
    size: InputSize;
    status: InputStatus;
    value: string;
    placeholder: string;
    disabled: boolean;
    visibilityToggle: boolean;
    private visible;
    private inputElement;
    private toggleVisibility;
    private handleInput;
    private handleChange;
    focus(): void;
    blur(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-input-password': MXInputPassword;
    }
}
//# sourceMappingURL=mx-input-password.d.ts.map