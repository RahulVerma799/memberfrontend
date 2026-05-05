import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  members: [],
  isLoading: false,
  error: null,
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    fetchMembersRequest: (state) => {
      state.isLoading = true;
    },
    fetchMembersSuccess: (state, action) => {
      state.isLoading = false;
      state.members = action.payload;
    },
    fetchMembersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addMemberRequest: (state) => {
      state.isLoading = true;
    },
    addMemberSuccess: (state, action) => {
      state.isLoading = false;
      state.members.push(action.payload);
    },
    addMemberFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteMemberRequest: (state) => {
      state.isLoading = true;
    },
    deleteMemberSuccess: (state, action) => {
      state.isLoading = false;
      state.members = state.members.filter((m) => m._id !== action.payload);
    },
    deleteMemberFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateMemberRequest: (state) => {
      state.isLoading = true;
    },
    updateMemberSuccess: (state, action) => {
      state.isLoading = false;
      const index = state.members.findIndex((m) => m._id === action.payload._id);
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    },
    updateMemberFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMembersRequest,
  fetchMembersSuccess,
  fetchMembersFailure,
  addMemberRequest,
  addMemberSuccess,
  addMemberFailure,
  deleteMemberRequest,
  deleteMemberSuccess,
  deleteMemberFailure,
  updateMemberRequest,
  updateMemberSuccess,
  updateMemberFailure,
} = memberSlice.actions;

export default memberSlice.reducer;
