var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
/**
 * Tooltip component for displaying helpful text on hover/focus/click.
 *
 * @element mx-tooltip
 *
 * @attr {string} title - Tooltip text content
 * @attr {TooltipPlacement} placement - Position of tooltip relative to target
 * @attr {TooltipTrigger} trigger - How tooltip is triggered: hover, focus, click
 * @attr {boolean} visible - Whether tooltip is visible (controlled mode)
 * @attr {boolean} arrow - Whether to show arrow pointer
 * @attr {string} color - Background color of tooltip
 * @attr {number} mouse-enter-delay - Delay in seconds before showing (hover)
 * @attr {number} mouse-leave-delay - Delay in seconds before hiding (hover)
 *
 * @slot - Target element that triggers tooltip
 * @slot content - Custom tooltip content (overrides title property)
 *
 * @fires visible-change - Dispatched when visibility changes
 *
 * @example
 * ```html
 * <!-- Basic tooltip -->
 * <mx-tooltip title="Tooltip text">
 *   <button>Hover me</button>
 * </mx-tooltip>
 *
 * <!-- Different placements -->
 * <mx-tooltip title="Top" placement="top">
 *   <button>Top</button>
 * </mx-tooltip>
 *
 * <!-- Click trigger -->
 * <mx-tooltip title="Click to show" trigger="click">
 *   <button>Click me</button>
 * </mx-tooltip>
 *
 * <!-- Custom color -->
 * <mx-tooltip title="Custom" color="#f50">
 *   <button>Red tooltip</button>
 * </mx-tooltip>
 * ```
 */
