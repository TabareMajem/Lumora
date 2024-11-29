import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mediaService } from '../../services/mediaService';
import type { MediaType } from '../../types';

interface MediaState {
  items: any[];
  currentItem: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: MediaState = {
  items: [],
  currentItem: null,
  loading: false,
  error: null,
};

export const searchMedia = createAsyncThunk(
  'media/search',
  async ({ query, type }: { query: string; type?: MediaType }) => {
    const results = await mediaService.searchMedia(query, type);
    return results;
  }
);

export const getMediaDetails = createAsyncThunk(
  'media/getDetails',
  async (id: string) => {
    const details = await mediaService.getMediaDetails(id);
    return details;
  }
);

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    clearMediaError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(searchMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search media';
      })
      .addCase(getMediaDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMediaDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(getMediaDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get media details';
      });
  },
});

export const { clearMediaError } = mediaSlice.actions;
export default mediaSlice.reducer;