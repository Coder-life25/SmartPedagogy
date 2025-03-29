import { createSlice } from "@reduxjs/toolkit";

const submittedAssignmentSlice = createSlice({
  name: "submittedAssignment",
  initialState: null,
  reducers: {
    addSubmittedAssignment: (state, action) => action.payload,
    removeSubmittedAssignment: (state, action) => null,
  },
});

export const { addSubmittedAssignment, removeSubmittedAssignment } =
  submittedAssignmentSlice.actions;
export default submittedAssignmentSlice.reducer;
