# Personal Website

A personal portfolio website with a NASA Explorer project and a Late Delivery Prediction ML Pipeline app.

## Project Structure

```
.
├── backend/          # (Optional) Python FastAPI backend service - not required for frontend
├── infra/            # Terraform for static site + ML pipeline hosting
├── scripts/          # Deployment scripts
└── frontend/         # React + TypeScript frontend
    └── src/
        ├── pages/    # Page components
        └── components/
```

## Setup Instructions

### Frontend Setup (No Backend Required!)

The frontend calls NASA and Wikipedia APIs directly from the browser. No backend server is needed!

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create a `.env` file in the frontend directory to use your own NASA API key:
```bash
VITE_NASA_API_KEY=your_api_key_here
```

   If you don't create this file, a default demo key will be used. Get your free API key at: https://api.nasa.gov

4. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## NASA Explorer Project

The NASA Explorer project provides an interactive interface to explore NASA APIs with automatic Wikipedia definitions for scientific terms.

### Features

- **Multiple NASA API Sources:**
  - APOD (Astronomy Picture of the Day)
  - EONET (Earth Observatory Natural Event Tracker)
  - Techport (Technology projects)
  - Vesta (Mission data)

- **Automatic Term Definitions:**
  - Extracts scientific terms from NASA content
  - Automatically fetches Wikipedia definitions
  - Creates clickable links to Wikipedia articles
  - Displays term summaries in detail view

- **Client-Side Rate Limiting:**
  - Built-in rate limiting to protect API endpoints
  - Prevents excessive requests to NASA and Wikipedia APIs
  - Configurable delays between requests (1.2s for NASA, 0.5s for Wikipedia)

### Usage

1. Navigate to `/projects` in the frontend
2. Click on "NASA Explorer with Wikipedia Integration"
3. Select a NASA API source from the tabs
4. Browse items in the grid view
5. Click on any item to see detailed information with linked scientific terms

## ML Pipeline (Late Delivery Prediction)

The ML Pipeline project is an end-to-end system that predicts which orders are likely to be delivered late. It lives in a separate repo (`Dalton_Mason_ML_Pipeline_Deployment`) and is deployed as a static app under `/machinelearningpipeline`.

**Pipeline Overview**
- Schema validation → ETL to a warehouse table → model training → batch inference.
- Predictions are stored in `order_predictions` and surfaced in the ML Pipeline web app.
- Pipeline entrypoint: `jobs/run_scheduled_pipeline.py`.

**Artifacts**
- `artifacts/late_delivery_model.sav` (trained pipeline)
- `artifacts/model_metadata.json` (features, threshold, timestamps)
- `artifacts/metrics.json` (evaluation metrics)

**Stack**
- Python, pandas, scikit-learn, SQLite, Next.js.
- AWS SAM (Lambda, EventBridge, S3, API Gateway) for the deployed pipeline/API.
- Scheduled daily at 1:00 AM UTC in the cloud (local scheduling in `CRON_SETUP.md` in the ML repo).

## How It Works

The frontend makes direct API calls to:
- **NASA API**: `https://api.nasa.gov` (CORS-enabled, safe for browser use)
- **Wikipedia API**: `https://en.wikipedia.org/api/rest_v1` (CORS-enabled)

Both APIs support CORS, so they can be called directly from the browser without a backend proxy.

## Rate Limiting

The frontend includes client-side rate limiting:
- **NASA API**: 1.2 seconds delay between requests (~50 requests/minute)
- **Wikipedia API**: 0.5 seconds delay between requests (~120 requests/minute)

This prevents hitting API rate limits while providing a smooth user experience.

## Technologies

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **APIs:** NASA Open APIs, Wikipedia REST API
- **No Backend Required!** All API calls are made directly from the browser.

## Infrastructure & Deployment

Terraform in `infra/` provisions a private S3 bucket + CloudFront distribution for the site, and optionally a second private bucket for the ML Pipeline app mounted at `/machinelearningpipeline`.

**ML Pipeline Hosting Details**
- Separate S3 bucket with CloudFront Origin Access Control (OAC).
- CloudFront behavior for `/machinelearningpipeline*` plus a rewrite function for SPA routing.
- Deploy script: `./scripts/deploy.sh` builds the ML app (injecting `NEXT_PUBLIC_API_BASE_URL` from SAM outputs when available), builds the personal site, runs `terraform apply`, and invalidates CloudFront.

**Key Infra Settings**
- `ml_pipeline_enabled`: enable the ML Pipeline path (default `true`).
- `ml_pipeline_source_dir`: path to the ML app build output (typically `<ML repo>/app/out`).
- `ml_pipeline_upload`: upload ML assets via Terraform (default `true`).
- `ML_PIPELINE_PATH`: environment variable used by `./scripts/deploy.sh` if the ML repo isn’t at the default path.

## Optional Backend

If you want to use the Python backend (for server-side rate limiting, caching, or other features), see the `backend/` directory. However, it's **not required** - the frontend works perfectly without it!
