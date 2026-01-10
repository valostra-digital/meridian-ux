import { LitElement } from 'lit';
/**
 * Icon component for displaying SVG icons.
 *
 * @element mx-icon
 *
 * @attr {string} svg - Raw SVG string to render
 * @attr {boolean} spin - Rotate icon with animation
 * @attr {number} rotate - Rotate icon by specified degrees
 *
 * @slot - Default slot for icon content (if svg prop not provided)
 *
 * @example
 * ```html
 * <!-- Using svg prop -->
 * <mx-icon svg="<svg>...</svg>"></mx-icon>
 *
 * <!-- Spinning icon -->
 * <mx-icon spin svg="<svg>...</svg>"></mx-icon>
 *
 * <!-- Rotated icon -->
 * <mx-icon rotate="90" svg="<svg>...</svg>"></mx-icon>
 *
 * <!-- Using slot -->
 * <mx-icon>
 *   <svg>...</svg>
 * </mx-icon>
 * ```
 */
export declare class MXIcon extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Raw SVG string to render
     */
    svg: string;
    /**
     * Rotate icon with animation
     */
    spin: boolean;
    /**
     * Rotate icon by specified degrees (static rotation)
     */
    rotate?: number;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-icon': MXIcon;
    }
}
//# sourceMappingURL=mx-icon.d.ts.map