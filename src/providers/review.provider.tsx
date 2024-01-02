'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';

interface InitialState {
  files: Array<{
    sha: string;
    fileName: string;
    fileUrl: string;
  }>;

  type: string | null;
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

const initialState: InitialState = {
  files: [],
  type: '',
};

const ReviewContext = createContext<{
  state: InitialState;
  dispatch: ({
    type,
    payload,
  }: {
    type?: string;
    payload?: InitialState;
  }) => void;
}>({
  state: initialState,
  dispatch: () => {},
});

export const useReview = () => useContext(ReviewContext);

const reducer = (
  state: InitialState,
  action: { type?: string; payload?: any }
) => {
  switch (action.type) {
    case 'concac':
      console.log(action);

      return {
        ...state,
      };

    default:
      return state;
  }
};

const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ReviewContext.Provider
      value={useMemo(() => ({ state, dispatch }), [state, dispatch])}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export { ReviewProvider };
