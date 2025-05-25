import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
const BOOKS_ENDPOINT = `${BACKEND_URL}/api/books`;
const SHELF_ENDPOINT = `${BACKEND_URL}/api/shelf`;

export interface BookItem {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    publishedDate?: string;
    publisher?: string;
    categories?: string[];
    pageCount?: number;
  };
}

export interface ShelfItem extends BookItem {
  savedAt: string;
}

// Search for books using Google Books API via backend
export const searchBooks = async (query: string, maxResults: number = 20) => {
  try {
    const response = await axios.get(`${BOOKS_ENDPOINT}/search`, {
      params: { q: query, maxResults }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

// Get a single book by ID
export const getBook = async (bookId: string) => {
  try {
    const response = await axios.get(`${BOOKS_ENDPOINT}/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting book details:', error);
    throw error;
  }
};

// Save a book to user's shelf
export const saveBookToShelf = async (bookId: string, userId: string) => {
  try {
    const response = await axios.post(`${SHELF_ENDPOINT}/add`, { bookId, userId });
    return response.data;
  } catch (error) {
    console.error('Error saving book to shelf:', error);
    throw error;
  }
};

// Remove a book from user's shelf
export const removeBookFromShelf = async (bookId: string, userId: string) => {
  try {
    const response = await axios.post(`${SHELF_ENDPOINT}/remove`, { bookId, userId });
    return response.data;
  } catch (error) {
    console.error('Error removing book from shelf:', error);
    throw error;
  }
};

// Get all books from user's shelf
export const getUserShelf = async (userId: string) => {
  try {
    const response = await axios.get(`${SHELF_ENDPOINT}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user shelf:', error);
    throw error;
  }
};