import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type TabsType = 'line' | 'card' | 'editable-card';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';
export type TabsSize = 'large' | 'middle' | 'small';

/**
 * Tabs component - Tab navigation container
 * 
 * @element mx-tabs
 * 
 * @slot - Tab pane elements (mx-tab-pane)
 * @slot tab-bar-extra-content - Extra content in tab bar
 * 
 * @fires change - Dispatched when active tab changes
 * @fires edit - Dispatched when add/remove tab in editable mode
 * 
 * @cssprop --mx-tabs-ink-bar-color - Color of the active indicator bar
 */
@customElement('mx-tabs')
export class MXTabs extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-tabs {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      line-height: var(--mx-line-height, 1.5714285714285714);
      list-style: none;
      font-family: inherit;
      display: flex;
    }

    .mx-tabs-top,
    .mx-tabs-bottom {
      flex-direction: column;
    }

    .mx-tabs-left,
    .mx-tabs-right {
      flex-direction: row;
    }

    .mx-tabs-left .mx-tabs-nav {
      order: 0;
    }

    .mx-tabs-right .mx-tabs-nav {
      order: 1;
    }

    .mx-tabs-nav {
      position: relative;
      display: flex;
      flex: none;
      align-items: center;
    }

    .mx-tabs-top .mx-tabs-nav,
    .mx-tabs-bottom .mx-tabs-nav {
      margin-bottom: 16px;
    }

    .mx-tabs-left .mx-tabs-nav,
    .mx-tabs-right .mx-tabs-nav {
      flex-direction: column;
      min-width: 50px;
    }

    .mx-tabs-nav-wrap {
      position: relative;
      display: flex;
      flex: auto;
      align-self: stretch;
      overflow: hidden;
    }

    .mx-tabs-nav-list {
      position: relative;
      display: flex;
      transition: transform 0.3s;
    }

    .mx-tabs-left .mx-tabs-nav-list,
    .mx-tabs-right .mx-tabs-nav-list {
      flex-direction: column;
    }

    .mx-tabs-tab {
      position: relative;
      display: inline-flex;
      align-items: center;
      padding: 12px 0;
      font-size: 14px;
      background: transparent;
      border: 0;
      outline: none;
      cursor: pointer;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.65));
      transition: color 0.3s;
      margin: 0 32px 0 0;
    }

    .mx-tabs-left .mx-tabs-tab,
    .mx-tabs-right .mx-tabs-tab {
      margin: 0 0 16px 0;
      padding: 8px 16px;
    }

    .mx-tabs-tab:hover {
      color: var(--mx-color-primary-hover, #4096ff);
    }

    .mx-tabs-tab-active {
      color: var(--mx-color-primary, #1677ff);
      font-weight: 500;
    }

    .mx-tabs-tab-disabled {
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
      cursor: not-allowed;
    }

    .mx-tabs-tab-disabled:hover {
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
    }

    .mx-tabs-ink-bar {
      position: absolute;
      background: var(--mx-tabs-ink-bar-color, var(--mx-color-primary, #1677ff));
      pointer-events: none;
      transition: left 0.3s, width 0.3s, top 0.3s, height 0.3s;
    }

    .mx-tabs-top .mx-tabs-ink-bar {
      bottom: 0;
      height: 2px;
    }

    .mx-tabs-bottom .mx-tabs-ink-bar {
      top: 0;
      height: 2px;
    }

    .mx-tabs-left .mx-tabs-ink-bar {
      right: 0;
      width: 2px;
    }

    .mx-tabs-right .mx-tabs-ink-bar {
      left: 0;
      width: 2px;
    }

    /* Card type */
    .mx-tabs-card .mx-tabs-nav {
      margin: 0;
    }

    .mx-tabs-card .mx-tabs-tab {
      margin: 0;
      padding: 8px 16px;
      background: var(--mx-color-fill-alter, rgba(0, 0, 0, 0.02));
      border: 1px solid var(--mx-color-border, #d9d9d9);
      transition: all 0.3s;
      border-radius: var(--mx-border-radius, 6px) var(--mx-border-radius, 6px) 0 0;
    }

    .mx-tabs-card .mx-tabs-tab-active {
      background: #ffffff;
      border-bottom-color: #ffffff;
    }

    .mx-tabs-card .mx-tabs-tab + .mx-tabs-tab {
      margin-left: 2px;
    }

    .mx-tabs-card .mx-tabs-ink-bar {
      display: none;
    }

    /* Size variants */
    .mx-tabs-large .mx-tabs-tab {
      font-size: 16px;
      padding: 16px 0;
    }

    .mx-tabs-small .mx-tabs-tab {
      font-size: 14px;
      padding: 8px 0;
    }

    /* Content */
    .mx-tabs-content {
      display: flex;
      width: 100%;
    }

    .mx-tabs-content-holder {
      flex: auto;
      min-width: 0;
      min-height: 0;
    }

    .mx-tabs-centered .mx-tabs-nav-list {
      justify-content: center;
    }

    .mx-tabs-extra-content {
      flex: none;
    }
  `;

  /**
   * Active tab key
   */
  @property({ type: String, attribute: 'active-key' })
  activeKey?: string;

  /**
   * Initial active tab key
   */
  @property({ type: String, attribute: 'default-active-key' })
  defaultActiveKey?: string;

  /**
   * Type of tabs
   */
  @property({ type: String })
  type: TabsType = 'line';

  /**
   * Position of tabs
   */
  @property({ type: String, attribute: 'tab-position' })
  tabPosition: TabsPosition = 'top';

  /**
   * Size of tabs
   */
  @property({ type: String })
  size: TabsSize = 'middle';

  /**
   * Whether tabs are centered
   */
  @property({ type: Boolean })
  centered = false;

  /**
   * Whether tabs can be closed (editable-card only)
   */
  @property({ type: Boolean, attribute: 'hide-add' })
  hideAdd = false;

  /**
   * Whether tabs are animated
   */
  @property({ type: Boolean })
  animated = true;

  @state()
  private internalActiveKey?: string;

  @state()
  private inkBarStyle: any = {};

  @query('.mx-tabs-nav-list')
  private navList?: HTMLElement;

  @query('.mx-tabs-ink-bar')
  private inkBar?: HTMLElement;

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.activeKey && !this.internalActiveKey) {
      this.internalActiveKey = this.defaultActiveKey;
    }
  }

  firstUpdated(): void {
    this.updateInkBar();
  }

  updated(changedProperties: Map<string, any>): void {
    if (changedProperties.has('activeKey') || changedProperties.has('internalActiveKey')) {
      this.updateInkBar();
      this.updatePanes();
    }
  }

  private get currentActiveKey(): string | undefined {
    return this.activeKey ?? this.internalActiveKey;
  }

  private updateInkBar(): void {
    requestAnimationFrame(() => {
      const activeTab = this.shadowRoot?.querySelector('.mx-tabs-tab-active') as HTMLElement;
      if (!activeTab || !this.navList) return;

      const isVertical = this.tabPosition === 'left' || this.tabPosition === 'right';

      if (isVertical) {
        this.inkBarStyle = {
          top: `${activeTab.offsetTop}px`,
          height: `${activeTab.offsetHeight}px`,
        };
      } else {
        this.inkBarStyle = {
          left: `${activeTab.offsetLeft}px`,
          width: `${activeTab.offsetWidth}px`,
        };
      }

      if (this.inkBar) {
        Object.assign(this.inkBar.style, this.inkBarStyle);
      }
    });
  }

  private updatePanes(): void {
    const panes = this.querySelectorAll('mx-tab-pane');
    panes.forEach((pane: any) => {
      pane.active = pane.tab === this.currentActiveKey;
    });
  }

  private handleTabClick(key: string, disabled: boolean): void {
    if (disabled) return;

    this.internalActiveKey = key;

    this.dispatchEvent(new CustomEvent('change', {
      detail: { activeKey: key },
      bubbles: true,
      composed: true,
    }));
  }

  private handleAddTab(): void {
    this.dispatchEvent(new CustomEvent('edit', {
      detail: { action: 'add' },
      bubbles: true,
      composed: true,
    }));
  }

  private handleRemoveTab(key: string, e: Event): void {
    e.stopPropagation();
    
    this.dispatchEvent(new CustomEvent('edit', {
      detail: { action: 'remove', targetKey: key },
      bubbles: true,
      composed: true,
    }));
  }

  private renderTabs(): any[] {
    const panes = Array.from(this.querySelectorAll('mx-tab-pane'));
    
    return panes.map((pane: any) => {
      const isActive = pane.tab === this.currentActiveKey;
      const classes = {
        'mx-tabs-tab': true,
        'mx-tabs-tab-active': isActive,
        'mx-tabs-tab-disabled': pane.disabled,
      };

      return html`
        <div
          class=${classMap(classes)}
          @click=${() => this.handleTabClick(pane.tab, pane.disabled)}
        >
          ${pane.label || pane.tab}
          ${this.type === 'editable-card' && !pane.closable === false ? html`
            <span
              class="mx-tabs-tab-remove"
              @click=${(e: Event) => this.handleRemoveTab(pane.tab, e)}
            >
              ×
            </span>
          ` : ''}
        </div>
      `;
    });
  }

  render() {
    const classes = {
      'mx-tabs': true,
      [`mx-tabs-${this.tabPosition}`]: true,
      [`mx-tabs-${this.type}`]: true,
      [`mx-tabs-${this.size}`]: true,
      'mx-tabs-centered': this.centered,
    };

    return html`
      <div class=${classMap(classes)}>
        <div class="mx-tabs-nav">
          <div class="mx-tabs-nav-wrap">
            <div class="mx-tabs-nav-list">
              ${this.renderTabs()}
              ${this.type === 'line' ? html`
                <div class="mx-tabs-ink-bar"></div>
              ` : ''}
            </div>
          </div>
          ${this.type === 'editable-card' && !this.hideAdd ? html`
            <div class="mx-tabs-extra-content">
              <button @click=${this.handleAddTab}>+</button>
            </div>
          ` : ''}
          <slot name="tab-bar-extra-content"></slot>
        </div>
        <div class="mx-tabs-content">
          <div class="mx-tabs-content-holder">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-tabs': MXTabs;
  }
}
