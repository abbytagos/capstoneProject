import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isFetching: false,
  isEmailed: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.isFetching = true;
      state.isEmailed = false;
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
      state.isEmailed = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    sendmailStart: (state) => {
      state.isFetching = true;
      state.isEmailed = false;
    },
    sendmailSuccess: (state) => {
      state.isEmailed = true;
      state.isFetching = false;
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
    resetErrMsg: (state, action) => {
      state.error = action.payload;
    },
    updatedeliveryAddress: (state, action) => {
      state.currentUser.deliveryaddress = action.payload;
    },
    updatephoneNumber: (state, action) => {
      state.currentUser.phonenumber = action.payload;
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
  sendmailStart,
  sendmailSuccess,
  sendmailFailure,
  resetState,
  resetErrMsg,
  updatedeliveryAddress,
  updatephoneNumber
} = userSlice.actions;

export default userSlice.reducer;
