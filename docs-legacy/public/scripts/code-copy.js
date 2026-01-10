// Code Copy Functionality
class CodeCopy {
  constructor() {
    this.init();
  }

  init() {
    this.addCopyButtons();
  }

  addCopyButtons() {
    // Find all code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      if (pre.querySelector('.code-block__copy')) return; // Already has button
      
      // Wrap in code-block container if not already
      if (!pre.parentElement.classList.contains('code-block')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block';
        pre.parentElement.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
      }

      // Create copy button
      const button = document.createElement('button');
      button.className = 'code-block__copy';
      button.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4 2a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V2z"/>
          <path d="M2 6a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-1H6a3 3 0 01-3-3V6H2z"/>
        </svg>
        <span>Copy</span>
      `;

      button.addEventListener('click', () => this.copyCode(button, codeBlock));

      // Insert button
      const wrapper = pre.parentElement;
      wrapper.appendChild(button);
    });
  }

  async copyCode(button, codeBlock) {
    const code = codeBlock.textContent;
    
    try {
      await navigator.clipboard.writeText(code);
      
      // Update button state
      button.classList.add('copied');
      button.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z"/>
        </svg>
        <span>Copied!</span>
      `;

      // Reset after 2 seconds
      setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V2z"/>
            <path d="M2 6a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-1H6a3 3 0 01-3-3V6H2z"/>
          </svg>
          <span>Copy</span>
        `;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      
      // Fallback for older browsers
      this.fallbackCopy(codeBlock);
    }
  }

  fallbackCopy(codeBlock) {
    const range = document.createRange();
    range.selectNode(codeBlock);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    
    try {
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
  }

  // Method to refresh copy buttons (useful after dynamically loading content)
  refresh() {
    this.addCopyButtons();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.codeCopy = new CodeCopy();
  });
} else {
  window.codeCopy = new CodeCopy();
}

// Export for use in other scripts
export default CodeCopy;
