import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Search, Bookmark, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const LandingPage = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const features = [
    {
      icon: <Search className="w-6 h-6 text-blue-500" />,
      title: "Smart Discovery",
      description:
        "Find your next favorite book with our intelligent search powered by the Google Books API.",
    },
    {
      icon: <Bookmark className="w-6 h-6 text-purple-500" />,
      title: "Digital Collection",
      description:
        "Build and organize your personal library with our intuitive digital bookshelf system.",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-green-500" />,
      title: "Read Anywhere",
      description:
        "Access your curated collection seamlessly across all your devices, anytime.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/90 to-slate-900 text-white overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none"></div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,41,59,0)_0%,rgba(15,23,42,0.8)_100%)] pointer-events-none"></div>

      {/* Hero Section */}
      <div
        ref={targetRef}
        className="relative min-h-screen flex items-center justify-center"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <motion.div
          style={{ opacity, scale }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium tracking-wide bg-slate-800/30 text-blue-300 backdrop-blur-md border border-slate-700/30 mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Discover Your Next Great Read
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold font-display mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200 leading-[1.3] md:leading-[1.2] py-1 tracking-super-tight"
            >
              Your Books, Reimagined
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-slate-300/90 mb-8 max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
            >
              Transform your reading experience with VectorShelf. Discover,
              collect, and organize your books in a beautiful digital space
              designed for modern readers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/search"
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500/90 to-purple-500/90 text-white font-medium hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] backdrop-blur-sm"
              >
                Start Exploring
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center px-6 py-3 rounded-full bg-slate-800/30 backdrop-blur-md text-white font-medium hover:bg-slate-800/40 transition-all duration-200 hover:scale-[1.02]"
              >
                Create Account
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-8 leading-[1.3] md:leading-[1.2] tracking-super-tight">
              Everything You Need
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200 mt-1 py-1">
                For Your Reading Journey
              </span>
            </h2>
            <p className="text-xl text-slate-400/90 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
              Discover powerful features designed to enhance your reading
              experience and book collection management.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-slate-800/20 backdrop-blur-md border border-slate-700/20 rounded-2xl p-8 hover:border-slate-600/30 transition-all duration-300 h-full flex flex-col">
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800/50">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold font-display mb-4 tracking-super-tight">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400/90 flex-grow font-light tracking-wide leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-20"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-8 leading-[1.3] md:leading-[1.2] tracking-super-tight">
              Ready to Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200 mt-1 py-1">
                Reading Experience?
              </span>
            </h2>
            <p className="text-xl text-slate-300/90 mb-8 font-light tracking-wide leading-relaxed">
              Join thousands of readers who have already discovered the future
              of digital bookshelves.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500/90 to-purple-500/90 text-white font-medium tracking-wide hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] backdrop-blur-sm"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
