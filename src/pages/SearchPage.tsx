import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BookItem, searchBooks } from "../lib/api";
import SearchBar from "../components/books/SearchBar";
import BookList from "../components/books/BookList";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import { Search as BookSearch, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const SearchPage = () => {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const location = useLocation();

  // Get query from URL if exists
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("q") || "";

  const performSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSearchPerformed(true);

    try {
      // Update URL with search query
      const newUrl = `${window.location.pathname}?q=${encodeURIComponent(
        query
      )}`;
      window.history.pushState({ path: newUrl }, "", newUrl);

      const results = await searchBooks(query);
      setBooks(results.items || []);
    } catch (err: any) {
      setError(err.message || "Failed to search books. Please try again.");
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
    <div className="min-h-[calc(100vh-theme(space.32))] relative bg-[radial-gradient(120%_120%_at_85%_85%,#8B3251_0%,#4A1F3D_25%,#000000_65%)] text-white">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay pointer-events-none"></div>

      <div className="container-custom relative min-h-[calc(100vh-theme(space.32))] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center pt-60 pb-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl"
          >
            <div className="text-center mb-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 from-5% via-white via-30% via-blue-200 via-50% via-white via-70% to-indigo-200 to-95%"
              >
                Discover Your Next Read
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-slate-300/90 max-w-2xl mx-auto font-light tracking-wide"
              >
                Search for books by title, author, or topic. Add books to your
                shelf to create your personal collection.
              </motion.p>
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
                  icon={<AlertTriangle size={48} className="text-red-400" />}
                  action={
                    <button
                      onClick={() => performSearch(initialQuery)}
                      className="glass-button"
                    >
                      Try Again
                    </button>
                  }
                />
              </div>
            ) : books.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <BookList
                  books={books}
                  title={`Search Results (${books.length})`}
                />
              </motion.div>
            ) : searchPerformed ? (
              <EmptyState
                title="No books found"
                message="We couldn't find any books matching your search. Try different keywords or browse popular books."
                icon={<BookSearch size={48} className="text-slate-400" />}
              />
            ) : null}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
