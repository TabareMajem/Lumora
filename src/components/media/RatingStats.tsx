import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import type { DetailedRating } from '../../lib/db/repositories/ratingRepository';

interface RatingStatsProps {
  ratings: DetailedRating[];
  type: 'FILM' | 'SERIES' | 'GAME';
}

export function RatingStats({ ratings, type }: RatingStatsProps) {
  const calculateDistribution = () => {
    const distribution: Record<string, number[]> = {};
    
    ratings.forEach(rating => {
      Object.entries(rating.scores).forEach(([category, score]) => {
        if (!distribution[category]) {
          distribution[category] = Array(10).fill(0);
        }
        distribution[category][Math.floor(Number(score)) - 1]++;
      });
    });

    return Object.entries(distribution).map(([category, scores]) => ({
      category,
      ...scores.reduce((acc, count, index) => {
        acc[`${index + 1}`] = count;
        return acc;
      }, {} as Record<string, number>),
    }));
  };

  const data = calculateDistribution();

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-lg font-semibold">Rating Distribution</h3>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                <Bar
                  key={score}
                  dataKey={score.toString()}
                  stackId="a"
                  fill={`hsl(${(score - 1) * 24}, 70%, 50%)`}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}