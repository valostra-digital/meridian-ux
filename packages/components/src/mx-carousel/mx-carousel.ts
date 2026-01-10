import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

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
@customElement('mx-carousel')
export class MXCarousel extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-carousel {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .mx-carousel-track {
      display: flex;
      transition: transform 0.5s ease-in-out;
      height: 100%;
    }

    .mx-carousel-track-fade {
      position: relative;
    }

    ::slotted(*) {
      flex-shrink: 0;
      width: 100%;
      height: 100%;
    }

    .mx-carousel-fade ::slotted(*) {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
      pointer-events: none;
    }

    .mx-carousel-fade ::slotted(.mx-carousel-slide-active) {
      opacity: 1;
      pointer-events: auto;
    }

    /* Dots */
    .mx-carousel-dots {
      position: absolute;
      display: flex;
      gap: 8px;
      margin: 0;
      padding: 0;
      list-style: none;
      z-index: 10;
    }

    .mx-carousel-dots-bottom {
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
    }

    .mx-carousel-dots-top {
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
    }

    .mx-carousel-dots-left {
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      flex-direction: column;
    }

    .mx-carousel-dots-right {
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      flex-direction: column;
    }

    .mx-carousel-dot {
      display: block;
      width: 16px;
      height: 3px;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.3s;
      border: none;
      padding: 0;
    }

    .mx-carousel-dot:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }

    .mx-carousel-dot-active {
      width: 24px;
      background-color: rgba(255, 255, 255, 1);
    }

    /* Arrows */
    .mx-carousel-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.3);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      z-index: 10;
      transition: all 0.3s;
      color: rgba(0, 0, 0, 0.88);
    }

    .mx-carousel-arrow:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }

    .mx-carousel-arrow-prev {
      left: 12px;
    }

    .mx-carousel-arrow-next {
      right: 12px;
    }

    .mx-carousel-arrow svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
  `;

  @property({ type: Boolean })
  autoplay = false;

  @property({ type: Number, attribute: 'autoplay-speed' })
  autoplaySpeed = 3000;

  @property({ type: String, attribute: 'dot-position' })
  dotPosition: CarouselDotPosition = 'bottom';

  @property({ type: Boolean })
  dots = true;

  @property({ type: Boolean })
  arrows = false;

  @property({ type: String })
  effect: CarouselEffect = 'scrollx';

  @property({ type: Number })
  current = 0;

  @property({ type: Boolean })
  infinite = true;

  @property({ type: Number })
  speed = 500;

  @state()
  private slideCount = 0;

  @state()
  private currentIndex = 0;

  @query('slot')
  private defaultSlot!: HTMLSlotElement;

  private autoplayTimer?: number;

  connectedCallback() {
    super.connectedCallback();
    this.currentIndex = this.current;
  }

  firstUpdated() {
    this.updateSlideCount();
    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopAutoplay();
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('current')) {
      this.currentIndex = this.current;
    }

    if (changedProperties.has('autoplay')) {
      if (this.autoplay) {
        this.startAutoplay();
      } else {
        this.stopAutoplay();
      }
    }
  }

  private handleSlotChange() {
    this.updateSlideCount();
  }

  private updateSlideCount() {
    const nodes = this.defaultSlot?.assignedElements() || [];
    this.slideCount = nodes.length;
    
    // Update slide classes for fade effect
    if (this.effect === 'fade') {
      nodes.forEach((node, index) => {
        if (index === this.currentIndex) {
          node.classList.add('mx-carousel-slide-active');
        } else {
          node.classList.remove('mx-carousel-slide-active');
        }
      });
    }
  }

  private goTo(index: number) {
    if (this.slideCount === 0) return;

    // Dispatch before-change event
    this.dispatchEvent(new CustomEvent('before-change', {
      detail: { from: this.currentIndex, to: index },
      bubbles: true,
      composed: true
    }));

    this.currentIndex = index;
    this.current = index;

    // Update slide classes for fade effect
    if (this.effect === 'fade') {
      const nodes = this.defaultSlot?.assignedElements() || [];
      nodes.forEach((node, i) => {
        if (i === this.currentIndex) {
          node.classList.add('mx-carousel-slide-active');
        } else {
          node.classList.remove('mx-carousel-slide-active');
        }
      });
    }

    // Dispatch after-change event
    this.dispatchEvent(new CustomEvent('after-change', {
      detail: { current: this.currentIndex },
      bubbles: true,
      composed: true
    }));

    this.requestUpdate();
  }

  private next() {
    let nextIndex = this.currentIndex + 1;
    
    if (nextIndex >= this.slideCount) {
      if (this.infinite) {
        nextIndex = 0;
      } else {
        return;
      }
    }
    
    this.goTo(nextIndex);
  }

  private prev() {
    let prevIndex = this.currentIndex - 1;
    
    if (prevIndex < 0) {
      if (this.infinite) {
        prevIndex = this.slideCount - 1;
      } else {
        return;
      }
    }
    
    this.goTo(prevIndex);
  }

  private startAutoplay() {
    this.stopAutoplay();
    
    this.autoplayTimer = window.setInterval(() => {
      this.next();
    }, this.autoplaySpeed);
  }

  private stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = undefined;
    }
  }

  private handleMouseEnter() {
    if (this.autoplay) {
      this.stopAutoplay();
    }
  }

  private handleMouseLeave() {
    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  /**
   * Go to specific slide
   */
  goToSlide(index: number) {
    if (index >= 0 && index < this.slideCount) {
      this.goTo(index);
    }
  }

  /**
   * Go to next slide
   */
  nextSlide() {
    this.next();
  }

  /**
   * Go to previous slide
   */
  prevSlide() {
    this.prev();
  }

  render() {
    const carouselClasses = {
      'mx-carousel': true,
      'mx-carousel-fade': this.effect === 'fade',
    };

    const trackClasses = {
      'mx-carousel-track': true,
      'mx-carousel-track-fade': this.effect === 'fade',
    };

    const trackStyle = this.effect === 'scrollx' 
      ? `transform: translateX(-${this.currentIndex * 100}%)`
      : '';

    const prevArrow = html`
      <svg viewBox="64 64 896 896">
        <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"/>
      </svg>
    `;

    const nextArrow = html`
      <svg viewBox="64 64 896 896">
        <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"/>
      </svg>
    `;

    return html`
      <div 
        class=${classMap(carouselClasses)}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <div class=${classMap(trackClasses)} style=${trackStyle}>
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>

        ${this.dots ? html`
          <div class="mx-carousel-dots mx-carousel-dots-${this.dotPosition}">
            ${Array.from({ length: this.slideCount }).map((_, index) => html`
              <button
                class="mx-carousel-dot ${index === this.currentIndex ? 'mx-carousel-dot-active' : ''}"
                @click=${() => this.goTo(index)}
                aria-label="Go to slide ${index + 1}"
              ></button>
            `)}
          </div>
        ` : ''}

        ${this.arrows ? html`
          <button 
            class="mx-carousel-arrow mx-carousel-arrow-prev"
            @click=${() => this.prev()}
            aria-label="Previous slide"
          >
            ${prevArrow}
          </button>
          <button 
            class="mx-carousel-arrow mx-carousel-arrow-next"
            @click=${() => this.next()}
            aria-label="Next slide"
          >
            ${nextArrow}
          </button>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-carousel': MXCarousel;
  }
}
