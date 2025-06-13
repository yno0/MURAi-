// Import terms and utilities
import { tagalogTerms, englishTerms, getAllTerms, getTermsByCategory, termMetadata } from './terms.js';

// Configuration object
const MuraiConfig = {
  enabled: true,
  sensitivity: 'medium', // 'low', 'medium', 'high'
  filterOptions: {
    offensive: true,
    sensitive: true,
    profanity: true,
    jejemon: true
  },
  whitelist: new Set(), // Words to ignore
  customColors: {
    highlight: 'rgba(255, 0, 0, 0.05)',
    highlightHover: 'rgba(255, 0, 0, 0.1)',
    tooltip: {
      background: '#ffffff',
      text: '#333333',
      border: '#cccccc',
      button: '#f44336',
      buttonHover: '#d32f2f'
    }
  }
};

// Function to update configuration
function updateConfig(newConfig) {
  Object.assign(MuraiConfig, newConfig);
  // Update styles when config changes
  updateStyles();
  // Reprocess text nodes with new config
  processTextNodes();
}

// Function to check sensitivity level
function matchesSensitivityLevel(category) {
  switch (MuraiConfig.sensitivity) {
    case 'low':
      return category === 'profanity';
    case 'medium':
      return category === 'profanity' || category === 'offensive';
    case 'high':
      return true;
    default:
      return true;
  }
}

// Function to check if term should be filtered
function shouldFilterTerm(term, category) {
  // Check whitelist
  if (MuraiConfig.whitelist.has(term.toLowerCase())) {
    return false;
  }
  
  // Check filter options
  if (!MuraiConfig.filterOptions[category]) {
    return false;
  }
  
  // Check sensitivity level
  return matchesSensitivityLevel(category);
}

// Function to detect language (simple heuristic approach)
function detectLanguage(text) {
  // Convert to lowercase for comparison
  text = text.toLowerCase();
  
  // Count matches for each language
  let tagalogCount = 0;
  let englishCount = 0;
  
  // Check against Tagalog terms
  Object.values(tagalogTerms).forEach(category => {
    category.forEach(term => {
      if (text.includes(term.toLowerCase())) {
        tagalogCount++;
      }
    });
  });
  
  // Check against English terms
  Object.values(englishTerms).forEach(category => {
    category.forEach(term => {
      if (text.includes(term.toLowerCase())) {
        englishCount++;
      }
    });
  });
  
  // Return detected language
  return tagalogCount > englishCount ? 'tl' : 'en';
}

// Function to get context around a flagged term
function getTermContext(text, term, windowSize = 5) {
  const words = text.split(/\s+/);
  const termWords = term.split(/\s+/);
  let termPosition = -1;

  // Find the position of the term
  for (let i = 0; i <= words.length - termWords.length; i++) {
    const slice = words.slice(i, i + termWords.length).join(' ').toLowerCase();
    if (slice === term.toLowerCase()) {
      termPosition = i;
      break;
    }
  }

  if (termPosition === -1) return "";

  // Get context window
  const start = Math.max(0, termPosition - windowSize);
  const end = Math.min(words.length, termPosition + termWords.length + windowSize);
  
  return words.slice(start, end).join(' ');
}

// Function to analyze text and return flagged terms with context
function analyzeText(text) {
  const results = [];
  const language = detectLanguage(text);
  const termsToCheck = language === 'tl' ? tagalogTerms : englishTerms;

  // Check each category and its terms
  Object.entries(termsToCheck).forEach(([category, terms]) => {
    terms.forEach(term => {
      if (text.toLowerCase().includes(term.toLowerCase())) {
        const context = getTermContext(text, term);
        const result = {
          term,
          category,
          language: language === 'tl' ? 'Tagalog' : 'English',
          context
        };
        results.push(result);
        console.log(`[FLAGGED] ${category.toUpperCase()} term detected: '${term}'`);
        console.log(`Language: ${result.language}`);
        console.log(`Context: ${context}`);
        console.log("-".repeat(50));
      }
    });
  });

  return results;
}

