import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { AchievementBadge } from './AchievementBadge';

interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlocked: boolean;
  progress: number;
}

interface AchievementGridProps {
  achievements: Achievement[];
}

export function AchievementGrid({ achievements }: AchievementGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <Card className="bg-gray-900 text-white">
      <CardHeader>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Achievements
        </h2>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-2"
        >
          {achievements.map((achievement) => (
            <motion.div key={achievement.id} variants={item}>
              <AchievementBadge {...achievement} />
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}