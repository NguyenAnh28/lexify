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
            className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-full 
                     pl-12 pr-28 py-4 text-base text-white placeholder:text-white/50
                     focus:outline-none focus:border-white/30 focus:bg-black/40
                     hover:border-white/30 hover:bg-black/35
                     transition-all duration-300
                     outline-none ring-0 focus:ring-0"
          />
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search size={18} className="text-white/70" />
          </div>
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2
                     bg-[radial-gradient(120%_120%_at_85%_85%,#8B3251_0%,#4A1F3D_25%,#000000_65%)]
                     text-white font-normal rounded-full px-6 py-2.5
                     transition-all duration-300 backdrop-blur-sm
                     shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            Search
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar;
