var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
/**
 * Masonry component - Masonry grid layout for dynamic content.
 *
 * @element mx-masonry
 *
 * @attr {number} columns - Number of columns
 * @attr {number} gap - Gap between items in pixels
 * @attr {string} column-width - Fixed column width (auto-calculates columns if set)
 *
 * @slot - Default slot for masonry items
 *
 * @example
 * ```html
 * <mx-masonry columns="3" gap="16">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </mx-masonry>
 *
 * <mx-masonry column-width="250px" gap="20">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </mx-masonry>
 * ```
 */
let MXMasonry = class MXMasonry extends LitElement {
    constructor() {
        super(...arguments);
        this.columns = 3;
        this.gap = 16;
        this.columnWidth = '';
        this.columnHeights = [];
        this.itemColumns = [];
    }
    connectedCallback() {
        super.connectedCallback();
        // Setup resize observer
        this.resizeObserver = new ResizeObserver(() => {
            this.layout();
        });
        this.resizeObserver.observe(this);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.resizeObserver?.disconnect();
    }
    firstUpdated() {
        this.layout();
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('columns') || changedProperties.has('gap') || changedProperties.has('columnWidth')) {
            this.layout();
        }
    }
    handleSlotChange() {
        this.layout();
    }
    layout() {
        requestAnimationFrame(() => {
            const items = this.defaultSlot?.assignedElements() || [];
            if (items.length === 0)
                return;
            // Calculate columns if columnWidth is set
            let numColumns = this.columns;
            if (this.columnWidth) {
                const containerWidth = this.offsetWidth;
                const colWidth = parseInt(this.columnWidth);
                numColumns = Math.max(1, Math.floor(containerWidth / (colWidth + this.gap)));
            }
            // Initialize column heights
            this.columnHeights = new Array(numColumns).fill(0);
            this.itemColumns = [];
            // Distribute items to columns
            items.forEach((item, index) => {
                const htmlItem = item;
                // Find shortest column
                const shortestColumn = this.columnHeights.indexOf(Math.min(...this.columnHeights));
                // Assign item to column
                this.itemColumns[index] = shortestColumn;
                // Update column height
                const itemHeight = htmlItem.offsetHeight || 0;
                this.columnHeights[shortestColumn] += itemHeight + this.gap;
            });
            this.requestUpdate();
        });
    }
    /**
     * Manually trigger layout recalculation
     */
    relayout() {
        this.layout();
    }
    render() {
        const items = this.defaultSlot?.assignedElements() || [];
        const numColumns = this.columnWidth
            ? Math.max(1, Math.floor(this.offsetWidth / (parseInt(this.columnWidth) + this.gap)))
            : this.columns;
        // Create columns
        const columnItems = Array.from({ length: numColumns }, () => []);
        items.forEach((item, index) => {
            const column = this.itemColumns[index] ?? index % numColumns;
            if (columnItems[column]) {
                columnItems[column].push(item);
            }
        });
        // CSS Grid approach
        const gridStyle = `
      display: grid;
      grid-template-columns: repeat(${numColumns}, 1fr);
      gap: ${this.gap}px;
      --masonry-gap: ${this.gap}px;
    `;
        return html `
      <div class="mx-masonry" style=${gridStyle}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
    }
};
MXMasonry.styles = css `
    :host {
      display: block;
      width: 100%;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-masonry {
      position: relative;
      width: 100%;
    }

    .mx-masonry-column {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    ::slotted(*) {
      break-inside: avoid;
      margin-bottom: var(--masonry-gap, 16px);
    }
  `;
__decorate([
    property({ type: Number })
], MXMasonry.prototype, "columns", void 0);
__decorate([
    property({ type: Number })
], MXMasonry.prototype, "gap", void 0);
__decorate([
    property({ type: String, attribute: 'column-width' })
], MXMasonry.prototype, "columnWidth", void 0);
__decorate([
    state()
], MXMasonry.prototype, "columnHeights", void 0);
__decorate([
    state()
], MXMasonry.prototype, "itemColumns", void 0);
__decorate([
    query('slot')
], MXMasonry.prototype, "defaultSlot", void 0);
MXMasonry = __decorate([
    customElement('mx-masonry')
], MXMasonry);
export { MXMasonry };
//# sourceMappingURL=mx-masonry.js.map