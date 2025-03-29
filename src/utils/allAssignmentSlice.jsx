import { createSlice } from "@reduxjs/toolkit";

const allAssignmentSlice = createSlice({
  name: "allAssignment",
  initialState: null,
  reducers: {
    addAssignment: (state, action) => {
      return action.payload;
    },
    removeAssignment: (state, action) => {
      return null;
    },
  },
});

export const { addAssignment, removeAssignment } = allAssignmentSlice.actions;
export default allAssignmentSlice.reducer;
