import { LitElement, PropertyValues } from 'lit';
export type SliderMarks = Record<number, string | {
    label: string;
    style?: any;
}>;
/**
 * Slider component - Range slider for selecting values
 *
 * @element mx-slider
 *
 * @fires change - Dispatched when value changes (on release)
 * @fires after-change - Dispatched after interaction completes
 */
export declare class MXSlider extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Current value (or range values)
     */
    value?: number | [number, number];
    /**
     * Default value
     */
    defaultValue?: number | [number, number];
    /**
     * Minimum value
     */
    min: number;
    /**
     * Maximum value
     */
    max: number;
    /**
     * Step size
     */
    step: number;
    /**
     * Whether disabled
     */
    disabled: boolean;
    /**
     * Marks on the slider
     */
    marks?: SliderMarks;
    /**
     * Show dots for each step
     */
    dots: boolean;
    /**
     * Whether to show tooltip
     */
    tooltipVisible: boolean;
    /**
     * Vertical mode
     */
    vertical: boolean;
    /**
     * Range mode
     */
    range: boolean;
    /**
     * Whether value can only be set at marks
     */
    included: boolean;
    /**
     * Reverse the slider direction
     */
    reverse: boolean;
    private internalValue;
    private dragging;
    private activeHandle;
    private rail?;
    connectedCallback(): void;
    protected willUpdate(changedProperties: PropertyValues): void;
    private initializeValue;
    private getPercentage;
    private getValueFromPosition;
    private handleRailClick;
    private handleMouseDown;
    private dispatchChangeEvent;
    private renderHandle;
    private renderMarks;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-slider': MXSlider;
    }
}
//# sourceMappingURL=mx-slider.d.ts.map