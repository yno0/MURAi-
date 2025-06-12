// Sample hate words to detect
const hateWords = ['hate', 'stupid', 'idiot', 'roberto'];

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
function showWarningTooltip(event, originalWord, fullContext) {
  // Don't show new tooltip if we're interacting with an existing one
  if (isTooltipActive) {
    return;
  }

  // Check if tooltip already exists and remove it
  const existingTooltip = document.querySelector('.murai-tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }

  const tooltip = document.createElement('div');
  tooltip.className = 'murai-tooltip murai-fade-in';
  
  // Mark tooltip as active when mouse enters
  tooltip.addEventListener('mouseenter', () => {
    isTooltipActive = true;
  });

  // Mark tooltip as inactive when mouse leaves
  tooltip.addEventListener('mouseleave', () => {
    isTooltipActive = false;
  });

  tooltip.innerHTML = `
    <div class="murai-tooltip-content">
      <p>⚠️ This word has been hidden because it may be inappropriate.</p>
      <p class="murai-context">${fullContext}</p>
      <button class="murai-view-btn">View Content</button>
      <div class="murai-loading-overlay">
        <div class="murai-spinner"></div>
        <p>Loading sensitive content...</p>
      </div>
    </div>
  `;
  
  // Position tooltip
  tooltip.style.position = 'fixed';
  tooltip.style.left = `${event.clientX + 10}px`;
  tooltip.style.top = `${event.clientY + 10}px`;
  
  // Add click handler for view button
  const viewBtn = tooltip.querySelector('.murai-view-btn');
  const contextP = tooltip.querySelector('.murai-context');
  const loadingOverlay = tooltip.querySelector('.murai-loading-overlay');

  viewBtn.onclick = (e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to view the potentially inappropriate content?')) {
      // Show loading state
      loadingOverlay.style.display = 'flex';
      viewBtn.style.display = 'none';
      
      // Simulate loading time
      setTimeout(() => {
        // Show the context with the word highlighted but keep asterisks in main text
        const censoredWord = '*'.repeat(originalWord.length);
        const revealedSpan = document.createElement('span');
        revealedSpan.className = 'murai-revealed murai-fade-in';
        revealedSpan.textContent = originalWord;
        revealedSpan.setAttribute('data-murai-revealed', 'true');
        
        contextP.innerHTML = contextP.innerHTML.replace(
          censoredWord,
          revealedSpan.outerHTML
        );
        loadingOverlay.style.display = 'none';
      }, 1000);
    }
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

// Function to replace hate words in text
function replaceHateWords(node) {
  let text = node.textContent;
  let modified = false;
  let originalWords = new Map();
  let contexts = new Map();
  
  hateWords.forEach(word => {
    const regex = new RegExp(word, 'gi'); // global and case-insensitive
    if (regex.test(text)) {
      // Store original words and their contexts before replacing
      text.match(regex).forEach(match => {
        originalWords.set(match, match);
        contexts.set(match, getContext(text, match));
      });
      text = text.replace(regex, getAsterisks(word));
      modified = true;
    }
  });

  if (modified) {
    const span = document.createElement('span');
    span.textContent = text;
    span.className = 'murai-censored';
    
    // Store original words and contexts as data attributes
    span.dataset.originalWords = JSON.stringify(Array.from(originalWords.entries()));
    span.dataset.contexts = JSON.stringify(Array.from(contexts.entries()));
    
    // Add hover and click handlers
    span.addEventListener('mouseover', () => {
      span.classList.add('murai-hover');
    });
    
    span.addEventListener('mouseout', () => {
      span.classList.remove('murai-hover');
    });
    
    // Modify the span event listener in replaceHateWords function
    span.addEventListener('mouseover', (e) => {
      if (!isTooltipActive) { // Only show tooltip if no active tooltip
        const words = JSON.parse(span.dataset.originalWords);
        const contexts = JSON.parse(span.dataset.contexts);
        showWarningTooltip(e, words[0][1], contexts[0][1]);
      }
    });
    
    node.parentNode.replaceChild(span, node);
    return true;
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

// Optimize the processTextNodes function
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
        const foundWords = checkForHateWords(node.textContent);
        if (foundWords.length > 0) {
          if (replaceHateWords(node)) {
            node.parentElement.setAttribute('data-murai-processed', 'true');
          }
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

// Initialize
addStyles();
initializeObserver();

// Update extension state listener
chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    if (changes.enabled.newValue) {
      processTextNodes();
    } else {
      document.querySelectorAll('[data-murai-processed]').forEach(el => {
        el.removeAttribute('data-murai-processed');
        // Restore original text if needed
        if (el.dataset.originalWords) {
          el.textContent = JSON.parse(el.dataset.originalWords)[0][1];
        }
      });
    }
  }
});