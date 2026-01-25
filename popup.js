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