let MXTooltip = class MXTooltip extends LitElement {
    constructor() {
        super(...arguments);
        this.title = '';
        this.placement = 'top';
        this.trigger = 'hover';
        this.arrow = true;
        this.color = '';
        this.mouseEnterDelay = 0.1;
        this.mouseLeaveDelay = 0.1;
        this.internalVisible = false;
        this.position = { top: 0, left: 0 };
        this.handleMouseEnter = () => {
            if (this.trigger !== 'hover')
                return;
            if (this.leaveTimeout) {
                clearTimeout(this.leaveTimeout);
                this.leaveTimeout = undefined;
            }
            this.enterTimeout = window.setTimeout(() => {
                this.show();
            }, this.mouseEnterDelay * 1000);
        };
        this.handleMouseLeave = () => {
            if (this.trigger !== 'hover')
                return;
            if (this.enterTimeout) {
                clearTimeout(this.enterTimeout);
                this.enterTimeout = undefined;
            }
            this.leaveTimeout = window.setTimeout(() => {
                this.hide();
            }, this.mouseLeaveDelay * 1000);
        };
        this.handleFocus = () => {
            if (this.trigger !== 'focus')
                return;
            this.show();
        };
        this.handleBlur = () => {
            if (this.trigger !== 'focus')
                return;
            this.hide();
        };
        this.handleClick = () => {
            if (this.trigger !== 'click')
                return;
            if (this.isVisible) {
                this.hide();
            }
            else {
                this.show();
            }
        };
        this.handleDocumentClick = (e) => {
            if (this.trigger !== 'click')
                return;
            const target = e.target;
            if (!this.contains(target) && !this.contentElement?.contains(target)) {
                this.hide();
            }
        };
    }
    get isVisible() {
        return this.visible !== undefined ? this.visible : this.internalVisible;
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this.handleDocumentClick);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this.handleDocumentClick);
        if (this.enterTimeout)
            clearTimeout(this.enterTimeout);
        if (this.leaveTimeout)
            clearTimeout(this.leaveTimeout);
    }
    show() {
        if (this.visible === undefined) {
            this.internalVisible = true;
        }
        this.updatePosition();
        this.dispatchEvent(new CustomEvent('visible-change', {
            detail: { visible: true },
            bubbles: true,
            composed: true
        }));
    }
    hide() {
        if (this.visible === undefined) {
            this.internalVisible = false;
        }
        this.dispatchEvent(new CustomEvent('visible-change', {
            detail: { visible: false },
            bubbles: true,
            composed: true
        }));
    }
    updatePosition() {
        if (!this.triggerElement || !this.contentElement)
            return;
        const triggerRect = this.triggerElement.getBoundingClientRect();
        const contentRect = this.contentElement.getBoundingClientRect();
        const spacing = this.arrow ? 12 : 8;
        let top = 0;
        let left = 0;
        // Calculate position based on placement
        switch (this.placement) {
            case 'top':
                top = triggerRect.top - contentRect.height - spacing;
                left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
                break;
            case 'topLeft':
                top = triggerRect.top - contentRect.height - spacing;
                left = triggerRect.left;
                break;
            case 'topRight':
                top = triggerRect.top - contentRect.height - spacing;
                left = triggerRect.right - contentRect.width;
                break;
            case 'bottom':
                top = triggerRect.bottom + spacing;
                left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
                break;
            case 'bottomLeft':
                top = triggerRect.bottom + spacing;
                left = triggerRect.left;
                break;
            case 'bottomRight':
                top = triggerRect.bottom + spacing;
                left = triggerRect.right - contentRect.width;
                break;
            case 'left':
                top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
                left = triggerRect.left - contentRect.width - spacing;
                break;
            case 'leftTop':
                top = triggerRect.top;
                left = triggerRect.left - contentRect.width - spacing;
                break;
            case 'leftBottom':
                top = triggerRect.bottom - contentRect.height;
                left = triggerRect.left - contentRect.width - spacing;
                break;
            case 'right':
                top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
                left = triggerRect.right + spacing;
                break;
            case 'rightTop':
                top = triggerRect.top;
                left = triggerRect.right + spacing;
                break;
            case 'rightBottom':
                top = triggerRect.bottom - contentRect.height;
                left = triggerRect.right + spacing;
                break;
        }
        this.position = { top, left };
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('visible') || changedProperties.has('internalVisible')) {
            if (this.isVisible) {
                this.updatePosition();
            }
        }
    }
    render() {
        const hasContent = this.title || this.querySelector('[slot="content"]');
        if (!hasContent) {
            return html `<div class="mx-tooltip"><slot></slot></div>`;
        }
        const contentClasses = {
            'mx-tooltip-content': true,
            [`placement-${this.placement}`]: true,
            'visible': this.isVisible
        };
        const contentStyles = {
            top: `${this.position.top}px`,
            left: `${this.position.left}px`
        };
        const innerStyles = this.color ? { backgroundColor: this.color } : {};
        const arrowStyles = this.color ? { backgroundColor: this.color } : {};
        return html `
      <div class="mx-tooltip">
        <div 
          class="mx-tooltip-trigger"
          @mouseenter=${this.handleMouseEnter}
          @mouseleave=${this.handleMouseLeave}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @click=${this.handleClick}
        >
          <slot></slot>
        </div>
      </div>

      <div 
        class=${classMap(contentClasses)}
        style=${styleMap(contentStyles)}
      >
        ${this.arrow ? html `
          <div class="mx-tooltip-arrow">
            <span style=${styleMap(arrowStyles)}></span>
          </div>
        ` : null}
        <div class="mx-tooltip-inner" style=${styleMap(innerStyles)}>
          <slot name="content">${this.title}</slot>
        </div>
      </div>
    `;
    }
};
MXTooltip.styles = css `
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-tooltip {
      position: relative;
      display: inline-block;
    }

    .mx-tooltip-content {
      position: fixed;
      z-index: 1070;
      display: block;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.1s ease-out, visibility 0.1s ease-out;
      pointer-events: none;
    }

    .mx-tooltip-content.visible {
      visibility: visible;
      opacity: 1;
    }

    .mx-tooltip-inner {
      min-width: 32px;
      min-height: 32px;
      padding: 6px 8px;
      color: #fff;
      text-align: left;
      text-decoration: none;
      word-wrap: break-word;
      background-color: rgba(0, 0, 0, 0.85);
      border-radius: var(--mx-border-radius, 6px);
      box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
                  0 6px 16px 0 rgba(0, 0, 0, 0.08),
                  0 9px 28px 8px rgba(0, 0, 0, 0.05);
      font-size: 14px;
      line-height: 1.5714285714285714;
    }

    /* Arrow */
    .mx-tooltip-arrow {
      position: absolute;
      width: 16px;
      height: 16px;
      overflow: hidden;
      pointer-events: none;
    }

    .mx-tooltip-arrow::before {
      position: absolute;
      width: 8px;
      height: 8px;
      background: rgba(0, 0, 0, 0.85);
      content: '';
      transform: rotate(45deg);
    }

    /* Placement styles */
    /* Top */
    .mx-tooltip-content.placement-top .mx-tooltip-arrow,
    .mx-tooltip-content.placement-topLeft .mx-tooltip-arrow,
    .mx-tooltip-content.placement-topRight .mx-tooltip-arrow {
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
    }

    .mx-tooltip-content.placement-topLeft .mx-tooltip-arrow {
      left: 16px;
      transform: none;
    }

    .mx-tooltip-content.placement-topRight .mx-tooltip-arrow {
      left: auto;
      right: 16px;
      transform: none;
    }

    .mx-tooltip-content.placement-top .mx-tooltip-arrow::before,
    .mx-tooltip-content.placement-topLeft .mx-tooltip-arrow::before,
    .mx-tooltip-content.placement-topRight .mx-tooltip-arrow::before {
      top: 4px;
      left: 4px;
    }

    /* Bottom */
    .mx-tooltip-content.placement-bottom .mx-tooltip-arrow,
    .mx-tooltip-content.placement-bottomLeft .mx-tooltip-arrow,
    .mx-tooltip-content.placement-bottomRight .mx-tooltip-arrow {
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
    }

    .mx-tooltip-content.placement-bottomLeft .mx-tooltip-arrow {
      left: 16px;
      transform: none;
    }

    .mx-tooltip-content.placement-bottomRight .mx-tooltip-arrow {
      left: auto;
      right: 16px;
      transform: none;
    }

    .mx-tooltip-content.placement-bottom .mx-tooltip-arrow::before,
    .mx-tooltip-content.placement-bottomLeft .mx-tooltip-arrow::before,
    .mx-tooltip-content.placement-bottomRight .mx-tooltip-arrow::before {
      bottom: 4px;
      left: 4px;
    }

    /* Left */
    .mx-tooltip-content.placement-left .mx-tooltip-arrow,
    .mx-tooltip-content.placement-leftTop .mx-tooltip-arrow,
    .mx-tooltip-content.placement-leftBottom .mx-tooltip-arrow {
      right: -8px;
      top: 50%;
      transform: translateY(-50%);
    }

    .mx-tooltip-content.placement-leftTop .mx-tooltip-arrow {
      top: 16px;
      transform: none;
    }

    .mx-tooltip-content.placement-leftBottom .mx-tooltip-arrow {
      top: auto;
      bottom: 16px;
      transform: none;
    }

    .mx-tooltip-content.placement-left .mx-tooltip-arrow::before,
    .mx-tooltip-content.placement-leftTop .mx-tooltip-arrow::before,
    .mx-tooltip-content.placement-leftBottom .mx-tooltip-arrow::before {
      top: 4px;
      right: 4px;
    }

    /* Right */
    .mx-tooltip-content.placement-right .mx-tooltip-arrow,
    .mx-tooltip-content.placement-rightTop .mx-tooltip-arrow,
    .mx-tooltip-content.placement-rightBottom .mx-tooltip-arrow {
      left: -8px;
      top: 50%;
      transform: translateY(-50%);
    }

    .mx-tooltip-content.placement-rightTop .mx-tooltip-arrow {
      top: 16px;
      transform: none;
    }

    .mx-tooltip-content.placement-rightBottom .mx-tooltip-arrow {
      top: auto;
      bottom: 16px;
      transform: none;
    }

    .mx-tooltip-content.placement-right .mx-tooltip-arrow::before,
    .mx-tooltip-content.placement-rightTop .mx-tooltip-arrow::before,
    .mx-tooltip-content.placement-rightBottom .mx-tooltip-arrow::before {
      top: 4px;
      left: 4px;
    }
  `;
