import { signatures } from './signatures';

interface Options {
    enabledCategories: Record<string, boolean>;
    showAffiliateLinks: boolean;
}

const DEFAULT_OPTIONS: Options = {
    enabledCategories: {
        'CMS': true,
        'E-Commerce': true,
        'Site Builder': true,
        'No-Code': true,
        'Analytics': true,
        'Data Platform': true,
        'Heatmaps': true,
        'Chat': true,
        'CRM / Chat': true,
        'Email Marketing': true,
        'Ads': true,
        'Framework': true,
        'Library': true,
        'Payments': true,
    },
    showAffiliateLinks: true,
};

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

        chrome.storage.sync.get({ sd_options: DEFAULT_OPTIONS }, ({ sd_options }) => {
            const opts: Options = (sd_options as Options) || DEFAULT_OPTIONS;

            signatures.forEach(sig => {
                const categoryEnabled = opts.enabledCategories?.[sig.category] ?? true;
                if (!categoryEnabled) return;

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
        });
    }
    // This return true is important for async sendResponse in some Chrome versions
    return true;
});
