import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type StepsDirection = 'horizontal' | 'vertical';
export type StepsSize = 'default' | 'small';
export type StepsStatus = 'wait' | 'process' | 'finish' | 'error';

/**
 * Steps container component for step-by-step navigation.
 * 
 * @element mx-steps
 * 
 * @attr {number} current - Current step index (0-based)
 * @attr {StepsDirection} direction - Display direction
 * @attr {StepsSize} size - Size of steps
 * @attr {StepsStatus} status - Status of current step
 * @attr {boolean} progress-dot - Show progress as dots instead of numbers
 * 
 * @slot - Step items (mx-step elements)
 * 
 * @fires change - Dispatched when step changes (if clickable)
 * 
 * @example
 * ```html
 * <mx-steps current="1">
 *   <mx-step title="Step 1"></mx-step>
 *   <mx-step title="Step 2"></mx-step>
 *   <mx-step title="Step 3"></mx-step>
 * </mx-steps>
 * ```
 */
@customElement('mx-steps')
export class MXSteps extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-steps {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 14px;
      line-height: 1.5714285714285714;
      list-style: none;
      display: flex;
      width: 100%;
      text-align: initial;
    }

    .mx-steps-horizontal {
      flex-direction: row;
    }

    .mx-steps-vertical {
      flex-direction: column;
    }

    ::slotted(mx-step) {
      flex: 1;
    }

    ::slotted(mx-step:last-child) {
      flex: none;
    }
  `;

  @property({ type: Number })
  current = 0;

  @property({ type: String })
  direction: StepsDirection = 'horizontal';

  @property({ type: String })
  size: StepsSize = 'default';

  @property({ type: String })
  status: StepsStatus = 'process';

  @property({ type: Boolean, attribute: 'progress-dot' })
  progressDot = false;

  connectedCallback() {
    super.connectedCallback();
    this.updateSteps();
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('current') || changedProperties.has('status')) {
      this.updateSteps();
    }
  }

  private updateSteps() {
    const steps = Array.from(this.querySelectorAll('mx-step'));
    steps.forEach((step, index) => {
      step.setAttribute('index', String(index));
      step.setAttribute('direction', this.direction);
      step.setAttribute('size', this.size);
      
      // Set status based on current step
      if (index < this.current) {
        step.setAttribute('status', 'finish');
      } else if (index === this.current) {
        step.setAttribute('status', this.status);
      } else {
        step.setAttribute('status', 'wait');
      }

      // Set progress-dot if enabled
      if (this.progressDot) {
        step.setAttribute('progress-dot', '');
      } else {
        step.removeAttribute('progress-dot');
      }
    });
  }

  render() {
    return html`
      <div class="mx-steps mx-steps-${this.direction}">
        <slot @slotchange=${this.updateSteps}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-steps': MXSteps;
  }
}
