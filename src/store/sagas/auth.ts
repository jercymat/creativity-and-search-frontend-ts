import { PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload, authActions } from "../reducers/auth";
import { all, call, put } from "redux-saga/effects";
import {
  AuthLoginAPIPayload,
  AuthLoginResponse,
  AuthLogoutAPIPayload,
  AuthLogoutResponse,
} from "../../model/api/auth";
import authAPI from "../apis/auth";
import { AxiosError, isAxiosError } from "axios";
import { errorMessage } from "../../assets/constants/messages";
import { globalActions } from "../reducers/global";

export function* authLogin(action: PayloadAction<LoginPayload>) {
  console.log('[saga] login');

  const { name, password } = action.payload;
  const body: AuthLoginAPIPayload = {
    action: 'sign_in',
    name,
    password,
  };

  try {
    const response: AuthLoginResponse = yield call(authAPI.login, body);

    if (response.ret == 0) {
      localStorage.setItem('__im_username__', name);
      yield put(authActions.loginSuccess({ userName: name }));
    } else {
      yield all([
        put(authActions.loginFailure()),
        put(globalActions.showErrorToast({ error: errorMessage.apiError })),
      ]);
    }
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      const error = e as AxiosError;
      yield all([
        put(authActions.loginFailure()),
        put(globalActions.showErrorToast({ error: `${error.code}: ${error.message}` })),
      ]);
    } else {
      yield all([
        put(authActions.loginFailure()),
        put(globalActions.showErrorToast({ error: errorMessage.httpClientError })),
      ]);
    }
  }
}

export function* authLogout() {
  console.log('[saga] logout');

  const body: AuthLogoutAPIPayload = {
    action: 'sign_out',
  };

  try {
    const response: AuthLogoutResponse = yield call(authAPI.logout, body);

    if (response.ret == 0) {
      localStorage.removeItem('__im_username__');
      yield put(authActions.logoutSuccess());
    } else {
      yield all([
        put(authActions.logoutFailure()),
        put(globalActions.showErrorToast({ error: errorMessage.apiError })),
      ]);
    }
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      const error = e as AxiosError;
      yield all([
        put(authActions.logoutFailure()),
        put(globalActions.showErrorToast({ error: `${error.code}: ${error.message}` })),
      ]);
    } else {
      yield all([
        put(authActions.logoutFailure()),
        put(globalActions.showErrorToast({ error: errorMessage.httpClientError })),
      ]);
    }
  }
}