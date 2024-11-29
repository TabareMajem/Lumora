import React from 'react';
import { Filter, Calendar, Tag } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import type { MediaType } from '../../lib/types/media';

interface AdvancedFiltersProps {
  type: MediaType;
  onFilterChange: (filters: AdvancedFilterOptions) => void;
}

export interface AdvancedFilterOptions {
  dateRange?: [Date | null, Date | null];
  categories?: string[];
  ratingRange?: [number | null, number | null];
  genres?: string[];
  platforms?: string[];
  tags?: string[];
}

export function AdvancedFilters({ type, onFilterChange }: AdvancedFiltersProps) {
  const [filters, setFilters] = React.useState<AdvancedFilterOptions>({});

  const handleFilterChange = (newFilters: Partial<AdvancedFilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const getCategoriesByType = (type: MediaType) => {
    switch (type) {
      case 'FILM':
        return ['Direction', 'Cinematography', 'Acting', 'Screenplay', 'Sound'];
      case 'SERIES':
        return ['Writing', 'Acting', 'Production', 'Story Arc', 'Character Development'];
      case 'GAME':
        return ['Gameplay', 'Graphics', 'Sound', 'Story', 'Performance'];
      default:
        return [];
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Advanced Filters
          </h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-2" />
              Date Range
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="date"
                className="rounded-md border-gray-300"
                onChange={(e) => {
                  const dateRange = [e.target.value, filters.dateRange?.[1]];
                  handleFilterChange({ dateRange: dateRange as [Date | null, Date | null] });
                }}
              />
              <span>to</span>
              <input
                type="date"
                className="rounded-md border-gray-300"
                onChange={(e) => {
                  const dateRange = [filters.dateRange?.[0], e.target.value];
                  handleFilterChange({ dateRange: dateRange as [Date | null, Date | null] });
                }}
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="h-4 w-4 inline mr-2" />
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {getCategoriesByType(type).map((category) => (
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

          {/* Rating Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating Range
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max="10"
                className="w-20 rounded-md border-gray-300"
                placeholder="Min"
                onChange={(e) => {
                  const ratingRange = [Number(e.target.value), filters.ratingRange?.[1]];
                  handleFilterChange({ ratingRange: ratingRange as [number | null, number | null] });
                }}
              />
              <span>to</span>
              <input
                type="number"
                min="1"
                max="10"
                className="w-20 rounded-md border-gray-300"
                placeholder="Max"
                onChange={(e) => {
                  const ratingRange = [filters.ratingRange?.[0], Number(e.target.value)];
                  handleFilterChange({ ratingRange: ratingRange as [number | null, number | null] });
                }}
              />
            </div>
          </div>

          {/* Clear Filters */}
          <Button
            variant="outline"
            onClick={() => {
              setFilters({});
              onFilterChange({});
            }}
            className="w-full"
          >
            Clear All Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}