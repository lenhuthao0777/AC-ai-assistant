import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ReviewState {
  type: string;
  files: Array<any>;
}

export interface Files {
  sha: string;
  filename: string;
  status: any;
  additions: number;
  deletions: number;
  changes: number;
  blob_url: string;
  raw_url: string;
  contents_url: string;
  patch: string;
}

interface Action {
  file: {
    sha: string;
    filename: string;
    fileUrl: string;
  };
  type: string;
  status: boolean;
}

const initialState: ReviewState = {
  type: '',
  files: [],
};

export const review = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setFile: (state: ReviewState, action: PayloadAction<any>) => {
      if (action.payload.status) {
        state.files.push(action.payload.file);
      } else {
        const index = state.files.findIndex(
          (file) => file.sha === action.payload.file.sha
        );
        if (index !== -1) {
          state.files.splice(index, 1);
        }
      }
    },
  },
});

export const { setFile } = review.actions;

export default review;
