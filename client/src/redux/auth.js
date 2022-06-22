import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    user: {},
  },
  reducers: {
    LOGIN: (state, action) => {
      const { token, user } = action.payload;
      const newState = {
        ...state,
        token,
        user,
      };
      return newState;
    },
    LOGOUT: () => {
      const newState = {
        token: null,
        user: null,
      };
      return newState;
    },
  },
});

export const { LOGIN, LOGOUT } = slice.actions;

export default slice.reducer;
