import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type AnchorDirection = 'vertical' | 'horizontal';

/**
 * Anchor component for navigation between page sections.
 * 
 * @element mx-anchor
 * 
 * @attr {string} target-offset - Offset from top when scrolling to target (px)
 * @attr {AnchorDirection} direction - Direction of anchor links: vertical, horizontal
 * @attr {boolean} affix - Whether to fix the anchor when scrolling
 * @attr {string} current - Current active link href
 * 
 * @fires change - Fired when active link changes
 * 
 * @slot - Anchor link items (mx-anchor-link)
 * 
 * @example
 * ```html
 * <mx-anchor>
 *   <mx-anchor-link href="#section1" label="Section 1"></mx-anchor-link>
 *   <mx-anchor-link href="#section2" label="Section 2"></mx-anchor-link>
 * </mx-anchor>
 * ```
 */
@customElement('mx-anchor')
export class MXAnchor extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-anchor {
      position: relative;
      padding-left: 2px;
    }

    .mx-anchor-horizontal {
      display: flex;
      border-bottom: 1px solid var(--mx-color-border, #d9d9d9);
    }

    .mx-anchor-vertical {
      border-left: 1px solid var(--mx-color-border, #d9d9d9);
      padding-left: 4px;
    }

    .mx-anchor-affix {
      position: fixed;
      top: 0;
    }

    ::slotted(mx-anchor-link) {
      display: block;
    }
  `;

  @property({ type: String, attribute: 'target-offset' })
  targetOffset = '0';

  @property({ type: String })
  direction: AnchorDirection = 'vertical';

  @property({ type: Boolean })
  affix = false;

  @property({ type: String })
  current = '';

  @state()
  private isFixed = false;

  private intersectionObserver?: IntersectionObserver;
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
    if (!this.affix) return;

    this.scrollListener = () => {
      const rect = this.getBoundingClientRect();
      this.isFixed = rect.top <= 0;
    };

    window.addEventListener('scroll', this.scrollListener as EventListener);
  }

  private cleanupScrollListener() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener as EventListener);
    }
  }

  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const links = slot.assignedElements() as any[];
    
    links.forEach(link => {
      link.addEventListener('click', (e: Event) => {
        const customEvent = e as CustomEvent;
        this.handleLinkClick(customEvent.detail?.href || '');
      });
    });
  }

  private handleLinkClick(href: string) {
    this.current = href;
    
    this.dispatchEvent(new CustomEvent('change', {
      detail: { href },
      bubbles: true,
      composed: true
    }));

    // Scroll to target
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offset = parseInt(this.targetOffset);
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  render() {
    const classes = {
      'mx-anchor': true,
      [`mx-anchor-${this.direction}`]: true,
      'mx-anchor-affix': this.affix && this.isFixed
    };

    return html`
      <div class=${classMap(classes)}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-anchor': MXAnchor;
  }
}
