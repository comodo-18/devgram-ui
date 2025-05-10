/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
const AnimatedWrapper = ({ children, className }) => {
  return (
    <motion.div
      className={className} // Allow custom classes to be passed
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedWrapper