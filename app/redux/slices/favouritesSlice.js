import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const slice = createSlice({
  name: "favourites",
  initialState: [],
  reducers: {
    addFavourite: (state, action) => {
      // avoid duplicates by idPlayer
      const exists = state.find(p => p.idPlayer === action.payload.idPlayer);
      if (!exists) state.push(action.payload);
      AsyncStorage.setItem("@favourites", JSON.stringify(state));
    },
    removeFavourite: (state, action) => {
      const newState = state.filter(p => p.idPlayer !== action.payload.idPlayer);
      AsyncStorage.setItem("@favourites", JSON.stringify(newState));
      return newState;
    },
    setAllFavourites: (state, action) => {
      // replace entire favourites (used by persistence)
      return action.payload || [];
    }
  }
});

export const { addFavourite, removeFavourite, setAllFavourites } = slice.actions;
export default slice.reducer;
