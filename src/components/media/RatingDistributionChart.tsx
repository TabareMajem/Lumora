import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import type { DetailedRating } from '../../lib/db/repositories/ratingRepository';

interface RatingDistributionChartProps {
  ratings: DetailedRating[];
  category: string;
}

export function RatingDistributionChart({ ratings, category }: RatingDistributionChartProps) {
  const prepareData = () => {
    const distribution = Array(10).fill(0);
    
    ratings.forEach(rating => {
      const score = Math.floor(Number(rating.scores[category]));
      if (score >= 1 && score <= 10) {
        distribution[score - 1]++;
      }
    });

    return distribution.map((count, index) => ({
      rating: index + 1,
      count,
      percentage: (count / ratings.length) * 100,
    }));
  };

  const data = prepareData();

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Rating Distribution - {category}</h3>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" label={{ value: 'Rating', position: 'bottom' }} />
              <YAxis yAxisId="left" label={{ value: 'Count', angle: -90, position: 'left' }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{ value: 'Percentage', angle: 90, position: 'right' }}
              />
              <Tooltip
                formatter={(value: any, name: string) => [
                  name === 'percentage' ? `${value.toFixed(1)}%` : value,
                  name === 'percentage' ? 'Percentage' : 'Count'
                ]}
              />
              <Bar
                yAxisId="left"
                dataKey="count"
                fill="#4f46e5"
                radius={[4, 4, 0, 0]}
                name="Count"
              />
              <Bar
                yAxisId="right"
                dataKey="percentage"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                name="Percentage"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}