import { all, fork } from 'redux-saga/effects';
import authSaga from './sagas/authSaga';
import memberSaga from './sagas/memberSaga';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(memberSaga),
  ]);
}
