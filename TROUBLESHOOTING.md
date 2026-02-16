# Troubleshooting Guide

## "Failed to fetch" Error

If you're seeing a "Failed to fetch" error, follow these steps:

### 1. Check if Backend is Running

The backend must be running before the frontend can fetch data.

**Start the backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

You should see output like:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### 2. Verify Backend is Accessible

Open your browser and go to: `http://localhost:8000/health`

You should see: `{"status":"healthy"}`

### 3. Check Browser Console

Open browser developer tools (F12) and check the Console tab for detailed error messages.

### 4. Common Issues

#### Port Already in Use
If port 8000 is already in use:
```bash
# Find what's using port 8000
lsof -i :8000

# Kill the process or use a different port
uvicorn main:app --reload --port 8001
```
Then update `VITE_API_URL` in frontend `.env` to match.

#### CORS Errors
If you see CORS errors, make sure:
- Backend is running on the correct port
- Frontend is accessing the backend URL correctly
- CORS middleware is properly configured in `backend/main.py`

#### NASA API Key Issues
If NASA API calls fail:
- Check that your `.env` file in the `backend` directory contains: `NASA_API_KEY=your_key_here`
- Verify the API key is valid at https://api.nasa.gov

#### Missing Dependencies
If you get import errors:
```bash
cd backend
pip install -r requirements.txt
```

### 5. Test Individual Endpoints

Test the backend directly:
```bash
# Health check
curl http://localhost:8000/health

# APOD endpoint
curl http://localhost:8000/api/nasa/apod

# Wikipedia endpoint
curl "http://localhost:8000/api/wikipedia/page/Space"
```

### 6. Frontend Issues

#### Clear Browser Cache
Sometimes cached errors persist. Try:
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Clear browser cache
- Try incognito/private mode

#### Check Network Tab
In browser developer tools, check the Network tab:
- Are requests being made?
- What's the response status?
- Are there any CORS errors?

### 7. Still Having Issues?

Check the backend logs for detailed error messages. The backend will print:
- NASA API request URLs
- Error responses from APIs
- Request/response details

Look for error messages in the terminal where you started the backend server.
