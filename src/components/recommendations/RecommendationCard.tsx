import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import type { Media } from '../../lib/db';

interface RecommendationCardProps {
  media: Media;
  score: number;
}

export function RecommendationCard({ media, score }: RecommendationCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
          <img
            src={media.coverImageUrl}
            alt={media.title}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg">{media.title}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{score.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">{media.plotSummary}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {media.genres.map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}