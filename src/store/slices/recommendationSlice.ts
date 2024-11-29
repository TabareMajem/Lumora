import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mediaService } from '../../services/mediaService';

interface RecommendationState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RecommendationState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetch',
  async (userId: string) => {
    const recommendations = await mediaService.getRecommendations(userId);
    return recommendations;
  }
);

const recommendationSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    clearRecommendationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recommendations';
      });
  },
});

export const { clearRecommendationError } = recommendationSlice.actions;
export default recommendationSlice.reducer;