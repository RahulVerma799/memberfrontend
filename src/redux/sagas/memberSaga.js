import { call, put, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../../api/axiosInstance';
import {
  fetchMembersRequest,
  fetchMembersSuccess,
  fetchMembersFailure,
  addMemberRequest,
  addMemberSuccess,
  addMemberFailure,
  deleteMemberRequest,
  deleteMemberSuccess,
  deleteMemberFailure,
} from '../slices/memberSlice';

function* handleFetchMembers() {
  try {
    const response = yield call(axiosInstance.get, '/members');
    yield put(fetchMembersSuccess(response.data));
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    yield put(fetchMembersFailure(message));
  }
}

function* handleAddMember(action) {
  try {
    const response = yield call(axiosInstance.post, '/members', action.payload);
    yield put(addMemberSuccess(response.data));
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    yield put(addMemberFailure(message));
  }
}

function* handleDeleteMember(action) {
  try {
    const response = yield call(axiosInstance.delete, `/members/${action.payload}`);
    yield put(deleteMemberSuccess(action.payload));
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    yield put(deleteMemberFailure(message));
  }
}

export default function* memberSaga() {
  yield takeLatest(fetchMembersRequest.type, handleFetchMembers);
  yield takeLatest(addMemberRequest.type, handleAddMember);
  yield takeLatest(deleteMemberRequest.type, handleDeleteMember);
}
