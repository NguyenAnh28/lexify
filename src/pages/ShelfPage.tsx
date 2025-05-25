import { useEffect, useState } from 'react';
import { useBookshelf } from '../contexts/BookshelfContext';
import { useAuth } from '../contexts/AuthContext';
import BookList from '../components/books/BookList';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import { Link } from 'react-router-dom';
import { BookmarkPlus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const ShelfPage = () => {
  const { savedBooks, loading, error, refreshShelf } = useBookshelf();
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    // Refresh shelf when component mounts
    refreshShelf();
  }, [refreshShelf]);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshShelf();
    setIsRefreshing(false);
  };
  
  return (
    <div className="container-custom py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-2">My Bookshelf</h1>
            <p className="text-slate-600">
              Your personal collection of saved books.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-4">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="btn btn-outline"
            >
              {isRefreshing ? <LoadingSpinner size="small" /> : 'Refresh'}
            </button>
            <Link to="/search" className="btn btn-primary">
              <Search size={18} className="mr-2" />
              Find Books
            </Link>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="large" />
          </div>
        ) : error ? (
          <div className="py-8 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={handleRefresh} 
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : savedBooks.length > 0 ? (
          <BookList 
            books={savedBooks} 
            title={`Your Saved Books (${savedBooks.length})`}
            emptyMessage="Your bookshelf is empty. Add books from the search page."
          />
        ) : (
          <EmptyState
            title="Your bookshelf is empty"
            message="Start building your collection by adding books from the search page."
            icon={<BookmarkPlus size={48} />}
            action={
              <Link to="/search" className="btn btn-primary">
                <Search size={18} className="mr-2" />
                Find Books to Add
              </Link>
            }
          />
        )}
      </motion.div>
    </div>
  );
};

export default ShelfPage;