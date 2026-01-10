import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Get all HTML files from src directory
const srcDir = resolve(__dirname, 'src');
const htmlFiles = {};

function scanDirectory(dir, baseDir = srcDir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = resolve(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      scanDirectory(filePath, baseDir);
    } else if (file.endsWith('.html')) {
      const relativePath = filePath.replace(baseDir + '/', '');
      const key = relativePath.replace(/\.html$/, '').replace(/\//g, '-');
      htmlFiles[key] = filePath;
    }
  });
}

if (fs.existsSync(srcDir)) {
  scanDirectory(srcDir);
}

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/meridian-ux/' : '/',
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: htmlFiles,
      external: [
        /^\/meridian-ux\//
      ]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
}));
