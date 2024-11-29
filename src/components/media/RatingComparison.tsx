import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';

interface RatingComparisonProps {
  userRatings: Record<string, number>;
  averageRatings: Record<string, number>;
}

export function RatingComparison({ userRatings, averageRatings }: RatingComparisonProps) {
  const data = Object.keys(averageRatings).map(category => ({
    category,
    userRating: userRatings[category] || 0,
    averageRating: averageRatings[category] || 0,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-lg font-semibold">Your Ratings vs. Average</h3>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <Radar
                name="Your Rating"
                dataKey="userRating"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.3}
              />
              <Radar
                name="Average Rating"
                dataKey="averageRating"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}