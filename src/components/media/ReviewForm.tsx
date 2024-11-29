import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardContent } from '../ui/Card';

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Comment must be at least 10 characters').max(500),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  mediaId: number;
  onSubmit: (data: ReviewFormData) => Promise<void>;
}

export function ReviewForm({ mediaId, onSubmit }: ReviewFormProps) {
  const [hoveredStar, setHoveredStar] = React.useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  const rating = watch('rating');

  const handleStarClick = (value: number) => {
    setValue('rating', value, { shouldValidate: true });
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Write a Review</h3>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleStarClick(value)}
                  onMouseEnter={() => setHoveredStar(value)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="p-1"
                >
                  <Star
                    className={`h-6 w-6 ${
                      value <= (hoveredStar || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Review
            </label>
            <textarea
              id="comment"
              rows={4}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.comment
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
              {...register('comment')}
            />
            {errors.comment && (
              <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}