import { prisma } from '../prisma';
import { type MediaType } from '@prisma/client';
import { parseJsonField } from '../utils/json';

export async function generateRecommendations(userId: string, mediaType?: MediaType) {
  // Get user's psychological assessments
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      assessments: true,
      feedback: {
        include: {
          media: true,
        },
      },
    },
  });

  if (!user) throw new Error('User not found');

  // Get media items based on user preferences
  const media = await prisma.media.findMany({
    where: {
      ...(mediaType && { type: mediaType }),
    },
    include: {
      game: true,
      filmSeries: true,
      awards: true,
    },
  });

  // Calculate recommendation scores based on user profile and preferences
  const recommendations = media.map(item => {
    // Implement your recommendation algorithm here
    const score = calculateRecommendationScore(item, user);

    return {
      userId,
      mediaId: item.id,
      score,
    };
  });

  // Save recommendations to database
  await prisma.recommendation.createMany({
    data: recommendations,
  });

  return recommendations;
}

function calculateRecommendationScore(media: any, user: any): number {
  // Implement your scoring algorithm here
  // This is a placeholder that returns a random score
  return Math.random() * 10;
}