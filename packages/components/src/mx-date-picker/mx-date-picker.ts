import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

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
 * @attr {boolean} range - Enable date range selection
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
@customElement('mx-date-picker')
export class MXDatePicker extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-date-picker {
      position: relative;
      display: inline-block;
      width: 100%;
    }

    .mx-date-picker-input-wrapper {
      position: relative;
      display: inline-flex;
      width: 100%;
      min-width: 0;
      padding: 4px 11px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      line-height: 1.5714285714285714;
      background-color: var(--mx-color-bg-container, #ffffff);
      border-width: 1px;
      border-style: solid;
      border-color: var(--mx-color-border, #d9d9d9);
      border-radius: var(--mx-border-radius, 6px);
      transition: all 0.2s;
      align-items: center;
      gap: 4px;
      cursor: pointer;
    }

    .mx-date-picker-input-wrapper:hover:not(.mx-date-picker-disabled) {
      border-color: var(--mx-color-primary-hover, #4096ff);
    }

    .mx-date-picker-focused:not(.mx-date-picker-disabled) .mx-date-picker-input-wrapper {
      border-color: var(--mx-color-primary, #1677ff);
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
      outline: 0;
    }

    .mx-date-picker-small .mx-date-picker-input-wrapper {
      padding: 0 7px;
    }

    .mx-date-picker-large .mx-date-picker-input-wrapper {
      padding: 7px 11px;
      font-size: var(--mx-font-size-lg, 16px);
    }

    .mx-date-picker-disabled .mx-date-picker-input-wrapper {
      color: rgba(0, 0, 0, 0.25);
      background-color: rgba(0, 0, 0, 0.04);
      border-color: #d9d9d9;
      cursor: not-allowed;
    }

    input {
      flex: 1;
      min-width: 0;
      margin: 0;
      padding: 0;
      color: inherit;
      font-size: inherit;
      line-height: inherit;
      background-color: transparent;
      border: none;
      outline: none;
      font-family: inherit;
      cursor: pointer;
    }

    input::placeholder {
      color: rgba(0, 0, 0, 0.25);
    }

    input:disabled {
      cursor: not-allowed;
    }

    .mx-date-picker-suffix {
      display: inline-flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.45);
    }

    .mx-date-picker-suffix svg {
      width: 14px;
      height: 14px;
      fill: currentColor;
    }

    .mx-date-picker-clear {
      display: inline-flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.25);
      cursor: pointer;
      transition: color 0.2s;
    }

    .mx-date-picker-clear:hover {
      color: rgba(0, 0, 0, 0.45);
    }

    /* Panel */
    .mx-date-picker-panel {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: 1050;
      background-color: var(--mx-color-bg-elevated, #ffffff);
      border-radius: var(--mx-border-radius-lg, 8px);
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
                  0 3px 6px -4px rgba(0, 0, 0, 0.12),
                  0 9px 28px 8px rgba(0, 0, 0, 0.05);
      opacity: 0;
      transform: scaleY(0.8);
      transform-origin: top;
      transition: opacity 0.2s, transform 0.2s;
      pointer-events: none;
      visibility: hidden;
      min-width: 280px;
    }

    .mx-date-picker-panel-range {
      min-width: 580px;
    }

    .mx-date-picker-panel-open {
      opacity: 1;
      transform: scaleY(1);
      pointer-events: auto;
      visibility: visible;
    }

    .mx-date-picker-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      border-bottom: 1px solid var(--mx-color-split, rgba(5, 5, 5, 0.06));
    }

    .mx-date-picker-header-label {
      font-weight: 500;
      cursor: pointer;
      user-select: none;
    }

    .mx-date-picker-header-label:hover {
      color: var(--mx-color-primary, #1677ff);
    }

    .mx-date-picker-header-nav {
      display: flex;
      gap: 4px;
    }

    .mx-date-picker-header-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border: none;
      background: transparent;
      color: rgba(0, 0, 0, 0.45);
      cursor: pointer;
      border-radius: var(--mx-border-radius-sm, 4px);
      transition: all 0.2s;
    }

    .mx-date-picker-header-btn:hover {
      background-color: rgba(0, 0, 0, 0.04);
      color: rgba(0, 0, 0, 0.88);
    }

    .mx-date-picker-header-btn svg {
      width: 12px;
      height: 12px;
      fill: currentColor;
    }

    .mx-date-picker-body {
      padding: 12px;
    }

    .mx-date-picker-body-range {
      display: flex;
      gap: 12px;
    }

    .mx-date-picker-calendar {
      width: 100%;
    }

    .mx-date-picker-calendar-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      margin-bottom: 8px;
    }

    .mx-date-picker-weekday {
      text-align: center;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
      padding: 4px 0;
    }

    .mx-date-picker-calendar-body {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }

    .mx-date-picker-cell {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      cursor: pointer;
      border-radius: var(--mx-border-radius-sm, 4px);
      transition: all 0.2s;
      user-select: none;
    }

    .mx-date-picker-cell:hover:not(.mx-date-picker-cell-disabled):not(.mx-date-picker-cell-selected) {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .mx-date-picker-cell-selected {
      background-color: var(--mx-color-primary, #1677ff);
      color: #ffffff;
    }

    .mx-date-picker-cell-today {
      border: 1px solid var(--mx-color-primary, #1677ff);
    }

    .mx-date-picker-cell-disabled {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }

    .mx-date-picker-cell-outside {
      color: rgba(0, 0, 0, 0.25);
    }

    .mx-date-picker-footer {
      border-top: 1px solid var(--mx-color-split, rgba(5, 5, 5, 0.06));
      padding: 8px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .mx-date-picker-today-btn {
      color: var(--mx-color-primary, #1677ff);
      cursor: pointer;
      font-size: var(--mx-font-size, 14px);
      border: none;
      background: transparent;
      padding: 0;
      transition: color 0.2s;
    }

    .mx-date-picker-today-btn:hover {
      color: var(--mx-color-primary-hover, #4096ff);
    }

    /* Month/Year picker */
    .mx-date-picker-month-panel,
    .mx-date-picker-year-panel {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      padding: 12px;
    }

    .mx-date-picker-month-cell,
    .mx-date-picker-year-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 48px;
      cursor: pointer;
      border-radius: var(--mx-border-radius, 6px);
      transition: all 0.2s;
      user-select: none;
    }

    .mx-date-picker-month-cell:hover,
    .mx-date-picker-year-cell:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .mx-date-picker-month-cell-selected,
    .mx-date-picker-year-cell-selected {
      background-color: var(--mx-color-primary, #1677ff);
      color: #ffffff;
    }

    /* Range styles */
    .mx-date-picker-cell-range-start,
    .mx-date-picker-cell-range-end {
      border-radius: var(--mx-border-radius-sm, 4px);
    }

    .mx-date-picker-cell-in-range {
      background-color: var(--mx-color-primary-bg, #e6f7ff);
      color: rgba(0, 0, 0, 0.88);
      border-radius: 0;
    }

    .mx-date-picker-cell-range-start.mx-date-picker-cell-in-range {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .mx-date-picker-cell-range-end.mx-date-picker-cell-in-range {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .mx-date-picker-cell-in-hover-range {
      background-color: var(--mx-color-primary-bg-hover, rgba(22, 119, 255, 0.1));
      color: rgba(0, 0, 0, 0.88);
      border-radius: 0;
    }
  `;

  @property({ type: String })
  size: DatePickerSize = 'middle';

  @property({ type: String })
  value = '';

  @property({ type: String, attribute: 'default-value' })
  defaultValue = '';

  @property({ type: String })
  placeholder = 'Select date';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  picker: DatePickerMode = 'date';

  @property({ type: Boolean, attribute: 'allow-clear' })
  allowClear = true;

  @property({ type: Boolean, attribute: 'show-today' })
  showToday = true;

  @property({ type: String })
  format = 'YYYY-MM-DD';

  @property({ type: Boolean })
  range = false;

  @state()
  private open = false;

  @state()
  private viewDate = new Date();

  @state()
  private selectedDate?: Date;

  @state()
  private endDate?: Date;

  @state()
  private hoverDate?: Date;

  @state()
  private panelMode: 'date' | 'month' | 'year' = 'date';

  @query('.mx-date-picker-input-wrapper')
  private inputWrapper!: HTMLElement;

  private weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  private months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  connectedCallback() {
    super.connectedCallback();

    if (this.value || this.defaultValue) {
      const val = this.value || this.defaultValue;
      if (this.range) {
        const dates = this.parseRange(val);
        if (dates) {
          this.selectedDate = dates[0];
          this.endDate = dates[1];
          this.viewDate = new Date(this.selectedDate);
        }
      } else {
        this.selectedDate = this.parseDate(val);
        if (this.selectedDate) {
          this.viewDate = new Date(this.selectedDate);
        }
      }
    }

    document.addEventListener('click', this.handleDocumentClick.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleDocumentClick.bind(this));
  }

  private parseDate(dateStr: string): Date | undefined {
    if (!dateStr) return undefined;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? undefined : date;
  }

  private parseRange(dateStr: string): [Date, Date] | undefined {
    if (!dateStr) return undefined;
    try {
      // Try parsing as JSON array first
      const parsed = JSON.parse(dateStr);
      if (Array.isArray(parsed) && parsed.length === 2) {
        const start = new Date(parsed[0]);
        const end = new Date(parsed[1]);
        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
          return [start, end];
        }
      }
    } catch (e) {
      // Not JSON, try splitting by comma
      const parts = dateStr.split(',');
      if (parts.length === 2) {
        const start = new Date(parts[0].trim());
        const end = new Date(parts[1].trim());
        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
          return [start, end];
        }
      }
    }
    return undefined;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return this.format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day);
  }

  private handleInputClick(e: Event) {
    if (this.disabled) return;
    e.stopPropagation();
    this.open = !this.open;
    this.panelMode = 'date';
  }

  private handleDocumentClick(e: MouseEvent) {
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.open = false;
    }
  }

  private handleClear(e: Event) {
    e.stopPropagation();
    this.value = '';
    this.selectedDate = undefined;
    this.endDate = undefined;

    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: '' },
      bubbles: true,
      composed: true
    }));
  }

  private selectDate(date: Date) {
    if (this.range) {
      if (!this.selectedDate || (this.selectedDate && this.endDate)) {
        // Start new selection
        this.selectedDate = date;
        this.endDate = undefined;
      } else {
        // Complete selection
        if (date < this.selectedDate) {
          this.endDate = this.selectedDate;
          this.selectedDate = date;
        } else {
          this.endDate = date;
        }
        this.open = false;

        const val = JSON.stringify([this.formatDate(this.selectedDate), this.formatDate(this.endDate!)]);
        this.value = val;

        this.dispatchEvent(new CustomEvent('change', {
          detail: { value: this.value, dates: [this.selectedDate, this.endDate] },
          bubbles: true,
          composed: true
        }));
      }
    } else {
      this.selectedDate = date;
      this.value = this.formatDate(date);

      this.dispatchEvent(new CustomEvent('change', {
        detail: { value: this.value, date },
        bubbles: true,
        composed: true
      }));

      this.open = false;
    }
  }

  private handleDateHover(date: Date) {
    if (this.range && this.selectedDate && !this.endDate) {
      this.hoverDate = date;
    }
  }

  private selectMonth(month: number) {
    this.viewDate = new Date(this.viewDate.getFullYear(), month, 1);
    this.panelMode = 'date';
    this.requestUpdate();
  }

  private selectYear(year: number) {
    this.viewDate = new Date(year, this.viewDate.getMonth(), 1);
    this.panelMode = 'month';
    this.requestUpdate();
  }

  private prevMonth() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
    this.requestUpdate();
  }

  private nextMonth() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
    this.requestUpdate();
  }

  private prevYear() {
    this.viewDate = new Date(this.viewDate.getFullYear() - 1, this.viewDate.getMonth(), 1);
    this.requestUpdate();
  }

  private nextYear() {
    this.viewDate = new Date(this.viewDate.getFullYear() + 1, this.viewDate.getMonth(), 1);
    this.requestUpdate();
  }

  private handleToday() {
    const today = new Date();
    this.selectDate(today);
  }

  private getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
  }

  private isSameDay(date1?: Date, date2?: Date): boolean {
    if (!date1 || !date2) return false;
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  private renderCalendar(year?: number, month?: number) {
    const calendarYear = year ?? this.viewDate.getFullYear();
    const calendarMonth = month ?? this.viewDate.getMonth();
    const daysInMonth = this.getDaysInMonth(calendarYear, calendarMonth);
    const firstDay = this.getFirstDayOfMonth(calendarYear, calendarMonth);
    const today = new Date();

    const days: (Date | null)[] = [];

    // Previous month days
    const prevMonthDays = this.getDaysInMonth(calendarYear, calendarMonth - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(new Date(calendarYear, calendarMonth - 1, prevMonthDays - i));
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(calendarYear, calendarMonth, i));
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(calendarYear, calendarMonth + 1, i));
    }

    return html`
      <div class="mx-date-picker-calendar">
        <div class="mx-date-picker-calendar-header">
          ${this.weekdays.map(day => html`
            <div class="mx-date-picker-weekday">${day}</div>
          `)}
        </div>
        <div class="mx-date-picker-calendar-body">
          ${days.map(date => {
      if (!date) return html`<div></div>`;

      const isOutside = date.getMonth() !== calendarMonth;
      const isToday = this.isSameDay(date, today);

      let isSelected = false;
      let isRangeStart = false;
      let isRangeEnd = false;
      let isInRange = false;
      let isInHoverRange = false;

      if (this.range) {
        if (this.selectedDate && this.isSameDay(date, this.selectedDate)) {
          isRangeStart = true;
          isSelected = true;
        }
        if (this.endDate && this.isSameDay(date, this.endDate)) {
          isRangeEnd = true;
          isSelected = true;
        }
        if (this.selectedDate && this.endDate && date > this.selectedDate && date < this.endDate) {
          isInRange = true;
        }

        // Show hover preview when selecting second date
        if (this.selectedDate && !this.endDate && this.hoverDate) {
          const start = this.selectedDate < this.hoverDate ? this.selectedDate : this.hoverDate;
          const end = this.selectedDate < this.hoverDate ? this.hoverDate : this.selectedDate;
          if (date > start && date < end) {
            isInHoverRange = true;
          }
        }
      } else {
        isSelected = this.isSameDay(date, this.selectedDate);
      }

      const classes = {
        'mx-date-picker-cell': true,
        'mx-date-picker-cell-outside': isOutside,
        'mx-date-picker-cell-today': isToday,
        'mx-date-picker-cell-selected': isSelected,
        'mx-date-picker-cell-range-start': isRangeStart,
        'mx-date-picker-cell-range-end': isRangeEnd,
        'mx-date-picker-cell-in-range': isInRange,
        'mx-date-picker-cell-in-hover-range': isInHoverRange,
      };

      return html`
              <div 
                class=${classMap(classes)}
                @click=${() => this.selectDate(date)}
                @mouseenter=${() => this.handleDateHover(date)}
              >
                ${date.getDate()}
              </div>
            `;
    })}
        </div>
      </div>
    `;
  }

  private renderMonthPanel() {
    return html`
      <div class="mx-date-picker-month-panel">
        ${this.months.map((month, index) => {
      const isSelected = this.selectedDate &&
        this.selectedDate.getFullYear() === this.viewDate.getFullYear() &&
        this.selectedDate.getMonth() === index;

      const classes = {
        'mx-date-picker-month-cell': true,
        'mx-date-picker-month-cell-selected': !!isSelected,
      };

      return html`
            <div 
              class=${classMap(classes)}
              @click=${() => this.selectMonth(index)}
            >
              ${month}
            </div>
          `;
    })}
      </div>
    `;
  }

  private renderYearPanel() {
    const currentYear = this.viewDate.getFullYear();
    const startYear = Math.floor(currentYear / 10) * 10;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i - 1);

    return html`
      <div class="mx-date-picker-year-panel">
        ${years.map(year => {
      const isSelected = this.selectedDate &&
        this.selectedDate.getFullYear() === year;

      const classes = {
        'mx-date-picker-year-cell': true,
        'mx-date-picker-year-cell-selected': !!isSelected,
      };

      return html`
            <div 
              class=${classMap(classes)}
              @click=${() => this.selectYear(year)}
            >
              ${year}
            </div>
          `;
    })}
      </div>
    `;
  }

  render() {
    const classes = {
      'mx-date-picker': true,
      [`mx-date-picker-${this.size}`]: this.size !== 'middle',
      'mx-date-picker-disabled': this.disabled,
      'mx-date-picker-focused': this.open,
    };

    const panelClasses = {
      'mx-date-picker-panel': true,
      'mx-date-picker-panel-open': this.open,
      'mx-date-picker-panel-range': this.range && this.panelMode === 'date',
    };

    const displayValue = this.range
      ? (this.selectedDate && this.endDate
        ? `${this.formatDate(this.selectedDate)} - ${this.formatDate(this.endDate)}`
        : this.selectedDate ? this.formatDate(this.selectedDate) : '')
      : (this.selectedDate ? this.formatDate(this.selectedDate) : '');

    const calendarIcon = html`
      <svg viewBox="64 64 896 896">
        <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"/>
      </svg>
    `;

    const clearIcon = html`
      <svg viewBox="64 64 896 896">
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/>
      </svg>
    `;

    const leftArrow = html`
      <svg viewBox="64 64 896 896">
        <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"/>
      </svg>
    `;

    const rightArrow = html`
      <svg viewBox="64 64 896 896">
        <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"/>
      </svg>
    `;

    return html`
      <div class=${classMap(classes)}>
        <div 
          class="mx-date-picker-input-wrapper"
          @click=${this.handleInputClick}
        >
          <input
            type="text"
            .value=${displayValue}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            readonly
          />
          
          ${this.allowClear && displayValue ? html`
            <span class="mx-date-picker-clear" @click=${this.handleClear}>
              ${clearIcon}
            </span>
          ` : html`
            <span class="mx-date-picker-suffix">
              ${calendarIcon}
            </span>
          `}
        </div>

        <div class=${classMap(panelClasses)}>
          <div class="mx-date-picker-panel-header">
            <div class="mx-date-picker-header-nav">
              <button 
                class="mx-date-picker-header-btn"
                @click=${this.panelMode === 'date' ? this.prevMonth : this.prevYear}
                aria-label="Previous"
              >
                ${leftArrow}
              </button>
            </div>
            
            <div class="mx-date-picker-header-label">
              ${this.panelMode === 'date' ? html`
                <span @click=${() => this.panelMode = 'month'}>
                  ${this.months[this.viewDate.getMonth()]}
                </span>
                <span @click=${() => this.panelMode = 'year'}>
                  ${this.viewDate.getFullYear()}
                </span>
              ` : this.panelMode === 'month' ? html`
                <span @click=${() => this.panelMode = 'year'}>
                  ${this.viewDate.getFullYear()}
                </span>
              ` : html`
                <span>
                  ${Math.floor(this.viewDate.getFullYear() / 10) * 10} - ${Math.floor(this.viewDate.getFullYear() / 10) * 10 + 9}
                </span>
              `}
            </div>
            
            <div class="mx-date-picker-header-nav">
              <button 
                class="mx-date-picker-header-btn"
                @click=${this.panelMode === 'date' ? this.nextMonth : this.nextYear}
                aria-label="Next"
              >
                ${rightArrow}
              </button>
            </div>
          </div>

          <div class="mx-date-picker-body${this.range && this.panelMode === 'date' ? ' mx-date-picker-body-range' : ''}">
            ${this.panelMode === 'date' ? (
        this.range ? html`
                ${this.renderCalendar()}
                ${this.renderCalendar(
          this.viewDate.getMonth() === 11 ? this.viewDate.getFullYear() + 1 : this.viewDate.getFullYear(),
          this.viewDate.getMonth() === 11 ? 0 : this.viewDate.getMonth() + 1
        )}
              ` : this.renderCalendar()
      ) : this.panelMode === 'month' ? this.renderMonthPanel()
        : this.renderYearPanel()}
          </div>

          ${this.showToday && this.panelMode === 'date' ? html`
            <div class="mx-date-picker-footer">
              <button class="mx-date-picker-today-btn" @click=${this.handleToday}>
                Today
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-date-picker': MXDatePicker;
  }
}
