import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./appSlice";
const appStore = configureStore({
  reducer: {
    user: useReducer,
  },
});

export default appStore;
