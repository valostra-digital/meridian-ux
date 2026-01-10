var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
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
let MXTimePicker = class MXTimePicker extends LitElement {
    constructor() {
        super(...arguments);
        this.size = 'middle';
        this.value = '';
        this.defaultValue = '';
        this.placeholder = 'Select time';
        this.disabled = false;
        this.format = '24';
        this.use12Hours = false;
        this.allowClear = true;
        this.hourStep = 1;
        this.minuteStep = 1;
        this.secondStep = 1;
        this.showNow = true;
        this.open = false;
        this.selectedHour = 0;
        this.selectedMinute = 0;
        this.selectedSecond = 0;
        this.selectedPeriod = 'AM';
    }
    connectedCallback() {
        super.connectedCallback();
        this.parseValue(this.value || this.defaultValue);
        document.addEventListener('click', this.handleDocumentClick.bind(this));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this.handleDocumentClick.bind(this));
    }
    parseValue(value) {
        if (!value)
            return;
        const parts = value.split(':');
        if (parts.length >= 2) {
            let hour = parseInt(parts[0]);
            this.selectedMinute = parseInt(parts[1]);
            this.selectedSecond = parts.length > 2 ? parseInt(parts[2]) : 0;
            if (this.use12Hours) {
                this.selectedPeriod = hour >= 12 ? 'PM' : 'AM';
                this.selectedHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
            }
            else {
                this.selectedHour = hour;
            }
        }
    }
    formatValue() {
        let hour = this.selectedHour;
        if (this.use12Hours) {
            if (this.selectedPeriod === 'PM' && hour !== 12) {
                hour += 12;
            }
            else if (this.selectedPeriod === 'AM' && hour === 12) {
                hour = 0;
            }
        }
        const h = hour.toString().padStart(2, '0');
        const m = this.selectedMinute.toString().padStart(2, '0');
        const s = this.selectedSecond.toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    }
    formatDisplay() {
        const h = this.selectedHour.toString().padStart(2, '0');
        const m = this.selectedMinute.toString().padStart(2, '0');
        const s = this.selectedSecond.toString().padStart(2, '0');
        if (this.use12Hours) {
            return `${h}:${m}:${s} ${this.selectedPeriod}`;
        }
        return `${h}:${m}:${s}`;
    }
    handleInputClick(e) {
        if (this.disabled)
            return;
        e.stopPropagation();
        this.open = !this.open;
    }
    handleDocumentClick(e) {
        const path = e.composedPath();
        if (!path.includes(this)) {
            this.open = false;
        }
    }
    handleClear(e) {
        e.stopPropagation();
        this.value = '';
        this.selectedHour = 0;
        this.selectedMinute = 0;
        this.selectedSecond = 0;
        this.selectedPeriod = 'AM';
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: '' },
            bubbles: true,
            composed: true
        }));
    }
    selectHour(hour) {
        this.selectedHour = hour;
        this.updateValue();
    }
    selectMinute(minute) {
        this.selectedMinute = minute;
        this.updateValue();
    }
    selectSecond(second) {
        this.selectedSecond = second;
        this.updateValue();
    }
    selectPeriod(period) {
        this.selectedPeriod = period;
        this.updateValue();
    }
    updateValue() {
        this.value = this.formatValue();
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }
    handleNowClick() {
        const now = new Date();
        let hour = now.getHours();
        if (this.use12Hours) {
            this.selectedPeriod = hour >= 12 ? 'PM' : 'AM';
            this.selectedHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        }
        else {
            this.selectedHour = hour;
        }
        this.selectedMinute = now.getMinutes();
        this.selectedSecond = now.getSeconds();
        this.updateValue();
        this.open = false;
    }
    renderColumn(type) {
        let items = [];
        let selectedValue = 0;
        let step = 1;
        if (type === 'hour') {
            const max = this.use12Hours ? 12 : 23;
            const start = this.use12Hours ? 1 : 0;
            items = Array.from({ length: Math.ceil((max - start + 1) / this.hourStep) }, (_, i) => start + i * this.hourStep);
            selectedValue = this.selectedHour;
            step = this.hourStep;
        }
        else if (type === 'minute') {
            items = Array.from({ length: Math.ceil(60 / this.minuteStep) }, (_, i) => i * this.minuteStep);
            selectedValue = this.selectedMinute;
            step = this.minuteStep;
        }
        else if (type === 'second') {
            items = Array.from({ length: Math.ceil(60 / this.secondStep) }, (_, i) => i * this.secondStep);
            selectedValue = this.selectedSecond;
            step = this.secondStep;
        }
        else if (type === 'period') {
            items = ['AM', 'PM'];
            selectedValue = this.selectedPeriod;
        }
        return html `
      <ul class="mx-time-picker-column">
        ${items.map(item => {
            const isSelected = item === selectedValue;
            const classes = {
                'mx-time-picker-column-item': true,
                'mx-time-picker-column-item-selected': isSelected,
            };
            return html `
            <li 
              class=${classMap(classes)}
              @click=${() => {
                if (type === 'hour')
                    this.selectHour(item);
                else if (type === 'minute')
                    this.selectMinute(item);
                else if (type === 'second')
                    this.selectSecond(item);
                else if (type === 'period')
                    this.selectPeriod(item);
            }}
            >
              ${typeof item === 'number' ? item.toString().padStart(2, '0') : item}
            </li>
          `;
        })}
      </ul>
    `;
    }
    render() {
        const classes = {
            'mx-time-picker': true,
            [`mx-time-picker-${this.size}`]: this.size !== 'middle',
            'mx-time-picker-disabled': this.disabled,
            'mx-time-picker-focused': this.open,
        };
        const panelClasses = {
            'mx-time-picker-panel': true,
            'mx-time-picker-panel-open': this.open,
        };
        const displayValue = this.value ? this.formatDisplay() : '';
        const clockIcon = html `
      <svg viewBox="64 64 896 896">
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
        <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.9-11.2z"/>
      </svg>
    `;
        const clearIcon = html `
      <svg viewBox="64 64 896 896">
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/>
      </svg>
    `;
        return html `
      <div class=${classMap(classes)}>
        <div 
          class="mx-time-picker-input-wrapper"
          @click=${this.handleInputClick}
        >
          <input
            type="text"
            .value=${displayValue}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            readonly
          />
          
          ${this.allowClear && displayValue ? html `
            <span class="mx-time-picker-clear" @click=${this.handleClear}>
              ${clearIcon}
            </span>
          ` : html `
            <span class="mx-time-picker-suffix">
              ${clockIcon}
            </span>
          `}
        </div>

        <div class=${classMap(panelClasses)}>
          <div class="mx-time-picker-panel-inner">
            ${this.renderColumn('hour')}
            ${this.renderColumn('minute')}
            ${this.renderColumn('second')}
            ${this.use12Hours ? this.renderColumn('period') : ''}
          </div>
          
          ${this.showNow ? html `
            <div class="mx-time-picker-panel-footer">
              <button class="mx-time-picker-now-btn" @click=${this.handleNowClick}>
                Now
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
    }
};
MXTimePicker.styles = css `
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-time-picker {
      position: relative;
      display: inline-block;
      width: 100%;
    }

    .mx-time-picker-input-wrapper {
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

    .mx-time-picker-input-wrapper:hover:not(.mx-time-picker-disabled) {
      border-color: var(--mx-color-primary-hover, #4096ff);
    }

    .mx-time-picker-focused:not(.mx-time-picker-disabled) .mx-time-picker-input-wrapper {
      border-color: var(--mx-color-primary, #1677ff);
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
      outline: 0;
    }

    .mx-time-picker-small .mx-time-picker-input-wrapper {
      padding: 0 7px;
    }

    .mx-time-picker-large .mx-time-picker-input-wrapper {
      padding: 7px 11px;
      font-size: var(--mx-font-size-lg, 16px);
    }

    .mx-time-picker-disabled .mx-time-picker-input-wrapper {
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

    .mx-time-picker-suffix {
      display: inline-flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.45);
    }

    .mx-time-picker-suffix svg {
      width: 14px;
      height: 14px;
      fill: currentColor;
    }

    .mx-time-picker-clear {
      display: inline-flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.25);
      cursor: pointer;
      transition: color 0.2s;
    }

    .mx-time-picker-clear:hover {
      color: rgba(0, 0, 0, 0.45);
    }

    /* Panel */
    .mx-time-picker-panel {
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
      min-width: 200px;
    }

    .mx-time-picker-panel-open {
      opacity: 1;
      transform: scaleY(1);
      pointer-events: auto;
      visibility: visible;
    }

    .mx-time-picker-panel-inner {
      display: flex;
      padding: 8px 0;
    }

    .mx-time-picker-column {
      flex: 1;
      max-height: 224px;
      overflow-y: auto;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .mx-time-picker-column::-webkit-scrollbar {
      width: 6px;
    }

    .mx-time-picker-column::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.12);
      border-radius: 3px;
    }

    .mx-time-picker-column-item {
      padding: 4px 12px;
      text-align: center;
      cursor: pointer;
      transition: background-color 0.2s;
      font-size: var(--mx-font-size, 14px);
      user-select: none;
    }

    .mx-time-picker-column-item:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .mx-time-picker-column-item-selected {
      background-color: var(--mx-color-primary-bg, #e6f4ff);
      font-weight: 600;
    }

    .mx-time-picker-column-item-disabled {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }

    .mx-time-picker-panel-footer {
      border-top: 1px solid var(--mx-color-split, rgba(5, 5, 5, 0.06));
      padding: 8px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .mx-time-picker-now-btn {
      color: var(--mx-color-primary, #1677ff);
      cursor: pointer;
      font-size: var(--mx-font-size, 14px);
      border: none;
      background: transparent;
      padding: 0;
      transition: color 0.2s;
    }

    .mx-time-picker-now-btn:hover {
      color: var(--mx-color-primary-hover, #4096ff);
    }
  `;
