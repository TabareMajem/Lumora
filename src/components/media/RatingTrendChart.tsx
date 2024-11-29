import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { format } from 'date-fns';
import type { DetailedRating } from '../../lib/db/repositories/ratingRepository';

interface RatingTrendChartProps {
  ratings: DetailedRating[];
  category: string;
  timeframe: 'week' | 'month' | 'year' | 'all';
}

export function RatingTrendChart({ ratings, category, timeframe }: RatingTrendChartProps) {
  const prepareData = () => {
    const sortedRatings = [...ratings].sort(
      (a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
    );

    const data = sortedRatings.map(rating => ({
      date: new Date(rating.createdAt!),
      rating: Number(rating.scores[category]) || 0,
    }));

    // Filter data based on timeframe
    const now = new Date();
    const filtered = data.filter(item => {
      switch (timeframe) {
        case 'week':
          return now.getTime() - item.date.getTime() <= 7 * 24 * 60 * 60 * 1000;
        case 'month':
          return now.getTime() - item.date.getTime() <= 30 * 24 * 60 * 60 * 1000;
        case 'year':
          return now.getTime() - item.date.getTime() <= 365 * 24 * 60 * 60 * 1000;
        default:
          return true;
      }
    });

    return filtered.map(item => ({
      date: format(item.date, 'MMM dd, yyyy'),
      rating: item.rating,
      average: calculateMovingAverage(filtered, item.date),
    }));
  };

  const calculateMovingAverage = (data: any[], date: Date) => {
    const window = 7; // 7-day moving average
    const relevantRatings = data.filter(
      item => 
        Math.abs(item.date.getTime() - date.getTime()) <= window * 24 * 60 * 60 * 1000
    );
    return relevantRatings.reduce((sum, item) => sum + item.rating, 0) / relevantRatings.length;
  };

  const data = prepareData();

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Rating Trends - {category}</h3>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#4f46e5"
                name="Individual Ratings"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="average"
                stroke="#10b981"
                name="7-Day Moving Average"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}