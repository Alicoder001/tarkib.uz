import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forgotPasswordVerifyOTPModal: false,
};

const modals = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModalForgotPasswordVerifyOTP(state) {
      state.forgotPasswordVerifyOTPModal = !state.forgotPasswordVerifyOTPModal;
    },
  },
});
export const { setModalForgotPasswordVerifyOTP } = modals.actions;
export default modals.reducer;
