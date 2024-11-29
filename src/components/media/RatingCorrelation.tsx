import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import type { DetailedRating } from '../../lib/db/repositories/ratingRepository';

interface RatingCorrelationProps {
  ratings: DetailedRating[];
  categoryX: string;
  categoryY: string;
}

export function RatingCorrelation({ ratings, categoryX, categoryY }: RatingCorrelationProps) {
  const calculateCorrelation = () => {
    const data = ratings.map(rating => ({
      x: Number(rating.scores[categoryX]),
      y: Number(rating.scores[categoryY]),
    }));

    // Calculate Pearson correlation coefficient
    const n = data.length;
    const sumX = data.reduce((acc, d) => acc + d.x, 0);
    const sumY = data.reduce((acc, d) => acc + d.y, 0);
    const sumXY = data.reduce((acc, d) => acc + d.x * d.y, 0);
    const sumX2 = data.reduce((acc, d) => acc + d.x * d.x, 0);
    const sumY2 = data.reduce((acc, d) => acc + d.y * d.y, 0);

    const correlation = (n * sumXY - sumX * sumY) /
      Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    return {
      data,
      correlation,
    };
  };

  const { data, correlation } = calculateCorrelation();

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">
          Correlation Analysis: {categoryX} vs {categoryY}
        </h3>
        <p className="text-sm text-gray-500">
          Correlation Coefficient: {correlation.toFixed(3)}
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis
                type="number"
                dataKey="x"
                name={categoryX}
                domain={[0, 10]}
                label={{ value: categoryX, position: 'bottom' }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name={categoryY}
                domain={[0, 10]}
                label={{ value: categoryY, angle: -90, position: 'left' }}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value: any) => [value, '']}
              />
              <Scatter
                name="Ratings"
                data={data}
                fill="#4f46e5"
                fillOpacity={0.6}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}