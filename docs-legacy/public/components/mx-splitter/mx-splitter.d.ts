import { LitElement } from 'lit';
export type SplitterLayout = 'horizontal' | 'vertical';
/**
 * Splitter component - Resizable split pane layout.
 *
 * @element mx-splitter
 *
 * @attr {SplitterLayout} layout - Layout direction: horizontal or vertical
 * @attr {string} default-size - Default size of first panel (e.g., '50%', '200px')
 * @attr {string} min - Minimum size of first panel
 * @attr {string} max - Maximum size of first panel
 * @attr {boolean} collapsible - Enable collapse functionality
 * @attr {number} split-size - Size of the split bar in pixels
 *
 * @slot - First panel content (default slot)
 * @slot second - Second panel content
 *
 * @fires resize - Fired when panels are resized
 * @fires resize-end - Fired when resize ends
 *
 * @example
 * ```html
 * <mx-splitter default-size="30%">
 *   <div>Left Panel</div>
 *   <div slot="second">Right Panel</div>
 * </mx-splitter>
 *
 * <mx-splitter layout="vertical" default-size="200px">
 *   <div>Top Panel</div>
 *   <div slot="second">Bottom Panel</div>
 * </mx-splitter>
 * ```
 */
export declare class MXSplitter extends LitElement {
    static styles: import("lit").CSSResult;
    layout: SplitterLayout;
    defaultSize: string;
    min: string;
    max: string;
    collapsible: boolean;
    splitSize: number;
    private firstPanelSize;
    private dragging;
    private collapsed;
    private splitterElement;
    private firstPanel;
    private startPos;
    private startSize;
    connectedCallback(): void;
    private handleMouseDown;
    private parseSize;
    private handleCollapse;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-splitter': MXSplitter;
    }
}
//# sourceMappingURL=mx-splitter.d.ts.map