var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
/**
 * Header component - Layout header
 *
 * @element mx-header
 *
 * @slot - Header content
 */
let MXHeader = class MXHeader extends LitElement {
    render() {
        return html `
      <header class="mx-layout-header">
        <slot></slot>
      </header>
    `;
    }
};
MXHeader.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-layout-header {
      height: 64px;
      padding: 0 50px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      line-height: 64px;
      background: var(--mx-color-bg-header, #001529);
    }
  `;
MXHeader = __decorate([
    customElement('mx-header')
], MXHeader);
export { MXHeader };
//# sourceMappingURL=mx-header.js.map