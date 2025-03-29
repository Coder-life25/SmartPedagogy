import { createSlice } from "@reduxjs/toolkit";

const pendingAssignmentSlice = createSlice({
  name: "pendingAssignment",
  initialState: null,
  reducers: {
    addPendingAssignment: (state, action) => {
      return action.payload;
    },
    removePendingAssignment: (state, action) => {
      return null;
    },
  },
});

export const { addPendingAssignment, removePendingAssignment } =
  pendingAssignmentSlice.actions;
export default pendingAssignmentSlice.reducer;
