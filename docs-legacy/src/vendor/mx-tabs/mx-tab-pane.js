var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * Tab Pane component - Individual tab content
 *
 * @element mx-tab-pane
 *
 * @slot - Content to display when tab is active
 */
let MXTabPane = class MXTabPane extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Whether tab is disabled
         */
        this.disabled = false;
        /**
         * Whether tab is closable (editable-card mode)
         */
        this.closable = true;
        /**
         * Whether tab is active
         */
        this.active = false;
        /**
         * Force render content even when inactive
         */
        this.forceRender = false;
    }
    render() {
        if (!this.active && !this.forceRender) {
            return html ``;
        }
        return html `
      <div class="mx-tab-pane ${this.active ? 'mx-tab-pane-animated' : ''}">
        <slot></slot>
      </div>
    `;
    }
};
MXTabPane.styles = css `
    :host {
      display: none;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    :host([active]) {
      display: block;
    }

    .mx-tab-pane {
      width: 100%;
    }

    .mx-tab-pane-animated {
      animation: fadeIn 0.3s;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;
__decorate([
    property({ type: String })
], MXTabPane.prototype, "tab", void 0);
__decorate([
    property({ type: String })
], MXTabPane.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], MXTabPane.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], MXTabPane.prototype, "closable", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MXTabPane.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, attribute: 'force-render' })
], MXTabPane.prototype, "forceRender", void 0);
MXTabPane = __decorate([
    customElement('mx-tab-pane')
], MXTabPane);
export { MXTabPane };
//# sourceMappingURL=mx-tab-pane.js.map