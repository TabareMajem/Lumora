import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '../ui/Button';

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
}

interface FilterOptions {
  bartleType?: string;
  minScore?: number;
  hasAwards?: boolean;
  genres?: string[];
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState<FilterOptions>({});

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="mb-6">
      <Button
        variant="outline"
        onClick={() => setShowFilters(!showFilters)}
        className="mb-4"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filter Recommendations
      </Button>

      {showFilters && (
        <div className="grid gap-4 p-4 bg-white rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bartle Type
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => handleFilterChange({ bartleType: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="ACHIEVER">Achiever</option>
              <option value="EXPLORER">Explorer</option>
              <option value="SOCIALIZER">Socializer</option>
              <option value="KILLER">Killer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Match Score
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => handleFilterChange({ minScore: Number(e.target.value) })}
            >
              <option value="0">Any Score</option>
              <option value="0.7">70% or higher</option>
              <option value="0.8">80% or higher</option>
              <option value="0.9">90% or higher</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasAwards"
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => handleFilterChange({ hasAwards: e.target.checked })}
            />
            <label htmlFor="hasAwards" className="ml-2 text-sm text-gray-700">
              Show only award-winning titles
            </label>
          </div>
        </div>
      )}
    </div>
  );
}