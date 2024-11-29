import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ratingsApi } from '../../lib/api/ratings';
import type { DetailedRating } from '../../lib/db/repositories/ratingRepository';

interface RatingState {
  ratings: Record<string, DetailedRating[]>;
  userRatings: Record<string, DetailedRating>;
  averageRatings: Record<string, Record<string, number>>;
  loading: boolean;
  error: string | null;
}

const initialState: RatingState = {
  ratings: {},
  userRatings: {},
  averageRatings: {},
  loading: false,
  error: null,
};

export const submitRating = createAsyncThunk(
  'ratings/submit',
  async (rating: Omit<DetailedRating, 'id' | 'createdAt' | 'updatedAt'>) => {
    return ratingsApi.submitRating(rating);
  }
);

export const fetchMediaRatings = createAsyncThunk(
  'ratings/fetchByMedia',
  async (mediaId: string) => {
    const [ratings, averageRatings] = await Promise.all([
      ratingsApi.getRatingsByMedia(mediaId),
      ratingsApi.calculateAverageRatings(mediaId),
    ]);
    return { mediaId, ratings, averageRatings };
  }
);

export const fetchUserRating = createAsyncThunk(
  'ratings/fetchUserRating',
  async ({ userId, mediaId }: { userId: string; mediaId: string }) => {
    const rating = await ratingsApi.getUserRating(userId, mediaId);
    return { mediaId, rating };
  }
);

const ratingSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    clearRatingError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRating.fulfilled, (state, action) => {
        state.loading = false;
        const rating = action.payload;
        if (rating) {
          state.userRatings[rating.mediaId] = rating;
          // Update ratings list if it exists
          if (state.ratings[rating.mediaId]) {
            const index = state.ratings[rating.mediaId].findIndex(
              (r) => r.userId === rating.userId
            );
            if (index >= 0) {
              state.ratings[rating.mediaId][index] = rating;
            } else {
              state.ratings[rating.mediaId].push(rating);
            }
          }
        }
      })
      .addCase(submitRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to submit rating';
      })
      .addCase(fetchMediaRatings.fulfilled, (state, action) => {
        const { mediaId, ratings, averageRatings } = action.payload;
        state.ratings[mediaId] = ratings;
        state.averageRatings[mediaId] = averageRatings || {};
      })
      .addCase(fetchUserRating.fulfilled, (state, action) => {
        const { mediaId, rating } = action.payload;
        if (rating) {
          state.userRatings[mediaId] = rating;
        }
      });
  },
});

export const { clearRatingError } = ratingSlice.actions;
export default ratingSlice.reducer;