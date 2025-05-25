import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { BookItem, getUserShelf, saveBookToShelf, removeBookFromShelf } from '../lib/api';
import { useAuth } from './AuthContext';

interface BookshelfContextType {
  savedBooks: BookItem[];
  isBookSaved: (bookId: string) => boolean;
  saveBook: (book: BookItem) => Promise<void>;
  removeBook: (bookId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  refreshShelf: () => Promise<void>;
}

const BookshelfContext = createContext<BookshelfContextType | undefined>(undefined);

export function BookshelfProvider({ children }: { children: ReactNode }) {
  const [savedBooks, setSavedBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const refreshShelf = async () => {
    if (!user) {
      setSavedBooks([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const books = await getUserShelf(user.id);
      setSavedBooks(books);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch your shelf');
      console.error('Error fetching shelf:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      refreshShelf();
    } else {
      setSavedBooks([]);
    }
  }, [user]);

  const isBookSaved = (bookId: string) => {
    return savedBooks.some(book => book.id === bookId);
  };

  const saveBook = async (book: BookItem) => {
    if (!user) {
      setError('You must be logged in to save books');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await saveBookToShelf(book.id, user.id);
      setSavedBooks(prev => [...prev, book]);
    } catch (error: any) {
      setError(error.message || 'Failed to save book');
      console.error('Error saving book:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeBook = async (bookId: string) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      await removeBookFromShelf(bookId, user.id);
      setSavedBooks(prev => prev.filter(book => book.id !== bookId));
    } catch (error: any) {
      setError(error.message || 'Failed to remove book');
      console.error('Error removing book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookshelfContext.Provider
      value={{
        savedBooks,
        isBookSaved,
        saveBook,
        removeBook,
        loading,
        error,
        refreshShelf,
      }}
    >
      {children}
    </BookshelfContext.Provider>
  );
}

export const useBookshelf = (): BookshelfContextType => {
  const context = useContext(BookshelfContext);
  if (context === undefined) {
    throw new Error('useBookshelf must be used within a BookshelfProvider');
  }
  return context;
};