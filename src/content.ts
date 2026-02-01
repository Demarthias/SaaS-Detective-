import { signatures } from './signatures';

interface Options {
    enabledCategories: Record<string, boolean>;
}

const DEFAULT_OPTIONS: Options = {
    enabledCategories: {
        'CMS': true,
        'E-Commerce': true,
        'Builder': true,
        'No-Code': true,
        'Analytics': true,
        'Data Platform': true,
        'Heatmap': true,
        'Session Replay': true,
        'Observability': true,
        'Error Tracking': true,
        'Chat': true,
        'CRM': true,
        'Marketing Auto': true,
        'Email': true,
        'Push Notifications': true,
        'Support': true,
        'Ads': true,
        'Native Ads': true,
        'Retargeting': true,
        'Framework': true,
        'Library': true,
        'CSS': true,
        'Payments': true,
        'CDN': true,
        'Storage': true,
        'Hosting': true,
        'Security': true,
        'Compliance': true,
        'Icons': true,
        'Fonts': true,
        'Comments': true,
    },
};

interface DetectedTool {
    name: string;
    category: string;
    link: string;
}

chrome.runtime.onMessage.addListener((request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    if (request.action === 'SCAN_PAGE') {
        const scripts = Array.from(document.getElementsByTagName('script'));
        const links = Array.from(document.getElementsByTagName('link'));
        const metas = Array.from(document.getElementsByTagName('meta'));
        const pageHTML = document.documentElement.outerHTML;
        
        const foundTools: DetectedTool[] = [];
        const seen = new Set<string>();

        chrome.storage.sync.get({ sd_options: DEFAULT_OPTIONS }, ({ sd_options }) => {
            const opts: Options = (sd_options as Options) || DEFAULT_OPTIONS;

            signatures.forEach(sig => {
                const categoryEnabled = opts.enabledCategories?.[sig.category] ?? true;
                if (!categoryEnabled) return;

                let match = false;

                // Check script src attributes
                match = scripts.some(script =>
                    script.src && sig.patterns.some(p => script.src.includes(p))
                );

                // Check inline script content
                if (!match) {
                    match = scripts.some(script =>
                        !script.src && script.textContent && 
                        sig.patterns.some(p => script.textContent!.includes(p))
                    );
                }

                // Check link hrefs (for stylesheets, preconnects, etc.)
                if (!match) {
                    match = links.some(link =>
                        link.href && sig.patterns.some(p => link.href.includes(p))
                    );
                }

                // Check meta tags (for generators, etc.)
                if (!match) {
                    match = metas.some(meta =>
                        (meta.content && sig.patterns.some(p => meta.content.includes(p))) ||
                        (meta.name && sig.patterns.some(p => meta.name.includes(p)))
                    );
                }

                // Check page HTML for patterns (last resort, more expensive)
                if (!match) {
                    match = sig.patterns.some(p => pageHTML.includes(p));
                }

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
        });
    }
    // This return true is important for async sendResponse in some Chrome versions
    return true;
});
