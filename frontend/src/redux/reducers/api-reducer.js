import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api";

const axiosInstance = instance(null);

const initialState = {
  loading: true,
  error: {
    status: false,
    message: "",
  },
  cocktails: [],
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.cocktails = [];
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    saveData: (state, action) => {
      state.cocktails = action.payload;
    },
    catchError: (state, action) => {
      state.error.status = true;
      state.error.message = action.payload;
      state.cocktails = [];
    },
    cleanError: (state) => {
      state.error.status = false;
      state.error.message = "";
    },
  },
});

const { startLoading, stopLoading, saveData, catchError, cleanError } =
  apiSlice.actions;
const { reducer } = apiSlice;

export const fetchData = (path) => async (dispatch) => {
  dispatch(startLoading());
  dispatch(cleanError());

  try {
    const response = await axiosInstance.get(path);
    dispatch(saveData(response.data));
  } catch (error) {
    dispatch(catchError(error));
  }

  dispatch(stopLoading());
};

export default reducer;
