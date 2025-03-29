import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./appSlice";
import useAllAssignment from "./allAssignmentSlice";
import useSubmittedAssignment from "./submittedAssignmentSlice";
import usePendingAssignment from "./pendingAssignmentSlice";
const appStore = configureStore({
  reducer: {
    user: useReducer,
    allAssignment: useAllAssignment,
    submittedAssignment: useSubmittedAssignment,
    pendingAssignment: usePendingAssignment,
  },
});

export default appStore;
