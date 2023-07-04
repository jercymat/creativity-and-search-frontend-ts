import { PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload, authActions } from "../reducers/auth";
import { call, put } from "redux-saga/effects";
import {
  AuthLoginAPIPayload,
  AuthLoginAPIResponse,
  AuthLogoutAPIPayload,
  AuthLogoutAPIResponse,
} from "../../model/api/auth";
import authAPI from "../apis/auth";
import { sagaAPIErrorHandler, sagaClientErrorHandler } from "./util";

export function* authLogin(action: PayloadAction<LoginPayload>) {
  console.log("[saga] login");

  const { name, password } = action.payload;
  const body: AuthLoginAPIPayload = {
    action: "sign_in",
    name,
    password,
  };

  try {
    const response: AuthLoginAPIResponse = yield call(authAPI.login, body);

    if (response.ret == 0) {
      localStorage.setItem("__im_username__", name);
      yield put(authActions.loginSuccess({ userName: name }));
    } else yield sagaAPIErrorHandler(authActions.loginFailure());
  } catch (e: unknown) {
    yield sagaClientErrorHandler(e, authActions.loginFailure());
  }
}

export function* authLogout() {
  console.log("[saga] logout");

  const body: AuthLogoutAPIPayload = {
    action: "sign_out",
  };

  try {
    const response: AuthLogoutAPIResponse = yield call(authAPI.logout, body);

    if (response.ret == 0) {
      localStorage.removeItem("__im_username__");
      yield put(authActions.logoutSuccess());
    } else yield sagaAPIErrorHandler(authActions.logoutFailure());
  } catch (e: unknown) {
    yield sagaClientErrorHandler(e, authActions.logoutFailure());
  }
}
