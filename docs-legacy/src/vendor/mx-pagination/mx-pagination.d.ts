import { LitElement } from 'lit';
export type PaginationSize = 'default' | 'small';
export type PaginationAlign = 'start' | 'center' | 'end';
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
export declare class MXPagination extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Current page number
     */
    current: number;
    /**
     * Total number of items
     */
    total: number;
    /**
     * Number of items per page
     */
    pageSize: number;
    /**
     * Size of pagination
     */
    size: PaginationSize;
    /**
     * Alignment of pagination
     */
    align: PaginationAlign;
    /**
     * Whether to disable pagination
     */
    disabled: boolean;
    /**
     * Hide pagination on single page
     */
    hideOnSinglePage: boolean;
    /**
     * Show quick jumper
     */
    showQuickJumper: boolean;
    /**
     * Show page size changer
     */
    showSizeChanger: boolean;
    /**
     * Show total text
     */
    showTotal: boolean;
    /**
     * Simple mode
     */
    simple: boolean;
    /**
     * Number of page items to show
     */
    showLessItems: boolean;
    private jumpValue;
    private get totalPages();
    private handlePageClick;
    private handlePrev;
    private handleNext;
    private handleJumpPrev;
    private handleJumpNext;
    private getPageNumbers;
    private renderPageItem;
    private renderSimple;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-pagination': MXPagination;
    }
}
//# sourceMappingURL=mx-pagination.d.ts.map