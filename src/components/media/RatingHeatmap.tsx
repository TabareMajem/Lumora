import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import type { DetailedRating } from '../../lib/db/repositories/ratingRepository';

interface RatingHeatmapProps {
  ratings: DetailedRating[];
}

export function RatingHeatmap({ ratings }: RatingHeatmapProps) {
  const calculateHeatmap = () => {
    const categories = new Set<string>();
    ratings.forEach(rating => {
      Object.keys(rating.scores).forEach(category => categories.add(category));
    });

    const heatmapData = Array.from(categories).map(category => {
      const scores = ratings.map(rating => Number(rating.scores[category]));
      return {
        category,
        average: scores.reduce((a, b) => a + b, 0) / scores.length,
        count: scores.length,
      };
    });

    return heatmapData.sort((a, b) => b.average - a.average);
  };

  const data = calculateHeatmap();

  const getColor = (score: number) => {
    const hue = Math.min(score * 12, 120); // 0-120 range (red to green)
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Rating Heatmap</h3>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {data.map(({ category, average, count }) => (
            <div
              key={category}
              className="flex items-center space-x-4 p-2 rounded-lg"
              style={{ backgroundColor: `${getColor(average)}20` }}
            >
              <div className="flex-1">
                <div className="font-medium">{category}</div>
                <div className="text-sm text-gray-500">{count} ratings</div>
              </div>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: getColor(average) }}
              >
                {average.toFixed(1)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}