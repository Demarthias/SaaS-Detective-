export interface SaasSignature {
    id: string;
    name: string;
    category: string;
    affiliateLink?: string;
    patterns: string[];
    globalVar?: string[]; 
}

export const signatures: SaasSignature[] = [
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
