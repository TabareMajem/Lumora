import { z } from 'zod';

export const feedbackSchema = z.object({
  feedbackType: z.enum(['LIKE', 'DISLIKE', 'RATE']),
  rating: z.number().min(1).max(10).optional(),
  comment: z.string().max(500).optional(),
});