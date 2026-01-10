var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
/**
 * Collapse panel component (child of mx-collapse).
 *
 * @element mx-collapse-panel
 *
 * @attr {string} key - Unique key for the panel
 * @attr {string} header - Panel header text
 * @attr {boolean} active - Whether panel is expanded
 * @attr {boolean} disabled - Whether panel is disabled
 * @attr {boolean} show-arrow - Whether to show expand arrow
 * @attr {boolean} collapsible - Whether panel can be collapsed: header, disabled
 * @attr {string} expand-icon-position - Position of expand icon: start, end
 *
 * @slot - Panel content
 * @slot header - Custom header content
 * @slot extra - Extra content in header (right side)
 *
 * @example
 * ```html
 * <mx-collapse-panel key="1" header="Panel Title">
 *   Panel content here
 * </mx-collapse-panel>
 * ```
 */
let MXCollapsePanel = class MXCollapsePanel extends LitElement {
    constructor() {
        super(...arguments);
        this.key = '';
        this.header = '';
        this.active = false;
        this.disabled = false;
        this.showArrow = true;
        this.collapsible = '';
        this.expandIconPosition = 'start';
        this.animating = false;
    }
    handleHeaderClick(e) {
        if (this.disabled)
            return;
        if (this.collapsible === 'disabled')
            return;
        e.stopPropagation();
        const newActive = !this.active;
        // Dispatch toggle event to parent collapse
        this.dispatchEvent(new CustomEvent('panel-toggle', {
            detail: { key: this.key, active: newActive },
            bubbles: true,
            composed: true
        }));
    }
    handleArrowClick(e) {
        if (this.collapsible === 'header') {
            // In header collapsible mode, only arrow click toggles
            this.handleHeaderClick(e);
        }
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('active')) {
            this.animating = true;
            setTimeout(() => {
                this.animating = false;
                this.requestUpdate();
            }, 300);
        }
    }
    renderExpandIcon() {
        if (!this.showArrow)
            return null;
        const iconClasses = {
            'mx-collapse-expand-icon': true,
            'mx-collapse-expand-icon-end': this.expandIconPosition === 'end'
        };
        const handleClick = this.collapsible === 'header'
            ? this.handleArrowClick.bind(this)
            : undefined;
        return html `
      <div class=${classMap(iconClasses)} @click=${handleClick}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    `;
    }
    render() {
        const hasExtra = this.querySelector('[slot="extra"]');
        const hasCustomHeader = this.querySelector('[slot="header"]');
        const itemClasses = {
            'mx-collapse-item': true,
            'mx-collapse-item-active': this.active,
            'mx-collapse-item-disabled': this.disabled
        };
        const headerClasses = {
            'mx-collapse-header': true,
            'mx-collapse-header-collapsible-only': this.collapsible === 'header'
        };
        const contentClasses = {
            'mx-collapse-content': true,
            'mx-collapse-content-hidden': !this.active && !this.animating,
            'mx-collapse-content-entering': this.active && this.animating,
            'mx-collapse-content-leaving': !this.active && this.animating
        };
        const headerClickHandler = this.collapsible === 'header'
            ? undefined
            : this.handleHeaderClick.bind(this);
        return html `
      <div class=${classMap(itemClasses)}>
        <div 
          class=${classMap(headerClasses)}
          @click=${headerClickHandler}
          role="button"
          tabindex="${this.disabled ? -1 : 0}"
          aria-expanded="${this.active}"
          aria-disabled="${this.disabled}"
        >
          ${this.expandIconPosition === 'start' ? this.renderExpandIcon() : null}
          
          <div class="mx-collapse-header-text">
            ${hasCustomHeader ? html `<slot name="header"></slot>` : this.header}
          </div>

          ${hasExtra ? html `
            <div class="mx-collapse-extra">
              <slot name="extra"></slot>
            </div>
          ` : null}

          ${this.expandIconPosition === 'end' ? this.renderExpandIcon() : null}
        </div>

        <div 
          class=${classMap(contentClasses)}
          role="region"
          aria-hidden="${!this.active}"
        >
          <div class="mx-collapse-content-box">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
    }
};
MXCollapsePanel.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-collapse-item {
      border-bottom: 1px solid var(--mx-color-border, #d9d9d9);
    }

    .mx-collapse-item:last-child {
      border-bottom: 0;
    }

    .mx-collapse-item-disabled {
      cursor: not-allowed;
    }

    .mx-collapse-item-disabled .mx-collapse-header {
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
      cursor: not-allowed;
    }

    /* Header */
    .mx-collapse-header {
      position: relative;
      display: flex;
      align-items: center;
      padding: 12px 16px;
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      font-size: 14px;
      line-height: 1.5714285714285714;
      cursor: pointer;
      transition: all 0.3s;
    }

    .mx-collapse-header:hover {
      background-color: var(--mx-color-fill-quaternary, rgba(0, 0, 0, 0.02));
    }

    .mx-collapse-header-collapsible-only {
      cursor: default;
    }

    .mx-collapse-header-collapsible-only:hover {
      background-color: transparent;
    }

    /* Expand icon */
    .mx-collapse-expand-icon {
      display: inline-flex;
      align-items: center;
      padding-right: 12px;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      font-size: 12px;
      transition: transform 0.3s;
    }

    .mx-collapse-expand-icon-end {
      order: 1;
      padding-right: 0;
      padding-left: 12px;
      margin-left: auto;
    }

    .mx-collapse-item-active .mx-collapse-expand-icon {
      transform: rotate(90deg);
    }

    /* Header text */
    .mx-collapse-header-text {
      flex: 1;
    }

    /* Extra */
    .mx-collapse-extra {
      margin-left: auto;
    }

    /* Content */
    .mx-collapse-content {
      overflow: hidden;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      background-color: var(--mx-color-bg-container, #ffffff);
      border-top: 1px solid var(--mx-color-border, #d9d9d9);
      transition: height 0.3s ease;
    }

    .mx-collapse-content-hidden {
      display: none;
    }

    .mx-collapse-content-box {
      padding: 16px;
    }

    /* Animation states */
    .mx-collapse-content-entering {
      animation: collapseSlideDown 0.3s ease;
    }

    .mx-collapse-content-leaving {
      animation: collapseSlideUp 0.3s ease;
    }

    @keyframes collapseSlideDown {
      0% {
        opacity: 0;
        max-height: 0;
      }
      100% {
        opacity: 1;
        max-height: 1000px;
      }
    }

    @keyframes collapseSlideUp {
      0% {
        opacity: 1;
        max-height: 1000px;
      }
      100% {
        opacity: 0;
        max-height: 0;
      }
    }
  `;
__decorate([
    property({ type: String })
], MXCollapsePanel.prototype, "key", void 0);
__decorate([
    property({ type: String })
], MXCollapsePanel.prototype, "header", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MXCollapsePanel.prototype, "active", void 0);
__decorate([
    property({ type: Boolean })
], MXCollapsePanel.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-arrow' })
], MXCollapsePanel.prototype, "showArrow", void 0);
__decorate([
    property({ type: String })
], MXCollapsePanel.prototype, "collapsible", void 0);
__decorate([
    property({ type: String, attribute: 'expand-icon-position' })
], MXCollapsePanel.prototype, "expandIconPosition", void 0);
__decorate([
    state()
], MXCollapsePanel.prototype, "animating", void 0);
__decorate([
    query('.mx-collapse-content')
], MXCollapsePanel.prototype, "contentElement", void 0);
MXCollapsePanel = __decorate([
    customElement('mx-collapse-panel')
], MXCollapsePanel);
export { MXCollapsePanel };
//# sourceMappingURL=mx-collapse-panel.js.map