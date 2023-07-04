import { PayloadAction } from "@reduxjs/toolkit";
import { LoadSearchPayload, searchActions } from "../reducers/search";
import {
  SearchGetAPIPayload,
  SearchGetAPIResponse,
} from "../../model/api/search";
import { call, put } from "redux-saga/effects";
import searchAPI from "../apis/search";
import { sagaAPIErrorHandler, sagaClientErrorHandler } from "./util";

export function* searchGet(action: PayloadAction<LoadSearchPayload>) {
  console.log("[saga] load search");

  const { keyword, currentPage } = action.payload;
  const body: SearchGetAPIPayload = {
    action: "get_searchresult",
    keyword: keyword,
    count: "20",
    offset: (20 * (currentPage - 1)).toString(),
  };

  try {
    const response: SearchGetAPIResponse = yield call(searchAPI.get, body);

    if (response.ret == 0) {
      console.log(response);
      yield put(
        searchActions.loadSearchSuccess({
          keyword,
          page: currentPage,
          totalResults: response.totalResults,
          results: response.results,
        })
      );
    } else yield sagaAPIErrorHandler(searchActions.loadSearchFailure());
  } catch (e: unknown) {
    yield sagaClientErrorHandler(e, searchActions.loadSearchFailure());
  }
}
