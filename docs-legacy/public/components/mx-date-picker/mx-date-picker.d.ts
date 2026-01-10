import { LitElement } from 'lit';
export type DatePickerSize = 'small' | 'middle' | 'large';
export type DatePickerMode = 'date' | 'week' | 'month' | 'quarter' | 'year';
/**
 * DatePicker component - Date selection input with calendar.
 *
 * @element mx-date-picker
 *
 * @attr {DatePickerSize} size - Input size: small, middle, large
 * @attr {string} value - Current date value (YYYY-MM-DD format)
 * @attr {string} default-value - Default date value
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} disabled - Disabled state
 * @attr {DatePickerMode} picker - Picker mode: date, week, month, quarter, year
 * @attr {boolean} allow-clear - Show clear button
 * @attr {boolean} show-today - Show "Today" button
 * @attr {string} format - Date display format
 *
 * @fires change - Fired when date value changes
 * @fires ok - Fired when OK button is clicked
 * @fires panel-change - Fired when panel changes
 *
 * @example
 * ```html
 * <mx-date-picker value="2024-01-15"></mx-date-picker>
 * <mx-date-picker picker="month"></mx-date-picker>
 * <mx-date-picker picker="year"></mx-date-picker>
 * ```
 */
export declare class MXDatePicker extends LitElement {
    static styles: import("lit").CSSResult;
    size: DatePickerSize;
    value: string;
    defaultValue: string;
    placeholder: string;
    disabled: boolean;
    picker: DatePickerMode;
    allowClear: boolean;
    showToday: boolean;
    format: string;
    private open;
    private viewDate;
    private selectedDate?;
    private panelMode;
    private inputWrapper;
    private weekdays;
    private months;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private parseDate;
    private formatDate;
    private handleInputClick;
    private handleDocumentClick;
    private handleClear;
    private selectDate;
    private selectMonth;
    private selectYear;
    private prevMonth;
    private nextMonth;
    private prevYear;
    private nextYear;
    private handleToday;
    private getDaysInMonth;
    private getFirstDayOfMonth;
    private isSameDay;
    private renderCalendar;
    private renderMonthPanel;
    private renderYearPanel;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-date-picker': MXDatePicker;
    }
}
//# sourceMappingURL=mx-date-picker.d.ts.map