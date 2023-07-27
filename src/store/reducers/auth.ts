import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LoginPayload {
  name: string;
  password: string;
}

export interface LoginSuccessPayload {
  userName: string;
}

interface AuthState {
  loading: boolean;
  isLoggedIn: boolean;
  userName: string;
}

const initialState: AuthState = {
  loading: false,
  isLoggedIn: localStorage.getItem("__im_username__") != null,
  userName: localStorage.getItem("__im_username__") ?? "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // defined payload but only used for sagas
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login(state, action: PayloadAction<LoginPayload>) {
      state.loading = true;
    },
    logout(state) {
      state.loading = false;
    },
    loginSuccess(state, action: PayloadAction<LoginSuccessPayload>) {
      state.loading = false;
      state.isLoggedIn = true;
      state.userName = action.payload.userName;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.isLoggedIn = false;
      state.userName = "";
    },
    // payload only used for error toasts
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginFailure(state) {
      state.loading = false;
    },
    // payload only used for error toasts
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logoutFailure(state) {
      state.loading = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
