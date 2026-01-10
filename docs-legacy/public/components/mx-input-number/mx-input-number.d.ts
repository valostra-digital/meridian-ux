import { LitElement } from 'lit';
export type InputNumberSize = 'small' | 'middle' | 'large';
export type InputNumberStatus = 'error' | 'warning' | '';
export type InputNumberVariant = 'outlined' | 'filled' | 'borderless';
/**
 * InputNumber component for numeric input with increment/decrement controls.
 *
 * @element mx-input-number
 *
 * @attr {InputNumberSize} size - Input size: small, middle, large
 * @attr {InputNumberStatus} status - Validation status: error, warning
 * @attr {InputNumberVariant} variant - Input variant: outlined, filled, borderless
 * @attr {number} value - Current value
 * @attr {number} default-value - Default value
 * @attr {number} min - Minimum value
 * @attr {number} max - Maximum value
 * @attr {number} step - Step for increment/decrement
 * @attr {number} precision - Number of decimal places
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} controls - Show increment/decrement controls
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} keyboard - Enable keyboard input
 * @attr {string} controls-position - Position of controls: right (default) or updown
 *
 * @slot prefix - Prefix content
 * @slot suffix - Suffix content
 *
 * @fires change - Fired when value changes
 * @fires blur - Fired when input loses focus
 * @fires focus - Fired when input receives focus
 * @fires step - Fired when stepping up/down
 *
 * @example
 * ```html
 * <!-- Basic input number -->
 * <mx-input-number value="10"></mx-input-number>
 *
 * <!-- With min and max -->
 * <mx-input-number min="0" max="100" value="50"></mx-input-number>
 *
 * <!-- With custom step -->
 * <mx-input-number step="0.1" precision="2"></mx-input-number>
 *
 * <!-- Without controls -->
 * <mx-input-number :controls="false"></mx-input-number>
 *
 * <!-- With prefix/suffix -->
 * <mx-input-number>
 *   <span slot="prefix">$</span>
 *   <span slot="suffix">.00</span>
 * </mx-input-number>
 * ```
 */
export declare class MXInputNumber extends LitElement {
    static styles: import("lit").CSSResult;
    size: InputNumberSize;
    status: InputNumberStatus;
    variant: InputNumberVariant;
    value?: number;
    defaultValue?: number;
    min: number;
    max: number;
    step: number;
    precision?: number;
    disabled: boolean;
    controls: boolean;
    placeholder: string;
    keyboard: boolean;
    controlsPosition: 'right' | 'updown';
    private inputElement;
    private focused;
    private internalValue;
    connectedCallback(): void;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    private formatNumber;
    private parseNumber;
    private clampValue;
    private handleInput;
    private handleChange;
    private handleFocus;
    private handleBlur;
    private handleKeyDown;
    private stepUp;
    private stepDown;
    private dispatchChangeEvent;
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
        'mx-input-number': MXInputNumber;
    }
}
//# sourceMappingURL=mx-input-number.d.ts.map