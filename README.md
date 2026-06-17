🚨 Rapid Crisis Response (RCR)
Accelerated Emergency Response & Crisis Coordination Platform
📌 Project Overview
Rapid Crisis Response (RCR) is a minimalistic, resilient, and ultra-accessible full-stack emergency response system designed to streamline communication and rescue coordination during natural disasters (such as flash floods).

Built as a high-fidelity prototype for the Google Developer Group (GDG) Hackathon, the application balances high-stakes data reliability with an interface specialized for extreme conditions—low internet speeds, high-stress usage, and elderly/vulnerable accessibility.

🌐 Live Production Link: https://crisishelp.lovable.app/

🌟 Core Pillars & Technical Architecture
1. Minimalistic & High-Stress UI Design
 -> Accessibility-First: Engineered with high-contrast, bold layouts, and extra-large targets tailored for shaky hands, rainy conditions, or visually impaired elderly citizens.

 -> Resilient Assets: Zero micro-animations or graphic-heavy overheads, maximizing loading performance on throttled 2G/3G mobile networks in disaster clusters.

 -> Calm Palette: Anchored around solid whites, deep secure blues, and highly readable crimson red alert indicators.

2. Google Gemini AI Integration (Crisis AI Assistant)
 -> Real-Time Offline Triage: Actively assists frantic users by parsing inputs like "I'm trapped on the roof with rising waters, what do I do?" into step-by-step, calm survival protocols.

 -> Forms Automation: Uses LLM intent extraction to parse raw voice/text chats and auto-fill complex emergency SOS requests in the background.

 -> Dual-Language Native Support: Seamless inline execution offering translations and localized emergency instructions across English and Tamil.

3. Production-Grade Enterprise Security
 -> Data Sanitization: Implements complete input screening to aggressively prevent XSS and parameterized Prisma constraints to mitigate SQL Injections.

 -> Malware-Safe Ingestion: Strict cryptographic limits on multipart file uploads (image/video proof) with an outright ban on executable binaries.

 -> Access Containment: Explicit Role-Based Access Control (RBAC) shielding the real-time Admin Command Center and audit trail logs.

📁 System Architecture & Directory Layout
```text
├── apps/web (Next.js App Router Workspace)
│   ├── src/
│   │   ├── app/                      # Main view controllers (Home, Get Help, AI Assistant, etc.)
│   │   ├── components/ui/            # Reusable UI library (Panic Buttons, Accessibility Cards)
│   │   ├── hooks/                    # Live GPS tracking, Geolocation APIs
│   │   └── lib/                      # Official Google Gemini SDK Initializer
│   └── public/                       # PWA manifest, service workers (offline storage layer)
├── prisma/
│   └── schema.prisma                 # Multi-table physical relational layout
└── server/
    └── api/                          # Sanitized Node.js endpoints (Rate-Limited)
```
🗄️ Relational Database Layout (SQL Schema)
 The architecture maps directly to an analytical/operational relational structure built over Prisma ORM:
 | Table Model | Primary Responsibility | Critical Data Parameters |
| :--- | :--- | :--- |
| **Users** | Core Identity Ledger | Identity Hash, Auth Provider (Google/OTP Token), Mobile Node |
| **RescueRequests** | Real-Time SOS Core | Latitude/Longitude Float, Water Level Severity (1-5), Multimedia Asset Link |
| **Shelters** | Active Safehouses | Volumetric Capacity counter, Current Occupancy Index, Utilities Flag |
| **Donations** | Material/Fiscal Supply | Cargo Type (Food/Water/Funds), Ledger Tracking Status |
| **MissingPersons** | Critical Tracking Index | Target Demographics, Last Seen Spatial Coords, Resolution State |
| **Alerts** | Verified Local Feeds | Threat Matrix Vector, Broadcast Anchor, Administrative Verification |
| **AIChatLogs** | AI Auditing Engine | Chat Context Prompt, Intent Token Metric, System Security Flags |
| **Admins** | Root Operations Management | Cryptographic Bcrypt Strings, Explicit Access Token Scope |
