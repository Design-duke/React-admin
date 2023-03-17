import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  lange: string;
}

const initialState: CounterState = {
  lange: "zhCn",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.lange = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
