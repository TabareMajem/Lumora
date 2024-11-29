import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import type { DetailedRating } from '../../lib/db/repositories/ratingRepository';

interface RatingLeaderboardProps {
  ratings: DetailedRating[];
  category: string;
}

export function RatingLeaderboard({ ratings, category }: RatingLeaderboardProps) {
  const sortedRatings = [...ratings]
    .sort((a, b) => Number(b.scores[category]) - Number(a.scores[category]))
    .slice(0, 10);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Award className="h-6 w-6 text-yellow-700" />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-gray-900 text-white">
      <CardHeader>
        <h3 className="text-xl font-bold text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Top Ratings - {category}
        </h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedRatings.map((rating, index) => (
            <motion.div
              key={rating.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg"
            >
              <div className="flex-shrink-0 w-8 text-center">
                {getRankIcon(index) || <span className="text-gray-400">#{index + 1}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {rating.userId}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-yellow-400">
                  {Number(rating.scores[category]).toFixed(1)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}