// Sample hate words to detect (keeping this for backward compatibility)
const hateWords = [...englishTerms.offensive, ...tagalogTerms.offensive];

// Add this variable at the top of the file with other constants
let isTooltipActive = false;

// Function to check text for hate words
function checkForHateWords(text) {
  const lowerText = text.toLowerCase();
  return hateWords.filter(word => lowerText.includes(word));
}

// Function to get asterisks of same length as word
function getAsterisks(word) {
  return '*'.repeat(word.length);
}

// Modify the showWarningTooltip function
function showWarningTooltip(event, originalWord, fullContext, category = '', language = '') {
  if (isTooltipActive) return;

  const existingTooltip = document.querySelector('.murai-tooltip');
  if (existingTooltip) existingTooltip.remove();

  const tooltip = document.createElement('div');
  tooltip.className = 'murai-tooltip murai-fade-in';
  
  tooltip.addEventListener('mouseenter', () => { isTooltipActive = true; });
  tooltip.addEventListener('mouseleave', () => { isTooltipActive = false; });

  tooltip.innerHTML = `
    <div class="murai-tooltip-content">
      <div class="murai-tooltip-header">
        <span class="murai-warning-icon">⚠️</span>
        <span class="murai-category-tag">${category}</span>
        <span class="murai-language-tag">${language}</span>
      </div>
      <p class="murai-warning-text">This content has been hidden because it may be inappropriate.</p>
      <div class="murai-context-box">
        <p class="murai-context">${fullContext}</p>
      </div>
      <div class="murai-actions">
        <button class="murai-view-btn">View Content</button>
        <button class="murai-whitelist-btn">Add to Whitelist</button>
      </div>
      <div class="murai-loading-overlay">
        <div class="murai-spinner"></div>
        <p>Loading sensitive content...</p>
      </div>
    </div>
  `;
  
  // Position tooltip with smart placement
  const rect = event.target.getBoundingClientRect();
  const tooltipWidth = 300; // Max tooltip width
  const tooltipHeight = 200; // Approximate height
  
  let left = event.clientX + 10;
  let top = event.clientY + 10;
  
  // Adjust if would overflow right edge
  if (left + tooltipWidth > window.innerWidth) {
    left = window.innerWidth - tooltipWidth - 10;
  }
  
  // Adjust if would overflow bottom edge
  if (top + tooltipHeight > window.innerHeight) {
    top = window.innerHeight - tooltipHeight - 10;
  }
  
  tooltip.style.position = 'fixed';
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
  
  // Add click handlers
  const viewBtn = tooltip.querySelector('.murai-view-btn');
  const whitelistBtn = tooltip.querySelector('.murai-whitelist-btn');
  const contextBox = tooltip.querySelector('.murai-context-box');
  const loadingOverlay = tooltip.querySelector('.murai-loading-overlay');

  viewBtn.onclick = (e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to view the potentially inappropriate content?')) {
      loadingOverlay.style.display = 'flex';
      viewBtn.style.display = 'none';
      
      setTimeout(() => {
        const censoredWord = '*'.repeat(originalWord.length);
        const revealedSpan = document.createElement('span');
        revealedSpan.className = 'murai-revealed murai-fade-in';
        revealedSpan.textContent = originalWord;
        revealedSpan.setAttribute('data-murai-revealed', 'true');
        
        contextBox.innerHTML = contextBox.innerHTML.replace(
          censoredWord,
          revealedSpan.outerHTML
        );
        loadingOverlay.style.display = 'none';
      }, 1000);
    }
  };

  whitelistBtn.onclick = (e) => {
    e.stopPropagation();
    MuraiConfig.whitelist.add(originalWord.toLowerCase());
    tooltip.remove();
    processTextNodes();
  };

  document.addEventListener('click', function removeTooltip(e) {
    if (!tooltip.contains(e.target) && e.target !== event.target) {
      tooltip.classList.add('murai-fade-out');
      setTimeout(() => {
        tooltip.remove();
        isTooltipActive = false;
        document.removeEventListener('click', removeTooltip);
      }, 300);
    }
  });

  document.body.appendChild(tooltip);
}

