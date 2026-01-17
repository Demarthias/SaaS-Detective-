// SaaS-Detective Background Service Worker (Manifest V3)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if page load is complete and has a URL
  if (changeInfo.status === 'complete' && tab.url) {
    try {
      const url = new URL(tab.url);
      const domain = url.hostname;

      // Logic to detect common SaaS patterns
      // In the future, you can expand this list or call an API
      const saasKeywords = ['slack.com', 'zoom.us', 'atlassian.net', 'salesforce.com', 'hubspot.com'];
      
      const isSaaS = saasKeywords.some(keyword => domain.includes(keyword));

      if (isSaaS) {
        console.log("🔍 SaaS Detected by Venom Industries:", domain);
        // Save to local storage so the popup can show it
        chrome.storage.local.get({foundTools: []}, (result) => {
          const foundTools = result.foundTools;
          if (!foundTools.includes(domain)) {
            chrome.storage.local.set({foundTools: [...foundTools, domain]});
          }
        });
      }
    } catch (e) {
      // Ignore internal chrome:// or empty URLs
    }
  }
});
