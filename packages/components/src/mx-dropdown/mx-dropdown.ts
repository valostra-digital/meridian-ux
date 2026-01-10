import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type DropdownPlacement = 
  | 'bottom' | 'bottomLeft' | 'bottomRight'
  | 'top' | 'topLeft' | 'topRight';

export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';

/**
 * Dropdown component for displaying a menu.
 * 
 * @element mx-dropdown
 * 
 * @attr {DropdownPlacement} placement - Position of dropdown
 * @attr {DropdownTrigger} trigger - How dropdown is triggered
 * @attr {boolean} visible - Whether dropdown is visible (controlled)
 * @attr {boolean} disabled - Whether dropdown is disabled
 * @attr {boolean} arrow - Whether to show arrow
 * @attr {number} mouse-enter-delay - Delay in seconds before showing (hover)
 * @attr {number} mouse-leave-delay - Delay in seconds before hiding (hover)
 * 
 * @slot - Trigger element
 * @slot overlay - Dropdown menu content
 * 
 * @fires visible-change - Dispatched when visibility changes
 * 
 * @example
 * ```html
 * <mx-dropdown>
 *   <button slot="trigger">Dropdown</button>
 *   <div slot="overlay">
 *     <mx-menu>
 *       <mx-menu-item>Item 1</mx-menu-item>
 *       <mx-menu-item>Item 2</mx-menu-item>
 *     </mx-menu>
 *   </div>
 * </mx-dropdown>
 * ```
 */
