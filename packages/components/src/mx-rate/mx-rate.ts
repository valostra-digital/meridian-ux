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
@customElement('mx-rate')
export class MXRate extends LitElement {
  static styles = css`
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

  /**
   * Number of stars
   */
  @property({ type: Number })
  count = 5;

  /**
   * Current value
   */
  @property({ type: Number })
  value = 0;

  /**
   * Default value
   */
  @property({ type: Number, attribute: 'default-value' })
  defaultValue = 0;

  /**
   * Allow half star
   */
  @property({ type: Boolean, attribute: 'allow-half' })
  allowHalf = false;

  /**
   * Allow clear when click again
   */
  @property({ type: Boolean, attribute: 'allow-clear' })
  allowClear = true;

  /**
   * Whether disabled
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Read-only mode
   */
  @property({ type: Boolean })
  readonly = false;

  /**
   * Auto focus
   */
  @property({ type: Boolean })
  autofocus = false;

  /**
   * Custom character
   */
  @property({ type: String })
  character = '★';

  /**
   * Tooltips for each star
   */
  @property({ type: Array })
  tooltips?: string[];

  @state()
  private internalValue = 0;

  @state()
  private hoverValue = 0;

  @state()
  private focused = false;

  @state()
  private focusedIndex = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.internalValue = this.value || this.defaultValue;
  }

  private handleStarClick(index: number, isHalf: boolean): void {
    if (this.disabled || this.readonly) return;

    const newValue = isHalf && this.allowHalf ? index + 0.5 : index + 1;

    if (this.allowClear && this.internalValue === newValue) {
      this.internalValue = 0;
    } else {
      this.internalValue = newValue;
    }

    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.internalValue },
      bubbles: true,
      composed: true,
    }));

    this.requestUpdate();
  }

  private handleStarHover(index: number, isHalf: boolean): void {
    if (this.disabled || this.readonly) return;

    this.hoverValue = isHalf && this.allowHalf ? index + 0.5 : index + 1;

    this.dispatchEvent(new CustomEvent('hover-change', {
      detail: { value: this.hoverValue },
      bubbles: true,
      composed: true,
    }));

    this.requestUpdate();
  }

  private handleMouseLeave(): void {
    this.hoverValue = 0;
    this.requestUpdate();
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (this.disabled || this.readonly) return;

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

  private dispatchChangeEvent(): void {
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.internalValue },
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
  }

  private getStarState(index: number): 'full' | 'half' | 'zero' {
    const displayValue = this.hoverValue || this.internalValue;
    
    if (displayValue >= index + 1) {
      return 'full';
    } else if (this.allowHalf && displayValue >= index + 0.5) {
      return 'half';
    }
    return 'zero';
  }

  private renderStar(index: number): any {
    const state = this.getStarState(index);
    const classes = {
      'mx-rate-star': true,
      [`mx-rate-star-${state}`]: true,
      'mx-rate-star-focused': this.focused && this.focusedIndex === index,
    };

    const tooltip = this.tooltips?.[index];

    return html`
      <li
        class=${classMap(classes)}
        title=${tooltip || ''}
        @click=${() => this.handleStarClick(index, false)}
        @mousemove=${(e: MouseEvent) => {
          const target = e.currentTarget as HTMLElement;
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

    return html`
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
        ${this.tooltips ? html`
          <li class="mx-rate-text">${this.tooltips[Math.ceil(this.internalValue) - 1] || ''}</li>
        ` : ''}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-rate': MXRate;
  }
}
