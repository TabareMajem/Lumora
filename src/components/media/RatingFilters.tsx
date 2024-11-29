import React from 'react';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface RatingFiltersProps {
  onFilterChange: (filters: RatingFilters) => void;
  onSortChange: (sort: SortOption) => void;
}

export interface RatingFilters {
  minRating?: number;
  maxRating?: number;
  categories?: string[];
  dateRange?: [Date | null, Date | null];
}

export type SortOption = {
  field: string;
  direction: 'asc' | 'desc';
};

export function RatingFilters({ onFilterChange, onSortChange }: RatingFiltersProps) {
  const [filters, setFilters] = React.useState<RatingFilters>({});
  const [sort, setSort] = React.useState<SortOption>({ field: 'date', direction: 'desc' });

  const handleFilterChange = (newFilters: Partial<RatingFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSortChange = (field: string) => {
    const newSort = {
      field,
      direction: sort.field === field && sort.direction === 'desc' ? 'asc' : 'desc',
    };
    setSort(newSort);
    onSortChange(newSort);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter & Sort
          </h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Rating Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating Range
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max="10"
                value={filters.minRating || ''}
                onChange={(e) => handleFilterChange({ minRating: Number(e.target.value) })}
                className="w-20 rounded-md border-gray-300"
                placeholder="Min"
              />
              <span>to</span>
              <input
                type="number"
                min="1"
                max="10"
                value={filters.maxRating || ''}
                onChange={(e) => handleFilterChange({ maxRating: Number(e.target.value) })}
                className="w-20 rounded-md border-gray-300"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {['Direction', 'Acting', 'Story', 'Visuals', 'Sound'].map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const categories = filters.categories || [];
                    const newCategories = categories.includes(category)
                      ? categories.filter((c) => c !== category)
                      : [...categories, category];
                    handleFilterChange({ categories: newCategories });
                  }}
                  className={`${
                    filters.categories?.includes(category)
                      ? 'bg-indigo-100 border-indigo-300'
                      : ''
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <div className="flex flex-wrap gap-2">
              {['date', 'rating', 'category'].map((field) => (
                <Button
                  key={field}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSortChange(field)}
                  className="flex items-center space-x-1"
                >
                  <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                  {sort.field === field && (
                    sort.direction === 'desc' ? (
                      <SortDesc className="h-4 w-4" />
                    ) : (
                      <SortAsc className="h-4 w-4" />
                    )
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}