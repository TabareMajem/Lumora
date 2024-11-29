import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';

interface RatingLevelProps {
  level: number;
  experience: number;
  nextLevelExperience: number;
  rewards?: string[];
}

export function RatingLevel({
  level,
  experience,
  nextLevelExperience,
  rewards = [],
}: RatingLevelProps) {
  const progress = (experience / nextLevelExperience) * 100;

  return (
    <Card className="bg-gray-900 text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Rating Level
          </h2>
          <div className="flex items-center space-x-2">
            <Star className="h-6 w-6 text-yellow-400" />
            <span className="text-2xl font-bold">{level}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Experience</span>
              <span>{experience} / {nextLevelExperience}</span>
            </div>
            <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {rewards.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Level Rewards</h3>
              <div className="space-y-2">
                {rewards.map((reward, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{reward}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}