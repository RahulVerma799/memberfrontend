import { call, put, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../../api/axiosInstance';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from '../slices/authSlice';

function* handleLogin(action) {
  try {
    const response = yield call(axiosInstance.post, '/users/login', action.payload);
    yield put(loginSuccess(response.data));
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    yield put(loginFailure(message));
  }
}

function* handleRegister(action) {
  try {
    const response = yield call(axiosInstance.post, '/users/register', action.payload);
    yield put(registerSuccess(response.data));
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    yield put(registerFailure(message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
}
