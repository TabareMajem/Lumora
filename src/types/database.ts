import { type Prisma } from '@prisma/client';

export type UserWithAssessments = Prisma.UserGetPayload<{
  include: {
    assessments: true;
  };
}>;

export type MediaWithDetails = Prisma.MediaGetPayload<{
  include: {
    game: true;
    filmSeries: true;
    awards: true;
  };
}>;

export type RecommendationWithMedia = Prisma.RecommendationGetPayload<{
  include: {
    media: {
      include: {
        game: true;
        filmSeries: true;
      };
    };
  };
}>;