# SWE-relay-webapp

### 1. Ignore/do not edit 
- node_modules
- .gitignore
- tsconfig.json

### 2. Create a .env.local in /relay-app root dir to store your API and DB keys

## How to navigate file structure: 
### Web App architecture layout & description
___
```text
SWE-project-root/
├── relay-app/   
│ |── src/app/           ← Next.js App Router (page routes & API routes)
│         |   ├── page.tsx
│         |   ├── layout.tsx
│         |   └─── globals.css
│         ├── dashboard/
│         │   └── page.tsx
│         ├── api/
│         ├── transcribe/
│         |   ├──page.tsx
│         │    └──session/
│         |       └──page.tsx
│ 
├── public/               ← All image files and artifacts stored here (e.g. .png, .jpg, .svg)
├── components/           ← Reusable UI components
│   ├── Header.tsx
│   ├── AuthWindow.tsx
│   └── RequestCard.tsx
├── lib/                  ← Utility functions & configurations
│   ├── auth.ts
│   ├── assemblyai.ts
│   └── payments.ts
├── next.config.ts        ← config file (keep this)
├── package.json
└── tsconfig.json
```
___

### Next.js follows a component-based architecture rather than MVC:

Components = UI building blocks (Header, RequestCard, TranscriptionTool)

Pages/Routes = Application screens (app/page.tsx, app/dashboard/page.tsx)

API Routes = The backend logic (app/api/transcription/route.ts, app/api/payments/route.ts)

Server Actions = Direct server functions callable from components

State Management = Client-side data handling (React hooks, external libraries)
___
```text
How It Differs from MVC

Traditional MVC:
Model ↔ Controller ↔ View

Next.js Architecture Pattern:
Components ↔ Server Actions/API Routes ↔ Database/External APIs
    ↕
Client State ↔ Server State
```