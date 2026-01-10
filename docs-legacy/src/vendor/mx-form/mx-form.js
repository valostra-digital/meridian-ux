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
 * Form component - Form container with validation
 *
 * @element mx-form
 *
 * @fires submit - Dispatched when form is submitted
 * @fires values-change - Dispatched when form values change
 *
 * @slot - Form items (mx-form-item)
 */
let MXForm = class MXForm extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Form layout
         */
        this.layout = 'horizontal';
        /**
         * Label alignment
         */
        this.labelAlign = 'right';
        /**
         * Initial values
         */
        this.initialValues = {};
        /**
         * Whether to preserve fields on unmount
         */
        this.preserve = true;
        this.fields = new Map();
        this.touched = new Set();
    }
    connectedCallback() {
        super.connectedCallback();
        this.initializeFields();
    }
    initializeFields() {
        Object.entries(this.initialValues).forEach(([name, value]) => {
            this.fields.set(name, { name, value, rules: [] });
        });
    }
    /**
     * Register a form field
     */
    registerField(name, value, rules) {
        if (!this.fields.has(name)) {
            this.fields.set(name, { name, value, rules: rules || [] });
        }
    }
    /**
     * Unregister a form field
     */
    unregisterField(name) {
        if (!this.preserve) {
            this.fields.delete(name);
        }
    }
    /**
     * Set field value
     */
    setFieldValue(name, value) {
        const field = this.fields.get(name);
        if (field) {
            field.value = value;
            field.error = undefined;
            this.touched.add(name);
            this.requestUpdate();
            this.dispatchEvent(new CustomEvent('values-change', {
                detail: { values: this.getFieldsValue(), changedValues: { [name]: value } },
                bubbles: true,
                composed: true,
            }));
        }
    }
    /**
     * Get field value
     */
    getFieldValue(name) {
        return this.fields.get(name)?.value;
    }
    /**
     * Get all field values
     */
    getFieldsValue(names) {
        const values = {};
        const fieldNames = names || Array.from(this.fields.keys());
        fieldNames.forEach(name => {
            const field = this.fields.get(name);
            if (field) {
                values[name] = field.value;
            }
        });
        return values;
    }
    /**
     * Set fields value
     */
    setFieldsValue(values) {
        Object.entries(values).forEach(([name, value]) => {
            this.setFieldValue(name, value);
        });
    }
    /**
     * Validate field
     */
    async validateField(name) {
        const field = this.fields.get(name);
        if (!field || !field.rules)
            return true;
        for (const rule of field.rules) {
            // Required validation
            if (rule.required && (field.value === undefined || field.value === '' || field.value === null)) {
                field.error = rule.message || `${name} is required`;
                this.requestUpdate();
                return false;
            }
            // Pattern validation
            if (rule.pattern && !rule.pattern.test(String(field.value))) {
                field.error = rule.message || `${name} format is invalid`;
                this.requestUpdate();
                return false;
            }
            // Type validation
            if (rule.type) {
                const value = field.value;
                switch (rule.type) {
                    case 'email':
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                            field.error = rule.message || 'Please enter a valid email';
                            this.requestUpdate();
                            return false;
                        }
                        break;
                    case 'url':
                        try {
                            new URL(value);
                        }
                        catch {
                            field.error = rule.message || 'Please enter a valid URL';
                            this.requestUpdate();
                            return false;
                        }
                        break;
                    case 'number':
                        if (isNaN(Number(value))) {
                            field.error = rule.message || 'Please enter a valid number';
                            this.requestUpdate();
                            return false;
                        }
                        break;
                }
            }
            // Min/Max validation
            if (rule.min !== undefined && field.value.length < rule.min) {
                field.error = rule.message || `Minimum length is ${rule.min}`;
                this.requestUpdate();
                return false;
            }
            if (rule.max !== undefined && field.value.length > rule.max) {
                field.error = rule.message || `Maximum length is ${rule.max}`;
                this.requestUpdate();
                return false;
            }
            // Custom validator
            if (rule.validator) {
                const result = await rule.validator(field.value);
                if (!result) {
                    field.error = rule.message || 'Validation failed';
                    this.requestUpdate();
                    return false;
                }
            }
        }
        field.error = undefined;
        this.requestUpdate();
        return true;
    }
    /**
     * Validate all fields
     */
    async validateFields(names) {
        const fieldNames = names || Array.from(this.fields.keys());
        const errors = {};
        let valid = true;
        for (const name of fieldNames) {
            const isValid = await this.validateField(name);
            if (!isValid) {
                valid = false;
                const field = this.fields.get(name);
                if (field?.error) {
                    errors[name] = field.error;
                }
            }
        }
        return { valid, errors };
    }
    /**
     * Reset fields
     */
    resetFields(names) {
        const fieldNames = names || Array.from(this.fields.keys());
        fieldNames.forEach(name => {
            const field = this.fields.get(name);
            if (field) {
                field.value = this.initialValues[name];
                field.error = undefined;
                this.touched.delete(name);
            }
        });
        this.requestUpdate();
    }
    /**
     * Submit form
     */
    async submit() {
        const { valid, errors } = await this.validateFields();
        if (valid) {
            const values = this.getFieldsValue();
            this.dispatchEvent(new CustomEvent('submit', {
                detail: { values },
                bubbles: true,
                composed: true,
            }));
        }
        else {
            this.dispatchEvent(new CustomEvent('submit-failed', {
                detail: { errors },
                bubbles: true,
                composed: true,
            }));
        }
    }
    /**
     * Get field error
     */
    getFieldError(name) {
        return this.fields.get(name)?.error;
    }
    /**
     * Check if field is touched
     */
    isFieldTouched(name) {
        return this.touched.has(name);
    }
    render() {
        const classes = {
            'mx-form': true,
            [`mx-form-${this.layout}`]: true,
        };
        return html `
      <form
        class=${classMap(classes)}
        @submit=${(e) => {
            e.preventDefault();
            this.submit();
        }}
      >
        <slot></slot>
      </form>
    `;
    }
};
MXForm.styles = css `
    :host {
      display: block;
      font-family: var(--mx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
    }

    .mx-form {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: var(--mx-color-text, rgba(0, 0, 0, 0.88));
      font-size: var(--mx-font-size, 14px);
      line-height: var(--mx-line-height, 1.5714285714285714);
      list-style: none;
      font-family: inherit;
    }

    .mx-form-horizontal {
      /* Horizontal layout styles */
    }

    .mx-form-vertical {
      /* Vertical layout styles */
    }

    .mx-form-inline {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }
  `;
__decorate([
    property({ type: String })
], MXForm.prototype, "layout", void 0);
__decorate([
    property({ type: String, attribute: 'label-align' })
], MXForm.prototype, "labelAlign", void 0);
__decorate([
    property({ type: Number, attribute: 'label-col' })
], MXForm.prototype, "labelCol", void 0);
__decorate([
    property({ type: Number, attribute: 'wrapper-col' })
], MXForm.prototype, "wrapperCol", void 0);
__decorate([
    property({ type: String })
], MXForm.prototype, "name", void 0);
__decorate([
    property({ type: Object, attribute: 'initial-values' })
], MXForm.prototype, "initialValues", void 0);
__decorate([
    property({ type: Boolean })
], MXForm.prototype, "preserve", void 0);
__decorate([
    state()
], MXForm.prototype, "fields", void 0);
__decorate([
    state()
], MXForm.prototype, "touched", void 0);
MXForm = __decorate([
    customElement('mx-form')
], MXForm);
export { MXForm };
//# sourceMappingURL=mx-form.js.map