// Function to get context around a word
function getContext(text, word, contextLength = 30) {
  const index = text.toLowerCase().indexOf(word.toLowerCase());
  const start = Math.max(0, index - contextLength);
  const end = Math.min(text.length, index + word.length + contextLength);
  
  let context = text.slice(start, end);
  if (start > 0) context = '...' + context;
  if (end < text.length) context = context + '...';
  
  return context;
}

// Function to check text for inappropriate terms
function checkForInappropriateTerms(text) {
  const results = [];
  const lowerText = text.toLowerCase();

  // Check Tagalog terms
  Object.entries(tagalogTerms).forEach(([category, terms]) => {
    terms.forEach(term => {
      if (lowerText.includes(term.toLowerCase())) {
        results.push({
          term,
          category,
          language: 'Tagalog'
        });
      }
    });
  });

  // Check English terms
  Object.entries(englishTerms).forEach(([category, terms]) => {
    terms.forEach(term => {
      if (lowerText.includes(term.toLowerCase())) {
        results.push({
          term,
          category,
          language: 'English'
        });
      }
    });
  });

  return results;
}

// Function to replace inappropriate terms in text
function replaceInappropriateTerms(node) {
  let text = node.textContent;
  let modified = false;
  let originalWords = new Map();
  let contexts = new Map();
  
  // Get all flagged terms
  const flaggedTerms = checkForInappropriateTerms(text);
  
  if (flaggedTerms.length > 0) {
    flaggedTerms.forEach(({ term, category, language }) => {
      const regex = new RegExp(term, 'gi');
      if (regex.test(text)) {
        // Store original words and their contexts before replacing
        text.match(regex).forEach(match => {
          originalWords.set(match, {
            term: match,
            category,
            language
          });
          contexts.set(match, getTermContext(text, match));
        });
        text = text.replace(regex, getAsterisks(term));
        modified = true;

        // Log to console
        console.log(`[FLAGGED] ${category.toUpperCase()} term detected: '${term}'`);
        console.log(`Language: ${language}`);
        console.log(`Context: ${contexts.get(term)}`);
        console.log("-".repeat(50));
      }
    });

    if (modified) {
      const span = document.createElement('span');
      span.textContent = text;
      span.className = 'murai-censored';
      
      // Store metadata as data attributes
      span.dataset.originalWords = JSON.stringify(Array.from(originalWords.entries()));
      span.dataset.contexts = JSON.stringify(Array.from(contexts.entries()));
      
      // Add hover and click handlers
      span.addEventListener('mouseover', () => {
        span.classList.add('murai-hover');
      });
      
      span.addEventListener('mouseout', () => {
        span.classList.remove('murai-hover');
      });
      
      span.addEventListener('mouseover', (e) => {
        if (!isTooltipActive) {
          const words = JSON.parse(span.dataset.originalWords);
          const contexts = JSON.parse(span.dataset.contexts);
          const firstWord = words[0][1];
          showWarningTooltip(e, firstWord.term, contexts[0][1], firstWord.category, firstWord.language);
        }
      });
      
      node.parentNode.replaceChild(span, node);
      return true;
    }
  }
  
  return false;
}

