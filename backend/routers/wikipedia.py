from fastapi import APIRouter, HTTPException
import httpx
from typing import Optional, List, Dict, Any
import time
from urllib.parse import quote

router = APIRouter()

WIKIPEDIA_API_URL = "https://en.wikipedia.org/api/rest_v1"

# Rate limiting for Wikipedia: 200 requests per second per IP
# We'll be conservative: 2 requests per second
RATE_LIMIT_DELAY = 0.5  # seconds between requests

_last_request_time: float = 0


def _rate_limit_check():
    """Simple rate limiting to prevent too many requests"""
    global _last_request_time
    current_time = time.time()
    
    if current_time - _last_request_time < RATE_LIMIT_DELAY:
        sleep_time = RATE_LIMIT_DELAY - (current_time - _last_request_time)
        time.sleep(sleep_time)
    
    _last_request_time = time.time()


async def _fetch_wikipedia_data(endpoint: str) -> Dict[str, Any]:
    """Helper function to fetch data from Wikipedia API with rate limiting"""
    _rate_limit_check()
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.get(f"{WIKIPEDIA_API_URL}{endpoint}")
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 404:
                raise HTTPException(status_code=404, detail="Wikipedia article not found")
            raise HTTPException(status_code=e.response.status_code, detail=f"Wikipedia API error: {e.response.text}")
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"Request error: {str(e)}")


@router.get("/search")
async def search_wikipedia(query: str, limit: Optional[int] = 10):
    """
    Search Wikipedia articles
    - query: Search term
    - limit: Maximum number of results (default: 10, max: 50)
    """
    limit = min(limit or 10, 50)
    
    _rate_limit_check()
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.get(
                f"{WIKIPEDIA_API_URL}/page/summary/{query}",
                params={"limit": limit}
            )
            # If direct page exists, return it
            if response.status_code == 200:
                return {"results": [response.json()], "query": query}
            
            # Otherwise, try search
            search_url = "https://en.wikipedia.org/w/api.php"
            search_response = await client.get(
                search_url,
                params={
                    "action": "query",
                    "list": "search",
                    "srsearch": query,
                    "format": "json",
                    "srlimit": limit
                }
            )
            search_data = search_response.json()
            
            results = []
            for item in search_data.get("query", {}).get("search", [])[:limit]:
                # Get summary for each result
                try:
                    summary_response = await client.get(
                        f"{WIKIPEDIA_API_URL}/page/summary/{item['title']}"
                    )
                    if summary_response.status_code == 200:
                        results.append(summary_response.json())
                except:
                    pass
            
            return {"results": results, "query": query}
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"Request error: {str(e)}")


@router.get("/page/{title}")
async def get_wikipedia_page(title: str):
    """
    Get Wikipedia page summary and basic info
    - title: Article title (will be URL encoded)
    """
    # URL encode the title to handle special characters
    encoded_title = quote(title.replace(' ', '_'), safe='')
    return await _fetch_wikipedia_data(f"/page/summary/{encoded_title}")


@router.get("/definitions")
async def get_definitions(terms: str):
    """
    Get definitions for multiple terms (comma-separated)
    - terms: Comma-separated list of terms to look up
    """
    term_list = [term.strip() for term in terms.split(",")]
    results = {}
    
    for term in term_list:
        try:
            # URL encode the term to handle special characters
            encoded_term = quote(term.replace(' ', '_'), safe='')
            data = await _fetch_wikipedia_data(f"/page/summary/{encoded_term}")
            results[term] = {
                "title": data.get("title"),
                "extract": data.get("extract", ""),
                "url": data.get("content_urls", {}).get("desktop", {}).get("page", ""),
                "thumbnail": data.get("thumbnail", {}).get("source", "") if data.get("thumbnail") else None
            }
        except HTTPException as e:
            if e.status_code == 404:
                results[term] = {"error": "Not found"}
            else:
                results[term] = {"error": str(e.detail)}
        except Exception as e:
            results[term] = {"error": str(e)}
    
    return {"definitions": results}
