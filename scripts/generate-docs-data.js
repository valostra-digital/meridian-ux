import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, '../packages/components/src');
const outputFile = path.join(__dirname, '../apps/docs/src/data/components.json');

// Component categories
const categories = {
  'General': ['mx-button', 'mx-icon', 'mx-typography'],
  'Layout': ['mx-divider', 'mx-flex', 'mx-grid', 'mx-layout', 'mx-space', 'mx-splitter', 'mx-masonry'],
  'Navigation': ['mx-affix', 'mx-anchor', 'mx-back-top', 'mx-breadcrumb', 'mx-dropdown', 'mx-menu', 'mx-pagination', 'mx-steps', 'mx-tabs'],
  'Data Entry': ['mx-auto-complete', 'mx-checkbox', 'mx-color-picker', 'mx-date-picker', 'mx-form', 'mx-input', 'mx-input-number', 'mx-mention', 'mx-radio', 'mx-rate', 'mx-select', 'mx-slider', 'mx-switch', 'mx-time-picker', 'mx-upload'],
  'Data Display': ['mx-avatar', 'mx-badge', 'mx-card', 'mx-carousel', 'mx-collapse', 'mx-descriptions', 'mx-empty', 'mx-image', 'mx-list', 'mx-popover', 'mx-qr-code', 'mx-segmented', 'mx-statistic', 'mx-tag', 'mx-timeline', 'mx-tooltip'],
  'Feedback': ['mx-alert', 'mx-drawer', 'mx-message', 'mx-modal', 'mx-notification', 'mx-popconfirm', 'mx-progress', 'mx-result', 'mx-skeleton', 'mx-spin'],
  'Other': ['mx-app', 'mx-float-button', 'mx-watermark']
};

function getCategory(componentName) {
  for (const [category, components] of Object.entries(categories)) {
    if (components.includes(componentName)) {
      return category;
    }
  }
  return 'Other';
}

function extractJSDoc(content) {
  const jsDocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
  if (!jsDocMatch) return null;

  const jsDoc = jsDocMatch[1];
  const lines = jsDoc.split('\n').map(line => line.trim().replace(/^\*\s?/, ''));

  const data = {
    description: '',
    element: '',
    properties: [],
    events: [],
    slots: [],
    examples: []
  };

  let currentSection = 'description';
  let exampleBuffer = [];

  // Helper to flush example buffer
  const flushExample = () => {
    if (exampleBuffer.length > 0) {
      const fullText = exampleBuffer.join('\n');
      // Try to split into description and code
      // Common pattern: "Description text \n ```html \n code \n ```"
      const codeMatch = fullText.match(/```(?:html)?\s*([\s\S]*?)```/);

      if (codeMatch) {
        const code = codeMatch[1].trim();
        // Everything before the code block is the title/description
        const title = fullText.replace(/```[\s\S]*```/, '').trim();
        data.examples.push({
          title: title || 'Basic Usage',
          code: code
        });
      }
      exampleBuffer = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith('@element')) {
      data.element = line.replace('@element', '').trim();
      currentSection = 'meta';
    } else if (line.startsWith('@attr')) {
      const attrMatch = line.match(/@attr\s+{([^}]+)}\s+(\S+)\s+-\s+(.+)/);
      if (attrMatch) {
        data.properties.push({
          name: attrMatch[2],
          type: attrMatch[1],
          description: attrMatch[3]
        });
      }
      currentSection = 'meta';
    } else if (line.startsWith('@fires')) {
      const eventMatch = line.match(/@fires\s+(\S+)\s+-\s+(.+)/);
      if (eventMatch) {
        data.events.push({
          name: eventMatch[1],
          description: eventMatch[2]
        });
      }
      currentSection = 'meta';
    } else if (line.startsWith('@slot')) {
      const slotMatch = line.match(/@slot\s+(\S+)?\s+-?\s*(.+)?/);
      if (slotMatch) {
        data.slots.push({
          name: slotMatch[1] || 'default',
          description: slotMatch[2] || 'Default slot'
        });
      }
      currentSection = 'meta';
    } else if (line.startsWith('@example')) {
      // Flush previous example if any
      if (currentSection === 'example') {
        flushExample();
      }
      currentSection = 'example';
    } else {
      if (currentSection === 'description') {
        if (!line.startsWith('@')) {
          data.description += (data.description ? ' ' : '') + line;
        }
      } else if (currentSection === 'example') {
        // Collect lines for the current example
        exampleBuffer.push(line);
      }
    }
  }

  // Flush last example
  if (currentSection === 'example') {
    flushExample();
  }

  return data;
}

function parseTypeScriptFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const jsDoc = extractJSDoc(content);

  if (!jsDoc) return null;

  // Extract property defaults from @property decorators
  const propertyMatches = content.matchAll(/@property\([^)]*\)\s+(\w+)(?:[\?\!])?\s*(?::\s*([^=;]+))?\s*=\s*([^;]+);?/g);
  const propertyDefaults = {};

  for (const match of propertyMatches) {
    const name = match[1];
    const defaultValue = match[3]?.trim();
    if (defaultValue) {
      propertyDefaults[name] = defaultValue;
    }
  }

  // Add defaults to properties
  jsDoc.properties.forEach(prop => {
    const propName = prop.name;
    if (propertyDefaults[propName]) {
      prop.default = propertyDefaults[propName];
    }
  });

  return jsDoc;
}

function generateComponentsData() {
  const components = {};
  const dirs = fs.readdirSync(componentsDir);

  for (const dir of dirs) {
    if (!dir.startsWith('mx-')) continue;

    const componentPath = path.join(componentsDir, dir);
    if (!fs.statSync(componentPath).isDirectory()) continue;

    const tsFiles = fs.readdirSync(componentPath).filter(f => f.endsWith('.ts') && !f.startsWith('index'));

    for (const tsFile of tsFiles) {
      const filePath = path.join(componentPath, tsFile);
      const data = parseTypeScriptFile(filePath);

      if (data && data.element) {
        const componentName = data.element;
        const displayName = dir.replace('mx-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        components[componentName] = {
          tag: componentName,
          name: displayName,
          category: getCategory(dir),
          path: `/components/${componentName}.html`,
          ...data
        };
      }
    }
  }

  return components;
}

// Generate and save
console.log('🔍 Extracting component data from TypeScript files...');
const componentsData = generateComponentsData();
const count = Object.keys(componentsData).length;

fs.writeFileSync(outputFile, JSON.stringify(componentsData, null, 2));
console.log(`✅ Generated data for ${count} components -> ${outputFile}`);

// Also generate a navigation structure
const navStructure = {};
for (const [tag, data] of Object.entries(componentsData)) {
  if (!navStructure[data.category]) {
    navStructure[data.category] = [];
  }
  navStructure[data.category].push({
    tag: data.tag,
    name: data.name,
    path: data.path
  });
}

const navFile = path.join(__dirname, '../apps/docs/src/data/navigation.json');
fs.writeFileSync(navFile, JSON.stringify(navStructure, null, 2));
console.log(`✅ Generated navigation structure -> ${navFile}`);