// Add styles to document
function addStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .murai-censored {
      cursor: pointer;
      background-color: rgba(255, 0, 0, 0.05);
      padding: 0 2px;
      border-radius: 2px;
      transition: background-color 0.3s ease;
    }
    .murai-hover {
      background-color: rgba(255, 0, 0, 0.1);
    }
    .murai-tooltip {
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      z-index: 10000;
      max-width: 300px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .murai-fade-in {
      opacity: 1;
    }
    .murai-fade-out {
      opacity: 0;
    }
    .murai-tooltip-content {
      font-size: 14px;
      color: #333;
      position: static;
    }
    .murai-language-tag {
      display: inline-block;
      background: #e0e0e0;
      color: #666;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 12px;
      margin: 4px 0;
    }
    .murai-context {
      background: #f5f5f5;
      padding: 8px;
      border-radius: 4px;
      margin: 8px 0;
      font-family: monospace;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .murai-revealed {
      color: #f44336;
      font-weight: bold;
      opacity: 0;
      transition: opacity 0.3s ease;
      text-decoration: underline;
    }
    .murai-revealed.murai-fade-in {
      opacity: 1;
    }
    .murai-view-btn {
      background: #f44336;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 5px;
      width: 100%;
      transition: background-color 0.3s ease;
    }
    .murai-view-btn:hover {
      background: #d32f2f;
    }
    .murai-loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      display: none;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 10px;
    }
    .murai-spinner {
      width: 30px;
      height: 30px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #f44336;
      border-radius: 50%;
      animation: murai-spin 1s linear infinite;
    }
    @keyframes murai-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

// Update the observer and timing logic
function initializeObserver() {
  // Process immediately on load
  processTextNodes();

  // Create a more efficient mutation observer
  const observer = new MutationObserver((mutations) => {
    let shouldProcess = false;
    
    for (const mutation of mutations) {
      // Check if the mutation is relevant
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        const target = mutation.target;
        
        // Skip if the mutation is from our own changes
        if (target.classList?.contains('murai-censored') || 
            target.hasAttribute?.('data-murai-processed') ||
            target.hasAttribute?.('data-murai-revealed')) {
          continue;
        }
        
        shouldProcess = true;
        break;
      }
    }

    if (shouldProcess) {
      processTextNodes();
    }
  });

  // Configure observer with optimized options
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    characterDataOldValue: true
  });

  // Process when dynamic content loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processTextNodes);
  }

  // Process after images and resources load
  window.addEventListener('load', processTextNodes);

  // Process after AJAX content loads
  const originalXHR = window.XMLHttpRequest.prototype.open;
  window.XMLHttpRequest.prototype.open = function() {
    this.addEventListener('load', processTextNodes);
    return originalXHR.apply(this, arguments);
  };

  // Process after fetch requests
  const originalFetch = window.fetch;
  window.fetch = function() {
    return originalFetch.apply(this, arguments)
      .then((response) => {
        processTextNodes();
        return response;
      });
  };
}

// Update the processTextNodes function to use the new replacement function
function processTextNodes() {
  chrome.storage.local.get(['enabled'], function(result) {
    if (!result.enabled) return;

    // Use requestIdleCallback for better performance
    const process = (deadline) => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            // Skip if parent is script, style, already processed, or revealed content
            if (node.parentElement?.tagName === 'SCRIPT' || 
                node.parentElement?.tagName === 'STYLE' ||
                node.parentElement?.hasAttribute('data-murai-processed') ||
                node.parentElement?.hasAttribute('data-murai-revealed') ||
                node.parentElement?.closest('[data-murai-revealed="true"]')) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        },
        false
      );

      let node;
      while ((node = walker.nextNode()) && (deadline.timeRemaining() > 0)) {
        if (replaceInappropriateTerms(node)) {
          node.parentElement.setAttribute('data-murai-processed', 'true');
        }
      }

      // If there are more nodes to process, schedule another chunk
      if (walker.nextNode()) {
        requestIdleCallback(process);
      }
    };

    // Start processing in idle time
    requestIdleCallback(process);
  });
}

