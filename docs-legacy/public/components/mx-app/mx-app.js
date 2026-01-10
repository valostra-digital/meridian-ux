var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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
let MXApp = class MXApp extends LitElement {
    constructor() {
        super(...arguments);
        this.theme = 'light';
        this.locale = 'en-US';
        this.direction = 'ltr';
    }
    connectedCallback() {
        super.connectedCallback();
        this.updateTheme();
    }
    updated(changedProperties) {
        if (changedProperties.has('theme')) {
            this.updateTheme();
        }
    }
    updateTheme() {
        if (this.theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setAttribute('theme', prefersDark ? 'dark' : 'light');
        }
    }
    render() {
        return html `
      <div class="mx-app" part="app">
        <slot></slot>
      </div>
    `;
    }
};
MXApp.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      min-height: 100vh;
      background-color: var(--mx-color-bg-container, #ffffff);
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
    }

    :host([theme="dark"]) {
      --mx-color-bg-container: #141414;
      --mx-color-bg-elevated: #1f1f1f;
      --mx-color-text: rgba(255, 255, 255, 0.85);
      --mx-color-text-secondary: rgba(255, 255, 255, 0.65);
      --mx-color-text-heading: rgba(255, 255, 255, 0.85);
      --mx-color-border: #434343;
      --mx-color-border-secondary: #303030;
    }

    :host([direction="rtl"]) {
      direction: rtl;
    }

    .mx-app {
      width: 100%;
      min-height: 100vh;
    }
  `;
__decorate([
    property({ type: String, reflect: true })
], MXApp.prototype, "theme", void 0);
__decorate([
    property({ type: String })
], MXApp.prototype, "locale", void 0);
__decorate([
    property({ type: String, reflect: true })
], MXApp.prototype, "direction", void 0);
MXApp = __decorate([
    customElement('mx-app')
], MXApp);
export { MXApp };
//# sourceMappingURL=mx-app.js.map