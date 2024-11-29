import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { TrendingUp, Calendar } from 'lucide-react';
import type { DetailedRating } from '../../lib/db/repositories/ratingRepository';

interface RatingTrendAnalysisProps {
  ratings: DetailedRating[];
  category: string;
}

export function RatingTrendAnalysis({ ratings, category }: RatingTrendAnalysisProps) {
  const [timeframe, setTimeframe] = React.useState<'week' | 'month' | 'year'>('month');

  const calculateTrends = () => {
    const sortedRatings = [...ratings]
      .sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());

    const now = new Date();
    const timeframeDays = {
      week: 7,
      month: 30,
      year: 365,
    };

    const filteredRatings = sortedRatings.filter(rating => {
      const ratingDate = new Date(rating.createdAt!);
      const diffDays = (now.getTime() - ratingDate.getTime()) / (1000 * 60 * 60 * 24);
      return diffDays <= timeframeDays[timeframe];
    });

    // Calculate moving average
    const movingAverageWindow = timeframe === 'week' ? 3 : timeframe === 'month' ? 7 : 30;
    const movingAverages = filteredRatings.map((rating, index) => {
      const windowStart = Math.max(0, index - movingAverageWindow + 1);
      const window = filteredRatings.slice(windowStart, index + 1);
      const average = window.reduce((sum, r) => sum + Number(r.scores[category]), 0) / window.length;
      
      return {
        date: new Date(rating.createdAt!).toLocaleDateString(),
        rating: Number(rating.scores[category]),
        movingAverage: average,
      };
    });

    return movingAverages;
  };

  const data = calculateTrends();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Rating Trends - {category}
          </h3>
          <div className="flex items-center space-x-2">
            {(['week', 'month', 'year'] as const).map((t) => (
              <Button
                key={t}
                variant={timeframe === t ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#4f46e5"
                dot={{ r: 4 }}
                name="Rating"
              />
              <Line
                type="monotone"
                dataKey="movingAverage"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                name="Moving Average"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}