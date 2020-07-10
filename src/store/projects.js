import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    addSingleProject: (projects, action) => {
      projects.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { addSingleProject } = slice.actions;
export default slice.reducer;