// Update styles function
function updateStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .murai-censored {
      cursor: pointer;
      background-color: ${MuraiConfig.customColors.highlight};
      padding: 0 2px;
      border-radius: 2px;
      transition: all 0.3s ease;
    }
    
    .murai-hover {
      background-color: ${MuraiConfig.customColors.highlightHover};
    }
    
    .murai-tooltip {
      background: ${MuraiConfig.customColors.tooltip.background};
      border: 1px solid ${MuraiConfig.customColors.tooltip.border};
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      z-index: 10000;
      max-width: 300px;
      opacity: 0;
      transition: all 0.3s ease;
    }
    
    .murai-tooltip-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    
    .murai-warning-icon {
      font-size: 20px;
    }
    
    .murai-category-tag,
    .murai-language-tag {
      display: inline-block;
      background: #e0e0e0;
      color: #666;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .murai-warning-text {
      color: ${MuraiConfig.customColors.tooltip.text};
      margin: 8px 0;
      font-size: 14px;
    }
    
    .murai-context-box {
      background: #f5f5f5;
      border-radius: 6px;
      padding: 12px;
      margin: 12px 0;
      max-height: 150px;
      overflow-y: auto;
    }
    
    .murai-context {
      font-family: monospace;
      white-space: pre-wrap;
      word-break: break-word;
      margin: 0;
      font-size: 13px;
      line-height: 1.4;
    }
    
    .murai-actions {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
    
    .murai-view-btn,
    .murai-whitelist-btn {
      flex: 1;
      background: ${MuraiConfig.customColors.tooltip.button};
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      transition: background-color 0.3s ease;
    }
    
    .murai-whitelist-btn {
      background: #757575;
    }
    
    .murai-view-btn:hover {
      background: ${MuraiConfig.customColors.tooltip.buttonHover};
    }
    
    .murai-whitelist-btn:hover {
      background: #616161;
    }
    
    .murai-loading-overlay {
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.9);
      display: none;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 12px;
      border-radius: 8px;
    }
    
    .murai-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid ${MuraiConfig.customColors.tooltip.button};
      border-radius: 50%;
      animation: murai-spin 1s linear infinite;
    }
    
    .murai-revealed {
      color: ${MuraiConfig.customColors.tooltip.button};
      font-weight: bold;
      opacity: 0;
      transition: opacity 0.3s ease;
      text-decoration: underline;
    }
    
    .murai-fade-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .murai-fade-out {
      opacity: 0;
      transform: translateY(4px);
    }
    
    @keyframes murai-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  
  // Remove existing styles
  const existingStyle = document.querySelector('#murai-styles');
  if (existingStyle) existingStyle.remove();
  
  // Add new styles
  style.id = 'murai-styles';
  document.head.appendChild(style);
}

// Function to initialize the extension
function initializeMurai() {
  // Load saved configuration
  chrome.storage.local.get(['enabled', 'sensitivity', 'filterOptions', 'customColors'], function(result) {
    // Update config with saved values or use defaults
    if (result.enabled !== undefined) MuraiConfig.enabled = result.enabled;
    if (result.sensitivity) MuraiConfig.sensitivity = result.sensitivity;
    if (result.filterOptions) Object.assign(MuraiConfig.filterOptions, result.filterOptions);
    if (result.customColors) Object.assign(MuraiConfig.customColors, result.customColors);

    // Initialize styles and start observing
    updateStyles();
    initializeObserver();
    processTextNodes();
  });
}

