# Meridian UX Documentation

Comprehensive documentation website for Meridian UX - Enterprise web components based on Ant Design principles.

## Features

- **63+ Component Pages**: Auto-generated documentation for all Meridian UX components
- **Interactive Examples**: Live demos with code examples for each component
- **Search Functionality**: Fast client-side search powered by Fuse.js
- **Dark Mode**: Built-in dark mode support with theme toggle
- **Responsive Design**: Mobile-friendly layout with collapsible sidebar
- **Code Highlighting**: Syntax highlighting with Prism.js
- **Copy to Clipboard**: Easy code copying for all examples

## Development

### Install Dependencies

```bash
yarn install
```

### Generate Documentation Data

```bash
yarn docs:generate
```

This command:
1. Extracts component metadata from TypeScript files
2. Generates all component documentation pages
3. Copies assets to public directory

### Development Server

```bash
yarn docs:dev
```

Starts Vite dev server at `http://localhost:5173`

### Production Build

```bash
yarn docs:build
```

Builds the documentation site to `docs/dist/`

### Preview Production Build

```bash
yarn docs:preview
```

## Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### GitHub Actions Workflow

The `.github/workflows/deploy-docs.yml` workflow:
1. Builds the component library
2. Generates documentation data
3. Builds the documentation site
4. Deploys to GitHub Pages

### Manual Deployment

To deploy manually:

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to main branch or run the workflow manually

## Project Structure

```
docs/
├── public/           # Static assets (copied during build)
│   ├── styles/      # CSS files
│   ├── scripts/     # JavaScript files
│   ├── data/        # Generated component data
│   └── images/      # Images and screenshots
├── src/
│   ├── components/  # Generated component pages (64 pages)
│   ├── styles/      # Source CSS files
│   ├── scripts/     # Source JavaScript files
│   ├── data/        # Generated JSON data
│   ├── index.html   # Homepage
│   ├── getting-started.html
│   └── theming.html
├── dist/            # Build output (generated)
├── package.json
└── vite.config.js
```

## Scripts Overview

### `generate-docs-data.js`

Extracts component metadata from TypeScript source files:
- Parses JSDoc comments
- Extracts properties, events, slots
- Generates `components.json` and `navigation.json`

### `generate-component-pages.js`

Generates HTML documentation pages for each component:
- Creates component page with examples
- Generates API reference tables
- Adds breadcrumb navigation

## Technologies Used

- **Vite**: Build tool and dev server
- **Fuse.js**: Fuzzy search library
- **Prism.js**: Syntax highlighting
- **Vanilla JavaScript**: No framework dependencies
- **CSS Variables**: Theme customization

## URL Structure

- Homepage: `/meridian-ux/`
- Getting Started: `/meridian-ux/getting-started.html`
- Theming: `/meridian-ux/theming.html`
- Components: `/meridian-ux/components/mx-{component}.html`

## License

MIT
