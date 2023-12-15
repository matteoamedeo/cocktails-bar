import { createSlice, configureStore } from "@reduxjs/toolkit";
import apiReducer from "./reducers/api-reducer";
import authReducer from "./reducers/auth-reducer";

const store = configureStore({
  reducer: {
    cocktails: apiReducer,
    auth: authReducer,
  },
});

export default store;
