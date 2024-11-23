import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    loginRequest(state, action) {
      (state.loading = true),
        (state.isAuthenticated = false),
        (state.user = {}),
        (state.error = null);
    },
    loginSuccess(state, action) {
      (state.loading = false),
        (state.isAuthenticated = true),
        (state.user = action.payload),
        (state.error = null);
    },
    loginFailed(state, action) {
      (state.loading = false),
        (state.isAuthenticated = false),
        (state.user = {}),
        (state.error = action.payload);
    },
    /* save user data while refresh page  */
    loadUserRequest(state, action) {
      (state.loading = true),
        (state.isAuthenticated = false),
        (state.user = {}),
        (state.error = null);
    },
    loadUserSuccess(state, action) {
      (state.loading = false),
        (state.isAuthenticated = true),
        (state.user = action.payload),
        (state.error = null);
    },
    loadUserFailed(state, action) {
      (state.loading = false),
        (state.isAuthenticated = false),
        (state.user = {}),
        (state.error = action.payload);
    },
    /* logout */
    logoutSuccess(state, action) {
      (state.loading = false),
        (state.isAuthenticated = false),
        (state.user = {}),
        (state.error = null);
      state.message = action.payload;
    },
    logoutFailed(state, action) {
      (state.loading = false),
        (state.isAuthenticated = state.isAuthenticated),
        (state.user = state.user),
        (state.error = action.payload);
    },

    /* Update Password */

    updatePasswordRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },

    /* Update Profile */

    updateProfileRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },

    /* update profile after reset */

    updateProfileResetAfterUpdate(state, action) {
      state.error = null;
      state.isUpdated = false;
      state.message = null;
    },

    /*  For clear ERRORs  */

    clearAllError(state, action) {
      (state.error = null), (state.user = state.user);
    },
  },
});

/* Login user */

export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/user/login",
      { email, password },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(userSlice.actions.loginSuccess(data.user));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
  }
};

/* Get user */

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/user/me",

      { withCredentials: true }
    );
    dispatch(userSlice.actions.loadUserSuccess(data.user));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.loadUserFailed(error.response.data.message));
  }
};

/* logout user */

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/user/logout",

      { withCredentials: true }
    );
    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response.data.message));
  }
};

/* Update password */

export const updatePassword =
  (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());

    try {
      const data = await axios.put(
        "http://localhost:4000/api/v1/user/update/password",
        { currentPassword, newPassword, confirmNewPassword },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(userSlice.actions.updatePasswordSuccess(data.message));
      dispatch(userSlice.actions.clearAllError());
    } catch (error) {
      dispatch(
        userSlice.actions.updatePasswordFailed(error.response.data.message)
      );
    }
  };


/* Update Profile*/

export const updateProfile =(formData) => async (dispatch) => {
    dispatch(userSlice.actions.updateProfileRequest());

    try {
      const data = await axios.put(
        "http://localhost:4000/api/v1/user/update/me",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(userSlice.actions.updateProfileSuccess(data.message));
      dispatch(userSlice.actions.clearAllError());
    } catch (error) {
      dispatch(
        userSlice.actions.updateProfileFailed(error.response.data.message)
      );
    }
  };


  /* REset profile */

  export const resetProfile = () => async(dispatch) =>{
    dispatch(userSlice.actions.updateProfileResetAfterUpdate())
  }

/* clear all user errors */

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllError());
};

export default userSlice.reducer;
