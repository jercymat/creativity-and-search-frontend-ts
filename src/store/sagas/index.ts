import { all, takeEvery } from 'redux-saga/effects';
import { authActions } from '../reducers/auth';
import { authLogin, authLogout } from './auth';

export default function* rootSaga() {
  yield all([
    // auth
    takeEvery(authActions.login.type, authLogin),
    takeEvery(authActions.logout.type, authLogout),
  ]);
}