@customElement('mx-dropdown')
export class MXDropdown extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-dropdown {
      position: relative;
      display: inline-block;
    }

    .mx-dropdown-trigger {
      display: inline-block;
      cursor: pointer;
    }

    .mx-dropdown-trigger-disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    .mx-dropdown-menu {
      position: fixed;
      z-index: 1050;
      display: block;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.1s ease-out, visibility 0.1s ease-out;
      pointer-events: none;
    }

    .mx-dropdown-menu.visible {
      visibility: visible;
      opacity: 1;
      pointer-events: auto;
    }

    .mx-dropdown-menu-content {
      min-width: 160px;
      padding: 4px 0;
      background-color: var(--mx-color-bg-elevated, #ffffff);
      border-radius: var(--mx-border-radius-lg, 8px);
      box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
                  0 6px 16px 0 rgba(0, 0, 0, 0.08),
                  0 9px 28px 8px rgba(0, 0, 0, 0.05);
    }

    /* Arrow */
    .mx-dropdown-arrow {
      position: absolute;
      width: 16px;
      height: 16px;
      overflow: hidden;
      pointer-events: none;
    }

    .mx-dropdown-arrow::before {
      position: absolute;
      width: 8px;
      height: 8px;
      background: var(--mx-color-bg-elevated, #ffffff);
      content: '';
      transform: rotate(45deg);
      box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);
    }

    /* Placement styles */
    .mx-dropdown-menu.placement-bottom .mx-dropdown-arrow,
    .mx-dropdown-menu.placement-bottomLeft .mx-dropdown-arrow,
    .mx-dropdown-menu.placement-bottomRight .mx-dropdown-arrow {
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
    }

    .mx-dropdown-menu.placement-bottomLeft .mx-dropdown-arrow {
      left: 16px;
      transform: none;
    }

    .mx-dropdown-menu.placement-bottomRight .mx-dropdown-arrow {
      left: auto;
      right: 16px;
      transform: none;
    }

    .mx-dropdown-menu.placement-bottom .mx-dropdown-arrow::before,
    .mx-dropdown-menu.placement-bottomLeft .mx-dropdown-arrow::before,
    .mx-dropdown-menu.placement-bottomRight .mx-dropdown-arrow::before {
      bottom: 4px;
      left: 4px;
    }

    .mx-dropdown-menu.placement-top .mx-dropdown-arrow,
    .mx-dropdown-menu.placement-topLeft .mx-dropdown-arrow,
    .mx-dropdown-menu.placement-topRight .mx-dropdown-arrow {
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
    }

    .mx-dropdown-menu.placement-topLeft .mx-dropdown-arrow {
      left: 16px;
      transform: none;
    }

    .mx-dropdown-menu.placement-topRight .mx-dropdown-arrow {
      left: auto;
      right: 16px;
      transform: none;
    }

    .mx-dropdown-menu.placement-top .mx-dropdown-arrow::before,
    .mx-dropdown-menu.placement-topLeft .mx-dropdown-arrow::before,
    .mx-dropdown-menu.placement-topRight .mx-dropdown-arrow::before {
      top: 4px;
      left: 4px;
    }
  `;

  @property({ type: String })
  placement: DropdownPlacement = 'bottomLeft';

  @property({ type: String })
  trigger: DropdownTrigger = 'hover';

  @property({ type: Boolean })
  visible?: boolean;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  arrow = false;

  @property({ type: Number, attribute: 'mouse-enter-delay' })
  mouseEnterDelay = 0.15;

  @property({ type: Number, attribute: 'mouse-leave-delay' })
  mouseLeaveDelay = 0.1;

  @state()
  private internalVisible = false;

  @state()
  private position = { top: 0, left: 0 };

  @query('.mx-dropdown-trigger')
  private triggerElement?: HTMLElement;

  @query('.mx-dropdown-menu')
  private menuElement?: HTMLElement;

  private enterTimeout?: number;
  private leaveTimeout?: number;

  private get isVisible() {
    return this.visible !== undefined ? this.visible : this.internalVisible;
  }

  private handleMouseEnter = () => {
    if (this.disabled || this.trigger !== 'hover') return;
    
    if (this.leaveTimeout) {
      clearTimeout(this.leaveTimeout);
      this.leaveTimeout = undefined;
    }

    this.enterTimeout = window.setTimeout(() => {
      this.show();
    }, this.mouseEnterDelay * 1000);
  };

  private handleMouseLeave = () => {
    if (this.disabled || this.trigger !== 'hover') return;
    
    if (this.enterTimeout) {
      clearTimeout(this.enterTimeout);
      this.enterTimeout = undefined;
    }

    this.leaveTimeout = window.setTimeout(() => {
      this.hide();
    }, this.mouseLeaveDelay * 1000);
  };

  private handleClick = () => {
    if (this.disabled || this.trigger !== 'click') return;
    
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  };

  private handleContextMenu = (e: MouseEvent) => {
    if (this.disabled || this.trigger !== 'contextMenu') return;
    
    e.preventDefault();
    this.show();
  };

  private handleDocumentClick = (e: MouseEvent) => {
    if (this.trigger !== 'click') return;
    
    const target = e.target as Node;
    if (!this.contains(target) && !this.menuElement?.contains(target)) {
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
    if (!this.triggerElement || !this.menuElement) return;

    const triggerRect = this.triggerElement.getBoundingClientRect();
    const menuRect = this.menuElement.getBoundingClientRect();
    const spacing = this.arrow ? 12 : 4;

    let top = 0;
    let left = 0;

    switch (this.placement) {
      case 'bottom':
        top = triggerRect.bottom + spacing;
        left = triggerRect.left + (triggerRect.width - menuRect.width) / 2;
        break;
      case 'bottomLeft':
        top = triggerRect.bottom + spacing;
        left = triggerRect.left;
        break;
      case 'bottomRight':
        top = triggerRect.bottom + spacing;
        left = triggerRect.right - menuRect.width;
        break;
      case 'top':
        top = triggerRect.top - menuRect.height - spacing;
        left = triggerRect.left + (triggerRect.width - menuRect.width) / 2;
        break;
      case 'topLeft':
        top = triggerRect.top - menuRect.height - spacing;
        left = triggerRect.left;
        break;
      case 'topRight':
        top = triggerRect.top - menuRect.height - spacing;
        left = triggerRect.right - menuRect.width;
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
    const triggerClasses = {
      'mx-dropdown-trigger': true,
      'mx-dropdown-trigger-disabled': this.disabled
    };

    const menuClasses = {
      'mx-dropdown-menu': true,
      [`placement-${this.placement}`]: true,
      'visible': this.isVisible
    };

    const menuStyles = {
      top: `${this.position.top}px`,
      left: `${this.position.left}px`
    };

    return html`
      <div class="mx-dropdown">
        <div 
          class=${classMap(triggerClasses)}
          @mouseenter=${this.handleMouseEnter}
          @mouseleave=${this.handleMouseLeave}
          @click=${this.handleClick}
          @contextmenu=${this.handleContextMenu}
        >
          <slot></slot>
        </div>
      </div>

      <div 
        class=${classMap(menuClasses)}
        style=${styleMap(menuStyles)}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        ${this.arrow ? html`
          <div class="mx-dropdown-arrow"></div>
        ` : null}
        <div class="mx-dropdown-menu-content">
          <slot name="overlay"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-dropdown': MXDropdown;
  }
}
