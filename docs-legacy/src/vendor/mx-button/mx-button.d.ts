import { LitElement } from 'lit';
export type ButtonType = 'default' | 'primary' | 'dashed' | 'text' | 'link';
export type ButtonSize = 'small' | 'middle' | 'large';
export type ButtonShape = 'default' | 'circle' | 'round';
export type ButtonVariant = 'outlined' | 'solid' | 'dashed' | 'filled' | 'text' | 'link';
export type ButtonColor = 'default' | 'primary' | 'danger' | 'blue' | 'purple' | 'cyan' | 'green' | 'magenta' | 'pink' | 'red' | 'orange' | 'yellow' | 'volcano' | 'geekblue' | 'lime' | 'gold';
export type IconPosition = 'start' | 'end';
/**
 * Button component for triggering operations.
 *
 * @element mx-button
 *
 * @attr {ButtonType} type - Button type: default, primary, dashed, text, link
 * @attr {ButtonVariant} variant - Button variant: outlined, solid, dashed, filled, text, link
 * @attr {ButtonColor} color - Button color (supports preset colors)
 * @attr {ButtonSize} size - Button size: small, middle, large
 * @attr {ButtonShape} shape - Button shape: default, circle, round
 * @attr {boolean} disabled - Whether the button is disabled
 * @attr {boolean} danger - Set danger status
 * @attr {boolean} loading - Show loading state
 * @attr {boolean} ghost - Make background transparent
 * @attr {boolean} block - Fit button width to its parent width
 * @attr {string} href - Link URL (for link buttons)
 * @attr {string} target - Link target
 * @attr {IconPosition} icon-placement - Icon position: start or end
 *
 * @slot - Default slot for button content
 * @slot icon - Icon slot
 *
 * @fires click - Fired when button is clicked
 *
 * @example
 * ```html
 * <!-- Primary button -->
 * <mx-button type="primary">Primary</mx-button>
 *
 * <!-- Button with icon -->
 * <mx-button>
 *   <mx-icon slot="icon" svg="..."></mx-icon>
 *   Button with Icon
 * </mx-button>
 *
 * <!-- Loading button -->
 * <mx-button loading>Loading</mx-button>
 *
 * <!-- Danger button -->
 * <mx-button danger type="primary">Delete</mx-button>
 *
 * <!-- Link button -->
 * <mx-button type="link" href="https://example.com">Link</mx-button>
 * ```
 */
export declare class MXButton extends LitElement {
    static styles: import("lit").CSSResult;
    type: ButtonType;
    variant?: ButtonVariant;
    color?: ButtonColor;
    size: ButtonSize;
    shape: ButtonShape;
    disabled: boolean;
    danger: boolean;
    loading: boolean;
    ghost: boolean;
    block: boolean;
    href: string;
    target: string;
    iconPlacement: IconPosition;
    htmlType: 'button' | 'submit' | 'reset';
    private defaultSlot;
    private iconOnly;
    private handleSlotChange;
    private handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-button': MXButton;
    }
}
//# sourceMappingURL=mx-button.d.ts.map