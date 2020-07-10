import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import moment from "moment";

import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // actions => action handlers
    requestedBugs: (bugs, action) => {
      bugs.loading = true;
    },
    receiveBugsBulk: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    // addBug (command) - bugAdded(event)
    addSingleBug: (bugs, action) => {
      bugs.list.push(action.payload);
    },
    // resolveBug (command) - bugResolved (event)
    resolveSingleBug: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },
  },
});

export const {
  addSingleBug,
  resolveSingleBug,
  bugAssignedToUser,
  receiveBugsBulk,
  requestedBugs,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action creators
const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url,
      method: "GET",
      onStart: requestedBugs.type,
      onSuccess: receiveBugsBulk.type,
      onError: bugsRequestFailed.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "POST",
    data: bug,
    onSuccess: addSingleBug.type,
  });

export const resolveBug = (id) =>
  apiCallBegan({
    url: `${url}/${id}`,
    method: "PATCH",
    data: { resolved: true },
    onSuccess: resolveSingleBug.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: `${url}/${bugId}`,
    method: "PATCH",
    data: { userId },
    onSuccess: bugAssignedToUser.type,
  });

// Custom selector
/* export const getUnresolvedBugs = state => {
  return state.entities.bugs.filter(bug => !bug.resolved)
} */

// Memoization
// bugs => get unresolved bugs from cache
// Selectors
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
