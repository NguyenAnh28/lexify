import { motion } from 'framer-motion';
import { BookOpen, Heart, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { BookItem } from '../../lib/api';
import { useBookshelf } from '../../contexts/BookshelfContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
  book: BookItem;
  index: number;
}

const BookCard: React.FC<BookCardProps> = ({ book, index }) => {
  const { isBookSaved, saveBook, removeBook } = useBookshelf();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const isSaved = isBookSaved(book.id);
  
  const handleSaveToggle = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (isSaved) {
      await removeBook(book.id);
    } else {
      await saveBook(book);
    }
  };
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Ensure we have proper data to display
  const title = book.volumeInfo.title || 'Untitled';
  const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
  const description = book.volumeInfo.description || 'No description available.';
  const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Cover';
  
  // Truncate description
  const shortDescription = description.length > 150 
    ? `${description.substring(0, 150)}...` 
    : description;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="card hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-1/3 p-4 flex justify-center md:justify-start">
          <div className="relative group">
            <img 
              src={thumbnail} 
              alt={`Cover of ${title}`}
              className="h-48 w-auto object-contain rounded-md shadow-md transition-all duration-300 group-hover:scale-105"
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute top-2 right-2"
            >
              <button
                onClick={handleSaveToggle}
                className={`p-2 rounded-full shadow-md ${
                  isSaved 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-white text-blue-950 hover:bg-blue-50'
                }`}
                aria-label={isSaved ? 'Remove from shelf' : 'Add to shelf'}
              >
                {isSaved ? <Trash2 size={16} /> : <Plus size={16} />}
              </button>
            </motion.div>
          </div>
        </div>
        
        <div className="w-full md:w-2/3 p-4 flex flex-col">
          <h3 className="text-xl font-bold mb-1 text-blue-950">{title}</h3>
          <p className="text-slate-600 mb-2">{authors}</p>
          
          <div className="flex items-center text-slate-500 text-sm mb-4">
            <BookOpen size={16} className="mr-1" />
            <span>
              {book.volumeInfo.pageCount 
                ? `${book.volumeInfo.pageCount} pages` 
                : 'Unknown length'}
            </span>
            {book.volumeInfo.publishedDate && (
              <span className="ml-4">{book.volumeInfo.publishedDate.substring(0, 4)}</span>
            )}
          </div>
          
          <div className="flex-grow">
            <p className="text-slate-700 text-sm">
              {isExpanded ? description : shortDescription}
            </p>
          </div>
          
          {description.length > 150 && (
            <button 
              onClick={toggleExpanded}
              className="text-sm text-blue-600 hover:text-blue-800 mt-2 transition-colors duration-200"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
          
          <div className="flex justify-between items-center mt-4">
            {book.volumeInfo.categories && book.volumeInfo.categories.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {book.volumeInfo.categories.slice(0, 2).map((category, idx) => (
                  <span 
                    key={idx} 
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
            
            <button
              onClick={handleSaveToggle}
              className={`btn ${isSaved ? 'btn-secondary' : 'btn-primary'} text-sm py-1 px-3`}
            >
              {isSaved ? (
                <>
                  <Heart size={16} className="mr-1" /> Saved
                </>
              ) : (
                <>
                  <Plus size={16} className="mr-1" /> Add to Shelf
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;