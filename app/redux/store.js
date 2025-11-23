import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import favouritesReducer from "./slices/favouritesSlice";
import themeReducer from "./slices/themeSlice";
import { loadStateMiddleware } from "./persist";

const store = configureStore({
  reducer: {
    auth: authReducer,
    favourites: favouritesReducer,
    theme: themeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadStateMiddleware)
});

export default store;
