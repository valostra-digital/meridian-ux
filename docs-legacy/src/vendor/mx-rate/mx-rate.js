var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
/**
 * Rate component - Star rating
 *
 * @element mx-rate
 *
 * @fires change - Dispatched when rating changes
 * @fires hover-change - Dispatched when hovering over stars
 */
let MXRate = class MXRate extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Number of stars
         */
        this.count = 5;
        /**
         * Current value
         */
        this.value = 0;
        /**
         * Default value
         */
        this.defaultValue = 0;
        /**
         * Allow half star
         */
        this.allowHalf = false;
        /**
         * Allow clear when click again
         */
        this.allowClear = true;
        /**
         * Whether disabled
         */
        this.disabled = false;
        /**
         * Read-only mode
         */
        this.readonly = false;
        /**
         * Auto focus
         */
        this.autofocus = false;
        /**
         * Custom character
         */
        this.character = '★';
        this.internalValue = 0;
        this.hoverValue = 0;
        this.focused = false;
        this.focusedIndex = 0;
    }
    connectedCallback() {
        super.connectedCallback();
        this.internalValue = this.value || this.defaultValue;
    }
    handleStarClick(index, isHalf) {
        if (this.disabled || this.readonly)
            return;
        const newValue = isHalf && this.allowHalf ? index + 0.5 : index + 1;
        if (this.allowClear && this.internalValue === newValue) {
            this.internalValue = 0;
        }
        else {
            this.internalValue = newValue;
        }
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.internalValue },
            bubbles: true,
            composed: true,
        }));
        this.requestUpdate();
    }
    handleStarHover(index, isHalf) {
        if (this.disabled || this.readonly)
            return;
        this.hoverValue = isHalf && this.allowHalf ? index + 0.5 : index + 1;
        this.dispatchEvent(new CustomEvent('hover-change', {
            detail: { value: this.hoverValue },
            bubbles: true,
            composed: true,
        }));
        this.requestUpdate();
    }
    handleMouseLeave() {
        this.hoverValue = 0;
        this.requestUpdate();
    }
    handleKeyDown(e) {
        if (this.disabled || this.readonly)
            return;
        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowUp':
                e.preventDefault();
                this.focusedIndex = Math.min(this.focusedIndex + 1, this.count - 1);
                this.internalValue = this.focusedIndex + 1;
                this.dispatchChangeEvent();
                break;
            case 'ArrowLeft':
            case 'ArrowDown':
                e.preventDefault();
                this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
                this.internalValue = this.focusedIndex + 1;
                this.dispatchChangeEvent();
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                this.internalValue = this.focusedIndex + 1;
                this.dispatchChangeEvent();
                break;
        }
    }
    dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.internalValue },
            bubbles: true,
            composed: true,
        }));
        this.requestUpdate();
    }
    getStarState(index) {
        const displayValue = this.hoverValue || this.internalValue;
        if (displayValue >= index + 1) {
            return 'full';
        }
        else if (this.allowHalf && displayValue >= index + 0.5) {
            return 'half';
        }
        return 'zero';
    }
    renderStar(index) {
        const state = this.getStarState(index);
        const classes = {
            'mx-rate-star': true,
            [`mx-rate-star-${state}`]: true,
            'mx-rate-star-focused': this.focused && this.focusedIndex === index,
        };
        const tooltip = this.tooltips?.[index];
        return html `
      <li
        class=${classMap(classes)}
        title=${tooltip || ''}
        @click=${() => this.handleStarClick(index, false)}
        @mousemove=${(e) => {
            const target = e.currentTarget;
            const rect = target.getBoundingClientRect();
            const isLeft = e.clientX - rect.left < rect.width / 2;
            this.handleStarHover(index, isLeft);
        }}
      >
        <div class="mx-rate-star-first">
          <span>${this.character}</span>
        </div>
        <div class="mx-rate-star-second">
          <span>${this.character}</span>
        </div>
      </li>
    `;
    }
    render() {
        const classes = {
            'mx-rate': true,
            'mx-rate-disabled': this.disabled,
            'mx-rate-readonly': this.readonly,
        };
        return html `
      <ul
        class=${classMap(classes)}
        tabindex=${this.disabled || this.readonly ? -1 : 0}
        role="radiogroup"
        @mouseleave=${this.handleMouseLeave}
        @keydown=${this.handleKeyDown}
        @focus=${() => (this.focused = true)}
        @blur=${() => (this.focused = false)}
      >
        ${Array.from({ length: this.count }, (_, i) => this.renderStar(i))}
        ${this.tooltips ? html `
          <li class="mx-rate-text">${this.tooltips[Math.ceil(this.internalValue) - 1] || ''}</li>
        ` : ''}
      </ul>
    `;
    }
};
MXRate.styles = css `
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-rate {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      line-height: 1;
      list-style: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      outline: none;
    }

    .mx-rate-disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    .mx-rate-star {
      position: relative;
      display: inline-block;
      color: var(--mx-color-border, #d9d9d9);
      cursor: pointer;
      transition: transform 0.2s;
      font-size: 20px;
      line-height: 1;
    }

    .mx-rate-star:hover {
      transform: scale(1.1);
    }

    .mx-rate-star-first,
    .mx-rate-star-second {
      transition: color 0.2s;
      user-select: none;
    }

    .mx-rate-star-first {
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 100%;
      overflow: hidden;
      opacity: 0;
    }

    .mx-rate-star-full .mx-rate-star-first,
    .mx-rate-star-full .mx-rate-star-second,
    .mx-rate-star-half .mx-rate-star-first {
      color: var(--mx-color-warning, #faad14);
    }

    .mx-rate-star-half .mx-rate-star-first {
      opacity: 1;
    }

    .mx-rate-star-zero .mx-rate-star-first,
    .mx-rate-star-zero .mx-rate-star-second {
      color: var(--mx-color-border, #d9d9d9);
    }

    .mx-rate-text {
      display: inline-block;
      margin-left: 8px;
      font-size: var(--mx-font-size, 14px);
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
    }

    .mx-rate-star-focused {
      outline: 2px solid var(--mx-color-primary, #1677ff);
      outline-offset: 2px;
      border-radius: var(--mx-border-radius-sm, 4px);
    }

    .mx-rate-readonly .mx-rate-star {
      cursor: default;
    }

    .mx-rate-readonly .mx-rate-star:hover {
      transform: none;
    }
  `;
