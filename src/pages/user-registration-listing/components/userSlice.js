import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: null,
  success: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersRequest(state) {
      state.loading = true;
    },
    fetchUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },

    addUserRequest(state) {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    addUserSuccess(state, action) {
      state.loading = false;
      state.users.push(action.payload);
      state.success = "User added successfully!";
    },

    userFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessages(state) {
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  addUserRequest,
  addUserSuccess,
  userFailure,
  clearMessages,
} = userSlice.actions;

export default userSlice.reducer;
