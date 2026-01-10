import { LitElement } from 'lit';
/**
 * Theme provider component that generates and provides design tokens
 * to all descendant Meridian components.
 *
 * @element mx-theme
 *
 * @attr {string} primary-color - Primary brand color (hex). Default: #1677ff (Ant Design blue)
 *
 * @example
 * ```html
 * <!-- Default theme -->
 * <mx-theme>
 *   <mx-button>Click me</mx-button>
 * </mx-theme>
 *
 * <!-- Custom primary color -->
 * <mx-theme primary-color="#52c41a">
 *   <mx-button>Click me</mx-button>
 * </mx-theme>
 * ```
 */
export declare class MXTheme extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Primary brand color (hex format)
     */
    primaryColor: string;
    /**
     * Cache to avoid regenerating unnecessarily
     */
    private _lastPrimaryColor;
    connectedCallback(): void;
    updated(changedProperties: Map<string, unknown>): void;
    /**
     * Generate and apply all theme CSS variables
     */
    private _applyTheme;
    /**
     * Convert DEFAULT_TOKENS to CSS variables
     */
    private _generateTokenVars;
    /**
     * Add appropriate CSS units to token values
     */
    private _addUnit;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-theme': MXTheme;
    }
}
//# sourceMappingURL=mx-theme.d.ts.map