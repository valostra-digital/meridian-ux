import { LitElement } from 'lit';
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
export declare class MXSteps extends LitElement {
    static styles: import("lit").CSSResult;
    current: number;
    direction: StepsDirection;
    size: StepsSize;
    status: StepsStatus;
    progressDot: boolean;
    connectedCallback(): void;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    private updateSteps;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-steps': MXSteps;
    }
}
//# sourceMappingURL=mx-steps.d.ts.map