import { LitElement } from 'lit';
export type TypographyVariant = 'title' | 'text' | 'paragraph';
export type TypographyType = 'secondary' | 'success' | 'warning' | 'danger';
export type TitleLevel = 1 | 2 | 3 | 4 | 5;
/**
 * Typography component for text and headings with semantic styling.
 *
 * @element mx-typography
 *
 * @attr {TypographyVariant} variant - Component variant: title, text, paragraph
 * @attr {TitleLevel} level - Title level (1-5, only for variant="title")
 * @attr {TypographyType} type - Semantic type: secondary, success, warning, danger
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} mark - Highlighted text
 * @attr {boolean} code - Code style
 * @attr {boolean} keyboard - Keyboard shortcut style
 * @attr {boolean} underline - Underlined text
 * @attr {boolean} delete - Strikethrough text
 * @attr {boolean} strong - Bold text
 * @attr {boolean} italic - Italic text
 *
 * @slot - Text content
 *
 * @example
 * ```html
 * <!-- Title variants -->
 * <mx-typography variant="title" level="1">H1 Title</mx-typography>
 * <mx-typography variant="title" level="2">H2 Title</mx-typography>
 *
 * <!-- Text with semantic types -->
 * <mx-typography type="secondary">Secondary text</mx-typography>
 * <mx-typography type="success">Success text</mx-typography>
 * <mx-typography type="warning">Warning text</mx-typography>
 * <mx-typography type="danger">Danger text</mx-typography>
 *
 * <!-- Modifiers -->
 * <mx-typography strong>Bold text</mx-typography>
 * <mx-typography italic>Italic text</mx-typography>
 * <mx-typography underline>Underlined text</mx-typography>
 * <mx-typography delete>Deleted text</mx-typography>
 * <mx-typography code>Code text</mx-typography>
 * <mx-typography mark>Marked text</mx-typography>
 * <mx-typography keyboard>Ctrl + C</mx-typography>
 *
 * <!-- Paragraph -->
 * <mx-typography variant="paragraph">
 *   This is a paragraph of text.
 * </mx-typography>
 * ```
 */
export declare class MXTypography extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Component variant
     */
    variant: TypographyVariant;
    /**
     * Title level (only for variant="title")
     */
    level: TitleLevel;
    /**
     * Semantic type
     */
    type?: TypographyType;
    /**
     * Disabled state
     */
    disabled: boolean;
    /**
     * Highlighted text
     */
    mark: boolean;
    /**
     * Code style
     */
    code: boolean;
    /**
     * Keyboard shortcut style
     */
    keyboard: boolean;
    /**
     * Underlined text
     */
    underline: boolean;
    /**
     * Strikethrough text
     */
    delete: boolean;
    /**
     * Bold text
     */
    strong: boolean;
    /**
     * Italic text
     */
    italic: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-typography': MXTypography;
    }
}
//# sourceMappingURL=mx-typography.d.ts.map