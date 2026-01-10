import { LitElement } from 'lit';
/**
 * Collapse panel component (child of mx-collapse).
 *
 * @element mx-collapse-panel
 *
 * @attr {string} key - Unique key for the panel
 * @attr {string} header - Panel header text
 * @attr {boolean} active - Whether panel is expanded
 * @attr {boolean} disabled - Whether panel is disabled
 * @attr {boolean} show-arrow - Whether to show expand arrow
 * @attr {boolean} collapsible - Whether panel can be collapsed: header, disabled
 * @attr {string} expand-icon-position - Position of expand icon: start, end
 *
 * @slot - Panel content
 * @slot header - Custom header content
 * @slot extra - Extra content in header (right side)
 *
 * @example
 * ```html
 * <mx-collapse-panel key="1" header="Panel Title">
 *   Panel content here
 * </mx-collapse-panel>
 * ```
 */
export declare class MXCollapsePanel extends LitElement {
    static styles: import("lit").CSSResult;
    key: string;
    header: string;
    active: boolean;
    disabled: boolean;
    showArrow: boolean;
    collapsible: 'header' | 'disabled' | '';
    expandIconPosition: 'start' | 'end';
    private animating;
    private contentElement?;
    private handleHeaderClick;
    private handleArrowClick;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    private renderExpandIcon;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-collapse-panel': MXCollapsePanel;
    }
}
//# sourceMappingURL=mx-collapse-panel.d.ts.map