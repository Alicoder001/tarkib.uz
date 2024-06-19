import { configureStore } from "@reduxjs/toolkit";
import avatar from "@/lib/redux/slices/avatar";

export function makeStore() {
  return configureStore({
    reducer: {
      avatar,
    },
  });
}
