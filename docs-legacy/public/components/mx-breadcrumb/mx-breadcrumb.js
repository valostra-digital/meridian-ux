var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * Breadcrumb component - Display the current page path
 *
 * @element mx-breadcrumb
 *
 * @slot - Breadcrumb items (mx-breadcrumb-item)
 *
 * @cssprop --mx-breadcrumb-separator - Custom separator content
 */
let MXBreadcrumb = class MXBreadcrumb extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Custom separator (default is "/")
         */
        this.separator = '/';
    }
    connectedCallback() {
        super.connectedCallback();
        this.updateChildrenSeparator();
    }
    updateChildrenSeparator() {
        // Wait for next frame to ensure children are rendered
        requestAnimationFrame(() => {
            const items = this.querySelectorAll('mx-breadcrumb-item');
            items.forEach((item) => {
                item.separator = this.separator;
            });
        });
    }
    render() {
        return html `
      <nav class="mx-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <slot @slotchange=${this.updateChildrenSeparator}></slot>
        </ol>
      </nav>
    `;
    }
};
MXBreadcrumb.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-breadcrumb {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      line-height: var(--mx-line-height, 1.5714285714285714);
      list-style: none;
      font-family: inherit;
    }

    .mx-breadcrumb ol {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin: 0;
      padding: 0;
      list-style: none;
    }
  `;
__decorate([
    property({ type: String })
], MXBreadcrumb.prototype, "separator", void 0);
MXBreadcrumb = __decorate([
    customElement('mx-breadcrumb')
], MXBreadcrumb);
export { MXBreadcrumb };
//# sourceMappingURL=mx-breadcrumb.js.map