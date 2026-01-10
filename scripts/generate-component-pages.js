import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDataFile = path.join(__dirname, '../docs/src/data/components.json');
const navigationDataFile = path.join(__dirname, '../docs/src/data/navigation.json');
const outputDir = path.join(__dirname, '../docs/src/components');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Load data
const componentsData = JSON.parse(fs.readFileSync(componentsDataFile, 'utf-8'));
const navigationData = JSON.parse(fs.readFileSync(navigationDataFile, 'utf-8'));

// Generate sidebar HTML
function generateSidebarHTML(currentTag) {
  let html = '';
  
  Object.entries(navigationData).forEach(([category, components]) => {
    // Get unique components (some have multiple sub-components)
    const uniqueComps = [];
    const seen = new Set();
    
    components.forEach(comp => {
      const key = comp.path;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueComps.push(comp);
      }
    });
    
    html += `
      <div class="docs-sidebar__section">
        <div class="docs-sidebar__section-title">${category}</div>
        <ul class="docs-sidebar__menu">`;
    
    uniqueComps.forEach(comp => {
      const isActive = comp.tag === currentTag ? ' class="active"' : '';
      // Extract just the filename from the path for relative linking
      const filename = comp.path.split('/').pop();
      html += `
          <li class="docs-sidebar__menu-item">
            <a href="${filename}"${isActive ? ' class="active"' : ''}>${comp.name}</a>
          </li>`;
    });
    
    html += `
        </ul>
      </div>`;
  });
  
  return html;
}

// Generate demo examples
function generateDemoHTML(component) {
  const demos = [];
  
  // Demo 1: Basic Usage
  demos.push({
    title: 'Basic Usage',
    description: `Basic ${component.name} component with default settings.`,
    code: generateBasicDemo(component)
  });
  
  // Demo 2: Variants (if type/variant props exist)
  const hasVariants = component.properties.some(p => 
    p.name === 'type' || p.name === 'variant' || p.name === 'size'
  );
  
  if (hasVariants) {
    demos.push({
      title: 'Variants',
      description: `Different variants of the ${component.name} component.`,
      code: generateVariantsDemo(component)
    });
  }
  
  // Demo 3: With all options
  if (component.properties.length > 2) {
    demos.push({
      title: 'Advanced Usage',
      description: `${component.name} with additional options and customization.`,
      code: generateAdvancedDemo(component)
    });
  }
  
  return demos.map((demo, index) => `
    <div class="demo-card">
      <div class="demo-card__header">
        <span class="demo-card__title">${demo.title}</span>
        <div class="demo-card__actions">
          <button class="demo-card__action-btn" data-action="code" title="View code">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path fill-rule="evenodd" d="M4.854 4.146a.5.5 0 010 .708L1.707 8l3.147 3.146a.5.5 0 01-.708.708l-3.5-3.5a.5.5 0 010-.708l3.5-3.5a.5.5 0 01.708 0zm6.292 0a.5.5 0 000 .708L14.293 8l-3.147 3.146a.5.5 0 00.708.708l3.5-3.5a.5.5 0 000-.708l-3.5-3.5a.5.5 0 00-.708 0z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="demo-card__content">
        ${demo.code}
      </div>
      ${demo.description ? `<div class="demo-card__description">${demo.description}</div>` : ''}
      <div class="demo-card__code">
        <pre><code class="language-html">${escapeHtml(demo.code)}</code></pre>
      </div>
    </div>
  `).join('\n');
}

function generateBasicDemo(component) {
  const tag = component.tag;
  
  // Find a text/label property
  const textProp = component.properties.find(p => 
    p.name === 'label' || p.name === 'text' || p.name === 'message' || p.name === 'title'
  );
  
  const hasSlot = component.slots && component.slots.length > 0;
  
  if (textProp) {
    return `<${tag} ${textProp.name}="Example ${component.name}"></${tag}>`;
  } else if (hasSlot) {
    return `<${tag}>\n  Example ${component.name} Content\n</${tag}>`;
  } else {
    return `<${tag}></${tag}>`;
  }
}

