import { takeLatest, put } from "redux-saga/effects";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  addUserRequest,
  addUserSuccess,
  userFailure,
} from "./userSlice";

/* Fetch users */
function* fetchUsersSaga() {
  try {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    yield put(fetchUsersSuccess(users));
  } catch {
    yield put(userFailure("Failed to load users"));
  }
}

/* Add user */
function* addUserSaga(action) {
  try {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some(
      (u) => u.mobile === action.payload.mobile
    );

    if (exists) {
      yield put(userFailure("User already registered"));
      return;
    }

    const updatedUsers = [...users, action.payload];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    yield put(addUserSuccess(action.payload));
  } catch {
    yield put(userFailure("Failed to add user"));
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
  yield takeLatest(addUserRequest.type, addUserSaga);
}
