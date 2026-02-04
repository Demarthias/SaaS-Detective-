# Chrome Web Store Submission Cheat Sheet (2026 Edition)

## 1. Single Purpose Description
> "SaaS Detective analyzes the current web page to identify and display the underlying technology stack (CMS, Frameworks, Analytics) for developer and competitive research."

## 2. Permissions Justification
| Permission | Justification |
| :--- | :--- |
| **tabs** | "Used to identify the active tab the user chooses to scan and to open links the user clicks from the popup." |
| **storage** | "Used to persist user preferences (e.g. category filters) in Chrome sync storage." |
| **host permissions (http/https)** | "Required for the detection script to read page markup only on sites the user chooses to scan." |

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
