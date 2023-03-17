import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  isCollapse: boolean;
}

const initialState: CounterState = {
  isCollapse: false,
};

export const counterSlice = createSlice({
  name: "isCollapse",
  initialState,
  reducers: {
    setIsCollapse: (state, action: PayloadAction<boolean>) => {
      state.isCollapse = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsCollapse } = counterSlice.actions;

export default counterSlice.reducer;
