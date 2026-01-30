// SaaS-Detective Background Service Worker (Manifest V3)

// Open onboarding page on first install
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: chrome.runtime.getURL('onboarding.html') });
  }
});

// Future enhancements:
// - Caching detection results
// - Batch processing multiple tabs
// - Analytics and logging
