import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DEFAULT_COLORS } from './defaults.js';
import { DEFAULT_TOKENS } from './tokens.js';
import { generateColorVars, generateNeutralVars } from './colors.js';

/**
 * Theme provider component that generates and provides design tokens
 * at the :root scope, making them globally available for all Meridian components
 * and consumer application styling.
 * 
 * CSS variables are applied to document.documentElement (:root) to ensure
 * they can be used in any CSS context, including consumer library styles.
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
 *
 * <!-- Variables are available globally in your CSS -->
 * <style>
 *   .my-custom-class {
 *     color: var(--mx-color-primary);
 *     padding: var(--mx-padding);
 *   }
 * </style>
 * ```
 */
@customElement('mx-theme')
export class MXTheme extends LitElement {
  static styles = css`
    :host {
      display: contents; /* Doesn't affect layout */
    }
  `;

  /**
   * Primary brand color (hex format)
   */
  @property({ type: String, attribute: 'primary-color' })
  primaryColor: string = DEFAULT_COLORS.primary;

  /**
   * Cache to avoid regenerating unnecessarily
   */
  private _lastPrimaryColor: string = '';

  /**
   * Store applied variable names for cleanup
   */
  private _appliedVars: string[] = [];

  connectedCallback() {
    super.connectedCallback();
    this._applyTheme();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupTheme();
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('primaryColor')) {
      this._applyTheme();
    }
  }

  /**
   * Generate and apply all theme CSS variables
   */
  private _applyTheme() {
    // Only regenerate if primary color actually changed
    if (this.primaryColor === this._lastPrimaryColor) {
      return;
    }

    this._lastPrimaryColor = this.primaryColor;

    // Generate all variables
    const vars: Record<string, string> = {
      // Color palettes
      ...generateColorVars('primary', this.primaryColor),
      ...generateColorVars('success', DEFAULT_COLORS.success),
      ...generateColorVars('warning', DEFAULT_COLORS.warning),
      ...generateColorVars('error', DEFAULT_COLORS.error),
      ...generateColorVars('info', DEFAULT_COLORS.info),

      // Neutral colors
      ...generateNeutralVars(),

      // Non-color tokens
      ...this._generateTokenVars(),
    };

    // Apply CSS variables to :root for global availability
    const root = document.documentElement;

    // Store variable names for cleanup
    this._appliedVars = Object.keys(vars);

    Object.entries(vars).forEach(([name, value]) => {
      root.style.setProperty(name, String(value));
    });
  }

  /**
   * Remove theme variables from :root on disconnect
   */
  private _cleanupTheme() {
    const root = document.documentElement;
    this._appliedVars.forEach(varName => {
      root.style.removeProperty(varName);
    });
    this._appliedVars = [];
  }

  /**
   * Convert DEFAULT_TOKENS to CSS variables
   */
  private _generateTokenVars(): Record<string, string> {
    const vars: Record<string, string> = {};

    Object.entries(DEFAULT_TOKENS).forEach(([key, value]) => {
      // Convert camelCase to kebab-case
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();

      // Add appropriate units
      const cssValue = this._addUnit(key, value);
      vars[`--mx-${cssKey}`] = cssValue;
    });

    return vars;
  }

  /**
   * Add appropriate CSS units to token values
   */
  private _addUnit(key: string, value: any): string {
    // Already has units or is a string
    if (typeof value === 'string') {
      return value;
    }

    // Boolean values
    if (typeof value === 'boolean') {
      return value.toString();
    }

    // Number values - add 'px' for most, except unitless properties
    const unitlessProps = [
      'lineHeight', 'lineHeightSM', 'lineHeightLG',
      'lineHeightHeading1', 'lineHeightHeading2', 'lineHeightHeading3',
      'lineHeightHeading4', 'lineHeightHeading5',
      'fontWeightStrong', 'opacityLoading', 'opacityImage',
      'zIndexBase', 'zIndexPopupBase',
      'screenXS', 'screenXSMin', 'screenSM', 'screenSMMin',
      'screenMD', 'screenMDMin', 'screenLG', 'screenLGMin',
      'screenXL', 'screenXLMin', 'screenXXL', 'screenXXLMin',
      'motionUnit', 'motionBase'
    ];

    if (unitlessProps.includes(key)) {
      return String(value);
    }

    return `${value}px`;
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-theme': MXTheme;
  }
}