import { LitElement } from 'lit';
export type FormLayout = 'horizontal' | 'vertical' | 'inline';
export type FormLabelAlign = 'left' | 'right';
export interface FormRule {
    required?: boolean;
    message?: string;
    pattern?: RegExp;
    validator?: (value: any) => boolean | Promise<boolean>;
    min?: number;
    max?: number;
    type?: 'string' | 'number' | 'email' | 'url';
}
export interface FormField {
    name: string;
    value: any;
    rules?: FormRule[];
    error?: string;
}
/**
 * Form component - Form container with validation
 *
 * @element mx-form
 *
 * @fires submit - Dispatched when form is submitted
 * @fires values-change - Dispatched when form values change
 *
 * @slot - Form items (mx-form-item)
 */
export declare class MXForm extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Form layout
     */
    layout: FormLayout;
    /**
     * Label alignment
     */
    labelAlign: FormLabelAlign;
    /**
     * Label column span
     */
    labelCol?: number;
    /**
     * Wrapper column span
     */
    wrapperCol?: number;
    /**
     * Form name
     */
    name?: string;
    /**
     * Initial values
     */
    initialValues: Record<string, any>;
    /**
     * Whether to preserve fields on unmount
     */
    preserve: boolean;
    private fields;
    private touched;
    connectedCallback(): void;
    private initializeFields;
    /**
     * Register a form field
     */
    registerField(name: string, value: any, rules?: FormRule[]): void;
    /**
     * Unregister a form field
     */
    unregisterField(name: string): void;
    /**
     * Set field value
     */
    setFieldValue(name: string, value: any): void;
    /**
     * Get field value
     */
    getFieldValue(name: string): any;
    /**
     * Get all field values
     */
    getFieldsValue(names?: string[]): Record<string, any>;
    /**
     * Set fields value
     */
    setFieldsValue(values: Record<string, any>): void;
    /**
     * Validate field
     */
    validateField(name: string): Promise<boolean>;
    /**
     * Validate all fields
     */
    validateFields(names?: string[]): Promise<{
        valid: boolean;
        errors: Record<string, string>;
    }>;
    /**
     * Reset fields
     */
    resetFields(names?: string[]): void;
    /**
     * Submit form
     */
    submit(): Promise<void>;
    /**
     * Get field error
     */
    getFieldError(name: string): string | undefined;
    /**
     * Check if field is touched
     */
    isFieldTouched(name: string): boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mx-form': MXForm;
    }
}
//# sourceMappingURL=mx-form.d.ts.map