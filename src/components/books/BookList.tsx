import { motion } from "framer-motion";
import { BookItem } from "../../lib/api";
import BookCard from "./BookCard";

interface BookListProps {
  books: BookItem[];
  title?: string;
  onAddToShelf?: (book: BookItem) => void;
}

const BookList = ({ books, title, onAddToShelf }: BookListProps) => {
  return (
    <div>
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-white mb-8"
        >
          {title}
        </motion.h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BookCard book={book} onAddToShelf={onAddToShelf} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
