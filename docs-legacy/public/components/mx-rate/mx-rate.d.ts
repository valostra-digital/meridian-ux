import { LitElement } from 'lit';
/**
 * Rate component - Star rating
 *
 * @element mx-rate
 *
 * @fires change - Dispatched when rating changes
 * @fires hover-change - Dispatched when hovering over stars
 */
export declare class MXRate extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Number of stars
     */
    count: number;
    /**
     * Current value
     */
    value: number;
    /**
     * Default value
     */
    defaultValue: number;
    /**
     * Allow half star
     */
    allowHalf: boolean;
    /**
     * Allow clear when click again
     */
    allowClear: boolean;
    /**
     * Whether disabled
     */
    disabled: boolean;
    /**
     * Read-only mode
     */
    readonly: boolean;
    /**
     * Auto focus
     */
    autofocus: boolean;
    /**
     * Custom character
     */
    character: string;
    /**
     * Tooltips for each star
     */
    tooltips?: string[];
    private internalValue;
    private hoverValue;
    private focused;
    private focusedIndex;
    connectedCallback(): void;
    private handleStarClick;
    private handleStarHover;
    private handleMouseLeave;
    private handleKeyDown;
    private dispatchChangeEvent;
    private getStarState;
    private renderStar;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-rate': MXRate;
    }
}
//# sourceMappingURL=mx-rate.d.ts.map