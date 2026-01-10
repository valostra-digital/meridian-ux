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
 * Affix component that fixes content to viewport when scrolling.
 *
 * @element mx-affix
 *
 * @attr {number} offset-top - Offset from top of viewport (px)
 * @attr {number} offset-bottom - Offset from bottom of viewport (px)
 * @attr {string} target - Scrolling container selector (defaults to window)
 *
 * @fires change - Fired when affix state changes
 *
 * @slot - Content to affix
 *
 * @example
 * ```html
 * <mx-affix offset-top="10">
 *   <mx-button>Fixed Button</mx-button>
 * </mx-affix>
 * ```
 */
let MXAffix = class MXAffix extends LitElement {
    constructor() {
        super(...arguments);
        this.target = '';
        this.isFixed = false;
        this.placeholderHeight = 0;
        this.placeholderWidth = 0;
        this.fixedStyles = '';
    }
    connectedCallback() {
        super.connectedCallback();
        this.setupScrollListener();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.cleanupScrollListener();
    }
    updated(changedProperties) {
        if (changedProperties.has('target')) {
            this.cleanupScrollListener();
            this.setupScrollListener();
        }
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
        // Setup resize observer
        this.resizeObserver = new ResizeObserver(() => {
            this.handleScroll();
        });
        this.resizeObserver.observe(this);
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
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }
    handleScroll() {
        if (!this.originalRect) {
            this.originalRect = this.getBoundingClientRect();
        }
        const rect = this.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        let shouldFix = false;
        let top = '';
        let bottom = '';
        // Check top offset
        if (this.affixOffsetTop !== undefined) {
            shouldFix = rect.top <= this.affixOffsetTop;
            top = `${this.affixOffsetTop}px`;
        }
        // Check bottom offset
        if (this.affixOffsetBottom !== undefined) {
            const elementBottom = rect.bottom;
            const targetBottom = viewportHeight - this.affixOffsetBottom;
            shouldFix = elementBottom >= targetBottom;
            bottom = `${this.affixOffsetBottom}px`;
        }
        if (shouldFix !== this.isFixed) {
            this.isFixed = shouldFix;
            if (shouldFix) {
                this.placeholderHeight = rect.height;
                this.placeholderWidth = rect.width;
                this.fixedStyles = `
          top: ${top};
          bottom: ${bottom};
          left: ${rect.left}px;
          width: ${rect.width}px;
        `;
            }
            this.dispatchEvent(new CustomEvent('change', {
                detail: { affixed: this.isFixed },
                bubbles: true,
                composed: true
            }));
        }
    }
    render() {
        const contentClasses = {
            'mx-affix': true,
            'mx-affix-fixed': this.isFixed
        };
        return html `
      ${this.isFixed ? html `
        <div 
          class="mx-affix-placeholder"
          style="height: ${this.placeholderHeight}px; width: ${this.placeholderWidth}px;"
        ></div>
      ` : null}
      
      <div 
        class=${classMap(contentClasses)}
        style=${this.isFixed ? this.fixedStyles : ''}
      >
        <slot></slot>
      </div>
    `;
    }
};
MXAffix.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-affix {
      position: relative;
    }

    .mx-affix-fixed {
      position: fixed;
      z-index: 10;
    }

    .mx-affix-placeholder {
      visibility: hidden;
    }
  `;
__decorate([
    property({ type: Number, attribute: 'offset-top' })
], MXAffix.prototype, "affixOffsetTop", void 0);
__decorate([
    property({ type: Number, attribute: 'offset-bottom' })
], MXAffix.prototype, "affixOffsetBottom", void 0);
__decorate([
    property({ type: String })
], MXAffix.prototype, "target", void 0);
__decorate([
    state()
], MXAffix.prototype, "isFixed", void 0);
__decorate([
    state()
], MXAffix.prototype, "placeholderHeight", void 0);
__decorate([
    state()
], MXAffix.prototype, "placeholderWidth", void 0);
__decorate([
    state()
], MXAffix.prototype, "fixedStyles", void 0);
MXAffix = __decorate([
    customElement('mx-affix')
], MXAffix);
export { MXAffix };
//# sourceMappingURL=mx-affix.js.map