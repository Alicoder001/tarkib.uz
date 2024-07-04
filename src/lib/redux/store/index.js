import avatar from "@/lib/redux/slices/avatar";
import user from "@/lib/redux/slices/user";
import { configureStore } from "@reduxjs/toolkit";
import modals from "../slices/modals";
import otpDetails from "../slices/otp-details";

export function makeStore() {
  return configureStore({
    reducer: {
      avatar,
      user,
      modals,
      otpDetails,
    },
  });
}
