import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Medal, Crown } from 'lucide-react';

interface AchievementBadgeProps {
  title: string;
  description: string;
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlocked?: boolean;
  progress?: number;
}

export function AchievementBadge({
  title,
  description,
  type,
  unlocked = false,
  progress = 0,
}: AchievementBadgeProps) {
  const badgeColors = {
    bronze: 'from-orange-400 to-orange-600',
    silver: 'from-gray-300 to-gray-500',
    gold: 'from-yellow-400 to-yellow-600',
    platinum: 'from-indigo-400 to-purple-600',
  };

  const badgeIcons = {
    bronze: Medal,
    silver: Star,
    gold: Trophy,
    platinum: Crown,
  };

  const Icon = badgeIcons[type];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`relative p-4 rounded-lg bg-gray-900 border ${
        unlocked ? 'border-gray-700' : 'border-gray-800'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${
            unlocked ? badgeColors[type] : 'from-gray-700 to-gray-800'
          } flex items-center justify-center`}
        >
          <Icon className={`h-6 w-6 ${unlocked ? 'text-white' : 'text-gray-600'}`} />
        </div>
        <div className="flex-1">
          <h3 className={`font-bold ${unlocked ? 'text-white' : 'text-gray-500'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-400">{description}</p>
          {!unlocked && progress > 0 && (
            <div className="mt-2">
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${badgeColors[type]}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{progress}% Complete</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}