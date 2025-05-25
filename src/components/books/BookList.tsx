import { BookItem } from '../../lib/api';
import BookCard from './BookCard';
import { motion } from 'framer-motion';

interface BookListProps {
  books: BookItem[];
  title?: string;
  emptyMessage?: string;
}

const BookList: React.FC<BookListProps> = ({ 
  books, 
  title = 'Books', 
  emptyMessage = 'No books found. Try a different search.' 
}) => {
  return (
    <div className="w-full">
      {title && (
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-6 text-blue-950"
        >
          {title}
        </motion.h2>
      )}
      
      {books.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {books.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-slate-500 text-lg">{emptyMessage}</p>
        </motion.div>
      )}
    </div>
  );
};

export default BookList;