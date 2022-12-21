import count from "./models/count";
import language from "./models/language";
import collapsed from "./models/layout";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    count,
    language,
    collapsed,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
