import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { profileService } from '../../services/profileService';
import type { AssessmentResult } from '../../types';

interface AssessmentState {
  results: AssessmentResult[];
  loading: boolean;
  error: string | null;
}

const initialState: AssessmentState = {
  results: [],
  loading: false,
  error: null,
};

export const submitAssessment = createAsyncThunk(
  'assessment/submit',
  async ({
    userId,
    type,
    result,
  }: {
    userId: string;
    type: string;
    result: AssessmentResult;
  }) => {
    const response = await profileService.submitAssessment(userId, type, result);
    return response;
  }
);

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    clearAssessmentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAssessment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAssessment.fulfilled, (state, action) => {
        state.loading = false;
        state.results.push(action.payload);
      })
      .addCase(submitAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to submit assessment';
      });
  },
});

export const { clearAssessmentError } = assessmentSlice.actions;
export default assessmentSlice.reducer;