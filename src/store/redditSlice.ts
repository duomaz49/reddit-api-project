import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getSubRedditPosts, getPostComments } from '../utils/api/api';

const initialState = {
  posts: [],
  error: false,
  isLoading: false,
  selectedSubreddit: '/r/pics/',
};

export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(startGetPosts());
    const posts = await getSubRedditPosts(subreddit);
    const postsWithMetadata = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));
    dispatch(getPostsSuccess(postsWithMetadata));
  } catch (error) {
    dispatch(getPostsFailure());
  }
};

export const fetchComments = (index, permalink) => async (dispatch) => {
  try {
    dispatch(startGetComments(index));
    const comments = await getPostComments(permalink);
    dispatch(getCommentsSuccess({ index, comments }));
  } catch (error) {
    dispatch(getCommentsFailure(index));
  }
};

const redditSlice = createSlice({
  name: 'redditPosts',
  initialState,
  reducers:{
    setPosts(state, action) {
      state.posts = action.payload;
    },
    startGetPosts(state) {
      state.isLoading = true;
      state.error = false;
    },
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },
    getPostsFailure(state) {
      state.isLoading = false;
      state.error = true;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
    },
    toggleShowComments(state, action) {
      const post = state.posts[action.payload];
      post.showingComments = !post.showingComments;
    },
    startGetComments(state, action) {
      const post = state.posts[action.payload];
      post.showingComments = !post.showingComments;
      if(!state.posts[action.payload].comments) {
        return;
      }
      state.posts[action.payload].comments.isLoading = true;
      state.posts[action.payload].comments.error = false;
    },
    getCommentsSuccess(state, action) {
      state.posts[action.payload.index].comments.isLoading = false;
      state.posts[action.payload.index].comments.data = action.payload.comments;
    },
    getCommentsFailure(state, action) {
      state.posts[action.payload].comments.isLoading = false;
      state.posts[action.payload].comments.error = true;
    },
  }
});

export const {
  setPosts,
  getPostsFailure,
  getPostsSuccess,
  startGetPosts,
  setSelectedSubreddit,
  toggleShowingComments,
  getCommentsFailure,
  getCommentsSuccess,
  startGetComments,
} = redditSlice.actions;

export default redditSlice.reducer;

const selectPosts = (state) => state.reddit.posts;
export const selectSelectedSubreddit = (state) =>
  state.reddit.selectedSubreddit;