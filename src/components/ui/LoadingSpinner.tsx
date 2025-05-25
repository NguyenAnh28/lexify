import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'blue' 
}) => {
  const sizeMap = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };
  
  const colorMap = {
    blue: 'border-blue-950',
    green: 'border-green-700',
    orange: 'border-orange-500',
    gray: 'border-gray-400',
  };
  
  const spinnerSize = sizeMap[size] || sizeMap.medium;
  const spinnerColor = colorMap[color as keyof typeof colorMap] || colorMap.blue;
  
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className={`${spinnerSize} border-4 border-slate-200 rounded-full ${spinnerColor}`}
      style={{ borderTopColor: 'transparent' }}
    />
  );
};

export default LoadingSpinner;