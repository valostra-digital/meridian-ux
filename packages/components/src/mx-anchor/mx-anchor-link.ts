import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Anchor link component for individual navigation items.
 * 
 * @element mx-anchor-link
 * 
 * @attr {string} href - Target section id (with #)
 * @attr {string} label - Link text label
 * @attr {boolean} active - Whether this link is currently active
 * 
 * @fires click - Fired when link is clicked
 * 
 * @slot - Nested anchor links
 * 
 * @example
 * ```html
 * <mx-anchor-link href="#section1" label="Section 1"></mx-anchor-link>
 * <mx-anchor-link href="#section2" label="Section 2">
 *   <mx-anchor-link href="#section2-1" label="Sub Section 2.1"></mx-anchor-link>
 * </mx-anchor-link>
 * ```
 */
@customElement('mx-anchor-link')
export class MXAnchorLink extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-anchor-link {
      position: relative;
      padding: 4px 0;
      line-height: 1.5715;
    }

    .mx-anchor-link-title {
      position: relative;
      display: block;
      margin-bottom: 4px;
      padding-left: 16px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .mx-anchor-link-title:hover {
      color: var(--mx-color-primary, #1677ff);
    }

    .mx-anchor-link-title::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 2px;
      height: 100%;
      transform: translateY(-50%);
      background-color: transparent;
      transition: all 0.3s;
    }

    .mx-anchor-link-active .mx-anchor-link-title {
      color: var(--mx-color-primary, #1677ff);
    }

    .mx-anchor-link-active .mx-anchor-link-title::before {
      background-color: var(--mx-color-primary, #1677ff);
    }

    .mx-anchor-link-children {
      padding-left: 16px;
    }

    ::slotted(mx-anchor-link) {
      display: block;
    }
  `;

  @property({ type: String })
  href = '';

  @property({ type: String })
  label = '';

  @property({ type: Boolean })
  active = false;

  private handleClick(e: Event) {
    e.preventDefault();
    
    this.dispatchEvent(new CustomEvent('click', {
      detail: { href: this.href },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const classes = {
      'mx-anchor-link': true,
      'mx-anchor-link-active': this.active
    };

    return html`
      <div class=${classMap(classes)}>
        <a 
          href=${this.href}
          class="mx-anchor-link-title"
          @click=${this.handleClick}
        >
          ${this.label}
        </a>
        
        <div class="mx-anchor-link-children">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-anchor-link': MXAnchorLink;
  }
}
