import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Collapse container component for accordion panels.
 * 
 * @element mx-collapse
 * 
 * @attr {string} active-key - Currently active panel key(s), comma-separated for multiple
 * @attr {boolean} accordion - Accordion mode (only one panel open at a time)
 * @attr {boolean} bordered - Whether to show border
 * @attr {string} expand-icon-position - Position of expand icon: start, end
 * @attr {boolean} ghost - Make collapse borderless and transparent
 * 
 * @slot - Collapse panel items (mx-collapse-panel elements)
 * 
 * @fires change - Dispatched when active panels change
 * 
 * @example
 * ```html
 * <mx-collapse>
 *   <mx-collapse-panel key="1" header="Panel 1">Content 1</mx-collapse-panel>
 *   <mx-collapse-panel key="2" header="Panel 2">Content 2</mx-collapse-panel>
 * </mx-collapse>
 * 
 * <!-- Accordion mode -->
 * <mx-collapse accordion active-key="1">
 *   <mx-collapse-panel key="1" header="Panel 1">Content 1</mx-collapse-panel>
 *   <mx-collapse-panel key="2" header="Panel 2">Content 2</mx-collapse-panel>
 * </mx-collapse>
 * ```
 */
@customElement('mx-collapse')
export class MXCollapse extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }

    .mx-collapse {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: 14px;
      line-height: 1.5714285714285714;
      list-style: none;
      background-color: var(--mx-color-bg-container, #ffffff);
      border: 1px solid var(--mx-color-border, #d9d9d9);
      border-radius: var(--mx-border-radius-lg, 8px);
    }

    .mx-collapse-borderless {
      background-color: transparent;
      border: 0;
    }

    .mx-collapse-ghost {
      background-color: transparent;
      border: 0;
    }

    .mx-collapse-ghost ::slotted(mx-collapse-panel) {
      border-bottom: 0;
    }

    ::slotted(mx-collapse-panel:last-child) {
      border-radius: 0 0 var(--mx-border-radius-lg, 8px) var(--mx-border-radius-lg, 8px);
    }
  `;

  @property({ type: String, attribute: 'active-key' })
  activeKey = '';

  @property({ type: Boolean })
  accordion = false;

  @property({ type: Boolean })
  bordered = true;

  @property({ type: String, attribute: 'expand-icon-position' })
  expandIconPosition: 'start' | 'end' = 'start';

  @property({ type: Boolean })
  ghost = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('panel-toggle', this.handlePanelToggle as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('panel-toggle', this.handlePanelToggle as EventListener);
  }

  private handlePanelToggle(e: CustomEvent) {
    e.stopPropagation();
    
    const panelKey = e.detail.key;
    const isActive = e.detail.active;

    let newActiveKeys: string[];

    if (this.accordion) {
      // Accordion mode: only one panel can be open
      newActiveKeys = isActive ? [panelKey] : [];
    } else {
      // Multiple mode: toggle the panel
      const currentKeys = this.activeKey ? this.activeKey.split(',').map(k => k.trim()) : [];
      if (isActive) {
        newActiveKeys = [...currentKeys, panelKey];
      } else {
        newActiveKeys = currentKeys.filter(k => k !== panelKey);
      }
    }

    this.activeKey = newActiveKeys.join(',');
    
    // Update all panels
    this.updatePanels();

    // Dispatch change event
    this.dispatchEvent(new CustomEvent('change', {
      detail: { activeKeys: newActiveKeys },
      bubbles: true,
      composed: true
    }));
  }

  private updatePanels() {
    const panels = Array.from(this.querySelectorAll('mx-collapse-panel'));
    const activeKeys = this.activeKey ? this.activeKey.split(',').map(k => k.trim()) : [];

    panels.forEach(panel => {
      const key = panel.getAttribute('key') || '';
      const isActive = activeKeys.includes(key);
      panel.setAttribute('active', String(isActive));
      panel.setAttribute('expand-icon-position', this.expandIconPosition);
    });
  }

  firstUpdated() {
    this.updatePanels();
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('activeKey') || changedProperties.has('expandIconPosition')) {
      this.updatePanels();
    }
  }

  render() {
    const classes = [
      'mx-collapse',
      !this.bordered && 'mx-collapse-borderless',
      this.ghost && 'mx-collapse-ghost'
    ].filter(Boolean).join(' ');

    return html`
      <div class="${classes}">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-collapse': MXCollapse;
  }
}
