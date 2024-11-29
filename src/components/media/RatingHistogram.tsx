import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import type { DetailedRating } from '../../lib/db/repositories/ratingRepository';

interface RatingHistogramProps {
  ratings: DetailedRating[];
  category: string;
}

export function RatingHistogram({ ratings, category }: RatingHistogramProps) {
  const calculateHistogram = () => {
    const histogram = Array(10).fill(0);
    
    ratings.forEach(rating => {
      const score = Math.floor(Number(rating.scores[category]));
      if (score >= 1 && score <= 10) {
        histogram[score - 1]++;
      }
    });

    return histogram.map((count, index) => ({
      rating: index + 1,
      count,
    }));
  };

  const data = calculateHistogram();

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Rating Distribution - {category}</h3>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#4f46e5"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}