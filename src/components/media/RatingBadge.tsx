import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface RatingBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showAnimation?: boolean;
}

export function RatingBadge({
  score,
  size = 'md',
  showAnimation = true,
}: RatingBadgeProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-12 w-12 text-base',
    lg: 'h-16 w-16 text-lg',
  };

  const badgeVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} flex items-center justify-center`}
      initial={showAnimation ? "initial" : false}
      animate={showAnimation ? "animate" : false}
      variants={badgeVariants}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full" />
      <div className="absolute inset-0.5 bg-gray-900 rounded-full" />
      <div className="relative flex items-center justify-center">
        <Star className="absolute h-4 w-4 text-yellow-400 opacity-75" />
        <span className="font-bold text-yellow-400">
          {score.toFixed(1)}
        </span>
      </div>
    </motion.div>
  );
}