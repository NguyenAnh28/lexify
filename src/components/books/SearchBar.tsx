import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchBar = ({ onSearch, initialQuery = "" }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="max-w-2xl mx-auto mb-12"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, or topic..."
            className="w-full bg-black/30 backdrop-blur-sm border border-slate-700/30 rounded-full 
                     pl-12 pr-28 py-4 text-base text-white placeholder:text-slate-400
                     focus:outline-none focus:border-slate-500/50 focus:bg-black/40
                     hover:border-slate-600/50 hover:bg-black/35
                     transition-all duration-300"
          />
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2
                     bg-gradient-to-r from-slate-800/90 to-slate-900/90 
                     text-white/90 hover:text-white font-normal rounded-full px-6 py-2.5
                     transition-all duration-300 backdrop-blur-sm
                     border border-slate-700/30 hover:border-slate-600/50
                     shadow-sm hover:shadow-[0_0_15px_rgba(148,163,184,0.15)]"
          >
            Search
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar;
