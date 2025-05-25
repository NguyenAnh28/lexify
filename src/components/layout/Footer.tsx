import { BookOpen, Github, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white text-blue-950">
                <BookOpen size={18} />
              </div>
              <h3 className="text-xl font-bold text-white">VectorShelf</h3>
            </div>
            <p className="text-slate-300 mb-4">
              Your personal digital bookshelf for discovering and managing your favorite books.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-slate-300 hover:text-white transition-colors duration-200">Home</a></li>
              <li><a href="/search" className="text-slate-300 hover:text-white transition-colors duration-200">Search Books</a></li>
              <li><a href="/shelf" className="text-slate-300 hover:text-white transition-colors duration-200">My Shelf</a></li>
              <li><a href="/auth" className="text-slate-300 hover:text-white transition-colors duration-200">Sign In / Sign Up</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-4">About</h4>
            <p className="text-slate-300 mb-4">
              VectorShelf is powered by the Google Books API and built with React, FastAPI, and Supabase.
            </p>
            <p className="text-slate-300">
              This application is created for educational purposes.
            </p>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} VectorShelf. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> for book lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;