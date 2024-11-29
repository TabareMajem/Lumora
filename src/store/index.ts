import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import assessmentReducer from './slices/assessmentSlice';
import mediaReducer from './slices/mediaSlice';
import recommendationReducer from './slices/recommendationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    assessment: assessmentReducer,
    media: mediaReducer,
    recommendation: recommendationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;