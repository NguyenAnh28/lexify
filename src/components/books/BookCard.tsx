import { motion } from "framer-motion";
import { BookOpen, Plus } from "lucide-react";
import { BookItem } from "../../lib/api";

interface BookCardProps {
  book: BookItem;
  onAddToShelf?: (book: BookItem) => void;
}

const BookCard = ({ book, onAddToShelf }: BookCardProps) => {
  const handleAddToShelf = () => {
    if (onAddToShelf) {
      onAddToShelf(book);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="glass-panel h-full group"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-t-xl">
        {book.volumeInfo.imageLinks?.thumbnail ? (
          <img
            src={book.volumeInfo.imageLinks.thumbnail.replace(
              "http:",
              "https:"
            )}
            alt={book.volumeInfo.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-slate-800/50 flex items-center justify-center">
            <BookOpen size={48} className="text-slate-400" />
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg mb-2 text-white line-clamp-2">
          {book.volumeInfo.title}
        </h3>

        {book.volumeInfo.authors && (
          <p className="text-slate-300/90 mb-4 line-clamp-1">
            {book.volumeInfo.authors.join(", ")}
          </p>
        )}

        <p className="text-slate-400/90 text-sm line-clamp-3 mb-6">
          {book.volumeInfo.description || "No description available."}
        </p>

        {onAddToShelf && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToShelf}
            className="glass-button w-full flex items-center justify-center space-x-2"
          >
            <Plus size={18} />
            <span>Add to Shelf</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default BookCard;
