import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Star, Trophy, Medal } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  threshold: number;
  currentValue: number;
  icon: 'star' | 'trophy' | 'medal';
}

interface RatingMilestonesProps {
  milestones: Milestone[];
}

export function RatingMilestones({ milestones }: RatingMilestonesProps) {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'star':
        return <Star className="h-6 w-6" />;
      case 'trophy':
        return <Trophy className="h-6 w-6" />;
      case 'medal':
        return <Medal className="h-6 w-6" />;
      default:
        return <Star className="h-6 w-6" />;
    }
  };

  return (
    <Card className="bg-gray-900 text-white">
      <CardHeader>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Rating Milestones
        </h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {milestones.map((milestone) => {
            const progress = (milestone.currentValue / milestone.threshold) * 100;
            const isCompleted = progress >= 100;

            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full ${
                      isCompleted ? 'bg-yellow-500' : 'bg-gray-700'
                    } flex items-center justify-center`}
                  >
                    {getIcon(milestone.icon)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                    <div className="mt-2">
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(progress, 100)}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        {milestone.currentValue} / {milestone.threshold}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}