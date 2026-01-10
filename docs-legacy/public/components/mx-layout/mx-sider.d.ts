import { LitElement, PropertyValues } from 'lit';
export type SiderTheme = 'light' | 'dark';
export type SiderBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
/**
 * Sider component - Layout sidebar
 *
 * @element mx-sider
 *
 * @slot - Sider content
 * @slot trigger - Custom collapse trigger
 *
 * @fires collapse - Dispatched when sider collapses/expands
 * @fires breakpoint - Dispatched when breakpoint is triggered
 */
export declare class MXSider extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Width of the sider
     */
    width: number;
    /**
     * Width when collapsed
     */
    collapsedWidth: number;
    /**
     * Whether sider is collapsible
     */
    collapsible: boolean;
    /**
     * Whether sider is collapsed (controlled)
     */
    collapsed: boolean;
    /**
     * Default collapsed state
     */
    defaultCollapsed: boolean;
    /**
     * Whether to show collapse trigger
     */
    showTrigger: boolean;
    /**
     * Theme
     */
    theme: SiderTheme;
    /**
     * Breakpoint for responsive collapse
     */
    breakpoint?: SiderBreakpoint;
    /**
     * Reverse arrow direction
     */
    reverseArrow: boolean;
    private internalCollapsed;
    private below;
    private resizeObserver?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changedProperties: PropertyValues): void;
    private get isCollapsed();
    private setupBreakpointObserver;
    private handleTriggerClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-sider': MXSider;
    }
}
//# sourceMappingURL=mx-sider.d.ts.map