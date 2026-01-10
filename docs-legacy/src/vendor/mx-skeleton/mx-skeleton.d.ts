import { LitElement } from 'lit';
export type SkeletonShape = 'default' | 'circle' | 'round' | 'square';
export type SkeletonSize = 'default' | 'small' | 'large';
/**
 * Skeleton component for loading placeholders.
 *
 * @element mx-skeleton
 *
 * @attr {boolean} active - Whether to show animation
 * @attr {boolean} loading - Whether to show skeleton (when false, shows children)
 * @attr {boolean} paragraph - Whether to show paragraph placeholder
 * @attr {boolean} avatar - Whether to show avatar placeholder
 * @attr {boolean} show-title - Whether to show title placeholder
 * @attr {SkeletonShape} avatar-shape - Shape of avatar: circle, square
 * @attr {SkeletonSize} avatar-size - Size of avatar
 * @attr {number} rows - Number of paragraph rows (default 3)
 *
 * @slot - Content to show when loading is false
 *
 * @example
 * ```html
 * <mx-skeleton active></mx-skeleton>
 * <mx-skeleton avatar paragraph></mx-skeleton>
 * ```
 */
export declare class MXSkeleton extends LitElement {
    static styles: import("lit").CSSResult;
    active: boolean;
    loading: boolean;
    paragraph: boolean;
    avatar: boolean;
    showTitle: boolean;
    avatarShape: SkeletonShape;
    avatarSize: SkeletonSize;
    rows: number;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-skeleton': MXSkeleton;
    }
}
//# sourceMappingURL=mx-skeleton.d.ts.map