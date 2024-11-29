import React from 'react';
import { Brain } from 'lucide-react';

interface MatchScoreProps {
  score: number;
  factors?: {
    bartleTypeMatch: number;
    genreMatch: number;
    ratingWeight: number;
    awardBonus: number;
  };
}

export function MatchScore({ score, factors }: MatchScoreProps) {
  const percentage = Math.round(score * 100);
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-indigo-600" />
          <span className="font-medium">Match Score</span>
        </div>
        <span className="text-lg font-semibold text-indigo-600">{percentage}%</span>
      </div>

      {factors && (
        <div className="space-y-2">
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Personality Match</span>
              <span>{Math.round(factors.bartleTypeMatch * 100)}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${factors.bartleTypeMatch * 100}%` }}
              />
            </div>
          </div>

          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Genre Match</span>
              <span>{Math.round(factors.genreMatch * 100)}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${factors.genreMatch * 100}%` }}
              />
            </div>
          </div>

          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Award Bonus</span>
              <span>{Math.round(factors.awardBonus * 100)}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${factors.awardBonus * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}