__decorate([
    property({ type: String })
], MXTooltip.prototype, "title", void 0);
__decorate([
    property({ type: String })
], MXTooltip.prototype, "placement", void 0);
__decorate([
    property({ type: String })
], MXTooltip.prototype, "trigger", void 0);
__decorate([
    property({ type: Boolean })
], MXTooltip.prototype, "visible", void 0);
__decorate([
    property({ type: Boolean })
], MXTooltip.prototype, "arrow", void 0);
__decorate([
    property({ type: String })
], MXTooltip.prototype, "color", void 0);
__decorate([
    property({ type: Number, attribute: 'mouse-enter-delay' })
], MXTooltip.prototype, "mouseEnterDelay", void 0);
__decorate([
    property({ type: Number, attribute: 'mouse-leave-delay' })
], MXTooltip.prototype, "mouseLeaveDelay", void 0);
__decorate([
    state()
], MXTooltip.prototype, "internalVisible", void 0);
__decorate([
    state()
], MXTooltip.prototype, "position", void 0);
__decorate([
    query('.mx-tooltip-trigger')
], MXTooltip.prototype, "triggerElement", void 0);
__decorate([
    query('.mx-tooltip-content')
], MXTooltip.prototype, "contentElement", void 0);
MXTooltip = __decorate([
    customElement('mx-tooltip')
], MXTooltip);
export { MXTooltip };
//# sourceMappingURL=mx-tooltip.js.map