// Function to create and inject UI controls
function injectUIControls() {
  const controls = document.createElement('div');
  controls.className = 'murai-controls';
  controls.innerHTML = `
    <div class="murai-controls-panel">
      <div class="murai-header">
        <img src="${chrome.runtime.getURL('icon.png')}" alt="MURAi" class="murai-logo">
        <h2>MURAi Filter</h2>
      </div>
      <div class="murai-control-group">
        <label class="murai-switch">
          <input type="checkbox" ${MuraiConfig.enabled ? 'checked' : ''}>
          <span class="murai-slider"></span>
        </label>
        <span>Enable Filter</span>
      </div>
      <div class="murai-control-group">
        <label>Sensitivity</label>
        <div class="murai-sensitivity-slider">
          <input type="range" min="0" max="2" value="${
            MuraiConfig.sensitivity === 'low' ? 0 : 
            MuraiConfig.sensitivity === 'medium' ? 1 : 2
          }">
          <div class="murai-sensitivity-labels">
            <span>Low</span>
            <span>Mid</span>
            <span>High</span>
          </div>
        </div>
      </div>
      <div class="murai-control-group">
        <label>Filter Options</label>
        <div class="murai-filter-options">
          ${Object.entries(MuraiConfig.filterOptions).map(([key, value]) => `
            <label class="murai-checkbox">
              <input type="checkbox" data-filter="${key}" ${value ? 'checked' : ''}>
              <span class="murai-checkbox-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
            </label>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Add event listeners
  const enableSwitch = controls.querySelector('input[type="checkbox"]');
  enableSwitch.addEventListener('change', (e) => {
    MuraiConfig.enabled = e.target.checked;
    chrome.storage.local.set({ enabled: MuraiConfig.enabled });
  });

  const sensitivitySlider = controls.querySelector('input[type="range"]');
  sensitivitySlider.addEventListener('input', (e) => {
    const values = ['low', 'medium', 'high'];
    MuraiConfig.sensitivity = values[e.target.value];
    chrome.storage.local.set({ sensitivity: MuraiConfig.sensitivity });
  });

  const filterOptions = controls.querySelectorAll('.murai-filter-options input');
  filterOptions.forEach(option => {
    option.addEventListener('change', (e) => {
      MuraiConfig.filterOptions[e.target.dataset.filter] = e.target.checked;
      chrome.storage.local.set({ filterOptions: MuraiConfig.filterOptions });
    });
  });

  document.body.appendChild(controls);

  // Add UI-specific styles
  const uiStyles = document.createElement('style');
  uiStyles.textContent = `
    .murai-controls {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    }

    .murai-controls-panel {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 16px;
      width: 280px;
    }

    .murai-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .murai-logo {
      width: 32px;
      height: 32px;
    }

    .murai-header h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .murai-control-group {
      margin-bottom: 16px;
    }

    .murai-control-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #666;
    }

    .murai-switch {
      position: relative;
      display: inline-block;
      width: 48px;
      height: 24px;
    }

    .murai-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .murai-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .3s;
      border-radius: 24px;
    }

    .murai-slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .3s;
      border-radius: 50%;
    }

    .murai-switch input:checked + .murai-slider {
      background-color: ${MuraiConfig.customColors.tooltip.button};
    }

    .murai-switch input:checked + .murai-slider:before {
      transform: translateX(24px);
    }

    .murai-sensitivity-slider {
      width: 100%;
    }

    .murai-sensitivity-slider input {
      width: 100%;
      margin: 8px 0;
    }

    .murai-sensitivity-labels {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #666;
    }

    .murai-filter-options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .murai-checkbox {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }

    .murai-checkbox-label {
      font-size: 14px;
      color: #333;
    }
  `;

  document.head.appendChild(uiStyles);
}

// Initialize the extension
document.addEventListener('DOMContentLoaded', () => {
  initializeMurai();
  injectUIControls();
});

// Listen for configuration changes from extension
chrome.storage.onChanged.addListener((changes) => {
  const newConfig = {};
  
  if (changes.enabled) {
    newConfig.enabled = changes.enabled.newValue;
  }
  if (changes.sensitivity) {
    newConfig.sensitivity = changes.sensitivity.newValue;
  }
  if (changes.filterOptions) {
    newConfig.filterOptions = changes.filterOptions.newValue;
  }
  if (changes.customColors) {
    newConfig.customColors = changes.customColors.newValue;
  }
  
  if (Object.keys(newConfig).length > 0) {
    updateConfig(newConfig);
  }
});