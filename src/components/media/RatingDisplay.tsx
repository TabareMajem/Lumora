import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';

interface RatingDisplayProps {
  ratings: Record<string, number>;
  type: 'FILM' | 'SERIES' | 'GAME';
}

export function RatingDisplay({ ratings, type }: RatingDisplayProps) {
  const getCategoryLabel = (key: string) => {
    return key
      .split(/(?=[A-Z])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getColor = (score: number) => {
    if (score >= 8) return 'bg-green-600';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold flex items-center">
          <Star className="h-5 w-5 text-yellow-400 mr-2" />
          Average Ratings
        </h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(ratings).map(([category, score]) => (
            <div key={category}>
              <div className="flex justify-between text-sm mb-1">
                <span>{getCategoryLabel(category)}</span>
                <span className="font-medium">{score.toFixed(1)}/10</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getColor(score)} rounded-full transition-all`}
                  style={{ width: `${(score / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}