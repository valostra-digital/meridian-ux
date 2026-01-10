var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
/**
 * Pagination component - Navigate through pages of content
 *
 * @element mx-pagination
 *
 * @fires change - Dispatched when page or pageSize changes
 * @fires show-size-change - Dispatched when pageSize changes
 *
 * @cssprop --mx-pagination-item-bg - Background color of pagination items
 */
let MXPagination = class MXPagination extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Current page number
         */
        this.current = 1;
        /**
         * Total number of items
         */
        this.total = 0;
        /**
         * Number of items per page
         */
        this.pageSize = 10;
        /**
         * Size of pagination
         */
        this.size = 'default';
        /**
         * Alignment of pagination
         */
        this.align = 'start';
        /**
         * Whether to disable pagination
         */
        this.disabled = false;
        /**
         * Hide pagination on single page
         */
        this.hideOnSinglePage = false;
        /**
         * Show quick jumper
         */
        this.showQuickJumper = false;
        /**
         * Show page size changer
         */
        this.showSizeChanger = false;
        /**
         * Show total text
         */
        this.showTotal = false;
        /**
         * Simple mode
         */
        this.simple = false;
        /**
         * Number of page items to show
         */
        this.showLessItems = false;
        this.jumpValue = '';
    }
    get totalPages() {
        return Math.ceil(this.total / this.pageSize);
    }
    handlePageClick(page) {
        if (page === this.current || page < 1 || page > this.totalPages || this.disabled) {
            return;
        }
        this.current = page;
        this.dispatchEvent(new CustomEvent('change', {
            detail: { current: this.current, pageSize: this.pageSize },
            bubbles: true,
            composed: true,
        }));
    }
    handlePrev() {
        if (this.current > 1) {
            this.handlePageClick(this.current - 1);
        }
    }
    handleNext() {
        if (this.current < this.totalPages) {
            this.handlePageClick(this.current + 1);
        }
    }
    handleJumpPrev() {
        const jump = this.showLessItems ? 3 : 5;
        this.handlePageClick(Math.max(1, this.current - jump));
    }
    handleJumpNext() {
        const jump = this.showLessItems ? 3 : 5;
        this.handlePageClick(Math.min(this.totalPages, this.current + jump));
    }
    getPageNumbers() {
        const { current, totalPages } = this;
        const pageBufferSize = this.showLessItems ? 1 : 2;
        if (totalPages <= 5 + pageBufferSize * 2) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const pages = [];
        // Always show first page
        pages.push(1);
        // Left ellipsis
        if (current > pageBufferSize + 2) {
            pages.push('prev-ellipsis');
        }
        // Middle pages
        const start = Math.max(2, current - pageBufferSize);
        const end = Math.min(totalPages - 1, current + pageBufferSize);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        // Right ellipsis
        if (current < totalPages - pageBufferSize - 1) {
            pages.push('next-ellipsis');
        }
        // Always show last page
        if (totalPages > 1) {
            pages.push(totalPages);
        }
        return pages;
    }
    renderPageItem(page) {
        if (page === 'prev-ellipsis') {
            return html `
        <li class="mx-pagination-jump-prev" @click=${this.handleJumpPrev}>
          <span>•••</span>
        </li>
      `;
        }
        if (page === 'next-ellipsis') {
            return html `
        <li class="mx-pagination-jump-next" @click=${this.handleJumpNext}>
          <span>•••</span>
        </li>
      `;
        }
        const isActive = page === this.current;
        const classes = {
            'mx-pagination-item': true,
            'mx-pagination-item-active': isActive,
            'mx-pagination-item-disabled': this.disabled,
        };
        return html `
      <li
        class=${classMap(classes)}
        @click=${() => this.handlePageClick(page)}
      >
        ${page}
      </li>
    `;
    }
    renderSimple() {
        return html `
      <li
        class="mx-pagination-prev ${this.current === 1 || this.disabled ? 'mx-pagination-disabled' : ''}"
        @click=${this.handlePrev}
      >
        <span>‹</span>
      </li>
      <li class="mx-pagination-simple-pager">
        <input
          type="text"
          .value=${String(this.current)}
          @keydown=${(e) => {
            if (e.key === 'Enter') {
                const value = parseInt(e.target.value);
                if (value >= 1 && value <= this.totalPages) {
                    this.handlePageClick(value);
                }
            }
        }}
        />
        <span class="mx-pagination-slash">/</span>
        <span>${this.totalPages}</span>
      </li>
      <li
        class="mx-pagination-next ${this.current === this.totalPages || this.disabled ? 'mx-pagination-disabled' : ''}"
        @click=${this.handleNext}
      >
        <span>›</span>
      </li>
    `;
    }
    render() {
        if (this.hideOnSinglePage && this.totalPages <= 1) {
            return html ``;
        }
        const classes = {
            'mx-pagination': true,
            'mx-pagination-simple': this.simple,
            'mx-pagination-small': this.size === 'small',
            [`mx-pagination-align-${this.align}`]: true,
        };
        if (this.simple) {
            return html `
        <ul class=${classMap(classes)}>
          ${this.renderSimple()}
        </ul>
      `;
        }
        const pages = this.getPageNumbers();
        return html `
      <ul class=${classMap(classes)}>
        ${this.showTotal ? html `
          <li class="mx-pagination-total-text">
            Total ${this.total} items
          </li>
        ` : ''}
        
        <li
          class="mx-pagination-prev ${this.current === 1 || this.disabled ? 'mx-pagination-disabled' : ''}"
          @click=${this.handlePrev}
        >
          <span>‹</span>
        </li>

        ${pages.map(page => this.renderPageItem(page))}

        <li
          class="mx-pagination-next ${this.current === this.totalPages || this.disabled ? 'mx-pagination-disabled' : ''}"
          @click=${this.handleNext}
        >
          <span>›</span>
        </li>
      </ul>
    `;
    }
};
MXPagination.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-pagination {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      line-height: var(--mx-line-height, 1.5714285714285714);
      list-style: none;
      font-family: inherit;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .mx-pagination-align-start {
      justify-content: flex-start;
    }

    .mx-pagination-align-center {
      justify-content: center;
    }

    .mx-pagination-align-end {
      justify-content: flex-end;
    }

    .mx-pagination-item,
    .mx-pagination-prev,
    .mx-pagination-next,
    .mx-pagination-jump-prev,
    .mx-pagination-jump-next {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 32px;
      height: 32px;
      padding: 0 6px;
      line-height: 30px;
      text-align: center;
      background-color: var(--mx-pagination-item-bg, #ffffff);
      border: 1px solid var(--mx-color-border, #d9d9d9);
      border-radius: var(--mx-border-radius, 6px);
      outline: none;
      cursor: pointer;
      user-select: none;
      transition: all 0.2s;
      font-variant-numeric: tabular-nums;
    }

    .mx-pagination-small .mx-pagination-item,
    .mx-pagination-small .mx-pagination-prev,
    .mx-pagination-small .mx-pagination-next {
      min-width: 24px;
      height: 24px;
      line-height: 22px;
      font-size: 12px;
    }

    .mx-pagination-item:hover,
    .mx-pagination-prev:hover,
    .mx-pagination-next:hover {
      border-color: var(--mx-color-primary, #1677ff);
      color: var(--mx-color-primary, #1677ff);
    }

    .mx-pagination-item-active {
      background-color: var(--mx-color-primary, #1677ff);
      border-color: var(--mx-color-primary, #1677ff);
      color: #ffffff;
      font-weight: 500;
    }

    .mx-pagination-item-active:hover {
      background-color: var(--mx-color-primary-hover, #4096ff);
      border-color: var(--mx-color-primary-hover, #4096ff);
      color: #ffffff;
    }

    .mx-pagination-disabled,
    .mx-pagination-item-disabled {
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
      border-color: var(--mx-color-border, #d9d9d9);
      cursor: not-allowed;
    }

    .mx-pagination-disabled:hover,
    .mx-pagination-item-disabled:hover {
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
      border-color: var(--mx-color-border, #d9d9d9);
    }

    .mx-pagination-jump-prev,
    .mx-pagination-jump-next {
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
    }

    .mx-pagination-options {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .mx-pagination-total-text {
      display: inline-block;
      height: 32px;
      line-height: 32px;
      margin-right: 8px;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
    }

    .mx-pagination-simple .mx-pagination-prev,
    .mx-pagination-simple .mx-pagination-next {
      height: 24px;
      line-height: 22px;
    }

    .mx-pagination-simple .mx-pagination-simple-pager {
      display: inline-flex;
      align-items: center;
      height: 24px;
      margin: 0 8px;
    }

    .mx-pagination-simple .mx-pagination-simple-pager input {
      box-sizing: border-box;
      width: 40px;
      height: 24px;
      margin: 0 4px;
      padding: 0 6px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid var(--mx-color-border, #d9d9d9);
      border-radius: var(--mx-border-radius-sm, 4px);
      outline: none;
      transition: border-color 0.2s;
    }

    .mx-pagination-simple .mx-pagination-simple-pager input:hover {
      border-color: var(--mx-color-primary, #1677ff);
    }

    .mx-pagination-simple .mx-pagination-simple-pager input:focus {
      border-color: var(--mx-color-primary, #1677ff);
      box-shadow: 0 0 0 2px var(--mx-color-primary-bg, #e6f4ff);
    }
  `;
__decorate([
    property({ type: Number })
], MXPagination.prototype, "current", void 0);
__decorate([
    property({ type: Number })
], MXPagination.prototype, "total", void 0);
__decorate([
    property({ type: Number, attribute: 'page-size' })
], MXPagination.prototype, "pageSize", void 0);
__decorate([
    property({ type: String })
], MXPagination.prototype, "size", void 0);
__decorate([
    property({ type: String })
], MXPagination.prototype, "align", void 0);
__decorate([
    property({ type: Boolean })
], MXPagination.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, attribute: 'hide-on-single-page' })
], MXPagination.prototype, "hideOnSinglePage", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-quick-jumper' })
], MXPagination.prototype, "showQuickJumper", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-size-changer' })
], MXPagination.prototype, "showSizeChanger", void 0);
__decorate([
    property({ type: Boolean, attribute: 'show-total' })
], MXPagination.prototype, "showTotal", void 0);
__decorate([
    property({ type: Boolean })
], MXPagination.prototype, "simple", void 0);
__decorate([
    property({ type: Number, attribute: 'show-less-items' })
], MXPagination.prototype, "showLessItems", void 0);
__decorate([
    state()
], MXPagination.prototype, "jumpValue", void 0);
MXPagination = __decorate([
    customElement('mx-pagination')
], MXPagination);
export { MXPagination };
//# sourceMappingURL=mx-pagination.js.map