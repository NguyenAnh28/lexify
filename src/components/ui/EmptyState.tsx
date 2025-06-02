import { ReactNode } from "react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: ReactNode;
  action?: ReactNode;
}

const EmptyState = ({ title, message, icon, action }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16"
    >
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-300/90 max-w-md mx-auto mb-8">{message}</p>
      {action && <div className="flex justify-center">{action}</div>}
    </motion.div>
  );
};

export default EmptyState;
