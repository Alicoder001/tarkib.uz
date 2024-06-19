import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  src: "",
  fallBackText: "",
};

const avatar = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setSrc(state, { payload }) {
      state.src = payload;
    },
    setFallBackText(state, { payload }) {
      state.fallBackText = payload;
    },
  },
});
export const { setSrc, setFallBackText } = avatar.actions;
export default avatar.reducer;
