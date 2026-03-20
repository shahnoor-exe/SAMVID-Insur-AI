# SAMVID Insur AI

AI-powered parametric income protection platform prototype for Swiggy/Zomato delivery workers in India.

Project by: Code_Wrappers

## Demo Highlights

- Eye-catching animated landing page with live event pulse ticker
- Worker module: onboarding, dashboard, policy, claims
- Admin module: insurer analytics dashboard
- API routes for premium, triggers, claims, fraud, alerts
- Mock integration services for weather, AQI, civic alerts, IMD forecast, and UPI payout
- ML microservice scaffold using FastAPI

## Complete Architecture

```text
samvid-insurai/
├── src/
│   ├── app/
│   │   ├── (worker)/
│   │   │   ├── onboarding/
│   │   │   ├── dashboard/
│   │   │   ├── policy/
│   │   │   └── claims/
│   │   ├── (admin)/
│   │   │   └── admin/dashboard/
│   │   ├── api/
│   │   │   ├── worker/
│   │   │   ├── premium/
│   │   │   ├── triggers/
│   │   │   ├── claims/
│   │   │   ├── fraud/
│   │   │   └── alerts/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── worker/
│   │   ├── admin/
│   │   └── shared/
│   └── lib/
│       ├── constants.ts
│       ├── types.ts
│       ├── supabase.ts
│       ├── premium-engine.ts
│       ├── trigger-engine.ts
│       ├── fraud-engine.ts
│       └── mock-apis.ts
├── ml-service/
│   ├── main.py
│   ├── models/
│   │   ├── premium_model.py
│   │   └── fraud_model.py
│   └── data/
│       └── mock_zone_data.json
├── .env.local
├── vercel.json
└── README.md
```

## Tech Stack

### Demo Version (Current Working Prototype)

- Frontend: Next.js App Router + TypeScript + Tailwind CSS
- Backend: Next.js API Routes
- Data Layer: Typed mock services and in-memory responses
- UX: Animated gradient visuals, interactive data pulse, responsive dashboard pages

### Full Product Version (Planned Production Stack)

- Frontend: Next.js 14 + TypeScript + Tailwind CSS + Shadcn UI
- Backend: Next.js API Routes (serverless)
- Database: Supabase (PostgreSQL + Auth)
- ML: Python FastAPI microservice (XGBoost + Isolation Forest)
- APIs: OpenWeatherMap (free), CPCB AQI mock, Razorpay sandbox
- Deploy: Vercel (frontend) + Render (ML service)

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## API Endpoints

- `/api/worker`
- `/api/premium`
- `/api/triggers`
- `/api/claims`
- `/api/fraud`
- `/api/alerts`
