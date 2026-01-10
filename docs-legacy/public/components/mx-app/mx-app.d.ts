import { LitElement } from 'lit';
/**
 * App wrapper component for providing application-level configuration.
 *
 * @element mx-app
 *
 * @attr {string} theme - Theme mode: light, dark, auto
 * @attr {string} locale - Locale for internationalization
 * @attr {string} direction - Text direction: ltr, rtl
 *
 * @slot - Application content
 *
 * @example
 * ```html
 * <mx-app theme="dark" locale="en-US">
 *   <your-app-content></your-app-content>
 * </mx-app>
 * ```
 */
export declare class MXApp extends LitElement {
    static styles: import("lit").CSSResult;
    theme: 'light' | 'dark' | 'auto';
    locale: string;
    direction: 'ltr' | 'rtl';
    connectedCallback(): void;
    updated(changedProperties: Map<string, any>): void;
    private updateTheme;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-app': MXApp;
    }
}
//# sourceMappingURL=mx-app.d.ts.map