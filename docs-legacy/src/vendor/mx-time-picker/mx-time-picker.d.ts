import { LitElement } from 'lit';
export type TimePickerSize = 'small' | 'middle' | 'large';
export type TimePickerFormat = '12' | '24';
/**
 * TimePicker component - Time selection input.
 *
 * @element mx-time-picker
 *
 * @attr {TimePickerSize} size - Input size: small, middle, large
 * @attr {string} value - Current time value (HH:mm:ss format)
 * @attr {string} default-value - Default time value
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} disabled - Disabled state
 * @attr {TimePickerFormat} format - Time format: 12 or 24 hour
 * @attr {boolean} use-12-hours - Use 12-hour format
 * @attr {boolean} allow-clear - Show clear button
 * @attr {number} hour-step - Hour step
 * @attr {number} minute-step - Minute step
 * @attr {number} second-step - Second step
 * @attr {boolean} show-now - Show "Now" button
 *
 * @fires change - Fired when time value changes
 * @fires ok - Fired when OK button is clicked
 *
 * @example
 * ```html
 * <mx-time-picker value="12:30:00"></mx-time-picker>
 * <mx-time-picker use-12-hours></mx-time-picker>
 * ```
 */
export declare class MXTimePicker extends LitElement {
    static styles: import("lit").CSSResult;
    size: TimePickerSize;
    value: string;
    defaultValue: string;
    placeholder: string;
    disabled: boolean;
    format: TimePickerFormat;
    use12Hours: boolean;
    allowClear: boolean;
    hourStep: number;
    minuteStep: number;
    secondStep: number;
    showNow: boolean;
    private open;
    private selectedHour;
    private selectedMinute;
    private selectedSecond;
    private selectedPeriod;
    private inputWrapper;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private parseValue;
    private formatValue;
    private formatDisplay;
    private handleInputClick;
    private handleDocumentClick;
    private handleClear;
    private selectHour;
    private selectMinute;
    private selectSecond;
    private selectPeriod;
    private updateValue;
    private handleNowClick;
    private renderColumn;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-time-picker': MXTimePicker;
    }
}
//# sourceMappingURL=mx-time-picker.d.ts.map