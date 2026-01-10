import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Back to top button that scrolls to top when clicked.
 * 
 * @element mx-back-top
 * 
 * @attr {number} visibility-height - Height threshold to show button (default 400px)
 * @attr {string} target - Scrolling container selector (defaults to window)
 * @attr {number} duration - Scroll animation duration in ms (default 450)
 * 
 * @fires click - Fired when button is clicked
 * 
 * @slot - Custom button content (default: up arrow icon)
 * 
 * @example
 * ```html
 * <mx-back-top visibility-height="300"></mx-back-top>
 * <mx-back-top>
 *   <div>Top</div>
 * </mx-back-top>
 * ```
 */
@customElement('mx-back-top')
export class MXBackTop extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      position: fixed;
      right: 24px;
      bottom: 24px;
      z-index: 10;
    }

    .mx-back-top {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--mx-color-bg-elevated, #ffffff);
      border-radius: var(--mx-border-radius, 6px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      transition: all 0.3s;
      opacity: 0;
      visibility: hidden;
    }

    .mx-back-top-visible {
      opacity: 1;
      visibility: visible;
    }

    .mx-back-top:hover {
      background-color: var(--mx-color-primary, #1677ff);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
    }

    .mx-back-top:hover .mx-back-top-icon {
      color: #ffffff;
    }

    .mx-back-top-icon {
      width: 16px;
      height: 16px;
      color: var(--mx-color-primary, #1677ff);
      transition: color 0.3s;
    }

    .mx-back-top-content {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  @property({ type: Number, attribute: 'visibility-height' })
  visibilityHeight = 400;

  @property({ type: String })
  target = '';

  @property({ type: Number })
  duration = 450;

  @state()
  private visible = false;

  private scrollContainer?: Window | HTMLElement;
  private scrollListener?: EventListener;

  connectedCallback() {
    super.connectedCallback();
    this.setupScrollListener();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupScrollListener();
  }

  private setupScrollListener() {
    // Get scroll container
    if (this.target) {
      const container = document.querySelector(this.target);
      this.scrollContainer = container as HTMLElement || window;
    } else {
      this.scrollContainer = window;
    }

    this.scrollListener = this.handleScroll.bind(this);
    
    if (this.scrollContainer === window) {
      window.addEventListener('scroll', this.scrollListener as EventListener);
    } else {
      (this.scrollContainer as HTMLElement).addEventListener('scroll', this.scrollListener as EventListener);
    }

    // Initial check
    this.handleScroll();
  }

  private cleanupScrollListener() {
    if (this.scrollListener) {
      if (this.scrollContainer === window) {
        window.removeEventListener('scroll', this.scrollListener as EventListener);
      } else if (this.scrollContainer) {
        (this.scrollContainer as HTMLElement).removeEventListener('scroll', this.scrollListener as EventListener);
      }
    }
  }

  private handleScroll() {
    let scrollTop = 0;

    if (this.scrollContainer === window) {
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    } else {
      scrollTop = (this.scrollContainer as HTMLElement).scrollTop;
    }

    this.visible = scrollTop >= this.visibilityHeight;
  }

  private handleClick() {
    this.dispatchEvent(new CustomEvent('click', {
      bubbles: true,
      composed: true
    }));

    this.scrollToTop();
  }

  private scrollToTop() {
    const startTime = performance.now();
    const startScrollTop = this.scrollContainer === window 
      ? window.pageYOffset 
      : (this.scrollContainer as HTMLElement).scrollTop;

    const scroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const scrollTop = startScrollTop * (1 - easeOut);

      if (this.scrollContainer === window) {
        window.scrollTo(0, scrollTop);
      } else {
        (this.scrollContainer as HTMLElement).scrollTop = scrollTop;
      }

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  }

  render() {
    const classes = {
      'mx-back-top': true,
      'mx-back-top-visible': this.visible
    };

    const hasCustomContent = this.shadowRoot?.querySelector('slot')?.assignedNodes().length ?? 0;

    return html`
      <div 
        class=${classMap(classes)}
        @click=${this.handleClick}
        role="button"
        tabindex="0"
        aria-label="Back to top"
      >
        ${hasCustomContent ? html`
          <div class="mx-back-top-content">
            <slot></slot>
          </div>
        ` : html`
          <svg class="mx-back-top-icon" viewBox="0 0 1024 1024" fill="currentColor">
            <path d="M868 545.5L536.1 163a31.96 31.96 0 0 0-48.2 0L156 545.5a7.97 7.97 0 0 0 6 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"/>
          </svg>
        `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-back-top': MXBackTop;
  }
}
