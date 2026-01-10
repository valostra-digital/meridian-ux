import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type SiderTheme = 'light' | 'dark';
export type SiderBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Sider component - Layout sidebar
 * 
 * @element mx-sider
 * 
 * @slot - Sider content
 * @slot trigger - Custom collapse trigger
 * 
 * @fires collapse - Dispatched when sider collapses/expands
 * @fires breakpoint - Dispatched when breakpoint is triggered
 */
@customElement('mx-sider')
export class MXSider extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-layout-sider {
      position: relative;
      min-width: 0;
      background: var(--mx-color-bg-sider, #001529);
      transition: all 0.2s;
    }

    .mx-layout-sider-light {
      background: #ffffff;
      border-right: 1px solid var(--mx-color-border, #f0f0f0);
    }

    .mx-layout-sider-collapsed {
      flex: 0 0 80px !important;
      max-width: 80px !important;
      min-width: 80px !important;
      width: 80px !important;
    }

    .mx-layout-sider-has-trigger {
      padding-bottom: 48px;
    }

    .mx-layout-sider-trigger {
      position: absolute;
      bottom: 0;
      z-index: 1;
      height: 48px;
      width: 100%;
      color: #ffffff;
      line-height: 48px;
      text-align: center;
      background: rgba(255, 255, 255, 0.1);
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mx-layout-sider-trigger:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .mx-layout-sider-light .mx-layout-sider-trigger {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      background: #ffffff;
      border-top: 1px solid var(--mx-color-border, #f0f0f0);
    }

    .mx-layout-sider-zero-width {
      flex: 0 0 0 !important;
      max-width: 0 !important;
      min-width: 0 !important;
      width: 0 !important;
      overflow: hidden;
    }

    .mx-layout-sider-zero-width-trigger {
      position: absolute;
      top: 64px;
      right: -36px;
      z-index: 1;
      width: 36px;
      height: 42px;
      color: #ffffff;
      font-size: 18px;
      line-height: 42px;
      text-align: center;
      background: #001529;
      border-radius: 0 var(--mx-border-radius, 6px) var(--mx-border-radius, 6px) 0;
      cursor: pointer;
      transition: background 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mx-layout-sider-zero-width-trigger:hover {
      background: #192c3e;
    }

    .mx-layout-sider-light .mx-layout-sider-zero-width-trigger {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      background: #ffffff;
      border: 1px solid var(--mx-color-border, #f0f0f0);
    }
  `;

  /**
   * Width of the sider
   */
  @property({ type: Number })
  width = 200;

  /**
   * Width when collapsed
   */
  @property({ type: Number, attribute: 'collapsed-width' })
  collapsedWidth = 80;

  /**
   * Whether sider is collapsible
   */
  @property({ type: Boolean })
  collapsible = false;

  /**
   * Whether sider is collapsed (controlled)
   */
  @property({ type: Boolean })
  collapsed = false;

  /**
   * Default collapsed state
   */
  @property({ type: Boolean, attribute: 'default-collapsed' })
  defaultCollapsed = false;

  /**
   * Whether to show collapse trigger
   */
  @property({ type: Boolean, attribute: 'show-trigger' })
  showTrigger = true;

  /**
   * Theme
   */
  @property({ type: String })
  theme: SiderTheme = 'dark';

  /**
   * Breakpoint for responsive collapse
   */
  @property({ type: String })
  breakpoint?: SiderBreakpoint;

  /**
   * Reverse arrow direction
   */
  @property({ type: Boolean, attribute: 'reverse-arrow' })
  reverseArrow = false;

  @state()
  private internalCollapsed = false;

  @state()
  private below = false;

  private resizeObserver?: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    
    if (this.collapsed === false && this.defaultCollapsed) {
      this.internalCollapsed = true;
    }

    if (this.breakpoint) {
      this.setupBreakpointObserver();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('collapsed')) {
      this.internalCollapsed = this.collapsed;
    }
  }

  private get isCollapsed(): boolean {
    return this.collapsed ?? this.internalCollapsed;
  }

  private setupBreakpointObserver(): void {
    const breakpoints: Record<SiderBreakpoint, number> = {
      xs: 575,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1600,
    };

    const checkBreakpoint = () => {
      if (!this.breakpoint) return;
      
      const width = window.innerWidth;
      const breakpointWidth = breakpoints[this.breakpoint];
      const nowBelow = width <= breakpointWidth;

      if (nowBelow !== this.below) {
        this.below = nowBelow;
        this.dispatchEvent(new CustomEvent('breakpoint', {
          detail: { broken: nowBelow },
          bubbles: true,
          composed: true,
        }));

        if (nowBelow) {
          this.internalCollapsed = true;
        }
      }
    };

    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
  }

  private handleTriggerClick(): void {
    if (!this.collapsible) return;

    this.internalCollapsed = !this.internalCollapsed;

    this.dispatchEvent(new CustomEvent('collapse', {
      detail: { collapsed: this.internalCollapsed },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const isZeroWidth = this.collapsedWidth === 0;
    const currentWidth = this.isCollapsed ? this.collapsedWidth : this.width;

    const classes = {
      'mx-layout-sider': true,
      'mx-layout-sider-collapsed': this.isCollapsed,
      'mx-layout-sider-has-trigger': this.collapsible && this.showTrigger && !isZeroWidth,
      'mx-layout-sider-zero-width': this.isCollapsed && isZeroWidth,
      [`mx-layout-sider-${this.theme}`]: true,
    };

    const style = !isZeroWidth || !this.isCollapsed
      ? `flex: 0 0 ${currentWidth}px; max-width: ${currentWidth}px; min-width: ${currentWidth}px; width: ${currentWidth}px;`
      : '';

    const triggerIcon = this.isCollapsed 
      ? (this.reverseArrow ? '◀' : '▶')
      : (this.reverseArrow ? '▶' : '◀');

    return html`
      <aside class=${classMap(classes)} style=${style}>
        <div class="mx-layout-sider-children">
          <slot></slot>
        </div>
        
        ${this.collapsible && this.showTrigger ? html`
          ${isZeroWidth && this.isCollapsed ? html`
            <div
              class="mx-layout-sider-zero-width-trigger"
              @click=${this.handleTriggerClick}
            >
              <slot name="trigger">${triggerIcon}</slot>
            </div>
          ` : html`
            <div
              class="mx-layout-sider-trigger"
              @click=${this.handleTriggerClick}
            >
              <slot name="trigger">${triggerIcon}</slot>
            </div>
          `}
        ` : ''}
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-sider': MXSider;
  }
}
