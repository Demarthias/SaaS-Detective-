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

;// ./src/affiliateMap.ts
const AFFILIATE_LINKS = {
    // E-Commerce
    "Shopify": "https://www.shopify.com/?ref=venom-industries",
    "WooCommerce": "https://woocommerce.com/",
    "BigCommerce": "https://www.bigcommerce.com/",
    // Hosting
    "DigitalOcean": "https://m.do.co/c/venom-referral",
    "Vercel": "https://vercel.com",
    "Cloudflare": "https://www.cloudflare.com/",
    // Marketing
    "HubSpot": "https://hubspot.sjv.io/venom",
    "Mailchimp": "https://mailchimp.com/",
    "ActiveCampaign": "https://www.activecampaign.com/",
    // Add your other MaxBounty links here matching the exact "name" from signatures.ts
};
const hasAffiliateLink = (techName) => {
    return !!AFFILIATE_LINKS[techName];
};

;// ./src/openLink.ts

const openAffiliateLink = (key) => {
    const url = AFFILIATE_LINKS[key];
    if (url) {
        window.open(url, '_blank');
    }
};
// Backwards-compatible alias
const openLink = (/* unused pure expression or super */ null && (openAffiliateLink));

;// ./src/popup.ts



// Helper: Group by Category
const groupByCategory = (techs) => {
    return techs.reduce((acc, tech) => {
        if (!acc[tech.category])
            acc[tech.category] = [];
        acc[tech.category].push(tech);
        return acc;
    }, {});
};
// --- THE OMNISCIENT PROBE ---
// Runs inside the web page (World: MAIN)
function probePage(signatureList) {
    const findings = [];
    const html = document.documentElement.outerHTML.toLowerCase();
    // 1. GET ALL NETWORK RESOURCES (The "God Mode" Check)
    // This finds scripts that were downloaded, even if they aren't in the HTML.
    const resources = performance.getEntriesByType('resource').map(r => r.name.toLowerCase());
    const resourceString = resources.join(' '); // Combine into one big string for fast searching
    // 2. SCANNING LOGIC
    signatureList.forEach((sig) => {
        let found = false;
        // Check A: Global Variables (Window Objects)
        if (sig.globalVar) {
            sig.globalVar.forEach((v) => {
                // @ts-ignore
                if (window[v] !== undefined || (v.includes('.') && v.split('.').reduce((o, i) => o ? o[i] : undefined, window)))
                    found = true;
            });
        }
        // Check B: Network Resources (The new "God Mode" check)
        if (!found && sig.patterns) {
            sig.patterns.forEach((p) => {
                const pat = p.toLowerCase();
                if (resourceString.includes(pat))
                    found = true;
            });
        }
        // Check C: HTML Source (Backup for meta tags etc)
        if (!found && sig.patterns) {
            sig.patterns.forEach((p) => {
                if (html.includes(p.toLowerCase()))
                    found = true;
            });
        }
        if (found)
            findings.push(sig);
    });
    // 3. HEURISTIC SCAN (Meta Generators)
    const metas = document.querySelectorAll('meta[name="generator"]');
    metas.forEach((meta) => {
        const content = meta.content || "";
        if (content) {
            findings.push({
                id: "heuristic_" + content.replace(/\s/g, '_').toLowerCase(),
                name: content,
                category: "CMS (Detected)",
                patterns: []
            });
        }
    });
    // 4. COMMON FRAMEWORK GUESSING
    // @ts-ignore
    if (window.__NEXT_DATA__)
        findings.push({ id: "nextjs", name: "Next.js", category: "Framework", patterns: [] });
    // @ts-ignore
    if (window.__NUXT__)
        findings.push({ id: "nuxtjs", name: "Nuxt.js", category: "Framework", patterns: [] });
    // @ts-ignore
    if (window.Shopify)
        findings.push({ id: "shopify_var", name: "Shopify", category: "E-Commerce", patterns: [] });
    // Deduplicate results
    const unique = new Map();
    findings.forEach(item => unique.set(item.name, item));
    return Array.from(unique.values());
}
const detectTechnologies = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id)
        return [];
    try {
        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            world: "MAIN",
            func: probePage,
            args: [signatures]
        });
        return results[0]?.result || [];
    }
    catch (err) {
        console.error("Detection failed:", err);
        return [];
    }
};
const render = async () => {
    const container = document.getElementById('results-container');
    if (!container)
        return;
    container.innerHTML = '<div class="loading">Deep scanning network assets...</div>';
    // Slight delay to allow scripts to initialize if the user opened popup instantly
    setTimeout(async () => {
        const detectedTechs = await detectTechnologies();
        container.innerHTML = '';
        if (detectedTechs.length === 0) {
            container.innerHTML = `
                <div class="loading">
                    No stack detected.
                    <br><br>
                    <small>Try refreshing the page.</small>
                </div>`;
            return;
        }
        const grouped = groupByCategory(detectedTechs);
        Object.keys(grouped).forEach(category => {
            const catHeader = document.createElement('div');
            catHeader.className = 'category-header';
            catHeader.innerText = category;
            container.appendChild(catHeader);
            grouped[category].forEach(tech => {
                const item = document.createElement('div');
                item.className = 'tech-item';
                const nameSpan = document.createElement('span');
                nameSpan.className = 'tech-name';
                nameSpan.innerText = tech.name;
                item.appendChild(nameSpan);
                // Check affiliate link (using first word to match generic keys if needed)
                const lookupKey = tech.name.split(' ')[0]; // "Shopify" from "Shopify (Detected)"
                if (hasAffiliateLink(tech.name) || hasAffiliateLink(lookupKey)) {
                    const btn = document.createElement('button');
                    btn.className = 'deal-btn';
                    btn.innerText = 'Get Deal';
                    btn.onclick = () => openAffiliateLink(hasAffiliateLink(tech.name) ? tech.name : lookupKey);
                    item.appendChild(btn);
                }
                container.appendChild(item);
            });
        });
    }, 100); // 100ms buffer
};
document.addEventListener('DOMContentLoaded', render);

/******/ })()
;