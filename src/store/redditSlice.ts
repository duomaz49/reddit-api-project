import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getSubRedditPosts, getPostComments } from '../utils/api/api';

const initialState = {
  posts: [],
  error: false,
  isLoading: false,
  selectedSubreddit: '',
};

export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(startGetPosts());
    const posts = await getSubRedditPosts(subreddit);
    const postsWithMetadata = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: {
        data: [],
        isLoading: false,
        error: false,
      },
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

      if (!post.comments) {
        post.comments = { data: [], isLoading: true, error: false };
      } else {
        post.comments.isLoading = true;
        post.comments.error = false;
      }
    },
    getCommentsSuccess(state, action) {
      const post = state.posts[action.payload.index];
      post.comments.isLoading = false;
      post.comments.data = action.payload.comments;
    },
    getCommentsFailure(state, action) {
      const post = state.posts[action.payload];
      post.comments.isLoading = false;
      post.comments.error = true;
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

export const selectPosts = (state) => state.reddit.posts;

export const selectPostComments = (postIndex) =>
  createSelector([selectPosts], (posts) => posts[postIndex]?.comments || {});