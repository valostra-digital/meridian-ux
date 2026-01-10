import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';
export type DrawerSize = 'default' | 'large';

/**
 * Drawer component for panel that slides out from edge of screen.
 * 
 * @element mx-drawer
 * 
 * @attr {boolean} open - Whether drawer is visible
 * @attr {string} title - Drawer title
 * @attr {DrawerPlacement} placement - Edge to slide from
 * @attr {boolean} closable - Whether to show close button
 * @attr {boolean} mask - Whether to show overlay mask
 * @attr {boolean} mask-closable - Whether clicking mask closes drawer
 * @attr {number} width - Width for left/right drawers (default 378px)
 * @attr {number} height - Height for top/bottom drawers (default 378px)
 * @attr {number} z-index - CSS z-index
 * @attr {DrawerSize} size - Predefined size: default, large
 * 
 * @slot - Drawer content
 * @slot title - Custom title content
 * @slot extra - Extra actions in header
 * @slot footer - Footer content
 * 
 * @fires close - Dispatched when drawer is closed
 * 
 * @example
 * ```html
 * <mx-drawer open title="Drawer Title">
 *   <p>Drawer content</p>
 * </mx-drawer>
 * ```
 */
@customElement('mx-drawer')
export class MXDrawer extends LitElement {
  static styles = css`
    :host {
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-drawer-mask {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.45);
      pointer-events: auto;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .mx-drawer-mask.visible {
      opacity: 1;
    }

    .mx-drawer {
      position: fixed;
      z-index: 1000;
      width: 0;
      height: 0;
      transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), width 0s ease 0.3s, height 0s ease 0.3s;
    }

    .mx-drawer.visible {
      width: auto;
      height: auto;
      transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .mx-drawer-content-wrapper {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: var(--mx-color-bg-container, #ffffff);
      box-shadow: -6px 0 16px 0 rgba(0, 0, 0, 0.08), -3px 0 6px -4px rgba(0, 0, 0, 0.12), -9px 0 28px 8px rgba(0, 0, 0, 0.05);
    }

    /* Placement specific styles */
    .mx-drawer-left {
      top: 0;
      left: 0;
      width: 378px;
      height: 100%;
    }

    .mx-drawer-left .mx-drawer-content-wrapper {
      transform: translateX(-100%);
    }

    .mx-drawer-left.visible .mx-drawer-content-wrapper {
      transform: translateX(0);
    }

    .mx-drawer-right {
      top: 0;
      right: 0;
      width: 378px;
      height: 100%;
    }

    .mx-drawer-right .mx-drawer-content-wrapper {
      transform: translateX(100%);
    }

    .mx-drawer-right.visible .mx-drawer-content-wrapper {
      transform: translateX(0);
    }

    .mx-drawer-right .mx-drawer-content-wrapper {
      box-shadow: 6px 0 16px 0 rgba(0, 0, 0, 0.08), 3px 0 6px -4px rgba(0, 0, 0, 0.12), 9px 0 28px 8px rgba(0, 0, 0, 0.05);
    }

    .mx-drawer-top {
      top: 0;
      left: 0;
      width: 100%;
      height: 378px;
    }

    .mx-drawer-top .mx-drawer-content-wrapper {
      transform: translateY(-100%);
    }

    .mx-drawer-top.visible .mx-drawer-content-wrapper {
      transform: translateY(0);
    }

    .mx-drawer-bottom {
      bottom: 0;
      left: 0;
      width: 100%;
      height: 378px;
    }

    .mx-drawer-bottom .mx-drawer-content-wrapper {
      transform: translateY(100%);
    }

    .mx-drawer-bottom.visible .mx-drawer-content-wrapper {
      transform: translateY(0);
    }

    /* Size variants */
    .mx-drawer-large.mx-drawer-left,
    .mx-drawer-large.mx-drawer-right {
      width: 736px;
    }

    .mx-drawer-large.mx-drawer-top,
    .mx-drawer-large.mx-drawer-bottom {
      height: 736px;
    }

    /* Content */
    .mx-drawer-wrapper-body {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }

    .mx-drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      background: var(--mx-color-bg-container, #ffffff);
      border-bottom: 1px solid var(--mx-color-border-secondary, #f0f0f0);
      border-radius: 8px 8px 0 0;
    }

    .mx-drawer-header-title {
      display: flex;
      flex: 1;
      align-items: center;
      min-width: 0;
      min-height: 0;
    }

    .mx-drawer-title {
      flex: 1;
      margin: 0;
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }

    .mx-drawer-extra {
      margin-left: 16px;
    }

    .mx-drawer-close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      margin-left: 16px;
      color: var(--mx-color-text-tertiary, rgba(0, 0, 0, 0.45));
      font-size: 16px;
      background: transparent;
      border: 0;
      cursor: pointer;
      transition: color 0.3s;
    }

    .mx-drawer-close:hover {
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.65));
    }

    .mx-drawer-body {
      flex: 1;
      padding: 24px;
      overflow: auto;
      font-size: 14px;
      line-height: 1.5714285714285714;
      word-wrap: break-word;
    }

    .mx-drawer-footer {
      flex-shrink: 0;
      padding: 10px 16px;
      border-top: 1px solid var(--mx-color-border-secondary, #f0f0f0);
    }
  `;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  title = '';