function generateVariantsDemo(component) {
  const tag = component.tag;
  const typeProp = component.properties.find(p => p.name === 'type' || p.name === 'variant');
  const sizeProp = component.properties.find(p => p.name === 'size');
  
  let demos = [];
  
  if (typeProp) {
    // Common types
    const types = ['default', 'primary', 'success', 'warning', 'error', 'info'];
    types.forEach(type => {
      demos.push(`<${tag} type="${type}">Type: ${type}</${tag}>`);
    });
  }
  
  if (sizeProp && demos.length === 0) {
    const sizes = ['small', 'medium', 'large'];
    sizes.forEach(size => {
      demos.push(`<${tag} size="${size}">Size: ${size}</${tag}>`);
    });
  }
  
  return demos.length > 0 ? demos.join('\n') : generateBasicDemo(component);
}

function generateAdvancedDemo(component) {
  const tag = component.tag;
  const attrs = [];
  
  // Add some interesting properties
  component.properties.slice(0, 4).forEach(prop => {
    if (prop.type === 'boolean') {
      attrs.push(prop.name);
    } else if (prop.name !== 'type' && prop.name !== 'variant') {
      const value = prop.default || getDefaultValue(prop.type);
      if (value) {
        attrs.push(`${prop.name}="${value}"`);
      }
    }
  });
  
  const attrString = attrs.join(' ');
  return `<${tag} ${attrString}>\n  Advanced ${component.name}\n</${tag}>`;
}

function getDefaultValue(type) {
  if (type.includes('string')) return 'Example';
  if (type.includes('number')) return '10';
  if (type.includes('boolean')) return null;
  return 'value';
}

// Generate API tables
function generateAPITablesHTML(component) {
  let html = '';
  
  // Properties Table
  if (component.properties && component.properties.length > 0) {
    html += `
      <h3 class="docs-section__subtitle">Properties</h3>
      <div class="api-table">
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>`;
    
    component.properties.forEach(prop => {
      html += `
            <tr>
              <td><span class="api-table__name">${prop.name}</span></td>
              <td><span class="api-table__type">${escapeHtml(prop.type)}</span></td>
              <td><span class="api-table__default">${prop.default || '-'}</span></td>
              <td>${prop.description}</td>
            </tr>`;
    });
    
    html += `
          </tbody>
        </table>
      </div>`;
  }
  
  // Events Table
  if (component.events && component.events.length > 0) {
    html += `
      <h3 class="docs-section__subtitle">Events</h3>
      <div class="api-table">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>`;
    
    component.events.forEach(event => {
      html += `
            <tr>
              <td><span class="api-table__name">${event.name}</span></td>
              <td>${event.description}</td>
            </tr>`;
    });
    
    html += `
          </tbody>
        </table>
      </div>`;
  }
  
  // Slots Table
  if (component.slots && component.slots.length > 0) {
    html += `
      <h3 class="docs-section__subtitle">Slots</h3>
      <div class="api-table">
        <table>
          <thead>
            <tr>
              <th>Slot</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>`;
    
    component.slots.forEach(slot => {
      const slotName = slot.name === 'default' || slot.name === '-' ? '(default)' : slot.name;
      html += `
            <tr>
              <td><span class="api-table__name">${slotName}</span></td>
              <td>${slot.description || 'Default slot'}</td>
            </tr>`;
    });
    
    html += `
          </tbody>
        </table>
      </div>`;
  }
  
  return html;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Generate full component page
function generateComponentPage(tag, component) {
  const sidebarHTML = generateSidebarHTML(tag);
  const demosHTML = generateDemoHTML(component);
  const apiHTML = generateAPITablesHTML(component);
  
  // Clean description for meta tag (remove HTML and limit length)
  const cleanDescription = component.description
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/```.*?```/gs, '') // Remove code blocks
    .trim()
    .substring(0, 150);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtml(cleanDescription)}">
  <title>${component.name} - Meridian UX</title>
  
  <!-- Styles -->
  <link rel="stylesheet" href="../styles/main.css">
  <link rel="stylesheet" href="../styles/layout.css">
  <link rel="stylesheet" href="../styles/components.css">
  <link rel="stylesheet" href="../styles/prism-theme.css">
  
  <!-- Component Library -->
  <script type="module" src="../vendor/index.js"></script>
