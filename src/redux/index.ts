import { configureStore } from "@reduxjs/toolkit";
import count from "./models/count";
import language from "./models/language";
import collapsed from "./models/layout";
export const store = configureStore({
  reducer: {
    count,
    language,
    collapsed,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
