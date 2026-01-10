import { LitElement } from 'lit';
/**
 * Collapse container component for accordion panels.
 *
 * @element mx-collapse
 *
 * @attr {string} active-key - Currently active panel key(s), comma-separated for multiple
 * @attr {boolean} accordion - Accordion mode (only one panel open at a time)
 * @attr {boolean} bordered - Whether to show border
 * @attr {string} expand-icon-position - Position of expand icon: start, end
 * @attr {boolean} ghost - Make collapse borderless and transparent
 *
 * @slot - Collapse panel items (mx-collapse-panel elements)
 *
 * @fires change - Dispatched when active panels change
 *
 * @example
 * ```html
 * <mx-collapse>
 *   <mx-collapse-panel key="1" header="Panel 1">Content 1</mx-collapse-panel>
 *   <mx-collapse-panel key="2" header="Panel 2">Content 2</mx-collapse-panel>
 * </mx-collapse>
 *
 * <!-- Accordion mode -->
 * <mx-collapse accordion active-key="1">
 *   <mx-collapse-panel key="1" header="Panel 1">Content 1</mx-collapse-panel>
 *   <mx-collapse-panel key="2" header="Panel 2">Content 2</mx-collapse-panel>
 * </mx-collapse>
 * ```
 */
export declare class MXCollapse extends LitElement {
    static styles: import("lit").CSSResult;
    activeKey: string;
    accordion: boolean;
    bordered: boolean;
    expandIconPosition: 'start' | 'end';
    ghost: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handlePanelToggle;
    private updatePanels;
    firstUpdated(): void;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-collapse': MXCollapse;
    }
}
//# sourceMappingURL=mx-collapse.d.ts.map