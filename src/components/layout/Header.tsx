import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Menu, X, LogOut, Search, LogIn, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";

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
            ? "bg-gradient-to-r from-black/80 via-slate-900/80 to-black/80 backdrop-blur-xl shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-2 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center w-10 h-10 group-hover:scale-105 transition-all duration-200"
            >
              <img
                src={logo}
                alt="VectorShelf Logo"
                className="w-8 h-8 object-contain"
              />
            </motion.div>
            <span className="text-lg font-semibold tracking-super-tight font-display text-white">
              VectorShelf
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-4">
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 text-slate-300 hover:text-white hover:bg-black/30"
              >
                <span className="font-medium">Home</span>
              </Link>
              <Link
                to="/search"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  isActive("/search")
                    ? "text-white bg-black/50 backdrop-blur-sm"
                    : "text-slate-300 hover:text-white hover:bg-black/30"
                }`}
              >
                <span className="font-medium">Search</span>
              </Link>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <>
                <Link
                  to="/shelf"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 group ${
                    isActive("/shelf")
                      ? "text-white bg-black/50 backdrop-blur-sm"
                      : "text-slate-300 hover:text-white hover:bg-black/30"
                  }`}
                >
                  <span className="font-medium">My Shelf</span>
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-black/30 transition-all duration-200 group"
                >
                  <span className="font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth?mode=signin"
                  className="flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-black/90 to-slate-900/90 text-white font-medium hover:from-black hover:to-slate-900 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-slate-500/20 hover:scale-[1.02] backdrop-blur-sm"
                >
                  <span>Log In</span>
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className={`flex items-center px-5 py-2 rounded-full transition-all duration-200 ${
                    isActive("/auth")
                      ? "text-white bg-black/50 backdrop-blur-sm"
                      : "text-slate-300 hover:text-white hover:bg-black/30"
                  }`}
                >
                  <span className="font-medium">Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden relative w-10 h-10 rounded-full bg-black/30 text-slate-300 hover:text-white transition-colors duration-200 flex items-center justify-center backdrop-blur-sm"
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
              className="md:hidden overflow-hidden bg-gradient-to-b from-black/80 to-slate-900/80 backdrop-blur-xl rounded-2xl mx-4 mt-2"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
                <Link
                  to="/"
                  className="flex items-center space-x-3 p-3 rounded-full transition-all duration-200 text-slate-300 hover:text-white hover:bg-black/30"
                >
                  <span className="font-medium">Home</span>
                </Link>
                <Link
                  to="/search"
                  className={`flex items-center space-x-3 p-3 rounded-full transition-all duration-200 ${
                    isActive("/search")
                      ? "text-white bg-black/50 backdrop-blur-sm"
                      : "text-slate-300 hover:text-white hover:bg-black/30"
                  }`}
                >
                  <span className="font-medium">Search</span>
                </Link>
                {user ? (
                  <>
                    <Link
                      to="/shelf"
                      className={`flex items-center space-x-3 p-3 rounded-full transition-all duration-200 ${
                        isActive("/shelf")
                          ? "bg-black/50 text-white backdrop-blur-sm"
                          : "text-slate-300 hover:bg-black/30 hover:text-white"
                      }`}
                    >
                      <span className="font-medium">My Shelf</span>
                    </Link>
                    <button
                      onClick={signOut}
                      className="flex items-center space-x-3 p-3 rounded-full text-slate-300 hover:bg-black/30 hover:text-white transition-all duration-200 w-full text-left"
                    >
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth?mode=signin"
                      className="flex items-center space-x-3 p-3 rounded-full bg-gradient-to-r from-black/90 to-slate-900/90 text-white font-medium hover:from-black hover:to-slate-900 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-slate-500/20 hover:scale-[1.02] backdrop-blur-sm"
                    >
                      <span>Log In</span>
                    </Link>
                    <Link
                      to="/auth?mode=signup"
                      className={`flex items-center space-x-3 p-3 rounded-full transition-all duration-200 ${
                        isActive("/auth")
                          ? "text-white bg-black/50 backdrop-blur-sm"
                          : "text-slate-300 hover:text-white hover:bg-black/30"
                      }`}
                    >
                      <span className="font-medium">Sign Up</span>
                    </Link>
                  </>
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
