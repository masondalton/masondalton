from fastapi import APIRouter, HTTPException
import httpx
import os
from typing import Optional, Dict, Any
import time

router = APIRouter()

NASA_API_KEY = os.getenv("NASA_API_KEY", "M1x2YeBbegbE0iSBqePw8yihMe8kvtdEaaujb302")
NASA_BASE_URL = "https://api.nasa.gov"

# Rate limiting: NASA allows 1000 requests per hour per API key
# We'll be conservative: 50 requests per minute per endpoint
RATE_LIMIT_DELAY = 1.2  # seconds between requests (50 requests per minute = 1.2s delay)

# Simple in-memory rate limiter
_last_request_time: Dict[str, float] = {}


def _rate_limit_check(endpoint: str):
    """Simple rate limiting to prevent too many requests"""
    current_time = time.time()
    last_time = _last_request_time.get(endpoint, 0)
    
    if current_time - last_time < RATE_LIMIT_DELAY:
        sleep_time = RATE_LIMIT_DELAY - (current_time - last_time)
        time.sleep(sleep_time)
    
    _last_request_time[endpoint] = time.time()


async def _fetch_nasa_data(endpoint: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """Helper function to fetch data from NASA API with rate limiting"""
    _rate_limit_check(endpoint)
    
    if params is None:
        params = {}
    params["api_key"] = NASA_API_KEY
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            url = f"{NASA_BASE_URL}{endpoint}"
            print(f"Fetching NASA API: {url} with params: {params}")
            response = await client.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            print(f"NASA API response received successfully")
            return data
        except httpx.HTTPStatusError as e:
            error_detail = f"NASA API error ({e.response.status_code}): {e.response.text[:500]}"
            print(f"NASA API HTTP error: {error_detail}")
            raise HTTPException(status_code=e.response.status_code, detail=error_detail)
        except httpx.RequestError as e:
            error_detail = f"Request error: {str(e)}"
            print(f"NASA API request error: {error_detail}")
            raise HTTPException(status_code=500, detail=error_detail)


@router.get("/apod")
async def get_apod(date: Optional[str] = None, count: Optional[int] = None):
    """
    Get Astronomy Picture of the Day
    - date: YYYY-MM-DD format (optional)
    - count: Number of images to return (optional, max 100)
    """
    params = {}
    if date:
        params["date"] = date
    if count:
        params["count"] = min(count, 100)  # Cap at 100
    
    return await _fetch_nasa_data("/planetary/apod", params)


@router.get("/techport/{project_id}")
async def get_techport_project(project_id: str):
    """Get Techport project details by ID"""
    return await _fetch_nasa_data(f"/techport/api/projects/{project_id}")


@router.get("/techport")
async def search_techport_projects(updatedSince: Optional[str] = None):
    """
    Search Techport projects
    - updatedSince: Date in YYYY-MM-DD format (optional)
    Note: Techport API may require authentication and might not be publicly accessible
    """
    params = {}
    if updatedSince:
        params["updatedSince"] = updatedSince
    
    try:
        return await _fetch_nasa_data("/techport/api/projects", params)
    except HTTPException as e:
        # Techport might not be available, return a helpful message
        if e.status_code == 404 or e.status_code == 403:
            return {
                "projects": [],
                "message": "Techport API may require additional authentication or may not be publicly accessible.",
                "error": str(e.detail)
            }
        raise


@router.get("/vesta")
async def get_vesta_data():
    """
    Get Vesta mission data
    Note: Vesta API endpoint may not be publicly available
    """
    try:
        return await _fetch_nasa_data("/vesta/api/v1/vesta")
    except HTTPException as e:
        # Vesta might not be available, return a helpful message
        if e.status_code == 404:
            return {
                "message": "Vesta API endpoint may not be publicly available or the endpoint URL may have changed.",
                "error": str(e.detail),
                "suggestion": "Try using APOD or EONET endpoints instead."
            }
        raise


@router.get("/eonet")
async def get_eonet_events(
    days: Optional[int] = 30,
    limit: Optional[int] = 20,
    category: Optional[int] = None
):
    """
    Get Earth Observatory Natural Event Tracker (EONET) events
    - days: Number of days to look back (default: 30)
    - limit: Maximum number of events to return (default: 20)
    - category: Category ID to filter by (optional)
    """
    params = {}
    if days:
        params["days"] = days
    if limit:
        params["limit"] = min(limit, 100)  # Cap at 100
    if category:
        params["category"] = category
    
    return await _fetch_nasa_data("/EONET/v2.1/events", params)


@router.get("/eonet/categories")
async def get_eonet_categories():
    """Get EONET event categories"""
    return await _fetch_nasa_data("/EONET/v2.1/categories")
