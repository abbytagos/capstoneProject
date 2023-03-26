import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isFetching: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logoutStart: (state) => {
      state.isFetching = true;
    },
    logoutSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = null;
    },
    logoutFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    sendmailStart: (state) => {
      state.isFetching = true;
    },
    sendmailSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    sendmailFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    resetState: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = null;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  sendmailStart,
  sendmailSuccess,
  sendmailFailure,
  resetState,
} = userSlice.actions;

export default userSlice.reducer;
