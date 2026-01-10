import { LitElement } from 'lit';
/**
 * Color picker component for selecting colors.
 *
 * @element mx-color-picker
 *
 * @attr {string} value - Current color value (hex format)
 * @attr {boolean} disabled - Whether the picker is disabled
 * @attr {boolean} show-text - Whether to show color text
 * @attr {string} size - Size: large, default, small
 * @attr {string} format - Color format: hex, rgb, hsl
 *
 * @fires change - Fired when color changes
 *
 * @example
 * ```html
 * <mx-color-picker value="#1677ff" show-text></mx-color-picker>
 * ```
 */
export declare class MXColorPicker extends LitElement {
    static styles: import("lit").CSSResult;
    value: string;
    disabled: boolean;
    showText: boolean;
    size: 'large' | 'default' | 'small';
    format: 'hex' | 'rgb' | 'hsl';
    private showPanel;
    private presetColors;
    private handleColorChange;
    private handlePresetClick;
    private togglePanel;
    private closePanel;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-color-picker': MXColorPicker;
    }
}
//# sourceMappingURL=mx-color-picker.d.ts.map