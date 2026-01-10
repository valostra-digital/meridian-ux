import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type PopoverPlacement = 
  | 'top' | 'topLeft' | 'topRight'
  | 'bottom' | 'bottomLeft' | 'bottomRight'
  | 'left' | 'leftTop' | 'leftBottom'
  | 'right' | 'rightTop' | 'rightBottom';

export type PopoverTrigger = 'hover' | 'focus' | 'click';

/**
 * Popover component for displaying rich content in a popup.
 * 
 * @element mx-popover
 * 
 * @attr {string} title - Popover title
 * @attr {string} content - Popover content text
 * @attr {PopoverPlacement} placement - Position relative to target
 * @attr {PopoverTrigger} trigger - How popover is triggered
 * @attr {boolean} visible - Whether popover is visible (controlled)
 * @attr {boolean} arrow - Whether to show arrow
 * @attr {number} mouse-enter-delay - Delay before showing (hover)
 * @attr {number} mouse-leave-delay - Delay before hiding (hover)
 * 
 * @slot - Target element
 * @slot title - Custom title content
 * @slot content - Custom popover content
 * 
 * @fires visible-change - Dispatched when visibility changes
 * 
 * @example
 * ```html
 * <mx-popover title="Title" content="Content text">
 *   <button>Click me</button>
 * </mx-popover>
 * ```
 */
