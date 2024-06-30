import { configureStore } from "@reduxjs/toolkit";
import avatar from "@/lib/redux/slices/avatar";
import user from "@/lib/redux/slices/user";

export function makeStore() {
  return configureStore({
    reducer: {
      avatar,
      user,
    },
  });
}
