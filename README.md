# SaaS Detective

Instantly identify the tech stack powering any website.

SaaS Detective is a Chrome extension that reveals the technologies, frameworks, and SaaS tools used to build any website. Click the extension icon and you will see a categorized snapshot of detected tools.

## Features

- Detects 92 tech signatures across analytics, ads, CRM, payments, hosting, and more
- Instant results with auto-scan on popup open
- Zero data collection and no tracking
- Local-only processing with no external API calls
- Direct visit links for each detected tool
- Clean, lightweight TypeScript codebase

## How It Works

1. Navigate to any website
2. Click the SaaS Detective icon
3. View detected technologies instantly
4. Open official tool pages with the Visit button

Detection checks scripts, links, meta tags, and page HTML for known signatures. No data leaves your browser.

## Detected Categories (Examples)

- Analytics & Data: Google Analytics, Mixpanel, Segment, Amplitude
- Ads & Pixels: Meta Pixel, TikTok Pixel, Google Ads
- Marketing & CRM: HubSpot, Salesforce, Marketo
- Chat & Support: Intercom, Zendesk, Freshchat
- E-Commerce & Payments: Shopify, Stripe, PayPal
- Frameworks & Libraries: React, Vue, Angular, Svelte
- Hosting & Infrastructure: Cloudflare, Netlify, Vercel
- Security & Compliance: reCAPTCHA, OneTrust, Cookiebot

## Privacy & Security

- No data collection or storage
- No user tracking
- Local processing only
- No cookies injected

See privacy.html for full details.

## Permissions

- tabs: identify the active tab to scan
- storage: save category preferences
- https://*/* and http://*/*: allow detection on all websites

## Development

Built with TypeScript, Webpack, and Manifest V3.

- Install: npm install
- Build: npm run build
- Watch: npm run watch

## Support

Email: gkube16@protonmail.com

## Affiliate Disclosure

SaaS Detective may include affiliate links to services we detect. Using these links helps support development. You are never required to use them, and they are clearly labeled.

## License

Copyright © 2026 Venom Industries. All rights reserved.
