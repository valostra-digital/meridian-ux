import { LitElement, PropertyValues } from 'lit';
export type SpaceSize = 'small' | 'middle' | 'large' | number;
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';
export type SpaceDirection = 'horizontal' | 'vertical';
/**
 * Space component - Set components spacing
 *
 * @element mx-space
 *
 * @fires change - Dispatched when children change
 *
 * @slot - Default slot for space items
 *
 * @cssprop --mx-space-gap - Custom gap size
 */
export declare class MXSpace extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Size of the space (preset or number in pixels)
     */
    size: SpaceSize;
    /**
     * Direction of the space
     */
    direction: SpaceDirection;
    /**
     * Align items
     */
    align?: SpaceAlign;
    /**
     * Auto wrap items
     */
    wrap: boolean;
    /**
     * Display as block (take full width)
     */
    block: boolean;
    /**
     * Compact mode (remove spacing and connect borders)
     */
    compact: boolean;
    /**
     * Custom split element between items
     */
    split?: string;
    private gapSize;
    private readonly sizeMap;
    protected willUpdate(changedProperties: PropertyValues): void;
    private updateGapSize;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-space': MXSpace;
    }
}
//# sourceMappingURL=mx-space.d.ts.map