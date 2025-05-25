import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, Bookmark, LogOut, Search, LogIn, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-950 text-white"
          >
            <Bookmark size={20} />
          </motion.div>
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl font-bold text-blue-950"
          >
            VectorShelf
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
              isActive('/') ? 'text-blue-950' : 'text-slate-600 hover:text-blue-950'
            }`}
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link 
            to="/search" 
            className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
              isActive('/search') ? 'text-blue-950' : 'text-slate-600 hover:text-blue-950'
            }`}
          >
            <Search size={18} />
            <span>Search</span>
          </Link>
          {user ? (
            <>
              <Link 
                to="/shelf" 
                className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
                  isActive('/shelf') ? 'text-blue-950' : 'text-slate-600 hover:text-blue-950'
                }`}
              >
                <Bookmark size={18} />
                <span>My Shelf</span>
              </Link>
              <button 
                onClick={signOut}
                className="flex items-center space-x-1 text-slate-600 hover:text-blue-950 font-medium transition-colors duration-200"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <Link 
              to="/auth" 
              className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
                isActive('/auth') ? 'text-blue-950' : 'text-slate-600 hover:text-blue-950'
              }`}
            >
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-slate-800 focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white shadow-lg"
        >
          <nav className="container-custom py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                isActive('/') ? 'bg-blue-50 text-blue-950' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-950'
              }`}
            >
              <Home size={20} />
              <span className="font-medium">Home</span>
            </Link>
            <Link 
              to="/search" 
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                isActive('/search') ? 'bg-blue-50 text-blue-950' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-950'
              }`}
            >
              <Search size={20} />
              <span className="font-medium">Search</span>
            </Link>
            {user ? (
              <>
                <Link 
                  to="/shelf" 
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    isActive('/shelf') ? 'bg-blue-50 text-blue-950' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-950'
                  }`}
                >
                  <Bookmark size={20} />
                  <span className="font-medium">My Shelf</span>
                </Link>
                <button 
                  onClick={signOut}
                  className="flex items-center space-x-2 p-2 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-950"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className={`flex items-center space-x-2 p-2 rounded-lg ${
                  isActive('/auth') ? 'bg-blue-50 text-blue-950' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-950'
                }`}
              >
                <LogIn size={20} />
                <span className="font-medium">Sign In</span>
              </Link>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;