import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

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
@customElement('mx-typography')
export class MXTypography extends LitElement {
  static styles = css`
    :host {
      display: block;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
      line-height: var(--mx-line-height, 1.5715);
      word-wrap: break-word;
    }

    :host([variant="text"]) {
      display: inline;
    }

    .mx-typography {
      margin: 0;
    }

    /* Title variants */
    .mx-typography-h1,
    .mx-typography-h2,
    .mx-typography-h3,
    .mx-typography-h4,
    .mx-typography-h5 {
      margin-top: 0;
      margin-bottom: 0.5em;
      color: var(--mx-color-text-heading, rgba(0, 0, 0, 0.88));
      font-weight: 600;
    }

    .mx-typography-h1 {
      font-size: var(--mx-font-size-heading-1, 38px);
      line-height: var(--mx-line-height-heading-1, 1.21);
    }

    .mx-typography-h2 {
      font-size: var(--mx-font-size-heading-2, 30px);
      line-height: var(--mx-line-height-heading-2, 1.35);
    }

    .mx-typography-h3 {
      font-size: var(--mx-font-size-heading-3, 24px);
      line-height: var(--mx-line-height-heading-3, 1.35);
    }

    .mx-typography-h4 {
      font-size: var(--mx-font-size-heading-4, 20px);
      line-height: var(--mx-line-height-heading-4, 1.4);
    }

    .mx-typography-h5 {
      font-size: var(--mx-font-size-heading-5, 16px);
      line-height: var(--mx-line-height-heading-5, 1.5);
    }

    /* Paragraph */
    p.mx-typography {
      margin-bottom: 1em;
    }

    /* Semantic types */
    .mx-typography-secondary {
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.65));
    }

    .mx-typography-success {
      color: var(--mx-color-success, #52c41a);
    }

    .mx-typography-warning {
      color: var(--mx-color-warning, #faad14);
    }

    .mx-typography-danger {
      color: var(--mx-color-error, #ff4d4f);
    }

    /* Disabled state */
    .mx-typography-disabled {
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
      cursor: not-allowed;
      user-select: none;
    }

    /* Modifiers via attributes */
    :host([strong]) {
      font-weight: 600;
    }

    :host([italic]) {
      font-style: italic;
    }

    :host([underline]) {
      text-decoration: underline;
    }

    :host([delete]) {
      text-decoration: line-through;
    }

    /* Code styling */
    code {
      margin: 0 0.2em;
      padding: 0.2em 0.4em 0.1em;
      font-size: 85%;
      background: rgba(150, 150, 150, 0.1);
      border: 1px solid rgba(100, 100, 100, 0.2);
      border-radius: 3px;
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    }

    /* Mark styling */
    mark {
      padding: 0;
      background-color: #ffe58f;
    }

    /* Keyboard styling */
    kbd {
      margin: 0 0.2em;
      padding: 0.15em 0.4em 0.1em;
      font-size: 90%;
      background: rgba(150, 150, 150, 0.06);
      border: 1px solid rgba(100, 100, 100, 0.2);
      border-bottom-width: 2px;
      border-radius: 3px;
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    }
  `;

  /**
   * Component variant
   */
  @property({ type: String })
  variant: TypographyVariant = 'text';

  /**
   * Title level (only for variant="title")
   */
  @property({ type: Number })
  level: TitleLevel = 1;

  /**
   * Semantic type
   */
  @property({ type: String })
  type?: TypographyType;

  /**
   * Disabled state
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Highlighted text
   */
  @property({ type: Boolean })
  mark = false;

  /**
   * Code style
   */
  @property({ type: Boolean })
  code = false;

  /**
   * Keyboard shortcut style
   */
  @property({ type: Boolean })
  keyboard = false;

  /**
   * Underlined text
   */
  @property({ type: Boolean, reflect: true })
  underline = false;

  /**
   * Strikethrough text
   */
  @property({ type: Boolean, reflect: true })
  delete = false;

  /**
   * Bold text
   */
  @property({ type: Boolean, reflect: true })
  strong = false;

  /**
   * Italic text
   */
  @property({ type: Boolean, reflect: true })
  italic = false;

  render() {
    const classes = {
      'mx-typography': true,
      [`mx-typography-h${this.level}`]: this.variant === 'title',
      [`mx-typography-${this.type}`]: !!this.type,
      'mx-typography-disabled': this.disabled,
    };

    let content = html`<slot></slot>`;

    // Wrap content based on modifiers
    if (this.code) {
      content = html`<code>${content}</code>`;
    } else if (this.mark) {
      content = html`<mark>${content}</mark>`;
    } else if (this.keyboard) {
      content = html`<kbd>${content}</kbd>`;
    }

    // Render appropriate tag based on variant
    if (this.variant === 'title') {
      switch (this.level) {
        case 1:
          return html`<h1 class=${classMap(classes)}>${content}</h1>`;
        case 2:
          return html`<h2 class=${classMap(classes)}>${content}</h2>`;
        case 3:
          return html`<h3 class=${classMap(classes)}>${content}</h3>`;
        case 4:
          return html`<h4 class=${classMap(classes)}>${content}</h4>`;
        case 5:
          return html`<h5 class=${classMap(classes)}>${content}</h5>`;
        default:
          return html`<h1 class=${classMap(classes)}>${content}</h1>`;
      }
    }

    if (this.variant === 'paragraph') {
      return html`<p class=${classMap(classes)}>${content}</p>`;
    }

    // Default: text (span)
    return html`<span class=${classMap(classes)}>${content}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-typography': MXTypography;
  }
}
