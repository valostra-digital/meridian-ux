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
@customElement('mx-app')
export class MXApp extends LitElement {
  static styles = css`
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

  @property({ type: String, reflect: true })
  theme: 'light' | 'dark' | 'auto' = 'light';

  @property({ type: String })
  locale = 'en-US';

  @property({ type: String, reflect: true })
  direction: 'ltr' | 'rtl' = 'ltr';

  connectedCallback() {
    super.connectedCallback();
    this.updateTheme();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('theme')) {
      this.updateTheme();
    }
  }

  private updateTheme() {
    if (this.theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setAttribute('theme', prefersDark ? 'dark' : 'light');
    }
  }

  render() {
    return html`
      <div class="mx-app" part="app">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-app': MXApp;
  }
}
