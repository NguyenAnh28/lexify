import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Search, Bookmark, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import logo from "../assets/logo.png";

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
    <div className="relative min-h-screen bg-[radial-gradient(100%_100%_at_15%_60%,#4A5569_0%,#1A1F2E_25%,#000000_65%)] text-white overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay pointer-events-none"></div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_60%,rgba(74,85,105,0.15)_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>

      {/* Hero Section */}
      <div
        ref={targetRef}
        className="relative min-h-screen flex items-center justify-center"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute -top-20 -left-4 w-96 h-96 bg-slate-400/5 rounded-full mix-blend-soft-light filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 -right-4 w-72 h-72 bg-slate-500/5 rounded-full mix-blend-soft-light filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-40 w-80 h-80 bg-slate-600/5 rounded-full mix-blend-soft-light filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
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
              <span className="inline-flex items-center px-5 py-2 rounded-full text-base font-normal tracking-wide bg-slate-800/30 text-slate-300 backdrop-blur-md border border-slate-700/30 mb-4">
                <Sparkles className="w-5 h-5 mr-2.5" />
                Discover Your Next Great Read
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold font-display mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 leading-[1.3] md:leading-[1.2] py-1 tracking-super-tight"
            >
              Your Books, Reimagined
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-slate-300/90 mb-8 max-w-2xl mx-auto font-light tracking-wide leading-relaxed font-manrope"
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
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-black/90 to-slate-900/90 text-white font-normal hover:from-black hover:to-slate-900 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-slate-500/20 hover:scale-[1.02] backdrop-blur-sm"
              >
                Start Exploring
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center px-6 py-3 rounded-full bg-slate-800/30 backdrop-blur-md text-white font-normal hover:bg-slate-800/40 transition-all duration-200 hover:scale-[1.02]"
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
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold font-display mb-8 leading-[1.3] md:leading-[1.2] tracking-super-tight"
            >
              Everything You Need
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 mt-1 py-1"
              >
                For Your Reading Journey
              </motion.span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-slate-400/90 max-w-2xl mx-auto font-light tracking-wide leading-relaxed font-manrope"
            >
              Discover powerful features designed to enhance your reading
              experience and book collection management.
            </motion.p>
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
                <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-slate-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-black/40 backdrop-blur-md border border-slate-800/40 rounded-2xl p-8 hover:border-slate-600/40 transition-all duration-300 h-full flex flex-col">
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/70">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold font-display mb-4 tracking-super-tight">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400/90 flex-grow font-light tracking-wide leading-relaxed font-manrope">
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
        {/* Background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_70%_80%,#4A5569_0%,#1A1F2E_25%,#000000_65%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/40 pointer-events-none"></div>

        {/* Animated blobs */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-slate-400/5 rounded-full mix-blend-soft-light filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-slate-500/5 rounded-full mix-blend-soft-light filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/4 right-1/3 w-[450px] h-[450px] bg-slate-600/5 rounded-full mix-blend-soft-light filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold font-display mb-8 leading-[1.3] md:leading-[1.2] tracking-super-tight"
            >
              Ready to Transform Your
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 mt-1 py-1"
              >
                Reading Experience?
              </motion.span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-slate-300/90 mb-8 font-light tracking-wide leading-relaxed font-manrope"
            >
              Join thousands of readers who have already discovered the future
              of digital bookshelves.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/auth"
                className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-black/90 to-slate-900/90 text-white font-normal tracking-wide hover:from-black hover:to-slate-900 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-slate-500/20 hover:scale-[1.02] backdrop-blur-sm"
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
