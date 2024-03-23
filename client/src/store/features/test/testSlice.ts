import { createSlice } from "@reduxjs/toolkit";

export interface TestState {
  value: number;
}

const initialState: TestState = {
  value: 0,
};

export const testSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    tesFunc: (state) => {
      state.value += 1;
    },
  },
});

export const { tesFunc } = testSlice.actions;

export default testSlice.reducer;
