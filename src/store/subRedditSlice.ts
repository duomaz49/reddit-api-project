import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit"
import { getSubReddits } from '../utils/api/api';
import type { AppDispatch, RootState } from "./store"

const initialState = {
  subreddits: [],
  error: false,
  isLoading: false,
};

const subRedditSlice = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {
    startGetSubreddits(state) {
      state.isLoading = true;
      state.error = false;
    },
    getSubredditsSuccess(state, action) {
      state.isLoading = false;
      state.subreddits = action.payload;
    },
    getSubredditsFailed(state) {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  getSubredditsFailed,
  getSubredditsSuccess,
  startGetSubreddits,
} = subRedditSlice.actions;

export default subRedditSlice.reducer;

export const fetchSubreddits = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action
> => async (dispatch: AppDispatch) => {
  try {
    dispatch(startGetSubreddits());
    const subreddits = await getSubReddits();
    dispatch(getSubredditsSuccess(subreddits));
  } catch (error) {
    dispatch(getSubredditsFailed());
  }
};

export const selectSubreddits = (state: RootState) => state.subReddit.subreddits;
