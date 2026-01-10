import { LitElement } from 'lit';
export type FloatButtonType = 'default' | 'primary';
export type FloatButtonShape = 'circle' | 'square';
/**
 * Float button component for floating action buttons.
 *
 * @element mx-float-button
 *
 * @attr {FloatButtonType} type - Button type: default, primary
 * @attr {FloatButtonShape} shape - Button shape: circle, square
 * @attr {string} icon - Icon to display
 * @attr {string} description - Description text
 * @attr {string} tooltip - Tooltip text
 * @attr {string} href - Link URL (makes button a link)
 * @attr {string} target - Link target (_blank, _self, etc)
 *
 * @fires click - Fired when button is clicked
 *
 * @slot - Custom content (icon, text)
 * @slot icon - Custom icon content
 * @slot description - Custom description
 *
 * @example
 * ```html
 * <mx-float-button
 *   type="primary"
 *   icon="+"
 *   tooltip="Add new"
 * ></mx-float-button>
 * ```
 */
export declare class MXFloatButton extends LitElement {
    static styles: import("lit").CSSResult;
    type: FloatButtonType;
    shape: FloatButtonShape;
    icon: string;
    description: string;
    tooltip: string;
    href: string;
    target: string;
    private handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-float-button': MXFloatButton;
    }
}
//# sourceMappingURL=mx-float-button.d.ts.map