import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Calculator, TrendingUp, ChartBar } from 'lucide-react';
import type { DetailedRating } from '../../lib/db/repositories/ratingRepository';

interface RatingStatisticsProps {
  ratings: DetailedRating[];
  category: string;
}

export function RatingStatistics({ ratings, category }: RatingStatisticsProps) {
  const calculateStats = () => {
    const scores = ratings
      .map(r => Number(r.scores[category]))
      .filter(score => !isNaN(score));

    if (!scores.length) return null;

    // Basic statistics
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const sortedScores = [...scores].sort((a, b) => a - b);
    const median = sortedScores[Math.floor(scores.length / 2)];
    
    // Mode calculation
    const frequency: Record<number, number> = {};
    scores.forEach(score => {
      frequency[score] = (frequency[score] || 0) + 1;
    });
    const mode = Object.entries(frequency)
      .reduce((a, b) => (b[1] > a[1] ? b : a))[0];

    // Variance and Standard Deviation
    const variance = scores.reduce((acc, score) => 
      acc + Math.pow(score - mean, 2), 0) / scores.length;
    const stdDev = Math.sqrt(variance);

    // Quartiles
    const q1 = sortedScores[Math.floor(scores.length * 0.25)];
    const q3 = sortedScores[Math.floor(scores.length * 0.75)];

    return {
      mean,
      median,
      mode: Number(mode),
      stdDev,
      variance,
      q1,
      q3,
      min: sortedScores[0],
      max: sortedScores[scores.length - 1],
      count: scores.length,
    };
  };

  const stats = calculateStats();
  if (!stats) return null;

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold flex items-center">
          <Calculator className="h-5 w-5 mr-2" />
          Statistical Analysis - {category}
        </h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div>
              <span className="text-sm text-gray-500">Mean</span>
              <p className="font-semibold">{stats.mean.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Median</span>
              <p className="font-semibold">{stats.median.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Mode</span>
              <p className="font-semibold">{stats.mode.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Standard Deviation</span>
              <p className="font-semibold">{stats.stdDev.toFixed(2)}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-gray-500">Q1 (25th Percentile)</span>
              <p className="font-semibold">{stats.q1.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Q3 (75th Percentile)</span>
              <p className="font-semibold">{stats.q3.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Range</span>
              <p className="font-semibold">{stats.min.toFixed(2)} - {stats.max.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Total Ratings</span>
              <p className="font-semibold">{stats.count}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}