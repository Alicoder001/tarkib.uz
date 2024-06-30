import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  src: "",
  firstName: "?",
  lastName: "",
};

const avatar = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setSrc(state, { payload }) {
      state.src = payload;
    },
    setFirstName(state, { payload }) {
      state.firstName = payload;
    },
    setLastName(state, { payload }) {
      if (state.firstName !== "?") {
        state.lastName = payload;
      }
    },
  },
});
export const { setSrc, setFirstName, setLastName } = avatar.actions;
export default avatar.reducer;
