import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  message, 
  icon = <BookOpen size={48} />,
  action
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-16 h-16 mb-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-950">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 max-w-md mb-8">{message}</p>
      {action && <div>{action}</div>}
    </motion.div>
  );
};

export default EmptyState;