import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { registerFailure, registerStart, registerSuccess } from "./userRedux";
import { sendmailFailure, sendmailSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err?.response?.data || 'An unknown error occurred'));
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure(err?.response?.data || 'An unknown error occurred'));
  }
};

export const sendmail = async (dispatch, user) => {
  try {
    const res = await publicRequest.post("/auth/sendmail", user);
    dispatch(sendmailSuccess(res.data));
  } catch (err) {
    dispatch(sendmailFailure(err?.response?.data || 'An unknown error occurred'));
  }
};
