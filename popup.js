<<<<<<< HEAD
// Auto-scan when popup opens
async function scanCurrentPage() {
    const resultsDiv = document.getElementById('results');
    
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        if (!tab) {
            resultsDiv.innerHTML = '<p style="color: red;">Error: No active tab found.</p>';
            return;
        }

        chrome.tabs.sendMessage(tab.id, { action: "SCAN_PAGE" }, (response) => {
            if (chrome.runtime.lastError) {
                resultsDiv.innerHTML = '<p style="color: red;">Error: Could not scan this page. Try reloading it.</p>';
                return;
            }
            
            if (!response || !Array.isArray(response.tools)) {
                resultsDiv.innerHTML = '<p style="color: red;">Error: Invalid response from page.</p>';
                return;
            }

            if (response.tools.length === 0) {
                resultsDiv.innerHTML = '<p>No tech stack detected.</p>';
                return;
            }

            resultsDiv.innerHTML = '';
            response.tools.forEach(tool => {
                const div = document.createElement('div');
                div.className = 'tool';
                let html = `<strong>${tool.name}</strong> <span class="category">(${tool.category})</span>`;
                if (tool.link && tool.link !== '#') {
                    html += ` <a href="${tool.link}" target="_blank" style="margin-left: 8px; padding: 4px 8px; background: #28a745; color: white; text-decoration: none; border-radius: 3px; font-size: 12px; cursor: pointer;">Visit</a>`;
                }
                div.innerHTML = html;
                resultsDiv.appendChild(div);
            });
        });
    } catch (e) {
        resultsDiv.innerHTML = '<p style="color: red;">Error: ' + e.message + '</p>';
    }
}

// Start scan immediately when popup loads
scanCurrentPage();
=======
const DEFAULT_LINKS = {
  "shop": { label: "E-Commerce", tool: "Shopify", link: "https://www.shopify.com" },
  "cms": { label: "Site Builder", tool: "WordPress", link: "https://www.wordpress.com" },
  "analytics": { label: "Analytics", tool: "HubSpot", link: "https://www.hubspot.com" },
  "hosting": { label: "Hosting", tool: "DigitalOcean", link: "https://www.digitalocean.com" }
};

const API_KEY = '0dfe4632-22e5-4528-8d97-9788899595ab';

async function getTechStack() {
  const resultsDiv = document.getElementById('results');
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (!tab?.url || tab.url.startsWith('chrome://')) {
      resultsDiv.innerHTML = '<div class="loader">Open a website to scan.</div>';
      return;
  }
  
  const url = new URL(tab.url).hostname;
  resultsDiv.innerHTML = '<div class="loader">Scanning ' + url + '...</div>';

  try {
    const response = await fetch(`https://api.builtwith.com/free1/api.json?KEY=${API_KEY}&LOOKUP=${url}`);
    const data = await response.json();
    
    resultsDiv.innerHTML = '';
    let foundAny = false;

    if (data.groups) {
      data.groups.forEach(group => {
        const match = DEFAULT_LINKS[group.name.toLowerCase()];
        if (match && group.live > 0) {
          foundAny = true;
          const div = document.createElement('div');
          div.className = 'tool-item';
          div.innerHTML = `
            <div style="display: flex; flex-direction: column;">
              <span style="font-size: 10px; color: #3b82f6; font-weight: bold; text-transform: uppercase;">${match.label}</span>
              <span class="tool-name" style="font-size: 14px; color: #1f2937; font-weight:600;">${match.tool}</span>
            </div>
            <button class="use-tool-btn" data-url="${match.link}">Use This Tool</button>
          `;
          resultsDiv.appendChild(div);
        }
      });

      document.querySelectorAll('.use-tool-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          chrome.tabs.create({ url: e.target.getAttribute('data-url') });
        });
      });
    }

    if (!foundAny) {
      resultsDiv.innerHTML = '<div class="loader">No builder tools detected.</div>';
    }
  } catch (error) {
    resultsDiv.innerHTML = '<div class="loader" style="color:red;">API Connection Error.</div>';
  }
}
getTechStack();
>>>>>>> 14e94064723019a8e457faa08ac33148bcc11ce6
