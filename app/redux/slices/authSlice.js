import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      // action.payload is expected to be user object from dummyjson login
      state.user = action.payload;
      state.token = action.payload.token || null;
      try {
        AsyncStorage.setItem("@auth", JSON.stringify(action.payload));
      } catch (e) {}
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      try {
        AsyncStorage.removeItem("@auth");
      } catch (e) {}
    }
  }
});

export const { loginSuccess, logout } = slice.actions;
export default slice.reducer;
