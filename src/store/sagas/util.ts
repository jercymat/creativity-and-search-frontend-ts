import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";
import { globalActions } from "../reducers/global";
import { all, put } from "redux-saga/effects";
import { errorMessage } from "../../assets/constants/messages";

export function sagaClientErrorHandler(e: unknown, failAction: PayloadAction) {
  if (isAxiosError(e)) {
    const error = e as AxiosError;
    return all([
      put(failAction),
      put(
        globalActions.showErrorToast({
          error: `${error.code}: ${error.message}`,
        })
      ),
    ]);
  } else {
    return all([
      put(failAction),
      put(
        globalActions.showErrorToast({ error: errorMessage.httpClientError })
      ),
    ]);
  }
}

export function sagaAPIErrorHandler(failAction: PayloadAction) {
  return all([
    put(failAction),
    put(globalActions.showErrorToast({ error: errorMessage.apiError })),
  ]);
}
