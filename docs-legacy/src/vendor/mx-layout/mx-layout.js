var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
/**
 * Layout component - Main layout container
 *
 * @element mx-layout
 *
 * @slot - Layout content (mx-header, mx-sider, mx-content, mx-footer)
 */
let MXLayout = class MXLayout extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Whether layout has sider
         */
        this.hasSider = false;
    }
    render() {
        const classes = {
            'mx-layout': true,
            'mx-layout-has-sider': this.hasSider,
        };
        return html `
      <section class=${classMap(classes)}>
        <slot></slot>
      </section>
    `;
    }
};
MXLayout.styles = css `
    :host {
      display: flex;
      flex-direction: column;
      flex: auto;
      box-sizing: border-box;
      min-height: 0;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-layout {
      display: flex;
      flex: auto;
      flex-direction: column;
      min-height: 0;
      background: var(--mx-color-bg-layout, #f5f5f5);
    }

    .mx-layout-has-sider {
      flex-direction: row;
    }

    .mx-layout-has-sider > .mx-layout,
    .mx-layout-has-sider > .mx-layout-content {
      overflow-x: hidden;
    }
  `;
__decorate([
    property({ type: Boolean, attribute: 'has-sider' })
], MXLayout.prototype, "hasSider", void 0);
MXLayout = __decorate([
    customElement('mx-layout')
], MXLayout);
export { MXLayout };
//# sourceMappingURL=mx-layout.js.map