// Main application functionality
import { DEFAULT_COLORS, DEFAULT_TOKENS, generateColorVars, generateNeutralVars } from '../vendor/index.js';

class DocsApp {
  constructor() {
    this.theme = localStorage.getItem('meridian-theme') || 'light';
    this.sidebarOpen = false;
    this.init();
  }

  init() {
    this.applyTheme();
    this.setupThemeToggle();
    this.setupMobileMenu();
    this.setupSidebarNavigation();
    this.setupSmoothScroll();
    this.highlightActiveNavItem();
  }

  // Theme Management
  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.updateThemeIcon();
    this.initThemeTokens();
  }

  initThemeTokens() {
    // Generate theme variables
    const vars = {
      ...generateColorVars('primary', DEFAULT_COLORS.primary),
      ...generateColorVars('success', DEFAULT_COLORS.success),
      ...generateColorVars('warning', DEFAULT_COLORS.warning),
      ...generateColorVars('error', DEFAULT_COLORS.error),
      ...generateColorVars('info', DEFAULT_COLORS.info),
      ...generateNeutralVars(),
    };

    // Add tokens
    Object.entries(DEFAULT_TOKENS).forEach(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      let cssValue = value;

      if (typeof value === 'number' && !key.toLowerCase().includes('lineheight') && !key.toLowerCase().includes('opacity') && !key.toLowerCase().includes('zindex') && !key.toLowerCase().includes('weight')) {
        cssValue = `${value}px`;
      }

      vars[`--mx-${cssKey}`] = String(cssValue);
    });

    // Apply to document root
    Object.entries(vars).forEach(([name, value]) => {
      document.documentElement.style.setProperty(name, value);
    });
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('meridian-theme', this.theme);
    this.applyTheme();
  }

  updateThemeIcon() {
    const themeToggle = document.querySelector('.docs-header__theme-toggle');
    if (!themeToggle) return;

    const icon = this.theme === 'light'
      ? '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>';

    themeToggle.innerHTML = icon;
  }

  setupThemeToggle() {
    const themeToggle = document.querySelector('.docs-header__theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }

  // Mobile Menu
  setupMobileMenu() {
    const mobileToggle = document.querySelector('.docs-header__mobile-toggle');
    const sidebar = document.querySelector('.docs-sidebar');
    const overlay = document.createElement('div');
    overlay.className = 'docs-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: var(--header-height);
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      z-index: 899;
    `;
    document.body.appendChild(overlay);

    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener('click', () => {
        this.sidebarOpen = !this.sidebarOpen;
        sidebar.classList.toggle('open', this.sidebarOpen);
        overlay.style.display = this.sidebarOpen ? 'block' : 'none';

        // Update icon
        mobileToggle.innerHTML = this.sidebarOpen
          ? '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>'
          : '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/></svg>';
      });

      // Close sidebar when clicking overlay
      overlay.addEventListener('click', () => {
        this.sidebarOpen = false;
        sidebar.classList.remove('open');
        overlay.style.display = 'none';
        mobileToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/></svg>';
      });
    }
  }

  // Sidebar Navigation
  setupSidebarNavigation() {
    const links = document.querySelectorAll('.docs-sidebar__menu-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        // Close mobile menu on navigation
        if (window.innerWidth <= 768) {
          const sidebar = document.querySelector('.docs-sidebar');
          const overlay = document.querySelector('.docs-overlay');
          if (sidebar && overlay) {
            sidebar.classList.remove('open');
            overlay.style.display = 'none';
            this.sidebarOpen = false;
          }
        }
      });
    });
  }

  // Smooth Scroll
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Highlight Active Nav Item
  highlightActiveNavItem() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.docs-sidebar__menu-link');

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && currentPath.includes(href)) {
        link.classList.add('active');

        // Expand parent section if in collapsible menu
        const section = link.closest('.docs-sidebar__section');
        if (section) {
          section.classList.add('expanded');
        }
      }
    });
  }

  // Demo Code Toggle
  setupDemoCodeToggle() {
    document.querySelectorAll('.demo-card__action-btn[data-action="code"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.demo-card');
        const codeBlock = card.querySelector('.demo-card__code');
        if (codeBlock) {
          codeBlock.classList.toggle('visible');

          // Update icon
          btn.innerHTML = codeBlock.classList.contains('visible')
            ? '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 111.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M4.854 4.146a.5.5 0 010 .708L1.707 8l3.147 3.146a.5.5 0 01-.708.708l-3.5-3.5a.5.5 0 010-.708l3.5-3.5a.5.5 0 01.708 0zm6.292 0a.5.5 0 000 .708L14.293 8l-3.147 3.146a.5.5 0 00.708.708l3.5-3.5a.5.5 0 000-.708l-3.5-3.5a.5.5 0 00-.708 0z"/></svg>';
        }
      });
    });
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.docsApp = new DocsApp();
  });
} else {
  window.docsApp = new DocsApp();
}

// Export for use in other scripts
export default DocsApp;
