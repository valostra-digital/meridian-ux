import { LitElement } from 'lit';
export type TabsType = 'line' | 'card' | 'editable-card';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';
export type TabsSize = 'large' | 'middle' | 'small';
/**
 * Tabs component - Tab navigation container
 *
 * @element mx-tabs
 *
 * @slot - Tab pane elements (mx-tab-pane)
 * @slot tab-bar-extra-content - Extra content in tab bar
 *
 * @fires change - Dispatched when active tab changes
 * @fires edit - Dispatched when add/remove tab in editable mode
 *
 * @cssprop --mx-tabs-ink-bar-color - Color of the active indicator bar
 */
export declare class MXTabs extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Active tab key
     */
    activeKey?: string;
    /**
     * Initial active tab key
     */
    defaultActiveKey?: string;
    /**
     * Type of tabs
     */
    type: TabsType;
    /**
     * Position of tabs
     */
    tabPosition: TabsPosition;
    /**
     * Size of tabs
     */
    size: TabsSize;
    /**
     * Whether tabs are centered
     */
    centered: boolean;
    /**
     * Whether tabs can be closed (editable-card only)
     */
    hideAdd: boolean;
    /**
     * Whether tabs are animated
     */
    animated: boolean;
    private internalActiveKey?;
    private inkBarStyle;
    private navList?;
    private inkBar?;
    connectedCallback(): void;
    firstUpdated(): void;
    updated(changedProperties: Map<string, any>): void;
    private get currentActiveKey();
    private updateInkBar;
    private updatePanes;
    private handleTabClick;
    private handleAddTab;
    private handleRemoveTab;
    private renderTabs;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-tabs': MXTabs;
    }
}
//# sourceMappingURL=mx-tabs.d.ts.map