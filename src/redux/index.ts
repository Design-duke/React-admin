import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./models/count";
import setLanguage from "./models/language";
export const store = configureStore({
  reducer: { count: counterReducer, setLanguage },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
