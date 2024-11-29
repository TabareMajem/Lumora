import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import type { MediaType } from '../../lib/types/media';

interface DetailedRatingFormProps {
  mediaId: string;
  mediaType: MediaType;
  onSubmit: (data: any) => Promise<void>;
  initialRatings?: any;
}

export function DetailedRatingForm({
  mediaId,
  mediaType,
  onSubmit,
  initialRatings,
}: DetailedRatingFormProps) {
  const ratingSchema = getRatingSchema(mediaType);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ratingSchema),
    defaultValues: initialRatings,
  });

  const categories = getRatingCategories(mediaType);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Detailed Rating</h3>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((category) => (
              <div key={category.id} className="space-y-4">
                <h4 className="font-medium">{category.name}</h4>
                {category.subcategories?.map((subcategory) => (
                  <div key={subcategory.id} className="space-y-2">
                    <label className="text-sm text-gray-600">
                      {subcategory.name}
                    </label>
                    {renderRatingInput(subcategory, register, watch, setValue)}
                  </div>
                ))}
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
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : 'Submit Rating'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function getRatingSchema(mediaType: MediaType) {
  // Return appropriate zod schema based on media type
  return z.object({
    // Define schema based on media type categories
  });
}

function getRatingCategories(mediaType: MediaType) {
  switch (mediaType) {
    case 'FILM':
      return FILM_CATEGORIES;
    case 'SERIES':
      return SERIES_CATEGORIES;
    case 'GAME':
      return GAME_CATEGORIES;
    default:
      return [];
  }
}

function renderRatingInput(category: any, register: any, watch: any, setValue: any) {
  // Render appropriate input based on category type
  switch (category.type) {
    case 'number':
      return (
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setValue(category.id, value)}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                watch(category.id) >= value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      );
    case 'select':
      return (
        <select
          {...register(category.id)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {category.options.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    default:
      return null;
  }
}