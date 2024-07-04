import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phoneNumber: "",
};

const otpDetails = createSlice({
  name: "otpDetails",
  initialState,
  reducers: {
    setPhoneNumber(state, { payload }) {
      state.phoneNumber = payload;
    },
  },
});
export const { setPhoneNumber } = otpDetails.actions;
export default otpDetails.reducer;
