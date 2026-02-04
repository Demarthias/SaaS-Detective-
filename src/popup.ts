import { signatures, SaasSignature } from './signatures';
import { hasAffiliateLink } from './affiliateMap';
import { openAffiliateLink } from './openLink';

// Helper: Group by Category
const groupByCategory = (techs: SaasSignature[]) => {
    return techs.reduce((acc, tech) => {
        if (!acc[tech.category]) acc[tech.category] = [];
        acc[tech.category].push(tech);
        return acc;
    }, {} as Record<string, SaasSignature[]>);
};

// --- THE OMNISCIENT PROBE ---
// Runs inside the web page (World: MAIN)
function probePage(signatureList: any[]) {
    const findings: any[] = [];
    const html = document.documentElement.outerHTML.toLowerCase();
    
    // 1. GET ALL NETWORK RESOURCES (The "God Mode" Check)
    // This finds scripts that were downloaded, even if they aren't in the HTML.
    const resources = performance.getEntriesByType('resource').map(r => r.name.toLowerCase());
    const resourceString = resources.join(' '); // Combine into one big string for fast searching

    // 2. SCANNING LOGIC
    signatureList.forEach((sig: any) => {
        let found = false;

        // Check A: Global Variables (Window Objects)
        if (sig.globalVar) {
            sig.globalVar.forEach((v: string) => {
                // @ts-ignore
                if (window[v] !== undefined || (v.includes('.') && v.split('.').reduce((o,i)=>o?o[i]:undefined, window))) found = true;
            });
        }

        // Check B: Network Resources (The new "God Mode" check)
        if (!found && sig.patterns) {
            sig.patterns.forEach((p: string) => {
                const pat = p.toLowerCase();
                if (resourceString.includes(pat)) found = true;
            });
        }

        // Check C: HTML Source (Backup for meta tags etc)
        if (!found && sig.patterns) {
            sig.patterns.forEach((p: string) => {
                if (html.includes(p.toLowerCase())) found = true;
            });
        }

        if (found) findings.push(sig);
    });

    // 3. HEURISTIC SCAN (Meta Generators)
    const metas = document.querySelectorAll('meta[name="generator"]');
    metas.forEach((meta: any) => {
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
    if (window.__NEXT_DATA__) findings.push({ id: "nextjs", name: "Next.js", category: "Framework", patterns: [] });
    // @ts-ignore
    if (window.__NUXT__) findings.push({ id: "nuxtjs", name: "Nuxt.js", category: "Framework", patterns: [] });
    // @ts-ignore
    if (window.Shopify) findings.push({ id: "shopify_var", name: "Shopify", category: "E-Commerce", patterns: [] });

    // Deduplicate results
    const unique = new Map();
    findings.forEach(item => unique.set(item.name, item));
    return Array.from(unique.values());
}

const detectTechnologies = async (): Promise<SaasSignature[]> => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return [];

    try {
        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            world: "MAIN", 
            func: probePage,
            args: [signatures]
        });

        return results[0]?.result || [];

    } catch (err) {
        console.error("Detection failed:", err);
        return [];
    }
};

const render = async () => {
    const container = document.getElementById('results-container');
    if (!container) return;

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
