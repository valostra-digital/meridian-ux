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
@customElement('mx-affix')
export class MXAffix extends LitElement {
  static styles = css`
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

  @property({ type: Number, attribute: 'offset-top' })
  affixOffsetTop?: number;

  @property({ type: Number, attribute: 'offset-bottom' })
  affixOffsetBottom?: number;

  @property({ type: String })
  target = '';

  @state()
  private isFixed = false;

  @state()
  private placeholderHeight = 0;

  @state()
  private placeholderWidth = 0;

  @state()
  private fixedStyles = '';

  private scrollContainer?: Window | HTMLElement;
  private scrollListener?: EventListener;
  private resizeObserver?: ResizeObserver;
  private originalRect?: DOMRect;

  connectedCallback() {
    super.connectedCallback();
    this.setupScrollListener();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupScrollListener();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('target')) {
      this.cleanupScrollListener();
      this.setupScrollListener();
    }
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

    // Setup resize observer
    this.resizeObserver = new ResizeObserver(() => {
      this.handleScroll();
    });
    this.resizeObserver.observe(this);

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

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private handleScroll() {
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

    return html`
      ${this.isFixed ? html`
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
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-affix': MXAffix;
  }
}
