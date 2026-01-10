import { LitElement } from 'lit';
export type CardSize = 'default' | 'small';
/**
 * Card component for displaying content in a container.
 *
 * @element mx-card
 *
 * @attr {string} title - Card title
 * @attr {boolean} bordered - Whether card has border
 * @attr {boolean} hoverable - Whether card is hoverable with lift effect
 * @attr {boolean} loading - Whether card is in loading state
 * @attr {CardSize} size - Size of card: default, small
 *
 * @slot - Default content area
 * @slot title - Custom title content (overrides title property)
 * @slot extra - Extra content in the header (right side)
 * @slot cover - Cover image or media
 * @slot actions - Action buttons at the bottom
 *
 * @example
 * ```html
 * <!-- Simple card -->
 * <mx-card title="Card Title">
 *   Card content
 * </mx-card>
 *
 * <!-- With cover image -->
 * <mx-card>
 *   <img slot="cover" src="..." alt="cover">
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </mx-card>
 *
 * <!-- With actions -->
 * <mx-card title="Card">
 *   <p>Content</p>
 *   <div slot="actions">
 *     <button>Action 1</button>
 *     <button>Action 2</button>
 *   </div>
 * </mx-card>
 *
 * <!-- Hoverable -->
 * <mx-card hoverable>
 *   Content
 * </mx-card>
 * ```
 */
export declare class MXCard extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Card title
     */
    title: string;
    /**
     * Whether card has border
     */
    bordered: boolean;
    /**
     * Whether card is hoverable
     */
    hoverable: boolean;
    /**
     * Whether card is in loading state
     */
    loading: boolean;
    /**
     * Size of card
     */
    size: CardSize;
    private renderLoadingSkeleton;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-card': MXCard;
    }
}
//# sourceMappingURL=mx-card.d.ts.map