import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
  currentUser: {},
  sidebar: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setAllUsers(state, value) {
      state.allUsers = value.payload;
    },
    setCurrentUser(state, value) {
      state.currentUser = value.payload;
    },
    setSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
  },
});

export const { setAllUsers, setCurrentUser, setSidebar } = adminSlice.actions;
export default adminSlice.reducer;
