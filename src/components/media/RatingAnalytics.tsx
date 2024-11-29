import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { RatingStats } from './RatingStats';
import { RatingTrends } from './RatingTrends';
import { RatingComparison } from './RatingComparison';
import { RatingHeatmap } from './RatingHeatmap';
import type { DetailedRating } from '../../lib/db/repositories/ratingRepository';

interface RatingAnalyticsProps {
  ratings: DetailedRating[];
  userRatings?: DetailedRating[];
  type: 'FILM' | 'SERIES' | 'GAME';
}

export function RatingAnalytics({ ratings, userRatings, type }: RatingAnalyticsProps) {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState<'week' | 'month' | 'year' | 'all'>('month');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');

  const categories = React.useMemo(() => {
    const allCategories = new Set<string>();
    ratings.forEach(rating => {
      Object.keys(rating.scores).forEach(category => allCategories.add(category));
    });
    return Array.from(allCategories);
  }, [ratings]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Rating Analytics</h2>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Rating Statistics */}
            <RatingStats ratings={ratings} type={type} />

            {/* Rating Trends */}
            <RatingTrends ratings={ratings} type={type} />
          </div>
        </CardContent>
      </Card>

      {/* Rating Comparison */}
      {userRatings && (
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Your Ratings vs Community</h2>
          </CardHeader>
          <CardContent>
            <RatingComparison
              userRatings={userRatings[0]?.scores || {}}
              averageRatings={calculateAverageRatings(ratings)}
            />
          </CardContent>
        </Card>
      )}

      {/* Rating Heatmap */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Rating Distribution</h2>
        </CardHeader>
        <CardContent>
          <RatingHeatmap ratings={ratings} />
        </CardContent>
      </Card>
    </div>
  );
}

function calculateAverageRatings(ratings: DetailedRating[]): Record<string, number> {
  const totals: Record<string, { sum: number; count: number }> = {};

  ratings.forEach(rating => {
    Object.entries(rating.scores).forEach(([category, score]) => {
      if (!totals[category]) {
        totals[category] = { sum: 0, count: 0 };
      }
      totals[category].sum += Number(score);
      totals[category].count += 1;
    });
  });

  return Object.entries(totals).reduce((acc, [category, { sum, count }]) => {
    acc[category] = sum / count;
    return acc;
  }, {} as Record<string, number>);
}