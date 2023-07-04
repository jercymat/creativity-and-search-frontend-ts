import { all, takeEvery } from "redux-saga/effects";
import { authActions } from "../reducers/auth";
import { authLogin, authLogout } from "./auth";
import { searchActions } from "../reducers/search";
import { searchGet } from "./search";

export default function* rootSaga() {
  yield all([
    // auth
    takeEvery(authActions.login.type, authLogin),
    takeEvery(authActions.logout.type, authLogout),

    // search
    takeEvery(searchActions.loadSearch.type, searchGet),
  ]);
}
