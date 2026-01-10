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
 * Mention component for @ mentions in text input.
 *
 * @element mx-mention
 *
 * @attr {string} value - Current textarea value
 * @attr {string} placeholder - Placeholder text
 * @attr {string} prefix - Trigger character (default @)
 * @attr {string} options - JSON string of mention options
 * @attr {number} rows - Number of rows for textarea
 * @attr {boolean} disabled - Whether the input is disabled
 *
 * @fires change - Fired when value changes
 * @fires select - Fired when mention is selected
 * @fires search - Fired when searching for mentions
 *
 * @example
 * ```html
 * <mx-mention
 *   placeholder="Type @ to mention"
 *   options='[{"value":"user1","label":"John Doe"}]'
 * ></mx-mention>
 * ```
 */
let MXMention = class MXMention extends LitElement {
    constructor() {
        super(...arguments);
        this.value = '';
        this.placeholder = '';
        this.prefix = '@';
        this.options = '[]';
        this.rows = 4;
        this.disabled = false;
        this.parsedOptions = [];
        this.filteredOptions = [];
        this.showDropdown = false;
        this.dropdownPosition = { top: 0, left: 0 };
        this.activeIndex = 0;
        this.mentionSearch = '';
    }
    updated(changedProperties) {
        if (changedProperties.has('options')) {
            try {
                this.parsedOptions = JSON.parse(this.options);
            }
            catch (e) {
                console.error('Invalid options JSON:', e);
                this.parsedOptions = [];
            }
        }
    }
    handleInput(e) {
        const textarea = e.target;
        this.value = textarea.value;
        this.checkForMention(textarea);
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }
    checkForMention(textarea) {
        const cursorPos = textarea.selectionStart;
        const textBeforeCursor = this.value.substring(0, cursorPos);
        const lastAtIndex = textBeforeCursor.lastIndexOf(this.prefix);
        if (lastAtIndex !== -1) {
            const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1);
            // Check if there's a space after @, which would close the mention
            if (!textAfterAt.includes(' ')) {
                this.mentionSearch = textAfterAt;
                this.filterOptions();
                this.showDropdown = true;
                this.updateDropdownPosition(textarea);
                this.dispatchEvent(new CustomEvent('search', {
                    detail: { value: this.mentionSearch, prefix: this.prefix },
                    bubbles: true,
                    composed: true
                }));
                return;
            }
        }
        this.showDropdown = false;
    }
    filterOptions() {
        if (!this.mentionSearch) {
            this.filteredOptions = this.parsedOptions;
        }
        else {
            const lowerSearch = this.mentionSearch.toLowerCase();
            this.filteredOptions = this.parsedOptions.filter(option => option.value.toLowerCase().includes(lowerSearch) ||
                (option.label && option.label.toLowerCase().includes(lowerSearch)));
        }
        this.activeIndex = 0;
    }
    updateDropdownPosition(textarea) {
        const rect = textarea.getBoundingClientRect();
        this.dropdownPosition = {
            top: rect.bottom + 4,
            left: rect.left
        };
    }
    handleOptionClick(option) {
        this.insertMention(option);
    }
    insertMention(option) {
        const textarea = this.shadowRoot?.querySelector('textarea');
        if (!textarea)
            return;
        const cursorPos = textarea.selectionStart;
        const textBeforeCursor = this.value.substring(0, cursorPos);
        const textAfterCursor = this.value.substring(cursorPos);
        const lastAtIndex = textBeforeCursor.lastIndexOf(this.prefix);
        if (lastAtIndex !== -1) {
            const beforeMention = this.value.substring(0, lastAtIndex);
            const mention = `${this.prefix}${option.value} `;
            this.value = beforeMention + mention + textAfterCursor;
            this.showDropdown = false;
            this.dispatchEvent(new CustomEvent('select', {
                detail: { value: option.value, option },
                bubbles: true,
                composed: true
            }));
            // Update cursor position
            setTimeout(() => {
                const newPos = beforeMention.length + mention.length;
                textarea.setSelectionRange(newPos, newPos);
                textarea.focus();
            }, 0);
        }
    }
    render() {
        const dropdownClasses = {
            'mx-mention-dropdown': true,
            'mx-mention-dropdown-open': this.showDropdown
        };
        const dropdownStyle = `
      top: ${this.dropdownPosition.top}px;
      left: ${this.dropdownPosition.left}px;
    `;
        return html `
      <div class="mx-mention">
        <textarea
          class="mx-mention-textarea"
          .value=${this.value}
          placeholder=${this.placeholder}
          rows=${this.rows}
          ?disabled=${this.disabled}
          @input=${this.handleInput}
        ></textarea>

        <div class=${classMap(dropdownClasses)} style=${dropdownStyle}>
          ${this.filteredOptions.length > 0 ? html `
            ${this.filteredOptions.map((option, index) => {
            const optionClasses = {
                'mx-mention-option': true,
                'mx-mention-option-active': index === this.activeIndex
            };
            return html `
                <div
                  class=${classMap(optionClasses)}
                  @click=${() => this.handleOptionClick(option)}
                >
                  ${option.label || option.value}
                </div>
              `;
        })}
          ` : html `
            <div class="mx-mention-empty">No matches found</div>
          `}
        </div>
      </div>
    `;
    }
};
MXMention.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      position: relative;
    }

    .mx-mention {
      position: relative;
      width: 100%;
    }

    .mx-mention-textarea {
      width: 100%;
      padding: 4px 11px;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      line-height: 1.5715;
      background-color: var(--mx-color-bg-container, #ffffff);
      border: 1px solid var(--mx-color-border, #d9d9d9);
      border-radius: var(--mx-border-radius, 6px);
      transition: all 0.2s;
      resize: vertical;
      font-family: inherit;
      box-sizing: border-box;
    }

    .mx-mention-textarea:hover {
      border-color: var(--mx-color-primary-hover, #4096ff);
    }

    .mx-mention-textarea:focus {
      border-color: var(--mx-color-primary, #1677ff);
      outline: none;
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    }

    .mx-mention-textarea:disabled {
      color: var(--mx-color-text-disabled, rgba(0, 0, 0, 0.25));
      background-color: var(--mx-color-bg-container-disabled, rgba(0, 0, 0, 0.04));
      cursor: not-allowed;
    }

    .mx-mention-textarea::placeholder {
      color: var(--mx-color-text-placeholder, rgba(0, 0, 0, 0.25));
    }

    .mx-mention-dropdown {
      position: absolute;
      background: var(--mx-color-bg-elevated, #ffffff);
      border-radius: var(--mx-border-radius, 6px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
      z-index: 1050;
      max-height: 200px;
      overflow-y: auto;
      display: none;
      min-width: 200px;
    }

    .mx-mention-dropdown-open {
      display: block;
    }

    .mx-mention-option {
      padding: 5px 12px;
      cursor: pointer;
      transition: background 0.3s;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
    }

    .mx-mention-option:hover {
      background: var(--mx-color-fill-secondary, rgba(0, 0, 0, 0.06));
    }

    .mx-mention-option-active {
      background: var(--mx-color-fill-content, rgba(0, 0, 0, 0.06));
    }

    .mx-mention-empty {
      padding: 5px 12px;
      color: var(--mx-color-text-secondary, rgba(0, 0, 0, 0.45));
      text-align: center;
    }
  `;
__decorate([
    property({ type: String })
], MXMention.prototype, "value", void 0);
__decorate([
    property({ type: String })
], MXMention.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], MXMention.prototype, "prefix", void 0);
__decorate([
    property({ type: String })
], MXMention.prototype, "options", void 0);
__decorate([
    property({ type: Number })
], MXMention.prototype, "rows", void 0);
__decorate([
    property({ type: Boolean })
], MXMention.prototype, "disabled", void 0);
__decorate([
    state()
], MXMention.prototype, "parsedOptions", void 0);
__decorate([
    state()
], MXMention.prototype, "filteredOptions", void 0);
__decorate([
    state()
], MXMention.prototype, "showDropdown", void 0);
__decorate([
    state()
], MXMention.prototype, "dropdownPosition", void 0);
__decorate([
    state()
], MXMention.prototype, "activeIndex", void 0);
__decorate([
    state()
], MXMention.prototype, "mentionSearch", void 0);
MXMention = __decorate([
    customElement('mx-mention')
], MXMention);
export { MXMention };
//# sourceMappingURL=mx-mention.js.map