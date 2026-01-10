import { LitElement } from 'lit';
export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';
export type DrawerSize = 'default' | 'large';
/**
 * Drawer component for panel that slides out from edge of screen.
 *
 * @element mx-drawer
 *
 * @attr {boolean} open - Whether drawer is visible
 * @attr {string} title - Drawer title
 * @attr {DrawerPlacement} placement - Edge to slide from
 * @attr {boolean} closable - Whether to show close button
 * @attr {boolean} mask - Whether to show overlay mask
 * @attr {boolean} mask-closable - Whether clicking mask closes drawer
 * @attr {number} width - Width for left/right drawers (default 378px)
 * @attr {number} height - Height for top/bottom drawers (default 378px)
 * @attr {number} z-index - CSS z-index
 * @attr {DrawerSize} size - Predefined size: default, large
 *
 * @slot - Drawer content
 * @slot title - Custom title content
 * @slot extra - Extra actions in header
 * @slot footer - Footer content
 *
 * @fires close - Dispatched when drawer is closed
 *
 * @example
 * ```html
 * <mx-drawer open title="Drawer Title">
 *   <p>Drawer content</p>
 * </mx-drawer>
 * ```
 */
export declare class MXDrawer extends LitElement {
    static styles: import("lit").CSSResult;
    open: boolean;
    title: string;
    placement: DrawerPlacement;
    closable: boolean;
    mask: boolean;
    maskClosable: boolean;
    width: number;
    height: number;
    zIndex: number;
    size: DrawerSize;
    private animating;
    private handleClose;
    private handleMaskClick;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1> | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-drawer': MXDrawer;
    }
}
//# sourceMappingURL=mx-drawer.d.ts.map