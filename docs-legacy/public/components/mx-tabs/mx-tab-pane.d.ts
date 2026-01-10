import { LitElement } from 'lit';
/**
 * Tab Pane component - Individual tab content
 *
 * @element mx-tab-pane
 *
 * @slot - Content to display when tab is active
 */
export declare class MXTabPane extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Tab key (unique identifier)
     */
    tab: string;
    /**
     * Tab label text
     */
    label?: string;
    /**
     * Whether tab is disabled
     */
    disabled: boolean;
    /**
     * Whether tab is closable (editable-card mode)
     */
    closable: boolean;
    /**
     * Whether tab is active
     */
    active: boolean;
    /**
     * Force render content even when inactive
     */
    forceRender: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-tab-pane': MXTabPane;
    }
}
//# sourceMappingURL=mx-tab-pane.d.ts.map