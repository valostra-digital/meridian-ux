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
 * Slider component - Range slider for selecting values
 *
 * @element mx-slider
 *
 * @fires change - Dispatched when value changes (on release)
 * @fires after-change - Dispatched after interaction completes
 */
let MXSlider = class MXSlider extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Minimum value
         */
        this.min = 0;
        /**
         * Maximum value
         */
        this.max = 100;
        /**
         * Step size
         */
        this.step = 1;
        /**
         * Whether disabled
         */
        this.disabled = false;
        /**
         * Show dots for each step
         */
        this.dots = false;
        /**
         * Whether to show tooltip
         */
        this.tooltipVisible = true;
        /**
         * Vertical mode
         */
        this.vertical = false;
        /**
         * Range mode
         */
        this.range = false;
        /**
         * Whether value can only be set at marks
         */
        this.included = true;
        /**
         * Reverse the slider direction
         */
        this.reverse = false;
        this.internalValue = [0, 0];
        this.dragging = false;
        this.activeHandle = 0;
    }
    connectedCallback() {
        super.connectedCallback();
        this.initializeValue();
    }
    willUpdate(changedProperties) {
        if (changedProperties.has('value')) {
            this.initializeValue();
        }
    }
    initializeValue() {
        const val = this.value ?? this.defaultValue;
        if (val === undefined) {
            this.internalValue = this.range ? [this.min, this.min] : [this.min, this.min];
        }
        else if (Array.isArray(val)) {
            this.internalValue = [val[0], val[1]];
        }
        else {
            this.internalValue = [val, val];
        }
    }
    getPercentage(value) {
        return ((value - this.min) / (this.max - this.min)) * 100;
    }
    getValueFromPosition(clientX, clientY) {
        if (!this.rail)
            return this.min;
        const rect = this.rail.getBoundingClientRect();
        let percentage;
        if (this.vertical) {
            percentage = 1 - (clientY - rect.top) / rect.height;
        }
        else {
            percentage = (clientX - rect.left) / rect.width;
        }
        if (this.reverse) {
            percentage = 1 - percentage;
        }
        percentage = Math.max(0, Math.min(1, percentage));
        let value = this.min + percentage * (this.max - this.min);
        // Snap to step
        value = Math.round(value / this.step) * this.step;
        value = Math.max(this.min, Math.min(this.max, value));
        return value;
    }
    handleRailClick(e) {
        if (this.disabled)
            return;
        const value = this.getValueFromPosition(e.clientX, e.clientY);
        if (this.range) {
            const [min, max] = this.internalValue;
            const distToMin = Math.abs(value - min);
            const distToMax = Math.abs(value - max);
            if (distToMin < distToMax) {
                this.internalValue = [value, max];
                this.activeHandle = 0;
            }
            else {
                this.internalValue = [min, value];
                this.activeHandle = 1;
            }
        }
        else {
            this.internalValue = [value, value];
        }
        this.dispatchChangeEvent();
        this.requestUpdate();
    }
    handleMouseDown(e, handleIndex) {
        if (this.disabled)
            return;
        e.preventDefault();
        this.dragging = true;
        this.activeHandle = handleIndex;
        const handleMove = (moveEvent) => {
            const value = this.getValueFromPosition(moveEvent.clientX, moveEvent.clientY);
            if (this.range) {
                const newValue = [...this.internalValue];
                newValue[handleIndex] = value;
                // Ensure handles don't cross
                if (handleIndex === 0 && value > newValue[1]) {
                    newValue[0] = newValue[1];
                }
                else if (handleIndex === 1 && value < newValue[0]) {
                    newValue[1] = newValue[0];
                }
                this.internalValue = newValue;
            }
            else {
                this.internalValue = [value, value];
            }
            this.requestUpdate();
        };
        const handleUp = () => {
            this.dragging = false;
            this.dispatchChangeEvent();
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleUp);
        };
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
    }
    dispatchChangeEvent() {
        const value = this.range
            ? this.internalValue
            : this.internalValue[0];
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value },
            bubbles: true,
            composed: true,
        }));
    }
    renderHandle(value, index) {
        const percentage = this.getPercentage(value);
        const style = this.vertical
            ? `bottom: ${percentage}%`
            : `left: ${percentage}%`;
        return html `
      <div
        class="mx-slider-handle"
        style=${style}
        tabindex=${this.disabled ? -1 : 0}
        @mousedown=${(e) => this.handleMouseDown(e, index)}
      >
        ${this.tooltipVisible && this.dragging && this.activeHandle === index ? html `
          <div class="mx-slider-tooltip">${value}</div>
        ` : ''}
      </div>
    `;
    }
    renderMarks() {
        if (!this.marks)
            return '';
        return html `
      <div class="mx-slider-marks">
        ${Object.entries(this.marks).map(([key, mark]) => {
            const value = Number(key);
            const percentage = this.getPercentage(value);
            const style = this.vertical
                ? `bottom: ${percentage}%`
                : `left: ${percentage}%`;
            const label = typeof mark === 'string' ? mark : mark.label;
            const isActive = this.range
                ? value >= this.internalValue[0] && value <= this.internalValue[1]
                : value <= this.internalValue[0];
            return html `
            <span class="mx-slider-mark" style=${style}>
              ${this.dots ? html `
                <span class="mx-slider-dot ${isActive ? 'mx-slider-dot-active' : ''}"></span>
              ` : ''}
              <span class="mx-slider-mark-text ${isActive ? 'mx-slider-mark-text-active' : ''}">
                ${label}
              </span>
            </span>
          `;
        })}
      </div>
    `;
    }
    render() {
        const [minValue, maxValue] = this.range
            ? this.internalValue
            : [this.min, this.internalValue[0]];
        const trackStart = this.getPercentage(minValue);
        const trackEnd = this.getPercentage(maxValue);
        const trackStyle = this.vertical
            ? `bottom: ${trackStart}%; height: ${trackEnd - trackStart}%`
            : `left: ${trackStart}%; width: ${trackEnd - trackStart}%`;
        const classes = {
            'mx-slider': true,
            'mx-slider-disabled': this.disabled,
            'mx-slider-vertical': this.vertical,
            'mx-slider-with-marks': !!this.marks,
        };
        return html `
      <div class=${classMap(classes)}>
        <div class="mx-slider-rail" @click=${this.handleRailClick}></div>
        <div class="mx-slider-track" style=${trackStyle}></div>
        
        ${this.range ? html `
          ${this.renderHandle(this.internalValue[0], 0)}
          ${this.renderHandle(this.internalValue[1], 1)}
        ` : html `
          ${this.renderHandle(this.internalValue[0], 0)}
        `}

        ${this.renderMarks()}
      </div>
    `;
    }
};
MXSlider.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-slider {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      line-height: var(--mx-line-height, 1.5714285714285714);
      list-style: none;
      font-family: inherit;
      position: relative;
      height: 12px;
      padding: 4px 0;
      cursor: pointer;
      touch-action: none;
    }

    .mx-slider-disabled {
      cursor: not-allowed;
    }

    .mx-slider-rail {
      position: absolute;
      width: 100%;
      height: 4px;
      background-color: var(--mx-color-fill-secondary, rgba(0, 0, 0, 0.06));
      border-radius: 2px;
      transition: background-color 0.2s;
    }

    .mx-slider-track {
      position: absolute;
      height: 4px;
      background-color: var(--mx-color-primary-border, #91caff);
      border-radius: 2px;
      transition: background-color 0.2s;
    }

    .mx-slider:hover .mx-slider-track {
      background-color: var(--mx-color-primary-border-hover, #69b1ff);
    }

    .mx-slider-disabled .mx-slider-track {
      background-color: var(--mx-color-fill-secondary, rgba(0, 0, 0, 0.06));
    }

    .mx-slider-handle {
      position: absolute;
      width: 14px;
      height: 14px;
      margin-top: -5px;
      background-color: #ffffff;
      border: 2px solid var(--mx-color-primary-border, #91caff);
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      cursor: grab;
      transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    }

    .mx-slider-handle:hover,
    .mx-slider-handle:focus {
      border-color: var(--mx-color-primary-hover, #4096ff);
      box-shadow: 0 0 0 4px var(--mx-color-primary-bg, #e6f4ff);
      outline: none;
    }

    .mx-slider-handle:active {
      border-color: var(--mx-color-primary-hover, #4096ff);
      box-shadow: 0 0 0 6px var(--mx-color-primary-bg, #e6f4ff);
      cursor: grabbing;
    }

    .mx-slider-disabled .mx-slider-handle {
      border-color: var(--mx-color-border, #d9d9d9);
      background-color: #ffffff;
      box-shadow: none;
      cursor: not-allowed;
    }

    .mx-slider-marks {
      position: absolute;
      top: 14px;
      left: 0;
      width: 100%;
      font-size: 12px;
    }

    .mx-slider-mark {
      position: absolute;
      top: 0;
      transform: translateX(-50%);
      text-align: center;
      cursor: pointer;
    }

    .mx-slider-mark-text {
      display: inline-block;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      cursor: pointer;
    }

    .mx-slider-mark-text-active {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
    }

    .mx-slider-dot {
      position: absolute;
      top: -2px;
      width: 8px;
      height: 8px;
      background-color: #ffffff;
      border: 2px solid var(--mx-color-border, #d9d9d9);
      border-radius: 50%;
      cursor: pointer;
      transform: translateX(-50%);
    }

    .mx-slider-dot-active {
      border-color: var(--mx-color-primary-border, #91caff);
    }

    .mx-slider-vertical {
      width: 12px;
      height: 100%;
      padding: 0 4px;
    }

    .mx-slider-vertical .mx-slider-rail {
      width: 4px;
      height: 100%;
    }

    .mx-slider-vertical .mx-slider-track {
      width: 4px;
      height: auto;
      bottom: 0;
    }

    .mx-slider-vertical .mx-slider-handle {
      margin-left: -5px;
      margin-top: 0;
    }

    .mx-slider-with-marks {
      margin-bottom: 28px;
    }

    .mx-slider-tooltip {
      position: absolute;
      top: -32px;
      left: 50%;
      transform: translateX(-50%);
      padding: 4px 8px;
      background-color: rgba(0, 0, 0, 0.85);
      color: #ffffff;
      font-size: 12px;
      border-radius: var(--mx-border-radius-sm, 4px);
      white-space: nowrap;
      pointer-events: none;
    }
  `;
__decorate([
    property({ type: [Number, Array] })
], MXSlider.prototype, "value", void 0);
__decorate([
    property({ type: [Number, Array], attribute: 'default-value' })
], MXSlider.prototype, "defaultValue", void 0);
__decorate([
    property({ type: Number })
], MXSlider.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], MXSlider.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], MXSlider.prototype, "step", void 0);
__decorate([
    property({ type: Boolean })
], MXSlider.prototype, "disabled", void 0);
__decorate([
    property({ type: Object })
], MXSlider.prototype, "marks", void 0);
__decorate([
    property({ type: Boolean })
], MXSlider.prototype, "dots", void 0);
__decorate([
    property({ type: Boolean, attribute: 'tooltip-visible' })
], MXSlider.prototype, "tooltipVisible", void 0);
__decorate([
    property({ type: Boolean })
], MXSlider.prototype, "vertical", void 0);
__decorate([
    property({ type: Boolean })
], MXSlider.prototype, "range", void 0);
__decorate([
    property({ type: Boolean })
], MXSlider.prototype, "included", void 0);
__decorate([
    property({ type: Boolean })
], MXSlider.prototype, "reverse", void 0);
__decorate([
    state()
], MXSlider.prototype, "internalValue", void 0);
__decorate([
    state()
], MXSlider.prototype, "dragging", void 0);
__decorate([
    state()
], MXSlider.prototype, "activeHandle", void 0);
__decorate([
    query('.mx-slider-rail')
], MXSlider.prototype, "rail", void 0);
MXSlider = __decorate([
    customElement('mx-slider')
], MXSlider);
export { MXSlider };
//# sourceMappingURL=mx-slider.js.map