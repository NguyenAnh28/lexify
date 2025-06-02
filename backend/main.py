from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
import json
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

app = FastAPI(title="VectorShelf API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with actual frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Google Books API base URL
GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes"

# Models
class BookSaveRequest(BaseModel):
    bookId: str
    userId: str

class BookItem(BaseModel):
    id: str
    volumeInfo: Dict[str, Any]
    savedAt: Optional[str] = None

# Simulated database for saved books (replace with Supabase in production)
# Structure: {user_id: {book_id: book_data}}
user_shelves = {}

@app.get("/")
def read_root():
    return {"message": "Welcome to VectorShelf API"}

# Book search endpoint
@app.get("/api/books/search")
async def search_books(q: str, maxResults: int = 20):
    api_key = os.getenv("GOOGLE_BOOKS_API_KEY")
    async with httpx.AsyncClient() as client:
        try:
            params = {
                "q": q,
                "maxResults": maxResults,
                "printType": "books",
                "projection": "full"
            }
            if api_key:
                params["key"] = api_key
            response = await client.get(GOOGLE_BOOKS_API_URL, params=params)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"Google Books API error: {e}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to search books: {str(e)}")

# Get book by ID
@app.get("/api/books/{book_id}")
async def get_book(book_id: str):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{GOOGLE_BOOKS_API_URL}/{book_id}")
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"Google Books API error: {e}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to get book: {str(e)}")

# Add book to shelf
@app.post("/api/shelf/add")
async def add_to_shelf(request: BookSaveRequest):
    try:
        user_id = request.userId
        book_id = request.bookId
        
        # Initialize user shelf if it doesn't exist
        if user_id not in user_shelves:
            user_shelves[user_id] = {}
            
        # Check if book is already in shelf
        if book_id in user_shelves[user_id]:
            return {"message": "Book already in shelf"}
            
        # Fetch book details from Google Books API
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{GOOGLE_BOOKS_API_URL}/{book_id}")
            response.raise_for_status()
            book_data = response.json()
            
        # Save book to user's shelf with timestamp
        from datetime import datetime
        book_data["savedAt"] = datetime.now().isoformat()
        user_shelves[user_id][book_id] = book_data
        
        return {"message": "Book added to shelf", "bookId": book_id}
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=f"Google Books API error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add book to shelf: {str(e)}")

# Remove book from shelf
@app.post("/api/shelf/remove")
async def remove_from_shelf(request: BookSaveRequest):
    user_id = request.userId
    book_id = request.bookId
    
    if user_id not in user_shelves or book_id not in user_shelves[user_id]:
        raise HTTPException(status_code=404, detail="Book not found in user's shelf")
        
    # Remove book from user's shelf
    del user_shelves[user_id][book_id]
    return {"message": "Book removed from shelf", "bookId": book_id}

# Get user's shelf
@app.get("/api/shelf/{user_id}")
def get_user_shelf(user_id: str):
    if user_id not in user_shelves:
        return []
        
    # Return list of books in user's shelf
    return list(user_shelves[user_id].values())

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)