  @property({ type: String })
  placement: DrawerPlacement = 'right';

  @property({ type: Boolean })
  closable = true;

  @property({ type: Boolean })
  mask = true;

  @property({ type: Boolean, attribute: 'mask-closable' })
  maskClosable = true;

  @property({ type: Number })
  width = 378;

  @property({ type: Number })
  height = 378;

  @property({ type: Number, attribute: 'z-index' })
  zIndex = 1000;

  @property({ type: String })
  size: DrawerSize = 'default';

  @state()
  private animating = false;

  private handleClose() {
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }));
  }

  private handleMaskClick() {
    if (this.maskClosable) {
      this.handleClose();
    }
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      if (this.open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.body.style.overflow = '';
  }

  render() {
    if (!this.open && !this.animating) {
      return null;
    }

    const hasTitle = this.title || this.querySelector('[slot="title"]');
    const hasExtra = this.querySelector('[slot="extra"]');
    const hasFooter = this.querySelector('[slot="footer"]');

    const drawerClasses = {
      'mx-drawer': true,
      [`mx-drawer-${this.placement}`]: true,
      [`mx-drawer-${this.size}`]: this.size !== 'default',
      'visible': this.open
    };

    const maskClasses = {
      'mx-drawer-mask': true,
      'visible': this.open
    };

    const drawerStyles = {
      zIndex: String(this.zIndex),
      ...(this.placement === 'left' || this.placement === 'right' ? { width: `${this.width}px` } : {}),
      ...(this.placement === 'top' || this.placement === 'bottom' ? { height: `${this.height}px` } : {})
    };

    return html`
      ${this.mask ? html`
        <div 
          class=${classMap(maskClasses)}
          style="z-index: ${this.zIndex}"
          @click=${this.handleMaskClick}
        ></div>
      ` : null}

      <div 
        class=${classMap(drawerClasses)}
        style=${styleMap(drawerStyles)}
        role="dialog"
        aria-modal="true"
        aria-label="${this.title}"
      >
        <div class="mx-drawer-content-wrapper">
          <div class="mx-drawer-wrapper-body">
            ${hasTitle || this.closable ? html`
              <div class="mx-drawer-header">
                <div class="mx-drawer-header-title">
                  ${hasTitle ? html`
                    <div class="mx-drawer-title">
                      <slot name="title">${this.title}</slot>
                    </div>
                  ` : null}
                  ${hasExtra ? html`
                    <div class="mx-drawer-extra">
                      <slot name="extra"></slot>
                    </div>
                  ` : null}
                </div>
                ${this.closable ? html`
                  <button 
                    class="mx-drawer-close"
                    @click=${this.handleClose}
                    aria-label="Close"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8.94 8l4.53 4.53a.67.67 0 01-.95.95L8 8.94l-4.53 4.53a.67.67 0 01-.95-.95L7.06 8 2.53 3.47a.67.67 0 11.95-.95L8 7.06l4.53-4.53a.67.67 0 11.95.95L8.94 8z"/>
                    </svg>
                  </button>
                ` : null}
              </div>
            ` : null}

            <div class="mx-drawer-body">
              <slot></slot>
            </div>

            ${hasFooter ? html`
              <div class="mx-drawer-footer">
                <slot name="footer"></slot>
              </div>
            ` : null}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-drawer': MXDrawer;
  }
}
