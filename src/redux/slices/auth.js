import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts } from "./post";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state = initialState) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state = initialState, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state = initialState, action) => {
      state.status = "error";
      state.data = null;
    },
    [fetchAuthMe.pending]: (state = initialState) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state = initialState, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state = initialState, action) => {
      state.status = "error";
      state.data = null;
    },
    [fetchRegister.pending]: (state = initialState) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state = initialState, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state = initialState, action) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
