var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
/**
 * Footer component - Layout footer
 *
 * @element mx-footer
 *
 * @slot - Footer content
 */
let MXFooter = class MXFooter extends LitElement {
    render() {
        return html `
      <footer class="mx-layout-footer">
        <slot></slot>
      </footer>
    `;
    }
};
MXFooter.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-layout-footer {
      padding: 24px 50px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      background: var(--mx-color-bg-footer, #f5f5f5);
    }
  `;
MXFooter = __decorate([
    customElement('mx-footer')
], MXFooter);
export { MXFooter };
//# sourceMappingURL=mx-footer.js.map