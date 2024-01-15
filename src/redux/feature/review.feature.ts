import { ChatGptAgent, RoleService } from '@/lib/openai-stream';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
export interface Messages {
  id: string;
  role: string;
  content: string;
}

export interface ReviewState {
  messages: Messages[];
}

const initialState: ReviewState = {
  messages: [
    {
      id: nanoid(),
      role: RoleService.USER,
      content: 'Hello, how are you today?',
    },
  ],
};

export const review = createSlice({
  name: 'review',
  initialState,
  reducers: {
    addMessage: (state: ReviewState, action: PayloadAction<any>) => {
      state.messages.push(action.payload?.message);
    },
    updateMessage: (state: ReviewState, action: PayloadAction<any>) => {
      const idx = state.messages.findIndex(
        (message) => message.id === action.payload.id
      );
      if (idx !== -1) {
        state.messages[idx].content += action.payload.content;
      }
    },
  },
});

export const { addMessage, updateMessage } = review.actions;

export default review;
