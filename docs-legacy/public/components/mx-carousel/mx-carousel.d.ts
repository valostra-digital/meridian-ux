import { LitElement } from 'lit';
export type CarouselDotPosition = 'top' | 'bottom' | 'left' | 'right';
export type CarouselEffect = 'scrollx' | 'fade';
/**
 * Carousel component - Image/content carousel slider.
 *
 * @element mx-carousel
 *
 * @attr {boolean} autoplay - Whether to auto-play slides
 * @attr {number} autoplay-speed - Auto-play interval in milliseconds
 * @attr {CarouselDotPosition} dot-position - Position of navigation dots
 * @attr {boolean} dots - Show navigation dots
 * @attr {boolean} arrows - Show prev/next arrows
 * @attr {CarouselEffect} effect - Transition effect: scrollx or fade
 * @attr {number} current - Current slide index (0-based)
 * @attr {boolean} infinite - Enable infinite loop
 * @attr {number} speed - Transition duration in milliseconds
 *
 * @slot - Default slot for slides
 *
 * @fires after-change - Fired after slide changes
 * @fires before-change - Fired before slide changes
 *
 * @example
 * ```html
 * <mx-carousel autoplay>
 *   <div>Slide 1</div>
 *   <div>Slide 2</div>
 *   <div>Slide 3</div>
 * </mx-carousel>
 * ```
 */
export declare class MXCarousel extends LitElement {
    static styles: import("lit").CSSResult;
    autoplay: boolean;
    autoplaySpeed: number;
    dotPosition: CarouselDotPosition;
    dots: boolean;
    arrows: boolean;
    effect: CarouselEffect;
    current: number;
    infinite: boolean;
    speed: number;
    private slideCount;
    private currentIndex;
    private defaultSlot;
    private autoplayTimer?;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    private handleSlotChange;
    private updateSlideCount;
    private goTo;
    private next;
    private prev;
    private startAutoplay;
    private stopAutoplay;
    private handleMouseEnter;
    private handleMouseLeave;
    /**
     * Go to specific slide
     */
    goToSlide(index: number): void;
    /**
     * Go to next slide
     */
    nextSlide(): void;
    /**
     * Go to previous slide
     */
    prevSlide(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-carousel': MXCarousel;
    }
}
//# sourceMappingURL=mx-carousel.d.ts.map