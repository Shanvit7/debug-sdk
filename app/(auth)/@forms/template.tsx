"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

const TransitionTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-w-full overflow-x-hidden"
    >
      {children}
    </motion.div>
  );
};

export default TransitionTemplate;
