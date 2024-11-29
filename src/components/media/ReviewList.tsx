import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Star, User } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import type { Review, User as UserType } from '../../lib/db';

interface ReviewListProps {
  reviews: (Review & { user: UserType })[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">User Reviews</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {review.user.username}
                  </p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">
                      {review.rating}
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}