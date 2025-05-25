import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="container-custom py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto text-center"
      >
        <h1 className="text-9xl font-bold text-blue-950 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-slate-700 mb-6">Page Not Found</h2>
        <p className="text-slate-600 mb-8">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn btn-primary">
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
          <Link to="/search" className="btn btn-outline">
            <Search size={18} className="mr-2" />
            Search Books
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;