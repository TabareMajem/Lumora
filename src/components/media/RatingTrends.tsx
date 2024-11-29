import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import type { DetailedRating } from '../../lib/db/repositories/ratingRepository';

interface RatingTrendsProps {
  ratings: DetailedRating[];
  type: 'FILM' | 'SERIES' | 'GAME';
}

export function RatingTrends({ ratings, type }: RatingTrendsProps) {
  const calculateTrends = () => {
    const sortedRatings = [...ratings].sort(
      (a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
    );

    return sortedRatings.map(rating => ({
      date: new Date(rating.createdAt!).toLocaleDateString(),
      ...rating.scores,
    }));
  };

  const data = calculateTrends();
  const categories = Object.keys(data[0] || {}).filter(key => key !== 'date');

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-lg font-semibold">Rating Trends Over Time</h3>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              {categories.map((category, index) => (
                <Line
                  key={category}
                  type="monotone"
                  dataKey={category}
                  stroke={`hsl(${index * (360 / categories.length)}, 70%, 50%)`}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}