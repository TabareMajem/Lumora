import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '../ui/Card';

interface RatingProgressBarProps {
  category: string;
  value: number;
  maxValue?: number;
  showPercentage?: boolean;
}

export function RatingProgressBar({
  category,
  value,
  maxValue = 10,
  showPercentage = true,
}: RatingProgressBarProps) {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-300">
          {category}
        </span>
        <span className="text-sm font-bold text-gray-300">
          {showPercentage ? `${Math.round(percentage)}%` : value}
        </span>
      </div>
      <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}