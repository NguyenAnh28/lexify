import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BookItem, searchBooks } from '../lib/api';
import SearchBar from '../components/books/SearchBar';
import BookList from '../components/books/BookList';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import { Search as BookSearch, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchPage = () => {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const location = useLocation();
  
  // Get query from URL if exists
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  
  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setSearchPerformed(true);
    
    try {
      // Update URL with search query
      const newUrl = `${window.location.pathname}?q=${encodeURIComponent(query)}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
      
      const results = await searchBooks(query);
      setBooks(results.items || []);
    } catch (err: any) {
      setError(err.message || 'Failed to search books. Please try again.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Perform search on initial render if query exists in URL
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, []);
  
  return (
    <div className="container-custom py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Discover Your Next Read</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Search for books by title, author, or topic. Add books to your shelf to create your personal collection.
          </p>
        </div>
        
        <SearchBar onSearch={performSearch} initialQuery={initialQuery} />
        
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="large" />
          </div>
        ) : error ? (
          <div className="py-8">
            <EmptyState
              title="Something went wrong"
              message={error}
              icon={<AlertTriangle size={48} />}
              action={
                <button 
                  onClick={() => performSearch(initialQuery)} 
                  className="btn btn-primary"
                >
                  Try Again
                </button>
              }
            />
          </div>
        ) : books.length > 0 ? (
          <div className="mb-12">
            <BookList books={books} title={`Search Results (${books.length})`} />
          </div>
        ) : searchPerformed ? (
          <EmptyState
            title="No books found"
            message="We couldn't find any books matching your search. Try different keywords or browse popular books."
            icon={<BookSearch size={48} />}
          />
        ) : (
          <div className="text-center py-12">
            <BookSearch size={64} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg">
              Enter a search term above to find books
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SearchPage;