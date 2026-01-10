var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let MXBackTop = class MXBackTop extends LitElement {
    constructor() {
        super(...arguments);
        this.visibilityHeight = 400;
        this.target = '';
        this.duration = 450;
        this.visible = false;
    }
    connectedCallback() {
        super.connectedCallback();
        this.setupScrollListener();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.cleanupScrollListener();
    }
    setupScrollListener() {
        // Get scroll container
        if (this.target) {
            const container = document.querySelector(this.target);
            this.scrollContainer = container || window;
        }
        else {
            this.scrollContainer = window;
        }
        this.scrollListener = this.handleScroll.bind(this);
        if (this.scrollContainer === window) {
            window.addEventListener('scroll', this.scrollListener);
        }
        else {
            this.scrollContainer.addEventListener('scroll', this.scrollListener);
        }
        // Initial check
        this.handleScroll();
    }
    cleanupScrollListener() {
        if (this.scrollListener) {
            if (this.scrollContainer === window) {
                window.removeEventListener('scroll', this.scrollListener);
            }
            else if (this.scrollContainer) {
                this.scrollContainer.removeEventListener('scroll', this.scrollListener);
            }
        }
    }
    handleScroll() {
        let scrollTop = 0;
        if (this.scrollContainer === window) {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        }
        else {
            scrollTop = this.scrollContainer.scrollTop;
        }
        this.visible = scrollTop >= this.visibilityHeight;
    }
    handleClick() {
        this.dispatchEvent(new CustomEvent('click', {
            bubbles: true,
            composed: true
        }));
        this.scrollToTop();
    }
    scrollToTop() {
        const startTime = performance.now();
        const startScrollTop = this.scrollContainer === window
            ? window.pageYOffset
            : this.scrollContainer.scrollTop;
        const scroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const scrollTop = startScrollTop * (1 - easeOut);
            if (this.scrollContainer === window) {
                window.scrollTo(0, scrollTop);
            }
            else {
                this.scrollContainer.scrollTop = scrollTop;
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
        return html `
      <div 
        class=${classMap(classes)}
        @click=${this.handleClick}
        role="button"
        tabindex="0"
        aria-label="Back to top"
      >
        ${hasCustomContent ? html `
          <div class="mx-back-top-content">
            <slot></slot>
          </div>
        ` : html `
          <svg class="mx-back-top-icon" viewBox="0 0 1024 1024" fill="currentColor">
            <path d="M868 545.5L536.1 163a31.96 31.96 0 0 0-48.2 0L156 545.5a7.97 7.97 0 0 0 6 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"/>
          </svg>
        `}
      </div>
    `;
    }
};
MXBackTop.styles = css `
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
__decorate([
    property({ type: Number, attribute: 'visibility-height' })
], MXBackTop.prototype, "visibilityHeight", void 0);
__decorate([
    property({ type: String })
], MXBackTop.prototype, "target", void 0);
__decorate([
    property({ type: Number })
], MXBackTop.prototype, "duration", void 0);
__decorate([
    state()
], MXBackTop.prototype, "visible", void 0);
MXBackTop = __decorate([
    customElement('mx-back-top')
], MXBackTop);
export { MXBackTop };
//# sourceMappingURL=mx-back-top.js.map