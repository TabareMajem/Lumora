import React from 'react';
import { Trophy } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

interface AwardBadgeProps {
  name: string;
  year: number;
  significance: number;
  winner: boolean;
  className?: string;
}

export function AwardBadge({ name, year, significance, winner, className }: AwardBadgeProps) {
  const getSignificanceColor = (significance: number) => {
    if (significance >= 9) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (significance >= 7) return 'bg-blue-100 text-blue-800 border-blue-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full border',
        getSignificanceColor(significance),
        winner ? 'font-medium' : 'opacity-75',
        className
      )}
    >
      <Trophy
        className={cn(
          'h-4 w-4 mr-1.5',
          winner ? 'fill-current' : 'stroke-current'
        )}
      />
      <span className="text-sm whitespace-nowrap">
        {name} {year}
      </span>
    </div>
  );
}