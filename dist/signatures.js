"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatures = void 0;
exports.signatures = [
    // --- SITE BUILDERS (CMS) ---
    { id: "wordpress", name: "WordPress", category: "CMS", patterns: ["wp-content", "wp-includes"] },
    { id: "shopify", name: "Shopify", category: "E-Commerce", affiliateLink: "https://www.shopify.com", patterns: ["cdn.shopify.com", "shopify.com"] },
    { id: "wix", name: "Wix", category: "Site Builder", patterns: ["wix.com", "wix-code"] },
    { id: "squarespace", name: "Squarespace", category: "Site Builder", patterns: ["squarespace.com", "static.squarespace"] },
    { id: "webflow", name: "Webflow", category: "Site Builder", patterns: ["webflow.com", "webflow.js"] },
    { id: "framer", name: "Framer", category: "Site Builder", patterns: ["framer.com", "framerusercontent"] },
    { id: "bubble", name: "Bubble", category: "No-Code", patterns: ["bubble.io", "cloudfront.net/bubble"] },
    // --- ANALYTICS ---
    { id: "google_analytics", name: "Google Analytics", category: "Analytics", patterns: ["google-analytics.com", "googletagmanager.com"] },
    { id: "segment", name: "Segment", category: "Data Platform", patterns: ["cdn.segment.com", "analytics.js"] },
    { id: "mixpanel", name: "Mixpanel", category: "Analytics", patterns: ["cdn.mxpnl.com", "mixpanel.com"] },
    { id: "hotjar", name: "Hotjar", category: "Heatmaps", patterns: ["static.hotjar.com"] },
    { id: "clarity", name: "Microsoft Clarity", category: "Heatmaps", patterns: ["www.clarity.ms"] },
    // --- MARKETING & CHAT ---
    { id: "intercom", name: "Intercom", category: "Chat", patterns: ["widget.intercom.io"] },
    { id: "drift", name: "Drift", category: "Chat", patterns: ["js.drift.com"] },
    { id: "hubspot", name: "HubSpot", category: "CRM / Chat", patterns: ["js.hs-scripts.com", "js.hs-analytics.net"] },
    { id: "mailchimp", name: "Mailchimp", category: "Email Marketing", patterns: ["chimpstatic.com", "mailchimp.com"] },
    { id: "klaviyo", name: "Klaviyo", category: "Email Marketing", patterns: ["static.klaviyo.com"] },
    // --- ADS ---
    { id: "facebook_pixel", name: "Meta Pixel", category: "Ads", patterns: ["connect.facebook.net"] },
    { id: "tiktok_pixel", name: "TikTok Pixel", category: "Ads", patterns: ["analytics.tiktok.com"] },
    { id: "linkedin_insight", name: "LinkedIn Insight", category: "Ads", patterns: ["snap.licdn.com"] },
    // --- FRAMEWORKS (For Devs) ---
    { id: "react", name: "React", category: "Framework", patterns: ["react.production.min.js", "react-dom"] },
    { id: "vue", name: "Vue.js", category: "Framework", patterns: ["vue.js", "vue.min.js"] },
    { id: "jquery", name: "jQuery", category: "Library", patterns: ["jquery.com", "jquery.min.js"] },
    { id: "nextjs", name: "Next.js", category: "Framework", patterns: ["_next/static"] },
    // --- PAYMENTS ---
    { id: "stripe", name: "Stripe", category: "Payments", patterns: ["js.stripe.com", "m.stripe.network"] },
    { id: "paypal", name: "PayPal", category: "Payments", patterns: ["paypal.com/sdk", "paypalobjects.com"] }
];
