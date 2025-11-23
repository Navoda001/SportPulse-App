import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const slice = createSlice({
  name: "theme",
  initialState: { mode: "light" },
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
      try {
        AsyncStorage.setItem("@theme", JSON.stringify(action.payload));
      } catch (e) {}
    },
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      try {
        AsyncStorage.setItem("@theme", JSON.stringify(state.mode));
      } catch (e) {}
    }
  }
});

export const { setTheme, toggleTheme } = slice.actions;
export default slice.reducer;
