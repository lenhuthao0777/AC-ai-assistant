import { configureStore } from '@reduxjs/toolkit';
import { review } from './feature/review.feature';

export const makeStore = () => {
  return configureStore({
    reducer: {
      review: review.reducer,
    },
    devTools: true,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
