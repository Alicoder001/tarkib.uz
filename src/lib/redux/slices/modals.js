import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forgotPasswordVerifyOTPModal: false,
  alertLoginModal: false,
};

const modals = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModalForgotPasswordVerifyOTP(state) {
      state.forgotPasswordVerifyOTPModal = !state.forgotPasswordVerifyOTPModal;
    },
    setAlertLoginModal(state) {
      state.alertLoginModal = !state.alertLoginModal;
    },
  },
});
export const { setModalForgotPasswordVerifyOTP, setAlertLoginModal } =
  modals.actions;
export default modals.reducer;
