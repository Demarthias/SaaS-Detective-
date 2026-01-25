import { signatures } from './signatures';

interface DetectedTool {
    name: string;
    category: string;
    link: string;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'SCAN_PAGE') {
        const scripts = Array.from(document.getElementsByTagName('script'));
        const foundTools: DetectedTool[] = [];
        const seen = new Set<string>();

        signatures.forEach(sig => {
            const match = scripts.some(script => 
                script.src && sig.patterns.some(p => script.src.includes(p))
            );

            if (match && !seen.has(sig.id)) {
                foundTools.push({ 
                    name: sig.name, 
                    category: sig.category, 
                    link: sig.affiliateLink || '#' 
                });
                seen.add(sig.id);
            }
        });

        sendResponse({ tools: foundTools });
    }
    // This return true is important for async sendResponse in some Chrome versions
    return true;
});
