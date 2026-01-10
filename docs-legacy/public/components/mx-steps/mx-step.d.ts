import { LitElement } from 'lit';
/**
 * Step item component (child of mx-steps).
 *
 * @element mx-step
 *
 * @attr {string} title - Step title
 * @attr {string} description - Step description
 * @attr {string} status - Step status: wait, process, finish, error
 * @attr {string} icon - Custom icon
 * @attr {number} index - Step index (set by parent)
 * @attr {string} direction - Direction (set by parent)
 * @attr {string} size - Size (set by parent)
 *
 * @slot - Custom content
 * @slot title - Custom title
 * @slot description - Custom description
 * @slot icon - Custom icon
 *
 * @example
 * ```html
 * <mx-step title="Step Title" description="Step description"></mx-step>
 * ```
 */
export declare class MXStep extends LitElement {
    static styles: import("lit").CSSResult;
    title: string;
    description: string;
    status: 'wait' | 'process' | 'finish' | 'error';
    icon: string;
    index: number;
    direction: 'horizontal' | 'vertical';
    size: 'default' | 'small';
    progressDot: boolean;
    private renderIcon;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-step': MXStep;
    }
}
//# sourceMappingURL=mx-step.d.ts.map