@customElement('mx-popover')
export class MXPopover extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-popover {
      position: relative;
      display: inline-block;
    }

    .mx-popover-content {
      position: fixed;
      z-index: 1060;
      display: block;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.1s ease-out, visibility 0.1s ease-out;
      pointer-events: none;
    }

    .mx-popover-content.visible {
      visibility: visible;
      opacity: 1;
      pointer-events: auto;
    }

    .mx-popover-inner {
      min-width: 32px;
      min-height: 32px;
      padding: 12px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      text-align: left;
      text-decoration: none;
      word-wrap: break-word;
      background-color: var(--mx-color-bg-elevated, #ffffff);
      border-radius: var(--mx-border-radius-lg, 8px);
      box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
                  0 6px 16px 0 rgba(0, 0, 0, 0.08),
                  0 9px 28px 8px rgba(0, 0, 0, 0.05);
      font-size: 14px;
      line-height: 1.5714285714285714;
    }

    .mx-popover-title {
      min-width: 177px;
      margin-bottom: 8px;
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      font-weight: 600;
      font-size: 16px;
    }

    .mx-popover-inner-content {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
    }

    /* Arrow */
    .mx-popover-arrow {
      position: absolute;
      width: 16px;
      height: 16px;
      overflow: hidden;
      pointer-events: none;
    }

    .mx-popover-arrow::before {
      position: absolute;
      width: 8px;
      height: 8px;
      background: var(--mx-color-bg-elevated, #ffffff);
      content: '';
      transform: rotate(45deg);
      box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);
    }

    /* Placement styles - same as tooltip */
    .mx-popover-content.placement-top .mx-popover-arrow,
    .mx-popover-content.placement-topLeft .mx-popover-arrow,
    .mx-popover-content.placement-topRight .mx-popover-arrow {
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
    }

    .mx-popover-content.placement-topLeft .mx-popover-arrow {
      left: 16px;
      transform: none;
    }

    .mx-popover-content.placement-topRight .mx-popover-arrow {
      left: auto;
      right: 16px;
      transform: none;
    }

    .mx-popover-content.placement-top .mx-popover-arrow::before,
    .mx-popover-content.placement-topLeft .mx-popover-arrow::before,
    .mx-popover-content.placement-topRight .mx-popover-arrow::before {
      top: 4px;
      left: 4px;
    }

    .mx-popover-content.placement-bottom .mx-popover-arrow,
    .mx-popover-content.placement-bottomLeft .mx-popover-arrow,
    .mx-popover-content.placement-bottomRight .mx-popover-arrow {
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
    }

    .mx-popover-content.placement-bottomLeft .mx-popover-arrow {
      left: 16px;
      transform: none;
    }

    .mx-popover-content.placement-bottomRight .mx-popover-arrow {
      left: auto;
      right: 16px;
      transform: none;
    }

    .mx-popover-content.placement-bottom .mx-popover-arrow::before,
    .mx-popover-content.placement-bottomLeft .mx-popover-arrow::before,
    .mx-popover-content.placement-bottomRight .mx-popover-arrow::before {
      bottom: 4px;
      left: 4px;
    }

    .mx-popover-content.placement-left .mx-popover-arrow,
    .mx-popover-content.placement-leftTop .mx-popover-arrow,
    .mx-popover-content.placement-leftBottom .mx-popover-arrow {
      right: -8px;
      top: 50%;
      transform: translateY(-50%);
    }

    .mx-popover-content.placement-leftTop .mx-popover-arrow {
      top: 16px;
      transform: none;
    }

    .mx-popover-content.placement-leftBottom .mx-popover-arrow {
      top: auto;
      bottom: 16px;
      transform: none;
    }

    .mx-popover-content.placement-left .mx-popover-arrow::before,
    .mx-popover-content.placement-leftTop .mx-popover-arrow::before,
    .mx-popover-content.placement-leftBottom .mx-popover-arrow::before {
      top: 4px;
      right: 4px;
    }

    .mx-popover-content.placement-right .mx-popover-arrow,
    .mx-popover-content.placement-rightTop .mx-popover-arrow,
    .mx-popover-content.placement-rightBottom .mx-popover-arrow {
      left: -8px;
      top: 50%;
      transform: translateY(-50%);
    }

    .mx-popover-content.placement-rightTop .mx-popover-arrow {
      top: 16px;
      transform: none;
    }

    .mx-popover-content.placement-rightBottom .mx-popover-arrow {
      top: auto;
      bottom: 16px;
      transform: none;
    }

    .mx-popover-content.placement-right .mx-popover-arrow::before,
    .mx-popover-content.placement-rightTop .mx-popover-arrow::before,
    .mx-popover-content.placement-rightBottom .mx-popover-arrow::before {
      top: 4px;
      left: 4px;
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  content = '';

  @property({ type: String })
  placement: PopoverPlacement = 'top';

  @property({ type: String })
  trigger: PopoverTrigger = 'hover';

  @property({ type: Boolean })
  visible?: boolean;

  @property({ type: Boolean })
  arrow = true;

  @property({ type: Number, attribute: 'mouse-enter-delay' })
  mouseEnterDelay = 0.1;

  @property({ type: Number, attribute: 'mouse-leave-delay' })
  mouseLeaveDelay = 0.1;

  @state()
  private internalVisible = false;

  @state()
  private position = { top: 0, left: 0 };

  @query('.mx-popover-trigger')
  private triggerElement?: HTMLElement;

  @query('.mx-popover-content')
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
    const hasTitle = this.title || this.querySelector('[slot="title"]');
    const hasContent = this.content || this.querySelector('[slot="content"]');
    
    if (!hasTitle && !hasContent) {
      return html`<div class="mx-popover"><slot></slot></div>`;
    }

    const contentClasses = {
      'mx-popover-content': true,
      [`placement-${this.placement}`]: true,
      'visible': this.isVisible
    };

    const contentStyles = {
      top: `${this.position.top}px`,
      left: `${this.position.left}px`
    };

    return html`
      <div class="mx-popover">
        <div 
          class="mx-popover-trigger"
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
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        ${this.arrow ? html`
          <div class="mx-popover-arrow"></div>
        ` : null}
        <div class="mx-popover-inner">
          ${hasTitle ? html`
            <div class="mx-popover-title">
              <slot name="title">${this.title}</slot>
            </div>
          ` : null}
          <div class="mx-popover-inner-content">
            <slot name="content">${this.content}</slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-popover': MXPopover;
  }
}
