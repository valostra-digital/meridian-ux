import { LitElement } from 'lit';
export type SpinSize = 'small' | 'default' | 'large';
/**
 * Spinner component for displaying loading state.
 *
 * @element mx-spin
 *
 * @attr {boolean} spinning - Whether to show spinning indicator
 * @attr {SpinSize} size - Size of spinner: small, default, large
 * @attr {string} tip - Tip text to show below spinner
 * @attr {number} delay - Delay in milliseconds before showing spinner
 *
 * @slot - Content to wrap (shows spinner overlay when spinning)
 * @slot indicator - Custom loading indicator
 *
 * @example
 * ```html
 * <!-- Simple spinner -->
 * <mx-spin></mx-spin>
 *
 * <!-- With tip text -->
 * <mx-spin tip="Loading..."></mx-spin>
 *
 * <!-- Wrapping content -->
 * <mx-spin spinning>
 *   <div>Your content here</div>
 * </mx-spin>
 *
 * <!-- Large size -->
 * <mx-spin size="large"></mx-spin>
 * ```
 */
export declare class MXSpin extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Whether to show spinning indicator
     */
    spinning: boolean;
    /**
     * Size of spinner
     */
    size: SpinSize;
    /**
     * Tip text to show below spinner
     */
    tip: string;
    /**
     * Delay in milliseconds before showing spinner
     */
    delay: number;
    private delayTimeout?;
    private showSpinner;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    private renderSpinner;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-spin': MXSpin;
    }
}
//# sourceMappingURL=mx-spin.d.ts.map