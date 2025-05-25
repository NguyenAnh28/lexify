import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto mb-8"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books, authors, topics..."
            className="input pr-24 pl-12 py-3 shadow-sm text-lg"
            aria-label="Search for books"
          />
          <div className="absolute left-4 text-slate-400">
            <Search size={20} />
          </div>
          
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-20 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Clear search"
            >
              <X size={20} />
            </button>
          )}
          
          <button
            type="submit"
            className="absolute right-3 btn btn-primary py-1.5 px-4"
            disabled={!query.trim()}
          >
            Search
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar;