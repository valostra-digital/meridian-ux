// Interactive Playground for Component Props
class Playground {
  constructor(element) {
    this.container = element;
    this.component = null;
    this.controls = {};
    this.init();
  }

  init() {
    if (!this.container) return;

    this.preview = this.container.querySelector('.playground__preview');
    this.controlsContainer = this.container.querySelector('.playground__controls');
    
    if (!this.preview || !this.controlsContainer) return;

    this.setupControls();
  }

  setupControls() {
    const inputs = this.controlsContainer.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      const propName = input.dataset.prop;
      if (!propName) return;

      this.controls[propName] = input;

      // Listen for changes
      input.addEventListener('input', () => this.updateComponent());
      input.addEventListener('change', () => this.updateComponent());
    });

    // Initial render
    this.updateComponent();
  }

  updateComponent() {
    // Get the component element in preview
    this.component = this.preview.querySelector('[class^="mx-"], [class*=" mx-"]');
    if (!this.component) return;

    // Update each property
    Object.entries(this.controls).forEach(([propName, input]) => {
      const value = this.getInputValue(input);
      this.setComponentProp(propName, value, input.type);
    });
  }

  getInputValue(input) {
    switch (input.type) {
      case 'checkbox':
        return input.checked;
      case 'number':
      case 'range':
        return parseFloat(input.value);
      default:
        return input.value;
    }
  }

  setComponentProp(propName, value, inputType) {
    if (!this.component) return;

    // Handle different property types
    if (inputType === 'checkbox') {
      // Boolean attributes
      if (value) {
        this.component.setAttribute(propName, '');
      } else {
        this.component.removeAttribute(propName);
      }
    } else if (value === '' || value === null || value === undefined) {
      // Remove empty attributes
      this.component.removeAttribute(propName);
    } else {
      // Set attribute value
      this.component.setAttribute(propName, value);
    }

    // Also set as property for Web Components
    if (propName in this.component) {
      this.component[propName] = value;
    }
  }

  // Static method to initialize all playgrounds on page
  static initAll() {
    const playgrounds = document.querySelectorAll('.playground');
    playgrounds.forEach(playground => {
      new Playground(playground);
    });
  }
}

// Playground Builder - Helper to create playgrounds dynamically
class PlaygroundBuilder {
  constructor(componentTag, config = {}) {
    this.componentTag = componentTag;
    this.config = {
      title: config.title || 'Interactive Playground',
      initialProps: config.initialProps || {},
      controls: config.controls || [],
      ...config
    };
  }

  build() {
    const container = document.createElement('div');
    container.className = 'playground';

    // Header
    const header = document.createElement('div');
    header.className = 'playground__header';
    header.innerHTML = `<h3 class="playground__title">${this.config.title}</h3>`;
    container.appendChild(header);

    // Main container
    const mainContainer = document.createElement('div');
    mainContainer.className = 'playground__container';

    // Preview
    const preview = document.createElement('div');
    preview.className = 'playground__preview';
    preview.innerHTML = this.buildComponentHTML();
    mainContainer.appendChild(preview);

    // Controls
    const controls = document.createElement('div');
    controls.className = 'playground__controls';
    controls.innerHTML = this.buildControlsHTML();
    mainContainer.appendChild(controls);

    container.appendChild(mainContainer);

    return container;
  }

  buildComponentHTML() {
    const attrs = Object.entries(this.config.initialProps)
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : '';
        }
        return `${key}="${value}"`;
      })
      .filter(Boolean)
      .join(' ');

    const content = this.config.content || '';
    
    return `<${this.componentTag} ${attrs}>${content}</${this.componentTag}>`;
  }

  buildControlsHTML() {
    return this.config.controls.map(control => {
      return `
        <div class="playground__control-group">
          <label class="playground__control-label">${control.label}</label>
          ${this.buildControlInput(control)}
        </div>
      `;
    }).join('');
  }

  buildControlInput(control) {
    const value = this.config.initialProps[control.prop] || control.default || '';

    switch (control.type) {
      case 'text':
      case 'number':
        return `<input 
          type="${control.type}" 
          class="playground__control-input" 
          data-prop="${control.prop}"
          value="${value}"
          ${control.min !== undefined ? `min="${control.min}"` : ''}
          ${control.max !== undefined ? `max="${control.max}"` : ''}
          ${control.step !== undefined ? `step="${control.step}"` : ''}
        />`;

      case 'select':
        const options = control.options.map(opt => {
          const optValue = typeof opt === 'string' ? opt : opt.value;
          const optLabel = typeof opt === 'string' ? opt : opt.label;
          const selected = optValue === value ? 'selected' : '';
          return `<option value="${optValue}" ${selected}>${optLabel}</option>`;
        }).join('');
        return `<select class="playground__control-select" data-prop="${control.prop}">${options}</select>`;

      case 'checkbox':
        const checked = value ? 'checked' : '';
        return `
          <label class="playground__control-checkbox">
            <input type="checkbox" data-prop="${control.prop}" ${checked} />
            <span>${control.description || 'Enable'}</span>
          </label>
        `;

      case 'textarea':
        return `<textarea 
          class="playground__control-input" 
          data-prop="${control.prop}"
          rows="${control.rows || 3}"
        >${value}</textarea>`;

      case 'range':
        return `
          <input 
            type="range" 
            class="playground__control-input" 
            data-prop="${control.prop}"
            value="${value}"
            min="${control.min || 0}"
            max="${control.max || 100}"
            step="${control.step || 1}"
          />
          <span>${value}</span>
        `;

      default:
        return '';
    }
  }

  appendTo(selector) {
    const target = document.querySelector(selector);
    if (target) {
      const playground = this.build();
      target.appendChild(playground);
      new Playground(playground);
      return playground;
    }
    return null;
  }
}

// Initialize all playgrounds when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    Playground.initAll();
  });
} else {
  Playground.initAll();
}

// Export for use in other scripts
export { Playground, PlaygroundBuilder };
