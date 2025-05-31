import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Menu, X, Bookmark, LogOut, Search, LogIn, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle scroll background
      if (currentScrollY === 0) {
        setScrolled(false);
      } else if (currentScrollY > 20) {
        setScrolled(true);
      }

      // Handle header visibility based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down & past header - hide
        setIsVisible(false);
      } else {
        // Scrolling up or at top - show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        transition: { duration: 0, ease: "linear" },
      }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 transition-all duration-300`}
    >
      <div
        className={`relative w-[98%] max-w-7xl rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-lg shadow-lg shadow-slate-900/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-2 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg group-hover:shadow-blue-500/25 transition-shadow duration-200"
            >
              <Bookmark size={20} />
            </motion.div>
            <span className="text-lg font-semibold tracking-super-tight font-display text-white">
              VectorShelf
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 group ${
                isActive("/")
                  ? "text-white bg-white/10"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Home
                size={18}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              to="/search"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 group ${
                isActive("/search")
                  ? "text-white bg-white/10"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Search
                size={18}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              <span className="font-medium">Search</span>
            </Link>
            {user ? (
              <>
                <Link
                  to="/shelf"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 group ${
                    isActive("/shelf")
                      ? "text-white bg-white/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Bookmark
                    size={18}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                  <span className="font-medium">My Shelf</span>
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200 group"
                >
                  <LogOut
                    size={18}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                  <span className="font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium tracking-wide hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02]"
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden relative w-10 h-10 rounded-full bg-white/10 text-slate-300 hover:text-white transition-colors duration-200 flex items-center justify-center"
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-slate-900/95 backdrop-blur-lg rounded-2xl mx-4 mt-2"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
                <Link
                  to="/"
                  className={`flex items-center space-x-3 p-3 rounded-full transition-all duration-200 ${
                    isActive("/")
                      ? "bg-white/10 text-white"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Home size={20} />
                  <span className="font-medium">Home</span>
                </Link>
                <Link
                  to="/search"
                  className={`flex items-center space-x-3 p-3 rounded-full transition-all duration-200 ${
                    isActive("/search")
                      ? "bg-white/10 text-white"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Search size={20} />
                  <span className="font-medium">Search</span>
                </Link>
                {user ? (
                  <>
                    <Link
                      to="/shelf"
                      className={`flex items-center space-x-3 p-3 rounded-full transition-all duration-200 ${
                        isActive("/shelf")
                          ? "bg-white/10 text-white"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Bookmark size={20} />
                      <span className="font-medium">My Shelf</span>
                    </Link>
                    <button
                      onClick={signOut}
                      className="flex items-center space-x-3 p-3 rounded-full text-slate-300 hover:bg-white/5 hover:text-white transition-all duration-200 w-full text-left"
                    >
                      <LogOut size={20} />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center space-x-3 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-blue-500/25"
                  >
                    <LogIn size={20} />
                    <span>Sign In</span>
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
