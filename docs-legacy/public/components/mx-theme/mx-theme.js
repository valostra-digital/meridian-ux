var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DEFAULT_COLORS } from './defaults.js';
import { DEFAULT_TOKENS } from './tokens.js';
import { generateColorVars, generateNeutralVars } from './colors.js';
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
let MXTheme = class MXTheme extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Primary brand color (hex format)
         */
        this.primaryColor = DEFAULT_COLORS.primary;
        /**
         * Cache to avoid regenerating unnecessarily
         */
        this._lastPrimaryColor = '';
    }
    connectedCallback() {
        super.connectedCallback();
        this._applyTheme();
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('primaryColor')) {
            this._applyTheme();
        }
    }
    /**
     * Generate and apply all theme CSS variables
     */
    _applyTheme() {
        // Only regenerate if primary color actually changed
        if (this.primaryColor === this._lastPrimaryColor) {
            return;
        }
        this._lastPrimaryColor = this.primaryColor;
        // Generate all variables
        const vars = {
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
        // Apply CSS variables to host element
        Object.entries(vars).forEach(([name, value]) => {
            this.style.setProperty(name, String(value));
        });
    }
    /**
     * Convert DEFAULT_TOKENS to CSS variables
     */
    _generateTokenVars() {
        const vars = {};
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
    _addUnit(key, value) {
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
        return html `<slot></slot>`;
    }
};
MXTheme.styles = css `
    :host {
      display: contents; /* Doesn't affect layout */
    }
  `;
__decorate([
    property({ type: String, attribute: 'primary-color' })
], MXTheme.prototype, "primaryColor", void 0);
MXTheme = __decorate([
    customElement('mx-theme')
], MXTheme);
export { MXTheme };
//# sourceMappingURL=mx-theme.js.map