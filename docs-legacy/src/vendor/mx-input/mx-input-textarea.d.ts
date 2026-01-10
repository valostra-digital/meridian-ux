import { LitElement } from 'lit';
import type { InputStatus } from './mx-input.js';
export interface AutoSizeConfig {
    minRows?: number;
    maxRows?: number;
}
/**
 * TextArea component for multi-line text entry.
 *
 * @element mx-input-textarea
 *
 * @attr {InputStatus} status - Validation status
 * @attr {string} value - Input value
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} allow-clear - Show clear button
 * @attr {boolean} show-count - Show character count
 * @attr {number} max-length - Maximum character length
 * @attr {number} rows - Number of rows
 * @attr {boolean|object} auto-size - Auto-size configuration
 *
 * @fires change - Fired when input value changes
 * @fires input - Fired when user types
 *
 * @example
 * ```html
 * <mx-input-textarea placeholder="Enter text" rows="4"></mx-input-textarea>
 * <mx-input-textarea auto-size show-count max-length="200"></mx-input-textarea>
 * ```
 */
export declare class MXInputTextarea extends LitElement {
    static styles: import("lit").CSSResult;
    status: InputStatus;
    value: string;
    placeholder: string;
    disabled: boolean;
    showCount: boolean;
    maxLength?: number;
    rows: number;
    autoSize?: boolean | AutoSizeConfig;
    private textareaElement;
    private internalValue;
    connectedCallback(): void;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    private adjustHeight;
    private handleInput;
    private handleChange;
    focus(): void;
    blur(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-input-textarea': MXInputTextarea;
    }
}
//# sourceMappingURL=mx-input-textarea.d.ts.map