# Chrome Web Store Submission Cheat Sheet (2026 Edition)

## 1. Single Purpose Description
> "SaaS Detective analyzes the current web page to identify and display the underlying technology stack (CMS, Frameworks, Analytics) for developer and competitive research."

## 2. Permissions Justification
| Permission | Justification |
| :--- | :--- |
| **activeTab** | "Required to access the DOM of the currently active website to detect technology signatures (e.g. Shopify variables, React roots) only when the user triggers the extension." |
| **scripting** | "Used to inject a lightweight detection script into the page context to identify JavaScript libraries that are not visible in the HTML source." |
| **storage** | "Used to persist user preferences (e.g. theme settings) and cache detection rules locally." |

## 3. Remote Code Policy
* **Does this extension use remote code?** -> **NO**
* **Justification:** "All detection logic and signatures are bundled within the extension package. No scripts are fetched from external servers."

## 4. Data Usage (Privacy Tab)
* **Checkboxes:** Check **NO** for "Does this extension collect user data?"
* **Why?** You are not sending data to a server. Local storage does not count as "collection" in this context unless you sync it.

## 5. Affiliate Disclosure
* **Where to put it:**
    1. Store Description (At the bottom).
    2. In the Popup (Small "i" icon).
    3. Onboarding Page (First run).
