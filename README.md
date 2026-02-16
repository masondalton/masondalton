# Personal Website

A personal portfolio website with a NASA Explorer project featuring integrated Wikipedia definitions.

## Project Structure

```
.
├── backend/          # (Optional) Python FastAPI backend service - not required for frontend
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

## Optional Backend

If you want to use the Python backend (for server-side rate limiting, caching, or other features), see the `backend/` directory. However, it's **not required** - the frontend works perfectly without it!
