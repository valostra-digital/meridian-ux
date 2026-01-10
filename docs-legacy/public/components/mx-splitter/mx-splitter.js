var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
/**
 * Splitter component - Resizable split pane layout.
 *
 * @element mx-splitter
 *
 * @attr {SplitterLayout} layout - Layout direction: horizontal or vertical
 * @attr {string} default-size - Default size of first panel (e.g., '50%', '200px')
 * @attr {string} min - Minimum size of first panel
 * @attr {string} max - Maximum size of first panel
 * @attr {boolean} collapsible - Enable collapse functionality
 * @attr {number} split-size - Size of the split bar in pixels
 *
 * @slot - First panel content (default slot)
 * @slot second - Second panel content
 *
 * @fires resize - Fired when panels are resized
 * @fires resize-end - Fired when resize ends
 *
 * @example
 * ```html
 * <mx-splitter default-size="30%">
 *   <div>Left Panel</div>
 *   <div slot="second">Right Panel</div>
 * </mx-splitter>
 *
 * <mx-splitter layout="vertical" default-size="200px">
 *   <div>Top Panel</div>
 *   <div slot="second">Bottom Panel</div>
 * </mx-splitter>
 * ```
 */
let MXSplitter = class MXSplitter extends LitElement {
    constructor() {
        super(...arguments);
        this.layout = 'horizontal';
        this.defaultSize = '50%';
        this.min = '0px';
        this.max = '100%';
        this.collapsible = false;
        this.splitSize = 5;
        this.firstPanelSize = '50%';
        this.dragging = false;
        this.collapsed = false;
        this.startPos = 0;
        this.startSize = 0;
    }
    connectedCallback() {
        super.connectedCallback();
        this.firstPanelSize = this.defaultSize;
    }
    handleMouseDown(e) {
        e.preventDefault();
        this.dragging = true;
        this.startPos = this.layout === 'horizontal' ? e.clientX : e.clientY;
        // Get current size in pixels
        const rect = this.firstPanel.getBoundingClientRect();
        this.startSize = this.layout === 'horizontal' ? rect.width : rect.height;
        const handleMouseMove = (moveEvent) => {
            if (!this.dragging)
                return;
            const currentPos = this.layout === 'horizontal' ? moveEvent.clientX : moveEvent.clientY;
            const delta = currentPos - this.startPos;
            const newSize = this.startSize + delta;
            // Get container size
            const containerRect = this.splitterElement.getBoundingClientRect();
            const containerSize = this.layout === 'horizontal' ? containerRect.width : containerRect.height;
            // Parse min and max
            const minSize = this.parseSize(this.min, containerSize);
            const maxSize = this.parseSize(this.max, containerSize);
            // Clamp the size
            const clampedSize = Math.max(minSize, Math.min(maxSize, newSize));
            this.firstPanelSize = `${clampedSize}px`;
            this.dispatchEvent(new CustomEvent('resize', {
                detail: { size: clampedSize },
                bubbles: true,
                composed: true
            }));
            this.requestUpdate();
        };
        const handleMouseUp = () => {
            this.dragging = false;
            this.dispatchEvent(new CustomEvent('resize-end', {
                detail: { size: this.firstPanelSize },
                bubbles: true,
                composed: true
            }));
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
    parseSize(size, containerSize) {
        if (size.endsWith('%')) {
            const percentage = parseFloat(size) / 100;
            return containerSize * percentage;
        }
        return parseFloat(size);
    }
    handleCollapse() {
        this.collapsed = !this.collapsed;
        if (this.collapsed) {
            this.firstPanelSize = '0px';
        }
        else {
            this.firstPanelSize = this.defaultSize;
        }
        this.dispatchEvent(new CustomEvent('collapse', {
            detail: { collapsed: this.collapsed },
            bubbles: true,
            composed: true
        }));
    }
    render() {
        const splitterClasses = {
            'mx-splitter': true,
            'mx-splitter-horizontal': this.layout === 'horizontal',
            'mx-splitter-vertical': this.layout === 'vertical',
            'mx-splitter-dragging': this.dragging,
        };
        const barClasses = {
            'mx-splitter-bar': true,
            'mx-splitter-bar-dragging': this.dragging,
        };
        const leftArrow = html `
      <svg viewBox="64 64 896 896">
        <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"/>
      </svg>
    `;
        const rightArrow = html `
      <svg viewBox="64 64 896 896">
        <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"/>
      </svg>
    `;
        const upArrow = html `
      <svg viewBox="64 64 896 896">
        <path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"/>
      </svg>
    `;
        const downArrow = html `
      <svg viewBox="64 64 896 896">
        <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"/>
      </svg>
    `;
        return html `
      <div class=${classMap(splitterClasses)}>
        <div 
          class="mx-splitter-panel mx-splitter-panel-first"
          style="${this.layout === 'horizontal' ? 'width' : 'height'}: ${this.firstPanelSize}"
        >
          <slot></slot>
        </div>

        <div 
          class=${classMap(barClasses)}
          @mousedown=${this.handleMouseDown}
        >
          <div class="mx-splitter-bar-dragger">
            <span class="mx-splitter-bar-dragger-dot"></span>
            <span class="mx-splitter-bar-dragger-dot"></span>
            <span class="mx-splitter-bar-dragger-dot"></span>
          </div>

          ${this.collapsible ? html `
            <button 
              class="mx-splitter-collapse-btn"
              @click=${this.handleCollapse}
              aria-label=${this.collapsed ? 'Expand' : 'Collapse'}
            >
              ${this.layout === 'horizontal'
            ? (this.collapsed ? rightArrow : leftArrow)
            : (this.collapsed ? downArrow : upArrow)}
            </button>
          ` : ''}
        </div>

        <div class="mx-splitter-panel mx-splitter-panel-second">
          <slot name="second"></slot>
        </div>
      </div>
    `;
    }
};
MXSplitter.styles = css `
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-splitter {
      display: flex;
      width: 100%;
      height: 100%;
      position: relative;
    }

    .mx-splitter-horizontal {
      flex-direction: row;
    }

    .mx-splitter-vertical {
      flex-direction: column;
    }

    .mx-splitter-panel {
      overflow: auto;
      position: relative;
    }

    .mx-splitter-panel-first {
      flex-shrink: 0;
    }

    .mx-splitter-panel-second {
      flex: 1;
      min-width: 0;
      min-height: 0;
    }

    .mx-splitter-bar {
      flex-shrink: 0;
      background-color: var(--mx-color-split, rgba(5, 5, 5, 0.06));
      position: relative;
      z-index: 1;
      transition: background-color 0.2s;
    }

    .mx-splitter-horizontal .mx-splitter-bar {
      width: 5px;
      cursor: col-resize;
    }

    .mx-splitter-vertical .mx-splitter-bar {
      height: 5px;
      cursor: row-resize;
    }

    .mx-splitter-bar:hover,
    .mx-splitter-bar-dragging {
      background-color: var(--mx-color-primary, #1677ff);
    }

    .mx-splitter-bar-mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: var(--mx-color-primary, #1677ff);
      opacity: 0.2;
      z-index: 110;
    }

    .mx-splitter-bar-dragger {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(0, 0, 0, 0.25);
      transition: color 0.2s;
    }

    .mx-splitter-bar:hover .mx-splitter-bar-dragger,
    .mx-splitter-bar-dragging .mx-splitter-bar-dragger {
      color: #ffffff;
    }

    .mx-splitter-horizontal .mx-splitter-bar-dragger {
      flex-direction: column;
      gap: 2px;
    }

    .mx-splitter-vertical .mx-splitter-bar-dragger {
      flex-direction: row;
      gap: 2px;
    }

    .mx-splitter-bar-dragger-dot {
      width: 3px;
      height: 3px;
      background-color: currentColor;
      border-radius: 50%;
    }

    .mx-splitter-collapse-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--mx-color-bg-container, #ffffff);
      border: 1px solid var(--mx-color-border, #d9d9d9);
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.2s;
      opacity: 0;
    }

    .mx-splitter-bar:hover .mx-splitter-collapse-btn {
      opacity: 1;
    }

    .mx-splitter-collapse-btn:hover {
      background-color: var(--mx-color-primary-bg, #e6f4ff);
      border-color: var(--mx-color-primary, #1677ff);
      color: var(--mx-color-primary, #1677ff);
    }

    .mx-splitter-collapse-btn svg {
      width: 12px;
      height: 12px;
      fill: currentColor;
    }

    /* Prevent text selection during drag */
    .mx-splitter-dragging {
      user-select: none;
    }

    .mx-splitter-dragging * {
      cursor: col-resize !important;
    }

    .mx-splitter-vertical.mx-splitter-dragging * {
      cursor: row-resize !important;
    }
  `;
__decorate([
    property({ type: String })
], MXSplitter.prototype, "layout", void 0);
__decorate([
    property({ type: String, attribute: 'default-size' })
], MXSplitter.prototype, "defaultSize", void 0);
__decorate([
    property({ type: String })
], MXSplitter.prototype, "min", void 0);
__decorate([
    property({ type: String })
], MXSplitter.prototype, "max", void 0);
__decorate([
    property({ type: Boolean })
], MXSplitter.prototype, "collapsible", void 0);
__decorate([
    property({ type: Number, attribute: 'split-size' })
], MXSplitter.prototype, "splitSize", void 0);
__decorate([
    state()
], MXSplitter.prototype, "firstPanelSize", void 0);
__decorate([
    state()
], MXSplitter.prototype, "dragging", void 0);
__decorate([
    state()
], MXSplitter.prototype, "collapsed", void 0);
__decorate([
    query('.mx-splitter')
], MXSplitter.prototype, "splitterElement", void 0);
__decorate([
    query('.mx-splitter-panel-first')
], MXSplitter.prototype, "firstPanel", void 0);
MXSplitter = __decorate([
    customElement('mx-splitter')
], MXSplitter);
export { MXSplitter };
//# sourceMappingURL=mx-splitter.js.map