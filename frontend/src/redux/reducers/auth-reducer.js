import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api";
import {
  setLocalStorageItem,
  checkAuthFromStorage,
  checkTokenFromStorage,
  getUserFromStorage,
  deleteTokenFromStorage,
} from "../../helpers/LocalStorage";
import checkToken from "../../helpers/CheckWhitelistToken";

const axiosInstance = instance();

const initialState = {
  loading: false,
  error: {
    status: false,
    message: "",
  },
  data: checkTokenFromStorage() ? { token: checkTokenFromStorage() } : [],
  isAuthenticated: checkAuthFromStorage(),
  user: JSON.parse(getUserFromStorage()),
  lastAttemptedUrl: "",
  redirect: false,
  whitelistToken: await checkToken(),
  created: {},
};

const apiSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.data = [];
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    saveToken: (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    },
    deleteToken: (state) => {
      state.isAuthenticated = false;
    },
    setRedirect: (state) => {
      state.redirect = true;
    },
    setLastAttemptedUrl: (state, action) => {
      state.lastAttemptedUrl = action.payload;
    },
    whitelistToken: (state, action) => {
      state.whitelistToken = action.payload;
    },
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    createUser: (state, action) => {
      state.created = action.payload;
    },
    catchError: (state, action) => {
      state.error.status = true;
      state.error.message = action.payload;
      state.data = [];
    },
    cleanError: (state) => {
      state.error.status = false;
      state.error.message = "";
    },
  },
});

const {
  startLoading,
  stopLoading,
  saveToken,
  deleteToken,
  setLastAttemptedUrl,
  setRedirect,
  whitelistToken,
  saveUser,
  createUser,
  catchError,
  cleanError,
} = apiSlice.actions;
const { reducer } = apiSlice;

export const fetchAuth = (path, payload) => async (dispatch) => {
  dispatch(startLoading());
  dispatch(cleanError());
  try {
    const response = await axiosInstance.post(path, payload);
    setLocalStorageItem("authToken", response.data.token);
    setLocalStorageItem("isAuthenticated", true);
    setLocalStorageItem("user", JSON.stringify(response.data.user[0]));
    dispatch(saveToken(response.data));
    dispatch(whitelistToken(true));
    dispatch(saveUser(JSON.parse(getUserFromStorage())));
    dispatch(setRedirect());
  } catch (error) {
    dispatch(catchError(error));
  }

  dispatch(stopLoading());
};

export const lastAttemptedUrl = (path) => async (dispatch) => {
  dispatch(startLoading());
  dispatch(cleanError());
  try {
    dispatch(setLastAttemptedUrl(path));
  } catch (error) {
    dispatch(catchError(error));
  }

  dispatch(stopLoading());
};

export const fetchLogout = (path, instance) => async (dispatch) => {
  dispatch(startLoading());
  dispatch(cleanError());
  try {
    const response = await instance.post(path);
    dispatch(deleteToken());
    dispatch(whitelistToken(false));
    deleteTokenFromStorage();
  } catch (error) {
    dispatch(catchError(error));
  }
  dispatch(stopLoading());
};

export const setAuthFromStorage = () => async (dispatch) => {
  dispatch(startLoading());
  dispatch(cleanError());
  try {
    if (checkTokenFromStorage()) {
      dispatch(saveToken({ token: checkTokenFromStorage() }));
    }
  } catch (error) {
    dispatch(catchError(error));
  }
  dispatch(stopLoading());
};

export const apiCreateUser = (path, payload) => async (dispatch) => {
  dispatch(startLoading());
  dispatch(cleanError());
  try {
    const response = await axiosInstance.post(path, payload);
    dispatch(createUser(response.data));
  } catch (error) {
    dispatch(catchError(error));
  }

  dispatch(stopLoading());
};

export default reducer;