__decorate([
    property({ type: Number })
], MXRate.prototype, "count", void 0);
__decorate([
    property({ type: Number })
], MXRate.prototype, "value", void 0);
__decorate([
    property({ type: Number, attribute: 'default-value' })
], MXRate.prototype, "defaultValue", void 0);
__decorate([
    property({ type: Boolean, attribute: 'allow-half' })
], MXRate.prototype, "allowHalf", void 0);
__decorate([
    property({ type: Boolean, attribute: 'allow-clear' })
], MXRate.prototype, "allowClear", void 0);
__decorate([
    property({ type: Boolean })
], MXRate.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], MXRate.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean })
], MXRate.prototype, "autofocus", void 0);
__decorate([
    property({ type: String })
], MXRate.prototype, "character", void 0);
__decorate([
    property({ type: Array })
], MXRate.prototype, "tooltips", void 0);
__decorate([
    state()
], MXRate.prototype, "internalValue", void 0);
__decorate([
    state()
], MXRate.prototype, "hoverValue", void 0);
__decorate([
    state()
], MXRate.prototype, "focused", void 0);
__decorate([
    state()
], MXRate.prototype, "focusedIndex", void 0);
MXRate = __decorate([
    customElement('mx-rate')
], MXRate);
export { MXRate };
//# sourceMappingURL=mx-rate.js.map