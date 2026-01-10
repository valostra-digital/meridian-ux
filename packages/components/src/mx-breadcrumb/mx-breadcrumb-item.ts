import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Breadcrumb Item component
 * 
 * @element mx-breadcrumb-item
 * 
 * @slot - Link text content
 * @slot separator - Custom separator icon/content
 * 
 * @fires click - Dispatched when the item is clicked
 */
@customElement('mx-breadcrumb-item')
export class MXBreadcrumbItem extends LitElement {
  static styles = css`
    :host {
      display: contents;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-breadcrumb-item {
      display: inline-flex;
      align-items: center;
    }

    .mx-breadcrumb-link {
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      text-decoration: none;
      transition: color 0.2s;
      cursor: pointer;
    }

    .mx-breadcrumb-link:hover {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
    }

    .mx-breadcrumb-link.mx-breadcrumb-link-disabled {
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
      cursor: not-allowed;
      pointer-events: none;
    }

    .mx-breadcrumb-link.mx-breadcrumb-link-active {
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      cursor: default;
    }

    a.mx-breadcrumb-link:hover {
      color: var(--mx-color-primary, #1677ff);
    }

    .mx-breadcrumb-separator {
      margin: 0 8px;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
    }

    :host(:last-child) .mx-breadcrumb-separator {
      display: none;
    }
  `;

  /**
   * Link href
   */
  @property({ type: String })
  href?: string;

  /**
   * Link target
   */
  @property({ type: String })
  target?: string;

  /**
   * Separator character or element
   */
  @property({ type: String })
  separator = '/';

  /**
   * Whether the item is disabled
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Whether this is the active/current item
   */
  @property({ type: Boolean })
  active = false;

  @state()
  private hasCustomSeparator = false;

  private handleClick(e: MouseEvent): void {
    if (this.disabled || this.active) {
      e.preventDefault();
      return;
    }

    this.dispatchEvent(new CustomEvent('click', {
      detail: { href: this.href },
      bubbles: true,
      composed: true,
    }));
  }

  private handleSeparatorSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    this.hasCustomSeparator = slot.assignedNodes().length > 0;
  }

  render() {
    const linkClasses = {
      'mx-breadcrumb-link': true,
      'mx-breadcrumb-link-disabled': this.disabled,
      'mx-breadcrumb-link-active': this.active,
    };

    const content = html`<slot></slot>`;

    const link = this.href && !this.disabled && !this.active
      ? html`
          <a
            class=${classMap(linkClasses)}
            href=${this.href}
            target=${this.target || '_self'}
            @click=${this.handleClick}
          >
            ${content}
          </a>
        `
      : html`
          <span class=${classMap(linkClasses)}>
            ${content}
          </span>
        `;

    return html`
      <li class="mx-breadcrumb-item">
        ${link}
        <span class="mx-breadcrumb-separator" aria-hidden="true">
          ${this.hasCustomSeparator
            ? html`<slot name="separator" @slotchange=${this.handleSeparatorSlotChange}></slot>`
            : this.separator
          }
        </span>
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mx-breadcrumb-item': MXBreadcrumbItem;
  }
}
