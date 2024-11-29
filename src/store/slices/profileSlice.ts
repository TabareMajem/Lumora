import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { profileService } from '../../services/profileService';
import type { User } from '../../types';

interface ProfileState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (userId: string) => {
    const profile = await profileService.getProfile(userId);
    return profile;
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ userId, data }: { userId: string; data: Partial<User> }) => {
    const updatedProfile = await profileService.updateProfile(userId, data);
    return updatedProfile;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const { clearProfileError } = profileSlice.actions;
export default profileSlice.reducer;