import { affiliateMap } from '../config/affiliateMap';
import { API_CONFIG } from '../config/apiConfig';

/**
 * SaaS-Detective Core Detection Engine
 * Manifest V3 Compliant | Powered by Venom Industries
 */

const detectTechStack = async () => {
    const currentUrl = window.location.hostname;
    const apiUrl = `https://api.builtwith.com/v2/api.json?key=${API_CONFIG.BUILTWITH_KEY}&LOOKUP=${currentUrl}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.Results && data.Results[0].Result.Paths) {
            const technologies = data.Results[0].Result.Paths[0].Technologies;
            
            technologies.forEach((tech: any) => {
                const techKey = tech.Name.toLowerCase();
                const match = affiliateMap[techKey as keyof typeof affiliateMap];
                
                if (match) {
                    console.log(`[SaaS-Detective] Detected: ${match.name} | Referral: ${match.url}`);
                    // Logic to inject UI or update popup goes here
                }
            });
        }
    } catch (error) {
        console.error('[SaaS-Detective] Detection Error:', error);
    }
};

// Initial scan
detectTechStack();
