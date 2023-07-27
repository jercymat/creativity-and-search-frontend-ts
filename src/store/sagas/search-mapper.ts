import { all, call, put } from "redux-saga/effects";
import searchMapperAPI from "../apis/search-mapper";
import {
  SMAddAPIPayload,
  SMAddAPIResponse,
  SMCreateThemeAPIReponse,
  SMLoadAPIResponse,
} from "../../model/api/search-mapper";
import { searchMapperActions } from "../reducers/search-mapper";
import { sagaAPIErrorHandler, sagaClientErrorHandler } from "./util";
import { SearchResult } from "../../model/search";
import { PayloadAction } from "@reduxjs/toolkit";
import { BaseAPIResponse } from "../../model/common";

export function* smLoadSaga() {
  console.log("[saga] load search mapper results");

  try {
    const response: SMLoadAPIResponse = yield call(searchMapperAPI.load);

    if (response.ret == 0) {
      console.log(response);

      const smThemes = [response.relist[0]].concat(
        response.relist
          .slice(1)
          .filter((theme) => theme.searchResultList.length > 0)
      );

      yield put(searchMapperActions.loadResultsSuccess(smThemes));
    } else yield sagaAPIErrorHandler(searchMapperActions.loadResultsFail());
  } catch (e: unknown) {
    yield sagaClientErrorHandler(e, searchMapperActions.loadResultsFail());
  }
}

export function* smAddSaga(action: PayloadAction<SearchResult>) {
  console.log("[saga] add search mapper results");

  const body: SMAddAPIPayload = {
    action: "add_searchresult",
    data: {
      name: action.payload.title,
      url: action.payload.url,
      snippet: action.payload.description,
    },
  };

  try {
    const response: SMAddAPIResponse = yield call(searchMapperAPI.add, body);

    if (response.ret == 0) {
      console.log(response);

      yield all([
        put(searchMapperActions.addResultsSuccess()),
        put(searchMapperActions.loadResults()),
      ]);
    } else yield sagaAPIErrorHandler(searchMapperActions.addResultsFail());
  } catch (e: unknown) {
    yield sagaClientErrorHandler(e, searchMapperActions.addResultsFail());
  }
}

export function* smDeleteSaga(action: PayloadAction<number>) {
  console.log("[saga] delete search mapper results");

  try {
    const response: BaseAPIResponse = yield call(
      searchMapperAPI.delete,
      action.payload.toString()
    );

    if (response.ret == 0) {
      console.log(response);

      yield all([
        put(searchMapperActions.deleteResultsSuccess()),
        put(searchMapperActions.loadResults()),
      ]);
    } else yield sagaAPIErrorHandler(searchMapperActions.deleteResultsFail());
  } catch (e: unknown) {
    yield sagaClientErrorHandler(e, searchMapperActions.deleteResultsFail());
  }
}

export function* smCreateThemeSaga(
  action: PayloadAction<{ firstResultID: number; themeName: string }>
) {
  console.log("[saga] create theme of search mapper results");

  try {
    const response: SMCreateThemeAPIReponse = yield call(
      searchMapperAPI.createTheme,
      action.payload.themeName
    );

    if (response.ret == 0) {
      console.log(response);

      yield put(
        searchMapperActions.changeTheme({
          resultID: action.payload.firstResultID,
          toThemeID: response.themeID,
        })
      );
    } else yield sagaAPIErrorHandler(searchMapperActions.createThemeFail());
  } catch (e: unknown) {
    yield sagaClientErrorHandler(e, searchMapperActions.createThemeFail());
  }
}

export function* smChangeThemeSaga(
  action: PayloadAction<{ resultID: number; toThemeID: number }>
) {
  console.log("[saga] change theme of search mapper results");

  try {
    const response: BaseAPIResponse = yield call(
      searchMapperAPI.changeTheme,
      action.payload
    );

    if (response.ret == 0) {
      console.log(response);

      yield all([
        put(searchMapperActions.changeThemeSuccess()),
        put(searchMapperActions.closeThemeDialog()),
        put(searchMapperActions.loadResults()),
      ]);
    } else yield sagaAPIErrorHandler(searchMapperActions.changeThemeFail());
  } catch (e: unknown) {
    yield sagaClientErrorHandler(e, searchMapperActions.changeThemeFail());
  }
}

export function* smDeleteThemeSaga(action: PayloadAction<number>) {
  console.log("[saga] delete theme of search mapper results");

  try {
    const response: BaseAPIResponse = yield call(
      searchMapperAPI.deleteTheme,
      action.payload
    );

    if (response.ret == 0) {
      console.log(response);

      yield all([
        put(searchMapperActions.deleteThemeSuccess()),
        put(searchMapperActions.loadResults()),
      ]);
    } else yield sagaAPIErrorHandler(searchMapperActions.deleteThemeFail());
  } catch (e: unknown) {
    yield sagaClientErrorHandler(e, searchMapperActions.deleteThemeFail());
  }
}

export function* smRenameThemeSaga(
  action: PayloadAction<{ themeID: number; name: string }>
) {
  console.log("[saga] rename theme of search mapper results");

  try {
    const response: BaseAPIResponse = yield call(
      searchMapperAPI.renameTheme,
      action.payload
    );

    if (response.ret == 0) {
      console.log(response);

      yield all([
        put(searchMapperActions.renameThemeSuccess()),
        put(searchMapperActions.closeTextDialog()),
        put(searchMapperActions.loadResults()),
      ]);
    } else yield sagaAPIErrorHandler(searchMapperActions.renameThemeFail());
  } catch (e: unknown) {
    yield sagaClientErrorHandler(e, searchMapperActions.renameThemeFail());
  }
}

export function* smEditThemeNoteSaga(
  action: PayloadAction<{
    themeID: number;
    noteID: number;
    content: string;
  }>
) {
  console.log("[saga] edit theme note of search mapper results");

  try {
    const response: BaseAPIResponse =
      action.payload.noteID == -1
        ? yield call(searchMapperAPI.addThemeNote, action.payload)
        : yield call(searchMapperAPI.editThemeNote, action.payload);

    if (response.ret == 0) {
      console.log(response);

      yield all([
        put(searchMapperActions.editThemeNoteSuccess()),
        put(searchMapperActions.closeTextDialog()),
        put(searchMapperActions.loadResults()),
      ]);
    } else yield sagaAPIErrorHandler(searchMapperActions.editThemeNoteFail());
  } catch (e: unknown) {
    yield sagaClientErrorHandler(e, searchMapperActions.editThemeNoteFail());
  }
}
