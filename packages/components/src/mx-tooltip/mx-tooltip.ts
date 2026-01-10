import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type TooltipPlacement = 
  | 'top' | 'topLeft' | 'topRight'
  | 'bottom' | 'bottomLeft' | 'bottomRight'
  | 'left' | 'leftTop' | 'leftBottom'
  | 'right' | 'rightTop' | 'rightBottom';

export type TooltipTrigger = 'hover' | 'focus' | 'click';

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
@customElement('mx-tooltip')
export class MXTooltip extends LitElement {
  static styles = css`
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

  @property({ type: String })
  title = '';

  @property({ type: String })
  placement: TooltipPlacement = 'top';

  @property({ type: String })
  trigger: TooltipTrigger = 'hover';

  @property({ type: Boolean })
  visible?: boolean;

  @property({ type: Boolean })
  arrow = true;

  @property({ type: String })
  color = '';

  @property({ type: Number, attribute: 'mouse-enter-delay' })
  mouseEnterDelay = 0.1;

  @property({ type: Number, attribute: 'mouse-leave-delay' })
  mouseLeaveDelay = 0.1;

  @state()
  private internalVisible = false;

  @state()
  private position = { top: 0, left: 0 };

  @query('.mx-tooltip-trigger')
  private triggerElement?: HTMLElement;

  @query('.mx-tooltip-content')
  private contentElement?: HTMLElement;

  private enterTimeout?: number;
  private leaveTimeout?: number;

  private get isVisible() {
    return this.visible !== undefined ? this.visible : this.internalVisible;
  }

  private handleMouseEnter = () => {
    if (this.trigger !== 'hover') return;
    
    if (this.leaveTimeout) {
      clearTimeout(this.leaveTimeout);
      this.leaveTimeout = undefined;
    }

    this.enterTimeout = window.setTimeout(() => {
      this.show();
    }, this.mouseEnterDelay * 1000);
  };

  private handleMouseLeave = () => {
    if (this.trigger !== 'hover') return;
    
    if (this.enterTimeout) {
      clearTimeout(this.enterTimeout);
      this.enterTimeout = undefined;
    }

    this.leaveTimeout = window.setTimeout(() => {
      this.hide();
    }, this.mouseLeaveDelay * 1000);
  };

  private handleFocus = () => {
    if (this.trigger !== 'focus') return;
    this.show();
  };

  private handleBlur = () => {
    if (this.trigger !== 'focus') return;
    this.hide();
  };

  private handleClick = () => {
    if (this.trigger !== 'click') return;
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  };

  private handleDocumentClick = (e: MouseEvent) => {
    if (this.trigger !== 'click') return;
    
    const target = e.target as Node;
    if (!this.contains(target) && !this.contentElement?.contains(target)) {
      this.hide();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleDocumentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleDocumentClick);
    if (this.enterTimeout) clearTimeout(this.enterTimeout);
    if (this.leaveTimeout) clearTimeout(this.leaveTimeout);
  }

  private show() {
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

  private hide() {
    if (this.visible === undefined) {
      this.internalVisible = false;
    }
    this.dispatchEvent(new CustomEvent('visible-change', {
      detail: { visible: false },
      bubbles: true,
      composed: true
    }));
  }

  private updatePosition() {
    if (!this.triggerElement || !this.contentElement) return;

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

  updated(changedProperties: Map<PropertyKey, unknown>) {
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
      return html`<div class="mx-tooltip"><slot></slot></div>`;
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

    return html`
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
        ${this.arrow ? html`
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
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-tooltip': MXTooltip;
  }
}
