import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import type { DetailedRating } from '../../lib/db/repositories/ratingRepository';

interface RatingComparisonChartProps {
  userRatings: DetailedRating[];
  averageRatings: DetailedRating[];
  type: 'FILM' | 'SERIES' | 'GAME';
}

export function RatingComparisonChart({
  userRatings,
  averageRatings,
  type,
}: RatingComparisonChartProps) {
  const prepareData = () => {
    const categories = new Set<string>();
    [...userRatings, ...averageRatings].forEach(rating => {
      Object.keys(rating.scores).forEach(category => categories.add(category));
    });

    return Array.from(categories).map(category => {
      const userAvg = userRatings
        .map(r => Number(r.scores[category]))
        .reduce((a, b) => a + b, 0) / userRatings.length;

      const globalAvg = averageRatings
        .map(r => Number(r.scores[category]))
        .reduce((a, b) => a + b, 0) / averageRatings.length;

      return {
        category,
        userRating: userAvg || 0,
        averageRating: globalAvg || 0,
      };
    });
  };

  const data = prepareData();

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Your Ratings vs. Community Average</h3>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <Radar
                name="Your Ratings"
                dataKey="userRating"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.3}
              />
              <Radar
                name="Community Average"
                dataKey="averageRating"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}