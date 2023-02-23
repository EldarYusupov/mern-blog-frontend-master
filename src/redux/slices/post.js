import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("/posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "/posts/fetchRemovePost",
  async (id) => {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {},
  extraReducers: {
    [fetchPosts.pending]: (state = initialState) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state = initialState, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state = initialState, action) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    [fetchTags.pending]: (state = initialState) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state = initialState, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state = initialState, action) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    [fetchRemovePost.pending]: (state = initialState, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const postsReducer = postSlice.reducer;
