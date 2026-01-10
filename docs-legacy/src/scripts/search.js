// Search Functionality with Fuse.js
class DocsSearch {
  constructor() {
    this.searchInput = document.querySelector('.docs-header__search-input');
    this.searchResults = null;
    this.componentsData = null;
    this.fuse = null;
    this.init();
  }

  async init() {
    if (!this.searchInput) return;

    // Load components data
    await this.loadComponentsData();
    
    // Setup Fuse.js
    this.setupFuse();
    
    // Create results container
    this.createResultsContainer();
    
    // Setup event listeners
    this.setupEventListeners();
  }

  async loadComponentsData() {
    try {
      const response = await fetch('/data/components.json');
      const data = await response.json();
      
      // Convert object to array for Fuse.js
      this.componentsData = Object.values(data);
    } catch (error) {
      console.error('Failed to load components data:', error);
      this.componentsData = [];
    }
  }

  setupFuse() {
    if (!window.Fuse) {
      console.error('Fuse.js not loaded');
      return;
    }

    const options = {
      keys: [
        { name: 'name', weight: 0.4 },
        { name: 'tag', weight: 0.3 },
        { name: 'description', weight: 0.2 },
        { name: 'category', weight: 0.1 }
      ],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2
    };

    this.fuse = new window.Fuse(this.componentsData, options);
  }

  createResultsContainer() {
    this.searchResults = document.createElement('div');
    this.searchResults.className = 'search-results';
    this.searchResults.style.display = 'none';
    
    const searchContainer = this.searchInput.closest('.docs-header__search');
    searchContainer.appendChild(this.searchResults);
  }

  setupEventListeners() {
    // Search input
    this.searchInput.addEventListener('input', (e) => {
      this.handleSearch(e.target.value);
    });

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.docs-header__search')) {
        this.hideResults();
      }
    });

    // Keyboard navigation
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideResults();
        this.searchInput.blur();
      }
    });
  }

  handleSearch(query) {
    if (!query || query.length < 2) {
      this.hideResults();
      return;
    }

    const results = this.fuse.search(query);
    this.displayResults(results, query);
  }

  displayResults(results, query) {
    if (results.length === 0) {
      this.showNoResults(query);
      return;
    }

    const resultsHTML = results.slice(0, 8).map(result => {
      const item = result.item;
      return `
        <a href="${item.path}" class="search-results__item">
          <div class="search-results__item-title">${this.highlightMatch(item.name, query)}</div>
          <div class="search-results__item-category">${item.category} • ${item.tag}</div>
        </a>
      `;
    }).join('');

    this.searchResults.innerHTML = resultsHTML;
    this.showResults();
  }

  showNoResults(query) {
    this.searchResults.innerHTML = `
      <div class="search-results__empty">
        No results found for "${this.escapeHtml(query)}"
      </div>
    `;
    this.showResults();
  }

  highlightMatch(text, query) {
    const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
    return this.escapeHtml(text).replace(regex, '<mark>$1</mark>');
  }

  showResults() {
    this.searchResults.style.display = 'block';
  }

  hideResults() {
    this.searchResults.style.display = 'none';
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.docsSearch = new DocsSearch();
  });
} else {
  window.docsSearch = new DocsSearch();
}

// Export for use in other scripts
export default DocsSearch;
