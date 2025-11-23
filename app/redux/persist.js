import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginSuccess } from "./slices/authSlice";
import { setAllFavourites } from "./slices/favouritesSlice";
import { setTheme } from "./slices/themeSlice";

export const loadInitialState = () => ({ type: "persist/loadInitialState" });

export const loadStateMiddleware = storeAPI => next => async action => {
  // If loadInitialState was dispatched, load persisted data
  if (action.type === "persist/loadInitialState") {
    try {
      const authJson = await AsyncStorage.getItem("@auth");
      if (authJson) {
        const authState = JSON.parse(authJson);
        storeAPI.dispatch(loginSuccess(authState));
      }
    } catch (e) {}

    try {
      const favJson = await AsyncStorage.getItem("@favourites");
      if (favJson) {
        const favs = JSON.parse(favJson);
        storeAPI.dispatch(setAllFavourites(favs));
      }
    } catch (e) {}

    try {
      const themeJson = await AsyncStorage.getItem("@theme");
      if (themeJson) {
        const theme = JSON.parse(themeJson);
        storeAPI.dispatch(setTheme(theme));
      }
    } catch (e) {}
  }

  return next(action);
};

// Middleware that saves state whenever certain actions occur
export const loadStateMiddlewareWrapper = storeAPI => next => action => {
  return next(action);
};

export const loadStateMiddlewareExport = loadStateMiddleware;

export default loadStateMiddleware;
