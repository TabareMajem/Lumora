import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, Gamepad, Palette, Music, Book, Zap, Lightbulb, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

const ratingSchema = z.object({
  gameplay: z.number().min(1).max(10),
  graphics: z.number().min(1).max(10),
  audio: z.number().min(1).max(10),
  story: z.number().min(1).max(10),
  performance: z.number().min(1).max(10),
  content: z.number().min(1).max(10),
  innovation: z.number().min(1).max(10),
  replayability: z.number().min(1).max(10),
  comment: z.string().max(500).optional(),
});

type RatingFormData = z.infer<typeof ratingSchema>;

interface GameRatingFormProps {
  gameId: string;
  onSubmit: (data: RatingFormData) => Promise<void>;
  initialRatings?: Partial<RatingFormData>;
}

export function GameRatingForm({ gameId, onSubmit, initialRatings }: GameRatingFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RatingFormData>({
    resolver: zodResolver(ratingSchema),
    defaultValues: initialRatings || {
      gameplay: 5,
      graphics: 5,
      audio: 5,
      story: 5,
      performance: 5,
      content: 5,
      innovation: 5,
      replayability: 5,
    },
  });

  const ratingCategories = [
    { name: 'gameplay', label: 'Gameplay', icon: Gamepad },
    { name: 'graphics', label: 'Graphics', icon: Palette },
    { name: 'audio', label: 'Audio', icon: Music },
    { name: 'story', label: 'Story', icon: Book },
    { name: 'performance', label: 'Performance', icon: Zap },
    { name: 'content', label: 'Content', icon: Star },
    { name: 'innovation', label: 'Innovation', icon: Lightbulb },
    { name: 'replayability', label: 'Replayability', icon: RefreshCw },
  ];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Rate This Game</h3>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {ratingCategories.map(({ name, label, icon: Icon }) => (
              <div key={name} className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setValue(name as keyof RatingFormData, value)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                        watch(name as keyof RatingFormData) >= value
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                {errors[name as keyof RatingFormData] && (
                  <p className="text-sm text-red-600">
                    {errors[name as keyof RatingFormData]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional Comments
            </label>
            <textarea
              {...register('comment')}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.comment && (
              <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : 'Submit Rating'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}