__decorate([
    property({ type: String })
], MXTimePicker.prototype, "size", void 0);
__decorate([
    property({ type: String })
], MXTimePicker.prototype, "value", void 0);
__decorate([
    property({ type: String, attribute: 'default-value' })
], MXTimePicker.prototype, "defaultValue", void 0);
__decorate([
    property({ type: String })
], MXTimePicker.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean })
], MXTimePicker.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], MXTimePicker.prototype, "format", void 0);
__decorate([
    property({ type: Boolean, attribute: 'use-12-hours' })
], MXTimePicker.prototype, "use12Hours", void 0);
__decorate([
    property({ type: Boolean, attribute: 'allow-clear' })
], MXTimePicker.prototype, "allowClear", void 0);
__decorate([
    property({ type: Number, attribute: 'hour-step' })
], MXTimePicker.prototype, "hourStep", void 0);
__decorate([
    property({ type: Number, attribute: 'minute-step' })
], MXTimePicker.prototype, "minuteStep", void 0);
__decorate([
    property({ type: Number, attribute: 'second-step' })
], MXTimePicker.prototype, "secondStep", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-now' })
], MXTimePicker.prototype, "showNow", void 0);
__decorate([
    state()
], MXTimePicker.prototype, "open", void 0);
__decorate([
    state()
], MXTimePicker.prototype, "selectedHour", void 0);
__decorate([
    state()
], MXTimePicker.prototype, "selectedMinute", void 0);
__decorate([
    state()
], MXTimePicker.prototype, "selectedSecond", void 0);
__decorate([
    state()
], MXTimePicker.prototype, "selectedPeriod", void 0);
__decorate([
    query('.mx-time-picker-input-wrapper')
], MXTimePicker.prototype, "inputWrapper", void 0);
MXTimePicker = __decorate([
    customElement('mx-time-picker')
], MXTimePicker);
export { MXTimePicker };
//# sourceMappingURL=mx-time-picker.js.map