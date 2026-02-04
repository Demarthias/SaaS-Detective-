/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/signatures.ts
const signatures = [
    // --- AMAZON & CUSTOM STACKS ---
    {
        id: "amazon_ui",
        name: "Amazon UI",
        category: "Custom Stack",
        patterns: ["images-na.ssl-images-amazon.com", "m.media-amazon.com"],
        globalVar: ["ue", "P", "AmazonUIPageJS"]
    },
    {
        id: "jquery",
        name: "jQuery",
        category: "Library",
        patterns: ["jquery.com", "jquery.min.js"],
        globalVar: ["jQuery", "$"]
    },
    // --- E-COMMERCE ---
    {
        id: "shopify",
        name: "Shopify",
        category: "E-Commerce",
        patterns: ["cdn.shopify.com", "shopify.com"],
        globalVar: ["Shopify"]
    },
    {
        id: "woocommerce",
        name: "WooCommerce",
        category: "E-Commerce",
        patterns: ["woocommerce", "wc-ajax"],
        globalVar: ["wc_add_to_cart_params", "woocommerce_params"]
    },
    {
        id: "bigcommerce",
        name: "BigCommerce",
        category: "E-Commerce",
        patterns: ["cdn11.bigcommerce.com"],
        globalVar: ["BCData", "BigCommerce"]
    },
    {
        id: "magento",
        name: "Magento",
        category: "E-Commerce",
        patterns: ["/static/version", "mage/cookies"],
        globalVar: ["Mage"]
    },
    // --- ANALYTICS ---
    {
        id: "ga",
        name: "Google Analytics",
        category: "Analytics",
        patterns: ["google-analytics.com", "ga.js", "analytics.js"],
        globalVar: ["ga", "GoogleAnalyticsObject"]
    },
    {
        id: "gtm",
        name: "Google Tag Manager",
        category: "Analytics",
        patterns: ["googletagmanager.com"],
        globalVar: ["google_tag_manager"]
    },
    {
        id: "segment",
        name: "Segment",
        category: "Data Platform",
        patterns: ["cdn.segment.com", "segment.io"],
        globalVar: ["analytics"]
    },
    {
        id: "fbpixel",
        name: "Meta Pixel",
        category: "Ads",
        patterns: ["connect.facebook.net"],
        globalVar: ["fbq"]
    },
    // --- FRAMEWORKS ---
    {
        id: "react",
        name: "React",
        category: "Framework",
        patterns: ["react.production.min.js"],
        globalVar: ["React", "_reactRootContainer", "__REACT_DEVTOOLS_GLOBAL_HOOK__"]
    },
    {
        id: "vue",
        name: "Vue.js",
        category: "Framework",
        patterns: ["vue.js", "vue.min.js"],
        globalVar: ["Vue"]
    },
    {
        id: "nextjs",
        name: "Next.js",
        category: "Framework",
        patterns: ["/_next/static"],
        globalVar: ["__NEXT_DATA__"]
    },
    {
        id: "nuxt",
        name: "Nuxt.js",
        category: "Framework",
        patterns: ["/_nuxt/"],
        globalVar: ["__NUXT__"]
    },
    // --- PAYMENTS & OTHERS ---
    {
        id: "stripe",
        name: "Stripe",
        category: "Payments",
        patterns: ["js.stripe.com"],
        globalVar: ["Stripe"]
    },
    {
        id: "hubspot",
        name: "HubSpot",
        category: "CRM",
        patterns: ["js.hs-scripts.com"],
        globalVar: ["_hsq"]
    }
];

;// ./src/content.ts

const DEFAULT_OPTIONS = {
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
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'SCAN_PAGE') {
        const scripts = Array.from(document.getElementsByTagName('script'));
        const links = Array.from(document.getElementsByTagName('link'));
        const metas = Array.from(document.getElementsByTagName('meta'));
        const pageHTML = document.documentElement.outerHTML;
        const foundTools = [];
        const seen = new Set();
        chrome.storage.sync.get({ sd_options: DEFAULT_OPTIONS }, ({ sd_options }) => {
            const opts = sd_options || DEFAULT_OPTIONS;
            signatures.forEach(sig => {
                const categoryEnabled = opts.enabledCategories?.[sig.category] ?? true;
                if (!categoryEnabled)
                    return;
                let match = false;
                // Check script src attributes
                match = scripts.some(script => script.src && sig.patterns.some(p => script.src.includes(p)));
                // Check inline script content
                if (!match) {
                    match = scripts.some(script => !script.src && script.textContent &&
                        sig.patterns.some(p => script.textContent.includes(p)));
                }
                // Check link hrefs (for stylesheets, preconnects, etc.)
                if (!match) {
                    match = links.some(link => link.href && sig.patterns.some(p => link.href.includes(p)));
                }
                // Check meta tags (for generators, etc.)
                if (!match) {
                    match = metas.some(meta => (meta.content && sig.patterns.some(p => meta.content.includes(p))) ||
                        (meta.name && sig.patterns.some(p => meta.name.includes(p))));
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

/******/ })()
;