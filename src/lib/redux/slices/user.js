import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
    },
  },
});
export const { setUser } = user.actions;
export default user.reducer;
