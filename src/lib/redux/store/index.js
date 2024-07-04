import avatar from "@/lib/redux/slices/avatar";
import user from "@/lib/redux/slices/user";
import { configureStore } from "@reduxjs/toolkit";
import modals from "../slices/modals";

export function makeStore() {
  return configureStore({
    reducer: {
      avatar,
      user,
      modals,
    },
  });
}
