import { LitElement } from 'lit';
export type TagColor = 'default' | 'primary' | 'success' | 'processing' | 'error' | 'warning' | 'magenta' | 'red' | 'volcano' | 'orange' | 'gold' | 'lime' | 'green' | 'cyan' | 'blue' | 'geekblue' | 'purple';
/**
 * Tag component for categorization or markup.
 *
 * @element mx-tag
 *
 * @attr {TagColor} color - Predefined color or custom hex color
 * @attr {boolean} closable - Whether tag can be closed
 * @attr {string} close-icon - Custom close icon
 * @attr {boolean} bordered - Whether tag has border
 * @attr {string} icon - Icon to display before text
 *
 * @slot - Tag content
 * @slot icon - Custom icon content
 * @slot close-icon - Custom close icon content
 *
 * @fires close - Dispatched when tag is closed
 *
 * @example
 * ```html
 * <!-- Basic tag -->
 * <mx-tag>Tag</mx-tag>
 *
 * <!-- Colored tags -->
 * <mx-tag color="success">Success</mx-tag>
 * <mx-tag color="error">Error</mx-tag>
 *
 * <!-- Closable -->
 * <mx-tag closable>Closable</mx-tag>
 *
 * <!-- Custom color -->
 * <mx-tag color="#87d068">Custom</mx-tag>
 *
 * <!-- Borderless -->
 * <mx-tag color="processing" bordered="false">Processing</mx-tag>
 * ```
 */
export declare class MXTag extends LitElement {
    static styles: import("lit").CSSResult;
    color: TagColor | string;
    closable: boolean;
    closeIcon: string;
    bordered: boolean;
    icon: string;
    private visible;
    private closing;
    private handleClose;
    private isPresetColor;
    render(): import("lit-html").TemplateResult<1> | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-tag': MXTag;
    }
}
//# sourceMappingURL=mx-tag.d.ts.map