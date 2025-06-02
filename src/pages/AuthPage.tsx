import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import logo from "../assets/lexify-logo.svg";

interface AuthFormInputs {
  email: string;
  password: string;
}

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>();

  useEffect(() => {
    const mode = searchParams.get("mode");
    setIsLogin(mode !== "signup");
  }, [searchParams]);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: AuthFormInputs) => {
    if (isLogin) {
      await signIn(data.email, data.password);
    } else {
      await signUp(data.email, data.password);
    }
  };

  return (
    <div className="min-h-[calc(100vh-theme(space.32))] relative bg-[radial-gradient(120%_120%_at_10%_90%,#2A4A35_0%,#1A2E1F_25%,#000000_65%)] text-white">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay pointer-events-none"></div>

      <div className="container-custom relative min-h-screen flex items-center justify-center py-20">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8"
          >
            <div className="text-center mb-8">
              <img src={logo} alt="Lexify" className="h-12 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-3 gradient-text">
                {isLogin ? "Welcome Back" : "Join Lexify"}
              </h1>
              <p className="text-slate-300/90">
                {isLogin
                  ? "Sign in to access your digital bookshelf"
                  : "Create an account to start your reading journey"}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-slate-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className={`glass-input w-full pl-11 rounded-full ${
                      errors.email ? "border-red-500/50" : ""
                    }`}
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`glass-input w-full pl-11 pr-11 rounded-full ${
                      errors.password ? "border-red-500/50" : ""
                    }`}
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="glass-button w-full flex justify-center items-center py-3 rounded-full"
              >
                {loading ? (
                  <LoadingSpinner size="small" />
                ) : (
                  <>
                    <User size={18} className="mr-2" />
                    {isLogin ? "Sign In" : "Create Account"}
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-300/90">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="ml-2 text-white hover-glow font-medium"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
