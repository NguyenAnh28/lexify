import { motion } from 'framer-motion';
import { BookOpen, Search, Bookmark, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const features = [
    {
      icon: <Search className="w-10 h-10 text-blue-950" />,
      title: 'Discover Books',
      description: 'Search through millions of books using the Google Books API. Find your next favorite read in seconds.'
    },
    {
      icon: <Bookmark className="w-10 h-10 text-blue-950" />,
      title: 'Build Your Shelf',
      description: 'Save books to your personal digital bookshelf. Organize and keep track of what you want to read.'
    },
    {
      icon: <BookOpen className="w-10 h-10 text-blue-950" />,
      title: 'Accessible Anywhere',
      description: 'Your digital bookshelf is available on any device. Take your reading list wherever you go.'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-slate-50 py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4 leading-tight">
                Your Personal <span className="text-green-700">Digital Bookshelf</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-700 mb-8 leading-relaxed">
                Discover, save, and organize your favorite books in one beautiful place. 
                VectorShelf makes it easy to build your personal reading collection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/search" className="btn btn-primary text-center">
                  Start Searching
                </Link>
                <Link to="/auth" className="btn btn-outline text-center">
                  Create Your Shelf
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-1/2 flex justify-center"
            >
              <div className="relative w-full max-w-lg">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-200 rounded-full opacity-30 filter blur-3xl"></div>
                <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-green-200 rounded-full opacity-30 filter blur-3xl"></div>
                <img 
                  src="https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Books on a shelf" 
                  className="relative z-10 rounded-xl shadow-xl w-full object-cover max-h-96"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              Everything You Need For Your Reading Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              VectorShelf provides all the tools you need to discover new books and manage your collection.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4 bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-950 text-white py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-2/3 mb-8 md:mb-0"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Build Your Digital Bookshelf?
              </h2>
              <p className="text-blue-100 text-lg mb-0">
                Sign up now and start discovering and saving your favorite books.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                to="/auth" 
                className="btn bg-white text-blue-950 hover:bg-blue-100 group"
              >
                Get Started 
                <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;