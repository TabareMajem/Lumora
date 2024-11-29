import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { RatingFilters, type RatingFilters as FilterOptions, type SortOption } from './RatingFilters';
import { RatingHistogram } from './RatingHistogram';
import { RatingHeatmap } from './RatingHeatmap';
import type { DetailedRating } from '../../lib/db/repositories/ratingRepository';

interface RatingAggregatorProps {
  ratings: DetailedRating[];
  type: 'FILM' | 'SERIES' | 'GAME';
}

export function RatingAggregator({ ratings, type }: RatingAggregatorProps) {
  const [filteredRatings, setFilteredRatings] = React.useState(ratings);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');

  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...ratings];

    if (filters.minRating) {
      filtered = filtered.filter(rating => 
        Object.values(rating.scores).some(score => Number(score) >= filters.minRating!)
      );
    }

    if (filters.maxRating) {
      filtered = filtered.filter(rating =>
        Object.values(rating.scores).some(score => Number(score) <= filters.maxRating!)
      );
    }

    if (filters.categories?.length) {
      filtered = filtered.filter(rating =>
        filters.categories!.some(category => rating.scores[category])
      );
    }

    setFilteredRatings(filtered);
  };

  const handleSortChange = (sort: SortOption) => {
    const sorted = [...filteredRatings].sort((a, b) => {
      switch (sort.field) {
        case 'date':
          return sort.direction === 'desc'
            ? new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
            : new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
        case 'rating':
          const avgA = Object.values(a.scores).reduce((sum, score) => sum + Number(score), 0) / Object.keys(a.scores).length;
          const avgB = Object.values(b.scores).reduce((sum, score) => sum + Number(score), 0) / Object.keys(b.scores).length;
          return sort.direction === 'desc' ? avgB - avgA : avgA - avgB;
        default:
          return 0;
      }
    });
    setFilteredRatings(sorted);
  };

  return (
    <div className="space-y-6">
      <RatingFilters
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <RatingHeatmap ratings={filteredRatings} />
        {selectedCategory && (
          <RatingHistogram
            ratings={filteredRatings}
            category={selectedCategory}
          />
        )}
      </div>
    </div>
  );
}