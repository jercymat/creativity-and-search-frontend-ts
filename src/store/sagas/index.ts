import { all, take, takeEvery } from "redux-saga/effects";
import { authActions } from "../reducers/auth";
import { authLogin, authLogout } from "./auth";
import { searchActions } from "../reducers/search";
import { searchGet } from "./search";
import { searchMapperActions } from "../reducers/search-mapper";
import {
  smAddSaga,
  smChangeThemeSaga,
  smCreateThemeSaga,
  smDeleteSaga,
  smDeleteThemeSaga,
  smEditThemeNoteSaga,
  smLoadSaga,
  smRenameThemeSaga,
} from "./search-mapper";

export default function* rootSaga() {
  yield all([
    // auth
    takeEvery(authActions.login.type, authLogin),
    takeEvery(authActions.logout.type, authLogout),

    // search
    takeEvery(searchActions.loadSearch.type, searchGet),

    // search mapper
    takeEvery(searchMapperActions.loadResults.type, smLoadSaga),
    takeEvery(searchMapperActions.addResults.type, smAddSaga),
    takeEvery(searchMapperActions.deleteResults.type, smDeleteSaga),
    takeEvery(searchMapperActions.createTheme.type, smCreateThemeSaga),
    takeEvery(searchMapperActions.changeTheme.type, smChangeThemeSaga),
    takeEvery(searchMapperActions.deleteTheme.type, smDeleteThemeSaga),
    takeEvery(searchMapperActions.renameTheme.type, smRenameThemeSaga),
    takeEvery(searchMapperActions.editThemeNote.type, smEditThemeNoteSaga),
  ]);
}
