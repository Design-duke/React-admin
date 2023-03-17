import { configureStore } from "@reduxjs/toolkit";
const files: any = import.meta.glob("./modules/*.ts", { eager: true });
const modules: any = {};
for (const key in files) {
  modules[key.replace(/(\.\/modules\/|\.ts)/g, "")] = files[key].default;
}

export const store = configureStore({
  reducer: {
    ...modules,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
