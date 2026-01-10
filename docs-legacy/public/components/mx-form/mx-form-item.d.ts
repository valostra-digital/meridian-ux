import { LitElement } from 'lit';
import type { FormRule } from './mx-form.js';
export type ValidateStatus = '' | 'success' | 'warning' | 'error' | 'validating';
/**
 * Form Item component - Form field wrapper with label and validation
 *
 * @element mx-form-item
 *
 * @slot - Form control element
 */
export declare class MXFormItem extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Field name
     */
    name: string;
    /**
     * Label text
     */
    label?: string;
    /**
     * Validation rules
     */
    rules?: FormRule[];
    /**
     * Extra help text
     */
    extra?: string;
    /**
     * Tooltip for label
     */
    tooltip?: string;
    /**
     * Whether field is required
     */
    required: boolean;
    /**
     * Validation status
     */
    validateStatus: ValidateStatus;
    /**
     * Help text
     */
    help?: string;
    /**
     * Whether to show feedback icon
     */
    hasFeedback: boolean;
    private form?;
    private errorMessage;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private findForm;
    private handleSlotChange;
    private validateField;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-form-item': MXFormItem;
    }
}
//# sourceMappingURL=mx-form-item.d.ts.map