import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { Lock, Mail, User, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface AuthFormInputs {
  email: string;
  password: string;
}

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp, loading, error } = useAuth();
  
  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm<AuthFormInputs>();
  
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
    <div className="container-custom py-12 md:py-20">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-blue-950 p-6 text-white text-center">
            <h1 className="text-2xl font-bold mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-blue-200">
              {isLogin 
                ? 'Sign in to access your bookshelf' 
                : 'Sign up to start building your bookshelf'}
            </p>
          </div>
          
          <div className="p-6">
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className={`input pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="you@example.com"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`input pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="••••••••"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary py-3 flex justify-center items-center"
              >
                {loading ? (
                  <LoadingSpinner size="small" color="blue" />
                ) : (
                  <>
                    <User size={18} className="mr-2" />
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="ml-1 text-blue-600 hover:text-blue-800 font-medium"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;