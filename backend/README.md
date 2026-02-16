# NASA API Backend Service

Python FastAPI backend service for accessing NASA APIs and Wikipedia definitions.

## Setup

1. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your NASA API key if needed.

## Running the Server

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

API documentation (Swagger UI) will be available at `http://localhost:8000/docs`

## API Endpoints

### NASA Endpoints

- `GET /api/nasa/apod` - Astronomy Picture of the Day
  - Query params: `date` (YYYY-MM-DD), `count` (1-100)
- `GET /api/nasa/techport` - Search Techport projects
  - Query params: `updatedSince` (YYYY-MM-DD)
- `GET /api/nasa/techport/{project_id}` - Get specific Techport project
- `GET /api/nasa/vesta` - Vesta mission data
- `GET /api/nasa/eonet` - Earth Observatory Natural Event Tracker
  - Query params: `days`, `limit`, `category`
- `GET /api/nasa/eonet/categories` - EONET categories

### Wikipedia Endpoints

- `GET /api/wikipedia/search?query={term}` - Search Wikipedia
- `GET /api/wikipedia/page/{title}` - Get page summary
- `GET /api/wikipedia/definitions?terms={term1,term2,...}` - Get definitions for multiple terms

## Rate Limiting

The service includes rate limiting to protect against too many API requests:
- NASA API: ~50 requests per minute (1.2s delay between requests)
- Wikipedia API: ~120 requests per minute (0.5s delay between requests)
- Additional FastAPI rate limiting via slowapi
