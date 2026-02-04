export const AFFILIATE_LINKS: Record<string, string> = {
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

export const hasAffiliateLink = (techName: string): boolean => {
    return !!AFFILIATE_LINKS[techName];
};
