# SaaS Detective - Browser Extension

![SaaS Detective](icons/icon128.png)

**Instantly identify the tech stack powering any website.**

## Overview

SaaS Detective is a Chrome extension that instantly reveals the technologies, frameworks, and SaaS tools used to build any website. Click the extension icon, and within seconds, you'll see:

- 🔍 **26+ Tech Signatures** - Detect popular tools across multiple categories
- 🚀 **Frameworks & Libraries** - React, Vue, Next.js, jQuery, and more
- 💳 **Payment Processors** - Stripe, PayPal, and other payment solutions
- 📊 **Analytics Platforms** - Google Analytics, Mixpanel, Segment, Hotjar, and more
- 💬 **Communication Tools** - Intercom, Drift, HubSpot chat integrations
- 🎯 **Marketing Tools** - Mailchimp, Klaviyo, Meta Pixel, TikTok Pixel
- 🛒 **E-Commerce Platforms** - Shopify, Wix, Squarespace, Webflow, and more

## Features

✅ **Zero Data Collection** - All detection happens locally on your device  
✅ **No Tracking** - We don't track your browsing or collect personal information  
✅ **Instant Results** - Auto-scans when you open the popup  
✅ **Affiliate Links** - Visit tool websites directly from detected results  
✅ **Lightweight** - Only 3.7 KB of optimized code  
✅ **Open Source Ready** - Clean, maintainable TypeScript codebase  

## How It Works

1. **Navigate** to any website
2. **Click** the SaaS Detective icon
3. **View** the detected tech stack instantly
4. **Visit** any tool's official website using the provided links

The extension analyzes script tags and resource URLs loaded on the page to identify technologies. No data leaves your browser.

## Detected Tools

### Site Builders & CMS (7)
- WordPress
- Shopify
- Wix
- Squarespace
- Webflow
- Framer
- Bubble

### Analytics & Data (5)
- Google Analytics
- Segment
- Mixpanel
- Hotjar
- Microsoft Clarity

### Marketing & Chat (5)
- Intercom
- Drift
- HubSpot
- Mailchimp
- Klaviyo

### Ads & Tracking (3)
- Meta Pixel
- TikTok Pixel
- LinkedIn Insight

### Frameworks & Libraries (4)
- React
- Vue.js
- jQuery
- Next.js

### Payments (2)
- Stripe
- PayPal

## Privacy & Security

**We take privacy seriously:**
- ✅ No data collection or storage
- ✅ No external API calls
- ✅ No user tracking
- ✅ Local processing only
- ✅ No cookies injected
- ✅ No personal information access

See [privacy.html](privacy.html) for complete details.

## Permissions

| Permission | Purpose |
|-----------|---------|
| `activeTab` | Access the current website |
| `tabs` | Identify the active tab to send a scan request |
| `scripting` | Inject detection script into pages |
| `https://*/* and http://*/*` | Run on all websites |

## Development

Built with:
- **TypeScript** - Type-safe code
- **Webpack** - Bundling and optimization
- **Manifest V3** - Modern Chrome extension standard

### Build
```bash
npm install
npm run build
```

### Development Watch
```bash
npm run watch
```

## Support

For questions or issues:
- 📧 Email: gkube16@protonmail.com
- 🐛 Report bugs via Chrome Web Store

## License

Copyright © 2026 Venom Industries. All rights reserved.

## Affiliate Disclosure

SaaS Detective may include affiliate links to services we detect. Using these links helps support extension development. You are never required to use them, and they are clearly labeled.

---

Made with ❤️ by Venom Industries