</head>
<body>
  <div class="docs-layout">
    <!-- Header -->
    <header class="docs-header">
      <button class="docs-header__mobile-toggle" aria-label="Toggle menu">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
        </svg>
      </button>
      
      <a href="../index.html" class="docs-header__logo">
        <span class="docs-header__logo-text">MERIDIAN UX</span>
      </a>
      
      <nav class="docs-header__nav">
        <div class="docs-header__search">
          <svg class="docs-header__search-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"/>
            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"/>
          </svg>
          <input type="text" class="docs-header__search-input" placeholder="Search components..." />
        </div>
        
        <ul class="docs-header__links">
          <li><a href="../getting-started.html" class="docs-header__link">Getting Started</a></li>
          <li><a href="https://github.com/valostra-digital/meridian-ux" target="_blank" class="docs-header__link">GitHub</a></li>
        </ul>
        
        <button class="docs-header__theme-toggle" aria-label="Toggle theme"></button>
      </nav>
    </header>

    <div class="docs-main">
      <!-- Sidebar -->
      <aside class="docs-sidebar">
        <div class="docs-sidebar__inner">
          ${sidebarHTML}
        </div>
      </aside>

      <!-- Content -->
      <main class="docs-content">
        <div class="docs-content__inner">
          <!-- Breadcrumb -->
          <nav class="docs-breadcrumb">
            <a href="../index.html" class="docs-breadcrumb__link">Home</a>
            <span class="docs-breadcrumb__separator">/</span>
            <span class="docs-breadcrumb__link">${component.category}</span>
            <span class="docs-breadcrumb__separator">/</span>
            <span class="docs-breadcrumb__current">${component.name}</span>
          </nav>

          <!-- Component Header -->
          <div class="component-header">
            <h1 class="component-header__title">
              ${component.name}
              <span class="component-header__tag">${component.tag}</span>
            </h1>
            <p class="component-header__description">${component.description.split('```')[0].trim()}</p>
          </div>

          <!-- Examples Section -->
          <section class="docs-section">
            <h2 class="docs-section__title">Examples</h2>
            ${demosHTML}
          </section>

          <!-- API Section -->
          <section class="docs-section">
            <h2 class="docs-section__title">API Reference</h2>
            ${apiHTML}
          </section>
        </div>
      </main>
    </div>

    <!-- Footer -->
    <footer class="docs-footer">
      <p>
        Built with ❤️ by <a href="https://github.com/valostra-digital" target="_blank">Valostra Digital</a>
        • Licensed under MIT
      </p>
    </footer>
  </div>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/fuse.js@7.0.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-markup.min.js"></script>
  <script type="module" src="../scripts/main.js"></script>
  <script type="module" src="../scripts/search.js"></script>
  <script type="module" src="../scripts/code-copy.js"></script>
  <script>
    // Setup demo code toggles
    document.addEventListener('DOMContentLoaded', () => {
      if (window.docsApp) {
        window.docsApp.setupDemoCodeToggle();
      }
    });
  </script>
</body>
</html>`;
}

// Generate all component pages
console.log('🚀 Generating component documentation pages...');

let count = 0;
const processedFiles = new Set();

Object.entries(componentsData).forEach(([tag, component]) => {
  const filename = component.path.split('/').pop();
  
  // Skip if we've already generated this file (for components with sub-components)
  if (processedFiles.has(filename)) {
    return;
  }
  
  const html = generateComponentPage(tag, component);
  const outputPath = path.join(outputDir, filename);
  
  fs.writeFileSync(outputPath, html);
  processedFiles.add(filename);
  count++;
});

console.log(`✅ Generated ${count} component pages -> ${outputDir}`);
