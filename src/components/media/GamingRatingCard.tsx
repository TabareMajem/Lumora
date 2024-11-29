import React from 'react';
import { Star, Trophy, TrendingUp, BarChart2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import type { DetailedRating } from '../../lib/db/repositories/ratingRepository';

interface GamingRatingCardProps {
  rating: DetailedRating;
  maxRating?: number;
}

export function GamingRatingCard({ rating, maxRating = 10 }: GamingRatingCardProps) {
  const getScoreColor = (score: number) => {
    const percentage = (score / maxRating) * 100;
    if (percentage >= 90) return 'text-yellow-400';
    if (percentage >= 75) return 'text-green-500';
    if (percentage >= 60) return 'text-blue-500';
    return 'text-gray-500';
  };

  const getScoreGradient = (score: number) => {
    const percentage = (score / maxRating) * 100;
    if (percentage >= 90) return 'from-yellow-500 to-yellow-300';
    if (percentage >= 75) return 'from-green-600 to-green-400';
    if (percentage >= 60) return 'from-blue-600 to-blue-400';
    return 'from-gray-600 to-gray-400';
  };

  return (
    <Card className="bg-gray-900 text-white border-none shadow-xl hover:shadow-2xl transition-shadow">
      <CardHeader className="border-b border-gray-800">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Rating Overview
          </h3>
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="text-lg font-bold">
              {Object.values(rating.scores).reduce((a, b) => a + Number(b), 0) / 
               Object.values(rating.scores).length}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {Object.entries(rating.scores).map(([category, score]) => (
          <div key={category} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className={`font-bold ${getScoreColor(Number(score))}`}>
                {Number(score).toFixed(1)}
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(Number(score))} 
                  transition-all duration-500 ease-out`}
                style={{ width: `${(Number(score) / maxRating) * 100}%` }}
              />
            </div>
          </div>
        ))}

        <div className="grid grid-cols-3 gap-4 pt-4">
          <Button
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Achievements
          </Button>
          <Button
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Progress
          </Button>
          <Button
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            Stats
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}