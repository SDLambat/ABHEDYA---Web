import React from 'react';
import { motion } from 'framer-motion';

export default function PageHeader({ title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      className="space-y-2 pt-1 sm:pt-3 max-w-3xl"
    >
      <h1 className="text-3xl sm:text-5xl font-bold text-gray-950 tracking-tight">{title}</h1>
      <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{children}</p>
    </motion.section>
  );
}

export function Reveal({ children, className = '' }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
