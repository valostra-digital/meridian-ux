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
let MXAnchor = class MXAnchor extends LitElement {
    constructor() {
        super(...arguments);
        this.targetOffset = '0';
        this.direction = 'vertical';
        this.affix = false;
        this.current = '';
        this.isFixed = false;
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
        if (!this.affix)
            return;
        this.scrollListener = () => {
            const rect = this.getBoundingClientRect();
            this.isFixed = rect.top <= 0;
        };
        window.addEventListener('scroll', this.scrollListener);
    }
    cleanupScrollListener() {
        if (this.scrollListener) {
            window.removeEventListener('scroll', this.scrollListener);
        }
    }
    handleSlotChange(e) {
        const slot = e.target;
        const links = slot.assignedElements();
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const customEvent = e;
                this.handleLinkClick(customEvent.detail?.href || '');
            });
        });
    }
    handleLinkClick(href) {
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
        return html `
      <div class=${classMap(classes)}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
    }
};
MXAnchor.styles = css `
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
__decorate([
    property({ type: String, attribute: 'target-offset' })
], MXAnchor.prototype, "targetOffset", void 0);
__decorate([
    property({ type: String })
], MXAnchor.prototype, "direction", void 0);
__decorate([
    property({ type: Boolean })
], MXAnchor.prototype, "affix", void 0);
__decorate([
    property({ type: String })
], MXAnchor.prototype, "current", void 0);
__decorate([
    state()
], MXAnchor.prototype, "isFixed", void 0);
MXAnchor = __decorate([
    customElement('mx-anchor')
], MXAnchor);
export { MXAnchor };
//# sourceMappingURL=mx-anchor.js.map